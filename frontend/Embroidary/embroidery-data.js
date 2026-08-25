const embroideryData = {
  traditions: [
    {
      id: "phulkari",
      name: "Phulkari",
      state: "Punjab",
      region: "North India",
      image: "https://miro.medium.com/1*fQtB756C-SfRU57LiA1l7g.jpeg",
      shortDescription: "A vibrant embroidery tradition known for colorful floral patterns worked with silk thread on cotton fabric.",
      materials: ["Cotton fabric", "Silk thread"],
      motifs: ["Flowers", "Geometric patterns", "Plants"],
      communities: ["Punjabi communities"],
      uses: ["Dupattas", "Shawls", "Phulkari garments", "Ceremonial textiles"],
      famousFor: "Bright floral designs created with colorful thread.",
      featured: true
    },
    {
      id: "chikankari",
      name: "Chikankari",
      state: "Uttar Pradesh",
      region: "North India",
      image: "https://www.frontierraas.com/the-voice/wp-content/uploads/2025/02/chikankari-1.jpg",
      shortDescription: "Delicate shadow and thread embroidery traditionally associated with Lucknow.",
      materials: ["Cotton", "Muslin", "Silk thread", "Cotton thread"],
      motifs: ["Flowers", "Leaves", "Vines", "Paisley"],
      communities: ["Lucknowi artisans"],
      uses: ["Sarees", "Kurtas", "Dupattas", "Garments"],
      famousFor: "Fine white-on-white threadwork and delicate floral patterns.",
      featured: true
    },
    {
      id: "kantha",
      name: "Kantha",
      state: "West Bengal",
      region: "Eastern India",
      image: "http://www.luxurionworld.com/cdn/shop/articles/kantha-the-pride-of-west-bengal-364608_ee44a019-c608-454d-9196-87a9f0b0f38f.jpg?v=1777112105",
      shortDescription: "A traditional embroidery style using simple running stitches to create decorative and narrative designs.",
      materials: ["Cotton cloth", "Cotton thread"],
      motifs: ["Flowers", "Animals", "Birds", "Geometric patterns", "Stories"],
      communities: ["Bengali artisan communities"],
      uses: ["Quilts", "Sarees", "Stoles", "Wall hangings"],
      famousFor: "Running-stitch embroidery and storytelling motifs.",
      featured: true
    },
    {
      id: "kutch",
      name: "Kutch Embroidery",
      state: "Gujarat",
      region: "Western India",
      image: "http://www.sundariihandmade.com/cdn/shop/articles/WhatsApp_Image_2020-09-05_at_12.34.36_PM_1.jpg?v=1600361458&width=2048",
      shortDescription: "A diverse group of colorful embroidery traditions from the Kutch region of Gujarat.",
      materials: ["Cotton", "Wool", "Silk thread", "Mirrors"],
      motifs: ["Geometric patterns", "Flowers", "Animals", "Birds"],
      communities: ["Kutch artisan communities"],
      uses: ["Clothing", "Bags", "Wall hangings", "Home decor"],
      famousFor: "Rich colors, intricate stitches and distinctive mirror work.",
      featured: true
    },
    {
      id: "kasuti",
      name: "Kasuti",
      state: "Karnataka",
      region: "Southern India",
      image: "https://miro.medium.com/v2/resize:fit:800/0*DGtiONyt4PG-yeen.jpg",
      shortDescription: "A traditional Karnataka embroidery technique using carefully counted stitches to form geometric and figurative designs.",
      materials: ["Cotton fabric", "Silk thread"],
      motifs: ["Temples", "Chariots", "Birds", "Animals", "Geometric patterns"],
      communities: ["Karnataka artisan communities"],
      uses: ["Sarees", "Blouses", "Traditional garments"],
      famousFor: "Precise geometric embroidery inspired by local architecture and nature.",
      featured: true
    },
    {
      id: "chamba-rumal",
      name: "Chamba Rumal",
      state: "Himachal Pradesh",
      region: "Northern India",
      image: "http://www.sahapedia.org/sites/default/files/styles/share_1200_630/public/2020-08/Banner%20Image%20Module%20Introduction.JPG?itok=n0iAQp30",
      shortDescription: "A finely embroidered textile tradition from the Chamba region, often depicting religious and folk scenes.",
      materials: ["Cotton", "Silk thread"],
      motifs: ["Krishna", "Radha", "Floral designs", "Courtly scenes"],
      communities: ["Chamba artisan communities"],
      uses: ["Ceremonial textiles", "Gift textiles", "Decorative cloth"],
      famousFor: "Detailed double-sided embroidery depicting miniature-style scenes.",
      featured: false
    },
    {
      id: "toda",
      name: "Toda Embroidery",
      state: "Tamil Nadu",
      region: "Southern India",
      image: "https://gaatha.com/wp-content/uploads/2015/05/Todas%E2%80%99-of-Nilgiri.jpg",
      shortDescription: "Distinctive embroidery practiced by the Toda community of the Nilgiri Hills.",
      materials: ["White cotton cloth", "Red thread", "Black thread"],
      motifs: ["Geometric designs", "Diamonds", "Triangles", "Nature-inspired forms"],
      communities: ["Toda community"],
      uses: ["Shawls", "Traditional garments", "Ceremonial clothing"],
      famousFor: "Bold geometric patterns worked against white fabric.",
      featured: false
    },
    {
      id: "sujani",
      name: "Sujani",
      state: "Bihar",
      region: "Eastern India",
      image: "https://cdn.fynd.com/v2/patient-paper-41f385/original/Craft_Images/Sujini/Sujini_-_3.jpg",
      shortDescription: "A narrative embroidery tradition from Bihar featuring figurative designs and scenes from everyday life.",
      materials: ["Cotton", "Cotton thread"],
      motifs: ["People", "Animals", "Plants", "Village life"],
      communities: ["Bihar artisan communities"],
      uses: ["Quilts", "Wall hangings", "Bedcovers", "Decorative textiles"],
      famousFor: "Storytelling through colorful stitched figures and scenes.",
      featured: false
    },
    {
      id: "kashida",
      name: "Kashida",
      state: "Jammu and Kashmir",
      region: "Northern India",
      image: "https://gaatha.org/wp-content/uploads/design_3-72.jpg",
      shortDescription: "A nature-inspired embroidery tradition widely seen on Kashmiri shawls and garments.",
      materials: ["Wool", "Silk", "Cotton", "Silk thread"],
      motifs: ["Flowers", "Leaves", "Vines", "Birds"],
      communities: ["Kashmiri artisans"],
      uses: ["Shawls", "Sarees", "Clothing", "Home textiles"],
      famousFor: "Intricate floral and nature-inspired patterns.",
      featured: false
    },
    {
      id: "banjara",
      name: "Banjara Embroidery",
      state: "Telangana",
      region: "Central and Southern India",
      image: "https://banjaratrail.com/cdn/shop/files/orange-mirrorwork-banjara-jacket-423754.webp?v=1768747162&width=720",
      shortDescription: "Colorful decorative embroidery associated with Banjara communities and their traditional clothing.",
      materials: ["Cotton", "Wool", "Mirrors", "Shells", "Colored thread"],
      motifs: ["Geometric patterns", "Mirrors", "Diamonds", "Triangles"],
      communities: ["Banjara communities"],
      uses: ["Traditional clothing", "Bags", "Textiles", "Accessories"],
      famousFor: "Bright colors combined with mirrors, shells and geometric designs.",
      featured: false
    },
    {
      id: "pipili",
      name: "Pipili Appliqué",
      state: "Odisha",
      region: "Eastern India",
      image: "http://quirkywanderer.com/wp-content/uploads/2021/06/Crafts-of-Odisha-Applique-Work-Of-Pipli-Slide-1.jpg",
      shortDescription: "A colorful appliqué tradition from Pipili known for bold fabric shapes and decorative motifs.",
      materials: ["Cotton fabric", "Colored cloth", "Thread"],
      motifs: ["Flowers", "Animals", "Birds", "Sun", "Moon"],
      communities: ["Pipili artisan communities"],
      uses: ["Canopies", "Umbrellas", "Wall hangings", "Ceremonial decorations"],
      famousFor: "Bright appliqué designs used in religious and decorative textiles.",
      featured: false
    }
  ],

  states: {
    Punjab: {
      traditions: ["phulkari"],
      description: "Punjab is closely associated with Phulkari, a vibrant embroidery tradition known for colorful floral patterns."
    },
    "Uttar Pradesh": {
      traditions: ["chikankari"],
      description: "Uttar Pradesh is home to Chikankari, particularly associated with the craft traditions of Lucknow."
    },
    "West Bengal": {
      traditions: ["kantha"],
      description: "West Bengal is known for Kantha, whose running stitches can form decorative and narrative compositions."
    },
    Gujarat: {
      traditions: ["kutch"],
      description: "The Kutch region has a rich variety of embroidery traditions distinguished by colorful threadwork and mirror decoration."
    },
    Karnataka: {
      traditions: ["kasuti"],
      description: "Karnataka is known for Kasuti, a counted-thread embroidery tradition featuring geometric and figurative motifs."
    },
    "Himachal Pradesh": {
      traditions: ["chamba-rumal"],
      description: "The Chamba region is renowned for the finely embroidered Chamba Rumal."
    },
    "Tamil Nadu": {
      traditions: ["toda"],
      description: "The Toda community of the Nilgiri Hills practices a distinctive geometric embroidery tradition."
    },
    Bihar: {
      traditions: ["sujani"],
      description: "Bihar's Sujani embroidery uses stitched figures and scenes to tell stories and depict everyday life."
    },
    "Jammu and Kashmir": {
      traditions: ["kashida"],
      description: "Kashmiri embroidery is celebrated for intricate floral and nature-inspired patterns."
    },
    Telangana: {
      traditions: ["banjara"],
      description: "Banjara embroidery uses vivid colors, mirrors and geometric decoration."
    },
    Odisha: {
      traditions: ["pipili"],
      description: "Pipili in Odisha is famous for colorful appliqué work used in decorative and ceremonial objects."
    }
  },

  artisans: [
    {
      name: "Phulkari Artisans",
      tradition: "Phulkari",
      state: "Punjab",
      community: "Punjabi artisan communities",
      description: "Artisans preserve traditional Phulkari techniques through detailed floral and geometric threadwork."
    },
    {
      name: "Chikankari Artisans",
      tradition: "Chikankari",
      state: "Uttar Pradesh",
      community: "Lucknow artisan communities",
      description: "Skilled artisans create delicate threadwork using traditional stitches and nature-inspired motifs."
    },
    {
      name: "Toda Embroiderers",
      tradition: "Toda Embroidery",
      state: "Tamil Nadu",
      community: "Toda community",
      description: "Toda women traditionally create distinctive geometric embroidery on white cloth using contrasting threads."
    },
    {
      name: "Kutch Embroidery Artisans",
      tradition: "Kutch Embroidery",
      state: "Gujarat",
      community: "Kutch artisan communities",
      description: "Different communities of Kutch maintain their own characteristic embroidery techniques, stitches and motifs."
    }
  ],

  gallery: [
    {
      id: "phulkari-pattern",
      traditionId: "phulkari",
      title: "Floral Phulkari",
      image: "https://miro.medium.com/1*fQtB756C-SfRU57LiA1l7g.jpeg",
      caption: "Bright floral forms worked in colorful thread.",
      credit: "Gaatha / Traditional Craft Archives"
    },
    {
      id: "chikankari-pattern",
      traditionId: "chikankari",
      title: "Chikankari Floral Work",
      image: "https://www.frontierraas.com/the-voice/wp-content/uploads/2025/02/chikankari-1.jpg",
      caption: "Delicate floral threadwork associated with Lucknow.",
      credit: "Gaatha / Traditional Craft Archives"
    },
    {
      id: "kantha-pattern",
      traditionId: "kantha",
      title: "Kantha Running Stitch",
      image: "http://www.luxurionworld.com/cdn/shop/articles/kantha-the-pride-of-west-bengal-364608_ee44a019-c608-454d-9196-87a9f0b0f38f.jpg?v=1777112105",
      caption: "Decorative compositions created using running stitches.",
      credit: "Gaatha / Traditional Craft Archives"
    },
    {
      id: "kutch-pattern",
      traditionId: "kutch",
      title: "Kutch Mirror Work",
      image: "http://www.sundariihandmade.com/cdn/shop/articles/WhatsApp_Image_2020-09-05_at_12.34.36_PM_1.jpg?v=1600361458&width=2048",
      caption: "Colorful embroidery combined with traditional mirror decoration.",
      credit: "Gaatha / Traditional Craft Archives"
    },
    {
      id: "kasuti-pattern",
      traditionId: "kasuti",
      title: "Kasuti Geometric Work",
      image: "https://miro.medium.com/v2/resize:fit:800/0*DGtiONyt4PG-yeen.jpg",
      caption: "Counted stitches create precise geometric forms.",
      credit: "Gaatha / Traditional Craft Archives"
    },
    {
      id: "chamba-pattern",
      traditionId: "chamba-rumal",
      title: "Chamba Rumal",
      image: "http://www.sahapedia.org/sites/default/files/styles/share_1200_630/public/2020-08/Banner%20Image%20Module%20Introduction.JPG?itok=n0iAQp30",
      caption: "Detailed embroidered scenes on traditional Chamba textiles.",
      credit: "Sahapedia"
    },
    {
      id: "toda-pattern",
      traditionId: "toda",
      title: "Toda Geometric Pattern",
      image: "https://gaatha.com/wp-content/uploads/2015/05/Todas%E2%80%99-of-Nilgiri.jpg",
      caption: "Bold geometric embroidery on white cloth.",
      credit: "Gaatha"
    },
    {
      id: "sujani-pattern",
      traditionId: "sujani",
      title: "Sujani Storytelling",
      image: "https://cdn.fynd.com/v2/patient-paper-41f385/original/Craft_Images/Sujini/Sujini_-_3.jpg",
      caption: "Figurative embroidery depicting scenes and stories.",
      credit: "Traditional Craft Archives"
    },
    {
      id: "kashida-pattern",
      traditionId: "kashida",
      title: "Kashida Floral Motifs",
      image: "https://gaatha.org/wp-content/uploads/design_3-72.jpg",
      caption: "Nature-inspired floral and vine patterns.",
      credit: "Gaatha"
    },
    {
      id: "banjara-pattern",
      traditionId: "banjara",
      title: "Banjara Mirror Work",
      image: "https://banjaratrail.com/cdn/shop/files/orange-mirrorwork-banjara-jacket-423754.webp?v=1768747162&width=720",
      caption: "Colorful embroidery decorated with mirrors and geometric motifs.",
      credit: "Traditional Craft Archives"
    }
  ]
};

export default embroideryData;