import { CircleXIcon, MinusIcon, SearchIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/utils";
import { useUploadImgStore } from "@/stores/use-upload-img-store";
import PatientList from "./patient-list";
import SearchedPatientsList from "./searched-patients-list";

export default function PatientPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [patientsQuery, setPatientsQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { setUploadImgs } = useUploadImgStore();

  const handleOnQueryChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setPatientsQuery(e.target.value);
  }, 500);

  useEffect(() => {
    if (!inputRef.current) return;

    if (isSearching) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <>
      {isOpen ? (
        <div className="h-[96%] shrink-0 w-88 my-auto bg-textbox rounded-2xl flex flex-col gap-4 py-4 px-4">
          <div className="flex justify-between items-center">
            <span className="text-xl text-light-gray font-medium">
              Patients
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="hover:bg-accent dark:hover:bg-accent/50 hover:cursor-pointer"
            >
              <MinusIcon size={24} />
            </button>
          </div>
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="w-full relative bg-[#494952] rounded-md py-2 px-2 text-lg font-medium">
                <input
                  type="text"
                  onChange={handleOnQueryChange}
                  placeholder="Searching..."
                  ref={inputRef}
                  className="w-full h-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPatientsQuery("");
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                >
                  <CircleXIcon />
                </button>
              </div>
              <Button
                variant={"outline"}
                onClick={() => {
                  setUploadImgs(null, []);
                  setPatientsQuery("");
                  if (inputRef.current) inputRef.current.value = "";
                  setIsSearching(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearching(true)}
              className="hover:cursor-pointer text-start"
            >
              <div className="w-full relative bg-[#494952] rounded-md mb-4 py-2 px-4 text-lg font-medium">
                Search
                <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 size-5" />
              </div>
            </button>
          )}
          {isSearching ? (
            <SearchedPatientsList query={patientsQuery} />
          ) : (
            <PatientList />
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute top-8 right-4 rotate-270 origin-right bg-[#5856D6] text-white font-medium py-2 px-4 rounded-t-md hover:cursor-pointer whitespace-nowrap hover:bg-[#5856D6]/90"
        >
          Patient
        </button>
      )}
    </>
  );
}
