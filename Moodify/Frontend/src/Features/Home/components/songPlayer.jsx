import React, { useEffect, useMemo, useRef, useState } from 'react'
import './songPlayer.scss'
import { useSong } from '../Hooks/useSong'

const speedOptions = [0.75, 1, 1.25, 1.5, 2]

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const totalSeconds = Math.floor(seconds)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}


const SongPlayer = () => {
  const { song } = useSong()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  const progress = useMemo(() => {
    if (!duration) {
      return 0
    }

    return (currentTime / duration) * 100
  }, [currentTime, duration])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    audio.pause()
    audio.currentTime = 0
    audio.src = song?.songUrl || ''
    audio.load()

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.playbackRate = playbackRate
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [song?.songUrl, playbackRate])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      audio.playbackRate = playbackRate
    }
  }, [playbackRate])

  const togglePlay = async () => {
    const audio = audioRef.current

    if (!audio?.src) {
      return
    }

    if (audio.paused) {
      await audio.play()
      setIsPlaying(true)
      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  const skipBy = (seconds) => {
    const audio = audioRef.current

    if (!audio?.src) {
      return
    }

    const nextTime = Math.min(Math.max((audio.currentTime || 0) + seconds, 0), audio.duration || 0)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSeek = (event) => {
    const audio = audioRef.current

    if (!audio?.src || !duration) {
      return
    }

    const nextTime = (Number(event.target.value) / 100) * duration
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSpeedChange = (event) => {
    setPlaybackRate(Number(event.target.value))
  }

  return (
    <section className="song-player">
      <audio ref={audioRef} preload="metadata" />

      <div className="song-player__artwork">
        <img src={song?.coverUrl} alt={song?.title || 'Current song cover'} />
      </div>

      <div className="song-player__content">
        <div className="song-player__meta">
          <span className="song-player__badge">{song?.mood || 'track'}</span>
          <h2>{song?.title || 'No song selected'}</h2>
          <p>Use the controls below to jump 5 seconds, scrub the track, or change speed.</p>
        </div>

        <div className="song-player__progress">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            aria-label="Song progress"
            disabled={!duration}
          />
          <div className="song-player__time-row">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="song-player__controls">
          <button type="button" className="song-player__ghost-button" onClick={() => skipBy(-5)}>
            -5s
          </button>
          <button type="button" className="song-player__play-button" onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="song-player__ghost-button" onClick={() => skipBy(5)}>
            +5s
          </button>
        </div>

        <div className="song-player__footer">
          <label>
            Speed
            <select value={playbackRate} onChange={handleSpeedChange} aria-label="Playback speed">
              {speedOptions.map((speed) => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
          </label>
          <span>{isPlaying ? 'Playing now' : 'Ready to play'}</span>
        </div>
      </div>
    </section>
  )
}

export default SongPlayer
