import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./components/Auth";

createRoot(document.body).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
