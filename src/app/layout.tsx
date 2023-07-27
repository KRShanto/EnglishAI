import Footer from "./Footer";
import SideNavbar from "@/app/SideNavbar";
import "../styles/main.scss";

export const metadata = {
  title: "English AI",
  description: "English helper AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SideNavbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
