import { fetchAllBookmarkedByUser } from "@/actions/action";
import StartupSingleCard from "@/components/custom/sub/StartupSingleCard";
import { Bookmark } from "lucide-react";
import React from "react";

const BookMark = async () => {
  const bookmarks = await fetchAllBookmarkedByUser();
  const bookmarksArray = Array.isArray(bookmarks)
    ? bookmarks
    : Object.values(bookmarks);
  const bookmarkedIds = bookmarksArray.map((bookmark) => bookmark.startup?._id);
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag flex justify-center items-center gap-2">
          <Bookmark />
          <span>BookMarks</span>
        </p>
        <h1 className="heading">BookMarks</h1>
        <p className="sub-heading !max-w-5xl">
          All of Your Saved Startups ar here.
        </p>
      </section>
      <section className="section_container">
        {bookmarksArray && bookmarksArray.length > 0 ? (
          <>
            <p className="text-30-semibold">Bookmarks</p>
            <ul className="mt-7 card_grid">
              {bookmarksArray.map((post, i) => {
                if (!post?.startup) {
                  console.warn(
                    `Bookmark at index ${i} has no startup data`,
                    post
                  );
                  return null;
                }

                return (
                  <StartupSingleCard
                    key={i}
                    post={post.startup}
                    isBookmarked={bookmarkedIds.includes(post.startup._id)}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <p>No bookmarks found</p>
        )}
      </section>
    </>
  );
};

export default BookMark;
