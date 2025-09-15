/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Edit2, Save, X, CheckCircle, XCircle, Camera } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import ChangePassword from "@/components/modules/Authentication/ChangePassword";
import { role } from "@/constants/role";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/user/user";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number").optional(),
  address: z.string().optional(),
  picture: z.any().optional(),
});

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: userInfo } = useUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
      });
      setPreviewImage(userInfo.picture || null);
    }
  }, [userInfo, form]);

  if (!userInfo) return null;

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!userInfo?._id) return;

    setIsSaving(true);
    const toastId = toast.loading("Updating user info...");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.phone) formData.append("phone", data.phone);
      if (data.address) formData.append("address", data.address);
      if (data.picture instanceof File) {
        formData.append("file", data.picture);
      }

      await updateUser({
        userId: userInfo._id,
        payload: formData,
      }).unwrap();

      toast.success("Profile updated successfully!", { id: toastId });
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message, {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    });
    setPreviewImage(userInfo.picture || null);
    setIsEditing(false);
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={previewImage || "/default-avatar.png"}
              alt={userInfo.name}
              className="h-24 w-24 border rounded-full object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setPreviewImage(URL.createObjectURL(file));
                      form.setValue("picture", file);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <div>
            <p className="text-xl">{userInfo.name}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              {userInfo.isActive ? "Active" : "Inactive"} • Joined{" "}
              {format(userInfo.createdAt, "PP")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="sm">
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                size="sm"
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          disabled={!isEditing || isSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/30">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{userInfo.email}</p>
                    {userInfo.isVerified ? (
                      <span className="flex items-center text-green-600 text-xs font-semibold gap-1">
                        <CheckCircle className="h-4 w-4" /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 text-xs font-semibold gap-1">
                        <XCircle className="h-4 w-4" /> Not Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          disabled={!isEditing || isSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role (read-only) */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/30">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Badge
                      variant="outline"
                      className={
                        userInfo.role === role.superAdmin
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : userInfo.role === role.user
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }
                    >
                      {userInfo.role === role.superAdmin
                        ? "Super Admin"
                        : userInfo.role === role.user
                        ? "User"
                        : userInfo.role}
                    </Badge>
                  </div>
                </div>

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your address"
                          rows={3}
                          disabled={!isEditing || isSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Authentication Methods */}
        <ChangePassword />
      </div>
    </section>
  );
}
