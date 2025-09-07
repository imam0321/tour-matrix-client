/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoginCover from "@/assets/images/login-cover.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/Password";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";
import { useState } from "react";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const { refetch: refetchUser } = useUserInfoQuery(undefined);

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      await login(data).unwrap();
      await refetchUser();
      toast.success("User login successfully", { id: toastId });
      navigate(from, { replace: true });
    } catch (error: any) {
      const message = error?.data?.message;

      switch (message) {
        case "User Not Exist!":
          toast.error("Email Not Exist!", { id: toastId });
          break;
        case "Invalid Password!":
          toast.error("Invalid Password!", { id: toastId });
          break;
        case "User not Verified":
          toast.error("You are not verified", { id: toastId });
          navigate("/verify", { state: data.email });
          break;
        default:
          if (message && message.includes("authenticated through Google")) {
            toast.error(
              "If you log in with Google, set a password first to be able to log in later with email and password.",
              { id: toastId }
            );
          } else {
            toast.error(message || "Something went wrong!", { id: toastId });
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Email"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your Email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            to="/forget-password"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your Password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <Button
                  onClick={() =>
                    (window.location.href = `${config.baseUrl}/auth/google`)
                  }
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Login with Google</span>
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={LoginCover}
              alt="Image"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
