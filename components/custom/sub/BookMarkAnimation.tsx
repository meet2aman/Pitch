"use client";
import React from "react";
import Lottie from "react-lottie";
import * as animationData from "@/bookmark-lottie.json";
import { createBookmark, deleteBookmark } from "@/actions/action";
import { BookmarkPlus, BookmarkX } from "lucide-react";
import { toast } from "sonner";

const BookMarkAnimation = ({
  startupId,
  isBookmarked,
}: {
  startupId: string;
  isBookmarked: boolean;
}) => {
  console.log(startupId);
  const [isAutoPlat, setIsAutoPlay] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleToggleBookmark = async () => {
    try {
      if (bookmarked) {
        const promise = () =>
          new Promise((resolve) => resolve(deleteBookmark({ startupId })));
        toast.promise(promise, {
          loading: "Loading...",
          success: (data) => {
            if (data) {
              return `Bookmark deleted successfully`;
            }
          },
          error: "Bookmark Action Failed",
        });
        // const response = await deleteBookmark({ startupId });
        // if (response) {
        //   toast.warning(`Bookmarked deleted successfully`);
        // }
      } else {
        const response = await createBookmark({ startupId });
        if (response) {
          toast.success(`Bookmarked Added successfully`);
        }
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      toast.error(`Bookmark action failed`);
      console.error(error);
    }
  };
  return (
    <button
      onClick={handleToggleBookmark}
      className="absolute -top-12 bg-white right-0 border-black rounded-[22px] shadow-200 "
    >
      {/* <Lottie options={defaultOptions} height={40} width={40} /> */}
      {bookmarked ? (
        <BookmarkX className="size-8 p-1 text-red-500" />
      ) : (
        <BookmarkPlus className="size-8 text-blue-500 p-1" />
      )}
    </button>
  );
};

export default BookMarkAnimation;
