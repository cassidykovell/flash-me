// document.addEventListener('DOMContentLoaded', function() {
//     let flashcardData = [];
//     const collectionTitleInput = document.getElementById('flashcard-title');
//     const addFlashcardButton = document.getElementById('add-flashcard');

//     addFlashcardButton.addEventListener('click', function() {
//         const question = document.getElementById('flashcard-question').value;
//         const answer = document.getElementById('flashcard-answer').value;

//         flashcardData.push({ question, answer });

//         document.getElementById('flashcard-question').value = '';
//         document.getElementById('flashcard-answer').value = '';

//         collectionTitleInput.style.display = 'none';

//         console.log('Flashcard added:', { question, answer });
//     });

//     document.getElementById('create-collection').addEventListener('click', function() {
//         const collectionTitle = collectionTitleInput.value;

//         addFlashcardsToCollection(collectionTitle, flashcardData);

//         flashcardData = [];
//         collectionTitleInput.style.display = 'none';
//         addFlashcardButton.disabled = true; 

//         console.log('Collection created:', collectionTitle);
//     });

//     const addFlashcardsToCollection = async (collectionTitle, flashcardData) => {
//         console.log('Creating collection:', collectionTitle);
//         console.log('Flashcards:', flashcardData);
//     };
// });
document.addEventListener('DOMContentLoaded', function() {
    const collectionTitleInput = document.getElementById('flashcard-title');
    const addFlashcardButton = document.getElementById('add-flashcard');
    const createCollectionButton = document.getElementById('create-collection');

    const flashcardData = [];

    addFlashcardButton.addEventListener('click', function() {
        const question = document.getElementById('flashcard-question').value;
        const answer = document.getElementById('flashcard-answer').value;

        flashcardData.push({ question, answer });

        document.getElementById('flashcard-question').value = '';
        document.getElementById('flashcard-answer').value = '';

        console.log('Flashcard added:', { question, answer });
    });
    
    console.log('script loaded')

    createCollectionButton.addEventListener('click', function() {
        const collectionTitle = collectionTitleInput.value;

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
            // Handle response data if needed
            console.log('Collection created:', data);
        })
        .catch(error => {
            console.error('Error creating collection:', error);
        });

        flashcardData.length = 0;
        collectionTitleInput.style.display = 'none';
        addFlashcardButton.disabled = true; 

        console.log('Creating collection:', collectionTitle);
    });
});
