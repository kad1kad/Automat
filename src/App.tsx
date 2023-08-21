import { Instrument, Song, Track } from "reactronica";
import "./App.css";
import { useState } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
  const totalSteps: number = 8;

  // Initialize stepsArrayState with individual button objects
  const stepsArray: Array<Array<{ name: string; selected: boolean }>> =
    Array.from({ length: totalSteps }, () =>
      notes.map(() => ({ name: "", selected: false }))
    );
  const [stepsArrayState, setStepsArrayState] = useState(stepsArray);

  function addNoteToSteps(
    note: string,
    stepIndex: number,
    buttonIndex: number
  ) {
    if (note) {
      const updatedStepsArray = [...stepsArrayState];
      updatedStepsArray[stepIndex][buttonIndex] = {
        name: note,
        selected: !stepsArrayState[stepIndex][buttonIndex].selected,
      };
      setStepsArrayState(updatedStepsArray);
      console.log(stepsArrayState);
    }
  }

  return (
    <div className="px-5 w-screen h-screen">
      <h1 className="text-xl py-2">Automat</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Play"}
      </button>

      {/* Step Grid */}
      <div className="flex flex-row gap-1 h-[90vh]">
        {Array.from({ length: totalSteps }, (_, stepIndex) => (
          <div className="flex flex-col gap-1 flex-1" key={stepIndex}>
            {notes.map((note, buttonIndex) => (
              <button
                className={`flex-1 rounded-md text-slate-100 ${
                  stepsArrayState[stepIndex][buttonIndex]?.selected
                    ? "selected-button"
                    : "unselected-button"
                }`}
                key={note}
                onClick={() => addNoteToSteps(note, stepIndex, buttonIndex)}
              >
                {note}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Reactronica */}

      <Song isPlaying={isPlaying} bpm={90}>
        <Track mute={false} steps={stepsArrayState}>
          <Instrument type="synth" />
        </Track>
      </Song>
    </div>
  );
}

export default App;
