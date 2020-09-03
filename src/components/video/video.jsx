import React, { useState, useEffect } from "react";

function Video({
  auto = true,
  intersectionConfig = { threshold: 1 },
  ...props
}) {
  const [ref, setRef] = useState();
  useEffect(() => {
    let observer,
      isPaused = false;

    if (IntersectionObserver && ref && auto) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio !== 1 && !ref.paused) {
            ref.pause();
            isPaused = true;
          } else if (isPaused) {
            ref.play();
            isPaused = false;
          }
        });
      }, intersectionConfig);
      observer.observe(ref);
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(ref);
      }
    };
  }, [ref, auto, intersectionConfig]);

  return (
    <video ref={setRef} {...props}>
      {props.children}
    </video>
  );
}

export default Video;
