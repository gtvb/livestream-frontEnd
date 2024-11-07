"use client"

import { z } from "zod"
import React, { useState } from 'react';
import { liveStreamSchema } from "../lib/zod";
import Link from "next/link";

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

    const currentStream = livestreams[currentIndex];

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '10px' }}>
                {/* Fake video element */}
                <div style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.5rem'
                }}>
                    {currentStream.name}
                </div>
                <p>Viewer Count: {currentStream.viewer_count}</p>
                <p>Status: {currentStream.live_stream_status ? 'Live' : 'Offline'}</p>
                <p>Published by: {currentStream.publisher_id}</p>
            </div>

            {/* Navigation Buttons */}
            <button onClick={handlePrev} disabled={currentIndex === 0}>
                Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex === livestreams.length - 1}>
                Next
            </button>
            <Link href={`/live/${currentStream.id}`}>Watch</Link>
        </div>
    );
};

export default Slider;