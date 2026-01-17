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
        <header className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">ArtBoard</h1>

          <a
            href="https://github.com/SANE-EAGLE/ARTBOARD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          >
            {/* GitHub SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M12 0.5C5.73 0.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.56-.29-5.26-1.29-5.26-5.73 0-1.27.45-2.3 1.19-3.11-.12-.3-.52-1.52.11-3.16 0 0 .97-.31 3.18 1.19a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.64.24 2.86.12 3.16.74.81 1.18 1.84 1.18 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
            </svg>
            GitHub
          </a>
        </header>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
