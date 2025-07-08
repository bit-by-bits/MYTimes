export type Highlight = {
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'code';
  text: string;
  start: number;
  end: number;
};
