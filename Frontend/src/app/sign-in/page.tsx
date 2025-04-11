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
import axios from "axios"; // Axios import for backend requests

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    console.log({ email, password });

    try {
        const response = await axios.post("http://localhost:8080/auth/login", { email, password });
        console.log("Response:", response.data);  // Log the response to see the result

        if (response.data && response.data.accessToken) {
            // Assuming successful login, store the token
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("userId", response.data.user.id); // 👈 store userId

            router.push("/dashboard"); // Redirect to the dashboard page
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
    // Handle provider login if needed
    toast.info(`${value} login is not yet implemented.`);
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service to sign in
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
            <Button
              disabled={false}
              onClick={() => {}}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            >
              <FcGoogle className="size-8 left-2.5 top-2.5" />
            </Button>
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            >
              <FaGithub className="size-8 left-2.5 top-2.5" />
            </Button>
          </div>
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Create new account
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="sign-up"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
