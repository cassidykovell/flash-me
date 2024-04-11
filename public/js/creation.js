document.addEventListener('DOMContentLoaded', function() {
    const collectionTitleInput = document.getElementById('flashcard-title');
    const addFlashcardButton = document.getElementById('add-flashcard');
    const createCollectionButton = document.getElementById('create-collection');
    const flashcardContainer = document.getElementById('flashcard-container');

    const flashcardData = [];

    addFlashcardButton.addEventListener('click', function() {
        const question = document.getElementById('flashcard-question').value;
        const answer = document.getElementById('flashcard-answer').value;

        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerHTML = `
            <div>Question: ${question}</div>
            <div>Answer: ${answer}</div>
        `;
        flashcardContainer.appendChild(flashcardElement);

        flashcardData.push({ question, answer });

        document.getElementById('flashcard-question').value = '';
        document.getElementById('flashcard-answer').value = '';

        console.log('Flashcard added:', { question, answer });
    });

    createCollectionButton.addEventListener('click', function() {
        const collectionTitle = collectionTitleInput.value;

        if (flashcardData.length === 0) {
            console.error('No flashcards added');
            return;
        }

        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ collectionTitle, flashcards: flashcardData })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Collection created:', data);
            flashcardContainer.innerHTML = ''; 
            flashcardData.length = 0; 
        })
        .catch(error => {
            console.error('Error creating collection:', error);
        });

        console.log('Creating collection:', collectionTitle);
    });
    createCollectionButton.addEventListener('click', function() {
        const collectionTitle = collectionTitleInput.value.trim(); 
    
        if (!collectionTitle) {
            console.error('Collection title is required');
            return;
        }
        });
    
});
