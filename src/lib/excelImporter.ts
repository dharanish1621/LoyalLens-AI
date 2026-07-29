import * as XLSX from 'xlsx';
import type { Customer, CustomerSegment } from '../types';
import { calculateChurnScore, getRiskTier } from './churnEngine';

export function parseExcelFile(file: File): Promise<Customer[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Read first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        if (!jsonRows || jsonRows.length === 0) {
          throw new Error('Excel file is empty or formatted incorrectly.');
        }

        const parsedCustomers: Customer[] = jsonRows.map((row, index) => {
          // Normalize column keys
          const normalizedRow: Record<string, any> = {};
          Object.keys(row).forEach(key => {
            normalizedRow[key.toLowerCase().trim().replace(/[^a-z0-9]/g, '')] = row[key];
          });

          const name = normalizedRow['name'] || normalizedRow['customername'] || normalizedRow['customer'] || `Customer #${index + 1}`;
          const email = normalizedRow['email'] || normalizedRow['emailaddress'] || `user${index + 1}@store.com`;
          const clv = Number(normalizedRow['clv'] || normalizedRow['lifetimevalue'] || normalizedRow['totalspent'] || 500);
          const totalOrders = Number(normalizedRow['totalorders'] || normalizedRow['orders'] || normalizedRow['ordercount'] || 5);
          const avgOrderValue = totalOrders > 0 ? Math.round(clv / totalOrders) : clv;
          const lastActiveDaysAgo = Number(normalizedRow['lastactivedaysago'] || normalizedRow['lastactive'] || normalizedRow['recency'] || 10);
          
          const cartAbandonmentCount = Number(normalizedRow['cartabandonment'] || normalizedRow['cartabandonmentcount'] || normalizedRow['abandonedcarts'] || 1);
          const supportTicketsCount = Number(normalizedRow['supporttickets'] || normalizedRow['tickets'] || 0);
          const supportSentimentScore = Number(normalizedRow['sentimentscore'] || normalizedRow['sentiment'] || -0.2);
          const shippingDelayCount = Number(normalizedRow['shippingdelays'] || normalizedRow['delays'] || 0);
          const sessionFrequencyDropPct = Number(normalizedRow['sessiondrop'] || normalizedRow['sessiondrop%'] || 40);
          
          const rawSegment = String(normalizedRow['segment'] || normalizedRow['customersegment'] || 'Regular').trim();
          let segment: CustomerSegment = 'Regular';
          if (/vip/i.test(rawSegment)) segment = 'VIP';
          else if (/bargain|discount/i.test(rawSegment)) segment = 'Bargain Hunter';
          else if (/new/i.test(rawSegment)) segment = 'New Buyer';

          const avatarList = [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
          ];
          const avatar = avatarList[index % avatarList.length];

          const customerObj: Customer = {
            id: `XL-${1000 + index}`,
            name,
            email,
            avatar,
            segment,
            clv,
            totalOrders,
            avgOrderValue,
            lastActiveDaysAgo,
            churnRiskScore: 0,
            riskTier: 'Low',
            rfmScore: {
              recency: lastActiveDaysAgo < 7 ? 5 : lastActiveDaysAgo < 15 ? 3 : 1,
              frequency: totalOrders > 15 ? 5 : totalOrders > 5 ? 3 : 1,
              monetary: clv > 5000 ? 5 : clv > 1500 ? 3 : 1,
            },
            behavioralSignals: {
              cartAbandonmentCount,
              supportTicketsCount,
              supportSentimentScore,
              discountUsageRate: 30,
              sessionFrequencyDropPct,
              shippingDelayCount
            },
            topDrivers: [
              {
                feature: lastActiveDaysAgo > 14 ? 'Inactivity Velocity' : 'Cart Abandonment',
                impactScore: Math.min(45, lastActiveDaysAgo * 2),
                category: lastActiveDaysAgo > 14 ? 'Engagement' : 'Pricing',
                description: `${lastActiveDaysAgo} days inactive with ${cartAbandonmentCount} abandoned carts.`
              }
            ],
            journeyTimeline: [
              {
                id: `j-xl-${index}`,
                timestamp: `${lastActiveDaysAgo} days ago`,
                event: `Imported via Excel Dataset`,
                type: 'neutral',
                impact: 'Initial Baseline'
              }
            ]
          };

          const calculatedScore = calculateChurnScore(customerObj);
          customerObj.churnRiskScore = calculatedScore;
          customerObj.riskTier = getRiskTier(calculatedScore);

          return customerObj;
        });

        resolve(parsedCustomers);
      } catch (err: any) {
        reject(new Error(err.message || 'Failed to parse Excel file.'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}

export function downloadSampleExcel() {
  const sampleData = [
    {
      "Customer Name": "Sarah Jenkins",
      "Email": "sarah.j@example.com",
      "CLV ($)": 4500,
      "Total Orders": 18,
      "Last Active Days Ago": 22,
      "Segment": "VIP",
      "Cart Abandonments": 4,
      "Support Tickets": 2,
      "Shipping Delays": 2,
      "Sentiment Score": -0.7
    },
    {
      "Customer Name": "Michael Ross",
      "Email": "m.ross@lawfirm.com",
      "CLV ($)": 8200,
      "Total Orders": 25,
      "Last Active Days Ago": 3,
      "Segment": "VIP",
      "Cart Abandonments": 0,
      "Support Tickets": 0,
      "Shipping Delays": 0,
      "Sentiment Score": 0.9
    },
    {
      "Customer Name": "Jessica Pearson",
      "Email": "jessica@pearson.com",
      "CLV ($)": 12000,
      "Total Orders": 32,
      "Last Active Days Ago": 16,
      "Segment": "VIP",
      "Cart Abandonments": 3,
      "Support Tickets": 1,
      "Shipping Delays": 3,
      "Sentiment Score": -0.5
    },
    {
      "Customer Name": "Harvey Specter",
      "Email": "harvey@specter.com",
      "CLV ($)": 2100,
      "Total Orders": 8,
      "Last Active Days Ago": 35,
      "Segment": "Bargain Hunter",
      "Cart Abandonments": 5,
      "Support Tickets": 3,
      "Shipping Delays": 1,
      "Sentiment Score": -0.8
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");
  XLSX.writeFile(workbook, "LoyalLens_Sample_Customer_Dataset.xlsx");
}
