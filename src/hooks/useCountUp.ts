import { useState, useEffect } from 'react';

export function useCountUp(target: number, duration = 2000, active = false): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}
