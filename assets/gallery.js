// Click a gallery photo to see it larger. Esc, the × button or a click outside closes it.
(function () {
  var photos = document.querySelectorAll('.gallery img');
  if (!photos.length || !window.HTMLDialogElement) return;

  var box = document.createElement('dialog');
  box.className = 'lightbox';
  box.innerHTML = '<button type="button" aria-label="Close">×</button><img alt=""><p></p>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('p');

  photos.forEach(function (p) {
    p.addEventListener('click', function () {
      img.src = p.currentSrc || p.src;
      img.alt = p.alt;
      var fc = p.closest('figure').querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : '';
      box.showModal();
    });
  });
  box.querySelector('button').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
})();
