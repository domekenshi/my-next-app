"use client";
import dynamic from "next/dynamic";

export default function surveyjsPage() {
  const SurveyComponent = dynamic(
    () => import("@/feat/surveyjs/SurveyComponent"),
    {
      ssr: false,
    }
  );
  const SurveyPartial = dynamic(() => import("@/feat/surveyjs/SurveyPartial"), {
    ssr: false,
  });
  return (
    <>
      <SurveyPartial />
      {/* <SurveyComponent /> */}
    </>
  );
}
