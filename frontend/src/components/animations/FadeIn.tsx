import React from 'react';
import { motion } from 'framer-motion';

const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;