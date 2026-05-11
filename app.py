import streamlit as st
import streamlit.components.v1 as components
import base64
import os

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

# Convert local images to Base64 on the fly so they load in Streamlit Cloud
def get_image_as_base64(path, mime_type):
    if os.path.exists(path):
        with open(path, "rb") as img_file:
            return f"data:{mime_type};base64,{base64.b64encode(img_file.read()).decode()}"
    return path

html_content = html_content.replace("assets/jars.jpg", get_image_as_base64("assets/jars.jpg", "image/jpeg"))
html_content = html_content.replace("assets/clay.jpg", get_image_as_base64("assets/clay.jpg", "image/jpeg"))
html_content = html_content.replace("assets/midnight-ocean.png", get_image_as_base64("assets/midnight-ocean.png", "image/png"))
html_content = html_content.replace("assets/forest-ash.png", get_image_as_base64("assets/forest-ash.png", "image/png"))
html_content = html_content.replace("assets/honey-iron.png", get_image_as_base64("assets/honey-iron.png", "image/png"))

# Use components.html to render the full page
components.html(html_content, height=10000, scrolling=True)
