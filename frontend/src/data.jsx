// import { FaPiggyBank } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";
import { IoTrendingDown } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { ChartNoAxesCombined, HandCoins } from "lucide-react"; // Importing Lucide React icon
import { Bell, HelpCircle } from "lucide-react"; // Importing additional Lucide React icons

export const financeCategories = [
  {
    categoryType: "Income",
    categories: [
      { id: 1, name: "Salary" },
      { id: 2, name: "Business Income" },
      { id: 3, name: "Freelance/Side Hustle" },
      { id: 4, name: "Investments" },
      { id: 5, name: "Rental Income" },
      { id: 6, name: "Interest Income" },
      { id: 7, name: "Gifts" },
      { id: 8, name: "Refunds/Returns" },
      { id: 9, name: "Bonuses" },
      { id: 10, name: "Other Income" },
    ],
  },
  {
    categoryType: "Expense",
    categories: [
      { id: 11, name: "Rent/Mortgage" },
      { id: 12, name: "Utilities" },
      { id: 13, name: "Insurance" },
      { id: 14, name: "Subscriptions" },
      { id: 15, name: "Loan Payments" },
      { id: 16, name: "Groceries" },
      { id: 17, name: "Dining Out" },
      { id: 18, name: "Transportation" },
      { id: 19, name: "Shopping" },
      { id: 20, name: "Entertainment" },
      { id: 21, name: "Travel/Vacation" },
      { id: 22, name: "Education" },
      { id: 23, name: "Health" },
      { id: 24, name: "Household Items" },
      { id: 25, name: "Pet Expenses" },
      { id: 26, name: "Gifts & Donations" },
      { id: 27, name: "Childcare" },
      { id: 28, name: "Beauty/Personal Care" },
      { id: 29, name: "Hobbies" },
      { id: 30, name: "Miscellaneous" },
    ],
  },
  {
    categoryType: "Savings/Investments",
    categories: [
      { id: 31, name: "Emergency Fund" },
      { id: 32, name: "Retirement Savings" },
      { id: 33, name: "Stocks/Mutual Funds" },
      { id: 34, name: "Real Estate" },
      { id: 35, name: "Savings Account" },
    ],
  },
];

export const paymentMethods = [
  { id: 1, name: "Cash" },
  { id: 2, name: "Credit Card" },
  { id: 3, name: "Debit Card" },
  { id: 4, name: "Bank Transfer" },
  { id: 5, name: "PayPal" },
  { id: 6, name: "Google Pay" },
  { id: 7, name: "Apple Pay" },
  { id: 8, name: "Cryptocurrency" },
  { id: 9, name: "Cheque" },
  { id: 10, name: "Prepaid Card" },
  { id: 11, name: "Direct Deposit" },
  { id: 12, name: "UPI" },
  { id: 13, name: "Gift Card" },
  { id: 14, name: "Wallet Balance" },
  { id: 15, name: "Other" },
];

export const financeTrackerTasks = {
  tasks: [
    { name: "Budgeting", icon: "💰" }, // Money bag
    { name: "Tracking", icon: "📍" }, // Location pin
    { name: "Planning", icon: "📝" }, // Memo
    { name: "Analyzing", icon: "📊" }, // Bar chart
    { name: "Reporting", icon: "📄" }, // Document
    { name: "Saving", icon: "🏦" }, // Bank
    { name: "Investing", icon: "📈" }, // Chart increasing
    { name: "Categorizing", icon: "📂" }, // File folder
    { name: "Visualizing", icon: "👁️" }, // Eye
    { name: "Optimizing", icon: "⚙️" }, // Gear
    { name: "Monitoring", icon: "🔍" }, // Magnifying glass
    { name: "Syncing", icon: "🔄" }, // Refresh arrows
    { name: "Calculating", icon: "🧮" }, // Abacus
    { name: "Comparing", icon: "⚖️" }, // Balance scale
  ],
};

export const navLinks = {
  links: [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
  ],
};

export const sidebarLinks = [
  {
    id: 1,
    name: "Transactions",
    link: "#transactions",
    icon: <ChartNoAxesCombined />,
  },
  {
    id: 2,
    name: "Budget",
    link: "#budget",
    icon: <HandCoins />,
  },
  {
    id: 3,
    name: "Notifications",
    link: "#notifications",
    icon: <Bell />, // Using Lucide React icon
  },
  {
    id: 4,
    name: "Help",
    link: "#help",
    icon: <HelpCircle />, // Using Lucide React icon
  },
  // Add more links as needed
];

export const cardData = [
  {
    id: 1,
    icon: <TbMoneybag />,
    categoryType: "Balance",
    title: "Balance",
    bgColor: "bg-blue-600/30",
    iconColor: "text-blue-300",
  },
  {
    id: 2,
    icon: <IoTrendingUp />,
    title: "Income",
    categoryType: "income",
    bgColor: "bg-green-600/30",
    iconColor: "text-green-300",
  },
  {
    id: 3,
    icon: <IoTrendingDown />,
    title: "Expenses",
    categoryType: "expenses",
    bgColor: "bg-red-500/30",
    iconColor: "text-red-300",
  },
];
