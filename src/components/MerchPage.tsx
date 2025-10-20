import { motion, Variants } from "framer-motion";

const comingSoonText = "Coming Soon";

const sentenceVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.08,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const lineVariants: Variants = {
  hidden: { width: "0%" },
  visible: {
    width: "5rem",
    transition: {
      delay: 1.5,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export const MerchPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-heading text-white ttFont"
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
          >
            {comingSoonText.split("").map((char, index) => {
              return (
                <motion.span key={char + "-" + index} variants={letterVariants}>
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.div
            className="h-1 bg-[#70E081] mx-auto mt-4 mb-6"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
