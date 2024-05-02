/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TMxJxqEvJD1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import pfp from "@/placeholder.svg";
import { createClient } from "pexels";
import { Photo, Photos, ErrorResponse } from "pexels/dist/types";

const client = createClient(
  "mI01Hxk1iGjT35sU5qbJpfOGBRIBdZ1pcdpXEd7m5DCNlYf98MVL9142"
);

export default function NewsPost() {
  const [photoSrcs, setPhotoSrcs] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos: Photos | ErrorResponse = await client.photos.search({query: "accident",per_page: 8,orientation: "square",size: "small"});
      if ("error" in photos) {
        console.error(photos.error);
        setPhotoSrcs(["https://picsum.photos/200"]);
      } else {
        setPhotoSrcs(photos.photos.map((photo: Photo) => photo.src.medium));
      }
    };

    fetchPhotos();
  }, []);
  console.log(photoSrcs);
  return (
    <Card className="w-full flex max-w-2xl mx-auto my-4">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex gap-4 items-start">
          <Avatar className="w-12 h-12">
            <AvatarImage src={pfp} alt="Avatar" />
            <AvatarFallback delayMs={5000}>PFP</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold leading-none">@lauriebarnes</h2>
              <Button
                className="border-gray-300 dark:border-gray-700"
                size="sm"
                variant="outline"
              >
                Follow
              </Button>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4 -translate-y-0.5 flex-shrink-0 mr-1" />
              <span>2h</span>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-base leading-snug">
          <p>
            Just witnessed a robbery at the corner of 5th and Pine. The suspect
            was wearing a black hoodie and escaped in a red sedan. Please be
            careful in the area.
          </p>
        </div>
        <Carousel className="m-10">
          <CarouselContent className="items-center">
            {photoSrcs.map((src) => (
              <CarouselItem>
                <div className="p-1">
                  <img
                    alt="Image"
                    className="mx-auto rounded-lg object-cover"
                    src={src}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex items-center gap-4 text-sm">
          <Button
            className="border-gray-300 dark:border-gray-700"
            size="sm"
            variant="outline"
          >
            <HeartIcon className="w-4 h-4 -translate-y-0.5 flex-shrink-0 mr-1" />
            Like
          </Button>
          <Button
            className="border-gray-300 dark:border-gray-700"
            size="sm"
            variant="outline"
          >
            <MessageSquareIcon className="w-4 h-4 -translate-y-0.5 flex-shrink-0 mr-1" />
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageSquareIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
