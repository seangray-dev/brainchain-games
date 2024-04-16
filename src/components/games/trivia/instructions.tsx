export default function TriviaInstructions() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <strong>Choosing a Category:</strong> Begin by selecting one of the
        available categories. This will set the theme for the questions to
        follow.
      </li>
      <li>
        <strong>Answering Questions:</strong> You will be presented with one
        question at a time. Choose the answer you believe is correct from the
        options provided.
      </li>
      <li>
        <strong>Progressing Through Questions:</strong> You must answer each
        question correctly to move on to the next one. Take your time—there's no
        rush!
      </li>
      <li>
        <strong>Getting Stuck:</strong> If you're unsure about an answer, give
        it your best guess! You can always try again if you get it wrong.
      </li>
      <li>
        <strong>Game Completion:</strong> The game is completed once you've
        correctly answered all 5 questions. Aim for a perfect score to prove
        your trivia prowess!
      </li>
    </ul>
  );
}
