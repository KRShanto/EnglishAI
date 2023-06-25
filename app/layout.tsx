import Footer from "@/components/Footer";
import SideNavbar from "@/components/SideNavbar";
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
