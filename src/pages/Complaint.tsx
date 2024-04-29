import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar} from "@/components/ui/calendar";

const complaintTypes: string[] = [
  "burglary",
  "cyber_crime",
  "theft",
  "fraud",
  "harassment",
  "assault",
  "domestic_violence",
  "cyber_bullying",
  "stalking",
  " defamation",
  "hate_speech",
  "child_abuse",
  "sexual_assault",
];
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female", "other"]),
  complaintType: z.enum([
    "burglary",
    "cyber_crime",
    "theft",
    "fraud",
    "harassment",
    "assault",
    "domestic_violence",
    "cyber_bullying",
    "stalking",
    " defamation",
    "hate_speech",
    "child_abuse",
    "sexual_assault",
  ]),
  date: z.date({
    required_error: "Date is required.",
  }),
  time: z.string().time().optional(),
  state: z.string(),
  district: z.string(),

  location: z.string().min(1, {
    message: "Location must not be empty.",
  }),

  description: z.string().min(100, {
    message: "Description must be atleast 100 characters.",
  }),

  suspectName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .optional(),

  suspectAddress: z
    .string()
    .min(2, { message: "Address must not be empty." })
    .optional(),
});

export default function ComplaintForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      gender: undefined,
      complaintType: undefined,
      date: undefined,
      time: "",
      state: "",
      district: "",
      location: "",
      description: "",
      suspectName: "",
      suspectAddress: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Hiii");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6  mx-auto max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone no</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select your gender"
                        {...field}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complaintType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint Type</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select complaint type"
                        {...field}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {complaintTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    fromYear={2015} 
                    toYear={2025}
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }

                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date on which incident happened
              </FormDescription>
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
