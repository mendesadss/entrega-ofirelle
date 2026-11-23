# Dawn 16: migrar de outro tema e manter a loja igual

Aprendizados de uma migração real para o Dawn 16.0.0 (11/2026), conferidos contra o código publicado em https://github.com/Shopify/dawn/tree/v16.0.0. Valem para essa versão; em outra, confirme no tema instalado antes de aplicar.

## Regra da migração

Não copie arquivo, trecho nem ícone do tema de origem quando ele é de terceiros. Leve só o código próprio da loja e o conteúdo do lojista (textos, imagens, menus, cores, fontes, apps, rastreio, verificações). O resto é medido na prévia do tema antigo e reescrito no Dawn, com classes e SVG próprios.

## Ciclo de cada ajuste

1. Medir o tema antigo pela prévia (`?preview_theme_id=`): caixa, fonte, cor e espaço, em cada faixa de largura em que o layout muda.
2. Escrever no Dawn em seção, snippet e CSS próprios, sem editar o CSS base.
3. Theme Check.
4. Subir no rascunho e conferir por checksum que disco e loja estão iguais.
5. Medir de novo com o mesmo script; tolerância de 0,5 a 1 px em pelo menos 390, 700, 1000, 1440 e 1920.
6. Testar comportamento: clique, teclado, mouse, carrinho até o checkout sem pagar.
7. Olhar print dos dois temas lado a lado.

Tema publicado: backup dos arquivos como estão no ar, subir só os arquivos do ajuste, conferir checksum depois, e só com autorização para aquela subida.

## Onde o Dawn muda o resultado

**Base**
- `html` tem fonte de 10 px (`layout/theme.liquid`, `font-size: calc(var(--font-body-scale) * 62.5%)`). CSS trazido de outro tema em `rem` sai 37,5% menor: converter para px ou refazer a conta.
- Texto do corpo com 75% de opacidade (`rgba(var(--color-foreground), 0.75)` em `assets/base.css`). Outros temas usam a cor cheia.
- Margem de parágrafo, `letter-spacing` de título e altura mínima da barra de anúncio somam altura em relação ao tema antigo.
- Variável CSS que o código próprio usava e só existia no tema antigo precisa ser declarada.
- O padding do cabeçalho no editor é `range` com passo de 4 (`sections/header.liquid`); valor fora disso vai por CSS.
- `currency_code_enabled` mostra o código da moeda em todo preço.

**Animação de entrada**
- `animations_reveal_on_scroll` vem ligado por padrão (`config/settings_schema.json`). Cada `.scroll-trigger.animate--slide-in` nasce com opacidade 0,01 e `translateY(2rem)` e entra em 600 ms, com atraso de 75 ms vezes `--animation-order` (`assets/base.css`, `assets/animations.js`, `rootMargin` de -50 px).
- Está nos cartões da grade de produtos, na lista de coleções e na busca. O cartão só anima quando entra na tela, então a cada rolagem as fotos novas ficam transparentes por quase 1 s mesmo já baixadas. O lojista percebe como "imagem lenta"; LCP não mostra.
- Saídas: desligar a opção no editor, ou manter a entrada da grade e tirar a do cartão por CSS próprio dentro de `@media (prefers-reduced-motion: no-preference)` (`opacity: 1; transform: none; animation: none` no item da grade).

**Coleção e filtros**
- O nome do filtro vem como foi criado na loja (`filter.label`), no idioma em que foi cadastrado.
- `assets/facets.js` re-renderiza por seletor: `#FacetFiltersForm`, `#FacetFiltersFormMobile`, `#FacetFiltersPillsForm`, `.js-filter` com id, `.active-facets-mobile`, `.active-facets-desktop`, `.mobile-facets__open`, `.mobile-facets__count`, `.sorting`. Ao reescrever a marcação, mantenha esses elementos (escondidos, se for o caso) ou o JS quebra.
- O `MenuDrawer` (`assets/global.js`) põe clique em todo `summary` e `button` dentro dele.
- `.active-facets facet-remove:only-child { display: none }` (`assets/component-facets.css`): chip único some.
- O link do título do cartão tem `::after` que cobre o cartão inteiro (`assets/component-card.css`). Botão sobre a foto precisa de `z-index` e `pointer-events` próprios.
- `card-product` carrega as imagens com `loading="lazy"` salvo `lazy_load: false`. Para a primeira linha, sem lazy e `fetchpriority="high"` na primeira; a segunda imagem (`show_secondary_image`) não precisa existir em tela de toque.

**Carrinho**
- A seção `cart-icon-bubble` é renderizada de novo depois de cada mudança no carrinho (`assets/cart.js`, `assets/cart-drawer.js`). Ícone próprio tem de estar igual nela e no `sections/header.liquid`, senão volta o ícone padrão.
- O campo de quantidade se chama `updates[]` na gaveta e na página. No envio do formulário o Shopify aplica `updates[]` pela ordem real das linhas; se a marcação reordena as linhas, o checkout sai com quantidade trocada. Use outro nome no campo quando a quantidade já é gravada pelo JS.
- `component-cart-items.css` entra em todas as páginas (`layout/theme.liquid`): a classe `cart-item` numa página própria herda essas regras.
- `cart-drawer-items::-webkit-scrollbar` desenha uma barra que ocupa largura e pode quebrar linha.
- Fundo opaco em botão cobre borda vizinha: medida de caixa não acusa, só a pintura.

**Topo, busca e SEO**
- A busca do topo é um `details-modal` (`snippets/header-search.liquid`). `transform` nele prende o painel; posicione o `summary`.
- `sections/header.liquid` emite JSON-LD `Organization` em toda página e `WebSite` na home. `sections/main-product.liquid` emite `product | structured_data`. Compare com o que o tema antigo emitia antes de publicar e confira a regra atual do Google para cada tipo.

## Medir sem se enganar

- Tempo, animação e carregamento de imagem: navegador sem janela (Playwright), celular emulado, CPU e rede limitadas, cache desligado. Num painel de navegador embutido que esteja oculto a largura vira 0, as animações não avançam e o lazy não dispara.
- Descontar o tempo de resposta do servidor (varia de 600 a 1500 ms entre cargas) e medir um tema por vez.
- "Foto visível" = `complete`, `naturalWidth > 0` e produto das opacidades dos ancestrais ≥ 0,99, na primeira tela e a cada rolagem.
- Para congelar animação ao medir caixa: `animation-duration: 0s; animation-delay: 0s`. `animation: none` sozinho prende o item no deslocamento inicial.
- Altura de página igual não prova igualdade. Conferir caixa, fonte, cor e pintura (fundo, borda, sombra).
- A loja devolve 429 sob carga (inclusive em `/cart/add.js` e `/search`): uma requisição por vez, com pausa.
- A barra de prévia da Shopify (`#PBarNextFrameWrapper`) intercepta clique e popups aparecem em tempos diferentes: remover antes de clicar ou comparar texto. A primeira visita com `?preview_theme_id=` só grava o cookie.
- CSS novo pode ser validado antes de subir, injetado na página; Liquid só depois de subir.

## Antes de dizer que está igual

Home; cada template de produto; coleção cheia, pequena e `all`; coleção com 1 e com 2 filtros; `/collections`; busca com e sem resultado; painel de busca do topo; `/cart` cheio e vazio; gaveta cheia e vazia; ícone do topo depois de somar e remover item; contato; páginas de texto; políticas; 404; menu do computador aberto. Em cada uma: medida, pintura, print e rolagem no celular emulado. Depois de publicar: compra de teste até o checkout, conversão do dia, tags em tempo real e Merchant em 24 a 48 h.
