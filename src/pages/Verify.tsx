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
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(100);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.statusCode) {
        toast.success("OTP send successfully", { id: toastId });
        setConfirmed(true);
        setTimer(100);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verify OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };
    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
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
        <Card className="container mx-auto">
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
                      <div className="flex justify-between items-center">
                        <Button
                          type="button"
                          variant="link"
                          onClick={handleSendOtp}
                          disabled={timer !== 0}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-600": timer !== 0,
                          })}
                        >
                          Resend OTP
                        </Button>
                        <p>{timer}</p>
                      </div>
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
            <Button onClick={handleSendOtp} className="w-full" type="submit">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
