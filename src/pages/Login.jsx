import CommonForm from "../components/auth/CommonForm";
import logo from "../assets/tip-app-logo.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axiosInstance from "../api/api";
import BackButton from "../components/common/BackButton";

export default function LoginPage() {
  const {login, token} = useAuth()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (token) {
        navigate("/dashboard");
      }
    }, [token, navigate]);
  

  const handleLogin = async(formData) => {
    // console.log("Login data:", formData);

    const payload = {
      phone: formData.phone,
      password: formData.password
    }
    
    try {
      setLoading(true)
      const res = await axiosInstance.post('auth/login', payload)
      const data = res?.data;
      login(data, data?.token)
      enqueueSnackbar('Logging in Successfully', {variant:'success'})
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }finally{
      setLoading(false)
    }

  };

  const loginFields = [
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <BackButton/>
      
      <div >
        <img src={logo} alt="tipzo" className="h-14" />
      </div>

      {/* Login Form */}
      <CommonForm
        title="Sign in to your account"
        fields={loginFields}
        submitText="Sign In"
        onSubmit={handleLogin}
        loading={loading}
        alternateLink={{
          text: "Don't have an account?",
          href: "/register",
          linkText: "Register",
        }}
      />
    </div>
  );
}
