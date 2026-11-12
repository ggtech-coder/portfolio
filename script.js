// GG TECH — lógica da página
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
  const brlCents = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = (n) => Math.round(n * 100) + "%";

  const C = GG.comercial;
  const sellerMode = new URLSearchParams(location.search).has("vendas");

  // ---------- Tema claro / escuro ----------
  (function theme() {
    const root = document.documentElement;
    const btn = $("#theme");
    const meta = $('meta[name="theme-color"]');
    const apply = (t) => {
      root.dataset.theme = t;
      meta.setAttribute("content", t === "light" ? "#f6f7f9" : "#07090d");
      btn.setAttribute("aria-label", t === "light" ? "Mudar para modo escuro" : "Mudar para modo claro");
    };
    apply(root.dataset.theme === "light" ? "light" : "dark");
    btn.addEventListener("click", () => {
      const t = root.dataset.theme === "light" ? "dark" : "light";
      apply(t);
      try { localStorage.setItem("gg-theme", t); } catch {}
    });
  })();
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    setTimeout(() => t.classList.remove("is-on"), 2200);
  };

  // ---------- WhatsApp ----------
  const waLink = (msg) => "https://wa.me/" + GG.contato.whatsapp + "?text=" + encodeURIComponent(msg);
  $$("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });

  // ---------- Aviso de agenda ----------
  const mes = new Date().toLocaleString("pt-BR", { month: "long" });
  if (C.vagasRestantes > 0) {
    const v = C.vagasRestantes;
    const txt = `${v} ${v === 1 ? "vaga" : "vagas"}`;
    $("#alert").innerHTML = `Agenda de ${esc(mes)}: <b>${txt}</b> para novos projetos · propostas válidas por ${C.validadeDias} dias`;
    $("#final-slots").textContent = `Agenda de ${mes}: ${txt} para novos projetos`;
  }

  // ---------- Barra de progresso ----------
  const progress = $("#progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Prévia ao vivo do site do visitante ----------
  (function preview() {
    const SEGS = {
      clinica: { label: "Clínica", m: "#0d9488", bg: "#f3fbfa", fg: "#10201f", card: "#ffffff", btn: "Agendar", titulo: "Cuidado de verdade, perto de você", sub: "atendimento com hora marcada.", cta: "Agendar consulta", itens: ["Consultas", "Exames", "Retornos"] },
      barbearia: { label: "Barbearia", m: "#c9a227", bg: "#15130f", fg: "#f6f1e6", card: "#211d16", btn: "Agendar", titulo: "Corte e barba no seu horário", sub: "estilo sem fila de espera.", cta: "Agendar horário", itens: ["Corte", "Barba", "Combo"] },
      estetica: { label: "Estética", m: "#b4637a", bg: "#fdf5f6", fg: "#2a1a1f", card: "#ffffff", btn: "Agendar", titulo: "Seu momento de cuidado", sub: "tratamentos faciais e corporais.", cta: "Ver tratamentos", itens: ["Facial", "Corporal", "Pacotes"] },
      advocacia: { label: "Advocacia", m: "#1e3a5f", bg: "#f6f5f1", fg: "#141a22", card: "#ffffff", btn: "Contato", titulo: "Seu direito defendido com seriedade", sub: "atendimento claro e sigiloso.", cta: "Falar com advogado", itens: ["Trabalhista", "Família", "Empresarial"] },
      restaurante: { label: "Restaurante", m: "#d9480f", bg: "#fff7ef", fg: "#2a1608", card: "#ffffff", btn: "Pedir", titulo: "Sabor que faz voltar", sub: "peça online ou reserve sua mesa.", cta: "Fazer pedido", itens: ["Cardápio", "Reservas", "Delivery"] },
      loja: { label: "Loja", m: "#6d4aff", bg: "#f8f6ff", fg: "#17122b", card: "#ffffff", btn: "Comprar", titulo: "As novidades chegaram", sub: "compre online e receba em casa.", cta: "Ver produtos", itens: ["Lançamentos", "Ofertas", "Mais vendidos"] },
    };
    let seg = "clinica", name = "";
    const mock = $("#mock");
    const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || "seunegocio";
    $("#t-segs").innerHTML = Object.entries(SEGS).map(([k, s]) => `<button type="button" class="seg ${k === seg ? "is-on" : ""}" data-seg="${k}">${s.label}</button>`).join("");

    function paint(animate) {
      const s = SEGS[seg], n = name || "Seu Negócio";
      mock.style.setProperty("--m", s.m);
      mock.style.setProperty("--m-bg", s.bg);
      mock.style.setProperty("--m-fg", s.fg);
      mock.style.setProperty("--m-card", s.card);
      $("#m-url").textContent = `www.${slug(name)}.com.br`;
      $("#m-brand").textContent = n;
      $("#m-btn").textContent = s.btn;
      $("#m-tag").textContent = s.label;
      $("#m-title").textContent = s.titulo;
      $("#m-sub").textContent = `${n} — ${s.sub}`;
      $("#m-cta").textContent = s.cta;
      $("#m-cards").innerHTML = s.itens.map((i) => `<div>${esc(i)}</div>`).join("");
      $("#t-send").href = waLink(`Olá! Montei uma prévia no site da GG Tech${name ? ` para "${name}"` : ""} (${s.label}) e quero o site de verdade.`);
      if (animate && !calm) {
        mock.classList.remove("is-swap");
        void mock.offsetWidth;
        mock.classList.add("is-swap");
      }
    }
    $("#t-name").addEventListener("input", (e) => { name = e.target.value.trim(); paint(false); });
    $("#t-segs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-seg]");
      if (!b) return;
      seg = b.dataset.seg;
      $$(".seg").forEach((x) => x.classList.toggle("is-on", x === b));
      paint(true);
    });
    paint(false);
  })();

  // ---------- Jornada do cliente (sem site / com site) ----------
  (function journey() {
    const el = $("#journey");
    const STEPS = [
      { t: "Pesquisa", off: "Procura o seu serviço e a sua cidade no Google.", on: "Procura o seu serviço e a sua cidade no Google." },
      { t: "Encontra", off: "Aparecem três concorrentes. Você não.", on: "Seu site aparece, com fotos, serviços e preços." },
      { t: "Confia", off: "Sem ver nada seu, ele escolhe quem viu.", on: "Visual profissional: ele decide em segundos." },
      { t: "Agenda", off: "Marca horário com outro negócio.", on: "Marca sozinho, às 23h de um domingo." },
      { t: "Paga", off: "O dinheiro entra em outro caixa.", on: "Pagamento confirmado. Você recebe o aviso." },
    ];
    const RESULT = { off: "Você nem ficou sabendo que perdeu esse cliente.", on: "Cliente novo no caixa, sem você tocar no celular." };
    function paint() {
      const mode = el.dataset.mode;
      $("#j-steps").innerHTML = STEPS.map((s, i) => `<li style="--i:${i}" class="${mode === "on" ? "is-won" : i > 0 ? "is-lost" : ""}"><h3>${s.t}</h3><p>${s[mode]}</p></li>`).join("");
      $("#j-result").textContent = RESULT[mode];
      $("#j-switch").setAttribute("aria-checked", mode === "on");
    }
    const set = (mode) => { el.dataset.mode = mode; paint(); };
    $("#j-switch").addEventListener("click", () => set(el.dataset.mode === "on" ? "off" : "on"));
    $$(".switch-label", el).forEach((l) => l.addEventListener("click", () => set(l.dataset.for)));
    paint();
  })();

  // ---------- Demo: agendamento + painel ----------
  (function demo() {
    const SERVICES = [{ n: "Consulta", p: 150 }, { n: "Avaliação", p: 80 }, { n: "Retorno", p: 60 }];
    const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    const bookings = [
      { h: "09:00", c: "Mariana S.", s: "Consulta", p: 150 },
      { h: "11:00", c: "Rafael T.", s: "Avaliação", p: 80 },
      { h: "15:00", c: "Camila R.", s: "Retorno", p: 60 },
    ];
    let svc = 0, slot = null;
    const btn = $("#d-confirm");
    const taken = () => bookings.map((b) => b.h);

    function paint(newest) {
      $("#d-services").innerHTML = SERVICES.map((s, i) => `<button type="button" class="svc ${i === svc ? "is-on" : ""}" data-svc="${i}"><b>${s.n}</b><span>${brl(s.p)}</span></button>`).join("");
      $("#d-slots").innerHTML = SLOTS.map((h) => `<button type="button" class="slot ${h === slot ? "is-on" : ""}" data-slot="${h}" ${taken().includes(h) ? "disabled" : ""}>${h}</button>`).join("");
      btn.disabled = !slot;
      btn.textContent = slot ? `Confirmar ${SERVICES[svc].n} às ${slot}` : "Escolha um horário";
      $("#d-list").innerHTML = [...bookings].sort((a, b) => a.h.localeCompare(b.h)).map((b) => `<li class="${b === newest ? "is-new" : ""}"><time>${b.h}</time><span>${esc(b.c)}${b === newest ? '<span class="tag">novo</span>' : ""}<small>${b.s}</small></span><b>${brl(b.p)}</b></li>`).join("");
      $("#d-count").textContent = bookings.length;
      $("#d-rev").textContent = brl(bookings.reduce((s, b) => s + b.p, 0));
    }
    const bump = (el) => { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); setTimeout(() => el.classList.remove("bump"), 900); };

    $("#demo").addEventListener("click", (e) => {
      const s = e.target.closest("[data-svc]"), h = e.target.closest("[data-slot]");
      if (s) { svc = +s.dataset.svc; paint(); }
      else if (h && !h.disabled) { slot = h.dataset.slot; paint(); }
    });
    btn.addEventListener("click", () => {
      if (!slot) return;
      const b = { h: slot, c: "Você (teste)", s: SERVICES[svc].n, p: SERVICES[svc].p };
      bookings.push(b);
      slot = null;
      paint(b);
      bump($("#d-count"));
      bump($("#d-rev"));
      toast("Novo agendamento recebido no painel");
      if (bookings.length >= SLOTS.length) { btn.textContent = "Agenda do dia lotada"; }
    });
    paint();
  })();

  // ---------- Contadores ----------
  $("#st-proj").dataset.count = GG.projetos.length;
  const countUp = (el) => {
    const to = +el.dataset.count;
    if (calm) { el.textContent = to; return; }
    const t0 = performance.now();
    const run = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  };

  // ---------- Métricas reais desta página ----------
  addEventListener("load", () => setTimeout(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    if (nav) {
      const s = (nav.domContentLoadedEventEnd / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + " s";
      $("#m-load").textContent = s;
      $("#hud-load").textContent = "Esta página abriu em " + s;
      const bytes = [nav, ...performance.getEntriesByType("resource")].reduce((sum, r) => sum + (r.transferSize || r.encodedBodySize || 0), 0);
      if (bytes) $("#m-weight").textContent = bytes > 1e6 ? (bytes / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " MB" : Math.round(bytes / 1000) + " kB";
    }
    let frames = 0;
    const t0 = performance.now();
    const f = (t) => { frames++; t - t0 < 1000 ? requestAnimationFrame(f) : ($("#m-fps").textContent = Math.round(frames / ((t - t0) / 1000)) + " fps"); };
    requestAnimationFrame(f);
  }, 400));

  // ---------- Calculadora de faturamento ----------
  const sitePrice = (GG.pacotes.find((p) => p.id === "site") || GG.pacotes[0]).preco;
  const calcState = { ticket: 150, cli: 10, month: 1500 };
  const fillRange = (r) => r.style.setProperty("--fill", ((r.value - r.min) / (r.max - r.min)) * 100 + "%");
  const paybackText = (price, month) => {
    const d = Math.ceil(price / (month / 30));
    return d > 365 ? "mais de 1 ano" : d + (d === 1 ? " dia" : " dias");
  };
  function renderCalc() {
    const t = $("#c-ticket"), c = $("#c-cli");
    calcState.ticket = +t.value;
    calcState.cli = +c.value;
    calcState.month = calcState.ticket * calcState.cli;
    fillRange(t); fillRange(c);
    $("#c-ticket-out").textContent = brl(calcState.ticket);
    $("#c-cli-out").textContent = calcState.cli + (calcState.cli === 1 ? " cliente" : " clientes");
    $("#c-month").textContent = brl(calcState.month);
    $("#c-year").textContent = brl(calcState.month * 12);
    $("#c-payback").textContent = paybackText(sitePrice, calcState.month);
    $("#c-day").textContent = brl(calcState.month / 30);
    const paidAt = Math.ceil(sitePrice / calcState.month);
    $("#c-chart").innerHTML = Array.from({ length: 12 }, (_, i) => `<i class="${i + 1 >= paidAt ? "is-profit" : ""}" style="height:${((i + 1) / 12) * 100}%" title="Mês ${i + 1}: ${brl(calcState.month * (i + 1))}"></i>`).join("");
    $("#c-send").href = waLink(
      `Olá! Fiz a simulação no site da GG Tech:\n• Ticket médio: ${brl(calcState.ticket)}\n• ${calcState.cli} clientes novos por mês\n• Potencial: + ${brl(calcState.month)}/mês (${brl(calcState.month * 12)} por ano)\n\nQuero colocar isso para rodar. Podemos conversar?`
    );
    if (typeof render === "function") render();
  }

  // ---------- Projetos ----------
  $("#projects").innerHTML = GG.projetos.map((p) => `
    <a class="project reveal" href="${esc(p.url)}" target="_blank" rel="noopener" data-tipo="${p.tipo}">
      <div class="shot">
        <div class="shot-fallback" aria-hidden="true">${esc(p.nome.slice(0, 2).toUpperCase())}</div>
        <img src="assets/projetos/${esc(p.img)}" alt="Tela do projeto ${esc(p.nome)}" loading="lazy" onerror="this.remove()" />
        <span class="shot-live"><span class="dot"></span>No ar</span>
      </div>
      <div class="project-body">
        <div class="project-meta"><span>${esc(p.segmento)}</span><span>${p.tipo === "site" ? "Site" : "Sistema"}</span></div>
        <h3>${esc(p.nome)}</h3>
        <p>${esc(p.desc)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <span class="go">Abrir ao vivo <span aria-hidden="true">↗</span></span>
      </div>
    </a>`).join("");

  $$(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => c.classList.toggle("is-on", c === chip));
      const f = chip.dataset.filter;
      $$(".project").forEach((el) => el.classList.toggle("is-hidden", f !== "todos" && el.dataset.tipo !== f));
    })
  );

  if (!calm && matchMedia("(pointer: fine)").matches) {
    $$(".project").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }

  // ---------- Pacotes ----------
  $("#packs").innerHTML = GG.pacotes.map((p) => `
    <article class="pack reveal ${p.destaque ? "is-hot" : ""}">
      ${p.destaque ? `<span class="badge">${esc(p.destaque)}</span>` : ""}
      <h3>${esc(p.nome)}</h3>
      <p class="pack-resumo">${esc(p.resumo)}</p>
      <p class="price"><small>${p.aPartir ? "a partir de" : "investimento único"}</small>${brl(p.preco)}</p>
      <p class="pack-prazo">⏱ ${esc(p.prazo)}</p>
      <ul>${p.itens.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <a class="btn ${p.destaque ? "btn-accent" : "btn-ghost"} btn-block" href="#orcamento" data-pick="${p.id}">Quero este</a>
    </article>`).join("");

  $("#terms-line").textContent = `Condições: ${pct(C.entrada)} para começar e ${pct(1 - C.entrada)} na entrega · ${pct(C.descontoPix)} de desconto no Pix à vista · proposta válida por ${C.validadeDias} dias.`;
  $("#faq-pay").textContent = `Você paga ${pct(C.entrada)} para começarmos e ${pct(1 - C.entrada)} quando aprovar a entrega. Pagando tudo no Pix à vista, tem ${pct(C.descontoPix)} de desconto. O plano mensal, se você quiser, começa só depois que o projeto está no ar.`;

  // ---------- Orçamento ----------
  const state = { pacote: "site", add: {}, plano: "essencial", expresso: false, desconto: 0, cliente: "" };

  $("#b-packs").innerHTML = GG.pacotes.map((p) => `
    <label class="opt">
      <input type="radio" name="pacote" value="${p.id}" ${p.id === state.pacote ? "checked" : ""} />
      <span class="opt-box">
        <span class="opt-name">${esc(p.nome)}</span>
        <span class="opt-desc">${esc(p.resumo)}</span>
        <span class="opt-price">${p.aPartir ? "a partir de " + brl(p.preco) : brl(p.preco) + " · " + esc(p.prazo)}</span>
      </span>
    </label>`).join("");

  const grupos = [...new Set(GG.adicionais.map((a) => a.grupo))];
  $("#b-addons").innerHTML = grupos.map((g) => `
    <p class="group-title">${esc(g)}</p>
    <div class="opt-grid">
      ${GG.adicionais.filter((a) => a.grupo === g).map((a) => `
        <label class="opt">
          <input type="checkbox" name="add" value="${a.id}" />
          <span class="opt-box">
            <span class="opt-name">${esc(a.nome)}</span>
            <span class="opt-desc">${esc(a.desc)}</span>
            ${a.quantidade ? `<span class="qty"><button type="button" data-q="-1" data-id="${a.id}" aria-label="Diminuir">−</button><output id="q-${a.id}">1</output><button type="button" data-q="1" data-id="${a.id}" aria-label="Aumentar">+</button></span>` : ""}
            <span class="opt-price" id="p-${a.id}">+ ${brl(a.preco)}${a.quantidade ? " cada" : ""}</span>
          </span>
        </label>`).join("")}
    </div>`).join("");

  $("#b-plans").innerHTML = GG.planos.map((p) => `
    <label class="opt">
      <input type="radio" name="plano" value="${p.id}" ${p.id === state.plano ? "checked" : ""} />
      <span class="opt-box">
        <span class="opt-name">${esc(p.nome)}</span>
        <span class="opt-desc">${esc(p.desc)}</span>
        <span class="opt-price">${p.preco ? brl(p.preco) + " / mês" : "R$ 0"}</span>
      </span>
    </label>`).join("");

  $("#b-speed").innerHTML = `
    <label class="opt"><input type="radio" name="speed" value="0" checked /><span class="opt-box"><span class="opt-name">Prazo normal</span><span class="opt-desc">O prazo padrão do pacote escolhido.</span><span class="opt-price">sem acréscimo</span></span></label>
    <label class="opt"><input type="radio" name="speed" value="1" /><span class="opt-box"><span class="opt-name">Entrega expressa</span><span class="opt-desc">Seu projeto fura a fila e sai na metade do prazo.</span><span class="opt-price">+ ${pct(C.taxaExpressa)}</span></span></label>`;

  if (sellerMode) {
    $("#seller").hidden = false;
    $("#s-discount").innerHTML = C.descontosConsultora.map((d) => `<option value="${d}">${d ? d + "% de desconto" : "Sem desconto"}</option>`).join("");
    $("#s-discount").addEventListener("change", (e) => { state.desconto = +e.target.value / 100; render(); });
    $("#s-client").addEventListener("input", (e) => { state.cliente = e.target.value.trim(); render(); });
  }

  function calc() {
    const pacote = GG.pacotes.find((p) => p.id === state.pacote);
    const linhas = [{ nome: pacote.nome, valor: pacote.preco, aPartir: pacote.aPartir }];
    GG.adicionais.forEach((a) => {
      const incluso = (a.inclusoEm || []).includes(pacote.id);
      const qtd = state.add[a.id] || 0;
      if (incluso) linhas.push({ nome: a.nome, valor: 0, incluso: true });
      else if (qtd) linhas.push({ nome: a.nome + (a.quantidade && qtd > 1 ? ` × ${qtd}` : ""), valor: a.preco * qtd });
    });
    let total = linhas.reduce((s, l) => s + l.valor, 0);
    const expresso = state.expresso ? total * C.taxaExpressa : 0;
    total += expresso;
    const desconto = total * state.desconto;
    total -= desconto;
    const plano = GG.planos.find((p) => p.id === state.plano);
    return { pacote, linhas, expresso, desconto, total, plano };
  }

  function proposta(r) {
    const L = [];
    L.push(state.cliente ? `*Proposta GG Tech — ${state.cliente}*` : "*Orçamento GG Tech*");
    L.push("");
    r.linhas.forEach((l) => L.push(`• ${l.nome}: ${l.incluso ? "incluso" : (l.aPartir ? "a partir de " : "") + brl(l.valor)}`));
    if (r.expresso) L.push(`• Entrega expressa (+${pct(C.taxaExpressa)}): ${brl(r.expresso)}`);
    if (r.desconto) L.push(`• Desconto especial (${pct(state.desconto)}): − ${brl(r.desconto)}`);
    L.push("");
    L.push(`*Investimento: ${r.pacote.aPartir ? "a partir de " : ""}${brl(r.total)}*`);
    L.push(`Entrada de ${brl(r.total * C.entrada)} + ${brl(r.total * (1 - C.entrada))} na entrega`);
    L.push(`Ou ${brl(r.total * (1 - C.descontoPix))} no Pix à vista (${pct(C.descontoPix)} off)`);
    if (r.plano.preco) L.push(`Plano mensal ${r.plano.nome}: ${brl(r.plano.preco)}/mês`);
    L.push(`Prazo: ${r.pacote.prazo}${state.expresso ? " (expresso: metade do prazo)" : ""}`);
    L.push("");
    L.push(sellerMode ? `Proposta válida por ${C.validadeDias} dias.` : "Montei pelo site e quero fechar. Podemos conversar?");
    return L.join("\n");
  }

  let lastTotal = null;
  function render() {
    const r = calc();
    GG.adicionais.forEach((a) => {
      const input = $(`input[name="add"][value="${a.id}"]`);
      const incluso = (a.inclusoEm || []).includes(r.pacote.id);
      const priceEl = $("#p-" + a.id);
      input.disabled = incluso;
      input.checked = incluso || !!state.add[a.id];
      priceEl.classList.toggle("is-in", incluso);
      priceEl.textContent = incluso ? "✓ já incluso no pacote" : `+ ${brl(a.preco)}${a.quantidade ? " cada" : ""}`;
      const q = $("#q-" + a.id);
      if (q) q.textContent = state.add[a.id] || 1;
    });

    $("#s-lines").innerHTML =
      r.linhas.map((l) => `<li><span>${esc(l.nome)}</span><span>${l.incluso ? "incluso" : brl(l.valor)}</span></li>`).join("") +
      (r.expresso ? `<li><span>Entrega expressa</span><span>+ ${brl(r.expresso)}</span></li>` : "") +
      (r.desconto ? `<li class="is-off"><span>Desconto especial</span><span>− ${brl(r.desconto)}</span></li>` : "");

    const totalEl = $("#s-total");
    totalEl.textContent = brl(r.total);
    if (lastTotal !== null && lastTotal !== r.total) {
      totalEl.classList.add("bump");
      setTimeout(() => totalEl.classList.remove("bump"), 400);
    }
    lastTotal = r.total;

    $("#s-month").textContent = (r.pacote.aPartir ? "valor inicial · " : "") + (r.plano.preco ? `+ ${brl(r.plano.preco)}/mês (${r.plano.nome})` : "sem mensalidade");
    $("#s-terms").innerHTML = `
      <li><b>${brl(r.total * C.entrada)}</b> para começar</li>
      <li><b>${brl(r.total * (1 - C.entrada))}</b> na entrega</li>
      <li>ou <b>${brl(r.total * (1 - C.descontoPix))}</b> no Pix à vista</li>
      <li>Prazo: <b>${esc(r.pacote.prazo)}</b>${state.expresso ? " · expresso" : ""}</li>`;
    $("#s-roi").textContent = `Na sua simulação (${calcState.cli} clientes × ${brl(calcState.ticket)}), este investimento se paga em ${paybackText(r.total, calcState.month)}.`;
    $("#s-valid").textContent = `Valores válidos por ${C.validadeDias} dias. Sem compromisso.`;
    $("#s-send").href = waLink(proposta(r));
    $("#s-send").textContent = sellerMode ? "Abrir no WhatsApp" : "Enviar pelo WhatsApp";
  }

  $("#orcamento").addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "pacote") state.pacote = t.value;
    else if (t.name === "plano") state.plano = t.value;
    else if (t.name === "speed") state.expresso = t.value === "1";
    else if (t.name === "add") {
      if (t.checked) state.add[t.value] = state.add[t.value] || 1;
      else delete state.add[t.value];
    } else return;
    render();
  });

  $("#orcamento").addEventListener("click", (e) => {
    const b = e.target.closest("[data-q]");
    if (!b) return;
    e.preventDefault();
    const id = b.dataset.id;
    state.add[id] = Math.min(20, Math.max(1, (state.add[id] || 1) + +b.dataset.q));
    render();
  });

  $$("[data-pick]").forEach((a) =>
    a.addEventListener("click", () => {
      state.pacote = a.dataset.pick;
      $(`input[name="pacote"][value="${state.pacote}"]`).checked = true;
      render();
    })
  );

  $("#s-copy").addEventListener("click", async () => {
    const txt = proposta(calc());
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: txt });
      document.body.append(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast("Proposta copiada ✓");
  });

  $("#c-ticket").addEventListener("input", renderCalc);
  $("#c-cli").addEventListener("input", renderCalc);
  renderCalc(); // também chama render()

  // ---------- Rodapé ----------
  const links = [
    ["WhatsApp", waLink("Olá! Vi o site da GG Tech.")],
    GG.contato.email && [GG.contato.email, "mailto:" + GG.contato.email],
    GG.contato.instagram && ["Instagram", GG.contato.instagram],
    GG.contato.github && ["GitHub", GG.contato.github],
  ].filter(Boolean);
  $("#footer-links").innerHTML = links.map(([t, h]) => `<li><a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("");
  $("#copyright").textContent = `© ${new Date().getFullYear()} GG Tech · ${GG.contato.cidade} · Atendimento em todo o Brasil`;

  // ---------- Entrada dos blocos + contadores ----------
  const targets = $$(".reveal, .section-head, .journey, .calc, .demo-pane, .live, .caps article, .process li, .promises div, .faq details");
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); setTimeout(() => (en.target.style.transitionDelay = ""), 900); } }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(el); });
    const co = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); } }));
    counters.forEach((el) => co.observe(el));
  } else counters.forEach((el) => (el.textContent = el.dataset.count));
})();
