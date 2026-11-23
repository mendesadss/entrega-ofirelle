# Loja nova da Ofirelle: código do tema (Atelier 4.4.0)

Tudo está em `tema/`. Suba numa CÓPIA do tema, nunca no publicado. Nada aqui sobrescreve `index.json` nem `product.json`.

## Arquivos
- `assets/gb-loja.css` e `assets/gb-loja.js`: estilo e comportamento de todas as seções (galeria, cartões 1/2/3, conjunto, barra fixa, adicionar ao carrinho).
- `snippets/gb-icone`, `gb-imagem`: apoio das seções. `gb-progresso-carrinho`: barra de progresso até o frete grátis e o 3º colar. Não entra sozinha: inclua com `{% render 'gb-progresso-carrinho' %}` onde quiser; as frases do desconto de 3 peças só aparecem com `{% render 'gb-progresso-carrinho', ativa: true %}`, depois de criar o desconto.
- `templates/index.ofirelle-nova.json` (home) e `templates/product.ofirelle-nova.json` (produto).

## Seções
Home: hero, mais vendidos, ocasiões, como funciona (Compre 3), conjuntos prontos, todo dia, Ophir (faixa), promessa, perguntas, cadastro de e-mail.
Produto: fotos e compra (galeria, cartões 1/2/3, lista do conjunto, abas), benefícios, no pescoço, detalhe, medidas, conjunto pronto, presente, Ophir (citação), selos, cuidados, perguntas, avaliações, combine com, barra fixa de compra (celular).
Ophir, perguntas e selos são uma seção cada, usada nos dois templates.

## O que o dono preenche no editor
- Medidas (seção Medidas): os campos vêm vazios e a linha some até serem preenchidos.
- Oferta: `promo_ativa`, `promo_pct` (20) e `promo_qtd` (3) existem em cada seção que calcula preço; mantenha os mesmos valores. `frete_gratis_acima` (50) fica em Fotos e compra e em Selos.
- Fotos de outras lojas ficaram VAZIAS de propósito (foto da mão no peito, macro do fecho, caixa de presente aberta, camadas, pedra e oliveira do Ophir, uma foto do "todo dia"). Cada uma usa uma foto reserva da própria Ofirelle até a sessão de fotos própria. Quando a foto nova chegar, escolha-a no campo de foto da seção.
- Avaliações: desligada (`mostrar`). Ligue só com avaliações reais ou um app de avaliações adicionado como bloco.
- Links de ocasiões apontam para `/collections/gifts?filter.p.tag=...`: precisam das etiquetas nos produtos e da coleção Gifts (M13 do plano, com o sim do dono). Até lá, aponte os links de ocasião e o botão Shop gifts para `/collections/necklaces`.

## Depende do sim do dono
- Criar o desconto automático de 3 peças (20%) em Descontos. A página só mostra a estimativa e a frase "20% off applied automatically at checkout" depois que `promo_ativa` for ligada. `promo_ativa` nasce DESLIGADA em todas as seções; só ligue depois de criar o desconto automático e provar no carrinho, com 3 colares de US$ 39,99, o total de US$ 95,98. Antes disso, a loja não promete desconto nenhum (a pergunta "How does Buy 3, save 20% work?" some sozinha).
- Ligar o template `product.ofirelle-nova` ao Petite Puffed Cross Necklace.
- Medidas, caixa de presente real, cartão com mensagem e prazo de Natal (lista `preencher_com_o_dono` do `v2.json`).

## Ver a prévia
- Home: `https://<loja>/?view=ofirelle-nova`
- Produto: `https://<loja>/products/petite-puffed-cross-necklace?view=ofirelle-nova`
O link só funciona com o tema copiado selecionado na prévia (a prévia depende de cookie do admin).
