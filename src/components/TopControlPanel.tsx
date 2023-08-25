import { instruments } from ".././utils/instruments";

import { InstrumentType } from "reactronica";

type Props = {
  totalSteps: number;
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
  onBpmChange(e: React.ChangeEvent<HTMLInputElement>): void;
  selectedInstrument: InstrumentType;
  setSelectedInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
  bpm: number;
  children?: React.ReactNode;
};

function TopControlPanel({
  totalSteps,
  setTotalSteps,
  onBpmChange,
  selectedInstrument,
  setSelectedInstrument,

  bpm,
  children,
}: Props) {
  return (
    <section className="bg-[#12161a] px-7 rounded-xl py-2">
      <div className="flex">
        <div className="w-28">
          <h3>Steps</h3>
          <h3>BPM</h3>
          <h3>Instrument</h3>
          <h3>Effects</h3>
        </div>

        {/* Instrument Select */}
        <div>
          <div className="flex gap-2 ">
            <p
              className={`cursor-pointer text-stone-400 hover:underline underline-offset-4 ${
                totalSteps === 8 ? "text-emerald-300" : ""
              }`}
              onClick={() => setTotalSteps(8)}
            >
              8
            </p>
            <p
              className={`cursor-pointer text-stone-400 hover:underline underline-offset-4 ${
                totalSteps === 16 ? "text-emerald-300" : ""
              }`}
              onClick={() => setTotalSteps(16)}
            >
              16
            </p>
          </div>
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
                className={`cursor-pointer text-stone-400 hover:underline underline-offset-4 ${
                  selectedInstrument === instrument.type
                    ? "text-emerald-300"
                    : ""
                }`}
                onClick={() => setSelectedInstrument(instrument.type)}
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
