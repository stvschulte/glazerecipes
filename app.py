import streamlit as st
import pathlib

# Configure page
st.set_page_config(
    page_title="GlazeRecipes",
    page_icon="🏺",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit UI elements for fullscreen experience
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}
[data-testid="stToolbar"] {visibility: hidden;}
.st-emotion-cache-1jicfl2 {padding: 0;}
.st-emotion-cache-uf99v {padding: 0;}
</style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Read and render the HTML content
html_file = pathlib.Path(__file__).parent / "index.html"
html_content = html_file.read_text()

# Render the HTML with full height
st.components.v1.html(html_content, height=None, scrolling=True)
