import { Link } from "react-router-dom";
import { Button,} from "@/components/ui/button";

export default function ToButton({
  to,
  className,
}: {
  to: string;
  className: string;
}) {
  return (
    <Button asChild className={className}>
      <Link
      to={"/" + to}
      target="_blank"
      className=""
    >
      {to.charAt(0).toUpperCase() + to.slice(1)}
    </Link>
    </Button>
  );
}
