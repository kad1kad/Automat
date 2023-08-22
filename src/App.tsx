import { Effect, Instrument, Song, Track } from "reactronica";
import "./App.css";
import { useState } from "react";
import { notes } from "./utils/scales";
import { instruments } from "./utils/instruments";
import StepsequencerGrid from "./components/StepSequencerGrid";
import StepSequencerEffect from "./components/StepSequencerEffect";

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

  const [fxWet, setFxWet] = useState(0);

  return (
    <div className="px-5 w-screen h-screen bg-black text-slate-100 leading-relaxed tracking-wider">
      <h1 className="text-3xl py-2 font-medium text-emerald-300">Aut◌mat</h1>

      <button
        className="tracking-wider"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>

      <section className="flex">
        <div className="w-28">
          <h3>Instrument</h3>
          <h3>Effects</h3>
        </div>
        {/* Instrument Select */}
        <div>
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

          <StepSequencerEffect fxWet={fxWet} setFxWet={setFxWet} />
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
          <Effect type="feedbackDelay" wet={fxWet} />
        </Track>
      </Song>
    </div>
  );
}

export default App;
