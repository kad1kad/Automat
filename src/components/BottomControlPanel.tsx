type Props = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

function BottomControlPanel({ isPlaying, setIsPlaying }: Props) {
  return (
    <section className="bg-[#12161a] px-7 rounded-xl py-2">
      <button
        className="tracking-wider"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
    </section>
  );
}

export default BottomControlPanel;
