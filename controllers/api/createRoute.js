const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { Collection } = require("../../models");
const { Flashcard } = require("../../models");

router.get("/", async (req, res) => {
  console.log(' get request!!!!!!!!!!!!')
  res.render("flashcard", { layout: "feed" });
});


router.post("/", async (req, res) => {

  const { title, flashcards } = req.body;
console.log('req.body', req.body)
console.log('req.session', req.session)
  if (!flashcards || flashcards.length === 0) {
    return res.status(400).json({ error: "No flashcards provided" });
  }

  try {
    const collection = await Collection.create({ name: title, user_id: req.session.user_id });
console.log('collection', collection)
    const createdFlashcards = await Promise.all(
      flashcards.map(async (flashcardData) => {
        const { question, answer } = flashcardData;

        const newFlashcard = await Flashcard.create({
          question,
          answer,
          collection_id: collection.collection_id
        });
console.log('newFlashcard', newFlashcard)
        await newFlashcard.setCollection(collection);
        return newFlashcard;
      })
    );


    res.status(201).json(createdFlashcards);
  } catch (error) {
    console.error("Error creating flashcards:", error);
    res.status(500).json({ error: "Failed to create flashcards" });
  }
});

module.exports = router;