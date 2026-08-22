const scholarsData = {
  scholars: [
    {
      name: "Aryabhata",
      period: "c. 476–550 CE",
      location: "Kusumapura (Modern Patna, Bihar)",
      fields: ["Mathematics", "Astronomy", "Trigonometry"],
      majorWork: "Aryabhatiya",
      contributions: [
        "Place-value based numerical methods.",
        "Approximation of π (3.1416).",
        "Trigonometric concepts involving sine.",
        "Astronomical calculations and explanation of eclipses using shadows.",
        "Earth's rotation as an explanation for the apparent daily motion of the sky."
      ],
      description: "Aryabhata was an influential Indian mathematician and astronomer whose seminal work, the Aryabhatiya, shaped mathematical astronomy. He provided a systematic treatment of the place-value system and correctly theorized that the Earth rotates on its axis.",
      icon: "🌟"
    },
    {
      name: "Brahmagupta",
      period: "c. 598–668 CE",
      location: "Bhinmal (Modern Rajasthan)",
      fields: ["Mathematics", "Astronomy", "Algebra"],
      majorWork: "Brahmasphutasiddhanta",
      contributions: [
        "Rules for arithmetic involving zero.",
        "Systematic use of positive and negative numbers (representing fortunes and debts).",
        "Algebraic methods and solutions for quadratic equations.",
        "Formula for the area of a cyclic quadrilateral."
      ],
      description: "Brahmagupta is celebrated for his Brahmasphutasiddhanta, an important early systematic treatment of arithmetic involving zero. While the concept of zero existed earlier, he established the mathematical rules for computing with it and with negative numbers.",
      icon: "0️⃣"
    },
    {
      name: "Bhaskara I",
      period: "c. 600–680 CE",
      location: "Saurashtra / Asmaka",
      fields: ["Mathematics", "Astronomy", "Trigonometry"],
      majorWork: "Mahabhaskariya",
      contributions: [
        "Important commentator on Aryabhata's mathematical astronomy.",
        "Work involving trigonometry and sine function approximations.",
        "Contributions to astronomical calculations and planetary longitudes.",
        "Early use of the Hindu-Arabic numeral system."
      ],
      description: "Bhaskara I was a leading mathematician of the 7th century who significantly expanded upon the works of Aryabhata. He is noted for his remarkable approximation formula for the sine function, which provided highly accurate results without needing extensive tables.",
      icon: "📜"
    },
    {
      name: "Bhaskara II (Bhaskaracharya)",
      period: "1114–c. 1185 CE",
      location: "Bijapur (Modern Karnataka)",
      fields: ["Mathematics", "Astronomy", "Algebra"],
      majorWork: "Siddhanta Shiromani (includes Lilavati and Bijaganita)",
      contributions: [
        "Advanced arithmetic and algebra.",
        "Solutions to indeterminate quadratic equations (Pell's equation).",
        "Mathematical treatment of planetary motion.",
        "Early ideas involving rates of change and infinitesimal reasoning."
      ],
      description: "Bhaskara II represents the peak of mathematical astronomy in 12th-century India. His works 'Lilavati' and 'Bijaganita' became standard texts. While not the 'inventor of calculus', some of his mathematical ideas anticipated concepts involving infinitesimal changes that were later developed more fully in calculus.",
      icon: "📐"
    },
    {
      name: "Madhava of Sangamagrama",
      period: "c. 1340–1425 CE",
      location: "Kerala",
      fields: ["Mathematics", "Astronomy", "Trigonometry"],
      majorWork: "Venvaroha",
      contributions: [
        "Founder of the Kerala School of Astronomy and Mathematics.",
        "Discovery of infinite series for sine, cosine, and arctangent functions.",
        "Highly accurate calculations involving π using infinite series.",
        "Contributions that anticipated important mathematical techniques related to calculus."
      ],
      description: "Madhava was a visionary mathematician who founded the Kerala School. Centuries before European mathematicians, he discovered infinite series representations for trigonometric functions, laying critical groundwork for mathematical analysis.",
      icon: "♾️"
    },
    {
      name: "Varahamihira",
      period: "c. 505–587 CE",
      location: "Ujjain (Modern Madhya Pradesh)",
      fields: ["Astronomy", "Mathematics"],
      majorWork: "Pancasiddhantika, Brihat Samhita",
      contributions: [
        "Compilation of five earlier astronomical treatises.",
        "Advancements in trigonometry, including properties of sine and cosine.",
        "Encyclopedic observations on planetary movements, eclipses, and comets."
      ],
      description: "Varahamihira was a polymath who worked in Ujjain, a major center of mathematical learning. His 'Pancasiddhantika' is vital for understanding the history of astronomy, as it summarizes several older astronomical systems that are otherwise lost.",
      icon: "🪐"
    },
    {
      name: "Nilakantha Somayaji",
      period: "c. 1444–1544 CE",
      location: "Kerala",
      fields: ["Mathematics", "Astronomy"],
      majorWork: "Tantrasamgraha",
      contributions: [
        "Revision of Aryabhata's planetary model.",
        "Developed a geo-heliocentric model of the solar system (similar to the later Tychonic system).",
        "Refined infinite series expansions and trigonometric calculations."
      ],
      description: "A prominent member of the Kerala School, Nilakantha significantly advanced planetary models. His geo-heliocentric model proposed that the planets orbit the Sun, which in turn orbits the Earth—a major conceptual leap in Indian astronomy.",
      icon: "☀️"
    }
  ],
  concepts: [
    {
      title: "Zero & Place Value",
      icon: "0️⃣",
      description: "Indian mathematicians developed a sophisticated numerical notation system. While many cultures had a concept of 'nothing', India was the first to treat zero as a fully functional number with specific arithmetic rules (defined by Brahmagupta), combined with a base-10 place-value system.",
      visualHtml: `
        <div class="concept-visual place-value">
          <div class="pv-box"><span>5</span> (Five)</div>
          <div class="pv-box"><span>50</span> (Fifty)</div>
          <div class="pv-box"><span>500</span> (Five Hundred)</div>
        </div>
      `
    },
    {
      title: "Approximation of π",
      icon: "⭕",
      description: "From the Sulba Sutras to the Kerala School, Indian mathematicians continually refined methods to approximate π (pi). Aryabhata calculated it accurately to 4 decimal places (3.1416), while Madhava used infinite series to calculate it accurately to 11 decimal places.",
      visualHtml: `
        <div class="concept-visual pi-visual">
          <div class="circle-outline"></div>
          <div class="diameter-line"></div>
          <div class="pi-formula">π ≈ 3.14159265...</div>
        </div>
      `
    },
    {
      title: "Trigonometry",
      icon: "📐",
      description: "Driven by the need for precise astronomical calculations, Indian scholars developed modern trigonometry based on the sine function (jya), replacing the Greek system of chords. This allowed for more complex models of planetary orbits.",
      visualHtml: `
        <div class="concept-visual trig-visual">
          <div class="triangle">
            <div class="angle">θ</div>
            <div class="side-opp">Opp</div>
            <div class="side-hyp">Hyp</div>
          </div>
          <div class="trig-formula">Sine (Jya) = Opp / Hyp</div>
        </div>
      `
    },
    {
      title: "Algebraic Foundations",
      icon: "✖️",
      description: "Scholars like Brahmagupta and Bhaskara II developed systematic approaches to algebra (Bijaganita). They formulated rules for solving linear and quadratic equations, and remarkably, established rules for arithmetic operations involving negative numbers and zero.",
      visualHtml: `
        <div class="concept-visual algebra-visual">
          <div class="alg-eq">ax² + bx + c = 0</div>
          <div class="alg-roots">Positive & Negative Roots</div>
        </div>
      `
    },
    {
      title: "Astronomical Models & Eclipses",
      icon: "🌒",
      description: "Moving away from mythological explanations (like Rahu and Ketu), astronomers like Aryabhata explained eclipses using mathematical models of shadows cast by the Earth and Moon. They developed highly accurate tables predicting planetary positions.",
      visualHtml: `
        <div class="concept-visual eclipse-visual">
          <div class="sun"></div>
          <div class="earth-moon">
             <div class="earth"></div>
             <div class="moon"></div>
             <div class="shadow"></div>
          </div>
        </div>
      `
    }
  ],
  filters: ["All", "Mathematics", "Astronomy", "Trigonometry", "Algebra"]
};

export default scholarsData;
