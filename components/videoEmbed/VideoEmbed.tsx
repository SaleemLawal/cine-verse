import styles from "./VideoEmbed.module.scss";

const VideoEmbed = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        src={embedUrl}
        allowFullScreen
        frameBorder="0"
        referrerPolicy="no-referrer"
        className={styles.video}
      />
    </div>
  );
};

export default VideoEmbed;
