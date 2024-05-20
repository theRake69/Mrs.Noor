import Link from "next/link";
export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <Link href="/video-chat">
        <h1 className="hover:bg-sky-700 p-10 cursor-pointer">
          Live Video Chat!!!{" "}
        </h1>
      </Link>
    </main>
  );
}
