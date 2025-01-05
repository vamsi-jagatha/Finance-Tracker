import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Transactions from "./pages/Transactions";
import ThemeProvider from "./context/ThemeProvider";
import ProtectedRoute from "./ProtectedRoute";

// Layout component
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/transactions"
            element={
              <Layout>
                <Transactions />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
