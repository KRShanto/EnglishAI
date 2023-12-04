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

      <div className="conversation-page">{children}</div>
      {searchModal}
    </div>
  );
}
