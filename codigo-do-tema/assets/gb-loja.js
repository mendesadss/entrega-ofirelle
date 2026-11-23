/* Ofirelle: comportamento das seções gb-*. Sem dependências. */
(function () {
  'use strict';
  if (window.GBLoja && window.GBLoja.pronto) {
    window.GBLoja.iniciar();
    return;
  }

  var MOBILE = '(max-width: 759px)';

  /* ---------- dinheiro ---------- */
  function formatarNumero(centavos, casas, milhar, decimal) {
    var n = (centavos / 100).toFixed(casas);
    var partes = n.split('.');
    partes[0] = partes[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + milhar);
    return partes.join(decimal);
  }

  function dinheiro(centavos, formato) {
    var f = formato || '${{amount}}';
    return f.replace(/\{\{\s*(\w+)\s*\}\}/, function (_, nome) {
      switch (nome) {
        case 'amount_no_decimals': return formatarNumero(centavos, 0, ',', '.');
        case 'amount_with_comma_separator': return formatarNumero(centavos, 2, '.', ',');
        case 'amount_no_decimals_with_comma_separator': return formatarNumero(centavos, 0, '.', ',');
        case 'amount_with_apostrophe_separator': return formatarNumero(centavos, 2, "'", '.');
        case 'amount_no_decimals_with_space_separator': return formatarNumero(centavos, 0, ' ', '.');
        case 'amount_with_space_separator': return formatarNumero(centavos, 2, ' ', ',');
        case 'amount_with_period_and_space_separator': return formatarNumero(centavos, 2, ' ', '.');
        default: return formatarNumero(centavos, 2, ',', '.');
      }
    });
  }

  function formatoDe(raiz) {
    var el = raiz.closest('[data-gb-money]');
    return el ? el.getAttribute('data-gb-money') : '${{amount}}';
  }

  function lerDados(raiz) {
    var el = raiz.querySelector('script[data-gb-dados]');
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function trocar(texto, mapa) {
    var r = String(texto || '');
    Object.keys(mapa).forEach(function (k) { r = r.split('{' + k + '}').join(mapa[k]); });
    return r;
  }

  /* ---------- conta da oferta (mesma regra do Liquid) ---------- */
  function conta(precos, promo) {
    var total = 0;
    for (var i = 0; i < precos.length; i++) total += precos[i];
    var n = precos.length;
    var desc = 0;
    if (promo && promo.ativa && n >= promo.qtd) desc = Math.round(total * promo.pct / 100);
    var pagar = total - desc;
    return { total: total, desc: desc, pagar: pagar, cada: n ? Math.round(pagar / n) : 0, n: n };
  }

  /* ---------- carrinho ---------- */
  function secoesDoCarrinho() {
    var ids = [];
    document.querySelectorAll('cart-items-component[data-section-id]').forEach(function (el) {
      var id = el.getAttribute('data-section-id');
      if (id && ids.indexOf(id) === -1) ids.push(id);
    });
    return ids;
  }

  function abrirGaveta() {
    var gaveta = document.querySelector('cart-drawer-component');
    if (!gaveta) return false;
    try {
      if (typeof gaveta.open === 'function') { gaveta.open(); return true; }
      var alvo = gaveta.querySelector('theme-drawer, dialog');
      if (alvo && typeof alvo.open === 'function') { alvo.open(); return true; }
      if (alvo && typeof alvo.showModal === 'function') { alvo.showModal(); return true; }
    } catch (e) { /* cai para a página do carrinho */ }
    return false;
  }

  function atualizarSecoes(secoes) {
    if (!secoes) return;
    Object.keys(secoes).forEach(function (id) {
      try {
        var doc = new DOMParser().parseFromString(secoes[id], 'text/html');
        var novo = doc.querySelector('cart-items-component[data-section-id="' + id + '"]');
        var atual = document.querySelector('cart-items-component[data-section-id="' + id + '"]');
        if (novo && atual) atual.replaceWith(novo);
      } catch (e) { /* o tema recarrega a gaveta sozinho no próximo uso */ }
    });
  }

  function adicionar(raiz, itens) {
    var url = raiz.closest('[data-gb-cart-add]');
    var base = url ? url.getAttribute('data-gb-cart-add') : '/cart/add.js';
    var carrinho = url ? url.getAttribute('data-gb-cart-url') : '/cart';
    var secoes = secoesDoCarrinho();
    var corpo = { items: itens };
    if (secoes.length) { corpo.sections = secoes.join(','); corpo.sections_url = window.location.pathname; }
    return fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(corpo)
    }).then(function (r) {
      if (!r.ok) throw new Error('add');
      return r.json();
    }).then(function (json) {
      var itemCount = 0;
      if (json && json.items) json.items.forEach(function (i) { itemCount += i.quantity; });
      atualizarSecoes(json && json.sections);
      document.dispatchEvent(new CustomEvent('cart:update', {
        bubbles: true,
        detail: { resource: json, sourceId: 'gb-loja', data: { source: 'gb-loja', itemCount: itemCount, sections: (json && json.sections) || {} } }
      }));
      if (!abrirGaveta()) window.location.href = carrinho;
    });
  }

  function juntar(lista) {
    var mapa = {};
    var ordem = [];
    lista.forEach(function (it) {
      if (!mapa[it.id]) { mapa[it.id] = 0; ordem.push(it.id); }
      mapa[it.id] += it.quantity;
    });
    return ordem.map(function (id) { return { id: Number(id), quantity: mapa[id] }; });
  }

  function mostrarErro(raiz, texto) {
    var el = raiz.querySelector('[data-gb-erro]');
    if (!el) return;
    if (texto) el.textContent = texto;
    el.hidden = false;
  }
  function limparErro(raiz) {
    var el = raiz.querySelector('[data-gb-erro]');
    if (el) el.hidden = true;
  }

  function ocupado(botao, sim) {
    if (!botao) return;
    if (sim) { botao.setAttribute('aria-busy', 'true'); botao.disabled = true; }
    else { botao.removeAttribute('aria-busy'); botao.disabled = false; }
  }

  /* ---------- galeria e compra ---------- */
  function precosDaCompra(d, q) {
    var variante = d.variantes.filter(function (v) { return v.id === d.selecionada; })[0] || d.variantes[0];
    var principal = variante ? variante.price : 0;
    var lista = [principal];
    for (var i = 1; i < q; i++) {
      var extra = d.extras[i - 1];
      lista.push(extra ? extra.price : principal);
    }
    return lista;
  }

  function atualizarCompra(raiz) {
    var d = raiz._gb;
    if (!d) return;
    var fmt = formatoDe(raiz);
    var c = conta(precosDaCompra(d, d.qtd), d.promo);
    var t = d.textos;
    var variante = d.variantes.filter(function (v) { return v.id === d.selecionada; })[0];

    raiz.querySelectorAll('[data-gb-qty]').forEach(function (b) {
      b.setAttribute('aria-checked', Number(b.getAttribute('data-gb-qty')) === d.qtd ? 'true' : 'false');
    });

    var lista = raiz.querySelector('[data-gb-lista]');
    if (lista) {
      lista.hidden = d.qtd < 2;
      lista.querySelectorAll('li[data-gb-min]').forEach(function (li) {
        li.hidden = Number(li.getAttribute('data-gb-min')) > d.qtd;
      });
      var principal = variante ? variante.price : 0;
      lista.querySelectorAll('[data-gb-linha-preco]').forEach(function (s) { s.textContent = dinheiro(principal, fmt); });
      var linha = lista.querySelector('[data-gb-total-linha]');
      if (linha) {
        linha.textContent = '';
        var a = document.createElement('span');
        var b = document.createElement('span');
        if (c.desc > 0) {
          a.textContent = t.totalRotulo;
          var riscado = document.createElement('s');
          riscado.textContent = dinheiro(c.total, fmt);
          var forte = document.createElement('strong');
          forte.textContent = dinheiro(c.pagar, fmt);
          b.appendChild(riscado); b.appendChild(document.createTextNode(' ')); b.appendChild(forte);
          linha.appendChild(a); linha.appendChild(b);
        } else if (c.total >= d.frete) {
          a.textContent = t.freteIncluido;
          var f2 = document.createElement('strong');
          f2.textContent = dinheiro(c.pagar, fmt);
          linha.appendChild(a); linha.appendChild(f2);
        } else {
          a.textContent = t.totalRotulo;
          var f3 = document.createElement('strong');
          f3.textContent = dinheiro(c.pagar, fmt);
          linha.appendChild(a); linha.appendChild(f3);
        }
      }
    }

    var botao = raiz.querySelector('[data-gb-comprar]');
    if (botao) {
      if (variante && variante.available) {
        var rotulo = d.qtd === 1 ? t.botaoUm : trocar(t.botaoVarios, { n: d.qtd });
        botao.textContent = rotulo + ' · ' + dinheiro(c.pagar, fmt);
        botao.disabled = false;
        botao.removeAttribute('aria-disabled');
      } else {
        botao.textContent = t.botaoEsgotado;
        botao.disabled = true;
        botao.setAttribute('aria-disabled', 'true');
      }
    }

    var nota = raiz.querySelector('[data-gb-nota]');
    if (nota) {
      nota.textContent = '';
      if (c.desc > 0) {
        var em = document.createElement('span');
        em.className = 'gb-m gb-mi-inline';
        em.setAttribute('data-gb-nota-economia', '');
        em.textContent = trocar(t.notaEconomia, { economia: dinheiro(c.desc, fmt) });
        nota.appendChild(em);
        nota.appendChild(document.createTextNode(trocar(t.notaPromo, { pct: d.promo.pct, qtd: d.promo.qtd })));
      } else if (d.promo.ativa && d.qtd < d.promo.qtd) {
        nota.textContent = trocar(t.notaFaltam, { faltam: d.promo.qtd - d.qtd, pct: d.promo.pct });
      }
    }

    var preco = raiz.querySelector('[data-gb-preco-produto]');
    if (preco && variante) preco.textContent = dinheiro(variante.price, fmt);
    var nome = raiz.querySelector('[data-gb-variante-nome]');
    if (nome && variante) nome.textContent = variante.title;
    var idInput = raiz.querySelector('[data-gb-variante-id]');
    if (idInput && variante) { idInput.value = variante.id; idInput.disabled = !variante.available; }
  }

  function iniciarCompra(raiz) {
    if (raiz._gbIniciado) return;
    var d = lerDados(raiz);
    if (!d || !d.variantes) return;
    raiz._gbIniciado = true;
    raiz._gb = d;
  }

  function comprarDaSecao(raiz) {
    var d = raiz._gb;
    var itens = [];
    var lista = precosDaCompra(d, d.qtd);
    itens.push({ id: d.selecionada, quantity: 1 });
    for (var i = 1; i < lista.length; i++) {
      var extra = d.extras[i - 1];
      itens.push({ id: extra ? extra.id : d.selecionada, quantity: 1 });
    }
    return juntar(itens);
  }

  /* ---------- galeria ---------- */
  function indiceAtual(strip) {
    var itens = strip.querySelectorAll('[data-gb-item]');
    if (!itens.length) return 0;
    var largura = itens[0].getBoundingClientRect().width || 1;
    return Math.max(0, Math.min(itens.length - 1, Math.round(strip.scrollLeft / largura)));
  }

  function atualizarContador(gal) {
    var strip = gal.querySelector('[data-gb-gal-strip]');
    var cont = gal.querySelector('[data-gb-contador]');
    if (!strip || !cont) return;
    cont.textContent = trocar(cont.getAttribute('data-gb-contador'), {
      atual: indiceAtual(strip) + 1,
      total: cont.getAttribute('data-gb-total')
    });
  }

  function irParaFoto(gal, n) {
    var strip = gal.querySelector('[data-gb-gal-strip]');
    var itens = strip ? strip.querySelectorAll('[data-gb-item]') : [];
    if (!itens.length) return;
    n = Math.max(0, Math.min(itens.length - 1, n));
    if (window.matchMedia(MOBILE).matches) {
      var largura = itens[0].getBoundingClientRect().width;
      strip.scrollTo({ left: largura * n, behavior: 'smooth' });
    } else {
      itens.forEach(function (it, i) { it.classList.toggle('gb-main', i === n); });
    }
    atualizarContador(gal);
  }

  /* ---------- conjunto pronto ---------- */
  function atualizarConjunto(raiz) {
    var d = raiz._gbConj;
    if (!d) return;
    var fmt = formatoDe(raiz);
    var marcadas = [];
    raiz.querySelectorAll('[data-gb-peca]').forEach(function (b) {
      if (b.getAttribute('aria-checked') === 'true') marcadas.push(Number(b.getAttribute('data-gb-preco')));
    });
    var c = conta(marcadas, d.promo);
    var t = d.textos;
    var rotulo = raiz.querySelector('[data-gb-soma-rotulo]');
    if (rotulo) rotulo.textContent = trocar(c.n === 1 ? t.rotuloUm : t.rotuloVarios, { n: c.n });
    var riscado = raiz.querySelector('[data-gb-soma-riscado]');
    if (riscado) { riscado.hidden = c.desc === 0; riscado.textContent = dinheiro(c.total, fmt); }
    var pagar = raiz.querySelector('[data-gb-soma-pagar]');
    if (pagar) pagar.textContent = dinheiro(c.pagar, fmt);
    var nota = raiz.querySelector('[data-gb-soma-nota]');
    if (nota) {
      if (c.desc > 0) nota.textContent = trocar(t.notaPromo, { cada: dinheiro(c.cada, fmt), economia: dinheiro(c.desc, fmt) });
      else if (d.promo.ativa && c.n > 0 && c.n < d.promo.qtd) nota.textContent = trocar(t.notaFaltam, { faltam: d.promo.qtd - c.n, pct: d.promo.pct });
      else nota.textContent = '';
    }
    var botao = raiz.querySelector('[data-gb-conjunto-add]');
    if (botao) {
      var texto = c.desc > 0 ? t.botaoConjunto : (c.n === 1 ? t.botaoUm : trocar(t.botaoVarios, { n: c.n }));
      botao.textContent = texto + ' · ' + dinheiro(c.pagar, fmt);
      botao.disabled = c.n === 0;
    }
  }

  function iniciarConjunto(raiz) {
    if (raiz._gbConjIniciado) return;
    var d = lerDados(raiz);
    if (!d || !d.pecas) return;
    raiz._gbConjIniciado = true;
    raiz._gbConj = d;
  }

  /* ---------- barra fixa ---------- */
  var observador = null;
  function iniciarBarra() {
    if (observador) { observador.disconnect(); observador = null; }
    var barra = document.querySelector('[data-gb-barra]');
    var alvo = document.querySelector('[data-gb-comprar]');
    if (!barra || !alvo || !('IntersectionObserver' in window)) return;
    var botao = barra.querySelector('button');
    observador = new IntersectionObserver(function (entradas) {
      var e = entradas[entradas.length - 1];
      var passou = !e.isIntersecting && e.boundingClientRect.top < 0;
      barra.classList.toggle('gb-on', passou);
      barra.setAttribute('aria-hidden', passou ? 'false' : 'true');
      if (botao) botao.tabIndex = passou ? 0 : -1;
    });
    observador.observe(alvo);
  }

  /* ---------- fonte reserva ---------- */
  function garantirFonte() {
    if (!document.fonts || document.getElementById('gb-fonte-reserva')) return;
    var tem = false;
    document.fonts.forEach(function (f) { if (/Newsreader/i.test(f.family)) tem = true; });
    if (tem) return;
    var link = document.createElement('link');
    link.id = 'gb-fonte-reserva';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200;0,300;1,300&family=Red+Hat+Text:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  /* ---------- eventos (delegados, uma vez só) ---------- */
  function aoClicar(ev) {
    var alvo = ev.target;
    if (!alvo || !alvo.closest) return;

    var qty = alvo.closest('[data-gb-qty]');
    if (qty) {
      var raiz = qty.closest('[data-gb-secao]');
      if (raiz && raiz._gb) {
        raiz._gb.qtd = Number(qty.getAttribute('data-gb-qty'));
        atualizarCompra(raiz);
      }
      return;
    }

    var chip = alvo.closest('[data-gb-variante]');
    if (chip) {
      var r1 = chip.closest('[data-gb-secao]');
      if (r1 && r1._gb && !chip.disabled) {
        r1._gb.selecionada = Number(chip.getAttribute('data-gb-variante'));
        r1.querySelectorAll('[data-gb-variante]').forEach(function (c) {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        atualizarCompra(r1);
      }
      return;
    }

    var miniatura = alvo.closest('[data-gb-thumb]');
    if (miniatura) {
      var gal = miniatura.closest('[data-gb-galeria]');
      if (gal) irParaFoto(gal, Number(miniatura.getAttribute('data-gb-thumb')) - 1);
      return;
    }

    var passo = alvo.closest('[data-gb-passo]');
    if (passo) {
      var gal2 = passo.closest('[data-gb-galeria]');
      var strip = gal2 && gal2.querySelector('[data-gb-gal-strip]');
      if (strip) irParaFoto(gal2, indiceAtual(strip) + Number(passo.getAttribute('data-gb-passo')));
      return;
    }

    var peca = alvo.closest('[data-gb-peca]');
    if (peca) {
      peca.setAttribute('aria-checked', peca.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      var r2 = peca.closest('[data-gb-secao]');
      if (r2) atualizarConjunto(r2);
      return;
    }

    var addConjunto = alvo.closest('[data-gb-conjunto-add]');
    if (addConjunto) {
      var r3 = addConjunto.closest('[data-gb-secao]');
      var itens = [];
      r3.querySelectorAll('[data-gb-peca]').forEach(function (b) {
        if (b.getAttribute('aria-checked') === 'true') itens.push({ id: Number(b.getAttribute('data-gb-peca')), quantity: 1 });
      });
      if (!itens.length) return;
      limparErro(r3);
      ocupado(addConjunto, true);
      adicionar(r3, juntar(itens)).catch(function () {
        mostrarErro(r3, r3._gbConj && r3._gbConj.textos.erro);
      }).then(function () { ocupado(addConjunto, false); atualizarConjunto(r3); });
      return;
    }

    var addVar = alvo.closest('[data-gb-add-variante]');
    if (addVar) {
      var r4 = addVar.closest('[data-gb-secao]');
      limparErro(r4);
      ocupado(addVar, true);
      adicionar(r4, [{ id: Number(addVar.getAttribute('data-gb-add-variante')), quantity: 1 }]).then(function () {
        addVar.classList.add('gb-ok');
        setTimeout(function () { addVar.classList.remove('gb-ok'); }, 2000);
      }).catch(function () {
        mostrarErro(r4);
      }).then(function () { ocupado(addVar, false); });
      return;
    }

    var barraBt = alvo.closest('[data-gb-barra-comprar]');
    if (barraBt) {
      var principal = document.querySelector('[data-gb-comprar]');
      if (principal && !principal.disabled) principal.click();
      else if (principal) principal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function aoEnviar(ev) {
    var form = ev.target;
    if (form && form.matches && form.matches('form[data-gb-itens]')) {
      var lista;
      try { lista = JSON.parse(form.getAttribute('data-gb-itens')); } catch (e) { return; }
      ev.preventDefault();
      var bt = form.querySelector('[data-gb-add-conjunto]');
      ocupado(bt, true);
      adicionar(form, lista).then(function () {
        if (bt) {
          bt.classList.add('gb-ok');
          bt.textContent = bt.getAttribute('data-gb-texto-ok') || bt.textContent;
          setTimeout(function () { bt.classList.remove('gb-ok'); bt.textContent = bt.getAttribute('data-gb-texto') || bt.textContent; }, 2500);
        }
      }).catch(function () {
        form.submit();
      }).then(function () { ocupado(bt, false); });
      return;
    }
    if (!form || !form.matches || !form.matches('[data-gb-form-produto]')) return;
    var raiz = form.closest('[data-gb-secao]');
    if (!raiz || !raiz._gb) return;
    var botao = form.querySelector('[data-gb-comprar]');
    if (botao && botao.disabled) { ev.preventDefault(); return; }
    ev.preventDefault();
    limparErro(raiz);
    ocupado(botao, true);
    adicionar(raiz, comprarDaSecao(raiz)).catch(function () {
      mostrarErro(raiz, raiz._gb.textos.erro);
    }).then(function () { ocupado(botao, false); atualizarCompra(raiz); });
  }

  function aoRolar(ev) {
    var strip = ev.target;
    if (strip && strip.matches && strip.matches('[data-gb-gal-strip]')) {
      var gal = strip.closest('[data-gb-galeria]');
      if (gal) atualizarContador(gal);
    }
  }

  function aoTeclar(ev) {
    var strip = ev.target && ev.target.closest && ev.target.closest('[data-gb-gal-strip]');
    if (!strip || !window.matchMedia(MOBILE).matches) return;
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    var gal = strip.closest('[data-gb-galeria]');
    ev.preventDefault();
    irParaFoto(gal, indiceAtual(strip) + (ev.key === 'ArrowRight' ? 1 : -1));
  }

  function iniciar(escopo) {
    var base = escopo && escopo.querySelectorAll ? escopo : document;
    base.querySelectorAll('[data-gb-secao]').forEach(function (raiz) {
      iniciarCompra(raiz);
      iniciarConjunto(raiz);
    });
    if (base.matches && base.matches('[data-gb-secao]')) { iniciarCompra(base); iniciarConjunto(base); }
    document.querySelectorAll('[data-gb-secao]').forEach(function (raiz) {
      if (raiz._gb) atualizarCompra(raiz);
      if (raiz._gbConj) atualizarConjunto(raiz);
    });
    document.querySelectorAll('[data-gb-galeria]').forEach(atualizarContador);
    iniciarBarra();
    garantirFonte();
  }

  document.addEventListener('click', aoClicar);
  document.addEventListener('submit', aoEnviar);
  document.addEventListener('keydown', aoTeclar);
  document.addEventListener('scroll', aoRolar, true);
  document.addEventListener('shopify:section:load', function (ev) { iniciar(ev.target); });
  document.addEventListener('shopify:section:unload', function () { iniciarBarra(); });

  window.GBLoja = { pronto: true, iniciar: iniciar, dinheiro: dinheiro, conta: conta };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { iniciar(); });
  else iniciar();
})();
