import { InstrumentType } from "reactronica";

export const instruments: { name: string; type: InstrumentType }[] = [
  { name: "Synth", type: "synth" },
  { name: "AM Synth", type: "amSynth" },
  { name: "Duo Synth", type: "duoSynth" },
  { name: "FM Synth", type: "fmSynth" },
];
