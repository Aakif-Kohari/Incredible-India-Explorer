const MP_LOCATIONS=[
  {name:"Mysore Palace",lat:12.3052,lng:76.6552,description:"The Amba Vilas Palace, official residence of the Wadiyar dynasty and the crown jewel of Mysuru's royal heritage."},
  {name:"Chamundi Hills",lat:12.2780,lng:76.6730,description:"Hill rising over 1,000 m with the Chamundeshwari Temple, presiding deity of the Wadiyars, overlooking the palace."},
  {name:"Brindavan Gardens",lat:12.4233,lng:76.5733,description:"Celebrated terraced gardens below the Krishnaraja Sagar Dam, about 20 km from the palace."},
  {name:"Jaganmohan Palace",lat:12.3047,lng:76.6489,description:"Wadiyar art gallery and auditorium that served as the royal court while the main palace was rebuilt after the 1897 fire."},
  {name:"Mysuru Zoo",lat:12.3031,lng:76.6530,description:"Sri Chamarajendra Zoological Gardens, one of India's oldest and most well-kept zoos, near the palace grounds."}
];

const MP_GALLERY=[
  {src:"../../assets/Mysore_Palace.png",caption:"The grand Indo-Saracenic facade of Mysore Palace beneath its gilded central dome."},
  {src:"../../assets/Hawa_Mahal.png",caption:"Ornate arches and scalloped windows characteristic of Indo-Saracenic royal design."},
  {src:"../../assets/Golden_Temple.png",caption:"Gilded domes and shimmering exteriors that echo the palace's Dasara illumination."},
  {src:"../../assets/Taj_Mahal.png",caption:"Marble craftsmanship comparable to India's finest monuments, seen in the palace's domed towers."}
];

const MP_FACTS=[
  "The current palace was rebuilt in just a few years after a fire during Princess Jayalakshmi Ammani's wedding in 1897 destroyed much of the old wooden structure.",
  "British architect Henry Irwin designed the palace in the Indo-Saracenic style, blending Hindu, Islamic, Rajput, and Gothic influences.",
  "The palace facade stretches about 245 feet across, crowned by a gilded central dome rising roughly 145 feet above the courtyard.",
  "During Dasara, nearly 100,000 bulbs illuminate the palace — a spectacle that has become Karnataka's most iconic festival image.",
  "The golden howdah displayed in the Gombe Thotti pavilion once carried the maharaja atop an elephant during Jamboo Savari processions.",
  "Raja Ravi Varma's murals inside the palace depict grand Dussehra processions of the Mysore court.",
  "Mysore Palace is among the most visited monuments in India, drawing an estimated six million visitors every year."
];

let map=null,currentGalleryIndex=0,factIndex=0,factIntervalId=null,lightboxKeydownHandler=null;

function init(){initGallery();initFactsRotator();initMap();initLightbox()}
if(document.readyState!=="loading")init();else document.addEventListener("DOMContentLoaded",init);
if(window.appLifecycle)window.appLifecycle.registerCleanup(()=>{if(factIntervalId){clearInterval(factIntervalId);factIntervalId=null}if(lightboxKeydownHandler){document.removeEventListener("keydown",lightboxKeydownHandler);lightboxKeydownHandler=null}if(map){map.remove();map=null}});

function initGallery(){
  const g=document.getElementById("mp-gallery-grid");if(!g)return;g.innerHTML="";
  MP_GALLERY.forEach((item,index)=>{
    const f=document.createElement("figure");f.className="mp-gallery-item";f.setAttribute("tabindex","0");f.setAttribute("role","button");f.setAttribute("aria-label",`Open image: ${item.caption}`);
    f.innerHTML=`<img src="${item.src}" alt="${item.caption}" loading="lazy"><figcaption>${item.caption}</figcaption>`;
    f.addEventListener("click",()=>openLightbox(index));
    f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLightbox(index)}});
    g.appendChild(f);
  });
}

function initLightbox(){
  const lb=document.getElementById("mp-lightbox");if(!lb)return;
  document.querySelectorAll("[data-close-lightbox]").forEach(el=>el.addEventListener("click",closeLightbox));
  const prev=document.getElementById("mp-lightbox-prev"),next=document.getElementById("mp-lightbox-next");
  if(prev)prev.addEventListener("click",()=>showGalleryImage(currentGalleryIndex-1));
  if(next)next.addEventListener("click",()=>showGalleryImage(currentGalleryIndex+1));
  lightboxKeydownHandler=e=>{if(lb.hidden)return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowRight")showGalleryImage(currentGalleryIndex+1);if(e.key==="ArrowLeft")showGalleryImage(currentGalleryIndex-1)};
  document.addEventListener("keydown",lightboxKeydownHandler);
}

function openLightbox(i){const lb=document.getElementById("mp-lightbox");if(!lb)return;lb.hidden=false;document.body.style.overflow="hidden";showGalleryImage(i)}
function closeLightbox(){const lb=document.getElementById("mp-lightbox");if(!lb)return;lb.hidden=true;document.body.style.overflow=""}
function showGalleryImage(i){const total=MP_GALLERY.length;currentGalleryIndex=(i+total)%total;const item=MP_GALLERY[currentGalleryIndex];const img=document.getElementById("mp-lightbox-image"),cap=document.getElementById("mp-lightbox-caption");if(img){img.src=item.src;img.alt=item.caption}if(cap)cap.textContent=item.caption}

function initFactsRotator(){
  const factEl=document.getElementById("mp-fact-text"),dotsWrap=document.getElementById("mp-fact-dots");if(!factEl)return;
  if(dotsWrap)dotsWrap.innerHTML="";if(factIntervalId)clearInterval(factIntervalId);
  if(dotsWrap){MP_FACTS.forEach((_,i)=>{const dot=document.createElement("button");dot.className="mp-fact-dot"+(i===0?" active":"");dot.setAttribute("aria-label","Show fact "+(i+1));dot.addEventListener("click",()=>showFact(i));dotsWrap.appendChild(dot)})}
  function showFact(i){factIndex=i;factEl.style.opacity="0";setTimeout(()=>{factEl.textContent=MP_FACTS[factIndex];factEl.style.opacity="1"},200);if(dotsWrap)[...dotsWrap.children].forEach((d,di)=>d.classList.toggle("active",di===factIndex))}
  showFact(0);factIntervalId=setInterval(()=>showFact((factIndex+1)%MP_FACTS.length),6000);
}

function initMap(){
  const mc=document.getElementById("mp-map");if(!mc||typeof L==="undefined")return;
  if(map!==null){try{map.remove()}catch(e){}map=null}
  map=L.map("mp-map",{scrollWheelZoom:false,minZoom:8}).setView([12.3052,76.6552],11);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:"&copy; OpenStreetMap contributors &copy; CARTO",maxZoom:18}).addTo(map);
  MP_LOCATIONS.forEach(loc=>{const isPalace=loc.name.includes("Palace");const marker=L.circleMarker([loc.lat,loc.lng],{radius:isPalace?9:7,color:isPalace?"#ff9933":"#0284c7",fillColor:isPalace?"#ffb01f":"#38bdf8",fillOpacity:.85,weight:2}).addTo(map);marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`)});
}
