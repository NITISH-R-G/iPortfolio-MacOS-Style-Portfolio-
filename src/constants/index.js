 const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal.jsx"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts = [];

const techStack = [
     {
         category: "Languages",
         items: ["Python", "TypeScript", "JavaScript", "C", "C++", "SQL", "Dart", "C#", "Java (Basic)", "HTML5/CSS3"],
     },
     {
         category: "Algorithms & Design",
         items: ["Data Structures", "OOP", "Design Patterns", "SOLID Principles", "Encapsulation", "Polymorphism"],
     },
     {
         category: "AI & Machine Learning",
         items: ["TensorFlow", "Keras", "scikit-learn", "LangChain", "Claude", "OpenAI API", "RAG Pipelines", "Prompt Engineering"],
     },
     {
         category: "Backend & APIs",
         items: ["FastAPI", "Flask", "Node.js", "REST APIs", "Microservices", "PostgreSQL", "MySQL", "SQLite", "Authentication"],
     },
     {
         category: "Frontend",
         items: ["React", "Vite", "GSAP", "Flutter", "Responsive Design", "Vanilla JS SPA"],
     },
     {
         category: "Cloud & DevOps",
         items: ["AWS", "Google Cloud", "Oracle Cloud", "Docker", "Git", "GitHub Actions", "CI/CD"],
     },
     {
         category: "Engineering Practices",
         items: ["Agile", "TDD", "Code Review", "Version Control", "Specification-Driven Development"],
     },
 ];


const socials = [
    {
        id: 1,
        text: "GitHub",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/NITISH-R-G",
    },
    {
        id: 2,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/nitish-r-g-15-10-2007-rgn",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        {
            id: 5,
            name: "Projects",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5",
            windowPosition: "top-[5vh] left-5",
            children: [
                {
                    id: 1,
                    name: "CODESTREAK",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "I founded CODESTREAK, a platform serving 7,000+ students globally. It empowers learners to crack top-tier technical interviews.",
                        "It offers 700+ interactive coding problems curated for FAANG and high-growth startups, along with high-quality tech resources.",
                        "Built using modern scalable architectures with CI/CD deployment pipelines."
                    ],
                },
                {
                    id: 2,
                    name: "Intelli-Credit",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-10 right-20",
                    description: [
                        "An intelligent credit profiling system leveraging federated learning.",
                        "Trained a Random Forest model on banking data while preserving privacy through PySyft, achieving 92.5% accuracy.",
                        "Built a secure backend API using Flask to enable real-time risk assessments."
                    ]
                },
                {
                    id: 3,
                    name: "discourse-rag-assistant",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-32 left-32",
                    description: [
                        "A context-aware Q&A assistant built for the Discourse forum.",
                        "Ingests forum topics and replies using the Discourse API and vectorizes them for semantic search.",
                        "Employs LangChain and a Large Language Model to answer user queries with precise context from the community."
                    ]
                },
                {
                    id: 4,
                    name: "RAVEN",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-52 right-80",
                    description: [
                        "Relational Verification Engine (RAVEN) — An autonomous AI agent designed for advanced coding tasks.",
                        "This project propelled me to rank #73 globally in the HackerRank Orchestrate competition.",
                        "It leverages sophisticated planning, research tools, and iterative refinement to write and debug code autonomously."
                    ]
                },
                {
                    id: 5,
                    name: "RoadSOS",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-60 right-20",
                    description: [
                        "An emergency response system designed to improve accident management.",
                        "Uses live location tracking and automated distress signals to alert nearby medical facilities and emergency contacts instantly.",
                        "Aims to reduce critical response time during severe road accidents."
                    ]
                },
                {
                    id: 6,
                    name: "clicky",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "bottom-10 left-10",
                    description: [
                        "A cross-platform Python GUI automation tool, functioning as a seamless Windows port of Clicky.",
                        "Integrates keyboard and mouse automation seamlessly across different operating systems."
                    ]
                },
                {
                    id: 7,
                    name: "Multi-Domain-Support-Triage",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "bottom-10 right-20",
                    description: [
                        "A robust classification model utilizing Natural Language Processing (NLP).",
                        "Automates customer support triage by accurately categorizing incoming tickets across multiple domains.",
                        "Improves response times and significantly optimizes customer service operations."
                    ]
                },
                {
                    id: 8,
                    name: "FACE-EMOTION-DETECTION",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "bottom-32 left-32",
                    description: [
                        "A sophisticated real-time face emotion detection model.",
                        "Trained using TensorFlow and Keras on a dataset of 30,000+ images.",
                        "Recognizes human emotions instantly with high accuracy, making it ideal for interactive applications."
                    ]
                },
                {
                    id: 9,
                    name: "RailATC",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "bottom-52 right-40",
                    description: [
                        "An innovative automated ticketing app designed for railway systems.",
                        "Built from the ground up using C and SQL.",
                        "Handles complex ticket booking, cancellation, and transaction logging securely and efficiently."
                    ]
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/nitish2.jpg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Software Engineering Student & AI Developer",
            image: "/images/nitish2.jpg",
            description: [
                "Hey! I'm Nitish R. G., a software engineering student at IIT Madras (B.S. Data Science) and Sri Shakthi Institute of Engineering and Technology (B.E. Computer Science).",
                "I specialize in building intelligent AI systems, data-driven applications, and robust backends.",
                "EXPERIENCE & LEADERSHIP:",
                "I am the Founder of CODESTREAK, an educational platform that serves over 7,000 students globally, preparing them for technical interviews.",
                "Previously, I worked as an AI/Data Intern at Infosys Springboard where I deployed AI applications, and a Data Scientist Intern at EVOASTRA Ventures.",
                "I also lead my college's School Innovation Council, organizing tech events and fostering a community of problem solvers.",
                "ACHIEVEMENTS:",
                "I'm incredibly proud to have ranked #73 globally in the HackerRank Orchestrate competition for autonomous AI agent creation.",
                "I also hold a 5-Star Gold Badge on HackerRank for SQL.",
                "CERTIFICATIONS:",
                "I've earned certifications as an Oracle Cloud Infrastructure 2024 Generative AI Certified Professional, AWS Cloud Practitioner, and more."
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const createWindowState = (id, title) => ({
    id,
    title,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isFocused: false,
    zIndex: INITIAL_Z_INDEX,
    bounds: null,
    previousBounds: null,
    data: null,
    scrollTop: 0,
});

const WINDOW_CONFIG = {
    finder: createWindowState("finder", "Portfolio"),
    contact: createWindowState("contact", "Contact"),
    resume: createWindowState("resume", "Resume"),
    safari: createWindowState("safari", "Articles"),
    photos: createWindowState("photos", "Gallery"),
    terminal: createWindowState("terminal", "Skills"),
    txtfile: createWindowState("txtfile", "Text File"),
    imgfile: createWindowState("imgfile", "Image"),
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };