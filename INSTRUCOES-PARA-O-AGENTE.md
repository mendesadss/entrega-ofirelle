# Instruções para o agente: montar a loja nova da Ofirelle

Este arquivo serve para o Claude Code e para o Codex. Execute na ordem, sem pular passo. Fale com o dono em português simples, uma coisa por vez, e diga sempre onde clicar. Quando precisar de um sim, pare e espere.

Loja: ofirelle.com. Domínio Shopify: `2ffekn-xd.myshopify.com`. Tema publicado em 15/11/2026: "Atelier" 4.4.0 (id `189456187696`, tema da Theme Store, família Horizon). Nome da cópia: "Global Brand otimizado 2026-11-15". Produto principal: Petite Puffed Cross Necklace (`/products/petite-puffed-cross-necklace`).

## Passo 0: contexto e skill

1. Leia `CONTEXTO.md` inteiro antes de qualquer ação. Ele tem a análise, os fatos conferidos da loja, a promoção real, o desenho seção por seção, a oferta, as fotos e o plano M1 a M13.
2. Instale a skill de `skill-shopify-dev/` seguindo `skill-shopify-dev/COMO-INSTALAR.md` e use-a em todo o trabalho com o tema.
3. Leia `codigo-do-tema/LEIA.md` (o que cada seção faz e o que o dono preenche no editor).

## Regras duras

1. Trabalhe só numa CÓPIA do tema. Nunca publique (`shopify theme publish`, `--live`, `--publish` e `--allow-live` são proibidos) e nunca rode `shopify theme push` no tema publicado (id `189456187696`). Confira o id antes de cada push.
2. Nunca apague tema, arquivo, produto, coleção ou página.
3. Não toque em `templates/index.json` nem em `templates/product.json` durante a montagem e a prévia. A loja nova usa só `templates/index.ofirelle-nova.json` e `templates/product.ofirelle-nova.json`. A única exceção é o passo 10, com o sim do dono e só na cópia.
4. Peça o sim do dono, mostrando a lista exata do que muda, para: preço, preço riscado, desconto (inclusive o código OFIR20), conjunto, produto novo, promessa (prazo, garantia, frete, reembolso) e tudo o que vale na loja ao vivo na hora (foto de produto, menu, página, política, coleção, etiquetas, título e descrição da home).
5. **A promoção de 3 colares nasce desligada.** A caixa `promo_ativa` das seções vem desmarcada e nenhum texto pode dizer "20% off applied" antes de o desconto existir. Só ligue `promo_ativa` depois de criar o desconto automático (com o sim do dono) e de provar no carrinho, com 3 colares de US$ 39,99, o total de US$ 95,98. Antes de criar, pergunte ao dono se o código OFIR20 está ativo, para não duplicar desconto.
6. Nada inventado: nenhuma avaliação, estrela, nota, número de venda ou de cliente, depoimento, selo de "mais vendido" como afirmação, contador ou estoque falso, preço riscado sem preço anterior real. Nunca escreva "hypoallergenic", "nickel-free", "handmade", "finished by hand", "solid gold", "14k" ou "sterling silver" como promessa. O material é gold-tone stainless steel. Medida, caixa de presente e prazo de trânsito só entram com o dado do dono. Use só os fatos do `CONTEXTO.md`.
7. **Fotos de outras lojas nunca entram na loja.** Não baixe, não suba em Conteúdo, Arquivos, não use em seção nem em produto. Onde o desenho usa foto de outra loja, o campo fica vazio e a seção usa a foto reserva da própria Ofirelle (as 3 fotos do produto) até o dono fazer a foto própria. Antes de o dono publicar, liste cada lugar que ainda espera foto própria.
8. Nunca imprima, grave em arquivo versionado ou cole no chat token, senha ou chave. Não ponha credencial no código do tema.
9. Nenhum travessão em texto que a cliente vê.
10. Se algo der erro duas vezes no mesmo passo, pare e explique ao dono em linguagem simples. Se um comando abortar, não force.
11. Pare no link de prévia. Quem publica é o dono.

## Passo 1: entrar na loja e contar os temas

```
shopify theme list --store 2ffekn-xd.myshopify.com
```

O comando abre o navegador para login (dono ou colaborador com acesso a temas). Confirme que "Atelier" aparece como `[live]` com id `189456187696`; se o nome ou o id não bater, pare e pergunte. Conte os temas: a Shopify guarda no máximo 20 e, com 20, a duplicação falha sem avisar. Se houver 20, peça ao dono para apagar um tema antigo que ele escolher (você não apaga).

## Passo 2: backup do tema publicado

```
shopify theme pull --store 2ffekn-xd.myshopify.com --theme 189456187696 --path ../backup-ofirelle-publicado
```

Guarde a pasta fora desta pasta do pacote. Não edite nada dentro dela.

## Passo 3: criar a cópia

```
shopify theme duplicate --store 2ffekn-xd.myshopify.com --theme 189456187696 --name "Global Brand otimizado 2026-11-15"
```

Anote o id da cópia (`COPIA_ID`) e confira em `shopify theme list` que ela está como `[unpublished]`. Se o comando `duplicate` não existir na sua versão do CLI, peça ao dono para duplicar no Admin (Loja virtual, Temas, três pontinhos do tema publicado, Duplicar), renomear a cópia e informar o nome; pegue o id em `shopify theme list`. Depois baixe a cópia:

```
shopify theme pull --store 2ffekn-xd.myshopify.com --theme COPIA_ID --path ../ofirelle-copia
```

## Passo 4: perguntas ao dono (uma mensagem só)

Mostre e espere as respostas:

- O código OFIR20 ("Buy 3, get 20% off with code OFIR20") está ativo hoje? Ele aceita trocar por desconto automático, sem código? O Baroque Pearl Toggle (US$ 44,99) entra nos 20%?
- O fornecedor tem documento que prove hypoallergenic e nickel-free? Sem documento, essas frases ficam fora.
- Comprimento da corrente, da extensora, tamanho e peso do pingente. Sem o número, a linha de medida fica escondida.
- Existe caixa de presente? Como ela é? Existe cartão com mensagem? Último dia de pedido para chegar antes do Natal?
- Nome da empresa, endereço e telefone para o rodapé e as políticas. Se ele não tiver, deixe esse campo para ele preencher.
- Prazo de trânsito da transportadora (hoje só existe o prazo de processamento de 1 a 3 dias úteis).
- Aprova criar a coleção Gifts e as etiquetas baptism, communion, confirmation, mom, christmas, birthday e godmother nos produtos?

## Passo 5: copiar o código para a cópia

Na pasta `../ofirelle-copia`, confira antes que nenhum destes nomes já existe: `sections/gb-*.liquid`, `snippets/gb-*.liquid`, `assets/gb-loja.css`, `assets/gb-loja.js`, `templates/index.ofirelle-nova.json`, `templates/product.ofirelle-nova.json`. Se algum existir, pare e avise o dono. Depois:

```
cp -R codigo-do-tema/sections/.  ../ofirelle-copia/sections/
cp -R codigo-do-tema/snippets/.  ../ofirelle-copia/snippets/
cp -R codigo-do-tema/assets/.    ../ofirelle-copia/assets/
cp -R codigo-do-tema/templates/. ../ofirelle-copia/templates/
```

Nenhum arquivo existente é trocado. O código não mexe em `index.json`, `product.json`, `layout/theme.liquid`, cabeçalho, rodapé nem na gaveta do carrinho do tema.

## Passo 6: validar e subir só na cópia

```
cd ../ofirelle-copia
shopify theme check
```

Corrija só erros dos arquivos `gb-*` e dos dois modelos `ofirelle-nova` (no clone de validação deram zero erro e um aviso intencional). Avisos de arquivos antigos do tema não são seus: liste-os. Depois:

```
shopify theme push --store 2ffekn-xd.myshopify.com --theme COPIA_ID --path .
```

Antes de apertar Enter, releia: o id é o da cópia, não `189456187696`.

## Passo 7: prévia e editor

- Prévia da home nova: `https://ofirelle.com/?view=ofirelle-nova&preview_theme_id=COPIA_ID`.
- Prévia do produto novo: `https://ofirelle.com/products/petite-puffed-cross-necklace?view=ofirelle-nova&preview_theme_id=COPIA_ID`. O produto novo só aparece com o produto ligado ao template `ofirelle-nova` (campo `templateSuffix`), o que exige o sim do dono.
- A prévia depende do login no Admin no mesmo navegador. Caminho pelo Admin: Loja virtual, Temas, três pontinhos da cópia, Pré-visualizar, e acrescentar `?view=ofirelle-nova` ao endereço.
- Editor da cópia: `https://admin.shopify.com/store/2ffekn-xd/themes/COPIA_ID/editor`. Confira se cada cartão mostra o produto certo (os handles estão nos modelos). Se um handle não existir, o cartão some: avise o dono.
- Os links de ocasião e o botão Shop gifts apontam para `/collections/gifts?filter.p.tag=<etiqueta>`. Essa coleção ainda não existe (plano M13): até o dono dar o sim para criá-la, aponte esses links para `/collections/necklaces` na cópia.
- Fotos: só fotos reais da Ofirelle. Onde o desenho usava foto de outra loja, o campo fica vazio e a seção usa a foto reserva da própria Ofirelle. Quando o dono mandar o endereço de uma foto nova (Conteúdo, Arquivos), ponha no campo da seção, na cópia. Foto nova de produto (mídia do Petite Puffed Cross Necklace) vale na loja e no Google na hora: só com o sim.
- A seção Avaliações fica desligada (`mostrar`): a loja não tem avaliações. Só ligue com avaliações reais.

## Passo 8: conferir em 390 px e em 1440 px

Se tiver Playwright, abra as duas prévias em 390 e 1440 px de largura e tire print. Se não tiver, rode `shopify theme dev --store 2ffekn-xd.myshopify.com --path .` na cópia (cria um tema de desenvolvimento, não publica). Confira contra `loja-nova/home.html` e `loja-nova/produto.html`:

- Sem rolagem lateral no celular.
- Produto: nome, US$ 39,99, 3 benefícios, o botão na primeira tela do celular; nenhum preço riscado, SALE, estrela ou nota.
- Com `promo_ativa` desligado, nenhum texto fala de desconto aplicado e a pergunta "How does Buy 3, save 20% work?" não aparece. Com ela ligada (só depois do desconto criado), 3 colares de US$ 39,99 mostram US$ 95,98 no carrinho. Não finalize a compra.
- Console sem erro vindo dos arquivos `gb-*`.

Não ficou igual ao desenho: corrija uma vez; não ficou de novo, anote como pendente e siga.

## Passo 9: os consertos do Admin (plano M1 a M13)

O texto completo de cada item, com o que mudar e quando está pronto, está no `CONTEXTO.md`, seção "O plano, M1 a M13". Cada um com `precisa_confirmar: true` só acontece depois do sim do dono, com a lista exata do que muda, porque vale na loja ao vivo na hora. Se o dono te deu um token de app com os escopos necessários, faça pela Admin API (GraphQL, confira `userErrors`, anote o valor antigo em `otimizacao/volta-atras.md`); senão, entregue a lista pronta com os textos e diga onde clicar.

- M1: políticas de reembolso, envio e termos no lugar oficial da Shopify (Configurações, Políticas) e contato completo. As páginas `/pages/*-policy` e os links do rodapé existem, com 1 a 3 frases cada.
- M2: tirar o preço comparado dos 10 colares e a frase Fall Sale da barra de aviso.
- M3: desconto automático "Buy 3, get 20% off" (20% em produtos, quantidade mínima 3, só colares), decisão sobre o OFIR20 e o Baroque; só depois ligar `promo_ativa`.
- M4: botão de comprar na primeira tela do celular, medidas, "Taxes included." por "Shipping calculated at checkout." e aba Care sem "sterling silver".
- M5: tirar hypoallergenic, nickel-free e finished by hand, e escrever as condições da garantia.
- M6: tirar Earrings e Bracelets do menu (vale ao vivo: com o sim).
- M7: primeira tela da home com a foto `petite-puffed-cross-necklace-2.jpg` até a sessão de fotos.
- M8: fotos próprias (só fotos do dono).
- M9: imagens mais leves (vale ao vivo no Google: com o sim).
- M10: prazo de trânsito na política de envio e no produto.
- M11: presente como motivo de compra, em texto e foto.
- M12: título e descrição da home (vale ao vivo: com o sim).
- M13: coleção Gifts e etiquetas de ocasião (com o sim).

Nos itens que mexem no tema de hoje dentro da cópia, troque só o texto indicado, guarde o original em `otimizacao/original/` e nunca substitua um arquivo inteiro.

## Passo 10: a home nova no lugar da antiga (último passo, só com o sim, só na cópia)

A Shopify só usa `templates/index.json` como página inicial. Até aqui a home nova só abre com `?view=ofirelle-nova`. Explique isso ao dono e pergunte: "Posso pôr a home nova no lugar da antiga, só na cópia? A loja no ar não muda." Com o sim explícito, e só na pasta `../ofirelle-copia`:

```
cp templates/index.json templates/index.antes-ofirelle-nova.json
cp templates/index.ofirelle-nova.json templates/index.json
shopify theme push --store 2ffekn-xd.myshopify.com --theme COPIA_ID --path . --only templates/index.json --only templates/index.antes-ofirelle-nova.json
```

Abra `https://ofirelle.com/?preview_theme_id=COPIA_ID` (sem `view`) e confira que a home nova aparece. Sem o sim, não mexa e diga que a home nova só aparece com `?view=ofirelle-nova`. O `templates/product.json` nunca é tocado.

## Passo 11: entrega ao dono e fim

Entregue, em até 10 linhas e em português simples, só isto:

1. Os links de prévia (home e produto, passo 7), o nome da cópia no Admin e o link do editor.
2. **Com todas as letras:** a página do Petite Puffed Cross Necklace usa o modelo `ofirelle-nova`. Depois de publicar a cópia, ele abre o Admin, Produtos, Petite Puffed Cross Necklace, Modelo do tema, escolhe `ofirelle-nova` e salva. Sem isso, a página do colar continua a antiga. A home nova aparece ao publicar só se ele deu o sim do passo 10.
3. Em destaque, cada lugar que ainda espera foto própria, um por linha: a foto do desenho era de outra marca, só serviu de exemplo, e o lugar precisa da foto dele antes de anunciar.
4. Se `promo_ativa` está desligada, e o que falta para ligar: criar o desconto automático e provar o total de US$ 95,98 no carrinho.
5. O que foi feito, o resultado do `shopify theme check` e o que ficou pendente (sim que falta, coleção Gifts, consertos do Admin).
6. O que ele precisa olhar no celular antes de publicar e o que você não conseguiu testar.
7. Como publicar: Loja virtual, Temas, na cópia "Global Brand otimizado 2026-11-15", Publicar. Como voltar atrás: publicar de novo o tema antigo, que continua lá intacto.

Depois disso, pare. Não publique.
