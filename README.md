# Collaborizm Flavoured Markdown Parser

[![Collaborizm](https://img.shields.io/badge/Collaborizm-Join%20now-blue.svg)](https://www.collaborizm.com/)
[![Build Status](https://travis-ci.org/aharshac/cfm-parser.svg?branch=master)](https://travis-ci.org/aharshac/cfm-parser)    

[![NPM](https://nodei.co/npm/cfm-parser.png?mini=true)](https://nodei.co/npm/cfm-parser)


&nbsp;

## Installation
```
npm install cfm-parser
```

&nbsp;

## Usage

```js
import { cfmToHtml } from 'cfm-parser'

// Import default CSS stylesheet if not using custom
import 'cfm-parser/css/style.css'

// Import styles for CSS highlighting
// Refer http://prismjs.com/ for theme names
import 'prismjs/themes/prism-okaidia.css';

const md = '## *Markdown*'
const html = cfmToHtml(md)
```

&nbsp;

## Reference
### Function `cfmToHtml(markdown, linkify, uiClass, domainName)`
Converts Collaborizm Flavoured Markdown to HTML.    

* `markdown`    
  Collaborizm Flavoured Markdown

* `linkify`    
  Converts URLs to HTML hyperlinks    
  *Default*: **true**    


* `uiClass`    
  CSS class names for HTML output    
  *Default*: **object**    
  ```
  {
    atProfile: 'md-at-person',
    atProject: 'md-at-project',
    adHocTag: 'md-hashtag-adhoc',
    hashTag: 'md-hashtag',
    img: 'md-img',
    youtube: 'md-yt',
    table: 'md-table',
    blockquote: 'md-blockquote'
  }
  ```

* `domainName`    
  Domain name parameter for YouTube embed.    
  *Default*: **''**    
