import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export interface SubItem {
  title: string;
  url: string;
}

export interface TopNavItem {
  title: string;
  icon: string;
  isActive?: boolean;
  items?: SubItem[];
}

interface TopNavProps {
  items: TopNavItem[];
}

const TopNav: React.FC<TopNavProps> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Games</SidebarGroupLabel>
      <SidebarMenu className="space-y-1 mt-1">
        {items.map(({ title, icon, isActive, items }) => (
          <Collapsible
            key={title}
            asChild
            defaultOpen={isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={title}>
                  <Image src={icon} alt={title} width={16} height={16} />
                  <span className="flex-1">{title}</span>
                  {items?.length && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {items?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {items.map(({ title, url }) => (
                      <SidebarMenuSubItem key={title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={url}>
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default TopNav;
