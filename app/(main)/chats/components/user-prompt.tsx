import Image from "next/image";

type Props = {
  content: string;
  image?: string[];
  patient: {
    id: string;
    gender: string;
    age: number;
  };
};

const imgMap = (img: string) => {
  const n = Number(img[2]);

  switch (n % 3) {
    case 0:
      return "/images/cxr_01.jpg";
    case 1:
      return "/images/cxr_02.jpeg";
    default:
      return "/images/cxr_03.jpeg";
  }
};

export default function UserPrompt({ content, image, patient }: Props) {
  console.log(image);
  return (
    <div className="flex flex-col gap-4 items-end">
      {image && (
        <div className="bg-[#1E1E28] rounded-xl p-4">
          {image.map((img) => (
            <div key={img} className="flex flex-col gap-5">
              <Image src={imgMap(img)} alt={img} width={212} height={212} />
              <div className="flex flex-col gap-1">
                <p>ID: {patient.id}</p>
                <p>GENDER: {patient.gender}</p>
                <p>AGE: {patient.age}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-[#1E1E28] rounded-xl w-1/2 p-4 text-lg font-medium">
        {content}
      </div>
    </div>
  );
}
