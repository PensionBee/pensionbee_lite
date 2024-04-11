import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Link href="/sign-up" className="flex">Sign up</Link>
    </div>
  );
}
