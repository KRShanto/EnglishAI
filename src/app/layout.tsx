import Footer from "./Footer";
import SideNavbar from "@/app/SideNavbar";
import "../styles/main.scss";
import { Poppins, Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin-ext"],
  variable: "--roboto-slab",
});

// Font for the logo
export const logoFont = Poppins({
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
      <body className={`${robotoSlab.variable} ${logoFont.variable}`}>
        <SideNavbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
