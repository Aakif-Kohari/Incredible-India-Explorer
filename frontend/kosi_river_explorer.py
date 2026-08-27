import streamlit as st
import pandas as pd
import plotly.express as px

# Configuration & Page Setup
st.set_page_config(page_title="Kosi River Exploration Framework", layout="wide")

# Kosi Basin Hydrological Data Array
KOSI_NODES = [
    {"point": "Saptakoshi Gorge", "location": "Barahakshetra, Nepal", "lat": 26.8744, "lon": 87.1511, "type": "Tributary Confluence", "desc": "Where the seven alpine arms converge before entering the plains."},
    {"point": "Kosi Barrage", "location": "Bhithamorganj / Hanuman Nagar", "lat": 26.5231, "lon": 86.9324, "type": "International Barrage", "desc": "Transboundary barrage regulating flow between Nepal and India."},
    {"point": "Supaul Inundation Hub", "location": "Supaul, Bihar", "lat": 26.1132, "lon": 86.5944, "type": "Flood plain Zone", "desc": "Primary path affected by sudden monsoonal embankment shifts."},
    {"point": "Kursela Confluence", "location": "Katihar, Bihar", "lat": 25.4147, "lon": 87.2514, "type": "Ganga Junction", "desc": "The final terminus where the heavy silt discharge feeds into the Ganga River."}
]

df = pd.DataFrame(KOSI_NODES)

st.title("🌊 Kosi River Explorer: The Sorrow of Bihar")
st.markdown("An interactive framework analyzing the hydrological course shifts, silt dynamics, and agricultural dependencies of the Kosi Basin.")

# Sidebar Controls
st.sidebar.header("🗺️ Hydrological Controls")
node_filter = st.sidebar.multiselect("Filter Node Typologies", options=df["type"].unique(), default=df["type"].unique())
filtered_df = df[df["type"].isin(node_filter)]

# Geospatial Rendering
st.subheader("📍 Geomorphic Basin Distribution")
if not filtered_df.empty:
    fig = px.scatter_mapbox(
        filtered_df,
        lat="lat",
        lon="lon",
        hover_name="point",
        hover_data=["location", "desc"],
        color="type",
        zoom=7,
        height=450
    )
    fig.update_layout(mapbox_style="open-street-map", margin={"r":0,"t":0,"l":0,"b":0})
    st.plotly_chart(fig, use_container_width=True)
else:
    st.info("Select a node typology to populate the basin distribution layout.")

# Research Content Rows
st.subheader("📚 Deep-Dive Geomorphic Profile")
tab_course, tab_dynamics, tab_agri = st.tabs(["⏳ Course & Himalayan Feeders", "⚠️ Why the River Shifts & Floods", "🌾 Agriculture & Survival"])

with tab_course:
    st.markdown("""
    ### 🏔️ The Transboundary Alpine Lifeline
    * **The Sapta Kosi:** Before breaking into the flat lowlands, seven major Himalayan glacial rivers merge in eastern Nepal to build the main stem. The primary arms are the **Sun Kosi**, **Arun** (originating in Tibet and generating the largest volume), and **Tamur Kosi**.
    * **Historical Terminology:** In ancient Sanskrit epics like the *Ramayana* and *Purana*, the river is revered as the **Kaushiki**, named after the sage Vishwamitra, who achieved enlightenment along its banks.
    * **The Bihar Connection:** The river breaks through the Himalayan foot barriers at Chatra, exits Nepal via the international **Kosi Barrage**, and flows through Supaul, Saharsa, Madhepura, and Purnia before joining the Ganga near Kursela.
    """)

with tab_dynamics:
    st.markdown("""
    ### ⚡ Mechanics of Lateral Migration & Extreme Inundation
    * **Massive Sediment Loading:** The Kosi carries one of the highest silt volumes in the world, second only to the Yellow River in China. 
    * **Why the River Changes Course:** As the river drops from steep mountain ranges into the flat plains of North Bihar, its flow speed plummets. Unable to carry its heavy load, the river dumps the silt, raising its own bed. This causes the water to break its banks in search of lower ground. Over the past 250 years, the Kosi has migrated **over 120 kilometres westward**, carving out new channels and turning fertile fields into wasteland.
    * **The Catastrophic Breach Vector:** Heavy monsoonal rains put immense pressure on man-made guide embankments. When these break—as seen during the devastating **2008 Kushaha breach**—the river reverts to older channels, inundating millions of homes without warning.
    """)

with tab_agri:
    st.markdown("""
    ### 🌾 The Agricultural Paradox
    * **Destruction vs. Fertility:** While sudden floods wash away crops, the silt dropped by calmer seasonal overflows deposits rich minerals that make parts of North Bihar a prime zone for farming.
    * **Primary Crops:** The basin supports intensive cultivation of **paddy (rice), wheat, maize, and jute**, alongside lucrative orchards of **Malda mangoes and makhana (foxnuts)** in marshy lowlands.
    """)
