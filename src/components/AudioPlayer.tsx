import { useState, useRef, MouseEvent } from "react";
import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import useDimension from "@/hooks/useDimension";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
  return formatted;
}

interface AudioPlayerProps {
  audioSrc: string;
}

type AudioState = "LOADING" | "READY" | "PLAYING" | "PAUSED";

function AudioPlayer(props: AudioPlayerProps) {
  const { audioSrc } = props;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const [audioState, setAudioState] = useState<AudioState>("LOADING");

  const [trackRef, trackDimension] = useDimension<HTMLDivElement>();

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;

  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const togglePlayPause = () => {
    if (audioState === "PLAYING") {
      audioRef.current?.pause();

      setAudioState("PAUSED");
    } else {
      audioRef.current?.play();

      setAudioState("PLAYING");
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

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    // get the bounding rect
    const { width } = trackDimension;
    // get the current x position
    const x = e.clientX - e.currentTarget.offsetLeft;
    // // map the audio length to width
    const seekDuration = duration * (x / width);

    setCurrrentProgress(seekDuration);

    audioRef.current.currentTime = seekDuration;
  };

  return (
    <div
      ref={trackRef}
      onClick={handleSeek}
      className='cursor-pointer relative overflow-hidden flex items-center justify-between gap-6 p-4 text-white bg-white/10 rounded-2xl backdrop-blur-sm'
    >
      <span className='absolute -top-10 left-0'>Tooltip</span>
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
          {audioState === "LOADING"
            ? "Loading..."
            : audioState === "PLAYING"
            ? "Now Playing"
            : audioState === "PAUSED"
            ? "Paused"
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
        disabled={audioState === "LOADING"}
        onClick={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
        className='z-[2] flex items-center justify-center h-12 w-12 bg-white rounded-full shadow-3xl shadow-white text-coolnavy hover:text-white hover:bg-primary transition-colors'
      >
        <span className='sr-only'>
          {audioState === "PLAYING" ? "Pause" : "Play"}
        </span>
        <span>
          {audioState === "PLAYING" ? (
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
        onCanPlay={(e) => {
          setAudioState("READY");
        }}
        onPlaying={() => {
          setAudioState("PLAYING");
        }}
        onPause={() => {
          setAudioState("PAUSED");
        }}
        onWaiting={() => setAudioState("LOADING")}
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
