import * as React from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { AUTH } from "@/config/ui-text";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/50 to-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{AUTH.LOGIN_LABEL}</CardTitle>
          <CardDescription>{AUTH.LOGIN_DESCRIPTION}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              try {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;

                await signIn("credentials", {
                  email,
                  password,
                  redirectTo: "/dashboard",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect("/login");
                }
                throw error;
              }
            }}
            className="space-y-5"
          >
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {AUTH.EMAIL_LABEL}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                {AUTH.PASSWORD_LABEL}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs underline underline-offset-4 hover:opacity-80"
              >
                {AUTH.PASSWORD_MISSED}
              </Link>
            </div>

            <Button type="submit" className="w-full">
              {AUTH.LOGIN_LABEL}
            </Button>

            <div className="flex justify-center items-center gap-1 text-sm">
              <span className="text-muted-foreground">{AUTH.NOT_MEMBER}</span>
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:opacity-80"
              >
                {AUTH.SIGNUP_LABEL}
              </Link>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col justify-center items-center gap-2 text-xs text-muted-foreground">
          <p>
            {AUTH.LOGIN_FOOTER_START}{" "}
            <Link href="/terms" className="underline underline-offset-4">
              {AUTH.FOOTER_TERMS}
            </Link>
            {"과 "}
            <Link href="/privacy" className="underline underline-offset-4">
              {AUTH.FOOTER_PRIVACY}
            </Link>
            {AUTH.FOOTER_END}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
