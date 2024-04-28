import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";

import {
  NavigationMenu,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className=" -z-10 flex items-center">
      <div className="inline-block align-middle w-48 ">
        <Link to="/">
          <Icon className="inline" />
          <span>Hii</span>
        </Link>
      </div>
      <div className="inline-block justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="/">Home page</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/complaint">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  File a Complaint
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/About">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuIndicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenuIndicator>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="inline-block absolute end-5">
        <ModeToggle />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
