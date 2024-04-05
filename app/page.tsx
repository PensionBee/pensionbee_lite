import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center h-full">
      <Link href="/sign-up" className="flex flex-col justify-center items-center">Sign up</Link>
      <Link href="/login" className="flex flex-col justify-center items-center"> Login</Link>

    </div>
  );
}
