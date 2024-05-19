import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NewsSchema = z.object({
  title: z.string(),
  description: z.string().min(6),
  image: z.any().refine(
    () => {
      const img = document.getElementById("image");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (img?.files[0].size > 1024 * 1024 * 5) {
        return false;
      }
      return true;
    },
    { message: "File size should be less than 5MB" }
  ),
});

export default function PostNews() {
  const form = useForm<z.infer<typeof NewsSchema>>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  async function onSubmit(data: z.infer<typeof NewsSchema>) {
    const fileInput = document.getElementById("image");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (fileInput?.files[0].size > 1024 * 1024 * 5) {
      toast({
        title: "Invalid File Size",
        description: "File size should be less than 5MB",
      });
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    formData.append("image", fileInput?.files[0]);

    await fetch("http://localhost:3000/postNews", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((res) => {
      if (res.status === 401) {
        res.json().then((res) => {
          toast({
            title: "Click here to login",
            description: `${res.msg}`,
            onClick: () => {
              window.open("/login", "_blank");
            },
          });
        });
      } else if (res.status == 200) {
        toast({
          title: "Success",
          description: "News posted successfully",
        });
        form.reset();
      } else {
        console.log(res.status);
      }
    });
  }

  return (
    <div className="flex flex-col  h-[100%]">
      <h1 className="mt-[10%] w-full text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
        Post News
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col space-y-6 pb-12 mx-auto max-w-lg mt-20 h-full w-full px-4 sm:px-0"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title"
                    className=" w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter post description"
                    className=" w-full"
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input
                    className=" w-full"
                    type="file"
                    id="image"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
