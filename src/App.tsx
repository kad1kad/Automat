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
import InstrumentSelector from "./components/InstrumentSelector";
import BpmAdjust from "./components/BpmAdjust";

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

  // Typing for reactronica
  function convertToStepType(stepsArrayState: InitialStepsArray): StepType[] {
    return stepsArrayState.map((step) =>
      step.filter((note) => note.selected).map((note) => note.name)
    ) as StepType[];
  }

  return (
    <div className="h-screen px-5 mx-auto text-sm leading-relaxed tracking-wider bg-black max-w-7xl text-slate-100 md:text-[1rem]">
      <div>
        <Header
          pageHeading={"Automat"}
          pageSubHeading={"Step Sequencer and Synthesizer"}
        />

        <TopControlPanel>
          <BpmAdjust bpm={bpm} setBpm={setBpm} />
          <InstrumentSelector
            selectedInstrument={selectedInstrument}
            setSelectedInstrument={setSelectedInstrument}
          />
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
