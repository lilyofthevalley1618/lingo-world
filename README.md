# 🌍 Lingo World

A friendly, colorful app for learning beginner **Spanish, French, Chinese (Mandarin), Japanese and Korean**.

**Try it:** https://lilyofthevalley1618.github.io/lingo-world/

## Features
- 🃏 **Flashcards** in 6 beginner topics: greetings, numbers, food & drinks, colors, family & friends, common phrases (~90 words per language)
- ❓ **Quizzes** per topic plus a mixed quiz: multiple choice, both directions
- 🔊 **Pronunciation** with your browser's built-in text-to-speech
- 🀄 Chinese shows characters + pinyin, Japanese shows kana/kanji + romaji, Korean shows hangul + romanization
- 🔥 **Streak, XP and learned words** saved on your device (localStorage)
- 📱 Works on phone and laptop, and you can install it like an app (PWA: "Add to Home Screen")

## How it's built
Plain HTML, CSS and JavaScript. No frameworks and no build step.
- `index.html`, `style.css`, `app.js`: the app
- `data/*.json`: one vocabulary file per language
- `sw.js` + `manifest.json`: installable PWA (network-first, so updates show up automatically)

To run it locally: `python3 -m http.server`, then open http://localhost:8000.
To add words, edit the JSON file for that language.
