"use client";

import { search } from "@/actions/search";
import { SearchData } from "@/types/search";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// @ts-ignore
import { useFormStatus } from "react-dom";
import { connectUser } from "@/actions/connectUser";
import { useRouter } from "next/navigation";
import { IoCheckmarkDone } from "react-icons/io5";

export default function Search({ connectButton }: { connectButton?: boolean }) {
  const [data, setData] = useState<SearchData[]>([]);

  const handler = async (formData: FormData) => {
    const name = formData.get("search");

    if (!name) return;

    const res = await search(name as string);

    setData([...res, ...res, ...res, ...res, ...res, ...res, ...res, ...res]);
  };

  return (
    <form className="search" action={handler}>
      <div className="search-form">
        <label htmlFor="search">Search for a user</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder=" "
          autoFocus
        />
        <button>
          <FaSearch />
          Search
        </button>
      </div>

      <Loading />
      <Results data={data} connectButton={connectButton} />
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
function Results({
  data,
  connectButton,
}: {
  data: SearchData[];
  connectButton?: boolean;
}) {
  const { pending } = useFormStatus();
  const router = useRouter();

  if (pending) return null;

  const connect = async (id: string) => {
    const res = await connectUser({ id });

    if (res.success) {
      router.refresh();
    }
  };

  // use Link if connectButton is not set
  // else use div
  const Result = connectButton ? "div" : Link;
  const Info = connectButton ? Link : "div";

  return (
    <div className="results">
      {data.map((user, i) => (
        <Result href={`/profile/${user.username}`} className="result" key={i}>
          <Info className="info" href={`/profile/${user.username}`}>
            <Image
              width={80}
              height={80}
              src={user.image}
              alt="User"
              className="avatar"
            />

            <h3 className="name">{user.name}</h3>
          </Info>

          {connectButton && user.isConnected !== null && (
            <>
              {user.isConnected === true ? (
                <span className="connected">
                  <IoCheckmarkDone />
                  Connected
                </span>
              ) : (
                <button className="connect" onClick={() => connect(user.id)}>
                  Connect
                </button>
              )}
            </>
          )}
        </Result>
      ))}
    </div>
  );
}
