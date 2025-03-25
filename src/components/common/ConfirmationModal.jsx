import Loader from "./Loader";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-end bg-black bg-opacity-50 z-50">
        <div className="w-full sm:max-w-xl sm:mx-auto bg-white rounded-t-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{message}</p>
          <div className="mt-4 flex gap-4">
            <button onClick={onClose} className="px-4 py-2 w-1/2 border-2 border-gray-300 bg-transparent rounded">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 w-1/2 flex justify-center bg-red-500 text-white rounded">
              {loading ? <Loader custom='w-6 h-6'/> : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  