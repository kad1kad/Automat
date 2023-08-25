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

  return (
    <div className="flex flex-row gap-1 h-[80vh] mt-5">
      <div className="flex flex-col gap-1">
        <div className="rounded-md h-7">{""}</div>
        {notes.map((note) => (
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
            className={`rounded-md text-center font-light ${
              currentStepIndex === stepIndex ? "bg-blue-500" : ""
            }`}
          >
            {stepIndex + 1}
          </p>

          {notes.map((note, buttonIndex) => (
            <button
              className={`h-12 rounded-md text-slate-100   ${
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
