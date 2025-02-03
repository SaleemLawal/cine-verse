const VideoEmbed = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <iframe
      src={embedUrl}
      width="912"
      height="480"
      allowFullScreen
      frameBorder="0"
      referrerPolicy="no-referrer"
    ></iframe>
  );
};

export default VideoEmbed;
