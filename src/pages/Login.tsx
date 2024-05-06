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

const loginSchema = z.object({
  uname: z.string().email(),
  pw: z.string().min(6),
});

function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      uname: "",
      pw: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(JSON.stringify(data, null, 2));
    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <>
    <h1 className="scroll-m-20 text-4xl text-center font-extrabold mt-[10%] tracking-tight lg:text-5xl">Login</h1>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 pb-12 mx-auto max-w-lg mt-20 h-full w-full px-4 sm:px-0"
      >
        <FormField
          control={form.control}
          name="uname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
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
          name="pw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  className=" w-full"
                  type="password"
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
    </>
  );
}

// function LoginPage() {
//   return (
//     <form action="http://localhost:3000/register" method="post">
//       <div>
//         <label htmlFor="uname">Username:</label>
//         <input type="text" id="uname" name="uname" />
//       </div>
//       <div>
//         <label htmlFor="pw">Password:</label>
//         <input type="password" id="pw" name="pw" />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

export default Login;
