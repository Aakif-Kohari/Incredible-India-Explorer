import embroideryData from "./embroidery-data.js";

const traditionsGrid=document.getElementById("traditions-grid");
const artisanGrid=document.getElementById("artisan-grid");
const patternGrid=document.getElementById("pattern-grid");
const galleryFilters=document.getElementById("gallery-filters");
const stateInfo=document.getElementById("state-info");
const mapHint=document.getElementById("map-hint");
const mapContainer=document.getElementById("india-map");
const modal=document.getElementById("detail-modal");
const modalBackdrop=document.getElementById("modal-backdrop");
const modalClose=document.getElementById("modal-close");

const stateNames={
INAN:"Andaman and Nicobar",
INAP:"Andhra Pradesh",
INAR:"Arunachal Pradesh",
INAS:"Assam",
INBR:"Bihar",
INCH:"Chandigarh",
INCT:"Chhattisgarh",
INDH:"Dadra and Nagar Haveli and Daman and Diu",
INDL:"Delhi",
INGA:"Goa",
INGJ:"Gujarat",
INHP:"Himachal Pradesh",
INHR:"Haryana",
INJH:"Jharkhand",
INJK:"Jammu and Kashmir",
INKA:"Karnataka",
INKL:"Kerala",
INLA:"Ladakh",
INLD:"Lakshadweep",
INMH:"Maharashtra",
INML:"Meghalaya",
INMN:"Manipur",
INMP:"Madhya Pradesh",
INMZ:"Mizoram",
INNL:"Nagaland",
INOR:"Odisha",
INPB:"Punjab",
INPY:"Puducherry",
INRJ:"Rajasthan",
INSK:"Sikkim",
INTG:"Telangana",
INTN:"Tamil Nadu",
INTR:"Tripura",
INUP:"Uttar Pradesh",
INUT:"Uttarakhand",
INWB:"West Bengal"
};

const traditionById=id=>embroideryData.traditions.find(tradition=>tradition.id===id);

function renderTraditions(){
traditionsGrid.innerHTML=embroideryData.traditions
.filter(tradition=>tradition.featured)
.map(tradition=>`
<article class="tradition-card" data-id="${tradition.id}">
<div class="tradition-image">
<img src="${tradition.image}" alt="${tradition.name}" loading="lazy">
<span class="tradition-region">${tradition.state}</span>
</div>
<div class="tradition-content">
<span class="section-kicker">${tradition.region}</span>
<h3>${tradition.name}</h3>
<p>${tradition.shortDescription}</p>
<div class="tag-list">
${tradition.motifs.slice(0,3).map(motif=>`<span>${motif}</span>`).join("")}
</div>
<button class="text-btn" data-tradition="${tradition.id}">Explore tradition →</button>
</div>
</article>
`).join("");
}

function renderArtisans(){
artisanGrid.innerHTML=embroideryData.artisans.map(artisan=>`
<article class="artisan-card">
<div class="artisan-icon">🧵</div>
<div>
<span class="section-kicker">${artisan.state}</span>
<h3>${artisan.name}</h3>
<p class="artisan-community">${artisan.community}</p>
<p>${artisan.description}</p>
<span class="artisan-tradition">${artisan.tradition}</span>
</div>
</article>
`).join("");
}

function renderGalleryFilters(){
const traditions=embroideryData.traditions.filter(tradition=>
embroideryData.gallery.some(pattern=>pattern.traditionId===tradition.id)
);

galleryFilters.innerHTML=`
<button class="filter-btn active" data-filter="all">All Patterns</button>
${traditions.map(tradition=>`
<button class="filter-btn" data-filter="${tradition.id}">${tradition.name}</button>
`).join("")}
`;
}

function renderGallery(filter="all"){
const patterns=filter==="all"
?embroideryData.gallery
:embroideryData.gallery.filter(pattern=>pattern.traditionId===filter);

patternGrid.innerHTML=patterns.map(pattern=>{
const tradition=traditionById(pattern.traditionId);

return`
<article class="pattern-card" data-pattern="${pattern.id}">
<div class="pattern-image">
<img src="${pattern.image}" alt="${pattern.title}" loading="lazy">
</div>
<div class="pattern-content">
<span class="section-kicker">${tradition?.state||""}</span>
<h3>${pattern.title}</h3>
<p>${pattern.caption}</p>
<button class="text-btn" data-pattern-open="${pattern.id}">View details →</button>
<small>Image: ${pattern.credit}</small>
</div>
</article>
`;
}).join("");
}

function renderState(stateName){
const state=embroideryData.states[stateName];

if(!state){
stateInfo.innerHTML=`
<div class="state-info-empty">
<span class="info-icon">🧵</span>
<h3>${stateName}</h3>
<p>No embroidery information has been added for this state yet.</p>
</div>
`;

mapHint.textContent=`${stateName} selected.`;
return;
}

const traditions=state.traditions
.map(traditionById)
.filter(Boolean);

stateInfo.innerHTML=`
<div class="state-info-content">
<span class="section-kicker">SELECTED STATE</span>
<h3>${stateName}</h3>
<p>${state.description}</p>
<div class="state-traditions">
${traditions.map(tradition=>`
<div class="state-tradition">
<div class="state-tradition-image">
<img src="${tradition.image}" alt="${tradition.name}" loading="lazy">
</div>
<div>
<span class="section-kicker">${tradition.region}</span>
<h4>${tradition.name}</h4>
<p>${tradition.shortDescription}</p>
</div>
</div>
`).join("")}
</div>
</div>
`;

mapHint.textContent=`Exploring embroidery traditions of ${stateName}.`;
}

function openTradition(id){
const tradition=traditionById(id);

if(!tradition){
return;
}

openModal(tradition);
}

function openPattern(id){
const pattern=embroideryData.gallery.find(item=>item.id===id);

if(!pattern){
return;
}

const tradition=traditionById(pattern.traditionId);

if(!tradition){
return;
}

openModal(tradition);
}

function openModal(tradition){
document.getElementById("modal-image").innerHTML=`
<img src="${tradition.image}" alt="${tradition.name}">
`;

document.getElementById("modal-region").textContent=
`${tradition.region} · ${tradition.state}`;

document.getElementById("modal-title").textContent=tradition.name;

document.getElementById("modal-description").textContent=
tradition.shortDescription;

document.getElementById("modal-materials").textContent=
tradition.materials.join(", ");

document.getElementById("modal-motifs").textContent=
tradition.motifs.join(", ");

document.getElementById("modal-uses").textContent=
tradition.uses.join(", ");

document.getElementById("modal-state").textContent=
tradition.state;

modal.hidden=false;
document.body.classList.add("modal-open");
}

function closeModal(){
modal.hidden=true;
document.body.classList.remove("modal-open");
}

async function loadMap(){
try{
const response=await fetch("./in.svg");

if(!response.ok){
throw new Error(`Unable to load India map: ${response.status}`);
}

const svgText=await response.text();

mapContainer.innerHTML=svgText;

const svg=mapContainer.querySelector("svg");

if(!svg){
throw new Error("No SVG element found in in.svg");
}

svg.setAttribute("role","img");
svg.setAttribute("aria-label","Interactive map of India");
svg.removeAttribute("width");
svg.removeAttribute("height");

setupMapStates(svg);
}catch(error){
console.error(error);

mapHint.textContent="Unable to load the India map.";

mapContainer.innerHTML=`
<div class="state-info-empty">
<span class="info-icon">🗺️</span>
<h3>Map unavailable</h3>
<p>Please make sure <strong>in.svg</strong> is in the same folder as index.html.</p>
</div>
`;
}
}

function setupMapStates(svg){
const paths=svg.querySelectorAll("path");

if(!paths.length){
console.warn("No paths found inside in.svg");
mapHint.textContent="No state paths were found in the India map.";
return;
}

paths.forEach(path=>{
const stateName=getStateName(path);

if(!stateName){
return;
}

path.classList.add("india-state");
path.dataset.state=stateName;
path.setAttribute("tabindex","0");
path.setAttribute("role","button");
path.setAttribute("aria-label",`Explore embroidery traditions of ${stateName}`);

path.addEventListener("click",()=>{
selectState(path,stateName);
});

path.addEventListener("keydown",event=>{
if(event.key!=="Enter"&&event.key!==" "){
return;
}

event.preventDefault();
selectState(path,stateName);
});
});

markFeaturedStates(svg);
}

function getStateName(path){
const id=path.getAttribute("id");

if(id&&stateNames[id]){
return stateNames[id];
}

const dataName=path.getAttribute("data-name");

if(dataName){
return stateNames[dataName]||dataName;
}

const ariaLabel=path.getAttribute("aria-label");

if(ariaLabel){
return stateNames[ariaLabel]||ariaLabel;
}

const title=path.getAttribute("title");

if(title){
return stateNames[title]||title;
}

return path.dataset.state||"";
}

function selectState(path,stateName){
mapContainer.querySelectorAll(".india-state").forEach(state=>{
state.classList.remove("selected");
});

path.classList.add("selected");

renderState(stateName);
}

function markFeaturedStates(svg){
const featuredStates=new Set(
embroideryData.traditions
.filter(tradition=>tradition.featured)
.map(tradition=>tradition.state)
);

svg.querySelectorAll(".india-state").forEach(state=>{
if(featuredStates.has(state.dataset.state)){
state.classList.add("featured");
}
});
}

function setupTabs(){
const buttons=document.querySelectorAll(".tab-btn");
const panels=document.querySelectorAll(".tab-panel");

buttons.forEach(button=>{
button.addEventListener("click",()=>{
const target=button.dataset.tab;

buttons.forEach(tab=>{
const active=tab===button;

tab.classList.toggle("active",active);
tab.setAttribute("aria-selected",active.toString());
});

panels.forEach(panel=>{
panel.classList.toggle("active",panel.id===`tab-${target}`);
});
});
});
}

function setupInteractions(){
document.addEventListener("click",event=>{
const traditionButton=event.target.closest("[data-tradition]");

if(traditionButton){
openTradition(traditionButton.dataset.tradition);
return;
}

const patternButton=event.target.closest("[data-pattern-open]");

if(patternButton){
openPattern(patternButton.dataset.patternOpen);
return;
}

const filterButton=event.target.closest(".filter-btn");

if(filterButton){
document.querySelectorAll(".filter-btn").forEach(button=>{
button.classList.remove("active");
});

filterButton.classList.add("active");

renderGallery(filterButton.dataset.filter);
}
});
}

function setupModal(){
modalClose.addEventListener("click",closeModal);
modalBackdrop.addEventListener("click",closeModal);

document.addEventListener("keydown",event=>{
if(event.key==="Escape"&&!modal.hidden){
closeModal();
}
});
}

function init(){
renderTraditions();
renderArtisans();
renderGalleryFilters();
renderGallery();
loadMap();
setupTabs();
setupInteractions();
setupModal();
}

init();