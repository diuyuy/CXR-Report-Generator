import { XIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  removeImage: (imgUrl: string) => void;
};

const imgMap = (src: string) => {
  if (src.startsWith("00")) {
    const n = Number(src[6]);

    switch (n % 3) {
      case 0:
        return "/images/cxr_01.jpg";
      case 1:
        return "/images/cxr_02.jpeg";
      default:
        return "/images/cxr_03.jpeg";
    }
  }

  return src;
};

export default function UploadedImage({ src, alt, removeImage }: Props) {
  return (
    <div className="relative h-20 overflow-hidden flex items-center">
      <Image src={imgMap(src)} alt={alt} width={84} height={84} />
      <button
        type="button"
        onClick={() => removeImage(src)}
        className="absolute top-2 right-2 hover:cursor-pointer"
      >
        <XIcon color="gray" />
      </button>
    </div>
  );
}
