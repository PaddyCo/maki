export default function(path: string): string {
  return path ? path.replace(/\\/g, "/").replace(/ /g, "%20") : "";
}

