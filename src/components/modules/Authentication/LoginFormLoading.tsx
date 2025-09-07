import { Skeleton } from "@/components/ui/skeleton";

export default function LoginFormLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col items-center text-center">
        <Skeleton className="h-8 w-1/2" />
      </div>

      {/* Email */}
      <div className="grid gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Password */}
      <div className="grid gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Login button */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Or continue with */}
      <Skeleton className="h-4 w-full mt-2" />

      {/* Google button */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Register link */}
      <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
    </div>
  );
}
