import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.isAdmin);

        const userProfile = JSON.parse(storedUser);
        setUser(userProfile);
      } catch (error) {
        console.error("Error parsing token or user:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear all auth data
      localStorage.removeItem("token");
      sessionStorage.clear();

      // Close the dropdown
      setIsOpen(false);

      // Reset admin state
      setIsAdmin(false);

      // Redirect to home page
      await router.push("/");

      // Force a page reload to clear any cached states
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600">Marketplace</h1>
              <div className="hidden md:flex space-x-8">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === "/dashboard"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FiHome className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === "/dashboard/profile"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FiUser className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      router.pathname.startsWith("/admin")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <FiShield className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <FiShoppingBag className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 rounded-full text-xs text-white flex items-center justify-center">
                  0
                </span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name || "Loading..."}
                  </span>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiSettings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <FiLogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
