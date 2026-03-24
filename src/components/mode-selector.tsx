import type { FC } from "react";

export type Mode = "th" | "en";

const defaultStyle = `p-2 border rounded-lg cursor-pointer border-black`;
const selectedStyle = `bg-black text-white`;

export const ModeSelector: FC<{
  mode?: Mode | null;
  onChange: (mode: Mode) => void;
}> = ({ mode, onChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("th")}
        className={[defaultStyle, mode === "th" ? selectedStyle : ""].join(" ")}
      >
        Show Thai
      </button>
      <button
        onClick={() => onChange("en")}
        className={[defaultStyle, mode === "en" ? selectedStyle : ""].join(" ")}
      >
        Show English
      </button>
    </div>
  );
};
