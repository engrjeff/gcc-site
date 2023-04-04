import { useState } from "react";
import Image from "next/image";

interface CardImageProps {
  src: string;
  alt: string;
}

function CardImage({ src, alt }: CardImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className='relative aspect-video overflow-hidden'>
      <Image
        src={src}
        alt={alt}
        aria-hidden='true'
        fill
        className={[
          "object-cover object-center group-hover:scale-105 transition-transform duration-300 group-hover:opacity-75",
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100",
        ].join(" ")}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}

export default CardImage;
