# Collaborizm Flavoured Markdown Parser

[![Collaborizm](https://img.shields.io/badge/Collaborizm-Join%20now-blue.svg)](https://www.collaborizm.com/)   

[![NPM](https://nodei.co/npm/collaborizm-flavoured-markdown.png?mini=true)](https://nodei.co/npm/collaborizm-flavoured-markdown)


&nbsp;

## Installation
```
npm install collaborizm-flavoured-markdown
```

&nbsp;

## Usage

```js
import { cfmToHtml } from 'cfm-parser'

// Import default CSS stylesheet if not using custom
import 'cfm-parser/css/style.css'

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
