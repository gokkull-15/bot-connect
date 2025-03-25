import React, { useState, useEffect } from "react";
import { languageBasics } from "../data/languageBasics";
import { challengeQuestions } from "../data/challengeQuestions";

const WalkingBotGame = () => {
  const [gameState, setGameState] = useState("start");
  const [position, setPosition] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Walking animation logic
  useEffect(() => {
    let walkingInterval;

    if (gameState === "walking") {
      walkingInterval = setInterval(() => {
        if (position < 60) {
          setPosition((prev) => prev + 1);
        } else {
          setGameState("standing");
          clearInterval(walkingInterval);
        }
      }, 50);
    }

    return () => clearInterval(walkingInterval);
  }, [gameState, position]);

  // Start game
  const startGame = () => {
    setGameState("walking");
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setGameState("selected");

    if (option === "learn") {
      setGameState("language-selection");
    } else if (option === "challenge") {
      setGameState("challenge-start");
      setCurrentQuestion(challengeQuestions[0]);
      setScore(0);
    }
  };

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setGameState("language-details");
  };

  // Handle challenge answer
  const handleChallengeAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    const currentQuestionIndex = challengeQuestions.indexOf(currentQuestion);
    if (currentQuestionIndex < challengeQuestions.length - 1) {
      setCurrentQuestion(challengeQuestions[currentQuestionIndex + 1]);
    } else {
      // End of challenge
      setGameState("challenge-end");
      setHighScore(Math.max(highScore, score));
    }
  };

  // Reset game
  const resetGame = () => {
    setPosition(0);
    setGameState("start");
    setSelectedOption(null);
    setSelectedLanguage(null);
    setCurrentQuestion(null);
    setScore(0);
  };

  // Render bot character
  const renderBotCharacter = () => (
    <div
      className="absolute bottom-16 left-0 transition-all duration-300"
      style={{ transform: `translateX(${position}px)` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-20 h-24 bg-gray-700 rounded-t-full relative">
          <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-6 left-1/2 w-6 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
        </div>
        <div className="flex">
          <div
            className={`w-4 h-8 bg-gray-700 ${
              gameState === "walking" ? "animate-bounce" : ""
            }`}
          ></div>
          <div
            className={`w-4 h-8 bg-gray-700 ml-2 ${
              gameState === "walking" ? "animate-bounce delay-75" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full max-w-lg h-64 bg-blue-200 rounded-lg overflow-hidden mb-4">
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-16 bg-green-600"></div>

        {/* Bot Character */}
        {renderBotCharacter()}

        {/* Start Button */}
        {gameState === "start" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white text-2xl px-6 py-3 rounded-lg"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Options when standing */}
        {gameState === "standing" && (
          <div className="absolute top-4 right-4 flex flex-col gap-4">
            <button
              onClick={() => handleOptionClick("learn")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 w-32"
            >
              Learn
            </button>
            <button
              onClick={() => handleOptionClick("challenge")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 w-32"
            >
              Challenge
            </button>
          </div>
        )}

        {/* Language Selection */}
        {gameState === "language-selection" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Select a Language
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(languageBasics).map((language) => (
                  <button
                    key={language}
                    onClick={() => handleLanguageSelect(language)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={resetGame}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Language Details */}
        {gameState === "language-details" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-xs">
              <h2 className="text-xl font-bold mb-2 text-blue-600">
                {selectedLanguage.charAt(0).toUpperCase() +
                  selectedLanguage.slice(1)}{" "}
                Basics
              </h2>
              <p className="mb-4">{languageBasics[selectedLanguage]}</p>
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Back to Start
              </button>
            </div>
          </div>
        )}

        {/* Challenge Start */}
        {gameState === "challenge-start" && currentQuestion && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Challenge Question
              </h2>
              <p className="mb-4 text-lg">{currentQuestion.question}</p>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleChallengeAnswer(option)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Challenge End */}
        {gameState === "challenge-end" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-xs">
              <h2 className="text-xl font-bold mb-2 text-red-600">
                Challenge Complete!
              </h2>
              <p className="mb-4">Your Score: {score}/10</p>
              <p className="mb-4">High Score: {highScore}/10</p>
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
          {gameState === "start"
            ? "Ready to start your adventure?"
            : gameState === "walking"
            ? "Bot is walking..."
            : gameState === "standing"
            ? "Choose an option!"
            : gameState === "language-selection"
            ? "Select a language to learn"
            : gameState === "challenge-start"
            ? `Current Score: ${score}/10`
            : `${
                selectedOption === "learn" ? "Learning" : "Challenge"
              } mode selected!`}
        </p>
      </div>
    </div>
  );
};

export default WalkingBotGame;
