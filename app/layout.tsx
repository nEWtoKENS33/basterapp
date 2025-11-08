import "./globals.css";

export const metadata = {
  title: "BASTER",
  description: "BASTER ON BASE.",
   icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
