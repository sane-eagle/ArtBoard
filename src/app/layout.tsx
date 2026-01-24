import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtBoard",
  description: "Collaborative online drawing board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-semibold">ArtBoard</h1>
        </header>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
