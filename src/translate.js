import config from "../config";
export async function translateText(text, targetLanguage) {
	const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${config.GOOGLE_TRANSLATE_API_KEY}&target=${targetLanguage}&q=${encodeURIComponent(text)}`);
	const data = await response.json();
	return data.data.translations[0].translatedText;
}