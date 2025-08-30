// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import AptitudeTest from "./Aptitude";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [formDone, setFormDone] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile of current logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true,
        });

        if (res.data?.profile) {
          setUserProfile(res.data.profile);
          setFormDone(true);
          if (res.data.profile.aptitudeScore != null) {
            setScore(res.data.profile.aptitudeScore);
            setTestDone(true);
          }
        } else {
          setFormDone(false);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // No profile yet → show the form
          setFormDone(false);
        } else if (err.response?.status === 401) {
          console.warn("Unauthorized: please log in first.");
          setFormDone(false);
        } else {
          console.error("Failed to fetch profile", err);
          setFormDone(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle aptitude test completion
  const handleTestComplete = async (userScore) => {
    try {
      await axios.post(
        "http://localhost:5000/api/aptitude/score",
        { score: userScore },
        { withCredentials: true }
      );

      setScore(userScore);
      setTestDone(true);
      setActiveSection("progress");
    } catch (err) {
      console.error(err);
      alert("Failed to save test score.");
    }
  };

  if (loading) return <div className="text-white p-8">Loading your profile...</div>;

  // Show UserForm if profile is not completed
  if (!formDone)
    return (
      <UserForm
        onComplete={(profile) => {
          setUserProfile(profile);
          setFormDone(true);
        }}
      />
    );

  // Pie chart data based on education and score
  const interestData =
    userProfile.education === "12th"
      ? [
          { name: "Engineering", value: score ?? 0 },
          { name: "Medical", value: score != null ? 100 - score : 0 },
          { name: "Commerce", value: 15 },
          { name: "Arts", value: 10 },
        ]
      : [
          { name: "Science Stream", value: score ?? 0 },
          { name: "Commerce Stream", value: score != null ? 100 - score : 0 },
          { name: "Arts Stream", value: 20 },
        ];

  const COLORS = ["#bd5e2b", "#332670", "#1e90ff", "#28a745"];

  const roadmapSteps = [
    "Complete Profile",
    "Take Aptitude Test",
    "See Progress",
    "Suggested Course/Stream",
    "Get Career Guide",
  ];

  const careers =
    userProfile.education === "12th"
      ? ["Software Engineer", "Doctor", "Chartered Accountant", "Architect"]
      : [
          "Science Stream → Engineering/Medical",
          "Commerce Stream → CA/Management",
          "Arts Stream → UPSC/Teaching",
        ];

  const colleges = [
    "Govt. Engineering College Jammu",
    "Govt. Degree College Srinagar",
    "NIT Srinagar",
    "Govt. Polytechnic Jammu",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex pt-[90px]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav className="space-y-4">
          {["dashboard", "profile", "progress", "guide", "roadmap", "help"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === item
                    ? "bg-[#bd5e2b] text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {item === "dashboard" && "Dashboard"}
                {item === "profile" && "Profile"}
                {item === "progress" && "Test & Progress"}
                {item === "guide" && "Personalized Guide"}
                {item === "roadmap" && "Roadmap"}
                {item === "help" && "Help"}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8">
        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">
              Welcome, {userProfile.name} 👋
            </h1>

            <div className="grid grid-cols-2 gap-6">
              {/* Roadmap */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Career Roadmap</h2>
                <div className="space-y-4">
                  {roadmapSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 bg-[#332670] hover:bg-[#bd5e2b] cursor-pointer px-4 py-3 rounded-lg transition"
                      onClick={() => setActiveSection("roadmap")}
                    >
                      <span className="font-bold">{idx + 1}</span>
                      <span>{step}</span>
                      <ArrowRight className="ml-auto" size={18} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Pie Chart */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Your Interests</h2>
                <PieChart width={300} height={250}>
                  <Pie
                    data={interestData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {interestData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </div>

              {/* Career Guidance */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg col-span-1">
                <h2 className="text-xl font-semibold mb-4">Career Guidance</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                  {careers.map((career, idx) => (
                    <li key={idx}>{career}</li>
                  ))}
                </ul>
              </div>

              {/* Eligible Colleges */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Eligible State Govt. Colleges (J&K)
                </h2>
                <ul className="space-y-3">
                  {colleges.map((college, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg"
                    >
                      <span>{college}</span>
                      <button className="px-3 py-1 bg-[#bd5e2b] rounded-lg hover:bg-[#a44e22]">
                        Apply
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Test & Progress Section */}
        {activeSection === "progress" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Test & Progress</h1>
            {!testDone ? (
              <AptitudeTest onComplete={handleTestComplete} />
            ) : (
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  ✅ Aptitude Test Completed
                </h2>
                <p className="text-gray-400 mb-4">
                  Your score: <strong>{score}</strong>
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}