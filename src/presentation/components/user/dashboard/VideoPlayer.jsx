
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl,h }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl} 
        width="100%"
        height={h?`${h}vh`:"100%"}
        controls 
      />
    </div>
  );
};

export default VideoPlayer;
