# Streamlit

`pip install streamlit`

Terminal:
`streamlit hello` to validate installation

Terminal:
`streamlit run main.py`

## Basic Elements

```python
import streamlit as st


st.title("Hello shelj")
st.subheader("sub heading")
st.header("sub heading")
st.text("sub heading")
st.markdown("**Hello** *shelj*")
st.caption("")
```

### math expressions

[Cheat sheet for math expressions](https://katex.org/docs/supported)

`st.latex(r"To write mathemativcal formulae")`

### Json

```python
json = {"a":1, "b":2}
st.json(json)
```

### code

```python
code = """
print("Hello world")
"""
st.code(code, language="python")
```

### write

```python
st.write("Here it supports markdown, json, etc...")
```

### image, audio, video

```python
st.image("image.jpg", caption="Image sample", width=680)
st.audio()
st.video()
```

### add custom css

```python
def load_css(file_path):
    with open(file_path) as f:
        st.html(f"<style>{f.read()}</style>")

css_path = pathlib.Path("style.css")
load_css(css_path)

st.button("Hello", key="hello")
```

```css
.stAppToolbar.st-emotion-cache-15ecox0.e14ksaui2{
    display: none;
}

.st-key-hello button{
    background-color: yellowgreen;
}
```

In here `.stAppToolbar.st-emotion-cache-15ecox0.e14ksaui2` this line of css class get from inspect to remove defaults.

`st-key-hello` is created by default by using key keyword where **hello** is changable.

### checkbox

```python
say_hello = st.checkbox("Say hello", value=True)

if say_hello:
    st.write("Hellooooooooo")
else:
    pass
```

### terminal values

```python
def change():
    print("Changed")

say_hello = st.checkbox("Say hello", value=True, on_change=change)

if say_hello:
    st.write("Hellooooooooo")
else:
    pass
```

Output in teminal: Changed

### session_state

```python

def change():
    print(st.session_state.checker)

say_hello = st.checkbox("Say hello", value=True, on_change=change, key="checker")

if say_hello:
    st.write("Hellooooooooo")
else:
    pass
```

Output in teminal: True if checked else False

## Cheatsheets

[Pro](https://cheat-sheets.streamlit.app/)
[cheat-sheet](https://cheat-sheet.streamlit.app/)
[docs cheat-sheet](https://docs.streamlit.io/develop/quick-reference/cheat-sheet)
[Streamlit cheatsheet for beginners](https://codemaker2016.medium.com/streamlit-cheatsheet-for-beginners-eb93da97ae1)
