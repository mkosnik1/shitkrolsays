const quote = document.querySelector('#quote');
const generateButton = document.querySelector('#generate');
const copyButton = document.querySelector('#copy');
const randomNumbers = document.querySelectorAll('.random-number');
let parts;
const bags = {};

function shuffle(entries) {
  const copy = [...entries];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function draw(name) {
  if (!bags[name]?.length) bags[name] = shuffle(parts[name]);
  return bags[name].pop();
}

function generate() {
  if (!parts) return;
  const segments = [draw('opening'), draw('argument')];
  if (Math.random() < 0.45) segments.push(draw('aside'));
  segments.push(draw('punchline'));
  const text = segments.join(' ');
  quote.textContent = text;
  quote.classList.toggle('is-long', text.length > 260);
  quote.scrollTop = 0;
  randomNumbers.forEach(element => {
    element.textContent = Math.floor(Math.random() * 201);
  });
}

async function copyQuote() {
  await navigator.clipboard.writeText(quote.textContent);
  const old = copyButton.textContent;
  copyButton.textContent = 'SKOPIOWANO';
  setTimeout(() => { copyButton.textContent = old; }, 1200);
}

fetch('shit-krol-says.fragments.json')
  .then(response => {
    if (!response.ok) throw new Error('Nie udało się pobrać fragmentów.');
    return response.json();
  })
  .then(data => {
    parts = data.parts;
    generate();
  })
  .catch(() => { quote.textContent = 'Król chwilowo stracił argumenty. Odśwież stronę.'; });

generateButton.addEventListener('click', generate);
copyButton.addEventListener('click', copyQuote);
