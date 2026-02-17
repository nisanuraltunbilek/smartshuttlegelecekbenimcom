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
            className="font-medium text-white/70 hover:text-white transition-colors"
          >
            Sign up
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/60 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={actionData?.values?.email}
            className="auth-input"
            placeholder="you@example.com"
          />
          {actionData?.errors?.email && (
            <p className="mt-1.5 text-sm text-red-400">
              {actionData.errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white/60 mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="auth-input"
            placeholder="Enter your password"
          />
          {actionData?.errors?.password && (
            <p className="mt-1.5 text-sm text-red-400">
              {actionData.errors.password}
            </p>
          )}
        </div>

        {actionData?.errors?.form && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <p className="text-sm text-red-400">
              {actionData.errors.form}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-btn-primary"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </Form>
    </AuthFormLayout>
  );
}
