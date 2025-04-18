"use client";

import NumberFormat from "@/utils/NumberFormat";
import { useEffect, useState } from "react";
interface Props {
  stockCount: number;
}
export default function TopCountryTimeBar({ stockCount }: Props) {
  const [japanDateTime, setJapanDateTime] = useState("");
  const [uaeDateTime, setUAEDateTime] = useState("");
  const optionsDxb: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const optionsJap: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const japanDateTime = new Date().toLocaleString("en-US", optionsJap);
      const uaeDateTime = new Date().toLocaleString("en-US", optionsDxb);

      setJapanDateTime(japanDateTime);
      setUAEDateTime(uaeDateTime);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className=" firstsection col-lg-4 col-md-6 col-12 text-center ">
        <div className="flex items-center my-2 justify-start">

          
          <span className=" inline-flex items-center gap-x-1.5 ml-3 rounded-md border-2 border-[#221C63] px-2 py-1 text-lg align-middle tracking-tight  font-medium text-[#221C63]">
            <svg
              className="h-1.5 w-1.5 fill-[#FFB703]"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            TOTAL REGISTERD
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/4/43/Sedan-car.svg"
              className="h-5 mr-2"
            />{" "}
            :
            <span className="ml-1 bg-[#221C63] rounded-2xl p-1 text-white">
              {" "}
              <NumberFormat numbers={stockCount} />
            </span>
          </span>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 text-center mt-1">
        <div className="flex items-center mt-3 gap-2">
          <img
            alt="UAE Flag"
            src="./uae_flag.jpg"
            className="h-4 mr-2"
          />
          <img alt="UAE Time" src="./Clock.svg" className="h-5" />
          <span className="inline-flex items-center gap-x-1.5 ml-3 rounded-md bg-[#221C63] px-2 py-1 text-xs font-medium text-white">
            <svg
              className="h-1.5 w-1.5 fill-[#FFB703]"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {uaeDateTime}
          </span>
        </div>
      </div>
      <div className="secondsection col-lg-4 col-md-6 col-12 text-center mt-1">
        <div className="flex items-center mt-3 gap-2">
          <img
            alt="Japan Flag"
            src="./JP.svg"
            className="h-4 mr-2"
          />
          <img
            alt="Japan Time"
            src="./Clock.svg"
            className="h-5"
          />
          <span className="inline-flex items-center gap-x-1.5 ml-3 rounded-md bg-[#221C63] px-2 py-1 text-xs font-medium text-white">
            <svg
              className="h-1.5 w-1.5 fill-[#FFB703]"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {japanDateTime}
          </span>
        </div>
      </div>
      
      </>
  )}