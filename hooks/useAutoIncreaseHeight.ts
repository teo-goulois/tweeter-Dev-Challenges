import { useRef, useEffect } from "react";

const useAutoIncreaseHeight = (watch: string) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = ref.current;

    if (!textarea) return;

    if (textarea.value === "")
      return textarea.style.setProperty("height", "3rem");

    textarea.style.setProperty("height", "auto");
    textarea.style.setProperty("height", `${textarea.scrollHeight}px`);
  }, [watch]);

  return ref;
};

export default useAutoIncreaseHeight;
