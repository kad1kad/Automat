import { useEffect } from "react";
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
    const currentStep = updatedStepsArray[stepIndex];

    if (currentStep[buttonIndex]) {
      currentStep[buttonIndex] = [{ name: "", selected: false }];
    } else {
      currentStep[buttonIndex] = { name: notes[buttonIndex], selected: true };
    }

    updatedStepsArray[stepIndex] = currentStep;
    setStepsArrayState(updatedStepsArray);
  }

  console.log("stepsArrayState:", stepsArrayState);

  useEffect(() => {
    console.log("Updated stepsArrayState:", stepsArrayState);
  }, [stepsArrayState]);
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
