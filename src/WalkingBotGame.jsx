import React, { useState, useEffect } from 'react';

const WalkingBotGame = () => {
  const [gameState, setGameState] = useState('walking');
  const [position, setPosition] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle walking animation
  useEffect(() => {
    let walkingInterval;
    
    if (gameState === 'walking') {
      walkingInterval = setInterval(() => {
        if (position < 60) {
          setPosition(prev => prev + 1);
        } else {
          setGameState('standing');
          clearInterval(walkingInterval);
        }
      }, 50);
    }
    
    return () => clearInterval(walkingInterval);
  }, [gameState, position]);

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setGameState('selected');
  };

  // Reset game
  const resetGame = () => {
    setPosition(0);
    setGameState('walking');
    setSelectedOption(null);
  };

return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative w-full max-w-lg h-64 bg-blue-200 rounded-lg overflow-hidden mb-4">
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-16 bg-green-600"></div>
            
            {/* Bot character */}
            <div 
                className="absolute bottom-16 left-0 transition-all duration-300" 
                style={{ transform: `translateX(${position}px)` }}
            >
                {gameState === 'walking' ? (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-24 bg-gray-700 rounded-t-full relative">
                            {/* Bot face */}
                            <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div className="absolute bottom-6 left-1/2 w-6 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
                        </div>
                        <div className="flex">
                            <div className="w-4 h-8 bg-gray-700 animate-bounce"></div>
                            <div className="w-4 h-8 bg-gray-700 ml-2 animate-bounce delay-75"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-24 bg-gray-700 rounded-t-full relative">
                            {/* Bot face */}
                            <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div className="absolute bottom-6 left-1/2 w-6 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
                        </div>
                        <div className="flex">
                            <div className="w-4 h-8 bg-gray-700"></div>
                            <div className="w-4 h-8 bg-gray-700 ml-2"></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Options when standing */}
            {gameState === 'standing' && (
                <div className="absolute top-4 right-4 flex flex-col gap-4">
                    <button 
                        onClick={() => handleOptionClick('learn')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 w-32"
                    >
                        Learn
                    </button>
                    <button 
                        onClick={() => handleOptionClick('challenge')}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 w-32"
                    >
                        Challenge
                    </button>
                </div>
            )}
            
            {/* Content after selecting an option */}
            {gameState === 'selected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-xs">
                        {selectedOption === 'learn' ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-blue-600">Learning Mode</h2>
                                <p className="mb-4">Here you can learn about the bot's capabilities and how to interact with it.</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-red-600">Challenge Mode</h2>
                                <p className="mb-4">Test your skills against the bot in various challenges!</p>
                            </div>
                        )}
                        <button 
                            onClick={resetGame}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        {/* Game status */}
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-2">Walking Bot Game</h1>
            <p className="text-gray-700">
                {gameState === 'walking' ? 'Bot is walking...' : 
                 gameState === 'standing' ? 'Choose an option!' : 
                 `${selectedOption === 'learn' ? 'Learning' : 'Challenge'} mode selected!`}
            </p>
        </div>
        
        {gameState !== 'walking' && gameState !== 'selected' && (
            <button 
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
                Reset Game
            </button>
        )}
    </div>
);
};

export default WalkingBotGame;