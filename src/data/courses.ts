import type { CoursesData } from "@/types/course";

export const courses: CoursesData = {
  firstYear: {},
  secondYear: {},
  thirdYear: {
    BCE: [
      {
        code: "CSE1008",
        name: "Theory of Computation - Theory Only",
        credits: 4,
      },
      {
        code: "CSE4004",
        name: "Web Technologies - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3042",
        name: "DevOps Engineering - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3012",
        name: "Network Security - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "STS4006",
        name: "Advanced Competitive Coding - II - Theory Only",
        credits: 3,
      },
      {
        code: "CSE3005",
        name: "Distributed Systems - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3008",
        name: "Introduction to Machine Learning - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE1021",
        name: "Foundations of Blockchain Technology - Theory Only",
        credits: 3,
      },
      {
        code: "CSE1007",
        name: "Introduction to Cryptography - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE1006",
        name: "Foundations for Data Analytics - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3001",
        name: "Agile Development Process - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "CSE4005",
        name: "Data Warehousing and Data Mining - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "PHY2005",
        name: "Introduction to Nanotechnology - Theory Only",
        credits: 3,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1004",
        name: "Basic Spanish - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1001",
        name: "Basic French - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
      },
      {
        code: "FRL2005",
        name: "German for Advanced Learners - Theory Only",
        credits: 3,
      },
    ],
    BCA: [
      {
        code: "CSE4004",
        name: "Web Technologies - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE1008",
        name: "Theory of Computation - Theory Only",
        credits: 4,
      },
      {
        code: "STS4006",
        name: "Advanced Competitive Coding - II - Theory Only",
        credits: 3,
      },
      {
        code: "CSE3015",
        name: "Natural Language Processing - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE4037",
        name: "Reinforcement Learning - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "FRL1001",
        name: "Basic French - Theory Only",
        credits: 2,
      },
      {
        code: "CSE3008",
        name: "Introduction to Machine Learning - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1004",
        name: "Basic Spanish - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
      },
      {
        code: "FRL2005",
        name: "German for Advanced Learners - Theory Only",
        credits: 3,
      },
    ],
    BCD: [
      {
        code: "CSE4004",
        name: "Web Technologies - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE1008",
        name: "Theory of Computation - Theory Only",
        credits: 4,
      },
      {
        code: "STS4006",
        name: "Advanced Competitive Coding - II - Theory Only",
        credits: 3,
      },
      {
        code: "MAT2003",
        name: "Optimization Techniques - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSF3006",
        name: "Data Visualization - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE1006",
        name: "Foundations for Data Analytics - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "FRL1001",
        name: "Basic French - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1004",
        name: "Basic Spanish - Theory Only",
        credits: 2,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
      },
      {
        code: "FRL2005",
        name: "German for Advanced Learners - Theory Only",
        credits: 3,
      },
    ],
  },
  fourthYear: {},
};

export const availablePrograms = Object.entries(courses).flatMap(
  ([year, branches]) =>
    Object.keys(branches).map((branch) => ({
      year,
      branch,
    })),
);
