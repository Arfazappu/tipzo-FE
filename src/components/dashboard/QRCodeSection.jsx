import { FaDownload } from "react-icons/fa";
import dummyQR from "../../assets/dummyQrcode.png";
import { handleCreateAndDownloadQR } from "../../utils/CreateQrCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/api";
import { useSnackbar } from "notistack";

const QRCodeSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({})
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    fetchQr();
  }, []);

  const fetchQr = async () => {
    try {
      setFetching(true)
      const res = await axiosInstance.get("restaurant/qrcode");
      setData(res.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to add waiter, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setFetching(false)
    }
  };

  return (
    <div className="mt-6 text-center">
      {/* Simplified View */}
      <div className="flex flex-col items-center">
        {/* QR Code Only */}
        <div className="relative inline-block p-4 rounded-md border bg-gradient-to-r from-gray-100 to-gray-200">
          {fetching ? (
            <div className="w-56 h-56 mx-auto rounded-md animate-pulse bg-gray-400"></div>
          ) : (
          <img src={data?.qrCode}
            alt="QR Code"
            className="w-56 h-56 mx-auto rounded-md"
            loading="lazy"
          />
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={() => handleCreateAndDownloadQR(data)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition mt-4"
        >
          <FaDownload className="mr-2" />
          Download QR Card
        </button>

        {/* Short Instruction */}
        <div className="mt-4 text-gray-600 text-sm">
          <p>
            This is your restaurant QR code. Customers can scan this to make tip
            directly to your waiters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;
