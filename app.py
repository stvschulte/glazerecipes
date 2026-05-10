import streamlit as st
import streamlit.components.v1 as components

# Set page config
st.set_page_config(
    page_title="Glaze Recipes",
    page_icon="🍲",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide streamlit UI elements
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    </style>
    """, unsafe_allow_html=True)

# Read and render the HTML file
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

components.html(html_content, height=3000, scrolling=True)
