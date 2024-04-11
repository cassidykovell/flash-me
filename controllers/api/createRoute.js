const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { Collection } = require("../../models");
const { Flashcard } = require("../../models");

router.get("/create", async (req, res) => {
  res.render("flashcard", { layout: "feed" });
});

router.post("/create", async (req, res) => {
  const { collectionId, flashcards } = req.body;

  try {
    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const createdFlashcards = await Promise.all(
      flashcards.map(async (flashcardData) => {
        const { question, answer } = flashcardData;

        const newFlashcard = await Flashcard.create({
          question,
          answer,
        });

        await newFlashcard.setCollection(collection);
        return newFlashcard;
      })
    );

    const jsonData = JSON.stringify(createdFlashcards, null, 2);
    const filePath = path.join(__dirname, "flashcardData.json");
    fs.writeFileSync(filePath, jsonData);

    res.status(201).json(createdFlashcards);
  } catch (error) {
    console.error("Error creating flashcards:", error);
    res.status(500).json({ error: "Failed to create flashcards" });
  }
});

module.exports = router;