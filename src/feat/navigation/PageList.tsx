import Link from "next/link";
import React from "react";

const PageList = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={"/design/tailwind"}>TailwindCSS</Link>
      <Link href={"/debug"}>Debug</Link>
    </div>
  );
};
export default PageList;
