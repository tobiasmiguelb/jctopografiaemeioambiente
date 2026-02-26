document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ANO AUTOMÁTICO
  ========================== */

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     MENU MOBILE
  ========================== */

  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  /* =========================
     CONTADOR COM CURVA
  ========================== */

  const counter = document.querySelector(".counter");

  if (counter) {
    const target = +counter.getAttribute("data-target");
    let animated = false;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter() {
      let startTime = null;
      const duration = 2000;

      function update(currentTime) {
        if (!startTime) startTime = currentTime;

        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {

          let value;

          if (progress < 0.5) {
            value = easeOutCubic(progress * 2) * (target / 2);
          } else {
            const secondHalf = (progress - 0.5) * 2;
            value = (target / 2) + (easeOutCubic(secondHalf) * (target / 2));
          }

          counter.innerText = Math.floor(value)
            .toString()
            .padStart(4, "0");

          requestAnimationFrame(update);

        } else {
          counter.innerText = target;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounter();
          animated = true;
        }
      });
    }, { threshold: 0.6 });

    observer.observe(counter);
  }

  /* =========================
     MAPA COM FETCH + HOVER PRECISO
  ========================== */

  const mapaContainer = document.getElementById("mapa-container");
  const infoBox = document.getElementById("estado-info");

  if (mapaContainer && infoBox) {

    fetch("brazil.svg")
      .then(response => response.text())
      .then(svg => {

        mapaContainer.innerHTML = svg;

        const svgElement = mapaContainer.querySelector("svg");
        const estados = mapaContainer.querySelectorAll("path");

        function resetEstados() {
          estados.forEach(e => {
            e.classList.remove("estado-ativo");
            e.classList.remove("estado-inativo");
          });
          infoBox.style.display = "none";
          infoBox.textContent = "";
        }

        estados.forEach(estado => {

          function ativar() {

            estados.forEach(e => {
              e.classList.remove("estado-ativo");
              e.classList.add("estado-inativo");
            });

            this.classList.remove("estado-inativo");
            this.classList.add("estado-ativo");

            const nome = this.getAttribute("title") || this.id || "Estado";
            const sigla = this.id ? this.id.replace("BR-", "") : "";

            infoBox.style.display = "block";
            infoBox.innerText = sigla ? `${nome} - ${sigla}` : nome;
          }

          estado.addEventListener("mouseenter", ativar);
          estado.addEventListener("click", ativar);

        });

        if (svgElement) {
          svgElement.addEventListener("mouseleave", resetEstados);
        }

      })
      .catch(error => {
        console.error("Erro ao carregar mapa:", error);
      });

  }

});

  const botao = document.querySelector(".btn-orcamento");
  const overlay = document.getElementById("redirect-overlay");

  botao.addEventListener("click", function(e) {
    e.preventDefault();

    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = botao.href;
    }, 1200);
  });

  <script>

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function() {
      navLinks.classList.toggle("active");
    })
  }

</script>