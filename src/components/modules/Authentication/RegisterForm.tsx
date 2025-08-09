import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoginCover from "@/assets/images/register-cover.avif";
import { Link, useNavigate } from "react-router";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z
      .string({ error: "Name must be string" })
      .min(2, { error: "Name to short. Minimum 2 character long" })
      .max(50, { error: "Name to long" }),
    email: z.email(),
    password: z
      .string({ error: "Password must be string" })
      .min(8, { error: "Password must be at least 8 characters long." }),
    // .regex(/^(?=.*[A-Z])/, {
    //   message: "Password must contain at least 1 uppercase letter.",
    // })
    // .regex(/^(?=.*[!@#$%^&*])/, {
    //   message: "Password must contain at least 1 special character.",
    // })
    // .regex(/^(?=.*\d)/, {
    //   message: "Password must contain at least 1 number.",
    // }),
    confirmPassword: z
      .string({ error: "Password must be string" })
      .min(8, { error: "Password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const result = await register(userInfo).unwrap();
      console.log(result);

      toast.success("User created successfully");
      navigate("/verify", { state: userInfo.email });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 md:mt-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={LoginCover}
              alt="Image"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Registration</h1>
                </div>

                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Name"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your Name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
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

                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your Confirm Password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Register with Google</span>
                </Button>
                <div className="text-center text-sm">
                  Do you have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
