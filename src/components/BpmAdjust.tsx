type Props = {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
};

function BpmAdjust({ bpm, setBpm }: Props) {
  function handleBpmAdjust(e: React.MouseEvent<HTMLButtonElement>) {
    const clickedBtn = e.currentTarget.textContent;

    if (clickedBtn === "+") {
      setBpm((prevBpm) => prevBpm + 1);
    } else if (clickedBtn === "–") {
      setBpm((prevBpm) => prevBpm - 1);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <button className="text-xl" onClick={handleBpmAdjust}>
          –
        </button>
        <p className="cursor-none text-emerald-300">{bpm} BPM</p>
        <button className="text-xl" onClick={handleBpmAdjust}>
          +
        </button>
      </div>
    </div>
  );
}

export default BpmAdjust;
