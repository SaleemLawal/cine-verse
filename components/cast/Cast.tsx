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
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  
  return (
    <div className={styles.casts}>
      {data?.credits?.cast?.slice(0, 4).map((cast) => {
        const profileImageUrl = imageBaseUrl && cast.profile_path
          ? `${imageBaseUrl}${cast.profile_path}`
          : null;
        
        return (
          <div key={cast.id} className={styles.cast} data-loaded={imageLoaded}>
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={cast.name}
                width={100}
                height={100}
                priority
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div style={{ width: 100, height: 100, background: '#333', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>
                No Image
              </div>
            )}
            <small>{cast.name}</small>
          </div>
        );
      })}
    </div>
  );
};

export default Cast;
