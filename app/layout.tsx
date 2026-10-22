import Header from "./components/Header";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Calculator App",
  description: "A calculator with three customizable themes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.className} h-full antialiased bg-app-bg`}
    >
      <body className="h-full w-full">
        <div className="flex flex-col md:h-201 md:w-147 sm:h-full sm:w-full mx-auto pt-25 px-6">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
