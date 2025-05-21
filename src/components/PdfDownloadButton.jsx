'use client';

export default function PdfDownloadButton() {
  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.getElementById('cv-preview');
    if (!element) return;

    // Poczekaj, aż wszystkie obrazki się załadują (np. zdjęcie profilowe)
    await Promise.all(
      Array.from(element.querySelectorAll('img')).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
      })
    );

    // Eksport do PDF
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
  };

  return (
    <button onClick={handleDownload} style={{ marginBottom: '1rem' }}>
      📄 Pobierz CV jako PDF
    </button>
  );
}
