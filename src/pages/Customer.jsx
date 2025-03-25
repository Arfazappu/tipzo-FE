import React, { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import avatar from "../assets/barista.png";
import logo from "../assets/tip-app-logo.png";
import { IoMdRestaurant } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import TipPaymentModal from "../components/common/TipPaymentModal";
import axiosInstance from "../api/api";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Skeleton from "../components/common/Skeleton";
import Loader from "../components/common/Loader";

function Customer() {
  const { id: restaurantId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    restaurant: "",
    waiters: [],
  });

  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [amount, setAmount] = useState("0");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWaiters();
  }, []);

  const fetchWaiters = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(
        `/restaurant/${restaurantId}/waiters`
      );
      const data = response?.data || {};
      setData(data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setFetching(false);
    }
  };

  const openTipModal = (waiter) => {
    setSelectedWaiter(waiter);
    setAmount("0"); // Reset amount field
  };

  const closeTipModal = () => {
    setSelectedWaiter(null);
    setAmount("0");
  };

  // 2nd approach

  const handleTipPay = async (waiter) => {
    window.location.href = `paytmmp://upi/pay?pa=arfazmohammed515@okhdfcbank&pn=Waiter&am=1&cu=INR`;
    // try {
    //   setLoading(true)
    //   const payload = {
    //     waiterName: waiter.name,
    //     waiterUPI: waiter.upiId,
    //   };
    //   const res = await axiosInstance.post(
    //     "/restaurant/generate-waiter-qr",
    //     payload
    //   );
    //   const qrCodeDataURL = res?.data?.qrCodeDataURL;

    //   if (qrCodeDataURL) {
    //     if (navigator.share) {
    //       try {
    //         // Convert data URL to a Blob
    //         const response = await fetch(qrCodeDataURL);
    //         const blob = await response.blob();

    //         // Create a File from the Blob
    //         const file = new File(
    //           [blob],
    //           `Tip-${waiter.name}.png`,
    //           { type: "image/png" }
    //         );

    //         // Share the QR code image
    //         await navigator.share({
    //           title: `Tip ${waiter.name}`,
    //           text: `Tip payment for ${waiter.name}`,
    //           files: [file],
    //         });

    //         return;
    //       } catch (shareError) {
    //         enqueueSnackbar('Failed to pay, Please try again.', { variant: "error" });
    //       }
    //     }
    //   }
    // } catch (error) {
    //   const errorMessage =
    //     error?.response?.data?.message || "Failed to pay, Please try again.";
    //   enqueueSnackbar(errorMessage, { variant: "error" });
    // } finally{
    //   setLoading(false)
    // }
  };

  return (
    <div className="min-h-screen p-4 sm:max-w-xl sm:mx-auto bg-white text-black">

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Loader custom='w-12 h-12' />
      </div>
      )}

      {/* Logo */}
      <div className="w-fit mx-auto mb-4">
        <img src={logo} alt="tipzo" className="h-12" />
      </div>

      {/* Restaurant Name */}
      <h1 className="text-lg flex items-center justify-center gap-2 font-semibold text-center">
        <IoMdRestaurant />
        {data?.restaurant || "Restaurant name"}
      </h1>

      {/* Friendly Message */}
      <p className="text-center text-gray-600 mt-2 font-medium">
        Select the waiter, enter the amount, and pay through UPI app. Thank you
        for tipping! 😊
      </p>

      {/* Waiter List */}
      {fetching ? (
        Array(5)
          .fill(null)
          .map((_, index) => <Skeleton key={index} />)
      ) : (
        <div className="space-y-3 mt-4">
          {data?.waiters?.length > 0 ? (
            data?.waiters.map((waiter) => (
              <div
                key={waiter._id}
                className="flex items-center bg-white shadow-md pr-3 rounded border"
              >
                {/* Waiter Image */}
                <img
                  src={waiter.image || avatar}
                  alt={waiter.name}
                  className="w-24 h-24 border bg-gray-100"
                  loading="lazy"
                />
                <div className="ml-3 flex-1 overflow-hidden">
                  <p className="font-semibold">{waiter.name}</p>
                  <p className="text-gray-600 text-sm truncate">
                    UPI: {waiter.upiId}
                  </p>
                </div>

                {/* Tip Button - 1st approach upi deeplink - some issues */}
                {/* <button
                  className="flex items-center gap-1 px-4 py-2 font-semibold rounded-sm bg-black text-white"
                  onClick={() => openTipModal(waiter)}
                >
                  <GiTakeMyMoney /> Tip
                </button> */}

                {/* Tip Button - 2nd approach, qr sharing */}
                <button
                  className="flex items-center gap-1 px-4 py-2 font-semibold rounded-sm bg-black text-white"
                  onClick={() => handleTipPay(waiter)}
                >
                  <GiTakeMyMoney /> Tip
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4 bg-gray-100 rounded">
              <p className="text-gray-500">No waiters found.</p>
            </div>
          )}
        </div>
      )}

      {/* Full-Screen Tip Modal */}
      {selectedWaiter && (
        <TipPaymentModal
          selectedWaiter={selectedWaiter}
          amount={amount}
          setAmount={setAmount}
          closeTipModal={closeTipModal}
        />
      )}
    </div>
  );
}

export default Customer;
