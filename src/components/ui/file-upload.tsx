import React, { useCallback, useState } from 'react';
import { Button } from './button';
import { Upload, FileText, File, X } from 'lucide-react';
import { fileUtils, FileUploadResult } from '../../lib/file-utils';
import { cn } from '../../lib/utils';
// No-op: pdfjs-dist/webpack is needed for browser compatibility
// Set workerSrc for pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist/webpack';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface FileUploadProps {
  onFileUpload: (result: FileUploadResult) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onError,
  disabled = false,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        let text = '';
        if (file.name.endsWith('.pdf')) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer })
              .promise;
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              text += content.items.map(item => item.str).join(' ') + '\n';
            }
          } catch (e) {
            // fallback: try to extract as plain text
            text = await file.text();
          }
        } else if (file.name.endsWith('.docx')) {
          try {
            const mammoth = await import('mammoth');
            const arrayBuffer = await file.arrayBuffer();
            const { value } = await mammoth.extractRawText({ arrayBuffer });
            text = value;
          } catch (e) {
            // fallback: try to extract as plain text
            text = await file.text();
          }
        } else if (file.name.endsWith('.txt')) {
          text = await file.text();
        } else {
          throw new Error(
            'Unsupported file type. Only PDF, DOCX, and TXT are allowed.'
          );
        }
        if (!text.trim()) throw new Error('No text extracted');
        onFileUpload({ text, fileName: file.name });
        onError?.('File uploaded successfully');
      } catch (err) {
        onError?.(
          err instanceof Error
            ? err.message
            : 'Could not extract text from this file.'
        );
      }
    },
    [onFileUpload, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <File className="h-4 w-4" />;
    if (fileName.endsWith('.docx')) return <FileText className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={handleFileInput}
        disabled={disabled}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="flex items-center space-x-2"
      >
        <Upload className="h-4 w-4" />
        <span>Upload File</span>
      </Button>
    </div>
  );
};
