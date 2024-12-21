import { Trash } from "lucide-react";
import { Button } from "../ui/button";

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onDelete: () => void;
}

const NumberPad = ({ onNumberClick, onDelete }: NumberPadProps) => (
  <div className="flex gap-4 justify-center mb-6">
    {Array.from({ length: 9 }, (_, i) => (
      <Button
        key={i + 1}
        variant="outline"
        onClick={() => onNumberClick(i + 1)}
        className="w-12 h-12 text-xl font-semibold"
      >
        {i + 1}
      </Button>
    ))}
    <Button
      onClick={onDelete}
      variant="destructive"
      className="w-12 h-12 text-lg font-semibold"
    >
      <Trash size={24} />
    </Button>
  </div>
);

export default NumberPad;
