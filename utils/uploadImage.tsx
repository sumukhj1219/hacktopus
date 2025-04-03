import React, { useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import axios from "axios";
import { Camera } from "lucide-react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const authenticator = async () => {
  try {
    const response = await axios.get("/api/auth");

    if (!response.data) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onError = (err: any) => {
    console.error("Upload Error:", err);
    setError("Image upload failed. Please try again.");
    setLoading(false);
  };

  const onSuccess = (res: any) => {
    console.log("Upload Success:", res);
    if (res?.url) {
      onChange(res.url);
      setError("");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-[280px] h-[280px] bg-amber-50 rounded-xl overflow-hidden">
      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey}>
        <label
          htmlFor="file-upload"
          className="absolute top-2 right-2 bg-gradient-to-bl from-yellow-300 via-red-500 to-pink-600 p-2 rounded-full shadow-md cursor-pointer transition"
        >
          <Camera className="w-5 h-5 text-secondary" />
        </label>
        <IKUpload
          id="file-upload"
          fileName="upload.jpg"
          onError={onError}
          onSuccess={onSuccess}
          folder="/HackathonFinder"
          authenticator={authenticator}
          className="hidden"
        />
      </ImageKitProvider>

      {value ? (
        <img
          src={value}
          alt="Uploaded"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={'./event.jpg'}
          alt="Default"
          className="w-full h-full object-cover"
        />
      )}

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
