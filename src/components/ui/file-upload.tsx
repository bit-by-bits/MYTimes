import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from './button';
import { Upload } from 'lucide-react';
import { fileUtils, FileUploadResult } from '../../lib/file-utils';
import { cn } from '../../lib/utils';

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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setFileName(file.name);
      try {
        const result = await fileUtils.extractTextFromFile(file);
        onFileUpload(result);
        toast.success('File uploaded successfully');
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : 'Could not extract text from this file.'
        );
      }
      setUploading(false);
    },
    [onFileUpload, onError]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div className={cn('flex flex-col items-center w-full', className)}>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileInput}
        disabled={disabled || uploading}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || uploading}
        className="flex items-center space-x-1 sm:space-x-2"
      >
        <Upload className="h-4 w-4" />
        <span className="text-xs sm:text-sm">Upload PDF</span>
      </Button>
      {uploading && (
        <div className="w-full mt-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-2 bg-primary animate-pulse w-full" />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">
            Extracting text...
          </div>
        </div>
      )}
    </div>
  );
};
