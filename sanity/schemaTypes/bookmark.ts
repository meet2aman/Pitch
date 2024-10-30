import { BookmarkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const bookmark = defineType({
  name: "bookmark",
  title: "Bookmark",
  type: "document",
  icon: BookmarkIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "startup",
      title: "Startup",
      type: "reference",
      to: [{ type: "startup" }],
    }),
  ],
});
