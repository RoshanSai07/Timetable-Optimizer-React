export type UnifiedSlot = {
  time: string;
  theorySlots: string[];
  labSlots: string[];
  isLunch?: boolean;
};

export type SlotDay = {
  slots: UnifiedSlot[];
};

export type SlotStructure = {
  [day: string]: SlotDay;
};
