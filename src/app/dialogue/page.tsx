"use client";

import Title from "@/components/Title";
import { useState } from "react";
import { FaFemale, FaMale, FaPlus, FaTimes } from "react-icons/fa";
import RightSide from "./RightSide";
import { nanoid } from "nanoid";
import Result from "./Result";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import LoadingAnimation from "@/../public/animations/loading.json";
import LeftSide from "./LeftSide";

// NOTE: these are fake dialogue for the OpenAI example.
// I'll use them later.
const fakeDialogue: Dialogue[] = [
  {
    name: "KR Shanto",
    gender: "Male",
    content: "Hello Reshmi. How are you?",
  },
  {
    name: "Reshmi Wahab",
    gender: "Female",
    content: "Hey Shanto, I'm fine. How about you?",
  },
  {
    name: "KR Shanto",
    gender: "Male",
    content: "I'm fine also. So, how's your days going without the internet?",
  },
  {
    name: "Reshmi Wahab",
    gender: "Female",
    content:
      "Don't ask about that! These days are passing horribly. I have nothing to do with my phone or with my computer. There's no wifi, no mobile data. How about you? What do you do these days?",
  },
  {
    name: "KR Shanto",
    gender: "Male",
    content:
      "It really feels annoying without the internet. But these days, I'm preparing to go to America. The company I'm currently working on, is sponsoring me to go to America.",
  },
  {
    name: "Reshmi Wahab",
    gender: "Female",
    content:
      "That's great! Shifting to America is a dream of many including mine. Best of luck",
  },
  {
    name: "KR Shanto",
    gender: "Male",
    content: "Thanks a lot. Remember me in you prayers. Good bye.",
  },
  {
    name: "Reshmi Wahab",
    gender: "Female",
    content: "Yes of course. Bye Shanto. See you soon.",
  },
];

export type User = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  purpose: string;
};

export type Dialogue = {
  name: string;
  gender: "Male" | "Female";
  content: string;
};

export default function Page() {
  const [context, setContext] = useState(
    "About rainy season. whether people like the rainy season or not."
  );
  const [userType, setUserType] = useState<"Automatic" | "Manual">("Manual");
  const [userNumber, setUserNumber] = useState(2);
  const [users, setUsers] = useState<User[]>([
    {
      id: nanoid(10),
      name: "John Doe",
      gender: "Male",
      purpose: "Say positive things about rainy season",
    },
    {
      id: nanoid(10),
      name: "Jasmin Jue",
      gender: "Female",
      purpose: "Say negetive things about rainy season",
    },
  ]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [result, setResult] = useState<"Fetching" | null | Dialogue[]>(null);

  return (
    <div className="dialogue-page">
      <Title>Dialogue Generator</Title>

      <div className="dialogue">
        <LeftSide
          context={context}
          setContext={setContext}
          userType={userType}
          setUserType={setUserType}
          userNumber={userNumber}
          setUserNumber={setUserNumber}
          users={users}
          setUsers={setUsers}
          setEditUser={setEditUser}
        />
        <RightSide
          editUser={editUser}
          setEditUser={setEditUser}
          setUsers={setUsers}
        />
      </div>

      {!editUser && <button className="generate">Generate</button>}

      <Lottie
        animationData={LoadingAnimation}
        className={`loading ${result === "Fetching" && "show"}`}
        autoplay
        loop
      />
      <Result result={result} />
    </div>
  );
}
