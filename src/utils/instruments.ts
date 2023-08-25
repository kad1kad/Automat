import { InstrumentType } from "reactronica";

export const instruments: { name: string; type: InstrumentType }[] = [
  { name: "Synth", type: "synth" },
  { name: "AM Synth", type: "amSynth" },
  { name: "FM Synth", type: "fmSynth" },
  { name: "Duo Synth", type: "duoSynth" },
];
