import { useEffect, useRef, useState } from "react";
import data from "./data.json";
import { ModeSelector, type Mode } from "./components/mode-selector";

type DataItem = {
  original: string;
  transcription: string;
  translation: string;
};

function App() {
  const dataRef = useRef<Array<DataItem>>(data);

  const [mode, setMode] = useState<Mode | null>(null);
  const [currentItem, setCurrentItem] = useState<DataItem | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * dataRef.current.length);
    setCurrentItem(dataRef.current[randomIndex]);
    setRevealed(false);
  };

  useEffect(() => {
    selectRandomItem();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-8">
        <ModeSelector mode={mode} onChange={setMode} />

        {mode && (
          <>
            <div className="w-75 h-50 border relative border-gray-400 rounded-2xl p-6 shadow-2xl text-4xl flex items-center justify-center text-center">
              {mode === "en" && currentItem?.translation}
              {mode === "th" && currentItem?.original}
              {/*<pre>{JSON.stringify(currentItem, null, 2)}</pre>*/}
              {revealed && (
                <div className="absolute w-75 text-center bottom-0 left-[50%] translate-x-[-50%] text-xl p-2 text-gray-600">
                  {currentItem?.transcription};{" "}
                  {mode === "th"
                    ? currentItem?.translation
                    : currentItem?.original}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setRevealed((value) => !value)}
                className="p-2 border rounded-lg cursor-pointer"
              >
                {revealed ? "Hide" : "Reveal"}
              </button>
              <button
                onClick={selectRandomItem}
                className="p-2 border rounded-lg cursor-pointer"
              >
                Random card
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
