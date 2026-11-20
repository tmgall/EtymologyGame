import { useEffect, useRef, useState } from "react";
import { IoShareOutline } from "react-icons/io5";

interface ShareTextButtonProps {
  text: string;
}

export default function ShareTextButtonProps({ text }: ShareTextButtonProps) {
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copiedTimeout.current), []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(copiedTimeout.current);
        copiedTimeout.current = window.setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="shareButton"
      aria-live="polite"
    >
      {copied ? "Copied!" : <><IoShareOutline className="shareIcon" aria-hidden="true" /> Share</>}
    </button>
  );
};
