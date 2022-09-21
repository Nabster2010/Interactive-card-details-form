import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
  };

  function cc_format(number) {
    if (!number) return "0000 0000 0000 0000";
    const value = number.toString();
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  return (
    <div className="w-full min-h-screen  bg-gray-100 flex justify-center items-center">
      <div className="wrapper w-[375px] md:w-full bg-White  flex flex-col md:flex-row ">
        <div className="relative bg-mobile md:bg-desktop w-full md:w-1/3 h-64 md:h-screen bg-no-repeat bg-cover">
          <div className="absolute top-8 right-4 md:top-80 md:-right-36 w-[300px]">
            <img
              src="./images/bg-card-back.png"
              alt="card back"
              className="object-cover w-full h-auto"
            />
            <div className=" absolute top-[72px] right-10 text-xs  text-White">
              {watch("cvc")}
            </div>
          </div>
          <div className="absolute top-32 right-16 md:top-32 md:-right-24 w-[300px]">
            <img
              src="./images/bg-card-front.png"
              alt="card back"
              className=" object-cover w-full h-auto"
            />
            <div className=" absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
            <div className=" absolute top-6 left-16 w-4 h-4 border border-white rounded-full"></div>
            <div className="absolute text-xl text-White tracking-widest bottom-12 left-4 leading-6">
              {cc_format(watch("cardNumber"))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-White text-xs tracking-widest">
              <h3>{watch("name")}</h3>
              <h3>
                {watch("mm")}/{watch("yy")}
              </h3>
            </div>
          </div>
        </div>
        {submitted ? (
          <div className="mt-20  mb-10  px-4 md:flex md:justify-center md:items-center md:w-2/3 ">
            <div className="flex flex-col items-center flex-grow justify-center space-y-6 md:max-w-sm md:ml-24">
              <div className="flex justify-center items-center">
                <img src="./images/icon-complete.svg" alt="" />
              </div>
              <h1 className="text-xl text-VeryDarkViolet tracking-widest">
                THANK YOU!
              </h1>
              <h3 className="text-DarkGrayishViolet">
                We've added your card details
              </h3>
              <div className="self-stretch pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    reset();
                  }}
                  className="text-White px-2 py-3 rounded-lg w-full bg-VeryDarkViolet hover:bg-VeryDarkViolet/80 transition "
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 mb-10 md:w-2/3 md:flex md:items-center md:justify-center">
            <form
              className="space-y-6 md:max-w-sm md:ml-24 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" flex flex-col justify-center items-start px-4 space-y-2">
                <label
                  htmlFor="name"
                  className="text-[11px] font-medium tracking-widest text-VeryDarkViolet"
                >
                  CARDHOLDER NAME
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  type="text"
                  className={`ring-1  text-VeryDarkViolet focus:outline  focus:ring-0  px-2 py-2  placeholder:text-LightGrayishViolet rounded-lg w-full ${
                    errors.name
                      ? "focus:outline-error ring-error"
                      : "focus:outline-VeryDarkViolet ring-LightGrayishViolet"
                  } `}
                  placeholder="e.g. Jane Appleseed"
                />
                {errors.name && (
                  <span className=" block  text-error text-[10px] ">
                    Can't be blank
                  </span>
                )}
              </div>
              <div className=" flex flex-col justify-center items-start px-4 space-y-2">
                <label
                  htmlFor="card-no"
                  className="text-[11px] font-medium tracking-widest text-VeryDarkViolet"
                >
                  CARD NUMBER
                </label>
                <input
                  id="card-no"
                  defaultValue="0000 0000 0000 0000"
                  {...register("cardNumber", {
                    required: true,
                    pattern:
                      /^(?:([0-9]{16}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
                  })}
                  type="number"
                  className={`ring-1  text-VeryDarkViolet focus:outline  focus:ring-0  px-2 py-2  placeholder:text-LightGrayishViolet rounded-lg w-full ${
                    errors.cardNumber
                      ? "focus:outline-error ring-error"
                      : "focus:outline-VeryDarkViolet ring-LightGrayishViolet"
                  } `}
                  placeholder="e.g. 3434 3434 3434 344"
                />
                {errors.cardNumber && (
                  <span className=" block  text-error text-[10px] ">
                    Wrong format
                  </span>
                )}
              </div>
              <div className="flex justify-center px-4 space-x-2 ">
                <div className="w-1/2 space-y-2 ">
                  <label
                    htmlFor="exp-date"
                    className="block text-[11px] font-medium tracking-widest text-VeryDarkViolet"
                  >
                    EXP. DATE (MM/YY)
                  </label>
                  <div className="flex space-x-2 w-full">
                    <input
                      id="exp-date"
                      defaultValue=""
                      {...register("mm", { required: true, maxLength: 2 })}
                      type="text"
                      className={`w-1/2 ring-1  text-VeryDarkViolet focus:outline  focus:ring-0  px-2 py-2  placeholder:text-LightGrayishViolet rounded-lg  ${
                        errors.mm
                          ? "focus:outline-error ring-error"
                          : "focus:outline-VeryDarkViolet ring-LightGrayishViolet"
                      } `}
                      placeholder="MM"
                    />
                    <input
                      name="yy"
                      defaultValue=""
                      {...register("yy", { required: true, maxLength: 2 })}
                      type="text"
                      className={`ring-1  text-VeryDarkViolet focus:outline  focus:ring-0  px-2 py-2  placeholder:text-LightGrayishViolet rounded-lg w-1/2 ${
                        errors.yy
                          ? "focus:outline-error ring-error"
                          : "focus:outline-VeryDarkViolet ring-LightGrayishViolet"
                      } `}
                      placeholder="YY"
                    />
                  </div>
                  {(errors.mm || errors.yy) && (
                    <span className=" block  text-error text-[10px] ">
                      {errors.mm?.type === "required" ||
                      errors.yy?.type === "required"
                        ? "Can't be blank"
                        : "max lenght 2 digits"}
                    </span>
                  )}
                </div>
                <div className="w-1/2 space-y-2 ">
                  <label
                    htmlFor="cvc"
                    className="block text-[11px] font-medium tracking-widest text-VeryDarkViolet"
                  >
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="number"
                    defaultValue=""
                    {...register("cvc", {
                      required: true,
                      maxLength: 3,
                      minLength: 3,
                    })}
                    className={`ring-1  text-VeryDarkViolet focus:outline  focus:ring-0  px-2 py-2  placeholder:text-LightGrayishViolet rounded-lg w-full ${
                      errors.cvc
                        ? "focus:outline-error ring-error"
                        : "focus:outline-VeryDarkViolet ring-LightGrayishViolet"
                    } `}
                    placeholder="e.g. 123"
                  />
                  {errors.cvc && (
                    <span className=" block  text-error text-[10px] ">
                      {errors.cvc && "Can't be blank Length 3 digits"}
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4">
                <button
                  type="submit"
                  className="text-White px-2 py-3 rounded-lg w-full bg-VeryDarkViolet hover:bg-VeryDarkViolet/80 transition "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
