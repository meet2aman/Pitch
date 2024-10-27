"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <>
      <form action={() => {}} className="startup-form">
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
            Title
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
          <label htmlFor="link">Image URL</label>
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
      </form>
    </>
  );
};

export default StartupForm;
