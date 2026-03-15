import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getToken, isAuthenticated } from "../utils/auth";
import { getAvatarUrl } from "../utils/avatarUtils";
import API_BASE_URL from "../utils/auth/config";

function AdminLogin() {
	const [user, setUser] = useState<any>(null);
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Admin Login | Libronet";
		
		if (!isAuthenticated()) {
			navigate("/login");
			return;
		}

		const currentUser = getUser();
		if (!currentUser?.is_staff) {
			navigate("/home");
			return;
		}

		setUser(currentUser);
	}, [navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch(`${API_BASE_URL}/auth/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: user.username,
					password: password,
				}),
			});

			if (!response.ok) {
				throw new Error("Invalid password");
			}

			navigate("/admin/dashboard");
		} catch (err: any) {
			setError(err.message || "Invalid password. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (!user) return null;

	return (
		<div className="w-full min-h-screen flex justify-center items-center bg-[#060410] relative">
			<button
				onClick={() => navigate(-1)}
				className="absolute top-5 left-5 flex items-center gap-2 text-gray-300 hover:text-purple-400 transition"
			>
				<i className="fa fa-arrow-left"></i>
				<span>Back</span>
			</button>

			<div className="w-96 max-sm:w-11/12 bg-[#48576019] border border-gray-700 rounded-2xl p-8 flex flex-col items-center">
				<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 mb-4">
					<img
						src={getAvatarUrl(user.avatar_url)}
						alt={user.username}
						className="w-full h-full object-cover"
					/>
				</div>

				<h2 className="text-2xl font-bold text-gray-50 mb-2">
					{user.username}
				</h2>
				<p className="text-gray-400 text-sm mb-6">Admin Access</p>

				<form onSubmit={handleSubmit} className="w-full">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						className="w-full h-12 px-4 rounded-lg bg-purple-500/5 border border-purple-500/20 text-gray-300 outline-none focus:border-purple-500 transition"
						required
						autoFocus
					/>

					{error && (
						<p className="text-red-400 text-sm mt-3 text-center">{error}</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full h-12 mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
					>
						{loading ? "Verifying..." : "Continue to Dashboard"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default AdminLogin;
