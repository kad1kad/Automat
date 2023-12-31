type Props = {
  children?: React.ReactNode;
};

function TopControlPanel({ children }: Props) {
  return (
    <section className="bg-[#12161a] px-7 rounded-xl py-2">
      <div className="flex">
        <div className="hidden mr-16 md:block">
          <h3>BPM</h3>
          <h3>Instrument</h3>
          <h3>Effects</h3>
        </div>

        <div>
          {/* <BpmAdjust /> */}
          {/* <InstrumentSelector /> */}
          {/* <StepSequencerEffect /> */}

          {children}
        </div>
      </div>
    </section>
  );
}

export default TopControlPanel;
