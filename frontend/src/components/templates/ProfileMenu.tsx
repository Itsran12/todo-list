import { Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { UserProfile } from "../../types/interfaces";

interface ProfileMenuProps {
    user: UserProfile;
    onClose: () => void;
}

export const ProfileMenu = ({ user, onClose }: ProfileMenuProps) => {
    return (
        <div className="absolute top-4 right-4 -mt-6">
        <div className="relative">
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs">your.email@example.com</p>
                </div>
                <div className="py-2 px-2">
                    <Link
                        to="/settings"
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        <Settings className="w-4 h-4 mr-2 text-gray-600" />
                        Edit Profile
                    </Link>
                    <Link
                        to="/"
                        onClick={onClose}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-all"
                    >
                        <LogOut className="w-4 h-4 mr-2 text-red-500" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};
