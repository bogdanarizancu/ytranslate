(()=>{"use strict";const t={GOOGLE_TRANSLATE_API_KEY:"AIzaSyDd0VJnlbWG8hmgxv_abmUoxcBo9KYayh4",YOUTUBE_CLIENT_ID:"992631711226-mlsml4e89lrudj9bu0ioh2jgi21kjgsd.apps.googleusercontent.com",YOUTUBE_API_KEY:"AIzaSyCUfY1xmvcgAbXVmxoRtbDVk5Wy_uG4mYo"};async function e(e,o){const n=await fetch(`https://translation.googleapis.com/language/translate/v2?key=${t.GOOGLE_TRANSLATE_API_KEY}&target=${o}&q=${encodeURIComponent(e)}`);return(await n.json()).data.translations[0].translatedText}const o=document.getElementById("video-id"),n=document.getElementById("title"),i=document.getElementById("description"),a=document.getElementById("translation-form"),s=["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];let c,l=null;function r(){gapi.client.init({apiKey:t.YOUTUBE_API_KEY,discoveryDocs:s}).then((()=>{c=google.accounts.oauth2.initTokenClient({client_id:t.YOUTUBE_CLIENT_ID,scope:"https://www.googleapis.com/auth/youtube.force-ssl",callback:t=>{l=t.access_token,a.addEventListener("submit",p)}}),document.getElementById("sign-in-button").addEventListener("click",u),document.getElementById("sign-out-button").addEventListener("click",d)})).catch((t=>{console.error("Error initializing Google API client: ",t)}))}function u(t){c.requestAccessToken()}function d(t){google.accounts.oauth2.revoke(l,(()=>{console.log("User signed out."),l=null,a.removeEventListener("submit",p)}))}function g(t){return t.length>100?t.substring(0,97)+"...":t}async function p(a){if(a.preventDefault(),!l)return void alert("Please sign in first.");const s=o.value,c=n.value,r=i.value;let u={};for(const o of t.TRANSLATION_TARGET_LANGUAGES){const[t,n]=await Promise.all([e(c,o),e(r,o)]);u[o]={title:g(t),description:n}}console.log(u);try{await async function(t,e,o,n){const i=await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet,localizations",{method:"PUT",headers:{Authorization:`Bearer ${gapi.auth.getToken().access_token}`,"Content-Type":"application/json"},body:JSON.stringify({id:t,snippet:{title:e,description:o,categoryId:"10"},localizations:n})});if(!i.ok){const t=await i.json();throw new Error(`Failed to update video: ${t.error.message}`)}return await i.json()}(s,c,r,u),alert("Video localizations updated successfully!")}catch(t){console.error("Error updating video localizations: ",t),alert("Failed to update video localizations. See console for details.")}}window.onload=function(){gapi.load("client",r)}})();