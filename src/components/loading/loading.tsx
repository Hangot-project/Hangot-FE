import Image from "next/image";
import React from "react";
import { Spinner } from "../../../public/images";

export function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image alt="spinner" src={Spinner} />
    </div>
  );
}
