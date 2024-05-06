/* eslint-disable react/prop-types */
// Use this component to show operation resuls.
import { useState, useEffect } from "react";

export default function ToastMessage({ msg, flag, duration = 3000 }) {
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");
  const textColorClass = flag === "error" ? "text-red-500" : "text-green-dark";

  useEffect(() => {
    setVisible(true);
    setAnimationClass("fade-in");

    const timer = setTimeout(() => {
      setAnimationClass("fade-out");

      // Wait for the animation to finish before removing the element
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, flag, duration]);

  if (!visible) return null;

  return (
    <div
      id="toast-simple"
      className={`z-30 fixed bottom-10 left-10 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse ${textColorClass} bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 ${animationClass}`}
      role="alert"
    >
      <p>{msg}</p>
    </div>
  );
}
