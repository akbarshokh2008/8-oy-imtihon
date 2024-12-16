import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { http } from "../axios/axios";
import TredingChart from "../components/Trading";
function Details() {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    http
      .get(`/${params.id}`)
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="border-b border-black">
        <section className="my-container flex justify-between py-3 ">
          <div className="logo">
            <Link
              to="/"
              className="font-montser font-bold text-xl leading-8 text-[rgb(135,206,235)]"
            >
              CRYPTOFOLIO
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <select className="bg-inherit text-white">
              <option value="USD">USD</option>
              <option value="EUR">EURO</option>
              <option value="RUB">RUBL</option>
            </select>
            <button className="py-2 px-4 rounded-md text-black bg-[#87CEEB] hover:bg-[#70b0c9]">
              WATCH LIST
            </button>
          </div>
        </section>
      </header>
      <main className="px-4 flex mt-6 font-montser">
        <section className="left text-white w-[28vw]  border-r-2 border-gray-500 pr-6">
          <div className="name flex flex-col items-center gap-5 pb-5">
            <img
              src={product.image?.large}
              alt="cryto rasmi"
              width={200}
              height={200}
            />
            <h2 className="text-white text-5xl font-bold">{product.name}</h2>
          </div>
          <p className="leading-7">{product.description?.en.slice(0, 188)}</p>
          <div className="text-2xl flex flex-col gap-5 pt-5 pb-64">
            <p>
              <span className="text-2xl font-bold">Rank: </span>
              {product.market_cap_rank}
            </p>
            <p>
              <span className="text-2xl font-bold">Current Price: </span>${" "}
              {product.market_data?.current_price.usd.toLocaleString()}
            </p>
            <p>
              <span className="text-2xl font-bold">Market Cap: </span>${" "}
              {product.market_data?.market_cap.usd.toLocaleString()}
            </p>
          </div>
        </section>
        <section className="right w-[72vw] ">
          <TredingChart />
        </section>
      </main>
    </>
  );
}

export default Details;
