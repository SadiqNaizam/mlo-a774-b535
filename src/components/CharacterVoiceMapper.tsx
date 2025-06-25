import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Define the structure for a voice option
interface VoiceOption {
  id: string;
  name: string;
  lang: string;
}

// Define the structure for a character
interface Character {
  id: string;
  name: string;
}

// Define the props for the CharacterVoiceMapper component
interface CharacterVoiceMapperProps {
  characters: Character[];
  availableVoices: VoiceOption[];
  initialAssignments: Record<string, string>; // Maps characterId to voiceId
  onSave: (assignments: Record<string, string>) => void;
  onClose: () => void;
}

const CharacterVoiceMapper: React.FC<CharacterVoiceMapperProps> = ({
  characters = [],
  availableVoices = [],
  initialAssignments = {},
  onSave,
  onClose,
}) => {
  console.log('CharacterVoiceMapper loaded');

  // Local state to manage voice assignments before saving
  const [assignments, setAssignments] = useState<Record<string, string>>(initialAssignments);

  // Handler for when a voice is selected from a dropdown
  const handleVoiceChange = (characterId: string, voiceId: string) => {
    setAssignments((prev) => ({
      ...prev,
      [characterId]: voiceId,
    }));
  };

  // Handler for the save button
  const handleSave = () => {
    onSave(assignments);
    toast.success("Voice assignments saved!", {
        description: "Your custom voice cast has been updated.",
    });
    onClose();
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh] p-1">
      {/* This component is designed to be placed inside a DialogHeader */}
      {/* For example:
        <DialogHeader>
          <DialogTitle>Assign Character Voices</DialogTitle>
          <DialogDescription>
            Select a unique voice for each character to create a personalized audio experience.
          </DialogDescription>
        </DialogHeader>
      */}
      
      <div className="flex-grow my-4 pr-4 -mr-4">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {characters.length > 0 ? (
              characters.map((character, index) => (
                <React.Fragment key={character.id}>
                  <div className="flex items-center justify-between space-x-4">
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {character.name}
                    </span>
                    <Select
                      value={assignments[character.id] || 'default'}
                      onValueChange={(value) => handleVoiceChange(character.id, value)}
                    >
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Narrator</SelectItem>
                        <Separator className="my-1" />
                        {availableVoices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {index < characters.length - 1 && <Separator />}
                </React.Fragment>
              ))
            ) : (
                <div className="text-center text-gray-500 py-8">
                    <p>No characters available for voice assignment in this book.</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* This component is designed to be placed before a DialogFooter */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default CharacterVoiceMapper;