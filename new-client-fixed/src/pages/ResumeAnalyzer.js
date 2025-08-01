import React, { useState } from "react";

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobSkills, setJobSkills] = useState("javascript, react, node, express, mongodb");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return alert("Please upload a resume first.");
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobSkills", jobSkills);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Resume analysis failed");
      }
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">AI Resume Analyzer</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Upload Resume (PDF/DOC/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Job Skills (comma-separated)</label>
        <input
          type="text"
          value={jobSkills}
          onChange={(e) => setJobSkills(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {analysisResult && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-bold text-gray-700 mb-2">Analysis Result:</h3>
          <p><strong>Similarity Score:</strong> {analysisResult.similarityScore}%</p>
          <p><strong>Matched Skills:</strong> {analysisResult.matchedSkills.join(", ")}</p>
          <p><strong>Resume Skills:</strong> {analysisResult.resumeSkills.join(", ")}</p>
          <p><strong>Job Skills:</strong> {analysisResult.jobSkills.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
