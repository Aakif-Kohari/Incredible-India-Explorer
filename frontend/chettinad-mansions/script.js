const tourRooms = [
    {
        id: "thinnai",
        title: "1. The Thinnai (Veranda)",
        description: "Your journey begins at the Thinnai, an elevated open veranda flanking the massive wooden front doors. It served as a public space where the men of the house would conduct business, receive guests, and discuss trade.",
        materials: "Solid Burma Teak pillars, ornately carved brackets, and brick-and-lime mortar platforms.",
        climate: "Open to the street, allowing the evening breeze to cool the house entrance.",
        trade: "Teak imported from Burma reflects the Chettiars' deep involvement in the Southeast Asian timber trade."
    },
    {
        id: "mugappu",
        title: "2. The Mugappu (Reception)",
        description: "Stepping through the imposing Darwaza (front door), you enter the Mugappu. This grand reception hall acts as a transitional buffer between the street and the inner sanctity of the home.",
        materials: "Heavy wooden doors fortified with brass knobs, surrounded by intricate stucco work (gargoyles and deities).",
        climate: "Functions as a thermal buffer zone, keeping the intense outside heat from penetrating the inner living areas.",
        trade: "Often decorated with imported European brass fixtures and Victorian lamps."
    },
    {
        id: "mutram",
        title: "3. The Mutram (Main Courtyard)",
        description: "The architectural core of the mansion. The Mutram is a vast, open-to-sky courtyard surrounded by a pillared corridor. It was the primary gathering space for women, used for daily chores, drying spices, and family rituals.",
        materials: "Handmade Athangudi floor tiles, granite pillars, and sloping terracotta roof tiles.",
        climate: "Acts as a thermal chimney. Hot air rises out through the open roof, drawing cool air in and establishing a continuous breeze.",
        trade: "Athangudi tiles were initially inspired by European floor tiles before being localized."
    },
    {
        id: "kalyana",
        title: "4. Kalyana Kottagai (Marriage Hall)",
        description: "Located beyond the first courtyard, this magnificent hall is designed specifically to host lavish weddings and communal feasts, capable of accommodating hundreds of guests.",
        materials: "Italian marble flooring, towering wooden pillars, and painted ceilings.",
        climate: "High ceilings and alignment with the open courtyards ensure natural airflow even during densely packed events.",
        trade: "A stunning display of wealth, featuring Belgian glass mirrors and massive Czechoslovakian chandeliers."
    },
    {
        id: "irandaam",
        title: "5. Irandaam Kattu (Inner Courtyards)",
        description: "Moving deeper into the vast rectangular plot, you discover a series of subsequent courtyards (the second and sometimes third kattu). These are highly private zones consisting of bedrooms, dining halls, and extensive kitchens.",
        materials: "Local brick and lime mortar (karai), red oxide flooring, and sturdy traditional mud stoves.",
        climate: "Works in tandem with the front courtyards to create a wind tunnel effect across the entire length of the property.",
        trade: "Surrounded by massive storerooms that held imported spices from Ceylon and Malaya, alongside local grains."
    }
];

let currentRoomIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('room-title');
    const descEl = document.getElementById('room-description');
    const materialsEl = document.getElementById('room-materials');
    const climateEl = document.getElementById('room-climate');
    const tradeEl = document.getElementById('room-trade');
    const counterEl = document.getElementById('room-counter');
    const contentContainer = document.getElementById('tour-content');
    const timelineContainer = document.getElementById('progress-timeline');
    
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Initialize progress timeline
    tourRooms.forEach((room, index) => {
        const li = document.createElement('li');
        li.className = 'timeline-item';
        li.textContent = room.title.split('. ')[1]; // Get just the name
        li.id = `timeline-node-${index}`;
        timelineContainer.appendChild(li);
    });

    function updateTour() {
        const room = tourRooms[currentRoomIndex];
        
        // Trigger reflow for fade animation
        contentContainer.style.animation = 'none';
        contentContainer.offsetHeight; // trigger reflow
        contentContainer.style.animation = 'fadeIn 0.4s ease-in-out';

        // Update content
        titleEl.textContent = room.title;
        descEl.textContent = room.description;
        materialsEl.textContent = room.materials;
        climateEl.textContent = room.climate;
        tradeEl.textContent = room.trade;
        counterEl.textContent = `Room ${currentRoomIndex + 1} of ${tourRooms.length}`;

        // Update buttons
        btnPrev.disabled = currentRoomIndex === 0;
        btnNext.disabled = currentRoomIndex === tourRooms.length - 1;

        // Update timeline
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index < currentRoomIndex) {
                item.classList.add('completed');
            } else if (index === currentRoomIndex) {
                item.classList.add('active');
            }
        });
    }

    btnNext.addEventListener('click', () => {
        if (currentRoomIndex < tourRooms.length - 1) {
            currentRoomIndex++;
            updateTour();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentRoomIndex > 0) {
            currentRoomIndex--;
            updateTour();
        }
    });

    // Initial render
    updateTour();
});
