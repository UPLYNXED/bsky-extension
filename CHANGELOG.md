# Changelog
All notable changes to this project will be documented in this file.

## Current Version: 0.0.3
### Added
- API XHR request interception class to parse posts and bios before they are displayed.

### Changed


## Current Known Issues
- The way the script currently detects what page you're on is quite buggy and does not always work as intended. This is being worked on.
- Related to the issue above, the script does not always parse bios or posts correctly.
- The script does not currently work on the mobile app version, but should work on browsers that support extensions. App version is identical to the web version, so this is not a priority.

---
---

## Previous Versions

### Version 0.0.2
#### Added
- Emoji parser (Twemoji) for posts and bios.
- More websites to the list of links to parse.
- [ReadMe.md File](README.md)
- Changelog.md File

#### Changed
- Extracted the external scripts and stylesheets loading function to its own class (Twemoji, FontAwesome).
- Changes to the way the script detects what page you're on (still buggy).

---

### Version 0.0.1
Initial proof-of-concept version.

#### Added
- Profile bio links / buttons parser.
- Added FontAwesome icons for the links.
- Very rudimentary event hook for detecting page changes.
- [License.md File](LICENSE.md).

---