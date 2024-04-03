const newFormHandler = async (event) => {
    event.preventDefault();
  
    const question = document.querySelector('#flashcard-question').value.trim();
    const answer = document.querySelector('#flashcard-answer').value.trim();
  
    if (question && answer) { // Check if both question and answer are filled
      const response = await fetch(`/api/flashcards`, {
        method: 'POST',
        body: JSON.stringify({ question, answer }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create flashcard');
      }
    } else {
      alert('Please fill in both question and answer.'); // Alert if any field is empty
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/flashcards/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete flashcard');
      }
    }
  };
  
  document
    .querySelector('#new-flashcard-form')
    .addEventListener('submit', newFormHandler); // Update to match your form ID
  
  document
    .querySelector('.flashcard-list')
    .addEventListener('click', delButtonHandler);
  