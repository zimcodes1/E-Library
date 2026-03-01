interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-purple-600 hover:bg-purple-700'
  };

  const icons = {
    danger: 'fa-trash',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1a2e] border border-gray-700 rounded-2xl p-6 max-w-md w-11/12 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <i className={`fa ${icons[type]} text-3xl ${type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-yellow-500' : 'text-purple-500'}`}></i>
          <h2 className="text-xl font-bold text-gray-200">{title}</h2>
        </div>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${colors[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
