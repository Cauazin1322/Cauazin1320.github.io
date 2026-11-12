// LOGICA DO SITE (progresso, ofensiva, janelas, quiz)
const D = [];

YEARS.forEach((y) =>
  y.c.forEach((s) => {
    const p = s.split("|");
    D.push({
      y: y.n,
      id: p[1],
      ic: p[0],
      name: p[1],
      steps: p.slice(2),
    });
  }),
);

let S = {
  done: {},
  quiz: {},
  year: 1,
  streak: {
    last: "",
    count: 0,
    best: 0,
    days: [],
  },
};

const ds = (t) => {
  const z = new Date(t);
  return (
    z.getFullYear() +
    "-" +
    String(z.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(z.getDate()).padStart(2, "0")
  );
};

const today = () => ds(Date.now());
const yest = () => ds(Date.now() - 864e5);

const sc = () => {
  const k = S.streak;
  return k.last === today() || k.last === yest() ? k.count : 0;
};

function ping() {
  const k = S.streak;
  const t = today();

  if (k.last === t) {
    return null;
  }

  k.count = k.last === yest() ? k.count + 1 : 1;
  k.last = t;
  k.best = Math.max(k.best || 0, k.count);
  k.days = (k.days || []).concat(t).slice(-60);
  save();

  return (
    "🔥 Ofensiva de " +
    k.count +
    (k.count > 1 ? " dias!" : " dia! Volte amanhã.")
  );
}

function fire() {
  const n = sc();
  const k = S.streak;
  const on = k.last === today();

  $("fire").textContent = "🔥 " + n;
  $("fire").title = "Ofensiva: " + n + " dia(s) seguidos";

  let w = "";
  for (let i = 6; i >= 0; i--) {
    const t = Date.now() - i * 864e5;
    const d = ds(t);
    const active = (k.days || []).includes(d);

    w += `<div class="dy ${active ? "on" : ""} ${i === 0 ? "td" : ""}">
      <i>${active ? "✓" : ""}</i>${"DSTQQSS"[new Date(t).getDay()]}
    </div>`;
  }

  $("streak").innerHTML = `
    <span class="big" aria-hidden="true">🔥 ${n}</span>
    <div>
      <p>
        <b>${n ? "Ofensiva de " + n + (n > 1 ? " dias" : " dia") : "Comece sua ofensiva"}</b>
      </p>
      <small>
        ${
          on
            ? "Você já estudou hoje. Volte amanhã!"
            : n
              ? "Estude hoje para não perder a sequência."
              : "Conclua uma etapa hoje para acender a chama."
        }${k.best > 1 ? " Recorde: " + k.best + " dias." : ""}
      </small>
    </div>
    <div class="days" aria-label="Últimos 7 dias">${w}</div>
  `;
}

try {
  S = Object.assign(S, JSON.parse(localStorage.getItem("trilha") || "{}"));
} catch (e) {}

const save = () => {
  try {
    localStorage.setItem("trilha", JSON.stringify(S));
  } catch (e) {}
};

const $ = (id) => document.getElementById(id);

const pr = (d) => {
  let n = 0;

  d.steps.forEach((_, i) => {
    if (S.done[d.id + ":e" + i]) {
      n++;
    }
  });

  return n / d.steps.length;
};

const yp = (y) => {
  const l = D.filter((d) => d.y === y);
  return l.reduce((a, d) => a + pr(d), 0) / l.length;
};

function toast(t) {
  const e = $("toast");
  e.textContent = t;
  e.classList.add("on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.classList.remove("on"), 1800);
}

function head() {
  const xp =
    Object.keys(S.done).length * 10 +
    Object.values(S.quiz).reduce((a, b) => a + b * 20, 0);

  $("xp").textContent = xp + " XP";

  const tot = (yp(1) + yp(2) + yp(3) + yp(4)) / 4;
  $("gbar").style.width = tot * 100 + "%";
  $("gpct").textContent = Math.round(tot * 100) + "%";
  $("dpath").setAttribute("stroke-dasharray", tot * 100 + " 100");
  fire();
}

function nodes() {
  const P = [
    [70, 170],
    [300, 70],
    [520, 170],
    [730, 70],
  ];

  $("nodes").innerHTML =
    P.map(
      (p, i) => `
        <g
          class="node ${S.year === i + 1 ? "on" : ""}"
          tabindex="0"
          role="button"
          aria-label="${i + 1}º ano, ${Math.round(yp(i + 1) * 100)}% concluído"
          data-y="${i + 1}"
        >
          <circle class="b" cx="${p[0]}" cy="${p[1]}" r="38" />
          <text class="n" x="${p[0]}" y="${p[1] + 8}">${i + 1}º</text>
          <text class="l" x="${p[0]}" y="${p[1] + 64}">${YEARS[i].t}</text>
        </g>
      `,
    ).join("") +
    `<path class="flag" d="M722 28v-28l30 10-30 10z" transform="translate(0 -4)" />`;

  document.querySelectorAll(".node").forEach((n) => {
    const go = () => {
      S.year = +n.dataset.y;
      save();
      render();
      $("tabs").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    n.onclick = go;
    n.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    };
  });
}

function render() {
  $("tabs").innerHTML = YEARS.map(
    (y) =>
      `<button class="tab" role="tab" aria-selected="${S.year === y.n}" data-y="${y.n}">${y.n}º ano</button>`,
  ).join("");

  document.querySelectorAll("#tabs .tab").forEach((b) => {
    b.onclick = () => {
      S.year = +b.dataset.y;
      save();
      render();
    };
  });

  const y = YEARS[S.year - 1];
  $("yt").textContent = y.t;
  $("yd").textContent = y.d;

  $("grid").innerHTML = D.filter((d) => d.y === S.year)
    .map(
      (d) => `
        <button class="card ${/apoio/.test(d.name) ? "ap" : ""}" data-i="${D.indexOf(d)}">
          <span class="ic" aria-hidden="true">${d.ic}</span>
          <h3>${d.name}</h3>
          <small>${d.steps.length} etapas</small>
          <div class="bar">
            <span style="width: ${pr(d) * 100}%"></span>
          </div>
          <span class="pill">${Math.round(pr(d) * 100)}% concluído</span>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll(".card").forEach((c) => {
    c.onclick = () => open(+c.dataset.i);
  });

  nodes();
  head();
}

let cur = null;
let tab = "aulas";

function open(i) {
  cur = D[i];
  tab = "aulas";
  $("dt").textContent = cur.name;
  $("dtabs").innerHTML = [
    ["aulas", "Aulas e exercícios"],
    ["quiz", "Quiz"],
  ]
    .map(
      (t) =>
        `<button class="tab" role="tab" data-t="${t[0]}" aria-selected="${t[0] === tab}">${t[1]}</button>`,
    )
    .join("");

  document.querySelectorAll("#dtabs .tab").forEach((b) => {
    b.onclick = () => {
      tab = b.dataset.t;
      document
        .querySelectorAll("#dtabs .tab")
        .forEach((x) => x.setAttribute("aria-selected", x === b));
      body();
    };
  });

  body();
  $("dlg").showModal();
}

function dbar() {
  $("dbar").style.width = pr(cur) * 100 + "%";
}

function body() {
  const c = $("dc");
  const d = cur;
  dbar();

  if (tab === "aulas") {
    c.innerHTML =
      playlistBlock(d) +
      d.steps
        .map(
          (s, i) => `
            <div class="step">
              <h3>Etapa ${i + 1}: ${s}</h3>
              ${materiaisBlock(d, i)}
              <label class="chk">
                <input
                  type="checkbox"
                  data-k="${d.id}:e${i}"
                  ${S.done[d.id + ":e" + i] ? "checked" : ""}
                >
                Concluí esta etapa
              </label>
            </div>
          `,
        )
        .join("");

    c.querySelectorAll("[data-pl]").forEach((b) => {
      b.onclick = () => {
        $("vpl").innerHTML = playerHTML(PLAYLISTS[d.id]);
        b.remove();
      };
    });
  }

  if (tab === "quiz") {
    const q = QUIZ[d.id];

    if (!q) {
      c.innerHTML = `
        <div class="step">
          O quiz desta disciplina ainda será criado. Os quizzes servem como
          diagnóstico da pesquisa.
        </div>
      `;
    } else {
      quizMenu(q);
    }
  }

  c.querySelectorAll("input[data-k]").forEach((x) => {
    x.onchange = () => {
      if (x.checked) {
        S.done[x.dataset.k] = 1;
        toast(ping() || "+10 XP");
      } else {
        delete S.done[x.dataset.k];
      }

      save();
      dbar();
      head();
      render2();
    };
  });
}

function render2() {
  document.querySelectorAll(".card").forEach((c) => {
    const d = D[+c.dataset.i];
    c.querySelector(".bar span").style.width = pr(d) * 100 + "%";
    c.querySelector(".pill").textContent =
      Math.round(pr(d) * 100) + "% concluído";
  });

  nodes();
}

// ===== Vídeos =====
function materiaisBlock(d, i) {
  const lista = (EXERCICIOS[d.id] || {})[i] || [];

  if (!lista.length) {
    return `<div class="vrow"><small>Exercícios em breve.</small></div>`;
  }

  return `
    <div class="vrow">
      ${lista
        .map((m) => {
          const href = m.arquivo || m.url;
          const tipo = /\.pdf$/i.test(href) ? "PDF" : "Link";

          return `<a class="btn o" href="${href}" target="_blank" rel="noopener">${tipo}: ${m.titulo}</a>`;
        })
        .join("")}
    </div>
  `;
}

function playlistBlock(d) {
  const p = PLAYLISTS[d.id];

  if (!p || !p.playlist) {
    return `
      <div class="step">
        <h3>📺 Playlist da disciplina</h3>
        <small>Em breve: a playlist completa vai tocar aqui, dentro do site.</small>
      </div>
    `;
  }

  return `
    <div class="step">
      <h3> Playlist da disciplina</h3>
      <div class="vrow">
        <button class="btn" data-pl="1">▶ Assistir playlist completa</button>
        ${p.canal ? `<small>Canal: ${p.canal}</small>` : ""}
      </div>
      <div id="vpl"></div>
    </div>
  `;
}

function playerHTML(v) {
  const base = "https://www.youtube-nocookie.com/embed/";
  const extra = "autoplay=1&rel=0";
  const src = v.playlist
    ? `${base}videoseries?list=${v.playlist}&${extra}`
    : `${base}${v.id}?${extra}${v.inicio ? "&start=" + v.inicio : ""}`;
  const link = v.playlist
    ? `https://www.youtube.com/playlist?list=${v.playlist}`
    : `https://www.youtube.com/watch?v=${v.id}`;

  return `
    <div class="vid">
      <iframe
        src="${src}"
        title="${v.titulo || "Videoaula"}"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <a class="vlink" href="${link}" target="_blank" rel="noopener">Abrir no YouTube</a>
  `;
}

// ===== Quiz =====
function quizMenu(q) {
  const c = $("dc");
  const d = cur;
  const opcoes = [{ key: d.id, nome: "Todas as perguntas", lista: q }];

  d.steps.forEach((s, i) => {
    const lista = q.filter((x) => x[4] === i);

    if (lista.length) {
      opcoes.push({
        key: d.id + ":" + i,
        nome: "Etapa " + (i + 1) + ": " + s,
        lista,
      });
    }
  });

  if (opcoes.length === 1) {
    quiz(q, d.id);
    return;
  }

  c.innerHTML = opcoes
    .map((o, n) => {
      const melhor =
        S.quiz[o.key] !== undefined
          ? " • melhor: " + Math.round(S.quiz[o.key] * 100) + "%"
          : "";

      return `
        <button class="opt" data-n="${n}">
          ${o.nome} <small>(${o.lista.length} perguntas${melhor})</small>
        </button>
      `;
    })
    .join("");

  c.querySelectorAll("[data-n]").forEach((b) => {
    b.onclick = () => {
      const o = opcoes[+b.dataset.n];
      quiz(o.lista, o.key);
    };
  });
}

function quiz(q, key) {
  let i = 0;
  let ok = 0;
  const c = $("dc");

  (function show() {
    if (i >= q.length) {
      S.quiz[key] = Math.max(S.quiz[key] || 0, ok / q.length);
      const m = ping();
      save();
      head();

      if (m) {
        toast(m);
      }

      c.innerHTML = `
        <div class="q">
          <h3>Você acertou ${ok} de ${q.length}</h3>
          <p>
            ${ok === q.length ? "Mandou bem! Etapa dominada." : "Revise as etapas e tente de novo."}
          </p>
          <div class="row">
            <button class="btn" id="rt">Refazer</button>
            <button class="btn o" id="vm">Voltar ao menu</button>
          </div>
        </div>
      `;
      $("rt").onclick = () => quiz(q, key);
      $("vm").onclick = () => body();
      return;
    }

    const x = q[i];
    c.innerHTML = `
      <div class="q">
        <small>Pergunta ${i + 1} de ${q.length}</small>
        <h3 style="margin-top: 6px">${x[0]}</h3>
        ${x[1].map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join("")}
      </div>
    `;

    c.querySelectorAll(".opt").forEach((b) => {
      b.onclick = () => {
        const j = +b.dataset.j;
        const opts = c.querySelectorAll(".opt");
        opts.forEach((o) => (o.disabled = true));
        opts[x[2]].classList.add("ok");

        if (j === x[2]) {
          ok++;
          toast("Correto!");
        } else {
          b.classList.add("no");
        }

        c.querySelector(".q").insertAdjacentHTML(
          "beforeend",
          `${x[3] ? `<p class="expl"><b>Por quê?</b> ${x[3]}</p>` : ""}
           <button class="btn" id="nx">${i + 1 < q.length ? "Próxima pergunta" : "Ver resultado"}</button>`,
        );
        $("nx").onclick = () => {
          i++;
          show();
        };
      };
    });
  })();
}

$("cl").onclick = () => $("dlg").close();

$("dlg").addEventListener("click", (e) => {
  if (e.target === $("dlg")) {
    $("dlg").close();
  }
});

render();
