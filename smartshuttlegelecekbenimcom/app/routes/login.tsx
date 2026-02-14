import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/login";
import { AuthFormLayout } from "../components/auth-form-layout";
import { db } from "../lib/db.server";
import {
  verifyPassword,
  createToken,
  createAuthCookie,
  getAuthUser,
} from "../lib/auth.server";

export function meta() {
  return [{ title: "Login - SmartShuttle" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = getAuthUser(request);
  if (user) throw redirect("/");
  return null;
}

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    form?: string;
  };
  values?: {
    email?: string;
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const errors: ActionData["errors"] = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { errors, values: { email } } satisfies ActionData,
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json(
      {
        errors: { form: "Invalid email or password" },
        values: { email },
      } satisfies ActionData,
      { status: 401 }
    );
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return Response.json(
      {
        errors: { form: "Invalid email or password" },
        values: { email },
      } satisfies ActionData,
      { status: 401 }
    );
  }

  const token = createToken({
    userId: user.id,
    name: user.name,
    role: user.role,
  });

  return redirect("/", {
    headers: { "Set-Cookie": createAuthCookie(token) },
  });
}

export default function Login() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthFormLayout
      title="Welcome back"
      subtitle="Sign in to your SmartShuttle account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={actionData?.values?.email}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {actionData?.errors?.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {actionData.errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {actionData?.errors?.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {actionData.errors.password}
            </p>
          )}
        </div>

        {actionData?.errors?.form && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {actionData.errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </Form>
    </AuthFormLayout>
  );
}
