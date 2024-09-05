"use client";

import { formUrlQuery } from "@/sanity/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const links = ["all", "Next 13", "frontend", "backend", "fullstack"];

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<string>("");
  const handelFilter = (link: string) => {
    let newUrl = "";
    if (active === link) {
      setActive("");
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    } else {
      setActive(link);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: link.toString(),
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <ul
      className="text-white-800 body-text no-scrollbar flex w-full
     max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl"
    >
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => handelFilter(link)}
          className={` ${active === link ? "gradient_blue-purple" : ""} whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
