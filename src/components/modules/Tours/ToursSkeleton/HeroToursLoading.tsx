import { Skeleton } from "@/components/ui/skeleton";

export default function HeroToursLoading() {
  return (
    <section className="relative h-40 flex items-center justify-center overflow-hidden animate-pulse">
      {/* Background placeholder */}
      <Skeleton className="absolute inset-0 w-full h-full rounded-none" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text placeholders */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 space-y-4">
        <Skeleton className="h-10 md:h-12 w-2/3 mx-auto rounded-md bg" />
        <Skeleton className="h-6 md:h-8 w-1/2 mx-auto rounded-md" />
      </div>
    </section>
  );
}
