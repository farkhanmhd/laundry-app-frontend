"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Command, EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type LoginInputSchema = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const form = useForm<LoginInputSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { push } = useRouter();

  const onSubmit = async (data: LoginInputSchema) => {
    try {
      const { data: session, error } = await authClient.signIn.username(data);

      if (error) {
        toast.error(error.statusText, {
          description: error.message,
        });
      } else {
        toast.success(`Welcome back, ${session.user.name}!`);
        push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "Oops! Something went wrong on our end. Please try again in a moment."
        );
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-12 items-center justify-center rounded-md font-medium">
            <Command className="h-12 w-12" />
          </div>
        </div>
        <FieldDescription className="font-medium text-foreground text-xl">
          Welcome to Beringin Coin Laundry.
        </FieldDescription>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    disabled={form.formState.isSubmitting}
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel htmlFor="password">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      id="password"
                      placeholder="Password"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    aria-controls="password"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    className="focus-visib absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none le:ring-ring/50 transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={form.formState.isSubmitting}
                    onClick={toggleVisibility}
                    type="button"
                  >
                    {isVisible ? (
                      <EyeIcon aria-hidden="true" size={16} />
                    ) : (
                      <EyeOffIcon aria-hidden="true" size={16} />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit">
            Login
          </Button>
        </form>
      </Form>
      <FieldSeparator>Or</FieldSeparator>

      <FieldGroup>
        <Field>
          <Button type="button" variant="outline">
            Continue with Google
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
}
