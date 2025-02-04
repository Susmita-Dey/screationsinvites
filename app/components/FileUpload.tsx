"use client";

import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

function FileUpload({
  onSuccess,
}: {
  onSuccess: (response: IKUploadResponse) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName="product-image.png"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        validateFile={(file: File) => {
          const validTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
          ];
          if (!validTypes.includes(file.type)) {
            setError("Invalid file type. Please upload a valid image file.");
          }

          if (file.size > 5 * 1024 * 1024) {
            setError("File size should be less than 5MB.");
          }

          return true;
        }}
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FileUpload;
