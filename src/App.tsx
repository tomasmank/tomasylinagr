import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const questions = [
  "Vástago o tallo que vuelve a brotar en la planta.",
  "Proceso mediante el cual un ovario libera un óvulo maduro, preparándose para una posible fecundación.",
  "Estado, cualidad o condición de ser madre.",
  "Dar de mamar.",
  "Acto de nacer.",
  "Profesional especializado en la atención de mujeres durante el embarazo y el parto.",
  "Estado natural y periódico de reposo físico y mental.",
  "Raíz cuadrada de 256.",
  "Resultado de elevar cualquier número a la potencia 0.",
];


const finalName = "Febe";
// Array con las respuestas correctas (¡cámbialas según tu evento!)
const correctAnswers = [
  "Retoño",
  "Ovulacion",
  "Maternidad",
  "Amamantar",
  "Nacimiento",
  "Obstetra",
  "Sueño",
  "16",
  "1",
];

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showResult, setShowResult] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  
  const [responseInitials, setResponseInitials] = useState('');
  const [inputColor, setInputColor] = useState('pink');
  const [finalGuess, setFinalGuess] = useState('');
  const [finalGuessResult, setFinalGuessResult] = useState<string | null>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    // Para todas las preguntas excepto la última (índice 8)
    if (currentQuestionIndex < 8) {
      const initials = userResponses.map((response:string) => response.charAt(0).toUpperCase()).join('');
      setResponseInitials(initials);
    }
  }, [userResponses, currentQuestionIndex]);
const handleRevealClick = () => {
    setShowVideo(true);
};
  useEffect(() => {
    setInputColor(prevColor => (prevColor === 'pink' ? 'blue' : 'pink'));
  }, [currentQuestionIndex]);

  const handleStart = () => {
    setIsReady(true);
  };
  const handleFinalGuessSubmit = (e : any) => {
    e.preventDefault();
    if (finalGuess.trim().toLowerCase() === finalName.toLowerCase()) {
      // Al adivinar correctamente, activamos la pantalla de éxito
      setTimeout(() => setShowSuccessScreen(true), 500); // 1.5 segundos de delay para ver el mensaje
    } else {
      setFinalGuessResult('incorrect');
    }
  };

  const handleYes = () => {
    setShowResult('yes');
  };

  const handleNo = () => {
    setShowResult('no');
  };
const normalizeString = (str: string) => {
  if (!str) return '';
  // This regular expression targets and removes only the most common Spanish diacritical marks
  return str.replace(/[áÁéÉíÍóÓúÚüÜ]/g, (char) => {
    switch (char) {
      case 'á': return 'a';
      case 'Á': return 'A';
      case 'é': return 'e';
      case 'É': return 'E';
      case 'í': return 'i';
      case 'Í': return 'I';
      case 'ó': return 'o';
      case 'Ó': return 'O';
      case 'ú': return 'u';
      case 'Ú': return 'U';
      case 'ü': return 'u';
      case 'Ü': return 'U';
      default: return char;
    }
  }).trim();
};
  const handleAnswerSubmit = (e : any) => {
    e.preventDefault();
    if (userAnswer.trim() === '') return;

    const currentCorrectAnswer = correctAnswers[currentQuestionIndex].toLowerCase();
    const isCorrect = normalizeString(userAnswer.toLowerCase()) === normalizeString(currentCorrectAnswer.toLowerCase());

    if (isCorrect) {
      const newResponses = [...userResponses, userAnswer];
      setUserResponses(newResponses);
      setUserAnswer('');
      setIsAnswerCorrect(true);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  };
  const isFinalAnswer = currentQuestionIndex >= questions.length -1;
  const isFinalAnswer2 = currentQuestionIndex === questions.length;

  return (
    <div className="container">
      {showSuccessScreen ? (
        <motion.div
          key="success-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="success-screen"
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            className="success-title"
          >
            ¡Lo has conseguido!
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="final-reveal"
          >
            El nombre es: <span className="final-name">{finalName}</span>
          </motion.p>
          {!showVideo ? <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="reveal-button"
                    onClick={handleRevealClick}
                >
                    Descubre la razón por la que se llama Febe
                </motion.button> : <motion.iframe
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="video-player"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/_M_q7bRgc18?si=t6roHVYykKbqtAj8?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0"
            title="Gender Reveal Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></motion.iframe>}
          
        </motion.div>):
      !isReady ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring", stiffness: 120 }}
            className="title"
          >
            Bienvenidos al Gender Reveal de...
          </motion.h1>

          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="subtitle"
          >
            🎉 ¡Vamos a descubrir juntos si es niño o niña! 🎉
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="button-container"
          >
            <button className="start-button" onClick={handleStart}>
              ¡Comenzar!
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="ready-section"
        >
          {showResult === null && (
            <>
              <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="question-title"
              >
                ¿Estás listo para descubrirlo?
              </motion.h2>
              <div className="button-group">
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="answer-button"
                  onClick={handleYes}
                >
                  Si!
                </motion.button>
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="answer-button"
                  onClick={handleNo}
                >
                  No!
                </motion.button>
              </div>
            </>
          )}

          {showResult === 'yes' && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="quiz-section"
            >
              <AnimatePresence mode="wait">
                {isFinalAnswer ? (
                  <motion.h2
                    key="final-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="reveal-text"
                  >
                    {responseInitials + userResponses[7] + ':' + (userResponses[8] != undefined ? userResponses[8] : "")}
                  </motion.h2>
                ) : responseInitials.length > 0 ? (
                  <motion.h2
                    key="initials-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="reveal-text"
                  >
                    {responseInitials}
                  </motion.h2>
                ) : (
                  <motion.h2
                    key="initial-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="reveal-text"
                  >
                    ¡Genial, vamos a revelar el secreto!
                  </motion.h2>
                )}
              </AnimatePresence>

              <div className="questions-container">
                               
                <AnimatePresence mode="wait">
                  {currentQuestionIndex < questions.length && (
                    <motion.form
                      key={`form-${currentQuestionIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      onSubmit={handleAnswerSubmit}
                      className="quiz-form"
                    >
                      <p className="question-text">
                        {questions[currentQuestionIndex]}
                      </p>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`quiz-input ${inputColor}`}
                          value={userAnswer}
                          onChange={(e) => {
                            setUserAnswer(normalizeString(e.target.value));
                            setIsAnswerCorrect(null);
                          }}
                          placeholder="Escribe tu respuesta aquí..."
                          autoFocus
                        />
                        <button type="submit" className={`quiz-button ${inputColor}`}>
                          Responder
                        </button>
                      </div>
                      <AnimatePresence>
                        {isAnswerCorrect === false && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="error-message"
                          >
                            Respuesta incorrecta. ¡Inténtalo de nuevo!
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                {isFinalAnswer2 && (
                  <motion.div
                    key="final-guess-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="final-guess-section"
                  >
                    <p className="question-text final-guess-prompt">
                      ¡Hemos terminado! Podes buscar el pasaje biblico y descubrir el nombre! ✨
                    </p>
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      onSubmit={handleFinalGuessSubmit}
                      className="quiz-form"
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          className={`quiz-input ${inputColor}`}
                          value={finalGuess}
                          onChange={(e) => setFinalGuess(e.target.value)}
                          placeholder="Escribe tu adivinanza aquí..."
                          autoFocus
                        />
                        <button type="submit" className="quiz-button">
                          Adivinar
                        </button>
                      </div>
                      <AnimatePresence>
                        {finalGuessResult === 'incorrect' && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="result-message-incorrect"
                          >
                            ¡Incorrecto! ¡Sigue intentando! 😔
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {showResult === 'no' && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="result-message"
            >
              <h2 className="reveal-text">Es una lástima, ¡te esperamos para la próxima! 😔</h2>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;