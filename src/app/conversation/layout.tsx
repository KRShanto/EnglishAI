import DisplayRooms from "./Rooms";

export default function Layout({
  children,
  searchModal,
}: {
  children: React.ReactNode;
  searchModal: React.ReactNode;
}) {
  return (
    <div className="conversation">
      <DisplayRooms />

      {children}
      {searchModal}
    </div>
  );
}
