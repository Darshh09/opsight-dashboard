"use client";
import { motion } from "framer-motion";
import { IconBrain } from "@tabler/icons-react";

export const AceternityLogo = () => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
      >
        <IconBrain className="h-4 w-4 text-white" />
      </motion.div>
      <span className="font-bold text-sm">OpsSight</span>
    </motion.div>
  );
};
