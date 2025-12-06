import React from 'react'
import VIDEO from "../assets/IMG_6788 (1) (1).mp4"


export default function Video() {
  return (
    <video
      src={VIDEO}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover z-[-1]"
    />
  );
}


// changes
