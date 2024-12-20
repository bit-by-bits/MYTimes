import type { Metadata } from "next";
import "./globals.css";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "MY Times - Play Crossword, Wordle, and More!",
  description:
    "MY Times offers a collection of fun and challenging word games including Crossword, Wordle, Strands, and more. Play, challenge yourself, and have fun anytime, anywhere!"
};

const RootLayout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body className="antialiased">
      <BreadcrumbProvider>{children}</BreadcrumbProvider>
    </body>
  </html>
);

export default RootLayout;
