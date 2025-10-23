/**
 * PDF parsing utilities using pdfjs-dist/legacy
 */

export async function parsePDF(file: File): Promise<string> {
  try {
    // Dynamic import to avoid worker issues
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    // Set worker source to the legacy worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.mjs';
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    console.log('[PDF Parse] File size:', arrayBuffer.byteLength, 'bytes');

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });
    const pdfDocument = await loadingTask.promise;

    console.log('[PDF Parse] Pages:', pdfDocument.numPages);

    // Extract text from all pages
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    const text = fullText.trim();

    console.log('[PDF Parse] Text length:', text.length);
    console.log('[PDF Parse] First 200 chars:', text.substring(0, 200));

    if (!text || text.length === 0) {
      throw new Error('PDF не содержит текста. Возможно, это отсканированный документ. Попробуйте PDF с текстовым содержимым.');
    }

    if (text.length < 100) {
      throw new Error(`PDF содержит слишком мало текста (${text.length} символов). Нужно минимум 100 символов для генерации квиза.`);
    }

    console.log('[PDF Parse] Successfully extracted', text.length, 'characters');
    return text;
  } catch (error) {
    console.error('[PDF Parse] Error:', error);
    if (error instanceof Error) {
      // If it's our custom error, throw it as is
      if (error.message.includes('PDF не содержит') || error.message.includes('PDF содержит')) {
        throw error;
      }
      throw new Error(`Ошибка при чтении PDF: ${error.message}`);
    }
    throw new Error('Не удалось прочитать PDF файл');
  }
}

/**
 * Validate that PDF contains extractable text
 */
export async function validatePDFText(file: File): Promise<boolean> {
  try {
    const text = await parsePDF(file);
    return text.length >= 100;
  } catch {
    return false;
  }
}
