import React from "react";
import styles from "./Cast.module.scss";
import { MovieDetail, SeriesDetail } from "@/types/Movie";
import Image from "next/image";

const Cast = ({
  data,
  imageLoaded,
  setImageLoaded,
}: {
  data: MovieDetail | SeriesDetail | null;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.casts}>
      {data?.credits?.cast?.slice(0, 4).map((cast) => (
        <div key={cast.id} className={styles.cast} data-loaded={imageLoaded}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${cast.profile_path}`}
            alt={cast.name}
            width={100}
            height={100}
            priority
            onLoad={() => setImageLoaded(true)}
          />
          <small>{cast.name}</small>
        </div>
      ))}
    </div>
  );
};

export default Cast;
