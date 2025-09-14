import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/booking.type";
import ChangePassword from "@/components/modules/Authentication/ChangePassword";
import { format } from "date-fns";
import { role } from "@/constants/role";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const { data: user } = useUserInfoQuery(undefined);

  if (!user) return null;

  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Replace with API mutation call
    console.log("Saving user:", editedUser);
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600";
      case "INACTIVE":
        return "text-gray-600";
      case "BLOCKED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
      case "INACTIVE":
        return <XCircle className="h-4 w-4 text-gray-600" />;
      case "BLOCKED":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img
              src={user.picture}
              alt={user.name}
              className="h-24 w-24 border rounded-full object-cover"
            />
            <div>
              <p className="text-xl">{user.name}</p>
              <p className="flex items-center gap-2">
                {getStatusIcon(user.isActive)}
                {user.isActive} 
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} size="sm">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4" />
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedUser?.name || ""}
                      onChange={(e) =>
                        setEditedUser((prev) =>
                          prev ? { ...prev, name: e.target.value } : null
                        )
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{user.email}</p>
                    {user.isVerified === true? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ): <XCircle className="h-4 w-4 text-red-600" />}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedUser?.phone || ""}
                      onChange={(e) =>
                        setEditedUser((prev) =>
                          prev ? { ...prev, phone: e.target.value } : null
                        )
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{user.phone}</p>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Badge
                    variant="outline"
                    className={
                      user.role === role.superAdmin
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : user.role === role.user
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={editedUser?.address || ""}
                    onChange={(e) =>
                      setEditedUser((prev) =>
                        prev ? { ...prev, address: e.target.value } : null
                      )
                    }
                    rows={3}
                  />
                ) : (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{user.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Authentication Methods */}
          <ChangePassword />
        </div>

        {/* Status & Account Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>
                Current account status and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center gap-2">
                  {getStatusIcon(user.isActive)}
                  <span
                    className={`font-medium ${getStatusColor(user.isActive)}`}
                  >
                    {user.isActive}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Verification & Deletion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge
                    variant={user.isVerified ? "default" : "secondary"}
                    className={
                      user.isVerified
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ""
                    }
                  >
                    {user.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Deleted</span>
                  <Badge
                    variant={user.isDeleted ? "destructive" : "default"}
                    className={
                      !user.isDeleted
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ""
                    }
                  >
                    {user.isDeleted ? "Deleted" : "Active"}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Member Since */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member Since</span>
                </div>
                <p className="text-sm font-medium">
                  {format(user.createdAt, "PP")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
