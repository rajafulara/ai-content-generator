import { Headset, NotepadTextDashed, SquareCode, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">

      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex gap-2 justify-center items-center">

          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="font-bold">AI Content Generator</span>
        </div>
        <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-semibold">
          Get Started
        </Link>
      </nav>

      <div className="flex flex-grow flex-col items-center justify-center text-center px-6 py-10">

        <p className="bg-blue-50 px-4 py-1 rounded-full text-sm font-medium text-blue-700 mb-4">
          AI Content Generator
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900">
          AI Content <span className="text-blue-600">Generator</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </p>
        <Link href="/dashboard" className="mt-6 px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          Get started
        </Link>
      </div>


      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">

          <div className="flex flex-col items-center">
            <NotepadTextDashed width={50} height={50}/>
            <h3 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">20+ Templates</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">Responsive, and mobile-first project on the web</p>
            <Link href="#" className="mt-4 text-blue-600 font-medium hover:underline">
              Learn more
            </Link>
          </div>

          <div className="flex flex-col items-center">
          <SquareCode width={50} height={50}/>
            <h3 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">Customizable</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">Components are easily customized and extendable</p>
            <Link href="#" className="mt-4 text-blue-600 font-medium hover:underline">
              Learn more
            </Link>
          </div>

          <div className="flex flex-col items-center">
          <Wallet width={50} height={50}/>
            <h3 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">Free to Use</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">Every component and plugin is well documented</p>
            <Link href="#" className="mt-4 text-blue-600 font-medium hover:underline">
              Learn more
            </Link>
          </div>


          <div className="flex flex-col items-center">
          <Headset width={50} height={50}/>
            <h3 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">24/7 Support</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">Contact us 24 hours a day</p>
            <Link href="#" className="mt-4 text-blue-600 font-medium hover:underline">
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}