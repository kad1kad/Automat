import { notes } from "../utils/scales";
import NoteButton from "./NoteButton";

type StepSequencerGridProps = {
  setStepsArrayState: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        selected: boolean;
      }[][]
    >
  >;
  stepsArrayState: {
    name: string;
    selected: boolean;
  }[][];
  totalSteps: number;
  currentStepIndex: number;
};

function StepsequencerGrid({
  setStepsArrayState,
  stepsArrayState,
  totalSteps,
  currentStepIndex,
}: StepSequencerGridProps) {
  function toggleNoteSelection(stepIndex: number, buttonIndex: number) {
    const selectedNotes = [...stepsArrayState];
    const noteAtStepBtn = stepsArrayState[stepIndex][buttonIndex];

    if (noteAtStepBtn?.selected) {
      // Remove the selected note object without shifting other objects
      delete selectedNotes[stepIndex][buttonIndex];
    } else {
      // Add the note to the array
      selectedNotes[stepIndex][buttonIndex] = {
        name: notes[buttonIndex],
        selected: true,
      };
    }
    // Check if the sub-array is empty and reset it to an empty array
    if (selectedNotes[stepIndex].every((item) => item === undefined)) {
      selectedNotes[stepIndex] = [];
    }

    // Passing notes into Reactronica Track component
    setStepsArrayState(selectedNotes);
  }

  console.log("stepsArrayState:", stepsArrayState);
  return (
    <div className="flex flex-row gap-1 py-5">
      <div className="flex flex-col gap-1">
        <div className="rounded-md h-7 ">{""}</div>
        {notes.map((note) => (
          // Side row displaying all notes
          <div
            className="flex flex-col justify-center h-12 font-light rounded-md"
            key={note}
          >
            <p>{note}</p>
          </div>
        ))}
      </div>
      {Array.from({ length: totalSteps }, (_, stepIndex) => (
        // Show Step Index above grid
        <div className="flex flex-col flex-1 gap-1" key={stepIndex}>
          <p
            className={`rounded-md h-7  text-center font-light ${
              currentStepIndex === stepIndex ? "bg-blue-500" : ""
            }`}
          >
            {stepIndex + 1}
          </p>
          {notes.map((note, buttonIndex) => (
            <NoteButton
              stepsArrayState={stepsArrayState}
              stepIndex={stepIndex}
              currentStepIndex={currentStepIndex}
              toggleNoteSelection={toggleNoteSelection}
              note={note}
              buttonIndex={buttonIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default StepsequencerGrid;
