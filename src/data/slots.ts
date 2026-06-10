import type { SlotStructure } from "../types/slots";

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
  const map: Record<
    string,
    {
      day: string;

      time: string;
    }
  > = {};

  Object.entries(slotStructure).forEach(([day, structure]) => {
    structure.slots.forEach((slotRow) => {
      /*
            THEORY SLOTS
          */

      slotRow.theorySlots.forEach((slot) => {
        if (slot !== "-") {
          map[slot] = {
            day,

            time: slotRow.time,
          };
        }
      });

      /*
            LAB SLOTS
          */

      slotRow.labSlots.forEach((slot) => {
        map[slot] = {
          day,

          time: slotRow.time,
        };
      });
    });
  });

  return map;
};
export const slotStructure: SlotStructure = {
  MON: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: [], labSlots: ["L61"] },
      { time: "9.00 - 9.50", theorySlots: ["TA1"], labSlots: ["L62"] },
      { time: "10.00 - 10.50", theorySlots: ["TB1"], labSlots: ["L63"] },
      { time: "11.00 - 11.50", theorySlots: ["E1"], labSlots: ["L64"] },
      { time: "12.00 - 12.50", theorySlots: ["E1"], labSlots: ["L65"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L66"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["TA2"], labSlots: ["L67"] },
      { time: "3.00 - 3.50", theorySlots: ["TB2"], labSlots: ["L68"] },
      { time: "4.00 - 4.50", theorySlots: ["E2"], labSlots: ["L69"] },
      { time: "5.00 - 5.50", theorySlots: ["E2"], labSlots: ["L70"] },
      { time: "6.00 - 6.50", theorySlots: [], labSlots: ["L71"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L72"] },
    ],
  },
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
      { time: "8.00 - 8.50", theorySlots: ["TG1"], labSlots: ["L7"] },
      { time: "9.00 - 9.50", theorySlots: ["C1"], labSlots: ["L8"] },
      { time: "10.00 - 10.50", theorySlots: ["D1"], labSlots: ["L9"] },
      { time: "11.00 - 11.50", theorySlots: ["A1", "SB1"], labSlots: ["L10"] },
      { time: "12.00 - 12.50", theorySlots: ["F1"], labSlots: ["L11"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L12"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["E2"], labSlots: ["L37"] },
      { time: "3.00 - 3.50", theorySlots: ["C2"], labSlots: ["L38"] },
      { time: "4.00 - 4.50", theorySlots: ["A2", "SB1"], labSlots: ["L39"] },
      { time: "5.00 - 5.50", theorySlots: ["D2"], labSlots: ["L40"] },
      { time: "6.00 - 6.50", theorySlots: ["TFF2"], labSlots: ["L41"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L42"] },
    ],
  },
  THU: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TG1"], labSlots: ["L13"] },
      { time: "9.00 - 9.50", theorySlots: ["C1"], labSlots: ["L14"] },
      { time: "10.00 - 10.50", theorySlots: ["D1"], labSlots: ["L15"] },
      { time: "11.00 - 11.50", theorySlots: ["A1", "SB2"], labSlots: ["L16"] },
      { time: "12.00 - 12.50", theorySlots: ["TF1"], labSlots: ["L17"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L18"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["E2"], labSlots: ["L43"] },
      { time: "3.00 - 3.50", theorySlots: ["C2"], labSlots: ["L44"] },
      { time: "4.00 - 4.50", theorySlots: ["A2", "SB1"], labSlots: ["L45"] },
      { time: "5.00 - 5.50", theorySlots: ["D2"], labSlots: ["L46"] },
      { time: "6.00 - 6.50", theorySlots: ["TFF2"], labSlots: ["L47"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L48"] },
    ],
  },
  FRI: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: ["TDD1"], labSlots: ["L19"] },
      { time: "9.00 - 9.50", theorySlots: ["B1", "SA2"], labSlots: ["L20"] },
      { time: "10.00 - 10.50", theorySlots: ["A1", "SF2"], labSlots: ["L21"] },
      { time: "11.00 - 11.50", theorySlots: ["G1", "TF1"], labSlots: ["L22"] },
      { time: "12.00 - 12.50", theorySlots: ["E1"], labSlots: ["L23"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L24"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["TC2"], labSlots: ["L49"] },
      { time: "3.00 - 3.50", theorySlots: ["B2", "SA1"], labSlots: ["L50"] },
      { time: "4.00 - 4.50", theorySlots: ["A2", "SE1"], labSlots: ["L51"] },
      { time: "5.00 - 5.50", theorySlots: ["G2", "TF2"], labSlots: ["L52"] },
      { time: "6.00 - 6.50", theorySlots: ["TEE2"], labSlots: ["L53"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L54"] },
    ],
  },
  SAT: {
    slots: [
      { time: "8.00 - 8.50", theorySlots: [], labSlots: ["L25"] },
      { time: "9.00 - 9.50", theorySlots: ["TC1"], labSlots: ["L26"] },
      { time: "10.00 - 10.50", theorySlots: ["C1"], labSlots: ["L27"] },
      { time: "11.00 - 11.50", theorySlots: ["F1"], labSlots: ["L28"] },
      { time: "12.00 - 12.50", theorySlots: ["G1", "TD1"], labSlots: ["L29"] },
      {
        time: "12.50 - 1.30",
        theorySlots: [],
        labSlots: ["L30"],
        isLunch: true,
      },
      { time: "2.00 - 2.50", theorySlots: ["G2", "TD2"], labSlots: ["L55"] },
      { time: "3.00 - 3.50", theorySlots: ["D2"], labSlots: ["L56"] },
      { time: "4.00 - 4.50", theorySlots: ["F2"], labSlots: ["L57"] },
      { time: "5.00 - 5.50", theorySlots: ["C2"], labSlots: ["L58"] },
      { time: "6.00 - 6.50", theorySlots: [], labSlots: ["L59"] },
      { time: "6.50 - 7.40", theorySlots: [], labSlots: ["L60"] },
    ],
  },
};

export const slotMap = generateSlotMap();
