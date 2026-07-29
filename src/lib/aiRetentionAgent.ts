import type { Customer, RetentionCampaign } from '../types';

export function generateAIRetentionCampaign(customer: Customer): RetentionCampaign {
  const topCategory = customer.topDrivers[0]?.category || 'Engagement';
  const isVIP = customer.segment === 'VIP' || customer.clv > 5000;
  
  let incentiveType: RetentionCampaign['incentiveType'] = 'Discount';
  let incentiveValue = '20% OFF Next Order';
  let discountCode = `RETAIN-${customer.id.replace('CUST-', '')}-${Math.floor(100 + Math.random() * 900)}`;
  let emailHeadline = '';
  let aiGeneratedCopy = '';
  let whatsappCopy = '';
  let channel: RetentionCampaign['channel'] = 'Email';
  let estimatedRetentionRate = 75;

  if (topCategory === 'Logistics') {
    incentiveType = 'Free Shipping';
    incentiveValue = 'Free Express Shipping + $25 Credit';
    discountCode = `EXPRESS-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    emailHeadline = `We Sincerity Apologize, ${customer.name.split(' ')[0]} - Here is your Priority Shipping VIP Pass`;
    aiGeneratedCopy = `Hi ${customer.name},\n\nWe noticed your recent order experienced an unexpected logistics delay. As one of our valued ${isVIP ? 'VIP' : 'top'} members (Lifetime Value: $${customer.clv.toLocaleString()}), your experience is our absolute priority.\n\nWe’ve automatically upgraded your account to Express Delivery for your next 3 orders, plus applied a $25 instant account credit code: ${discountCode}.\n\nClick below to claim your credit instantly!`;
    whatsappCopy = `Hi ${customer.name.split(' ')[0]}! 🚚 We're so sorry about your recent delivery delay. To make things right, here is your $25 Instant Credit + Free Express Delivery code: *${discountCode}*. Tap to claim: https://loyallens.store/claim?code=${discountCode}`;
    channel = 'WhatsApp';
    estimatedRetentionRate = 84;
  } else if (topCategory === 'Pricing' || customer.segment === 'Bargain Hunter') {
    incentiveType = 'Discount';
    incentiveValue = '25% Exclusive Price Match Discount';
    discountCode = `EXCLUSIVE25-${Math.floor(1000 + Math.random() * 9000)}`;
    emailHeadline = `Special Price Match Offer Just for You, ${customer.name.split(' ')[0]}!`;
    aiGeneratedCopy = `Hi ${customer.name},\n\nWe saw you browsing our catalog recently! To ensure you get the absolute best value on the web, here is an exclusive 25% discount voucher reserved just for your cart.\n\nUse Promo Code: ${discountCode} at checkout before it expires in 48 hours.`;
    whatsappCopy = `Hey ${customer.name.split(' ')[0]} 👋 Grab 25% OFF your saved items today! Use code *${discountCode}* at checkout: https://loyallens.store/cart`;
    channel = 'Email';
    estimatedRetentionRate = 78;
  } else if (isVIP) {
    incentiveType = 'VIP Loyalty Credits';
    incentiveValue = '$50 VIP Concierge Credit + Early Access';
    discountCode = `VIP-CONCIERGE-${Math.floor(1000 + Math.random() * 9000)}`;
    emailHeadline = `${customer.name.split(' ')[0]}, Exclusive $50 Concierge Gift for You`;
    aiGeneratedCopy = `Dear ${customer.name},\n\nAs a top VIP member with $${customer.clv.toLocaleString()} in lifetime purchases, we missed seeing you on LoyalLens! We’ve added $50 directly into your wallet balance with code ${discountCode}.\n\nPlus, enjoy 24/7 priority concierge support for any custom product requests.`;
    whatsappCopy = `Dear ${customer.name.split(' ')[0]} ✨ Your $50 VIP credit is active! Code: *${discountCode}*. Enjoy priority concierge service anytime.`;
    channel = 'WhatsApp';
    estimatedRetentionRate = 89;
  } else {
    incentiveType = 'Gift Bundle';
    incentiveValue = 'Free Premium Accessories Bundle';
    discountCode = `GIFT-BUNDLE-${Math.floor(1000 + Math.random() * 9000)}`;
    emailHeadline = `We Miss You, ${customer.name.split(' ')[0]}! A Free Gift is Waiting`;
    aiGeneratedCopy = `Hi ${customer.name},\n\nIt’s been a little while! Complete any purchase this week and receive our best-selling accessory kit worth $49 completely FREE with code ${discountCode}.\n\nWe’d love to welcome you back!`;
    whatsappCopy = `Hi ${customer.name.split(' ')[0]}! 🎁 We missed you! Claim your FREE $49 Accessory Gift with code *${discountCode}* today!`;
    channel = 'SMS';
    estimatedRetentionRate = 72;
  }

  const expectedRevenueSaved = Math.round(customer.clv * (estimatedRetentionRate / 100));
  const campaignCost = incentiveType === 'Discount' ? 25 : 15;

  return {
    id: `CAMP-${Math.floor(10000 + Math.random() * 90000)}`,
    customerId: customer.id,
    customerName: customer.name,
    riskScore: customer.churnRiskScore,
    strategyName: `${incentiveType} Strategy for ${customer.segment}`,
    incentiveType,
    incentiveValue,
    discountCode,
    channel,
    emailHeadline,
    aiGeneratedCopy,
    whatsappCopy,
    estimatedRetentionRate,
    expectedRevenueSaved,
    campaignCost,
    status: 'Suggested',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
