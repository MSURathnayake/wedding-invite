// Turns the on-page invitation card (<InviteCard />) into a picture, a PDF and a shareable file.
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// The card is 720 x 1000 px; the PDF page keeps the same 0.72 ratio.
const PAGE_W_MM = 144;
const PAGE_H_MM = 200;

export async function captureCard(node) {
  if (!node) throw new Error('The invitation card is not ready');
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  return html2canvas(node, {
    scale: 2,
    backgroundColor: '#fffdf8',
    useCORS: true,
    logging: false,
    onclone: (doc) => {
      // The card is parked off-screen on the page; bring it into view inside the clone.
      const wrap = doc.getElementById('invite-capture');
      if (wrap) {
        wrap.style.left = '0px';
        wrap.style.top = '0px';
      }
    },
  });
}

export function canvasToPdf(canvas) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [PAGE_W_MM, PAGE_H_MM], compress: true });
  pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, PAGE_W_MM, PAGE_H_MM, undefined, 'FAST');
  return pdf;
}

export function pdfToBase64(pdf) {
  const uri = pdf.output('datauristring');
  return uri.slice(uri.indexOf('base64,') + 7);
}

export function pdfToFile(pdf, fileName) {
  return new File([pdf.output('blob')], fileName, { type: 'application/pdf' });
}

export function downloadCanvasPng(canvas, fileName) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, 'image/png');
}

export const safeFileName = (text) =>
  String(text || '')
    .replace(/[^\p{L}\p{N}-]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'guest';
