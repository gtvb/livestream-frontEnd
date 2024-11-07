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

const Player = (props: PlayerProps) => {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const onVideo = useCallback((el: HTMLVideoElement) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) {
      return;
    }

    // our video.js player
    const player = videojs(videoEl, props);
    player.play()

    return () => {
      player.dispose();
    };
  }, [props, videoEl]);

  return (
    <>
      <div data-vjs-player>
        <video ref={onVideo} className="video-js" playsInline />
      </div>
    </>
  );
};

export default Player;