import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormEvent } from "react";

interface LoginFormFieldsProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className="grid gap-6">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </div>
    <div className="text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link href="#" className="underline underline-offset-4">
        Sign up
      </Link>
    </div>
  </form>
);

export default LoginFormFields;
