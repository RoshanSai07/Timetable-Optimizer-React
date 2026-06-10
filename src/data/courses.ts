import type { CoursesData } from "../types/course";

export const courses: CoursesData = {
  firstYear: {},
  secondYear: {
    BCE: [
      { code: "CSE2011", name: "Data Structures", credits: 4 },
      { code: "CSE2012", name: "Database Systems", credits: 4 },
      { code: "CSE2013", name: "Operating Systems", credits: 4 },
      { code: "CSE2014", name: "Computer Networks", credits: 4 },
    ],

    BCA: [
      { code: "AIM2011", name: "Python for AI", credits: 4 },
      { code: "AIM2012", name: "Discrete Mathematics", credits: 3 },
      { code: "AIM2013", name: "Probability and Statistics", credits: 4 },
      { code: "AIM2014", name: "Machine Learning Basics", credits: 4 },
    ],

    BCC: [
      { code: "CCY2011", name: "Cyber Security", credits: 4 },
      { code: "CCY2012", name: "Cryptography", credits: 4 },
      { code: "CCY2013", name: "Ethical Hacking", credits: 4 },
      { code: "CCY2014", name: "Linux Systems", credits: 3 },
    ],

    ECE: [
      { code: "ECE2011", name: "Digital Electronics", credits: 4 },
      { code: "ECE2012", name: "Signals and Systems", credits: 4 },
      { code: "ECE2013", name: "Microprocessors", credits: 4 },
      { code: "ECE2014", name: "Circuit Theory", credits: 4 },
    ],
  },

  thirdYear: {
    BCE: [
      { code: "CSE3011", name: "Machine Learning", credits: 4 },
      { code: "CSE3012", name: "Compiler Design", credits: 4 },
      { code: "CSE3013", name: "Software Engineering", credits: 4 },
      { code: "CSE3014", name: "Cloud Computing", credits: 4 },
    ],

    BCD: [
      { code: "DSA3011", name: "Big Data Analytics", credits: 4 },
      { code: "DSA3012", name: "Data Visualization", credits: 4 },
      { code: "DSA3013", name: "Data Mining", credits: 4 },
      { code: "DSA3014", name: "Deep Learning", credits: 4 },
    ],

    MCE: [
      { code: "MEC3011", name: "Robotics", credits: 4 },
      { code: "MEC3012", name: "CAD Modeling", credits: 4 },
      { code: "MEC3013", name: "Thermodynamics", credits: 4 },
      { code: "MEC3014", name: "Manufacturing Systems", credits: 4 },
    ],

    ECE: [
      { code: "ECE3011", name: "VLSI Design", credits: 4 },
      { code: "ECE3012", name: "Embedded Systems", credits: 4 },
      { code: "ECE3013", name: "Communication Systems", credits: 4 },
      { code: "ECE3014", name: "IoT Systems", credits: 4 },
    ],
  },

  fourthYear: {
    BCE: [
      { code: "CSE4011", name: "Distributed Systems", credits: 4 },
      { code: "CSE4012", name: "Artificial Intelligence", credits: 4 },
      { code: "CSE4013", name: "DevOps Engineering", credits: 4 },
      { code: "CSE4014", name: "Blockchain Technology", credits: 4 },
    ],

    BCA: [
      { code: "AIM4011", name: "Generative AI", credits: 4 },
      { code: "AIM4012", name: "Reinforcement Learning", credits: 4 },
      { code: "AIM4013", name: "Computer Vision", credits: 4 },
      { code: "AIM4014", name: "Natural Language Processing", credits: 4 },
    ],

    BCD: [
      { code: "DSA4011", name: "Advanced Analytics", credits: 4 },
      { code: "DSA4012", name: "Predictive Modeling", credits: 4 },
      { code: "DSA4013", name: "Recommendation Systems", credits: 4 },
      { code: "DSA4014", name: "AI for Business", credits: 4 },
    ],

    ECE: [
      { code: "ECE4011", name: "Wireless Networks", credits: 4 },
      { code: "ECE4012", name: "Satellite Communication", credits: 4 },
      { code: "ECE4013", name: "Advanced Embedded Systems", credits: 4 },
      { code: "ECE4014", name: "Nano Electronics", credits: 4 },
    ],
  },
};
