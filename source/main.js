/**
 * @project Bluesky Extension
 * @description A simple script to add extended functionality to Bluesky.
 * @website https://github.com/UPLYNXED/bsky-extension
 * @license MIT
 * @version 0.0.3
 * 
 * @author Avelyn "UPLYNXED" Neervoort
 * @contact https://uplynxed.valk.cam/
 * 
 * @fileoverview Main js file for the project
 * @created 2023-07-26
 * @lastModified 2023-07-31
 */

//XHook - v1.6.0 - https://github.com/jpillora/xhook
//Jaime Pillora <dev@jpillora.com> - MIT Copyright 2023
var xhook=function(){"use strict";const e=(e,t)=>Array.prototype.slice.call(e,t);let t=null;"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?t=self:"undefined"!=typeof global?t=global:window&&(t=window);const n=t,r=t.document,o=["load","loadend","loadstart"],s=["progress","abort","error","timeout"],a=e=>["returnValue","totalSize","position"].includes(e),i=function(e,t){for(let n in e){if(a(n))continue;const r=e[n];try{t[n]=r}catch(e){}}return t},c=function(e,t,n){const r=e=>function(r){const o={};for(let e in r){if(a(e))continue;const s=r[e];o[e]=s===t?n:s}return n.dispatchEvent(e,o)};for(let o of Array.from(e))n._has(o)&&(t[`on${o}`]=r(o))},u=function(e){if(r&&null!=r.createEventObject){const t=r.createEventObject();return t.type=e,t}try{return new Event(e)}catch(t){return{type:e}}},l=function(t){let n={};const r=e=>n[e]||[],o={addEventListener:function(e,t,o){n[e]=r(e),n[e].indexOf(t)>=0||(o=void 0===o?n[e].length:o,n[e].splice(o,0,t))},removeEventListener:function(e,t){if(void 0===e)return void(n={});void 0===t&&(n[e]=[]);const o=r(e).indexOf(t);-1!==o&&r(e).splice(o,1)},dispatchEvent:function(){const n=e(arguments),s=n.shift();t||(n[0]=i(n[0],u(s)));const a=o[`on${s}`];a&&a.apply(o,n);const c=r(s).concat(r("*"));for(let e=0;e<c.length;e++){c[e].apply(o,n)}},_has:e=>!(!n[e]&&!o[`on${e}`])};return t&&(o.listeners=t=>e(r(t)),o.on=o.addEventListener,o.off=o.removeEventListener,o.fire=o.dispatchEvent,o.once=function(e,t){var n=function(){return o.off(e,n),t.apply(null,arguments)};return o.on(e,n)},o.destroy=()=>n={}),o};var f=function(e,t){switch(typeof e){case"object":return n=e,Object.entries(n).map((([e,t])=>`${e.toLowerCase()}: ${t}`)).join("\r\n");case"string":return function(e,t){const n=e.split("\r\n");null==t&&(t={});for(let e of n)if(/([^:]+):\s*(.+)/.test(e)){const e=null!=RegExp.$1?RegExp.$1.toLowerCase():void 0,n=RegExp.$2;null==t[e]&&(t[e]=n)}return t}(e,t)}var n;return[]};const d=l(!0),p=e=>void 0===e?null:e,h=n.XMLHttpRequest,y=function(){const e=new h,t={};let n,r,a,u=null;var y=0;const v=function(){if(a.status=u||e.status,-1!==u&&(a.statusText=e.statusText),-1===u);else{const t=f(e.getAllResponseHeaders());for(let e in t){const n=t[e];if(!a.headers[e]){const t=e.toLowerCase();a.headers[t]=n}}}},g=function(){x.status=a.status,x.statusText=a.statusText},E=function(){n||x.dispatchEvent("load",{}),x.dispatchEvent("loadend",{}),n&&(x.readyState=0)},b=function(e){for(;e>y&&y<4;)x.readyState=++y,1===y&&x.dispatchEvent("loadstart",{}),2===y&&g(),4===y&&(g(),"text"in a&&(x.responseText=a.text),"xml"in a&&(x.responseXML=a.xml),"data"in a&&(x.response=a.data),"finalUrl"in a&&(x.responseURL=a.finalUrl)),x.dispatchEvent("readystatechange",{}),4===y&&(!1===t.async?E():setTimeout(E,0))},m=function(e){if(4!==e)return void b(e);const n=d.listeners("after");var r=function(){if(n.length>0){const e=n.shift();2===e.length?(e(t,a),r()):3===e.length&&t.async?e(t,a,r):r()}else b(4)};r()};var x=l();t.xhr=x,e.onreadystatechange=function(t){try{2===e.readyState&&v()}catch(e){}4===e.readyState&&(r=!1,v(),function(){if(e.responseType&&"text"!==e.responseType)"document"===e.responseType?(a.xml=e.responseXML,a.data=e.responseXML):a.data=e.response;else{a.text=e.responseText,a.data=e.responseText;try{a.xml=e.responseXML}catch(e){}}"responseURL"in e&&(a.finalUrl=e.responseURL)}()),m(e.readyState)};const L=function(){n=!0};x.addEventListener("error",L),x.addEventListener("timeout",L),x.addEventListener("abort",L),x.addEventListener("progress",(function(t){y<3?m(3):e.readyState<=3&&x.dispatchEvent("readystatechange",{})})),"withCredentials"in e&&(x.withCredentials=!1),x.status=0;for(let e of Array.from(s.concat(o)))x[`on${e}`]=null;if(x.open=function(e,o,s,i,c){y=0,n=!1,r=!1,t.headers={},t.headerNames={},t.status=0,t.method=e,t.url=o,t.async=!1!==s,t.user=i,t.pass=c,a={},a.headers={},m(1)},x.send=function(n){let u,l;for(u of["type","timeout","withCredentials"])l="type"===u?"responseType":u,l in x&&(t[u]=x[l]);t.body=n;const f=d.listeners("before");var p=function(){if(!f.length)return function(){for(u of(c(s,e,x),x.upload&&c(s.concat(o),e.upload,x.upload),r=!0,e.open(t.method,t.url,t.async,t.user,t.pass),["type","timeout","withCredentials"]))l="type"===u?"responseType":u,u in t&&(e[l]=t[u]);for(let n in t.headers){const r=t.headers[n];n&&e.setRequestHeader(n,r)}e.send(t.body)}();const n=function(e){if("object"==typeof e&&("number"==typeof e.status||"number"==typeof a.status))return i(e,a),"data"in e||(e.data=e.response||e.text),void m(4);p()};n.head=function(e){i(e,a),m(2)},n.progress=function(e){i(e,a),m(3)};const d=f.shift();1===d.length?n(d(t)):2===d.length&&t.async?d(t,n):n()};p()},x.abort=function(){u=-1,r?e.abort():x.dispatchEvent("abort",{})},x.setRequestHeader=function(e,n){const r=null!=e?e.toLowerCase():void 0,o=t.headerNames[r]=t.headerNames[r]||e;t.headers[o]&&(n=t.headers[o]+", "+n),t.headers[o]=n},x.getResponseHeader=e=>p(a.headers[e?e.toLowerCase():void 0]),x.getAllResponseHeaders=()=>p(f(a.headers)),e.overrideMimeType&&(x.overrideMimeType=function(){e.overrideMimeType.apply(e,arguments)}),e.upload){let e=l();x.upload=e,t.upload=e}return x.UNSENT=0,x.OPENED=1,x.HEADERS_RECEIVED=2,x.LOADING=3,x.DONE=4,x.response="",x.responseText="",x.responseXML=null,x.readyState=0,x.statusText="",x};y.UNSENT=0,y.OPENED=1,y.HEADERS_RECEIVED=2,y.LOADING=3,y.DONE=4;var v={patch(){h&&(n.XMLHttpRequest=y)},unpatch(){h&&(n.XMLHttpRequest=h)},Native:h,Xhook:y};const g=n.fetch;function E(e){return e instanceof Headers?b([...e.entries()]):Array.isArray(e)?b(e):e}function b(e){return e.reduce(((e,[t,n])=>(e[t]=n,e)),{})}const m=function(e,t={headers:{}}){let n=Object.assign(Object.assign({},t),{isFetch:!0});if(e instanceof Request){const r=function(e){let t={};return["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"].forEach((n=>t[n]=e[n])),t}(e),o=Object.assign(Object.assign({},E(r.headers)),E(n.headers));n=Object.assign(Object.assign(Object.assign({},r),t),{headers:o,acceptedRequest:!0})}else n.url=e;const r=d.listeners("before"),o=d.listeners("after");return new Promise((function(e,t){let s=e;const a=function(e){if(!o.length)return s(e);const t=o.shift();return 2===t.length?(t(n,e),a(e)):3===t.length?t(n,e,a):a(e)},i=function(t){if(void 0!==t){const n=new Response(t.body||t.text,t);return e(n),void a(n)}c()},c=function(){if(!r.length)return void u();const e=r.shift();return 1===e.length?i(e(n)):2===e.length?e(n,i):void 0},u=()=>{const{url:e,isFetch:r,acceptedRequest:o}=n,i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(n,["url","isFetch","acceptedRequest"]);g(e,i).then((e=>a(e))).catch((function(e){return s=t,a(e),t(e)}))};c()}))};var x={patch(){g&&(n.fetch=m)},unpatch(){g&&(n.fetch=g)},Native:g,Xhook:m};const L=d;return L.EventEmitter=l,L.before=function(e,t){if(e.length<1||e.length>2)throw"invalid hook";return L.on("before",e,t)},L.after=function(e,t){if(e.length<2||e.length>3)throw"invalid hook";return L.on("after",e,t)},L.enable=function(){v.patch(),x.patch()},L.disable=function(){v.unpatch(),x.unpatch()},L.XMLHttpRequest=v.Native,L.fetch=x.Native,L.headers=f,L.enable(),L}();

/**
 * @class BSKY_Ext_Profiles
 * @description A simple script to add buttons for popular messaging apps to profile pages on Bluesky.
 * 
 * @since 0.0.1
 */
class BSKY_Ext_Profiles {
	/**
	 * @let {Object} Options - The options for the script, to be overwritten by the user's settings
	 * 
	 * @since 0.0.1
	 */
	#options = {
		"formatInline": true,
		"insertButtons": true,
		"showIconsInline": true,
		"showIconsButtons": true,
		"inlineLinkText": 'original',										// original, icon, name, path (the last part of the url)
		"buttonLinkText": 'name',											// original, icon, name
		"inlineLinkTypes": ['messaging', 'content', 'social', 'linkhub'],	// messaging, social, content, linkhub
		"buttonTypes": ['messaging', 'social', 'linkhub'],					// messaging, social, content, linkhub
		"resolveDiscordInvites": true,										// Whether or not to resolve Discord invites to the server name
		"cacheDiscordInvites": true,										// Whether or not to cache Discord invites to the server name to prevent repeated requests
		"bioSelector": "[data-testid='profileHeaderDescription']"			// The selector for the profile bio element
	};

	/**
	 * @constant {Object} linkTypes - The link types, icons, and regexes for the supported messaging apps
	 * 
	 * @since 0.0.1
	 */
	#linkTypes = {
		// "bluesky": {
		//	 "name": "Bluesky",
		//	 "type": "social",
		//	 "icon": "fas fa-cloud-sun",
		//	 "brand": {
		//		 "color": "#0085FF",
		//	 },
		//	 "regex": /bsky\.app\/profile\/([a-zA-Z0-9_]+)/
		// },
		"discord": {
			"name": "Discord",
			"type": "messaging",
			"icon": "fab fa-discord",
			"brand": {
				"color": "#7289DA",
			},
			"regex": /discord\.com\/invite\/([a-zA-Z0-9_]+)/
		},
		"discord.gg": {
			"name": "Discord",
			"type": "messaging",
			"icon": "fab fa-discord",
			"brand": {
				"color": "#7289DA",
			},
			"regex": /discord\.gg\/([a-zA-Z0-9_]+)/
		},
		"telegram": {
			"name": "Telegram",
			"type": "messaging",
			"icon": "fab fa-telegram",
			"brand": {
				"color": "#0088CC",
			},
			"regex": /t\.me\/([a-zA-Z0-9_]+)/
		},
		"whatsapp": {
			"name": "WhatsApp",
			"type": "messaging",
			"icon": "fab fa-whatsapp",
			"brand": {
				"color": "#25D366",
			},
			"regex": /wa\.me\/([a-zA-Z0-9_]+)/
		},
		"signal": {
			"name": "Signal",
			"type": "messaging",
			"icon": "fab fa-signal",
			"brand": {
				"color": "#3FBF3F",
			},
			"regex": /signal\.org\/([a-zA-Z0-9_]+)/
		},
		"skype": {
			"name": "Skype",
			"type": "messaging",
			"icon": "fab fa-skype",
			"brand": {
				"color": "#00AFF0",
			},
			"regex": /skype\.com\/([a-zA-Z0-9_]+)/
		},
		"snapchat": {
			"name": "Snapchat",
			"type": "messaging",
			"icon": "fab fa-snapchat",
			"brand": {
				"color": "#FFFC00",
			},
			"regex": /snapchat\.com\/add\/([a-zA-Z0-9_]+)/
		},
		"kik": {
			"name": "Kik",
			"type": "messaging",
			"icon": "fab fa-kik",
			"brand": {
				"color": "#1BBE32",
			},
			"regex": /kik\.me\/([a-zA-Z0-9_]+)/
		},
		"line": {
			"name": "Line",
			"type": "messaging",
			"icon": "fab fa-line",
			"brand": {
				"color": "#00C300",
			},
			"regex": /line\.me\/([a-zA-Z0-9_]+)/
		},
		"viber": {
			"name": "Viber",
			"type": "messaging",
			"icon": "fab fa-viber",
			"brand": {
				"color": "#7BB32E",
			},
			"regex": /viber\.com\/([a-zA-Z0-9_]+)/
		},
		"wechat": {
			"name": "WeChat",
			"type": "messaging",
			"icon": "fab fa-weixin",
			"brand": {
				"color": "#7BB32E",
			},
			"regex": /we\.chat\/([a-zA-Z0-9_]+)/
		},
		"irc": {
			"name": "IRC",
			"type": "messaging",
			"icon": "fas fa-comments",
			"brand": {
				"color": "#FFFFFF",
			},
			"regex": /irc:\/\/([a-zA-Z0-9_]+)/
		},
		"email": {
			"name": "Email",
			"type": "messaging",
			"icon": "fas fa-envelope",
			"brand": {
				"color": "#000000",
			},
			"regex": /mailto:([a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)/
		},
		"email_plaintext": {
			"name": "Email",
			"type": "messaging",
			"icon": "fas fa-envelope",
			"brand": {
				"color": "#000000",
			},
			"regex": /([a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)/
		},
		"twitter": {
			"name": "Twitter",
			"type": "social",
			"icon": "fab fa-twitter",
			"brand": {
				"color": "#1DA1F2",
			},
			"regex": /twitter\.com\/([a-zA-Z0-9_]+)/
		},
		"instagram": {
			"name": "Instagram",
			"type": "social",
			"icon": "fab fa-instagram",
			"brand": {
				"color": "#E1306C",
			},
			"regex": /instagram\.com\/([a-zA-Z0-9_]+)/
		},
		"facebook": {
			"name": "Facebook",
			"type": "social",
			"icon": "fab fa-facebook",
			"brand": {
				"color": "#1877F2",
			},
			"regex": /facebook\.com\/([a-zA-Z0-9_]+)/
		},
		"linkedin": {
			"name": "LinkedIn",
			"type": "social",
			"icon": "fab fa-linkedin",
			"brand": {
				"color": "#0077B5",
			},
			"regex": /linkedin\.com\/in\/([a-zA-Z0-9_]+)/
		},
		"tumblr": {
			"name": "Tumblr",
			"type": "social",
			"icon": "fab fa-tumblr",
			"brand": {
				"color": "#36465D",
			},
			"regex": /([a-zA-Z0-9_]+)\.tumblr\.com/
		},
		"twitch": {
			"name": "Twitch",
			"type": "content",
			"icon": "fab fa-twitch",
			"brand": {
				"color": "#6441A4",
			},
			"regex": /twitch\.tv\/([a-zA-Z0-9_]+)/
		},
		"youtube": {
			"name": "YouTube",
			"type": "content",
			"icon": "fab fa-youtube",
			"brand": {
				"color": "#FF0000",
			},
			"regex": /youtube\.com\/([a-zA-Z0-9_]+)/
		},
		"github": {
			"name": "GitHub",
			"type": "content",
			"icon": "fab fa-github",
			"brand": {
				"color": "#333333",
			},
			"regex": /github\.com\/([a-zA-Z0-9_]+)/
		},
		"dribbble": {
			"name": "Dribbble",
			"type": "content",
			"icon": "fab fa-dribbble",
			"brand": {
				"color": "#EA4C89",
			},
			"regex": /dribbble\.com\/([a-zA-Z0-9_]+)/
		},
		"behance": {
			"name": "Behance",
			"type": "content",
			"icon": "fab fa-behance",
			"brand": {
				"color": "#1769FF",
			},
			"regex": /behance\.net\/([a-zA-Z0-9_]+)/
		},
		"artstation": {
			"name": "ArtStation",
			"type": "content",
			"icon": "fas fa-palette",
			"brand": {
				"color": "#13AFF0",
			},
			"regex": /artstation\.com\/([a-zA-Z0-9_]+)/
		},
		"deviantart": {
			"name": "DeviantArt",
			"type": "content",
			"icon": "fab fa-deviantart",
			"brand": {
				"color": "#05CC47",
			},
			"regex": /([a-zA-Z0-9_]+)\.deviantart\.com/
		},
		"furaffinity": {
			"name": "FurAffinity",
			"type": "content",
			"icon": "fas fa-paw",
			"brand": {
				"color": "#FF6600",
			},
			"regex": /furaffinity\.net\/user\/([a-zA-Z0-9_]+)/
		},
		"patreon": {
			"name": "Patreon",
			"type": "content",
			"icon": "fab fa-patreon",
			"brand": {
				"color": "#f96854",
			},
			"regex": /patreon\.com\/([a-zA-Z0-9_]+)/
		},
		"bandcamp": {
			"name": "Bandcamp",
			"type": "content",
			"icon": "fab fa-bandcamp",
			"brand": {
				"color": "#629aa9",
			},
			"regex": /([a-zA-Z0-9_]+)\/.bandcamp\.com/
		},
		"soundcloud": {
			"name": "SoundCloud",
			"type": "content",
			"icon": "fab fa-soundcloud",
			"brand": {
				"color": "#ff7700",
			},
			"regex": /soundcloud\.com\/([a-zA-Z0-9_]+)/
		},
		"onlyfans": {
			"name": "OnlyFans",
			"type": "content",
			"icon": "fas fa-fan",
			"brand": {
				"color": "#fbae00",
			},
			"regex": /onlyfans\.com\/([a-zA-Z0-9_]+)/
		},
		"ko-fi": {
			"name": "Ko-fi",
			"type": "content",
			"icon": "fas fa-coffee",
			"brand": {
				"color": "#f16061",
			},
			"regex": /ko-fi\.com\/([a-zA-Z0-9_]+)/
		},
		"linktree": {
			"name": "Linktree",
			"type": "linkhub",
			"icon": "fas fa-tree",
			"brand": {
				"color": "#39e09b",
			},
			"regex": /linktr\.ee\/([a-zA-Z0-9_]+)/
		},
		"carrd": {
			"name": "Carrd",
			"type": "linkhub",
			"icon": "fas fa-address-card",
			"brand": {
				"color": "#2C2F33",
			},
			"regex": /([a-zA-Z0-9_]+\.carrd\.co)/
		},
	};

	/**
	 * @constant {Object} linkStyles - The link styles for the supported messaging apps
	 * 
	 * @since 0.0.1
	 */
	#linkStyles = {
		"messaging": {
			"default": {
				"color": "#FFFFFF",
				"background": "#2C2F33",
				"border": "#23272A",
			},
			"hover": {
				"color": "#2C2F33",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"social": {
			"default": {
				"color": "#FFFFFF",
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"content": {
			"default": {
				"color": "#FFFFFF",
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"linkhub": {
			"default": {
				"color": "#FFFFFF",
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		}
	};

	/**
	 * @constant {Object} buttonStyles - The button styles for the supported messaging apps
	 * 
	 * @since 0.0.1
	 */
	#buttonStyles = {
		"messaging": {
			"default": {
				"color": "#FFFFFF",
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"social": {
			"default": {
			"color": "#FFFFFF",
			"background": "#7289DA",
			"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"content": {
			"default": {
			"color": "#FFFFFF",
			"background": "#7289DA",
			"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		},
		"linkhub": {
			"default": {
				"color": "#FFFFFF",
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"background": "#FFFFFF",
				"border": "#7289DA"
			}
		}
	};

	/**
	 * @constant {Object} buttonStylesOverrides - Style overrides for specific link types
	 * 
	 * @todo Probably integrate the brand colors into the linkTypes object instead of having a separate object for overrides and just use logic to handle the hover style inversions.
	 * 
	 * @since 0.0.1
	 */
	#buttonStylesOverrides = {
		// "bluesky": {
		// 	"default": {
		// //	 	"color": "rgb(0, 133, 255)",
		// //	 	"background": "#0000",
		// //	 	"border": "#0000",
		// 	},
		//	 "hover": {
		//		 "color": "#fff",
		//		 "background": "#0000",
		//		 "border": "#0000"
		//	 }
		// },
	};

	/**
	 * @method setOptions
	 * @description Sets the options for the script and merges the user's settings with the default options
	 * 
	 * @returns {boolean} result - Whether or not the options were set successfully
	 */
	setOptions() {
		// Stub for now
		return true;
	}

	/**
	 * @method getProfileBio
	 * @description Retrieves the profile bio from the page
	 * 
	 * @param {string} selector - The selector for the profile bio element
	 * 
	 * @returns {object} result				 - The profile bio
	 * @returns {element} result.element		- The profile bio element
	 * @returns {string} result.text			- The profile bio text
	 * @returns {string} result.html			- The profile bio html
	 * @returns {object} result.links			- The profile bio links array
	 * @returns {string} result.links.url			- The profile bio link url
	 * @returns {string} result.links.text			- The profile bio link text
	 * @returns {element} result.links.element		- The profile bio link element
	 * 
	 * @since 0.0.1
	 * 
	 * @todo Refactor the default selector to be a constant
	 */
	#getProfileBio( selector = "[data-testid='profileHeaderDescription']" ) {
		// Get all the profile bio elements
		let bio = document.querySelectorAll(selector);

		// Check which element is currently visible
		bio.forEach(element => {
			if (element.offsetParent !== null) {
				bio = element;
				return;
			}
		});

		// Return false if no profile bio element was found
		if (!bio || bio.length < 1) {
			return false;
		}

		// Create the result object
		let result = {
			element: bio,
			text: bio.innerText,
			html: bio.innerHTML,
			links: []
		};

		// Get the links from the profile bio
		let links = bio.querySelectorAll("a");

		// Add the links to the result object
		links.forEach(link => {
			result.links.push({
				url: link.href,
				text: link.innerText,
				element: link
			});
		});

		// Return the result object
		return result;
	}

	/**
	 * @method formatProfileBio
	 * @description Formats the profile bio html to include markup for the inline links with icons.
	 * 
	 * @param {object} bio				- (See: function getProfileBio) The profile bio object
	 * @param {object} linkTypes		- (See: const linkTypes) The link types, icons, and regexes for the supported messaging apps
	 *
	 * @returns {string} result			- The formatted profile bio html
	 * 
	 * @since 0.0.1
	 */
	#formatProfileBio(bio, args = {linkTypes: this.#linkTypes, linkStyles: this.#linkStyles, linkStylesOverrides: this.#buttonStylesOverrides}) {
		// Get the arguments
		let linkTypes		 		= args.linkTypes			|| this.#linkTypes;
		let linkStyles				= args.linkStyles			|| this.#linkStyles;
		let linkStylesOverrides		= args.linkStylesOverrides	|| this.#buttonStylesOverrides;

		// Create the result string
		let result = bio.html;

		// Loop through the links in the profile bio
		bio.links.forEach(link => {
			// Loop through the link types
			for (const [key, value] of Object.entries(linkTypes)) {
				// Check if the link matches the link type regex
				if (link.url.match(value.regex)) {
					// Get the link brand color
					let linkColor = value.brand.color;
					
					// Get the link style for the link type
					let linkStyle = linkStyles[value.type];

					// Override the linkStyle colors with the link brand color
					linkStyle.default.background = linkColor;
					linkStyle.default.border = linkColor;
					linkStyle.hover.color = linkColor;
					linkStyle.hover.border = linkColor;

					// Check if the link type has a style override
					if (linkStylesOverrides[key]) {		//TODO: Create a linkStylesOverrides object for this instead of using buttonStylesOverrides
						linkStyle.default 	= Object.assign({}, linkStyle.default, linkStylesOverrides[key].default);
						linkStyle.hover 	= Object.assign({}, linkStyle.hover, linkStylesOverrides[key].hover);
					}

					// Get the existing link element and its attributes
					let linkOriginal = link.element;
					let linkAttributes = linkOriginal.attributes;

					// Create the hyperlink element
					let hyperlink = document.createElement("a");

					hyperlink.setAttribute("data-bsky-e", `profile-link-${key}`);

					// Add the link attributes to the hyperlink element
					for (let i = 0; i < linkAttributes.length; i++) {
						hyperlink.setAttribute(linkAttributes[i].name, linkAttributes[i].value);
					}

					// Add the link style to the hyperlink element
					let originalStyle = linkOriginal.getAttribute("style");
					let newStyle = `
						color: ${linkStyle.default.color}; background: ${linkStyle.default.background}; border: 1px solid ${linkStyle.default.border}; border-radius: 0.5em;
						padding: 0.05em 0.2em; margin: 0 4px 4px 1px; text-decoration: none; font-size: 0.8em; font-weight: 600; display: inline-block; 
						transition: all 0.2s ease-in-out; white-space: nowrap;`;
					hyperlink.setAttribute("style", `${originalStyle}; ${newStyle}`);

					// Add the hover event styles to the hyperlink element
					hyperlink.setAttribute("onmouseover", `this.style.color='${linkStyle.hover.color}'; this.style.background='${linkStyle.hover.background}'; this.style.border='1px solid ${linkStyle.hover.border}';`);
					hyperlink.setAttribute("onmouseout", `this.style.color='${linkStyle.default.color}'; this.style.background='${linkStyle.default.background}'; this.style.border='1px solid ${linkStyle.default.border}';`);

					// Add the link icon to the hyperlink element
					let icon = document.createElement("i");
					icon.setAttribute("class", value.icon);
					icon.setAttribute("style", "margin-right: 4px;");
					hyperlink.appendChild(icon);

					// Add the link text to the hyperlink element
					let text = document.createTextNode(link.text);
					hyperlink.appendChild(text);

					// Add the link title to the hyperlink element
					hyperlink.setAttribute("title", value.name);

					// Replace the existing link element with the hyperlink element
					result = result.replace(linkOriginal.outerHTML, hyperlink.outerHTML);

					// Break out of the loop
					break;
				}
			}
		});

		// Return the result string
		return result;
	}

	/**
	 * @method insertProfileBio
	 * @description Inserts the formatted profile bio html into the page
	 * 
	 * @param {string} element		- The profile bio element
	 * @param {string} formattedBio	- The formatted profile bio html
	 * 
	 * @returns {boolean} result	- Whether or not the profile bio was inserted successfully
	 * 
	 * @since 0.0.1
	 */
	#insertProfileBio(element, formattedBio) {
		// Get the profile bio element
		let bio = element;

		// Check if the profile bio element exists
		if (bio && bio.innerHTML !== formattedBio && !bio.attributes["data-bsky-e"]) {
			// Insert the formatted profile bio html into the page
			bio.innerHTML = formattedBio;

			bio.setAttribute("data-bsky-e", "profile-bio");

			// Return true
			return true;
		}

		// Return false
		return false;
	}

	/**
	 * @method formatProfileButtons
	 * @description Formats the buttons to add to the profile page's header button group
	 * 
	 * @param {object} bio				- (See: function getProfileBio) The profile bio object
	 * @param {object} linkTypes		- (See: const linkTypes) The link types, icons, and regexes for the supported messaging apps
	 * @param {object} buttonStyles		- (See: const buttonStyles) The button styles for the supported messaging apps
	 * 
	 * @returns {string} result			- The formatted profile buttons html
	 * 
	 * @since 0.0.1
	 */
	#formatProfileButtons( bio, args = {linkTypes: this.#linkTypes, buttonStyles: this.#buttonStyles, buttonStylesOverrides: this.#buttonStylesOverrides} ) {
		// Get the arguments
		let linkTypes		 		= args.linkTypes				|| this.#linkTypes;
		let buttonStyles			= args.buttonStyles				|| this.#buttonStyles;
		let buttonStylesOverrides	= args.buttonStylesOverrides	|| this.#buttonStylesOverrides;

		// Create the result DOM element array
		let result = [];

		// Loop through the links in the profile bio
		bio.links.forEach(link => {
			// Loop through the link types
			for (const [key, value] of Object.entries(linkTypes)) {
				// Check if the link matches the link type regex
				if (link.url.match(value.regex)) {
					// Check if the link type is in the button types array and continue if it isn't
					if (!this.#options.buttonTypes.includes(value.type)) {
						break;
					}

					// Get the button style for the link type
					let buttonStyle = buttonStyles[value.type];

					// Check if the link type has a style override
					if (buttonStylesOverrides[key]) {
						buttonStyle.default = Object.assign({}, buttonStyle.default, buttonStylesOverrides[key].default);
						buttonStyle.hover 	= Object.assign({}, buttonStyle.hover, buttonStylesOverrides[key].hover);
					}

					// Create the button element
					let button = document.createElement("button");

					button.setAttribute("data-bsky-e", `profile-button-${key}`);

					// Add the button attributes to the button element
					button.setAttribute("title", `${value.name} - ${link.text}`);
					button.setAttribute("aria-label", `${value.name} - ${link.text}`);
					button.setAttribute("onclick", `window.open('${link.url}', '_blank');`);
					button.setAttribute("style", `
						color: ${buttonStyle.default.color}; background: ${buttonStyle.default.background}; border: 1px solid ${buttonStyle.default.border}; border-radius: 2em;
						aspect-ratio: 1; height: 100%; margin: 0 4px; text-decoration: none; font-size: 0.8em; font-weight: 600; display: block;
						transition: all 0.2s ease-in-out; white-space: nowrap; cursor: pointer;`);

					// Add the hover event styles to the button element
					button.setAttribute("onmouseover", `this.style.color='${buttonStyle.hover.color}'; this.style.background='${buttonStyle.hover.background}'; this.style.border='1px solid ${buttonStyle.hover.border}';`);
					button.setAttribute("onmouseout", `this.style.color='${buttonStyle.default.color}'; this.style.background='${buttonStyle.default.background}'; this.style.border='1px solid ${buttonStyle.default.border}';`);

					// Add the button icon to the button element
					let icon = document.createElement("i");
					icon.setAttribute("class", value.icon);
					button.appendChild(icon);

					// // Add the button text to the button element
					// let text = document.createTextNode(link.text);
					// button.appendChild(text);
					
					// Add the button to the result array
					result.push(button);

					// Break out of the loop
					break;
				}
			}
		});

		// Return the result string
		return result;
	}

	/**
	 * @method insertProfileButtons
	 * @description Inserts the formatted profile buttons html into the page
	 * 
	 * @param {string} element		  	- The profile bio element
	 * @param {string} formattedButtons	- The formatted profile buttons html
	 * 
	 * @returns {boolean} result		- Whether or not the profile buttons were inserted successfully
	 * 
	 * @since 0.0.1
	 */
	#insertProfileButtons(element, formattedButtons) {
		// Get the profile bio element
		let bio = element;

		// Check if the profile bio element exists
		if (!bio) {
			return false;
		}

		// Get the profile header element
		let header = bio.closest("[data-testid='profileView']");

		// Get the profile header button group element
		let buttonGroup = header.querySelector('[role="button"]').parentElement;

		// Check if the profile header button group element exists
		if (!buttonGroup) {
			return false;
		}

		// Insert the formatted profile buttons html into the page
		formattedButtons.forEach(button => {
			// Check if the button already exists
			if (buttonGroup.querySelector(`[title="${button.title}"]`)) { // TODO: Implement a check for existing buttons that doesn't rely on checking the DOM
				return;
			}

			buttonGroup.prepend(button);
		});

		return true;
	}

	/**
	 * @method isProfilePage
	 * @description Checks if the current page is a profile page
	 * 
	 * @returns {boolean} result		- Whether or not the current page is a profile page
	 * 
	 * @since 0.0.1
	 */
	isProfilePage() {
		// Get the current page url
		let url = window.location.href;

		// Check if the current page url matches the profile page url (/profile/*)
		if (url.match(/\/profile\/([a-zA-Z0-9_]+)/)) {
			return true;
		}

		return false;
	}

	/**
	 * @method runProfilePage
	 * @description Runs the script on the profile page
	 * 
	 * @since 0.0.1
	 */
	runProfilePage() {
		// Check if the current page is a profile page
		if (!this.isProfilePage()) {
			return;
		}

		// Get the profile bio
		let bio = this.#getProfileBio();

		// Check if the profile bio exists
		if (!bio) {
			return false;
		}

		// Check if the profile bio has any links
		if (bio.links.length > 0) {
			// Format the profile bio
			let formattedBio = this.#formatProfileBio( bio, {linkTypes: this.#linkTypes, linkStyles: this.#linkStyles} );

			// Insert the formatted profile bio
			this.#insertProfileBio( bio.element, formattedBio );

			// Format the profile buttons
			let formattedButtons = this.#formatProfileButtons( bio, {linkTypes: this.#linkTypes, buttonStyles: this.#buttonStyles, buttonStylesOverrides: this.#buttonStylesOverrides} );

			// Insert the formatted profile buttons
			this.#insertProfileButtons( bio.element, formattedButtons );
		}

		// Parse emojis
		BSKY_E_E.parseEmojis( bio.element );
	}


	/**
	 * @method init
	 * @description Intialize the script and binds it to the navigate event
	 * 
	 * @since 0.0.1
	 */
	init() {
		// Run the script on page load
		this.runProfilePage();

		document.addEventListener("DOMContentLoaded", () => {
			console.log("DOMContentLoaded");
			this.runProfilePage();
		});

		// Bind the script to the navigate event
		window.addEventListener("navigate", () => {
			console.log("navigate");
			this.runProfilePage();
		});

		// Bind the script to the popstate event
		window.addEventListener("popstate", () => {
			console.log("popstate");
			this.runProfilePage();
		});

		// Bind the script to the DOMNodeInserted event
		document.addEventListener( "DOMNodeInserted", _.debounce((e) => {
			if (window.pause_event !== true) {
				// Avoid infinite loops, don't run on the script's own elements
				if (e.relatedNode && e.relatedNode.closest && e.relatedNode.closest("[data-bsky-e]")) {
					return;
				}

				// Run the script on page load
				this.runProfilePage();
			}
		}, 20));
	}

	/**
	 * @constructor
	 * @description The constructor for the class
	 * 
	 * @since 0.0.1
	 */
	constructor() {
		// Set the options for the script
		this.setOptions();

		// Initialize the script
		this.init();
	}
}

/***********************************************/ // TODO: Split off into separate files eventually after we get multi class working properly

/**
 * @class BSKY_Ext_Imports
 * @description Adds external dependencies to the page
 * 
 * @since 0.0.2
 */
class BSKY_Ext_Imports {
	/**
	 * @constant {Array} externalResources - The external resources for the script
	 * 
	 * @since 0.0.1
	 */
	#externalResources = [
		{
			"type": "stylesheet",
			"src": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
		},
		{
			"type": "script",
			"src": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js",
		}
	];

	/**
	 * @method loadExternalResources
	 * @description Loads external resources for the script
	 * @uses FontAwesome (https://fontawesome.com/)
	 * 
	 * @since 0.0.1
	 */
	#loadExternalResources( args = { externalResources: this.#externalResources } ) {
		// Get the arguments
		let externalResources = args.externalResources || this.#externalResources;

		// Create the resources array to put the elements in that will be added to the head
		let resources = [];

		// Loop through the external resources
		externalResources.forEach( resource => {
			switch ( resource.type ) {
				case "stylesheet":
					let stylesheet = document.createElement( "link" );
					stylesheet.setAttribute( "rel", "stylesheet" );
					stylesheet.setAttribute( "href", resource.src );
					
					if (resource.attributes) {
						Object.entries( resource.attributes ).forEach( attribute => {
							script.setAttribute( attribute[0], attribute[1] );
						});
					}

					resources.push(stylesheet);
					break;
				case "style":
					let style = document.createElement( "style" );
					style.setAttribute( "type", "text/css" );
					style.innerHTML = resource.content;
					
					if (resource.attributes) {
						Object.entries( resource.attributes ).forEach( attribute => {
							script.setAttribute( attribute[0], attribute[1] );
						});
					}

					resources.push( style );
					break;
				case "script":
					let script = document.createElement( "script" );
					script.setAttribute( "src", resource.src) ;
					
					if (resource.attributes) {
						Object.entries( resource.attributes ).forEach( attribute => {
							script.setAttribute( attribute[0], attribute[1] );
						});
					}

					resources.push( script );
					break;
				default:
					break;
			}
		});

		// Add the resources to the head
		resources.forEach( resource => {
			document.head.appendChild( resource );
		});

		return true;
	}

	/**
	 * @method addExternalResource
	 * @description Adds an external resource to the script
	 * 
	 * @param {object | array} resource		- The external resource to add to the script
	 * 
	 * @returns {boolean} result			- Whether or not the external resource was added successfully
	 * 
	 * @since 0.0.2
	 */
	addExternalResource( resources ) {
		// Check if the resource is an array or object, and if it's an object, convert it to an array containing the object
		if (typeof resources === "object" && !Array.isArray( resources )) {
			resources = [ resource ];
		}

		// Check if each resource is valid
		resources.forEach( resource => {
			if ( !resource.type || ( !resource.src && !resource.content ) ) {
				// remove the invalid resource from the array
				resources.splice( resources.indexOf( resource ), 1 );

				return false;
			}
		});

		// Add the resources to the external resources array
		this.#externalResources = this.#externalResources.concat( resources );

		// Load the external resource
		this.#loadExternalResources({ externalResources: resources });

		return true;
	}

	/**
	 * @constructor
	 * 
	 * @since 0.0.2
	 */
	constructor( args = {externalResources: this.#externalResources, merge: false} ) {
		// Get the arguments
		let merge = args.merge || false;

		// Check if the external resources should be merged with the default resources or not
		if (merge) {
			this.#externalResources = Object.assign({}, this.#externalResources, args.externalResources);
		} else {
			this.#externalResources = args.externalResources || this.#externalResources;
		}

		// Load external resources
		this.#loadExternalResources();
	}
}

/***********************************************/

/**
 * @class BSKY_Ext_Emojis
 * @description Implements alternate emoji styles for Bluesky
 * 
 * @since 0.0.2
 */

class BSKY_Ext_Emojis {
	/**
	 * @constructor
	 * 
	 * @since 0.0.2
	 */
	constructor() {
		// Stub for now
		this.#init();

		// Set the CSS for the .emoji class
		this.#setCSS();

		// Load external emojis
		this.#loadExternalEmojis();
	}

	/**
	 * @method init
	 * @description Intialize the script and binds it to the DOMNodeInserted event
	 *
	 * @since 0.0.2
	 */
	#init() {
		// Array of data-testid values related to pages
		let pageSelectors = [
			"[data-testid='profileView']",
			"[data-testid*='followingFeedPage']",
			"[data-testid='customFeedPage']",
			"[data-testid='notificationsScreen']",
			"[data-testid*='postThreadItem-']",
		];

		// Bind the script to the DOMNodeInserted event
		document.addEventListener("DOMNodeInserted", (e) => {
			// Check if the element is a page element or contains a page element selector
			if ( e.target.dataset && e.target.dataset.testid && pageSelectors.includes( e.target.dataset.testid ) ) {
				// console.log( 'target match: ', e.target );
				this.parseInChildren( e.target, { selector: "[data-testid='postContent']" } );
			} else if ( e.target.children && e.target.children.length > 0 && e.target.querySelector( pageSelectors.join(",") ) ) {
				// console.log( 'closest match: ', e.target.querySelector( pageSelectors.join(",") ) );
				this.parseInChildren( e.target, { selector: "[data-testid='postContent']" } );
			}

			// Check which page selector is currently visible
			pageSelectors.forEach( selector => {
				let page = document.querySelector( selector );

				if ( page && page.offsetParent !== null ) {
					// console.log( 'current page match: ', selector );
					this.parseInChildren( page );
				}
			});
		});
	}

	/**
	 * @method loadExternalEmojis
	 * @description Loads external emojis for the script
	 * 
	 * @since 0.0.2
	 */
	#loadExternalEmojis() {
		BSKY_E_I.addExternalResource(
		[
			{
				"type": "script",
				"src": "https://unpkg.com/twemoji@14.0.2/dist/twemoji.min.js",
				"attributes": {
					"crossorigin": "anonymous",
				}
			}
		]);
	}

	/**
	 * @method parseEmojis
	 * @description Formats the emojis to use the external emojis
	 * 
	 * @param {element | string} element		- The element or string to format the emojis in
	 * 
	 * @return {element | string} result		- The formatted element or string matching the type of the element passed in
	 * 
	 * @since 0.0.2
	 */
	parseEmojis( element ) {
		let type = typeof element;
		// Create a temporary div element to push the element into if a string was passed in
		if ( typeof element === "string" ) {
			let x = document.createElement( "div" );
			x.innerHTML = element;
			element = x;
		}

		// Parse the emojis in the element if it has unicode emojis and isn't already parsed
		if ( this.#hasUnicodeEmoji( element ) && !this.#hasTwemoji( element ) ) {
			twemoji.parse( element );
		}

		// Return the element or string
		if ( type === "string" ) {
			return element.innerHTML;
		}

		return element;
	}

	/**
	 * @method parseInChildren
	 * @description Parses the emojis in the element's children
	 * 
	 * @param {element} element		- The element to parse the emojis in
	 * @param {object} args			- The arguments for the function
	 * @param {string} args.selector	- The selector for the element's children to parse
	 * @param {boolean} args.recursive	- Whether or not to recursively parse the element's children
	 * 
	 * @since 0.0.2
	 */
	parseInChildren( element, args = { selector: false, recursive: false } ) {
		// Get the arguments
		let selector 	= args.selector 	|| false;
		let recursive 	= args.recursive 	|| false;
		
		// Get the element's children
		let children = element.children;

		// Check if the element has children
		if ( !children || children.length < 1 ) {
			return false;
		}

		// Loop through the element's children
		for ( let i = 0; i < children.length; i++ ) {
			// Get the child
			let child = children[i];

			// If a selector was passed in. Check if the child doesn't match the selector and return if it doesn't
			if ( selector && !child.matches( selector ) ) {
				// Check the child's children if recursive is true
				if ( recursive ) {
					this.parseInChildren( child, args );
				}

				return;
			}

			// Check if the child has unicode emojis
			if ( this.#hasUnicodeEmoji( child ) ) {
				// Parse the child's emojis
				this.parseEmojis( child );
			}
		}

		return true;
	}

	/**
	 * @method hasUnicodeEmoji
	 * @description Checks if the element has (unicode) emojis
	 * 
	 * @param {element | string} element		- The element or string to check for emojis
	 * 
	 * @returns {boolean} result	- Whether or not the element has emojis
	 * 
	 * @since 0.0.2
	 */
	#hasUnicodeEmoji( element ) {
		// Create a temporary div element to push the element into if a string was passed in
		if ( typeof element === "string" ) {
			let x = document.createElement( "div" );
			x.innerHTML = element;
			element = x;
		}

		// Check if the element has unicode emojis
		if ( element.innerText.match( /[\u{1F000}-\u{1FFFF}]/u ) ) {
			return true;
		}

		return false;
	}

	/**
	 * @method hasTwemoji
	 * @description Checks if the element has twemojis
	 * 
	 * @param {element | string} element		- The element or string to check for twemojis
	 * 
	 * @returns {boolean} result		- Whether or not the element has twemojis
	 * 
	 * @since 0.0.2
	 */
	#hasTwemoji( element ) {
		// Create a temporary div element to push the element into if a string was passed in
		if ( typeof element === "string" ) {
			let x = document.createElement( "div" );
			x.innerHTML = element;
			element = x;
		}

		// Check if the element has twemojis
		if ( element.querySelector( "img.emoji" ) ) {
			return true;
		}

		return false;
	}

	/**
	 * @method setCSS
	 * @description Sets the CSS for the .emoji class
	 * 
	 * @since 0.0.2
	 */
	#setCSS() {
		// Create the CSS string
		let css = `
			img.emoji {
				height: 1.2em;
				line-height: 1em;
				vertical-align: -20%;
			}
		`;

		// Load the CSS into a style element
		BSKY_E_I.addExternalResource([
			{
				"type": "style",
				"content": css
			}
		]);

		return true;
	}
}

/***********************************************/

/**
 * @class BSKY_Ext_API_Intercept
 * @description Intercepts API XHR requests and responses to parse them before they are rendered
 * 
 * @uses xhook (https://github.com/jpillora/xhook)
 * 
 * @since 0.0.3
 */
class BSKY_Ext_API_Intercept {
	/**
	 * @property {object} xhook
	 * @description The xhook object
	 * 
	 * @since 0.0.3
	 */
	#xhook = xhook;

	/**
	 * @constant {array} apiEndpoints
	 * @description The API endpoints for the script to intercept as well as the paths to the data in the response
	 * 
	 * @since 0.0.3
	 */
	#apiEndpoints = {
		"app.bsky.actor.getProfile": {
			"fields": {
				"displayName": {
					"location": "displayName",
				},
				"description": {
					"location": "description",
				},
			},
		},
		"app.bsky.feed.getAuthorFeed": {
			"fields": {
				"post_displayName": {
					"location": "feed[i].post.author.displayName",
				},
				"post_content": {
					"location": "feed[i].post.record.text",
				},
			},
		},
		"app.bsky.feed.getTimeline": {
			"fields": {
				"post_displayName": {
					"location": "feed[i].post.author.displayName",
				},
				"post_content": {
					"location": "feed[i].post.record.text",
				},
			},
		},
		"app.bsky.feed.getFeed": {
			"fields": {
				"post_displayName": {
					"location": "feed[i].post.author.displayName",
				},
				"post_content": {
					"location": "feed[i].post.record.text",
				},
			},
		},
		"app.bsky.feed.getPostThread": {
			"fields": {
				"post_displayName": {
					"location": "thread.post.author.displayName",
				},
				"post_content": {
					"location": "thread.post.record.text",
				},
				"parent_displayName": {
					"location": "thread.parent.post.author.displayName",
				},
				"parent_content": {
					"location": "thread.parent.post.record.text",
				},
				"reply_displayName": {
					"location": "thread.replies[i].post.author.displayName",
				},
				"reply_content": {
					"location": "thread.replies[i].post.record.text",
				},
			},
		}
	};

	/**
	 * @constructor
	 * 
	 * @param {object} args	- The arguments for the class
	 * 
	 * @since 0.0.3
	 */
	constructor( args = {} ) {
		// Initialize the script
		this.init();
	}

	/**
	 * @method init
	 * @description Intialize the script
	 * 
	 * @since 0.0.3
	 */
	init() {
		const apiEndpointURLsArray = Object.keys( this.#apiEndpoints );

		// Bind the script to the xhook before event
		this.#xhook.after( (request, response) => {
			// Get the request API endpoint from the request url by taking the part after the last slash and before the question mark
			let requestAPIEndpointURL = request.url.split("/").pop().split("?")[0];
			
			// Check if the request url matches any of the api endpoints
			if ( apiEndpointURLsArray.includes( requestAPIEndpointURL ) ) {
				console.log( `requestAPIEndpointURL: ${requestAPIEndpointURL}` )
				this.#parseResponse( response, { apiEndpointURL: requestAPIEndpointURL } );
			}
		});
	}

	/**
	 * @method parseResponse
	 * @description Parses the response
	 * 
	 * @param {object} response				- The response to parse
	 * @param {object} args 				- The arguments for the function
	 * @param {string} args.apiEndpointURL	- The API endpoint URL
	 * @param {object} args.fields			- The fields to parse from the response item
	 * @param {function} args.parser		- The parser function to use to parse the response item
	 * 
	 * @returns {object} result			- The parsed response
	 * 
	 * @since 0.0.3
	 */
	#parseResponse( response, args = { fields: {}, parser: false } ) {
		// Get the arguments
		let apiEndpointURL 	= args.apiEndpointURL 	|| false;
		let fields 			= args.fields 			|| this.#apiEndpoints[apiEndpointURL].fields;
		let parser 			= args.parser 			|| (() => {});

		// Check if the response is valid
		if ( !response ) {
			return false;
		}

		// Find the fields in the response
		Object.entries( fields ).forEach( ([key, value]) => {
			console.log( 1, `key: ${key}, value: `, value );
			let fieldName = key;
			let fieldLocation = value.location;
			let fieldLocationArray = fieldLocation.split(".");
			let fieldLocationIterator = 0;

			// Check if the field location is valid
			if ( !fieldLocation ) {
				return false;
			}

			// Check if the field location has an array index
			for ( let i = 0; i < fieldLocationArray.length; i++ ) {
				let fieldLocationArrayItem = fieldLocationArray[i];
				
				if ( fieldLocationArrayItem.match(/\[i\]/) ) {
					// Get the index of the field location array item
					fieldLocationIterator = i;

					// Remove the array index from the field location array item
					fieldLocationArray[i] = fieldLocationArrayItem.replace(/\[i\]/, "");

					// Stop the loop
					break;
				}
			}

			console.log( 2, `fieldLocation: ${fieldLocation}, fieldLocationIterator: ${fieldLocationIterator}` );

			// Iterate through the field location array at the index of the field location iterator
			let fieldValue = response.data || response;

			if ( fieldLocationIterator > 0 ) {
				let fieldLocationArrayIteratorSubset = fieldLocationArray.slice( fieldLocationIterator );

				console.log( 3, `fieldLocationArrayIteratorSubset: `, fieldLocationArrayIteratorSubset );

				// Get the array at the field location
				fieldValueList = fieldLocationArrayIteratorSubset.reduce( (accumulator, currentValue) => {
					return accumulator[currentValue];
				}, fieldValue );

				console.log( 4, `fieldValueList: `, fieldValueList );

				// // Iterate through the array at the field location
				// fieldValueList.forEach( (fieldValueListItem, index) => {
				// 	// Parse the field value
				// 	parser( fieldValueListItem );

				// 	// Transform to allcaps
				// 	fieldValue = fieldValue.toUpperCase();
				// });
			} else {
				
				console.log( 5, `fieldValue: `, fieldValue );

				// // Get the field value from the field location
				// fieldValue2 = fieldLocationArray.reduce( (accumulator, currentValue) => {
				// 	return accumulator[currentValue];
				// }, fieldValue );

				// // Parse the field value
				// parser( fieldValue );

				// // Transform to allcaps
				// fieldValue = fieldValue.toUpperCase();
			}



			// // Check if the field value is valid
			// if ( !fieldValue ) {
			// 	return false;
			// }

			// // Parse the field value
			// parser( fieldValue );

			// // Transform to allcaps
			// fieldValue = fieldValue.toUpperCase();
		});

		return true;
	}

	/**
	 * @method getAPIEndpoints
	 * @description Gets the API endpoints
	 * 
	 * @returns {object} result	- The API endpoints
	 * 
	 * @since 0.0.3
	 */
	getAPIEndpoints() {
		return this.#apiEndpoints;
	}

	/**
	 * @method setAPIEndpoints
	 * @description Sets the API endpoints
	 * 
	 * @param {object} apiEndpoints	- The API endpoints to set
	 * 
	 * @returns {boolean} result		- Whether or not the API endpoints were set successfully
	 * 
	 * @since 0.0.3
	 */
	setAPIEndpoints( apiEndpoints ) {
		// Check if the API endpoints are valid
		if ( typeof apiEndpoints !== "object" ) {
			return false;
		}

		// Set the API endpoints
		this.#apiEndpoints = apiEndpoints;

		return true;
	}

	/**
	 * @method addAPIEndpoint
	 * @description Adds an API endpoint
	 * 
	 * @param {string} endpoint		- The API endpoint to add
	 * @param {object} fields		- The fields to parse from the response item
	 * @param {string} fields.location	- The location of the field in the response item
	 * 
	 * @returns {boolean} result	- Whether or not the API endpoint was added successfully
	 * 
	 * @since 0.0.3
	 */
	addAPIEndpoint( endpoint, fields ) {
		// Check if the endpoint is valid
		if ( typeof endpoint !== "string" ) {
			return false;
		}

		// Check if the fields are valid
		if ( typeof fields !== "object" ) {
			return false;
		}

		// Add the endpoint to the API endpoints
		this.#apiEndpoints[endpoint] = fields;

		return true;
	}

	/**
	 * @method removeAPIEndpoint
	 * @description Removes an API endpoint
	 * 
	 * @param {string} endpoint		- The API endpoint to remove
	 *
	 * @returns {boolean} result	- Whether or not the API endpoint was removed successfully
	 * 
	 * @since 0.0.3
	 */
	removeAPIEndpoint( endpoint ) {
		// Check if the endpoint is valid
		if ( typeof endpoint !== "string" ) {
			return false;
		}

		// Remove the endpoint from the API endpoints
		delete this.#apiEndpoints[endpoint];

		return true;
	}

	/**
	 * @method storeAPIEndpoints
	 * @description Stores the API endpoints in local storage
	 * 
	 * @returns {boolean} result	- Whether or not the API endpoints were stored successfully
	 * 
	 * @since 0.0.3
	 */
	storeAPIEndpoints() {
		// Stub for now
		return true;
	}

	/**
	 * @method loadAPIEndpoints
	 * @description Loads the API endpoints from local storage
	 * 
	 * @returns {boolean} result	- Whether or not the API endpoints were loaded successfully
	 */
	loadAPIEndpoints() {
		// Stub for now
		return true;
	}
}

/***********************************************/

/**
 * @class UnderscoreJS
 * @description Select Underscore.js functions
 * 
 * @since 0.0.2
 */
class UnderscoreJS {
	/**
	 * _.js throttle function
	 * @source https://underscorejs.org/docs/modules/throttle.html
	 */
	throttle(func, wait, options) {
		var timeout, context, args, result;
		var previous = 0;
		if (!options) options = {};

		var later = function() {
			previous = options.leading === false ? 0 : new Date().getTime();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		var throttled = function() {
			var _now = new Date().getTime();
			if (!previous && options.leading === false) previous = _now;
			var remaining = wait - (_now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = _now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};

		throttled.cancel = function() {
			clearTimeout(timeout);
			previous = 0;
			timeout = context = args = null;
		};

		return throttled;
	}

	/**
	 * _.js Debounce function
	 * @source https://underscorejs.org/docs/modules/debounce.html
	 */
	debounce(func, wait, immediate) {
		var timeout, previous, args, result, context;

		var later = function() {
			var passed = new Date().getTime() - previous;
			if (wait > passed) {
				timeout = setTimeout(later, wait - passed);
			} else {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
				if (!timeout) args = context = null;
			}
		};

		var debounced = this.#restArguments(function(_args) {
			context = this;
			args = _args;
			previous = new Date().getTime();
			if (!timeout) {
				timeout = setTimeout(later, wait);
				if (immediate) result = func.apply(context, args);
			}
			return result;
		});

		debounced.cancel = function() {
			clearTimeout(timeout);
			timeout = args = context = null;
		};

		return debounced;
	}

	/**
	 * _.js restArguments function
	 * @source https://underscorejs.org/docs/modules/restArguments.html
	 */
	#restArguments(func, startIndex) {
		startIndex = startIndex == null ? func.length - 1 : +startIndex;
		return function() {
			var length = Math.max(arguments.length - startIndex, 0),
				rest = Array(length),
				index = 0;
			for (; index < length; index++) {
				rest[index] = arguments[index + startIndex];
			}
			switch (startIndex) {
				case 0: return func.call(this, rest);
				case 1: return func.call(this, arguments[0], rest);
				case 2: return func.call(this, arguments[0], arguments[1], rest);
			}
			var args = Array(startIndex + 1);
			for (index = 0; index < startIndex; index++) {
				args[index] = arguments[index];
			}
			args[startIndex] = rest;
			return func.apply(this, args);
		};
	}
}

/***********************************************/

const BSKY_E_A = new BSKY_Ext_API_Intercept();

const _ = new UnderscoreJS();
const BSKY_E_I = new BSKY_Ext_Imports();
const BSKY_E_E = new BSKY_Ext_Emojis();
const BSKY_E_P = new BSKY_Ext_Profiles();