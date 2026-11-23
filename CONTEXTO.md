# Ofirelle: contexto completo da análise e da loja nova

Loja: ofirelle.com (Shopify, `2ffekn-xd.myshopify.com`). Análise de 15/11/2026. Este arquivo reúne a análise inteira, sem resumir. Leia tudo antes de qualquer ação.

## Índice

1. Arquivos do pacote
2. Nota e partes da loja
3. Os 5 consertos, em ordem
4. Depois dos 5 consertos
5. Perguntas para o dono
6. As 5 referências
7. Fatos da loja (conferidos)
8. A promoção real de hoje
9. A loja nova: ideia e marca
10. O desenho, seção por seção
11. A oferta
12. Fotos a trocar, com o prompt
13. O plano, M1 a M13
14. O que o dono precisa confirmar
15. Os dados brutos (pasta dados/)

## 1. Arquivos do pacote

| Arquivo ou pasta | Para que serve |
|---|---|
| `LEIA-PRIMEIRO.md` | Os 3 passos do dono, o que ele precisa ter antes e as perguntas que o agente vai fazer. |
| `INSTRUCOES-PARA-O-AGENTE.md` | O roteiro que o agente (Claude Code ou Codex) executa, do passo 0 ao link de prévia, com as regras duras no topo. |
| `CONTEXTO.md` | Este arquivo: a análise inteira e o porquê de cada mudança. |
| `codigo-do-tema/` | O código da loja nova: 22 seções `gb-*`, 3 snippets, `gb-loja.css`, `gb-loja.js` e os modelos `templates/index.ofirelle-nova.json` e `templates/product.ofirelle-nova.json`. Não troca nenhum arquivo do tema. `codigo-do-tema/LEIA.md` explica cada parte. |
| `loja-nova/` | O desenho em HTML (`home.html` e `produto.html`), para abrir no navegador com internet. Referência visual; preço, variante e estoque vêm sempre do produto real. Fotos de outras lojas que aparecem nele são só ilustração. |
| `skill-shopify-dev/` | A skill de desenvolvimento Shopify, sem a pasta `vendor/`. Instalar antes de começar (`COMO-INSTALAR.md`). |
| `relatorio/analise.html` e `1-relatorio.pdf` | O relatório da análise, para abrir no navegador ou imprimir. |
| `2-instrucoes-para-o-claude.md` | O mesmo texto do botão Copiar instruções do relatório: regras, passos, plano, oferta, fotos, o código completo e o desenho. |
| `4-fotos-novas/` | As 7 fotos novas: a referência de outra loja (só a direção), a foto real da Ofirelle para anexar e `prompts.md` com o prompt, o que não pode aparecer e o que conferir. |
| `dados/` | Os dados brutos da pesquisa (última seção deste arquivo). |

## 2. Nota e partes da loja

Loja: Ofirelle (ofirelle.com), colar de cruz em aço dourado, mercado US. Análise de 15/11/2026.

**Nota de hoje: 4,6 de 10** (cobertura da medição: 95%). Nota dos critérios observados: 45,8 de 100. Nota dos critérios observados, sempre lida junto com a cobertura. Não representa faturamento, lucro ou taxa de conversão.

A loja é limpa e fácil de ler, mas as políticas são curtas demais e o preço riscado nunca existiu.

| Parte | Como está | Por quê |
|---|---|---|
| Primeira impressão | melhorar | A marca é bonita, mas a primeira tela mostra um colar de gota e não a cruz. |
| Página do produto | melhorar | A descrição é boa, mas faltam o botão na primeira tela, as medidas e mais fotos. |
| Oferta | consertar | O preço riscado não tem preço antigo e a oferta de 3 colares só aparece na home. |
| Confiança | consertar | Faltam as políticas completas e o contato só tem formulário, sem e-mail nem endereço. |
| Celular | melhorar | Nada sai da tela, mas o botão de comprar não aparece na primeira tela. |
| Compra e velocidade | melhorar | O carrinho é claro, mas a frase de imposto está errada e as fotos pesadas atrasam a página. |

O que a loja já faz bem:

- A descrição do colar tem tópicos curtos com material, fecho, corrente extensora e cuidado.
- O preço, a moeda e o botão de finalizar compra aparecem claros no carrinho, com PayPal.
- As cores e as letras são as mesmas em todas as páginas, e nada sai da tela no celular.

## 3. Os 5 consertos, em ordem

Os textos novos estão entre aspas, na língua da loja (inglês).

### 1. Crie as políticas que faltam e um contato completo

- **Hoje:** Shipping, Returns e Terms têm só 1 a 3 frases. As políticas oficiais da Shopify estão vazias e o contato não tem e-mail.
- **Faça:** Preencha as políticas em Configurações, Políticas. Sem nome da empresa e endereço, diga ao seu Claude: ele deixa esse campo para você.
- **Por quê:** O Google e o cliente procuram essas páginas primeiro. Sem elas, o Google pode reprovar sua loja e o cliente desconfia.
- **Tempo:** médio
- **Exemplo:** mayahenryjewelers.com
- **Como, passo a passo (M1):** No Admin, em Configurações, Políticas, preencher: reembolso (30 dias, peça sem uso e na embalagem), garantia de 1 ano com condições escritas, envio (processamento de 1 a 3 dias úteis, prazo de trânsito, frete grátis acima de US$ 50), termos e informações de contato com support@ofirelle.com. Pedir ao dono o nome da empresa e o endereço. Trocar o título da página Contato por Contact e acrescentar e-mail e endereço. Conferir o menu do rodapé apontando para as políticas novas. Se o dono ainda não tem nome da empresa e endereço para publicar, deixar esse campo para ele preencher e avisar. As páginas /pages/*-policy e os links do rodapé existem hoje, com 1 a 3 frases cada: reaproveitar o texto e ampliar.
- **Pronto quando:** As quatro URLs /policies/refund-policy, shipping-policy, terms-of-service e contact-information abrem com texto, e a página Contact mostra e-mail e endereço em inglês.
- **Pede o sim do dono:** sim

### 2. Tire o preço riscado e o selo SALE

- **Hoje:** Os 10 colares mostram US$ 69,99 ou US$ 79,99 riscado, mas a loja abriu há 2 dias e esse preço nunca existiu.
- **Faça:** No Admin, em Produtos, apague o campo Compare-at price de todos os colares. Tire também a frase Fall Sale da barra do topo.
- **Por quê:** Desconto sobre um preço que nunca existiu engana a cliente e pode suspender sua conta no Google.
- **Tempo:** rápido
- **Exemplo:** lainly.com
- **Como, passo a passo (M2):** Listar os produtos com compareAtPrice preenchido e mostrar a lista ao dono. Só com o sim dele, zerar o preço comparativo das variantes (Admin, Produtos, edição em massa, ou productVariantsBulkUpdate). Depois procurar "Fall Sale" nos textos da barra de aviso e nas traduções do tema e trocar por "Free US shipping over $50". Conferir se o selo SALE some das coleções.
- **Pronto quando:** Nenhum colar mostra preço riscado nem selo SALE na coleção, no produto e no carrinho, e a barra de aviso não cita 45% off.
- **Pede o sim do dono:** sim

### 3. Mostre a oferta de 3 colares na página do produto

- **Hoje:** A oferta aparece só na barra do topo e na home e exige o código OFIR20. Produto e carrinho não mostram a economia.
- **Faça:** Faça o desconto automático. Mostre cartões de 1, 2 e 3 colares no produto e uma barra no carrinho até o frete grátis.
- **Por quê:** A cliente não precisa lembrar do código e vê quanto economiza: 3 colares saem por US$ 95,98.
- **Tempo:** médio
- **Exemplo:** lainly.com
- **Como, passo a passo (M3):** Primeiro perguntar ao dono se o código OFIR20 está ativo e se aceita trocar por desconto automático (Admin, Descontos). Na cópia do tema, procurar "Discounts calculated at checkout" e o bloco de preço do produto e acrescentar cartões de 1, 2 e 3 colares com a conta real: 1 = US$ 39,99; 2 = US$ 79,98 com frete grátis; 3 = US$ 95,98, US$ 31,99 cada, economia de US$ 23,99. No carrinho, acrescentar uma barra de progresso até US$ 50 e até o terceiro colar. Usar os blocos nativos do tema quando existirem. Com o sim do dono, criar em Descontos um desconto automático 'Buy 3, get 20% off' (20% de desconto em produtos, quantidade mínima 3, só colares; decidir com o dono se mantém o OFIR20 e se pode combinar com outros, e se o Baroque Pearl Toggle, de US$ 44,99, entra). Só depois ligar `promo_ativa` no tema; antes disso, deixar desligado e tirar do texto 'Buy 3, get 20% off'.
- **Pronto quando:** O desconto aplica sozinho no carrinho com 3 colares, o produto mostra os 3 cartões com os valores acima e o carrinho mostra a barra de progresso, e há print do carrinho com 3 colares de US$ 39,99 mostrando o total de US$ 95,98.
- **Pede o sim do dono:** sim

### 4. Arrume a primeira tela e o texto do produto

- **Hoje:** No celular a primeira tela termina em Color Gold, sem botão. Faltam as medidas, e a aba Care fala de prata.
- **Faça:** Ponha o botão de comprar na primeira tela e escreva as medidas. Troque o imposto e a aba Care pelos textos do plano (M4).
- **Por quê:** A cliente quer saber o tamanho antes de comprar. Texto de outro material faz a loja parecer descuidada.
- **Tempo:** médio
- **Exemplo:** hoperings.com
- **Como, passo a passo (M4):** Na cópia do tema, no template do produto, subir o bloco do botão de compra ou ativar o botão fixo no celular, logo abaixo do preço. Procurar "Taxes included." nos arquivos do tema e nas traduções e trocar por "Shipping calculated at checkout." depois de conferir em Configurações, Impostos se os preços incluem imposto. Procurar "Sterling silver", apagar a frase e escrever na aba Care: "Put it on after perfume and lotion. Wipe it with a soft cloth." Escrever comprimento da corrente, da extensora e tamanho do pingente com os dados do dono.
- **Pronto quando:** No celular, nome, preço e botão de comprar aparecem juntos na primeira tela, as medidas estão escritas e a busca por "Sterling silver" e "Taxes included" não acha nada.
- **Pede o sim do dono:** sim

### 5. Tire as promessas que você não pode provar

- **Hoje:** A loja diz hypoallergenic, nickel-free e finished by hand. A faixa 'covered against defects' promete mais que a política de garantia.
- **Faça:** Tire essas frases até o fornecedor mandar um documento. Troque a faixa por '1-year warranty against manufacturing defects.'
- **Por quê:** Quem compra acredita que não vai ter alergia. Se der problema, a promessa sem documento vira reclamação e reembolso.
- **Tempo:** rápido
- **Como, passo a passo (M5):** Na cópia do tema, procurar "hypoallergenic", "nickel-free" e "finished by hand" nos arquivos, nas traduções e na descrição dos produtos (Admin) e tirar. Manter só se o dono mandar o documento do fornecedor. Na política de reembolso, escrever o que a garantia cobre, o que não cobre e como pedir (e-mail com número do pedido e foto). Trocar a faixa "Every piece is covered against defects, and we will make it right" por "1-year warranty against manufacturing defects." e a faixa de rodapé "Stainless steel, nickel-free and hypoallergenic, finished by hand." por "Gold-tone stainless steel."
- **Pronto quando:** A busca pelos três termos não acha nada na loja, e a política de garantia traz as condições escritas.
- **Pede o sim do dono:** sim

## 4. Depois dos 5 consertos

- Tire Earrings e Bracelets do menu e da home até você ter produtos nessas coleções.
- Coloque uma cruz na primeira tela da home, no lugar do colar de gota.
- Faça mais fotos: colar no pescoço, na mão, na caixa de presente e o fecho de perto.
- Salve a foto principal em formato mais leve. Hoje ela tem 3840 pixels e a página demora para abrir.
- Escreva o prazo de entrega na página de envio, além do prazo de preparo.
- Mostre o colar como presente: fé, batismo e aniversário, em texto e em foto.
- Escreva um título e uma descrição para a home aparecer melhor no Google.

## 5. Perguntas para o dono

- O código OFIR20 está ativo na sua loja? Você aceita trocar por desconto automático, sem código?
- Seu fornecedor tem documento que prove hypoallergenic e nickel-free?
- Qual o comprimento da corrente, o da extensora e o tamanho do pingente?

## 6. As 5 referências

Lojas do mesmo mercado com mais de 10 mil visitas por mês. Visitas e anúncios mostram que elas investem e recebem gente, não provam quanto vendem. São exemplo, não modelo para copiar: nenhum texto, marca ou foto delas entra na loja.

### hoperings.com

- Produto comparado: https://hoperings.com/products/cross-crown-necklace
- O que faz bem: Mostra os benefícios logo abaixo do preço e a peça na caixa de presente.
- O que a loja nova pegou dela: Presente como motor de venda: caixa e cartão, benefícios com ícone antes do botão, seção para quem é
- Onde entrou: Produto: benefícios na primeira tela e seção presente; Home: ocasiões

### enroutejewelry.com

- Produto comparado: https://enroutejewelry.com/products/wild-rose-layered-cross-necklace-in-two-tone
- O que faz bem: Vende o colar de cruz em camadas, em dois tons, na mesma página.
- O que a loja nova pegou dela: Conjunto dentro do bloco de compra com a economia escrita; Complete the look com total
- Onde entrou: Produto: lista do conjunto sob os cartões e combine-com

### lainly.com

- Produto comparado: https://lainly.com/products/birthstone-cross-necklace
- O que faz bem: Mostra o preço direto e os cartões de quantidade ao lado do botão de comprar.
- O que a loja nova pegou dela: Cartões de quantidade no bloco de compra, desconto sem código, colagem de 3 fotos que explica a oferta
- Onde entrou: Produto: cartões 1, 2, 3; Home: como-funciona

### sundayandstone.com

- Produto comparado: https://sundayandstone.com/products/cross-enamel-necklace
- O que faz bem: Vende um colar de cruz com esmalte, parecido com o seu Enamel Cross.
- O que a loja nova pegou dela: Peso leve e ritmo de espaço, 3 benefícios curtos sob o preço, significado em uma frase; a tipografia, as cores e o botão continuam os da Ofirelle
- Onde entrou: Espaçamento e seção ophir

### mayahenryjewelers.com

- Produto comparado: https://mayahenryjewelers.com/products/bezel-cross-necklace-white-gold
- O que faz bem: Publica nome da empresa, e-mail, telefone e endereço no fim da página.
- O que a loja nova pegou dela: Faixas de desconto escritas por extenso; promessa e história em texto simples
- Onde entrou: Gaveta do carrinho com a conta; Home: promessa

### Análise de mercado completa

Base: prints de 15/11/2026 (celular 390 e computador 1440), coletas `pesquisa/coleta-<dominio>.json`, visitas Similarweb de out/2026 e anúncios ativos na Meta em 15/11/2026. Tráfego e anúncio mostram investimento, não provam venda. Todas as 5 primeiras telas são a loja de verdade (sem bloqueio). A Maya & Henry's mostrou "Free delivery to Brazil" por geolocalização; a Lainly mostrou "Fast BR Shipping" pelo mesmo motivo. O print 1440 inteiro da Lainly saiu com 900 px (só a primeira tela); para ela vale o celular. O print 1440 inteiro do hero da Sunday & Stone saiu com a foto quebrada.

#### 1. Oferta

| | Hope Rings | En Route | Lainly | Sunday & Stone | Maya & Henry's |
|---|---|---|---|---|---|
| Visitas / anúncios | 450.552 / 2.738 | 1.018.242 / 912 | 87.733 / 800 | 43.983 / 81 | 515.931 / 271 |
| Preço do produto | US$ 39,99 | US$ 29,90 | US$ 39,99 | US$ 49,99 | US$ 34,95 |
| Preço riscado | US$ 79,98, "50% OFF" | US$ 46, "-35%" | US$ 239,94 no Buy 2 | US$ 59,99, "SAVE" | US$ 175, "SAVE 80%" |
| Desconto por quantidade | "Extra savings on 2+ items" (sem número na página) | não | Buy 1 Get 2 Free; Buy 2 Get 4 Free US$ 79,98 | não | 2 peças 20%, 3 peças 25%, 4 peças 30% |
| Leve mais pague menos aplicado sozinho | não informado | não | sim, "No code needed" | não | sim, no carrinho |
| Kit / conjunto | não | "Necklace Set" US$ 71,50 no seletor; "Complete the look" com total | 3 peças, a cliente escolhe | não | interruptor de peça extra (Love letter initial) |
| Brinde | caixa e cartão de mensagem | brinde por faixa: US$ 80, 120, 200, 300 | não | pulseira de cruz grátis na compra | não |
| Frete grátis e limite | 4 a 10 dias, grátis | acima de US$ 40 | não lido (geolocalizado) | acima de US$ 75 | todos os pedidos |
| Garantia | 90 dias dinheiro de volta; 1 ano | 30 dias devolução; 100 dias garantia | vitalícia | 30 dias; vitalícia | 14 dias; suporte vitalício |
| Parcelamento | não visto | não visto | não visto | Shop Pay | não visto |
| Prova social | 12.296 avaliações, Loox, "30,000+ happy customers" | 5,0 com 7 avaliações, "As seen on" | 15.356 avaliações, "100,000+ Christian women" | 4,9 com 127 e 257 avaliações, Loox | 4,8 com 823, Trustpilot |
| Urgência | "Limited stock", faixa de flash sale | "Selling fast" | contagem regressiva, "Only 8 left" | "Low inventory" | "Up to 80% off" |
| Personalização | cartão com frase | não | pedra do mês | cor do esmalte | inicial |

Leitura: quatro das cinco vendem com preço riscado inflado e urgência. A Ofirelle não pode (catálogo aberto há 2 dias, sem preço anterior real, sem avaliação). O espaço que sobra é a oferta de quantidade honesta (Lainly e Maya provam que "leve 3" com desconto automático é o padrão do segmento) e o presente (Hope Rings construiu a página inteira em cima da caixa e do cartão).

#### 2. O melhor de cada uma

##### Layout
- **Hope Rings:** primeira foto do produto é a caixa de presente aberta com o colar; abaixo do preço, 4 benefícios curtos com ícone antes do botão; abas Details, Shipping, Warranty; seção "Who is this necklace perfect for?".
- **En Route:** seletor "Necklace only / Necklace set" com a economia ao lado, dentro do bloco de compra; "Complete the look" em lista com caixa de marcar e total; fileira "Styled as" com fotos no corpo; tipografia preto e branco limpa.
- **Lainly:** cartões de quantidade dentro do bloco de compra (o primeiro selecionado, os outros com a conta); colagem de 3 fotos "yours, free, free" que explica a oferta sem texto; perguntas longas que respondem a objeção real (tamanho da corrente, água, pele).
- **Sunday & Stone:** a mais sofisticada: serifa fina em itálico, rótulo pequeno espaçado, 3 linhas de benefício com check logo abaixo do preço, seletor de cor em botões retos, 3 selos minúsculos sob o botão, bloco "The meaning" com versículo, "Built to be passed down" em 2x2.
- **Maya & Henry's:** caixa "Extra discount when you buy more" com as faixas escritas por extenso; história da família com foto real da loja física.

##### Percepção de valor
- Caixa de presente e cartão de mensagem na primeira foto (Hope Rings) fazem US$ 40 parecer presente pronto, não bijuteria.
- Peça na mão e no colo, com luz quente e tecido (Lainly, Sunday & Stone) mostram escala e afeto melhor que o fundo branco.
- Significado em uma frase curta, sem sermão (Sunday & Stone: "His love, close to your heart").
- Conta escrita e visível ("Add 3 pieces, get 25% off") convence mais que o código digitado (Maya, Lainly).

##### Primeira tela do produto no celular
| Loja | O que cabe antes de rolar |
|---|---|
| Hope Rings | foto quadrada, miniaturas, estrelas, nome, preço riscado, 4 benefícios com ícone; o botão fica em 1.030 px (fora da primeira tela) |
| En Route | foto alta ocupa a tela inteira; nome e preço só depois de rolar |
| Lainly | foto, miniaturas, nome, faixa de promoção e o primeiro cartão de quantidade; botão abaixo da dobra, com barra fixa "Claim offer" |
| Sunday & Stone | foto, nome, subtítulo, preço, 3 checks; botão em 900 px |
| Maya & Henry's | foto, miniaturas, nome, preço, 3 benefícios; barra fixa com botão |

Nenhuma põe nome, preço, benefícios, seletor e botão juntos na primeira tela sem barra fixa. A Ofirelle pode: foto em 390x340, bloco enxuto.

#### 3. Linguagem visual do segmento
- Duas famílias: a de volume (Hope Rings, Lainly, Maya), com vermelho ou amarelo forte, botão arredondado, contagem e selo de desconto; e a de marca (Sunday & Stone, En Route), com fundo creme ou branco, serifa, rótulo espaçado, botão reto e foto editorial.
- Cenas que se repetem: pescoço recortado do queixo ao busto, cetim champanhe, caixa aberta com cartão, mão segurando o pingente, Bíblia e vela, mãe e filha.
- A Ofirelle já tem a identidade da família de marca (creme, azul-marinho, Newsreader fina, botão reto). Falta foto com gente, mão e caixa; e falta tirar o selo SALE dourado que a puxa para a família de volume.

#### 4. Altura no celular (390 px, `sips -g pixelHeight` nos `-inteira.jpg`)

| Loja | Produto | Home |
|---|---|---|
| Hope Rings | 6.352 | 7.764 |
| En Route | 5.385 | 7.326 |
| Lainly | 7.389 | 7.009 |
| Sunday & Stone | 10.610 | 4.510 |
| Maya & Henry's | 6.838 | 4.854 |
| **Mediana** | **6.838** | **7.009** |
| Mínimo para a Ofirelle (80%) | 5.470 | 5.607 |
| Ofirelle hoje | 3.305 | 4.265 |

No computador (1440): produto 4.741 a 7.314 (En Route 4.741, Hope 4.833, Maya 5.888, Sunday 7.314); home 4.653 a 7.734.

## 7. Fatos da loja (conferidos)

Só estes fatos podem ser afirmados na loja. O que não está aqui, não se afirma.

### Empresa e marca
- Nome: Ofirelle. Domínio ofirelle.com. Mercado EUA, inglês, USD.
- História (página Our Story): Ophir era a terra lendária do ouro na Bíblia, de onde os navios do rei Salomão traziam ouro e pedras preciosas. Ofirelle carrega o nome como promessa: joia que parece preciosa, feita para usar todo dia e dar com amor.
- Contato: só e-mail support@ofirelle.com (citado nas páginas de política). Sem telefone, sem endereço, sem razão social publicada. **Preencher com o dono.**
- Marca (tema Atelier 4.4.0): fundo #FBFAF7 (creme), texto e botão #1F2A44 (azul-marinho), texto do botão #FBFAF7. Títulos em Newsreader (serifa, peso 200), texto em Red Hat Text. Botão reto (raio 0), caixa alta. Logo: https://ofirelle.com/cdn/shop/files/ofirelle-logo.png (256 px).

### Catálogo (10 produtos, todos colares, criados em 13/11/2026, 1 variante Gold, 3 fotos cada)
| handle | nome | preço |
|---|---|---|
| petite-puffed-cross-necklace | Petite Puffed Cross Necklace (PRINCIPAL) | 39.99 |
| asymmetric-cross-necklace | Asymmetric Double Cross Necklace | 39.99 |
| enamel-cross-pendant-necklace | Enamel Cross Medallion Necklace | 39.99 |
| double-cross-necklace | Double Cross Necklace | 39.99 |
| sideways-cross-crystal-necklace | Sideways Cross Necklace with Crystal | 39.99 |
| sideways-cross-pearl-necklace | Sideways Cross Pearl Necklace | 39.99 |
| infinity-cross-necklace | Infinity Cross Necklace | 39.99 |
| layered-cross-crystal-necklace | Layered Cross Necklace with Crystal | 39.99 |
| dove-cross-necklace | Dove Cross Necklace | 39.99 |
| baroque-pearl-toggle-necklace | Baroque Pearl Toggle Necklace | 44.99 |
- Hoje todos têm preço comparado (69,99 e 79,99) e selo SALE. A loja abriu o catálogo há 2 dias: **não existe preço anterior real**. Na loja nova: sem preço riscado e sem SALE.
- Coleções: faith (9), necklaces (10). Earrings e Bracelets existem com 0 produtos.

### Produto principal (texto da loja)
- "A small, softly rounded gold cross that sits right at the base of your neck." Pingente cruz bojuda (puffed) maciça, bordas arredondadas.
- Gold-tone stainless steel (aço inox com tom dourado). Corrente cable fina. Fecho lagosta com corrente extensora (ajusta de gargantilha a clavícula).
- Comprimento da corrente, tamanho do pingente e peso: **não informados. Preencher com o dono.**
- "Gift-ready" e "30-day returns". Cuidado: colocar depois de perfume e loção, limpar com pano macio.
- A aba Care de hoje fala de "sterling silver can darken": errado para peça de aço. Não repetir.

### Promessas que a loja faz (status)
- Frete grátis nos EUA acima de US$ 50; processamento 1 a 3 dias úteis; rastreio por e-mail; prazo de entrega mostrado no checkout. (página shipping-policy)
- Devolução em 30 dias para reembolso ou troca, peça sem uso e na embalagem original. (página refund-policy)
- Garantia de 1 ano contra defeito de fabricação. (página refund-policy)
- "Nickel-free", "hypoallergenic", "finished by hand": a loja afirma, mas não há documento. **Não usar na loja nova sem o dono confirmar com o fornecedor** (afirmação de saúde e de material).
- Promoção real hoje: "BUY 3, GET 20% OFF WITH CODE OFIR20" (código digitado no checkout). Não testado no checkout (não se finaliza compra). **Confirmar com o dono se o código está ativo.**

### Prova social
- Nenhuma avaliação, nenhum app de avaliação. Loja nova: espaço reservado e vazio.

### Aritmética da oferta (preços reais)
- 1 peça: US$ 39,99 (abaixo do frete grátis de US$ 50).
- 2 peças: US$ 79,98, já com frete grátis.
- 3 peças com 20%: 3 x 39,99 = 119,97; menos 20% = US$ 95,98 (US$ 31,99 por peça; economia US$ 23,99).

## 8. A promoção real de hoje

Hoje a loja anuncia "Buy 3, get 20% off with code OFIR20" na barra de aviso (que alterna entre duas mensagens e aparece em todas as páginas) e numa faixa da home. A cliente precisa digitar o código no finalizar compra. A oferta não está no bloco de compra nem no corpo do carrinho. **O código não foi testado no finalizar compra** (não se finaliza compra em loja de cliente): confirmar com o dono se o OFIR20 está ativo.

A conta da proposta, com os preços reais:

| Colares de US$ 39,99 | Soma | Com 20% | Por peça |
|---|---|---|---|
| 1 | US$ 39,99 | sem desconto | US$ 39,99 |
| 2 | US$ 79,98 | sem desconto, com frete grátis (acima de US$ 50) | US$ 39,99 |
| 3 | US$ 119,97 | US$ 95,98 (economia de US$ 23,99) | cerca de US$ 31,99 |

O Baroque Pearl Toggle custa US$ 44,99: três colares com ele não dão US$ 95,98. O desconto de 3 peças é proposta. A loja nova nasce com a caixa `promo_ativa` desligada e só liga depois que o dono criar o desconto automático (M3) e provar no carrinho o total de US$ 95,98.

## 9. A loja nova: ideia e marca

A loja do presente de fé: a cruz pequena e dourada para usar todo dia e dar com amor, vendida em conjunto de 3 com a conta à vista.

- **Posicionamento:** Joia de fé delicada para usar todo dia e para dar de presente, com o nome de Ophir, a terra do ouro da Bíblia
- **Personalidade:** serena,cuidadosa,precisa,fé discreta
- **Tom:** undefined
- **Frase da marca:** Small gold crosses, made to be worn every day and given with love.
- **Paleta:** {"cream":"#FBFAF7","linen":"#F3EFE7","navy":"#1F2A44","muted":"#5B6170","gold":"#B08D57","gold-text":"#7A5E2E","gold-light":"#C9A86A","line":"#E4DED2"}
- **Tipos:** {"titulos":"Newsreader 300 (200 no hero)","texto":"Red Hat Text 400 e 500"}
- **Forma:** raio 0, borda 1 px, sem sombra
- **Foto:** luz natural lateral e quente, fundo creme e cetim, três distâncias: pescoço, mão, perto

**Acima das referências?** 

**Julgamento visual às cegas:**  

### Marca v3

#### Posicionamento
Joia de fé delicada para usar todo dia e para dar de presente: a cruz pequena e dourada que parece preciosa, com o nome de Ophir, a terra do ouro da Bíblia.

Em inglês (uso interno e base de copy): **"Small gold crosses, made to be worn every day and given with love."**

#### Personalidade
- **Serena:** fala baixo, nunca grita desconto. Sem contagem, sem caixa alta em frase longa.
- **Cuidadosa:** pensa em quem vai ganhar o colar (afilhada, mãe, amiga) tanto quanto em quem compra.
- **Precisa:** diz o material como é (gold-tone stainless steel), a conta do conjunto como é, o prazo como é.
- **Fé discreta:** a cruz fala por si. Uma referência bíblica por página, no máximo, e sempre curta.

#### Tom em inglês
Frases curtas, verbo no presente, segunda pessoa ("you", "her"). Nada de "elevate", "timeless" sozinho, "must-have", exclamação ou emoji. Benefício em até 6 palavras.

Títulos de exemplo:
1. "A small cross, close to your heart."
2. "Three crosses. One for you, two to give."
3. "Named after the land of gold."
4. "Wear it close. Or let it fall."
5. "For her baptism, her wedding, her every day."

#### Direção de arte
- **Luz:** natural, lateral e quente, como luz de janela no fim da tarde. Sombra suave, nunca flash. O dourado tem de brilhar sem estourar.
- **Contraste:** baixo no fundo (creme, linho, cetim champanhe), alto só na peça. O texto em azul-marinho sobre creme dá o contraste da página.
- **Enquadramento:** três distâncias, sempre nesta ordem de importância: no pescoço (queixo ao busto, para escala), na mão (pingente entre os dedos, para afeto e tamanho real) e de perto (pingente e fecho em macro). Rosto inteiro só no hero, de perfil ou olhando para baixo.
- **Paleta da foto:** creme, bege, linho cru, branco quebrado, pele quente. Sem cor saturada atrás da peça.
- **Paleta da página:** creme #FBFAF7 de fundo, linho #F3EFE7 em faixa alternada, azul-marinho #1F2A44 em texto e botão, dourado #B08D57 só em fio, ícone e número grande, dourado escuro #7A5E2E em texto pequeno, dourado claro #C9A86A sobre o azul-marinho.
- **Tipo:** Newsreader peso 300 nos títulos (fina, com itálico para uma palavra de ênfase), Red Hat Text 400 e 500 no texto, botão em caixa alta espaçada.
- **Forma:** raio 0, bordas de 1 px, sem sombra, muito respiro, foto grande.

## 10. O desenho, seção por seção

Ordem das seções:

- Home: hero | mais-vendidos | ocasioes | como-funciona | camadas-prontas | todo-dia | ophir | promessa | perguntas | cadastro
- Produto: galeria-compra | beneficios | no-pescoco | detalhe | medida | conjunto | presente | ophir | selos | cuidados | perguntas | avaliacoes | combine-com

No código, cada seção vira um arquivo `sections/gb-<nome>.liquid` (a `mais-vendidos` do desenho é a seção de peças em destaque, arquivo `gb-mais-vendidos.liquid`). A especificação completa do desenho vem a seguir, sem cortes.

Kit obrigatório: `entrega/design/kit/KIT.md` (tokens, `<helmet>`, ícones, componentes). Fotos: número `n` = `mapa-fotos.json`; `ref:<cena>-<n>` = `mapa-ref.json` pelo arquivo `ref-<cena>-<n>.jpg` (o `n` sozinho repete entre cenas). O endereço `/_blob/` de cada foto está na tabela do fim. Cada seção abre com `<!-- secao: nome -->`.

Altura mínima no celular (80% da mediana das referências): Produto 5.470 px, Home 5.607 px. Texto visível: Produto até 600 palavras fora das abas fechadas, Home até 400.

Proibido na loja: estrela, nota, número de cliente, depoimento, SALE, preço riscado (exceto `$119.97` ao lado de `$95.98`), contador, estoque, "nickel-free", "hypoallergenic", "handmade", "18k", "solid gold", "waterproof", prazo chamado de rápido.

---

### Partes comuns

#### Barra de aviso
KIT 4.1. Computador: "Buy 3 necklaces, get 20% off. No code needed" | "Free US shipping over $50". Celular: só a primeira frase. Sem rotação, sem seta.

#### Cabeçalho e menu
KIT 4.2. Menu: Necklaces · Cross Necklaces · Gifts · Our Story. Earrings e Bracelets fora (coleções vazias). Celular: gaveta pela esquerda, fundo `cream`, itens em Newsreader 300 26 px com fio entre eles; "Gifts" abre a lista de ocasiões (Baptism and First Communion, Confirmation, For Mom, Christmas, Birthday, For a Godmother); no pé da gaveta, link "Build your faith set" e o e-mail.

#### Estrutura da loja
| Item | Tipo | Conteúdo |
|---|---|---|
| Necklaces | coleção existente `necklaces` | os 10 colares |
| Cross Necklaces | coleção existente `faith`, renomeada | 9 cruzes |
| Gifts | coleção nova, filtro por etiqueta de ocasião | os 10, com etiquetas `baptism`, `communion`, `confirmation`, `mom`, `christmas`, `birthday`, `godmother` |
| Our Story | página existente | Ophir, texto da loja |
| FAQ | página nova | as perguntas da home e do produto |
| Shipping, Returns and warranty, Contact | páginas e políticas existentes | sem mudança de regra |
| Earrings, Bracelets | ocultas | voltam quando tiverem produto |

#### Rodapé
KIT 4.10 (Shop, Help, Write to us). Sem cadastro no rodapé; sem telefone, endereço e razão social até o dono informar.

#### Gaveta do carrinho
- Largura 440 (computador), tela inteira (celular). Fundo `cream`, título "Your bag (n)" em Newsreader 300 24 px, botão fechar 44x44.
- **Barra de progresso** (logo abaixo do título, 4 px, trilho `line`, preenchimento `gold`) com dois marcos: "$50" (frete) e "3 necklaces" (20%). Frase acima da barra, 14 px:
  - 1 colar ($39.99): "You're $10.01 away from free US shipping. Add 2 more necklaces for 20% off."
  - 2 colares ($79.98): "Free US shipping unlocked. Add 1 more necklace for 20% off."
  - 3 ou mais: "Your faith set is complete. 20% off applied."
- Itens: foto 72x90, nome, "Gold", preço, quantidade com − e + (44 px), "Remove".
- Linha de desconto quando houver 3: "Faith set, 20% off" à esquerda, "−$23.99" à direita em `gold-text`.
- Com 1 ou 2 colares: bloco "Complete your set" com 2 cartões pequenos (foto 13 e 19) e botão "Add" de contorno.
- Rodapé da gaveta: "Subtotal" e valor; small "Shipping and taxes calculated at checkout."; botão principal "Checkout"; selo cadeado + "Secure checkout" em 12 px.
- Na prancha de computador, desenhar a gaveta aberta ao lado da página do produto (estado 3 colares) ou como bloco separado no fim da prancha do produto.

#### Barra fixa de compra (produto, celular)
Aparece depois que o botão principal sai da tela: 72 px, fundo `cream`, fio superior `line`, foto 2 em 48x60, nome em 14 px, "$39.99", botão "Add to bag" 44 px de altura e 140 de largura.

---

### PRODUTO: Petite Puffed Cross Necklace (13 seções)

#### 1. `galeria-compra`
- **Objetivo:** em uma tela, o que é, quanto custa e o botão, com o conjunto de 3 junto do botão.
- **Breadcrumb (só computador, small `muted`):** "Cross Necklaces / Petite Puffed Cross Necklace"
- **h1:** "Petite Puffed Cross Necklace"
- **Preço:** "$39.99" (KIT `price`), na linha de baixo do h1.
- **Linha de material (small `muted`):** "Gold-tone stainless steel · Lobster clasp with extender"
- **Benefícios (3, ícone 20 px `navy`, 14 px, vão 6):** coração "Sits at the base of your neck" · caminhão "Free US shipping over $50" · presente "Gift-ready, 30-day returns"
- **Acabamento:** rótulo "Finish: Gold" (label); um botão quadrado 36x36 com bolinha de 22 px `#C9A86A`, borda 1.5 px `navy` (selecionado).
- **Conjunto:** rótulo "Build your faith set" (label `gold-text`) e KIT 4.7, cartão de 3 selecionado. No computador, a lista de 3 peças (Petite Puffed n 1, Sideways Cross with Crystal n 13, Infinity Cross n 19) e a linha de total aparecem abaixo dos cartões; no celular, a lista vai para depois do botão (para o botão ficar na primeira tela).
- **Botão:** "Add 3 necklaces · $95.98" (estado 3); "Add 2 necklaces · $79.98"; "Add to bag · $39.99".
- **Abaixo do botão (small `muted`, centralizado):** "20% off applied in your bag. No code needed."
- **Selos compactos:** KIT 4.6 compacta 2x2 (Free US shipping over $50 · 30-day returns · 1-year warranty · Gift-ready).
- **Abas fechadas (KIT 4.8, só no computador, na coluna de compra):** "Details" (texto: "A small, softly rounded gold cross that sits right at the base of your neck. A solid puffed shape with smooth edges, on a fine cable chain with a lobster clasp and extender."), "Shipping and returns", "Care". No celular essas abas ficam na seção 11.
- **Fotos:** galeria nesta ordem: 2 (principal, no pescoço), 3 (macro no cetim), 1 (packshot), ref:maos-039 (mão no peito segurando a cruz), ref:macro-004 (fecho lagosta e extensor).
- **Computador:** grade de 12 colunas, padding 40 em cima. Galeria nas colunas 1 a 7 (741 px): foto 2 em 741x926 (4:5, `object-position:50% 40%`); abaixo, grade 2x2 com vão 12: 3, 1, ref:maos-039, ref:macro-004 (364x455, 4:5). Coluna de compra nas colunas 8 a 12 com `padding-left:48px`, alinhada ao topo; h1 40 px.
- **Celular (contas da primeira tela, 844 px):** barra 36 + cabeçalho 56; foto 2 em 390x288 (`object-position:50% 45%`) com contador "1 / 5" em 12 px no canto inferior direito sobre etiqueta `cream`; padding 16 20; h1 26 px (até 2 linhas, 60); preço 18 px (30); material 13 px (22); benefícios (72); acabamento em uma linha, rótulo à esquerda e botão 36 à direita (48); cartões do conjunto 3x112 com 76 de altura (88); botão 52. O botão termina em cerca de 780 px. Depois do botão: frase small, lista das 3 peças e selos 2x2.
- **Interativo:** cartões trocam o texto do botão e a lista; "Change" em cada peça extra abre a coleção Cross Necklaces filtrada até $39.99; miniaturas trocam a foto principal; rolagem lateral da galeria no celular.

#### 2. `beneficios`
- **Objetivo:** dizer em 3 linhas por que essa cruz e não outra.
- **Rótulo:** "Made for every day" · **Título:** "Small, soft, and easy to wear."
- **Itens (ícone 24 px `gold`, h3 21 px, texto small):** cruz "A softly rounded cross" / "A solid puffed shape with smooth edges that catch the light." · régua "Choker to collarbone" / "The extender chain lets you choose where it sits." · coração "Easy to layer" / "Wear it alone or layered with other necklaces."
- **Fotos:** nenhuma.
- **Computador:** fundo `cream`, fios `line` em cima e embaixo, padding 72; título à esquerda (colunas 1 a 4), 3 itens nas colunas 5 a 12 em 3 colunas.
- **Celular:** padding 48 20; título; itens empilhados, fio entre eles.

#### 3. `no-pescoco`
- **Objetivo:** mostrar a escala real no corpo e na mão.
- **Rótulo:** "On the neck" · **Título:** "Close to your heart." · **Texto:** "It sits right at the base of your neck, small enough to wear with everything you own."
- **Fotos:** 2 (4:5, `object-position:50% 40%`) e ref:maos-039 (4:5).
- **Computador:** fundo `linen`, padding 96. Foto 2 nas colunas 1 a 6 (628x785); ref:maos-039 nas colunas 7 a 9 (302x378), alinhada embaixo; texto nas colunas 10 a 12, alinhado embaixo.
- **Celular:** fundo `linen`, foto 2 de ponta a ponta 390x460; texto com padding 32 20; ref:maos-039 em 350x438 abaixo do texto.

#### 4. `detalhe`
- **Objetivo:** mostrar o volume do pingente e o fecho de perto.
- **Rótulo:** "Up close" · **Título:** "Rounded, so it catches the light." · **Texto:** "A puffed cross with smooth edges on a fine cable chain. It closes with a lobster clasp and an extender."
- **Fotos:** 3 (macro no cetim, 1:1) e ref:macro-004 (fecho, 1:1).
- **Computador:** fundo `cream`, padding 96; texto nas colunas 1 a 4 (centro vertical); fotos 3 e ref:macro-004 nas colunas 5 a 12, lado a lado, 520x520 cada, vão 24. Legenda small `muted` sob cada uma: "The pendant" e "Lobster clasp and extender".
- **Celular:** texto; fotos empilhadas 350x350 com legenda.

#### 5. `medida`
- **Objetivo:** tirar a dúvida de onde a cruz fica, com desenho.
- **Rótulo:** "Size" · **Título:** "From choker to collarbone." · **Texto:** "The extender chain lets you choose where it sits."
- **Lista (small, fio entre linhas):** "Pendant: petite puffed cross" · "Chain: fine cable chain" · "Clasp: lobster, with extender chain"
- **Desenho (`<svg>` inline, traço 1.25, sem preenchimento):** linha única de pescoço e ombros em `gold` 1 px; duas curvas de colar: a curta, sólida `navy` 1.5 px, rente à base do pescoço, com cruz pequena (pingente de 10 px); a longa, tracejada `gold` 1.5 px, perto da clavícula. Rótulos com fio guia: "Choker, extender closed" e "Collarbone, extender open". Sem número de polegada até o dono confirmar.
- **Fotos:** nenhuma.
- **Computador:** fundo `linen`, padding 96; desenho nas colunas 1 a 6 (628x440); texto e lista nas colunas 8 a 12.
- **Celular:** fundo `linen`; desenho 350x260; texto e lista abaixo.

#### 6. `conjunto`
- **Objetivo:** vender 3 colares com a conta à vista e um conjunto pronto.
- **Rótulo:** "Build your faith set" · **Título:** "Three crosses. One for you, *two to give.*" · **Texto:** "Add 3 necklaces and 20% comes off in your bag. Here is the set we would start with."
- **Conjunto "The Everyday Grace Set":** Petite Puffed Cross Necklace (n 1) $39.99 · Sideways Cross Necklace with Crystal (n 13) $39.99 · Infinity Cross Necklace (n 19) $39.99. Linha de total: "3 necklaces" `<s>$119.97</s>` "$95.98" e, em `gold-text`, "about $31.99 each, you save $23.99".
- **Botão:** "Add the set · $95.98". Link de texto: "Choose your own 3".
- **Fotos:** ref:camadas-145 (duas correntes no colo, 4:5) grande; 1, 13, 19 nos três cartões (4:5).
- **Computador:** fundo `cream`, padding 96; foto ref:camadas-145 nas colunas 1 a 5 (520x650); à direita (colunas 7 a 12) título, texto, 3 cartões em linha (KIT 4.5 sem link, 200x250) com nome e preço, total, botão.
- **Celular:** título; foto 390x440; 3 cartões em rolagem lateral (150 px, o terceiro cortado na borda); total; botão de largura cheia.
- **Interativo:** "Add the set" põe as 3 peças na sacola e abre a gaveta no estado 3.

#### 7. `presente`
- **Objetivo:** posicionar o colar como presente para as datas de fé e de família.
- **Rótulo:** "A gift for her" · **Título:** "For the days she will remember." · **Texto:** "Every necklace arrives gift-ready, with 30 days to return or exchange."
- **Ocasiões (lista em 2 colunas, Newsreader 300 20 px, fio `line` entre linhas, seta à direita):** Baptism · First Communion · Confirmation · Mother's Day · Christmas · Birthday · For a Godmother
- **Botão secundário:** "Shop gifts"
- **Fotos:** ref:presente-001 (caixa aberta com o colar, 4:5).
- **Computador:** fundo `linen`, padding 96; texto e lista nas colunas 1 a 6; foto nas colunas 8 a 12 (520x650).
- **Celular:** foto 390x440; texto; lista em 1 coluna (alvo 48 px).
- **Interativo:** cada ocasião leva à coleção Gifts filtrada pela etiqueta.

#### 8. `ophir`
- **Objetivo:** dar à marca uma origem em uma linha.
- **Texto (Newsreader 300 itálico, 32 px no computador, 24 no celular):** "Named after Ophir, the land of gold in the Bible." · **Link:** "Our story"
- **Fotos:** ref:editorial-089 (medalhão sobre pedra com oliveira, 1:1).
- **Computador:** fundo `cream`, padding 72; foto 200x200 à esquerda, fio `gold` de 40 px, frase e link à direita, tudo centralizado em 880 px.
- **Celular:** foto 120x120 centralizada, frase centralizada, link.

#### 9. `selos`
- **Objetivo:** fechar a dúvida de risco antes das perguntas.
- KIT 4.6 completa: Free US shipping over $50 / Processed in 1 to 3 business days · 30-day returns / Refund or exchange, unworn · 1-year warranty / Against manufacturing defects · Gift-ready / Arrives ready to give.
- **Computador:** 4 colunas em 1280. **Celular:** 2x2.

#### 10. `cuidados`
- **Objetivo:** dizer como manter o dourado bonito, sem prometer o que não foi testado.
- **Rótulo:** "Care" · **Título:** "Keep it bright."
- **Passos (número `gold` Newsreader 40 px, texto 15 px):** "01 Put it on after perfume and lotion." · "02 Wipe it with a soft cloth."
- **Computador:** fundo `linen`, padding 72; título à esquerda (colunas 1 a 4), passos em 2 colunas (5 a 12). **Celular:** empilhado.

#### 11. `perguntas`
- **Objetivo:** responder as objeções antes de rolar para a compra.
- **Rótulo:** "Questions" · **Título:** "Before you choose."
- **Perguntas (KIT 4.8; as duas primeiras abertas):**
  1. "How does Buy 3, get 20% off work?" / "Add 3 necklaces to your bag and the 20% comes off automatically at checkout."
  2. "Where does it sit on the neck?" / "It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone."
  3. "What is it made of?" / "Gold-tone stainless steel, with a fine cable chain."
  4. "How long does shipping take?" / "Orders are processed in 1 to 3 business days, with tracking by email. Delivery time shows at checkout. Free US shipping over $50."
  5. "Can I return it?" / "Yes, within 30 days for a refund or exchange, unworn and in its original packaging."
  6. "Is there a warranty?" / "Yes, 1 year against manufacturing defects."
  7. "Is it ready to give?" / "Yes. Every necklace arrives gift-ready."
- No celular, "Details" e "Shipping and returns" entram aqui como as duas primeiras abas fechadas.
- **Computador:** fundo `cream`, padding 96; título nas colunas 1 a 4; perguntas nas colunas 6 a 12. Link "Write to us" e o e-mail abaixo do título. **Celular:** título; perguntas.

#### 12. `avaliacoes`
- KIT 4.9 sem mudança. Âncora `#reviews`.

#### 13. `combine-com`
- **Objetivo:** levar para a 2ª e a 3ª peça.
- **Rótulo:** "Complete your set" · **Título:** "Wear it with." · **Texto (small):** "Any 3 necklaces, 20% off."
- **Cartões (KIT 4.5):** Sideways Cross Necklace with Crystal (n 13), Infinity Cross Necklace (n 19), Layered Cross Necklace with Crystal (n 22), Dove Cross Necklace (n 25), todos $39.99, com botão de contorno "Add" de 40 px sob o preço.
- **Computador:** fundo `linen`, 4 colunas. **Celular:** 2x2.

---

### HOME (10 seções)

#### 1. `hero`
- **Objetivo:** dizer o que a marca é e levar ao produto principal e ao conjunto.
- **Rótulo:** "Cross necklaces in gold" · **Título (display):** "A small cross, *close to your heart.*" · **Texto:** "Made to be worn every day and given with love." · **Botões:** principal "Shop the Petite Puffed Cross" e secundário "Build your faith set".
- **Fotos:** 2 (no pescoço).
- **Computador:** altura 760; grade 6/6 sem margem: texto à esquerda (padding-left 80, centralizado na vertical, largura 520); foto 2 à direita de ponta a ponta 720x760 (`object-position:50% 40%`).
- **Celular:** foto 390x460 no topo; texto abaixo com padding 32 20 40; botões empilhados de largura cheia.

#### 2. `mais-vendidos`
- **Objetivo:** mostrar o catálogo pela peça, com o preço único claro.
- **Rótulo:** "The collection" · **Título:** "Small crosses, worn close." · **Link:** "Shop all necklaces"
- **Cartões (KIT 4.5):** Petite Puffed Cross Necklace (n 2, mostra o hover), Asymmetric Double Cross Necklace (n 4), Enamel Cross Medallion Necklace (n 7), Sideways Cross Necklace with Crystal (n 13); $39.99 cada.
- **Computador:** fundo `cream`, título à esquerda e link à direita na mesma linha; 4 colunas. **Celular:** 2x2.

#### 3. `ocasioes`
- **Objetivo:** abrir a porta do presente por data.
- **Rótulo:** "Gifts" · **Título:** "For the days she will remember."
- **Blocos (foto 3:4, nome abaixo em Newsreader 300 22 px, seta):** "Baptism and First Communion" (n 8) · "Confirmation" (n 26) · "For Mom" (n 23) · "Christmas" (ref:presente-001)
- **Computador:** fundo `linen`, padding 96; 4 colunas (302x403). **Celular:** rolagem lateral, cartões de 260x347, o 2º aparecendo pela metade.

#### 4. `como-funciona`
- **Objetivo:** explicar o conjunto de 3 em 3 passos com a conta.
- **Rótulo:** "Build your faith set" · **Título:** "Three crosses. One for you, *two to give.*"
- **Passos (número `gold` Newsreader 200 56 px, h3, small):** "01 Choose any 3" / "Mix any 3 necklaces." · "02 20% comes off" / "Applied in your bag. No code needed." · "03 Keep one, give two" / "For her, for Mom, for a goddaughter."
- **Conta (linha centralizada, 16 px):** "For example, 3 x $39.99 = `<s>$119.97</s>`. You pay $95.98, about $31.99 each."
- **Fotos (três 4:5 com legenda small abaixo):** 2 "For you" · 26 "For your mother" · 8 "For your goddaughter"
- **Botão:** "Start your set"
- **Computador:** fundo `cream`, padding 96; título centralizado; fotos em 3 colunas (400x500) com os passos sob cada foto; conta e botão centralizados. **Celular:** passos empilhados com a foto 350x438 em cima de cada um (só a do passo 3 pode sair se a altura passar de 7.500).

#### 5. `camadas-prontas`
- **Objetivo:** vender o conjunto pronto, sem a cliente montar.
- **Rótulo:** "Ready to layer" · **Título:** "Two sets, ready to give."
- **Cartão 1:** "The Everyday Grace Set": foto ref:camadas-145 (4:5); miniaturas 1, 13, 19 (64x80); "Petite Puffed Cross, Sideways Cross with Crystal, Infinity Cross"; `<s>$119.97</s>` "$95.98"; botão "Add the set".
- **Cartão 2:** "The Blessing Set": foto ref:camadas-140 (4:5); miniaturas 7, 25, 10; "Enamel Cross Medallion, Dove Cross, Double Cross"; `<s>$119.97</s>` "$95.98"; botão "Add the set".
- **Computador:** fundo `linen`; 2 colunas de 628, foto 628x785. **Celular:** empilhado, foto 350x438.

#### 6. `todo-dia`
- **Objetivo:** pessoas usando a peça, em evidência.
- **Rótulo:** "Worn every day" · **Título:** "Close to your heart, every day."
- **Fotos:** ref:hero-127 (mulher, mão na testa, cruz fina, 4:5 grande), 20 (Infinity no pescoço, 1:1), 14 (Sideways Crystal no pescoço, 1:1).
- **Computador:** fundo `cream`, sem texto além do título; ref:hero-127 nas colunas 1 a 7 (741x926); 20 e 14 empilhadas nas colunas 8 a 12 (515x451 cada, vão 24). **Celular:** ref:hero-127 390x488; 20 e 14 lado a lado 171x171.

#### 7. `ophir`
- **Objetivo:** contar a origem do nome em poucas linhas.
- **Rótulo:** "Our name" · **Título:** "Named after *the land of gold.*" · **Texto:** "In the Bible, Ophir was the land of gold that Solomon's ships sailed for. We carry its name as a promise: pieces that feel precious, worn every day, given with love." · **Link:** "Read our story"
- **Fotos:** ref:editorial-089 (4:5).
- **Computador:** fundo `navy`, texto `cream`, rótulo `gold-light`, padding 0; foto nas colunas 1 a 6 de ponta a ponta (720x720), texto nas colunas 8 a 12 centralizado na vertical. **Celular:** foto 390x390; texto com padding 40 20 48.

#### 8. `promessa`
- **Objetivo:** garantia e envio com as regras reais.
- **Rótulo:** "Our promise" · **Título:** "Simple, and in writing."
- **3 colunas (ícone 24 `gold`, h3, small):** caminhão "Shipping" / "Processed in 1 to 3 business days, with tracking by email. Free in the US over $50." · devolução "30-day returns" / "Refund or exchange, unworn and in its original packaging." · escudo "1-year warranty" / "Covered against manufacturing defects."
- **Computador:** fundo `cream`, fios `line` entre colunas. **Celular:** empilhado.

#### 9. `perguntas`
- **Rótulo:** "Questions" · **Título:** "Good to know."
- **5 perguntas (KIT 4.8, a primeira aberta):** 1, 2, 4, 5 e 7 da seção 11 do produto.
- **Computador:** fundo `linen`; título nas colunas 1 a 4, perguntas nas colunas 6 a 12. **Celular:** empilhado.

#### 10. `cadastro`
- **Objetivo:** guardar o contato de quem ainda não comprou.
- **Rótulo:** "Letters from Ofirelle" · **Título:** "New pieces and gift ideas." · **Texto:** "New pieces and gift ideas. Leave anytime."
- **Campo:** "Email address" (48 px, borda `navy`) + botão principal "Join" (48 px).
- **Computador:** fundo `cream`, centralizado em 560. **Celular:** campo e botão empilhados, largura cheia.

---

### Fotos usadas (endereço do canvas)

| Foto | Peça ou cena | `/_blob/` |
|---|---|---|
| 1 | Petite Puffed, packshot | `/_blob/c515ed946811d4560e8bb88f6339915a` |
| 2 | Petite Puffed, no pescoço | `/_blob/d5c8f7aab274a4d35ce9928165371e09` |
| 3 | Petite Puffed, macro no cetim | `/_blob/78e8c794cd3b140aff6a6e1573b9bb3a` |
| 4 | Asymmetric Double, packshot | `/_blob/800fe334683ba4721fa8a095c92c6bee` |
| 7 | Enamel Medallion, packshot | `/_blob/eeb7e0e7c0ea0543256fd9c977efeead` |
| 8 | Enamel Medallion, no pescoço | `/_blob/80bc3058e2f5585a87979a4f65c69751` |
| 10 | Double Cross, packshot | `/_blob/3f82b69348e027b19c8361639d973d09` |
| 13 | Sideways Crystal, packshot | `/_blob/d10608a1ad0e28435f94253793496e8d` |
| 14 | Sideways Crystal, no pescoço | `/_blob/cf3e38f9cddf33fe4f84bb96a98f248a` |
| 19 | Infinity Cross, packshot | `/_blob/494a9a5795872909dad11cd2cf63a96a` |
| 20 | Infinity Cross, no pescoço | `/_blob/84aa4e0bb3bbc933ce839a177b3981d1` |
| 22 | Layered Crystal, packshot | `/_blob/46d62a7d60d3e31d517fd76963b3abf6` |
| 23 | Layered Crystal, no pescoço | `/_blob/bf967ef525b3be5693c1a81411f3666c` |
| 25 | Dove Cross, packshot | `/_blob/fd1460bd3aca6239a42a9a13c694bdf0` |
| 26 | Dove Cross, no pescoço | `/_blob/afbed6bff4796a57624e99a6acb85d34` |
| ref:hero-127 | mulher com cruz fina, luz quente | `/_blob/f9866818c8da87f9b8458a73791258db` |
| ref:maos-039 | mão no peito segurando a cruz | `/_blob/de9a5ac322ab855427ab4afe0258713d` |
| ref:macro-004 | fecho lagosta e extensor | `/_blob/45ce331ec68ba652fcd4b4d120791411` |
| ref:camadas-145 | duas correntes no colo | `/_blob/b682f6c1e1a256cce0d8d0eff2f1a147` |
| ref:camadas-140 | duas correntes sobre suéter | `/_blob/ea1e886155e17a3f84715bb115959d64` |
| ref:presente-001 | caixa aberta com colar e cartão | `/_blob/2f51c0fbf2a334849b74ab36f66a5335` |
| ref:editorial-089 | medalhão sobre pedra com oliveira | `/_blob/28407a39e05f00fbc7edaacb0c8eb489` |

Foto de outra loja entra só no desenho, sem nenhuma etiqueta visível; a troca está registrada em `v2.json`. A ref:presente-001 tem um cartão com texto de outra loja: no desenho, corte `object-position:50% 20%` para o cartão ficar pequeno.

## 11. A oferta

**Build your faith set: Buy 3, save 20% (proposta: só vale depois que o dono criar o desconto automático)**

- 1 necklace: $39.99
- 2 necklaces: $79.98, free US shipping (over $50)
- 3 necklaces: $95.98, about $31.99 each, save $23.99 (3 x 39.99 = $119.97, riscado), marcado Best value
- Conjunto pronto do produto: The Everyday Grace Set = Petite Puffed Cross + Sideways Cross with Crystal + Infinity Cross, $95.98
- Segundo conjunto (home): The Blessing Set = Enamel Cross Medallion + Dove Cross + Double Cross, $95.98

Precisa do sim do dono antes:

- Criar o desconto automático Buy 3, get 20% off e desativar ou manter o código OFIR20
- Confirmar se o OFIR20 está ativo hoje
- Regra com o Baroque Pearl Toggle ($44.99): entra nos 20%, mas fica fora dos conjuntos prontos
- Tirar o preço comparado (69.99 e 79.99) e o selo SALE de todos os produtos

## 12. Fotos a trocar, com o prompt

Âncora sempre a foto real da Ofirelle; foto de outra loja só dá direção de luz e enquadramento. Fundo creme e champanhe da marca, luz quente lateral, aço inox com tom dourado. ChatGPT imagem com a foto real anexada.

Regra: foto de outra loja nunca entra na loja do dono (nem em Arquivos, nem em seção, nem como mídia de produto). Ela serve só para mostrar a cena no desenho. No tema, o campo fica vazio e a seção usa a foto reserva da própria Ofirelle até o dono fazer a foto própria.

Lugares que trocam (lista "Fotos (lugar por lugar)" do desenho):

| Lugar | Página | Onde | Hoje | Referência de | O que usar |
|---|---|---|---|---|---|
| 17 | produto | galeria-compra; no-pescoco | ref-maos-039.jpg | lainly.com | Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. A woman's hand resting on her chest, fingertips lightly holding the Petite Puffed Cross Necklace at the base of her neck, cream knit top, warm side window light, close crop from chin to chest, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 18 | produto | galeria-compra; detalhe | ref-macro-004.jpg | hoperings.com | Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. Macro of the same necklace's lobster clasp and extender chain laid on champagne satin, soft warm light, shallow depth of field, 1:1. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 19 | produto | conjunto; home camadas-prontas | ref-camadas-145.jpg | atoleajewelry.com | Attach the real Ofirelle photo petite-puffed-cross-necklace-2.jpg, sideways-cross-crystal-necklace-1.jpg and infinity-cross-necklace-1.jpg as the product reference. Neck and collarbone of a woman wearing three Ofirelle necklaces layered at three heights: the Petite Puffed Cross at the base of the neck, the Sideways Cross with Crystal in the middle, the Infinity Cross lowest; beige ribbed top, warm natural light, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 20 | home | camadas-prontas (Blessing) | ref-camadas-140.jpg | atoleajewelry.com | Attach the real Ofirelle photo enamel-cross-pendant-necklace-1.jpg, dove-cross-necklace-1.jpg and double-cross-necklace-1.jpg as the product reference. A woman wearing the Enamel Cross Medallion, Dove Cross and Double Cross necklaces layered over a soft camel sweater, close crop from chin to chest, warm natural light, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 21 | produto | presente; home ocasioes (Christmas) | ref-presente-001.jpg | hoperings.com | Só gerar depois que o dono confirmar a caixa real e como ela é. Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. The Petite Puffed Cross Necklace inside an open plain cream gift box on champagne satin, soft warm light from the side, 4:5. Use the real Ofirelle box only after the owner confirms it exists. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 22 | produto | ophir; home ophir | ref-editorial-089.jpg | sundayandstone.com | Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. The Petite Puffed Cross Necklace resting on a pale ancient stone with a small olive branch, warm late afternoon light, quiet and minimal, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |
| 23 | home | todo-dia | ref-hero-127.jpg | atoleajewelry.com | Attach the real Ofirelle photo petite-puffed-cross-necklace-2.jpg as the product reference. A woman outdoors in warm golden hour light, face turned down in profile, hand near her hair, wearing the Petite Puffed Cross Necklace at the base of her neck, cream linen shirt, natural skin texture, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand. |

### Foto 1: página do produto, Galeria de compra, foto no pescoço (mão no peito)

- Cena: maos. Proporção: 4:5.
- Referência (lainly.com, só a direção): Mão pousada no peito segurando o pingente, recorte do queixo ao peito, luz lateral de janela.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188. Foto real da Petite Puffed Cross sobre fundo branco (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**

Prompt:

```
Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: close crop from chin to chest of a woman in her 30s with fair to medium skin, no visible tattoos, one hand resting naturally on her chest with fingertips lightly holding the pendant at the base of her neck, relaxed natural fingers. Cream knit top. Soft warm window light from the left, medium-soft shadows, warm 3500K, gentle highlights on the gold-tone metal. Shot on 85mm at f/2.8, shallow depth of field with the pendant and fingertips sharp, softly blurred warm cream background (#FBFAF7 tone). Vertical 4:5, pendant in the lower third of the frame. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] O pingente tem a mesma forma bojuda, o mesmo tamanho relativo e o mesmo tom dourado da foto real.
- [ ] A corrente é fina, tipo cable, igual à real.
- [ ] Nenhum texto, logo, marca d'água ou outra joia.
- [ ] Pele, mãos e dedos naturais, sem tatuagem.
- [ ] A cruz é a mesma da foto real, não a de cristais da referência.

### Foto 2: página do produto, Galeria de compra, detalhe (fecho e extensor)

- Cena: macro. Proporção: 1:1.
- Referência (hoperings.com, só a direção): Macro do fecho lagosta e da corrente extensora sobre cetim, luz suave.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188. Foto real da Petite Puffed Cross sobre fundo branco (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**
- Melhor com foto real: A foto real não mostra o fecho. Se o dono fotografar o fecho de perto com o celular, essa foto vale mais que a gerada.

Prompt:

```
Use the attached photo as the exact product reference. Product: the same gold-tone stainless steel thin cable chain and the small puffed cross pendant from the reference, with a standard lobster clasp and a short extender chain. Scene: macro of the lobster clasp and extender chain gently curled on champagne satin with soft folds, the puffed cross pendant visible softly out of focus at the edge of the frame. Soft warm diffused light from the upper left, warm 3500K, small natural highlights on the metal. 100mm macro lens, f/4, shallow depth of field with the clasp sharp. Champagne and cream palette, square 1:1. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] Corrente com o mesmo elo cable fino da foto real.
- [ ] Fecho lagosta com extensor, sem inventar pedra ou plaquinha gravada.
- [ ] Mesmo tom dourado, sem cor prateada.
- [ ] Nenhum texto ou logo no fecho.

### Foto 3: home, Conjunto (produto) e Camadas prontas (home)

- Cena: camadas. Proporção: 4:5.
- Referência (atoleajewelry.com, só a direção): Três alturas de corrente no colo, close do queixo à clavícula, luz quente natural.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188. Foto real da Petite Puffed Cross no pescoço, blusa bege (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**
- Melhor com foto real: Se o gerador de imagem errar um dos três pingentes, vale tirar a foto real do dono usando os três colares.

Prompt:

```
Use the attached photo as the exact product reference. Attach three reference photos: the Petite Puffed Cross, the Sideways Cross with a small crystal and the Infinity outline Cross, all gold-tone stainless steel with thin cable chains; copy each pendant exactly. Scene: neck and collarbone of a woman in her 30s, no visible tattoos, wearing the three necklaces layered at three heights: the puffed cross at the base of the neck, the sideways cross with crystal in the middle, the infinity cross lowest, chains never tangled and clearly separated. Beige ribbed top. Soft warm natural light from the side, warm 3500K, gentle gold reflections. 85mm, f/2.8, background warm beige out of focus, crop from chin to upper chest, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] Aparecem três colares, cada um igual à sua foto real.
- [ ] Alturas diferentes, correntes separadas e sem nó.
- [ ] Mesmo tom dourado nos três.
- [ ] Nenhum texto, logo ou joia extra.

### Foto 4: home, Camadas prontas (Blessing)

- Cena: camadas. Proporção: 4:5.
- Referência (atoleajewelry.com, só a direção): Correntes em camadas sobre suéter, close do queixo ao peito.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-1.png?v=1794614797. Foto real da Enamel Cross Medallion.
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**
- Melhor com foto real: Três pingentes diferentes de uma vez erram com facilidade. Se falhar duas vezes, usar a foto real do dono.

Prompt:

```
Use the attached photo as the exact product reference. Attach three reference photos: the Enamel Cross Medallion (white enamel medallion with a cross), the Dove Cross with cut-out dove and the Double Cross, all gold-tone stainless steel with thin chains; copy each pendant exactly. Scene: a woman in her 30s, no visible tattoos, wearing the three necklaces layered at three clearly separate heights over a soft camel knit sweater, close crop from chin to chest. Soft warm natural light from the side, warm 3500K, gentle highlights on the metal. 85mm, f/2.8, softly blurred warm neutral background, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] Medalhão esmaltado branco, pomba vazada e cruz dupla iguais às fotos reais.
- [ ] Três alturas, sem correntes embaraçadas.
- [ ] Tom dourado igual ao real.
- [ ] Nenhum texto ou joia extra.

### Foto 5: home, Presente (produto) e Ocasiões, Christmas (home)

- Cena: presente. Proporção: 4:5.
- Referência (hoperings.com, só a direção): Caixa aberta com o colar e um cartão em branco sobre cetim, luz quente lateral.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188. Foto real da Petite Puffed Cross sobre fundo branco (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**
- Melhor com foto real: Só usar depois que o dono confirmar que a embalagem de presente existe e como ela é. Se for diferente, fotografar a caixa real.

Prompt:

```
Só gerar depois que o dono confirmar a caixa real e como ela é. Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: the necklace lying inside an open plain cream gift box with no printing, the puffed cross centered, chain softly curved, on champagne satin. Soft warm light from the left, warm 3500K, gentle shadow under the box. 50mm, f/5.6, top-down three quarter angle, vertical 4:5, cream and champagne palette. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] Caixa lisa, sem nome ou logo.
- [ ] Mesma cruz bojuda e mesmo dourado da real.
- [ ] Nenhum texto na foto.

### Foto 6: home, Ophir (história da marca)

- Cena: editorial. Proporção: 4:5.
- Referência (sundayandstone.com, só a direção): Colar sobre pedra clara com ramo de oliveira, luz de fim de tarde, composição calma.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188. Foto real da Petite Puffed Cross sobre fundo branco (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**

Prompt:

```
Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: the necklace resting on a pale weathered limestone slab, chain in a soft S curve, one small olive branch beside it, no other objects. Warm low late afternoon sun from the right, warm 3200K, long soft shadows, gentle glint on the metal. 100mm macro, f/4, shallow depth of field, warm sand and cream background, minimalist and quiet, space at the top for text, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] A cruz é bojuda e igual à real, sem pérola nem pedra.
- [ ] Só pedra e um ramo de oliveira na cena.
- [ ] Dourado igual ao real.
- [ ] Nenhum texto.

### Foto 7: home, Todo dia (lifestyle)

- Cena: lifestyle. Proporção: 4:5.
- Referência (atoleajewelry.com, só a direção): Mulher ao ar livre, perfil com o rosto levemente baixo, mão perto do cabelo, luz dourada.
- Foto real da Ofirelle para anexar: https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188. Foto real da Petite Puffed Cross no pescoço, blusa bege (o gerador de imagem copia a peça desta foto).
- Onde gerar: ChatGPT (gerar imagem) com a foto real anexada. Alternativa: Higgsfield ou Midjourney com referência de imagem.
- **No desenho, este lugar usa a foto de outra loja só como exemplo. Na cópia do tema, o campo fica vazio e a seção usa a foto reserva da Ofirelle até a foto própria existir.**

Prompt:

```
Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: a woman in her 30s outdoors in warm golden hour light, face turned slightly down in profile, one hand near her hair, wearing the necklace at the base of her neck, cream linen shirt, no visible tattoos, natural relaxed hand. Backlit warm sun 3000K with soft rim light on hair, gentle highlights on the gold-tone metal. 85mm, f/2, shallow depth of field, soft blurred greenery in warm tones, crop from head to chest, vertical 4:5, space on one side for text. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.
```

Não pode aparecer: text, logo, watermark, extra jewelry, gemstone, pearl, different pendant, different chain link, changed pendant shape, silver color, deformed hand or fingers, extra fingers, visible tattoo, plastic skin, artificial glow, fake sparkle, packaging with any brand

Antes de aprovar:

- [ ] O pingente tem a mesma forma bojuda, o mesmo tamanho relativo e o mesmo tom dourado da foto real.
- [ ] A corrente é fina, tipo cable, igual à real.
- [ ] Nenhum texto, logo, marca d'água ou outra joia.
- [ ] Pele, mãos e dedos naturais, sem tatuagem.
- [ ] A cruz continua pequena e bojuda, não vira cruz fina da referência.

## 13. O plano, M1 a M13

Tema de hoje: Atelier (4.4.0). Nome da cópia: Global Brand otimizado 2026-11-15.

### M1 (conserto 1): Criar as políticas de reembolso, envio e termos no lugar nativo da Shopify e preencher o contato com e-mail, nome da empresa e endereço.

- Página: políticas e contato. Tipo: admin_manual. Pede o sim do dono: sim.
- Por quê: Reembolso, envio, termos e contato dão 404 em /policies. O Google Merchant e o cliente procuram essas páginas primeiro, e o contato hoje é só um formulário.
- Como: No Admin, em Configurações, Políticas, preencher: reembolso (30 dias, peça sem uso e na embalagem), garantia de 1 ano com condições escritas, envio (processamento de 1 a 3 dias úteis, prazo de trânsito, frete grátis acima de US$ 50), termos e informações de contato com support@ofirelle.com. Pedir ao dono o nome da empresa e o endereço. Trocar o título da página Contato por Contact e acrescentar e-mail e endereço. Conferir o menu do rodapé apontando para as políticas novas. Se o dono ainda não tem nome da empresa e endereço para publicar, deixar esse campo para ele preencher e avisar. As páginas /pages/*-policy e os links do rodapé existem hoje, com 1 a 3 frases cada: reaproveitar o texto e ampliar.
- Pronto quando: As quatro URLs /policies/refund-policy, shipping-policy, terms-of-service e contact-information abrem com texto, e a página Contact mostra e-mail e endereço em inglês.

### M2 (conserto 2): Tirar o preço comparativo (Compare-at price) dos 10 colares e a frase Fall Sale da barra de aviso.

- Página: todas. Tipo: preco. Pede o sim do dono: sim.
- Por quê: Os produtos foram criados em 13/11/2026, então não existe preço anterior real. Desconto sobre preço que nunca existiu engana a cliente e pode reprovar a loja no Google.
- Como: Listar os produtos com compareAtPrice preenchido e mostrar a lista ao dono. Só com o sim dele, zerar o preço comparativo das variantes (Admin, Produtos, edição em massa, ou productVariantsBulkUpdate). Depois procurar "Fall Sale" nos textos da barra de aviso e nas traduções do tema e trocar por "Free US shipping over $50". Conferir se o selo SALE some das coleções.
- Pronto quando: Nenhum colar mostra preço riscado nem selo SALE na coleção, no produto e no carrinho, e a barra de aviso não cita 45% off.

### M3 (conserto 3): Mostrar a oferta Buy 3, Get 20% off no produto e no carrinho, com desconto automático e barra até o frete grátis e até o terceiro colar.

- Página: produto, coleção e carrinho. Tipo: tema. Pede o sim do dono: sim.
- Por quê: Hoje a oferta é um código (OFIR20) que só aparece na home. A cliente precisa lembrar e digitar.
- Como: Primeiro perguntar ao dono se o código OFIR20 está ativo e se aceita trocar por desconto automático (Admin, Descontos). Na cópia do tema, procurar "Discounts calculated at checkout" e o bloco de preço do produto e acrescentar cartões de 1, 2 e 3 colares com a conta real: 1 = US$ 39,99; 2 = US$ 79,98 com frete grátis; 3 = US$ 95,98, US$ 31,99 cada, economia de US$ 23,99. No carrinho, acrescentar uma barra de progresso até US$ 50 e até o terceiro colar. Usar os blocos nativos do tema quando existirem. Com o sim do dono, criar em Descontos um desconto automático 'Buy 3, get 20% off' (20% de desconto em produtos, quantidade mínima 3, só colares; decidir com o dono se mantém o OFIR20 e se pode combinar com outros, e se o Baroque Pearl Toggle, de US$ 44,99, entra). Só depois ligar `promo_ativa` no tema; antes disso, deixar desligado e tirar do texto 'Buy 3, get 20% off'.
- Pronto quando: O desconto aplica sozinho no carrinho com 3 colares, o produto mostra os 3 cartões com os valores acima e o carrinho mostra a barra de progresso, e há print do carrinho com 3 colares de US$ 39,99 mostrando o total de US$ 95,98.

### M4 (conserto 4): Pôr o botão de comprar na primeira tela do celular, escrever as medidas e corrigir a frase de imposto e a aba Care.

- Página: produto e carrinho. Tipo: tema. Pede o sim do dono: sim.
- Por quê: No celular a primeira tela termina em Color Gold, sem botão. Sem medida a cliente não sabe o tamanho. A aba Care fala de prata esterlina numa peça de aço inox.
- Como: Na cópia do tema, no template do produto, subir o bloco do botão de compra ou ativar o botão fixo no celular, logo abaixo do preço. Procurar "Taxes included." nos arquivos do tema e nas traduções e trocar por "Shipping calculated at checkout." depois de conferir em Configurações, Impostos se os preços incluem imposto. Procurar "Sterling silver", apagar a frase e escrever na aba Care: "Put it on after perfume and lotion. Wipe it with a soft cloth." Escrever comprimento da corrente, da extensora e tamanho do pingente com os dados do dono.
- Pronto quando: No celular, nome, preço e botão de comprar aparecem juntos na primeira tela, as medidas estão escritas e a busca por "Sterling silver" e "Taxes included" não acha nada.

### M5 (conserto 5): Tirar hypoallergenic, nickel-free e finished by hand, e escrever as condições da garantia de 1 ano.

- Página: home, produto e política. Tipo: tema. Pede o sim do dono: sim.
- Por quê: São promessas de saúde e de material sem documento do fornecedor. A garantia sem condições gera conflito com a cliente.
- Como: Na cópia do tema, procurar "hypoallergenic", "nickel-free" e "finished by hand" nos arquivos, nas traduções e na descrição dos produtos (Admin) e tirar. Manter só se o dono mandar o documento do fornecedor. Na política de reembolso, escrever o que a garantia cobre, o que não cobre e como pedir (e-mail com número do pedido e foto). Trocar a faixa "Every piece is covered against defects, and we will make it right" por "1-year warranty against manufacturing defects." e a faixa de rodapé "Stainless steel, nickel-free and hypoallergenic, finished by hand." por "Gold-tone stainless steel."
- Pronto quando: A busca pelos três termos não acha nada na loja, e a política de garantia traz as condições escritas.

### M6: Tirar Earrings e Bracelets do menu e da home enquanto as coleções estão vazias.

- Página: menu e home. Tipo: tema. Pede o sim do dono: sim.
- Por quê: Coleções vazias levam a páginas sem produto e passam descuido.
- Como: Na cópia do tema, procurar "Earrings" e "Bracelets" no menu e nas seções da home e esconder os cartões. Reativar quando houver produto.
- Pronto quando: Menu e home mostram só coleções com produto.

### M7: Mostrar uma cruz na primeira tela da home no lugar do colar de gota.

- Página: home. Tipo: tema. Pede o sim do dono: não.
- Por quê: A primeira imagem deve mostrar o que a loja vende.
- Como: No editor do tema, na seção de abertura da home, trocar a imagem pela foto `petite-puffed-cross-necklace-2.jpg` (a da própria Ofirelle com a cruz) até a sessão de fotos; depois trocar pela foto de pescoço do M8. Procurar "Timeless & Meaningful" para achar o bloco.
- Pronto quando: A primeira tela da home mostra um colar de cruz.

### M8: Fazer mais fotos próprias: pescoço com escala, mão, caixa de presente e macro do fecho.

- Página: produtos. Tipo: produto. Pede o sim do dono: sim.
- Por quê: Só há 3 fotos por produto e parecem artificiais. A loja promete gift-ready sem mostrar a caixa.
- Como: Pedir ao dono as fotos novas, subir em Admin, Produtos, Mídia, e reordenar com a foto de pescoço em segundo lugar. Não usar foto de outra loja.
- Pronto quando: Cada colar tem pelo menos 5 fotos reais, incluindo caixa e fecho.

### M9: Salvar a foto principal em formato mais leve.

- Página: produtos e home. Tipo: admin_manual. Pede o sim do dono: sim.
- Por quê: A imagem principal é PNG de 3840 px; o tempo de carga no laboratório foi 4,9 s no produto e 4,3 s na home.
- Como: Exportar as imagens em JPG ou WebP com 1600 px no lado maior e subir de novo no Admin. Rodar o teste de velocidade do celular de novo.
- Pronto quando: A imagem principal pesa menos de 300 KB e o tempo de carga cai.

### M10: Escrever o prazo de trânsito na política de envio e no produto.

- Página: política de envio. Tipo: admin_manual. Pede o sim do dono: sim.
- Por quê: Hoje a política diz que o prazo aparece no finalizar compra.
- Como: Pedir ao dono o prazo real da transportadora e escrever na política de envio e logo abaixo do botão do produto.
- Pronto quando: O prazo em dias úteis aparece na política e no produto.

### M11: Usar presente como motivo de compra no texto e nas fotos.

- Página: produto e home. Tipo: tema. Pede o sim do dono: não.
- Por quê: A loja promete gift-ready, mas pouco fala de batismo, aniversário e presente.
- Como: Na cópia do tema, procurar o bloco de texto do produto e acrescentar uma linha de presente. Depois das fotos da caixa (M8), mostrar a caixa na galeria.
- Pronto quando: O produto e a home citam presente com texto e foto.

### M12: Escrever título e descrição da home para aparecer melhor no Google.

- Página: home. Tipo: tema. Pede o sim do dono: sim.
- Por quê: A home tem o título "Ofirelle" e nenhuma descrição.
- Como: No Admin, em Preferências, escrever título e descrição da página inicial.
- Pronto quando: A home tem título e descrição de até 160 caracteres.

### M13: Criar a coleção Gifts e as etiquetas de ocasião nos produtos.

- Página: menu, home e produto. Tipo: admin_manual. Pede o sim do dono: sim.
- Por quê: A loja só tem as coleções Faith e Necklaces. O menu, o botão Shop gifts e os cartões de ocasião da loja nova apontam para /collections/gifts, que hoje não existe.
- Como: Com o sim do dono, criar a coleção Gifts e dar aos produtos as etiquetas baptism, communion, confirmation, mom, christmas, birthday e godmother. Os links de ocasião usam o formato /collections/gifts?filter.p.tag=<etiqueta>. Até lá, deixar os links de ocasião e o botão Shop gifts apontando para /collections/necklaces.
- Pronto quando: A coleção Gifts abre com produtos e cada link de ocasião mostra só os colares com a etiqueta.

## 14. O que o dono precisa confirmar

Do desenho e da oferta:

- Comprimento da corrente e do extensor, tamanho e peso do pingente (desenho de medida sem número até lá)
- Criar o desconto automático de 3 peças e confirmar o OFIR20
- Caixa de presente real? Como é? Pode aparecer em foto?
- Cartão com mensagem: existe? É escrito à mão ou impresso?
- Último dia de pedido para chegar antes do Natal
- Nickel-free, hypoallergenic, finished by hand: documento do fornecedor antes de usar
- Telefone, endereço e razão social para rodapé e políticas
- Etiquetas de ocasião em cada produto para a coleção Gifts
- Sessão de fotos própria: mão, caixa aberta, rosto em luz natural, camadas (substitui as 7 de referência)
- Fotos atuais com aparência sintética e packshot sem sombra de contato (veredito da curadoria)

Mudanças do plano que pedem o sim (11):

- M1: Criar as políticas de reembolso, envio e termos no lugar nativo da Shopify e preencher o contato com e-mail, nome da empresa e endereço.
- M2: Tirar o preço comparativo (Compare-at price) dos 10 colares e a frase Fall Sale da barra de aviso.
- M3: Mostrar a oferta Buy 3, Get 20% off no produto e no carrinho, com desconto automático e barra até o frete grátis e até o terceiro colar.
- M4: Pôr o botão de comprar na primeira tela do celular, escrever as medidas e corrigir a frase de imposto e a aba Care.
- M5: Tirar hypoallergenic, nickel-free e finished by hand, e escrever as condições da garantia de 1 ano.
- M6: Tirar Earrings e Bracelets do menu e da home enquanto as coleções estão vazias.
- M8: Fazer mais fotos próprias: pescoço com escala, mão, caixa de presente e macro do fecho.
- M9: Salvar a foto principal em formato mais leve.
- M10: Escrever o prazo de trânsito na política de envio e no produto.
- M12: Escrever título e descrição da home para aparecer melhor no Google.
- M13: Criar a coleção Gifts e as etiquetas de ocasião nos produtos.

Antes de publicar, o dono também precisa saber, com todas as letras:

- A página do Petite Puffed Cross Necklace usa o modelo `ofirelle-nova`. Depois de publicar a cópia: Admin, Produtos, Petite Puffed Cross Necklace, Modelo do tema, `ofirelle-nova`, Salvar. Sem isso, a página do colar continua a antiga.
- A home nova só aparece ao publicar se ele deu o sim para o agente copiar `templates/index.ofirelle-nova.json` para o `templates/index.json` da cópia (o original fica salvo como `templates/index.antes-ofirelle-nova.json`). Sem esse sim, ela só abre com `?view=ofirelle-nova`.
- A promoção de 3 colares só aparece na loja depois que ele criar o desconto automático e o agente ligar `promo_ativa`.
- A coleção Gifts ainda não existe (M13); até lá, os links de ocasião apontam para `/collections/necklaces`.
- Os lugares que esperam foto própria usam a foto reserva da própria Ofirelle.

## 15. Os dados brutos (pasta dados/)

| Arquivo | O que tem |
|---|---|
| `coleta-ofirelle.com.json` | Catálogo público da loja (10 produtos, preços, variantes, handles), coleções, políticas e tema, coletado em 15/11/2026. |
| `coleta-hoperings.com.json` | Coleta pública da referência hoperings.com. |
| `coleta-enroutejewelry.com.json` | Coleta pública da referência enroutejewelry.com. |
| `coleta-lainly.com.json` | Coleta pública da referência lainly.com. |
| `coleta-sundayandstone.com.json` | Coleta pública da referência sundayandstone.com. |
| `coleta-mayahenryjewelers.com.json` | Coleta pública da referência mayahenryjewelers.com. |
| `referencias.json` | As lojas de referência do banco, com visitas, anúncios e produto. |
| `dados-loja.json` | Texto das páginas e políticas da loja e a lista de páginas do sitemap. |
| `nota.json` e `notas.json` | A nota da loja por bloco e a conta. |
| `bancada.md` | A auditoria da loja, bloco por bloco, com as provas. |
