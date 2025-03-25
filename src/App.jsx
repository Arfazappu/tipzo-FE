import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customer = lazy(() => import("./pages/Customer"));

function App() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/tip/:id" element={<Customer />} />
      </Routes>
    </Suspense>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
};
