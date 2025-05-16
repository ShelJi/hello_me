import streamlit as st
import pathlib


st.title("Hello shelj")
st.subheader("sub heading")
st.header("sub heading")
st.text("sub heading")
st.markdown("**Hello** *shelj*")

json = {"a":1, "b":2}
st.json(json)

code = """
print("Hello world")
"""
st.code(code, language="python")

def load_css(file_path):
    with open(file_path) as f:
        st.html(f"<style>{f.read()}</style>")

css_path = pathlib.Path("style.css")
load_css(css_path)

st.button("Hello", key="hello")

def change():
    print("Changed")
    print(st.session_state.checker)

say_hello = st.checkbox("Say hello", value=True, on_change=change, key="checker")

if say_hello:
    st.write("Hellooooooooo")
else:
    pass