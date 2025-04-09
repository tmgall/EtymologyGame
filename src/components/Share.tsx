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
    <div
      onClick={handleShare}
      className="shareButton"
    >
      Share!
    </div>
  );
};
