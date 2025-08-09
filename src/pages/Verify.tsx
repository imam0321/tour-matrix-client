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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time OTP must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  const handleConfirm = async () => {
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.statusCode) {
        toast.success("OTP send successfully");
      }
      setConfirmed(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  //! Needed
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="grid place-content-center h-screen">
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-1 text-primary hover:text-primary/90"
      >
        <Logo />
        <h1 className="font-bold lg:text-xl text-blue-400">
          Tour<span className="text-primary ml-1">Matrix</span>
        </h1>
      </Link>
      {confirmed ? (
        <Card className="container mx-auto ">
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit send to <br /> {email}{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-verify"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time OTP</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button form="otp-verify" className="w-full" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="container mx-auto w-[300px]">
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Well will send you an OTP at <br /> {email}{" "}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleConfirm} className="w-full" type="submit">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
