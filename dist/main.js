(()=>{"use strict";const t={GOOGLE_TRANSLATE_API_KEY:"AIzaSyDd0VJnlbWG8hmgxv_abmUoxcBo9KYayh4",YOUTUBE_CLIENT_ID:"992631711226-mlsml4e89lrudj9bu0ioh2jgi21kjgsd.apps.googleusercontent.com",YOUTUBE_API_KEY:"AIzaSyCUfY1xmvcgAbXVmxoRtbDVk5Wy_uG4mYo"};async function e(e,o){const n=await fetch(`https://translation.googleapis.com/language/translate/v2?key=${t.GOOGLE_TRANSLATE_API_KEY}&target=${o}&q=${encodeURIComponent(e)}`);return(await n.json()).data.translations[0].translatedText}const o=document.getElementById("video-id"),n=document.getElementById("title"),i=document.getElementById("description"),a=document.getElementById("translation-form"),s=["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];let l,c=null;function r(){gapi.client.init({apiKey:t.YOUTUBE_API_KEY,discoveryDocs:s}).then((()=>{l=google.accounts.oauth2.initTokenClient({client_id:t.YOUTUBE_CLIENT_ID,scope:"https://www.googleapis.com/auth/youtube.force-ssl",callback:t=>{c=t.access_token,a.addEventListener("submit",m)}}),document.getElementById("sign-in-button").addEventListener("click",u),document.getElementById("sign-out-button").addEventListener("click",d)})).catch((t=>{console.error("Error initializing Google API client: ",t)}))}function u(t){l.requestAccessToken()}function d(t){google.accounts.oauth2.revoke(c,(()=>{console.log("User signed out."),c=null,a.removeEventListener("submit",m)}))}function g(t){return t.length>100?t.substring(0,97)+"...":t}async function m(t){if(t.preventDefault(),!c)return void alert("Please sign in first.");const a=o.value,s=n.value,l=i.value,r=["af","sq","am","ar","hy","az","bn","eu","be","bs","bg","ca","zh-CN","zh-TW","hr","cs","da","nl","et","fil","fi","fr","gl","ka","de","el","gu","ha","he","hi","hu","is","ig","id","ga","it","ja","jv","kn","kk","km","ko","ky","lo","lv","lt","lb","mk","ml","mr","mn","ne","no","ps","fa","pl","pt","pa","ro","ru","gd","sr","si","sk","sl","es","sw","sv","ta","te","th","tr","uk","ur","uz","vi","cy","zu"];let u={};for(const t of r){const[o,n]=await Promise.all([e(s,t),e(l,t)]);u[t]={title:g(o),description:n}}console.log(u);try{await async function(t,e,o,n){const i=await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet,localizations",{method:"PUT",headers:{Authorization:`Bearer ${gapi.auth.getToken().access_token}`,"Content-Type":"application/json"},body:JSON.stringify({id:t,snippet:{title:e,description:o,categoryId:"10"},localizations:n})});if(!i.ok){const t=await i.json();throw new Error(`Failed to update video: ${t.error.message}`)}return await i.json()}(a,s,l,u),alert("Video localizations updated successfully!")}catch(t){console.error("Error updating video localizations: ",t),alert("Failed to update video localizations. See console for details.")}}window.onload=function(){gapi.load("client",r)}})();