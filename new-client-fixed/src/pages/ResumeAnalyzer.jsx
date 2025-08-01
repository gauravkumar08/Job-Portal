import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobSkills, setJobSkills] = useState("javascript, react, express, mongodb");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload a resume file.");
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobSkills", jobSkills);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/analyze", formData);

      setResult(res.data);

      // ✅ Update similarity score in profile
      const token = localStorage.getItem("token");
      if (token) {
        await axios.patch(
          "http://localhost:5000/api/profile/update-score",
          { score: res.data.similarityScore },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Resume analysis failed:", err);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("AI Resume Analyzer Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Similarity Score: ${result.similarityScore}%`, 20, 40);
    doc.text(`Matched Skills: ${result.matchedSkills.join(", ")}`, 20, 50);
    doc.text(`Resume Skills: ${result.resumeSkills.join(", ")}`, 20, 60);
    doc.text(`Job Skills: ${result.jobSkills.join(", ")}`, 20, 70);
    doc.save("resume_analysis_report.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        AI Resume Analyzer
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Resume (PDF/DOC/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Skills (comma-separated)</label>
        <input
          type="text"
          value={jobSkills}
          onChange={(e) => setJobSkills(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g. react, node, mongodb"
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && (
        <div className="mt-4 text-center text-blue-500 animate-pulse">
          ⏳ Analyzing resume with AI...
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <p><strong>Similarity Score:</strong> {result.similarityScore}%</p>
          <p><strong>Matched Skills:</strong> {result.matchedSkills?.join(", ")}</p>
          <p><strong>Resume Skills:</strong> {result.resumeSkills?.join(", ")}</p>
          <p><strong>Job Skills:</strong> {result.jobSkills?.join(", ")}</p>

          <button
            onClick={generatePDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
