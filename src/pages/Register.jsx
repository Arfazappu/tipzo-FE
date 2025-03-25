import CommonForm from "../components/auth/CommonForm";
import logo from "../assets/tip-app-logo.png"
import { useAuth } from "../hooks/AuthContext";
import axiosInstance from "../api/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import BackButton from "../components/common/BackButton";


export default function RegisterPage() {
  const {login, token} = useAuth()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);


  const handleRegister = async(formData) => {
    // console.log("Registration data:", formData);

    const payload = {
      name: formData.restaurantName,
      phone: formData.phone,
      password: formData.password
    }
    
    try {
      setLoading(true)
      const res = await axiosInstance.post('auth/register', payload)
      const data = res?.data;
      login(data, data?.token)
      enqueueSnackbar('Registered Successfully', {variant:'success'})
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }finally{
      setLoading(false)
    }
  };

  const registerFields = [
    {
      id: "restaurantName",
      label: "Restaurant Name",
      type: "text",
      placeholder: "Enter your restaurant name",
      required: true,
    },
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
      placeholder: "Create a password",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <BackButton/> 
      
      <div>
        <img src={logo} alt="tipzo" className="h-14" />
      </div>

      <CommonForm
        title="Create a new account"
        fields={registerFields}
        submitText="Register"
        onSubmit={handleRegister}
        loading={loading}
        alternateLink={{
          text: "Already have an account?",
          href: "/login",
          linkText: "Sign In",
        }}
      />
    </div>
  );
}
