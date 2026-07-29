import type { Customer, RiskTier, ChurnDriver } from '../types';

export function calculateChurnScore(customer: Customer): number {
  let score = 20;

  if (customer.lastActiveDaysAgo > 20) score += 30;
  else if (customer.lastActiveDaysAgo > 10) score += 18;
  else if (customer.lastActiveDaysAgo > 5) score += 8;

  score += customer.behavioralSignals.cartAbandonmentCount * 6;
  score += customer.behavioralSignals.shippingDelayCount * 12;

  if (customer.behavioralSignals.supportSentimentScore < -0.5) score += 25;
  else if (customer.behavioralSignals.supportSentimentScore < 0) score += 12;

  score += (customer.behavioralSignals.sessionFrequencyDropPct / 100) * 20;

  return Math.min(99, Math.max(1, Math.round(score)));
}

export function getRiskTier(score: number): RiskTier {
  if (score >= 70) return 'High';
  if (score >= 35) return 'Medium';
  return 'Low';
}

export function generateSHAPAttribution(customer: Customer): ChurnDriver[] {
  return customer.topDrivers || [
    { feature: 'Days Inactive', impactScore: 25, category: 'Engagement', description: `No logins for ${customer.lastActiveDaysAgo} days.` },
    { feature: 'Cart Abandonment', impactScore: customer.behavioralSignals.cartAbandonmentCount * 5, category: 'Engagement', description: `${customer.behavioralSignals.cartAbandonmentCount} abandoned carts.` }
  ];
}

export function calculateFinancialImpact(customers: Customer[]) {
  const totalClvAtRisk = customers
    .filter(c => c.riskTier === 'High')
    .reduce((sum, c) => sum + c.clv, 0);

  const highRiskCount = customers.filter(c => c.riskTier === 'High').length;
  const mediumRiskCount = customers.filter(c => c.riskTier === 'Medium').length;
  const lowRiskCount = customers.filter(c => c.riskTier === 'Low').length;

  const avgChurnRisk = Math.round(
    customers.reduce((sum, c) => sum + c.churnRiskScore, 0) / (customers.length || 1)
  );

  return {
    totalClvAtRisk,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount,
    avgChurnRisk,
    estimatedRetainedRevenue: Math.round(totalClvAtRisk * 0.72)
  };
}
