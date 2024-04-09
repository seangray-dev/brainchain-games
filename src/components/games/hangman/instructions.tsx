export default function HangmanInstructions() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <strong>Start the Game:</strong> When you begin, you'll see a series of
        blank spaces on the screen, each representing a letter in the word or
        phrase you need to guess.
      </li>
      <li>
        <strong>Guess Letters:</strong> Below the blanks, you’ll find an
        alphabet grid. Click on a letter to make a guess. If the letter is in
        the word or phrase, it will appear in the correct position(s) among the
        blanks. If it’s not, part of the hangman drawing will appear.
      </li>
      <li>
        <ul>
          <li>
            <strong>Win:</strong> You win the game by guessing all the letters
            correctly before the hangman drawing is complete. Successfully guess
            the word or phrase, and you’ll be congratulated!
          </li>
          <li>
            <strong>Lose:</strong> If you make 6 incorrect guesses the hangman
            drawing will be complete and it's game over. You’ll have the option
            to retry the same game or go back to select a different one.
          </li>
        </ul>
      </li>
      <li>
        <strong>No Repeats:</strong> Once you’ve selected a letter, it will be
        disabled, preventing you from selecting it again. This helps you keep
        track of which letters you’ve already tried.
      </li>
    </ul>
  );
}
