"use client";

import React, { useEffect, useState } from "react";
import { dataset as result } from "@/dummy-data/datasets";
import { BarChart } from "@/components";

export default function Test() {
  return <BarChart x_axis_name={result.x_axis_name} dataset={result} />;
}
