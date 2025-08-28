import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} My Ecommerce</p>
        <nav className="space-x-4">
          <Link href="/privacy" className="hover:text-blue-600">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-600">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
