import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/register";
import { AuthFormLayout } from "../components/auth-form-layout";
import { db } from "../lib/db.server";
import {
  hashPassword,
  createToken,
  createAuthCookie,
  getAuthUser,
} from "../lib/auth.server";

export function meta() {
  return [{ title: "Register - SmartShuttle" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = getAuthUser(request);
  if (user) throw redirect("/");
  return null;
}

interface ActionData {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    form?: string;
  };
  values?: {
    name?: string;
    email?: string;
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const errors: ActionData["errors"] = {};

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Invalid email address";
  if (!password) errors.password = "Password is required";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters";

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { errors, values: { name, email } } satisfies ActionData,
      { status: 400 }
    );
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return Response.json(
      {
        errors: { email: "A user with this email already exists" },
        values: { name, email },
      } satisfies ActionData,
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(password);

  let user;
  try {
    user = await db.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return Response.json(
        {
          errors: { email: "A user with this email already exists" },
          values: { name, email },
        } satisfies ActionData,
        { status: 409 }
      );
    }
    throw error;
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

export default function Register() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthFormLayout
      title="Create an account"
      subtitle="Join SmartShuttle to get started"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white/70 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white/60 mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={actionData?.values?.name}
            className="auth-input"
            placeholder="Your full name"
          />
          {actionData?.errors?.name && (
            <p className="mt-1.5 text-sm text-red-400">
              {actionData.errors.name}
            </p>
          )}
        </div>

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
            autoComplete="new-password"
            className="auth-input"
            placeholder="At least 6 characters"
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </Form>
    </AuthFormLayout>
  );
}
