import React from "react";

type Props = {
  fxWet: number;
  setFxWet: React.Dispatch<React.SetStateAction<number>>;
};

function Effect({ fxWet, setFxWet }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.target.value);
    setFxWet(value);
  }

  return (
    // TODO: Refactor to allow multiple effects processing
    <div className="flex gap-4">
      <div className="flex items-center gap-1">
        <p>Delay</p>
        <input
          type="range"
          value={fxWet}
          min={0}
          max={1}
          step={0.01}
          onChange={handleChange}
          className="w-12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Effect;
