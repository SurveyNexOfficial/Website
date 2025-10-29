import { Calendar, Camera, DollarSign, Edit, Eye, Mail, MapPin, Star, Trophy, User } from "lucide-react";

const ProfileSection = () => {
	return (
		<div className="space-y-6">
			{/* Profile Header */}
			<div className="bg-white rounded-sm border border-neutral-200 p-6">
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
					<div className="relative">
						<div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center">
							<User size={32} className="text-neutral-600" />
						</div>
						<button className="absolute -bottom-1 -right-1 bg-neutral-900 text-white rounded-full p-1.5 hover:bg-neutral-800">
							<Camera size={14} />
						</button>
					</div>
					<div className="flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							<div>
								<h1 className="text-2xl font-bold text-neutral-900">John Doe</h1>
								<p className="text-neutral-600">Survey Participant</p>
							</div>
							<button className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white rounded-sm hover:bg-neutral-800 transition-colors text-sm">
								<Edit size={16} className="mr-2" />
								Edit Profile
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white rounded-sm border border-neutral-200 p-4">
					<div className="flex items-center">
						<Trophy className="text-amber-600 mr-3" size={20} />
						<div>
							<p className="text-2xl font-bold text-neutral-900">247</p>
							<p className="text-sm text-neutral-600">Surveys Completed</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-sm border border-neutral-200 p-4">
					<div className="flex items-center">
						<DollarSign className="text-green-600 mr-3" size={20} />
						<div>
							<p className="text-2xl font-bold text-neutral-900">1,250</p>
							<p className="text-sm text-neutral-600">Points Earned</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-sm border border-neutral-200 p-4">
					<div className="flex items-center">
						<Star className="text-blue-600 mr-3" size={20} />
						<div>
							<p className="text-2xl font-bold text-neutral-900">4.8</p>
							<p className="text-sm text-neutral-600">Average Rating</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-sm border border-neutral-200 p-4">
					<div className="flex items-center">
						<Eye className="text-purple-600 mr-3" size={20} />
						<div>
							<p className="text-2xl font-bold text-neutral-900">15</p>
							<p className="text-sm text-neutral-600">Active Surveys</p>
						</div>
					</div>
				</div>
			</div>

			{/* Personal Information */}
			<div className="bg-white rounded-sm border border-neutral-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
					<button className="text-neutral-600 hover:text-neutral-900">
						<Edit size={18} />
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex items-center text-sm">
						<Mail className="text-neutral-500 mr-3" size={16} />
						<span className="text-neutral-600">Email:</span>
						<span className="ml-2 text-neutral-900">john.doe@example.com</span>
					</div>
					<div className="flex items-center text-sm">
						<MapPin className="text-neutral-500 mr-3" size={16} />
						<span className="text-neutral-600">Location:</span>
						<span className="ml-2 text-neutral-900">New York, USA</span>
					</div>
					<div className="flex items-center text-sm">
						<Calendar className="text-neutral-500 mr-3" size={16} />
						<span className="text-neutral-600">Joined:</span>
						<span className="ml-2 text-neutral-900">March 2024</span>
					</div>
					<div className="flex items-center text-sm">
						<User className="text-neutral-500 mr-3" size={16} />
						<span className="text-neutral-600">Member Type:</span>
						<span className="ml-2 text-neutral-900">Premium</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSection;
