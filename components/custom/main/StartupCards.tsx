import React from "react";
import StartupSingleCard from "../sub/StartupSingleCard";
import { StartupCardType } from "@/types/global-types";

const StartupCards = ({ query }: { query?: string }) => {
  const posts = [
    {
      _createdAt: new Date(),
      views: 35,
      author: { _id: 19273, name: "Adrian" },
      _id: 29,
      description: "This is Description",
      image:
        "https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Programming",
      title: "Programming",
    },
    {
      _createdAt: new Date(),

      views: 35,
      author: { _id: 19273, name: "Adrian" },
      _id: 2933,
      description: "This is Description",
      image:
        "https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Programming",
      title: "Programming",
    },
    {
      _createdAt: new Date(),

      views: 35,
      author: { _id: 19273, name: "Adrian" },
      _id: 29553,
      description: "This is Description",
      image:
        "https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Programming",
      title: "Programming",
    },
  ];
  return (
    <section className="section_container">
      <p className="text-30-semibold ">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>
      <ul className="mt-7 card_grid">
        {posts.length > 0 ? (
          <>
            {posts.map((post: StartupCardType) => (
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
