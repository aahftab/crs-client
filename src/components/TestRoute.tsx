import { Button } from "@/components/ui/button";

export default function TestRoute({
  route,
  className,
}: {
  route: string;
  className: string;
}) {
  const testRoute = async () => {
    await fetch("http://localhost:3000" + route, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <Button onClick={testRoute} className={className}>
      {route}
    </Button>
  );
}
