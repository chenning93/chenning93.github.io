# Ning CHEN – Academic Homepage

Source of <https://chenning93.github.io/>, the personal homepage of Ning CHEN,
Marie Skłodowska-Curie Research Fellow, Department of Computer Science, University of Exeter.

Plain HTML/CSS/JS, served by GitHub Pages. No build step.

## Structure

```
index.html              Home: profile, news, recruitment, selected publications
pages/publications.html Full publication list (search and filters appear once papers are added)
pages/projects.html     Research projects
pages/group.html        Group members and open positions
pages/teaching.html     Teaching
pages/service.html      Awards & Services (fellowships, honours, editorial, reviewing)
pages/contact.html      Contact details and prospective students
css/  js/  images/
```

## Updating content

Each section has a commented-out HTML template right where new items go —
copy it, fill it in, and remove the "empty-state" box once the section has real content.

- News: `index.html`, inside `<div class="news-timeline">`
- Selected papers: `index.html`, inside `<div class="publications-list-simple">`
- All papers: `pages/publications.html`, one `year-section` per year
- Projects / members / courses: the matching page in `pages/`

## Travel map

`pages/service.html` has a `window.VISITED_COUNTRIES` list near the bottom.
Add a country by English name or 2-letter ISO code, with an optional note shown on hover:

```js
{ country: "Japan", note: "IEEE ICC 2025, Tokyo" },
```

The map file `images/world-map.svg` is built from Natural Earth 1:50m country
boundaries (public domain); `js/travel-map.js` colours and labels the countries.

## Visit counter

Every page loads GoatCounter (`chenning93.goatcounter.com`, no cookies); the homepage
footer shows the total. The count appears once the GoatCounter site exists and
"Allow adding visitor counts on your website" is enabled in its settings.

## Preview locally

```
python3 -m http.server 8000
```
then open http://localhost:8000

## Credits

Layout based on an open academic homepage template. Icons: Font Awesome. Fonts: Google Fonts (Inter, Playfair Display).
