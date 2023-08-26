type NoteButtonProps = {
  stepsArrayState: {
    name: string;
    selected: boolean;
  }[][];
  stepIndex: number;
  currentStepIndex: number;
  toggleNoteSelection: (stepIndex: number, buttonIndex: number) => void;
  note: string;
  buttonIndex: number;
};

function NoteButton({
  stepsArrayState,
  stepIndex,
  currentStepIndex,
  toggleNoteSelection,
  note,
  buttonIndex,
}: NoteButtonProps) {
  return (
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
  );
}

export default NoteButton;
