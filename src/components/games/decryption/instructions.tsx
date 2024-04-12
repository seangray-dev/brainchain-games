export default function DecryptionInstructions() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <strong>Getting Started:</strong> The objective is to decipher a given
        encrypted message. You'll be presented with a series of characters that
        appear jumbled or coded and your task is to decode this to reveal a
        coherent message.
      </li>
      <li>
        <strong>Encrypted Message:</strong> When you start, you will see the
        encrypted message displayed on the screen. This message has been altered
        from its original form through a simple encryption method, where each
        letter has been shifted in the alphabet.
      </li>
      <li>
        <strong>Input Your Decryption:</strong> Once you think you have decoded
        the message, enter your answer into the provided text area and click on
        the 'Decrypt' button. Be sure to spell everything correctly and maintain
        the original formatting, including spaces and punctuation marks.
      </li>
      <li>
        <strong>Verification:</strong> If your answer is correct, you'll receive
        confirmation that you've successfully deciphered the message.
      </li>
      <li>
        <strong>Try Again:</strong> In case of an incorrect attempt, you're
        encouraged to try again.
      </li>
    </ul>
  );
}
