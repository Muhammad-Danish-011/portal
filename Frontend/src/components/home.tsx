
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex flex-col justify-center items-center py-8">
      <div className="container max-w-4xl px-4">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://universalmotorsltd.com/assets/images/logo.png"
            alt="Universal Motors Logo"
            className="w-32 h-32 mb-4"
          />
          <h1 className="text-4xl font-bold text-white">Universal Motors Dealer Portal</h1>
        </div>

        <div className="flex justify-center items-center gap-6">
          <Card className="w-full sm:w-96 p-6 bg-white rounded-xl shadow-md text-black text-center">

            <h3 className="text-2xl font-bold mb-4">Welcome to Universal Motors</h3>
            <p className="text-lg mb-4">🚗 If you have an account, please login.</p>
            <p className="text-lg mb-4">🛠️ Otherwise, create a new account by signing up!</p>
            <div className="flex justify-center gap-6">
              <Button  className="mt-6 w-full p-3 rounded-xl bg-red-100 text-red-600
              hover:bg-red-200 transition-all duration-300
              flex items-center justify-center gap-2 font-semibold">
                <Link
                  href="/sign-in"
                  className="w-full h-full flex items-center justify-center"
                >
                  Login
                </Link>
              </Button>
              <Button  className="mt-6 w-full p-3 rounded-xl bg-red-100 text-red-600
              hover:bg-red-200 transition-all duration-300
              flex items-center justify-center gap-2 font-semibold">
                <Link
                  href="/sign-up"
                  className="w-full h-full flex items-center justify-center"
                >
                  Sign Up
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
