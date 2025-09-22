import {
  ChevronDownIcon,
  ChevronRightIcon,
  CircleIcon,
  ImageIcon,
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioCheckbox } from "@/components/ui/radio-checkbox";
import { useUploadImgStore } from "@/stores/use-upload-img-store";
import type { Patient } from "../types/types";

type Props = {
  isOpen: boolean;
  patient: Patient;
  setSelectedPatient: (id: string | null) => void;
};

export default function CollapsiblePatientItem({
  isOpen,
  patient,
  setSelectedPatient,
}: Props) {
  const [checkedImages, setCheckedImages] = useState<string[]>([]);
  const { imgs, setUploadImgs } = useUploadImgStore();

  return (
    <Collapsible open={isOpen} className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => {
          isOpen ? setSelectedPatient(null) : setSelectedPatient(patient.id);
        }}
        className="hover:cursor-pointer flex justify-between items-center p-2"
      >
        <div className="flex gap-3 items-center text-lg font-semibold">
          <CircleIcon strokeWidth={4} color={isOpen ? "#5856D6" : "#D9D9D9"} />
          {`${patient.id} ${patient.name}`}
          <div className="border border-white rounded-3xl text-center text-xs py-[2px] px-2">
            {`${patient.age}세 / ${patient.gender}`}
          </div>
        </div>
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </button>
      <CollapsibleContent className="space-y-3 mb-2">
        <div className="flex justify-around text-lg font-semibold mb-3">
          <span className="text-light-gray">Select Images</span>
          <button
            type="button"
            onClick={() => {
              checkedImages.length < patient.images.length
                ? setCheckedImages(patient.images.map((img) => img.filename))
                : setCheckedImages([]);
            }}
            className="hover:cursor-pointer"
          >
            All
          </button>
        </div>
        {patient.images.map((img) => (
          <div key={img.id} className="flex items-center gap-2 ml-11">
            <RadioCheckbox
              id={img.id}
              checked={checkedImages.includes(img.filename)}
              onCheckedChange={(checked) => {
                checked
                  ? setCheckedImages([...checkedImages, img.filename])
                  : setCheckedImages(
                      checkedImages.filter((item) => item !== img.filename)
                    );
              }}
            />
            <Label htmlFor={img.id} className="text-base hover:cursor-pointer">
              <ImageIcon size={20} />
              {img.filename}
              <span className="text-xs text-light-gray">{`(${img.date})`}</span>
            </Label>
          </div>
        ))}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              setUploadImgs([
                ...imgs,
                ...checkedImages.filter((img) => !imgs.includes(img)),
              ]);
            }}
            className=" load-image-btn"
          >
            Load images
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
