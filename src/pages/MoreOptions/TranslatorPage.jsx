// src/pages/TranslatorPage.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { useTranslation } from "react-i18next";
import "./TranslatorPage.css";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "hi", label: "Hindi" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ru", label: "Russian" },
];

const phrasebook = {
  Greetings: [
    { en: "Hello", es: "Hola", fr: "Bonjour" },
    { en: "Goodbye", es: "Adiós", fr: "Au revoir" },
  ],
  Dining: [
    { en: "Water, please", es: "Agua, por favor", fr: "De l'eau, s'il vous plaît" },
    { en: "Bill, please", es: "La cuenta, por favor", fr: "L'addition, s'il vous plaît" },
  ],
  Travel: [
    { en: "Where is the station?", es: "¿Dónde está la estación?", fr: "Où est la gare ?" },
    { en: "I need a taxi", es: "Necesito un taxi", fr: "J'ai besoin d'un taxi" },
  ],
};

const TranslatorPage = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [ocrText, setOcrText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [wordOfDay] = useState("Thank you - Gracias (Spanish)");

  const translateText = async () => {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setTranslated(data.translatedText);
  };

  const handleOCR = () => {
    if (!imageFile) return;
    Tesseract.recognize(imageFile, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => setOcrText(text));
  };

  const speak = () => {
    const utter = new SpeechSynthesisUtterance(translated);
    utter.lang = toLang;
    speechSynthesis.speak(utter);
  };

  return (
    <div className="translator-page">
      <h2 className="section-title">🌐 Multilingual Translator</h2>

      <section className="translator-section">
        <h3>🔤 Text Translator</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <div className="lang-select">
          <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
            {languages.map((l) => (
              <option value={l.code} key={l.code}>{l.label}</option>
            ))}
          </select>
          <span>→</span>
          <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
            {languages.map((l) => (
              <option value={l.code} key={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
        <button onClick={translateText}>Translate</button>
        <div className="translated-box">
          <p>{translated}</p>
          <button onClick={speak}>🔊</button>
        </div>
      </section>

      <section className="translator-section">
        <h3>🎤 Voice to Text</h3>
        <button
          onClick={() => {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = fromLang;
            recognition.onresult = (e) => {
              setText(e.results[0][0].transcript);
            };
            recognition.start();
          }}
        >Speak Now</button>
      </section>

      <section className="translator-section">
        <h3>🖼️ Image to Text (OCR)</h3>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <button onClick={handleOCR}>Extract Text</button>
        <textarea value={ocrText} readOnly placeholder="OCR Output" />
      </section>

      <section className="translator-section">
        <h3>📘 Word of the Day</h3>
        <div className="word-day">{wordOfDay}</div>
      </section>

      <section className="translator-section">
        <h3>📖 Offline Phrasebook</h3>
        {Object.entries(phrasebook).map(([category, phrases]) => (
          <div key={category} className="phrase-category">
            <h4>{category}</h4>
            <ul>
              {phrases.map((phrase, idx) => (
                <li key={idx}>{phrase.en} - {phrase[toLang]}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TranslatorPage;
