// src/pages/Aptitude.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const questions = [
  { q: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  { q: "Which is a programming language?", options: ["HTML", "Python", "CSS"], answer: "Python" },
  { q: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata"], answer: "Delhi" },
  { q: "Which is not a fruit?", options: ["Apple", "Carrot", "Banana"], answer: "Carrot" },
  { q: "H2O is?", options: ["Water", "Oxygen", "Hydrogen"], answer: "Water" },
  { q: "5 * 6 = ?", options: ["30", "25", "35"], answer: "30" },
  { q: "Largest planet?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Tool Markup", "None"], answer: "Hyper Text Markup Language" },
  { q: "Which is an OS?", options: ["Windows", "Chrome", "Google"], answer: "Windows" },
  { q: "Speed of light?", options: ["3x10^8 m/s", "300 m/s", "1500 m/s"], answer: "3x10^8 m/s" },
];

export default function AptitudeTest({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handleSkip = () => {
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting!");
      return;
    }
    const score = answers.filter((a, idx) => a === questions[idx].answer).length;
    
    try {
      await axios.post("http://localhost:5000/api/aptitude/score", { score }, {
        withCredentials: true,
      });
      onComplete(score); // send score to dashboard
    } catch (err) {
      console.error("Failed to save score:", err);
      alert("There was an error saving your score. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 flex bg-black text-white z-50">
      <div className="w-1/4 p-4 border-r border-gray-700">
        <h3 className="text-lg font-bold mb-4">Questions</h3>
        <ul className="space-y-2">
          {questions.map((_, idx) => (
            <li
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`p-2 rounded cursor-pointer ${
                idx === current ? "bg-[#bd5e2b]" : answers[idx] ? "bg-green-600" : "bg-gray-800"
              }`}
            >
              Question {idx + 1}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Aptitude Test</h2>
          <span className="text-lg font-semibold text-[#bd5e2b]">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>

        <div>
          <p className="text-lg mb-4">{questions[current].q}</p>
          <div className="space-y-3">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={`block w-full p-3 rounded text-left ${
                  answers[current] === opt
                    ? "bg-[#bd5e2b] text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            Skip
          </button>
          {current === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded text-white"
              style={{ backgroundColor: "#bd5e2b" }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
