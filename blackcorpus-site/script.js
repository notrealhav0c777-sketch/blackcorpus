(function () {
  var NUM = "5547991247020";
  var $ = function (s) { return document.querySelector(s); };

  $("#ano").textContent = new Date().getFullYear();

  var btn = $("#menuBtn"), menu = $("#menu");
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  var itens = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    itens.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 80 + "ms"; io.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add("vis"); });
  }

  $("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("#nome").value.trim(), neg = $("#negocio").value.trim(),
        srv = $("#servico").value, msg = $("#msg").value.trim(), erro = $("#erro");
    var m = "";
    if (!nome) m = "Informe seu nome.";
    else if (!neg) m = "Informe o tipo do seu negócio.";
    else if (!srv) m = "Escolha o serviço desejado.";
    erro.hidden = !m; erro.textContent = m;
    if (m) return;
    var t = ["Olá, BlackCorpus! Quero pedir um serviço:",
             "Nome: " + nome, "Negócio: " + neg, "Serviço: " + srv];
    if (msg) t.push("Mensagem: " + msg);
    window.open("https://wa.me/" + NUM + "?text=" + encodeURIComponent(t.join("\n")), "_blank", "noopener");
  });
})();
