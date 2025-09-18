import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  content: string;
};

export default function ReportCard({ title, content }: Props) {
  return (
    <div className="report-card flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-base font-medium">{title}</p>
        <Button variant={"ghost"} size={"icon"}>
          <PencilIcon />
        </Button>
      </div>
      <p className="text-base font-medium">{content}</p>
      <div />
    </div>
  );
}
