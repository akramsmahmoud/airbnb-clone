"use client";
import { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const uploadPreset = "ec2qb4cc";

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed 
                border-2 
                p-20 
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="text-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={value}
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
