# 🌐 Job Portal (Web3 + AI)

A full-stack web application inspired by LinkedIn, AngelList, and Upwork. This platform enables users to create profiles, connect wallets, post jobs, and interact socially — enhanced with AI-driven job matching, resume parsing, and Web3 blockchain payments.

## 🚀 Features

### ✅ Core Modules

- **Authentication & Profile Management**
  - JWT-based login/registration
  - Editable profile: Name, Bio, LinkedIn URL, Skills (manual or AI-extracted), Wallet Address

- **Job Board + Social Feed**
  - Post/view jobs with filtering by skill/location
  
- **Blockchain Integration**
  - MetaMask or Phantom wallet connection
  - Pay-to-post job with transaction confirmation on-chain
  - Blockchain: `Etherum`
  - EVM tool: `ethers.js / web3.js`

- **AI-Powered Enhancements**
  - Resume skill extraction (NLP-based)
  - Job-applicant match scoring (similarity matching)
  - Smart job suggestions

## 🧱 Tech Stack

| Layer           | Technology                            |
|----------------|----------------------------------------|
| Frontend        | React.js, Tailwind CSS                 |
| Backend         | Node.js, Express.js                   |
| Database        | MongoDB                               |
| Blockchain      | Ethereum                              |
| Wallet          | MetaMask                              |
| AI/NLP          | Python (spaCy, scikit-learn, etc.), Node integration via API |


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

### 4. Run the App

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

## Results

1. Register/Login Functionality
   
   Registered as a Candidate

  <img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/76fcfa00-e913-41ef-ae4f-9c8ec740f4d3" />
  <img width="1549" height="347" alt="image" src="https://github.com/user-attachments/assets/fdc90968-4b1a-4ef6-ac8a-1718a7956b5a" />

  Candidate Profile (After successful login)

  <img width="1917" height="904" alt="image" src="https://github.com/user-attachments/assets/0c915cab-30b6-423c-b58a-7eb7e5e3f2ac" />

  Jobs For Candidate

  <img width="1919" height="816" alt="image" src="https://github.com/user-attachments/assets/808165d5-f909-4c94-8ab6-f30fb5446256" />
  <img width="1919" height="963" alt="image" src="https://github.com/user-attachments/assets/70d4a519-1ddb-4e08-99e7-14f217c9b58c" />

  Jobs After Filtering in Job Title, Location and Job Types

  <img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/a8c5777c-b1cb-4973-b90c-129cef882847" />
  
  Full-time Jobs
  
  <img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/c5861f9b-1033-4e8a-bb8e-1eb3c83c3837" />
  <img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/c980d561-401b-4e54-af3c-55072a6abfd5" />
  
  Part-time Jobs

  <img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/db22f4b0-92c8-46b3-b76c-3dfeefa57dc9" />
  
  Contract Jobs

  <img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/236dd811-579f-46a5-913f-042556e1507e" />

  Remote Jobs

  <img width="1919" height="936" alt="image" src="https://github.com/user-attachments/assets/af01aad6-d89d-4e00-be36-a3972c590db1" />


  Registered as a Recruiter

  <img width="1918" height="962" alt="image" src="https://github.com/user-attachments/assets/fd5cfeb3-5bdf-495f-a114-b09d7abcef3f" />
  <img width="1548" height="328" alt="image" src="https://github.com/user-attachments/assets/16b8b50e-97f3-4653-8435-84186f4e4547" />

  Recruiter Profile ( After Successful Login as a Recruiter)

  <img width="1919" height="729" alt="image" src="https://github.com/user-attachments/assets/53656e00-c494-4502-9e64-6a35baa4b6da" />

  Posting A Job 
  
  <img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/42d09203-72f7-4b21-ac95-68d860c15116" />
 
  Resume - Analyzer

  <img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/7035c0c0-6cb1-4ffc-9923-cd5cd0daaaf9" />

  Wallet integration

  <img width="492" height="463" alt="image" src="https://github.com/user-attachments/assets/9d120a06-4593-4f8f-aa90-204dd3ebf2bf" />

## 🔐 Web3 + Payment Flow

1. User connects MetaMask or Phantom wallet.
2. On job post action:
   - Transaction triggers to admin wallet (0.001 ETH or 0.01 SOL)
   - Verified via ethers.js 

## 🧠 AI Features

- **Skill Extraction**: Parses resume text using `spaCy` (or similar) to extract skills.
- **Match Score**: Uses TF-IDF or cosine similarity to compute compatibility between job and candidate profile.
- **Smart Suggestions**: Recommends jobs based on skills & interest.


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

## 🔗 Dependencies

- React, Tailwind CSS, React Router
- Express.js, Mongoose/Sequelize
- ethers.js / web3.js / solana-web3.js
- JWT, bcrypt
- spaCy, scikit-learn (for AI features)
- multer, axios, dotenv

## 🎯 Future Improvements

- Chat feature between job seekers and recruiters
- Profile endorsements and reviews
- On-chain logging of job metadata
- Fully decentralized resume storage (e.g., IPFS)

## 👨‍💻 Author

**Gaurav Kumar**  
Email: gaurav_kumar@srmap.edu.in  
GitHub: [[@gauravkumar08](https://github.com/gauravkumar08)](https://github.com/gauravkumar08)

