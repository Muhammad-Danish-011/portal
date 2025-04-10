import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";  // Assuming you have a Card component for layout

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex flex-col justify-center items-center py-8">
      <div className="container max-w-4xl px-4">
        {/* Main Header */}
        <div className="flex flex-col items-center mb-8">
          <img src="https://universalmotorsltd.com/assets/images/logo.png" alt="Universal Motors Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-4xl font-bold text-white">Universal Motors Dealer Portal</h1>
        </div>

        {session ? (
          <div className="flex flex-col items-center gap-6">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="outline-none relative p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition">
                <div className="flex gap-4 items-center">
                  <span className="text-white font-semibold">{session.user?.name}</span>
                  <Avatar className="size-16 hover:opacity-75 transition">
                    <AvatarImage
                      className="size-16 hover:opacity-75 transition"
                      src={session.user?.image || undefined}
                    />
                    <AvatarFallback className="bg-sky-900 text-white">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="bottom" className="w-50">
                <DropdownMenuItem className="h-10" onClick={handleSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Card className="w-full p-20 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome back, {session.user?.name}!</h2>
              <p className="text-gray-600 mt-4">Here you can manage your account, access your settings, and more.</p>
            </Card>

            <div className="flex gap-4 mt-6">
              <Button className="w-40 h-12 text-lg bg-green-500 hover:bg-green-600 transition-transform">
                <Link href="/dashboard" className="w-full h-full flex items-center justify-center">Dashboard</Link>
              </Button>
              {/* <Button className="w-40 h-12 text-lg bg-yellow-500 hover:bg-yellow-600 transition-transform">
                <Link href="/profile" className="w-full h-full flex items-center justify-center">Profile</Link>
              </Button> */}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6">
            {/* Account Info Card */}
            <Card className="w-full sm:w-96 p-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-md text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Welcome to Universal Motors</h3>
              <p className="text-lg mb-4">🚗 If you have an account, please login.</p>
              <p className="text-lg mb-4">🛠️ Otherwise, create a new account by signing up!</p>
              <div className="flex justify-center gap-6">
                <Button className="w-32 h-12 text-lg bg-blue-500 hover:bg-blue-600 transition-transform">
                  <Link href="/sign-in" className="w-full h-full flex items-center justify-center">Login</Link>
                </Button>
                <Button className="w-32 h-12 text-lg bg-yellow-500 hover:bg-yellow-600 transition-transform">
                  <Link href="/sign-up" className="w-full h-full flex items-center justify-center">Sign Up</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserButton;
