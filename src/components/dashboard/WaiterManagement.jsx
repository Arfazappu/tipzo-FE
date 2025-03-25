import { useState, useRef, useEffect } from "react";
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUpload,
  FaSearch,
} from "react-icons/fa";
import avatar from "../../assets/male.png";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../common/ConfirmationModal";
import axiosInstance from "../../api/api";
import Skeleton from "../common/Skeleton";
import Loader from "../common/Loader"

const WaiterManagement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [waiters, setWaiters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newWaiter, setNewWaiter] = useState({
    name: "",
    upi: "",
    image: null,
  });
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchWaiters = async () => {
      try {
        setFetching(true)
        const response = await axiosInstance.get("/waiter/get");
        setWaiters(response?.data || []);
      } catch (error) {
        enqueueSnackbar("Failed to fetch waiters.", { variant: "error" });
      } finally {
        setFetching(false)
      }
    };
    fetchWaiters();
  }, []);

  // Reset Form
  const resetForm = () => {
    setNewWaiter({ name: "", upi: "", image: null });
    setShowForm(false);
    setEditId(null);
  };

  // Handle Add Waiter
  const addWaiter = async () => {
    if (!newWaiter.name || !newWaiter.upi) return;
    const formData = new FormData();
    formData.append("name", newWaiter.name);
    formData.append("upiId", newWaiter.upi);
    if (newWaiter.image) {
      formData.append("image", newWaiter.image);
    }

    try {
      setLoading(true)
      const response = await axiosInstance.post("/waiter/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setWaiters([...waiters, response.data]);
      console.log(response.data);

      resetForm();
      enqueueSnackbar("Waiter added successfully!", { variant: "success" });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to add waiter, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false)
    }
  };

  // Handle Edit Waiter
  const startEdit = (waiter) => {
    setEditId(waiter._id);
    setNewWaiter({ name: waiter.name, upi: waiter.upiId, image: null });
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("name", newWaiter.name);
    formData.append("upiId", newWaiter.upi);
    if (newWaiter.image) {
      formData.append("image", newWaiter.image);
    }

    try {
      setLoading(true)
      const response = await axiosInstance.put(
        `/waiter/edit/${editId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setWaiters(
        waiters.map((waiter) =>
          waiter._id === editId ? response.data.waiter : waiter
        )
      );
      resetForm();
      enqueueSnackbar("Waiter updated successfully!", { variant: "success" });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false)
    }
  };

  // Open Delete Confirmation Modal
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  // Handle Delete Waiter
  const deleteWaiter = async () => {
    try {
      setLoading(true)
      await axiosInstance.delete(`/waiter/delete/${deleteId}`);
      setWaiters(waiters.filter((waiter) => waiter._id !== deleteId));
      setDeleteId(null);
      enqueueSnackbar("Waiter deleted successfully!", { variant: "success" });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete, Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false)
    }
  };

  // Filter waiters based on search query
  const filteredWaiters = waiters.filter((waiter) => {
    const query = searchQuery.toLowerCase();
    return (
      waiter.name.toLowerCase().includes(query) ||
      waiter.upiId.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Waiters</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="flex items-center px-4 py-2 bg-black text-white rounded disabled:bg-black/50 disabled:text-white/50 transition-all duration-300"
          disabled={showForm}
        >
          <FaPlus className="mr-2" /> Add Waiter
        </button>
      </div>

      {!showForm && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search waiters by name or UPI..."
            className="w-full pl-10 pr-4 py-2 bg-white text-black border border-gray-300 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Add/Edit Waiter Form */}
      <div
        ref={formRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showForm ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {showForm && (
          <div className="mb-4 p-4 bg-white shadow-md border rounded">
            <input
              type="text"
              placeholder="Waiter Name"
              className="w-full bg-white text-black border border-gray-300 p-2 mb-2 rounded"
              value={newWaiter.name}
              autoFocus
              disabled={loading}
              onChange={(e) =>
                setNewWaiter({ ...newWaiter, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="UPI ID"
              className="w-full bg-white text-black border border-gray-300 p-2 mb-2 rounded"
              value={newWaiter.upi}
              disabled={loading}
              onChange={(e) =>
                setNewWaiter({ ...newWaiter, upi: e.target.value })
              }
            />
            <label className="flex items-center cursor-pointer bg-gray-200 p-2 rounded text-gray-700">
              <FaUpload className="mr-2" />
              {newWaiter.image ? "Image Selected" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={loading}
                onChange={(e) =>
                  setNewWaiter({ ...newWaiter, image: e.target.files[0] })
                }
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowForm(!showForm)
                  resetForm();
                }}
                className="w-full py-2 border-2 border-black text-black rounded"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={editId ? saveEdit : addWaiter}
                className="w-full flex justify-center py-2 bg-black text-white rounded"
                disabled={loading}
              >
                {loading ? <Loader custom='w-6 h-6'/> : editId ? "Save" : "Add Waiter"}
              </button>
            </div>
          </div>
        )}
      </div>

      {fetching && Array(5).fill(null).map((_, index) => <Skeleton key={index} />)}

      {/* Waiter List */}
      {!fetching && (
        <div className="space-y-3">
        {filteredWaiters.length > 0 ? (
          filteredWaiters.map((waiter) => (
            <div
              key={waiter._id}
              className="flex items-center bg-white shadow-md p-3 rounded border"
            >
              {/* Waiter Image */}
              <img
                src={waiter.image || avatar}
                alt={waiter.name}
                className="w-12 h-12 rounded-full border border-gray-400"
                loading="lazy"
              />
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="font-semibold">{waiter.name}</p>
                <p className="text-gray-600 text-sm truncate">UPI: {waiter.upiId}</p>
              </div>

              {/* Edit & Delete Icons */}
              <div className="flex space-x-3">
                <button
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => startEdit(waiter)}
                  disabled={showForm}
                >
                  <FaPen />
                </button>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => confirmDelete(waiter._id)}
                  disabled={showForm}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 bg-gray-100 rounded">
            <p className="text-gray-500">No waiters found.</p>
          </div>
        )}
      </div>
      )}
      
      <ConfirmationModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteWaiter}
        loading={loading}
        title="Confirm Deletion"
        message="Are you sure you want to delete this waiter?"
      />
    </div>
  );
};

export default WaiterManagement;
