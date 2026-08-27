import streamlit as st
import pandas as pd
import plotly.express as px

# Configuration & Page Setup
st.set_page_config(page_title="India Prehistoric Rock Art Explorer", layout="wide")

# Static Comprehensive Database for Prehistoric Indian Rock Art
ROCK_ART_DATA = [
    {
        "site": "Bhimbetka Caves",
        "state": "Madhya Pradesh",
        "district": "Raisen",
        "chronology": "Mesolithic to Historic",
        "styles": "Linear silhouettes, geometric stick figures, vibrant red/white mineral washes",
        "motifs": "Bison, elephants, tigers, rhinos, group dances, tribal wars, hunters",
        "lat": 22.9372,
        "lon": 77.6127,
        "region": "Central India"
    },
    {
        "site": "Edakkal Caves",
        "state": "Kerala",
        "district": "Wayanad",
        "chronology": "Neolithic to Chalcolithic",
        "styles": "Deeply carved petroglyphs, heavy linear engravings, abstract geometric boxes",
        "motifs": "Human figures with spiked headgear, tribal symbols, wheels, deer, trees",
        "lat": 11.6267,
        "lon": 76.2343,
        "region": "South India"
    },
    {
        "site": "Kupgal Petroglyphs",
        "state": "Karnataka",
        "district": "Bellary",
        "chronology": "Neolithic",
        "styles": "Bruised rock engravings, dark-patina relief tracking, stylistic exaggeration",
        "motifs": "Long-horned humped cattle (bulls), anthropomorphic figures, chains of dancing silhouettes",
        "lat": 15.1923,
        "lon": 76.9531,
        "region": "South India"
    },
    {
        "site": "Lakhudiyar Rock Shelters",
        "state": "Uttarakhand",
        "district": "Almora",
        "chronology": "Paleolithic to Bronze Age",
        "styles": "Finger-painted geometric bands, stick-like wavy lines in black, red, and white",
        "motifs": "Foxes, multi-legged lizards, rows of hand-linked dancing humans, wavy patterns",
        "lat": 29.6212,
        "lon": 79.6914,
        "region": "Himalayan North"
    },
    {
        "site": "Maniyar Math / Rajgir",
        "state": "Bihar",
        "district": "Nalanda",
        "chronology": "Mesolithic to Early Historic",
        "styles": "Linear red ochre sketches, charcoal borders, layered ceremonial overlapping",
        "motifs": "Zebu bulls, deer herds, hunters wielding bows, abstract astral diagrams",
        "lat": 25.0112,
        "lon": 85.4194,
        "region": "Eastern India"
    }
]

df = pd.DataFrame(ROCK_ART_DATA)

# Application UI Layout
st.title("🎨 Prehistoric Rock Paintings & Art Explorer of India")
st.markdown("An interactive research framework tracking Upper Paleolithic, Mesolithic, and Neolithic petroglyphs and rock canvas art.")

# Interactive Filter Engine
st.sidebar.header("🗺️ Filter Archeological Sites")
selected_region = st.sidebar.multiselect("Select Geo-Cultural Region", options=df["region"].unique(), default=df["region"].unique())
filtered_df = df[df["region"].isin(selected_region)]

# Strategic Map Visualization Matrix
st.subheader("📍 Geospatial Distribution Map")
if not filtered_df.empty:
    fig_map = px.scatter_mapbox(
        filtered_df,
        lat="lat",
        lon="lon",
        hover_name="site",
        hover_data=["state", "chronology"],
        color="region",
        size_max=15,
        zoom=4,
        height=500,
        title="Active Prehistoric Rock Art Hubs Across the Indian Subcontinent"
    )
    fig_map.update_layout(
        mapbox_style="open-street-map",
        margin={"r":0,"t":40,"l":0,"b":0}
    )
    st.plotly_chart(fig_map, use_container_width=True)
else:
    st.warning("Please select at least one cultural region from the sidebar.")

# Detail Matrix Section
st.subheader("📚 Site Registry & Micro-Analysis")
st.dataframe(
    filtered_df[["site", "state", "chronology", "styles", "motifs", "region"]], 
    use_container_width=True, 
    hide_index=True
)

# Chronological & Stylistic Analysis Tabs
st.subheader("🔍 Deep-Dive Cultural Taxonomy")
tab_chronology, tab_fauna = st.tabs(["⏳ Chronological Evolution", "🦌 Zoomorphic & Anthropomorphic Motifs"])

with tab_chronology:
    st.markdown("""
    ### Evolution of Rock Painting Styles in India
    * **Upper Paleolithic (c. 40,000 – 10,000 BCE):** Dominated by large linear representations of megafauna (rhinos, elephants) filled with green or dark red geometric patterns. Human forms are rare and highly stylized.
    * **Mesolithic (c. 10,000 – 4,000 BCE):** The golden age of Indian rock art (best seen at Bhimbetka). Characterized by massive reductions in size but explosion in action. Depicts group hunting strategies, family units, dancing lines, and stick-figure battles.
    * **Neolithic / Chalcolithic (c. 4,000 – 1,000 BCE):** Transition to pastoral life. Art prominently features domesticated cattle, wheeled carts, pottery motifs, and pottery-like cross-hatched body decorations using complex mineral paints (hematite mixed with animal fat/resin).
    """)

with tab_fauna:
    st.markdown("""
    ### Stylistic Classification of Figures
    * **Human Forms:** Hand-linked stick structures indicating communal ritual cohesion. Weapons include barbed spears, bows, arrows, and shields. Headgear often designates shamans or chieftains.
    * **Zoomorphic Profiles:** Naturalistic tracking of dynamic motion. Predators (leopards, tigers) are painted with aggressive posturing, while prey animals (deer, zebu cattle, ibex) showcase delicate muscle outlines and hollow-fill line designs.
    """)
