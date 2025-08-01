const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const natural = require("natural");

// Utility: Extract known skills from raw text
const parseSkills = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  const knownSkills = [
    "javascript", "react", "node", "python", "java", "c++", "sql", "html",
    "css", "express", "mongodb", "aws", "docker", "azure", "git", "figma"
  ];

  return knownSkills.filter(skill => tokens.includes(skill));
};

exports.analyzeResume = async (req, res) => {
  try {
    const { jobSkills } = req.body;
    const file = req.file;

    if (!file || !jobSkills) {
      return res.status(400).json({ message: "Resume file and job skills are required." });
    }

    let resumeText = "";
    const ext = path.extname(file.originalname).toLowerCase();
    const buffer = fs.readFileSync(file.path);

    // Extract resume text
    if (ext === ".pdf") {
      const parsed = await pdfParse(buffer);
      resumeText = parsed.text;
    } else if (ext === ".docx" || ext === ".doc") {
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({ message: "Unsupported file type." });
    }

    // Auto delete uploaded file (cleaning disk)
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    // Skill Matching Logic
    const resumeSkills = parseSkills(resumeText);
    const jobSkillList = jobSkills.toLowerCase().split(",").map(s => s.trim());
    const parsedJobSkills = parseSkills(jobSkillList.join(" "));

    const matchedSkills = resumeSkills.filter(skill => parsedJobSkills.includes(skill));
    const similarityScore = parsedJobSkills.length > 0
      ? Math.round((matchedSkills.length / parsedJobSkills.length) * 100)
      : 0;

    return res.json({
      matchedSkills,
      resumeSkills,
      jobSkills: parsedJobSkills,
      similarityScore,
    });

  } catch (err) {
    console.error("AI Resume Analysis Error:", err);
    return res.status(500).json({ message: "Server error during analysis." });
  }
};
