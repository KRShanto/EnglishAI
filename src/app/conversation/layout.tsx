import DisplayRooms from "./Rooms";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="conversation">
      <DisplayRooms />

      {children}
    </div>
  );
}
