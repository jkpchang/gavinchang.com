// Keeps "played violin for seven years" accurate without editing the bio.
//
// <span data-years-since="2019">seven</span> means Gavin started in the fall of
// 2019. The count goes up by one each September, at the start of the school year
// (so fall 2019 → Nov 2026 = seven). The text inside the span is the fallback
// shown if JavaScript is off; it's fine for it to fall a little behind.
(function () {
  var words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  var now = new Date();
  var schoolYearStart = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1; // Sep = month 8

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = now.getFullYear(); // footer copyright year
  });

  document.querySelectorAll('[data-years-since]').forEach(function (el) {
    var years = schoolYearStart - Number(el.getAttribute('data-years-since'));
    if (years > 0) el.textContent = words[years] || String(years);
  });
})();
