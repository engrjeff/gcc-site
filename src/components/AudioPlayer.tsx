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
  const [currentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;

  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  // handler
  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <div className='relative overflow-hidden flex items-center justify-between gap-6 p-4 text-white bg-white/10 rounded-2xl backdrop-blur-sm'>
      <div
        className='absolute inset-0 bg-primary/30 origin-left'
        style={{
          transform: `scaleX(${progressBarWidth})`,
        }}
      ></div>
      <div
        className='absolute inset-0 bg-primary/20 origin-left'
        style={{
          transform: `scaleX(${bufferedWidth})`,
        }}
      ></div>
      <div className='space-y-2 z-[2]'>
        <p className='text-sm'>
          {!isReady
            ? "Loading..."
            : isPlaying
            ? "Now Playing"
            : "Start Listening Now"}
        </p>
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
        className='z-[2] flex items-center justify-center h-12 w-12 bg-white rounded-full shadow-3xl shadow-white text-coolnavy hover:text-white hover:bg-primary transition-colors'
      >
        <span className='sr-only'>{isPlaying ? "Pause" : "Play"}</span>
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
        onWaiting={() => console.log("waiting")}
        onTimeUpdate={(e) => {
          setCurrrentProgress(e.currentTarget.currentTime);
          handleBufferProgress(e);
        }}
        onProgress={handleBufferProgress}
      >
        <source type='audio/mpeg' src={audioSrc} />
      </audio>
    </div>
  );
}

export default AudioPlayer;
