export async function translateText(text, targetLanguage) {
	const apiKey = 'AIzaSyCIV_EtJ0dD38vfnV83vCHPlmCQjkCSIlM';
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}&target=${targetLanguage}&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.data.translations[0].translatedText;
}