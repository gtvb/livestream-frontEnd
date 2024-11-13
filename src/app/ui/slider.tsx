"use client"

import { z } from "zod"
import React, { useState } from 'react';
import { liveStreamSchema } from "../lib/zod";
import Link from "next/link";
import styles from "./index.module.css"

type LiveStream = z.infer<typeof liveStreamSchema>;

interface SliderProps {
    livestreams: LiveStream[];
}

const Slider: React.FC<SliderProps> = ({ livestreams }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < livestreams.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentStream = livestreams.length ? livestreams[currentIndex] : null;

    return (
        <div style={{ textAlign: 'center' }}>
            {currentStream === null ? (
                <p>No livestreams found</p>
            ) : (
                <>
                    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '10px' }}>
                        { currentStream.thumbnail ? <img src={currentStream.thumbnail} alt={currentStream.name} style={{ width: '100%' }} /> : null }
                        <p>Id: {currentStream.id}</p>
                        <p>Viewer Count: {currentStream.viewer_count}</p>
                        <p>Status: {currentStream.live_stream_status ? 'Live' : 'Offline'}</p>
                        <p>Published by: {currentStream.publisher_id}</p>
                    </div>

                    <button onClick={handlePrev} disabled={currentIndex === 0}>
                        <img  className={styles.arrowleftIcon} alt="" src="/assets/images/Vector.png" />
                    </button>

                    <Link href={`/live/${currentStream.id}`}>Watch</Link>

                    <button onClick={handleNext} disabled={currentIndex === livestreams.length - 1}>
                        <img  className={styles.arrowrightIcon} alt="" src="/assets/images/VectorRight.png" />
                    </button>
                    
                </>
            )}
        </div>
    );
};

export default Slider;