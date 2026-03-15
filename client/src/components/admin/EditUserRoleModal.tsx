import { useState } from 'react';

interface EditUserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: string, isActive: boolean) => void;
  user: {
    username: string;
    role: string;
    isActive: boolean;
  };
}

const EditUserRoleModal = ({ isOpen, onClose, onSave, user }: EditUserRoleModalProps) => {
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(role, isActive);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1a2e] border border-gray-700 rounded-2xl p-6 max-w-md w-11/12 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <i className="fa fa-user-edit text-3xl text-purple-500"></i>
          <h2 className="text-xl font-bold text-gray-200">Edit User</h2>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-400 mb-4">Editing: <span className="text-gray-200 font-semibold">{user.username}</span></p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <select
                value={isActive ? 'active' : 'inactive'}
                onChange={(e) => setIsActive(e.target.value === 'active')}
                className="w-full h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserRoleModal;
