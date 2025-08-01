# 🌐 Job & Networking Portal (Web3 + AI)

A full-stack web application inspired by LinkedIn, AngelList, and Upwork. This platform enables users to create profiles, connect wallets, post jobs, and interact socially — enhanced with AI-driven job matching, resume parsing, and Web3 blockchain payments.

---

## 🚀 Features

### ✅ Core Modules

- **Authentication & Profile Management**
  - JWT-based login/registration
  - Editable profile: Name, Bio, LinkedIn URL, Skills (manual or AI-extracted), Wallet Address

- **Job Board + Social Feed**
  - Post/view jobs with filtering by skill/location
  - Social feed for career advice, updates, and interaction

- **Blockchain Integration**
  - MetaMask or Phantom wallet connection
  - Pay-to-post job with transaction confirmation on-chain
  - Blockchain: `Polygon / Ethereum / Solana (choose one)`
  - EVM tool: `ethers.js / web3.js` or `@solana/web3.js`

- **AI-Powered Enhancements**
  - Resume skill extraction (NLP-based)
  - Job-applicant match scoring (similarity matching)
  - Smart job suggestions

---

## 🧱 Tech Stack

| Layer           | Technology                            |
|----------------|----------------------------------------|
| Frontend        | React.js, Tailwind CSS                 |
| Backend         | Node.js, Express.js                   |
| Database        | MongoDB / PostgreSQL                  |
| Blockchain      | Ethereum / Polygon / Solana           |
| Wallet          | MetaMask / Phantom                    |
| AI/NLP          | Python (spaCy, scikit-learn, etc.), Node integration via API |
| Smart Contract (optional) | Solidity / Rust (for on-chain logging)       |

---

## 📁 Folder Structure

```
project-root/
│
├── client/                 # Frontend (React + Tailwind)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/       # API + Wallet utils
│       └── App.js
│
├── server/                 # Backend (Express + MongoDB/PostgreSQL)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── ai-service/             # AI/NLP microservice (optional)
│   └── resume_parser.py
│
├── contracts/              # Smart Contracts (optional)
│   ├── JobPost.sol
│   └── deploy.js
│
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-networking-portal.git
cd job-networking-portal
```

### 2. Environment Variables

Create `.env` in `/server` and `/client`:

#### Example `.env` for Backend
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_WALLET=your_admin_wallet_address
```

#### Example `.env` for Frontend
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CHAIN_ID=80001
REACT_APP_ADMIN_WALLET=your_admin_wallet_address
```

---

### 3. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

---

### 4. Run the App

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

---

## 🔐 Web3 + Payment Flow

1. User connects MetaMask or Phantom wallet.
2. On job post action:
   - Transaction triggers to admin wallet (0.001 ETH or 0.01 SOL)
   - Verified via ethers.js / solana-web3.js
   - On success → job is posted.

---

## 🧠 AI Features

- **Skill Extraction**: Parses resume text using `spaCy` (or similar) to extract skills.
- **Match Score**: Uses TF-IDF or cosine similarity to compute compatibility between job and candidate profile.
- **Smart Suggestions**: Recommends jobs based on skills & interest.

---

## 📦 API Endpoints (Backend)

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/api/auth/register` | Register new user                |
| POST   | `/api/auth/login`    | Login and get JWT token          |
| GET    | `/api/profile/me`    | Get current user's profile       |
| PUT    | `/api/profile/edit`  | Update profile                   |
| POST   | `/api/jobs`          | Post a job (after payment)       |
| GET    | `/api/jobs`          | Get all job listings             |
| POST   | `/api/ai/skills`     | Extract skills from resume       |
| POST   | `/api/ai/match`      | Get job match score              |

---

## 🔗 Dependencies

- React, Tailwind CSS, React Router
- Express.js, Mongoose/Sequelize
- ethers.js / web3.js / solana-web3.js
- JWT, bcrypt
- spaCy, scikit-learn (for AI features)
- multer, axios, dotenv

---

## 🎯 Future Improvements

- Chat feature between job seekers and recruiters
- Profile endorsements and reviews
- On-chain logging of job metadata
- Fully decentralized resume storage (e.g., IPFS)

---

## 👨‍💻 Author

**Gaurav Kumar**  
Email: your.email@example.com  
GitHub: [@gauravkumar08](https://github.com/gauravkumar08)

---

## 📜 License

This project is licensed under the MIT License.
