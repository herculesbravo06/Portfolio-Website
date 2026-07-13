// ============================================================
// HARIN BHAVSAR — Portfolio Data (Single Source of Truth)
// All content extracted from the official resume
// ============================================================

export const personalInfo = {
  name: "Harin Bhavsar",
  title: "AI & Data Analytics | Business Intelligence",
  tagline: "Building Intelligent Solutions Through Artificial Intelligence, Data Analytics & Business Intelligence.",
  phone: "+91 8758280101",
  location: "Ahmedabad, Gujarat",
  email: "harinbhavsar2583@gmail.com",
  linkedin: "https://www.linkedin.com/in/harinbhavsar",
  github: "https://github.com/harinbhavsar",
  summary: `Results-oriented M.Sc. Information Technology student with a focus on Artificial Intelligence and Data Analytics who is enthusiastic about turning difficult business and real-world problems into clever, data-driven solutions. I use artificial intelligence, machine learning, predictive analytics, and business intelligence to find actionable insights, improve decision-making, and resolve challenging issues with quantifiable business impact. I am motivated by curiosity, creativity, and analytical thinking. I have gained practical expertise using AI and data analytics to bridge the gap between raw data, new technologies, and strategic business objectives through academic projects, internships, and innovation efforts. Beyond developing models, I concentrate on developing scalable, user-centered solutions that improve operational effectiveness, facilitate well-informed decision-making, and provide real value. I am excited to contribute to forward-thinking teams by creating cutting-edge AI solutions that promote sustainable growth, operational excellence, and significant real-world impact. I am known for my proactive learning approach, adaptability, teamwork, and strong problem-solving skills.`,
} as const;

export interface Education {
  year: string;
  degree: string;
  institution: string;
  specialization?: string;
  icon: string;
}

export const education: Education[] = [
  {
    year: "2019",
    degree: "Secondary Education",
    institution: "Swastik School",
    icon: "🏫",
  },
  {
    year: "2021",
    degree: "Higher Secondary Education",
    institution: "Mangaldeep Vidhyalya",
    icon: "🎓",
  },
  {
    year: "2021 – 2024",
    degree: "Bachelor of Science in Computer Science",
    institution: "St Xavier's College",
    icon: "💻",
  },
  {
    year: "2025 – Present",
    degree: "Master of Science in Information Technology",
    institution: "GLS University",
    specialization: "AI & Data Analytics",
    icon: "🤖",
  },
];

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    name: "Programming",
    icon: "⌨️",
    color: "#00d4ff",
    skills: ["Python", "R", "SQL", "PHP"],
  },
  {
    name: "AI & Machine Learning",
    icon: "🧠",
    color: "#7b61ff",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Predictive Analytics",
      "Classification",
      "Regression",
      "Clustering (K-Means)",
      "Model Evaluation",
    ],
  },
  {
    name: "Data Analytics",
    icon: "📊",
    color: "#00ff88",
    skills: [
      "Business Intelligence",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Data Visualization",
      "Data-Driven Decision Making",
    ],
  },
  {
    name: "Generative AI",
    icon: "✨",
    color: "#ff6b9d",
    skills: ["Prompt Engineering", "AI Workflow"],
  },
  {
    name: "Research",
    icon: "🔬",
    color: "#ffa726",
    skills: [
      "Research & Data Analysis",
      "Domain & Market Research",
      "Business Requirement Analysis",
    ],
  },
  {
    name: "Libraries & Tools",
    icon: "📚",
    color: "#26c6da",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "BeautifulSoup",
    ],
  },
];

export const softwareTools = {
  development: ["Visual Studio Code", "Android Studio", "Jupyter Notebook"],
  versionControl: ["GitHub"],
  productivity: ["Microsoft Workspace", "Google Workspace (Docs, Sheets, Drive)"],
  cloudAutomation: ["AWS", "Selenium IDE"],
  aiPlatforms: ["ChatGPT", "Gemini", "Claude", "Grok", "NotebookLM", "Perplexity AI"],
};

export const professionalSkills = [
  "Analytical & Critical Thinking",
  "Problem Solving & Decision Making",
  "Leadership & Team Collaboration",
  "Strategic & Business Thinking",
  "Communication & Interpersonal Skills",
  "Adaptability & Learning Agility",
  "Initiative, Responsibility & Accountability",
  "Innovation & Creative Thinking",
  "Time & Project Management",
  "Emotional Intelligence & Professional Integrity",
  "Attention to Detail & Execution Excellence",
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techHighlights: string[];
  gradient: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: "vibeup",
    title: "VibeUp",
    subtitle: "AI-Powered Interior Design Platform",
    description:
      "Built an AI-based platform that converts user inputs into personalized interior designs using Google Gemini for prompt optimization and smart design recommendations.",
    features: [
      "AI-based platform converting user inputs into personalized interior designs",
      "Integrated Google Gemini for prompt optimization and smart design recommendations",
      "Developed scalable features including authentication, project management, and AI workflows",
      "Enabled better decision-making with intuitive UI and budget-aware design suggestions",
    ],
    techHighlights: ["Google Gemini", "AI Workflows", "Authentication", "Project Management"],
    gradient: "from-cyan-500 to-blue-600",
    icon: "🏠",
  },
  {
    id: "vendorbridge",
    title: "VendorBridge AI",
    subtitle: "AI-Powered Vendor Management & Procurement Platform",
    description:
      "Created an AI-driven platform for vendor discovery, evaluation, and procurement using machine learning to analyze vendor performance and generate recommendations.",
    features: [
      "Created an AI-driven platform for vendor discovery, evaluation, and procurement",
      "Used machine learning to analyze vendor performance and generate recommendations",
      "Implemented features like vendor comparison, risk analysis, and procurement insights",
      "Improved efficiency by reducing manual effort and enabling data-driven decisions",
    ],
    techHighlights: ["Machine Learning", "Vendor Analytics", "Risk Analysis", "Procurement AI"],
    gradient: "from-purple-500 to-pink-600",
    icon: "🤝",
  },
  {
    id: "fairyfelt",
    title: "FairyFelt",
    subtitle: "Car Rental Platform",
    description:
      "Developed a car rental platform for seamless booking and management with smart recommendations based on user preferences and travel needs.",
    features: [
      "Developed a car rental platform for seamless booking and management",
      "Integrated smart recommendations based on user preferences and travel needs",
      "Built features like vehicle listing, booking system, and user profiles",
      "Enhanced user experience with a personalized and efficient rental process",
    ],
    techHighlights: ["Smart Recommendations", "Booking System", "User Profiles", "Vehicle Listing"],
    gradient: "from-emerald-500 to-teal-600",
    icon: "🚗",
  },
  {
    id: "mybuddy",
    title: "My Buddy",
    subtitle: "Intelligent Emergency Assistance System",
    description:
      "Built an emergency system that shares live location during critical situations with SOS alerts and emergency calling using GPS and GSM.",
    features: [
      "Built an emergency system that shares live location during critical situations",
      "Implemented SOS alerts and emergency calling using GPS and GSM",
      "Designed a reliable solution for real-time tracking and quick response",
      "Integrated hardware and software for a complete safety-focused system",
    ],
    techHighlights: ["GPS", "GSM", "SOS Alerts", "Real-time Tracking", "Hardware Integration"],
    gradient: "from-red-500 to-orange-600",
    icon: "🆘",
  },
];

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  keySkills: string[];
  status: "completed" | "active";
}

export const experiences: Experience[] = [
  {
    title: "Executive Assistant to the Managing Director",
    company: "Media Solace | Upfuse Network",
    period: "Nov 2024 – Mar 2025",
    description: [
      "Worked directly with the Founder & Managing Director, driving strategic initiatives, executive planning, and cross-functional project execution across business operations",
      "Conducted business, market, and domain research to support strategic decision-making, business development opportunities, and organizational growth",
      "Coordinated cross-functional teams, streamlined operational workflows, and ensured timely execution of key organizational priorities through effective stakeholder management",
      "Assisted in project planning, task prioritization, executive scheduling, documentation, and business communication to improve operational efficiency",
      "Supported business strategy, organizational planning, and process optimization while maintaining high standards of professionalism, adaptability, and execution excellence",
    ],
    keySkills: [
      "Business Research",
      "Strategic Planning",
      "Executive Support",
      "Project Management",
      "Stakeholder Management",
      "Business Analysis",
      "Operations Coordination",
    ],
    status: "completed",
  },
  {
    title: "Research Intern",
    company: "Media Solace",
    period: "Dec 2021 – April 2022",
    description: [
      "Conducted market, competitor, and domain research to support business strategy, client requirements, and organizational initiatives",
      "Collected, analyzed, and synthesized research findings into actionable reports to support strategic planning and informed decision-making",
      "Assisted cross-functional teams by identifying industry trends, business opportunities, and process improvements through structured research methodologies",
      "Collaborated with stakeholders to deliver accurate, insight-driven research within project timelines",
    ],
    keySkills: [
      "Research & Analysis",
      "Market Research",
      "Business Intelligence",
      "Trend Analysis",
      "Strategic Insights",
    ],
    status: "completed",
  },
  {
    title: "Social Media Intern",
    company: "Media Solace",
    period: "Oct 2021 – Nov 2021",
    description: [
      "Assisted the Social Media team in planning, creating, and managing digital content across multiple platforms to strengthen brand engagement",
      "Supported campaign execution, audience engagement, and content scheduling while ensuring consistent brand communication",
      "Collaborated with internal teams to coordinate marketing activities and contribute to ongoing digital campaigns",
      "Developed a strong foundation in digital marketing, communication, teamwork, and professional workplace practices",
    ],
    keySkills: [
      "Social Media Management",
      "Digital Marketing",
      "Content Coordination",
      "Brand Communication",
      "Team Collaboration",
    ],
    status: "completed",
  },
];

export interface Certification {
  title: string;
  institution: string;
  description: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    title: "Data, Analytics & AI Bootcamp",
    institution: "Adani Institute of Digital Technology Management",
    description:
      "Gained practical exposure to Artificial Intelligence, Data Analytics, Business Intelligence, predictive analytics, data-driven decision-making, and AI applications for solving real-world business challenges.",
    icon: "📊",
  },
  {
    title: "MongoDB Certification",
    institution: "Simplilearn SkillUp",
    description:
      "Developed foundational knowledge of NoSQL databases, MongoDB architecture, CRUD operations, document modeling, indexing, and efficient database management for scalable applications.",
    icon: "🗄️",
  },
  {
    title: "AI Tools Workshop",
    institution: "Be10X",
    description:
      "Explored modern AI productivity tools and automation techniques to enhance research, workflow optimization, content generation, and business productivity using Generative AI.",
    icon: "🛠️",
  },
  {
    title: "Empowering Conversations with ChatGPT",
    institution: "Open Weaver",
    description:
      "Learned prompt engineering fundamentals, effective AI communication techniques, and practical applications of Large Language Models (LLMs) for problem-solving, research, and productivity.",
    icon: "💬",
  },
];

export const achievements = [
  {
    title: "Google Gemini Integration",
    description: "Successfully integrated Google Gemini AI into production applications for intelligent design recommendations",
    icon: "✨",
  },
  {
    title: "GLS University Recognition",
    description: "Recognized for academic excellence and innovative project work in AI & Data Analytics at GLS University",
    icon: "🏆",
  },
  {
    title: "AI Innovation Projects",
    description: "Built 4 full-scale AI-powered applications demonstrating real-world problem solving through technology",
    icon: "🚀",
  },
  {
    title: "Cross-Functional Leadership",
    description: "Led strategic initiatives working directly with the Managing Director at Media Solace & Upfuse Network",
    icon: "👑",
  },
];

export const references = [
  {
    name: "Gagandeep Makkad",
    title: "Founder & Managing Director",
    company: "Media Solace & Upfuse Network",
    email: "connect@mediasolace.in",
    altEmail: "prdesk@gagandeepmakkad.com",
    phone: "+91 94144 49858",
  },
];

// Terminal commands and responses
export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about      - Who is Harin Bhavsar?
  skills     - Technical skills & expertise
  projects   - View all projects
  experience - Professional experience
  education  - Educational background
  contact    - Get in touch
  resume     - Download resume
  clear      - Clear terminal
  
Type a command and press Enter.`,

  about: `╔══════════════════════════════════════════════╗
║  HARIN BHAVSAR                               ║
║  AI & Data Analytics | Business Intelligence ║
╚══════════════════════════════════════════════╝

Results-oriented M.Sc. Information Technology student
focused on AI and Data Analytics. Passionate about
turning complex business problems into intelligent,
data-driven solutions.

Core strengths: AI, ML, Predictive Analytics,
Business Intelligence, and Strategic Thinking.`,

  skills: `> Technical Skills Loaded...

  ⌨️  Programming    → Python, R, SQL, PHP
  🧠  AI & ML        → Machine Learning, Predictive Analytics,
                       Classification, Regression, Clustering
  📊  Analytics      → Business Intelligence, EDA, 
                       Statistical Analysis, Data Visualization
  ✨  Generative AI  → Prompt Engineering, AI Workflow
  📚  Libraries      → Pandas, NumPy, Scikit-learn, 
                       Matplotlib, Seaborn, BeautifulSoup`,

  projects: `> Loading Projects...

  [01] VibeUp          — AI-Powered Interior Design Platform
  [02] VendorBridge AI — Vendor Management & Procurement
  [03] FairyFelt       — Car Rental Platform
  [04] My Buddy        — Emergency Assistance System

  Type 'project <number>' for details.`,

  experience: `> Professional Timeline...

  ┌─ Nov 2024 – Mar 2025 ──────────────────────┐
  │ Executive Assistant to Managing Director    │
  │ Media Solace | Upfuse Network               │
  │ Founder's Office • Strategic Initiatives    │
  └─────────────────────────────────────────────┘

  ┌─ Dec 2021 – Apr 2022 ──────────────────────┐
  │ Research Intern                             │
  │ Media Solace                                │
  │ Market Research • Business Intelligence     │
  └─────────────────────────────────────────────┘

  ┌─ Oct 2021 – Nov 2021 ──────────────────────┐
  │ Social Media Intern                         │
  │ Media Solace                                │
  │ Digital Marketing • Content Strategy        │
  └─────────────────────────────────────────────┘`,

  education: `> Education Path...

  🤖 2025–Present  MSc Information Technology (AI & Data Analytics)
                   GLS University

  💻 2021–2024     BSc Computer Science
                   St Xavier's College

  🎓 2021          Higher Secondary Education
                   Mangaldeep Vidhyalya

  🏫 2019          Secondary Education
                   Swastik School`,

  contact: `> Establishing Connection...

  📧  harinbhavsar2583@gmail.com
  📱  +91 8758280101
  📍  Ahmedabad, Gujarat
  🔗  LinkedIn: linkedin.com/in/harinbhavsar
  🐙  GitHub: github.com/harinbhavsar`,

  resume: `> Preparing download...
  
  📄 Resume ready for download.
  [Click the download button in the Contact section]`,
};

// Navigation items
export const navItems = [
  { label: "Home", href: "#hero", icon: "Home" },
  { label: "About", href: "#about", icon: "User" },
  { label: "Journey", href: "#journey", icon: "Route" },
  { label: "Projects", href: "#projects", icon: "Folder" },
  { label: "Skills", href: "#skills", icon: "Cpu" },
  { label: "Experience", href: "#experience", icon: "Briefcase" },
  { label: "Certifications", href: "#certifications", icon: "Award" },
  { label: "Achievements", href: "#achievements", icon: "Trophy" },
  { label: "GitHub", href: "#github", icon: "Github" },
  { label: "Terminal", href: "#terminal", icon: "Terminal" },
  { label: "Contact", href: "#contact", icon: "Mail" },
];
