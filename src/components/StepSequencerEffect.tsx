type StepSequencerEffectProps = {
  wetValue: number;
  setWetValue: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  minValue: number;
  maxValue: number;
};

function StepSequencerEffect({
  wetValue,
  setWetValue,
  name,
  minValue,
  maxValue,
}: StepSequencerEffectProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.target.value);
    setWetValue(value);
  }

  return (
    <div className="flex items-center gap-1">
      <p>{name}</p>
      <input
        type="range"
        value={wetValue}
        min={minValue}
        max={maxValue}
        step={0.01}
        onChange={handleChange}
        className="w-12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

export default StepSequencerEffect;
