/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
  email: string;
}

export default function ForgetPasswordPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/forget-password", { email: data.email });
      toast.success("Reset link sent! Check your email.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-content-center h-screen relative">
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-1 text-primary hover:text-primary/90"
      >
        <Logo />
        <h1 className="font-bold lg:text-xl text-blue-400">
          Tour<span className="text-primary ml-1">Matrix</span>
        </h1>
      </Link>

      <Card className="container mx-auto w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>Enter your email</CardDescription>
          </CardHeader>

          <div className="p-4">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Confirm"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
