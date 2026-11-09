# gavinchang.com

Portfolio site for Gavin Chang, violist and violinist (Palo Alto Chamber Orchestra).

Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

- `index.html`: home (Listen, Gallery, About, Contact)
- `events.html`: concerts. Each `<li class="event" data-date="YYYY-MM-DD">` is sorted into Upcoming or Past automatically by `assets/events.js`; add `data-start="YYYY-MM-DDTHH:MM"` when the start time is known.
- `assets/years.js`: keeps "played violin for N years" and the footer year current.
- `assets/form.js`: sends the contact form to Google Forms.

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000
