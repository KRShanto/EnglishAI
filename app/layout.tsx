import "@/styles/main.scss";

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
      <body>{children}</body>
    </html>
  );
}
