export type Highlight = {
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'codeblock';
  text: string;
  start: number;
  end: number;
};
