# Rime Evidence

## Project
Voice Safety Assistant

## Voice Problem

The project aims to provide fast voice-based safety assistance when a user may not
be able to type normally.

The key voice challenge is recognizing a user's spoken safety statement and providing
an immediate spoken response appropriate to the detected safety level.

## User Flow

1. User opens the Voice Safety Assistant.
2. User starts voice input.
3. The user speaks naturally.
4. Speech is converted into text.
5. The application analyzes the statement.
6. The safety level is classified as LOW, MEDIUM, or HIGH.
7. The assistant provides the appropriate response.

## Acceptance Test

### Normal Case

Input:

"I am walking home and everything is fine."

Expected result:

LOW safety level.

### Safety Stress Case

Input:

"It's following me."

Expected result:

HIGH safety level.

The application should display the detected safety level and provide an appropriate
safety recommendation.

## Procedure

1. Start the Flask backend with:

   python app.py

2. Start the frontend server with:

   python -m http.server 5500

3. Open:

   http://127.0.0.1:5500/frontend/index.html

4. Allow microphone access.

5. Click "Start Listening".

6. Speak the test phrase.

7. Verify the recognized speech and safety result.

## Result

The prototype successfully accepts spoken input and classifies the demonstrated
safety statements.

For the stress case "It's following me", the prototype identifies the statement
as HIGH risk and displays a safety recommendation.

## Rime Configuration

Model ID: [ENTER THE ACTUAL RIME MODEL ID USED]

Speaker/Voice: [ENTER THE ACTUAL RIME VOICE USED]

Language: [ENTER THE ACTUAL LANGUAGE USED]

Endpoint: [ENTER THE ACTUAL RIME ENDPOINT USED]

Audio Format: [ENTER THE ACTUAL AUDIO FORMAT USED]

Transport: [ENTER THE ACTUAL TRANSPORT USED]

## Limitations

This is a prototype and should not be considered a replacement for emergency
services.

The current safety classification is based on predefined safety phrases and may
not correctly understand every real-world situation.

The system should not automatically contact emergency services based only on an
AI or keyword prediction. Future versions can include user confirmation,
emergency contacts, location sharing, stronger AI-based detection, and multilingual
support.

## Reproducibility

The source code for the demonstrated prototype is included in this repository.

The demonstrated behavior should be reproduced using the setup instructions in
README.md.
