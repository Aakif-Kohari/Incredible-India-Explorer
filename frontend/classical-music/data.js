// data.js - Classical Music Accordion Data

window.classicalMusicData = [
    {
        id: "history",
        title: "History and Evolution",
        content: `
            <p>Both Hindustani and Carnatic music trace their theoretical roots back to ancient Hindu texts, specifically the <em>Sama Veda</em> and Bharata Muni's <em>Natya Shastra</em>. Until the late 12th century, Indian classical music was essentially a unified system.</p>
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Music</h4>
                    <p>With the arrival of Persian and Islamic influences during the Delhi Sultanate and Mughal Empire, North Indian music absorbed new instruments, scales, and styles (such as the Khayal and Tarana). This fusion resulted in the Hindustani tradition, heavily shaped by the royal courts.</p>
                </div>
                <div class="split-col">
                    <h4>Carnatic Music</h4>
                    <p>South Indian music remained relatively insulated from Central Asian influences. It evolved through the Bhakti movement, deeply rooted in Hindu temple traditions and religious devotion. The system was codified in the 16th century by Purandara Dasa, known as the Pitamaha (grandfather) of Carnatic music.</p>
                </div>
            </div>
        `
    },
    {
        id: "ragas",
        title: "The Raga System",
        content: `
            <p>A Raga is a melodic framework used for improvisation and composition. It is more than a scale; it is an aesthetic entity with specific rules about ascending/descending notes, emphasis, and ornamentation.</p>
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Ragas</h4>
                    <p>Hindustani music classifies ragas primarily through the <strong>Thaat</strong> system (10 parent scales) introduced by V.N. Bhatkhande. A defining feature is the <em>Time Theory</em>—ragas are strictly associated with specific times of the day or seasons (e.g., Raga Bhairav in the morning, Raga Yaman in the evening).</p>
                </div>
                <div class="split-col">
                    <h4>Carnatic Ragas</h4>
                    <p>Carnatic music utilizes the highly mathematical <strong>Melakarta</strong> system, consisting of 72 fundamental parent ragas based on all possible combinations of the 12 semi-tones. While emotional expression is vital, strict adherence to the time theory is less prevalent today compared to the North.</p>
                </div>
            </div>
        `
    },
    {
        id: "talas",
        title: "The Tala (Rhythmic) System",
        content: `
            <p>Tala refers to the rhythmic cycle in Indian classical music. Both systems use complex metric cycles, but their structures and terminologies differ significantly.</p>
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Talas</h4>
                    <p>Rhythm is typically maintained by the Tabla. Cycles are defined by beats (matras) and divisions (vibhags). Common talas include:</p>
                    <ul>
                        <li><strong>Teentaal:</strong> 16 beats (4+4+4+4)</li>
                        <li><strong>Ektaal:</strong> 12 beats (2+2+2+2+2+2)</li>
                        <li><strong>Jhaptaal:</strong> 10 beats (2+3+2+3)</li>
                    </ul>
                </div>
                <div class="split-col">
                    <h4>Carnatic Talas</h4>
                    <p>Rhythm is primarily kept by the Mridangam. The system is based on the <em>Suladi Sapta Talas</em> (7 families) which expand into 35 standard talas based on the length of the main beat (laghu). Common talas include:</p>
                    <ul>
                        <li><strong>Adi Tala:</strong> 8 beats</li>
                        <li><strong>Rupaka Tala:</strong> 3 or 6 beats</li>
                        <li><strong>Misra Chapu:</strong> 7 beats</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: "gharanas",
        title: "Gharanas vs. Sampradayas",
        content: `
            <p>The transmission of musical knowledge from guru (teacher) to shishya (student) is central to both traditions, but they organize this lineage differently.</p>
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Gharanas</h4>
                    <p>Hindustani music is heavily organized into <strong>Gharanas</strong> (derived from 'ghar' meaning house/family). These are stylistic schools representing distinct musical lineages, often tied to a specific geographic region or royal court. Notable Gharanas include:</p>
                    <ul>
                        <li>Gwalior Gharana (The oldest Khayal school)</li>
                        <li>Kirana Gharana (Known for precise intonation)</li>
                        <li>Jaipur-Atrauli Gharana (Known for complex ragas)</li>
                        <li>Agra & Patiala Gharanas</li>
                    </ul>
                </div>
                <div class="split-col">
                    <h4>Carnatic Sampradayas</h4>
                    <p>Carnatic music does not use the Gharana system. Instead, it relies on <strong>Sampradayas</strong> or <em>Bani</em>, which are styles passed down through a lineage of gurus. Because compositions are strictly notated and universally accepted, stylistic differences between schools are more subtle, focusing on interpretation rather than fundamental structural changes.</p>
                </div>
            </div>
        `
    },
    {
        id: "composers",
        title: "Major Composers & Musicians",
        content: `
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Legends</h4>
                    <ul>
                        <li><strong>Tansen:</strong> The legendary 16th-century musician in Emperor Akbar's court.</li>
                        <li><strong>Bade Ghulam Ali Khan:</strong> 20th-century maestro of the Patiala gharana.</li>
                        <li><strong>Bhimsen Joshi:</strong> Renowned for his powerful Khayal singing (Kirana gharana).</li>
                        <li><strong>Ravi Shankar:</strong> Sitar maestro who introduced Indian classical music to the West.</li>
                    </ul>
                </div>
                <div class="split-col">
                    <h4>The Carnatic Trinity</h4>
                    <p>Carnatic music is deeply rooted in the compositions of the "Trinity" from the 18th/19th century in Thanjavur:</p>
                    <ul>
                        <li><strong>Tyagaraja:</strong> Composed thousands of devotional songs in Telugu.</li>
                        <li><strong>Muthuswami Dikshitar:</strong> Known for slow, meditative compositions in Sanskrit.</li>
                        <li><strong>Syama Sastri:</strong> Renowned for complex rhythmic structures.</li>
                        <li><strong>M. S. Subbulakshmi:</strong> The legendary 20th-century vocalist.</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: "instruments",
        title: "Instruments",
        content: `
            <p>While the Tanpura provides the drone in both systems, the melody and rhythm instruments differ greatly.</p>
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Instruments</h4>
                    <ul>
                        <li><strong>Melody:</strong> Sitar, Sarod, Santoor, Bansuri, Shehnai, Sarangi.</li>
                        <li><strong>Rhythm:</strong> Tabla, Pakhawaj.</li>
                    </ul>
                </div>
                <div class="split-col">
                    <h4>Carnatic Instruments</h4>
                    <ul>
                        <li><strong>Melody:</strong> Saraswati Veena, Violin (adapted from the West), Venu (bamboo flute), Nadaswaram.</li>
                        <li><strong>Rhythm:</strong> Mridangam, Ghatam (clay pot), Kanjira (tambourine).</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: "performance",
        title: "Performance Structure",
        content: `
            <div class="content-split">
                <div class="split-col">
                    <h4>Hindustani Performance</h4>
                    <p>Performances are highly improvisational, often spending over an hour on a single raga.</p>
                    <ul>
                        <li><strong>Alap:</strong> Slow, unmetered exploration of the raga without percussion.</li>
                        <li><strong>Jor & Jhala:</strong> Introduction of a rhythmic pulse, increasing in speed.</li>
                        <li><strong>Gat / Bandish:</strong> The fixed composition enters along with the Tabla, leading into extensive rhythmic and melodic improvisation.</li>
                    </ul>
                </div>
                <div class="split-col">
                    <h4>Carnatic Performance</h4>
                    <p>Performances are structured around a pre-composed repertoire (often 8-10 pieces in a concert).</p>
                    <ul>
                        <li><strong>Varnam:</strong> An introductory piece that warms up the musicians and audience.</li>
                        <li><strong>Kriti:</strong> The main composition format.</li>
                        <li><strong>Improvisation elements:</strong> <em>Alapana</em> (melodic exploration before the Kriti), <em>Neraval</em> (improvising on a specific lyric), and <em>Kalpana Swaras</em> (rhythmic solfa syllable improvisation).</li>
                    </ul>
                </div>
            </div>
        `
    }
];
