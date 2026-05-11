import streamlit as st
import streamlit.components.v1 as components
import base64
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

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
with open(BASE_DIR / "index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Convert local images to Base64 on the fly so they load in Streamlit Cloud
def get_image_as_base64(path, mime_type):
    file_path = BASE_DIR / path
    if file_path.exists():
        with open(file_path, "rb") as img_file:
            return f"data:{mime_type};base64,{base64.b64encode(img_file.read()).decode()}"
    return path

for public_path, local_path, mime_type in [
    ("/jars.jpg", "jars.jpg", "image/jpeg"),
    ("/verpakking.jpg", "verpakking.jpg", "image/jpeg"),
    ("/dark-workbench.jpg", "dark-workbench.jpg", "image/jpeg"),
    ("/studio.jpg", "studio.jpg", "image/jpeg"),
    ("assets/jars.jpg", "assets/jars.jpg", "image/jpeg"),
    ("assets/verpakking.jpg", "assets/verpakking.jpg", "image/jpeg"),
    ("assets/dark-workbench.jpg", "assets/dark-workbench.jpg", "image/jpeg"),
    ("assets/studio.jpg", "assets/studio.jpg", "image/jpeg"),
    ("assets/clay.jpg", "assets/clay.jpg", "image/jpeg"),
    ("assets/midnight-ocean.png", "assets/midnight-ocean.png", "image/png"),
    ("assets/forest-ash.png", "assets/forest-ash.png", "image/png"),
    ("assets/honey-iron.png", "assets/honey-iron.png", "image/png"),
]:
    html_content = html_content.replace(public_path, get_image_as_base64(local_path, mime_type))

# Use components.html to render the full page
components.html(html_content, height=10000, scrolling=True)
