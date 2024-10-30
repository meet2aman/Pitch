import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { startup } from "./startup";
import { playlist } from "./playlist";
import { bookmark } from "./bookmark";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist, bookmark],
};
