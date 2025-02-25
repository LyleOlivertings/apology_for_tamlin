'use client';
import { useState } from 'react';
import { 
  HeartIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon 
} from '@heroicons/react/24/solid';
import { GiBrokenHeart } from 'react-icons/gi';
import dynamic from 'next/dynamic';
import { useAudio } from '../hooks/useAudio';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function ApologyPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, togglePlay] = useAudio('/sad-music.mp3');

  const handleForgiveness = () => {
    setIsAnimating(true);
    setShowConfetti(true);
    setTimeout(() => setIsAnimating(false), 1000);
    setHearts([...hearts, Date.now()]);
    
    // Fade out music if playing
    if (isPlaying) {
      togglePlay();
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart}
          className="absolute animate-float text-red-500 text-4xl"
          style={{ left: `${Math.random() * 100}%` }}
        >
          ❤️
        </div>
      ))}

      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl font-bold text-red-600 mb-8 animate-bounce">
          Dear Tamlin,
        </h1>

        <div className="space-y-4 text-lg text-gray-800">
          <p className={`transition-transform duration-500 ${isAnimating ? 'scale-110' : ''}`}>
            I'm really sorry for getting carried away with building websites... 🌐
          </p>
          <p className="flex items-center justify-center gap-2">
            I know I've been <GiBrokenHeart className="text-red-600 animate-pulse" /> neglecting our time together
          </p>
          <p>Here's what I've learned:</p>
          <ul className="list-disc list-inside text-left mx-auto max-w-xs">
            <li>Family {'>'} Flexbox</li>
            <li>Conversations {'>'} Code reviews</li>
            <li>Memories {'>'} Metadata</li>
          </ul>
        </div>

        <div className="mt-8">
          <button
            onClick={handleForgiveness}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <HeartIcon className="w-6 h-6 animate-pulse" />
            Please forgive me?
            <HeartIcon className="w-6 h-6 animate-pulse" />
          </button>
        </div>
        <button
    onClick={togglePlay}
    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
  >
    {isPlaying ? (
      <>
        <SpeakerWaveIcon className="w-6 h-6" />
        Pause Sad Music
      </>
    ) : (
      <>
        <SpeakerXMarkIcon className="w-6 h-6" />
        Play Sad Music
      </>
    )}
  </button>

        <div className="mt-12 text-gray-500 text-sm">
          <p>P.S. I promise my next project will be something we can enjoy together! �</p>
          <p className="mt-2 text-xs">(No websites were harmed in the making of this apology)</p>
        </div>
      </div>
    </div>
  );
}