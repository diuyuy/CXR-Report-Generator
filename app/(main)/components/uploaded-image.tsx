"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative h-20 overflow-hidden flex items-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hover:cursor-pointer"
        >
          <Image src={imgMap(src)} alt={alt} width={84} height={84} />
        </button>
        <button
          type="button"
          onClick={() => removeImage(src)}
          className="absolute top-2 right-2 hover:cursor-pointer bg-gray-500 rounded-full"
        >
          <XIcon color="white" />
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imgMap(src) }]}
        plugins={[Zoom]}
        carousel={{ finite: false }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
          wheelZoomDistanceFactor: 100,
        }}
      />
      <div></div>
    </>
  );
}
