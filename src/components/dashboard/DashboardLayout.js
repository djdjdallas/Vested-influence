"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/dashboard' },
    { name: 'Agreements', href: '/dashboard/agreements' },
    { name: 'Metrics', href: '/dashboard/metrics' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Education', href: '/dashboard/education' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/dashboard/dashboard" className="font-bold text-xl">IEAP</Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === item.href
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Link href="/" className="text-sm">Logout</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
