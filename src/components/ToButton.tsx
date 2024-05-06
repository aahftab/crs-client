import { Link } from "react-router-dom";

function ToButton({ to, className }: { to: string, className:string }) {
  return (
    <Link
      to={"/" + to}
      target="_blank"
      className={className}
      // className="inline-block absolute end-20 bg-blue-500 hover:bg-blue-700 text-white align-middle vertic font-bold rounded py-2 px-4"
    >
      {to}
    </Link>
  );
}

export default ToButton;
