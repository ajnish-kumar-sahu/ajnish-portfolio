import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminProvider } from "./contexts/AdminContext";
import { SEO } from "./components/SEO";
import { AnimatedRoutes } from "./components/Layout/AnimatedRoutes";
import { CustomCursor } from "./components/UI/CustomCursor";
import { ScrollProgress } from "./components/UI/ScrollProgress";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <ScrollProgress />
          <CustomCursor />
          <SEO />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--toast-bg)",
                color: "var(--toast-color)",
                border: "1px solid var(--toast-border)",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#FFFFFF",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FFFFFF",
                },
              },
            }}
          />
          <AnimatedRoutes />
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
