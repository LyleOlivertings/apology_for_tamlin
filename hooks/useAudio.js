import { useState, useEffect } from 'react';

export const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const toggle = () => {
    if (!userInteracted) setUserInteracted(true);
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (userInteracted) {
      isPlaying ? audio.play() : audio.pause();
    }
    
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [isPlaying, userInteracted]);

  return [isPlaying, toggle];
};