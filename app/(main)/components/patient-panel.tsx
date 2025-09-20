import { CircleXIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import PatientList from "./patient-list";

export default function PatientPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="h-[96%] shrink-0 w-88 my-auto bg-textbox rounded-2xl flex flex-col gap-4 py-4 px-4">
          <div className="flex justify-between items-center">
            <span className="text-xl text-[#8C8C8C] font-medium">Patients</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="hover:bg-accent dark:hover:bg-accent/50 hover:cursor-pointer"
            >
              <MinusIcon size={24} />
            </button>
          </div>
          <button type="button" className="hover:cursor-pointer text-start">
            <div className="w-full relative bg-[#494952] rounded-md mb-4 py-2 px-4 text-lg font-medium">
              Search
              <CircleXIcon className="absolute right-2 top-1/2 -translate-y-1/2 size-5" />
            </div>
          </button>
          <PatientList />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute top-8 right-4 rotate-270 origin-right bg-[#5856D6] text-white font-medium py-2 px-4 rounded-t-md hover:cursor-pointer whitespace-nowrap hover:bg-[#5856D6]/90"
        >
          Patients
        </button>
      )}
    </>
  );
}
