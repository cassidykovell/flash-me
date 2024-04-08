INSERT INTO user (username, email, password)
VALUES (1, "Anna123", "annabanana@yahoo.com", "password123"),
       (2, "BrianG", "briang@yahoo.com", "brianspass"),
       (3, "Frankie22", "frankie22@yahoo.com", "frankspass22"),
       (4, "Tina33", "tinamina@gmail.com", "mypass33"),
       (5, "Derek", "dereks4@gmail.com", "passforderek");

INSERT INTO flashcard (name, question, answer, user_id)
VALUES ("HTML", "What does HTML stand for?", "Hyper Text Markup Language", "1"),
    ("HTML", "Who is making the Web standards?", "The World Wide Web Consortium", "1"),
    ("HTML", "In HTML, which attribute is used to specify that an input field must be filled out?","required", "1"),
    ("CSS", "What does CSS stand for?", "Cascading Style Sheet", "2"),
    ("CSS", "What is CSS used for?", "CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.", "2"),
    ("CSS", "What does a CSS rule consist of?", "A CSS rule consits of a selector and a declaration block.", "2"),
    ("JavaScript", "What is a JavaScript function?", "A JavaScript function is a block of JavaScript code, that can be executed when called for.", "3"),
    ("JavaScript", "Where is the correct place to insert a JavaScript?", "You can insert a JavaScript both in the <head> section and the <body> section.", "3"),
    ("JavaScript", "Which event occurs when the user clicks on an HTML element?", "onclick", "3"),
    ("SQL", "What does SQL stand for?", "Structured Query Language", "4"),
    ("SQL", "What does RDBMS stand for?", "Relational Database Management System", "4"),
    ("SQL", )