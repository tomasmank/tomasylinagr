// App.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showResult, setShowResult] = useState<string | null>(null);

  const handleStart = () => {
    setIsReady(true);
  };

  const handleYes = () => {
    setShowResult('yes');
  };

  const handleNo = () => {
    setShowResult('no');
  };

  return (
    <div className="container">
      {!isReady ? (
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
                  className="answer-button yes-button"
                  onClick={handleYes}
                >
              Si!
                </motion.button>
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="answer-button no-button"
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
              className="result-message"
            >
              <h2 className="reveal-text">¡Genial, vamos a revelar el secreto! 👶💖</h2>
              <div className="scroll-content">
                {/* Aquí puedes añadir más contenido para que se haga el scroll */}
                <p>... Preparando la sorpresa ...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
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