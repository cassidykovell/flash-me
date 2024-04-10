let currentIndex = 0;
let flashcards = [];

function updateFlashcard() {
  document.querySelector('.question').innerText = flashcards[currentIndex].question;
  document.querySelector('.answer').innerText = flashcards[currentIndex].answer;
}

function toggleAnswer() {
  const answerElement = document.querySelector('.answer');
  const questionElement = document.querySelector('.question');
  
  if (answerElement.style.display === 'none') {
    answerElement.style.display = 'block';
    questionElement.style.display = 'none';
  } else {
    answerElement.style.display = 'none';
    questionElement.style.display = 'block';
  }
}

function nextFlashcard() {
  currentIndex = (currentIndex + 1) % flashcards.length;
  updateFlashcard();
  document.querySelector('.question').style.display = 'block';
  document.querySelector('.answer').style.display = 'none';
}

function toggleAllFlashcards() {
    const flashcardListElement = document.querySelector('.flashcards-list');
    const flashcardElement = document.querySelector('.flashcard');
    
    if (flashcardListElement.style.display === 'none') {
      flashcardListElement.style.display = 'block';
      flashcardElement.style.display = 'none';
    } else {
      flashcardListElement.style.display = 'none';
      flashcardElement.style.display = 'block';
    }
  }

updateFlashcard();