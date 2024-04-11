document.getElementById('flashcardForm').addEventListener('submit', async function(event) {  //Change element Id
    event.preventDefault(); 

    const collectionId = document.getElementById('collectionId').value; 
    const flashcards = []; 

    document.querySelectorAll('.flashcard-inputs').forEach(input => {
        const flashcardTitle = input.querySelector('.flashcardTitle').value;
        const question = input.querySelector('.question').value;
        const answer = input.querySelector('.answer').value;

        flashcards.push({ flashcardTitle, question, answer });
    });

    try {
        const response = await fetch('/api/flashcards/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ collectionId, flashcards })
        });

        if (!response.ok) {
            throw new Error('Failed to create flashcards');
        }

        alert('Flashcards created successfully!');
    } catch (error) {
        console.error('Error creating flashcards:', error);
    }
});



