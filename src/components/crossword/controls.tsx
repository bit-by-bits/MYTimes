import { Button } from "@/components/ui/button";

interface ControlsProps {
  hintsLeft: boolean;
  onHint: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

const Controls = ({ hintsLeft, onHint, onReset, onSubmit }: ControlsProps) => {
  const buttonClass = "w-32 h-11 text-lg font-semibold";

  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        onClick={onHint}
        disabled={!hintsLeft}
        variant="outline"
        className={buttonClass}
      >
        {hintsLeft ? "Take Hint" : "No Hints"}
      </Button>
      <div className="flex space-x-4">
        <Button onClick={onReset} variant="outline" className={buttonClass}>
          Reset
        </Button>
        <Button onClick={onSubmit} className={buttonClass}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Controls;
