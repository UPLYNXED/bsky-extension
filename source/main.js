/**
 * @project Bluesky Extension
 * @description A simple script to add buttons for popular messaging apps to profile pages on Bluesky.
 * @website https://github.com/UPLYNXED/bsky-extension
 * @license MIT
 * @version 0.0.1
 * 
 * @author Avelyn "UPLYNXED" Neervoort
 * @contact https://uplynxed.valk.cam/
 * 
 * @fileoverview Main js file for the project
 * @created 2023-07-26
 * @lastModified 2023-07-26
 */

// Path: source\main.js

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
		//	 "regex": /bsky\.app\/profile\/([a-zA-Z0-9_]+)/
		// },
		"discord": {
			"name": "Discord",
			"type": "messaging",
			"icon": "fab fa-discord",
			"regex": /discord\.com\/invite\/([a-zA-Z0-9_]+)/
		},
		"telegram": {
			"name": "Telegram",
			"type": "messaging",
			"icon": "fab fa-telegram",
			"regex": /t\.me\/([a-zA-Z0-9_]+)/
		},
		"whatsapp": {
			"name": "WhatsApp",
			"type": "messaging",
			"icon": "fab fa-whatsapp",
			"regex": /wa\.me\/([a-zA-Z0-9_]+)/
		},
		"signal": {
			"name": "Signal",
			"type": "messaging",
			"icon": "fab fa-signal",
			"regex": /signal\.org\/([a-zA-Z0-9_]+)/
		},
		"skype": {
			"name": "Skype",
			"type": "messaging",
			"icon": "fab fa-skype",
			"regex": /skype\.com\/([a-zA-Z0-9_]+)/
		},
		"snapchat": {
			"name": "Snapchat",
			"type": "messaging",
			"icon": "fab fa-snapchat",
			"regex": /snapchat\.com\/add\/([a-zA-Z0-9_]+)/
		},
		"kik": {
			"name": "Kik",
			"type": "messaging",
			"icon": "fab fa-kik",
			"regex": /kik\.me\/([a-zA-Z0-9_]+)/
		},
		"line": {
			"name": "Line",
			"type": "messaging",
			"icon": "fab fa-line",
			"regex": /line\.me\/([a-zA-Z0-9_]+)/
		},
		"viber": {
			"name": "Viber",
			"type": "messaging",
			"icon": "fab fa-viber",
			"regex": /viber\.com\/([a-zA-Z0-9_]+)/
		},
		"wechat": {
			"name": "WeChat",
			"type": "messaging",
			"icon": "fab fa-weixin",
			"regex": /we\.chat\/([a-zA-Z0-9_]+)/
		},
		"irc": {
			"name": "IRC",
			"type": "messaging",
			"icon": "fas fa-comments",
			"regex": /irc:\/\/([a-zA-Z0-9_]+)/
		},
		"email": {
			"name": "Email",
			"type": "messaging",
			"icon": "fas fa-envelope",
			"regex": /mailto:([a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)/
		},
		"email_plaintext": {
			"name": "Email",
			"type": "messaging",
			"icon": "fas fa-envelope",
			"regex": /([a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)/
		},
		"twitter": {
			"name": "Twitter",
			"type": "social",
			"icon": "fab fa-twitter",
			"regex": /twitter\.com\/([a-zA-Z0-9_]+)/
		},
		"instagram": {
			"name": "Instagram",
			"type": "social",
			"icon": "fab fa-instagram",
			"regex": /instagram\.com\/([a-zA-Z0-9_]+)/
		},
		"facebook": {
			"name": "Facebook",
			"type": "social",
			"icon": "fab fa-facebook",
			"regex": /facebook\.com\/([a-zA-Z0-9_]+)/
		},
		"linkedin": {
			"name": "LinkedIn",
			"type": "social",
			"icon": "fab fa-linkedin",
			"regex": /linkedin\.com\/in\/([a-zA-Z0-9_]+)/
		},
		"twitch": {
			"name": "Twitch",
			"type": "content",
			"icon": "fab fa-twitch",
			"regex": /twitch\.tv\/([a-zA-Z0-9_]+)/
		},
		"youtube": {
			"name": "YouTube",
			"type": "content",
			"icon": "fab fa-youtube",
			"regex": /youtube\.com\/([a-zA-Z0-9_]+)/
		},
		"github": {
			"name": "GitHub",
			"type": "content",
			"icon": "fab fa-github",
			"regex": /github\.com\/([a-zA-Z0-9_]+)/
		},
		"patreon": {
			"name": "Patreon",
			"type": "content",
			"icon": "fab fa-patreon",
			"regex": /patreon\.com\/([a-zA-Z0-9_]+)/
		},
		"onlyfans": {
			"name": "OnlyFans",
			"type": "content",
			"icon": "fas fa-fan",
			"regex": /onlyfans\.com\/([a-zA-Z0-9_]+)/
		},
		"ko-fi": {
			"name": "Ko-fi",
			"type": "content",
			"icon": "fas fa-coffee",
			"regex": /ko-fi\.com\/([a-zA-Z0-9_]+)/
		},
		"linktree": {
			"name": "Linktree",
			"type": "linkhub",
			"icon": "fas fa-tree",
			"regex": /linktr\.ee\/([a-zA-Z0-9_]+)/
		},
		"carrd": {
			"name": "Carrd",
			"type": "linkhub",
			"icon": "fas fa-address-card",
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
		"telegram": {
			"default": {
				"background": "#0088CC",
				"border": "#0088CC",
			},
			"hover": {
				"color": "#0088CC",
				"border": "#0088CC"
			}
		},
		"discord": {
			"default": {
				"background": "#7289DA",
				"border": "#7289DA",
			},
			"hover": {
				"color": "#7289DA",
				"border": "#7289DA"
			}
		},
		"twitch": {
			"default": {
				"background": "#6441A4",
				"border": "#6441A4",
			},
			"hover": {
				"color": "#6441A4",
				"border": "#6441A4"
			}
		},
		"youtube": {
			"default": {
				"background": "#FF0000",
				"border": "#FF0000",
			},
			"hover": {
				"color": "#FF0000",
				"border": "#FF0000"
			}
		},
		"twitter": {
			"default": {
				"background": "#1DA1F2",
				"border": "#1DA1F2",
			},
			"hover": {
				"color": "#1DA1F2",
				"border": "#1DA1F2"
			}
		},
		"instagram": {
			"default": {
				"background": "#E1306C",
				"border": "#E1306C",
			},
			"hover": {
				"color": "#E1306C",
				"border": "#E1306C"
			}
		},
		"facebook": {
			"default": {
				"background": "#1877F2",
				"border": "#1877F2",
			},
			"hover": {
				"color": "#1877F2",
				"border": "#1877F2"
			}
		},
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
					// Get the link style for the link type
					let linkStyle = linkStyles[value.type];

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
	 */
	#insertProfileBio(element, formattedBio) {
		// Get the profile bio element
		let bio = element;

		// Check if the profile bio element exists
		if (bio) {
			// Insert the formatted profile bio html into the page
			bio.innerHTML = formattedBio;

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
		if (bio.links.length < 1) {
			return;
		}

		// Format the profile bio
		let formattedBio = this.#formatProfileBio( bio, {linkTypes: this.#linkTypes, linkStyles: this.#linkStyles} );

		// Insert the formatted profile bio
		this.#insertProfileBio( bio.element, formattedBio );

		// Format the profile buttons
		let formattedButtons = this.#formatProfileButtons( bio, {linkTypes: this.#linkTypes, buttonStyles: this.#buttonStyles, buttonStylesOverrides: this.#buttonStylesOverrides} );

		// Insert the formatted profile buttons
		this.#insertProfileButtons( bio.element, formattedButtons );
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
		document.addEventListener("DOMNodeInserted", _.debounce((e) => {
			if (e.relatedNode.tagName !== "A" && e.relatedNode.tagName !== "BUTTON") {
				this.runProfilePage();
			}
		}, 500));
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
		// Bind the script to the DOMNodeInserted event
		document.addEventListener("DOMNodeInserted", _.debounce((e) => {
			console.log(e);
		}, 500));
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
	 * @param {element} element		- The element to format the emojis in
	 * 
	 * @since 0.0.2
	 */
	parseEmojis( element ) {
		// Parse the emojis in the element if it has unicode emojis and isn't already parsed
		if ( this.#hasUnicodeEmoji( element ) && !this.#hasTwemoji( element ) ) {
			twemoji.parse( element );
		}
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
	parseInChildren( element ) {
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
		children.forEach( child => {
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
		});

		return true;
	}

	/**
	 * @method hasUnicodeEmoji
	 * @description Checks if the element has (unicode) emojis
	 * 
	 * @param {element} element		- The element to check for emojis
	 * 
	 * @returns {boolean} result	- Whether or not the element has emojis
	 * 
	 * @since 0.0.2
	 */
	#hasUnicodeEmoji( element ) {
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
	 * @param {element} element		- The element to check for twemojis
	 * 
	 * @returns {boolean} result		- Whether or not the element has twemojis
	 * 
	 * @since 0.0.2
	 */
	#hasTwemoji( element ) {
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

const _ = new UnderscoreJS();
const BSKY_E_I = new BSKY_Ext_Imports();
const BSKY_E_P = new BSKY_Ext_Profiles();
const BSKY_E_E = new BSKY_Ext_Emojis();