
# Attribute Selectors in CSS

In CSS, the `[]` (square brackets) symbol is used to define **attribute selectors**. Attribute selectors allow you to select elements based on the presence, value, or partial value of an attribute. This is useful when you want to target elements that have specific attributes or attribute values.

## Syntax of Attribute Selectors:

```css
selector[attribute] {
  /* styles */
}

selector[attribute="value"] {
  /* styles */
}

selector[attribute~="value"] {
  /* styles */
}

selector[attribute|="value"] {
  /* styles */
}

selector[attribute^="value"] {
  /* styles */
}

selector[attribute$="value"] {
  /* styles */
}

selector[attribute*="value"] {
  /* styles */
}

Types of Attribute Selectors:
[attribute]: Selects elements that have the specified attribute, regardless of the attribute's value.
[attribute="value"]: Selects elements that have the specified attribute with a specific value.
[attribute~="value"]: Selects elements that have the specified attribute and whose value contains a space-separated list of words, one of which is the specified value.
[attribute|="value"]: Selects elements whose specified attribute's value is either exactly the specified value or starts with the specified value followed by a hyphen (-), typically used for language or regional attributes.
[attribute^="value"]: Selects elements whose specified attribute's value starts with the specified value.
[attribute$="value"]: Selects elements whose specified attribute's value ends with the specified value.
[attribute*="value"]: Selects elements whose specified attribute's value contains the specified value anywhere within the attribute.
Examples:
1. [attribute]: Select elements with a specific attribute (no matter the value).
css
Copy code
/* Selects all elements with the 'data-info' attribute */
[data-info] {
  border: 1px solid red;
}
In this example:
All elements with the data-info attribute will be selected, regardless of its value.
2. [attribute="value"]: Select elements with a specific attribute value.
css
Copy code
/* Selects all links that have 'href' attribute set to 'https://example.com' */
a[href="https://example.com"] {
  color: blue;
}
Here:
Only the <a> tags with href="https://example.com" will be selected.
3. [attribute~="value"]: Select elements whose attribute contains a specific word in a space-separated list.
css
Copy code
/* Selects elements with the 'class' attribute containing the word 'highlight' */
div[class~="highlight"] {
  background-color: yellow;
}
In this case:
Only <div> elements whose class attribute contains the word "highlight" (as a whole word, not as a substring) will be selected.
4. [attribute|="value"]: Select elements whose attribute value is exactly the specified value or starts with the specified value followed by a hyphen.
css
Copy code
/* Selects elements with the 'lang' attribute set to 'en' or any variant like 'en-US' */
html[lang|="en"] {
  font-family: Arial, sans-serif;
}
Here:
This will select elements where the lang attribute is en, en-US, en-GB, etc.
5. [attribute^="value"]: Select elements whose attribute value starts with the specified value.
css
Copy code
/* Selects elements whose 'src' attribute starts with 'https' */
img[src^="https"] {
  border: 2px solid green;
}
In this example:
Only <img> elements whose src attribute starts with "https" will be selected.
6. [attribute$="value"]: Select elements whose attribute value ends with the specified value.
css
Copy code
/* Selects elements whose 'src' attribute ends with '.jpg' */
img[src$=".jpg"] {
  border: 2px solid blue;
}
Here:
Only <img> elements with src values ending in ".jpg" will be selected.
7. [attribute*="value"]: Select elements whose attribute value contains the specified value anywhere within it.
css
Copy code
/* Selects all elements whose 'title' attribute contains the word 'flower' */
a[title*="flower"] {
  color: pink;
}
In this example:
Any element with a title attribute containing the word "flower" (e.g., title="yellow flower") will be selected.
Summary of Attribute Selectors:
[attribute]: Selects elements with the specified attribute, regardless of its value.
[attribute="value"]: Selects elements with the exact attribute value.
[attribute~="value"]: Selects elements whose attribute contains a space-separated list of words, one of which is the specified value.
[attribute|="value"]: Selects elements whose attribute value starts with the specified value or is exactly the specified value (often used for languages or regional codes).
[attribute^="value"]: Selects elements whose attribute value starts with the specified value.
[attribute$="value"]: Selects elements whose attribute value ends with the specified value.
[attribute*="value"]: Selects elements whose attribute value contains the specified value anywhere within it.
Conclusion:
The [] (square brackets) in CSS are used for attribute selectors, allowing you to target elements based on their attributes, such as the presence of an attribute, a specific value, or patterns within the attribute value. These selectors offer a powerful way to apply styles to elements dynamically based on their attributes.

csharp
Copy code

This Markdown formatting will render correctly when viewed in a Markdown viewer or editor.


