import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        403 – Unauthorized Access
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, you don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
