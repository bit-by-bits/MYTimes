import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";

export interface BottomNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface BottomNavProps {
  items: BottomNavItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({ items }) => (
  <SidebarGroup className="mt-auto">
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map(({ title, url, icon: Icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton asChild size="sm">
              <Link href={url}>
                <Icon />
                <span>{title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

export default BottomNav;
