const quote = document.querySelector('#quote');
const generateButton = document.querySelector('#generate');
const copyButton = document.querySelector('#copy');
const counter = document.querySelector('#counter');
const randomNumbers = document.querySelectorAll('.random-number');
let parts;

const pick = entries => entries[Math.floor(Math.random() * entries.length)];

function generate() {
  if (!parts) return;
  const text = [pick(parts.opening), pick(parts.argument), pick(parts.punchline)].join(' ');
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
    const total = parts.opening.length * parts.argument.length * parts.punchline.length;
    counter.textContent = `${total.toLocaleString('pl-PL')} możliwych królewskich wypowiedzi`;
    generate();
  })
  .catch(() => { quote.textContent = 'Król chwilowo stracił argumenty. Odśwież stronę.'; });

generateButton.addEventListener('click', generate);
copyButton.addEventListener('click', copyQuote);
