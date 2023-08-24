import {
  Effect,
  Instrument,
  InstrumentType,
  Song,
  StepType,
  Track,
} from "reactronica";
import "./App.css";
import { useState } from "react";
import { instruments } from "./utils/instruments";
import StepsequencerGrid from "./components/StepSequencerGrid";
import StepSequencerEffect from "./components/StepSequencerEffect";

interface Step {
  name: string;
  selected: boolean;
}

type InitialStepsArray = Array<Array<Step>>;

function App() {
  const [totalSteps, setTotalSteps] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);

  const initialStepsArray: InitialStepsArray = Array.from(
    { length: totalSteps },
    () => []
  );
  const [stepsArrayState, setStepsArrayState] = useState(initialStepsArray);
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentType>("synth");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [fxWet, setFxWet] = useState(0);

  const [bpm, setBpm] = useState(80);

  function onBpmChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 60 && value <= 160) {
      setBpm(value);
    }
  }

  // Typing for reactronica
  function convertToStepType(stepsArrayState: InitialStepsArray): StepType[] {
    return stepsArrayState.map((step) =>
      step.filter((note) => note.selected).map((note) => note.name)
    ) as StepType[];
  }

  return (
    <div className="px-5 w-screen h-screen bg-black text-slate-100 leading-relaxed tracking-wider">
      <div>
        <header className="px-7">
          <h1 className="pb-0 text-3xl py-2 font-medium text-emerald-300">
            Aut<span className="text-yellow-300">◌</span>mat
          </h1>
          <h2 className="text-sm pb-5 text-yellow-300 font-light">
            Step Sequencer and Synthesizer
          </h2>
        </header>

        {/* Top Control Panel */}
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
              <div className="gap-2 flex">
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
              <StepSequencerEffect fxWet={fxWet} setFxWet={setFxWet} />
            </div>
          </div>
        </section>
      </div>

      {/* Step Grid */}
      <StepsequencerGrid
        setStepsArrayState={setStepsArrayState}
        stepsArrayState={stepsArrayState}
        totalSteps={totalSteps}
        currentStepIndex={currentStepIndex}
      />

      {/* Bottom Control Panel */}
      <section className="bg-[#12161a] px-7 rounded-xl py-2">
        <button
          className="tracking-wider"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </section>

      {/* Reactronica */}
      <Song isPlaying={isPlaying} bpm={bpm}>
        <Track
          mute={false}
          steps={convertToStepType(stepsArrayState)}
          onStepPlay={(_, index) => {
            console.log("Current step index:", index);
            setCurrentStepIndex(index);
          }}
        >
          <Instrument type={selectedInstrument} />
          <Effect type="feedbackDelay" wet={fxWet} />
        </Track>
      </Song>
    </div>
  );
}

export default App;
