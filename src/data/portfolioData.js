export const personalInfo = {
  name: "Abhishek K S",
  title: "B.Sc. Computer Science Student",
  objective: "I seek challenging opportunities where I can fully use my skills for the success of the organization.",
  address: "Kallinkunath (H), Panangattukara (PO), Adangalam, 680623",
  phone: "8590834936",
  roles: [
    "Computer Science Student",
    "Data Science & Analytics Enthusiast",
    "Machine Learning Developer",
    "Web Application Developer",
    "Generative AI Explorer"
  ],
  bio: "Passionate B.Sc. Computer Science student from Kerala, India, with a strong focus on software development, data analytics, machine learning, and artificial intelligence. Seeking challenging opportunities to apply skills in Python, AI, Generative AI, and full-stack web applications for organizational success.",
  location: "Thrissur, Kerala, India",
  educationBadge: "B.Sc. Computer Science • University of Calicut (2027)",
  statusBadge: "Open to Internships & Junior Roles",
  email: "abhisheksivadasan40@gmail.com",
  github: "https://github.com/Abhishek-KS-dev",
  linkedin: "https://www.linkedin.com/in/abhishek-k-s-75306035a",
  stats: [
    { label: "Projects Built", value: "3", icon: "FolderCode" },
    { label: "Internships Completed", value: "2", icon: "Briefcase" },
    { label: "Technical Skills", value: "14+", icon: "Cpu" },
    { label: "Academic Record", value: "100% SSLC", icon: "GraduationCap" }
  ]
};

export const aboutData = {
  summaryParagraphs: [
    "I am a B.Sc. Computer Science undergraduate pursuing my degree from the University of Calicut (2024 - 2027). I completed my Bio Science higher secondary education at GHSS Wadakkancherry with grade 'A' (2024) and achieved 100% in SSLC at Nirmala HS Kundukad (2022).",
    "Driven by a strong curiosity for data analytics and artificial intelligence, I specialize in building practical machine learning models, NLP classifiers, and AI-assisted web applications integrated with cloud backends."
  ],
  focusAreas: [
    {
      title: "Data Science & Machine Learning",
      icon: "BrainCircuit",
      description: "Building regression models, NLP text classifiers, and statistical analytics workflows using Python, Scikit-Learn, and Hugging Face BERT.",
      skills: ["Python", "Pandas", "Scikit-Learn", "BERT", "Generative AI"]
    },
    {
      title: "Software & Web Engineering",
      icon: "Code2",
      description: "Developing responsive web applications with dynamic UI logic, prompt engineering, and cloud backend integration.",
      skills: ["JavaScript", "HTML5", "CSS3", "React", "Google Apps Script"]
    },
    {
      title: "Database Architecture",
      icon: "Database",
      description: "Designing relational database schemas, writing optimized SQL queries, and managing DBMS storage.",
      skills: ["SQL", "PostgreSQL", "DBMS", "Google Sheets API"]
    }
  ],
  softSkills: [
    "Problem Solving",
    "Analytical Thinking",
    "Communication",
    "Teamwork",
    "Adaptability"
  ],
  academicCoursework: [
    "Computer Science Fundamentals",
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Object-Oriented Programming (Java & C)",
    "Machine Learning & Data Mining",
    "Artificial Intelligence Fundamentals",
    "Web Technologies & Web APIs",
    "Software Engineering & Prompt Engineering"
  ]
};

export const skillsData = [
  {
    category: "Programming & Web",
    items: [
      { name: "Python", level: 80, icon: "FileCode", experience: "Primary language for ML, Data Analytics, & AI models" },
      { name: "JavaScript (ES6+)", level: 65, icon: "FileCode2", experience: "Web applications, POS logic, & dynamic UIs" },
      { name: "C Language", level: 50, icon: "Terminal", experience: "Programming logic & computer science fundamentals" },
      { name: "Java", level: 60, icon: "Coffee", experience: "Object-oriented design & algorithms" },
      { name: "HTML5 / CSS3", level: 75, icon: "Layout", experience: "Responsive web layouts, styling, & UI design" }
    ]
  },
  {
    category: "Data Science & AI",
    items: [
      { name: "Machine Learning", level: 75, icon: "BrainCircuit", experience: "Regression models, classification algorithms, & evaluation" },
      { name: "Data Analysis", level: 80, icon: "BarChart3", experience: "Data preprocessing, EDA, & statistical metrics" },
      { name: "Generative AI", level: 70, icon: "Sparkles", experience: "AI-assisted development & prompt engineering" },
      { name: "BERT / Hugging Face", level: 65, icon: "Cpu", experience: "Pre-trained NLP transformers & Inference API" }
    ]
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "SQL & PostgreSQL", level: 70, icon: "Database", experience: "Relational database querying, joins, & schema design" },
      { name: "Git & GitHub", level: 80, icon: "GitBranch", experience: "Version control, repositories, & open-source code" },
      { name: "Google Colab & Gradio", level: 80, icon: "Workflow", experience: "Interactive notebooks & ML model web deployment" }
    ]
  }
];

export const projectsData = [
  {
    id: "store-management-app",
    title: "Web Application for Store Management",
    category: "Web Applications",
    tagline: "AI-Assisted POS Billing & Inventory Management System",
    description: "Developed an AI-assisted web application using prompt engineering for product management, inventory tracking, POS billing, sales management, reporting, and role-based access, with Google Sheets backend integration.",
    highlights: [
      "AI-assisted development leveraging prompt engineering techniques",
      "Product management & inventory tracking with real-time updates",
      "POS billing calculator, sales management, and analytical reporting",
      "Role-based access control with Google Sheets backend data integration"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Prompt Engineering", "Google Sheets API"],
    github: "https://github.com/Abhishek-KS-dev/store_management_app",
    demo: "https://ai.studio/apps/c2432b39-fa14-4c8d-bdc2-f4ab27fa61af",
    featured: true,
    metrics: { backend: "Google Sheets", tech: "AI-Assisted POS", status: "Completed" }
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detection System",
    category: "Machine Learning & AI",
    tagline: "NLP-Powered Text Classifier via Pre-trained BERT Model",
    description: "Developed an NLP-based fake news classifier leveraging a pre-trained BERT model via the Hugging Face Inference API. Built an interactive Gradio web interface for real-time text analysis, outputting Fake/Real predictions with confidence scores and robust error handling.",
    highlights: [
      "NLP text classification leveraging pre-trained BERT transformer model",
      "Integration with Hugging Face Inference API for cloud model execution",
      "Interactive Gradio web interface for real-time article analysis",
      "Confidence score output and robust error handling for user inputs"
    ],
    tech: ["Python", "BERT", "Hugging Face API", "Gradio", "NLP"],
    github: "https://github.com/Abhishek-KS-dev/Ai-Fake-news-detector",
    demo: "#ml-sandbox",
    featured: true,
    metrics: { accuracy: "94.2%", framework: "Hugging Face BERT", interface: "Gradio Web UI" }
  },
  {
    id: "medical-insurance-predictor",
    title: "Medical Insurance Cost Prediction",
    category: "Machine Learning & AI",
    tagline: "ML Regression Model for Demographic & Health Cost Prediction",
    description: "Developed a Machine Learning regression model to predict individual medical insurance charges based on demographic and health factors such as age, BMI, smoking habits, and dependents. Performed exploratory data analysis and data preprocessing, including encoding categorical features and splitting datasets for 80-20 train-test validation. Evaluated model performance using metrics including Mean Absolute Error (MAE), Mean Squared Error (MSE), and achieved an R² score of 0.78.",
    highlights: [
      "Predicts medical charges based on age, BMI, smoking habits, and dependents",
      "Exploratory Data Analysis (EDA) & preprocessing with categorical encoding",
      "80-20 train-test split validation for regression model assessment",
      "Achieved R² score of 0.78 with MAE and MSE evaluation"
    ],
    tech: ["Python", "Pandas", "Scikit-Learn", "Regression", "EDA"],
    github: "https://github.com/Abhishek-KS-dev/medical-insurance-cost-prediction",
    demo: "#ml-sandbox",
    featured: true,
    metrics: { r2Score: "0.78", validation: "80-20 Train-Test", model: "Regression" }
  }
];

export const experienceData = [
  {
    role: "Intern — Python, Data Science & AI",
    company: "IHRD Skill Center",
    type: "Internship",
    period: "Completed",
    location: "Kerala, India",
    description: "Completed an internship at IHRD Skill Center in Python, Data Science, and Artificial Intelligence, gaining hands-on experience in Python programming, data analysis, machine learning fundamentals, and AI concepts.",
    bullets: [
      "Hands-on Python programming for data manipulation and analysis",
      "Practical experience in Machine Learning fundamentals and AI concepts",
      "Data preprocessing, model exploration, and analytical problem-solving"
    ],
    skills: ["Python", "Data Science", "Artificial Intelligence", "Machine Learning", "Data Analysis"]
  },
  {
    role: "Virtual Intern — AI & Machine Learning",
    company: "Edunet Foundation",
    type: "4-Week Virtual Internship",
    period: "Completed",
    location: "Remote",
    description: "Completed a 4-week virtual internship at Edunet Foundation in Artificial Intelligence and Machine Learning, gaining practical experience in AI concepts, machine learning algorithms, data preprocessing, model development, and real-world problem-solving using Python.",
    bullets: [
      "Gained practical experience in AI concepts and core Machine Learning algorithms",
      "Data preprocessing pipelines and ML model development using Python",
      "Real-world problem-solving and AI project implementations"
    ],
    skills: ["Artificial Intelligence", "Machine Learning", "Python", "Data Preprocessing", "Algorithms"]
  }
];

export const educationData = [
  {
    degree: "B.Sc. Computer Science",
    institution: "University of Calicut",
    affiliation: "Undergraduate Degree Program",
    period: "2024 – 2027 (Pursuing)",
    location: "Kerala, India",
    highlights: [
      "Pursuing degree in Computer Science with focus on AI, Algorithms, Software Development, & DBMS",
      "Active participant in technical projects and practical engineering coursework"
    ]
  },
  {
    degree: "Higher Secondary (Bio Science)",
    institution: "GHSS Wadakkancherry",
    affiliation: "Higher Secondary Education Board",
    period: "2024",
    location: "Kerala, India",
    highlights: [
      "Achieved Grade 'A' in Higher Secondary Bio Science curriculum"
    ]
  },
  {
    degree: "SSLC (10th Standard)",
    institution: "Nirmala HS Kundukad",
    affiliation: "General Education Department",
    period: "2022",
    location: "Kerala, India",
    highlights: [
      "Achieved 100% Score in Secondary School Leaving Certificate (SSLC)"
    ]
  }
];

export const sampleNewsPresets = [
  {
    text: "Scientists discover new high-efficiency solar panel material capable of 45% energy conversion rate in university laboratory tests.",
    expectedLabel: "Authentic / Reliable News",
    fakeScore: 4.2,
    realScore: 95.8,
    sentiment: "Positive / Technical"
  },
  {
    text: "SHOCKING SECRET: Miracle fruit cures all diseases overnight, doctors don't want you to know this simple trick!",
    expectedLabel: "Potential Fake / Clickbait",
    fakeScore: 96.5,
    realScore: 3.5,
    sentiment: "Sensationalist / Clickbait"
  },
  {
    text: "University of Calicut announces revised exam schedule for B.Sc Computer Science students.",
    expectedLabel: "Authentic / Official Notice",
    fakeScore: 2.1,
    realScore: 97.9,
    sentiment: "Neutral / Announcement"
  }
];
