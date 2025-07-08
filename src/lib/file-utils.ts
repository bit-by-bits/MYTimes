import * as pdfjsLib from 'pdfjs-dist';
import PdfWorker from 'pdfjs-dist/build/pdf.worker?worker';

// Register the PDF.js worker correctly for Vite:
pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker();

export interface FileUploadResult {
  text: string;
  fileName: string;
  fileType: string;
}

export const fileUtils = {
  async extractTextFromFile(file: File): Promise<FileUploadResult> {
    const { name: fileName, type: fileType } = file;

    try {
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        return this.extractFromTxt(file);
      }
      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return this.extractFromPdf(file);
      }
      if (
        fileType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')
      ) {
        return this.extractFromDocx(file);
      }

      throw new Error('Unsupported file type');
    } catch (error) {
      console.error('File extraction failed:', error);
      throw new Error(`Failed to extract text from ${fileName}`);
    }
  },

  extractFromTxt(file: File): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          text: reader.result as string,
          fileName: file.name,
          fileType: 'text/plain',
        });
      };

      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  },

  async extractFromPdf(file: File): Promise<FileUploadResult> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      text += pageText + '\n\n';
    }

    return {
      text: text.trim(),
      fileName: file.name,
      fileType: 'application/pdf',
    };
  },

  async extractFromDocx(file: File): Promise<FileUploadResult> {
    // TODO: Replace with actual extraction using mammoth
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          text: `[DOCX content extracted from ${file.name}]\n\nThis is a placeholder. Use mammoth to extract real DOCX content.`,
          fileName: file.name,
          fileType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      }, 1000);
    });
  },

  getSupportedFileTypes(): string[] {
    return ['.txt', '.pdf', '.docx'];
  },

  isFileSupported(file: File): boolean {
    const supportedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const supportedExtensions = ['.txt', '.pdf', '.docx'];

    return (
      supportedTypes.includes(file.type) ||
      supportedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
  },
};
