import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";
import { useRef } from "react";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative ">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5 " />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-600">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          platform.
        </h1>

        <p className="my-6 sm:my-8 mx-w-2xl m-auto max-sm:text-xs text-gray-500">
          A modern space where ideas breathe, words flow, and every post tells a
          story. Whether it's deep dives, fresh takes, or daily thoughts, this
          is your go-to corner of the internet for authentic expression and
          inspiring content.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
          action=""
        >
          <input
            className="w-full pl-4 outline-none"
            type="text"
            ref={inputRef}
            placeholder="Search for blogs"
            required
          />
          <button
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center">
        {input && (
          <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer ">
            Clear Search
          </button>
        )}
      </div>
      <img
        className="absolute -top-50 -z-1 opacity-50 "
        src={assets.gradientBackground}
        alt=""
      />
    </div>
  );
};

export default Header;
