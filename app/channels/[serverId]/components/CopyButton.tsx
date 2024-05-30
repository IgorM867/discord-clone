import { useEffect, useState } from "react";

function CopyButton({ copyText }: { copyText: string }) {
  const [isAnimatioStarted, setIsAnimatioStarted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAnimatioStarted(false);
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [isAnimatioStarted]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(copyText);
    setIsAnimatioStarted(true);
  };

  return (
    <button
      className={`p-1 text-sm w-20 px-5 rounded-sm ${
        isAnimatioStarted ? "bg-d-green" : "bg-d-purple"
      }`}
      onClick={handleCopyLink}
    >
      {isAnimatioStarted ? "Copied" : "Copy"}
    </button>
  );
}

export { CopyButton };
