import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import avatar from "../../assets/barista.png";
import axiosInstance from "../../api/api";
import { useSnackbar } from "notistack";
import Loader from "./Loader"

function TipPaymentModal({ selectedWaiter, amount, setAmount, closeTipModal }) {
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)

    const handlePayClick = async() => {
        try {
          setLoading(true)
            const payload = {
                waiterUPI:selectedWaiter.upiId,
                waiterName:selectedWaiter.name,
                amount: amount
            }
            
            const res = await axiosInstance.post('/restaurant/generate-upi-link',payload)
            const upiIntentLink = res?.data?.upiLink

            if (upiIntentLink) {
                window.location.href = upiIntentLink; 
            } else {
                throw new Error("Failed to pay, Please try again.");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Failed to pay, Please try again."
            enqueueSnackbar(errorMessage, {variant:error})
        } finally{
          setLoading(false)
        }
    }
    
  // Handle amount change with restrictions
  const handleAmountChange = (e) => {
    let value = e.target.value;

    // Prevent non-numeric characters (except empty input)
    if (!/^\d*$/.test(value)) return;

    // Convert to number, apply limits
    let numericValue = value === "" ? "" : Math.min(Math.max(parseInt(value, 10) || 0, 0), 500000);

    setAmount(numericValue);
  };

  return (
    <div className="fixed inset-0 sm:max-w-xl sm:mx-auto bg-white flex flex-col items-center justify-center p-4">
      {/* Close Button */}
      <button className="absolute top-4 left-4 text-black text-3xl" onClick={closeTipModal}>
        <IoClose />
      </button>

      {/* Waiter Image */}
      <img
        src={selectedWaiter.image || avatar}
        alt={selectedWaiter.name}
        className="w-20 h-20 rounded-full bg-gray-200 mb-3"
      />

      {/* Waiter Info */}
      <h2 className="text-xl font-semibold">Paying {selectedWaiter.name}</h2>
      <p className="text-gray-500">Thank you for tipping! 😊</p>

      {/* Amount Input (₹ and amount side by side) */}
      <div className="flex items-center justify-center gap-2 mt-4 pb-2">
        {/* <span className="text-6xl font-semibold">₹</span> */}
        <input
          type="text"
          className="w-full text-6xl font-semibold text-center outline-none appearance-none leading-none
          [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="0"
          value={amount}
          autoFocus
          onChange={handleAmountChange}
          disabled={loading}
        />
      </div>

      {/* Pay Button (Fixed at Bottom) */}
      <div className="fixed bottom-4 w-full max-w-md px-4">
        <button
          className={`w-full flex justify-center py-4 text-white text-lg font-medium rounded-full ${
            amount > 0 ? "bg-black" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={amount <= 0}
          onClick={handlePayClick}
        >
          {loading ? <Loader custom='w-8 h-8'/> : `Pay ₹${amount || "0"}`}
          
        </button>
      </div>
    </div>
  );
}

export default TipPaymentModal;
