"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Logo from "./ui/logo";

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center py-8 relative"
      style={{
        backgroundImage: `url('/2.jpg')`,  // Update the image path here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for dark shade on background */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container max-w-6xl px-4 relative z-10">
        {/* Top-right corner Login & Signup Buttons */}
        <div className="absolute top-8 right-8 flex gap-4 z-20">
       
        </div>

        {/* Logo and Main Heading */}
        <div className="flex flex-col items-center mb-12">
        <Logo />
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            Universal Motors Dealer Portal
          </h1>
          <p className="text-xl text-white text-center mb-8">Your gateway to a seamless car purchasing and management experience.</p>
        </div>

        {/* Features Section */}
        <div className="flex justify-center items-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <Card className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md text-black text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Easy Login & Signup</h3>
              <p className="text-lg">Quickly sign up or log in to manage your car details and much more.</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md text-black text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Manage Your Inventory</h3>
              <p className="text-lg">Keep track of all your cars and their details in one place.</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md text-black text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Secure Transactions</h3>
              <p className="text-lg">Make secure payments and access your transaction history easily.</p>
            </Card>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="flex justify-center items-center mb-8 ">
          <Button className="w-full sm:w-96 p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold ">
            <Link href="/sign-up" className="w-full h-full flex items-center justify-center">
              Get Started Now
            </Link>
          </Button>
        </div>
        <div className="flex justify-center items-center mb-8 ">
          <Button className="w-full sm:w-96 p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold ">
            <Link href="/sign-in" className="w-full h-full flex items-center justify-center">
              Login
            </Link>
          </Button>
        </div>


      </div>
    </div>
  );
};

export default Home;
