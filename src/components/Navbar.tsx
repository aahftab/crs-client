import * as React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import UPPoliceLogo from "@/assets/UPPoliceLogo.png";
import ToButton from "@/components/ToButton";
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
import LogoutButton from "@/components/LogoutButton";
import TestRoute from "./TestRoute";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem("isLoggedIn"));
    window.addEventListener('storage', () => {
      setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    })
  return (
    <div className=" h-24 -z-10 flex  items-center w-full bg-slate-300  dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 backdrop-blur">
      <div className="inline-block align-middle w-48 ">
        <Link to="/">
          <img src={UPPoliceLogo} className="inline m-4 size-20" alt="" />
          <span className=" text-xl font-bold ">CRS</span>
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
      <div className="inline-block absolute end-20">
        <TestRoute route="/protected-route" className="inline-block mx-2" />
        {isLoggedIn && (
          <LogoutButton className="inline-block mx-2" />
        )}
        {!isLoggedIn && (
          <span>
            <ToButton to="login" className="inline-block mx-2" />
            <ToButton to="register" className="inline-block mx-2" />
          </span>
        )}
      </div>
      <div className="inline-block absolute end-5">
        <ModeToggle />
      </div>
    </div>
  );
}
// import { cn } from "@/lib/utils";
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
