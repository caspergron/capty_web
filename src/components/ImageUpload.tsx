import React, { useState, useRef, useEffect } from 'react';
import { uploadImage } from '../services/storageService';
import { Upload, Image, Loader, AlertTriangle } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview URL when component mounts or when currentImageUrl changes
  useEffect(() => {
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, `${(file.size / 1024).toFixed(2)} KB`);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      
      // Generate a local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to Firebase Storage
      console.log('Starting upload process...');
      const imageUrl = await uploadImage(file);
      console.log('Upload successful, URL:', imageUrl);
      onImageUploaded(imageUrl);
    } catch (error) {
      console.error('Error in ImageUpload component:', error);
      let errorMessage = 'Failed to upload image. Please try again.';
      
      if (error instanceof Error) {
        // Add more specific error message if available
        errorMessage = `Upload failed: ${error.message}`;
      }
      
      setUploadError(errorMessage);
      // Keep the preview to show what the user tried to upload
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex items-start gap-4">
        {/* Preview area */}
        <div 
          className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={triggerFileInput}
        >
          {isUploading ? (
            <Loader className="h-8 w-8 text-gray-400 animate-spin" />
          ) : previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Image className="h-8 w-8 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1">
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light disabled:opacity-70"
          >
            {isUploading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Image
              </>
            )}
          </button>
          
          {uploadError && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{uploadError}</p>
            </div>
          )}
          
          <p className="mt-2 text-xs text-gray-500">
            Click to upload a disc image (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;