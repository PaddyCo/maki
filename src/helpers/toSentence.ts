export default function(words: string[]): string {
  if (!words || words.length == 0) {
    return "";
  }

  return words.length <= 1 ? words[0] : words.slice(0, words.length - 1).join(", ") + " & " + words.slice(-1)
}
