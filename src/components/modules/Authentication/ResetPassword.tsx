/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { CheckCircle2 } from "lucide-react";
import Password from "@/components/ui/Password";
import LogoWithTitle from "@/utils/LogoWithTitle";

// Validation schema
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const [success, setSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      document.cookie = `accessToken=${token}; path=/; max-age=${
        10 * 60
      }; secure; samesite=strict`;
    }
  }, [token]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    if (!id || !token) {
      toast.error("Invalid reset link");
      return;
    }
    const toastId = toast.loading("Reset Password....");
    try {
      await resetPassword({
        id,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password reset successful!", { id: toastId });
      setSuccess(true);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {/* Logo */}
      <LogoWithTitle />

      {/* Conditional Rendering */}
      {!success ? (
        <Card className="w-[300px] mx-auto">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="reset-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Password {...field} placeholder="New Password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} placeholder="Confirm Password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              form="reset-form"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[300px] mx-auto text-center p-6">
          <CardHeader>
            <CheckCircle2 className="mx-auto text-green-500 w-12 h-12" />
            <CardTitle className="mt-2">Password Reset Successful!</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button>Go to Login Now</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
