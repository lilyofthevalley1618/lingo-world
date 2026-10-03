# 🌍 Lingo World

A cute, **speaking-first** app for learning beginner **Spanish, French, Mandarin Chinese, Cantonese, Japanese and Korean**.

**Try it:** https://lilyofthevalley1618.github.io/lingo-world/ (works on phone & laptop, and you can "Add to Home Screen" to install it like an app)

## Learn
- 🗺️ **Lesson path** per language: 6 units (greetings, numbers, food, colors, family, phrases), 4 lessons each, unlocked in order
- 🗣️ **Speaking-first lessons** (12 exercises each, 7 of them are speak/listen): listen & repeat, say it from memory, shadow a sentence, read aloud, listen & pick, listen & respond, tap what you hear, plus matching pairs, sentence tiles, fill-in-the-blank and a little typing. You get hearts, a feedback panel after every answer, and missed items come back at the end.
- 🔁 **Spaced-repetition review**: words come back after 1 → 3 → 7 → 14 → 30 days, and missed words come back right away
- 🎧 **Shadowing**: hear a phrase, repeat it right after, with a slow-speed toggle and a % match score
- ⚡ **Say it fast**: see an emoji + English word and say it before the timer runs out
- 💡 **Memory tips** for tricky words, plus flashcards and quick quizzes for review
- Chinese shows characters + pinyin, Cantonese shows traditional characters + Jyutping, Japanese shows kana/kanji + romaji, and Korean shows hangul + romanization

## Play
- 🍓 **Cute food mascots** (strawberry, avocado, peach, boba, dumpling, sushi, taco, croissant) that cheer you on during lessons
- <b>B</b> **Blingos** earned from lessons, speaking (bonus!), reviews, quizzes, drills and daily streaks
- 🛍️ **Shop & closet**: characters, colors, funny faces, outfits and accessories, all drawn as layered SVG so they fit every character

## Notes
- Audio uses your browser's text-to-speech and speaking uses the browser's speech recognition (best in Chrome or Safari). If your device has no Cantonese voice, add "Chinese (Hong Kong)" in its text-to-speech settings.
- Progress is saved on your device (localStorage).

## How it's built
Plain HTML, CSS and JavaScript with no frameworks and no build step: `index.html`, `style.css`, `app.js`, `characters.js` (mascots/shop), `data/*.json` (one vocabulary file per language), `sw.js` + `manifest.json` (installable PWA, network-first so updates show up automatically). To run it locally: `python3 -m http.server`.
