import { Instrument, Song, Track } from "reactronica";
import "./App.css";
import { useState } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
  const totalSteps: number = 8;

  const initialStepsArray: Array<Array<{ name: string; selected: boolean }>> =
    Array.from({ length: totalSteps }, () =>
      notes.map(() => ({ name: "", selected: false }))
    );
  const [stepsArrayState, setStepsArrayState] = useState(initialStepsArray);

  function toggleNoteSelection(stepIndex: number, buttonIndex: number) {
    const updatedStepsArray = [...stepsArrayState];
    const currentNoteState = stepsArrayState[stepIndex][buttonIndex];

    if (currentNoteState.selected) {
      // Remove the note from the array
      updatedStepsArray[stepIndex][buttonIndex] = { name: "", selected: false };
    } else {
      // Add the note to the array
      updatedStepsArray[stepIndex][buttonIndex] = {
        name: notes[buttonIndex],
        selected: true,
      };
    }

    setStepsArrayState(updatedStepsArray);
  }

  const instruments = [
    { name: "AM Synth", type: "amSynth" },

    { name: "Synth", type: "synth" },
  ];
  const [selectedInstrument, setSelectedInstrument] = useState("");

  return (
    <div className="px-5 w-screen h-screen bg-black text-slate-100 leading-relaxed">
      <h1 className="text-xl py-2 ">Automat</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Play"}
      </button>

      <div className="flex gap-2">
        {instruments.map((instrument) => (
          <p
            className="cursor-pointer"
            onClick={() => setSelectedInstrument(instrument.type)}
          >
            {instrument.name}
          </p>
        ))}
      </div>

      {/* Step Grid */}
      <div className="flex flex-row gap-1 h-[80vh]">
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
                onClick={() => toggleNoteSelection(stepIndex, buttonIndex)}
              ></button>
            ))}
          </div>
        ))}
      </div>

      {/* Reactronica */}
      <Song isPlaying={isPlaying} bpm={90}>
        <Track mute={false} steps={stepsArrayState}>
          <Instrument type={selectedInstrument} />
        </Track>
      </Song>
    </div>
  );
}

export default App;
