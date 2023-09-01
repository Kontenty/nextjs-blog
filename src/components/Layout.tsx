import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className={`flex min-h-screen p-12 ${inter.className}`}>
      <div className="mx-auto w-[1300px]">{children}</div>
    </main>
  );
};

export default Layout;
