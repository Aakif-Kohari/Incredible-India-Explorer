/**
 * Indian Cinema Evolution Timeline Engine
 * Horizontal filmstrip animated timeline with verified historical milestones,
 * frame-by-frame scroll reveals, era filtering, and copyright-free SVG illustrations.
 */

export const CINEMA_MILESTONES = [
  {
    id: 'milestone-1913',
    year: 1913,
    title: 'Raja Harishchandra & The Dawn of Indian Cinema',
    era: 'Silent Era',
    industry: 'Bombay (Pre-Bollywood)',
    pioneer: 'Dadasaheb Phalke',
    summary: 'The inaugural full-length Indian feature film released on May 3, 1913, establishing the foundations of Indian cinematic storytelling.',
    details: 'Directed and produced by Dadasaheb Phalke (known as the Father of Indian Cinema), this silent mythic spectacle had a 40-minute runtime across four reels. Phalke imported printing machinery and single-handedly managed script, camera, and editing.',
    significance: 'Demonstrated local technical capability and proved Indian mythic narratives could captivate commercial audiences.',
    svgIcon: 'reel'
  },
  {
    id: 'milestone-1931',
    year: 1931,
    title: 'Alam Ara & The Arrival of the Talkies',
    era: 'Talkies Era',
    industry: 'Imperial Film Company',
    pioneer: 'Ardeshir Irani',
    summary: 'India\'s first sound film premiered at the Majestic Cinema in Bombay on March 14, 1931, introducing song, dialogue, and musical orchestration.',
    details: 'Featuring Master Vithal and Zubeida, Alam Ara contained 7 recorded songs. Sound was recorded directly onto Tanar single-system sound equipment while hiding microphones inside tree trunks and props during live shooting.',
    significance: 'Established song and dance as a defining structural hallmark of mainstream Indian cinema.',
    svgIcon: 'audio'
  },
  {
    id: 'milestone-1937',
    year: 1937,
    title: 'Kisan Kanya & Early Regional Industry Rise',
    era: 'Talkies & Early Color',
    industry: 'Bengali, Tamil, Telugu & Marathi Studios',
    pioneer: 'Moti Gidwani & Ardeshir Irani',
    summary: 'First indigenous Indian color film produced using Cinecolor process, while regional cinema studios flourished in Kolkata, Chennai, and Kolhapur.',
    details: 'Concurrently, New Theatres (Kolkata), Prabhat Film Company (Kolhapur/Pune), and Gemini Studios (Madras) developed vibrant studio ecosystems. Films like Kalidas (1931, Tamil) and Bhakta Prahlada (1932, Telugu) solidified regional language storytelling.',
    significance: 'Transformed Indian cinema into a polycentric multi-lingual industry rather than a single monolingual hub.',
    svgIcon: 'palette'
  },
  {
    id: 'milestone-1951',
    year: 1951,
    title: 'Awara & The Golden Age Studio System',
    era: 'Golden Age',
    industry: 'Hindi Cinema',
    pioneer: 'Raj Kapoor & Shankar-Jaikishan',
    summary: 'Post-independence cinema tackled socio-economic idealism, achieving massive popularity across USSR, Middle East, and East Europe.',
    details: 'Directed by Raj Kapoor, Awara blended Charlie Chaplin-inspired vagabond archetype with urban social realism and dream sequence choreography. It was nominated for the Grand Prize at the 1953 Cannes Film Festival.',
    significance: 'Marked the first major wave of Indian cinema\'s soft power and global popularity across non-Western nations.',
    svgIcon: 'globe'
  },
  {
    id: 'milestone-1955',
    year: 1955,
    title: 'Pather Panchali & The Parallel Cinema Movement',
    era: 'Parallel Cinema',
    industry: 'Bengali Cinema',
    pioneer: 'Satyajit Ray',
    summary: 'Satyajit Ray\'s landmark debut inaugurated Indian Neo-Realism, winning Best Human Document at the 1956 Cannes Film Festival.',
    details: 'Filmed on location with non-professional actors, natural lighting, and Subrata Mitra\'s pioneering bounce-lighting techniques. Set in rural Bengal, Pather Panchali brought international critical acclaim to Indian artistic cinema.',
    significance: 'Established a globally revered Parallel Cinema stream alongside commercial mainstream movies.',
    svgIcon: 'camera'
  },
  {
    id: 'milestone-1957',
    year: 1957,
    title: 'Mother India & First Academy Award Nomination',
    era: 'Golden Age Epics',
    industry: 'Mehboob Productions',
    pioneer: 'Mehboob Khan & Nargis',
    summary: 'Epic Technicolor drama depicting post-colonial rural agrarian resilience, becoming the first Indian film nominated for Best Foreign Language Film at the Oscars.',
    details: 'Filmed in 35mm Technicolor with massive set pieces, Mother India lost the Academy Award by just one vote to Federico Fellini\'s Nights of Cabiria. It remains an iconic cultural symbol of Indian nationhood.',
    significance: 'Set the standard for large-scale emotional Indian melodrama and international Oscar submissions.',
    svgIcon: 'award'
  },
  {
    id: 'milestone-1975',
    year: 1975,
    title: 'Sholay & The Masala Epic Revolution',
    era: 'Masala & Action Era',
    industry: 'Bombay Mainstream',
    pioneer: 'Ramesh Sippy, Salim-Javed & Amitabh Bachchan',
    summary: 'Widely considered the ultimate Indian blockbuster, blending Western tropes, action, comedy, romance, and stereophonic sound technology.',
    details: 'Filmed on 70mm film format with 6-track stereophonic sound in the rocky terrain of Ramanagara (Karnataka). It introduced the iconic "Angry Young Man" archetype through Amitabh Bachchan\'s performance.',
    significance: 'Defined the multi-genre "Masala film" structure that dominated Indian mainstream box office for decades.',
    svgIcon: 'fire'
  },
  {
    id: 'milestone-1995',
    year: 1995,
    title: 'DDLJ & The Overseas Diaspora Boom',
    era: 'Diaspora & Multiplex Era',
    industry: 'Yash Raj Films',
    pioneer: 'Aditya Chopra & Shah Rukh Khan',
    summary: 'Redefined romance for global Non-Resident Indians (NRIs), establishing long theatrical runs and overseas box-office expansion.',
    details: 'Dilwale Dulhania Le Jayenge ran continuously in Mumbai\'s Maratha Mandir theatre for over 25 years. It synchronized Indian traditional values with globalization and international tourism.',
    significance: 'Transformed overseas markets (North America, UK, Gulf) into major revenue pillars for Indian cinema.',
    svgIcon: 'heart'
  },
  {
    id: 'milestone-2015',
    year: 2015,
    title: 'Baahubali & The Pan-Indian Cinema Shift',
    era: 'Pan-Indian Spectacle',
    industry: 'Telugu Cinema (Tollywood)',
    pioneer: 'S. S. Rajamouli & Arka Mediaworks',
    summary: 'Two-part epic fantasy that erased linguistic boundaries between North and South Indian film markets through high-concept visual effects.',
    details: 'Produced on a budget exceeding ₹250 crore, Baahubali: The Beginning and Baahubali 2: The Conclusion broke all historical box office records, achieving worldwide grosses of over ₹1,800 crore across Telugu, Tamil, Hindi, and Malayalam releases.',
    significance: 'Paved the way for regional industries to lead national and international box office narratives.',
    svgIcon: 'sparkles'
  },
  {
    id: 'milestone-2022',
    year: 2022,
    title: 'RRR & Modern Global Oscar & Streaming Triumph',
    era: 'Global Crossover',
    industry: 'Pan-Indian Crossover',
    pioneer: 'S. S. Rajamouli & M. M. Keeravani',
    summary: 'Achieved unprecedented global pop-culture penetration, winning the Academy Award and Golden Globe for Best Original Song ("Naatu Naatu").',
    details: 'RRR combined high-octane kinetic choreography with historical fiction. Simultaneously, Kartiki Gonsalves\'s The Elephant Whisperers won the Academy Award for Best Documentary Short Film, highlighting Indian storytelling versatility.',
    significance: 'Solidified Indian cinema\'s transition from niche diaspora markets to mainstream international pop culture.',
    svgIcon: 'trophy'
  }
];

export const CINEMA_ERAS = [
  'All Eras',
  'Silent Era',
  'Talkies Era',
  'Golden Age',
  'Parallel Cinema',
  'Masala & Action Era',
  'Diaspora & Multiplex Era',
  'Pan-Indian Spectacle',
  'Global Crossover'
];

/**
 * Filter milestones by selected era string
 */
export function filterMilestonesByEra(milestones, era) {
  if (!era || era === 'All Eras') {
    return [...milestones];
  }
  return milestones.filter(m => m.era === era);
}

/**
 * Calculate horizontal scroll transform offset for filmstrip container
 */
export function calculateFilmstripOffset(scrollPercentage, containerWidth, filmstripWidth) {
  const maxScroll = Math.max(0, filmstripWidth - containerWidth);
  const clampedPercentage = Math.max(0, Math.min(100, scrollPercentage));
  const offset = -1 * (maxScroll * (clampedPercentage / 100));
  return offset === 0 ? 0 : offset;
}

/**
 * Calculate active frame index based on scroll percentage
 */
export function getActiveFrameIndex(scrollPercentage, totalFrames) {
  if (totalFrames <= 0) return 0;
  const step = 100 / totalFrames;
  const index = Math.floor(scrollPercentage / step);
  return Math.max(0, Math.min(totalFrames - 1, index));
}

/**
 * Get summary stats for timeline
 */
export function getTimelineStats(milestones) {
  const years = milestones.map(m => m.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const uniqueEras = new Set(milestones.map(m => m.era)).size;
  const uniquePioneers = new Set(milestones.map(m => m.pioneer)).size;

  return {
    totalMilestones: milestones.length,
    yearSpan: `${minYear} - ${maxYear}`,
    erasCount: uniqueEras,
    pioneersCount: uniquePioneers
  };
}

// DOM Interaction setup when executed in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initCinemaTimeline();
  });
}

export function initCinemaTimeline() {
  const filmstripTrack = document.getElementById('filmstripTrack');
  const eraSelect = document.getElementById('eraFilter');
  const progressBar = document.getElementById('timelineProgress');
  const currentFrameSpan = document.getElementById('currentFrameNum');
  const totalFramesSpan = document.getElementById('totalFramesNum');
  const modalOverlay = document.getElementById('milestoneModal');
  const modalCloseBtn = document.getElementById('modalClose');

  if (!filmstripTrack) return;

  let currentEra = 'All Eras';
  let filteredData = filterMilestonesByEra(CINEMA_MILESTONES, currentEra);

  function renderFilmstrip(data) {
    filmstripTrack.innerHTML = '';
    totalFramesSpan.textContent = data.length;

    data.forEach((item, index) => {
      const frameEl = document.createElement('article');
      frameEl.className = 'filmstrip-frame';
      frameEl.setAttribute('tabindex', '0');
      frameEl.setAttribute('role', 'button');
      frameEl.setAttribute('aria-label', `${item.year}: ${item.title}`);
      frameEl.dataset.id = item.id;
      frameEl.dataset.index = index;

      frameEl.innerHTML = `
        <div class="sprocket-holes top">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="frame-content">
          <div class="frame-header">
            <span class="year-badge">${item.year}</span>
            <span class="era-tag">${item.era}</span>
          </div>
          <div class="frame-illustration" aria-hidden="true">
            ${getSvgIllustration(item.svgIcon)}
          </div>
          <h3 class="frame-title">${item.title}</h3>
          <p class="frame-pioneer">🎬 ${item.pioneer}</p>
          <p class="frame-summary">${item.summary}</p>
          <button class="details-btn" data-id="${item.id}">Explore Full Milestone →</button>
        </div>
        <div class="sprocket-holes bottom">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      `;

      frameEl.addEventListener('click', () => openModal(item));
      frameEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });

      filmstripTrack.appendChild(frameEl);
    });

    updateScrollState(0);
  }

  function getSvgIllustration(iconType) {
    switch (iconType) {
      case 'reel':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="50" r="10" fill="currentColor"/><circle cx="30" cy="30" r="8" fill="currentColor"/><circle cx="70" cy="30" r="8" fill="currentColor"/><circle cx="30" cy="70" r="8" fill="currentColor"/><circle cx="70" cy="70" r="8" fill="currentColor"/></svg>`;
      case 'audio':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M20 40 H35 L55 20 V80 L35 60 H20 Z" fill="currentColor"/><path d="M68 35 Q78 50 68 65" fill="none" stroke="currentColor" stroke-width="4"/><path d="M78 25 Q92 50 78 75" fill="none" stroke="currentColor" stroke-width="4"/></svg>`;
      case 'palette':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M50 15 C25 15 15 32 15 52 C15 72 32 85 52 85 C60 85 66 79 66 72 C66 69 64 66 68 64 C72 62 85 68 85 52 C85 32 75 15 50 15 Z" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="32" cy="38" r="6" fill="#e74c3c"/><circle cx="50" cy="30" r="6" fill="#f1c40f"/><circle cx="68" cy="38" r="6" fill="#3498db"/><circle cx="35" cy="62" r="6" fill="#2ecc71"/></svg>`;
      case 'globe':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="50" rx="36" ry="16" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="3"/><line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="3"/></svg>`;
      case 'camera':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><rect x="15" y="35" width="55" height="40" rx="5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M70 45 L90 35 V65 L70 55 Z" fill="currentColor"/><circle cx="42" cy="55" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="54" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="3"/></svg>`;
      case 'award':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><circle cx="50" cy="38" r="22" fill="none" stroke="currentColor" stroke-width="4"/><polygon points="50,22 55,32 66,33 58,41 60,52 50,46 40,52 42,41 34,33 45,32" fill="currentColor"/><path d="M38 56 L30 88 L50 78 L70 88 L62 56" fill="none" stroke="currentColor" stroke-width="3"/></svg>`;
      case 'fire':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M50 15 C50 15 65 35 65 55 C65 72 56 85 40 85 C24 85 15 72 15 55 C15 38 32 25 32 25 C32 25 35 45 50 15 Z" fill="currentColor"/><path d="M50 40 C50 40 58 52 58 64 C58 74 52 80 44 80 C36 80 30 74 30 64 C30 52 42 45 50 40 Z" fill="#ffb703"/></svg>`;
      case 'heart':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M50 82 L20 52 C10 40 16 20 34 20 C44 20 50 28 50 28 C50 28 56 20 66 20 C84 20 90 40 80 52 Z" fill="currentColor"/></svg>`;
      case 'sparkles':
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M50 10 L56 38 L84 44 L56 50 L50 78 L44 50 L16 44 L44 38 Z" fill="currentColor"/><path d="M78 68 L81 80 L93 83 L81 86 L78 98 L75 86 L63 83 L75 80 Z" fill="currentColor"/></svg>`;
      case 'trophy':
      default:
        return `<svg viewBox="0 0 100 100" class="cinema-svg"><path d="M25 20 H75 V45 C75 60 60 70 50 70 C40 70 25 60 25 45 Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M25 25 H12 V40 C12 48 25 48 25 45" fill="none" stroke="currentColor" stroke-width="3"/><path d="M75 25 H88 V40 C88 48 75 48 75 45" fill="none" stroke="currentColor" stroke-width="3"/><rect x="42" y="70" width="16" height="15" fill="currentColor"/><rect x="30" y="85" width="40" height="10" fill="currentColor"/></svg>`;
    }
  }

  function updateScrollState(percentage) {
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
    const frameIdx = getActiveFrameIndex(percentage, filteredData.length);
    if (currentFrameSpan) {
      currentFrameSpan.textContent = frameIdx + 1;
    }

    const frames = filmstripTrack.querySelectorAll('.filmstrip-frame');
    frames.forEach((f, idx) => {
      if (idx === frameIdx) {
        f.classList.add('active-frame');
      } else {
        f.classList.remove('active-frame');
      }
    });
  }

  // Scroll listener for horizontal filmstrip
  const horizontalSection = document.getElementById('filmstripWrapper');
  if (horizontalSection) {
    horizontalSection.addEventListener('scroll', () => {
      const scrollLeft = horizontalSection.scrollLeft;
      const maxScroll = horizontalSection.scrollWidth - horizontalSection.clientWidth;
      const percentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      updateScrollState(percentage);
    });
  }

  // Era Filter event
  if (eraSelect) {
    eraSelect.addEventListener('change', (e) => {
      currentEra = e.target.value;
      filteredData = filterMilestonesByEra(CINEMA_MILESTONES, currentEra);
      renderFilmstrip(filteredData);
    });
  }

  // Modal handlers
  function openModal(item) {
    if (!modalOverlay) return;
    document.getElementById('modalYear').textContent = item.year;
    document.getElementById('modalEra').textContent = item.era;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalIndustry').textContent = item.industry;
    document.getElementById('modalPioneer').textContent = item.pioneer;
    document.getElementById('modalSummary').textContent = item.summary;
    document.getElementById('modalDetails').textContent = item.details;
    document.getElementById('modalSignificance').textContent = item.significance;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Initial render
  renderFilmstrip(filteredData);
}
