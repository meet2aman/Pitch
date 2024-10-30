import React from "react";
import StartupSingleCard from "../sub/StartupSingleCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Author, Startup } from "@/sanity/types";
import { sanityFetch } from "@/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };
export type StartupTypeCard2 = Omit<Startup, "startup"> & { startup?: Startup };

const StartupCards = async ({ query }: { query?: string }) => {
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <section className="section_container">
      <p className="text-30-semibold ">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>
      <ul className="mt-7 card_grid">
        {posts.length > 0 ? (
          <>
            {posts.map((post: StartupTypeCard) => (
              <StartupSingleCard key={post?._id} post={post} />
            ))}
          </>
        ) : (
          <p className="no-results">No Startups Found.</p>
        )}
      </ul>
    </section>
  );
};

export default StartupCards;
