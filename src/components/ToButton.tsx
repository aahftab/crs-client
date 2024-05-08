import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export default function ToButton({
  to,
  className,
}: {
  to: string;
  className: string;
}) {
  return (
    <Link
      to={"/" + to}
      target="_blank"
      className={buttonVariants() + className}
    >
      {to.charAt(0).toUpperCase() + to.slice(1)}
    </Link>
  );
}
