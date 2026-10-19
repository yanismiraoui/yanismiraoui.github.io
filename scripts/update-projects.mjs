import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// This repository contains the built React site. Keep the editable product
// catalog here, and patch only the bounded showcase and its rendering slot.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const write = (name, content) => fs.writeFileSync(path.join(root, name), content);
const projects = JSON.parse(read("scripts/projects.json"));
const names = new Set();
for (const group of [projects.featured, projects.upcoming]) {
  for (const project of group) {
    if (names.has(project.name)) throw new Error(`Duplicate project: ${project.name}`);
    names.add(project.name);
    if (new URL(project.url).protocol !== "https:") throw new Error("Project links must use HTTPS");
    if (!project.description || !project.category) throw new Error("Incomplete project card");
  }
}
if (!Array.isArray(projects.featured) || !Array.isArray(projects.upcoming)) {
  throw new Error("Expected featured and upcoming arrays");
}

function replaceExactlyOnce(text, before, after) {
  if (text.split(after).length === 2) return text;
  if (text.split(before).length !== 2) throw new Error(`Expected one replacement: ${before.slice(0,80)}`);
  return text.replace(before, () => after);
}

let bundle = read("static/js/main.2302ccec.js");
const block = `/* project-showcase:start */
var portfolioProjectCatalog = ${JSON.stringify(projects)};
function portfolioProjectSections(theme) {
  return [
    { id: "featured-products", title: "Featured projects", projects: portfolioProjectCatalog.featured, upcoming: false },
    { id: "coming-soon", title: "Coming soon", projects: portfolioProjectCatalog.upcoming, upcoming: true }
  ].filter(function(section) { return section.projects && section.projects.length > 0; }).map(function(section) {
    return (0,Ni.jsxs)("section", {
      className: "portfolio-showcase", "aria-labelledby": section.id,
      children: [
        (0,Ni.jsx)("h2", {id:section.id, className:"portfolio-section-title", style:{color:theme.text}, children:section.title}),
        (0,Ni.jsx)("div", {className:"portfolio-product-grid", children:section.projects.map(function(project) {
          return (0,Ni.jsxs)("a", {
            className:"portfolio-product-card", href:project.url, target:"_blank", rel:"noopener noreferrer",
            style:{backgroundColor:theme.projectCard,color:theme.text},
            children:[
              (0,Ni.jsxs)("div", {className:"portfolio-card-heading",children:[
                (0,Ni.jsx)("h3", {children:project.name}),
                (0,Ni.jsx)("span", {className:"portfolio-status"+(section.upcoming?" is-upcoming":""),children:section.upcoming?"Coming soon":project.status||"Live"})
              ]}),
              (0,Ni.jsx)("p", {className:"portfolio-category",style:{color:theme.text},children:project.category}),
              (0,Ni.jsx)("p", {className:"portfolio-description",children:project.description}),
              (0,Ni.jsx)("span", {className:"portfolio-project-link",children:section.upcoming?"Project preview ↗":project.status==="Live demo"?"Try the demo ↗":"Visit project ↗"})
            ]
          },project.name);
        })})
      ]
    },section.id);
  });
}
/* project-showcase:end */`;
const blockPattern = /\/\* project-showcase:start \*\/[\s\S]*?\/\* project-showcase:end \*\//g;
const blockCount = [...bundle.matchAll(blockPattern)].length;
if (blockCount > 1) throw new Error("Duplicate showcase block");
bundle = blockCount ? bundle.replace(blockPattern, () => block) : replaceExactlyOnce(bundle, "var su=function(e)", block+"var su=function(e)");

const oldGrid = '(0,Ni.jsx)("div",{className:"repo-cards-div-main",children:$r.data.map((function(e){return(0,Ni.jsx)(lu,{repo:e,theme:t})}))})';
const newGrid = '(0,Ni.jsxs)(Ni.Fragment,{children:[portfolioProjectSections(t),(0,Ni.jsx)("h2",{className:"portfolio-section-title portfolio-research-title",style:{color:t.text},children:"Research & other projects"}),(0,Ni.jsx)("div",{className:"repo-cards-div-main",children:$r.data.filter((function(e){return e.id!=="1"})).map((function(e){return(0,Ni.jsx)(lu,{repo:e,theme:t},e.id)}))})]})';
bundle = replaceExactlyOnce(bundle, oldGrid, newGrid);

let css = read("static/css/main.a2817135.css");
const showcaseCss = `/* portfolio-showcase:start */
.portfolio-showcase{max-width:1200px;margin:56px auto;padding:0 40px;text-align:left;box-sizing:border-box}
.portfolio-section-title{font-family:Google Sans Medium,sans-serif;font-size:30px;font-weight:500;line-height:1.25;margin:0 0 24px}
.portfolio-product-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.portfolio-product-card{display:flex;flex-direction:column;min-width:0;padding:28px;border:1px solid rgba(128,128,128,.24);border-radius:8px;text-decoration:none;box-shadow:0 5px 18px rgba(0,0,0,.07);transition:transform .18s ease,box-shadow .18s ease}
.portfolio-product-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.14)}
.portfolio-product-card:focus-visible{outline:3px solid currentColor;outline-offset:4px}
.portfolio-card-heading{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.portfolio-card-heading h3{font-family:Google Sans Medium,sans-serif;font-size:25px;font-weight:500;line-height:1.2;margin:0}
.portfolio-status{font-family:Google Sans Regular,sans-serif;font-size:14px;line-height:1.4;padding:4px 10px;border:1px solid rgba(128,128,128,.35);border-radius:20px;white-space:nowrap}
.portfolio-status:not(.is-upcoming):before{content:"";display:inline-block;width:7px;height:7px;margin-right:7px;border-radius:50%;background:#32996f}
.portfolio-category{font-family:Google Sans Regular,sans-serif;font-size:14px;line-height:1.5;margin:12px 0 0}
.portfolio-description{font-family:Google Sans Regular,sans-serif;font-size:17px;line-height:1.6;margin:16px 0 22px}
.portfolio-project-link{font-family:Google Sans Medium,sans-serif;font-size:15px;line-height:1.5;margin-top:auto}
.portfolio-research-title{max-width:1200px;box-sizing:border-box;margin:64px auto 0;padding:0 40px;text-align:left}
.portfolio-research-title+.repo-cards-div-main{margin-top:24px}
@media(max-width:768px){.portfolio-showcase{margin:36px auto;padding:0 20px}.portfolio-product-grid{grid-template-columns:minmax(0,1fr);gap:16px}.portfolio-product-card{padding:22px}.portfolio-section-title{font-size:26px}.portfolio-card-heading h3{font-size:23px}.portfolio-description{font-size:16px}.portfolio-research-title{padding:0 20px;margin-top:44px}}
@media(prefers-reduced-motion:reduce){.portfolio-product-card{transition:none}.portfolio-product-card:hover{transform:none}}
/* portfolio-showcase:end */`;
const cssPattern = /\/\* portfolio-showcase:start \*\/[\s\S]*?\/\* portfolio-showcase:end \*\//g;
if ([...css.matchAll(cssPattern)].length > 1) throw new Error("Duplicate showcase styles");
css = css.includes("/* portfolio-showcase:start */") ? css.replace(cssPattern, () => showcaseCss) : css+"\n"+showcaseCss;

let index = read("index.html");
for (const asset of ["js/main.2302ccec.js", "css/main.a2817135.css"]) {
  const pattern = new RegExp("/static/"+asset.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?:\\?v=[^\"]+)?", "g");
  if ([...index.matchAll(pattern)].length !== 1) throw new Error(`Expected one asset reference: ${asset}`);
  index = index.replace(pattern, () => `/static/${asset}?v=20261019-no-products`);
}

write("static/js/main.2302ccec.js",bundle);
write("static/css/main.a2817135.css",css);
write("index.html",index);
console.log(`Updated project showcase: ${projects.featured.length} featured, ${projects.upcoming.length} coming soon.`);
