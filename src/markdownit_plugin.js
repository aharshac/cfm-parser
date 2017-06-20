// npm i -D markdown-it markdown-it-emoji markdown-it-task-lists prismjs

import MarkdownIt from 'markdown-it';
import markdownItEmoji from 'markdown-it-emoji';
import taskLists from 'markdown-it-task-lists';
import Prism from 'prismjs';

import { preProcessMd, postProcessHtml, getCloudinaryImageUrl } from './cfm_codec';


const markdownItOptions = {
  typographer: true,
  quotes: '“”‘’',
  breaks: true,
  html: false,
};

markdownItOptions.highlight = (str, lang) => {
  const getCodeBlock = (code, lang) => {
    const classAttribute = lang ? `class="language-${lang}"` : '';
    return `<pre ${classAttribute}><code ${classAttribute}>${code}</code></pre>`;
  }

  if (lang && Prism.languages[lang]) {
    const pLang = Prism.languages[lang];
    try {
      return getCodeBlock(Prism.highlight(str, pLang), lang);
    } catch (__) { null; }
  }

  return getCodeBlock(Prism.highlight(str, Prism.languages.clike), "clike");
};

const defaultUiClass = {
  atProfile: 'md-at-person',
  atProject: 'md-at-project',
  adHocTag: 'md-hashtag-adhoc',
  hashTag: 'md-hashtag',
  img: 'md-img',
  youtube: 'md-yt',
  table: 'md-table',
  blockquote: 'md-blockquote'
};

const cfmToHtml = (text, linkify = true, uiClass = defaultUiClass, domainName = '') => {
  if (!text)
    return null;

  const md = new MarkdownIt({ ...markdownItOptions, linkify}).use(markdownItEmoji).use(taskLists);

  const preMd = preProcessMd(text, { ...uiClass, domainName });
  const rawHtml = md.render(preMd);
  const postHtml = postProcessHtml(rawHtml, { ...uiClass, domainName });

  return postHtml;
}

export { cfmToHtml, getCloudinaryImageUrl };
