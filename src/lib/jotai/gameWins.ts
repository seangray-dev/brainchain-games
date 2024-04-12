import { atom } from "jotai";

function readGameWins() {
  const item = localStorage.getItem("gameWins");
  return item ? new Map(JSON.parse(item)) : new Map();
}

export const gameWinsAtom = atom(readGameWins(), (get, set, update) => {
  const newWins =
    typeof update === "function" ? update(get(gameWinsAtom)) : update;
  set(gameWinsAtom, newWins);
  localStorage.setItem(
    "gameWins",
    JSON.stringify(Array.from(newWins.entries())),
  );
});
