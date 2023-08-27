type Props = {
  children?: React.ReactNode;
};

function TopControlPanel({ children }: Props) {
  return (
    <section className="bg-[#12161a] px-7 rounded-xl py-2">
      <div className="flex">
        <div className="w-28">
          <h3>BPM</h3>
          <h3>Instrument</h3>
          <h3>Effects</h3>
        </div>

        {/* Instrument Select */}
        <div>
          {/* Effect */}

          {children}
        </div>
      </div>
    </section>
  );
}

export default TopControlPanel;
