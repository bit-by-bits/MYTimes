import { capitalize } from "@/lib/utils";
import { Clue } from "@/services/crossword";

interface CluesPanelProps {
  clues: Clue[];
  onClueClick: (row: number, col: number) => void;
}

const CluesPanel = ({ clues, onClueClick }: CluesPanelProps) => {
  const renderClueList = (direction: string) => {
    const clueList = clues.filter(clue => clue.direction === direction);

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">{capitalize(direction)}</h2>
        <ul>
          {clueList.map((clue, index) => (
            <li
              key={index}
              className="cursor-pointer mb-1 hover:text-blue-500"
              onClick={() => onClueClick(clue.row, clue.col)}
            >
              {`${clue.index}. ${clue.word} (${clue.length})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex space-x-4 justify-center gap-4">
      {renderClueList("horizontal")}
      {renderClueList("vertical")}
    </div>
  );
};

export default CluesPanel;
