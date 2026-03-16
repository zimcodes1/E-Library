import { useState } from 'react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  loading?: boolean;
}

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, loading }: DeleteAccountModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
  };

  const handleClose = () => {
    setPassword('');
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#31303e] rounded-lg p-6 w-full max-w-md border border-red-500">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
            <i className="fa fa-exclamation-triangle"></i>
            Delete Account
          </h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <i className="fa fa-times"></i>
          </button>
        </div>

        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm mb-2">
            <strong>Warning:</strong> This action cannot be undone.
          </p>
          <ul className="text-red-300 text-xs space-y-1">
            <li>• All your uploaded books will be deleted</li>
            <li>• Your reading progress will be lost</li>
            <li>• Your reviews and ratings will be removed</li>
            <li>• Your account data will be permanently deleted</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Enter your password to confirm deletion
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#4857605a] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                placeholder="Your current password"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-300">
              Show password
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password || loading}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition"
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;