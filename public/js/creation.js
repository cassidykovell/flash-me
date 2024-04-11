document.addEventListener('DOMContentLoaded', function() {
    let flashcardData = [];
    const collectionTitleInput = document.getElementById('flashcard-title');
    const addFlashcardButton = document.getElementById('add-flashcard');

    addFlashcardButton.addEventListener('click', function() {
        const question = document.getElementById('flashcard-question').value;
        const answer = document.getElementById('flashcard-answer').value;

        flashcardData.push({ question, answer });

        document.getElementById('flashcard-question').value = '';
        document.getElementById('flashcard-answer').value = '';

        collectionTitleInput.style.display = 'none';

        console.log('Flashcard added:', { question, answer });
    });

    document.getElementById('create-collection').addEventListener('click', function() {
        const collectionTitle = collectionTitleInput.value;

        addFlashcardsToCollection(collectionTitle, flashcardData);

        flashcardData = [];
        collectionTitleInput.style.display = 'none';
        addFlashcardButton.disabled = true; 

        console.log('Collection created:', collectionTitle);
    });

    const addFlashcardsToCollection = async (collectionTitle, flashcardData) => {
        console.log('Creating collection:', collectionTitle);
        console.log('Flashcards:', flashcardData);
    };
});