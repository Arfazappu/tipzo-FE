import { useState } from "react";
import { FaUser, FaQrcode } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";
import logo from "../assets/tip-app-logo.png";
import WaiterManagement from "../components/dashboard/WaiterManagement";
import QRCodeSection from "../components/dashboard/QRCodeSection";
import ProfileSection from "../components/dashboard/ProfileSection";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("waiters");
  
    return (
      <div className="min-h-screen p-4 sm:max-w-xl sm:mx-auto bg-white text-black">
        {/* Logo */}
        <div className="w-fit mx-auto mb-4">
          <img src={logo} alt="tipzo" className="h-12" />
        </div>
  
        {/* Header */}
        <h1 className="text-lg font-semibold text-center">Restaurant Dashboard</h1>
  
        {/* Navigation Tabs */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-6 py-2 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
              activeTab === "waiters"
                ? "border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("waiters")}
          >
            <FaUser className="inline text-lg mb-1" /> <br /> 
            <span className="">Waiters</span>
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
              activeTab === "qrcode"
                ? "border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("qrcode")}
          >
            <FaQrcode className="inline text-lg mb-1" /> <br /> 
            <span className="">QR</span>
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
              activeTab === "profile"
                ? "border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <MdOutlineRestaurant className="inline text-lg mb-1"/> <br /> 
            <span className="">Restaurant</span>
          </button>
        </div>
  
        {/* Dynamic Section Rendering */}
        {activeTab === "waiters" && <WaiterManagement />}
        {activeTab === "qrcode" && <QRCodeSection />}
        {activeTab === "profile" && <ProfileSection />}
      </div>
    );
  };
  
  export default Dashboard;