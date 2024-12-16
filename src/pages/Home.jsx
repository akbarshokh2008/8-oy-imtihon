import React, { createContext, useEffect, useRef, useState } from "react";
import { http } from "../axios/axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// KUTUBXONALAR
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// IMG
import Eyesvg from "../assets/images/Eye.svg";
import EyeGreensvg from "../assets/images/Eye-green.svg";

export const WatchContext = createContext();

function Home() {
  const [data, setData] = useState([]);
  const [valuta, setValuta] = useState("USD");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList") || "[]")
  );
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    http
      .get(
        `/markets?vs_currency=${valuta}&order=gecko_desc&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((data) => {
        if (data.status == 200) {
          setData(data.data);
        }
      })
      .catch(() => {
        throw new Error("xatolik");
      });
  }, [valuta, page]);
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }
  function handleWatch(crypto) {
    const isAlreadyWatched = watchList.some((item) => item.id === crypto.id);
    if (!isAlreadyWatched) {
      const copied = [...watchList, crypto];
      setWatchList(copied);
      localStorage.setItem("watchList", JSON.stringify(copied));
    }
  }

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <WatchContext.Provider
      value={{ watchList, setWatchList, valuta, setValuta }}
    >
      <Header />
      <main className="">
        <div className="slider h-[400px]">
          <div className="my-container">
            <div className="text-center pt-[55px]">
              <h1 className="font-montser font-bold text-[60px] text-[#87CEEB]">
                CRYPTOFOLIO WATCH LIST
              </h1>
              <p className="text-[#A9A9A9] mt-[-15px]">
                Get all the Info regarding your favorite Crypto Currency
              </p>
            </div>
            <div className="py-7 mt-5 ml-40">
              <Slider {...setting}>
                {data.map((value, index) => {
                  return (
                    <div key={index}>
                      <img src={value.image} alt="" width={90} height={90} />
                      <div className="flex gap-3 pt-2">
                        <p className="text-white">
                          {value.symbol.toUpperCase()}
                        </p>
                        <p
                          className={`${
                            value.market_cap_change_percentage_24h > 0
                              ? "text-green-600"
                              : "text-red-600"
                          } font- text-lg`}
                        >
                          {`${
                            value.market_cap_change_percentage_24h > 0
                              ? `+${value.market_cap_change_percentage_24h.toFixed(
                                  2
                                )}%`
                              : `${value.market_cap_change_percentage_24h.toFixed(
                                  2
                                )}%`
                          }`}
                        </p>
                      </div>
                      <h3 className="text-white text-xl font-semibold">
                        $ {value.current_price.toLocaleString()}
                      </h3>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <div className="search my-container">
          <h2 className="text-[34px] text-white font-montser text-center pt-3 tracking-[2px]">
            Cryptocurrency Prices by Market Cap
          </h2>
          <input
            type="text"
            className="w-full bg-inherit outline-none border border-gray-500 py-3 px-3 mt-4 text-white"
            placeholder="Search For a Crypto Currency.."
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />

          <div>
            <section className="text-black bg-[#87CEEB] flex py-4 rounded-md font-semibold mt-7">
              <div className="w-[445px] pl-3">Coin</div>
              <div className="w-[262px] text-end">Price</div>
              <div className="w-[262px] text-end">24h Change</div>
              <div className="w-[262px] text-end">Market Cap</div>
            </section>
            {data
              .filter((crypto) => {
                return search.toLowerCase() === ""
                  ? crypto
                  : crypto.name.toLowerCase().includes(search);
              })
              .map((crypto, index) => {
                const isWatched = watchList.some(
                  (item) => item.id === crypto.id
                );
                return (
                  <section
                    className="text-white bg-[#16171A] flex items-center py-4 border-b border-gray-500 cursor-pointer"
                    key={index}
                    onClick={() => {
                      handleDetails(crypto.id);
                      handleWatch(crypto);
                    }}
                  >
                    <div className="w-[445px] pl-3 flex gap-2">
                      <img src={crypto.image} alt="cryto rasmi" width={56} />
                      <div className="text flex flex-col gap-2">
                        <p>{crypto.symbol.toUpperCase()}</p>
                        <p>{crypto.name}</p>
                      </div>
                    </div>
                    <div className="w-[262px] text-end text-xl">
                      $ {crypto.current_price.toLocaleString()}
                    </div>
                    <div className="w-[262px] flex justify-end items-center gap-2">
                      <img
                        src={isWatched ? EyeGreensvg : Eyesvg}
                        alt="eye image"
                        width={26}
                        height={24}
                      />

                      <p
                        className={`${
                          crypto.market_cap_change_percentage_24h > 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-semibold text-lg `}
                      >
                        {`${
                          crypto.market_cap_change_percentage_24h > 0
                            ? `+${crypto.market_cap_change_percentage_24h.toFixed(
                                2
                              )}%`
                            : `${crypto.market_cap_change_percentage_24h.toFixed(
                                2
                              )}%`
                        }`}
                      </p>
                    </div>
                    <div className="w-[262px] text-end text-xl">
                      {crypto.total_volume.toLocaleString()}M
                    </div>
                  </section>
                );
              })}
          </div>
        </div>
        <div className="pag flex items-center justify-center mt-10">
          <Stack spacing={2}>
            <Pagination
              count={9}
              page={page}
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#ffffff",
                  borderColor: "#d81b60",
                },
                "& .Mui-selected": {
                  backgroundColor: "#FFFFFF29",
                  color: "white",
                },
              }}
            />
          </Stack>
        </div>
      </main>
    </WatchContext.Provider>
  );
}

export default Home;
