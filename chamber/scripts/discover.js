// discover.js
document.addEventListener("DOMContentLoaded", () => {
  // fill footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  showVisitMessage();
  loadPlaces();
});

function showVisitMessage() {
  const key   = "discover-last-visit";
  const last  = localStorage.getItem(key);
  const now   = Date.now();
  const msgEl = document.getElementById("visit-message");

  if (!last) {
    msgEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - last) / 86400000);
    msgEl.textContent =
      days < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
  }

  localStorage.setItem(key, now);
}

async function loadPlaces() {
  try {
    // <-- relative to discover.html in chamber/ -->
    const resp   = await fetch("data/places.json");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const places = await resp.json();
    const gallery = document.querySelector(".gallery");

    places.forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h2>${p.title}</h2>
        <figure>
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </figure>
        <address>${p.address}</address>
        <p>${p.description}</p>
        <button>Learn more</button>
      `;
      gallery.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading places.json:", err);
  }
}
