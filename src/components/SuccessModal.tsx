import { useEffect } from "react";

export default function SuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-xs w-full h-auto border">
        You win
      </div>
    </div>
  );
}
