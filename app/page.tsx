import Link from "next/link";

export default async function Home() {

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>Canvas App</h1>
      <Link href="/app/board/1">Go to Room</Link>
    </div>
  );
}
