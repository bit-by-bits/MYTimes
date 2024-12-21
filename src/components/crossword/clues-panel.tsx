import { capitalize } from "@/lib/utils";
import { Clue, Direction } from "@/services/crossword";
import { Fragment } from "react";
import ClueItem from "./clue-item";

interface CluesPanelProps {
  clues: Clue[];
  selectedClue: Clue | null;
  onClueClick: (clue: Clue | null) => void;
}

const CluesPanel = ({ clues, selectedClue, onClueClick }: CluesPanelProps) => {
  const renderClueList = (direction: Direction) => (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800">
        {capitalize(direction)}
      </h2>
      <ul className="space-y-2">
        {clues
          .filter(clue => clue.direction === direction)
          .map(clue => (
            <ClueItem
              key={clue.index}
              clue={clue}
              isSelected={selectedClue?.index === clue.index}
              onClueClick={() =>
                onClueClick(selectedClue?.index === clue.index ? null : clue)
              }
            />
          ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-8 p-4 justify-start">
      {["horizontal", "vertical"].map(direction =>
        clues.some(clue => clue.direction === direction) ? (
          <Fragment key={direction}>
            {renderClueList(direction as Direction)}
          </Fragment>
        ) : null
      )}
    </div>
  );
};

export default CluesPanel;
