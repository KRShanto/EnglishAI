import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function DisplayRooms() {
  return (
    <div className="rooms">
      <div className="header">
        <h2 className="heading">Conversation</h2>

        <div className="options">
          <Link href="#" className="option">
            <FaPlus />
          </Link>
        </div>
      </div>

      <div className="list">
        <Link href="#" className="room">
          <Image
            src="https://avatars.githubusercontent.com/u/100005?v=4"
            alt="Room"
            width={70}
            height={70}
            className="avatar"
          />

          <h3 className="name">Random Kapur</h3>
        </Link>
      </div>

      <div className="list">
        <Link href="#" className="room">
          <Image
            src="https://avatars.githubusercontent.com/u/84588948?v=4"
            alt="Room"
            width={70}
            height={70}
            className="avatar"
          />

          <h3 className="name">KR Shanto</h3>
        </Link>
      </div>

      <div className="list">
        <Link href="#" className="room">
          <Image
            src="https://avatars.githubusercontent.com/u/101584158?v=4"
            alt="Room"
            width={70}
            height={70}
            className="avatar"
          />

          <h3 className="name">Josh Chan</h3>
        </Link>
      </div>
    </div>
  );
}
