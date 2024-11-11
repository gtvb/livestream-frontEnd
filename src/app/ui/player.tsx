"use client";

import { useCallback, useEffect, useState } from "react";
import videojs from "video.js";

interface PlayerProps {
  techOrder: string[];
  autoplay: boolean;
  controls: boolean;
  sources: {
    src: string;
    type: string;
  }[];
}


const ErrorMessage = ({ message }: { message: string }) => (
  <div className="error-message">{message}</div>
);

const Player = (props: PlayerProps) => {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onVideo = useCallback((el: HTMLVideoElement) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) {
      return;
    }

    // our video.js player
    const player = videojs(videoEl, props);

    player.on('error', () => {
      const error = player.error();
      if (error) {
        setError(error.message);
      }
    });

    player.play();

    return () => {
      player.dispose();
    };
  }, [props, videoEl]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div data-vjs-player style={{width: 600, height: 400}}>
        <video ref={onVideo} className="video-js" playsInline />
      </div>
    </>
  );
};

export default Player;