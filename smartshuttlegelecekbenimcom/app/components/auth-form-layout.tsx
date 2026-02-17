import { Link } from "react-router";

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthFormLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthFormLayoutProps) {
  return (
    <main className="fixed inset-0 flex flex-col overflow-auto">
      {/* Gradient background (matches splash) */}
      <div className="absolute inset-0 splash-gradient" />
      <div className="absolute inset-0 splash-mesh opacity-30" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="splash-orb absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl" />
        <div
          className="splash-orb absolute top-1/4 -left-20 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="splash-orb absolute bottom-1/3 right-4 w-40 h-40 rounded-full bg-violet-400/10 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-8 pt-safe-top pb-safe-bottom">
        {/* Back to home */}
        <div className="w-full max-w-md mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/50 text-sm font-medium hover:text-white/80 transition-colors"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4 border border-white/10 shadow-2xl">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4S4 2.5 4 6v10zm3.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 10H6V6h12v4z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-white/40 text-sm mt-1.5">{subtitle}</p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md">
          <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-7 border border-white/[0.08] shadow-2xl">
            {children}
          </div>
          <div className="mt-6 text-center text-sm text-white/40">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
