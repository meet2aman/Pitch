"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import {
  BOOKMARK_BY_AUTHOR_AND_STARTUP_QUERY,
  BOOKMARK_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export const createPitch = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createBookmark = async ({ startupId }: { startupId: string }) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  try {
    const data = {
      user: {
        _type: "reference",
        _ref: session?.id,
      },
      startup: {
        _type: "reference",
        _ref: startupId,
      },
    };
    const result = await writeClient.create({ _type: "bookmark", ...data });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deleteBookmark = async ({ startupId }: { startupId: string }) => {
  const session = await auth();
  const userId = session.id;
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    const bookmark = await client.fetch(BOOKMARK_BY_AUTHOR_AND_STARTUP_QUERY, {
      startupId,
      userId,
    });
    console.log(bookmark);
    const bookmarkId = bookmark[0]._id;
    console.log(bookmarkId);
    console.log("Type of bookmarkId:", typeof bookmarkId);

    const result = await writeClient.delete(bookmarkId);
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const fetchAllBookmarkedByUser = async () => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  const userId = session.id;

  try {
    const result = await client.fetch(BOOKMARK_BY_AUTHOR_QUERY, { id: userId });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
