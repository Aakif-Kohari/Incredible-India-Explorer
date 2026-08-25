const regionData = {
    "North India": {
        description: "Known for rich embroideries, vibrant colors, and warm fabrics due to its varied climate ranging from the Himalayas to the Thar desert.",
        attire: [
            {
                name: "Phiran",
                category: "Unisex Attire",
                state: "Jammu & Kashmir",
                fabric: "Wool / Tweed / Cotton",
                technique: "Sozni Embroidery",
                description: "A traditional loose-fitting garment that falls below the knees, worn by both men and women. It is essential for surviving the harsh Kashmiri winters.",
                culturalUse: "Daily wear during winter; decorated with intricate floral embroidery (Sozni or Tilla work) for special occasions.",
                image: "🧥"
            },
            {
                name: "Sherwani",
                category: "Male Attire",
                state: "Uttar Pradesh / Punjab",
                fabric: "Silk / Brocade / Velvet",
                technique: "Zari, Zardozi",
                description: "A long coat-like garment worn over a kurta, closely fitted at the upper body. It has aristocratic origins from the Mughal era.",
                culturalUse: "Highly formal wear, traditionally worn by grooms during North Indian weddings and for grand celebrations.",
                image: "🤵"
            },
            {
                name: "Salwar Kameez with Phulkari",
                category: "Female Attire",
                state: "Punjab",
                fabric: "Cotton / Silk / Georgette",
                technique: "Phulkari Embroidery",
                description: "A traditional outfit paired with a dupatta featuring Phulkari (flower work), which is a vibrant and geometric embroidery style.",
                culturalUse: "Worn during festivals like Lohri and Baisakhi, and essential in Punjabi wedding trousseaus.",
                image: "👗"
            }
        ],
        textiles: [
            {
                name: "Pashmina",
                state: "Kashmir",
                material: "Cashmere Wool",
                characteristics: "Incredibly soft, warm, and lightweight. Hand-spun and handwoven.",
                traditionalUses: "Shawls, scarves."
            },
            {
                name: "Chikankari",
                state: "Uttar Pradesh (Lucknow)",
                material: "Cotton / Muslin / Silk",
                characteristics: "Delicate and shadow-like white floral embroidery, traditionally done on white muslin.",
                traditionalUses: "Kurtas, sarees, dupattas."
            }
        ]
    },
    "South India": {
        description: "Characterized by elegant silks, breathable cottons, and distinctive draping styles suited for the tropical climate and rich cultural heritage.",
        attire: [
            {
                name: "Kanjeevaram Silk Saree",
                category: "Female Attire",
                state: "Tamil Nadu",
                fabric: "Pure Mulberry Silk",
                technique: "Traditional Handloom Weaving with Zari",
                description: "Woven in Kanchipuram, these sarees are known for their heavy silk base, vibrant colors, and broad contrasting borders featuring temple borders, checks, stripes, and floral motifs.",
                culturalUse: "The quintessential bridal and ceremonial attire for South Indian women.",
                image: "🥻"
            },
            {
                name: "Mundu / Veshti",
                category: "Male Attire",
                state: "Kerala / Tamil Nadu",
                fabric: "Cotton / Silk",
                technique: "Handloom",
                description: "A traditional lower garment worn by men. In Kerala, the 'Kasavu Mundu' has a characteristic off-white color with a gold zari border.",
                culturalUse: "Worn for daily use (cotton) and paired with a silk shirt or angavastram for temple visits, weddings, and festivals.",
                image: "🩳"
            },
            {
                name: "Kasavu Saree",
                category: "Female Attire",
                state: "Kerala",
                fabric: "Fine Cotton / Silk",
                technique: "Handloom",
                description: "Also known as Kerala Saree, it is traditionally off-white with a golden border (Kasavu).",
                culturalUse: "Worn primarily during the festival of Onam and traditional Hindu weddings.",
                image: "🤍"
            }
        ],
        textiles: [
            {
                name: "Mysore Silk",
                state: "Karnataka",
                material: "Silk",
                characteristics: "Known for its minimalist design, pure silk base, and 100% pure gold zari.",
                traditionalUses: "Sarees, royal garments."
            },
            {
                name: "Pochampally Ikat",
                state: "Telangana",
                material: "Silk / Cotton",
                characteristics: "Geometric patterns achieved through the precise tie-and-dye Ikat technique.",
                traditionalUses: "Sarees, dress materials."
            }
        ]
    },
    "East India": {
        description: "Renowned for its fine muslins, intricate weaves, and indigenous silk varieties that tell stories of ancient craftsmanship.",
        attire: [
            {
                name: "Baluchari Saree",
                category: "Female Attire",
                state: "West Bengal",
                fabric: "Silk",
                technique: "Jacquard Handloom",
                description: "Famous for depictions of mythological scenes (like the Ramayana and Mahabharata) on the pallu (the loose end of a saree).",
                culturalUse: "Worn by women of aristocratic families historically, now a symbol of heritage during major festivals.",
                image: "🥻"
            },
            {
                name: "Dhoti-Kurta",
                category: "Male Attire",
                state: "West Bengal / Bihar",
                fabric: "Cotton / Silk",
                technique: "Handloom",
                description: "A rectangular piece of unstitched cloth wrapped around the waist and legs, paired with a top tunic.",
                culturalUse: "Traditional formal wear for religious ceremonies, weddings, and cultural events like Durga Puja.",
                image: "👔"
            },
            {
                name: "Sambalpuri Ikat Saree",
                category: "Female Attire",
                state: "Odisha",
                fabric: "Cotton / Silk",
                technique: "Tie-and-Dye (Bandhakala)",
                description: "Before weaving, the warp and weft threads are tie-dyed. Features traditional motifs like shankha (shell), chakra (wheel), and phula (flower).",
                culturalUse: "Worn by Odia women during cultural functions and daily wear depending on the fabric.",
                image: "🌸"
            }
        ],
        textiles: [
            {
                name: "Jamdani",
                state: "West Bengal",
                material: "Fine Muslin / Cotton",
                characteristics: "A supplementary weft technique creating delicate, seemingly floating geometric and floral motifs.",
                traditionalUses: "Sarees, lightweight dupattas."
            },
            {
                name: "Tussar Silk",
                state: "Bihar / Jharkhand",
                material: "Wild Silk",
                characteristics: "Has a rich, porous texture and a natural golden hue. Sourced from wild silk moths.",
                traditionalUses: "Sarees, kurtas, formal wear."
            }
        ]
    },
    "West India": {
        description: "Vibrant and dynamic, featuring elaborate tie-dye, mirror work, and distinct draping styles that reflect the festive spirit of the region.",
        attire: [
            {
                name: "Chaniya Choli",
                category: "Female Attire",
                state: "Gujarat / Rajasthan",
                fabric: "Cotton / Silk",
                technique: "Mirror Work, Bandhani, Embroidery",
                description: "A three-piece outfit comprising a flared skirt (Chaniya), a fitted blouse (Choli), and a dupatta. Often heavily embellished with mirror work.",
                culturalUse: "The signature attire for the Navratri festival and Garba dancing.",
                image: "💃"
            },
            {
                name: "Nauvari Saree",
                category: "Female Attire",
                state: "Maharashtra",
                fabric: "Cotton / Silk",
                technique: "Handloom",
                description: "A nine-yard saree draped in a distinctive trouser-like style that does not require a petticoat, offering great freedom of movement.",
                culturalUse: "Worn by Marathi women during festivals like Ganesh Chaturthi, weddings, and traditional ceremonies.",
                image: "🥻"
            },
            {
                name: "Angarakha & Dhoti",
                category: "Male Attire",
                state: "Rajasthan / Gujarat",
                fabric: "Cotton",
                technique: "Hand Block Printing, Tie-and-dye",
                description: "An upper garment with an asymmetric opening, tied on either the left or right shoulder, paired with a draped dhoti.",
                culturalUse: "Traditional Rajasthani and Gujarati festive and ceremonial wear.",
                image: "👳‍♂️"
            }
        ],
        textiles: [
            {
                name: "Bandhani",
                state: "Gujarat / Rajasthan",
                material: "Cotton / Silk",
                characteristics: "A highly skilled tie-and-dye process creating intricate dotted patterns in vibrant colors.",
                traditionalUses: "Sarees, dupattas, turbans (Safas)."
            },
            {
                name: "Patola",
                state: "Gujarat (Patan)",
                material: "Silk",
                characteristics: "A highly prized double-ikat textile where both warp and weft are resist-dyed before weaving. Extreme precision is required.",
                traditionalUses: "Luxury sarees, heirloom pieces."
            }
        ]
    },
    "Northeast India": {
        description: "Defined by a deeply rooted backstrap loom weaving tradition, unique indigenous silks, and distinct tribal motifs reflecting nature and identity.",
        attire: [
            {
                name: "Mekhela Chador",
                category: "Female Attire",
                state: "Assam",
                fabric: "Muga, Pat, or Eri Silk",
                technique: "Handloom Brocade Weaving",
                description: "A two-piece traditional drape. The bottom portion (Mekhela) is pleated and tucked in, while the top portion (Chador) is draped over the shoulder.",
                culturalUse: "Worn during the Bihu festival, weddings, and formal occasions by Assamese women.",
                image: "👗"
            },
            {
                name: "Naga Shawls",
                category: "Unisex Attire",
                state: "Nagaland",
                fabric: "Wool / Cotton",
                technique: "Loin Loom (Backstrap Loom) Weaving",
                description: "Distinctively patterned shawls that historically indicated the tribe, social status, and achievements of the wearer.",
                culturalUse: "Worn as a mantle over traditional attire, carrying immense cultural significance for Naga tribes.",
                image: "🧣"
            },
            {
                name: "Phanek & Inaphi",
                category: "Female Attire",
                state: "Manipur",
                fabric: "Cotton / Silk",
                technique: "Handloom",
                description: "Phanek is a traditional sarong-like lower garment, often featuring striped patterns, paired with an Inaphi, a delicate, semi-transparent upper wrap.",
                culturalUse: "Worn during Meitei cultural festivals, dances (like Manipuri Raas Leela), and daily life.",
                image: "🌸"
            }
        ],
        textiles: [
            {
                name: "Muga Silk",
                state: "Assam",
                material: "Wild Silk",
                characteristics: "Renowned for its glossy, natural golden hue that increases in luster with every wash. Extremely durable.",
                traditionalUses: "Mekhela Chador, premium traditional wear."
            },
            {
                name: "Eri Silk (Ahimsa Silk)",
                state: "Assam / Meghalaya",
                material: "Silk",
                characteristics: "Known as 'peace silk' because it is processed without killing the silkworm. It is warm, soft, and has a wool-like texture.",
                traditionalUses: "Shawls, wraps, winter clothing."
            }
        ]
    }
};

const weavingTechniques = [
    {
        name: "Ikat",
        description: "A resist-dyeing technique where yarns are tie-dyed before they are woven. This creates a signature 'blurred' or feathered look in the final textile. Prominent in Odisha (Sambalpuri) and Telangana (Pochampally)."
    },
    {
        name: "Double Ikat (Patola)",
        description: "An incredibly complex technique where both the warp (longitudinal) and weft (transverse) yarns are resist-dyed before weaving. The weaver must align them perfectly to form the pattern."
    },
    {
        name: "Jamdani",
        description: "A discontinuous supplementary-weft technique. Thicker threads are woven into the fine muslin warp by hand to create intricate, floating motifs. It is incredibly labor-intensive."
    },
    {
        name: "Tie & Dye (Bandhani)",
        description: "The fabric is plucked into tiny bindings and tied with thread to resist the dye. Once dyed and untied, the tied areas reveal intricate dot patterns."
    },
    {
        name: "Zari / Zardozi",
        description: "Metallic thread embroidery. Zari is woven into fabrics (like Kanjeevaram sarees), while Zardozi is heavy, elaborate metal embroidery applied to the surface of garments."
    }
];
