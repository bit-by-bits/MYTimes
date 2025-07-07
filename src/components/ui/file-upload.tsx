import React, { useCallback, useState } from 'react';
import { Button } from './button';
import { Upload, FileText, File, X } from 'lucide-react';
import { fileUtils, FileUploadResult } from '../../lib/file-utils';

interface FileUploadProps {
  onFileUpload: (result: FileUploadResult) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onError,
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!fileUtils.isFileSupported(file)) {
        onError(
          `Unsupported file type: ${file.name}. Supported types: ${fileUtils.getSupportedFileTypes().join(', ')}`
        );
        return;
      }

      setIsUploading(true);
      try {
        const result = await fileUtils.extractTextFromFile(file);
        onFileUpload(result);
      } catch (error) {
        onError(
          error instanceof Error ? error.message : 'Failed to upload file'
        );
      } finally {
        setIsUploading(false);
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
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={disabled || isUploading}
          aria-label="Upload file"
          title="Upload file"
        />

        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              {isUploading
                ? 'Uploading...'
                : 'Drop file here or click to upload'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports .txt, .pdf, .docx files
            </p>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Processing file...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
