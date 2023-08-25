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
import BottomControlPanel from "./components/BottomControlPanel";
import Header from "./components/Header";

interface Step {
  name: string;
  selected: boolean;
}

type InitialStepsArray = Array<Array<Step>>;

function App() {
  const totalSteps = 8;
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
        <Header
          pageHeading={"Automat"}
          pageSubHeading={"Step Sequencer and Synthesizer"}
        />

        <TopControlPanel
          onBpmChange={onBpmChange}
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          bpm={bpm}
        >
          <StepSequencerEffect fxWet={fxWet} setFxWet={setFxWet} />
        </TopControlPanel>

        <StepsequencerGrid
          setStepsArrayState={setStepsArrayState}
          stepsArrayState={stepsArrayState}
          totalSteps={totalSteps}
          currentStepIndex={currentStepIndex}
        />

        <BottomControlPanel isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

        {/* Reactronica */}
        <Song isPlaying={isPlaying} bpm={bpm}>
          <Track
            mute={false}
            steps={convertToStepType(stepsArrayState)}
            onStepPlay={(_, index) => {
              console.log("Current step index:", index);
              console.log("Current step array:", stepsArrayState);
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
