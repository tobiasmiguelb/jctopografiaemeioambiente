const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let cards = Array.from(document.querySelectorAll('.servico-card'));
let cardWidth;
let index = 1;

function getCardWidth() {
  const style = window.getComputedStyle(track);
  const gap = parseInt(style.gap) || 0;
  return cards[0].offsetWidth + gap;
}

function setupCarousel() {
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  cards = Array.from(document.querySelectorAll('.servico-card'));

  cardWidth = getCardWidth();

  track.style.transform = `translateX(-${cardWidth}px)`;
}

function moveToIndex() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function moveNext() {
  index++;
  moveToIndex();
}

function movePrev() {
  index--;
  moveToIndex();
}

track.addEventListener("transitionend", () => {
  if (cards[index].isSameNode(cards[cards.length - 1])) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${cardWidth}px)`;
  }

  if (cards[index].isSameNode(cards[0])) {
    track.style.transition = "none";
    index = cards.length - 2;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

window.addEventListener("load", setupCarousel);

window.addEventListener("resize", () => {
  cardWidth = getCardWidth();
  track.style.transition = "none";
  track.style.transform = `translateX(-${index * cardWidth}px)`;
});