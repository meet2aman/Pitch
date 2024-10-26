import { StartupCardType } from "@/types/global-types";
import Image from "next/image";
import React from "react";

const StartupSingleCard = ({ post }: { post: StartupCardType }) => {
  return (
    <div key={post._id}>
      <Image src={post.image} height={400} width={300} alt="image" />
    </div>
  );
};

export default StartupSingleCard;
