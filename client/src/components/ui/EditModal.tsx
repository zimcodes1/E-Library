interface EditModalProps {
	isOpen: boolean;
	title: string;
	value: string;
	onChange: (value: string) => void;
	onSave: () => void;
	onClose: () => void;
	type?: 'text' | 'email' | 'textarea';
	placeholder?: string;
}

const EditModal = ({ isOpen, title, value, onChange, onSave, onClose, type = 'text', placeholder }: EditModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-[#31303e] border border-gray-700 rounded-2xl p-6 w-96 max-sm:w-11/12">
				<h3 className="text-xl font-bold text-gray-50 mb-4">{title}</h3>
				{type === 'textarea' ? (
					<textarea
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="w-full p-3 bg-[#4857605a] border border-gray-700 rounded-lg text-gray-200 outline-none resize-none"
						rows={4}
						placeholder={placeholder}
					/>
				) : (
					<input
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="w-full p-3 bg-[#4857605a] border border-gray-700 rounded-lg text-gray-200 outline-none"
						placeholder={placeholder}
					/>
				)}
				<div className="flex gap-3 mt-4">
					<button
						onClick={onSave}
						className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
