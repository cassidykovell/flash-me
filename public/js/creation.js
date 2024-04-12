document.addEventListener('DOMContentLoaded', function() {
    const collectionTitleInput = document.getElementById('flashcard-title');
    const addFlashcardButton = document.getElementById('add-flashcard');
    const createCollectionButton = document.getElementById('create-collection');
    const postButton = document.getElementById('post'); 
    const flashcardQuestionInput = document.getElementById('flashcard-question');
    const flashcardAnswerInput = document.getElementById('flashcard-answer');
    const flashcardContainer = document.getElementById('flashcard-container');
    let currentCollection = null;
    const flashcardData = [];

    postButton.addEventListener('click', async function() {
        console.log('currentCollection', currentCollection)
        if (_.isEmpty(currentCollection)) {
            console.error('Create a collection first');
            return;
        }
    
        try {
console.log('fetching now')
            const response = await fetch('/api/create', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentCollection)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Collection saved:', data);
                currentCollection = null;
                flashcardData.length = 0;
                flashcardContainer.innerHTML = '';
            } else {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
        } catch (error) {
            console.error('Error saving collection:', error);
        }
    });

    createCollectionButton.addEventListener('click', function() {
        const collectionTitle = collectionTitleInput.value.trim();

        if (_.isEmpty(collectionTitle)) {
            console.error('Collection title is required');
            return;
        }

        currentCollection = { title: collectionTitle, flashcards: [] };
        console.log('New collection created:', currentCollection);
    });

    addFlashcardButton.addEventListener('click', function() {
        const question = flashcardQuestionInput.value;
        const answer = flashcardAnswerInput.value;

        if (!currentCollection) {
            console.error('Create a collection first');
            return;
        }

        currentCollection.flashcards.push({ question, answer });
        flashcardData.push({ question, answer }); 
        renderFlashcards(); 
        console.log('Flashcard added:', { question, answer });
    });


    function renderFlashcards() {
        flashcardContainer.innerHTML = ''; 
        flashcardData.forEach(flashcard => {
            const flashcardElement = document.createElement('div');
            flashcardElement.classList.add('flashcard');
            flashcardElement.innerHTML = `
                <div>Question: ${flashcard.question}</div>
                <div>Answer: ${flashcard.answer}</div>
            `;
            flashcardContainer.appendChild(flashcardElement);
        });
    }
});