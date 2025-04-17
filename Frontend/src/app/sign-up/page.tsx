"use client";

// shadcn ui
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
import { validateSignupForm } from "./signupValidation"; 

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";  // Add this import for image component
import Logo from "@/components/ui/logo";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const validationErrors = validateSignupForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error(`❌ Please fix the errors in the form.`);
      setPending(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPending(false);
        toast.success(data.message);
        router.push("/sign-in");
      } else {
        setErrors({ general: data.message });
        toast.error(`❌ ${data.message}`);
        setPending(false);
      }
    } catch (error) {
      toast.error(`❌ Something went wrong`);
      setPending(false);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Logo positioned at the top left corner */}
      <div className="absolute top-4 left-4 z-10">
       <Logo/>
      </div>

      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white/90 backdrop-blur rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create an account
          </CardDescription>
        </CardHeader>

        {errors.general && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{errors.general}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="field">
              <Input
                type="text"
                disabled={pending}
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`input ${errors.name ? "border-red-500 bg-red-100" : ""}`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="field">
              <Input
                type="email"
                disabled={pending}
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`input ${errors.email ? "border-red-500 bg-red-100" : ""}`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="field">
              <Input
                type="password"
                disabled={pending}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`input ${errors.password ? "border-red-500 bg-red-100" : ""}`}
                required
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div className="field">
              <Input
                type="password"
                disabled={pending}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className={`input ${errors.confirmPassword ? "border-red-500 bg-red-100" : ""}`}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>

            <Button
              className="mt-6 w-full p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
              size="lg"
              disabled={pending}
            >
              Continue
            </Button>
          </form>

          <Separator />

          <div className="flex my-2 justify-evenly mx-auto items-center">
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "google")}
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
            Already have an account?
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="sign-in"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

// Placeholder function for social sign-ins
function signIn(value: string, { callbackUrl }: { callbackUrl: string }) {
  console.log(`Sign-in with ${value} is triggered! Redirecting to ${callbackUrl}`);
}
