/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/actions/action";

const StartupForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      console.log(formValues);

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast.success("Your startup pitch has been created successfully");

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <>
      <form action={formAction} className="startup-form">
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          />
          {errors.title && (
            <>
              <p className="startup-form_error">{errors.title}</p>
            </>
          )}
        </div>

        <div>
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea"
            required
            placeholder="Description"
          />
          {errors.description && (
            <>
              <p className="startup-form_error">{errors.description}</p>
            </>
          )}
        </div>

        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Startup Category ( Tech, Health, Education, Codeing, ...)"
          />
          {errors.category && (
            <>
              <p className="startup-form_error">{errors.category}</p>
            </>
          )}
        </div>

        <div>
          <label htmlFor="link" className="startup-form_label">
            Image URL
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="Startup Image URL"
          />
          {errors.link && (
            <>
              <p className="startup-form_error">{errors.link}</p>
            </>
          )}
        </div>
        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>

          <MDEditor
            className="mt-3"
            id="pitch"
            preview="edit"
            height={300}
            value={pitch}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "3px solid black",
            }}
            onChange={(value) => setPitch(value as string)}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem is solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && (
            <>
              <p className="startup-form_error">{errors.pitch}</p>
            </>
          )}
        </div>
        <Button disabled={isPending} type="submit" className="startup-form_btn">
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          {isPending ? (
            <Loader2 className="size-6 animate-spin ml-2" />
          ) : (
            <Send className="size-6 ml-2" />
          )}
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
