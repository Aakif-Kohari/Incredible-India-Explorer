document.addEventListener('DOMContentLoaded', function(){
	const gallery = document.querySelectorAll('.gallery-grid img');
	const lightbox = document.getElementById('lightbox');
	const lbImg = document.getElementById('lb-img');
	const lbClose = document.getElementById('lb-close');
	const lbPrev = document.getElementById('lb-prev');
	const lbNext = document.getElementById('lb-next');

	// Collect images for lightbox navigation
	const slidesImgs = Array.from(document.querySelectorAll('.carousel-slide img'));
	let lbIndex = 0;

	function openLightboxAt(index){
		const img = slidesImgs[index];
		if(!img) return;
		lbImg.src = img.src;
		lbImg.alt = img.alt || '';
		lightbox.classList.remove('hidden');
		document.body.style.overflow = 'hidden';
		lbIndex = index;
	}

	function closeLb(){
		lightbox.classList.add('hidden');
		lbImg.src = '';
		document.body.style.overflow = '';
	}

	if(slidesImgs.length){
		slidesImgs.forEach((img, i)=>{
			img.style.cursor = 'pointer';
			img.addEventListener('click', ()=> openLightboxAt(i));
		});
	}

	if(lbClose) lbClose.addEventListener('click', closeLb);
	if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLb(); });
	if(lbPrev) lbPrev.addEventListener('click', ()=>{ openLightboxAt((lbIndex-1+slidesImgs.length)%slidesImgs.length); });
	if(lbNext) lbNext.addEventListener('click', ()=>{ openLightboxAt((lbIndex+1)%slidesImgs.length); });



	// Timeline interactions
	const timelineItems = document.querySelectorAll('.timeline-item');
	const tlTitle = document.getElementById('tl-title');
	const tlBody = document.getElementById('tl-body');
	const tlData = [
		{title: 'c. 850 CE — Vijayalaya Chola', body: 'Vijayalaya re-established Chola rule and set foundations for later imperial expansion.'},
		{title: '985–1014 CE — Rajaraja I (early)', body: 'Rajaraja I consolidated power across Tamilakam and initiated major temple programs.'},
		{title: '1014–1044 CE — Rajaraja I & Brihadeeswara', body: 'Rajaraja I undertook large-scale temple building, notably the Brihadeeswara Temple at Thanjavur.'},
		{title: '1012–1044 CE — Rajendra I', body: 'Rajendra I extended Chola influence overseas with naval expeditions and founded Gangaikonda Cholapuram.'},
		{title: '12th–13th c. — Decline', body: 'Gradual decline due to regional pressures, dynastic splits, and changing trade dynamics.'}
	];

	function setActiveTimeline(idx){
		timelineItems.forEach(it=>it.classList.remove('active'));
		const sel = timelineItems[idx]; if(sel) sel.classList.add('active');
		if(tlTitle && tlBody && tlData[idx]){ tlTitle.textContent = tlData[idx].title; tlBody.textContent = tlData[idx].body; }
	}
	timelineItems.forEach(it=> it.addEventListener('click', ()=> setActiveTimeline(parseInt(it.dataset.index,10))));
	setActiveTimeline(0);

	// Accordion behavior
	const accHeaders = document.querySelectorAll('.accordion-header');
	accHeaders.forEach(h=>{
		h.addEventListener('click', ()=>{
			const item = h.parentElement;
			item.classList.toggle('open');
		});
	});

	// Simple carousel
	const track = document.querySelector('.carousel-track');
	const slides = document.querySelectorAll('.carousel-slide');
	const btnPrev = document.getElementById('carousel-prev');
	const btnNext = document.getElementById('carousel-next');
	let currentSlide = 0;

	function showSlide(n){
		currentSlide = (n + slides.length) % slides.length;
		if(track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
	}
	showSlide(0);
	if(btnPrev) btnPrev.addEventListener('click', ()=> showSlide(currentSlide-1));
	if(btnNext) btnNext.addEventListener('click', ()=> showSlide(currentSlide+1));
	// autoplay
	let carouselInterval = setInterval(()=> showSlide(currentSlide+1), 4500);
	// pause on hover
	const carousel = document.getElementById('chola-carousel');
	if(carousel){
		carousel.addEventListener('mouseenter', ()=> clearInterval(carouselInterval));
		carousel.addEventListener('mouseleave', ()=> carouselInterval = setInterval(()=> showSlide(currentSlide+1), 4500));
	}

	// Counters: animate when visible
	const countersEls = document.querySelectorAll('.stat-number');
	const animateCounter = (el)=>{
		const target = parseInt(el.dataset.target,10) || 0;
		let current = 0;
		const duration = 900;
		const stepTime = Math.max(8, Math.floor(duration / (target||1)));
		const increment = Math.max(1, Math.floor(target / (duration / stepTime)));
		const id = setInterval(()=>{
			current += increment;
			if(current >= target){ current = target; clearInterval(id); }
			el.textContent = current;
		}, stepTime);
	};

	if('IntersectionObserver' in window){
		const obs = new IntersectionObserver((entries, o)=>{
			entries.forEach(ent=>{
				if(ent.isIntersecting){ animateCounter(ent.target); o.unobserve(ent.target); }
			});
		}, {threshold:0.4});
		countersEls.forEach(c=> obs.observe(c));
	} else {
		countersEls.forEach(c=> animateCounter(c));
	}
});
