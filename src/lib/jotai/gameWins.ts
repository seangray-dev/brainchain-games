import { atom } from "jotai";
import Cookies from "js-cookie";

function readGameWins() {
  const item = Cookies.get("gameWins");
  return item ? new Map(JSON.parse(item)) : new Map();
}

export const gameWinsAtom = atom(readGameWins(), (get, set, update) => {
  const newWins =
    typeof update === "function" ? update(get(gameWinsAtom)) : update;
  set(gameWinsAtom, newWins);
  Cookies.set("gameWins", JSON.stringify(Array.from(newWins.entries())), {
    expires: 7,
  });
});
