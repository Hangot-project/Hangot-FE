import Image from "next/image";
import React from "react";
import { Spinner } from "../../public/images";

function Loading() {
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
      <Image src={Spinner} />
    </div>
  );
}

export default Loading;
