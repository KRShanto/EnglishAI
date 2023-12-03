import SideNavbar from "@/app/SideNavbar";
import "../styles/main.scss";
import { Poppins, Roboto, Roboto_Slab } from "next/font/google";
import TopLoader from "./TopLoader";

const roboto = Roboto({
  subsets: ["latin-ext"],
  variable: "--roboto",
  weight: "400",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin-ext"],
  variable: "--roboto-slab",
});

// Font for the logo
const logoFont = Poppins({
  weight: "700",
  subsets: ["latin"],
  variable: "--logo-font",
});

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
      <body
        className={`${robotoSlab.variable} ${logoFont.variable} ${roboto.variable}`}
      >
        <TopLoader />
        <SideNavbar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
