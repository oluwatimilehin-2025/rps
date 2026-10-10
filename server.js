
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Play route
app.post("/play", (req, res) => {
    const playerMove = req.body.move;

    const choices = ["rock", "paper", "scissors"];

    if (!choices.includes(playerMove)) {
        return res.status(400).json({
            error: "Choose rock, paper, or scissors."
        });
    }

    const computerMove =
        choices[Math.floor(Math.random() * choices.length)];

    let result;

    if (playerMove === computerMove) {
        result = "Draw!";
    } else if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
    ) {
        result = "You win!";
    } else {
        result = "Computer wins!";
    }

    res.json({
        playerMove,
        computerMove,
        result
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
