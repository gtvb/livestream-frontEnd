"use client"

import { useState } from 'react';
import styles from '../styles/navigator.module.css';
import { Feed } from '../lib/zod';
import Player from './player';

export default function LivestreamNavigator({ feed }: { feed: Feed }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentStream = feed.livestreams[currentIndex];
    const currentUser = feed.users[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feed.livestreams.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + feed.livestreams.length) % feed.livestreams.length);
    };

    console.log("I want ", process.env.API_URL);

    return (
        <div className={styles.navigatorContainer}>
            {feed.livestreams.length == 0 ? (
                <div className={styles.noStreams}>Sem streams no momento :(</div>
            ) : (
                <>
                    <div className={styles.arrowContainer} onClick={handlePrev}>
                        <img className={styles.arrowleftIcon} alt="" src="/assets/images/Vector.png" />
                    </div>

                    <div className={styles.centeredContainer}>
                        <Player
                            thumbnail={currentStream.thumbnail}
                            techOrder={["html5"]}
                            autoplay={false}
                            controls={true}
                            sources={currentStream.live_stream_status ? [{ src: `${process.env.API_URL}/hls/${currentStream.id}.m3u8`, type: "application/x-mpegURL" }] : []}
                        />
                        <div className={styles.infoContainer}>
                            <h1>{currentStream.name}</h1>
                            <hr style={{ color: "lightgrey", height: "1px", opacity: "0.25", margin: "15px 0px" }} />
                            <div className={styles.accountDetails}>
                                <div className={styles.userInfo}>
                                    <h4>{currentUser.username}</h4>
                                    &bull;
                                    <p>{currentStream.viewer_count} assistindo</p>
                                </div>

                                <button className='btn' style={{ borderRadius: "16px" }}>Seguir</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.arrowContainer} onClick={handleNext}>
                        <img className={styles.arrowrightIcon} alt="" src="/assets/images/VectorRight.png" />
                    </div>
                </>
            )}
        </div>
    );
}
