type Props = {
  disease: string;
};

export default function DiseaseBagde({ disease }: Props) {
  return (
    <div className="inline border-3 border-[#FF5E5E] bg-white rounded-2xl py-1 px-2 text-center text-xs text-[#FF5E5E]">
      {disease}
    </div>
  );
}
