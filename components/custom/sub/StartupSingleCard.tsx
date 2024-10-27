import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StartupTypeCard } from "../main/StartupCards";

const StartupSingleCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    _id,
    author,
    views,
    title,
    image,
    description,
    category,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between ">
        <p className="startup-card_date">{formatDate(_createdAt as string)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-alpha" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`user/${author?._id}`}>
            <p className="line-clamp-1 text-16-medium">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`user/${author?._id}`}>
          <Image
            src={"/user.jpeg"}
            height={48}
            width={48}
            alt="placeholder"
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          // width={100}
          // height={50}
          src={image}
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn !hover:bg-alpha" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupSingleCard;
