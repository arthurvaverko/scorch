import { Heart, Shield, Sword, Wand, MessageSquarePlus } from 'lucide-react';

// Define styles
const styles = `
  :root {
    --game-primary: #E87C65;
    --game-secondary: #7CC9D6;
    --game-tertiary: #8B5E3C;
    --game-bg: #2A4858;
    --game-ui-base: #9B8B7A;
    --game-ui-darker: #786D5F;
  }
`;

// Story Text Component
const StoryText = ({ lines }) => (
  <div className="mb-2 space-y-0.5 rounded-lg p-4" style={{ backgroundColor: 'var(--game-ui-darker)' }}>
    {lines.map((line, index) => (
      <p key={index} className="text-base leading-snug text-white font-medium">
        {line}
      </p>
    ))}
  </div>
);

// Scene Image Component
const SceneImage = () => (
  <div className="flex-1 mb-3 mx-3 relative h-[50vh]">
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
      <img
        src="/api/placeholder/600/600"
        alt="Current scene"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--game-ui-base)]" />
    </div>
  </div>
);

// Stats Bar Component
const StatBar = ({ icon: Icon, current, max, color }) => (
  <div className="w-full mb-2">
    <div className="flex items-center gap-1 mb-1">
      <Icon size={16} style={{ color }} />
      <span className="text-xs text-white">
        {current}/{max}
      </span>
    </div>
    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
      <div
        className="h-full transition-all duration-300"
        style={{ 
          width: `${(current / max) * 100}%`,
          backgroundColor: color 
        }}
      />
    </div>
  </div>
);

// Character Stats Component
const CharacterStats = ({ character }) => (
  <div className="p-4 flex flex-col items-center relative rounded-lg" 
       style={{ backgroundColor: 'var(--game-ui-darker)' }}>
    {/* Profile picture centered and breaking out of bounds */}
    <div className="absolute -top-6 w-28 h-28">
      <div className="w-full h-full rounded-full overflow-hidden border-4" 
           style={{ borderColor: 'var(--game-ui-darker)' }}>
        <img
          src="/api/placeholder/112/112"
          alt="Character portrait"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    
    {/* Character name */}
    <div className="w-full mt-20 mb-2 text-center">
      <h2 className="text-white text-lg font-medium">John Constantine</h2>
    </div>

    {/* Stats content */}
    <div className="w-full">
      <StatBar
        icon={Heart}
        current={character.hp}
        max={character.maxHp}
        color="var(--game-primary)"
      />
      <StatBar
        icon={Wand}
        current={character.mana}
        max={character.maxMana}
        color="var(--game-secondary)"
      />
    </div>
  </div>
);

// Action Button Component
const ActionButton = ({ icon: Icon, label }) => (
  <button 
    className="rounded-lg p-2.5 flex items-center justify-center gap-2 text-sm transition-colors hover:brightness-110"
    style={{ 
      backgroundColor: 'var(--game-ui-darker)',
      color: 'white',
    }}
  >
    <Icon size={16} />
    {label}
  </button>
);

// Action Buttons Component
const ActionButtons = () => (
  <div className="grid grid-rows-5 gap-2">
    <ActionButton icon={Sword} label="Attack" />
    <ActionButton icon={Shield} label="Defend" />
    <ActionButton icon={Wand} label="Magic" />
    <ActionButton icon={Heart} label="Heal" />
    <ActionButton icon={MessageSquarePlus} label="Custom" />
  </div>
);

// Main Game Layout
export default function AdventureGameLayout() {
  const storyText = [
    "You find yourself in a dimly lit ancient temple.",
    "Intricate carvings cover the weathered stone walls.",
    "A mysterious altar glows faintly in the distance.",
    "The air is thick with the scent of age-old incense."
  ];

  const character = {
    hp: 100,
    maxHp: 100,
    mana: 75,
    maxMana: 100
  };

  return (
    <>
      <style>{styles}</style>
      <div 
        className="min-h-screen flex flex-col p-3 max-w-md mx-auto"
        style={{ backgroundColor: 'var(--game-ui-base)' }}
      >
        <StoryText lines={storyText} />
        <SceneImage />
        <div className="grid grid-cols-2 gap-3 mt-6">
          <CharacterStats character={character} />
          <ActionButtons />
        </div>
      </div>
    </>
  );
}