import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 p-24">
      <h1 className="text-5xl font-bold text-center">
        Welcome to <span className="text-blue-500">MerlinBot</span>!
      </h1>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:lg:h-[360px] z-[-1]">
        <Image
          className="relative"
          src="/merlin.png"
          alt="Merlin"
          width={300}
          height={300}
          priority
        />
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Chat{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Chat with the great MerlinBot! Ask me anything.
          </p>
        </Link>
      </div>
    </main>
  );
}
