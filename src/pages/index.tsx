import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen p-12 ${inter.className}`}>
      <div className="max-w-5xl w-full mx-auto"></div>
    </main>
  );
}
