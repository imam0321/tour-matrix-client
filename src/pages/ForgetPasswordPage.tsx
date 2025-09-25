/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Reset link sending...");
    try {
      await forgetPassword({ email: data.email }).unwrap();
      toast.success("Reset link sent! Check your email.", { id: toastId });
      setSuccess(true);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {/* Logo link */}
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-1 text-primary hover:text-primary/90"
      >
        <Logo />
        <h1 className="font-bold lg:text-xl text-blue-400">
          Tour<span className="text-primary ml-1">Matrix</span>
        </h1>
      </Link>

      {/* ✅ Conditional Rendering */}
      {!success ? (
        <Card className="w-[300px] mx-auto">
          <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="email-submit" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your Email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              form="email-submit"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[300px] mx-auto text-center p-6">
          <CardHeader>
            <CheckCircle2 className="mx-auto text-green-500 w-12 h-12" />
            <CardTitle className="mt-2">Email Sent!</CardTitle>
            <CardDescription>
              A reset link has been sent to your email. Please check your inbox.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button>Back to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
