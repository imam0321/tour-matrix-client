/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import Password from "@/components/ui/Password";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password cannot be the same as the old password",
    path: ["newPassword"],
  });

export default function ChangePassword() {
  const [isSaving, setIsSaving] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsSaving(true);
    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully!");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-sm"
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
