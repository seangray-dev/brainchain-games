export default function WordSearchInstructions() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <strong>Getting Started:</strong> When the game begins, you'll see a
        grid filled with letters. A list of words to find will be provided
        alongside or below the grid.
      </li>
      <li>
        <strong>Finding Words:</strong> Look for the words in the list within
        the grid. Words can be placed horizontally, vertically, or diagonally,
        in both forward and backward directions.
      </li>
      <li>
        <strong>Selecting Letters:</strong> Click on letters in the
        grid to select a word. If the selected letters form a word from the
        list, it will be highlighted and marked as found.
      </li>
      <li>
        <strong>How to win:</strong> You win the game by finding all the words
        in the list.
      </li>
    </ul>
  );
}
