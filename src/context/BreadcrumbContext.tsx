"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils";

interface BreadcrumbContextType {
  breadcrumbs: string[];
  setBreadcrumbs: (crumbs: string[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  }
  return context;
};

type BreadcrumbProviderProps = {
  children: ReactNode;
};

export const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const updateBreadcrumbs = () => {
      const pathSegments = pathname.split("/").filter(Boolean);

      const newBreadcrumbs = pathSegments.map(crumb =>
        capitalize(crumb.replace("-", " "))
      );

      setBreadcrumbs(newBreadcrumbs);
    };

    updateBreadcrumbs();
  }, [pathname]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
