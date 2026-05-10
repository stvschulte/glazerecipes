import streamlit as st
import streamlit.components.v1 as components

# Configure page
st.set_page_config(
    page_title="GlazeRecipes",
    page_icon="🏺",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide the Streamlit header/footer
hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    .stAppViewContainer {padding: 0;}
    .stApp {background-color: #11100f;}
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Read and render the HTML file
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Use components.html to render the full page
components.html(html_content, height=10000, scrolling=True)
