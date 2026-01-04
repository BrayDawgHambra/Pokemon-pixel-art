let idx = 0;                       // 0-based index
const img = document.getElementById('sprite');
const btn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

/* build the highest-quality Bulbapedia URL for a given name */
function spriteUrl(name){
  const base = "https://archives.bulbagarden.net/media/upload/";
  /* Dream World art (huge, transparent PNG) exists for most Pokémon ≤ Gen 5.
     After that we fall back to the newest pixel sprite. */
  const dream = base + `f/f3/${name}_Dream.png`;
  const pixel = base + `archive/${name.slice(0,1)}/${name}_HOME.png`;
  /* Try Dream first; if 404, use pixel.  Simple HEAD check: */
  return fetch(dream,{method:'HEAD'})
         .then(r => r.ok ? dream : pixel);
}

function loadMon(i){
  const name = DEX[i];
  spriteUrl(name).then(url => {
    img.src = url;
    img.alt = name;
    counter.textContent = `${i+1} / 1025`;
    btn.disabled = (i === 1024);   // last one
  });
}

btn.onclick = () => {
  if(idx < 1024){ loadMon(++idx); }
};

/* kick off with Bulbasaur */
loadMon(0);
