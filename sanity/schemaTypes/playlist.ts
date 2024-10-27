import { Disc } from "lucide-react";
import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  icon: Disc,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "select",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }],
    }),
  ],
});