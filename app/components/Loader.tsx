"use client";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[70vh]">
      <PuffLoader color="red" size={100} />
    </div>
  );
}
