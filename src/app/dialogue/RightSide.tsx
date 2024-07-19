import React, { useEffect, useState } from "react";
import { User } from "./page";

export default function RightSide({
  editUser,
  setEditUser,
  setUsers,
}: {
  editUser: User | null;
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [name, setName] = useState(editUser?.name);
  const [gender, setGender] = useState(editUser?.gender);
  const [purpose, setPurpose] = useState(editUser?.purpose);

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setGender(editUser.gender);
      setPurpose(editUser.purpose);
    }
  }, [editUser]);

  if (editUser)
    return (
      <div className="right">
        <form
          action={() => {
            setUsers((prev) =>
              prev.map((u) => {
                if (u.id === editUser.id) {
                  return {
                    id: editUser.id,
                    name: name || u.name,
                    gender: gender || u.gender,
                    purpose: purpose || u.purpose,
                  };
                } else {
                  return u;
                }
              })
            );

            setEditUser(null);
          }}
        >
          <div className="wrap">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="wrap">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="wrap">
            <label htmlFor="purpose">Purpose</label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="options">
            <button className="save">Save</button>
            <button
              onClick={() => setEditUser(null)}
              className="cancel"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
}
