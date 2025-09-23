"use client";

import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import BulletPointItem from "@/app/(main)/reports/components/bullet-point-item";
import { usePatientInfoForm } from "@/app/(main)/reports/hooks/use-patient-info-form";
import type { PatientInfoForm } from "@/app/(main)/types/form-schemas";
import type { ReportData } from "@/app/(main)/types/types";
import { Button } from "@/components/ui/button";
import CustomClipLoader from "./custom-clip-loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

type Props = {
  age: number;
  gender: "남" | "여";
  shootingDate: string;
  onUpdate?: (values: Partial<ReportData>) => Promise<void>;
};

export default function PatientInformationCard({
  age,
  gender,
  shootingDate,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = usePatientInfoForm({ age: String(age), gender, shootingDate });

  const onSubmit = async ({ age, gender, shootingDate }: PatientInfoForm) => {
    if (onUpdate) {
      setIsUpdating(true);
      await onUpdate({ age: Number(age), gender, shootingDate });
      setIsEditing(false);
      setIsUpdating(false);
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
          <ul className="space-y-1">
            <BulletPointItem>
              <span>Age: </span>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="age"
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
                age
              )}
            </BulletPointItem>
            <BulletPointItem>
              <span>Gender: </span>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="gender"
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
                gender
              )}
            </BulletPointItem>
            <BulletPointItem>
              <span className="shrink-0">Shooting date: </span>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="shootingDate"
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
                shootingDate
              )}
            </BulletPointItem>
          </ul>
          <div />
        </div>
      </form>
    </Form>
  );
}
