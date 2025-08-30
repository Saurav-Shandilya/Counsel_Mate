// src/components/CollegeAnalytics.jsx
export default function CollegeAnalytics() {
    const colleges = [
      { name: "ABC Govt College", placements: "85%", cutoff: "90%" },
      { name: "XYZ Govt College", placements: "78%", cutoff: "88%" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Recommended Colleges</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">College</th>
              <th className="border p-2">Placement</th>
              <th className="border p-2">Cutoff</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c, i) => (
              <tr key={i}>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.placements}</td>
                <td className="border p-2">{c.cutoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }