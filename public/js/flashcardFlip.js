document.querySelectorAll('.flashcard').forEach(flashcard => {
    flashcard.addEventListener('click', () => {
        const question = flashcard.querySelector('.question');
        const answer = flashcard.querySelector('.answer');

        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            question.style.display = 'none';
        } else {
            answer.style.display = 'none';
            question.style.display = 'block';
        }
    });
});