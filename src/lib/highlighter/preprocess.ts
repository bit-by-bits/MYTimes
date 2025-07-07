// Adds newlines before list markers for better extraction
export function preprocessText(text: string): string {
  return text.replace(/([^-\n])([\-•*]|\d+\.)\s/g, '$1\n$2 ');
}
