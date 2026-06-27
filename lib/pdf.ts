import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDFBuffer(text: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 60;
  const lineHeight = 16;
  const maxWidth = pageWidth - margin * 2;
  const fontSize = 11;

  function wrapText(t: string, maxW: number): string[] {
    const words = t.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      const w = font.widthOfTextAtSize(test, fontSize);
      if (w > maxW && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  const paragraphs = text.split("\n").filter((l) => l !== undefined);
  const allLines: { text: string; isBold: boolean }[] = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      allLines.push({ text: "", isBold: false });
      continue;
    }
    const isBold = para.startsWith("##") || /^[А-ЯA-Z\s]+:/.test(para.trim());
    const cleanPara = para.replace(/^#+\s*/, "").trim();
    const wrapped = wrapText(cleanPara, maxWidth);
    for (const l of wrapped) allLines.push({ text: l, isBold });
    allLines.push({ text: "", isBold: false });
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  for (const { text: lineText, isBold } of allLines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    if (lineText) {
      page.drawText(lineText, {
        x: margin,
        y,
        size: fontSize,
        font: isBold ? bold : font,
        color: rgb(0, 0, 0),
      });
    }
    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/** @deprecated Используй generatePDFBuffer — пишет в память, не на диск */
export async function generatePDF(id: string, text: string): Promise<string> {
  const fs = await import("fs");
  const path = await import("path");
  const dir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${id}.pdf`);
  const buffer = await generatePDFBuffer(text);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
