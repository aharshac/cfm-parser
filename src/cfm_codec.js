// Config
//
const Base64encode = (string) => Buffer.from(string).toString('base64');
const Base64decode = (code) => Buffer.from(code, 'base64').toString('ascii');

// http://cloudinary.com/documentation/image_transformation_reference
const getCloudinaryImageUrl = (id, params = '') => `https://res.cloudinary.com/collabizm/image/upload/${params}/v1/${id}`;

// PRE
//
const preImageRegex = /(\!\[[^\]]*\]\(czm:\/\/[^)]*\))/g;
const preImageReplacer = `\n\n$1\n\n`;

const preYoutubeRegex = /@\[youtube\]\((.*)\)/ig;
const preYoutubeIdRegex = /(ci=|v=|be\/|embed\/|v\/)([a-zA-Z0-9_-]+)/ig;
const preYoutubeReplacer = (whole, ytUrl) => {
  preYoutubeIdRegex.lastIndex = 0;
  const matches = preYoutubeIdRegex.exec(ytUrl);
  const ytId = (matches && matches.length > 2 ? matches[2] : ytUrl).replace(/[\u200B-\u200D\uFEFF]/g, '');
  return `YTSTART!${ytId}!YTEND`;
};

const preSoundcloudRegex = /@\[soundcloud\]\((.*)\)/ig;
const preSoundcloudReplacer = (whole, soundCloudUrl) => {
  return `SCSTART!${Base64encode(soundCloudUrl)}!SCEND`;
};

const preAtRegex = /@\[([^\]]*)\]\(([\w-]*)\)/g;
const preAtReplacer = uiClassAtProfile =>
  (whole, name, id) => `~span~class~${uiClassAtProfile}~[${name}](https://www.collaborizm.com/profile/${id})~span~`;


const preAtProjectRegex = /@\[([^\]]*)\]\(project\/([\w\-~]*)\)/g;
const preAtProjectReplacer = uiClassAtProject =>
  (whole, name, id) => `~span~class~${uiClassAtProject}~[${name}](https://www.collaborizm.com/project/${id})~span~`;

const preHashtagRegex = /\B#\[([^\]]*)\]\(([\s\w\-~]*)\)/g;
const preHashtagReplacer = uiClassHashTag =>
  (whole, name, id) => `~span~class~${uiClassHashTag}~[${name}](https://www.collaborizm.com/discover/${encodeURIComponent(id)})~span~`;

const preAdhocRegex = /\B#([a-zA-Z0-9\-_~&\+]+)/g;
const preAdhocReplacer = uiClassAdHocTag =>
  (whole, tag) => `~span~class~${uiClassAdHocTag}~#${tag}~span~`;



// POST
//
const postImageRegex = /<img.+src="czm:\/\/([^"]+)".*?>/g;
const postImageReplacer = uiClassImg =>
  `<div>
    <img class="${uiClassImg}" src='${getCloudinaryImageUrl('TOBEREPLACED')}' />
  </div>`
  .replace(/TOBEREPLACED/g, 'from_markdown/$1');

const postSpanStartRegex = /~span~class~([^~]*)~/g;
const postSpanStartReplacer = (whole, className) => `<span class='${className}'>`;

const postSpanEndRegex = /~span~/g;
const postSpanEndReplacer = '</span>';

const postExtLinkRegex = /<a href="http/g;
const postExtLinkReplacer = '<a target=_blank href="http';

const postSoundcloudReplacer = /SCSTART\!(.*)\!SCEND/ig;
const soundCloudEmbedReplacer = (whole, scId) => {
  return `<iframe
      style="height:166px" width="100%" height="166" scrolling="no" frameborder="no"
      src="https://w.soundcloud.com/player/?url=${encodeURIComponent(Base64decode(scId))}&amp;color=0066cc"
    >
    </iframe>`;
};

const postYoutubeRegex = /YTSTART\!([a-zA-Z0-9_-]+)\!YTEND/ig;
const postYoutubeReplacer = (uiClassYoutube, youtubeDomainName) =>
  (whole, ytId) =>
    `<div class="${uiClassYoutube}">
      <iframe allowFullScreen='allowFullScreen' type="text/html" width="100%" height="360"
        src="https://www.youtube.com/embed/${ytId}?autoplay=0&origin=${youtubeDomainName}"
        frameborder="0"></iframe>
    </div>`;

const postTableRegex = /<table.*?/g;
const postTableReplacer = uiClassTable => `<table class="${uiClassTable}"`;

const postBlockquoteRegex = /<blockquote.*?/g;
const postBlockquoteReplacer = uiClassBlockquote => `<blockquote class="${uiClassBlockquote}"`;


// Functions
//
/////////
const preProcessNonCode = (blob, { atProfile = '', atProject = '', adHocTag = '', hashTag = '', }) =>
  blob
    .replace(preImageRegex, preImageReplacer)
    .replace(preYoutubeRegex, preYoutubeReplacer)
    .replace(preSoundcloudRegex, preSoundcloudReplacer)
    .replace(preAtRegex, preAtReplacer(atProfile))
    .replace(preAtProjectRegex, preAtProjectReplacer(atProject))
    .replace(preHashtagRegex, preHashtagReplacer(adHocTag))
    .replace(preAdhocRegex, preAdhocReplacer(hashTag));
/////////

/////////
const preProcessMd = rawMd => {
  const blobs = [];
  rawMd.split('```').forEach((value, index) => blobs.push(index % 2 === 0 ? preProcessNonCode(value) : value));
  return blobs.join('```');
}
/////////


/////////
const postProcessHtml = (rawHtml, { img = '', youtube = '', table = '', blockquote = '', domainName = '' }) =>
  rawHtml
    .replace(postImageRegex, postImageReplacer(img))
    .replace(postSpanStartRegex, postSpanStartReplacer)
    .replace(postSpanEndRegex, postSpanEndReplacer)
    .replace(postExtLinkRegex, postExtLinkReplacer)
    .replace(postYoutubeRegex, postYoutubeReplacer(youtube, domainName))
    .replace(postSoundcloudReplacer, soundCloudEmbedReplacer)
    .replace(postTableRegex, postTableReplacer(table))
    .replace(postBlockquoteRegex, postBlockquoteReplacer(blockquote));
/////////



export {
  preProcessMd, postProcessHtml, getCloudinaryImageUrl
};
