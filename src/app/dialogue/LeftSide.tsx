import { nanoid } from "nanoid";
import { Dispatch, SetStateAction } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { User } from "./page";

export default function LeftSide({
  context,
  setContext,
  userType,
  setUserType,
  userNumber,
  setUserNumber,
  users,
  setUsers,
  setEditUser,
}: {
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
  userType: "Automatic" | "Manual";
  setUserType: Dispatch<SetStateAction<"Automatic" | "Manual">>;
  userNumber: number;
  setUserNumber: Dispatch<SetStateAction<number>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  setEditUser: Dispatch<SetStateAction<User | null>>;
}) {
  return (
    <div className="left">
      <div className="form">
        <label htmlFor="context">Context</label>
        <textarea
          name="context"
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>
      <div className="user-selection">
        <div className="options">
          <div className="wrap">
            <input
              type="radio"
              name="user-type"
              id="user-type-automatic"
              checked={userType === "Automatic"}
              onChange={(e) => setUserType("Automatic")}
            />
            <label htmlFor="user-type-automatic">
              Automatically Generate Users
            </label>
          </div>
          <div className="wrap">
            <input
              type="radio"
              name="user-type"
              id="user-type-manual"
              checked={userType === "Manual"}
              onChange={(e) => setUserType("Manual")}
            />
            <label htmlFor="user-type-manual">Manually Create Users</label>
          </div>
        </div>

        {userType === "Automatic" ? (
          <div className="user-number">
            <button onClick={() => setUserNumber(userNumber + 1)}>+</button>
            <p>
              <strong>{userNumber}</strong> {userNumber > 1 ? "Users" : "User"}
            </p>
            <button
              onClick={() => userNumber !== 1 && setUserNumber(userNumber - 1)}
            >
              -
            </button>
          </div>
        ) : (
          <div className="users">
            {users.map((user, index) => (
              <div className="user" key={index}>
                <div className="info" onClick={() => setEditUser(user)}>
                  {/* TODO: male/female avatar */}
                  <p className="name">{user.name}</p>
                </div>
                <button
                  onClick={() => {
                    setUsers((prev) => prev.filter((u) => u !== user));
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            ))}

            <button
              className="add-user"
              onClick={() => {
                setUsers((prev) => {
                  return [
                    ...prev,
                    {
                      id: nanoid(10),
                      name: "John Doe",
                      gender: "Male" as any,
                      purpose: "Say negative about this topic.",
                    },
                  ];
                });
              }}
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
