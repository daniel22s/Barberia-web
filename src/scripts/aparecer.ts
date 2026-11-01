const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const elementos = document.querySelectorAll<HTMLElement>(".aparecer");
const videos = document.querySelectorAll<HTMLVideoElement>(
  "[data-video-portada]",
);
const observador =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            entrada.target.classList.add("aparecido");
            observador?.unobserve(entrada.target);
          }
        },
        { threshold: 0.12 },
      )
    : undefined;
if (observador) document.documentElement.classList.add("con-aparicion");

function actualizarMovimiento() {
  observador?.disconnect();
  for (const elemento of elementos) {
    if (movimientoReducido.matches) elemento.classList.remove("aparecido");
    else if (!elemento.classList.contains("aparecido"))
      observador?.observe(elemento);
  }
  for (const video of videos) {
    if (movimientoReducido.matches) {
      video.pause();
      video.hidden = true;
      continue;
    }
    // Sin JS o con movimiento reducido no se descarga ni reproduce el video.
    const fuente = video.querySelector<HTMLSourceElement>("source[data-src]");
    if (fuente && !fuente.hasAttribute("src")) {
      fuente.src = fuente.dataset.src!;
      video.load();
    }
    video.hidden = false;
    void video.play().catch(() => {
      video.hidden = true;
    });
  }
}

actualizarMovimiento();
movimientoReducido.addEventListener("change", actualizarMovimiento);
