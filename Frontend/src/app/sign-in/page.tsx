"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import axios from "axios";
import Logo from "@/components/ui/logo";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", { email, password });
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userName", response.data.user.name);

        // console.log("Login successful",  response.data.accessToken , response.data.user.id , response.data.user.name );
        console.log("Login successful", response.data);
        router.push("/dashboard");
        toast.success("Login successful");
      } else {
        setError("Invalid credentials or missing access token");
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setError("Something went wrong. Please try again later.");
      toast.error("Authentication failed. Please try again.");
    }
    setPending(false);
  };

  const handleProvider = (event: React.MouseEvent<HTMLButtonElement>, value: "github" | "google") => {
    event.preventDefault();
    toast.info(`${value} login is not yet implemented.`);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

<div className="absolute top-4 left-4 z-10">
       <Logo/>
      </div>
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white/90 shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service to Login
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              disabled={pending}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>

          <Separator />

          <div className="flex my-2 justify-evenly mx-auto items-center">
            <Button variant="outline" size="lg" className="bg-slate-300 hover:bg-slate-400 hover:scale-110">
              <FcGoogle className="size-8 left-2.5 top-2.5" />
            </Button>
            <Button onClick={(e) => handleProvider(e, "github")} variant="outline" size="lg" className="bg-slate-300 hover:bg-slate-400 hover:scale-110">
              <FaGithub className="size-8 left-2.5 top-2.5" />
            </Button>
          </div>

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Create new account
            <Link className="text-sky-700 ml-4 hover:underline cursor-pointer" href="sign-up">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
