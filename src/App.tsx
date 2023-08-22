import { Effect, Instrument, Song, Track } from "reactronica";
import "./App.css";
import { useState } from "react";
import { notes } from "./utils/scales";
import { instruments } from "./utils/instruments";
import StepsequencerGrid from "./components/StepSequencerGrid";

function App() {
  // Step Sequencer
  const totalSteps: number = 8;
  const [isPlaying, setIsPlaying] = useState(false);
  const initialStepsArray: Array<Array<{ name: string; selected: boolean }>> =
    Array.from({ length: totalSteps }, () =>
      notes.map(() => ({ name: "", selected: false }))
    );
  const [stepsArrayState, setStepsArrayState] = useState(initialStepsArray);
  const [selectedInstrument, setSelectedInstrument] = useState("synth");

  // Effects State
  const [delayWet, setDelayWet] = useState<number>(0.0);
  const [reverbWet, setReverbWet] = useState<number>(0.0);

  function toggleDelay(value: number) {
    if (value === 1) {
      setDelayWet(0);
    } else {
      setDelayWet(1);
    }
  }
  function toggleReverb(value: number) {
    if (value > 1) {
      setReverbWet(0);
    } else {
      setReverbWet(10);
    }
  }

  return (
    <div className="px-5 w-screen h-screen bg-black text-slate-100 leading-relaxed">
      <h1 className="text-xl py-2 ">Automat</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Play"}
      </button>

      {/* Instrument Select */}
      <section className="flex gap-2">
        {instruments.map((instrument) => (
          <p
            className="cursor-pointer"
            onClick={() => setSelectedInstrument(instrument.type)}
          >
            {instrument.name}
          </p>
        ))}
      </section>

      {/* Effects */}
      <section>
        <div className="flex gap-1">
          <h3>Delay</h3>
          <input
            type="range"
            value={delayWet}
            min={0}
            max={1}
            onClick={(e) => toggleDelay(parseInt(e.target.value))}
            className="w-7"
          />
        </div>

        <div className="flex gap-1">
          <h3>Auto Wah</h3>
          <input
            type="range"
            value={reverbWet}
            min={0}
            max={10}
            onClick={(e) => toggleReverb(parseInt(e.target.value))}
            className="w-7"
          />
        </div>
      </section>

      {/* Step Grid */}
      <StepsequencerGrid
        setStepsArrayState={setStepsArrayState}
        stepsArrayState={stepsArrayState}
        totalSteps={totalSteps}
      />

      {/* Reactronica */}
      <Song isPlaying={isPlaying} bpm={90}>
        <Track mute={false} steps={stepsArrayState}>
          <Instrument type={selectedInstrument} />
          <Effect type="feedbackDelay" wet={delayWet} />
          <Effect type="autoWah" wet={reverbWet} />
        </Track>
      </Song>
    </div>
  );
}

export default App;
