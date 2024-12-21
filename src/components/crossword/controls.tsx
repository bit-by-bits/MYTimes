import { Button } from "@/components/ui/button";

interface ControlsProps {
  hintsLeft: boolean;
  onHint: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

const Controls = ({ hintsLeft, onHint, onReset, onSubmit }: ControlsProps) => {
  const buttonClass = "w-32 h-11 text-lg font-semibold";
  const buttons = [
    {
      label: hintsLeft ? "Take Hint" : "No Hints",
      onClick: onHint,
      disabled: !hintsLeft,
      variant: "outline" as const
    },
    { label: "Reset", onClick: onReset, variant: "outline" as const },
    { label: "Submit", onClick: onSubmit, variant: "default" as const }
  ];

  return (
    <div className="flex justify-between items-center mb-6">
      {buttons.map(({ label, onClick, disabled, variant }) => (
        <Button
          key={label}
          onClick={onClick}
          disabled={disabled}
          variant={variant}
          className={buttonClass}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default Controls;
