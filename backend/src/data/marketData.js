const marketData = {
  sectors: [
    {
      id: "banking",
      name: "Banking & Financial Services",
      icon: "🏦",
      industries: [
        {
          name: "Private Sector Banks",
          companies: [
            { id: "HDFCBANK", name: "HDFC Bank", price: 1530.50, change: 1.2, volume: "15.2M" },
            { id: "ICICIBANK", name: "ICICI Bank", price: 1050.25, change: -0.5, volume: "12.1M" },
            { id: "AXISBANK", name: "Axis Bank", price: 1120.75, change: 0.8, volume: "8.5M" }
          ]
        },
        {
          name: "Public Sector Banks",
          companies: [
            { id: "SBIN", name: "State Bank of India", price: 780.40, change: 2.1, volume: "22.4M" },
            { id: "PNB", name: "Punjab National Bank", price: 125.60, change: -1.2, volume: "35.1M" }
          ]
        },
        {
          name: "NBFCs",
          companies: [
            { id: "BAJFINANCE", name: "Bajaj Finance", price: 7100.00, change: 1.5, volume: "2.1M" },
            { id: "CHOLAFIN", name: "Chola Inv & Finance", price: 1150.20, change: 0.4, volume: "1.8M" }
          ]
        }
      ]
    },
    {
      id: "it",
      name: "Information Technology (IT)",
      icon: "💻",
      industries: [
        {
          name: "IT Services & Consulting",
          companies: [
            { id: "TCS", name: "Tata Consultancy Services", price: 3950.00, change: 0.3, volume: "3.4M" },
            { id: "INFY", name: "Infosys", price: 1650.75, change: -1.1, volume: "8.2M" },
            { id: "WIPRO", name: "Wipro", price: 495.20, change: 2.5, volume: "10.1M" },
            { id: "HCLTECH", name: "HCL Technologies", price: 1580.40, change: 0.9, volume: "4.5M" }
          ]
        }
      ]
    },
    {
      id: "pharma",
      name: "Pharmaceuticals & Healthcare",
      icon: "💊",
      industries: [
        {
          name: "Pharmaceuticals",
          companies: [
            { id: "SUNPHARMA", name: "Sun Pharma", price: 1520.10, change: 1.8, volume: "3.1M" },
            { id: "DRREDDY", name: "Dr. Reddy's Labs", price: 6200.50, change: -0.2, volume: "0.8M" },
            { id: "CIPLA", name: "Cipla", price: 1450.80, change: 1.1, volume: "2.5M" }
          ]
        }
      ]
    },
    {
      id: "auto",
      name: "Automobile & Auto Ancillaries",
      icon: "🚗",
      industries: [
        {
          name: "Passenger Vehicles",
          companies: [
            { id: "MARUTI", name: "Maruti Suzuki", price: 12500.00, change: -1.5, volume: "0.5M" },
            { id: "TATAMOTORS", name: "Tata Motors", price: 950.40, change: 3.2, volume: "18.2M" },
            { id: "M&M", name: "Mahindra & Mahindra", price: 2100.60, change: 1.4, volume: "4.1M" }
          ]
        },
        {
          name: "Two Wheelers",
          companies: [
            { id: "BAJAJ-AUTO", name: "Bajaj Auto", price: 8900.20, change: 0.5, volume: "0.9M" },
            { id: "HEROMOTOCO", name: "Hero MotoCorp", price: 4600.80, change: -0.8, volume: "1.2M" }
          ]
        }
      ]
    },
    {
      id: "fmcg",
      name: "FMCG (Fast-Moving Consumer Goods)",
      icon: "🍔",
      industries: [
        {
          name: "Personal Care & Food",
          companies: [
            { id: "ITC", name: "ITC", price: 430.50, change: 0.2, volume: "25.4M" },
            { id: "HINDUNILVR", name: "Hindustan Unilever", price: 2350.70, change: -0.4, volume: "2.1M" },
            { id: "NESTLEIND", name: "Nestle India", price: 2500.10, change: 0.8, volume: "0.4M" }
          ]
        }
      ]
    },
    {
      id: "power",
      name: "Power & Utilities",
      icon: "⚡",
      industries: [
        {
          name: "Power Generation",
          companies: [
            { id: "NTPC", name: "NTPC", price: 360.20, change: 2.8, volume: "30.1M" },
            { id: "TATAPOWER", name: "Tata Power", price: 420.50, change: 4.1, volume: "45.2M" }
          ]
        }
      ]
    },
    {
      id: "oil-gas",
      name: "Oil & Gas",
      icon: "🛢️",
      industries: [
        {
          name: "Exploration & Refining",
          companies: [
            { id: "RELIANCE", name: "Reliance Industries", price: 2950.40, change: 1.1, volume: "6.5M" },
            { id: "ONGC", name: "ONGC", price: 280.60, change: -1.2, volume: "15.4M" }
          ]
        }
      ]
    },
    {
      id: "telecom",
      name: "Telecom",
      icon: "📡",
      industries: [
        {
          name: "Telecom Services",
          companies: [
            { id: "BHARTIARTL", name: "Bharti Airtel", price: 1350.20, change: 1.7, volume: "8.9M" },
            { id: "IDEA", name: "Vodafone Idea", price: 14.50, change: -2.1, volume: "150.2M" }
          ]
        }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: "🏗️",
      industries: [
        {
          name: "Construction",
          companies: [
            { id: "LT", name: "Larsen & Toubro", price: 3650.80, change: 1.4, volume: "3.2M" },
            { id: "GMRINFRA", name: "GMR Airports", price: 90.20, change: 2.5, volume: "20.1M" }
          ]
        }
      ]
    },
    {
      id: "metals",
      name: "Metals & Mining",
      icon: "🔩",
      industries: [
        {
          name: "Steel & Mining",
          companies: [
            { id: "TATASTEEL", name: "Tata Steel", price: 165.40, change: 3.1, volume: "42.5M" },
            { id: "JSWSTEEL", name: "JSW Steel", price: 880.20, change: 1.5, volume: "4.1M" },
            { id: "HINDALCO", name: "Hindalco", price: 620.50, change: -0.5, volume: "6.8M" }
          ]
        }
      ]
    }
  ],

  upcomingIPOs: [
    {
      name: "Swiggy Ltd.",
      issuePrice: "₹390 - ₹412",
      issueSize: "₹10,414 Cr",
      openDate: "Upcoming",
      status: "SEBI Approved",
      lotSize: "36 Shares",
      about: "Swiggy is India's leading on-demand convenience platform, operating across food delivery, dining out, and Instamart quick commerce. The IPO proceeds will be used for technology investments and dark store expansions."
    },
    {
      name: "Hyundai Motor India",
      issuePrice: "TBA",
      issueSize: "₹25,000 Cr",
      openDate: "Upcoming",
      status: "Draft Filed",
      lotSize: "TBA",
      about: "Hyundai Motor India is the second-largest carmaker in the country. This highly anticipated IPO will be the largest in India's history, primarily offering existing promoter shares."
    },
    {
      name: "Oyo Rooms (Oravel Stays)",
      issuePrice: "TBA",
      issueSize: "₹8,430 Cr",
      openDate: "Delayed",
      status: "Pending",
      lotSize: "TBA",
      about: "Oyo is a global hospitality platform that empowers entrepreneurs and small businesses with hotels and homes by providing full-stack technology. The IPO is currently under regulatory review."
    },
    {
      name: "FirstCry (Brainbees Solutions)",
      issuePrice: "TBA",
      issueSize: "₹4,193 Cr",
      openDate: "Upcoming",
      status: "SEBI Approved",
      lotSize: "30 Shares",
      about: "FirstCry is India's largest multi-channel retailing platform for Mothers', Babies', and Kids' products. The fresh issue proceeds will be used for setting up new modern stores and warehouses."
    },
    {
      name: "Ola Electric Mobility",
      issuePrice: "₹72 - ₹76",
      issueSize: "₹6,145 Cr",
      openDate: "Closed",
      status: "Listed",
      lotSize: "195 Shares",
      about: "Ola Electric is India's leading EV two-wheeler manufacturer. The proceeds from the IPO will fund capacity expansion at its gigafactory and R&D for next-generation products."
    }
  ],

  dailyUpdates: [
    {
      id: 1,
      title: "RBI keeps repo rate unchanged at 6.5%",
      time: "2 hours ago",
      type: "Policy",
      impact: "Neutral"
    },
    {
      id: 2,
      title: "Nifty IT index rallies 2% on strong tech earnings guidance",
      time: "4 hours ago",
      type: "Market",
      impact: "Positive"
    },
    {
      id: 3,
      title: "FIIs remain net buyers for the 5th consecutive session",
      time: "6 hours ago",
      type: "Flows",
      impact: "Positive"
    },
    {
      id: 4,
      title: "Crude oil prices spike globally; OMC stocks under pressure",
      time: "10 hours ago",
      type: "Global",
      impact: "Negative"
    },
    {
      id: 5,
      title: "Auto sales hit record high for festive season deliveries",
      time: "1 day ago",
      type: "Sector",
      impact: "Positive"
    }
  ],

  primaryMarket: [
    {
      id: "pm1",
      type: "NFO",
      name: "HDFC Technology Fund",
      category: "Equity - Sectoral",
      minInvestment: "₹500",
      closeDate: "Oct 25, 2026",
      risk: "Very High"
    },
    {
      id: "pm2",
      type: "NFO",
      name: "SBI Multi Asset Allocation Fund",
      category: "Hybrid",
      minInvestment: "₹1,000",
      closeDate: "Nov 02, 2026",
      risk: "High"
    },
    {
      id: "pm3",
      type: "Bond",
      name: "NHAI Tax Free Bonds",
      category: "Govt. Bond",
      yield: "7.15% p.a.",
      closeDate: "Ongoing",
      risk: "Low"
    },
    {
      id: "pm4",
      type: "Bond",
      name: "Muthoot Finance NCD",
      category: "Corporate Bond",
      yield: "8.75% p.a.",
      closeDate: "Oct 30, 2026",
      risk: "Moderate"
    }
  ]
};

module.exports = marketData;
