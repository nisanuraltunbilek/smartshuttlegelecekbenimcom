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
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
