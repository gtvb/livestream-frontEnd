"use client";

import { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import styles from "../styles/player.module.css";

interface PlayerProps {
  thumbnail: string;
  techOrder: string[];
  autoplay: boolean;
  controls: boolean;
  sources: {
    src: string;
    type: string;
  }[];
}

// const ErrorMessage = ({ message }: { message: string }) => (
//   <div className="error-message" hidden={message === ""}>{message}</div>
// );

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

    player.on("ready", () => {
      player.pause();
      player.poster(props.thumbnail);
    });

    return () => {
      if (player) {
          player.dispose();
      }
    };
  }, [props, videoEl]);

  return (
      <div className={styles.videoContainer}>
          <video ref={onVideo} className="video-js" style={{width: "100%", height: "100%", border: "2px solid green"}} />
      </div>
  );
};

export default Player;
