import { Instrument, Song, Track } from "reactronica";
import "./App.css";
import { useState } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
  const totalSteps = 4;

  return (
    <div className="px-5">
      <h1>Synthica</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Play"}
      </button>

      {/* Step Grid */}
      <div className="flex flex-row gap-1">
        {Array.from({ length: totalSteps }, (_, stepIndex) => (
          <div className="flex flex-col gap-1" key={stepIndex}>
            {notes.map((note) => (
              <button className="bg-slate-500 h-12 w-12 rounded-md" key={note}>
                {note}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Reactronica */}

      <Song isPlaying={isPlaying} bpm={90}>
        <Track
          mute={false}
          steps={[
            ["C3", "E3", "G3"],
            ["F4", "A4", "D3"],
          ]}
        >
          <Instrument type="synth" />
        </Track>
      </Song>
    </div>
  );
}

export default App;
