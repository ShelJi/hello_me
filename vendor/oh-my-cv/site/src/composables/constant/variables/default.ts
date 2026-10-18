import { PREVIEW_SELECTOR } from "./render";
import type { ResumeStyles } from "../../stores/style";

export const DEFAULT_STYLES = {
  marginV: 50,
  marginH: 45,
  lineHeight: 1.3,
  paragraphSpace: 5,
  themeColor: "#377bb5",
  fontCJK: {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  fontEN: {
    name: "Arial"
  },
  fontSize: 15,
  paper: "A4"
} as ResumeStyles;

export const DEFAULT_MD_CONTENT = `---
name: Your Name
header:
  - text: Email | Phone | Location
---

## Summary

Describe your experience and the role you are seeking.

## Experience

### Job Title | Company | Dates

- Describe an achievement and its measurable result.

## Education

Degree | Institution | Graduation year

## Skills

List relevant skills.

## Projects

Describe a relevant project and its results.
`;

export const DEFAULT_CSS_CONTENT = `/* Backbone CSS for Resume Template 1 */

/* Basic */

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li,
${PREVIEW_SELECTOR} dl {
  margin: 0;
}

/* Headings */

${PREVIEW_SELECTOR} h1,
${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  font-weight: bold;
}

${PREVIEW_SELECTOR} h1 {
  font-size: 2.13em;
}

${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  margin-bottom: 5px;
  font-size: 1.2em;
}

${PREVIEW_SELECTOR} h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

/* Lists */

${PREVIEW_SELECTOR} ul,
${PREVIEW_SELECTOR} ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}

${PREVIEW_SELECTOR} ul {
  list-style-type: circle;
}

${PREVIEW_SELECTOR} ol {
  list-style-type: decimal;
}

/* Definition Lists */

${PREVIEW_SELECTOR} dl {
  display: flex;
}

${PREVIEW_SELECTOR} dl dt,
${PREVIEW_SELECTOR} dl dd:not(:last-child) {
  flex: 1;
}

/* Tex */

${PREVIEW_SELECTOR} :not(span.katex-display) > span.katex {
  font-size: 1em !important;
}

/* SVG & Images */

${PREVIEW_SELECTOR} svg.iconify {
  vertical-align: -0.2em;
}

${PREVIEW_SELECTOR} img {
  max-width: 100%;
}

/* Header */

${PREVIEW_SELECTOR} .resume-header {
  text-align: center;
}

${PREVIEW_SELECTOR} .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}

${PREVIEW_SELECTOR} .resume-header-item:not(.no-separator)::after {
  content: " | ";
}

/* Citations */

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definitions"] {
  padding-left: 1.2em;
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definition"] p {
  margin-left: 0.5em;
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definition"]::marker {
  content: attr(data-label);
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="reference"] {
  font-size: 100%;
  top: 0;
}

/* Dark & print mode */
/* You might want to comment out the following lines if you change the background or text color. */

.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}
`;
