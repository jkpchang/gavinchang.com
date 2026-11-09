// Keeps the Events page current without editing it by hand.
//
// Every <li class="event"> carries data-date="YYYY-MM-DD" (and data-start when the
// time is known). On page load, an event counts as past 3 hours after data-start,
// or, with no start time, from the day after its date (visitor's time zone). Past
// events are moved into "Past · <season>" groups (seasons run Aug–Jul, e.g.
// 2026–27), upcoming ones are sorted soonest first, past ones newest first, and
// anything marked .upcoming-only (e.g. ticket links) is removed once it's past.
//
// To add a concert, add an <li class="event" data-date="..."> anywhere in the page.
(function () {
  var main = document.querySelector('[data-events]');
  if (!main) return;

  var now = new Date();
  var today = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

  function season(iso) {
    var y = +iso.slice(0, 4), m = +iso.slice(5, 7);
    var start = m >= 8 ? y : y - 1;
    return start + '–' + String((start + 1) % 100).padStart(2, '0');
  }

  function group(label, items) {
    var div = document.createElement('div');
    div.className = 'events-group';
    var span = document.createElement('span');
    span.className = 'label';
    span.textContent = label;
    var ul = document.createElement('ul');
    ul.className = 'events';
    items.forEach(function (li) { ul.appendChild(li); });
    div.appendChild(span);
    div.appendChild(ul);
    return div;
  }

  var all = Array.prototype.slice.call(main.querySelectorAll('li.event[data-date]'));
  var upcoming = [], past = {};

  // data-start="YYYY-MM-DDTHH:MM" (local time) is optional. With it, an event counts
  // as over 3 hours after it starts; without it, from the day after its date.
  function isUpcoming(li) {
    var start = li.getAttribute('data-start');
    if (start) return now < new Date(new Date(start).getTime() + 3 * 3600 * 1000);
    return li.getAttribute('data-date') >= today;
  }

  all.forEach(function (li) {
    var d = li.getAttribute('data-date');
    if (isUpcoming(li)) {
      upcoming.push(li);
    } else {
      li.querySelectorAll('.upcoming-only').forEach(function (el) { el.remove(); });
      li.querySelectorAll('time small').forEach(function (el) {
        if (/TBA/i.test(el.textContent)) el.remove(); // "Time TBA" means nothing once it's over
      });
      var links = li.querySelector('.links');
      if (links && !links.children.length) links.remove();
      (past[season(d)] = past[season(d)] || []).push(li);
    }
  });

  upcoming.sort(function (a, b) { return a.dataset.date < b.dataset.date ? -1 : 1; });

  main.innerHTML = '';
  if (upcoming.length) {
    main.appendChild(group('Upcoming', upcoming));
  } else {
    var g = group('Upcoming', []);
    var p = document.createElement('p');
    p.className = 'events-empty';
    p.textContent = 'New dates will be announced soon.';
    g.appendChild(p);
    main.appendChild(g);
  }

  Object.keys(past).sort().reverse().forEach(function (s) {
    var items = past[s].sort(function (a, b) { return a.dataset.date < b.dataset.date ? 1 : -1; });
    main.appendChild(group('Past · ' + s + ' Season', items));
  });
})();
