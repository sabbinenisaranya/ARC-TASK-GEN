// ==========================================
// VOICE SAFETY ASSISTANT
// ==========================================

// Flask backend address
const API_URL = "http://127.0.0.1:5000/analyze";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const statusText = document.getElementById("status");
const transcriptText = document.getElementById("transcript");

const safetyLevel = document.getElementById("safetyLevel");
const messageText = document.getElementById("message");
const actionText = document.getElementById("action");


// ==========================================
// CHECK SPEECH RECOGNITION SUPPORT
// ==========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    statusText.textContent =
        "Speech recognition is not supported in this browser.";

    startButton.disabled = true;

}


// ==========================================
// CREATE SPEECH RECOGNITION
// ==========================================

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";

}


// ==========================================
// START LISTENING
// ==========================================

startButton.addEventListener("click", () => {

    if (!recognition) {
        return;
    }

    try {

        recognition.start();

        startButton.disabled = true;

        stopButton.disabled = false;

        statusText.textContent =
            "🎤 Listening... Please speak.";

        transcriptText.textContent =
            "Listening...";

    } catch (error) {

        console.log(error);

    }

});


// ==========================================
// STOP LISTENING
// ==========================================

stopButton.addEventListener("click", () => {

    if (!recognition) {
        return;
    }

    recognition.stop();

    startButton.disabled = false;

    stopButton.disabled = true;

    statusText.textContent =
        "Listening stopped.";

});


// ==========================================
// SPEECH RESULT
// ==========================================

if (recognition) {

    recognition.onresult = async (event) => {

        const transcript =
            event.results[0][0].transcript;

        transcriptText.textContent =
            transcript;

        statusText.textContent =
            "Speech detected. Analyzing safety...";

        await analyzeSafety(transcript);

    };


    // ==========================================
    // SPEECH END
    // ==========================================

    recognition.onend = () => {

        startButton.disabled = false;

        stopButton.disabled = true;

    };


    // ==========================================
    // SPEECH ERROR
    // ==========================================

    recognition.onerror = (event) => {

        console.log("Speech recognition error:", event.error);

        startButton.disabled = false;

        stopButton.disabled = true;

        if (event.error === "not-allowed") {

            statusText.textContent =
                "Microphone permission was denied.";

        } else {

            statusText.textContent =
                "Could not recognize speech. Please try again.";

        }

    };

}


// ==========================================
// SEND SPEECH TO FLASK
// ==========================================

async function analyzeSafety(text) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );

        }


        const result = await response.json();


        // Display result
        displaySafetyResult(result);


        statusText.textContent =
            "Analysis complete.";


    } catch (error) {

        console.error(error);

        statusText.textContent =
            "Could not connect to the safety server.";

        messageText.textContent =
            "Please make sure the Flask server is running.";

        actionText.textContent =
            "Start app.py and try again.";

    }

}


// ==========================================
// DISPLAY SAFETY RESULT
// ==========================================

function displaySafetyResult(result) {

    const level =
        result.level || "LOW";

    const message =
        result.message || "";

    const action =
        result.action || "";


    // Set safety level text
    safetyLevel.textContent =
        level;


    // Remove previous classes
    safetyLevel.classList.remove(
        "low",
        "medium",
        "high"
    );


    // Add correct class
    if (level === "HIGH") {

        safetyLevel.classList.add("high");

    } else if (level === "MEDIUM") {

        safetyLevel.classList.add("medium");

    } else {

        safetyLevel.classList.add("low");

    }


    // Display message and action
    messageText.textContent =
        message;

    actionText.textContent =
        action;

}