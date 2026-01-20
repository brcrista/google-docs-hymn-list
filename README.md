## Usage

1. Upload a .4ss file to your Google Drive
1. Copy your Google Doc from the hymn list template, which already has this add-on installed.
1. Title your Google Doc the same as the .4ss file, minus the extension. So if you have, 'My Setlist.4ss', name your doc 'My Setlist'.
1. In the Google Doc, go to **Extensions > Hymn List > Import from forScore setlist (.4ss)**

This will extract any hymn titles from the setlist and will fill them in order in the template.

## Building

```
npm install
npm run build
```

## Installing

- In a Google Doc: **Extensions > Apps Script**
- Paste the contents of `dist/forscore.gs`