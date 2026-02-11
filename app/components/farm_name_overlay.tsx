import { useAtomValue } from "jotai";
import { activeFarmNameAtom } from "state/jotai";

export function FarmNameOverlay() {
  const farmName = useAtomValue(activeFarmNameAtom);

  if (!farmName) return null;

  return (
    <div
      className="absolute top-3 left-1/2 -translate-x-1/2 z-10
        px-3 py-1 rounded
        bg-white/80 dark:bg-gray-900/80
        text-sm font-medium text-gray-800 dark:text-gray-200
        shadow-sm pointer-events-none"
    >
      {farmName}
    </div>
  );
}
