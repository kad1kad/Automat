import { EffectType } from "reactronica";
import { EffectName } from "../App";

export const effects: {
  name: EffectName;
  type: EffectType;
  minValue: number;
  maxValue: number;
}[] = [
  { name: "Delay", type: "feedbackDelay", minValue: 0, maxValue: 1 },
  { name: "Auto Wah", type: "autoWah", minValue: 0, maxValue: 3 },
];
