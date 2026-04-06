import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore } from '../../store/useTransactionStore';

const RoleGuard = ({ children, fallback = null, requireAdmin = true }) => {
  const currentRole = useTransactionStore((state) => state.currentRole);

  const isAuthorized = requireAdmin ? currentRole === 'Admin' : true;

  return (
    <AnimatePresence mode="popLayout">
      {isAuthorized ? (
        <motion.div
          key="authorized-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="fallback-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {fallback}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleGuard;
