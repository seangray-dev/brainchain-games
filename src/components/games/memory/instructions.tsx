export default function MemoryInstructions() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <strong>Getting Started:</strong> When the game begins, you'll see a
        collection of cards face down. Each card has a matching pair with the
        same symbol.
      </li>
      <li>
        <strong>Flipping Cards:</strong> Click on a card to flip it over. Then,
        select another card to try and find its match. If the symbols on both
        cards match, they'll remain face-up.
      </li>
      <li>
        <strong>Achieving Victory:</strong> You win by successfully matching all
        pairs of cards.
      </li>
      <li>
        <strong>Unsuccessful Matches:</strong> If two flipped cards don't match,
        they will flip back over after a brief pause, allowing you to try again.
      </li>
      <li>
        <strong>Memory Strategy:</strong> Remember the position and symbols of
        cards that have been flipped to improve your chances of matching pairs
        correctly.
      </li>
    </ul>
  );
}
