interface ShareTextButtonProps {
  text: string;
}

export default function ShareTextButtonProps({ text }: ShareTextButtonProps) {
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
        alert("Text copied to clipboard!");
      } catch (error) {
        console.error("Error copying:", error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-sky-900 text-sky-50 rounded-lg hover:cursor-pointer"
    >
      Share!
    </button>
  );
};
