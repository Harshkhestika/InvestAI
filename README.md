# InvestAI - Next-Generation AI Financial Platform

InvestAI is a premium, full-stack financial research and portfolio management platform. It combines state-of-the-art web performance with sleek, modern glassmorphism design principles to deliver an unparalleled user experience.

---

## 📁 Folder Structure

### Backend (Node.js / Express)
```text
backend/
├── src/
│   ├── controllers/       # Business logic (authController, aiController, marketController, etc.)
│   ├── data/              # Mock data repositories for market feeds
│   ├── middleware/        # Express middleware (authMiddleware for JWT validation)
│   ├── models/            # Mongoose schemas (User, Investment, ChatHistory)
│   ├── routes/            # API routing logic (authRoutes, aiRoutes, etc.)
│   ├── services/          # External API or AI logic (aiService.js)
│   └── server.js          # Main application entry point and MongoDB connection
├── package.json           # Backend dependencies
└── .env                   # Environment variables (JWT_SECRET, MONGO_URI)
```

### Frontend (React / Vite)
```text
frontend/
├── public/                # Static assets (images, icons, favicons)
├── src/
│   ├── assets/            # Local asset imports
│   ├── components/        # Reusable UI elements (Navbar, Sidebar, DashboardLayout, DisclaimerModal)
│   ├── context/           # React Context (AuthContext for state management)
│   ├── pages/             # Route-level components (Home, Login, Dashboard, Analysis, MarketTrends, etc.)
│   ├── services/          # API wrapper (api.js using Axios)
│   ├── App.jsx            # Main Router setup
│   ├── index.css          # Global CSS variables and glassmorphism styling
│   └── main.jsx           # React DOM rendering
├── index.html             # HTML entry point
├── package.json           # Frontend dependencies
└── vite.config.js         # Vite bundler configuration
```

---

## 🗄️ Database Structure (MongoDB)

The application utilizes a NoSQL database (MongoDB) with the following core collections (Schemas):

### 1. `User` Schema
Handles authentication and user profiles.
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Hashed, Required)
- `createdAt` (Timestamp)

### 2. `Investment` Schema (Portfolio)
Tracks a user's stock holdings.
- `user` (ObjectId, Ref: 'User')
- `symbol` (String, Required)
- `shares` (Number, Required)
- `averagePrice` (Number, Required)
- `currentPrice` (Number, Required)

### 3. `ChatHistory` Schema
Persists conversations with the AI Chat Assistant.
- `userId` (ObjectId, Ref: 'User')
- `messages` (Array of Objects): Contains `question` (String) and `answer` (String)

---

## 🌐 Landing Page Details (Section by Section)

The Landing Page (`Home.jsx`) is designed to convert visitors into users by showcasing the platform's power through a seamless scroll experience.

1. **Hero Section**: A visually striking entry point featuring a dynamic, glowing gradient background, the main value proposition, and a clear Call-to-Action (CTA) to "Start Exploring".
2. **Key Features Section**: A sleek, 3-column glassmorphism grid detailing the core features: Real-Time Insights, AI-Powered Analytics, and Comprehensive Portfolio Management.
3. **Interactive Demo/Visual Section**: Displays mockups or premium icons representing the dashboard interface, proving the aesthetic quality of the app.
4. **Trusted By / Market Data Ticker**: A continuous horizontal scrolling ticker displaying live (mocked) stock market data.
5. **Footer**: Contains links to the Terms & Conditions, Legal Disclaimer, and contact information.

---

## 📧 Welcome to Invest.AI (Email Protocol)

*Note: When a user successfully registers for an account, the system is designed to trigger the following automated welcome email.*

**Subject: Congratulations! Welcome to the Future of Investing with InvestAI 🎉**

**Body:**
> Dear [User Name],
>
> Congratulations on successfully joining **InvestAI**! You have just unlocked access to institutional-grade financial research powered by advanced artificial intelligence.
> 
> **How to Run & Use the Platform:**
> 1. Log in to your dashboard using the email and password you just created.
> 2. Accept the Legal Disclaimer to enter the workspace.
> 3. Head over to the **Market Trends** tab to see real-time updates and IPOs.
> 4. Use the **AI Analysis** tool to search for specific companies and get instant AI verdicts.
>
> **Important Terms:**
> Please ensure you read our Terms and Conditions and our Legal Disclaimer. InvestAI provides algorithmic data analysis, but it does not constitute binding financial advice. Always consult with a certified financial planner.
>
> Welcome aboard,  
> *The InvestAI Team*

---

## 🚀 How to Use the Application (Step-by-Step Guide)

Here is a comprehensive guide to navigating the user sections of the platform:

### Step 1: Registration & Login
- Navigate to the **Sign Up** page.
- Enter a valid name, email, and password to create your secure account.
- Upon successful registration, you will be automatically logged in and redirected to the Dashboard.

### Step 2: The Dashboard & Legal Disclaimer
- Upon your first login of the session, a **Disclaimer Modal** will appear. You must read and "Accept" the terms before proceeding.
- The Dashboard serves as your central hub, displaying a quick overview of your net worth and quick links to various sectors.

### Step 3: Navigating the Sidebar
The left-hand sidebar is your navigation remote. It contains:
- **Profile**: View your account details.
- **AI Analysis**: The core feature.
- **Portfolio**: Track your holdings.
- **Investment Sectors**: Browse stocks by industry.
- **Market Trends**: View broad market movements.

### Step 4: Using the AI Analysis Tool
- Click on **AI Analysis** in the sidebar.
- In the premium search bar, type the name of a company (e.g., "Reliance" or "TCS").
- Click the "Analyze" button.
- The UI will split into two columns: 
  - **Left**: Detailed Financial Fundamentals (P/E Ratio, Market Cap, Beta, etc.).
  - **Right**: The AI Verdict Card, which dictates a BUY/SELL/HOLD action, Target Price, and a suggested investment amount based on algorithmic reasoning.

### Step 5: Exploring Market Trends
- Navigate to **Market Trends**.
- Click on the accordion dropdowns to view:
  - **Upcoming IPOs**: Click "Check Details" to view a modal with lot sizes and company descriptions.
  - **Primary Market**: View Mutual Fund NFOs and Bonds.
  - **Daily Updates**: Read the latest financial news impacting the markets.

### Step 6: Chatting with the Assistant
- Have a specific financial question? Navigate to the **Chat Assistant** page.
- Type your query (e.g., "What is a good P/E ratio?") and receive instant, AI-generated responses tailored to financial education.
