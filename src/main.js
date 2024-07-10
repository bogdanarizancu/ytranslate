import config from '../config.js';
import { submitToYouTube } from './youtube.js';
import { translateText } from './translate.js';

const videoIdInput = document.getElementById('video-id');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const form = document.getElementById('translation-form');

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

let tokenClient;
let accessToken = null;
let targetLanguages = config.TRANSLATION_TARGET_LANGUAGES;

function handleClientLoad() {
	gapi.load('client', initClient);
}

function initClient() {
	gapi.client.init({
		apiKey: config.YOUTUBE_API_KEY,
		discoveryDocs: DISCOVERY_DOCS
	}).then(() => {
		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: config.YOUTUBE_CLIENT_ID,
			scope: SCOPES,
			callback: (tokenResponse) => {
				accessToken = tokenResponse.access_token;
				form.addEventListener('submit', handleSubmit);
			},
		});

		document.getElementById('sign-in-button').addEventListener('click', handleAuthClick);
		document.getElementById('sign-out-button').addEventListener('click', handleSignoutClick);
	}).catch(error => {
		console.error("Error initializing Google API client: ", error);
	});
}

function handleAuthClick(event) {
	tokenClient.requestAccessToken();
}

function handleSignoutClick(event) {
	google.accounts.oauth2.revoke(accessToken, () => {
		console.log("User signed out.");
		accessToken = null;
		form.removeEventListener('submit', handleSubmit);
	});
}

function trimTitle(title) {
	if (title.length > 100) {
		return title.substring(0, 97) + '...';
	}
	return title;
}

async function handleSubmit(e) {
	e.preventDefault();

	if (!accessToken) {
		alert("Please sign in first.");
		return;
	}

	const videoId = videoIdInput.value;
	const title = titleInput.value;
	const description = descriptionInput.value;

	let localizations = {};

	for (const language of targetLanguages) {
	    const [translatedTitle, translatedDescription] = await Promise.all([
	        translateText(title, language),
	        translateText(description, language),
	    ]);
	    localizations[language] = {
			title: trimTitle(translatedTitle),
	        description: translatedDescription
	    };
	}
	console.log(localizations);

	// Submit the translation to YouTube
	try {
		await submitToYouTube(videoId, title, description, localizations);
		alert('Video localizations updated successfully!');
	} catch (error) {
		console.error("Error updating video localizations: ", error);
		alert('Failed to update video localizations. See console for details.');
	}
}

window.onload = handleClientLoad;
