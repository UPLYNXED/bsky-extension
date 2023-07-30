# Bluesky Features Extension script

This script adds a number of features to [Bluesky](bsky.app) that are not (currently) available on the app.
It is intended to be used with [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/), with an eventual plan for a native browser extension.

## Table of Contents
- [Bluesky Features Extension script](#bluesky-features-extension-script)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Planned Features](#planned-features)
  - [Current Known Issues](#current-known-issues)
  - [Installation](#installation)
    - [Userscript (Tampermonkey/Greasemonkey)](#userscript-tampermonkeygreasemonkey)
    - [Browser Extension (Chrome/Firefox/Edge/etc.)](#browser-extension-chromefirefoxedgeetc)
  - [Usage](#usage)
    - [Profile Bio Links / Buttons](#profile-bio-links--buttons)
    - [Emoji Sets (Twemoji, EmojiOne, etc.)](#emoji-sets-twemoji-emojione-etc)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  - [Image Gallery](#image-gallery)

## Features
1. Adds support for Twemoji (Twitter emoji) to Bluesky.
2. Links in profile bios to messaging apps, social media sites, and more, are now highlighted with their respective colors and icons. (optional, configurable)
3. Links in profile bios to messaging apps, social media sites, and more, now show up as buttons below the header. Messaging apps only by default as BSKY will not support DMs. (optional, configurable)
   
## Planned Features
1. General settings controls (enable/disable features, etc.)
2. Native browser extension (Chrome, Firefox, Edge, etc.)
3. Support for other emoji sets (Apple, Google, etc.)
4. Embedding of external video media (YouTube, Twitter, etc.)
5. Embedding of external audio media (Spotify, SoundCloud, etc.)
   * Possibly a way to add autoplaying music to your profile? (OPT IN FOR USERS)
6. Linking to the search page for hashtags in posts and bios.
7. Hiding default domain name (bsky.social) from handle mentions.
8. Discord server invite link resolver, show server name and possibly other info in the link.
9. Basic theme settings (font size, font family, font/accent color, etc.)
10. Possibly a way to add custom CSS to the app, or a way to add custom themes.
11. Some kind of DM system, possibly using a protocol like [Matrix](https://matrix.org/) or [XMPP](https://xmpp.org/).
12. A way to exclude certain bio links from being highlighted or turned into buttons (perhaps with a hash `#` at the end of the link?).

## Current Known Issues
1. The way the script currently detects what page you're on is quite buggy and does not always work as intended. This is being worked on.
2. Related to the issue above, the script does not always parse bios or posts correctly.
3. The script does not currently work on the mobile app version, but should work on browsers that support extensions. App version is identical to the web version, so this is not a priority.

---

## Installation
### Userscript (Tampermonkey/Greasemonkey)
1. Install Tampermonkey or Greasemonkey.
2. ~~Copy the contents of `bsky-features.user.js` into a new script in Tampermonkey or Greasemonkey.~~
3. Go to Bluesky and enjoy!

### Browser Extension (Chrome/Firefox/Edge/etc.)
1. ~~Install the extension for your browser, download the latest release from the [Releases]() page.~~
2. Go to Bluesky and enjoy!

---

## Usage
### Profile Bio Links / Buttons
To add a link to your profile bio, simply add the link to your bio. The script will automatically detect the link and add the appropriate icon and color to it.
~~You can go into the settings and disable or configure this feature if you wish. You can choose which links to highlight, and which links to turn into buttons.~~

#### ~~Discord Server Invite Links Resolver~~
~~To add a Discord server invite link to your profile bio, simply add the link to your bio. The script will automatically detect the link and add the server name and icon to it.~~
~~You can go into the settings and disable or configure this feature if you wish. You can choose whether you want to cache the resolved server info, and how long to cache it for.~~

### Emoji Sets (Twemoji, EmojiOne, etc.)
~~To change the emoji set used by the script, go into the settings and select the emoji set you wish to use.~~ Currently, only Twemoji is supported.

### ~~Embedding External Media (YouTube, Twitter, etc.)~~
~~To embed external media, simply paste the link to the media into your post. The script will automatically detect the link and embed the media.~~
~~You can go into the settings and disable or configure this feature if you wish. You can choose which media types to embed, and which to ignore.~~

### ~~Theme Settings~~
~~This is not yet implemented, but will be in the future.~~

### ~~Custom CSS~~
~~This is not yet implemented, but will be in the future.~~

### ~~DM System~~
~~This is not yet implemented, but will be looked into in the future.~~

---

## Contributing
If you would like to contribute to this project, please feel free to fork the repository and submit a pull request. 
If you have any questions, feel free to contact me on [Bluesky](https://bsky.app/profile/uplynxed.valk.cam) or [Twitter](https://twitter.com/uplynxed).

Currently, the focus is on getting the existing features working properly.

## License
This project is licensed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) license.

## Acknowledgements
* [Twemoji](https://twemoji.twitter.com/) for the emoji set.
* [FontAwesome](https://fontawesome.com/) for the links icons.

---

## Image Gallery
![Profile Bio Links / Buttons](https://cdn.bsky.social/imgproxy/umnqz02RBnuEIxp8XEivE2POBSPFHDihw-BML8hiEVc/rs:fit:2000:2000:1:0/plain/bafkreiao3ph37ilhgfvbuw7xka7s3uedt6rxkfyyab5bxarugdlfagyasa@jpeg)
![Twemoji](https://cdn.bsky.social/imgproxy/tM_FyYBsWhA204_giZx8ktoCFTVbRFVw1nfeWm8NH_4/rs:fit:2000:2000:1:0/plain/bafkreigetkemjzgtfiycjekks2kamxnyn2acpj4rfxljmojmyuelcsrwgm@jpeg)
