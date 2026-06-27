import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

function buildDocxChildren(text: string) {
  return text.split("\n").map((line) => {
    if (!line.trim()) {
      return new Paragraph({ text: "" });
    }
    if (line.startsWith("## ")) {
      return new Paragraph({
        text: line.replace(/^## /, ""),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      });
    }
    if (line.startsWith("# ")) {
      return new Paragraph({
        text: line.replace(/^# /, ""),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      });
    }
    const bold = /^[А-ЯA-Z\s]{3,}:/.test(line.trim());
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
          bold,
          size: 24,
          font: "Times New Roman",
        }),
      ],
    });
  });
}

export async function generateDocxBuffer(text: string): Promise<Buffer> {
  const doc = new Document({
    sections: [{ properties: {}, children: buildDocxChildren(text) }],
  });
  return Packer.toBuffer(doc);
}

/** @deprecated Используй generateDocxBuffer — пишет в память, не на диск */
export async function generateDocx(id: string, text: string): Promise<string> {
  const fs = await import("fs");
  const path = await import("path");
  const dir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${id}.docx`);
  const buffer = await generateDocxBuffer(text);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
