import { useState } from "react";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FiBell, FiLock, FiGlobe } from "react-icons/fi";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = () => {
    // TODO: Implement settings save functionality
    console.log({
      emailNotifications,
      marketingEmails,
      language,
    });
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Settings | Marketplace</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 text-lg font-medium text-gray-900 mb-4">
                <FiBell className="h-5 w-5" />
                <h2>Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive notifications about your account activity
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">
                      Marketing Emails
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive emails about new features and promotions
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 text-lg font-medium text-gray-900 mb-4">
                <FiGlobe className="h-5 w-5" />
                <h2>Language & Region</h2>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
