import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';
import { trackVideoPlay, trackVideoPause, trackVideoProgress, trackVideoComplete, trackVideoSeek, trackPageView } from '../utils/tracking';

const Videos = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progressMilestones, setProgressMilestones] = useState<Set<number>>(new Set());
  const [lastSeekTime, setLastSeekTime] = useState(0);

  const videoData = {
    id: 'tea-brewing-guide',
    title: 'The Art of Tea Brewing - Complete Guide',
    description: 'Learn the traditional methods of brewing the perfect cup of tea with our master tea sommelier.',
    thumbnail: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800'
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const total = video.duration;
      setCurrentTime(current);

      if (total > 0) {
        const percentComplete = Math.round((current / total) * 100);
        
        // Track progress milestones (25%, 50%, 75%, 90%)
        const milestones = [25, 50, 75, 90];
        milestones.forEach(milestone => {
          if (percentComplete >= milestone && !progressMilestones.has(milestone)) {
            setProgressMilestones(prev => new Set([...prev, milestone]));
            trackVideoProgress(videoData.title, videoData.id, current, total, milestone);
          }
        });

        // Track completion at 95% (common practice)
        if (percentComplete >= 95 && !progressMilestones.has(100)) {
          setProgressMilestones(prev => new Set([...prev, 100]));
          trackVideoComplete(videoData.title, videoData.id, total);
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      trackVideoPlay(videoData.title, videoData.id, video.currentTime);
    };

    const handlePause = () => {
      setIsPlaying(false);
      trackVideoPause(videoData.title, videoData.id, video.currentTime, video.duration);
    };

    const handleSeeked = () => {
      const currentSeekTime = video.currentTime;
      if (Math.abs(currentSeekTime - lastSeekTime) > 2) { // Only track significant seeks
        trackVideoSeek(videoData.title, videoData.id, lastSeekTime, currentSeekTime);
      }
      setLastSeekTime(currentSeekTime);
    };

    const handleSeeking = () => {
      setLastSeekTime(video.currentTime);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('seeking', handleSeeking);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('seeking', handleSeeking);
    };
  }, [videoData.title, videoData.id, progressMilestones, lastSeekTime]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    video.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
            Tea Education Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master the art of tea with our comprehensive video guides
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Video Player */}
            <div className="relative bg-black">
              <video
                ref={videoRef}
                className="w-full h-96 object-cover"
                poster={videoData.thumbnail}
                preload="metadata"
                crossOrigin="anonymous"
              >
                <source src="/videos/your-tea-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div 
                  className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-200"
                    style={{ 
                      width: `${progressPercentage}%`,
                      backgroundColor: 'rgb(151, 176, 103)'
                    }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlayPause}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </button>

                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-white" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20"
                      />
                    </div>

                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button className="text-white hover:text-gray-300 transition-colors">
                    <Maximize className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                {videoData.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {videoData.description}
              </p>
              
              {/* Video Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>Duration: {formatTime(duration)}</span>
                <span>Progress: {Math.round(progressPercentage)}%</span>
                <span>Milestones Reached: {progressMilestones.size}/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Library */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'rgb(47, 82, 73)' }}>
            More Tea Education Videos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Green Tea Brewing Basics',
                duration: '8:45',
                thumbnail: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Black Tea Traditions',
                duration: '12:30',
                thumbnail: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Herbal Tea Benefits',
                duration: '6:20',
                thumbnail: 'https://images.pexels.com/photos/1638281/pexels-photo-1638281.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Tea Ceremony Etiquette',
                duration: '15:10',
                thumbnail: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Oolong Tea Mastery',
                duration: '11:25',
                thumbnail: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Tea Storage Tips',
                duration: '4:55',
                thumbnail: 'https://images.pexels.com/photos/1638281/pexels-photo-1638281.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                    {video.title}
                  </h3>
                  <button className="w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-300 hover:opacity-90"
                    style={{ backgroundColor: 'rgb(151, 176, 103)' }}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Info */}
        <div className="mt-16 p-6 rounded-lg" style={{ backgroundColor: 'rgb(227, 222, 97)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
            Video Tracking Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ color: 'rgb(67, 112, 87)' }}>
            <div>
              <h4 className="font-semibold mb-2">Events Tracked:</h4>
              <ul className="space-y-1">
                <li>• Video Play/Pause</li>
                <li>• Progress Milestones (25%, 50%, 75%, 90%)</li>
                <li>• Video Completion (95%)</li>
                <li>• Seek/Skip Events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Captured:</h4>
              <ul className="space-y-1">
                <li>• Current playback time</li>
                <li>• Video duration</li>
                <li>• Completion percentage</li>
                <li>• Engagement time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;