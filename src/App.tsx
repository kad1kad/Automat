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

import StepsequencerGrid from "./components/StepSequencerGrid";

import TopControlPanel from "./components/TopControlPanel";
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
    <div className="w-screen h-screen px-5 leading-relaxed tracking-wider bg-black text-slate-100">
      <div>
        <header className="px-7">
          <h1 className="py-2 pb-0 text-3xl font-medium text-emerald-300">
            Aut<span className="text-yellow-300">◌</span>mat
          </h1>
          <h2 className="pb-5 text-sm font-light text-yellow-300">
            Step Sequencer and Synthesizer
          </h2>
        </header>

        <TopControlPanel
          onBpmChange={onBpmChange}
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          bpm={bpm}
        >
          <StepSequencerEffect fxWet={fxWet} setFxWet={setFxWet} />
        </TopControlPanel>

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
    </div>
  );
}

export default App;
