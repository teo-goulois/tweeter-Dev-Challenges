import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
type Props = {
  onClick: () => void;
};

const Backdrop = ({ children, onClick }: PropsWithChildren<Props>) => {
  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 z-20 left-0 h-screen w-screen bg-transparent flex items-center justify-center overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
