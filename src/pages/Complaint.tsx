import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import * as statesAndDistricts from "@/assets/states-and-districts.json";
import { Textarea } from "@/components/ui/textarea";

const complaintTypes = [
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
] as const;

const suspectSchema = z.object({
  // id: z.number(),
  suspectName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .optional(),
  suspectAddress: z
    .string()
    .min(2, { message: "Address must not be empty." })
    .optional(),
});

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female", "other"]),
  complaintType: z.enum(complaintTypes),
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
  suspects: z.array(suspectSchema),
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
      time: undefined,
      state: "",
      district: "",
      location: "",
      description: "",
      suspects: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "suspects",
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    await fetch("http://localhost:3000/registerComplaint", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, null, 2),
    }).then((res) => {
      console.log(res);
    });
  }
  const time = form.watch("time");
  console.log(time);
  const states = statesAndDistricts.states;
 
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 pb-12 mx-auto max-w-3xl"
        >
          <div className="flex space-x-4">
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
                    <Input placeholder="Enter Phone no." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
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
          </div>
          <div className="flex space-x-4">
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
              name="time"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      aria-label="Time"
                      type="time"
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value + ":00";
                        console.log(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Time on which incident happened
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className=" max-w-48">
                  <FormLabel>Date of Incident</FormLabel>
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
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {}
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your state"
                          {...field}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statesAndDistricts.states.map((state, i) => (
                        <SelectItem key={i} value={state.state}>
                          {state.state}
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
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      console.log(value);
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your district"
                          {...field}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map(
                        (state) =>
                          state.state === form.watch("state") &&
                          state.districts.map((district) => (
                            <SelectItem value={district}>{district}</SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
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
                    placeholder="Enter description"
                    className="w-full"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/100 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-left">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className=" w-[50px] text-center">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length > 0 &&
                  fields.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-left">{index}</TableCell>
                      <TableCell className="font-medium">
                        <FormField
                          control={form.control}
                          name={`suspects.${index}.suspectName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Suspect Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter suspect name"
                                  key={item.id}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`suspects.${index}.suspectAddress`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Suspect Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter suspect Address"
                                  key={item.id}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          {" "}
                          <Trash2 color="white"></Trash2>{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          }

          <Button
            type="button"
            variant={"secondary"}
            className="mt-[32px]"
            onClick={() => {
              append({
                suspectName: "",
                suspectAddress: "",
              });
              toast({
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(fields, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
          >
            Add Suspect
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
