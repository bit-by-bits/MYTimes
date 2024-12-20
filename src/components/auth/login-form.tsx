import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import LoginFormFields from "./login-form-fields";
import OAuthButton from "./oauth-button";
import Link from "next/link";

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, ...props }) => (
  <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl" id="login-form-title">
          Welcome back
        </CardTitle>
        <CardDescription>
          Login with your Apple or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <OAuthButton type="github" aria-label="Login with Github" />
            <OAuthButton type="google" aria-label="Login with Google" />
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <LoginFormFields onSubmit={e => e.preventDefault()} />
        </div>
      </CardContent>
    </Card>
    <div className="text-center text-xs text-muted-foreground text-balance [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our{" "}
      <Link href="/" aria-label="Read our Terms of Service">
        Terms of Service
      </Link>
      .
    </div>
  </div>
);

export { LoginForm };
