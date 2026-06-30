import type { SlotStructure } from "@/types/slots";

export const timeMap = [
  {
    index: 0,
    time: "8.00 - 8.50",
    theory: true,
    lab: true,
  },
  {
    index: 1,
    time: "9.00 - 9.50",
    theory: true,
    lab: true,
  },
  {
    index: 2,
    time: "10.00 - 10.50",
    theory: true,
    lab: true,
  },
  {
    index: 3,
    time: "11.00 - 11.50",
    theory: true,
    lab: true,
  },
  {
    index: 4,
    time: "12.00 - 12.50",
    theory: true,
    lab: true,
  },
  {
    index: 5,
    time: "12.50 - 1.30",
    theory: false,
    lab: true,
  },
  {
    index: 6,
    time: "2.00 - 2.50",
    theory: true,
    lab: true,
  },
  {
    index: 7,
    time: "3.00 - 3.50",
    theory: true,
    lab: true,
  },
  {
    index: 8,
    time: "4.00 - 4.50",
    theory: true,
    lab: true,
  },
  {
    index: 9,
    time: "5.00 - 5.50",
    theory: true,
    lab: true,
  },
  {
    index: 10,
    time: "6.00 - 6.50",
    theory: true,
    lab: true,
  },
  {
    index: 11,
    time: "6.50 - 7.40",
    theory: false,
    lab: true,
  },
];

const generateSlotMap = () => {
  const map: Record<string, { day: string; time: string }[]> = {};

  Object.entries(slotStructure).forEach(([day, structure]) => {
    structure.slots.forEach((slotRow) => {
      // Theory slots
      slotRow.theorySlots.forEach((slot) => {
        if (slot !== "-") {
          if (!map[slot]) map[slot] = [];
          map[slot].push({ day, time: slotRow.time });
        }
      });
      // Lab slots
      slotRow.labSlots.forEach((slot) => {
        if (slot !== "-") {
          if (!map[slot]) map[slot] = [];
          map[slot].push({ day, time: slotRow.time });
        }
      });
    });
  });

  return map;
};

export const slotStructure: SlotStructure = {
  TUE: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TFF1"], labSlots: ["L1"] },
      { time: "9.00 - 9.50", theorySlots: ["A1", "SE2"], labSlots: ["L2"] },
      { time: "10.00 - 10.50", theorySlots: ["B1", "SD2"], labSlots: ["L3"] },
      { time: "11.00 - 11.50", theorySlots: ["C1"], labSlots: ["L4"] },
      { time: "12.00 - 12.50", theorySlots: ["D1"], labSlots: ["L5"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L6"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["F2"], labSlots: ["L31"] },
      { time: "3.00 - 3.50", theorySlots: ["A2", "SF1"], labSlots: ["L32"] },
      { time: "4.00 - 4.50", theorySlots: ["B2", "SC1"], labSlots: ["L33"] },
      { time: "5.00 - 5.50", theorySlots: ["C2"], labSlots: ["L34"] },
      { time: "6.00 - 6.50", theorySlots: ["TDD2"], labSlots: ["L35"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L36"] },
    ],
  },
  WED: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TGG1"], labSlots: ["L7"] },
      { time: "9.00 - 9.50", theorySlots: ["D1"], labSlots: ["L8"] },
      { time: "10.00 - 10.50", theorySlots: ["F1"], labSlots: ["L9"] },
      { time: "11.00 - 11.50", theorySlots: ["E1", "SC2"], labSlots: ["L10"] },
      { time: "12.00 - 12.50", theorySlots: ["B1"], labSlots: ["L11"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L12"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["D2"], labSlots: ["L37"] },
      { time: "3.00 - 3.50", theorySlots: ["TF2", "G2"], labSlots: ["L38"] },
      { time: "4.00 - 4.50", theorySlots: ["E2", "SC1"], labSlots: ["L39"] },
      { time: "5.00 - 5.50", theorySlots: ["B2"], labSlots: ["L40"] },
      { time: "6.00 - 6.50", theorySlots: ["TCC2"], labSlots: ["L41"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L42"] },
    ],
  },
  THU: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TEE1"], labSlots: ["L13"] },
      { time: "9.00 - 9.50", theorySlots: ["C1"], labSlots: ["L14"] },
      { time: "10.00 - 10.50", theorySlots: ["TD1", "TG1"], labSlots: ["L15"] },
      {
        time: "11.00 - 11.50",
        theorySlots: ["TAA1", "ECS"],
        labSlots: ["L16"],
      },
      {
        time: "12.00 - 12.50",
        theorySlots: ["TBB1", "CLUB"],
        labSlots: ["L17"],
      },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L18"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["TE2", "SE1"], labSlots: ["L43"] },
      { time: "3.00 - 3.50", theorySlots: ["C2"], labSlots: ["L44"] },
      { time: "4.00 - 4.50", theorySlots: ["A2"], labSlots: ["L45"] },
      { time: "5.00 - 5.50", theorySlots: ["TD2", "TG2"], labSlots: ["L46"] },
      { time: "6.00 - 6.50", theorySlots: ["TGG2"], labSlots: ["L47"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L48"] },
    ],
  },
  FRI: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TCC1"], labSlots: ["L19"] },
      { time: "9.00 - 9.50", theorySlots: ["TB1"], labSlots: ["L20"] },
      { time: "10.00 - 10.50", theorySlots: ["TA1"], labSlots: ["L21"] },
      { time: "11.00 - 11.50", theorySlots: ["F1"], labSlots: ["L22"] },
      { time: "12.00 - 12.50", theorySlots: ["TE1", "SD2"], labSlots: ["L23"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L24"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["C2"], labSlots: ["L49"] },
      { time: "3.00 - 3.50", theorySlots: ["TB2"], labSlots: ["L50"] },
      { time: "4.00 - 4.50", theorySlots: ["TA2"], labSlots: ["L51"] },
      { time: "5.00 - 5.50", theorySlots: ["F2"], labSlots: ["L52"] },
      { time: "6.00 - 6.50", theorySlots: ["TEE2"], labSlots: ["L53"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L54"] },
    ],
  },
  SAT: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TDD1"], labSlots: ["L25"] },
      { time: "9.00 - 9.50", theorySlots: ["E1", "SE1"], labSlots: ["L26"] },
      { time: "10.00 - 10.50", theorySlots: ["C1"], labSlots: ["L27"] },
      { time: "11.00 - 11.50", theorySlots: ["TF1", "G1"], labSlots: ["L28"] },
      { time: "12.00 - 12.50", theorySlots: ["A1"], labSlots: ["L29"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L30"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["D2"], labSlots: ["L55"] },
      { time: "3.00 - 3.50", theorySlots: ["E2", "SD1"], labSlots: ["L56"] },
      { time: "4.00 - 4.50", theorySlots: ["TAA2", "ECS"], labSlots: ["L57"] },
      { time: "5.00 - 5.50", theorySlots: ["TBB2", "CLUB"], labSlots: ["L58"] },
      { time: "6.00 - 6.50", theorySlots: ["TFF2"], labSlots: ["L59"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L60"] },
    ],
  },
};

export const slotMap = generateSlotMap();
