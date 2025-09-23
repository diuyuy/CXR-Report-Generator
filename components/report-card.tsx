import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  content: string;
};

export default function ReportCard({ title, content }: Props) {
  return (
    <div className="report-card flex flex-col gap-3 justify-between">
      <div className="flex justify-between">
        <p className="text-base font-semibold">{title}</p>
        <Button variant={"ghost"} size={"icon"} className="hide-on-print">
          <PencilIcon />
        </Button>
      </div>
      <p className="text-base font-medium">{content}</p>
      <div />
    </div>
  );
}
