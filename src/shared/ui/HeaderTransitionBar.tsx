'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderTransitionBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[2px] z-30 overflow-hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            key={pathname}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
