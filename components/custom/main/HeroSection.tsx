import React from "react";
import SearchForm from "../sub/SearchForm";

const HeroSection = ({ query }: { query?: string }) => {
  return (
    <section className="pink_container">
      <h1 className="heading">
        Pitch your startup,
        <br />
        connect with entraprenaurs
      </h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
      </p>
      <SearchForm query={query} />
    </section>
  );
};

export default HeroSection;
