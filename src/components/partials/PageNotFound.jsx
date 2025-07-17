import React from "react";

const PageNotFound = () => {
  return (
    <>
      <section className="bg-white p-4 flex flex-col justify-center items-center">
        <h2 className="text-9xl text-red-500 font-bold mb-36">(˚ ˃̣̣̥⌓˂̣̣̥ )</h2>
        <p className=" text-5xl text-black font-bold mb-10">
          404 - Page Not Found
        </p>
        <img
          src="/images/webp/meme shocked.webp"
          alt="A meme of shocked person"
          className="size-96"
        />
      </section>
    </>
  );
};

export default PageNotFound;
