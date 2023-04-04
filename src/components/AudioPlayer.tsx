import { useState, useRef } from "react";
import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
  return formatted;
}

interface AudioPlayerProps {
  audioSrc: string;
}

function AudioPlayer(props: AudioPlayerProps) {
  const { audioSrc } = props;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className='flex items-center justify-between gap-6 p-4 text-white bg-coolnavy/30 rounded-2xl backdrop-blur-sm'>
      <div className='space-y-2'>
        <p className='text-sm'>Now Playing</p>
        <div className='flex items-center gap-3'>
          <MusicalNoteIcon className='h-5 w-5' />
          <span className='text-xs w-20'>
            {elapsedDisplay} / {durationDisplay}
          </span>
        </div>
      </div>
      <button
        disabled={!isReady}
        onClick={togglePlayPause}
        className='flex items-center justify-center h-12 w-12 bg-white rounded-full shadow-3xl shadow-white text-coolnavy hover:text-white hover:bg-primary transition-colors'
      >
        <span className='sr-only'>Play</span>
        <span>
          {isPlaying ? (
            <PauseIcon className='h-5 w-5' />
          ) : (
            <PlayIcon className='h-5 w-5' />
          )}
        </span>
      </button>
      <audio
        ref={audioRef}
        preload='metadata'
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={(e) => setIsReady(true)}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          setCurrrentProgress(e.currentTarget.currentTime);
        }}
      >
        <source type='audio/mpeg' src={audioSrc} />
      </audio>
    </div>
  );
}

export default AudioPlayer;
