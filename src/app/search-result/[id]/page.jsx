"use client";

import { BarChart } from "@/components";
import { useEffect, useState } from "react";
import { dataset as result } from "@/dummy-data/datasets";
import Loading from "@/app/loading";

/**
 *
 * @param {{params: {id: string}}} param0
 * @returns
 */
function Page({ params }) {
  const [dataset, setDataset] = useState();

  useEffect(() => {
    //TODO: dataset api 호출
    setDataset(result);
  }, []);
  return (
    <div>
      <p>id: {params.id}</p>
      {dataset ? (
        <BarChart x_axis_name={result.x_axis_name} dataset={dataset} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Page;
