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
    :root {
        --glazerecipes-frame-height: 4200px;
    }

    @media (max-width: 1024px) {
        :root {
            --glazerecipes-frame-height: 4350px;
        }
    }

    @media (max-width: 900px) {
        :root {
            --glazerecipes-frame-height: 5650px;
        }
    }

    @media (max-width: 640px) {
        :root {
            --glazerecipes-frame-height: 6200px;
        }
    }

    html,
    body,
    .stApp,
    [data-testid="stAppViewContainer"],
    [data-testid="stMain"] {
        margin: 0 !important;
        padding: 0 !important;
        background: #FDFBF7 !important;
        overflow-x: hidden !important;
    }

    #MainMenu,
    header,
    footer,
    [data-testid="stHeader"],
    [data-testid="stToolbar"],
    [data-testid="stDecoration"],
    [data-testid="stStatusWidget"] {
        display: none !important;
        height: 0 !important;
        visibility: hidden !important;
    }

    .block-container,
    [data-testid="stMainBlockContainer"] {
        width: 100vw !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .element-container,
    [data-testid="stElementContainer"],
    [data-testid="stIFrame"] {
        width: 100vw !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    iframe {
        display: block !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: var(--glazerecipes-frame-height) !important;
        border: 0 !important;
    }
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Read and render the HTML file
with open(BASE_DIR / "index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Streamlit renders this file inside a tall iframe. Without this override,
# CSS viewport units use the iframe height and make the hero image look huge.
streamlit_iframe_fixes = """
<style>
  html,
  body,
  #root {
    width: 100%;
    margin: 0;
    overflow-x: hidden;
    background: #FDFBF7;
  }

  #root > main {
    min-height: auto !important;
  }

  #root > main > section:first-child {
    min-height: 760px !important;
    height: 760px !important;
  }

  #root > main > section:first-child > div.relative.z-10.mx-auto.flex {
    min-height: 668px !important;
  }

  @media (max-width: 640px) {
    #root > main > section:first-child {
      min-height: 720px !important;
      height: 720px !important;
    }

    #root > main > section:first-child > div.relative.z-10.mx-auto.flex {
      min-height: 628px !important;
    }
  }
</style>
"""
html_content = html_content.replace("</head>", f"{streamlit_iframe_fixes}</head>")

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

# Use components.html to render the full page.
# The outer CSS above controls responsive iframe height so the page stops
# shortly after the Early Access section instead of leaving a huge blank tail.
components.html(html_content, height=4200, scrolling=False)
