import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FiMail, FiUser, FiTag } from "react-icons/fi";

interface UserProfile {
  name: string;
  email: string;
  userType: "buyer" | "seller";
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userProfile = JSON.parse(storedUser);
        setProfile({
          name: userProfile.name,
          email: userProfile.email,
          userType: userProfile.userType,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Profile | Marketplace</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {profile?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile?.name}</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {profile?.userType}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FiMail className="h-5 w-5" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiUser className="h-5 w-5" />
                <span>{profile?.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiTag className="h-5 w-5" />
                <span className="capitalize">{profile?.userType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
