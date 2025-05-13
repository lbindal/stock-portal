import React from 'react';

function CompanyProfile({ data }) {
  // Log the data to inspect its structure
  console.log('CompanyProfile received data:', data);

  // Ensure data is available before accessing nested properties
  if (!data || !data.finance || !data.finance.result || !data.finance.result[0]) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-xl">None</p>
      </div>
    );
  }

  const profile = data.finance.result[0] || {};

  // Log the profile to inspect available fields
  console.log('Profile data:', profile);

  // Helper function to display "None" if the field is empty, undefined, or null
  const displayField = (field) => {
    return field && field !== '' ? field : 'None';
  };

  // Use the helper for all fields
  const companyName = displayField(profile.companyName);
  const industry = displayField(profile.industry);
  const sector = displayField(profile.sector);
  const address = [
    profile.address1,
    profile.address2,
    profile.city,
    profile.state,
    profile.zip,
    profile.country,
  ]
    .filter(Boolean)
    .join(', ') || 'None';
  const phone = displayField(profile.phone);
  const website = displayField(profile.website);
  const employees = profile.fullTimeEmployees
    ? profile.fullTimeEmployees.toLocaleString()
    : 'None';
  const businessSummary = displayField(profile.longBusinessSummary);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{companyName}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {industry} | {sector}
        </p>
      </div>

      {/* Company Overview Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Company Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Website:</span>{' '}
              {website === 'None' ? (
                'None'
              ) : (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {website}
                </a>
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Employees:</span> {employees}
            </p>
          </div>
        </div>
      </div>

      {/* Business Summary Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Business Summary</h2>
        <p className="text-gray-600 leading-relaxed">{businessSummary}</p>
      </div>

      {/* Company Officers Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Company Officers</h2>
        {profile.companyOfficers && profile.companyOfficers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-gray-700 font-semibold">Name</th>
                  <th className="p-3 text-gray-700 font-semibold">Title</th>
                  <th className="p-3 text-gray-700 font-semibold">Age</th>
                  <th className="p-3 text-gray-700 font-semibold">Total Pay</th>
                </tr>
              </thead>
              <tbody>
                {profile.companyOfficers.map((officer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="p-3 text-gray-600">{displayField(officer.name)}</td>
                    <td className="p-3 text-gray-600">{displayField(officer.title)}</td>
                    <td className="p-3 text-gray-600">{displayField(officer.age)}</td>
                    <td className="p-3 text-gray-600">
                      {displayField(officer.totalPay?.fmt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">None</p>
        )}
      </div>
    </div>
  );
}

export default CompanyProfile;