import React, { useState, useEffect } from "react";

function Video({ ...props }) {
  const [ref, setRef] = useState();

  useEffect(() => {
    let observer,
      isPaused = false;

    if (IntersectionObserver && ref) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio !== 1 && !ref.paused) {
              ref.pause();
              isPaused = true;
            } else if (isPaused) {
              ref.play();
              isPaused = false;
            }
          });
        },
        { threshold: 1 }
      );
      observer.observe(ref);
    } else {
      //fallback
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return <video ref={setRef} {...props}></video>;
}

export default Video;
