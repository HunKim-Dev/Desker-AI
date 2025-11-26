import * as React from "react";
import Link from "next/link";
import { Mail, Lock, Phone } from "lucide-react";
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
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { AUTH } from "@/config/ui-text";

const SignupPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/50 to-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{AUTH.SIGNUP_LABEL}</CardTitle>
          <CardDescription>{AUTH.SIGNUP_DESCRIPTION}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action={async (formData) => {
              "use server";

              const email = String(formData.get("email") || "")
                .trim()
                .toLowerCase();
              const password = String(formData.get("password") || "").trim();
              const phoneNumber = String(
                formData.get("phoneNumber") || ""
              ).replace(/\D/g, "");

              const passwordHash = await bcrypt.hash(password, 12);
              await prisma.user.create({
                data: { email, passwordHash, phoneNumber },
              });

              redirect(`/login?email=${encodeURIComponent(email)}`);
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
                  autoComplete="email"
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
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                {AUTH.PHONE_LABEL}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="010-1234-5678"
                  className="pl-9"
                  required
                  autoComplete="tel"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {AUTH.PHONE_DESCRIPTION}
              </p>
            </div>

            <Button type="submit" className="w-full">
              {AUTH.SIGNUP_LABEL}
            </Button>

            <div className="flex justify-center items-center gap-1 text-sm">
              <span className="text-muted-foreground">
                {AUTH.ALREADY_SIGNUP}
              </span>
              <Link
                href="/login"
                className="underline underline-offset-4 hover:opacity-80"
              >
                {AUTH.LOGIN_LABEL}
              </Link>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
          <p>
            {AUTH.SIGNUP_FOOTER_START}{" "}
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

export default SignupPage;
