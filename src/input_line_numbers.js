import Prism from 'prismjs';
// import 'prismjs/components/prism-markdown.js';

/*
  p
  h1 h2 h3 h4 h5 h6
  ul ol
  table
  hr
  blockquote
  pre = fence, code
  div
*/

export default (md) => {

  const addLineNumber = (maxLevel = -1) => {
    return (tokens, idx, options, env, self) => {
      // if (tokens[idx].map && tokens[idx].level === 0) {
      if (tokens[idx].map) {
        if ((maxLevel === -1) || (maxLevel > -1 && tokens[idx].level < maxLevel)) {
          const line = tokens[idx].map[0];
          tokens[idx].attrSet('data-input-line', String(line));
        }
      }
      return self.renderToken(tokens, idx, options, env, self);
    };
  }

  const addLineNumberCodeBlock = (maxLevel = -1) => {
    return (tokens, idx, options, env, self) => {
      const getCodeBlock = (code, lang, lineNumber) => {
        const classAttribute = lang ? `class="language-${lang}"` : '';
        const lineNumberAttribute = lineNumber ? `data-input-line="${lineNumber}"` : '';
        return `<pre ${classAttribute} ${lineNumberAttribute}><code ${classAttribute}>${code}</code></pre>`;
      };

      let lineNumber = false;
      if (tokens[idx].map) {
        if ((maxLevel === -1) || (maxLevel > -1 && tokens[idx].level > maxLevel)) {
          lineNumber = String(tokens[idx].map[0]);
        }
      }

      const lang = tokens[idx].info && String(tokens[idx].info).trim().length > 0 ? String(tokens[idx].info).trim() : false;
      const code = tokens[idx].content;

      if (lang && Prism.languages[lang]) {
        // console.log(lang);
        const pLang = Prism.languages[lang];
        try {
          return getCodeBlock(Prism.highlight(code, pLang), lang, lineNumber);
        } catch (__) { null; }
      }

      return getCodeBlock(Prism.highlight(code, Prism.languages.clike), "clike", lineNumber);
    };
  }

  md.renderer.rules.paragraph_open = addLineNumber();
  md.renderer.rules.heading_open = addLineNumber();
  md.renderer.rules.bullet_list_open = addLineNumber(1);
  md.renderer.rules.ordered_list_open = addLineNumber(1);
  // md.renderer.rules.list_item_open = addLineNumber(2);
  md.renderer.rules.table_open = addLineNumber();

  md.renderer.rules.hr = addLineNumber();
  md.renderer.rules.blockquote_open = addLineNumber();
  md.renderer.rules.fence = addLineNumberCodeBlock();
  md.renderer.rules.code_block = addLineNumberCodeBlock();
  // md.renderer.rules.div_open = addLineNumber();
};
