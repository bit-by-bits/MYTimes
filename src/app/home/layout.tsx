"use client";

import { ReactNode } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { navData } from "@/lib/data";
import Routes from "@/lib/routes";
import { HomeIcon } from "lucide-react";
import Navbar from "@/components/home/navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { breadcrumbs } = useBreadcrumbs();

  const renderSidebarTriggerIcon = () => {
    if (!breadcrumbs.length || breadcrumbs[0] === "home")
      return <HomeIcon size={18} />;

    const matchingNavItem = navData.topNav.find(
      nav => nav.title.toLowerCase() === breadcrumbs[0].toLowerCase()
    );

    if (!matchingNavItem || !matchingNavItem.icon)
      return <HomeIcon size={18} />;

    return (
      <Image
        src={matchingNavItem.icon}
        alt={matchingNavItem.title}
        width={18}
        height={18}
      />
    );
  };

  const renderBreadcrumbs = () => (
    <BreadcrumbList>
      {breadcrumbs.map((crumb, index) => {
        const route = Routes[crumb.toUpperCase() as keyof typeof Routes];

        return (
          <div key={crumb} className="flex items-center gap-2">
            <BreadcrumbItem>
              {index < breadcrumbs.length - 1 ? (
                <BreadcrumbLink
                  href={typeof route === "string" ? route : route.ROOT}
                >
                  {crumb}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        );
      })}
    </BreadcrumbList>
  );

  return (
    <SidebarProvider>
      <Navbar
        user={navData.user}
        topNav={navData.topNav}
        bottomNav={navData.bottomNav}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            {renderSidebarTriggerIcon()}
            <Breadcrumb>{renderBreadcrumbs()}</Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
