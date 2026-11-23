# Bancada: ofirelle.com (Ofirelle, colar de cruz em aço dourado, US, USD)

Base: prints de 15/11/2026 em `auditoria/prints/`, `pesquisa/html/dados-loja.json`, `home.html`, `colecao.html`, PageSpeed mobile em `qa/`. Sem acesso à loja pela internet nesta bancada. Escala: 5 boa prática provada; 4 falha pequena; 3 falha perceptível; 2 atrapalha a compra; 1 falha grave; 0 ausente; null sem dado. Semáforo: abaixo de 2,5 ou qualquer P0 = consertar.

## Notas (régua do critério usado)

| Bloco | Nota | Base |
|---|---|---|
| marca_design | 3 | Paleta e serifa coerentes e limpas, mas o hero não mostra a peça e há blocos fracos (MAR, ver achados) |
| navegacao_busca | 3 | Busca, filtro e ordenação existem; coleções vazias no menu e na home (NAV-06, NAV-15) |
| pdp | 2,5 | Boa descrição em bullets; sem botão na primeira tela do celular, sem medidas, só 3 fotos, texto que se contradiz (PDP-01, 05, 21) |
| oferta | 1 | Preço riscado sem histórico real (OFE-05, veto) e promoção que só vive na home |
| prova_confianca | 1,5 | Políticas nativas ausentes e contato sem dados (PROV-14, PROV-12); sem avaliações é esperado numa loja de 2 dias |
| retencao_pos_compra | null | Checkout não preenchido, e-mails e rastreio sem dado (TRAVA-16) |
| mobile | 3 | Sem rolagem horizontal em todos os prints (prints.json), sem pop-up; botão de compra fora da primeira tela |
| carrinho_checkout | 2,5 | Check out dominante e PayPal; sem frete grátis progressivo, "Taxes included" errado para EUA |
| velocidade_tecnica | 3 | Nota 84 (home) e 79 (produto), mas LCP de laboratório 4.276 ms e 4.876 ms, classificado "ruim"; sem dado de campo |

## Achados

### P0

- **OFE-05 / TRAVA-02 (oferta).** US$ 69,99 riscado e selo SALE nos 10 produtos, todos criados em 13/11/2026. Prova: `dados-loja.json` (catalogo, created_at), `auditoria/prints/colecao-390x844.jpg`, faixa "Fall Sale: up to 45% off" em `home.html`. Não existe preço anterior real. Referência: Lainly usa preço direto (`pesquisa/prints/lainly.com/produto-390x844-inteira.jpg`, US$ 39,99 sem riscado como regra do brief); Hope Rings usa comparado, mas com histórico que não dá para provar aqui, então não é modelo. Correção: tirar o compare_at e a faixa "45% off" até haver 30 dias de preço real, e vender pelo kit.
- **PROV-14 (confiança, Merchant).** Reembolso, envio, termos e contato dão 404 em `/policies/*`; só a privacidade é nativa. Existem páginas curtas de 1 a 3 frases em `/pages/*-policy`. Prova: `dados-loja.json` (politicas_nativas_shopify). Referência: Maya Henry lista Terms, Shipping, Refund, Privacy e Contact no rodapé com texto próprio e dados da empresa (`pesquisa/prints/mayahenryjewelers.com/produto-390x844-inteira.jpg`, fim da página). Observação: as páginas existem, então "ausente" vale só para o formato nativo e o conteúdo curto, não para a existência de texto.

### P1

- **PROV-12 / PROV-11.** Contato com título "Contato" em português, formulário, sem e-mail, telefone, endereço nem nome de empresa no corpo. Prova: `dados-loja.json` (/pages/contact). Referência: Maya Henry mostra nome do negócio, e-mail, telefone e endereço (print acima); Hope Rings mostra e-mail e telefone (`pesquisa/prints/hoperings.com/produto-390x844-inteira.jpg`). O e-mail support@ofirelle.com existe nas páginas de reembolso e termos, só não aparece no contato.
- **PDP-01.** Na primeira tela do celular só há foto, nome, preço e "Color Gold". O botão fica depois da foto. Prova: `auditoria/prints/produto-390x844.jpg` (termina em "Color Gold"). Dados dizem que há barra fixa, mas não aparece neste print. Referência: Lainly mostra preço e "Add to cart" logo abaixo da foto (`lainly.com/produto-390x844-inteira.jpg`, topo).
- **PDP-21 / PDP-07.** Sem comprimento da corrente nem tamanho do pingente (`dados-loja.json`, produto_principal.descricao). O texto fala "choker to collarbone" sem medida. Referência: Maya Henry e Hope Rings trazem acabamento e material no topo (prints acima).
- **PDP-05.** Só 3 fotos por produto. Pelo `alt` em `home.html`, a foto 2 é "Woman wearing the gold petite puffed cross necklace", mas as fotos 2 e 3 não aparecem nos prints, então não foi possível checar escala e qualidade. Falta caixa/embalagem de presente (a loja promete "gift-ready"). Referência: Hope Rings mostra caixa com cartão e foto no pescoço (`hoperings.com/produto-390x844-inteira.jpg`).
- **CHK-03 / conformidade.** "Taxes included." na PDP e no carrinho, numa loja dos EUA onde o imposto de venda normalmente não está no preço. Prova: `auditoria/prints/carrinho-390x844.jpg`, `produto-1440x900.jpg`. Em dúvida jurídica, conferir a configuração de impostos antes de manter a frase.
- **TRAVA-12.** "Hypoallergenic", "Nickel-Free", "finished by hand" e selo "Standard" sem documento do fornecedor. Prova: `dados-loja.json` (home_texto, texto_na_ordem). Sobe a P0 se não houver laudo. Referência: Lainly e Hope Rings fazem a mesma alegação, mas isso não prova nada (não foi checado documento deles).
- **TRAVA-13 / OFE-01.** "1-YEAR WARRANTY, every piece is covered against defects": a página de reembolso diz "1-year warranty against manufacturing defects" sem condições. Falta o que a garantia cobre e como acionar. Referência: Maya Henry separa "14 Day Money Back" de "Lifetime Craftsmanship Support" com condições (print acima).
- **Contradição de cuidado.** Aba Care: "Sterling silver can darken" numa peça de aço inox (`dados-loja.json`). Texto de outro produto copiado. P1 por afetar confiança e Merchant.
- **OFE (promoção).** "BUY 3, GET 20% OFF WITH CODE OFIR20" aparece na barra de aviso e numa faixa da home. Não aparece na página do produto, nem na coleção, nem no carrinho (`produto-390x844-inteira.jpg`, `carrinho-390x844.jpg`; o carrinho diz só "Discounts calculated at checkout"). O cliente precisa lembrar e digitar o código. Referência: Maya Henry mostra tiers "Add any 2 items / 3 items" na página do produto, e Lainly mostra "Buy 2 Get 4 Free" ao lado do botão (prints acima). Nota: no print do celular a barra do topo alterna entre as duas mensagens (aviso com autoplay de 5 s).
- **NAV-06 / NAV-15 (coleções vazias).** Earrings e Bracelets têm 0 produtos (`dados-loja.json`), mas estão no menu e na home com "VIEW MORE" sem imagem (`auditoria/prints/home-390x844-inteira.jpg`, meio da página). Faith e Necklaces repetem os mesmos 4 produtos na home.
- **PROV-15.** Envio sem prazo de trânsito: "Delivery times are shown at checkout" (`dados-loja.json`). Referência: Hope Rings informa prazo na própria PDP (print acima).
- **VEL-07 / VEL-10.** A imagem do LCP no produto é um PNG de 3840x3840 (`qa/velocidade-ofirelle.com-produto-mobile.json`, lcp_elemento), com LCP de laboratório 4.876 ms e peso de página de 2.295 KB. Na home o LCP é de 4.276 ms, com atraso de carga de 1.119 ms. Resolver antes de pagar tráfego.

### P2

- **MAR (hero e bloco "Build your own set").** O hero mostra um pescoço com colar de gota, e não uma cruz. O bloco "Build your own set" é uma ilustração de duas pessoas num lago, com texto e botão de baixo contraste (`home-390x844-inteira.jpg`, 3/4 inferiores). Para onde leva: sem dado (não foi seguido o link).
- **NAV-26 / mobile.** Coleção mobile tem Filter e troca de grade, mas o menu de ordenação não aparece no print; o HTML tem `sort_by` com "Best selling" e "Price, low to high", então a ordenação existe no código. Sem dado de segunda foto ao passar o mouse.
- **PROV-06 / PROV-01.** Sem app de avaliação, sem avaliação. Esperado numa loja de 2 dias. Não importar. Preparar o espaço e pedir após a entrega. As referências mostram avaliação com nota e contagem alta (Hope Rings, Lainly, Maya Henry); não foi verificada a origem de nenhuma.
- **VEL / SEO.** A home tem `<title>` "Ofirelle" e nenhuma meta description (`home.html`). A página do produto tem as duas (`dados-loja.json`).
- **OFE-10 / OFE-11.** Carrinho sem barra de frete grátis acima de US$ 50, com produto a US$ 39,99. "You may also like" aparece, mas não conecta o limite. Referência: sem print de referência de barra de frete neste lote.
- **PROV-12 (rodapé).** No print mobile, o rodapé mostra só "© 2026 Ofirelle, Powered by Shopify" e "Terms and Policies" (`home-390x844-inteira.jpg`, fim). O HTML tem links para contato, envio e reembolso, então estão no código mas não visíveis no print.
- **Rastreamento.** Sem dado: `facebookCapiEnabled:"false"` em `home.html` não prova ausência do pixel (pode estar no web pixel). Conferir no Events Manager.

## O que a loja já faz bem

1. **Descrição do produto em bullets com benefício** (cruz, aço, corrente, fecho, camada, presente) e cuidado: `produto-390x844-inteira.jpg`.
2. **Preço, moeda e check out claros**, com botão dominante em azul marinho e PayPal visível: `carrinho-390x844.jpg`, `produto-1440x900.jpg`.
3. **Identidade consistente e legível**, `alt` descritivo nas fotos de produto e sem rolagem horizontal em nenhuma tela medida: `prints.json`, `home.html`.

## Marca conferida no print

Conferido contra `entrega/marca.json` (bate, sem divergência encontrada).

- **Fundo e texto:** fundo creme `#FBFAF7`, texto azul marinho `#1F2A44`.
- **Botão de compra (Add to cart / Check out):** fundo `#1F2A44`, texto creme `#FBFAF7`, cantos retos (raio 0), texto em caixa alta (`produto-1440x900.jpg`, `carrinho-390x844.jpg`).
- **Cabeçalho:** fundo creme, texto marinho, logo em serifa espaçada.
- **Barra de aviso:** fundo marinho, texto creme. Textos: "Fall Sale: up to 45% off + free US shipping over $50" e "Buy 3, get 20% off with code OFIR20".
- **Rodapé:** fundo creme com texto marinho (`marca.json` rodape_fundo é null); logo grande. No print mobile, só crédito e "Terms and Policies".
- **Etiqueta de promoção "SALE":** fundo dourado (ocre), texto branco, cantos retos (`colecao-390x844.jpg`). O `marca.json` traz "promocao": null, então a cor do dourado não está medida lá.
- Botão de pagamento: PayPal em amarelo (padrão do PayPal).

## Sem dado

Checkout (não preenchido), e-mails e fluxos, rastreio, pixel da Meta, Merchant Center, fotos 2 e 3 do produto, destino do "Build your own set", ordenação no celular (só no HTML), campo do PageSpeed (sem tráfego). Prints do carrinho de Maya Henry não existem; comparei só home e produto dela. Hope Rings, Lainly e Maya Henry têm print utilizável; Enroute e Sunday and Stone não foram abertos.
