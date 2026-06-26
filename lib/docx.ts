import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import fs from "fs";
import path from "path";

export async function generateDocx(id: string, text: string): Promise<string> {
  const paragraphs = text.split("\n");

  const children = paragraphs.map((line) => {
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

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const dir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${id}.docx`);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
