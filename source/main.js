/**
 * @project Bluesky Messaging Extension
 * @description A simple script to add buttons for popular messaging apps to profile pages on Bluesky.
 * @website https://github.com/UPLYNXED/bsky-messaging-extension
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
 * @class BSKYMessagingExtension
 * @description A simple script to add buttons for popular messaging apps to profile pages on Bluesky.
 * 
 * @since 0.0.1
 */
class BSKYMessagingExtension {
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
        "inlineLinkText": 'original',   // original, icon, name, path (the last part of the url)
        "buttonLinkText": 'name',       // original, icon, name
        "resolveDiscordInvites": true,  // Whether or not to resolve Discord invites to the server name
        "cacheDiscordInvites": true,    // Whether or not to cache Discord invites to the server name to prevent repeated requests
        "bioSelector": "[data-testid='profileHeaderDescription']" // The selector for the profile bio element
    };

    /**
     * @constant {Object} linkTypes - The link types, icons, and regexes for the supported messaging apps
     * 
     * @since 0.0.1
     */
    #linkTypes = {
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
            "icon": "fab fa-onlyfans",
            "regex": /onlyfans\.com\/([a-zA-Z0-9_]+)/
        },
        "ko-fi": {
            "name": "Ko-fi",
            "type": "content",
            "icon": "fas fa-coffee",
            "regex": /ko-fi\.com\/([a-zA-Z0-9_]+)/
        },
    };

    /**
     * @constant {Object} linkStyles - The link styles for the supported messaging apps
     * 
     * @since 0.0.1
     */
    #linkStyles = {
        "messaging": {
            "color": "#7289DA",
            "background": "#2C2F33",
            "border": "#23272A",
            "hover": {
                "color": "#FFFFFF",
                "background": "#7289DA",
                "border": "#7289DA"
            }
        },
        "social": {
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
            "hover": {
                "color": "#7289DA",
                "background": "#FFFFFF",
                "border": "#7289DA"
            }
        },
        "content": {
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
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
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
            "hover": {
                "color": "#7289DA",
                "background": "#FFFFFF",
                "border": "#7289DA"
            }
        },
        "social": {
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
            "hover": {
                "color": "#7289DA",
                "background": "#FFFFFF",
                "border": "#7289DA"
            }
        },
        "content": {
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
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
     * @since 0.0.1
     */
    #buttonStylesOverrides = {
        "twitch": {
            "color": "#FFFFFF",
            "background": "#6441A4",
            "border": "#6441A4",
            "hover": {
                "color": "#6441A4",
                "background": "#FFFFFF",
                "border": "#6441A4"
            }
        },
        "youtube": {
            "color": "#FFFFFF",
            "background": "#FF0000",
            "border": "#FF0000",
            "hover": {
                "color": "#FF0000",
                "background": "#FFFFFF",
                "border": "#FF0000"
            }
        },
        "discord": {
            "color": "#FFFFFF",
            "background": "#7289DA",
            "border": "#7289DA",
            "hover": {
                "color": "#7289DA",
                "background": "#FFFFFF",
                "border": "#7289DA"
            }
        },
    };

    /**
     * @constant {Array} ExternalResources - The external resources for the script
     * 
     * @since 0.0.1
     */
    #ExternalResources = [
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
    #loadExternalResources() {
        // Create the resources array to put the elements in that will be added to the head
        let resources = [];

        // Loop through the external resources
        this.#ExternalResources.forEach(resource => {
            switch (resource.type) {
                case "stylesheet":
                    let stylesheet = document.createElement("link");
                    stylesheet.setAttribute("rel", "stylesheet");
                    stylesheet.setAttribute("href", resource.src);
                    resources.push(stylesheet);
                    break;
                case "script":
                    let script = document.createElement("script");
                    script.setAttribute("src", resource.src);
                    resources.push(script);
                    break;
                default:
                    break;
            }
        });

        // Add the resources to the head
        resources.forEach(resource => {
            document.head.appendChild(resource);
        });

        return true;
    }

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
     * @returns {object} result             - The profile bio
     * @returns {string} result.element     - The profile bio element
     * @returns {string} result.text        - The profile bio text
     * @returns {string} result.html        - The profile bio html
     * @returns {object} result.links       - The profile bio links array
     * @returns {string} result.links.url   - The profile bio link url
     * @returns {string} result.links.text  - The profile bio link text
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
                text: link.innerText
            });
        });

        // Return the result object
        return result;
    }

    /**
     * @method formatProfileBio
     * @description Formats the profile bio html to include markup for the inline links with icons.
     * 
     * @param {object} bio              - (See: function getProfileBio) The profile bio object
     * @param {object} linkTypes        - (See: const linkTypes) The link types, icons, and regexes for the supported messaging apps
     *
     * @returns {string} result         - The formatted profile bio html
     * 
     * @since 0.0.1
     */
    #formatProfileBio(bio, linkTypes, linkStyles) {
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
                    if (this.#buttonStylesOverrides[key]) {   //TODO: Create a linkStylesOverrides object for this instead of using buttonStylesOverrides
                        // Override the link style
                        linkStyle = this.#buttonStylesOverrides[key];
                    }

                    // Get the existing link element and its attributes
                    let linkOriginal = bio.element.querySelector(`a[href="${link.url}"]`);
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
                        color: ${linkStyle.color}; background: ${linkStyle.background}; border: 1px solid ${linkStyle.border}; border-radius: 0.5em;
                        padding: 0.1em 0.3em; margin: 0 4px 4px 1px; text-decoration: none; font-size: 0.8em; font-weight: 600; display: inline-block; 
                        transition: all 0.2s ease-in-out; white-space: nowrap;`;
                    hyperlink.setAttribute("style", `${originalStyle}; ${newStyle}`);

                    // Add the hover event styles to the hyperlink element
                    hyperlink.setAttribute("onmouseover", `this.style.color='${linkStyle.hover.color}'; this.style.background='${linkStyle.hover.background}'; this.style.border='1px solid ${linkStyle.hover.border}';`);
                    hyperlink.setAttribute("onmouseout", `this.style.color='${linkStyle.color}'; this.style.background='${linkStyle.background}'; this.style.border='1px solid ${linkStyle.border}';`);

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
     * @param {string} element      - The profile bio element
     * @param {string} formattedBio - The formatted profile bio html
     * 
     * @returns {boolean} result    - Whether or not the profile bio was inserted successfully
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
     * @method isProfilePage
     * @description Checks if the current page is a profile page
     * 
     * @returns {boolean} result        - Whether or not the current page is a profile page
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
        let formattedBio = this.#formatProfileBio( bio, this.#linkTypes, this.#linkStyles );

        // Insert the formatted profile bio
        this.#insertProfileBio( bio.element, formattedBio );
    }


    /**
     * @method init
     * @description Intialize the script and binds it to the navigate event
     * 
     * @since 0.0.1
     */
    init() {
        // Load external resources
        this.#loadExternalResources();

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
        document.addEventListener("DOMNodeInserted", debounce((e) => {
            if (e.relatedNode.tagName !== "A") {
                console.log("DOMNodeInserted", e.relatedNode);
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

// Run the script
let BSKYME = new BSKYMessagingExtension();

/**
 * _.js throttle function
 * @source https://underscorejs.org/docs/modules/throttle.html
 */
function throttle(func, wait, options) {
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
function debounce(func, wait, immediate) {
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

	var debounced = restArguments(function(_args) {
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
function restArguments(func, startIndex) {
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