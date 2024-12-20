import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import TopNav, { TopNavItem } from "./top-nav";
import BottomNav, { BottomNavItem } from "./bottom-nav";
import UserNav from "./user-nav";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Routes from "@/lib/routes";
import { useState } from "react";

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  topNav: TopNavItem[];
  bottomNav: BottomNavItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  topNav,
  bottomNav,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader className={isCollapsed ? "-mb-2" : ""}>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton
              size="lg"
              asChild
              className={isCollapsed ? "hidden" : ""}
            >
              <Link href={Routes.HOME}>
                <div className="flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/logo-black.png" alt="MY" />
                    <AvatarFallback className="rounded-lg">MY</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MY Times</span>
                  <span className="truncate text-xs">Daily games</span>
                </div>
              </Link>
            </SidebarMenuButton>
            <SidebarTrigger onClick={handleSidebarToggle} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <TopNav items={topNav.map(nav => ({ ...nav, isActive: true }))} />
        <BottomNav items={bottomNav} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
