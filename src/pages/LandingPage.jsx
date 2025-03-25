import React, { useState } from "react";
import logo from "../assets/tip-app-logo.png";
import upi from "../assets/upi.png";
import hero from "../assets/hero-img.png";
import demo1 from "../assets/vid-demo1.gif";
import demo2 from "../assets/vid-demo2.gif";
import { FaArrowRight } from "react-icons/fa6";
import { useAuth } from "../hooks/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const { token } = useAuth();
  const navigate = useNavigate()

  const handleNavigate = () => {
    const route = token ? '/dashboard' : '/register';
    navigate(route)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white p-4">
      <div className="w-full bg-[#F3F3F3] rounded-xl overflow-hidden shadow-sm">
        <header className="w-full flex items-center justify-between py-6 px-8">
          <img src={logo} alt="tipzo" className="h-12" loading="lazy"/>
          <button onClick={handleNavigate} className="hidden sm:flex items-center gap-1 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
            {token ? "Dashboard" : "Get Started"} <FaArrowRight />
          </button>
        </header>

        <section className="w-full px-8 py-16 md:py-2">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                Say Goodbye to Cash
                <br />
                <span className="flex">
                  Tip Seamlessly via UPI{" "}
                  <img src={upi} alt="upi" className="h-4" /> Apps!
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Quick,
                <br />
                Smarter
              </h1>
              <button onClick={handleNavigate} className="mt-6 px-6 py-3 bg-black text-white rounded-full text-sm font-medium flex items-center gap-2">
                {token ? "Dashboard" : "Get Started"}{" "}
                <FaArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <div className="relative h-[500px] w-full">

              <div className="absolute top-[5%] sm:top-[10%] left-[2%] sm:left-[5%] transform -rotate-3 sm:-rotate-6 animate-float-slow z-10">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 sm:p-4 rounded-xl shadow-lg w-28 sm:w-32">
                    <div className="text-white font-bold text-base sm:text-lg mb-1">Scan</div>
                    <p className="text-white text-[10px] sm:text-xs">Scan QR code on your table</p>
                  </div>
                </div>
                
                {/* Select Waiter Card - Adjusted for mobile */}
                <div className="absolute top-[35%] sm:top-[30%] right-[2%] sm:right-[5%] transform rotate-3 sm:rotate-6 animate-float-medium z-10">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 sm:p-4 rounded-xl shadow-lg w-32 sm:w-36">
                    <div className="text-white font-bold text-base sm:text-lg mb-1">Select Waiter</div>
                    <p className="text-white text-[10px] sm:text-xs">Choose who served you</p>
                  </div>
                </div>
                
                {/* Pay UPI Card - Adjusted for mobile */}
                <div className="absolute bottom-[10%] sm:bottom-[15%] left-[5%] sm:left-[10%] transform rotate-2 sm:rotate-3 animate-float-fast z-10">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 sm:p-4 rounded-xl shadow-lg w-32 sm:w-36">
                    <div className="text-white font-bold text-base sm:text-lg mb-1">Pay via UPI</div>
                    <p className="text-white text-[10px] sm:text-xs">Quick payment with any UPI app</p>
                  </div>
                </div>

                <div className="relative order-2 md:order-1 flex justify-center">
                  {/* Phone Frame */}
                  <div className="relative w-[200px] h-[410px] sm:w-[220px] sm:h-[440px] bg-black rounded-[30px] p-2 sm:p-3 shadow-xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-white rounded-[25px] overflow-hidden relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-4 sm:h-5 bg-black rounded-b-xl z-10"></div>

                      {/* Image Placeholder */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="relative w-full h-full">
                          <img
                            src={hero}
                            alt="Tipzo App"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full px-8 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="flex justify-center gap-2 text-4xl md:text-5xl font-bold mb-8">
            How tipzo works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple three-step process that makes tipping seamless for both
            restaurants and customers.
          </p>

          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex bg-gray-100 p-1 rounded-full">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "restaurant"
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 hover:text-black"
                }`}
                onClick={() => setActiveTab("restaurant")}
              >
                Restaurants
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "customer"
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 hover:text-black"
                }`}
                onClick={() => setActiveTab("customer")}
              >
                Customers
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Mobile frame with video */}
          <div className="relative order-2 md:order-1 flex justify-center">
                  {/* Phone Frame */}
                  <div className="relative w-[200px] h-[410px] sm:w-[220px] sm:h-[440px] bg-black rounded-[30px] p-2 sm:p-3 shadow-xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-white rounded-[25px] overflow-hidden relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-4 sm:h-5 bg-black rounded-b-xl z-10"></div>

                      {/* Image Placeholder */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="relative w-full h-full">
                          <img
                            src={activeTab === 'restaurant' ? demo1 : demo2}
                            alt="Tipzo App"
                            className="object-cover h-full"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

          {/* Right side: Roadmap with 01, 02, 03 */}
          <div className="space-y-8 order-1 md:order-2">
            {activeTab === "restaurant" ? (
              <>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Register Your Restaurant
                    </h3>
                    <p className="text-gray-600">
                      Sign up and add your restaurant details in just a few
                      minutes. No complicated setup—get started
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Add Your Waitstaff
                    </h3>
                    <p className="text-gray-600">
                      Add your waiters to Tipzo, link their UPI IDs, and enable
                      them to receive tips directly—no intermediaries, no
                      hassle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Generate QR Codes
                    </h3>
                    <p className="text-gray-600">
                      Generate a unique QR code and place it in table. Customers
                      simply scan, select, and tip—seamlessly!
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Scan the QR Code</h3>
                    <p className="text-gray-600">
                      Just scan the QR code on your table—no app downloads
                      needed!
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Select Your Waiter
                    </h3>
                    <p className="text-gray-600">
                      Pick the waiter who made your experience great and send
                      them a direct tip.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium text-lg">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pay via UPI</h3>
                    <p className="text-gray-600">
                      Enter the tip amount and pay directly using your preferred
                      UPI app like Google Pay, Paytm, or PhonePe.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-8 py-16 bg-black text-white rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Upgrade Your Tipping Experience—Go Digital Today!
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join Tipzo and make tipping effortless for your customers and staff.
          </p>
          <button onClick={handleNavigate} className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all">
            {token ? "Dashboard" : "Get Started"}
          </button>
        </div>
      </section>

      <footer className="w-full py-6 sm:py-8 px-4 sm:px-8 bg-white border-t border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-6 sm:h-8">
            <img src={logo} alt="tipzo" className="h-12" />
          </div>
          <p className="text-xs mt-4 sm:text-sm text-gray-500">
            Built with ❤️ by{" "}
            <a href="https://www.linkedin.com/in/arfaz-ahmed">Arfaz Ahmed</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
