import { get } from "@/lib/api";

const fetchFromAPI = async <T>(url: string, params: object): Promise<T> => {
  try {
    return await get<T>(url, params);
  } catch {
    return {} as T;
  }
};

export const fetchRandomWord = async (
  minLength: number = 4,
  maxLength: number = 10
): Promise<string> => {
  const randomLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const params = { number: 10, length: randomLength };

  const response = await fetchFromAPI<string[]>(
    `https://random-word-api.herokuapp.com/word`,
    params
  );
  return response[0] || "";
};

export const fetchRelatedWord = async (
  word: string,
  maxLength: number = 10
): Promise<{ relatedWords: { word: string; meaning: string | null }[] }> => {
  const params = { ml: word, md: "d" };
  const relatedWordsResponse = await fetchFromAPI<
    { word: string; defs: string[] }[]
  >(`https://api.datamuse.com/words`, params);

  const relatedWords = relatedWordsResponse
    .map(({ word, defs }) => ({
      word,
      meaning: defs.length > 0 ? defs[0] : null
    }))
    .filter(item => item.word.length <= maxLength);

  return { relatedWords };
};
