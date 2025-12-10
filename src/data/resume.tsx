import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Prathamesh Jadhav",
  initials: "PJ",
  url: "https://your-portfolio.com",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/Pune",
 description:
  "Full-Stack Developer | Spring Boot • React • Microservices | 650+ DSA Problems & Strong CS Fundamentals.",

summary:
  "I am Prathamesh Jadhav, an Information Technology undergraduate at PICT, Pune, and a passionate full-stack developer. I specialize in Spring Boot, React, RAG, and Machine Learning. I enjoy building high-performance, scalable systems and solving real-world engineering problems. I previously worked as a Software Developer Intern at 8th Wonder Technologies, where I built production-grade React interfaces, reusable UI components, and CMS-driven dashboards. I actively practice DSA, have solved 650+ problems, and love exploring system design, microservices, and AI-driven applications.",

  avatarUrl: "/me.jpg",

  skills: [
    "Java",
    "Spring Boot",
    "Spring Framework",
    "Spring AI",
    "Spring Security",
    "Spring Microservices",
    "Multithreading",
    "C++",
    "React",
    "Next.js",
    "JavaScript",
    "Python",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "Redis",
    "Docker",
    "Git",
    "LangChain",
    "RAG",
    "Vector Databases",
    "NumPy",
    "Pandas",
    "Scikit-learn",
  ],

  coreSubjects: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks & Security"
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],

  contact: {
    email: "prathameshjadhav0198@gmail.com",
    tel: "9699435011",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Prathamesh-2005",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/prathamesh-jadhav-3a13b3285/",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/prathameshjadh/",
        icon: Icons.leetcode,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Prathamesh6271",
        icon: Icons.x,
        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "https://drive.google.com/file/d/1-TWjCgZt4n1N1eVBWFasPuSE0tZ19fCy/view?usp=sharing",
        icon: Icons.resume,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:prathameshjadhav0198@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "8th Wonder Technologies",
      href: "https://8thwonder.xyz",
      badges: [],
      location: "Remote",
      title: "Software Developer Intern",
      logoUrl: "/8th.png",
      start: "April 2025",
      end: "July 2025",
      description:
        "Developed MVP frontend using React.js, implemented authentication, and built a dynamic dashboard with optimized performance. Integrated Sanity CMS for content management, created reusable UI components, and connected frontend with REST APIs. Collaborated with cross-functional teams and participated in code reviews.",
    },
  ],

  education: [
    {
      school: "Pune Institute of Computer Technology (PICT)",
      href: "https://pict.edu",
      degree: "B.E. in Information Technology",
      logoUrl: "/PICT.png",
      start: "2023",
      end: "2027",
    },
    {
      school: "K.K. Wagh College, Nashik",
      href: "#",
      degree: "HSC (12th) – 83.67%",
      logoUrl: "/mvp.png",
      start: "2021",
      end: "2023",
    },
    {
      school: "Janata Vidyalaya Wadalibhoi",
      href: "#",
      degree: "SSC (10th) – 89.20%",
      logoUrl: "/mvp.png",
      start: "2020",
      end: "2021",
    },
  ],

  projects: [
    {
      title: "NexFlow – Collaborative Project Management Platform",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "A real-time collaborative workspace combining Confluence-style documentation with Jira-like Kanban boards. Includes TipTap-powered rich text editing, real-time cursors, version history, drag-and-drop task boards, and role-based access control.",
      technologies: ["React", "Supabase", "TipTap"],
      links: [
        {
          type: "Website",
          href: "https://nex-flow1.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Prathamesh-2005/NexFlow",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/nexflow.png",
      video: "",
    },
    {
      title: "CodeAlarm – Contest Tracker",
      href: "#",
      dates: "2024 – Present",
      active: true,
      description:
        "A contest tracker for LeetCode, Codeforces, and CodeChef featuring JWT authentication, bookmarking, email notifications via Spring Mailer, and a fully Dockerized backend.",
      technologies: ["Spring Boot", "React", "MySQL", "Docker", "JWT"],
      links: [
        {
          type: "Website",
          href: "https://code-alarm-contest.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Prathamesh-2005/CodeAlarm",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/codealarm.png",
      video: "",
    },
    {
      title: "Wellify – Healthcare Management Platform",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "A complete healthcare management system offering disease prediction (99.1% ML accuracy), appointment scheduling, medical report analysis, and a chatbot assistant for patient support.",
      technologies: [
        "React",
        "Flask",
        "MongoDB",
        "Express.js",
        "Node.js",
        "Python",
        "Machine Learning",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Prathamesh-2005/Wellify",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/wellify.png",
      video: "",
    },
    {
      title: "WebCraft – AI-Powered Website Builder",
      href: "#",
      dates: "2024 – Present",
      active: true,
      description:
        "An AI-driven website builder that generates complete websites based on user prompts using Gemini API. Features include real-time preview, code editing, and one-click deployment to Netlify directly from the platform.",
      technologies: ["React", "Spring Boot", "Gemini API", "Netlify"],
      links: [
        {
          type: "Website",
          href: "https://webcraft-iota.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Prathamesh-2005/Webcraft",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/webcraft.png",
      video: "",
    },
  ],

  hackathons: [],
} as const;
