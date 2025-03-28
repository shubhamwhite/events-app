import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Intro = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
                className="absolute bottom-50 left-20 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 50, 0],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Welcome to Our World
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Crafting Digital Excellence
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of creativity and technology in every project we deliver.
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          variants={itemVariants}
          className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 max-w-3xl mx-auto"
        >
          {/* Video Container */}
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              poster="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2940"
            >
              <source
                src="https://player.vimeo.com/external/449759244.sd.mp4?s=d5f3da46ddc17aa69a7de84f1e420610ebd2a391&profile_id=164&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-end gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">
              Creative Digital Solutions
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              We specialize in crafting exceptional digital experiences that combine innovative design 
              with cutting-edge technology. Our team of experts brings your vision to life through 
              creative solutions that engage, inspire, and deliver results.
            </p>
          </div>
        </motion.div>

        {/* Description Below Card */}
        <motion.div
          variants={itemVariants}
          className="mt-10 text-center text-gray-400"
        >
          <p className="max-w-2xl mx-auto text-sm">
            From concept to execution, we're dedicated to delivering outstanding results 
            that exceed expectations. Let's work together to bring your ideas to life.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;