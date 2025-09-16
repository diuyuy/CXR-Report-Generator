import Image from "next/image";

type Props = {
  content: string;
  image?: string[];
};

const imgMap = (img: string) => {
  const n = Number(img[2]);

  switch (n % 2) {
    case 0:
      return "/images/cxr_01.jpg";
    case 1:
      return "/images/cxr_02.jpeg";
    default:
      return "/images/cxr_03.jpeg";
  }
};

export default function UserPrompt({ content, image }: Props) {
  console.log(image);
  return (
    <div className="flex flex-col gap-4 items-end">
      {image && (
        <div className="bg-[#1E1E28] rounded-xl p-4">
          {image.map((img) => (
            <div key={img}>
              <Image src={imgMap(img)} alt={img} width={212} height={212} />
            </div>
          ))}
        </div>
      )}
      <div className="bg-[#1E1E28] rounded-xl w-xl p-4 text-lg font-medium">
        {content}
      </div>
    </div>
  );
}
