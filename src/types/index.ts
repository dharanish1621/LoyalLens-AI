export type RiskTier = 'High' | 'Medium' | 'Low';

export type CustomerSegment = 'VIP' | 'Regular' | 'Bargain Hunter' | 'New Buyer' | 'At Risk';

export interface ChurnDriver {
  feature: string;
  impactScore: number;
  category: 'Engagement' | 'Logistics' | 'Pricing' | 'Support' | 'Product';
  description: string;
}

export interface RetentionCampaign {
  id: string;
  customerId: string;
  customerName: string;
  riskScore: number;
  strategyName: string;
  incentiveType: 'Discount' | 'Free Shipping' | 'VIP Loyalty Credits' | 'Concierge Support' | 'Gift Bundle';
  incentiveValue: string;
  discountCode: string;
  channel: 'Email' | 'WhatsApp' | 'SMS' | 'Push Notification';
  emailHeadline: string;
  aiGeneratedCopy: string;
  whatsappCopy: string;
  estimatedRetentionRate: number;
  expectedRevenueSaved: number;
  campaignCost: number;
  status: 'Suggested' | 'Deployed' | 'Dispatched' | 'Converted' | 'Ignored';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  segment: CustomerSegment;
  clv: number;
  totalOrders: number;
  avgOrderValue: number;
  lastActiveDaysAgo: number;
  churnRiskScore: number;
  riskTier: RiskTier;
  rfmScore: {
    recency: number;
    frequency: number;
    monetary: number;
  };
  behavioralSignals: {
    cartAbandonmentCount: number;
    supportTicketsCount: number;
    supportSentimentScore: number;
    discountUsageRate: number;
    sessionFrequencyDropPct: number;
    shippingDelayCount: number;
  };
  topDrivers: ChurnDriver[];
  journeyTimeline: {
    id: string;
    timestamp: string;
    event: string;
    type: 'positive' | 'negative' | 'neutral';
    impact: string;
  }[];
  activeCampaign?: RetentionCampaign;
}

export interface TelemetryEvent {
  id: string;
  customerId: string;
  customerName: string;
  avatar: string;
  eventType: 'cart_abandoned' | 'shipping_delay' | 'negative_review' | 'login_drop' | 'checkout_error' | 'successful_order';
  description: string;
  riskImpact: number;
  timestamp: string;
}

export interface WhatIfParams {
  retentionBudget: number;
  targetRiskTier: RiskTier | 'All';
  discountPercentage: number;
  campaignChannel: 'All' | 'WhatsApp' | 'Email';
}
