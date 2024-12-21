import { capitalize, cn } from "@/lib/utils";
import { Clue, Direction } from "@/services/crossword";
import { Fragment } from "react";

interface CluesPanelProps {
  clues: Clue[];
  selectedClue: Clue | null;
  onClueClick: (clue: Clue) => void;
}

const getPartOfSpeech = (meaning: string) => {
  const partsOfSpeech = {
    n: "Noun",
    v: "Verb",
    adj: "Adjective",
    adv: "Adverb",
    u: "Unknown"
  };

  const part = meaning.split("\t")[0] as keyof typeof partsOfSpeech;
  return partsOfSpeech[part] || "Unknown";
};

const getDefinition = (meaning: string) => {
  const [, definition] = meaning.split("\t");
  return definition || "No definition available";
};

const CluesPanel = ({ clues, selectedClue, onClueClick }: CluesPanelProps) => {
  const directions: Direction[] = ["horizontal", "vertical"];

  const renderClueList = (direction: Direction) => {
    const clueList = clues.filter(clue => clue.direction === direction);

    return (
      <div className="space-y-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800">
          {capitalize(direction)}
        </h2>
        <ul className="space-y-2">
          {clueList.map(clue => {
            const partOfSpeech = getPartOfSpeech(clue.meaning || "");
            const definition = getDefinition(clue.meaning || "");

            const isSelected =
              selectedClue && selectedClue.index === clue.index;

            return (
              <li
                key={clue.index}
                className={cn(
                  "cursor-pointer p-2 rounded-md hover:bg-green-100 hover:text-green-600",
                  {
                    "bg-green-200 text-green-800 font-bold": isSelected
                  }
                )}
                onClick={() => onClueClick(clue)}
              >
                <div>
                  <p className="font-medium">{`${clue.index}. ${definition} (${clue.length})`}</p>
                  <p className="text-sm text-gray-600">
                    {`(${partOfSpeech}) (${clue.row + 1}, ${clue.col + 1})`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-8 p-4 justify-start">
      {directions.map(
        direction =>
          clues.some(clue => clue.direction === direction) && (
            <Fragment key={direction}>
              {renderClueList(direction as Direction)}
            </Fragment>
          )
      )}
    </div>
  );
};

export default CluesPanel;
