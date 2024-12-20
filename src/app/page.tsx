"use client";

import { LoginForm } from "@/components/auth/login-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

const Page = () => {
  const user = useAuth();
  if (user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium"
          aria-label="MY Times Logo"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/logo-black.png" alt="MY" />
              <AvatarFallback className="rounded-lg">MY</AvatarFallback>
            </Avatar>
          </div>
          MY Times
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
