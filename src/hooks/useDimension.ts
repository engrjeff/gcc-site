import { useState, useEffect, useRef } from "react";

export type Dimension = {
  width: number;
  height: number;
};

export default function useDimension<T extends HTMLElement>() {
  const [dimension, setDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const resizeCallback = () => {
      const element = ref.current;
      if (!element) return;
      const { width, height } = element.getBoundingClientRect();
      setDimension({ width, height });
    };
    resizeCallback();
    window.addEventListener("resize", resizeCallback);
    return () => window.removeEventListener("resize", resizeCallback);
  }, []);
  return [ref, dimension] as const;
}
