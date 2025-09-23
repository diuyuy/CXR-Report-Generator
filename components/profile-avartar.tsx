import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileAvartar() {
  return (
    <div className="h-12 w-12 flex items-center justify-start rounded-full bg-neutral-700 p-1">
      <Avatar className="h-10 w-10">
        {/* <AvatarImage src="" alt="CP" /> */}
        <AvatarFallback className="bg-neutral-800 text-2xl font-medium text-neutral-300">
          CP
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
