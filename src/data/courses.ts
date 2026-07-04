import type { CoursesData } from "@/types/course";

export const courses: CoursesData = {
  firstYear: {},
  secondYear: {},
  thirdYear: {
    BCE: [
      {
        code: "CSE3002",
        name: "Artificial Intelligence - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE2008",
        name: "Operating Systems - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE2009",
        name: "Soft Computing - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "CSE2013",
        name: "Information Theory and Coding - Theory Only",
        credits: 4,
      },
      {
        code: "CSE2025",
        name: "AWS Solution Architecture - Theory Only",
        credits: 3,
      },
      {
        code: "CSE3001",
        name: "Agile Development Process - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "CSE3003",
        name: "Computer Networks - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3004",
        name: "Design and Analysis of Algorithms - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3015",
        name: "Natural Language Processing - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE4006",
        name: "Deep Learning - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "CSE4007",
        name: "Digital Image Processing - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE4011",
        name: "Internet of Things - Embedded Theory and Project",
        credits: 4,
      },
      {
        code: "STS3007",
        name: "Advanced Competitive Coding - I - Theory Only",
        credits: 3,
      },
      {
        code: "CSE4012",
        name: "UI UX User Experience Design - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      { code: "FRL1001", name: "Basic French - Theory Only", credits: 2 },
      { code: "FRL1004", name: "Basic Spanish - Theory Only", credits: 2 },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
      },
    ],

    BCD: [
      { code: "CSE2025", name: "AWS Solution Architecture", credits: 4 },
      { code: "CSE3003", name: "Computer Networks", credits: 4 },
      {
        code: "CSE3004",
        name: "Design and Analysis of Algorithms",
        credits: 4,
      },
      { code: "CSE2008", name: "Operating Systems", credits: 4 },
      { code: "CSE3009", name: "NoSQL Databases", credits: 4 },
      {
        code: "STS3007",
        name: "Advanced Competitive Coding - ITH",
        credits: 3,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      { code: "FRL1001", name: "Basic French - Theory Only", credits: 2 },
      { code: "FRL1004", name: "Basic Spanish - Theory Only", credits: 2 },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
      },
    ],

    BCA: [
      {
        code: "CSE2008",
        name: "Operating Systems - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE2025",
        name: "AWS Solution Architecture - Theory Only",
        credits: 3,
      },
      {
        code: "CSE3003",
        name: "Computer Networks - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE3004",
        name: "Design and Analysis of Algorithms - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "CSE4006",
        name: "Deep Learning",
        credits: 4,
      },
      {
        code: "CSE4007",
        name: "Digital Image Processing - Embedded Theory and Lab",
        credits: 4,
      },
      {
        code: "STS3007",
        name: "Advanced Competitive Coding - I",
        credits: 3,
      },
      {
        code: "FRL2004",
        name: "Korean for Beginners-I - Theory Only",
        credits: 2,
      },
      { code: "FRL1001", name: "Basic French - Theory Only", credits: 2 },
      { code: "FRL1004", name: "Basic Spanish - Theory Only", credits: 2 },
      {
        code: "FRL1005",
        name: "German for Beginners - Theory Only",
        credits: 2,
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
