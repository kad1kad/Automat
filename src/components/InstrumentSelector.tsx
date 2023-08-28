import { InstrumentType } from "reactronica";
import { instruments } from "../utils/instruments";

type Props = {
  selectedInstrument: InstrumentType;
  setSelectedInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
};

function InstrumentSelector({
  selectedInstrument,
  setSelectedInstrument,
}: Props) {
  function handleInstrumentChange(instrument: InstrumentType) {
    console.log("instrument clicked", instrument);
    console.log("instrument passed", selectedInstrument);
    setSelectedInstrument(instrument);
  }
  return (
    <div>
      <div className="flex gap-2">
        {instruments.map((instrument) => (
          <p
            className={`cursor-pointer  hover:underline underline-offset-4  ${
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
    </div>
  );
}

export default InstrumentSelector;
