import lassiData from "./lassi-data.js";

const varietiesGrid=document.getElementById("varieties-grid");
const preparationGrid=document.getElementById("preparation-grid");
const cultureGrid=document.getElementById("culture-grid");
const galleryGrid=document.getElementById("gallery-grid");
const galleryFilters=document.getElementById("gallery-filters");
const stateInfo=document.getElementById("state-info");
const mapHint=document.getElementById("map-hint");
const mapContainer=document.getElementById("india-map");
const modal=document.getElementById("detail-modal");
const modalBackdrop=document.getElementById("modal-backdrop");
const modalClose=document.getElementById("modal-close");

const stateNameMap={
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

const traditionById=id=>lassiData.varieties.find(variety=>variety.id===id);

function normalizeStateName(name){
const cleaned=name
.replace(/\s+/g," ")
.replace("Orissa","Odisha")
.replace("Uttaranchal","Uttarakhand")
.replace("Dādra and Nagar Haveli and Damān and Diu","Dadra and Nagar Haveli and Daman and Diu")
.trim();

return stateNameMap[cleaned]||cleaned;
}

function renderVarieties(){
varietiesGrid.innerHTML=lassiData.varieties
.filter(variety=>variety.featured)
.map(variety=>`
<article class="variety-card" data-id="${variety.id}">
<div class="variety-image">
<img src="${variety.image}" alt="${variety.name}" loading="lazy">
<span class="variety-region">${variety.state}</span>
</div>
<div class="variety-content">
<span class="section-kicker">${variety.region}</span>
<h3>${variety.name}</h3>
<p>${variety.shortDescription}</p>
<div class="tag-list">
<span>${variety.type}</span>
${variety.ingredients.slice(0,2).map(ingredient=>`<span>${ingredient}</span>`).join("")}
</div>
<button class="text-btn" data-variety="${variety.id}">Explore lassi →</button>
</div>
</article>
`).join("");
}

function renderPreparation(){
preparationGrid.innerHTML=lassiData.preparation.map(step=>`
<article class="preparation-card">
<div class="preparation-number">${step.step}</div>
<div class="preparation-icon">${step.icon}</div>
<h3>${step.title}</h3>
<p>${step.description}</p>
</article>
`).join("");
}

function renderCulture(){
cultureGrid.innerHTML=lassiData.culture.map(item=>`
<article class="culture-card">
<div class="culture-icon">🥛</div>
<div>
<h3>${item.title}</h3>
<p>${item.description}</p>
</div>
</article>
`).join("");
}

function renderGalleryFilters(){
const varieties=lassiData.varieties.filter(variety=>
lassiData.gallery.some(item=>item.varietyId===variety.id)
);

galleryFilters.innerHTML=`
<button class="filter-btn active" data-filter="all">All Lassi</button>
${varieties.map(variety=>`
<button class="filter-btn" data-filter="${variety.id}">${variety.name}</button>
`).join("")}
`;
}

function renderGallery(filter="all"){
const items=filter==="all"
?lassiData.gallery
:lassiData.gallery.filter(item=>item.varietyId===filter);

galleryGrid.innerHTML=items.map(item=>{
const variety=traditionById(item.varietyId);

return`
<article class="gallery-card" data-gallery="${item.id}">
<div class="gallery-image">
<img src="${item.image}" alt="${item.title}" loading="lazy">
</div>
<div class="gallery-content">
<span class="section-kicker">${variety?.state||""}</span>
<h3>${item.title}</h3>
<p>${item.caption}</p>
<button class="text-btn" data-gallery-open="${item.id}">View details →</button>
<small>Image: ${item.credit}</small>
</div>
</article>
`;
}).join("");
}

function renderState(stateName){
const normalizedName=normalizeStateName(stateName);
const state=lassiData.states[normalizedName];

if(!state){
stateInfo.innerHTML=`
<div class="state-info-empty">
<span class="info-icon">🥛</span>
<h3>${normalizedName}</h3>
<p>No specific lassi tradition has been documented for this state in the current dataset.</p>
</div>
`;

mapHint.textContent=`${normalizedName} selected.`;
return;
}

const varieties=state.varieties
.map(traditionById)
.filter(Boolean);

stateInfo.innerHTML=`
<div class="state-info-content">
<span class="section-kicker">SELECTED STATE</span>
<h3>${normalizedName}</h3>
<p>${state.description}</p>

<div class="state-varieties">
${varieties.length
?varieties.map(variety=>`
<div class="state-variety">
<div class="state-variety-image">
<img src="${variety.image}" alt="${variety.name}" loading="lazy">
</div>
<div>
<span class="section-kicker">${variety.type}</span>
<h4>${variety.name}</h4>
<p>${variety.shortDescription}</p>
</div>
</div>
`).join("")
:`
<div class="state-no-variety">
<span>🥛</span>
<p>No specific variety is listed yet, but yogurt-based drinks are part of the region's food traditions.</p>
</div>
`}
</div>
</div>
`;

mapHint.textContent=`Exploring lassi traditions of ${normalizedName}.`;
}

function openVariety(id){
const variety=traditionById(id);

if(!variety){
return;
}

openModal(variety);
}

function openGalleryItem(id){
const item=lassiData.gallery.find(galleryItem=>galleryItem.id===id);

if(!item){
return;
}

const variety=traditionById(item.varietyId);

if(!variety){
return;
}

openModal(variety);
}

function openModal(variety){
document.getElementById("modal-image").innerHTML=`
<img src="${variety.image}" alt="${variety.name}">
`;

document.getElementById("modal-region").textContent=
`${variety.region} · ${variety.state}`;

document.getElementById("modal-title").textContent=variety.name;

document.getElementById("modal-description").textContent=
variety.shortDescription;

document.getElementById("modal-type").textContent=
variety.type;

document.getElementById("modal-state").textContent=
variety.state;

document.getElementById("modal-ingredients").textContent=
variety.ingredients.join(", ");

document.getElementById("modal-preparation").textContent=
variety.preparation;

document.getElementById("modal-occasions").textContent=
variety.occasions.join(", ");

document.getElementById("modal-tradition").textContent=
variety.tradition;

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
svg.setAttribute("aria-label","Interactive map of India showing regional lassi traditions");
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
const rawName=
path.dataset.state||
path.getAttribute("data-name")||
path.getAttribute("aria-label")||
path.getAttribute("title")||
path.getAttribute("id")||
"";

const stateName=normalizeStateName(rawName);

if(!stateName){
return;
}

path.classList.add("india-state");
path.dataset.state=stateName;
path.setAttribute("tabindex","0");
path.setAttribute("role","button");
path.setAttribute(
"aria-label",
`Explore lassi traditions of ${stateName}`
);

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

function selectState(path,stateName){
mapContainer.querySelectorAll(".india-state").forEach(state=>{
state.classList.remove("selected");
});

path.classList.add("selected");

renderState(stateName);
}

function markFeaturedStates(svg){
const featuredStates=new Set(
lassiData.varieties
.filter(variety=>variety.featured)
.map(variety=>variety.state)
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
panel.classList.toggle(
"active",
panel.id===`tab-${target}`
);
});
});
});
}

function setupInteractions(){
document.addEventListener("click",event=>{
const varietyButton=event.target.closest("[data-variety]");

if(varietyButton){
openVariety(varietyButton.dataset.variety);
return;
}

const galleryButton=event.target.closest("[data-gallery-open]");

if(galleryButton){
openGalleryItem(galleryButton.dataset.galleryOpen);
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
renderVarieties();
renderPreparation();
renderCulture();
renderGalleryFilters();
renderGallery();
loadMap();
setupTabs();
setupInteractions();
setupModal();
}

init();