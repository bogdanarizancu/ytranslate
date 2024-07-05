export async function submitToYouTube(videoId, title, description, localizations) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,localizations`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${gapi.auth.getToken().access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: videoId,
            snippet: {
                title: title,
                description: description,
                categoryId: "10",
            },
            localizations: localizations
        })
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update video: ${errorDetails.error.message}`);
    }

    return await response.json();
}
