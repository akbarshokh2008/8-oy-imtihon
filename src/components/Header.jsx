import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WatchContext } from "../pages/Home";
// IMG
import Close from "../assets/images/close.svg";

function Header() {
  const { watchList, setWatchList } = useContext(WatchContext);
  const [sideBar, setSideBar] = useState(false);

  function handleSelect(e) {
    setValuta(e.target.value);
  }
  function handleDelete(id) {
    const filter = watchList.filter((cryto) => cryto.id !== id);
    setWatchList(filter);
    localStorage.setItem("watchList", JSON.stringify(filter));
  }
  return (
    <header className="my-container flex justify-between py-3">
      <div className="logo">
        <Link
          to="/"
          className="font-montser font-bold text-xl leading-8 text-[rgb(135,206,235)]"
        >
          CRYPTOFOLIO
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <select
          className="bg-inherit text-white"
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EURO</option>
          <option value="RUB">RUBL</option>
        </select>
        <button
          className="py-2 px-4 rounded-md text-black bg-[#87CEEB] hover:bg-[#70b0c9]"
          onClick={() => {
            setSideBar(true);
          }}
        >
          WATCH LIST
        </button>

        <div
          className={`fixed top-0 z-20 right-0 h-full bg-[#515151] text-white shadow-lg transition-transform transform ${
            sideBar ? "translate-x-0 w-[23vw]" : "translate-x-full w-0"
          }`}
        >
          <div className="flex justify-between items-center p-4 ">
            <h2 className="text-2xl font-bold pl-36">WATCHLIST</h2>
            <button
              onClick={() => setSideBar(false)}
              className="text-gray-400 hover:text-white"
            >
              <img src={Close} alt="close" width={24} />
            </button>
          </div>
          <div className="p-4">
            <div className="wrapper grid grid-cols-2 gap-12">
              {watchList.map((value, index) => {
                return (
                  <article
                    className="bg-[#14161A] rounded-2xl py-2 px-3 flex flex-col   gap-2"
                    key={index}
                  >
                    <div className="flex items-center flex-col">
                      <img
                        src={value.image}
                        alt="cryto img"
                        className="mb-5"
                        width={120}
                      />
                      <p>$ {value.current_price.toLocaleString()}</p>
                    </div>

                    <button
                      className="bg-red-600 text-white py-2 px-8 rounded-md"
                      onClick={() => {
                        handleDelete(value.id);
                      }}
                    >
                      Remove
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
