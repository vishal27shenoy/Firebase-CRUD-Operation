"use client";
import Image from "next/image";
import Upload from "./components/Upload";
import { useState } from "react";
import Retrive from "./components/Retrive";
export default function Home() {
  const [change, setchange] = useState(true);
  return (
    <div className="box-border bg-gray-200 min-h-screen pt-6">
      <div className="flex space-x-2 ml-auto mr-8 w-fit border">
        <button
          onClick={() => setchange(!change)}
          className="h-12 w-24 bg-blue-400 rounded-l-lg"
        >
          Upload
        </button>
        <button onClick={() => setchange(!change)}>Retrive</button>
      </div>
      {change ? <Upload /> : <Retrive />}
    </div>
  );
}
