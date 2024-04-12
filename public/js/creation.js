// document.addEventListener('DOMContentLoaded', function() {
//     const collectionTitleInput = document.getElementById('flashcard-title');
//     const addFlashcardButton = document.getElementById('add-flashcard');
//     const createCollectionButton = document.getElementById('create-collection');
//     const flashcardContainer = document.getElementById('flashcard-container');

//     const flashcardData = [];

//     addFlashcardButton.addEventListener('click', function() {
//         const question = document.getElementById('flashcard-question').value;
//         const answer = document.getElementById('flashcard-answer').value;

//         const flashcardElement = document.createElement('div');
//         flashcardElement.classList.add('flashcard');
//         flashcardElement.innerHTML = `
//             <div>Question: ${question}</div>
//             <div>Answer: ${answer}</div>
//         `;
//         flashcardContainer.appendChild(flashcardElement);

//         flashcardData.push({ question, answer });

//         document.getElementById('flashcard-question').value = '';
//         document.getElementById('flashcard-answer').value = '';

//         console.log('Flashcard added:', { question, answer });
//     });

//     createCollectionButton.addEventListener('click', function() {
//         const collectionTitle = collectionTitleInput.value;

//         if (flashcardData.length === 0) {
//             console.error('No flashcards added');
//             return;
//         }

//         fetch('/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ collectionTitle, flashcards: flashcardData })
//         })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('Network response was not ok.');
//         })
//         .then(data => {
//             console.log('Collection created:', data);
//             flashcardContainer.innerHTML = ''; 
//             flashcardData.length = 0; 
//         })
//         .catch(error => {
//             console.error('Error creating collection:', error);
//         });

//         console.log('Creating collection:', collectionTitle);
//     });
//     createCollectionButton.addEventListener('click', function() {
//         const collectionTitle = collectionTitleInput.value.trim(); 
    
//         if (!collectionTitle) {
//             console.error('Collection title is required');
//             return;
//         }
//         });
    
// });
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
        if (!currentCollection) {
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

        if (!collectionTitle) {
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