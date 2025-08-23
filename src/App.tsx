import { motion } from "framer-motion";
import "./App.css"; // CSS propio

function App() {
  return (
    <div className="container">
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
        <button className="start-button">
          ¡Comenzar!
        </button>
      </motion.div>
    </div>
  );
}

export default App;
