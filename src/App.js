import React, { useState, useEffect } from 'react';

function App() {
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data via local server
        const profileResponse = await fetch('http://localhost:5000/api/stock-profile/INTC');

        console.log('Profile Response Status:', profileResponse.status);
        console.log('Profile Response OK:', profileResponse.ok);

        if (!profileResponse.ok) {
          const errorText = await profileResponse.text();
          console.log('Profile Error Response Text:', errorText);
          throw new Error(`Failed to fetch profile data: ${profileResponse.status} ${errorText}`);
        }

        const profileData = await profileResponse.json();
        console.log('Full Profile Data:', JSON.stringify(profileData, null, 2));

        // Check if the response is empty or missing expected structure
        if (!profileData || !profileData.quoteSummary || !profileData.quoteSummary.result || !profileData.quoteSummary.result[0]) {
          setCompanyData({
            symbol: 'INTC',
            longBusinessSummary: 'N/A',
            sectorDisp: 'N/A',
            industryDisp: 'N/A',
            city: 'N/A',
            state: 'N/A',
            zip: 'N/A',
          });
          return;
        }

        // Extract the required fields
        const assetProfile = profileData.quoteSummary.result[0].assetProfile || {};
        const summaryProfile = profileData.quoteSummary.result[0].summaryProfile || {};

        setCompanyData({
          symbol: 'INTC',
          longBusinessSummary: assetProfile.longBusinessSummary || 'N/A',
          sectorDisp: summaryProfile.sectorDisp || 'N/A',
          industryDisp: summaryProfile.industryDisp || 'N/A',
          city: assetProfile.city || 'N/A',
          state: assetProfile.state || 'N/A',
          zip: assetProfile.country || 'N/A',
        });
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-gray-700 font-semibold">Symbol</th>
                <th className="p-3 text-gray-700 font-semibold">Company Profile</th>
                <th className="p-3 text-gray-700 font-semibold">Sector + Industry</th>
                <th className="p-3 text-gray-700 font-semibold">Headquarters</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-3 text-gray-600">{companyData.symbol}</td>
                <td className="p-3 text-gray-600">{companyData.longBusinessSummary}</td>
                <td className="p-3 text-gray-600">
                  {companyData.sectorDisp} | {companyData.industryDisp}
                </td>
                <td className="p-3 text-gray-600">
                  {companyData.city}, {companyData.state}, {companyData.country}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;