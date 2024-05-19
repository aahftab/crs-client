/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NANZu5EYdVC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
type NewsType = {
  title: string;
  description: string;
  src: string;
};
export default function NewsPost({ title, description, src }: NewsType) {
  return (
    <Card className="w-full max-w-xl ">
      <img
        alt="News article image"
        className="aspect-[4/3] w-full rounded-t-lg object-cover"
        height="240"
        src={src}
        width="400"
      />
      <CardContent className="space-y-3 p-6">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-500">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
