import fs from "node:fs";

const bundlePath = "static/js/main.2302ccec.js";
const cssPath = "static/css/main.a2817135.css";
const indexPath = "index.html";
const manifestPath = "manifest.json";
const assetManifestPath = "asset-manifest.json";

let bundle = fs.readFileSync(bundlePath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");
let index = fs.readFileSync(indexPath, "utf8");
let manifest = fs.readFileSync(manifestPath, "utf8");
let assetManifest = fs.readFileSync(assetManifestPath, "utf8");

function replaceOnce(source, before, after, label) {
  const oldCount = source.split(before).length - 1;
  const newCount = source.split(after).length - 1;

  if (oldCount === 1) return source.replace(before, after);
  if (oldCount === 0 && after === "") return source;
  if (oldCount === 0 && newCount === 1) return source;
  throw new Error(`${label}: expected one old or new value, found old=${oldCount}, new=${newCount}`);
}

function replaceSingleMatch(source, pattern, after, label) {
  const matches = source.match(pattern) ?? [];
  if (matches.length !== 1) {
    throw new Error(`${label}: expected one matching value, found ${matches.length}`);
  }
  return source.replace(pattern, after);
}

bundle = replaceOnce(
  bundle,
  'googleTrackingID:"UA-174238252-2"',
  'googleTrackingID:""',
  "disable retired Universal Analytics property",
);

bundle = replaceOnce(
  bundle,
  String.raw`subTitle:"I am a MS in Statistics & Data Science student at Stanford University and a Member of Technical Staff at Inception Labs \ud83d\ude80. In my free time, I love traveling \ud83c\udf07, playing sports \ud83c\udfc3\u200d\u2642\ufe0f and watching Formula 1 \ud83c\udfce\ufe0f.",resumeLink:`,
  String.raw`subTitle:"I am an AI researcher and engineer on Inception's founding team, building diffusion language models and production AI systems \ud83d\ude80. I hold a Stanford MS in Statistics & Data Science. Outside work: travel \ud83c\udf07, sports \ud83c\udfc3\u200d\u2642\ufe0f and Formula 1 \ud83c\udfce\ufe0f.",resumeLink:`,
  "home introduction",
);

bundle = replaceOnce(
  bundle,
  'title:"Data Scientist",fileName:"FullStackImg"',
  'title:"AI Researcher & Engineer",fileName:"FullStackImg"',
  "skills heading",
);

bundle = replaceOnce(
  bundle,
  "Developing predictive models using advanced machine learning algorithms",
  "Building and evaluating generative models and production AI systems",
  "first skills summary",
);

bundle = replaceOnce(
  bundle,
  "Working with Large Language Models (LLMs), Transformers, LLM Agents and now Diffusion Language Models (dLLMs)!",
  "Working with large language models, diffusion language models, and AI agents",
  "second skills summary",
);

bundle = replaceOnce(
  bundle,
  "I am a MS in Data Science student at Stanford University.",
  "I earned an MS in Statistics & Data Science from Stanford University in June 2025.",
  "Stanford degree status",
);

bundle = replaceOnce(
  bundle,
  "I am a Research Assistant at the Stanford Computational Neuroscience (CNS) Lab.",
  "I was a Research Assistant at the Stanford Computational Neuroscience (CNS) Lab.",
  "Stanford research status",
);
bundle = replaceOnce(
  bundle,
  "I have graduated from a MSci",
  "I graduated with an MSci",
  "Imperial degree grammar",
);
bundle = replaceOnce(
  bundle,
  "I have studied core subjects like Advanced Machine Learning, Probabilistics Artificial Intelligence, Natural Language Processing, Computational Statistics, Methods for Data Science, etc...",
  "I studied subjects including Advanced Machine Learning, Probabilistic Artificial Intelligence, Natural Language Processing, Computational Statistics, and Methods for Data Science.",
  "education subject spelling",
);

bundle = replaceOnce(
  bundle,
  "I have worked with different companies and organizations to improve my skills and knowledge. I have also participated in multiple events such as hackathons and problem-solving competitions.",
  "My work spans generative AI research, production machine learning systems, and applied data science across startups, research labs, and technology companies.",
  "experience introduction",
);
bundle = replaceOnce(
  bundle,
  'subtitle:"Work, Internship and Volunteership"',
  'subtitle:"Work, Research and Leadership"',
  "experience subtitle",
);
bundle = replaceOnce(
  bundle,
  "Volunteerships and Leadership",
  "Volunteer Work and Leadership",
  "volunteer section heading",
);
bundle = replaceOnce(
  bundle,
  'company:"Inception Labs",company_url:',
  'company:"Inception",company_url:',
  "current Inception brand",
);
bundle = replaceOnce(
  bundle,
  '"./inceptionlabs.jpeg":7731',
  '"./inception.png":7731',
  "current Inception logo module name",
);
bundle = replaceOnce(
  bundle,
  'logo_path:"inceptionlabs.jpeg"',
  'logo_path:"inception.png"',
  "current Inception logo reference",
);
bundle = replaceOnce(
  bundle,
  'static/media/inceptionlabs.a2c6bc8767b1355ab35f.jpeg',
  'static/media/inception.206857af9d7edf13608e.png',
  "current Inception logo asset",
);

bundle = replaceOnce(
  bundle,
  "Developing breakthrough diffusion language models (dLLMs) with the following benefits: 5-10x faster and cheaper inference, improved controllability, native support for multimodality.",
  "Developing diffusion language models and the systems that bring them to production. Co-authored Mercury, which generates tokens in parallel using diffusion for fast text generation.",
  "Inception experience description",
);

bundle = replaceOnce(
  bundle,
  'company_url:"https://www.egolimedia.com/"',
  'company_url:"https://www.egoli.ai/"',
  "current Egoli website",
);
bundle = replaceOnce(
  bundle,
  "improve translation quality and reducing content translation time and cost",
  "improve translation quality while reducing translation time and cost",
  "Snowflake description grammar",
);
bundle = replaceOnce(
  bundle,
  "fundamental C# software",
  "fundamental C software",
  "42 project language",
);

bundle = replaceOnce(
  bundle,
  String.raw`id:"2",name:"GNNs for Neuroimaging \ud83e\udde0",url:"https://github.com/yanismiraoui/"`,
  String.raw`id:"2",name:"SpaRG: Graph Neural Networks for Neuroimaging \ud83e\udde0",url:"https://github.com/yanismiraoui/SpaRG"`,
  "SpaRG project title and URL",
);

bundle = replaceOnce(
  bundle,
  "The aim of this research project is to leverage Graph Neural Networks and the associated techniques to Neuroimaging. This study is carried out within the Stanford CNS Lab.",
  "SpaRG uses sparsely reconstructed graphs and graph neural networks for robust, interpretable fMRI analysis. The work was published and presented at MICCAI 2024.",
  "SpaRG project description",
);
bundle = replaceOnce(
  bundle,
  "helps creating personalized websites",
  "helps create personalized websites",
  "RecruiTree description grammar",
);
bundle = replaceOnce(
  bundle,
  "state-of-the- art modelling techniques",
  "state-of-the-art modelling techniques",
  "TCR project hyphenation",
);
bundle = replaceOnce(
  bundle,
  "easily at anytime",
  "easily at any time",
  "ASVZ project wording",
);

bundle = replaceOnce(
  bundle,
  "I have always been passionate about working within a team to find concrete solutions across different intellectual fields, such as geopolitics, science, and computing. I am always looking for new complex problems to solve and new challenges to face applying technology innovation. Below are some of my projects. Most of the projects are already freely accessible on GitHub.",
  "I work on research and products across generative AI, machine learning, and developer tools. Below is a selection of projects and publications; more are available on GitHub.",
  "projects introduction",
);

bundle = replaceOnce(
  bundle,
  '$r={data:[{id:"0"',
  '$r={data:[{id:"mercury-2025",name:"Mercury: Ultra-Fast Language Models Based on Diffusion",url:"https://arxiv.org/abs/2506.17298",description:"Co-authored the research introducing Mercury, a family of diffusion language models that generates tokens in parallel for fast text generation.",languages:[]},{id:"0"',
  "Mercury publication card",
);

bundle = replaceOnce(bundle, 'title:"Github Page"', 'title:"GitHub"', "GitHub heading");
bundle = replaceOnce(
  bundle,
  "I publish most of my projects on Github, please find below the link to my Github page.",
  "I publish most of my projects on GitHub. Follow the link below to explore my work.",
  "GitHub contact copy",
);
bundle = replaceOnce(
  bundle,
  "with the links mentioned below",
  "using the links below",
  "contact instructions",
);

bundle = replaceOnce(
  bundle,
  'window.open(e,"_blank").focus()',
  'window.open(e,"_blank","noopener,noreferrer")',
  "safe external project links",
);
bundle = replaceOnce(
  bundle,
  'href:t.certificate_link,target:"_blank"',
  'href:t.certificate_link||void 0,target:"_blank"',
  "empty certification links",
);
bundle = replaceOnce(
  bundle,
  'resumeLink:"https://yanismiraoui.github.io/CV%20Yanis%20MIRAOUI.pdf"',
  'resumeLink:"/CV%20Yanis%20MIRAOUI.pdf"',
  "same-site resume link",
);
bundle = replaceOnce(
  bundle,
  '(0,Ni.jsx)("input",{className:"menu-btn",type:"checkbox",id:"menu-btn"})',
  '(0,Ni.jsx)("input",{className:"menu-btn",type:"checkbox",id:"menu-btn","aria-label":"Toggle navigation menu"})',
  "mobile navigation label",
);
bundle = replaceOnce(
  bundle,
  '(0,Ni.jsx)("label",{className:"menu-icon",htmlFor:"menu-btn",children:',
  '(0,Ni.jsx)("label",{className:"menu-icon",htmlFor:"menu-btn",role:"button",tabIndex:0,"aria-label":"Toggle navigation menu",onKeyDown:function(e){("Enter"!==e.key&&" "!==e.key)||(e.preventDefault(),document.getElementById("menu-btn").click())},children:',
  "keyboard-accessible mobile navigation",
);
bundle = replaceOnce(
  bundle,
  '(0,Ni.jsx)("button",xn(xn({},r),{},{onClick:function()',
  '(0,Ni.jsx)("button",xn(xn({},r),{},{"aria-label":"Toggle color theme",onClick:function()',
  "theme button label",
);
bundle = replaceOnce(
  bundle,
  'href:Gr.github,className:"icon-button github"',
  'href:Gr.github,"aria-label":"GitHub profile",className:"icon-button github"',
  "GitHub social label",
);
bundle = replaceOnce(
  bundle,
  'href:Gr.linkedin,className:"icon-button linkedin"',
  'href:Gr.linkedin,"aria-label":"LinkedIn profile",className:"icon-button linkedin"',
  "LinkedIn social label",
);
bundle = replaceOnce(
  bundle,
  'href:"mailto:".concat(Gr.gmail),className:"icon-button google"',
  'href:"mailto:".concat(Gr.gmail),"aria-label":"Email Yanis Miraoui",className:"icon-button google"',
  "email social label",
);
bundle = replaceOnce(
  bundle,
  'key:n.id,onClick:function(){return e=n.url,void window.open(e,"_blank","noopener,noreferrer");var e},style:',
  'key:n.id,role:"link",tabIndex:0,onClick:function(){return e=n.url,void window.open(e,"_blank","noopener,noreferrer");var e},onKeyDown:function(e){("Enter"!==e.key&&" "!==e.key)||(e.preventDefault(),window.open(n.url,"_blank","noopener,noreferrer"))},style:',
  "keyboard-accessible project cards",
);

bundle = bundle.replace("\n//# sourceMappingURL=main.2302ccec.js.map", "");

const mobileCursorFix =
  "/* Mobile cursor overflow fix */@media(max-width:768px){.sc-bdfBwQ,.sc-gsTCUz{display:none!important}}";
css = css.replace("/*# sourceMappingURL=main.a2817135.css.map*/", "");
if (!css.includes(mobileCursorFix)) css += mobileCursorFix;

index = replaceOnce(
  index,
  '<meta name="Yanis Miraoui | Portfolio" content="Web site created using create-react-app"/>',
  '<meta name="description" content="Yanis Miraoui is an AI researcher and engineer building diffusion language models and production AI systems."/>',
  "page description",
);
index = replaceOnce(
  index,
  '<meta property="og:url" content="https://yanismiraoui.github.io/"/>',
  '<meta property="og:url" content="https://yanis.miraoui.com/"/><meta property="og:description" content="AI researcher and engineer building diffusion language models and production AI systems."/>',
  "Open Graph metadata",
);
index = replaceOnce(
  index,
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.js"></script><script src="./canvasjs.min.js"></script>',
  "",
  "unused and missing scripts",
);
index = replaceSingleMatch(
  index,
  /<script defer="defer" src="\/static\/js\/main\.2302ccec\.js(?:\?v=[^"]+)?"><\/script>/g,
  '<script defer="defer" src="/static/js/main.2302ccec.js?v=20260904-1"></script>',
  "JavaScript cache busting",
);
index = replaceSingleMatch(
  index,
  /<link href="\/static\/css\/main\.a2817135\.css(?:\?v=[^"]+)?" rel="stylesheet">/g,
  '<link href="/static/css/main.a2817135.css?v=20260830-1" rel="stylesheet">',
  "CSS cache busting",
);

manifest = replaceOnce(
  manifest,
  ' "name": "App",',
  ' "name": "Yanis Miraoui | Portfolio",\n "short_name": "Yanis Miraoui",\n "start_url": "/#/home",\n "display": "standalone",\n "background_color": "#1d1d1d",\n "theme_color": "#1d1d1d",',
  "web app manifest metadata",
);

assetManifest = replaceOnce(
  assetManifest,
  '"static/media/inceptionlabs.jpeg": "/static/media/inceptionlabs.a2c6bc8767b1355ab35f.jpeg"',
  '"static/media/inception.png": "/static/media/inception.206857af9d7edf13608e.png"',
  "current Inception asset manifest entry",
);

fs.writeFileSync(bundlePath, bundle);
fs.writeFileSync(cssPath, css);
fs.writeFileSync(indexPath, index);
fs.writeFileSync(manifestPath, manifest);
fs.writeFileSync(assetManifestPath, assetManifest);

// Preserve the maintained product catalog whenever the built site is refreshed.
await import("./update-projects.mjs");
