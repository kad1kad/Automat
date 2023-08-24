import { notes } from "../utils/scales";

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
    const updatedStepsArray = [...stepsArrayState];
    const currentNoteState = stepsArrayState[stepIndex][buttonIndex];

    if (currentNoteState?.selected) {
      // Remove the selected note object without shifting other objects
      delete updatedStepsArray[stepIndex][buttonIndex];
    } else {
      // Add the note to the array
      updatedStepsArray[stepIndex][buttonIndex] = {
        name: notes[buttonIndex],
        selected: true,
      };
    }

    // Check if the sub-array is empty and reset it to an empty array. This solves the problem of unwanted sounds
    if (updatedStepsArray[stepIndex].every((item) => item === undefined)) {
      updatedStepsArray[stepIndex] = [];
    }

    setStepsArrayState(updatedStepsArray);
    console.log("updatedStepsArray:", updatedStepsArray);
  }

  console.log("stepsArrayState:", stepsArrayState);
  return (
    <div className="flex flex-row gap-1 py-5">
      <div className="flex flex-col gap-1">
        <div className="h-7 rounded-md ">{""}</div>
        {notes.map((note) => (
          // Side row displaying all notes
          <div
            className="font-light flex h-12 rounded-md justify-center flex-col"
            key={note}
          >
            <p>{note}</p>
          </div>
        ))}
      </div>
      {Array.from({ length: totalSteps }, (_, stepIndex) => (
        // Show Step Index above grid
        <div className="flex flex-col gap-1 flex-1" key={stepIndex}>
          <p
            className={`rounded-md h-7  text-center font-light ${
              currentStepIndex === stepIndex ? "bg-blue-500" : ""
            }`}
          >
            {stepIndex + 1}
          </p>

          {notes.map((note, buttonIndex) => (
            <button
              className={`h-12 rounded-md ${
                stepsArrayState[stepIndex][buttonIndex]?.selected
                  ? "selected-button"
                  : "unselected-button"
              } ${currentStepIndex === stepIndex ? "currentStep-button" : ""} ${
                currentStepIndex === stepIndex &&
                stepsArrayState[stepIndex][buttonIndex]?.selected
                  ? "currentStepSelected-button"
                  : ""
              }`}
              key={note}
              onClick={() => toggleNoteSelection(stepIndex, buttonIndex)}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StepsequencerGrid;
