import { useEffect, useState } from "react";
import { FaPowerOff, FaPen } from "react-icons/fa6";
import ConfirmationModal from "../common/ConfirmationModal";
import axiosInstance from "../../api/api";
import { useSnackbar } from "notistack";
import {useAuth} from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import Skeleton from "../common/Skeleton";
import Loader from "../common/Loader";

const ProfileSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetching(true);
      const res = await axiosInstance.get("/restaurant/getInfo");
      setProfile(res.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to get info, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    logout();
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile({ ...profile });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        "/restaurant/updateInfo",
        tempProfile
      );
      fetchProfile();
      setIsEditing(false);
      enqueueSnackbar("Updated successfully", { variant: "success" });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white shadow-md border p-4 rounded">
      {isEditing ? (
        // Edit Form
        <div>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={tempProfile.name}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, name: e.target.value })
            }
            disabled={loading}
          />
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={tempProfile.phone}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, phone: e.target.value })
            }
            disabled={loading}
          />
          <div className="flex justify-end gap-2">
            <button
              className="w-full py-2 border-2 border-black text-black rounded"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="w-full flex justify-center py-2 bg-black text-white rounded"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <Loader custom="w-6 h-6" /> : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {fetching ? (
            <Skeleton />
          ) : (
            // Profile View
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-gray-600 text-sm">{profile.phone}</p>
                </div>
                <button
                  className="text-black hover:text-blue-500 text-sm flex items-center gap-1"
                  onClick={handleEdit}
                >
                  <FaPen /> Edit
                </button>
              </div>

              {/* Logout Button (Hidden in Edit Mode) */}
              <button
                className="w-full flex items-center justify-center gap-2 mt-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPowerOff /> Logout
              </button>

              {/* Logout Confirmation Modal */}
              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSection;
