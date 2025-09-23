"use client";

import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import DiseaseBagde from "@/app/(main)/components/disease-badge";
import BulletPointItem from "@/app/(main)/reports/components/bullet-point-item";
import { useDiagnosisForm } from "@/app/(main)/reports/hooks/use-diagnosis-form";
import type { DiagnosisForm } from "@/app/(main)/types/form-schemas";
import type { ReportData } from "@/app/(main)/types/types";
import { Button } from "@/components/ui/button";
import CustomClipLoader from "./custom-clip-loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

type Props = Pick<ReportData, "disease" | "location" | "size" | "symptoms"> & {
  onUpdate?: (values: Partial<ReportData>) => Promise<void>;
};

type DiagnosisPropsType = "location" | "size" | "symptoms";

const diagnosisProps: DiagnosisPropsType[] = ["location", "size", "symptoms"];

export default function DiagnosisCard({
  disease,
  location,
  size,
  symptoms,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useDiagnosisForm({ disease, location, size, symptoms });

  const onSubmit = async (values: DiagnosisForm) => {
    if (onUpdate) {
      setIsUpdating(true);
      await onUpdate(values);
      setIsEditing(false);
      setIsUpdating(false);
    }
  };

  const strValMap = (str: DiagnosisPropsType) => {
    switch (str) {
      case "location":
        return location;
      case "size":
        return size;
      default:
        return symptoms;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="report-card min-h-48 flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-base font-medium">Patient Information</p>
            {isUpdating ? (
              <CustomClipLoader />
            ) : isEditing ? (
              <div className="flex gap-2">
                <Button
                  type={"button"}
                  variant={"ghost"}
                  onClick={() => setIsEditing(false)}
                >
                  <XIcon />
                </Button>
                <Button
                  type="submit"
                  variant={"ghost"}
                  size={"icon"}
                  className="hide-on-print"
                >
                  <CheckIcon />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsEditing(true)}
                className="hide-on-print"
              >
                <PencilIcon />
              </Button>
            )}
          </div>
          <ul className="list-disc list-inside space-y-1">
            <BulletPointItem>
              <span>Disease: </span>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="disease"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <DiseaseBagde disease={disease} />
              )}
            </BulletPointItem>
            {diagnosisProps.map((prop) => (
              <BulletPointItem key={prop}>
                <span>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</span>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name={prop}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  strValMap(prop)
                )}
              </BulletPointItem>
            ))}
          </ul>
          <div />
        </div>
      </form>
    </Form>
  );
}
