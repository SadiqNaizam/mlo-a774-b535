import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Wand2,
} from 'lucide-react';

import CharacterVoiceMapper from '@/components/CharacterVoiceMapper';

// Define the structure for the book data
interface BookData {
  title: string;
  author: string;
  pages: string[];
}

// Placeholder data for the page
const bookData: BookData = {
  title: 'A Journey Through The Stars',
  author: 'AI Historian',
  pages: [
    "The ship hummed with a quiet energy, a stark contrast to the roaring silence of the void outside. Commander Eva Rostova gazed at the swirling nebula on the main viewscreen. 'Status report, Kael,' she said, her voice calm.",
    "Kael, the ship's synthetic intelligence, responded instantly. 'All systems nominal, Commander. We are approaching the anomaly as projected. Scanners show unusual energy signatures, consistent with pre-warp civilization remnants.'",
    "'Pre-warp? Out here?' Eva Rostova mused, turning to her first officer. 'What do you make of it, Jian?' Jian, ever the pragmatist, shrugged. 'Could be anything. A ghost signal, a natural phenomenon, or a trap.' His gruff voice was a familiar comfort.",
    "Eva Rostova smiled faintly. 'Always the optimist. Keep the shields at 70% and power the long-range comms array. If there's someone down there, I want to be able to say hello.' As she spoke, a new, smaller light blinked on the star chart. A ship. And it wasn't one of theirs.",
  ],
};

const characterData = [
    { id: 'char1', name: 'Eva Rostova' },
    { id: 'char2', name: 'Kael' },
    { id: 'char3', name: 'Jian' },
];

const availableVoices = [
    { id: 'voice_nova', name: 'Nova', lang: 'US Female' },
    { id: 'voice_orion', name: 'Orion', lang: 'UK Male' },
    { id: 'voice_echo', name: 'Echo', lang: 'US Male, Robotic' },
    { id: 'voice_luna', name: 'Luna', lang: 'AU Female' },
];


const ReaderView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceMapperOpen, setIsVoiceMapperOpen] = useState(false);
  const [voiceAssignments, setVoiceAssignments] = useState<Record<string, string>>({
    'char2': 'voice_echo', // Pre-assign a robotic voice to the AI
  });

  useEffect(() => {
    console.log('ReaderView loaded for book:', bookData.title);
  }, []);

  const totalPages = bookData.pages.length;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    console.log(isPlaying ? 'Pausing TTS' : 'Playing TTS with assignments:', voiceAssignments);
  };
  
  const handleSaveAssignments = (newAssignments: Record<string, string>) => {
    setVoiceAssignments(newAssignments);
    console.log("Saved voice assignments:", newAssignments);
    // In a real app, you would persist this to a backend or local storage
  };

  const bookOpenAnimation = {
    hidden: { opacity: 0, scale: 0.9, rotateY: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <TooltipProvider>
      <motion.div
        className="flex flex-col h-screen w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-serif"
        variants={bookOpenAnimation}
        initial="hidden"
        animate="visible"
      >
        <header className="p-4 text-center border-b border-stone-200 dark:border-stone-800">
          <h1 className="text-2xl font-bold">{bookData.title}</h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">by {bookData.author}</p>
        </header>

        <main className="flex-grow p-6 md:p-12 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="prose prose-lg dark:prose-invert max-w-full">
              <p>{bookData.pages[currentPage]}</p>
            </div>
          </ScrollArea>
        </main>

        <footer className="w-full p-4 flex flex-col items-center gap-4">
          <div className="text-sm text-stone-500">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex items-center justify-center gap-4 p-3 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-sm shadow-lg border border-stone-200 dark:border-stone-800">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handlePrevPage} disabled={currentPage === 0}>
                  <SkipBack className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="icon" className="h-12 w-12 rounded-full" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>

            <div className="h-6 w-px bg-stone-300 dark:bg-stone-700 mx-2"></div>

            <div className="flex items-center gap-2 w-32">
              <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume[0] === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={(value) => {
                  setVolume(value);
                  if(isMuted && value[0] > 0) setIsMuted(false);
                }}
                max={100}
                step={1}
              />
            </div>
            
            <Dialog open={isVoiceMapperOpen} onOpenChange={setIsVoiceMapperOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Wand2 className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Configure Character Voices</TooltipContent>
              </Tooltip>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Assign Character Voices</DialogTitle>
                  <DialogDescription>
                    Select a unique voice for each character to create a personalized audio experience.
                  </DialogDescription>
                </DialogHeader>
                <CharacterVoiceMapper 
                   characters={characterData}
                   availableVoices={availableVoices}
                   initialAssignments={voiceAssignments}
                   onSave={handleSaveAssignments}
                   onClose={() => setIsVoiceMapperOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </footer>
      </motion.div>
    </TooltipProvider>
  );
};

export default ReaderView;