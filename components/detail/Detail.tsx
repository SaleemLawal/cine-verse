import React from "react";
import Cast from "../cast/Cast";
import styles from "./Detail.module.scss";
import { MovieDetail, SeriesDetail } from "@/types/Movie";
import { getTitle } from "@/lib/utils";

const Detail = ({
  data,
  imageLoaded,
  setImageLoaded,
}: {
  data: MovieDetail | SeriesDetail | null;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.detail}>
      <h2 className={styles.title}>{getTitle(data)}</h2>
      {/* render the genres */}
      <div className={styles.genres}>
        {data?.genres?.map((genre, index) => (
          <span key={index}>{genre.name}</span>
        ))}
      </div>
      <p>{data?.overview}</p>

      {/* Render the top 4 casts */}
      <h3>Top Casts</h3>
      <Cast
        data={data}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
      />
      {/* <div className={styles.casts}>
      {moviesDetail?.credits?.cast?.slice(0, 4).map((cast) => (
        <div
          key={cast.id}
          className={styles.cast}
          data-loaded={imageLoaded}
        >
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
    </div> */}
    </div>
  );
};

export default Detail;
