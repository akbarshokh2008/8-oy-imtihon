import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { http } from "../axios/axios";
import { useParams } from "react-router-dom";

const TredingChart = () => {
  const [time, setTime] = useState(1);
  const params = useParams();

  const crytoData = async () => {
    return http
      .get(`${params.id}/market_chart?vs_currency=inr&days=${time}`)
      .then((response) => {
        const prices = response.data.prices;

        return prices.map((item) => ({
          x: new Date(item[0]),
          y: item[1].toFixed(),
        }));
      })
      .catch((error) => {
        console.error("Xatolik", error);
      });
  };
  const [series, setSeries] = useState([]);
  useEffect(() => {
    crytoData().then((prices) => {
      setSeries([{ name: "Price", data: prices }]);
    });
  }, [time]);

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#0000004b",
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
      labels: {
        style: {
          colors: "#535252a7",
        },
      },
    },
    yaxis: {
      title: {
        text: "Price",
      },
      labels: {
        style: {
          colors: "#535252a7",
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM HH:mm",
      },
    },
  };

  return (
    <div>
      <div className="sana flex gap-2  justify-center items-center"> 
        <span className="flex w-12 h-4 border-2 border-[#87CEEB]"></span>
        <p className="text-gray-500 text-sm">Price (Past {time} Days) in INR</p>
      </div>
      <Chart options={options} series={series} type="line" height={670} />
      <div className="btns flex items-center justify-around">
        <button
          className="py-3 rounded-md text-left px-6 font-bold w-[285px] text-white hover:text-black transition ease-out hover:bg-[#87CEEB] border border-[#87CEEB]"
          onClick={() => setTime(1)}
        >
          24 Hours
        </button>
        <button
          className="py-3 rounded-md text-left px-6 font-bold w-[285px] text-white hover:text-black transition ease-out hover:bg-[#87CEEB] border border-[#87CEEB]"
          onClick={() => setTime(30)}
        >
          30 Days
        </button>
        <button
          className="py-3 rounded-md text-left px-6 font-bold w-[285px] text-white hover:text-black transition ease-out hover:bg-[#87CEEB] border border-[#87CEEB]"
          onClick={() => setTime(90)}
        >
          3 Months
        </button>
        <button
          className="py-3 rounded-md text-left px-6 font-bold w-[285px] text-white hover:text-black transition ease-out hover:bg-[#87CEEB] border border-[#87CEEB]"
          onClick={() => setTime(365)}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default TredingChart;
