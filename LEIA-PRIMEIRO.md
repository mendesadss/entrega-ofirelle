# Ofirelle: pacote da loja nova

Este pacote tem tudo para o seu Claude Code ou Codex montar a loja nova da Ofirelle (ofirelle.com) numa cópia do tema, sem mexer na loja que está no ar. Ele monta a home e a página do Petite Puffed Cross Necklace, pede o seu sim para preço, desconto, conjunto e promessa, entrega um link de prévia e para. Quem publica é você.

## O que tem aqui

- `INSTRUCOES-PARA-O-AGENTE.md`: o roteiro que o agente segue, do começo ao link de prévia.
- `CONTEXTO.md`: a análise inteira, com o porquê de cada mudança.
- `codigo-do-tema/`: o código da loja nova (seções, snippets, CSS, JS e os modelos `index.ofirelle-nova` e `product.ofirelle-nova`), pronto para a cópia do tema.
- `loja-nova/`: o desenho da loja nova em HTML (home e produto). Abra no navegador, com internet.
- `skill-shopify-dev/`: o guia de desenvolvimento Shopify que o agente instala antes de começar.
- `relatorio/analise.html` e `1-relatorio.pdf`: o relatório da análise.
- `2-instrucoes-para-o-claude.md`: o mesmo texto do botão Copiar instruções do relatório, com o código dentro.
- `4-fotos-novas/`: as 7 fotos novas, cada uma com a referência, a sua foto real para anexar e o prompt.
- `dados/`: os dados da pesquisa (catálogo, coletas das 5 referências, referências, nota, bancada).

## Antes de começar, você precisa ter

- O Shopify CLI instalado no computador (`shopify version` funciona no terminal).
- Acesso de dono, ou de colaborador com permissão de temas, na loja `2ffekn-xd.myshopify.com`.
- Menos de 20 temas na loja (Loja virtual, Temas). Com 20, a Shopify não deixa duplicar: apague antes um tema antigo que você escolher.
- As respostas das perguntas do fim deste arquivo.
- Opcional: um app da Shopify com token, se quiser que o agente faça também os consertos do Admin (preço riscado, menu, páginas, desconto). Sem ele, o agente te passa a lista pronta e você aplica.

## Os 3 passos

1. Baixe o arquivo `.zip` e descompacte.
2. Abra o Claude Code ou o Codex dentro da pasta descompactada e cole esta frase: `Leia o arquivo INSTRUCOES-PARA-O-AGENTE.md e execute`.
3. Quando o agente pedir, responda o sim (preço, desconto, conjunto, promessa e, no fim, pôr a home nova no lugar da antiga, só na cópia). Depois abra o link de prévia e confira no celular e no computador.

## Depois de publicar, falta um clique

O agente não publica nada. Se a prévia estiver boa, você publica a cópia "Global Brand otimizado 2026-11-15" em Loja virtual, Temas. **Logo depois, abra Produtos, Petite Puffed Cross Necklace, Modelo do tema, escolha `ofirelle-nova` e salve. Sem isso, a página do colar continua a antiga.** A home nova aparece ao publicar só se você deu o sim para o agente pôr a home nova no lugar da antiga, na cópia.

## A oferta de 3 colares (20%) só liga depois do desconto existir

A loja nova nasce sem prometer desconto nenhum. Só depois de criar em Descontos o desconto automático "Buy 3, get 20% off" (com o seu sim) e de provar no carrinho, com 3 colares de US$ 39,99, o total de US$ 95,98, o agente liga a caixa `promo_ativa` nas seções. Antes disso, nenhum texto da loja diz que o desconto está aplicado.

## Fotos de outras lojas

O desenho usa algumas fotos de outras lojas só como exemplo da cena. Elas nunca entram na sua loja: na cópia, esses lugares usam a foto reserva da própria Ofirelle até você fazer a sua foto (aba Fotos do relatório e pasta `4-fotos-novas/`). O agente lista o que ainda falta antes de você publicar.

## Perguntas que o agente vai fazer

- O código OFIR20 está ativo na sua loja? Você aceita trocar por desconto automático, sem código? O Baroque Pearl Toggle (US$ 44,99) entra nos 20%?
- Seu fornecedor tem documento que prove hypoallergenic e nickel-free? Sem ele, essas frases ficam fora.
- Qual o comprimento da corrente, o da extensora e o tamanho e o peso do pingente?
- Existe caixa de presente? Como ela é? Pode aparecer em foto? Existe cartão com mensagem?
- Qual o último dia de pedido para chegar antes do Natal e qual o prazo de entrega da transportadora?
- Qual o nome da empresa, o endereço e o telefone para o rodapé e as políticas? Se ainda não tiver, o agente deixa esse campo para você preencher.
- Aprova criar a coleção Gifts e as etiquetas de ocasião (batismo, primeira comunhão, crisma, mãe, Natal, aniversário, madrinha) nos produtos?
