const overlay = document.createElement("div");
Object.assign(overlay.style, {
  display: "none",
  position: "fixed",
  inset: "0",
  background: "rgba(11, 31, 58, 0)",
  zIndex: "999999",
  cursor: "zoom-out",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.35s ease",
});

const lightboxImg = document.createElement("img");
Object.assign(lightboxImg.style, {
  maxWidth: "62vw",
  maxHeight: "72vh",
  objectFit: "contain",
  borderRadius: "12px",
  boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
  opacity: "0",
  transform: "scale(0.93)",
  transition: "opacity 0.35s ease, transform 0.35s ease",
});

overlay.appendChild(lightboxImg);
document.body.appendChild(overlay);

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // stops scrolling
  requestAnimationFrame(() => // frame 1: overlay now exists in layout
    requestAnimationFrame(() => { // frame 2: now safe to animate
      overlay.style.background = "rgba(11, 31, 58, 0.72)";
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }),
  );
}

function closeLightbox() {
  overlay.style.background = "rgba(11, 31, 58, 0)";
  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(0.93)";
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }, 350);
}

// click listner applied to parent div
document.querySelectorAll(".sample-img img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

overlay.addEventListener("click", closeLightbox); // listener to the overlay div
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox(); // closes the overlay
});
