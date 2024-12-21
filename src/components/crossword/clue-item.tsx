import { cn } from "@/lib/utils";
import { Clue } from "@/services/crossword";

const ClueItem = ({
  clue,
  isSelected,
  onClueClick
}: {
  clue: Clue;
  isSelected: boolean;
  onClueClick: () => void;
}) => {
  const parseMeaning = (meaning: string) => {
    const partsOfSpeechMap = {
      n: "Noun",
      v: "Verb",
      adj: "Adjective",
      adv: "Adverb",
      u: "Unknown"
    };
    const [part, definition] = meaning.split("\t");
    return {
      partOfSpeech:
        partsOfSpeechMap[part as keyof typeof partsOfSpeechMap] || "Unknown",
      definition: definition || "No definition available"
    };
  };

  const { partOfSpeech, definition } = parseMeaning(clue.meaning || "");

  return (
    <li
      key={clue.index}
      className={cn(
        "cursor-pointer p-3 rounded-md hover:bg-[#FA9B0366] hover:text-black",
        { "bg-[#D6B23599] text-black": isSelected }
      )}
      onClick={onClueClick}
    >
      <div className="flex flex-col">
        <p className="text-black">{`${clue.index}. ${definition} (${clue.length})`}</p>
        <p
          className={cn(
            "text-sm italic",
            isSelected ? "text-black" : "text-gray-500"
          )}
        >
          {`(${partOfSpeech}) (${clue.row + 1}, ${clue.col + 1})`}
        </p>
      </div>
    </li>
  );
};

export default ClueItem;
