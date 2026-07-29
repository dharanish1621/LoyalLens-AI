import type { Customer, TelemetryEvent } from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-9021',
    name: 'Alexandra Wright',
    email: 'a.wright@techline.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    segment: 'VIP',
    clv: 8450,
    totalOrders: 28,
    avgOrderValue: 301.78,
    lastActiveDaysAgo: 18,
    churnRiskScore: 92,
    riskTier: 'High',
    rfmScore: { recency: 1, frequency: 5, monetary: 5 },
    behavioralSignals: {
      cartAbandonmentCount: 4,
      supportTicketsCount: 3,
      supportSentimentScore: -0.75,
      discountUsageRate: 15,
      sessionFrequencyDropPct: 82,
      shippingDelayCount: 3,
    },
    topDrivers: [
      { feature: 'Shipping Delays', impactScore: 38, category: 'Logistics', description: '3 consecutive orders delayed by over 6 days.' },
      { feature: 'Support Sentiment Decay', impactScore: 29, category: 'Support', description: 'Extremely dissatisfied sentiment in ticket #8841.' },
      { feature: 'Cart Abandonment Velocity', impactScore: 18, category: 'Engagement', description: 'Abandoned 4 high-value carts in past 10 days.' },
      { feature: 'Session Frequency Drop', impactScore: 14, category: 'Engagement', description: '82% drop in weekly app logins.' }
    ],
    journeyTimeline: [
      { id: 'j-1', timestamp: '2 days ago', event: 'Abandoned Cart ($640 order)', type: 'negative', impact: 'Risk +18%' },
      { id: 'j-2', timestamp: '5 days ago', event: 'Submitted Angry Ticket (Late Delivery)', type: 'negative', impact: 'Risk +24%' },
      { id: 'j-3', timestamp: '12 days ago', event: 'Package Delayed by Logistics Partner', type: 'negative', impact: 'Risk +15%' },
      { id: 'j-4', timestamp: '25 days ago', event: 'Completed Order ($420)', type: 'positive', impact: 'Risk -5%' }
    ]
  },
  {
    id: 'CUST-8834',
    name: 'Marcus Chen',
    email: 'marcus.chen@designhub.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    segment: 'VIP',
    clv: 6200,
    totalOrders: 19,
    avgOrderValue: 326.31,
    lastActiveDaysAgo: 14,
    churnRiskScore: 84,
    riskTier: 'High',
    rfmScore: { recency: 2, frequency: 4, monetary: 5 },
    behavioralSignals: {
      cartAbandonmentCount: 3,
      supportTicketsCount: 2,
      supportSentimentScore: -0.60,
      discountUsageRate: 35,
      sessionFrequencyDropPct: 75,
      shippingDelayCount: 2,
    },
    topDrivers: [
      { feature: 'Competitor Price Checking', impactScore: 34, category: 'Pricing', description: 'Frequent visits to price-match policy & refund terms.' },
      { feature: 'Cart Abandonment', impactScore: 26, category: 'Engagement', description: 'High dollar value cart left unpurchased for 5 days.' },
      { feature: 'Support Frustration', impactScore: 21, category: 'Support', description: 'Unresolved product inquiry regarding compatibility.' }
    ],
    journeyTimeline: [
      { id: 'j-5', timestamp: '1 day ago', event: 'Viewed Return & Refund Policy 4x', type: 'negative', impact: 'Risk +14%' },
      { id: 'j-6', timestamp: '3 days ago', event: 'Abandoned Cart ($520 Audio Kit)', type: 'negative', impact: 'Risk +22%' },
      { id: 'j-7', timestamp: '14 days ago', event: 'Opened Support Inquiry', type: 'neutral', impact: 'Risk +5%' }
    ]
  },
  {
    id: 'CUST-7412',
    name: 'Sophia Patel',
    email: 'sophia.patel@nexus.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    segment: 'Bargain Hunter',
    clv: 1850,
    totalOrders: 12,
    avgOrderValue: 154.16,
    lastActiveDaysAgo: 22,
    churnRiskScore: 78,
    riskTier: 'High',
    rfmScore: { recency: 1, frequency: 3, monetary: 2 },
    behavioralSignals: {
      cartAbandonmentCount: 5,
      supportTicketsCount: 1,
      supportSentimentScore: -0.20,
      discountUsageRate: 90,
      sessionFrequencyDropPct: 65,
      shippingDelayCount: 1,
    },
    topDrivers: [
      { feature: 'Expired Discount Friction', impactScore: 42, category: 'Pricing', description: 'Attempted to use expired promo code 3 times.' },
      { feature: 'Price Sensitivity', impactScore: 28, category: 'Pricing', description: 'Only purchases when discount exceeds 25%.' }
    ],
    journeyTimeline: [
      { id: 'j-8', timestamp: '3 days ago', event: 'Failed Coupon Application (SAVE30)', type: 'negative', impact: 'Risk +25%' },
      { id: 'j-9', timestamp: '6 days ago', event: 'Cart Abandoned ($180)', type: 'negative', impact: 'Risk +15%' }
    ]
  },
  {
    id: 'CUST-6109',
    name: 'David Sterling',
    email: 'd.sterling@apex.net',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    segment: 'Regular',
    clv: 3400,
    totalOrders: 14,
    avgOrderValue: 242.85,
    lastActiveDaysAgo: 9,
    churnRiskScore: 54,
    riskTier: 'Medium',
    rfmScore: { recency: 3, frequency: 3, monetary: 3 },
    behavioralSignals: {
      cartAbandonmentCount: 2,
      supportTicketsCount: 1,
      supportSentimentScore: 0.10,
      discountUsageRate: 40,
      sessionFrequencyDropPct: 40,
      shippingDelayCount: 1,
    },
    topDrivers: [
      { feature: 'Moderated Login Decay', impactScore: 28, category: 'Engagement', description: 'Weekly active sessions down by 40%.' },
      { feature: 'Single Shipping Friction', impactScore: 16, category: 'Logistics', description: 'Recent delivery took 2 days longer than estimated.' }
    ],
    journeyTimeline: [
      { id: 'j-10', timestamp: '4 days ago', event: 'Logged in without purchase', type: 'neutral', impact: 'Risk +4%' },
      { id: 'j-11', timestamp: '9 days ago', event: 'Delivered Order #4412 (Minor delay)', type: 'neutral', impact: 'Risk +6%' }
    ]
  },
  {
    id: 'CUST-5291',
    name: 'Elena Rostova',
    email: 'elena.r@luxurymail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    segment: 'VIP',
    clv: 11200,
    totalOrders: 35,
    avgOrderValue: 320.00,
    lastActiveDaysAgo: 4,
    churnRiskScore: 48,
    riskTier: 'Medium',
    rfmScore: { recency: 4, frequency: 5, monetary: 5 },
    behavioralSignals: {
      cartAbandonmentCount: 1,
      supportTicketsCount: 0,
      supportSentimentScore: 0.50,
      discountUsageRate: 10,
      sessionFrequencyDropPct: 25,
      shippingDelayCount: 0,
    },
    topDrivers: [
      { feature: 'Reduced Order Basket Size', impactScore: 22, category: 'Product', description: 'Average order value decreased by 20% this month.' }
    ],
    journeyTimeline: [
      { id: 'j-12', timestamp: '4 days ago', event: 'Completed Order ($210)', type: 'positive', impact: 'Risk -8%' }
    ]
  },
  {
    id: 'CUST-4182',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@gulfventures.ae',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    segment: 'VIP',
    clv: 9800,
    totalOrders: 24,
    avgOrderValue: 408.33,
    lastActiveDaysAgo: 2,
    churnRiskScore: 12,
    riskTier: 'Low',
    rfmScore: { recency: 5, frequency: 5, monetary: 5 },
    behavioralSignals: {
      cartAbandonmentCount: 0,
      supportTicketsCount: 0,
      supportSentimentScore: 0.90,
      discountUsageRate: 5,
      sessionFrequencyDropPct: 0,
      shippingDelayCount: 0,
    },
    topDrivers: [
      { feature: 'High Engagement Velocity', impactScore: -35, category: 'Engagement', description: 'Logins 4x per week with high review activity.' },
      { feature: 'Strong Product Loyalty', impactScore: -25, category: 'Product', description: 'Repeated subscription purchases.' }
    ],
    journeyTimeline: [
      { id: 'j-13', timestamp: '2 days ago', event: 'Placed Order ($890)', type: 'positive', impact: 'Risk -12%' },
      { id: 'j-14', timestamp: '3 days ago', event: 'Left 5-Star Product Review', type: 'positive', impact: 'Risk -8%' }
    ]
  },
  {
    id: 'CUST-3901',
    name: 'Emily Watson',
    email: 'emily.watson@horizon.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    segment: 'New Buyer',
    clv: 450,
    totalOrders: 2,
    avgOrderValue: 225.00,
    lastActiveDaysAgo: 1,
    churnRiskScore: 18,
    riskTier: 'Low',
    rfmScore: { recency: 5, frequency: 2, monetary: 2 },
    behavioralSignals: {
      cartAbandonmentCount: 0,
      supportTicketsCount: 0,
      supportSentimentScore: 0.80,
      discountUsageRate: 20,
      sessionFrequencyDropPct: 0,
      shippingDelayCount: 0,
    },
    topDrivers: [
      { feature: 'High Onboarding Satisfaction', impactScore: -30, category: 'Engagement', description: 'Completed profile setup and opened welcome email.' }
    ],
    journeyTimeline: [
      { id: 'j-15', timestamp: 'Yesterday', event: 'First Purchase Delivered ($225)', type: 'positive', impact: 'Risk -15%' }
    ]
  }
];

export const INITIAL_TELEMETRY: TelemetryEvent[] = [
  {
    id: 'tel-1',
    customerId: 'CUST-9021',
    customerName: 'Alexandra Wright',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    eventType: 'cart_abandoned',
    description: 'Abandoned cart with 3 premium items ($640 value)',
    riskImpact: 18,
    timestamp: '2 mins ago'
  },
  {
    id: 'tel-2',
    customerId: 'CUST-8834',
    customerName: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    eventType: 'shipping_delay',
    description: 'Order delivery status updated to delayed (+3 days)',
    riskImpact: 14,
    timestamp: '7 mins ago'
  },
  {
    id: 'tel-3',
    customerId: 'CUST-7412',
    customerName: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    eventType: 'checkout_error',
    description: 'Failed coupon code entry (SAVE30 expired)',
    riskImpact: 22,
    timestamp: '15 mins ago'
  },
  {
    id: 'tel-4',
    customerId: 'CUST-4182',
    customerName: 'Tariq Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    eventType: 'successful_order',
    description: 'Completed purchase of $890 Home Studio Rig',
    riskImpact: -12,
    timestamp: '24 mins ago'
  }
];
