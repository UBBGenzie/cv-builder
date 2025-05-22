'use client';
import { Download } from 'lucide-react';
import { useCallback } from 'react';

export default function PdfDownloadButton() {
  const handleDownload = useCallback(async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('cv-preview');
    if (!element) return;

    await Promise.all(
      Array.from(element.querySelectorAll('img')).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
      })
    );

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  }, []);

  return (
    <button
      onClick={handleDownload}
      title="Pobierz PDF"
      style={{
        background: 'transparent',
        border: 'none',
        color: '#FAFAFA',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.75rem',
        width: '2.75rem',
        borderRadius: '6px',
      }}
    >
      <Download size={28} />
    </button>
  );
}
