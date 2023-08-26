import { instruments } from ".././utils/instruments";

import { InstrumentType } from "reactronica";

type Props = {
  onBpmChange(e: React.ChangeEvent<HTMLInputElement>): void;
  selectedInstrument: InstrumentType;
  setSelectedInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
  bpm: number;
  children?: React.ReactNode;
};

function TopControlPanel({
  onBpmChange,
  selectedInstrument,
  setSelectedInstrument,
  bpm,
  children,
}: Props) {
  function handleInstrumentChange(instrument: InstrumentType) {
    console.log("instrument clicked", instrument);
    console.log("instrument passed", selectedInstrument);
    setSelectedInstrument(instrument);
  }

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
          <div className="flex gap-2 "></div>
          <div>
            <input
              type="number"
              min={60}
              max={160}
              name=""
              id=""
              value={bpm}
              className="custom-input"
              onChange={(e) => onBpmChange(e)}
            />
          </div>
          <div className="flex gap-2">
            {instruments.map((instrument) => (
              <p
                className={`cursor-pointer  hover:underline underline-offset-4 ${
                  instrument.type === selectedInstrument
                    ? "text-emerald-300"
                    : "text-stone-400"
                }`}
                onClick={() => handleInstrumentChange(instrument.type)}
                key={instrument.type}
              >
                {instrument.name}
              </p>
            ))}
          </div>

          {/* Effect */}

          {children}
        </div>
      </div>
    </section>
  );
}

export default TopControlPanel;
