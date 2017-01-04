const shuffle = (arr) => {
  const shuffled = arr.slice();
  let currentPos = shuffled.length;

  while (currentPos) {
    const randomPos = Math.floor(Math.random() * currentPos--);
    const originalValue = shuffled[currentPos];

    shuffled[currentPos] = shuffled[randomPos];
    shuffled[randomPos] = originalValue;
  }

  return shuffled;
}

export { shuffle }
