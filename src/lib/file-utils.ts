// File upload and text extraction utilities

export interface FileUploadResult {
  text: string;
  fileName: string;
  fileType: string;
}

export const fileUtils = {
  async extractTextFromFile(file: File): Promise<FileUploadResult> {
    const fileName = file.name;
    const fileType = file.type;

    try {
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        return await this.extractFromTxt(file);
      } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return await this.extractFromPdf(file);
      } else if (
        fileType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')
      ) {
        return await this.extractFromDocx(file);
      } else {
        throw new Error('Unsupported file type');
      }
    } catch (error) {
      console.error('File extraction failed:', error);
      throw new Error(`Failed to extract text from ${fileName}`);
    }
  },

  async extractFromTxt(file: File): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target?.result as string;
        resolve({
          text,
          fileName: file.name,
          fileType: 'text/plain',
        });
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  },

  async extractFromPdf(file: File): Promise<FileUploadResult> {
    // For now, return a placeholder since pdfjs would need to be added as a dependency
    // In a real implementation, you would use pdfjs-dist
    return new Promise(resolve => {
      // Simulate PDF extraction
      setTimeout(() => {
        resolve({
          text: `[PDF content extracted from ${file.name}]\n\nThis is a placeholder for PDF text extraction. In a real implementation, you would use pdfjs-dist to extract text from PDF files.`,
          fileName: file.name,
          fileType: 'application/pdf',
        });
      }, 1000);
    });
  },

  async extractFromDocx(file: File): Promise<FileUploadResult> {
    // For now, return a placeholder since mammoth would need to be added as a dependency
    // In a real implementation, you would use mammoth
    return new Promise(resolve => {
      // Simulate DOCX extraction
      setTimeout(() => {
        resolve({
          text: `[DOCX content extracted from ${file.name}]\n\nThis is a placeholder for DOCX text extraction. In a real implementation, you would use mammoth to extract text from DOCX files.`,
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
