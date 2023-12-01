"use client";

import { search } from "@/actions/search";
import { SearchData } from "@/types/search";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// @ts-ignore
import { useFormStatus } from "react-dom";

export default function Search() {
  const [data, setData] = useState<SearchData[]>([]);

  const handler = async (formData: FormData) => {
    const name = formData.get("search");

    if (!name) return;

    const res = await search(name as string);

    setData(res);
  };

  return (
    <form className="search" action={handler}>
      <div className="search-form">
        <label htmlFor="search">Search for a user</label>
        <input type="text" id="search" name="search" placeholder=" " />
        <button>
          <FaSearch />
          Search
        </button>
      </div>

      <Loading />
      <Results data={data} />
    </form>
  );
}

// skeleton loading
function Loading() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="results loading-results">
      <div className="result">
        <div className="avatar" />
        <div className="name" />
      </div>

      <div className="result">
        <div className="avatar" />
        <div className="name" />
      </div>

      <div className="result">
        <div className="avatar" />
        <div className="name" />
      </div>
    </div>
  );
}

// search results
function Results({ data }: { data: SearchData[] }) {
  const { pending } = useFormStatus();

  if (pending) return null;

  return (
    <div className="results">
      {data.map((user, i) => (
        <Link href={`/profile/${user.username}`} className="result" key={i}>
          <Image
            width={80}
            height={80}
            src={user.image}
            alt="User"
            className="avatar"
          />

          <h3 className="name">{user.name}</h3>
        </Link>
      ))}
    </div>
  );
}
