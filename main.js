
const obrazek = document.getElementById('pic');

document.addEventListener("DOMContentLoaded", function() {
  fetch('assets/text.json')
      .then(response => response.json())
      .then(data => {
          const miejsceNaTekst = document.getElementById('comment');
          // Zamiana znaków nowej linii na znaczniki <br>
          const sformatowanyTekst = data.description.pl.replace(/\n/g, '<br>');
          miejsceNaTekst.innerHTML = sformatowanyTekst; // Użyj innerHTML zamiast textContent
      })
      .catch(error => console.error('Błąd przy ładowaniu pliku JSON:', error));
});
const descButton = document.getElementById('commentBtn');
descButton.addEventListener('click', function() {
  // hide or show text in div of id desc
  const miejsceNaTekst = document.getElementById('comment');
  if (miejsceNaTekst.style.display === 'none') {
    miejsceNaTekst.style.display = 'block';
  } else {
    miejsceNaTekst.style.display = 'none';
  }
});

const body = document.getElementById('body');
// on hover change obrazek position to fixed
obrazek.addEventListener('mouseover', function() {
  obrazek.style.position = 'fixed';
}); 




// img move logic
document.addEventListener('mousemove', function(e) {
  obrazek.style.left = e.clientX + 10 + 'px';
  obrazek.style.top = e.clientY + 10 + 'px';
});

// next & prev img logic
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const images = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg', 'assets/5.jpg'];
let i = 0;
next.addEventListener('click', function() {
  i++;
  if (i >= images.length) {
    i = 0;
  }
  obrazek.src = images[i];
});
// now for prev
prev.addEventListener('click', function() {
  i--;
  if (i < 0) {
    i = images.length - 1;
  }
  obrazek.src = images[i];
});

// img scroll logic
let isTouchPad = false;
let eventCount = 0;
let eventThreshold = 1;
let deltaYAccumulator = 0;

// Wykrywanie urządzenia wejściowego
document.addEventListener('wheel', function(event) {
  deltaYAccumulator += Math.abs(event.deltaY);
  eventCount++;

  if (eventCount === eventThreshold) {
    if (deltaYAccumulator < eventThreshold * 2) {
      isTouchPad = true; // Prawdopodobnie Touchpad
    } else {
      isTouchPad = false; // Prawdopodobnie Myszka
    }

    // Reset liczników
    deltaYAccumulator = 0;
    eventCount = 0;
  }
});

let scrollThreshold = isTouchPad ? 40 : 4; // Różne progi dla myszki i touchpada
let accumulatedDeltaY = 0;

// Logika przewijania obrazów
document.addEventListener('wheel', function(e) {
  if (!isTouchPad) { // Dla myszki zachowaj oryginalne zachowanie
    accumulatedDeltaY += e.deltaY;
  } else { // Dla touchpada użyj mniejszego progu
    accumulatedDeltaY += e.deltaY / 10; // Zmniejsz wartość deltaY dla touchpada
  }

  if (Math.abs(accumulatedDeltaY) > scrollThreshold) {
    if (accumulatedDeltaY > 0) {
      i++;
      if (i >= images.length) {
        i = 0;
      }
    } else {
      i--;
      if (i < 0) {
        i = images.length - 1;
      }
    }
    obrazek.src = images[i];
    accumulatedDeltaY = 0; // Reset akumulacji po zmianie obrazka
  }
});