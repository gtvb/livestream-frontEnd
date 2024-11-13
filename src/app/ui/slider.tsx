"use client"

import { useState } from 'react';
import styles from '../styles/navigator.module.css';
import { LiveStream } from '../lib/zod';
import { useRouter } from 'next/navigation';

export default function LivestreamNavigator({ livestreams }: { livestreams: LiveStream[] }) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentStream = livestreams[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % livestreams.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + livestreams.length) % livestreams.length);
    };

    return (
        <div className={styles.navigatorContainer}>
            {livestreams.length == 0 ? (<div className=''>No streams found...</div>) : (
                <>
                    <div className={styles.arrowContainer} onClick={handlePrev}>
                        <img className={styles.arrowleftIcon} alt="" src="/assets/images/Vector.png" />
                    </div>

                    <div className={styles.centeredContainer}>
                        <div className={styles.imageContainer}>
                            <img src={currentStream.thumbnail} alt="" className={styles.image} onClick={() => router.push(`/live/${currentStream.id}`)} />
                        </div>
                        <div className={styles.infoContainer}>
                            <h1>{currentStream.name}</h1>
                            <hr style={{ color: "lightgrey", height: "1px", opacity: "0.25", margin: "15px 0px" }} />
                            <div className={styles.accountDetails}>
                                <div className={styles.userInfo}>
                                    <h4>Nome do usuário</h4>
                                    &bull;
                                    <p>4.2k assistindo</p>
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