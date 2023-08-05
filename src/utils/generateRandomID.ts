function generateRandomID() {
  const randomNumber = Math.floor(Math.random() * 100000); // Gera um número aleatório entre 0 e 99999
  const paddedNumber = randomNumber.toString().padStart(5, "0"); // Adiciona zeros à esquerda, se necessário

  return paddedNumber;
}

export { generateRandomID };