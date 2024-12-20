"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Routes from "@/lib/routes";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Something went wrong!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We encountered an error. Please try again later or go back to the
          homepage.
        </p>
        <Button variant="link" className="text-md mt-2">
          <Link href={Routes.HOME}>Go back to homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
