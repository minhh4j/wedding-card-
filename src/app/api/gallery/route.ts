import { readdir } from "fs/promises";
import path from "path";

// Lists every image in public/gallery, sorted by file name.
export async function GET() {
  const dir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = (await readdir(dir))
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {}
  return Response.json(files.map((f) => `/gallery/${encodeURIComponent(f)}`));
}
