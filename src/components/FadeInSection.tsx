import React from "react";

export default function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
       const entry = entries[0];
    // Check if the observed element is intersecting with the viewport
        if (entry && entry.isIntersecting) {
          // If so, update the visibility state for this component instance
          setVisible(true);
        }
      });
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${props.delay}` }}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}