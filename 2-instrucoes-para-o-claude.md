# Loja nova de ofirelle.com

Você é o Claude Code do dono da loja ofirelle.com. A Global Brand analisou a loja em 15/11/2026 e desenhou como ela deve ficar. Seu trabalho é montar isso numa **cópia do tema**, em rascunho, mostrar ao dono e parar. **Quem publica é o dono, no Admin da Shopify, depois de revisar. Você nunca publica.**

O dono não é técnico. Fale com ele em português simples, uma coisa por vez, e diga sempre onde clicar.

## Regras que valem do começo ao fim

1. Nunca publicar tema, nunca mudar o tema principal e nunca apagar tema, arquivo, produto, coleção ou página. **Foto de outra loja nunca é baixada nem enviada para a loja do dono (regra 9): o lugar fica vazio e usa a foto reserva da Ofirelle.**
2. Todo arquivo de tema é editado só na cópia criada no passo 2.
3. Mudança com `"precisa_confirmar": true` (preço, preço comparativo, desconto ou código, produto novo, kit, e tudo que vale na loja ao vivo na hora: foto de produto, menu, página, política e pagamento) só acontece depois de você mostrar ao dono a lista exata do que vai mudar e ele responder "sim".
4. Manter a marca da loja: as cores, as fontes e o estilo de botão do bloco "Marca" abaixo. Não criar paleta nova.
5. Não escrever avaliação, estrela, número de vendas ou de clientes, selo de "mais vendido" ou depoimento que a loja não tenha de verdade. Não dizer em nenhum texto da loja como os textos e as fotos foram feitos.
6. O acesso fica no arquivo `.env` desta pasta: `SHOPIFY_STORE` (o endereço `.myshopify.com`) e **um** destes dois: `SHOPIFY_ADMIN_TOKEN` (token `shpat_` do app criado no Admin) ou `SHOPIFY_CLIENT_ID` e `SHOPIFY_CLIENT_SECRET` (app criado no Dev Dashboard). Nunca mostrar token nem segredo no chat ou em log. Se o `.env` não existir ou estiver incompleto, peça ao dono para seguir a etapa 1 ("Antes de começar") da aba Executar do relatório que ele recebeu. Se ele preferir, use o caminho do app Theme Access descrito no passo 2.
7. Se o desenho tiver texto entre colchetes (por exemplo `[prazo]`), ele é marcador de um dado que só o dono sabe (prazo, garantia, endereço). Não inventar número: deixar o marcador como está e, no passo 8, dizer ao dono quais ainda estão em branco e que a loja não pode ir ao ar com colchete visível. O mesmo vale para `__` e para bloco com `hidden` e `data-preencher` (dado que falta) ou `data-depende` (depende de política publicada ou do sim do dono): na cópia, esse bloco nasce escondido e só aparece quando o dado existe ou a condição foi cumprida; nunca tirar o `hidden` sem isso. No código pronto do tema, o mesmo papel é do checkbox `mostrar` (ou `mostrar_sellos`) da seção: ele vem desligado e só se liga quando o dado existe e não sobra colchete.
8. Se algo der erro duas vezes no mesmo passo, parar e explicar ao dono em linguagem simples.
9. **Foto de outra loja nunca é baixada nem enviada para a loja do dono.** Não suba em Conteúdo, Arquivos, e não use em seção nem em produto. Onde o desenho usa foto de referência (lista "Fotos novas", `ilustracao_no_ar: true`), a cópia do tema deixa o campo de foto vazio, e a seção usa a foto reserva da própria Ofirelle (as 3 fotos do produto) até o dono mandar a foto nova. Os arquivos `home.html` e `produto.html` são só desenho: a imagem de outra loja que aparece neles é ilustração e tem de ser trocada antes de anunciar. No passo 8, liste em destaque cada lugar que ainda espera foto própria e explique: a foto do desenho é de outra marca, só serviu de exemplo, e o lugar precisa da foto dele antes de anunciar.

## Passo 1. Conferir o acesso (só leitura)

- Loja: `ofirelle.com`. O endereço `.myshopify.com` vem do `SHOPIFY_STORE` do `.env`. Se faltar, peça ao dono: no Admin, **Configurações**, **Domínios**, o endereço que termina em `.myshopify.com`.
- Token: com `SHOPIFY_ADMIN_TOKEN`, usar direto. Com `SHOPIFY_CLIENT_ID` e `SHOPIFY_CLIENT_SECRET`, pedir um token temporário com `POST https://<loja>.myshopify.com/admin/oauth/access_token` (corpo `grant_type=client_credentials`, `client_id`, `client_secret`) e guardar só na memória do script, nunca em arquivo; ele vence em algumas horas, então pedir de novo quando der 401. Conferir esse endereço na documentação oficial (shopify.dev) antes de usar.
- Usar o Admin GraphQL API na versão estável mais recente (`https://<loja>.myshopify.com/admin/api/<versão>/graphql.json`, cabeçalho `X-Shopify-Access-Token`). Antes de cada mutação, conferir na documentação oficial (shopify.dev) se o nome e os campos ainda são esses.
- Conferir os escopos com `currentAppInstallation { accessScopes { handle } }`. Precisa de `read_themes`, `write_themes`, `read_products`, `write_products`, `read_files`, `write_files`, `read_discounts`, `write_discounts`, `read_online_store_navigation`, `write_online_store_navigation`, `read_content` e `write_content`. Úteis se o plano mexer nisso: `write_legal_policies` (políticas), `write_locales` (traduções) e `read_markets`/`write_markets` (países de venda); sem eles, esses itens viram passo manual. Faltou escopo: explicar ao dono onde marcar e esperar. Sem os de navegação e conteúdo, menu e página do plano viram `admin_manual` (o dono faz no Admin, você explica onde clicar).
- Listar os temas (`themes(first: 20) { nodes { id name role } }`) e anotar o principal (`role: MAIN`). Tema atual esperado: Atelier 4.4.0.

## Passo 2. Duplicar o tema principal

- Antes, contar os temas (passo 1). A Shopify guarda no máximo 20: com 20, a duplicação falha sem avisar. Se houver 20, parar e pedir ao dono para apagar um tema antigo que ele escolher (você não apaga).
- Mutação `themeDuplicate(id: <id do tema principal>, name: "Global Brand otimizado 2026-11-15")`. Anotar o id da cópia; o `role` precisa ser `UNPUBLISHED`.
- Se a Shopify recusar a escrita de tema pelo token, não insistir. Caminho seguro, nesta ordem:
  1. Pedir ao dono para instalar o app gratuito **Theme Access** da Shopify, gerar uma senha e guardar no `.env` como `SHOPIFY_CLI_THEME_TOKEN`. Usar o Shopify CLI com `--store <loja>.myshopify.com --password "$SHOPIFY_CLI_THEME_TOKEN"`: `shopify theme pull --theme <id principal>` e depois `shopify theme push --unpublished --theme "Global Brand otimizado 2026-11-15"`.
  2. Se nem isso der, pedir ao dono para duplicar à mão (Loja virtual, Temas, três pontinhos, Duplicar) e informar o nome da cópia.

## Passo 3. Fotografar o antes

Print da home e da página do produto principal, em 390x844 e 1440x900, do tema principal. Guardar em `otimizacao/antes/`. A prévia da cópia abre em `https://ofirelle.com/?preview_theme_id=<id da cópia>`; a loja nova abre em `https://ofirelle.com/?preview_theme_id=<id da cópia>&view=ofirelle-nova` (home) e `https://ofirelle.com/products/petite-puffed-cross-necklace?preview_theme_id=<id da cópia>&view=ofirelle-nova` (produto).


## Passo 4. Montar a loja nova na cópia

O desenho da loja nova está nos dois arquivos de referência no fim deste texto (`home.html` e `produto.html`). Eles mostram o layout, a ordem das seções, os textos, a oferta e as fotos. Seu trabalho é fazer a cópia do tema ficar igual a eles, do jeito Shopify.

**Se este texto tiver o bloco "Código pronto do tema" (mais abaixo), o trabalho pesado já está feito:** o código foi escrito com a skill de desenvolvimento Shopify da Global Brand e validado com o `shopify theme check`. Se você recebeu o link do artefato, os mesmos arquivos estão publicados nele em `pacote/codigo-do-tema/` (no zip do Baixar tudo, na pasta `codigo-do-tema/`) (leia cada um com a ferramenta de artefato, `read` com `path`; o que termina em `.liquid.txt` ou `.json.txt` se grava no tema sem o `.txt`). Grave cada arquivo daquele bloco na cópia, no caminho indicado no título de cada arquivo, sem reescrever (nenhum arquivo existente é trocado; se algum nome já existir na cópia, pare e avise o dono). Depois abra o editor de temas da cópia e preencha o que o `LEIA` do bloco manda (produto de cada cartão do pack, fotos). Só então siga os itens abaixo para conferir e ajustar o que não ficou igual ao desenho. Se um arquivo der erro ao gravar, leia a mensagem, corrija só aquele trecho e grave de novo.

1. Ler o tema da cópia (templates `index.json` e `product*.json`, `sections/`, `snippets/`, `assets/`, `config/settings_data.json`). Guardar o original de todo arquivo que mexer em `otimizacao/original/`.
2. Para cada seção do desenho, de cima para baixo: usar a seção nativa do tema se ela já faz aquilo; se não fizer, criar uma seção nova `sections/gb-<nome>.liquid`, com `{% schema %}` e blocos editáveis, para o dono mudar texto e foto depois pelo editor de temas. CSS da seção dentro dela ou em `assets/gb-loja.css`.
3. Nada de preço, nome ou variante escrito à mão na cópia do tema: preço, variantes, estoque e botão de comprar vêm do produto real em Liquid (`product`, `product.variants`, `product.selected_or_first_available_variant`, `form 'product'`). O desenho de referência tem ids de variante, preços e lista de esgotados fixos só para a prévia funcionar; não copiar esses valores, trocar cada um pelo dado do Liquid. O botão de comprar tem que funcionar e levar ao carrinho.
4. Montar a home em `templates/index.ofirelle-nova.json` e o produto em `templates/product.ofirelle-nova.json` (do código pronto). Nunca grave em `templates/index.json` nem em `templates/product.json`. Sem o código pronto, crie um template alternativo com outro nome; não edite o existente. A prévia abre com `view=ofirelle-nova` (home e produto). A home nova só passa para o `templates/index.json` da cópia no último passo (passo 8), com o sim do dono. O produto Petite Puffed Cross Necklace passa a usar o template `ofirelle-nova` pelo Admin (Produtos, Petite Puffed Cross Necklace, Modelo do tema), com o sim do dono.
5. Gravar na cópia com `themeFilesUpsert(themeId: <id da cópia>, files: [...])` (ou `shopify theme push --only <arquivo>` no caminho do CLI). Nunca no tema principal.
6. A oferta do bloco "Oferta" abaixo (kits, preço por quantidade, adicional) mexe em produto e preço: mostrar ao dono exatamente o que vai criar ou mudar (produto do kit, preço, foto, variantes), esperar o "sim" e só então criar, com `productCreate`/`productVariantsBulkCreate` ou `productVariantsBulkUpdate`. Produto novo nasce com `status: DRAFT`. Mudança de preço em produto que já existe (inclusive apagar o preço riscado) vale na loja ao vivo na hora: avisar o dono disso e só aplicar com um segundo "sim", de preferência junto da publicação do tema. Anotar tudo em `otimizacao/volta-atras.md`. Sem o "sim", montar o bloco da oferta ligado só ao que já existe e avisar o que falta. **A caixa `promo_ativa` das seções nasce desligada e a loja não promete desconto nenhum até lá. Só ligue `promo_ativa` depois de criar o desconto automático (com o sim do dono) e de provar no carrinho, com 3 colares, o total de US$ 95,98. Antes disso, deixe desligado e tire do texto "Buy 3, get 20% off".** Pergunte ao dono se o código OFIR20 está ativo antes de criar o desconto automático (não duplicar desconto).
7. Conferir cada página na prévia, no celular e no computador, contra o desenho. Não ficou igual: corrigir uma vez; não ficou de novo, anotar como pendente e seguir.

## Passo 5. Fotos

- A lista "Fotos novas" abaixo tem, para cada lugar: a foto de referência (`referencia_url`, de outra loja), a foto real do dono para anexar (`foto_real_para_anexar`) e o prompt. O dono gera as fotos na aba **Fotos** do artefato e sobe em Conteúdo, Arquivos.
- Monte com as fotos reais da loja onde existem. Onde o desenho usa foto de outra loja, deixe o campo vazio: a seção usa a foto reserva da própria Ofirelle (regra 9).
- Depois pergunte ao dono: "Você já fez as fotos novas? Se sim, cole a lista: Foto 1: endereço, Foto 2: endereço...". Para cada endereço recebido, troque a foto daquele lugar na cópia (`shopify://shop_images/...` no `settings` da seção, ou a mídia do produto com `productCreateMedia` depois do "sim" dele; foto de produto vai ao ar na loja e no Google na hora: avisar antes de pedir o sim).
- Se a seção tiver a opção de recorte (`usar_recorte`), desmarque ao pôr a foto nova.
- No fim, diga quais lugares ainda esperam foto própria (com a foto reserva) e quais ainda usam as fotos de hoje.


## Passo 6. Ajustes do plano

Para cada item de `mudancas` do plano abaixo que ainda não foi feito no passo 4, na ordem: ler o arquivo, guardar o original, mudar só na cópia, conferir o `pronto_quando` na prévia. Item de produto ou preço: mostrar a lista, esperar o "sim", aplicar e anotar o valor antigo em `otimizacao/volta-atras.md`. Item `admin_manual`: explicar ao dono, passo a passo, onde clicar.

## Passo 7. Fotografar o depois e conferir

- Mesmos prints do passo 3, agora da cópia, em `otimizacao/depois/`.
- Conferir: nenhuma rolagem lateral no celular; botão de comprar visível na primeira tela do produto no celular; textos legíveis sobre fotos; pôr 1 item no carrinho como visitante funciona (finalizar compra não).
- Comparar com o desenho e com a marca: mesmas cores, mesmas fontes, mesmo estilo de botão.

## Passo 8. Entregar ao dono e parar

**Último passo antes da resposta final: a home nova no lugar da antiga, só na cópia e só com o sim do dono.** A Shopify só usa `templates/index.json` como página inicial; até aqui a home nova só abre com `view=ofirelle-nova` no endereço. Explique isso ao dono e pergunte: "Posso pôr a home nova no lugar da antiga, só na cópia? A loja no ar não muda." Com o sim explícito, e só na cópia:
1. salve o `templates/index.json` da cópia como `templates/index.antes-ofirelle-nova.json`;
2. copie o conteúdo de `templates/index.ofirelle-nova.json` para o `templates/index.json` da cópia, para a home nova aparecer quando o dono publicar a cópia;
3. abra a prévia da cópia sem `view` e confira que a home nova aparece.
Sem o sim, não mexa no `templates/index.json` e avise que a home nova só aparece com `view=ofirelle-nova`.

Responder em até 10 linhas, em português simples:
- **com todas as letras:** a página do Petite Puffed Cross Necklace usa o template `ofirelle-nova`. Depois de publicar a cópia, o dono abre o Admin, Produtos, Petite Puffed Cross Necklace, Modelo do tema, escolhe `ofirelle-nova` e salva; sem isso, a página do colar continua a antiga. A home nova aparece ao publicar a cópia só se ele deu o sim acima; senão, só com `view=ofirelle-nova`;
- os links de prévia da cópia: home `https://ofirelle.com/?preview_theme_id=<id>&view=ofirelle-nova` e produto `https://ofirelle.com/products/petite-puffed-cross-necklace?preview_theme_id=<id>&view=ofirelle-nova` (o produto novo só aparece nesse link com o produto ligado ao template, o que exige o sim do dono), o nome dela no Admin e o caminho para abrir a prévia pelo Admin (Loja virtual, Temas, três pontinhos da cópia, Pré-visualizar): o link sozinho pode cair no tema publicado, porque a prévia depende do login no Admin e, em loja com senha, da senha já digitada no mesmo navegador;
- o que foi feito e o que ficou pendente (ou esperando o sim dele, ou esperando foto);
- **em destaque, cada lugar que ainda espera foto própria** (regra 9), uma por linha: a foto do desenho é de outra marca, só serviu de exemplo, e o lugar precisa da foto dele antes de anunciar;
- o que ele precisa olhar no celular antes de publicar;
- como publicar: Loja virtual, Temas, na cópia "Global Brand otimizado 2026-11-15", Publicar. Como voltar atrás: publicar de novo o tema antigo, que continua lá intacto.

Depois disso, pare. Publicar é decisão do dono, feita por ele no Admin com um clique; se ele pedir para você publicar, mostre esse caminho.

## Marca da loja (não inventar fora disto)

```json
{
  "nome": "Ofirelle",
  "lida_em": "2026-11-15",
  "origem": [
    "https://ofirelle.com/",
    "https://ofirelle.com/products/petite-puffed-cross-necklace"
  ],
  "tema": {
    "nome": "Atelier",
    "versao": "4.4.0",
    "id": 189456187696
  },
  "logo": {
    "src": "https://ofirelle.com/cdn/shop/files/ofirelle-logo.png?height=36&v=1793643937",
    "largura": 256
  },
  "cores": {
    "fundo": "rgb(251, 250, 247)",
    "texto": "rgb(31, 42, 68)",
    "titulo": "rgb(31, 42, 68)",
    "cabecalho_fundo": "rgb(251, 250, 247)",
    "cabecalho_texto": "rgb(31, 42, 68)",
    "aviso_fundo": null,
    "aviso_texto": "rgb(251, 250, 247)",
    "botao_fundo": "rgb(31, 42, 68)",
    "botao_degrade": null,
    "botao_texto": "rgb(251, 250, 247)",
    "promocao": null,
    "rodape_fundo": null,
    "rodape_texto": "rgb(31, 42, 68)"
  },
  "fontes": {
    "titulo": "Newsreader",
    "titulo_pilha": "Newsreader, serif",
    "titulo_peso": "200",
    "titulo_caixa": "none",
    "titulo_espaco": "normal",
    "texto": "Red Hat Text",
    "texto_pilha": "\"Red Hat Text\", sans-serif"
  },
  "botao": {
    "raio": "0px",
    "caixa": "uppercase",
    "espaco_letras": "normal",
    "borda": null,
    "peso": "400"
  }
}
```

## Plano de mudanças

```json
{
  "loja": "ofirelle.com",
  "tema_atual": {
    "nome": "Atelier",
    "versao": "4.4.0"
  },
  "nome_tema_novo": "Global Brand otimizado 2026-11-15",
  "mudancas": [
    {
      "id": "M1",
      "conserto": 1,
      "pagina": "políticas e contato",
      "tipo": "admin_manual",
      "o_que": "Criar as políticas de reembolso, envio e termos no lugar nativo da Shopify e preencher o contato com e-mail, nome da empresa e endereço.",
      "por_que": "Reembolso, envio, termos e contato dão 404 em /policies. O Google Merchant e o cliente procuram essas páginas primeiro, e o contato hoje é só um formulário.",
      "como": "No Admin, em Configurações, Políticas, preencher: reembolso (30 dias, peça sem uso e na embalagem), garantia de 1 ano com condições escritas, envio (processamento de 1 a 3 dias úteis, prazo de trânsito, frete grátis acima de US$ 50), termos e informações de contato com support@ofirelle.com. Pedir ao dono o nome da empresa e o endereço. Trocar o título da página Contato por Contact e acrescentar e-mail e endereço. Conferir o menu do rodapé apontando para as políticas novas. Se o dono ainda não tem nome da empresa e endereço para publicar, deixar esse campo para ele preencher e avisar. As páginas /pages/*-policy e os links do rodapé existem hoje, com 1 a 3 frases cada: reaproveitar o texto e ampliar.",
      "pronto_quando": "As quatro URLs /policies/refund-policy, shipping-policy, terms-of-service e contact-information abrem com texto, e a página Contact mostra e-mail e endereço em inglês.",
      "precisa_confirmar": true
    },
    {
      "id": "M2",
      "conserto": 2,
      "pagina": "todas",
      "tipo": "preco",
      "o_que": "Tirar o preço comparativo (Compare-at price) dos 10 colares e a frase Fall Sale da barra de aviso.",
      "por_que": "Os produtos foram criados em 13/11/2026, então não existe preço anterior real. Desconto sobre preço que nunca existiu engana a cliente e pode reprovar a loja no Google.",
      "como": "Listar os produtos com compareAtPrice preenchido e mostrar a lista ao dono. Só com o sim dele, zerar o preço comparativo das variantes (Admin, Produtos, edição em massa, ou productVariantsBulkUpdate). Depois procurar \"Fall Sale\" nos textos da barra de aviso e nas traduções do tema e trocar por \"Free US shipping over $50\". Conferir se o selo SALE some das coleções.",
      "pronto_quando": "Nenhum colar mostra preço riscado nem selo SALE na coleção, no produto e no carrinho, e a barra de aviso não cita 45% off.",
      "precisa_confirmar": true
    },
    {
      "id": "M3",
      "conserto": 3,
      "pagina": "produto, coleção e carrinho",
      "tipo": "tema",
      "o_que": "Mostrar a oferta Buy 3, Get 20% off no produto e no carrinho, com desconto automático e barra até o frete grátis e até o terceiro colar.",
      "por_que": "Hoje a oferta é um código (OFIR20) que só aparece na home. A cliente precisa lembrar e digitar.",
      "como": "Primeiro perguntar ao dono se o código OFIR20 está ativo e se aceita trocar por desconto automático (Admin, Descontos). Na cópia do tema, procurar \"Discounts calculated at checkout\" e o bloco de preço do produto e acrescentar cartões de 1, 2 e 3 colares com a conta real: 1 = US$ 39,99; 2 = US$ 79,98 com frete grátis; 3 = US$ 95,98, US$ 31,99 cada, economia de US$ 23,99. No carrinho, acrescentar uma barra de progresso até US$ 50 e até o terceiro colar. Usar os blocos nativos do tema quando existirem. Com o sim do dono, criar em Descontos um desconto automático 'Buy 3, get 20% off' (20% de desconto em produtos, quantidade mínima 3, só colares; decidir com o dono se mantém o OFIR20 e se pode combinar com outros, e se o Baroque Pearl Toggle, de US$ 44,99, entra). Só depois ligar `promo_ativa` no tema; antes disso, deixar desligado e tirar do texto 'Buy 3, get 20% off'.",
      "pronto_quando": "O desconto aplica sozinho no carrinho com 3 colares, o produto mostra os 3 cartões com os valores acima e o carrinho mostra a barra de progresso, e há print do carrinho com 3 colares de US$ 39,99 mostrando o total de US$ 95,98.",
      "precisa_confirmar": true
    },
    {
      "id": "M4",
      "conserto": 4,
      "pagina": "produto e carrinho",
      "tipo": "tema",
      "o_que": "Pôr o botão de comprar na primeira tela do celular, escrever as medidas e corrigir a frase de imposto e a aba Care.",
      "por_que": "No celular a primeira tela termina em Color Gold, sem botão. Sem medida a cliente não sabe o tamanho. A aba Care fala de prata esterlina numa peça de aço inox.",
      "como": "Na cópia do tema, no template do produto, subir o bloco do botão de compra ou ativar o botão fixo no celular, logo abaixo do preço. Procurar \"Taxes included.\" nos arquivos do tema e nas traduções e trocar por \"Shipping calculated at checkout.\" depois de conferir em Configurações, Impostos se os preços incluem imposto. Procurar \"Sterling silver\", apagar a frase e escrever na aba Care: \"Put it on after perfume and lotion. Wipe it with a soft cloth.\" Escrever comprimento da corrente, da extensora e tamanho do pingente com os dados do dono.",
      "pronto_quando": "No celular, nome, preço e botão de comprar aparecem juntos na primeira tela, as medidas estão escritas e a busca por \"Sterling silver\" e \"Taxes included\" não acha nada.",
      "precisa_confirmar": true
    },
    {
      "id": "M5",
      "conserto": 5,
      "pagina": "home, produto e política",
      "tipo": "tema",
      "o_que": "Tirar hypoallergenic, nickel-free e finished by hand, e escrever as condições da garantia de 1 ano.",
      "por_que": "São promessas de saúde e de material sem documento do fornecedor. A garantia sem condições gera conflito com a cliente.",
      "como": "Na cópia do tema, procurar \"hypoallergenic\", \"nickel-free\" e \"finished by hand\" nos arquivos, nas traduções e na descrição dos produtos (Admin) e tirar. Manter só se o dono mandar o documento do fornecedor. Na política de reembolso, escrever o que a garantia cobre, o que não cobre e como pedir (e-mail com número do pedido e foto). Trocar a faixa \"Every piece is covered against defects, and we will make it right\" por \"1-year warranty against manufacturing defects.\" e a faixa de rodapé \"Stainless steel, nickel-free and hypoallergenic, finished by hand.\" por \"Gold-tone stainless steel.\"",
      "pronto_quando": "A busca pelos três termos não acha nada na loja, e a política de garantia traz as condições escritas.",
      "precisa_confirmar": true
    },
    {
      "id": "M6",
      "pagina": "menu e home",
      "tipo": "tema",
      "o_que": "Tirar Earrings e Bracelets do menu e da home enquanto as coleções estão vazias.",
      "por_que": "Coleções vazias levam a páginas sem produto e passam descuido.",
      "como": "Na cópia do tema, procurar \"Earrings\" e \"Bracelets\" no menu e nas seções da home e esconder os cartões. Reativar quando houver produto.",
      "pronto_quando": "Menu e home mostram só coleções com produto.",
      "precisa_confirmar": true
    },
    {
      "id": "M7",
      "pagina": "home",
      "tipo": "tema",
      "o_que": "Mostrar uma cruz na primeira tela da home no lugar do colar de gota.",
      "por_que": "A primeira imagem deve mostrar o que a loja vende.",
      "como": "No editor do tema, na seção de abertura da home, trocar a imagem pela foto `petite-puffed-cross-necklace-2.jpg` (a da própria Ofirelle com a cruz) até a sessão de fotos; depois trocar pela foto de pescoço do M8. Procurar \"Timeless & Meaningful\" para achar o bloco.",
      "pronto_quando": "A primeira tela da home mostra um colar de cruz.",
      "precisa_confirmar": false
    },
    {
      "id": "M8",
      "pagina": "produtos",
      "tipo": "produto",
      "o_que": "Fazer mais fotos próprias: pescoço com escala, mão, caixa de presente e macro do fecho.",
      "por_que": "Só há 3 fotos por produto e parecem artificiais. A loja promete gift-ready sem mostrar a caixa.",
      "como": "Pedir ao dono as fotos novas, subir em Admin, Produtos, Mídia, e reordenar com a foto de pescoço em segundo lugar. Não usar foto de outra loja.",
      "pronto_quando": "Cada colar tem pelo menos 5 fotos reais, incluindo caixa e fecho.",
      "precisa_confirmar": true
    },
    {
      "id": "M9",
      "pagina": "produtos e home",
      "tipo": "admin_manual",
      "o_que": "Salvar a foto principal em formato mais leve.",
      "por_que": "A imagem principal é PNG de 3840 px; o tempo de carga no laboratório foi 4,9 s no produto e 4,3 s na home.",
      "como": "Exportar as imagens em JPG ou WebP com 1600 px no lado maior e subir de novo no Admin. Rodar o teste de velocidade do celular de novo.",
      "pronto_quando": "A imagem principal pesa menos de 300 KB e o tempo de carga cai.",
      "precisa_confirmar": true
    },
    {
      "id": "M10",
      "pagina": "política de envio",
      "tipo": "admin_manual",
      "o_que": "Escrever o prazo de trânsito na política de envio e no produto.",
      "por_que": "Hoje a política diz que o prazo aparece no finalizar compra.",
      "como": "Pedir ao dono o prazo real da transportadora e escrever na política de envio e logo abaixo do botão do produto.",
      "pronto_quando": "O prazo em dias úteis aparece na política e no produto.",
      "precisa_confirmar": true
    },
    {
      "id": "M11",
      "pagina": "produto e home",
      "tipo": "tema",
      "o_que": "Usar presente como motivo de compra no texto e nas fotos.",
      "por_que": "A loja promete gift-ready, mas pouco fala de batismo, aniversário e presente.",
      "como": "Na cópia do tema, procurar o bloco de texto do produto e acrescentar uma linha de presente. Depois das fotos da caixa (M8), mostrar a caixa na galeria.",
      "pronto_quando": "O produto e a home citam presente com texto e foto.",
      "precisa_confirmar": false
    },
    {
      "id": "M12",
      "pagina": "home",
      "tipo": "tema",
      "o_que": "Escrever título e descrição da home para aparecer melhor no Google.",
      "por_que": "A home tem o título \"Ofirelle\" e nenhuma descrição.",
      "como": "No Admin, em Preferências, escrever título e descrição da página inicial.",
      "pronto_quando": "A home tem título e descrição de até 160 caracteres.",
      "precisa_confirmar": true
    },
    {
      "id": "M13",
      "pagina": "menu, home e produto",
      "tipo": "admin_manual",
      "o_que": "Criar a coleção Gifts e as etiquetas de ocasião nos produtos.",
      "por_que": "A loja só tem as coleções Faith e Necklaces. O menu, o botão Shop gifts e os cartões de ocasião da loja nova apontam para /collections/gifts, que hoje não existe.",
      "como": "Com o sim do dono, criar a coleção Gifts e dar aos produtos as etiquetas baptism, communion, confirmation, mom, christmas, birthday e godmother. Os links de ocasião usam o formato /collections/gifts?filter.p.tag=<etiqueta>. Até lá, deixar os links de ocasião e o botão Shop gifts apontando para /collections/necklaces.",
      "pronto_quando": "A coleção Gifts abre com produtos e cada link de ocasião mostra só os colares com a etiqueta.",
      "precisa_confirmar": true
    }
  ]
}
```


## Oferta da loja nova (preço e kit só com o "sim" do dono)

```json
{
  "titulo": "Build your faith set: Buy 3, save 20% (proposta: só vale depois que o dono criar o desconto automático)",
  "itens": [
    "1 necklace: $39.99",
    "2 necklaces: $79.98, free US shipping (over $50)",
    "3 necklaces: $95.98, about $31.99 each, save $23.99 (3 x 39.99 = $119.97, riscado), marcado Best value",
    "Conjunto pronto do produto: The Everyday Grace Set = Petite Puffed Cross + Sideways Cross with Crystal + Infinity Cross, $95.98",
    "Segundo conjunto (home): The Blessing Set = Enamel Cross Medallion + Dove Cross + Double Cross, $95.98"
  ],
  "precisa_confirmar": [
    "Criar o desconto automático Buy 3, get 20% off e desativar ou manter o código OFIR20",
    "Confirmar se o OFIR20 está ativo hoje",
    "Regra com o Baroque Pearl Toggle ($44.99): entra nos 20%, mas fica fora dos conjuntos prontos",
    "Tirar o preço comparado (69.99 e 79.99) e o selo SALE de todos os produtos"
  ]
}
```

## Seções, de cima para baixo

```json
{
  "home": [
    "hero",
    "mais-vendidos",
    "ocasioes",
    "como-funciona",
    "camadas-prontas",
    "todo-dia",
    "ophir",
    "promessa",
    "perguntas",
    "cadastro"
  ],
  "produto": [
    "galeria-compra",
    "beneficios",
    "no-pescoco",
    "detalhe",
    "medida",
    "conjunto",
    "presente",
    "ophir",
    "selos",
    "cuidados",
    "perguntas",
    "avaliacoes",
    "combine-com"
  ]
}
```

## Fotos (lugar por lugar)

```json
[
  {
    "foto": 1,
    "pagina": "produto",
    "onde": "galeria-compra, foto principal; no-pescoco",
    "usar_agora": "petite-puffed-cross-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 2,
    "pagina": "produto",
    "onde": "galeria-compra; detalhe",
    "usar_agora": "petite-puffed-cross-necklace-3.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 3,
    "pagina": "produto",
    "onde": "galeria-compra; conjunto; card",
    "usar_agora": "petite-puffed-cross-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 4,
    "pagina": "produto",
    "onde": "conjunto e combine-com",
    "usar_agora": "sideways-cross-crystal-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 5,
    "pagina": "produto",
    "onde": "conjunto",
    "usar_agora": "infinity-cross-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 6,
    "pagina": "produto",
    "onde": "combine-com",
    "usar_agora": "layered-cross-crystal-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 7,
    "pagina": "produto",
    "onde": "combine-com",
    "usar_agora": "dove-cross-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 8,
    "pagina": "home",
    "onde": "hero; como-funciona (For you)",
    "usar_agora": "petite-puffed-cross-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 9,
    "pagina": "home",
    "onde": "mais-vendidos",
    "usar_agora": "asymmetric-cross-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 10,
    "pagina": "home",
    "onde": "mais-vendidos; camadas-prontas",
    "usar_agora": "enamel-cross-pendant-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 11,
    "pagina": "home",
    "onde": "ocasioes; como-funciona",
    "usar_agora": "enamel-cross-pendant-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 12,
    "pagina": "home",
    "onde": "ocasioes; como-funciona",
    "usar_agora": "dove-cross-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 13,
    "pagina": "home",
    "onde": "ocasioes",
    "usar_agora": "layered-cross-crystal-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 14,
    "pagina": "home",
    "onde": "todo-dia",
    "usar_agora": "infinity-cross-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 15,
    "pagina": "home",
    "onde": "todo-dia",
    "usar_agora": "sideways-cross-crystal-necklace-2.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 16,
    "pagina": "home",
    "onde": "camadas-prontas",
    "usar_agora": "double-cross-necklace-1.jpg",
    "trocar": false,
    "motivo": "foto própria da Ofirelle"
  },
  {
    "foto": 17,
    "pagina": "produto",
    "onde": "galeria-compra; no-pescoco",
    "usar_agora": "ref-maos-039.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "lainly.com",
    "prompt": "Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. A woman's hand resting on her chest, fingertips lightly holding the Petite Puffed Cross Necklace at the base of her neck, cream knit top, warm side window light, close crop from chin to chest, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 18,
    "pagina": "produto",
    "onde": "galeria-compra; detalhe",
    "usar_agora": "ref-macro-004.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "hoperings.com",
    "prompt": "Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. Macro of the same necklace's lobster clasp and extender chain laid on champagne satin, soft warm light, shallow depth of field, 1:1. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 19,
    "pagina": "produto",
    "onde": "conjunto; home camadas-prontas",
    "usar_agora": "ref-camadas-145.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "atoleajewelry.com",
    "prompt": "Attach the real Ofirelle photo petite-puffed-cross-necklace-2.jpg, sideways-cross-crystal-necklace-1.jpg and infinity-cross-necklace-1.jpg as the product reference. Neck and collarbone of a woman wearing three Ofirelle necklaces layered at three heights: the Petite Puffed Cross at the base of the neck, the Sideways Cross with Crystal in the middle, the Infinity Cross lowest; beige ribbed top, warm natural light, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 20,
    "pagina": "home",
    "onde": "camadas-prontas (Blessing)",
    "usar_agora": "ref-camadas-140.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "atoleajewelry.com",
    "prompt": "Attach the real Ofirelle photo enamel-cross-pendant-necklace-1.jpg, dove-cross-necklace-1.jpg and double-cross-necklace-1.jpg as the product reference. A woman wearing the Enamel Cross Medallion, Dove Cross and Double Cross necklaces layered over a soft camel sweater, close crop from chin to chest, warm natural light, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 21,
    "pagina": "produto",
    "onde": "presente; home ocasioes (Christmas)",
    "usar_agora": "ref-presente-001.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "hoperings.com",
    "prompt": "Só gerar depois que o dono confirmar a caixa real e como ela é. Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. The Petite Puffed Cross Necklace inside an open plain cream gift box on champagne satin, soft warm light from the side, 4:5. Use the real Ofirelle box only after the owner confirms it exists. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 22,
    "pagina": "produto",
    "onde": "ophir; home ophir",
    "usar_agora": "ref-editorial-089.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "sundayandstone.com",
    "prompt": "Attach the real Ofirelle photo petite-puffed-cross-necklace-1.jpg as the product reference. The Petite Puffed Cross Necklace resting on a pale ancient stone with a small olive branch, warm late afternoon light, quiet and minimal, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  },
  {
    "foto": 23,
    "pagina": "home",
    "onde": "todo-dia",
    "usar_agora": "ref-hero-127.jpg",
    "trocar": true,
    "motivo": "foto de referência de outra loja, só no desenho; trocar pela foto própria",
    "origem_loja": "atoleajewelry.com",
    "prompt": "Attach the real Ofirelle photo petite-puffed-cross-necklace-2.jpg as the product reference. A woman outdoors in warm golden hour light, face turned down in profile, hand near her hair, wearing the Petite Puffed Cross Necklace at the base of her neck, cream linen shirt, natural skin texture, 4:5. Keep the exact same pendant shape, size, chain and gold-tone finish as the reference; no text, no logos, no other jewelry brand."
  }
]
```

## Fotos novas (referência, foto real para anexar e prompt)

```json
[
  {
    "foto": 1,
    "pagina": "produto",
    "onde": "Galeria de compra, foto no pescoço (mão no peito)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0930/1858/7481/files/1_6e01cc3f-8b9f-4d00-a2a9-5caad1e6953c.png?v=1774266622",
    "referencia_loja": "lainly.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188",
    "prompt": "Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: close crop from chin to chest of a woman in her 30s with fair to medium skin, no visible tattoos, one hand resting naturally on her chest with fingertips lightly holding the pendant at the base of her neck, relaxed natural fingers. Cream knit top. Soft warm window light from the left, medium-soft shadows, warm 3500K, gentle highlights on the gold-tone metal. Shot on 85mm at f/2.8, shallow depth of field with the pendant and fingertips sharp, softly blurred warm cream background (#FBFAF7 tone). Vertical 4:5, pendant in the lower third of the frame. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": null
  },
  {
    "foto": 2,
    "pagina": "produto",
    "onde": "Galeria de compra, detalhe (fecho e extensor)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0519/6100/4203/files/4IMAGE.jpg?v=1778778736",
    "referencia_loja": "hoperings.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188",
    "prompt": "Use the attached photo as the exact product reference. Product: the same gold-tone stainless steel thin cable chain and the small puffed cross pendant from the reference, with a standard lobster clasp and a short extender chain. Scene: macro of the lobster clasp and extender chain gently curled on champagne satin with soft folds, the puffed cross pendant visible softly out of focus at the edge of the frame. Soft warm diffused light from the upper left, warm 3500K, small natural highlights on the metal. 100mm macro lens, f/4, shallow depth of field with the clasp sharp. Champagne and cream palette, square 1:1. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": "A foto real não mostra o fecho. Se o dono fotografar o fecho de perto com o celular, essa foto vale mais que a gerada."
  },
  {
    "foto": 3,
    "pagina": "produto e home",
    "onde": "Conjunto (produto) e Camadas prontas (home)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0459/0744/3880/files/pearl-cross-pendant.jpg?v=1710749193",
    "referencia_loja": "atoleajewelry.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188",
    "prompt": "Use the attached photo as the exact product reference. Attach three reference photos: the Petite Puffed Cross, the Sideways Cross with a small crystal and the Infinity outline Cross, all gold-tone stainless steel with thin cable chains; copy each pendant exactly. Scene: neck and collarbone of a woman in her 30s, no visible tattoos, wearing the three necklaces layered at three heights: the puffed cross at the base of the neck, the sideways cross with crystal in the middle, the infinity cross lowest, chains never tangled and clearly separated. Beige ribbed top. Soft warm natural light from the side, warm 3500K, gentle gold reflections. 85mm, f/2.8, background warm beige out of focus, crop from chin to upper chest, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": "Se o gerador de imagem errar um dos três pingentes, vale tirar a foto real do dono usando os três colares."
  },
  {
    "foto": 4,
    "pagina": "home",
    "onde": "Camadas prontas (Blessing)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0459/0744/3880/files/simple-gold-cross-chain.png?v=1764087611",
    "referencia_loja": "atoleajewelry.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-1.png?v=1794614797",
    "prompt": "Use the attached photo as the exact product reference. Attach three reference photos: the Enamel Cross Medallion (white enamel medallion with a cross), the Dove Cross with cut-out dove and the Double Cross, all gold-tone stainless steel with thin chains; copy each pendant exactly. Scene: a woman in her 30s, no visible tattoos, wearing the three necklaces layered at three clearly separate heights over a soft camel knit sweater, close crop from chin to chest. Soft warm natural light from the side, warm 3500K, gentle highlights on the metal. 85mm, f/2.8, softly blurred warm neutral background, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": "Três pingentes diferentes de uma vez erram com facilidade. Se falhar duas vezes, usar a foto real do dono."
  },
  {
    "foto": 5,
    "pagina": "produto e home",
    "onde": "Presente (produto) e Ocasiões, Christmas (home)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0519/6100/4203/files/1_26992984-bb2a-44e9-88b5-b72c2cd86e8a.png?v=1778865825",
    "referencia_loja": "hoperings.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188",
    "prompt": "Só gerar depois que o dono confirmar a caixa real e como ela é. Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: the necklace lying inside an open plain cream gift box with no printing, the puffed cross centered, chain softly curved, on champagne satin. Soft warm light from the left, warm 3500K, gentle shadow under the box. 50mm, f/5.6, top-down three quarter angle, vertical 4:5, cream and champagne palette. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": "Só usar depois que o dono confirmar que a embalagem de presente existe e como ela é. Se for diferente, fotografar a caixa real."
  },
  {
    "foto": 6,
    "pagina": "produto e home",
    "onde": "Ophir (história da marca)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/1008/2949/5588/files/cross-inside-pearls-necklace-1042996.png?v=1790219712",
    "referencia_loja": "sundayandstone.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188",
    "prompt": "Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: the necklace resting on a pale weathered limestone slab, chain in a soft S curve, one small olive branch beside it, no other objects. Warm low late afternoon sun from the right, warm 3200K, long soft shadows, gentle glint on the metal. 100mm macro, f/4, shallow depth of field, warm sand and cream background, minimalist and quiet, space at the top for text, vertical 4:5. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": null
  },
  {
    "foto": 7,
    "pagina": "home",
    "onde": "Todo dia (lifestyle)",
    "ilustracao_no_ar": true,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0459/0744/3880/files/gold-diamond-cross.jpg?v=1789828010",
    "referencia_loja": "atoleajewelry.com",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188",
    "prompt": "Use the attached photo as the exact product reference. Product: a small softly rounded puffed gold-tone stainless steel cross pendant with smooth rounded edges, thin cable chain, lobster clasp with extender chain; keep the exact pendant shape, proportions, chain thickness and warm gold-tone finish of the reference. Scene: a woman in her 30s outdoors in warm golden hour light, face turned slightly down in profile, one hand near her hair, wearing the necklace at the base of her neck, cream linen shirt, no visible tattoos, natural relaxed hand. Backlit warm sun 3000K with soft rim light on hair, gentle highlights on the gold-tone metal. 85mm, f/2, shallow depth of field, soft blurred greenery in warm tones, crop from head to chest, vertical 4:5, space on one side for text. Commercial e-commerce jewelry photograph, natural skin texture, realistic metal reflections, sharp focus on the pendant, no retouching artifacts.",
    "foto_real_melhor": null
  }
]
```

## Código pronto do tema (29 arquivos)

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

### Arquivo: assets/gb-loja.css

```css
/* Ofirelle: estilos das seções gb-*. Tudo escopado em .gb-root para não brigar com o tema. */

.gb-root {
  --gb-cream: #FBFAF7;
  --gb-linen: #F3EFE7;
  --gb-navy: #1F2A44;
  --gb-muted: #5B6170;
  --gb-line: #E4DED2;
  --gb-gold: #B08D57;
  --gb-goldt: #7A5E2E;
  --gb-goldl: #C9A86A;
  --gb-serif: Newsreader, var(--font-heading--family, Georgia), Georgia, serif;
  --gb-sans: 'Red Hat Text', var(--font-body--family, 'Helvetica Neue'), 'Helvetica Neue', Arial, sans-serif;
  color: var(--gb-navy);
  font-family: var(--gb-sans);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.gb-root *, .gb-root *::before, .gb-root *::after { box-sizing: border-box; }
.gb-root h1, .gb-root h2, .gb-root h3, .gb-root h4, .gb-root p, .gb-root ul, .gb-root ol, .gb-root figure, .gb-root blockquote { margin: 0; }
.gb-root ul, .gb-root ol { padding: 0; list-style: none; }
.gb-root a { color: inherit; text-decoration: none; }
.gb-root button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; border-radius: 0; }
.gb-root img { display: block; max-width: 100%; }
.gb-root svg { flex: none; }
.gb-root s { text-decoration-thickness: 1px; }
.gb-root a:focus-visible, .gb-root button:focus-visible, .gb-root summary:focus-visible, .gb-root input:focus-visible, .gb-root select:focus-visible, .gb-root [tabindex]:focus-visible { outline: 2px solid var(--gb-gold); outline-offset: 2px; }

.gb-wrap { width: min(1280px, 100% - 160px); margin: 0 auto; }
.gb-sec { padding: 96px 0; }
.gb-linen { background: var(--gb-linen); }
.gb-m { display: none; }
.gb-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.gb-label { font-size: 11px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: var(--gb-goldt); margin: 0 0 16px; }
.gb-fio { display: inline-block; width: 24px; height: 1px; background: var(--gb-gold); vertical-align: middle; margin-right: 12px; }
.gb-h2 { font-family: var(--gb-serif); font-weight: 300; font-size: 48px; line-height: 1.08; letter-spacing: -.01em; }
.gb-h2 em, .gb-display em { font-style: italic; font-weight: 300; }
.gb-h3 { font-family: var(--gb-serif); font-weight: 300; font-size: 24px; line-height: 1.2; }
.gb-lead { font-size: 16px; line-height: 1.6; color: var(--gb-muted); margin-top: 20px; }
.gb-small { font-size: 15px; line-height: 1.6; color: var(--gb-muted); margin-top: 6px; }
.gb-muted { color: var(--gb-muted); }
.gb-head { margin-bottom: 40px; }
.gb-center { text-align: center; max-width: 820px; margin-left: auto; margin-right: auto; }
.gb-ph { background: var(--gb-linen); overflow: hidden; }
.gb-ph img { width: 100%; height: 100%; object-fit: cover; }

.gb-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; white-space: nowrap; font-family: var(--gb-sans); font-size: 13px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; border: 1px solid var(--gb-navy); transition: background .2s, color .2s; line-height: 1.2; }
.gb-btn-p { background: var(--gb-navy); color: var(--gb-cream); }
.gb-root a.gb-btn-p, .gb-root button.gb-btn-p { color: var(--gb-cream); }
.gb-btn-p:hover { background: #2C3A5C; }
.gb-btn-s { color: var(--gb-navy); background: transparent; }
.gb-btn-s:hover { background: var(--gb-navy); color: var(--gb-cream); }
.gb-btn-full { display: flex; width: 100%; }
.gb-btn[disabled], .gb-btn[aria-disabled="true"] { opacity: .55; cursor: not-allowed; }
.gb-btn.gb-ok { background: var(--gb-cream); color: var(--gb-navy); }
.gb-link { display: inline-block; font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; border-bottom: 1px solid var(--gb-gold); padding-bottom: 4px; }
.gb-ico { width: 20px; height: 20px; }
.gb-ico24 { width: 24px; height: 24px; }
.gb-aviso-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

/* faq (perguntas, abas) */
.gb-faq { border-top: 1px solid var(--gb-line); }
.gb-faq details { border-bottom: 1px solid var(--gb-line); }
.gb-faq summary { list-style: none; cursor: pointer; min-height: 60px; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 14px 0; font-family: var(--gb-serif); font-weight: 300; font-size: 21px; line-height: 1.3; }
.gb-faq summary::-webkit-details-marker { display: none; }
.gb-faq p, .gb-faq .gb-resp { font-size: 15px; line-height: 1.6; color: var(--gb-muted); padding: 0 40px 20px 0; }
.gb-menos { display: none; }
details[open] > summary .gb-menos { display: block; }
details[open] > summary .gb-mais { display: none; }

/* hero */
.gb-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 760px; }
.gb-hero-txt { display: flex; flex-direction: column; justify-content: center; padding: 64px 40px 64px max(80px, calc((100vw - 1280px) / 2)); }
.gb-hero-txt > div { max-width: 520px; }
.gb-display { font-family: var(--gb-serif); font-weight: 200; font-size: 72px; line-height: 1.04; letter-spacing: -.015em; }
.gb-hero-sub { font-size: 18px; line-height: 1.6; color: var(--gb-muted); margin-top: 24px; }
.gb-hero-btns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.gb-hero .gb-ph { height: 760px; }

/* cartões de produto */
.gb-topo-linha { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; }
.gb-topo-linha .gb-link { margin-bottom: 8px; }
.gb-grade4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.gb-card .gb-ph { aspect-ratio: 4/5; }
.gb-card .gb-ph img { transition: transform .6s ease; }
.gb-card:hover .gb-ph img { transform: scale(1.03); }
.gb-card-nome { font-family: var(--gb-serif); font-weight: 300; font-size: 20px; line-height: 1.25; margin: 16px 0 4px; }
.gb-card-preco { font-size: 14px; color: var(--gb-muted); }

/* ocasiões */
.gb-ocasioes .gb-ph { aspect-ratio: 3/4; background: var(--gb-cream); }
.gb-oc-nome { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; font-family: var(--gb-serif); font-weight: 300; font-size: 22px; line-height: 1.25; }
.gb-oc-nome svg { transition: transform .2s; color: var(--gb-gold); }
.gb-oc:hover .gb-oc-nome svg { transform: translateX(4px); }

/* como funciona */
.gb-passos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.gb-passo .gb-ph { aspect-ratio: 4/5; }
.gb-legenda { font-size: 13px; line-height: 1.5; color: var(--gb-goldt); margin-top: 12px; letter-spacing: .04em; }
.gb-passo-txt { display: flex; gap: 20px; align-items: flex-start; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--gb-line); }
.gb-como .gb-num { font-family: var(--gb-serif); font-weight: 200; font-size: 56px; line-height: .9; color: var(--gb-gold); }
.gb-conta { font-size: 16px; line-height: 1.6; text-align: center; margin-top: 64px; }
.gb-conta s { color: var(--gb-muted); }
.gb-conta strong { font-weight: 500; }
.gb-acao { display: flex; justify-content: center; margin-top: 24px; }

/* conjuntos prontos (home) */
.gb-sets { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.gb-set .gb-ph { aspect-ratio: 4/5; background: var(--gb-cream); }
.gb-set-topo { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-top: 28px; }
.gb-set-topo .gb-h3 { font-size: 28px; }
.gb-set-preco { font-size: 20px; font-weight: 500; white-space: nowrap; }
.gb-set-preco s { font-weight: 400; font-size: 15px; color: var(--gb-muted); margin-right: 8px; }
.gb-set-pe { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--gb-line); }
.gb-minis { display: flex; gap: 8px; }
.gb-minis img { width: 64px; height: 80px; object-fit: cover; background: #fff; border: 1px solid var(--gb-line); }
.gb-set-pe .gb-btn { padding: 0 40px; }

/* todo dia */
.gb-mosaico { display: grid; grid-template-columns: 741fr 515fr; gap: 24px; }
.gb-mosaico > .gb-ph { aspect-ratio: 741/926; }
.gb-mosaico-lado { display: grid; grid-template-rows: 1fr 1fr; gap: 24px; }
.gb-mosaico-lado .gb-ph { height: 100%; }

/* ophir, faixa (home) */
.gb-ophir--faixa { background: var(--gb-navy); color: var(--gb-cream); display: grid; grid-template-columns: 1fr 1fr; }
.gb-ophir--faixa .gb-ph { aspect-ratio: 1/1; background: var(--gb-navy); }
.gb-ophir--faixa .gb-ophir-txt { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 64px 80px 64px 123px; }
.gb-ophir--faixa .gb-label { color: var(--gb-goldl); }
.gb-ophir--faixa .gb-fio { background: var(--gb-goldl); }
.gb-ophir--faixa .gb-txt { font-size: 18px; line-height: 1.6; color: #D9DCE3; margin-top: 24px; max-width: 480px; }
.gb-ophir--faixa .gb-link { border-color: var(--gb-goldl); margin-top: 40px; }
/* ophir, citação (produto) */
.gb-ophir--citacao { padding: 72px 0 64px; }
.gb-ophir--citacao .gb-in { width: min(880px, 100% - 160px); margin: 0 auto; display: flex; align-items: center; gap: 56px; }
.gb-ophir--citacao .gb-ph { width: 200px; height: 200px; flex: none; }
.gb-ophir--citacao .gb-fio-bloco { display: block; width: 40px; height: 1px; background: var(--gb-gold); }
.gb-ophir--citacao blockquote { font-family: var(--gb-serif); font-weight: 300; font-style: italic; font-size: 32px; line-height: 1.25; margin-top: 24px; }
.gb-ophir--citacao .gb-link { margin-top: 20px; }

/* promessa */
.gb-promessa-grade { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--gb-line); border-bottom: 1px solid var(--gb-line); padding: 48px 0; }
.gb-prom { padding: 8px 48px; }
.gb-prom + .gb-prom { border-left: 1px solid var(--gb-line); }
.gb-prom .gb-h3 { margin-top: 24px; }
.gb-prom .gb-small { max-width: 300px; margin-top: 10px; }

/* perguntas */
.gb-perguntas .gb-in { display: grid; grid-template-columns: minmax(0, 412fr) minmax(0, 739fr); grid-template-rows: auto 1fr; column-gap: clamp(40px, 9vw, 133px); align-items: start; }
.gb-perguntas .gb-faq { grid-column: 2; grid-row: 1 / span 2; }
.gb-perguntas .gb-ask { grid-column: 1; grid-row: 2; max-width: 300px; font-size: 15px; line-height: 1.6; color: var(--gb-muted); margin-top: 24px; }
.gb-perguntas .gb-ask a { color: var(--gb-navy); border-bottom: 1px solid var(--gb-gold); }

/* cadastro */
.gb-cadastro { border-top: 1px solid var(--gb-line); }
.gb-cad-in { max-width: 560px; margin: 0 auto; text-align: center; }
.gb-cad-in .gb-h2 { font-size: 40px; }
.gb-cad-in .gb-txt { font-size: 16px; line-height: 1.6; color: var(--gb-muted); margin-top: 16px; }
.gb-form { display: flex; margin-top: 32px; }
.gb-form input[type="email"] { flex: 1; min-width: 0; height: 48px; border: 1px solid var(--gb-navy); border-right: 0; background: #fff; padding: 0 16px; font: inherit; font-size: 16px; color: var(--gb-navy); border-radius: 0; }
.gb-form input::placeholder { color: var(--gb-muted); }
.gb-form .gb-btn { min-height: 48px; height: 48px; padding: 0 36px; }
.gb-form-ok { font-size: 14px; color: var(--gb-goldt); margin-top: 12px; min-height: 21px; }
.gb-form-erro { font-size: 14px; color: #8A2A1C; margin-top: 12px; }

/* galeria e compra */
.gb-galeria-compra { padding: 40px 0 96px; }
.gb-galeria-compra .gb-in { display: grid; grid-template-columns: minmax(0, 741fr) minmax(0, 515fr); column-gap: 24px; align-items: start; }
.gb-gal { position: relative; }
.gb-gal-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.gb-gal-item { aspect-ratio: 4/5; position: relative; }
.gb-gal-item.gb-main { grid-column: 1 / -1; order: -1; }
.gb-gal-item button { display: block; width: 100%; height: 100%; }
.gb-gal-item.gb-main button { cursor: default; }
.gb-gal-nav, .gb-gal-count { display: none; }
.gb-form-produto { display: contents; }
.gb-buy { padding-left: 48px; position: sticky; top: 24px; display: flex; flex-direction: column; }
.gb-crumb { font-size: 13px; line-height: 1.5; color: var(--gb-muted); margin: 0 0 20px; }
.gb-crumb a { border-bottom: 1px solid var(--gb-line); }
.gb-crumb span[aria-hidden] { margin: 0 8px; }
.gb-buy h1 { font-family: var(--gb-serif); font-weight: 300; font-size: 40px; line-height: 1.1; letter-spacing: 0; }
.gb-price { font-size: 20px; font-weight: 500; margin-top: 14px; }
.gb-mat { font-size: 13px; line-height: 1.5; color: var(--gb-muted); margin-top: 6px; }
.gb-bens { display: grid; gap: 10px; margin-top: 24px; font-size: 14px; line-height: 1.4; }
.gb-bens li { display: flex; align-items: center; gap: 12px; }
.gb-rule { height: 1px; background: var(--gb-line); margin: 28px 0 20px; }
.gb-finish { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.gb-finish p { font-size: 11px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; }
.gb-ib { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
.gb-sw { width: 36px; height: 36px; border: 1.5px solid var(--gb-navy); display: flex; align-items: center; justify-content: center; }
.gb-sw i { width: 22px; height: 22px; border-radius: 50%; background: var(--gb-goldl); display: block; }
.gb-chip { min-height: 44px; padding: 0 16px; border: 1px solid var(--gb-line); font-size: 13px; }
.gb-chip[aria-pressed="true"] { border: 1.5px solid var(--gb-navy); }
.gb-chip[disabled] { opacity: .5; text-decoration: line-through; }
.gb-set-label { margin: 20px 0 18px; }
.gb-qty { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.gb-qty--2 { grid-template-columns: repeat(2, 1fr); }
.gb-qty button { position: relative; text-align: left; padding: 12px; border: 1px solid var(--gb-line); background: var(--gb-cream); min-height: 88px; display: flex; flex-direction: column; gap: 4px; }
.gb-qty button[aria-checked="true"] { border: 1.5px solid var(--gb-navy); background: #FFFFFF; padding: 11.5px; }
.gb-q1 { font-size: 12px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
.gb-q2 { font-size: 15px; font-weight: 500; white-space: nowrap; }
.gb-q2 s { font-weight: 400; color: var(--gb-muted); font-size: 12px; }
.gb-q3 { font-size: 12px; color: var(--gb-muted); }
.gb-q3.gb-gold { color: var(--gb-goldt); }
.gb-badge { position: absolute; top: -9px; left: 11px; background: var(--gb-navy); color: var(--gb-cream); font-size: 10px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; padding: 2px 6px; }
.gb-set-list ul { border-top: 1px solid var(--gb-line); margin-top: 16px; }
.gb-set-list li { display: grid; grid-template-columns: 56px 1fr auto; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--gb-line); font-size: 14px; }
.gb-set-list li img { width: 56px; height: 70px; object-fit: cover; background: var(--gb-linen); }
.gb-set-list li a { display: inline-block; font-size: 13px; color: var(--gb-muted); border-bottom: 1px solid var(--gb-gold); margin-top: 4px; }
.gb-set-total { display: flex; justify-content: space-between; font-size: 14px; margin: 12px 0 0; }
.gb-set-total s { color: var(--gb-muted); }
.gb-set-total strong { font-weight: 500; }
.gb-buy-btn { margin-top: 20px; }
.gb-note { font-size: 13px; line-height: 1.5; color: var(--gb-muted); text-align: center; margin-top: 12px; }
.gb-erro { font-size: 13px; line-height: 1.5; color: #8A2A1C; text-align: center; margin-top: 8px; }
.gb-mini { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--gb-line); font-size: 13px; }
.gb-mini p { display: flex; align-items: center; gap: 10px; }
.gb-tabs { margin-top: 28px; border-top: 1px solid var(--gb-line); }
.gb-tabs details { border-bottom: 1px solid var(--gb-line); }
.gb-tabs summary { list-style: none; min-height: 56px; display: flex; justify-content: space-between; align-items: center; gap: 16px; cursor: pointer; font-family: var(--gb-sans); font-weight: 500; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
.gb-tabs summary::-webkit-details-marker { display: none; }
.gb-tabs p, .gb-tabs .gb-resp { font-size: 15px; line-height: 1.6; color: var(--gb-muted); padding: 0 40px 20px 0; }

/* benefícios */
.gb-beneficios { padding: 72px 0; border-top: 1px solid var(--gb-line); border-bottom: 1px solid var(--gb-line); }
.gb-beneficios .gb-in { display: grid; grid-template-columns: minmax(0, 412fr) minmax(0, 844fr); column-gap: 24px; align-items: start; }
.gb-beneficios .gb-h2 { max-width: 360px; }
.gb-beneficios ul { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 24px; padding-top: 6px; }
.gb-beneficios li { padding-left: 24px; border-left: 1px solid var(--gb-line); }
.gb-beneficios h3 { font-family: var(--gb-serif); font-weight: 300; font-size: 21px; line-height: 1.25; margin-top: 20px; }
.gb-beneficios li p { font-size: 13px; line-height: 1.55; color: var(--gb-muted); margin-top: 8px; }

/* no pescoço */
.gb-no-pescoco { background: var(--gb-linen); padding: 96px 0; }
.gb-no-pescoco .gb-in { display: grid; grid-template-columns: minmax(0, 628fr) minmax(0, 303fr) minmax(0, 303fr); column-gap: 24px; align-items: end; }
.gb-no-pescoco .gb-ph { aspect-ratio: 4/5; background: var(--gb-cream); }
.gb-no-pescoco .gb-a img { object-position: 50% 40%; }
.gb-no-pescoco .gb-sem-b .gb-in, .gb-no-pescoco.gb-sem-b .gb-in { grid-template-columns: minmax(0, 628fr) minmax(0, 606fr); }

/* detalhe */
.gb-detalhe { padding: 96px 0; }
.gb-detalhe .gb-in { display: grid; grid-template-columns: minmax(0, 412fr) minmax(0, 844fr); column-gap: 24px; align-items: center; }
.gb-detalhe .gb-t { padding-right: 40px; }
.gb-detalhe .gb-pair { display: grid; grid-template-columns: 1fr 1fr; column-gap: 24px; }
.gb-detalhe .gb-ph { aspect-ratio: 1/1; }
.gb-detalhe figcaption { font-size: 13px; line-height: 1.5; color: var(--gb-muted); margin-top: 12px; }

/* medida */
.gb-medida { background: var(--gb-linen); padding: 96px 0; }
.gb-medida .gb-in { display: grid; grid-template-columns: minmax(0, 628fr) minmax(0, 521fr); column-gap: clamp(40px, 9vw, 131px); align-items: center; }
.gb-medida svg { width: 100%; height: auto; background: var(--gb-cream); display: block; }
.gb-specs { margin-top: 32px; border-top: 1px solid var(--gb-line); font-size: 14px; }
.gb-specs li { display: grid; grid-template-columns: 120px 1fr; padding: 14px 0; border-bottom: 1px solid var(--gb-line); }

/* conjunto (produto) */
.gb-conjunto { padding: 96px 0; }
.gb-conjunto .gb-in { display: grid; grid-template-columns: minmax(0, 521fr) minmax(0, 630fr); column-gap: clamp(40px, 9vw, 129px); align-items: center; }
.gb-conjunto .gb-big { aspect-ratio: 4/5; }
.gb-conjunto .gb-big img { object-position: 50% 40%; }
.gb-set-name { font-family: var(--gb-serif); font-weight: 300; font-size: 24px; line-height: 1.2; margin-top: 36px; }
.gb-pieces { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 15px; align-items: start; margin-top: 20px; }
.gb-pieces button { display: block; text-align: left; }
.gb-pf { position: relative; display: block; aspect-ratio: 4/5; background: var(--gb-linen); overflow: hidden; border: 1.5px solid transparent; }
.gb-pieces button[aria-checked="true"] .gb-pf { border-color: var(--gb-navy); }
.gb-pf img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 55%; opacity: .45; }
.gb-pieces button[aria-checked="true"] .gb-pf img { opacity: 1; }
.gb-chk { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; border: 1px solid var(--gb-navy); background: var(--gb-cream); color: var(--gb-cream); display: flex; align-items: center; justify-content: center; }
.gb-chk svg { visibility: hidden; }
.gb-pieces button[aria-checked="true"] .gb-chk { background: var(--gb-navy); }
.gb-pieces button[aria-checked="true"] .gb-chk svg { visibility: visible; }
.gb-pn { display: block; font-family: var(--gb-serif); font-weight: 300; font-size: 18px; line-height: 1.25; margin-top: 12px; }
.gb-pp { display: block; font-size: 14px; color: var(--gb-muted); margin-top: 4px; }
.gb-sum { display: flex; justify-content: space-between; align-items: baseline; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--gb-line); }
.gb-sum-l { font-size: 14px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
.gb-sum-p { font-size: 20px; font-weight: 500; }
.gb-sum-p s { font-size: 14px; font-weight: 400; color: var(--gb-muted); margin-right: 8px; }
.gb-sum-n { font-size: 13px; color: var(--gb-goldt); text-align: right; margin-top: 4px; }
.gb-set-cta { display: flex; align-items: center; gap: 32px; margin-top: 24px; }
.gb-set-cta .gb-btn { flex: 1; }

/* presente */
.gb-presente { background: var(--gb-linen); padding: 96px 0; }
.gb-presente .gb-in { display: grid; grid-template-columns: minmax(0, 628fr) minmax(0, 521fr); column-gap: clamp(40px, 9vw, 131px); align-items: center; }
.gb-occ { display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; margin-top: 36px; border-top: 1px solid var(--gb-line); }
.gb-occ li { border-bottom: 1px solid var(--gb-line); }
.gb-occ a { display: flex; justify-content: space-between; align-items: center; min-height: 56px; font-family: var(--gb-serif); font-weight: 300; font-size: 20px; }
.gb-presente .gb-btn { margin-top: 36px; }
.gb-box { position: relative; aspect-ratio: 521/400; overflow: hidden; background: var(--gb-cream); }
.gb-box img { position: absolute; top: 0; left: 50%; width: 100%; height: 100%; object-fit: cover; }

/* selos */
.gb-selos { padding: 0 0 96px; }
.gb-selos ul { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--gb-line); border-bottom: 1px solid var(--gb-line); }
.gb-selos li { display: flex; align-items: center; gap: 14px; padding: 24px 20px; border-right: 1px solid var(--gb-line); }
.gb-selos li:last-child { border-right: 0; }
.gb-selos b { display: block; font-size: 14px; font-weight: 500; }
.gb-selos small { display: block; font-size: 13px; color: var(--gb-muted); margin-top: 2px; }

/* cuidados */
.gb-cuidados { background: var(--gb-linen); padding: 72px 0; }
.gb-cuidados .gb-in { display: grid; grid-template-columns: minmax(0, 412fr) minmax(0, 844fr); column-gap: 24px; align-items: center; }
.gb-cuidados ol { display: grid; grid-template-columns: 1fr 1fr; column-gap: 24px; }
.gb-cuidados li { display: flex; align-items: baseline; gap: 20px; padding: 8px 0 8px 24px; border-left: 1px solid var(--gb-line); }
.gb-cuidados .gb-num { font-family: var(--gb-serif); font-weight: 300; font-size: 40px; line-height: 1; color: var(--gb-gold); }
.gb-cuidados li span + span { font-size: 15px; line-height: 1.6; }

/* avaliações */
.gb-avaliacoes { padding: 96px 0; border-top: 1px solid var(--gb-line); }
.gb-avaliacoes .gb-in { max-width: 640px; margin: 0 auto; text-align: center; padding: 0 20px; }
.gb-avaliacoes h2 { font-family: var(--gb-serif); font-weight: 300; font-size: 40px; line-height: 1.1; }
.gb-avaliacoes p.gb-muted { font-size: 15px; line-height: 1.6; margin: 16px 0 28px; }
.gb-avaliacoes .gb-btn { min-height: 48px; padding: 0 28px; font-size: 12px; }

/* combine com */
.gb-combine-com { background: var(--gb-linen); padding: 96px 0; }
.gb-cc-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; gap: 24px; }
.gb-cc-head p.gb-muted { font-size: 13px; }
.gb-cc-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.gb-combine-com .gb-ph { background: var(--gb-cream); }
.gb-combine-com .gb-ph img { object-position: 50% 55%; }
.gb-add { min-height: 44px; padding: 0 24px; margin-top: 14px; border: 1px solid var(--gb-navy); font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; }
.gb-add.gb-ok { background: var(--gb-navy); color: var(--gb-cream); }

/* barra fixa */
.gb-barra-fixa { display: none; }

@media (max-width: 1099px) {
  .gb-wrap, .gb-ophir--citacao .gb-in { width: min(1280px, 100% - 80px); }
  .gb-galeria-compra .gb-in { grid-template-columns: 1fr 1fr; }
  .gb-buy { padding-left: 32px; }
  .gb-h2 { font-size: 40px; }
  .gb-display { font-size: 56px; }
  .gb-hero { min-height: 620px; }
  .gb-hero .gb-ph { height: auto; min-height: 620px; }
  .gb-hero-txt { padding: 56px 32px 56px 40px; }
  .gb-grade4, .gb-cc-cards { grid-template-columns: repeat(2, 1fr); }
  .gb-passos { gap: 24px; }
  .gb-ophir--faixa .gb-ophir-txt { padding: 56px 40px; }
  .gb-prom { padding: 8px 24px; }
}

@media (max-width: 759px) {
  .gb-d { display: none !important; }
  .gb-m { display: block; }
  .gb-m.gb-mi-inline { display: inline; }
  .gb-sec { padding: 56px 0; }
  .gb-wrap, .gb-ophir--citacao .gb-in { width: calc(100% - 40px); }
  .gb-label { margin-bottom: 12px; }
  .gb-h2 { font-size: 32px; line-height: 1.12; letter-spacing: 0; }
  .gb-head { margin-bottom: 24px; }
  .gb-lead { font-size: 15px; line-height: 1.55; margin-top: 12px; }
  .gb-btn { width: 100%; padding: 0 16px; }
  .gb-faq summary { font-size: 18px; min-height: 56px; }
  .gb-faq p, .gb-faq .gb-resp { padding-right: 8px; line-height: 1.55; }
  .gb-tabs p, .gb-tabs .gb-resp { padding-right: 24px; }

  .gb-hero { grid-template-columns: 1fr; min-height: 0; }
  .gb-hero .gb-ph { order: -1; height: 460px; min-height: 0; }
  .gb-hero-txt { padding: 32px 20px 40px; }
  .gb-display { font-weight: 300; font-size: 42px; line-height: 1.06; letter-spacing: -.01em; }
  .gb-hero-sub { font-size: 16px; line-height: 1.55; margin-top: 16px; }
  .gb-hero-btns { display: grid; margin-top: 28px; }

  .gb-mais-vendidos .gb-wrap { display: flex; flex-direction: column; }
  .gb-topo-linha { display: contents; }
  .gb-topo-linha > div { order: 0; margin-bottom: 24px; }
  .gb-mais-vendidos .gb-grade4 { order: 1; }
  .gb-topo-linha > .gb-link { order: 2; align-self: flex-start; margin: 32px 0 0; }
  .gb-grade4 { grid-template-columns: 1fr 1fr; gap: 28px 16px; }
  .gb-card-nome { font-size: 17px; margin-top: 12px; }
  .gb-oc-faixa { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; margin: 0 -20px; padding: 0 20px 4px; scrollbar-width: none; }
  .gb-oc-faixa::-webkit-scrollbar { display: none; }
  .gb-oc { flex: 0 0 260px; scroll-snap-align: start; }
  .gb-oc-nome { font-size: 20px; margin-top: 14px; }

  .gb-passos { grid-template-columns: 1fr; }
  .gb-como .gb-head { text-align: center; }
  .gb-passo:last-child .gb-ph, .gb-passo:last-child .gb-legenda { display: none; }
  .gb-passo:last-child .gb-passo-txt { margin-top: 0; }
  .gb-passo-txt { margin-top: 20px; padding-top: 20px; gap: 16px; }
  .gb-como .gb-num { font-size: 48px; width: 56px; }
  .gb-h3 { font-size: 21px; line-height: 1.25; }
  .gb-small { line-height: 1.55; margin-top: 4px; }
  .gb-conta { margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--gb-line); }
  .gb-acao { margin-top: 20px; }

  .gb-sets { grid-template-columns: 1fr; gap: 48px; }
  .gb-set-topo { margin-top: 20px; gap: 12px; }
  .gb-set-topo .gb-h3 { font-size: 23px; }
  .gb-set-preco { font-size: 18px; }
  .gb-set-preco s { font-size: 13px; margin-right: 6px; }
  .gb-set .gb-small { font-size: 14px; }
  .gb-set-pe { display: block; border-top: 0; margin-top: 16px; padding-top: 0; }
  .gb-set-pe .gb-btn { margin-top: 16px; padding: 0 16px; }

  .gb-mosaico { grid-template-columns: 1fr; gap: 8px; margin: 0 -20px; }
  .gb-mosaico > .gb-ph { aspect-ratio: 390/488; }
  .gb-mosaico-lado { grid-template-rows: none; grid-template-columns: 1fr 1fr; gap: 8px; padding: 0 20px; }
  .gb-mosaico-lado .gb-ph { aspect-ratio: 1/1; height: auto; }

  .gb-ophir--faixa { grid-template-columns: 1fr; }
  .gb-ophir--faixa .gb-ophir-txt { padding: 40px 20px 48px; }
  .gb-ophir--faixa .gb-txt { font-size: 16px; line-height: 1.55; margin-top: 16px; }
  .gb-ophir--faixa .gb-link { margin-top: 28px; }
  .gb-ophir--citacao { padding: 56px 0 40px; text-align: center; }
  .gb-ophir--citacao .gb-in { display: block; }
  .gb-ophir--citacao .gb-ph { width: 120px; height: 120px; margin: 0 auto; }
  .gb-ophir--citacao .gb-fio-bloco { margin: 24px auto 0; }
  .gb-ophir--citacao blockquote { font-size: 24px; line-height: 1.3; margin-top: 20px; }
  .gb-ophir--citacao .gb-link { margin-top: 12px; padding-top: 14px; }

  .gb-promessa .gb-head { text-align: left; margin-bottom: 16px; }
  .gb-promessa-grade { grid-template-columns: 1fr; border-top: 0; padding: 0; }
  .gb-prom { display: grid; grid-template-columns: 24px 1fr; gap: 16px; padding: 24px 0; border-top: 1px solid var(--gb-line); }
  .gb-prom + .gb-prom { border-left: 0; }
  .gb-prom .gb-h3 { margin-top: 0; }
  .gb-prom .gb-small { margin-top: 6px; }

  .gb-perguntas { padding: 56px 0; }
  .gb-perguntas .gb-in { display: block; }
  .gb-perguntas .gb-faq { margin-top: 24px; }
  .gb-perguntas .gb-ask { font-size: 14px; }
  .gb-faq summary { font-size: 18px; }

  .gb-cad-in { text-align: left; }
  .gb-cad-in .gb-h2 { font-size: 30px; }
  .gb-cad-in .gb-txt { font-size: 15px; margin-top: 12px; }
  .gb-form { display: grid; gap: 12px; margin-top: 24px; }
  .gb-form input[type="email"] { border-right: 1px solid var(--gb-navy); }

  .gb-galeria-compra { padding: 0; }
  .gb-galeria-compra .gb-in { display: block; width: 100%; }
  .gb-gal-strip { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; gap: 0; }
  .gb-gal-strip::-webkit-scrollbar { display: none; }
  .gb-gal-item, .gb-gal-item.gb-main { flex: 0 0 100%; height: 288px; aspect-ratio: auto; scroll-snap-align: start; order: 0; }
  .gb-gal-nav { position: absolute; top: 144px; margin-top: -22px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
  .gb-gal-nav span { width: 32px; height: 32px; background: rgba(251, 250, 247, .85); display: flex; align-items: center; justify-content: center; }
  .gb-gal-prev { left: 4px; }
  .gb-gal-next { right: 4px; }
  .gb-gal-count { display: block; position: absolute; right: 12px; top: 256px; background: var(--gb-cream); padding: 3px 8px; font-size: 12px; letter-spacing: .06em; }
  .gb-buy { position: static; padding: 16px 20px 0; }
  .gb-buy h1 { font-size: 26px; line-height: 1.15; }
  .gb-price { font-size: 18px; margin-top: 6px; }
  .gb-mat { margin-top: 2px; }
  .gb-bens { gap: 6px; margin-top: 12px; }
  .gb-bens li { gap: 10px; }
  .gb-finish { justify-content: space-between; min-height: 48px; margin-top: 4px; }
  .gb-qty { gap: 7px; margin-top: 12px; }
  .gb-qty button { min-height: 76px; height: 76px; padding: 10px 8px; gap: 3px; }
  .gb-qty button[aria-checked="true"] { padding: 9.5px 7.5px; }
  .gb-q1 { font-size: 11px; }
  .gb-q2 s { font-size: 11px; }
  .gb-badge { left: 7px; }
  .gb-buy-btn { order: 1; margin-top: 12px; }
  .gb-note, .gb-erro { order: 1; margin-top: 10px; }
  .gb-set-list { order: 2; }
  .gb-set-list li { grid-template-columns: 48px 1fr auto; padding: 8px 0; }
  .gb-set-list li img { width: 48px; height: 60px; }
  .gb-mini { order: 3; margin: 24px 0 0; padding: 0; gap: 0; border-top: 0; border-bottom: 1px solid var(--gb-line); }
  .gb-mini p { padding: 16px 12px 16px 0; line-height: 1.35; }
  .gb-mini p:nth-child(odd) { border-right: 1px solid var(--gb-line); }
  .gb-mini p:nth-child(even) { padding: 16px 0 16px 12px; }
  .gb-mini p:nth-child(-n+2) { border-bottom: 1px solid var(--gb-line); }
  .gb-mini svg { color: var(--gb-gold); }

  .gb-beneficios { padding: 48px 0; margin-top: 48px; }
  .gb-beneficios .gb-in, .gb-detalhe .gb-in, .gb-medida .gb-in, .gb-conjunto .gb-in, .gb-presente .gb-in, .gb-cuidados .gb-in { display: block; }
  .gb-beneficios ul { display: block; margin-top: 24px; padding: 0; }
  .gb-beneficios li { display: grid; grid-template-columns: 24px 1fr; gap: 16px; padding: 20px 0; border-left: 0; border-top: 1px solid var(--gb-line); }
  .gb-beneficios li:last-child { padding-bottom: 0; }
  .gb-beneficios h3 { margin-top: 0; }
  .gb-beneficios li p { margin-top: 4px; line-height: 1.5; }

  .gb-no-pescoco { padding: 0 0 56px; }
  .gb-no-pescoco .gb-in { display: flex; flex-direction: column; width: 100%; align-items: stretch; }
  .gb-no-pescoco .gb-a { aspect-ratio: auto; height: 460px; order: 1; }
  .gb-no-pescoco .gb-t { order: 2; padding: 32px 20px; }
  .gb-no-pescoco .gb-b { order: 3; margin: 0 20px; }

  .gb-detalhe { padding: 56px 0; }
  .gb-detalhe .gb-t { padding: 0; }
  .gb-detalhe .gb-pair { display: block; }
  .gb-detalhe figure { margin-top: 24px; }
  .gb-detalhe figcaption { margin-top: 10px; }

  .gb-medida { padding: 56px 0; }
  .gb-medida .gb-t { margin-top: 32px; }
  .gb-specs { margin-top: 24px; }
  .gb-specs li { grid-template-columns: 96px 1fr; padding: 12px 0; }

  .gb-conjunto { padding: 56px 0; }
  .gb-conjunto .gb-in { width: 100%; }
  .gb-conjunto .gb-pad { padding: 0 20px; }
  .gb-conjunto .gb-big { aspect-ratio: auto; height: 440px; margin-top: 24px; }
  .gb-conjunto .gb-hd { order: -1; }
  .gb-set-name { font-size: 21px; margin-top: 24px; padding: 0 20px; }
  .gb-pieces { display: flex; gap: 12px; overflow-x: auto; padding: 16px 20px 4px; margin: 0; scrollbar-width: none; }
  .gb-pieces button { flex: 0 0 150px; }
  .gb-pn { font-size: 17px; margin-top: 10px; }
  .gb-chk { top: 8px; right: 8px; }
  .gb-sum { margin-top: 20px; }
  .gb-sum-l { font-size: 13px; }
  .gb-sum-p { font-size: 18px; }
  .gb-set-cta { display: block; margin-top: 20px; text-align: center; }
  .gb-set-cta .gb-link { margin-top: 20px; padding-top: 14px; }

  .gb-presente { padding: 0 0 56px; }
  .gb-presente .gb-in { display: flex; flex-direction: column; width: 100%; }
  .gb-presente .gb-box { order: -1; }
  .gb-presente .gb-t { padding: 32px 20px 0; }
  .gb-occ { display: block; margin-top: 24px; }
  .gb-occ a { min-height: 48px; }
  .gb-presente .gb-btn { display: flex; width: 100%; margin-top: 24px; }

  .gb-selos { padding: 0 0 56px; }
  .gb-selos ul { grid-template-columns: 1fr 1fr; }
  .gb-selos li { display: block; padding: 16px 12px 16px 0; }
  .gb-selos li:nth-child(even) { border-right: 0; padding: 16px 0 16px 12px; }
  .gb-selos li:nth-child(-n+2) { border-bottom: 1px solid var(--gb-line); }
  .gb-selos b { font-size: 13px; margin-top: 10px; }
  .gb-selos small { font-size: 12px; line-height: 1.4; }

  .gb-cuidados { padding: 56px 0; }
  .gb-cuidados ol { display: block; margin-top: 24px; }
  .gb-cuidados li { padding: 16px 0; border-left: 0; border-top: 1px solid var(--gb-line); }
  .gb-cuidados li:last-child { padding-bottom: 0; }

  .gb-avaliacoes { padding: 56px 0; }
  .gb-avaliacoes h2 { font-size: 28px; line-height: 1.15; }
  .gb-avaliacoes p.gb-muted { margin: 12px 0 24px; }

  .gb-combine-com { padding: 56px 0; }
  .gb-cc-head { display: block; margin-bottom: 24px; }
  .gb-cc-head p.gb-muted { margin-top: 8px; }
  .gb-cc-cards { grid-template-columns: 1fr 1fr; gap: 24px 16px; }
  .gb-add { width: 100%; margin-top: 12px; }

  .gb-barra-fixa { display: grid; position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; height: 72px; background: var(--gb-cream); border-top: 1px solid var(--gb-line); grid-template-columns: 48px 1fr 140px; gap: 12px; align-items: center; padding: 0 16px 0 12px; transform: translateY(100%); transition: transform .2s; visibility: hidden; }
  .gb-barra-fixa.gb-on { transform: none; visibility: visible; }
  .gb-barra-fixa img { width: 48px; height: 60px; object-fit: cover; object-position: 50% 40%; background: var(--gb-linen); }
  .gb-barra-fixa p { font-size: 14px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .gb-barra-fixa .gb-btn { width: 140px; min-height: 44px; height: 44px; font-size: 12px; letter-spacing: .14em; padding: 0 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .gb-root *, .gb-root *::before, .gb-root *::after { transition: none !important; scroll-behavior: auto !important; }
}

/* progresso do carrinho (snippet gb-progresso-carrinho) */
.gb-prog { padding: 0 24px 20px; border-bottom: 1px solid #E4DED2; font-size: 14px; line-height: 1.5; color: #1F2A44; }
.gb-prog-bar { position: relative; height: 4px; background: #E4DED2; margin-top: 14px; }
.gb-prog-bar i { position: absolute; left: 0; top: 0; bottom: 0; background: #B08D57; display: block; transition: width .25s; }
.gb-prog-marcas { position: relative; height: 18px; font-size: 12px; color: #5B6170; margin-top: 8px; }
.gb-prog-marcas span { position: absolute; top: 0; }
```

### Arquivo: assets/gb-loja.js

```js
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
```

### Arquivo: sections/gb-avaliacoes.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- if section.settings.mostrar or request.design_mode -%}
<section class="gb-root gb-avaliacoes" id="reviews" data-gb-secao="avaliacoes">
  {%- if section.settings.mostrar == false -%}
    <p class="gb-muted" style="text-align:center">Seção desligada: marque "Mostrar avaliações" para ela aparecer na loja.</p>
  {%- endif -%}
  <div class="gb-in">
    {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
    {%- assign gb_tem_app = false -%}
    {%- for block in section.blocks -%}
      {%- if block.type == '@app' -%}
        {%- assign gb_tem_app = true -%}
        {% render block %}
      {%- endif -%}
    {%- endfor -%}
    {%- unless gb_tem_app -%}
      <h2>{{ section.settings.titulo | escape }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-muted">{{ section.settings.texto | escape }}</p>{%- endif -%}
      {%- if section.settings.botao_texto != blank -%}
        <a href="{{ section.settings.botao_url | default: '#review' }}" class="gb-btn gb-btn-s">{{ section.settings.botao_texto | escape }}</a>
      {%- endif -%}
    {%- endunless -%}
  </div>
</section>
{%- endif -%}

{% schema %}
{
  "name": "Ofirelle: avaliações",
  "tag": "div",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "checkbox", "id": "mostrar", "label": "Mostrar avaliações", "default": false },
    { "type": "paragraph", "content": "Desligada, a seção não aparece na loja. Ligue só quando houver avaliações reais ou um app de avaliações instalado (adicione o app como bloco)." },
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Reviews" },
    { "type": "text", "id": "titulo", "label": "Título (sem app)", "default": "No reviews yet." },
    { "type": "text", "id": "texto", "label": "Texto (sem app)", "default": "If you wear one, tell us how." },
    { "type": "text", "id": "botao_texto", "label": "Botão: texto", "default": "Write a review" },
    { "type": "url", "id": "botao_url", "label": "Botão: destino" }
  ],
  "blocks": [{ "type": "@app" }],
  "presets": [{ "name": "Ofirelle: avaliações" }]
}
{% endschema %}
```

### Arquivo: sections/gb-barra-fixa.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>

{%- liquid
  assign gb_v = product.selected_or_first_available_variant
  assign gb_img = product.images[1] | default: product.featured_image
  assign gb_nome = section.settings.nome_curto | default: product.title
-%}
{%- if product != blank -%}
  <div class="gb-root gb-barra-fixa" id="gb-barra-fixa" data-gb-barra aria-hidden="true">
    {%- if gb_img != blank -%}
      {%- render 'gb-imagem', imagem: gb_img, alt: product.title, carga: 'lazy', widths: '100, 150, 200', sizes: '48px' -%}
    {%- else -%}
      <span></span>
    {%- endif -%}
    <div style="min-width:0">
      <p>{{ gb_nome | escape }}</p>
      <p style="font-weight:500">{{ gb_v.price | money }}</p>
    </div>
    {%- if product.available and gb_v.available -%}
      <button type="button" class="gb-btn gb-btn-p" data-gb-barra-comprar tabindex="-1">{{ section.settings.botao | escape }}</button>
    {%- else -%}
      <button type="button" class="gb-btn gb-btn-p" disabled tabindex="-1">{{ section.settings.esgotado | escape }}</button>
    {%- endif -%}
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Ofirelle: barra fixa",
  "tag": "div",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "paragraph", "content": "Só aparece no celular, quando o botão de compra principal sai da tela." },
    { "type": "text", "id": "nome_curto", "label": "Nome curto (vazio usa o nome do produto)", "default": "Petite Puffed Cross" },
    { "type": "text", "id": "botao", "label": "Botão", "default": "Add to bag" },
    { "type": "text", "id": "esgotado", "label": "Botão esgotado", "default": "Sold out" }
  ],
  "presets": [{ "name": "Ofirelle: barra fixa" }]
}
{% endschema %}
```

### Arquivo: sections/gb-beneficios.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-beneficios" data-gb-secao="beneficios">
  <div class="gb-wrap gb-in">
    <div>
      {%- if section.settings.rotulo != blank -%}
        <p class="gb-label"><span class="gb-fio gb-d" aria-hidden="true"></span>{{ section.settings.rotulo | escape }}</p>
      {%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
    </div>
    <ul>
      {%- for block in section.blocks -%}
        <li {{ block.shopify_attributes }}>
          <span style="color: var(--gb-gold)">{% render 'gb-icone', nome: block.settings.icone, tamanho: 24 %}</span>
          <div>
            <h3>{{ block.settings.titulo | escape }}</h3>
            <p>{{ block.settings.texto | escape }}</p>
          </div>
        </li>
      {%- endfor -%}
    </ul>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: benefícios",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Made for every day" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Small, soft, and <em>easy to wear.</em>" }
  ],
  "blocks": [
    {
      "type": "beneficio",
      "name": "Benefício",
      "settings": [
        {
          "type": "select",
          "id": "icone",
          "label": "Ícone",
          "options": [
            { "value": "cross", "label": "Cruz" },
            { "value": "ruler", "label": "Medida" },
            { "value": "heart", "label": "Coração" },
            { "value": "gift", "label": "Presente" },
            { "value": "shield", "label": "Escudo" }
          ],
          "default": "cross"
        },
        { "type": "text", "id": "titulo", "label": "Título", "default": "A softly rounded cross" },
        { "type": "text", "id": "texto", "label": "Texto", "default": "A solid puffed shape with smooth edges that catch the light." }
      ]
    }
  ],
  "max_blocks": 3,
  "presets": [
    {
      "name": "Ofirelle: benefícios",
      "blocks": [
        { "type": "beneficio", "settings": { "icone": "cross", "titulo": "A softly rounded cross", "texto": "A solid puffed shape with smooth edges that catch the light." } },
        { "type": "beneficio", "settings": { "icone": "ruler", "titulo": "Choker to collarbone", "texto": "Adjust it with the extender." } },
        { "type": "beneficio", "settings": { "icone": "heart", "titulo": "Easy to layer", "texto": "Wear it alone or layered with other necklaces." } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-cadastro.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-cadastro gb-sec" data-gb-secao="cadastro">
  <div class="gb-wrap">
    <div class="gb-cad-in">
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-txt">{{ section.settings.texto | escape }}</p>{%- endif -%}
      {%- form 'customer', id: 'gb-cadastro-form', class: 'gb-form' -%}
        {%- assign gb_enviado = form.posted_successfully? -%}
        {%- assign gb_com_erro = form.errors -%}
        <input type="hidden" name="contact[tags]" value="newsletter">
        <label for="gb-email-{{ section.id }}" class="gb-sr">{{ section.settings.rotulo_campo | escape }}</label>
        <input id="gb-email-{{ section.id }}" type="email" name="contact[email]" placeholder="{{ section.settings.rotulo_campo | escape }}" autocomplete="email" required{% if gb_com_erro %} aria-invalid="true"{% endif %}>
        <button type="submit" class="gb-btn gb-btn-p">{{ section.settings.botao | escape }}</button>
      {%- endform -%}
      <p class="gb-form-ok" role="status">
        {%- if gb_enviado -%}{{ section.settings.mensagem_ok | escape }}{%- endif -%}
      </p>
      {%- if gb_com_erro -%}
        <p class="gb-form-erro" role="alert">{{ section.settings.mensagem_erro | escape }}</p>
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: cadastro",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "New pieces and <em>gift ideas.</em>" },
    { "type": "text", "id": "texto", "label": "Texto", "default": "New pieces and gift ideas. Leave anytime." },
    { "type": "text", "id": "rotulo_campo", "label": "Texto do campo de e-mail", "default": "Email address" },
    { "type": "text", "id": "botao", "label": "Botão", "default": "Join" },
    { "type": "text", "id": "mensagem_ok", "label": "Mensagem de sucesso", "default": "Thank you. You are on the list." },
    { "type": "text", "id": "mensagem_erro", "label": "Mensagem de erro", "default": "Please enter a valid email address." }
  ],
  "presets": [{ "name": "Ofirelle: cadastro" }]
}
{% endschema %}
```

### Arquivo: sections/gb-camadas-prontas.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>

{%- assign gb_ativa = section.settings.promo_ativa -%}
<section class="gb-root gb-camadas-prontas gb-sec gb-linen" data-gb-secao="camadas-prontas" data-gb-cart-add="{{ routes.cart_add_url }}.js" data-gb-cart-url="{{ routes.cart_url }}" data-gb-money="{{ shop.money_format | escape }}">
  <div class="gb-wrap">
    <div class="gb-head"><h2 class="gb-h2">{{ section.settings.titulo }}</h2></div>
    <div class="gb-sets">
      {%- for block in section.blocks -%}
        {%- liquid
          assign gb_total = 0
          assign gb_n = 0
          assign gb_itens = ''
          assign gb_nomes = ''
          assign gb_primeira = ''
          assign gb_slots = 'peca_1,peca_2,peca_3,peca_4' | split: ','
        -%}
        {%- capture gb_minis -%}
          {%- for slot in gb_slots -%}
            {%- assign gb_p = block.settings[slot] -%}
            {%- if gb_p != blank and gb_p.available -%}
              {%- assign gb_v = gb_p.selected_or_first_available_variant -%}
              {%- assign gb_total = gb_total | plus: gb_v.price -%}
              {%- assign gb_n = gb_n | plus: 1 -%}
              {%- if gb_primeira == blank -%}{%- assign gb_primeira = gb_v.id -%}{%- endif -%}
              {%- capture gb_item -%}{"id":{{ gb_v.id }},"quantity":1}{%- endcapture -%}
              {%- if gb_itens == blank -%}{%- assign gb_itens = gb_item -%}{%- else -%}{%- assign gb_itens = gb_itens | append: ',' | append: gb_item -%}{%- endif -%}
              {%- if gb_nomes == blank -%}{%- assign gb_nomes = gb_p.title -%}{%- else -%}{%- assign gb_nomes = gb_nomes | append: ', ' | append: gb_p.title -%}{%- endif -%}
              {%- render 'gb-imagem', imagem: gb_p.featured_image, alt: gb_p.title, carga: 'lazy', widths: '160, 320', sizes: '64px', classe: 'gb-mini-img' -%}
            {%- endif -%}
          {%- endfor -%}
        {%- endcapture -%}
        {%- liquid
          assign gb_desc = 0
          if gb_ativa and gb_n >= section.settings.promo_qtd
            assign gb_desc = gb_total | times: section.settings.promo_pct | divided_by: 100.0 | round
          endif
          assign gb_pagar = gb_total | minus: gb_desc
        -%}
        <article class="gb-set" {{ block.shopify_attributes }}>
          {%- assign gb_img = block.settings.imagem | default: block.settings.imagem_reserva -%}
          {%- if gb_img != blank -%}
            <div class="gb-ph">
              {%- render 'gb-imagem', imagem: gb_img, alt: block.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 50vw, 100vw' -%}
            </div>
          {%- endif -%}
          <div class="gb-set-topo">
            <h3 class="gb-h3">{{ block.settings.nome | escape }}</h3>
            <p class="gb-set-preco">{%- if gb_desc > 0 -%}<s>{{ gb_total | money }}</s>{%- endif -%}{{ gb_pagar | money }}</p>
          </div>
          <p class="gb-small">{{ block.settings.descricao | default: gb_nomes | escape }}</p>
          {%- if gb_n > 0 -%}
            <form class="gb-set-pe" action="{{ routes.cart_add_url }}" method="post" data-gb-itens='[{{ gb_itens }}]'>
              <div class="gb-minis">{{ gb_minis }}</div>
              <input type="hidden" name="id" value="{{ gb_primeira }}">
              <button type="submit" class="gb-btn gb-btn-p" data-gb-add-conjunto data-gb-texto="{{ section.settings.botao_texto | escape }}" data-gb-texto-ok="{{ section.settings.botao_ok | escape }}" aria-live="polite">{{ section.settings.botao_texto | escape }}</button>
            </form>
          {%- endif -%}
        </article>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: conjuntos",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Two sets, <em>ready to give.</em>" },
    { "type": "text", "id": "botao_texto", "label": "Botão: texto", "default": "Add the set" },
    { "type": "text", "id": "botao_ok", "label": "Botão: texto depois de adicionar", "default": "Added to your bag" },
    { "type": "header", "content": "Oferta (use os mesmos valores nas outras seções)" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (só ligue depois de criar o desconto automático e provar no carrinho)", "default": false },
    { "type": "number", "id": "promo_pct", "label": "Desconto (%)", "default": 20 },
    { "type": "range", "id": "promo_qtd", "label": "Peças para o desconto", "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "paragraph", "content": "O desconto em si é automático da loja (criado em Descontos). Aqui a página mostra só a estimativa." }
  ],
  "blocks": [
    {
      "type": "conjunto",
      "name": "Conjunto",
      "settings": [
        { "type": "text", "id": "nome", "label": "Nome do conjunto", "default": "The Everyday Grace Set" },
        { "type": "text", "id": "descricao", "label": "Descrição curta (vazio lista os nomes dos produtos)" },
        { "type": "product", "id": "peca_1", "label": "Peça 1" },
        { "type": "product", "id": "peca_2", "label": "Peça 2" },
        { "type": "product", "id": "peca_3", "label": "Peça 3" },
        { "type": "product", "id": "peca_4", "label": "Peça 4 (opcional)" },
        { "type": "image_picker", "id": "imagem", "label": "Foto do conjunto" },
        { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
        { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Two fine gold cross necklaces layered on the collarbone" },
        { "type": "paragraph", "content": "A foto própria de camadas ainda não existe. Enquanto a foto acima estiver vazia, aparece a foto reserva." }
      ]
    }
  ],
  "max_blocks": 4,
  "presets": [
    {
      "name": "Ofirelle: conjuntos",
      "blocks": [{ "type": "conjunto" }, { "type": "conjunto" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-combine-com.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>

{%- assign gb_pct = section.settings.promo_pct -%}
{%- assign gb_minq = section.settings.promo_qtd -%}
<section class="gb-root gb-combine-com" data-gb-secao="combine-com" data-gb-cart-add="{{ routes.cart_add_url }}.js" data-gb-cart-url="{{ routes.cart_url }}" data-gb-money="{{ shop.money_format | escape }}">
  <div class="gb-wrap">
    <div class="gb-cc-head">
      <div>
        {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
        <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      </div>
      {%- if section.settings.promo_ativa and section.settings.nota != blank -%}
        <p class="gb-muted">{{ section.settings.nota | escape | replace: '{qtd}', gb_minq | replace: '{pct}', gb_pct }}</p>
      {%- endif -%}
    </div>
    <div class="gb-cc-cards">
      {%- for block in section.blocks -%}
        {%- assign gb_p = block.settings.produto -%}
        {%- if gb_p != blank -%}
          {%- assign gb_v = gb_p.selected_or_first_available_variant -%}
          <div class="gb-card" {{ block.shopify_attributes }}>
            <a href="{{ gb_p.url }}">
              <div class="gb-ph">
                {%- render 'gb-imagem', imagem: gb_p.featured_image, alt: gb_p.title, carga: 'lazy', widths: '300, 450, 600, 900', sizes: '(min-width: 1100px) 25vw, 50vw' -%}
              </div>
              <p class="gb-card-nome">{{ gb_p.title | escape }}</p>
              <p class="gb-card-preco">{{ gb_v.price | money }}</p>
            </a>
            {%- if gb_p.available and gb_v.available -%}
              <button type="button" class="gb-add" data-gb-add-variante="{{ gb_v.id }}">{{ section.settings.botao | escape }}</button>
            {%- else -%}
              <button type="button" class="gb-add" disabled>{{ section.settings.esgotado | escape }}</button>
            {%- endif -%}
          </div>
        {%- endif -%}
      {%- endfor -%}
    </div>
    <p class="gb-erro" role="alert" data-gb-erro hidden>{{ section.settings.erro | escape }}</p>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: combine com",
  "tag": "div",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Complete your set" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Wear it <em>with.</em>" },
    { "type": "text", "id": "nota", "label": "Nota ({qtd} e {pct} viram os valores da oferta)", "default": "Any {qtd}, {pct}% off." },
    { "type": "text", "id": "botao", "label": "Botão", "default": "Add" },
    { "type": "text", "id": "esgotado", "label": "Botão esgotado", "default": "Sold out" },
    { "type": "text", "id": "erro", "label": "Erro ao adicionar", "default": "We could not add this to your bag. Please try again." },
    { "type": "header", "content": "Oferta (use os mesmos valores nas outras seções)" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (só ligue depois de criar o desconto automático e provar no carrinho)", "default": false },
    { "type": "number", "id": "promo_pct", "label": "Desconto (%)", "default": 20 },
    { "type": "range", "id": "promo_qtd", "label": "Peças para o desconto", "min": 2, "max": 6, "step": 1, "default": 3 }
  ],
  "blocks": [
    {
      "type": "produto",
      "name": "Produto",
      "limit": 8,
      "settings": [
        { "type": "product", "id": "produto", "label": "Produto" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ofirelle: combine com",
      "blocks": [{ "type": "produto" }, { "type": "produto" }, { "type": "produto" }, { "type": "produto" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-como-funciona.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign gb_ativa = section.settings.promo_ativa
  assign gb_pct = section.settings.promo_pct
  assign gb_qtd = section.settings.promo_qtd
  assign gb_p = section.settings.produto
  assign gb_conta = ''
  if gb_ativa and gb_p != blank
    assign gb_preco = gb_p.selected_or_first_available_variant.price
    assign gb_total = gb_preco | times: gb_qtd
    assign gb_desc = gb_total | times: gb_pct | divided_by: 100.0 | round
    assign gb_pagar = gb_total | minus: gb_desc
    assign gb_cada = gb_pagar | times: 1.0 | divided_by: gb_qtd | round
    assign gb_preco_fmt = gb_preco | money | escape
    assign gb_cada_fmt = gb_cada | money | escape
    assign gb_total_html = gb_total | money | escape | prepend: '<s>' | append: '</s>'
    assign gb_pagar_html = gb_pagar | money | escape | prepend: '<strong>' | append: '</strong>'
    assign gb_conta = section.settings.conta | escape | replace: '{qtd}', gb_qtd | replace: '{preco}', gb_preco_fmt | replace: '{total}', gb_total_html | replace: '{pagar}', gb_pagar_html | replace: '{cada}', gb_cada_fmt
  endif
-%}
<section class="gb-root gb-como gb-sec" id="{{ section.settings.ancora | default: 'faith-set' }}" data-gb-secao="como-funciona">
  <div class="gb-wrap">
    <div class="gb-head gb-center" style="margin-bottom: 56px">
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
    </div>
    <div class="gb-passos">
      {%- for block in section.blocks -%}
        <div class="gb-passo" {{ block.shopify_attributes }}>
          {%- if block.settings.imagem != blank -%}
            <div class="gb-ph">
              {%- render 'gb-imagem', imagem: block.settings.imagem, alt: block.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 400px, 100vw' -%}
            </div>
          {%- endif -%}
          {%- if block.settings.legenda != blank -%}<p class="gb-legenda">{{ block.settings.legenda | escape }}</p>{%- endif -%}
          <div class="gb-passo-txt">
            <span class="gb-num">{{ forloop.index | prepend: '0' }}</span>
            <div>
              <h3 class="gb-h3">{{ block.settings.titulo | escape | replace: '{pct}', gb_pct | replace: '{qtd}', gb_qtd }}</h3>
              <p class="gb-small">{{ block.settings.texto | escape | replace: '{pct}', gb_pct | replace: '{qtd}', gb_qtd }}</p>
            </div>
          </div>
        </div>
      {%- endfor -%}
    </div>
    {%- if gb_conta != blank -%}
      <p class="gb-conta">{{ gb_conta }}</p>
    {%- endif -%}
    {%- if section.settings.botao_texto != blank -%}
      <div class="gb-acao"><a href="{{ section.settings.botao_url | default: routes.all_products_collection_url }}" class="gb-btn gb-btn-p">{{ section.settings.botao_texto | escape }}</a></div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: como funciona",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "text", "id": "ancora", "label": "Âncora do link (sem #)", "default": "faith-set" },
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Build your faith set" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Three crosses. One for you, <em>two to give.</em>" },
    { "type": "header", "content": "Oferta (use os mesmos valores nas outras seções)" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (só ligue depois de criar o desconto automático e provar no carrinho)", "default": false },
    { "type": "number", "id": "promo_pct", "label": "Desconto (%)", "default": 20 },
    { "type": "range", "id": "promo_qtd", "label": "Peças para o desconto", "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "product", "id": "produto", "label": "Produto usado na conta (preço real)" },
    { "type": "text", "id": "conta", "label": "Frase da conta ({qtd}, {preco}, {total}, {pagar}, {cada})", "default": "For example, {qtd} x {preco} = {total}. You pay {pagar}, about {cada} each." },
    { "type": "header", "content": "Botão" },
    { "type": "text", "id": "botao_texto", "label": "Texto", "default": "Start your set" },
    { "type": "url", "id": "botao_url", "label": "Link" }
  ],
  "blocks": [
    {
      "type": "passo",
      "name": "Passo",
      "settings": [
        { "type": "image_picker", "id": "imagem", "label": "Foto" },
        { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Gold cross necklace worn close to the neck" },
        { "type": "text", "id": "legenda", "label": "Legenda da foto", "default": "For you" },
        { "type": "text", "id": "titulo", "label": "Título ({qtd} e {pct} viram os valores da oferta)", "default": "Choose any {qtd}" },
        { "type": "text", "id": "texto", "label": "Texto", "default": "Mix any 3 necklaces." }
      ]
    }
  ],
  "max_blocks": 3,
  "presets": [
    {
      "name": "Ofirelle: como funciona",
      "blocks": [{ "type": "passo" }, { "type": "passo" }, { "type": "passo" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-conjunto.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>

{%- liquid
  assign gb_ativa = section.settings.promo_ativa
  assign gb_pct = section.settings.promo_pct
  assign gb_minq = section.settings.promo_qtd
  assign gb_img = section.settings.imagem | default: section.settings.imagem_reserva
  assign gb_total = 0
  assign gb_n = 0
  assign gb_pecas_json = ''
-%}
{%- capture gb_pecas_html -%}
  {%- for block in section.blocks -%}
    {%- assign gb_p = block.settings.produto -%}
    {%- if gb_p != blank and gb_p.available -%}
      {%- assign gb_v = gb_p.selected_or_first_available_variant -%}
      {%- assign gb_marcada = block.settings.marcada -%}
      {%- if gb_marcada -%}
        {%- assign gb_total = gb_total | plus: gb_v.price -%}
        {%- assign gb_n = gb_n | plus: 1 -%}
      {%- endif -%}
      {%- capture gb_pj -%}{"id":{{ gb_v.id }},"price":{{ gb_v.price }}}{%- endcapture -%}
      {%- if gb_pecas_json == blank -%}{%- assign gb_pecas_json = gb_pj -%}{%- else -%}{%- assign gb_pecas_json = gb_pecas_json | append: ',' | append: gb_pj -%}{%- endif -%}
      <button type="button" role="checkbox" aria-checked="{{ gb_marcada }}" data-gb-peca="{{ gb_v.id }}" data-gb-preco="{{ gb_v.price }}" {{ block.shopify_attributes }}>
        <span class="gb-pf">
          {%- render 'gb-imagem', imagem: gb_p.featured_image, alt: gb_p.title, carga: 'lazy', widths: '300, 450, 600', sizes: '(min-width: 1100px) 190px, 150px' -%}
          <span class="gb-chk">{% render 'gb-icone', nome: 'check', tamanho: 16 %}</span>
        </span>
        <span class="gb-pn">{{ gb_p.title | escape }}</span>
        <span class="gb-pp">{{ gb_v.price | money }}</span>
      </button>
    {%- endif -%}
  {%- endfor -%}
{%- endcapture -%}
{%- liquid
  assign gb_desc = 0
  if gb_ativa and gb_n >= gb_minq
    assign gb_desc = gb_total | times: gb_pct | divided_by: 100.0 | round
  endif
  assign gb_pagar = gb_total | minus: gb_desc
  assign gb_cada = 0
  if gb_n > 0
    assign gb_cada = gb_pagar | times: 1.0 | divided_by: gb_n | round
  endif
  assign gb_cada_fmt = gb_cada | money
  assign gb_desc_fmt = gb_desc | money
  assign gb_faltam = gb_minq | minus: gb_n
-%}

<section class="gb-root gb-conjunto" id="set" data-gb-secao="conjunto" data-gb-cart-add="{{ routes.cart_add_url }}.js" data-gb-cart-url="{{ routes.cart_url }}" data-gb-money="{{ shop.money_format | escape }}">
  <div class="gb-wrap gb-in" data-gb-conjunto>
    {%- if gb_img != blank -%}
      <div class="gb-ph gb-big">
        {%- render 'gb-imagem', imagem: gb_img, alt: section.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 521px, 100vw' -%}
      </div>
    {%- endif -%}
    <div class="gb-hd-wrap">
      <div class="gb-pad">
        {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
        <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
        {%- if section.settings.texto != blank -%}<p class="gb-lead" style="max-width: 520px">{{ section.settings.texto | escape | replace: '{pct}', gb_pct | replace: '{qtd}', gb_minq }}</p>{%- endif -%}
      </div>
    </div>
    <div class="gb-set-box">
      <p class="gb-set-name">{{ section.settings.nome_conjunto | escape }}</p>
      <div class="gb-pieces" role="group" aria-label="{{ section.settings.nome_conjunto | escape }}">{{ gb_pecas_html }}</div>
      <div class="gb-pad">
        <div class="gb-sum">
          <span class="gb-sum-l" data-gb-soma-rotulo>{%- if gb_n == 1 -%}{{ section.settings.rotulo_um | escape | replace: '{n}', gb_n }}{%- else -%}{{ section.settings.rotulo_varios | escape | replace: '{n}', gb_n }}{%- endif -%}</span>
          <span class="gb-sum-p"><s data-gb-soma-riscado{% if gb_desc == 0 %} hidden{% endif %}>{{ gb_total | money }}</s><span data-gb-soma-pagar>{{ gb_pagar | money }}</span></span>
        </div>
        <p class="gb-sum-n" data-gb-soma-nota>
          {%- if gb_desc > 0 -%}
            {{ section.settings.nota_promo | escape | replace: '{cada}', gb_cada_fmt | replace: '{economia}', gb_desc_fmt }}
          {%- elsif gb_ativa and gb_faltam > 0 -%}
            {{ section.settings.nota_faltam | escape | replace: '{faltam}', gb_faltam | replace: '{pct}', gb_pct }}
          {%- endif -%}
        </p>
        <div class="gb-set-cta">
          <button type="button" class="gb-btn gb-btn-p" data-gb-conjunto-add{% if gb_n == 0 %} disabled{% endif %}>
            {%- if gb_desc > 0 -%}{{ section.settings.botao_conjunto | escape }}{%- elsif gb_n == 1 -%}{{ section.settings.botao_um | escape }}{%- else -%}{{ section.settings.botao_varios | escape | replace: '{n}', gb_n }}{%- endif -%}
            {{ ' · ' }}{{ gb_pagar | money }}
          </button>
          {%- if section.settings.link_texto != blank -%}
            <a href="{{ section.settings.link_url | default: routes.all_products_collection_url }}" class="gb-link">{{ section.settings.link_texto | escape }}</a>
          {%- endif -%}
        </div>
        <p class="gb-erro" role="alert" data-gb-erro hidden></p>
      </div>
    </div>
    <script type="application/json" data-gb-dados>
      {
        "pecas": [{{ gb_pecas_json }}],
        "promo": { "ativa": {{ gb_ativa | json }}, "pct": {{ gb_pct }}, "qtd": {{ gb_minq }} },
        "textos": {
          "rotuloUm": {{ section.settings.rotulo_um | json }},
          "rotuloVarios": {{ section.settings.rotulo_varios | json }},
          "notaPromo": {{ section.settings.nota_promo | json }},
          "notaFaltam": {{ section.settings.nota_faltam | json }},
          "botaoConjunto": {{ section.settings.botao_conjunto | json }},
          "botaoUm": {{ section.settings.botao_um | json }},
          "botaoVarios": {{ section.settings.botao_varios | json }},
          "erro": {{ section.settings.erro | json }}
        }
      }
    </script>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: conjunto pronto",
  "tag": "div",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Build your faith set" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Three crosses. One for you, <em>two to give.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto ({qtd} e {pct} viram os valores da oferta)", "default": "Any {qtd} necklaces take {pct}% off in your bag. Start with this one." },
    { "type": "text", "id": "nome_conjunto", "label": "Nome do conjunto", "default": "The Everyday Grace Set" },
    { "type": "image_picker", "id": "imagem", "label": "Foto grande (camadas no colo)" },
    { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
    { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Two fine gold cross necklaces layered on the collarbone" },
    { "type": "paragraph", "content": "A foto própria de camadas ainda não existe. Enquanto a foto acima estiver vazia, aparece a foto reserva." },
    { "type": "header", "content": "Oferta (use os mesmos valores nas outras seções)" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (só ligue depois de criar o desconto automático e provar no carrinho)", "default": false },
    { "type": "number", "id": "promo_pct", "label": "Desconto (%)", "default": 20 },
    { "type": "range", "id": "promo_qtd", "label": "Peças para o desconto", "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "header", "content": "Textos" },
    { "type": "text", "id": "rotulo_um", "label": "Total com 1 peça ({n})", "default": "{n} necklace" },
    { "type": "text", "id": "rotulo_varios", "label": "Total com várias peças ({n})", "default": "{n} necklaces" },
    { "type": "text", "id": "nota_promo", "label": "Nota com desconto ({cada}, {economia})", "default": "about {cada} each, you save {economia}" },
    { "type": "text", "id": "nota_faltam", "label": "Nota quando faltam peças ({faltam}, {pct})", "default": "Add {faltam} more for {pct}% off" },
    { "type": "text", "id": "botao_conjunto", "label": "Botão com o desconto", "default": "Add the set" },
    { "type": "text", "id": "botao_um", "label": "Botão com 1 peça", "default": "Add to bag" },
    { "type": "text", "id": "botao_varios", "label": "Botão com várias peças ({n})", "default": "Add {n} necklaces" },
    { "type": "text", "id": "link_texto", "label": "Link: texto", "default": "Choose your own 3" },
    { "type": "url", "id": "link_url", "label": "Link: destino" },
    { "type": "text", "id": "erro", "label": "Erro ao adicionar", "default": "We could not add this to your bag. Please try again." }
  ],
  "blocks": [
    {
      "type": "peca",
      "name": "Peça do conjunto",
      "limit": 6,
      "settings": [
        { "type": "product", "id": "produto", "label": "Produto" },
        { "type": "checkbox", "id": "marcada", "label": "Começa marcada", "default": true }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ofirelle: conjunto pronto",
      "blocks": [{ "type": "peca" }, { "type": "peca" }, { "type": "peca" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-cuidados.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-cuidados" data-gb-secao="cuidados">
  <div class="gb-wrap gb-in">
    <div>
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
    </div>
    <ol>
      {%- for block in section.blocks -%}
        <li {{ block.shopify_attributes }}><span class="gb-num">{{ forloop.index | prepend: '0' }}</span><span>{{ block.settings.texto | escape }}</span></li>
      {%- endfor -%}
    </ol>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: cuidados",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Care" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Keep it <em>bright.</em>" }
  ],
  "blocks": [
    {
      "type": "dica",
      "name": "Dica de cuidado",
      "settings": [
        { "type": "text", "id": "texto", "label": "Texto", "default": "Put it on after perfume and lotion." }
      ]
    }
  ],
  "max_blocks": 9,
  "presets": [
    {
      "name": "Ofirelle: cuidados",
      "blocks": [
        { "type": "dica", "settings": { "texto": "Put it on after perfume and lotion." } },
        { "type": "dica", "settings": { "texto": "Wipe it with a soft cloth." } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-detalhe.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_b = section.settings.imagem_b | default: section.settings.imagem_b_reserva -%}
<section class="gb-root gb-detalhe" data-gb-secao="detalhe">
  <div class="gb-wrap gb-in">
    <div class="gb-t">
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-lead">{{ section.settings.texto | escape }}</p>{%- endif -%}
    </div>
    <div class="gb-pair">
      {%- if section.settings.imagem_a != blank -%}
        <figure>
          <div class="gb-ph">{%- render 'gb-imagem', imagem: section.settings.imagem_a, alt: section.settings.alt_a, carga: 'lazy', sizes: '(min-width: 1100px) 410px, 100vw' -%}</div>
          {%- if section.settings.legenda_a != blank -%}<figcaption>{{ section.settings.legenda_a | escape }}</figcaption>{%- endif -%}
        </figure>
      {%- endif -%}
      {%- if gb_b != blank -%}
        <figure>
          <div class="gb-ph">{%- render 'gb-imagem', imagem: gb_b, alt: section.settings.alt_b, carga: 'lazy', sizes: '(min-width: 1100px) 410px, 100vw' -%}</div>
          {%- if section.settings.legenda_b != blank -%}<figcaption>{{ section.settings.legenda_b | escape }}</figcaption>{%- endif -%}
        </figure>
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: detalhe",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Up close" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Rounded, so it <em>catches the light.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto", "default": "Smooth edges, on a fine cable chain with a lobster clasp." },
    { "type": "header", "content": "Foto 1: o pingente" },
    { "type": "image_picker", "id": "imagem_a", "label": "Foto" },
    { "type": "text", "id": "alt_a", "label": "Texto alternativo", "default": "Close-up of the puffed gold cross pendant on champagne satin" },
    { "type": "text", "id": "legenda_a", "label": "Legenda", "default": "The pendant" },
    { "type": "header", "content": "Foto 2: o fecho" },
    { "type": "image_picker", "id": "imagem_b", "label": "Foto própria (macro do fecho lagosta e da corrente extensora)" },
    { "type": "image_picker", "id": "imagem_b_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
    { "type": "text", "id": "alt_b", "label": "Texto alternativo", "default": "Petite Puffed Cross Necklace laid flat, with clasp and extender chain" },
    { "type": "text", "id": "legenda_b", "label": "Legenda", "default": "The clasp" },
    { "type": "paragraph", "content": "A macro do fecho ainda não existe. Enquanto estiver vazia, aparece a foto reserva." }
  ],
  "presets": [{ "name": "Ofirelle: detalhe" }]
}
{% endschema %}
```

### Arquivo: sections/gb-galeria-compra.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>

{%- liquid
  assign gb_ativa = section.settings.promo_ativa
  assign gb_pct = section.settings.promo_pct
  assign gb_minq = section.settings.promo_qtd
  assign gb_frete = section.settings.frete_gratis_acima | times: 100
  assign gb_frete_fmt = gb_frete | money_without_trailing_zeros
  assign gb_v = product.selected_or_first_available_variant
  assign gb_preco = gb_v.price
  assign gb_maxq = 2
  if gb_ativa and gb_minq > 2
    assign gb_maxq = gb_minq
  endif
  assign gb_ex_json = ''
  assign gb_lp = gb_preco
  assign gb_linha = 1
-%}

{%- comment -%} Linhas da lista do conjunto: 1 = esta peça, depois as peças extras, depois repete esta peça até completar. {%- endcomment -%}
{%- capture gb_linhas_html -%}
  <li data-gb-min="1">
    {%- render 'gb-imagem', imagem: product.featured_image, alt: product.title, carga: 'lazy', widths: '112, 224', sizes: '56px' -%}
    <span>{{ product.title | escape }}</span>
    <span data-gb-linha-preco="1">{{ gb_preco | money }}</span>
  </li>
  {%- for block in section.blocks -%}
    {%- if block.type == 'peca_extra' -%}
      {%- assign gb_p = block.settings.produto -%}
      {%- if gb_p != blank and gb_p.available and gb_linha < gb_maxq -%}
        {%- assign gb_linha = gb_linha | plus: 1 -%}
        {%- assign gb_pv = gb_p.selected_or_first_available_variant -%}
        {%- assign gb_lp = gb_lp | append: ',' | append: gb_pv.price -%}
        {%- capture gb_ex -%}{"id":{{ gb_pv.id }},"price":{{ gb_pv.price }}}{%- endcapture -%}
        {%- if gb_ex_json == blank -%}{%- assign gb_ex_json = gb_ex -%}{%- else -%}{%- assign gb_ex_json = gb_ex_json | append: ',' | append: gb_ex -%}{%- endif -%}
        <li data-gb-min="{{ gb_linha }}" {{ block.shopify_attributes }}>
          {%- render 'gb-imagem', imagem: gb_p.featured_image, alt: gb_p.title, carga: 'lazy', widths: '112, 224', sizes: '56px' -%}
          <span>{{ gb_p.title | escape }}<br><a href="{{ section.settings.url_trocar | default: routes.all_products_collection_url }}">{{ section.settings.texto_trocar | escape }}</a></span>
          <span>{{ gb_pv.price | money }}</span>
        </li>
      {%- endif -%}
    {%- endif -%}
  {%- endfor -%}
  {%- for gb_pad in (2..gb_maxq) -%}
    {%- if gb_pad > gb_linha -%}
      {%- assign gb_lp = gb_lp | append: ',' | append: gb_preco -%}
      <li data-gb-min="{{ gb_pad }}" data-gb-repete="true">
        {%- render 'gb-imagem', imagem: product.featured_image, alt: product.title, carga: 'lazy', widths: '112, 224', sizes: '56px' -%}
        <span>{{ product.title | escape }}<br><a href="{{ section.settings.url_trocar | default: routes.all_products_collection_url }}">{{ section.settings.texto_trocar | escape }}</a></span>
        <span>{{ gb_preco | money }}</span>
      </li>
    {%- endif -%}
  {%- endfor -%}
{%- endcapture -%}

{%- liquid
  assign gb_precos = gb_lp | split: ','
  assign gb_qtds_s = '1,2'
  if gb_ativa and gb_minq > 2
    assign gb_qtds_s = gb_qtds_s | append: ',' | append: gb_minq
  endif
  assign gb_qtds = gb_qtds_s | split: ','
  assign gb_sel = 1
  if gb_ativa
    assign gb_sel = gb_minq
  endif
  assign gb_colunas = gb_qtds.size
-%}

{%- comment -%} Estado inicial (para quem abre sem JS e para o primeiro desenho). O JS refaz as mesmas contas quando a pessoa clica. {%- endcomment -%}
{%- liquid
  assign gb_total_sel = 0
  for gb_i in (1..gb_sel)
    assign gb_idx = gb_i | minus: 1
    assign gb_pl = gb_precos[gb_idx] | plus: 0
    assign gb_total_sel = gb_total_sel | plus: gb_pl
  endfor
  assign gb_desc_sel = 0
  if gb_ativa and gb_sel >= gb_minq
    assign gb_desc_sel = gb_total_sel | times: gb_pct | divided_by: 100.0 | round
  endif
  assign gb_pagar_sel = gb_total_sel | minus: gb_desc_sel
-%}

<section class="gb-root gb-galeria-compra" data-gb-secao="galeria-compra" data-gb-cart-add="{{ routes.cart_add_url }}.js" data-gb-cart-url="{{ routes.cart_url }}" data-gb-money="{{ shop.money_format | escape }}">
  <div class="gb-wrap gb-in">
    <div class="gb-gal" data-gb-galeria>
      <div class="gb-gal-strip" tabindex="0" aria-label="{{ section.settings.gal_rotulo | escape }}" data-gb-gal-strip>
        {%- assign gb_total_midias = 0 -%}
        {%- for media in product.media -%}
          {%- if media.media_type == 'image' -%}
            {%- assign gb_total_midias = gb_total_midias | plus: 1 -%}
            {%- assign gb_alt_midia = media.alt | default: product.title -%}
            <div class="gb-ph gb-gal-item{% if gb_total_midias == 1 %} gb-main{% endif %}" data-gb-item>
              <button type="button" data-gb-thumb="{{ gb_total_midias }}" aria-label="{{ section.settings.gal_ver | escape | replace: '{n}', gb_total_midias }}">
                {%- if gb_total_midias == 1 -%}
                  {%- render 'gb-imagem', imagem: media.preview_image, alt: gb_alt_midia, carga: 'eager', sizes: '(min-width: 1100px) 741px, (min-width: 760px) 50vw, 100vw', widths: '400, 600, 800, 1000, 1200' -%}
                {%- else -%}
                  {%- render 'gb-imagem', imagem: media.preview_image, alt: gb_alt_midia, carga: 'lazy', sizes: '(min-width: 1100px) 370px, (min-width: 760px) 25vw, 100vw', widths: '400, 600, 800, 1000, 1200' -%}
                {%- endif -%}
              </button>
            </div>
          {%- endif -%}
        {%- endfor -%}
      </div>
      <button type="button" class="gb-gal-nav gb-gal-prev" aria-label="{{ section.settings.gal_ant | escape }}" data-gb-passo="-1"><span>{% render 'gb-icone', nome: 'arrow', tamanho: 16 %}</span></button>
      <button type="button" class="gb-gal-nav gb-gal-next" aria-label="{{ section.settings.gal_prox | escape }}" data-gb-passo="1"><span>{% render 'gb-icone', nome: 'arrow', tamanho: 16 %}</span></button>
      <span class="gb-gal-count" aria-live="polite" data-gb-contador="{{ section.settings.gal_contador | escape }}" data-gb-total="{{ gb_total_midias }}">{{ section.settings.gal_contador | escape | replace: '{atual}', '1' | replace: '{total}', gb_total_midias }}</span>
    </div>

    <div class="gb-buy" data-gb-compra>
      {%- if section.settings.breadcrumb_texto != blank and section.settings.breadcrumb_url != blank -%}
        <nav class="gb-crumb gb-d" aria-label="Breadcrumb"><a href="{{ section.settings.breadcrumb_url }}">{{ section.settings.breadcrumb_texto | escape }}</a><span aria-hidden="true">/</span><span>{{ product.title | escape }}</span></nav>
      {%- endif -%}
      <h1>{{ product.title | escape }}</h1>
      <p class="gb-price" data-gb-preco-produto>{{ gb_preco | money }}</p>
      {%- if section.settings.material != blank -%}<p class="gb-mat">{{ section.settings.material | escape }}</p>{%- endif -%}
      <ul class="gb-bens">
        {%- if section.settings.beneficio_1 != blank -%}<li>{% render 'gb-icone', nome: 'heart' %}{{ section.settings.beneficio_1 | escape | replace: '{frete}', gb_frete_fmt }}</li>{%- endif -%}
        {%- if section.settings.beneficio_2 != blank -%}<li>{% render 'gb-icone', nome: 'truck' %}{{ section.settings.beneficio_2 | escape | replace: '{frete}', gb_frete_fmt }}</li>{%- endif -%}
        {%- if section.settings.beneficio_3 != blank -%}<li>{% render 'gb-icone', nome: 'gift' %}{{ section.settings.beneficio_3 | escape | replace: '{frete}', gb_frete_fmt }}</li>{%- endif -%}
      </ul>
      <div class="gb-rule gb-d"></div>
      {%- unless gb_v.title == 'Default Title' -%}
        <div class="gb-finish">
          <p>{{ section.settings.rotulo_acabamento | escape }}: <span data-gb-variante-nome>{{ gb_v.option1 | escape }}</span></p>
          {%- if product.variants.size > 1 -%}
            <div role="group" aria-label="{{ section.settings.rotulo_acabamento | escape }}">
              {%- for variant in product.variants -%}
                <button type="button" class="gb-chip" data-gb-variante="{{ variant.id }}" aria-pressed="{% if variant.id == gb_v.id %}true{% else %}false{% endif %}"{% unless variant.available %} disabled{% endunless %}>{{ variant.option1 | escape }}</button>
              {%- endfor -%}
            </div>
          {%- else -%}
            <button type="button" class="gb-ib" aria-label="{{ gb_v.option1 | escape }}" aria-pressed="true"><span class="gb-sw"><i></i></span></button>
          {%- endif -%}
        </div>
      {%- endunless -%}

      {%- if gb_ativa or section.settings.rotulo_conjunto != blank -%}
        <p class="gb-label gb-set-label gb-d">{{ section.settings.rotulo_conjunto | escape }}</p>
      {%- endif -%}
      <div class="gb-qty gb-qty--{{ gb_colunas }}" role="radiogroup" aria-label="{{ section.settings.rotulo_qtd | escape }}" data-gb-qtys>
        {%- for gb_qs in gb_qtds -%}
          {%- liquid
            assign gb_q = gb_qs | plus: 0
            assign gb_t = 0
            for gb_i in (1..gb_q)
              assign gb_idx = gb_i | minus: 1
              assign gb_pl = gb_precos[gb_idx] | plus: 0
              assign gb_t = gb_t | plus: gb_pl
            endfor
            assign gb_d = 0
            if gb_ativa and gb_q >= gb_minq
              assign gb_d = gb_t | times: gb_pct | divided_by: 100.0 | round
            endif
            assign gb_pg = gb_t | minus: gb_d
            assign gb_cd = gb_pg | times: 1.0 | divided_by: gb_q | round
            assign gb_ec = gb_d
          -%}
          <button type="button" role="radio" aria-checked="{% if gb_q == gb_sel %}true{% else %}false{% endif %}" data-gb-qty="{{ gb_q }}">
            {%- if gb_d > 0 -%}<span class="gb-badge">{{ section.settings.selo_melhor | escape }}</span>{%- endif -%}
            <span class="gb-q1">{%- if gb_q == 1 -%}{{ section.settings.rotulo_um | escape | replace: '{n}', gb_q }}{%- else -%}{{ section.settings.rotulo_varios | escape | replace: '{n}', gb_q }}{%- endif -%}</span>
            <span class="gb-q2">{{ gb_pg | money }}{%- if gb_d > 0 %} <s>{{ gb_t | money }}</s>{%- endif -%}</span>
            {%- capture gb_cd_fmt -%}{{ gb_cd | money }}{%- endcapture -%}
            {%- capture gb_ec_fmt -%}{{ gb_ec | money }}{%- endcapture -%}
            <span class="gb-q3 gb-gold">
              {%- if gb_d > 0 -%}
                {{ section.settings.cartao_cada | escape | replace: '{cada}', gb_cd_fmt }}<span class="gb-d">{{ section.settings.cartao_economia | escape | replace: '{economia}', gb_ec_fmt }}</span>
              {%- elsif gb_t >= gb_frete -%}
                {{ section.settings.cartao_frete | escape | replace: '{frete}', gb_frete_fmt }}
              {%- elsif gb_q == 1 -%}
                {{ section.settings.cartao_um | escape }}
              {%- endif -%}
            </span>
          </button>
        {%- endfor -%}
      </div>

      <div class="gb-set-list" data-gb-lista{% if gb_sel < 2 %} hidden{% endif %}>
        <ul>{{ gb_linhas_html }}</ul>
        <p class="gb-set-total" data-gb-total-linha>
          {%- if gb_desc_sel > 0 -%}
            <span>{{ section.settings.total_rotulo | escape }}</span><span><s>{{ gb_total_sel | money }}</s> <strong>{{ gb_pagar_sel | money }}</strong></span>
          {%- elsif gb_total_sel >= gb_frete -%}
            <span>{{ section.settings.frete_incluido | escape | replace: '{frete}', gb_frete_fmt }}</span><strong>{{ gb_pagar_sel | money }}</strong>
          {%- else -%}
            <span>{{ section.settings.total_rotulo | escape }}</span><strong>{{ gb_pagar_sel | money }}</strong>
          {%- endif -%}
        </p>
      </div>

      {%- form 'product', product, id: 'gb-form-produto', class: 'gb-form-produto', novalidate: 'novalidate', data-gb-form-produto: '' -%}
        <input type="hidden" name="id" value="{{ gb_v.id }}" data-gb-variante-id{% unless gb_v.available %} disabled{% endunless %}>
        <button type="submit" class="gb-btn gb-btn-p gb-btn-full gb-buy-btn" data-gb-comprar{% unless gb_v.available %} disabled aria-disabled="true"{% endunless %}>
          {%- if gb_v.available -%}
            {%- if gb_sel == 1 -%}{{ section.settings.botao_um | escape }}{%- else -%}{{ section.settings.botao_varios | escape | replace: '{n}', gb_sel }}{%- endif -%}
            {{ ' · ' }}{{ gb_pagar_sel | money }}
          {%- else -%}
            {{ section.settings.botao_esgotado | escape }}
          {%- endif -%}
        </button>
        <p class="gb-note" data-gb-nota>
          {%- if gb_desc_sel > 0 -%}
            {%- capture gb_ec_sel_fmt -%}{{ gb_desc_sel | money }}{%- endcapture -%}
            <span class="gb-m gb-mi-inline" data-gb-nota-economia>{{ section.settings.nota_economia | escape | replace: '{economia}', gb_ec_sel_fmt }}</span>{{ section.settings.nota_promo | escape | replace: '{pct}', gb_pct | replace: '{qtd}', gb_minq }}
          {%- elsif gb_ativa and gb_sel < gb_minq -%}
            {%- assign gb_faltam = gb_minq | minus: gb_sel -%}
            {{ section.settings.nota_faltam | escape | replace: '{faltam}', gb_faltam | replace: '{pct}', gb_pct }}
          {%- endif -%}
        </p>
        <p class="gb-erro" role="alert" data-gb-erro hidden></p>
      {%- endform -%}

      <div class="gb-mini">
        {%- if section.settings.mini_1 != blank -%}<p>{% render 'gb-icone', nome: 'truck', tamanho: 18 %}{{ section.settings.mini_1 | escape | replace: '{frete}', gb_frete_fmt }}</p>{%- endif -%}
        {%- if section.settings.mini_2 != blank -%}<p>{% render 'gb-icone', nome: 'return', tamanho: 18 %}{{ section.settings.mini_2 | escape }}</p>{%- endif -%}
        {%- if section.settings.mini_3 != blank -%}<p>{% render 'gb-icone', nome: 'shield', tamanho: 18 %}{{ section.settings.mini_3 | escape }}</p>{%- endif -%}
        {%- if section.settings.mini_4 != blank -%}<p>{% render 'gb-icone', nome: 'gift', tamanho: 18 %}{{ section.settings.mini_4 | escape }}</p>{%- endif -%}
      </div>

      <div class="gb-tabs gb-d">
        {%- for block in section.blocks -%}
          {%- if block.type == 'aba' -%}
            <details {{ block.shopify_attributes }}>
              <summary>{{ block.settings.titulo | escape }}<span class="gb-mais">{% render 'gb-icone', nome: 'plus', tamanho: 18 %}</span><span class="gb-menos">{% render 'gb-icone', nome: 'minus', tamanho: 18 %}</span></summary>
              {%- if block.settings.usar_descricao and product.description != blank -%}
                <div class="gb-resp">{{ product.description }}</div>
              {%- else -%}
                <p>{{ block.settings.texto | escape | replace: '{frete}', gb_frete_fmt }}</p>
              {%- endif -%}
            </details>
          {%- endif -%}
        {%- endfor -%}
      </div>
    </div>
  </div>

  <script type="application/json" data-gb-dados>
    {
      "variantes": [
        {%- for variant in product.variants -%}
          {"id": {{ variant.id }}, "price": {{ variant.price }}, "available": {{ variant.available }}, "title": {{ variant.option1 | json }}}{% unless forloop.last %},{% endunless %}
        {%- endfor -%}
      ],
      "selecionada": {{ gb_v.id }},
      "extras": [{{ gb_ex_json }}],
      "maxq": {{ gb_maxq }},
      "qtd": {{ gb_sel }},
      "promo": { "ativa": {{ gb_ativa | json }}, "pct": {{ gb_pct }}, "qtd": {{ gb_minq }} },
      "frete": {{ gb_frete }},
      "textos": {
        "rotuloUm": {{ section.settings.rotulo_um | json }},
        "rotuloVarios": {{ section.settings.rotulo_varios | json }},
        "botaoUm": {{ section.settings.botao_um | json }},
        "botaoVarios": {{ section.settings.botao_varios | json }},
        "botaoEsgotado": {{ section.settings.botao_esgotado | json }},
        "totalRotulo": {{ section.settings.total_rotulo | json }},
        "freteIncluido": {{ section.settings.frete_incluido | replace: '{frete}', gb_frete_fmt | json }},
        "cartaoUm": {{ section.settings.cartao_um | json }},
        "cartaoFrete": {{ section.settings.cartao_frete | replace: '{frete}', gb_frete_fmt | json }},
        "cartaoCada": {{ section.settings.cartao_cada | json }},
        "cartaoEconomia": {{ section.settings.cartao_economia | json }},
        "notaPromo": {{ section.settings.nota_promo | json }},
        "notaEconomia": {{ section.settings.nota_economia | json }},
        "notaFaltam": {{ section.settings.nota_faltam | json }},
        "erro": {{ section.settings.erro | json }},
        "contador": {{ section.settings.gal_contador | json }}
      }
    }
  </script>
</section>

{% schema %}
{
  "name": "Ofirelle: fotos e compra",
  "tag": "div",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "header", "content": "Oferta (use os mesmos valores nas outras seções)" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (só ligue depois de criar o desconto automático e provar no carrinho)", "default": false },
    { "type": "number", "id": "promo_pct", "label": "Desconto (%)", "default": 20 },
    { "type": "range", "id": "promo_qtd", "label": "Peças para o desconto", "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "number", "id": "frete_gratis_acima", "label": "Frete grátis acima de (valor inteiro da moeda)", "default": 50 },
    { "type": "paragraph", "content": "O desconto em si é automático da loja (criado em Descontos, com o sim do dono) e aplicado no carrinho. A página mostra a estimativa." },
    { "type": "header", "content": "Caminho de navegação" },
    { "type": "text", "id": "breadcrumb_texto", "label": "Texto do caminho", "default": "Cross Necklaces" },
    { "type": "url", "id": "breadcrumb_url", "label": "Link do caminho" },
    { "type": "header", "content": "Produto" },
    { "type": "text", "id": "material", "label": "Material (uma linha)", "default": "Gold-tone stainless steel" },
    { "type": "text", "id": "beneficio_1", "label": "Benefício 1", "default": "Sits at the base of your neck" },
    { "type": "text", "id": "beneficio_2", "label": "Benefício 2 ({frete} vira o valor)", "default": "Free US shipping over {frete}" },
    { "type": "text", "id": "beneficio_3", "label": "Benefício 3", "default": "Gift-ready, 30-day returns" },
    { "type": "text", "id": "rotulo_acabamento", "label": "Rótulo do acabamento", "default": "Finish" },
    { "type": "header", "content": "Cartões de quantidade" },
    { "type": "text", "id": "rotulo_conjunto", "label": "Rótulo acima dos cartões", "default": "Build your faith set" },
    { "type": "text", "id": "rotulo_qtd", "label": "Nome do grupo (leitor de tela)", "default": "How many necklaces" },
    { "type": "text", "id": "rotulo_um", "label": "Cartão com 1 peça", "default": "{n} necklace" },
    { "type": "text", "id": "rotulo_varios", "label": "Cartão com várias peças", "default": "{n} necklaces" },
    { "type": "text", "id": "cartao_um", "label": "Frase do cartão de 1 peça", "default": "Just this one" },
    { "type": "text", "id": "cartao_frete", "label": "Frase quando passa do frete grátis", "default": "Free US shipping" },
    { "type": "text", "id": "cartao_cada", "label": "Frase do preço por peça ({cada})", "default": "about {cada} each" },
    { "type": "text", "id": "cartao_economia", "label": "Frase da economia ({economia})", "default": ", save {economia}" },
    { "type": "text", "id": "selo_melhor", "label": "Selo do cartão de maior economia", "default": "Best value" },
    { "type": "url", "id": "url_trocar", "label": "Link de troca (coleção de onde escolher outra peça)" },
    { "type": "text", "id": "texto_trocar", "label": "Texto do link de troca", "default": "Change" },
    { "type": "text", "id": "total_rotulo", "label": "Rótulo do total", "default": "Total" },
    { "type": "text", "id": "frete_incluido", "label": "Total com frete grátis", "default": "Free US shipping included" },
    { "type": "header", "content": "Botão e avisos" },
    { "type": "text", "id": "botao_um", "label": "Botão com 1 peça", "default": "Add to bag" },
    { "type": "text", "id": "botao_varios", "label": "Botão com várias peças ({n})", "default": "Add {n} necklaces" },
    { "type": "text", "id": "botao_esgotado", "label": "Botão sem estoque", "default": "Sold out" },
    { "type": "text", "id": "nota_promo", "label": "Aviso do desconto ({pct}, {qtd})", "default": "{pct}% off applied automatically at checkout. No code needed." },
    { "type": "text", "id": "nota_economia", "label": "Aviso de economia (aparece só no celular, {economia})", "default": "You save {economia}. " },
    { "type": "text", "id": "nota_faltam", "label": "Aviso de peças que faltam ({faltam}, {pct})", "default": "Add {faltam} more for {pct}% off." },
    { "type": "text", "id": "erro", "label": "Erro ao adicionar", "default": "We could not add this to your bag. Please try again." },
    { "type": "header", "content": "Selos pequenos sob o botão" },
    { "type": "text", "id": "mini_1", "label": "Selo 1", "default": "Free US shipping over {frete}" },
    { "type": "text", "id": "mini_2", "label": "Selo 2", "default": "30-day returns" },
    { "type": "text", "id": "mini_3", "label": "Selo 3", "default": "1-year warranty" },
    { "type": "text", "id": "mini_4", "label": "Selo 4", "default": "Gift-ready" },
    { "type": "header", "content": "Galeria" },
    { "type": "text", "id": "gal_rotulo", "label": "Nome da galeria (leitor de tela)", "default": "Product photos" },
    { "type": "text", "id": "gal_ver", "label": "Botão da foto ({n})", "default": "Show photo {n}" },
    { "type": "text", "id": "gal_ant", "label": "Seta anterior", "default": "Previous photo" },
    { "type": "text", "id": "gal_prox", "label": "Seta seguinte", "default": "Next photo" },
    { "type": "text", "id": "gal_contador", "label": "Contador ({atual}, {total})", "default": "{atual} / {total}" }
  ],
  "blocks": [
    {
      "type": "peca_extra",
      "name": "Peça do conjunto",
      "limit": 5,
      "settings": [
        { "type": "product", "id": "produto", "label": "Peça que entra nos cartões de 2 e 3 colares" }
      ]
    },
    {
      "type": "aba",
      "name": "Aba",
      "settings": [
        { "type": "text", "id": "titulo", "label": "Título", "default": "Details" },
        { "type": "checkbox", "id": "usar_descricao", "label": "Usar a descrição do produto", "default": false },
        { "type": "textarea", "id": "texto", "label": "Texto (se não usar a descrição)", "default": "A small, softly rounded gold cross that sits right at the base of your neck." }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ofirelle: fotos e compra",
      "blocks": [{ "type": "peca_extra" }, { "type": "peca_extra" }, { "type": "aba" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-hero.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_img = section.settings.imagem -%}
<section class="gb-root gb-hero" data-gb-secao="hero">
  <div class="gb-hero-txt">
    <div>
      {%- if section.settings.rotulo != blank -%}
        <p class="gb-label"><span class="gb-fio" aria-hidden="true"></span>{{ section.settings.rotulo | escape }}</p>
      {%- endif -%}
      <h1 class="gb-display">{{ section.settings.titulo }}</h1>
      {%- if section.settings.subtitulo != blank -%}
        <p class="gb-hero-sub">{{ section.settings.subtitulo | escape }}</p>
      {%- endif -%}
      <div class="gb-hero-btns">
        {%- if section.settings.botao_1_texto != blank -%}
          <a href="{{ section.settings.botao_1_url | default: '#' }}" class="gb-btn gb-btn-p">{{ section.settings.botao_1_texto | escape }}</a>
        {%- endif -%}
        {%- if section.settings.botao_2_texto != blank -%}
          <a href="{{ section.settings.botao_2_url | default: '#' }}" class="gb-btn gb-btn-s">{{ section.settings.botao_2_texto | escape }}</a>
        {%- endif -%}
      </div>
    </div>
  </div>
  <div class="gb-ph">
    {%- render 'gb-imagem', imagem: gb_img, alt: section.settings.alt, carga: 'eager', sizes: '(min-width: 760px) 50vw, 100vw', widths: '600, 900, 1200, 1600' -%}
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: capa",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Cross necklaces in gold" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título (use itálico na segunda parte)", "default": "A small cross, <em>close to your heart.</em>" },
    { "type": "text", "id": "subtitulo", "label": "Subtítulo", "default": "Made to be worn every day and given with love." },
    { "type": "image_picker", "id": "imagem", "label": "Foto" },
    { "type": "text", "id": "alt", "label": "Texto alternativo da foto", "default": "Petite Puffed Cross Necklace worn at the base of the neck with a cream ribbed top" },
    { "type": "header", "content": "Botões" },
    { "type": "text", "id": "botao_1_texto", "label": "Botão principal: texto", "default": "Shop the Petite Puffed Cross" },
    { "type": "url", "id": "botao_1_url", "label": "Botão principal: link" },
    { "type": "text", "id": "botao_2_texto", "label": "Botão secundário: texto", "default": "Build your faith set" },
    { "type": "url", "id": "botao_2_url", "label": "Botão secundário: link" }
  ],
  "presets": [{ "name": "Ofirelle: capa" }]
}
{% endschema %}
```

### Arquivo: sections/gb-mais-vendidos.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-mais-vendidos gb-sec" data-gb-secao="mais-vendidos" style="border-top: 1px solid var(--gb-line)">
  <div class="gb-wrap">
    <div class="gb-topo-linha gb-head">
      <div><h2 class="gb-h2">{{ section.settings.titulo }}</h2></div>
      {%- if section.settings.link_texto != blank -%}
        <a href="{{ section.settings.link_url | default: routes.all_products_collection_url }}" class="gb-link">{{ section.settings.link_texto | escape }}</a>
      {%- endif -%}
    </div>
    <div class="gb-grade4">
      {%- for block in section.blocks -%}
        {%- assign gb_p = block.settings.produto -%}
        {%- if gb_p != blank -%}
          {%- assign gb_img = block.settings.imagem | default: gb_p.featured_image -%}
          <a href="{{ gb_p.url }}" class="gb-card" {{ block.shopify_attributes }}>
            <div class="gb-ph">
              {%- render 'gb-imagem', imagem: gb_img, alt: gb_p.title, carga: 'lazy', sizes: '(min-width: 1100px) 25vw, 50vw' -%}
            </div>
            <p class="gb-card-nome">{{ gb_p.title | escape }}</p>
            <p class="gb-card-preco">{{ gb_p.price | money }}</p>
          </a>
        {%- endif -%}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: mais vendidos",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Small crosses, <em>worn close.</em>" },
    { "type": "text", "id": "link_texto", "label": "Link: texto", "default": "Shop all necklaces" },
    { "type": "url", "id": "link_url", "label": "Link: destino" }
  ],
  "blocks": [
    {
      "type": "produto",
      "name": "Produto",
      "settings": [
        { "type": "product", "id": "produto", "label": "Produto" },
        { "type": "image_picker", "id": "imagem", "label": "Foto (vazio usa a foto principal do produto)" }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [
    {
      "name": "Ofirelle: mais vendidos",
      "blocks": [{ "type": "produto" }, { "type": "produto" }, { "type": "produto" }, { "type": "produto" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-medida.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- comment -%} Quebra os rótulos do desenho do celular em duas linhas, com até 16 letras na primeira. {%- endcomment -%}
{%- liquid
  assign gb_r1 = section.settings.rotulo_a
  assign gb_r2 = section.settings.rotulo_b
  assign gb_a1 = ''
  assign gb_a2 = ''
  assign gb_b1 = ''
  assign gb_b2 = ''
  assign gb_palavras = gb_r1 | split: ' '
  for gb_w in gb_palavras
    assign gb_teste = gb_a1 | append: ' ' | append: gb_w | strip
    if gb_a2 == blank and gb_teste.size <= 16
      assign gb_a1 = gb_teste
    else
      assign gb_a2 = gb_a2 | append: ' ' | append: gb_w | strip
    endif
  endfor
  assign gb_palavras = gb_r2 | split: ' '
  for gb_w in gb_palavras
    assign gb_teste = gb_b1 | append: ' ' | append: gb_w | strip
    if gb_b2 == blank and gb_teste.size <= 16
      assign gb_b1 = gb_teste
    else
      assign gb_b2 = gb_b2 | append: ' ' | append: gb_w | strip
    endif
  endfor
  assign gb_rotulo_svg = section.settings.descricao_svg
-%}
<section class="gb-root gb-medida" data-gb-secao="medida">
  <div class="gb-wrap gb-in">
    <div>
      <svg class="gb-d" viewBox="0 0 628 440" fill="none" role="img" aria-label="{{ gb_rotulo_svg | escape }}">
        <path d="M262 40C263 120 264 180 246 214C218 252 128 262 48 300" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
        <path d="M366 40C365 120 364 180 382 214C410 252 500 262 580 300" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
        <path d="M258 196Q314 284 370 196" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M314 238v12M310 242h8" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M250 214Q314 420 378 214" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"/>
        <path d="M314 314v12M310 318h8" stroke="#B08D57" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M326 244H436" stroke="#5B6170" stroke-width="1"/><circle cx="326" cy="244" r="2" fill="#1F2A44"/>
        <text x="446" y="248" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="13">{{ gb_r1 | escape }}</text>
        <path d="M302 320H210" stroke="#5B6170" stroke-width="1"/><circle cx="302" cy="320" r="2" fill="#B08D57"/>
        <text x="200" y="324" text-anchor="end" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="13">{{ gb_r2 | escape }}</text>
      </svg>
      <svg class="gb-m" viewBox="0 0 350 260" fill="none" role="img" aria-label="{{ gb_rotulo_svg | escape }}">
        <path d="M146 24C147 84 148 120 136 142C116 170 60 178 10 200" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
        <path d="M204 24C203 84 202 120 214 142C234 170 290 178 340 200" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
        <path d="M144 128Q175 186 206 128" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M175 153v10M171 156.5h8" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M138 142Q175 300 212 142" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="4 4" stroke-linecap="round"/>
        <path d="M175 216v10M171 219.5h8" stroke="#B08D57" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M184 158L208 96H220" stroke="#5B6170" stroke-width="1"/><circle cx="184" cy="158" r="2" fill="#1F2A44"/>
        <text x="224" y="99" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">{{ gb_a1 | escape }}</text>
        <text x="224" y="113" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">{{ gb_a2 | escape }}</text>
        <path d="M184 222H226" stroke="#5B6170" stroke-width="1"/><circle cx="184" cy="222" r="2" fill="#B08D57"/>
        <text x="232" y="219" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">{{ gb_b1 | escape }}</text>
        <text x="232" y="233" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">{{ gb_b2 | escape }}</text>
      </svg>
    </div>
    <div class="gb-t">
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-lead">{{ section.settings.texto | escape }}</p>{%- endif -%}
      <ul class="gb-specs">
        {%- for block in section.blocks -%}
          {%- if block.settings.valor != blank -%}
            <li {{ block.shopify_attributes }}><span class="gb-muted">{{ block.settings.nome | escape }}</span><span>{{ block.settings.valor | escape }}</span></li>
          {%- endif -%}
        {%- endfor -%}
      </ul>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: medidas",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "Size" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "From choker <em>to collarbone.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto", "default": "The extender chain lets you choose where it sits." },
    { "type": "text", "id": "rotulo_a", "label": "Legenda do desenho: corrente fechada", "default": "Choker, extender closed" },
    { "type": "text", "id": "rotulo_b", "label": "Legenda do desenho: corrente aberta", "default": "Collarbone, extender open" },
    { "type": "text", "id": "descricao_svg", "label": "Descrição do desenho (leitor de tela)", "default": "Where the necklace sits: at the base of the neck with the extender closed, at the collarbone with it open" }
  ],
  "blocks": [
    {
      "type": "linha",
      "name": "Linha de medida",
      "settings": [
        { "type": "text", "id": "nome", "label": "Nome", "default": "Pendant" },
        { "type": "text", "id": "valor", "label": "Valor (vazio esconde a linha)", "default": "Petite puffed cross" }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [
    {
      "name": "Ofirelle: medidas",
      "blocks": [
        { "type": "linha", "settings": { "nome": "Pendant", "valor": "Petite puffed cross" } },
        { "type": "linha", "settings": { "nome": "Chain", "valor": "Fine cable chain" } },
        { "type": "linha", "settings": { "nome": "Clasp", "valor": "Lobster, with extender chain" } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-no-pescoco.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_b = section.settings.imagem_b | default: section.settings.imagem_b_reserva -%}
<section class="gb-root gb-no-pescoco{% if gb_b == blank %} gb-sem-b{% endif %}" data-gb-secao="no-pescoco">
  <div class="gb-wrap gb-in">
    <div class="gb-ph gb-a">
      {%- render 'gb-imagem', imagem: section.settings.imagem_a, alt: section.settings.alt_a, carga: 'lazy', sizes: '(min-width: 1100px) 628px, 100vw' -%}
    </div>
    {%- if gb_b != blank -%}
      <div class="gb-ph gb-b">
        {%- render 'gb-imagem', imagem: gb_b, alt: section.settings.alt_b, carga: 'lazy', sizes: '(min-width: 1100px) 303px, 100vw' -%}
      </div>
    {%- endif -%}
    <div class="gb-t">
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-lead">{{ section.settings.texto | escape }}</p>{%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: no pescoço",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "On the neck" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Close to your <em>heart.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto", "default": "It sits right at the base of your neck, small enough to wear with everything you own." },
    { "type": "header", "content": "Foto grande" },
    { "type": "image_picker", "id": "imagem_a", "label": "Foto" },
    { "type": "text", "id": "alt_a", "label": "Texto alternativo", "default": "Petite Puffed Cross Necklace worn at the base of the neck" },
    { "type": "header", "content": "Foto da mão no peito" },
    { "type": "image_picker", "id": "imagem_b", "label": "Foto própria (mão no peito segurando a cruz)" },
    { "type": "image_picker", "id": "imagem_b_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
    { "type": "text", "id": "alt_b", "label": "Texto alternativo", "default": "A hand resting on the chest, holding a gold cross pendant" },
    { "type": "paragraph", "content": "A foto da mão ainda não existe. Enquanto estiver vazia, aparece a reserva. Sem nenhuma das duas, a coluna some." }
  ],
  "presets": [{ "name": "Ofirelle: no pescoço" }]
}
{% endschema %}
```

### Arquivo: sections/gb-ocasioes.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-ocasioes gb-sec gb-linen" data-gb-secao="ocasioes">
  <div class="gb-wrap">
    <div class="gb-head"><h2 class="gb-h2">{{ section.settings.titulo }}</h2></div>
    <div class="gb-grade4 gb-oc-faixa">
      {%- for block in section.blocks -%}
        {%- assign gb_img = block.settings.imagem | default: block.settings.imagem_reserva -%}
        {%- if gb_img != blank and block.settings.nome != blank -%}
          <a href="{{ block.settings.url | default: '#' }}" class="gb-oc" {{ block.shopify_attributes }}>
            <div class="gb-ph">
              {%- render 'gb-imagem', imagem: gb_img, alt: block.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 25vw, 260px' -%}
            </div>
            <span class="gb-oc-nome">{{ block.settings.nome | escape }}{% render 'gb-icone', nome: 'arrow', tamanho: 20 %}</span>
          </a>
        {%- endif -%}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: ocasiões",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "For the days <em>she will remember.</em>" }
  ],
  "blocks": [
    {
      "type": "ocasiao",
      "name": "Ocasião",
      "settings": [
        { "type": "text", "id": "nome", "label": "Nome", "default": "Baptism and First Communion" },
        { "type": "url", "id": "url", "label": "Link" },
        { "type": "image_picker", "id": "imagem", "label": "Foto" },
        { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
        { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Gold cross necklace worn with a ribbed top" },
        { "type": "paragraph", "content": "Se a foto da ocasião ainda não foi feita, a foto reserva aparece no lugar. Sem nenhuma das duas, a ocasião não aparece." }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Ofirelle: ocasiões",
      "blocks": [{ "type": "ocasiao" }, { "type": "ocasiao" }, { "type": "ocasiao" }, { "type": "ocasiao" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-ophir.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_img = section.settings.imagem | default: section.settings.imagem_reserva -%}
{%- if section.settings.estilo == 'faixa' -%}
  <section class="gb-root gb-ophir gb-ophir--faixa" data-gb-secao="ophir">
    {%- if gb_img != blank -%}
      <div class="gb-ph">
        {%- render 'gb-imagem', imagem: gb_img, alt: section.settings.alt, carga: 'lazy', sizes: '(min-width: 760px) 50vw, 100vw' -%}
      </div>
    {%- endif -%}
    <div class="gb-ophir-txt">
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-txt">{{ section.settings.texto | escape }}</p>{%- endif -%}
      {%- if section.settings.link_texto != blank -%}
        <a href="{{ section.settings.link_url | default: '#' }}" class="gb-link">{{ section.settings.link_texto | escape }}</a>
      {%- endif -%}
    </div>
  </section>
{%- else -%}
  <section class="gb-root gb-ophir gb-ophir--citacao" data-gb-secao="ophir">
    <div class="gb-in">
      {%- if gb_img != blank -%}
        <div class="gb-ph">
          {%- render 'gb-imagem', imagem: gb_img, alt: section.settings.alt, carga: 'lazy', widths: '200, 400', sizes: '200px' -%}
        </div>
      {%- endif -%}
      <div>
        <span class="gb-fio-bloco" aria-hidden="true"></span>
        <blockquote>{{ section.settings.citacao | escape }}</blockquote>
        {%- if section.settings.link_texto != blank -%}
          <a href="{{ section.settings.link_url | default: '#' }}" class="gb-link">{{ section.settings.link_texto | escape }}</a>
        {%- endif -%}
      </div>
    </div>
  </section>
{%- endif -%}

{% schema %}
{
  "name": "Ofirelle: Ophir",
  "tag": "div",
  "class": "gb-section",
  "settings": [
    {
      "type": "select",
      "id": "estilo",
      "label": "Estilo",
      "options": [
        { "value": "faixa", "label": "Faixa azul (home)" },
        { "value": "citacao", "label": "Citação curta (produto)" }
      ],
      "default": "faixa"
    },
    { "type": "inline_richtext", "id": "titulo", "label": "Título (faixa)", "default": "Named after <em>the land of gold.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto (faixa)", "default": "In the Bible, Ophir was the land of gold that Solomon's ships sailed for. We carry its name as a promise: pieces that feel precious, worn every day, given with love." },
    { "type": "text", "id": "citacao", "label": "Frase (citação)", "default": "Named after Ophir, the land of gold in the Bible." },
    { "type": "text", "id": "link_texto", "label": "Link: texto", "default": "Read our story" },
    { "type": "url", "id": "link_url", "label": "Link: destino" },
    { "type": "image_picker", "id": "imagem", "label": "Foto" },
    { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
    { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Gold cross medallion necklace resting on stone beside an olive branch" },
    { "type": "paragraph", "content": "A foto de pedra e ramo de oliveira ainda não existe. Enquanto a foto acima estiver vazia, aparece a foto reserva." }
  ],
  "presets": [{ "name": "Ofirelle: Ophir" }]
}
{% endschema %}
```

### Arquivo: sections/gb-perguntas.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-perguntas gb-sec{% if section.settings.fundo == 'linen' %} gb-linen{% endif %}" data-gb-secao="perguntas">
  <div class="gb-wrap gb-in">
    <div>
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
    </div>
    <div class="gb-faq">
      {%- for block in section.blocks -%}
        {%- if block.settings.so_com_promo and section.settings.promo_ativa != true -%}{%- continue -%}{%- endif -%}
        <details{% if block.settings.so_celular %} class="gb-m"{% endif %} {% if section.settings.um_por_vez %}name="gb-faq-{{ section.id }}"{% endif %}{% if block.settings.aberta %} open{% endif %} {{ block.shopify_attributes }}>
          <summary>
            {{ block.settings.pergunta | escape }}
            <span class="gb-mais">{% render 'gb-icone', nome: 'plus', tamanho: 18 %}</span>
            <span class="gb-menos">{% render 'gb-icone', nome: 'minus', tamanho: 18 %}</span>
          </summary>
          <p>{{ block.settings.resposta | escape }}</p>
        </details>
      {%- endfor -%}
    </div>
    {%- if section.settings.contato_texto != blank -%}
      <p class="gb-ask">{{ section.settings.contato_texto | escape }}{% if section.settings.contato_email != blank %} <a href="mailto:{{ section.settings.contato_email | escape }}">{{ section.settings.contato_email | escape }}</a>{% endif %}</p>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: perguntas",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    {
      "type": "select",
      "id": "fundo",
      "label": "Fundo",
      "options": [
        { "value": "linen", "label": "Linho (home)" },
        { "value": "cream", "label": "Creme (produto)" }
      ],
      "default": "linen"
    },
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Good <em>to know.</em>" },
    { "type": "checkbox", "id": "promo_ativa", "label": "Promoção de 3 colares ativa (mostra as perguntas marcadas como da promoção)", "default": false },
    { "type": "checkbox", "id": "um_por_vez", "label": "Abrir uma pergunta por vez", "default": true },
    { "type": "text", "id": "contato_texto", "label": "Frase de contato", "default": "Something else on your mind?" },
    { "type": "text", "id": "contato_email", "label": "E-mail de contato", "default": "support@ofirelle.com" }
  ],
  "blocks": [
    {
      "type": "pergunta",
      "name": "Pergunta",
      "settings": [
        { "type": "text", "id": "pergunta", "label": "Pergunta", "default": "How does Buy 3, save 20% work?" },
        { "type": "textarea", "id": "resposta", "label": "Resposta", "default": "Add 3 necklaces to your bag and the 20% comes off automatically at checkout." },
        { "type": "checkbox", "id": "so_com_promo", "label": "Mostrar só com a promoção ativa", "default": false },
        { "type": "checkbox", "id": "so_celular", "label": "Mostrar só no celular", "default": false },
        { "type": "checkbox", "id": "aberta", "label": "Começa aberta", "default": false }
      ]
    }
  ],
  "max_blocks": 14,
  "presets": [
    {
      "name": "Ofirelle: perguntas",
      "blocks": [
        { "type": "pergunta", "settings": { "aberta": true, "so_com_promo": true } },
        { "type": "pergunta", "settings": { "pergunta": "Where does it sit on the neck?", "resposta": "It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone." } },
        { "type": "pergunta", "settings": { "pergunta": "Can I return it?", "resposta": "Yes, within 30 days for a refund or exchange, unworn and in its original packaging." } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-presente.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_img = section.settings.imagem | default: section.settings.imagem_reserva -%}
<section class="gb-root gb-presente" data-gb-secao="presente">
  <div class="gb-wrap gb-in">
    <div class="gb-t">
      {%- if section.settings.rotulo != blank -%}<p class="gb-label">{{ section.settings.rotulo | escape }}</p>{%- endif -%}
      <h2 class="gb-h2">{{ section.settings.titulo }}</h2>
      {%- if section.settings.texto != blank -%}<p class="gb-lead">{{ section.settings.texto | escape }}</p>{%- endif -%}
      <ul class="gb-occ">
        {%- for block in section.blocks -%}
          {%- if block.settings.nome != blank -%}
            <li {{ block.shopify_attributes }}><a href="{{ block.settings.url | default: routes.all_products_collection_url }}">{{ block.settings.nome | escape }}{% render 'gb-icone', nome: 'arrow', tamanho: 18 %}</a></li>
          {%- endif -%}
        {%- endfor -%}
      </ul>
      {%- if section.settings.botao_texto != blank -%}
        <a href="{{ section.settings.botao_url | default: routes.all_products_collection_url }}" class="gb-btn gb-btn-s">{{ section.settings.botao_texto | escape }}</a>
      {%- endif -%}
    </div>
    {%- if gb_img != blank -%}
      <div class="gb-box">
        {%- render 'gb-imagem', imagem: gb_img, alt: section.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 521px, 100vw' -%}
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: presente",
  "tag": "section",
  "class": "gb-section",
  "enabled_on": { "templates": ["product"] },
  "settings": [
    { "type": "text", "id": "rotulo", "label": "Rótulo pequeno", "default": "A gift for her" },
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "For the days she <em>will remember.</em>" },
    { "type": "textarea", "id": "texto", "label": "Texto", "default": "Every necklace arrives gift-ready, with 30 days to return or exchange." },
    { "type": "text", "id": "botao_texto", "label": "Botão: texto", "default": "Shop gifts" },
    { "type": "url", "id": "botao_url", "label": "Botão: destino" },
    { "type": "image_picker", "id": "imagem", "label": "Foto da caixa de presente aberta" },
    { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
    { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Gold cross necklace, gift-ready" },
    { "type": "paragraph", "content": "A foto da caixa aberta ainda não existe. Enquanto estiver vazia, aparece a foto reserva." }
  ],
  "blocks": [
    {
      "type": "ocasiao",
      "name": "Ocasião",
      "settings": [
        { "type": "text", "id": "nome", "label": "Nome", "default": "Baptism" },
        { "type": "url", "id": "url", "label": "Link" }
      ]
    }
  ],
  "max_blocks": 10,
  "presets": [
    {
      "name": "Ofirelle: presente",
      "blocks": [
        { "type": "ocasiao", "settings": { "nome": "Baptism" } },
        { "type": "ocasiao", "settings": { "nome": "First Communion" } },
        { "type": "ocasiao", "settings": { "nome": "Confirmation" } },
        { "type": "ocasiao", "settings": { "nome": "Mother's Day" } },
        { "type": "ocasiao", "settings": { "nome": "Christmas" } },
        { "type": "ocasiao", "settings": { "nome": "Birthday" } },
        { "type": "ocasiao", "settings": { "nome": "For a Godmother" } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-promessa.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-promessa gb-sec" data-gb-secao="promessa">
  <div class="gb-wrap">
    <div class="gb-head gb-center" style="margin-bottom: 56px"><h2 class="gb-h2">{{ section.settings.titulo }}</h2></div>
    <div class="gb-promessa-grade">
      {%- for block in section.blocks -%}
        <div class="gb-prom" {{ block.shopify_attributes }}>
          <span style="color: var(--gb-gold)">{% render 'gb-icone', nome: block.settings.icone, tamanho: 24 %}</span>
          <div>
            <h3 class="gb-h3">{{ block.settings.titulo | escape }}</h3>
            <p class="gb-small">{{ block.settings.texto | escape }}</p>
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: promessa",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Simple, and <em>in writing.</em>" }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Promessa",
      "settings": [
        {
          "type": "select",
          "id": "icone",
          "label": "Ícone",
          "options": [
            { "value": "truck", "label": "Caminhão" },
            { "value": "return", "label": "Devolução" },
            { "value": "shield", "label": "Escudo" },
            { "value": "gift", "label": "Presente" },
            { "value": "heart", "label": "Coração" }
          ],
          "default": "truck"
        },
        { "type": "text", "id": "titulo", "label": "Título", "default": "Shipping" },
        { "type": "text", "id": "texto", "label": "Texto", "default": "Processed in 1 to 3 business days, with tracking by email." }
      ]
    }
  ],
  "max_blocks": 4,
  "presets": [
    {
      "name": "Ofirelle: promessa",
      "blocks": [
        { "type": "item", "settings": { "icone": "truck", "titulo": "Shipping", "texto": "Processed in 1 to 3 business days, with tracking by email." } },
        { "type": "item", "settings": { "icone": "return", "titulo": "30-day returns", "texto": "Refund or exchange, unworn and in its original packaging." } },
        { "type": "item", "settings": { "icone": "shield", "titulo": "1-year warranty", "texto": "Covered against manufacturing defects." } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-selos.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

{%- assign gb_frete = section.settings.frete_gratis_acima -%}
{%- capture gb_frete_fmt -%}{{ gb_frete | times: 100 | money_without_trailing_zeros }}{%- endcapture -%}
<section class="gb-root gb-selos" data-gb-secao="selos">
  <div class="gb-wrap">
    <ul>
      {%- for block in section.blocks -%}
        <li {{ block.shopify_attributes }}>
          {% render 'gb-icone', nome: block.settings.icone, tamanho: 24 %}
          <div>
            <b>{{ block.settings.titulo | escape | replace: '{frete}', gb_frete_fmt }}</b>
            {%- if block.settings.texto != blank -%}<small>{{ block.settings.texto | escape }}</small>{%- endif -%}
          </div>
        </li>
      {%- endfor -%}
    </ul>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: selos",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "number", "id": "frete_gratis_acima", "label": "Frete grátis acima de (em dólares; vale para {frete} nos textos)", "default": 50 }
  ],
  "blocks": [
    {
      "type": "selo",
      "name": "Selo",
      "settings": [
        {
          "type": "select",
          "id": "icone",
          "label": "Ícone",
          "options": [
            { "value": "truck", "label": "Caminhão" },
            { "value": "return", "label": "Devolução" },
            { "value": "shield", "label": "Escudo" },
            { "value": "gift", "label": "Presente" },
            { "value": "heart", "label": "Coração" },
            { "value": "check", "label": "Marca de ok" }
          ],
          "default": "truck"
        },
        { "type": "text", "id": "titulo", "label": "Título ({frete} vira o valor do frete grátis)", "default": "Free US shipping over {frete}" },
        { "type": "text", "id": "texto", "label": "Texto de apoio", "default": "Processed in 1 to 3 business days" }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Ofirelle: selos",
      "blocks": [
        { "type": "selo", "settings": { "icone": "truck", "titulo": "Free US shipping over {frete}", "texto": "Processed in 1 to 3 business days" } },
        { "type": "selo", "settings": { "icone": "return", "titulo": "30-day returns", "texto": "Refund or exchange" } },
        { "type": "selo", "settings": { "icone": "shield", "titulo": "1-year warranty", "texto": "Manufacturing defects" } },
        { "type": "selo", "settings": { "icone": "gift", "titulo": "Gift-ready", "texto": "Ready to give" } }
      ]
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-todo-dia.liquid

```liquid
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}

<section class="gb-root gb-todo-dia gb-sec" data-gb-secao="todo-dia">
  <div class="gb-wrap">
    <div class="gb-head"><h2 class="gb-h2">{{ section.settings.titulo }}</h2></div>
    <div class="gb-mosaico">
      {%- capture gb_principal -%}
        {%- for block in section.blocks limit: 1 -%}
          {%- assign gb_img = block.settings.imagem | default: block.settings.imagem_reserva -%}
          {%- if gb_img != blank -%}
            <div class="gb-ph" {{ block.shopify_attributes }}>
              {%- render 'gb-imagem', imagem: gb_img, alt: block.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 50vw, 100vw' -%}
            </div>
          {%- endif -%}
        {%- endfor -%}
      {%- endcapture -%}
      {%- capture gb_lado -%}
        {%- for block in section.blocks offset: 1 -%}
          {%- assign gb_img = block.settings.imagem | default: block.settings.imagem_reserva -%}
          {%- if gb_img != blank -%}
            <div class="gb-ph" {{ block.shopify_attributes }}>
              {%- render 'gb-imagem', imagem: gb_img, alt: block.settings.alt, carga: 'lazy', sizes: '(min-width: 1100px) 50vw, 100vw' -%}
            </div>
          {%- endif -%}
        {%- endfor -%}
      {%- endcapture -%}
      {{ gb_principal }}
      {%- if gb_lado != blank -%}<div class="gb-mosaico-lado">{{ gb_lado }}</div>{%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Ofirelle: todo dia",
  "tag": "section",
  "class": "gb-section",
  "settings": [
    { "type": "inline_richtext", "id": "titulo", "label": "Título", "default": "Close to your heart, <em>every day.</em>" }
  ],
  "blocks": [
    {
      "type": "foto",
      "name": "Foto (a 1ª é a grande, a 2ª e a 3ª ficam ao lado)",
      "settings": [
        { "type": "image_picker", "id": "imagem", "label": "Foto" },
        { "type": "image_picker", "id": "imagem_reserva", "label": "Foto reserva (usada enquanto a foto acima estiver vazia)" },
        { "type": "text", "id": "alt", "label": "Texto alternativo", "default": "Gold cross necklace worn every day" }
      ]
    }
  ],
  "max_blocks": 3,
  "presets": [
    {
      "name": "Ofirelle: todo dia",
      "blocks": [{ "type": "foto" }, { "type": "foto" }, { "type": "foto" }]
    }
  ]
}
{% endschema %}
```

### Arquivo: snippets/gb-icone.liquid

```liquid
{%- comment -%}
  Ícones de traço fino da Ofirelle.
  Parâmetros: nome (arrow, plus, minus, truck, return, shield, gift, heart, cross, ruler, check), tamanho (número, padrão 20), cor (padrão currentColor).
{%- endcomment -%}
{%- assign gb_tam = tamanho | default: 20 -%}
{%- assign gb_cor = cor | default: 'currentColor' -%}
<svg viewBox="0 0 24 24" fill="none" stroke="{{ gb_cor }}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" width="{{ gb_tam }}" height="{{ gb_tam }}">
  {%- case nome -%}
    {%- when 'arrow' -%}<path d="M5 12h14M13 6l6 6-6 6"/>
    {%- when 'plus' -%}<path d="M12 5v14M5 12h14"/>
    {%- when 'minus' -%}<path d="M5 12h14"/>
    {%- when 'truck' -%}<path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.75"/><circle cx="17" cy="17.5" r="1.75"/>
    {%- when 'return' -%}<path d="M4.5 9.5h10a5 5 0 0 1 0 10H8"/><path d="M8.5 5.5l-4 4 4 4"/>
    {%- when 'shield' -%}<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>
    {%- when 'gift' -%}<path d="M3.5 8h17v4h-17z"/><path d="M5 12v8.5h14V12"/><path d="M12 8v12.5"/><path d="M12 8C10.2 4.6 6.6 4.7 7 6.6 7.3 8 12 8 12 8zM12 8c1.8-3.4 5.4-3.3 5-1.4-.3 1.4-5 1.4-5 1.4z"/>
    {%- when 'heart' -%}<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>
    {%- when 'cross' -%}<path d="M12 3v18M7 8.5h10"/>
    {%- when 'ruler' -%}<path d="M2.5 8.5h19v7h-19z"/><path d="M6 8.5v3M9.5 8.5v2M13 8.5v3M16.5 8.5v2"/>
    {%- when 'check' -%}<path d="m5 12.5 4.5 4.5L19 7.5"/>
  {%- endcase -%}
</svg>
```

### Arquivo: snippets/gb-imagem.liquid

```liquid
{%- comment -%}
  Imagem responsiva da Ofirelle.
  Parâmetros: imagem (objeto de imagem), alt (texto reserva), carga ('lazy' padrão ou 'eager'), sizes, widths (padrão '400, 600, 800, 1200'), classe.
  Não escreve nada se a imagem estiver vazia.
{%- endcomment -%}
{%- if imagem != blank -%}
  {%- assign gb_alt = imagem.alt | default: alt | default: '' -%}
  {%- assign gb_widths = widths | default: '400, 600, 800, 1200' -%}
  {%- assign gb_sizes = sizes | default: '(min-width: 1100px) 33vw, 50vw' -%}
  {%- assign gb_foco = imagem.presentation.focal_point | default: '50% 50%' -%}
  {%- assign gb_estilo = gb_foco | prepend: 'object-position: ' -%}
  {%- if carga == 'eager' -%}
    {{ imagem | image_url: width: 1600 | image_tag: loading: 'eager', fetchpriority: 'high', widths: gb_widths, sizes: gb_sizes, alt: gb_alt, class: classe, style: gb_estilo }}
  {%- else -%}
    {{ imagem | image_url: width: 1600 | image_tag: loading: 'lazy', widths: gb_widths, sizes: gb_sizes, alt: gb_alt, class: classe, style: gb_estilo }}
  {%- endif -%}
{%- endif -%}
```

### Arquivo: snippets/gb-progresso-carrinho.liquid

```liquid
{%- comment -%}
  Barra de progresso do carrinho: frete grátis e o desconto da 3ª peça.
  Não faz parte de nenhuma seção. Quem cuida da loja inclui onde quiser, por exemplo no topo do carrinho:
    {% render 'gb-progresso-carrinho' %}
  Parâmetros opcionais: ativa (padrão false: só com true aparecem as frases do desconto de 3 peças; ligue depois de criar o desconto automático), frete_acima (padrão 50), qtd_promo (padrão 3), pct (padrão 20),
  texto_frete ("You are {falta} away from free US shipping."), texto_promo ("Add {faltam} more for {pct}% off."),
  texto_completo ("Your faith set is complete. {pct}% off applied."), texto_marca ("{qtd} necklaces").
  Usa só o objeto global cart. Não altera o carrinho do tema.
{%- endcomment -%}
{%- liquid
  assign gb_ativa = ativa | default: false
  assign gb_frete = frete_acima | default: 50 | times: 100
  assign gb_qtd = qtd_promo | default: 3
  assign gb_pct = pct | default: 20
  assign gb_total = cart.total_price
  assign gb_itens = cart.item_count
  assign gb_falta = gb_frete | minus: gb_total
  assign gb_falta_fmt = gb_falta | money
  assign gb_faltam = gb_qtd | minus: gb_itens
  assign gb_alvo = gb_frete
  assign gb_pos = 0
  if gb_itens > 0
    assign gb_media = gb_total | divided_by: gb_itens
    assign gb_alvo = gb_media | times: gb_qtd
    if gb_alvo < gb_frete
      assign gb_alvo = gb_frete
    endif
    assign gb_pos = gb_frete | times: 100.0 | divided_by: gb_alvo
  endif
  assign gb_largura = 0
  if gb_alvo > 0
    assign gb_largura = gb_total | times: 100.0 | divided_by: gb_alvo
  endif
  if gb_largura > 100
    assign gb_largura = 100
  endif
  assign gb_msg_frete = texto_frete | default: 'You are {falta} away from free US shipping.'
  assign gb_msg_promo = texto_promo | default: 'Add {faltam} more for {pct}% off.'
  assign gb_marca = texto_marca | default: '{qtd} necklaces'
  assign gb_msg_ok = texto_completo | default: 'Your faith set is complete. {pct}% off applied.'
-%}
{%- if gb_itens > 0 -%}
  <div class="gb-prog gb-root" data-gb-progresso>
    <p>
      {%- if gb_ativa and gb_itens >= gb_qtd -%}
        {{ gb_msg_ok | replace: '{pct}', gb_pct | escape }}
      {%- elsif gb_falta > 0 -%}
        {{ gb_msg_frete | replace: '{falta}', gb_falta_fmt | escape }}
        {%- if gb_ativa and gb_itens < gb_qtd %} {{ gb_msg_promo | replace: '{faltam}', gb_faltam | replace: '{pct}', gb_pct | escape }}{%- endif -%}
      {%- elsif gb_ativa and gb_itens < gb_qtd -%}
        {{ gb_msg_promo | replace: '{faltam}', gb_faltam | replace: '{pct}', gb_pct | escape }}
      {%- else -%}
        You have free US shipping.
      {%- endif -%}
    </p>
    <div class="gb-prog-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ gb_largura | round }}"><i style="width: {{ gb_largura | round: 1 }}%"></i></div>
    <div class="gb-prog-marcas">
      <span style="left: {{ gb_pos | round: 1 }}%; transform: translateX(-50%)">{{ gb_frete | money_without_trailing_zeros }}</span>
      <span style="right: 0">{{ gb_marca | replace: '{qtd}', gb_qtd | escape }}</span>
    </div>
  </div>
{%- endif -%}
```

### Arquivo: templates/index.ofirelle-nova.json

```json
{
  "sections": {
    "hero": {
      "type": "gb-hero",
      "settings": {
        "imagem": "shopify://shop_images/petite-puffed-cross-necklace-2.jpg",
        "botao_1_url": "/products/petite-puffed-cross-necklace",
        "botao_2_url": "#faith-set"
      }
    },
    "mais_vendidos": {
      "type": "gb-mais-vendidos",
      "blocks": {
        "b1": {
          "type": "produto",
          "settings": {
            "produto": "petite-puffed-cross-necklace",
            "imagem": "shopify://shop_images/petite-puffed-cross-necklace-2.jpg"
          }
        },
        "b2": {
          "type": "produto",
          "settings": {
            "produto": "asymmetric-cross-necklace",
            "imagem": "shopify://shop_images/asymmetric-cross-necklace-1.png"
          }
        },
        "b3": {
          "type": "produto",
          "settings": {
            "produto": "enamel-cross-pendant-necklace",
            "imagem": "shopify://shop_images/enamel-cross-pendant-necklace-1.png"
          }
        },
        "b4": {
          "type": "produto",
          "settings": {
            "produto": "sideways-cross-crystal-necklace",
            "imagem": "shopify://shop_images/sideways-cross-crystal-necklace-1.png"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ],
      "settings": {
        "link_url": "/collections/necklaces"
      }
    },
    "ocasioes": {
      "type": "gb-ocasioes",
      "blocks": {
        "b1": {
          "type": "ocasiao",
          "settings": {
            "nome": "Baptism and First Communion",
            "url": "/collections/gifts?filter.p.tag=baptism",
            "imagem": "shopify://shop_images/enamel-cross-pendant-necklace-2.jpg",
            "imagem_reserva": "",
            "alt": "Enamel Cross Medallion Necklace worn with a ribbed top"
          }
        },
        "b2": {
          "type": "ocasiao",
          "settings": {
            "nome": "Confirmation",
            "url": "/collections/gifts?filter.p.tag=confirmation",
            "imagem": "shopify://shop_images/dove-cross-necklace-2.png",
            "imagem_reserva": "",
            "alt": "Dove Cross Necklace worn with a cream camisole"
          }
        },
        "b3": {
          "type": "ocasiao",
          "settings": {
            "nome": "For Mom",
            "url": "/collections/gifts?filter.p.tag=mom",
            "imagem": "shopify://shop_images/layered-cross-crystal-necklace-2.png",
            "imagem_reserva": "",
            "alt": "Layered Cross Necklace with Crystal worn in two layers"
          }
        },
        "b4": {
          "type": "ocasiao",
          "settings": {
            "nome": "Christmas",
            "url": "/collections/gifts?filter.p.tag=christmas",
            "imagem": "",
            "imagem_reserva": "shopify://shop_images/sideways-cross-crystal-necklace-2.jpg",
            "alt": "Sideways Cross Necklace with Crystal worn with a satin camisole"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ],
      "settings": {}
    },
    "como_funciona": {
      "type": "gb-como-funciona",
      "blocks": {
        "b1": {
          "type": "passo",
          "settings": {
            "imagem": "shopify://shop_images/petite-puffed-cross-necklace-2.jpg",
            "alt": "Petite Puffed Cross Necklace worn close to the neck"
          }
        },
        "b2": {
          "type": "passo",
          "settings": {
            "imagem": "shopify://shop_images/dove-cross-necklace-2.png",
            "alt": "Dove Cross Necklace worn with a cream camisole"
          }
        },
        "b3": {
          "type": "passo",
          "settings": {
            "imagem": "shopify://shop_images/enamel-cross-pendant-necklace-2.jpg",
            "alt": "Enamel Cross Medallion Necklace worn with a ribbed top"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {
        "produto": "petite-puffed-cross-necklace",
        "botao_url": "/collections/necklaces"
      }
    },
    "camadas_prontas": {
      "type": "gb-camadas-prontas",
      "blocks": {
        "b1": {
          "type": "conjunto",
          "settings": {
            "nome": "The Everyday Grace Set",
            "descricao": "Petite Puffed Cross, Sideways Cross with Crystal, Infinity Cross",
            "peca_1": "petite-puffed-cross-necklace",
            "peca_2": "sideways-cross-crystal-necklace",
            "peca_3": "infinity-cross-necklace",
            "imagem": "",
            "imagem_reserva": "shopify://shop_images/layered-cross-crystal-necklace-2.png",
            "alt": "Layered Cross Necklace with Crystal worn in two layers"
          }
        },
        "b2": {
          "type": "conjunto",
          "settings": {
            "nome": "The Blessing Set",
            "descricao": "Enamel Cross Medallion, Dove Cross, Double Cross",
            "peca_1": "enamel-cross-pendant-necklace",
            "peca_2": "dove-cross-necklace",
            "peca_3": "double-cross-necklace",
            "imagem": "",
            "imagem_reserva": "shopify://shop_images/double-cross-necklace-2.jpg",
            "alt": "Double Cross Necklace worn at the neck"
          }
        }
      },
      "block_order": [
        "b1",
        "b2"
      ],
      "settings": {}
    },
    "todo_dia": {
      "type": "gb-todo-dia",
      "blocks": {
        "b1": {
          "type": "foto",
          "settings": {
            "imagem": "",
            "imagem_reserva": "shopify://shop_images/dove-cross-necklace-2.png",
            "alt": "Dove Cross Necklace worn with a cream camisole"
          }
        },
        "b2": {
          "type": "foto",
          "settings": {
            "imagem": "shopify://shop_images/infinity-cross-necklace-2.png",
            "imagem_reserva": "",
            "alt": "Infinity Cross Necklace worn with a ribbed tank top"
          }
        },
        "b3": {
          "type": "foto",
          "settings": {
            "imagem": "shopify://shop_images/sideways-cross-crystal-necklace-2.jpg",
            "imagem_reserva": "",
            "alt": "Sideways Cross Necklace with Crystal worn with a satin camisole"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {}
    },
    "ophir": {
      "type": "gb-ophir",
      "settings": {
        "estilo": "faixa",
        "link_url": "/pages/our-story",
        "imagem": "",
        "imagem_reserva": "shopify://shop_images/enamel-cross-pendant-necklace-1.png",
        "alt": "Enamel Cross Medallion Necklace in gold tone"
      }
    },
    "promessa": {
      "type": "gb-promessa",
      "blocks": {
        "b1": {
          "type": "item",
          "settings": {
            "icone": "truck",
            "titulo": "Shipping",
            "texto": "Processed in 1 to 3 business days, with tracking by email."
          }
        },
        "b2": {
          "type": "item",
          "settings": {
            "icone": "return",
            "titulo": "30-day returns",
            "texto": "Refund or exchange, unworn and in its original packaging."
          }
        },
        "b3": {
          "type": "item",
          "settings": {
            "icone": "shield",
            "titulo": "1-year warranty",
            "texto": "Covered against manufacturing defects."
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {}
    },
    "perguntas": {
      "type": "gb-perguntas",
      "blocks": {
        "b1": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How does Buy 3, get 20% off work?",
            "resposta": "Add 3 necklaces to your bag and the 20% comes off automatically at checkout.",
            "so_com_promo": true,
            "aberta": true
          }
        },
        "b2": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Where does it sit on the neck?",
            "resposta": "It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone.",
            "aberta": false
          }
        },
        "b3": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How long does shipping take?",
            "resposta": "Orders are processed in 1 to 3 business days, with tracking by email. Delivery time shows at checkout. Free US shipping over $50.",
            "aberta": false
          }
        },
        "b4": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Can I return it?",
            "resposta": "Yes, within 30 days for a refund or exchange, unworn and in its original packaging.",
            "aberta": false
          }
        },
        "b5": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Is it ready to give?",
            "resposta": "Yes. Every necklace arrives gift-ready.",
            "aberta": false
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5"
      ],
      "settings": {
        "fundo": "linen",
        "um_por_vez": true
      }
    },
    "cadastro": {
      "type": "gb-cadastro",
      "settings": {}
    }
  },
  "order": [
    "hero",
    "mais_vendidos",
    "ocasioes",
    "como_funciona",
    "camadas_prontas",
    "todo_dia",
    "ophir",
    "promessa",
    "perguntas",
    "cadastro"
  ]
}
```

### Arquivo: templates/product.ofirelle-nova.json

```json
{
  "sections": {
    "galeria_compra": {
      "type": "gb-galeria-compra",
      "blocks": {
        "b1": {
          "type": "peca_extra",
          "settings": {
            "produto": "sideways-cross-crystal-necklace"
          }
        },
        "b2": {
          "type": "peca_extra",
          "settings": {
            "produto": "infinity-cross-necklace"
          }
        },
        "b3": {
          "type": "aba",
          "settings": {
            "titulo": "Details",
            "usar_descricao": false,
            "texto": "A small, softly rounded gold cross that sits right at the base of your neck. A solid puffed shape with smooth edges, on a fine cable chain with a lobster clasp and extender."
          }
        },
        "b4": {
          "type": "aba",
          "settings": {
            "titulo": "Shipping and returns",
            "usar_descricao": false,
            "texto": "Processed in 1 to 3 business days, with tracking by email. Free US shipping over {frete}. Returns within 30 days for a refund or exchange, unworn and in its original packaging. 1-year warranty against manufacturing defects."
          }
        },
        "b5": {
          "type": "aba",
          "settings": {
            "titulo": "Care",
            "usar_descricao": false,
            "texto": "Put it on after perfume and lotion. Wipe it with a soft cloth."
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5"
      ],
      "settings": {
        "breadcrumb_url": "/collections/necklaces",
        "url_trocar": "/collections/necklaces"
      }
    },
    "beneficios": {
      "type": "gb-beneficios",
      "blocks": {
        "b1": {
          "type": "beneficio",
          "settings": {
            "icone": "cross",
            "titulo": "A softly rounded cross",
            "texto": "A solid puffed shape with smooth edges that catch the light."
          }
        },
        "b2": {
          "type": "beneficio",
          "settings": {
            "icone": "ruler",
            "titulo": "Choker to collarbone",
            "texto": "Adjust it with the extender."
          }
        },
        "b3": {
          "type": "beneficio",
          "settings": {
            "icone": "heart",
            "titulo": "Easy to layer",
            "texto": "Wear it alone or layered with other necklaces."
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {}
    },
    "no_pescoco": {
      "type": "gb-no-pescoco",
      "settings": {
        "imagem_a": "shopify://shop_images/petite-puffed-cross-necklace-2.jpg",
        "imagem_b": "",
        "imagem_b_reserva": "shopify://shop_images/petite-puffed-cross-necklace-3.jpg",
        "alt_b": "Close-up of the puffed gold cross on champagne satin"
      }
    },
    "detalhe": {
      "type": "gb-detalhe",
      "settings": {
        "imagem_a": "shopify://shop_images/petite-puffed-cross-necklace-3.jpg",
        "imagem_b": "",
        "imagem_b_reserva": "shopify://shop_images/petite-puffed-cross-necklace-1.png",
        "alt_b": "Petite Puffed Cross Necklace laid flat, with clasp and extender"
      }
    },
    "medida": {
      "type": "gb-medida",
      "blocks": {
        "b1": {
          "type": "linha",
          "settings": {
            "nome": "Pendant",
            "valor": ""
          }
        },
        "b2": {
          "type": "linha",
          "settings": {
            "nome": "Chain",
            "valor": ""
          }
        },
        "b3": {
          "type": "linha",
          "settings": {
            "nome": "Clasp",
            "valor": ""
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {}
    },
    "conjunto": {
      "type": "gb-conjunto",
      "blocks": {
        "b1": {
          "type": "peca",
          "settings": {
            "produto": "petite-puffed-cross-necklace",
            "marcada": true
          }
        },
        "b2": {
          "type": "peca",
          "settings": {
            "produto": "sideways-cross-crystal-necklace",
            "marcada": true
          }
        },
        "b3": {
          "type": "peca",
          "settings": {
            "produto": "infinity-cross-necklace",
            "marcada": true
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ],
      "settings": {
        "imagem": "",
        "imagem_reserva": "shopify://shop_images/layered-cross-crystal-necklace-2.png",
        "alt": "Layered Cross Necklace with Crystal worn in two layers"
      }
    },
    "presente": {
      "type": "gb-presente",
      "blocks": {
        "b1": {
          "type": "ocasiao",
          "settings": {
            "nome": "Baptism",
            "url": "/collections/gifts?filter.p.tag=baptism"
          }
        },
        "b2": {
          "type": "ocasiao",
          "settings": {
            "nome": "First Communion",
            "url": "/collections/gifts?filter.p.tag=communion"
          }
        },
        "b3": {
          "type": "ocasiao",
          "settings": {
            "nome": "Confirmation",
            "url": "/collections/gifts?filter.p.tag=confirmation"
          }
        },
        "b4": {
          "type": "ocasiao",
          "settings": {
            "nome": "Mother's Day",
            "url": "/collections/gifts?filter.p.tag=mom"
          }
        },
        "b5": {
          "type": "ocasiao",
          "settings": {
            "nome": "Christmas",
            "url": "/collections/gifts?filter.p.tag=christmas"
          }
        },
        "b6": {
          "type": "ocasiao",
          "settings": {
            "nome": "Birthday",
            "url": "/collections/gifts?filter.p.tag=birthday"
          }
        },
        "b7": {
          "type": "ocasiao",
          "settings": {
            "nome": "For a Godmother",
            "url": "/collections/gifts?filter.p.tag=godmother"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7"
      ],
      "settings": {
        "botao_url": "/collections/gifts",
        "imagem": "",
        "imagem_reserva": "shopify://shop_images/sideways-cross-pearl-necklace-2.jpg",
        "alt": "Sideways Cross Necklace with Pearl worn with a satin camisole"
      }
    },
    "ophir": {
      "type": "gb-ophir",
      "settings": {
        "estilo": "citacao",
        "link_url": "/pages/our-story",
        "imagem": "",
        "imagem_reserva": "shopify://shop_images/enamel-cross-pendant-necklace-1.png",
        "alt": "Enamel Cross Medallion Necklace in gold tone"
      }
    },
    "selos": {
      "type": "gb-selos",
      "blocks": {
        "b1": {
          "type": "selo",
          "settings": {
            "icone": "truck",
            "titulo": "Free US shipping over {frete}",
            "texto": "Processed in 1 to 3 business days"
          }
        },
        "b2": {
          "type": "selo",
          "settings": {
            "icone": "return",
            "titulo": "30-day returns",
            "texto": "Refund or exchange"
          }
        },
        "b3": {
          "type": "selo",
          "settings": {
            "icone": "shield",
            "titulo": "1-year warranty",
            "texto": "Manufacturing defects"
          }
        },
        "b4": {
          "type": "selo",
          "settings": {
            "icone": "gift",
            "titulo": "Gift-ready",
            "texto": "Ready to give"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ],
      "settings": {}
    },
    "cuidados": {
      "type": "gb-cuidados",
      "blocks": {
        "b1": {
          "type": "dica",
          "settings": {
            "texto": "Put it on after perfume and lotion."
          }
        },
        "b2": {
          "type": "dica",
          "settings": {
            "texto": "Wipe it with a soft cloth."
          }
        }
      },
      "block_order": [
        "b1",
        "b2"
      ],
      "settings": {}
    },
    "perguntas": {
      "type": "gb-perguntas",
      "blocks": {
        "b1": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Details",
            "resposta": "A small, softly rounded gold cross that sits right at the base of your neck. A solid puffed shape with smooth edges, on a fine cable chain with a lobster clasp and extender.",
            "aberta": false,
            "so_celular": true
          }
        },
        "b2": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Shipping and returns",
            "resposta": "Processed in 1 to 3 business days, with tracking by email. Free US shipping over $50. Returns within 30 days for a refund or exchange, unworn and in its original packaging. 1-year warranty against manufacturing defects.",
            "aberta": false,
            "so_celular": true
          }
        },
        "b3": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How does Buy 3, get 20% off work?",
            "resposta": "Add 3 necklaces to your bag and the 20% comes off automatically at checkout.",
            "so_com_promo": true,
            "aberta": true,
            "so_celular": false
          }
        },
        "b4": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Where does it sit on the neck?",
            "resposta": "It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone.",
            "aberta": true,
            "so_celular": false
          }
        },
        "b5": {
          "type": "pergunta",
          "settings": {
            "pergunta": "What is it made of?",
            "resposta": "Gold-tone stainless steel, with a fine cable chain.",
            "aberta": false,
            "so_celular": false
          }
        },
        "b6": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How long does shipping take?",
            "resposta": "Orders are processed in 1 to 3 business days, with tracking by email. Delivery time shows at checkout. Free US shipping over $50.",
            "aberta": false,
            "so_celular": false
          }
        },
        "b7": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Can I return it?",
            "resposta": "Yes, within 30 days for a refund or exchange, unworn and in its original packaging.",
            "aberta": false,
            "so_celular": false
          }
        },
        "b8": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Is there a warranty?",
            "resposta": "Yes, 1 year against manufacturing defects.",
            "aberta": false,
            "so_celular": false
          }
        },
        "b9": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Is it ready to give?",
            "resposta": "Yes. Every necklace arrives gift-ready.",
            "aberta": false,
            "so_celular": false
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7",
        "b8",
        "b9"
      ],
      "settings": {
        "fundo": "cream",
        "rotulo": "Questions",
        "titulo": "Before you <em>choose.</em>",
        "um_por_vez": false
      }
    },
    "avaliacoes": {
      "type": "gb-avaliacoes",
      "settings": {
        "mostrar": false,
        "botao_url": "#review"
      }
    },
    "combine_com": {
      "type": "gb-combine-com",
      "blocks": {
        "b1": {
          "type": "produto",
          "settings": {
            "produto": "sideways-cross-crystal-necklace"
          }
        },
        "b2": {
          "type": "produto",
          "settings": {
            "produto": "infinity-cross-necklace"
          }
        },
        "b3": {
          "type": "produto",
          "settings": {
            "produto": "layered-cross-crystal-necklace"
          }
        },
        "b4": {
          "type": "produto",
          "settings": {
            "produto": "dove-cross-necklace"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ],
      "settings": {}
    },
    "barra_fixa": {
      "type": "gb-barra-fixa",
      "settings": {}
    }
  },
  "order": [
    "galeria_compra",
    "beneficios",
    "no_pescoco",
    "detalhe",
    "medida",
    "conjunto",
    "presente",
    "ophir",
    "selos",
    "cuidados",
    "perguntas",
    "avaliacoes",
    "combine_com",
    "barra_fixa"
  ]
}
```


## Desenho de referência: home.html

```html
<!doctype html>
<!-- ATENÇÃO: este arquivo é só desenho. Foto de outra loja que aparece aqui é ilustração e nunca entra na loja do dono: na cópia do tema, o lugar usa a foto reserva da própria Ofirelle até o dono mandar a foto nova. A oferta de 3 peças (20%) é proposta: só vale depois que o dono criar o desconto automático. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ofirelle</title>
<meta name="description" content="Small gold-tone cross necklaces, made to be worn every day and given with love. Buy 3, get 20% off. Free US shipping over $50.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;1,6..72,300&amp;family=Red+Hat+Text:wght@400;500;600&amp;display=swap" rel="stylesheet">
<style>
:root{--cream:#FBFAF7;--linen:#F3EFE7;--navy:#1F2A44;--muted:#5B6170;--line:#E4DED2;--gold:#B08D57;--goldt:#7A5E2E;--goldl:#C9A86A;--serif:Newsreader,Georgia,serif;--sans:'Red Hat Text','Helvetica Neue',Arial,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--cream);color:var(--navy);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3,p,ul,figure{margin:0}
ul{padding:0;list-style:none}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
img{display:block;max-width:100%}
svg{flex:none}
s{text-decoration-thickness:1px}
a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.gb-wrap{max-width:1440px;margin:0 auto;padding:0 80px}
.gb-sec{padding:96px 0}
.gb-linen{background:var(--linen)}
.gb-label{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--goldt);margin:0 0 16px}
.gb-fio{display:inline-block;width:24px;height:1px;background:var(--gold);vertical-align:middle;margin-right:12px}
.gb-h2{font-family:var(--serif);font-weight:300;font-size:48px;line-height:1.08;letter-spacing:-.01em}
.gb-h2 em,.gb-display em{font-style:italic;font-weight:300}
.gb-head{margin-bottom:40px}
.gb-center{text-align:center;max-width:820px;margin-left:auto;margin-right:auto}
.gb-btn{display:inline-flex;align-items:center;justify-content:center;height:52px;padding:0 28px;white-space:nowrap;font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border:1px solid var(--navy);transition:background .2s,color .2s}
.gb-btn-p{background:var(--navy);color:var(--cream)}
.gb-btn-p:hover{background:#2C3A5C}
.gb-btn-s{color:var(--navy)}
.gb-btn-s:hover{background:var(--navy);color:var(--cream)}
.gb-link{font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border-bottom:1px solid var(--gold);padding-bottom:4px;display:inline-block}
.gb-ph{background:var(--linen);overflow:hidden}
.gb-ph img{width:100%;height:100%;object-fit:cover}
/* barra e cabecalho */
.gb-aviso{background:var(--navy);color:var(--cream);height:40px;display:flex;align-items:center;justify-content:center;gap:32px;font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;text-align:center;padding:0 16px}
.gb-aviso i{width:1px;height:12px;background:var(--goldl);display:block}
.gb-cab{position:relative;z-index:30;height:76px;border-bottom:1px solid var(--line);background:var(--cream)}
.gb-cab-in{max-width:1440px;margin:0 auto;padding:0 80px;height:76px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.gb-logo{font-family:var(--serif);font-weight:300;font-size:30px;letter-spacing:.22em;line-height:1}
.gb-icones{display:flex;justify-content:flex-end;gap:8px}
.gb-ib{width:44px;height:44px;display:flex;align-items:center;justify-content:center}
.gb-so-cel{display:none}
.gb-nav-lista{display:flex;align-items:center;gap:32px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
.gb-nav-lista>li>a,.gb-nav-lista summary{display:flex;align-items:center;min-height:44px}
.gb-nav-lista summary{list-style:none;cursor:pointer;gap:8px}
.gb-nav-lista summary::-webkit-details-marker{display:none}
.gb-nav-gifts{position:relative}
.gb-nav-gifts ul{position:absolute;top:56px;left:-24px;min-width:280px;background:var(--cream);border:1px solid var(--line);padding:12px 24px;text-transform:none;letter-spacing:0;font-size:15px;font-weight:400}
.gb-nav-gifts ul a{display:flex;align-items:center;min-height:44px}
.gb-nav-pe,.gb-nav-topo{display:none}
.gb-veu{display:none}
/* hero */
.gb-hero{display:grid;grid-template-columns:1fr 1fr;min-height:760px}
.gb-hero-txt{display:flex;flex-direction:column;justify-content:center;padding:64px 40px 64px 80px}
.gb-hero-txt>div{max-width:520px}
.gb-display{font-family:var(--serif);font-weight:200;font-size:72px;line-height:1.04;letter-spacing:-.015em}
.gb-hero-sub{font-size:18px;line-height:1.6;color:var(--muted);margin-top:24px}
.gb-hero-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:40px}
.gb-hero .gb-ph{height:760px}
/* cartoes */
.gb-topo-linha{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.gb-topo-linha .gb-link{margin-bottom:8px}
.gb-grade4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.gb-card .gb-ph{aspect-ratio:4/5}
.gb-card .gb-ph img{transition:transform .6s ease}
.gb-card:hover .gb-ph img{transform:scale(1.03)}
.gb-card-nome{font-family:var(--serif);font-weight:300;font-size:20px;line-height:1.25;margin:16px 0 4px}
.gb-card-preco{font-size:14px;color:var(--muted)}
/* ocasioes */
.gb-ocasioes .gb-ph{aspect-ratio:3/4;background:var(--cream)}
.gb-oc-nome{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;font-family:var(--serif);font-weight:300;font-size:22px;line-height:1.25}
.gb-oc-nome svg{transition:transform .2s}
.gb-oc:hover .gb-oc-nome svg{transform:translateX(4px)}
/* como funciona */
.gb-passos{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.gb-passo .gb-ph{aspect-ratio:4/5}
.gb-legenda{font-size:13px;line-height:1.5;color:var(--goldt);margin-top:12px;letter-spacing:.04em}
.gb-passo-txt{display:flex;gap:20px;align-items:flex-start;margin-top:28px;padding-top:24px;border-top:1px solid var(--line)}
.gb-num{font-family:var(--serif);font-weight:200;font-size:56px;line-height:.9;color:var(--gold)}
.gb-h3{font-family:var(--serif);font-weight:300;font-size:24px;line-height:1.2}
.gb-small{font-size:15px;line-height:1.6;color:var(--muted);margin-top:6px}
.gb-conta{font-size:16px;line-height:1.6;text-align:center;margin-top:64px}
.gb-conta s{color:var(--muted)}
.gb-conta strong{font-weight:500}
.gb-acao{display:flex;justify-content:center;margin-top:24px}
/* conjuntos */
.gb-sets{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.gb-set .gb-ph{aspect-ratio:4/5;background:var(--cream)}
.gb-set-topo{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-top:28px}
.gb-set-topo h3{font-size:28px}
.gb-set-preco{font-size:20px;font-weight:500;white-space:nowrap}
.gb-set-preco s{font-weight:400;font-size:15px;color:var(--muted);margin-right:8px}
.gb-set-pe{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:24px;padding-top:24px;border-top:1px solid var(--line)}
.gb-minis{display:flex;gap:8px}
.gb-minis img{width:64px;height:80px;object-fit:cover;background:#fff;border:1px solid var(--line)}
.gb-set-pe .gb-btn{padding:0 40px}
.gb-set-pe .gb-btn.gb-ok{background:var(--cream);color:var(--navy)}
/* todo dia */
.gb-mosaico{display:grid;grid-template-columns:741fr 515fr;gap:24px}
.gb-mosaico>.gb-ph{aspect-ratio:741/926}
.gb-mosaico-lado{display:grid;grid-template-rows:1fr 1fr;gap:24px}
.gb-mosaico-lado .gb-ph{height:100%}
/* ophir */
.gb-ophir{background:var(--navy);color:var(--cream);display:grid;grid-template-columns:1fr 1fr}
.gb-ophir .gb-ph{aspect-ratio:1/1;background:var(--navy)}
.gb-ophir-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:64px 80px 64px 123px}
.gb-ophir .gb-label{color:var(--goldl)}
.gb-ophir .gb-fio{background:var(--goldl)}
.gb-ophir p.gb-txt{font-size:18px;line-height:1.6;color:#D9DCE3;margin-top:24px;max-width:480px}
.gb-ophir .gb-link{border-color:var(--goldl);margin-top:40px}
/* promessa */
.gb-promessa-grade{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:48px 0}
.gb-prom{padding:8px 48px}
.gb-prom+.gb-prom{border-left:1px solid var(--line)}
.gb-prom h3{margin-top:24px}
.gb-prom p{max-width:300px;margin-top:10px}
/* perguntas */
.gb-faq-grade{display:grid;grid-template-columns:412fr 739fr;gap:133px}
.gb-faq-lista{border-top:1px solid var(--line)}
.gb-faq-lista details{border-bottom:1px solid var(--line)}
.gb-faq-lista summary{list-style:none;cursor:pointer;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:14px 0;font-family:var(--serif);font-weight:300;font-size:21px;line-height:1.3}
.gb-faq-lista summary::-webkit-details-marker{display:none}
.gb-faq-lista p{font-size:15px;line-height:1.6;color:var(--muted);padding:0 40px 20px 0}
.gb-menos{display:none}
details[open]>summary .gb-menos{display:block}
details[open]>summary .gb-mais{display:none}
/* cadastro */
.gb-cadastro{border-top:1px solid var(--line)}
.gb-cad-in{max-width:560px;margin:0 auto;text-align:center}
.gb-cad-in .gb-h2{font-size:40px}
.gb-cad-in>p.gb-txt{font-size:16px;line-height:1.6;color:var(--muted);margin-top:16px}
.gb-form{display:flex;margin-top:32px}
.gb-form input{flex:1;min-width:0;height:48px;border:1px solid var(--navy);border-right:0;background:#fff;padding:0 16px;font:inherit;font-size:16px;color:var(--navy);border-radius:0}
.gb-form input::placeholder{color:var(--muted)}
.gb-form .gb-btn{height:48px;padding:0 36px}
.gb-form-ok{font-size:14px;color:var(--goldt);margin-top:12px;min-height:21px}
.gb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* rodape */
.gb-rodape{background:var(--navy);color:var(--cream);padding:80px 0 32px}
.gb-rod-grade{display:grid;grid-template-columns:4fr 2fr 2fr 4fr;gap:48px}
.gb-rod-logo{font-family:var(--serif);font-weight:300;font-size:28px;letter-spacing:.22em}
.gb-rod-txt{font-size:14px;line-height:1.6;color:#D9DCE3;margin-top:16px;max-width:300px}
.gb-rod-rot{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--goldl);margin-bottom:16px}
.gb-rod-lista{display:grid;gap:10px;font-size:14px}
.gb-rod-email{display:inline-block;margin-top:12px;font-size:14px;border-bottom:1px solid var(--goldl);padding-bottom:2px}
.gb-rod-base{margin-top:64px;padding-top:24px;border-top:1px solid #3A4562;display:flex;justify-content:space-between;font-size:12px;color:#D9DCE3}
/* intermediario */
@media (max-width:1099px){
.gb-wrap,.gb-cab-in{padding:0 40px}
.gb-display{font-size:56px}
.gb-hero{min-height:620px}.gb-hero .gb-ph{height:auto;min-height:620px}
.gb-hero-txt{padding:56px 32px 56px 40px}
.gb-nav-lista{gap:20px}
.gb-grade4{grid-template-columns:repeat(2,1fr)}
.gb-passos{gap:24px}
.gb-ophir-txt{padding:56px 40px}
.gb-prom{padding:8px 24px}
.gb-faq-grade{gap:48px}
.gb-rod-grade{grid-template-columns:1fr 1fr;gap:40px}
}
/* celular */
@media (max-width:759px){
.gb-sec{padding:56px 0}
.gb-wrap{padding:0 20px}
.gb-label{margin-bottom:12px}
.gb-h2{font-size:32px;line-height:1.12;letter-spacing:0}
.gb-head{margin-bottom:24px}
.gb-btn{width:100%;padding:0 16px}
.gb-aviso{height:36px;font-size:11px;letter-spacing:.12em}
.gb-aviso i,.gb-aviso span:last-child{display:none}
.gb-cab{height:56px}
.gb-cab-in{height:56px;padding:0 8px;grid-template-columns:44px 44px 1fr 44px 44px}
.gb-so-cel{display:flex}
.gb-logo{grid-column:3;grid-row:1;text-align:center;font-size:22px;letter-spacing:.2em}
.gb-menu-btn{grid-column:1;grid-row:1}
.gb-busca-cel{grid-column:2;grid-row:1}
.gb-icones{grid-column:4 / 6;grid-row:1}
.gb-icones .gb-busca{display:none}
.gb-nav{position:fixed;top:0;left:0;bottom:0;width:min(340px,88vw);background:var(--cream);z-index:50;padding:8px 20px 32px;display:flex;flex-direction:column;overflow-y:auto;transform:translateX(-100%);transition:transform .3s ease;visibility:hidden}
.gb-nav.gb-aberto{transform:none;visibility:visible}
.gb-nav-topo{display:flex;justify-content:space-between;align-items:center;height:48px;margin-bottom:8px}
.gb-nav-topo span{font-family:var(--serif);font-weight:300;font-size:20px;letter-spacing:.2em}
.gb-nav-lista{display:block;font-family:var(--serif);font-weight:300;font-size:26px;letter-spacing:0;text-transform:none}
.gb-nav-lista>li>a,.gb-nav-lista summary{min-height:64px;border-bottom:1px solid var(--line);justify-content:space-between}
.gb-nav-gifts ul{position:static;min-width:0;border:0;border-bottom:1px solid var(--line);padding:8px 0 12px;font-family:var(--sans)}
.gb-nav-pe{display:block;margin-top:auto;padding-top:32px}
.gb-nav-pe a+a{display:block;margin-top:20px;font-size:14px;color:var(--muted)}
.gb-veu{position:fixed;inset:0;background:rgba(31,42,68,.4);z-index:40}
.gb-veu.gb-aberto{display:block}
.gb-hero{grid-template-columns:1fr;min-height:0}
.gb-hero .gb-ph{order:-1;height:460px;min-height:0}
.gb-hero-txt{padding:32px 20px 40px}
.gb-display{font-family:var(--serif);font-weight:300;font-size:42px;line-height:1.06;letter-spacing:-.01em}
.gb-hero-sub{font-size:16px;line-height:1.55;margin-top:16px}
.gb-hero-btns{display:grid;margin-top:28px}
.gb-mais-vendidos .gb-wrap{display:flex;flex-direction:column}
.gb-topo-linha{display:contents}
.gb-topo-linha>div{order:0;margin-bottom:24px}
.gb-mais-vendidos .gb-grade4{order:1}
.gb-topo-linha>.gb-link{order:2;align-self:flex-start;margin:32px 0 0}
.gb-grade4{grid-template-columns:1fr 1fr;gap:28px 16px}
.gb-card-nome{font-size:17px;margin-top:12px}
.gb-oc-faixa{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -20px;padding:0 20px 4px;scrollbar-width:none}
.gb-oc-faixa::-webkit-scrollbar{display:none}
.gb-oc{flex:0 0 260px;scroll-snap-align:start}
.gb-oc-nome{font-size:20px;margin-top:14px}
.gb-passos{grid-template-columns:1fr}
.gb-como .gb-head{text-align:center}
.gb-passo:last-child .gb-ph,.gb-passo:last-child .gb-legenda{display:none}
.gb-passo:last-child .gb-passo-txt{margin-top:0}
.gb-passo-txt{margin-top:20px;padding-top:20px;gap:16px}
.gb-num{font-size:48px;width:56px}
.gb-h3{font-size:21px;line-height:1.25}
.gb-small{line-height:1.55;margin-top:4px}
.gb-conta{margin-top:40px;padding-top:24px;border-top:1px solid var(--line)}
.gb-acao{margin-top:20px}
.gb-sets{grid-template-columns:1fr;gap:48px}
.gb-set-topo{margin-top:20px;gap:12px}
.gb-set-topo h3{font-size:23px}
.gb-set-preco{font-size:18px}
.gb-set-preco s{font-size:13px;margin-right:6px}
.gb-set .gb-small{font-size:14px}
.gb-set-pe{display:block;border-top:0;margin-top:16px;padding-top:0}
.gb-set-pe .gb-btn{margin-top:16px;padding:0 16px}
.gb-todo .gb-head{padding:0}
.gb-mosaico{grid-template-columns:1fr;gap:8px;margin:0 -20px}
.gb-mosaico>.gb-ph{aspect-ratio:390/488}
.gb-mosaico-lado{grid-template-rows:none;grid-template-columns:1fr 1fr;gap:8px;padding:0 20px}
.gb-mosaico-lado .gb-ph{aspect-ratio:1/1;height:auto}
.gb-ophir{grid-template-columns:1fr}
.gb-ophir-txt{padding:40px 20px 48px}
.gb-ophir p.gb-txt{font-size:16px;line-height:1.55;margin-top:16px}
.gb-ophir .gb-link{margin-top:28px}
.gb-promessa .gb-head{text-align:left;margin-bottom:16px}
.gb-promessa-grade{grid-template-columns:1fr;border-top:0;padding:0}
.gb-prom{display:grid;grid-template-columns:24px 1fr;gap:16px;padding:24px 0;border-top:1px solid var(--line)}
.gb-prom+.gb-prom{border-left:0}
.gb-prom h3{margin-top:0}
.gb-prom p{margin-top:6px}
.gb-faq-grade{grid-template-columns:1fr;gap:0}
.gb-faq-lista summary{font-size:18px;min-height:56px}
.gb-faq-lista p{padding-right:8px}
.gb-cad-in{text-align:left}
.gb-cad-in .gb-h2{font-size:30px}
.gb-cad-in>p.gb-txt{font-size:15px;margin-top:12px}
.gb-form{display:grid;gap:12px;margin-top:24px}
.gb-form input{border-right:1px solid var(--navy)}
.gb-rodape{padding:56px 0 24px}
.gb-rod-grade{grid-template-columns:1fr 1fr;gap:40px 24px}
.gb-rod-marca,.gb-rod-escreva{grid-column:1 / -1}
.gb-rod-marca{order:0}.gb-rod-escreva{order:3}
.gb-rod-logo{font-size:24px}
.gb-rod-txt{max-width:none;margin-top:12px}
.gb-rod-lista{gap:0}
.gb-rod-lista a{display:flex;align-items:center;min-height:36px}
.gb-rod-base{margin-top:40px;padding-top:20px}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
<div class="gb-aviso"><span>Buy 3 necklaces, get 20% off. No code needed</span><i aria-hidden="true"></i><span>Free US shipping over $50</span></div>
<header class="gb-cab">
<div class="gb-cab-in">
<button type="button" class="gb-ib gb-so-cel gb-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="gb-nav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
<a href="/search" class="gb-ib gb-so-cel gb-busca-cel" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg></a>
<nav class="gb-nav" id="gb-nav" aria-label="Main">
<div class="gb-nav-topo"><span aria-hidden="true"></span><button type="button" class="gb-ib gb-fechar" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
<ul class="gb-nav-lista">
<li><a href="/collections/necklaces">Necklaces</a></li>
<li><a href="/collections/cross-necklaces">Cross Necklaces</a></li>
<li><details class="gb-nav-gifts"><summary>Gifts<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><ul><li><a href="/collections/gifts?filter.p.tag=baptism">Baptism and First Communion</a></li><li><a href="/collections/gifts?filter.p.tag=confirmation">Confirmation</a></li><li><a href="/collections/gifts?filter.p.tag=mom">For Mom</a></li><li><a href="/collections/gifts?filter.p.tag=christmas">Christmas</a></li><li><a href="/collections/gifts?filter.p.tag=birthday">Birthday</a></li><li><a href="/collections/gifts?filter.p.tag=godmother">For a Godmother</a></li></ul></details></li>
<li><a href="/pages/our-story">Our Story</a></li>
</ul>
<div class="gb-nav-pe"><a href="#faith-set" class="gb-link">Build your faith set</a></div>
</nav>
<a href="/" class="gb-logo">OFIRELLE</a>
<div class="gb-icones">
<a href="/search" class="gb-ib gb-busca" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg></a>
<a href="/account" class="gb-ib gb-so-cel" aria-label="Account"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/></svg></a>
<a href="/cart" class="gb-ib" aria-label="Bag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M5 8h14l-1 12.5H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg></a>
</div>
</div>
</header>
<div class="gb-veu" aria-hidden="true"></div>
<main>
<!-- secao: hero -->
<section class="gb-hero">
<div class="gb-hero-txt"><div>
<p class="gb-label"><span class="gb-fio" aria-hidden="true"></span>Cross necklaces in gold</p>
<h1 class="gb-display">A small cross, <em>close to your heart.</em></h1>
<p class="gb-hero-sub">Made to be worn every day and given with love.</p>
<div class="gb-hero-btns">
<a href="/products/petite-puffed-cross-necklace" class="gb-btn gb-btn-p">Shop the Petite Puffed Cross</a>
<a href="#faith-set" class="gb-btn gb-btn-s">Build your faith set</a>
</div></div></div>
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&width=1200" alt="Petite Puffed Cross Necklace worn at the base of the neck with a cream ribbed top" width="1200" height="1500" style="object-position:50% 40%" fetchpriority="high"></div>
</section>
<!-- secao: mais-vendidos -->
<section class="gb-mais-vendidos gb-sec" style="border-top:1px solid var(--line)">
<div class="gb-wrap">
<div class="gb-topo-linha gb-head"><div><h2 class="gb-h2">Small crosses, <em>worn close.</em></h2></div><a href="/collections/necklaces" class="gb-link">Shop all necklaces</a></div>
<div class="gb-grade4"><a href="/products/petite-puffed-cross-necklace" class="gb-card"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&width=1200" alt="Petite Puffed Cross Necklace worn at the base of the neck" width="1200" height="1500" style="object-position:50% 40%" loading="lazy"></div><p class="gb-card-nome">Petite Puffed Cross Necklace</p><p class="gb-card-preco">$39.99</p></a><a href="/products/asymmetric-cross-necklace" class="gb-card"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/asymmetric-cross-necklace-1.png?v=1794614975&width=1200" alt="Asymmetric Double Cross Necklace in gold tone" width="1200" height="1500" style="object-position:50% 60%" loading="lazy"></div><p class="gb-card-nome">Asymmetric Double Cross Necklace</p><p class="gb-card-preco">$39.99</p></a><a href="/products/enamel-cross-pendant-necklace" class="gb-card"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-1.png?v=1794614797&width=1200" alt="Enamel Cross Medallion Necklace in gold tone" width="1200" height="1500" style="object-position:50% 60%" loading="lazy"></div><p class="gb-card-nome">Enamel Cross Medallion Necklace</p><p class="gb-card-preco">$39.99</p></a><a href="/products/sideways-cross-crystal-necklace" class="gb-card"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-1.png?v=1794614281&width=1200" alt="Sideways Cross Necklace with Crystal in gold tone" width="1200" height="1500" style="object-position:50% 60%" loading="lazy"></div><p class="gb-card-nome">Sideways Cross Necklace with Crystal</p><p class="gb-card-preco">$39.99</p></a></div>
</div></section>
<!-- secao: ocasioes -->
<section class="gb-ocasioes gb-sec gb-linen">
<div class="gb-wrap">
<div class="gb-head"><h2 class="gb-h2">For the days <em>she will remember.</em></h2></div>
<div class="gb-grade4 gb-oc-faixa"><a href="/collections/gifts?filter.p.tag=baptism" class="gb-oc"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-2.jpg?v=1794614797&width=1200" alt="Enamel Cross Medallion Necklace worn with a ribbed top" width="1200" height="1500" style="object-position:50% 40%" loading="lazy"></div><span class="gb-oc-nome">Baptism and First Communion<svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a><a href="/collections/gifts?filter.p.tag=confirmation" class="gb-oc"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/dove-cross-necklace-2.png?v=1794611995&width=1200" alt="Dove Cross Necklace worn with a cream camisole" width="1200" height="1500" style="object-position:50% 45%" loading="lazy"></div><span class="gb-oc-nome">Confirmation<svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a><a href="/collections/gifts?filter.p.tag=mom" class="gb-oc"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/layered-cross-crystal-necklace-2.png?v=1794612542&width=1200" alt="Layered Cross Necklace with Crystal worn in two layers" width="1200" height="1500" style="object-position:50% 45%" loading="lazy"></div><span class="gb-oc-nome">For Mom<svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a><a href="/collections/gifts?filter.p.tag=christmas" class="gb-oc"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/0519/6100/4203/files/1_26992984-bb2a-44e9-88b5-b72c2cd86e8a.png?v=1778865825&width=1200" alt="Gold cross necklace, gift-ready" width="1200" height="1500" style="object-position:50% 20%;transform:scale(2.3);transform-origin:50% 5%" loading="lazy"></div><span class="gb-oc-nome">Christmas<svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a></div>
</div></section>
<!-- secao: como-funciona -->
<section class="gb-como-funciona gb-como gb-sec" id="faith-set">
<div class="gb-wrap">
<div class="gb-head gb-center" style="margin-bottom:56px"><p class="gb-label">Build your faith set</p><h2 class="gb-h2">Three crosses. One for you, <em>two to give.</em></h2></div>
<div class="gb-passos"><div class="gb-passo"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&width=1200" alt="Petite Puffed Cross Necklace worn close to the neck" width="1200" height="1500" style="object-position:50% 40%" loading="lazy"></div><p class="gb-legenda">For you</p><div class="gb-passo-txt"><span class="gb-num">01</span><div><h3 class="gb-h3">Choose any 3</h3><p class="gb-small">Mix any 3 necklaces.</p></div></div></div><div class="gb-passo"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/dove-cross-necklace-2.png?v=1794611995&width=1200" alt="Dove Cross Necklace worn with a cream camisole" width="1200" height="1500" style="object-position:50% 45%" loading="lazy"></div><p class="gb-legenda">For your mother</p><div class="gb-passo-txt"><span class="gb-num">02</span><div><h3 class="gb-h3">20% comes off</h3><p class="gb-small">Applied in your bag. No code needed.</p></div></div></div><div class="gb-passo"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-2.jpg?v=1794614797&width=1200" alt="Enamel Cross Medallion Necklace worn with a ribbed top" width="1200" height="1500" style="object-position:50% 40%" loading="lazy"></div><p class="gb-legenda">For your goddaughter</p><div class="gb-passo-txt"><span class="gb-num">03</span><div><h3 class="gb-h3">Keep one, give two</h3><p class="gb-small">For her, for Mom, for a goddaughter.</p></div></div></div></div>
<p class="gb-conta">For example, 3 x $39.99 = <s>$119.97</s>. You pay <strong>$95.98</strong>, about $31.99 each.</p>
<div class="gb-acao"><a href="/collections/necklaces" class="gb-btn gb-btn-p">Start your set</a></div>
</div></section>
<!-- secao: camadas-prontas -->
<section class="gb-camadas-prontas gb-sec gb-linen">
<div class="gb-wrap">
<div class="gb-head"><h2 class="gb-h2">Two sets, <em>ready to give.</em></h2></div>
<div class="gb-sets"><article class="gb-set"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/0459/0744/3880/files/pearl-cross-pendant.jpg?v=1710749193&width=1200" alt="Two fine gold cross necklaces layered on the collarbone" width="1200" height="1500" style="object-position:50% 40%" loading="lazy"></div>
<div class="gb-set-topo"><h3 class="gb-h3">The Everyday Grace Set</h3><p class="gb-set-preco"><s>$119.97</s>$95.98</p></div>
<p class="gb-small">Petite Puffed Cross, Sideways Cross with Crystal, Infinity Cross</p>
<div class="gb-set-pe"><div class="gb-minis"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188&width=1200" alt="Petite Puffed Cross Necklace" width="64" height="80" loading="lazy"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-1.png?v=1794614281&width=1200" alt="Sideways Cross Necklace with Crystal" width="64" height="80" loading="lazy"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/infinity-cross-necklace-1.png?v=1794612824&width=1200" alt="Infinity Cross Necklace" width="64" height="80" loading="lazy"></div><button type="button" class="gb-btn gb-btn-p gb-add-set" aria-live="polite">Add the set</button></div></article><article class="gb-set"><div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/0459/0744/3880/files/simple-gold-cross-chain.png?v=1764087611&width=1200" alt="Fine gold cross necklace layered over a brown knit sweater" width="1200" height="1500" style="object-position:50% 50%" loading="lazy"></div>
<div class="gb-set-topo"><h3 class="gb-h3">The Blessing Set</h3><p class="gb-set-preco"><s>$119.97</s>$95.98</p></div>
<p class="gb-small">Enamel Cross Medallion, Dove Cross, Double Cross</p>
<div class="gb-set-pe"><div class="gb-minis"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/enamel-cross-pendant-necklace-1.png?v=1794614797&width=1200" alt="Enamel Cross Medallion Necklace" width="64" height="80" loading="lazy"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/dove-cross-necklace-1.png?v=1794611995&width=1200" alt="Dove Cross Necklace" width="64" height="80" loading="lazy"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/double-cross-necklace-1.png?v=1794614489&width=1200" alt="Double Cross Necklace" width="64" height="80" loading="lazy"></div><button type="button" class="gb-btn gb-btn-p gb-add-set" aria-live="polite">Add the set</button></div></article></div>
</div></section>
<!-- secao: todo-dia -->
<section class="gb-todo-dia gb-todo gb-sec">
<div class="gb-wrap">
<div class="gb-head"><h2 class="gb-h2">Close to your heart, <em>every day.</em></h2></div>
<div class="gb-mosaico">
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/0459/0744/3880/files/gold-diamond-cross.jpg?v=1789828010&width=1200" alt="Woman shading her eyes in the sun, wearing a fine gold cross necklace" width="1200" height="1500" style="object-position:50% 50%" loading="lazy"></div>
<div class="gb-mosaico-lado">
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/infinity-cross-necklace-2.png?v=1794612824&width=1200" alt="Infinity Cross Necklace worn with a ribbed tank top" width="1200" height="1500" style="object-position:50% 55%" loading="lazy"></div>
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-2.jpg?v=1794614281&width=1200" alt="Sideways Cross Necklace with Crystal worn with a satin camisole" width="1200" height="1500" style="object-position:50% 45%" loading="lazy"></div>
</div></div></div></section>
<!-- secao: ophir -->
<section class="gb-ophir">
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1008/2949/5588/files/cross-inside-pearls-necklace-1042996.png?v=1790219712&width=1200" alt="Gold cross medallion necklace resting on travertine stone beside an olive branch" width="1200" height="1500" style="object-position:50% 50%" loading="lazy"></div>
<div class="gb-ophir-txt">
<h2 class="gb-h2">Named after <em>the land of gold.</em></h2>
<p class="gb-txt">In the Bible, Ophir was the land of gold that Solomon's ships sailed for. We carry its name as a promise: pieces that feel precious, worn every day, given with love.</p>
<a href="/pages/our-story" class="gb-link">Read our story</a>
</div></section>
<!-- secao: promessa -->
<section class="gb-promessa gb-sec">
<div class="gb-wrap">
<div class="gb-head gb-center" style="margin-bottom:56px"><h2 class="gb-h2">Simple, and <em>in writing.</em></h2></div>
<div class="gb-promessa-grade"><div class="gb-prom"><svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="24" height="24"><path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.75"/><circle cx="17" cy="17.5" r="1.75"/></svg><div><h3 class="gb-h3">Shipping</h3><p class="gb-small">Processed in 1 to 3 business days, with tracking by email.</p></div></div><div class="gb-prom"><svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="24" height="24"><path d="M4.5 9.5h10a5 5 0 0 1 0 10H8"/><path d="M8.5 5.5l-4 4 4 4"/></svg><div><h3 class="gb-h3">30-day returns</h3><p class="gb-small">Refund or exchange, unworn and in its original packaging.</p></div></div><div class="gb-prom"><svg viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="24" height="24"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg><div><h3 class="gb-h3">1-year warranty</h3><p class="gb-small">Covered against manufacturing defects.</p></div></div></div>
</div></section>
<!-- secao: perguntas -->
<section class="gb-perguntas gb-sec gb-linen">
<div class="gb-wrap gb-faq-grade">
<div><h2 class="gb-h2">Good <em>to know.</em></h2></div>
<div class="gb-faq-lista"><details open><summary>How does Buy 3, get 20% off work?<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><p>Add 3 necklaces to your bag and the 20% comes off automatically at checkout.</p></details><details><summary>Where does it sit on the neck?<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><p>It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone.</p></details><details><summary>How long does shipping take?<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><p>Orders are processed in 1 to 3 business days, with tracking by email. Delivery time shows at checkout. Free US shipping over $50.</p></details><details><summary>Can I return it?<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><p>Yes, within 30 days for a refund or exchange, unworn and in its original packaging.</p></details><details><summary>Is it ready to give?<svg class="gb-mais" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-menos" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14"/></svg></summary><p>Yes. Every necklace arrives gift-ready.</p></details></div>
</div></section>
<!-- secao: cadastro -->
<section class="gb-cadastro gb-sec">
<div class="gb-wrap"><div class="gb-cad-in">

<h2 class="gb-h2">New pieces and <em>gift ideas.</em></h2>
<p class="gb-txt">New pieces and gift ideas. Leave anytime.</p>
<form class="gb-form" action="/contact#newsletter" method="post">
<input type="hidden" name="form_type" value="customer"><input type="hidden" name="contact[tags]" value="newsletter">
<label for="gb-email" class="gb-sr">Email address</label>
<input id="gb-email" type="email" name="contact[email]" placeholder="Email address" autocomplete="email" required>
<button type="submit" class="gb-btn gb-btn-p">Join</button>
</form>
<p class="gb-form-ok" role="status"></p>
</div></div></section>
</main>
<footer class="gb-rodape">
<div class="gb-wrap gb-rod-grade">
<div class="gb-rod-marca"><p class="gb-rod-logo">OFIRELLE</p><p class="gb-rod-txt">Named after Ophir, the land of gold in the Bible. Small crosses, made to be worn every day and given with love.</p></div>
<div><p class="gb-rod-rot">Shop</p><ul class="gb-rod-lista"><li><a href="/collections/necklaces">Necklaces</a></li><li><a href="/collections/cross-necklaces">Cross Necklaces</a></li><li><a href="/collections/gifts">Gifts</a></li><li><a href="/pages/our-story">Our Story</a></li></ul></div>
<div><p class="gb-rod-rot">Help</p><ul class="gb-rod-lista"><li><a href="/policies/shipping-policy">Shipping</a></li><li><a href="/policies/refund-policy">Returns and warranty</a></li><li><a href="/pages/faq">FAQ</a></li><li><a href="/pages/contact">Contact</a></li></ul></div>
<div class="gb-rod-escreva"><p class="gb-rod-rot">Write to us</p><p class="gb-rod-txt" style="margin-top:0">Questions about an order or a gift? We answer by email.</p><a href="mailto:support@ofirelle.com" class="gb-rod-email">support@ofirelle.com</a></div>
</div>
<div class="gb-wrap"><div class="gb-rod-base"><span>© 2026 Ofirelle</span><span><a href="/policies/privacy-policy">Privacy</a> · <a href="/policies/terms-of-service">Terms</a></span></div></div>
</footer>
<script>
(function(){
  var nav=document.getElementById('gb-nav'),veu=document.querySelector('.gb-veu'),abre=document.querySelector('.gb-menu-btn'),fecha=document.querySelector('.gb-fechar');
  function menu(on){nav.classList.toggle('gb-aberto',on);veu.classList.toggle('gb-aberto',on);abre.setAttribute('aria-expanded',on?'true':'false');document.body.style.overflow=on?'hidden':'';if(on){fecha.focus();}else{abre.focus();}}
  abre.addEventListener('click',function(){menu(true);});
  fecha.addEventListener('click',function(){menu(false);});
  veu.addEventListener('click',function(){menu(false);});
  nav.addEventListener('click',function(e){if(e.target.closest('a')&&nav.classList.contains('gb-aberto'))menu(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('gb-aberto'))menu(false);});
  var gifts=document.querySelector('.gb-nav-gifts');
  document.addEventListener('click',function(e){if(gifts.open&&!gifts.contains(e.target)&&window.innerWidth>759)gifts.open=false;});
  var faq=document.querySelectorAll('.gb-faq-lista details');
  faq.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)faq.forEach(function(o){if(o!==d)o.open=false;});});});
  document.querySelectorAll('.gb-add-set').forEach(function(b){b.addEventListener('click',function(){b.textContent='Added to your bag';b.classList.add('gb-ok');setTimeout(function(){b.textContent='Add the set';b.classList.remove('gb-ok');},2400);});});
})();
</script>
</body>
</html>

```

## Desenho de referência: produto.html

```html
<!doctype html>
<!-- ATENÇÃO: este arquivo é só desenho. Foto de outra loja que aparece aqui é ilustração e nunca entra na loja do dono: na cópia do tema, o lugar usa a foto reserva da própria Ofirelle até o dono mandar a foto nova. A oferta de 3 peças (20%) é proposta: só vale depois que o dono criar o desconto automático. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Petite Puffed Cross Necklace | Ofirelle</title>
<meta name="description" content="A small, softly rounded gold-tone cross that sits at the base of your neck. Buy 3 necklaces, get 20% off. Free US shipping over $50.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;1,6..72,300&amp;family=Red+Hat+Text:wght@400;500;600&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FBFAF7;color:#1F2A44;font-family:'Red Hat Text','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
h1,h2,h3,h4,p,ul,ol,figure,blockquote{margin:0}
ul,ol{padding:0;list-style:none}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
img{display:block;max-width:100%}
s{text-decoration-thickness:1px}
svg{flex:none}
:focus-visible{outline:2px solid #B08D57;outline-offset:2px}
.gb-m{display:none}
.gb-wrap{width:min(1280px,100% - 160px);margin:0 auto}
.gb-serif{font-family:Newsreader,Georgia,serif;font-weight:300}
.gb-label{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#7A5E2E;margin:0 0 16px}
.gb-h2{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:48px;line-height:1.08;letter-spacing:-.01em}
.gb-h2 em,.gb-h2-em{font-style:italic}
.gb-lead{font-size:16px;line-height:1.6;color:#5B6170;margin-top:20px}
.gb-muted{color:#5B6170}
.gb-btn{display:flex;align-items:center;justify-content:center;width:100%;height:52px;background:#1F2A44;color:#FBFAF7;font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
.gb-btn2{display:inline-flex;align-items:center;justify-content:center;height:52px;padding:0 32px;border:1px solid #1F2A44;color:#1F2A44;font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
.gb-link{display:inline-block;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border-bottom:1px solid #B08D57;padding-bottom:4px}
.gb-ph{background:#F3EFE7;overflow:hidden}
.gb-ph img{width:100%;height:100%;object-fit:cover}
.gb-ico{width:20px;height:20px}
.gb-ico24{width:24px;height:24px}

/* aviso e cabecalho */
.gb-barra-aviso{background:#1F2A44;color:#FBFAF7;height:40px;display:flex;align-items:center;justify-content:center;gap:32px;font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.gb-barra-aviso i{width:1px;height:12px;background:#C9A86A;display:block}
.gb-cabecalho{height:76px;border-bottom:1px solid #E4DED2;background:#FBFAF7}
.gb-cabecalho .gb-in{height:76px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.gb-cabecalho nav{display:flex;gap:32px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
.gb-logo{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:30px;letter-spacing:.22em;line-height:1}
.gb-cabecalho .gb-r,.gb-cabecalho .gb-l{display:flex;gap:8px;align-items:center}
.gb-cabecalho .gb-r{justify-content:flex-end}
.gb-ib{width:44px;height:44px;display:flex;align-items:center;justify-content:center;position:relative}
.gb-count{position:absolute;top:6px;right:4px;min-width:16px;height:16px;padding:0 4px;background:#1F2A44;color:#FBFAF7;font-size:10px;line-height:16px;text-align:center}

/* galeria e compra */
.gb-galeria-compra{padding:40px 0 96px}
.gb-galeria-compra .gb-in{display:grid;grid-template-columns:minmax(0,741fr) minmax(0,515fr);column-gap:24px;align-items:start}
.gb-gal-main{aspect-ratio:4/5}
.gb-gal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.gb-gal-grid button{display:block;aspect-ratio:4/5;background:#F3EFE7;overflow:hidden}
.gb-gal-grid img{width:100%;height:100%;object-fit:cover}
.gb-gal-strip-wrap{position:relative}
.gb-buy{padding-left:48px;position:sticky;top:24px;display:flex;flex-direction:column}
.gb-crumb{font-size:13px;line-height:1.5;color:#5B6170;margin:0 0 20px}
.gb-crumb a{border-bottom:1px solid #E4DED2}
.gb-crumb span[aria-hidden]{margin:0 8px}
.gb-buy h1{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:40px;line-height:1.1}
.gb-price{font-size:20px;font-weight:500;margin-top:14px}
.gb-mat{font-size:13px;line-height:1.5;color:#5B6170;margin-top:6px}
.gb-bens{display:grid;gap:10px;margin-top:24px;font-size:14px;line-height:1.4}
.gb-bens li{display:flex;align-items:center;gap:12px}
.gb-rule{height:1px;background:#E4DED2;margin:28px 0 20px}
.gb-finish{display:flex;align-items:center;gap:12px}
.gb-finish p{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
.gb-sw{width:36px;height:36px;border:1.5px solid #1F2A44;display:flex;align-items:center;justify-content:center}
.gb-sw i{width:22px;height:22px;border-radius:50%;background:#C9A86A;display:block}
.gb-set-label{margin:20px 0 18px}
.gb-qty{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.gb-qty button{position:relative;text-align:left;padding:12px;border:1px solid #E4DED2;background:#FBFAF7;min-height:88px;display:flex;flex-direction:column;gap:4px}
.gb-qty button[aria-checked="true"]{border:1.5px solid #1F2A44;background:#FFFFFF;padding:11.5px}
.gb-qty .gb-q1{font-size:12px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.gb-qty .gb-q2{font-size:15px;font-weight:500;white-space:nowrap}
.gb-qty .gb-q2 s{font-weight:400;color:#5B6170;font-size:12px}
.gb-qty .gb-q3{font-size:12px;color:#5B6170}
.gb-qty .gb-gold{color:#7A5E2E}
.gb-badge{position:absolute;top:-9px;left:11px;background:#1F2A44;color:#FBFAF7;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:2px 6px}
.gb-set-list ul{border-top:1px solid #E4DED2;margin-top:16px}
.gb-set-list li{display:grid;grid-template-columns:56px 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #E4DED2;font-size:14px}
.gb-set-list li img{width:56px;height:70px;object-fit:cover;background:#F3EFE7}
.gb-set-list li a{display:inline-block;font-size:13px;color:#5B6170;border-bottom:1px solid #B08D57;margin-top:4px}
.gb-set-total{display:flex;justify-content:space-between;font-size:14px;margin:12px 0 0}
.gb-set-total s{color:#5B6170}
.gb-set-total strong{font-weight:500}
.gb-buy-btn{margin-top:20px}
.gb-note{font-size:13px;line-height:1.5;color:#5B6170;text-align:center;margin-top:12px}
.gb-mini{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;margin-top:24px;padding-top:24px;border-top:1px solid #E4DED2;font-size:13px}
.gb-mini p{display:flex;align-items:center;gap:10px}
.gb-tabs{margin-top:28px;border-top:1px solid #E4DED2}
.gb-acc{border-bottom:1px solid #E4DED2}
.gb-acc summary{list-style:none;min-height:64px;display:flex;justify-content:space-between;align-items:center;gap:16px;cursor:pointer;font-family:Newsreader,Georgia,serif;font-weight:300;font-size:21px}
.gb-acc summary::-webkit-details-marker{display:none}
.gb-acc summary .gb-mi{display:none}
.gb-acc[open] summary .gb-pl{display:none}
.gb-acc[open] summary .gb-mi{display:block}
.gb-acc p{font-size:15px;line-height:1.6;color:#5B6170;padding:0 40px 20px 0}
.gb-tabs .gb-acc summary{min-height:56px;font-family:'Red Hat Text',Arial,sans-serif;font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase}

/* beneficios */
.gb-beneficios{padding:72px 0;border-top:1px solid #E4DED2;border-bottom:1px solid #E4DED2}
.gb-beneficios .gb-in{display:grid;grid-template-columns:minmax(0,412fr) minmax(0,844fr);column-gap:24px;align-items:start}
.gb-beneficios .gb-h2{max-width:360px}
.gb-beneficios ul{display:grid;grid-template-columns:repeat(3,1fr);column-gap:24px;padding-top:6px}
.gb-beneficios li{padding-left:24px;border-left:1px solid #E4DED2}
.gb-beneficios h3{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:21px;line-height:1.25;margin-top:20px}
.gb-beneficios li p{font-size:13px;line-height:1.55;color:#5B6170;margin-top:8px}

/* no pescoco */
.gb-no-pescoco{background:#F3EFE7;padding:96px 0}
.gb-no-pescoco .gb-in{display:grid;grid-template-columns:minmax(0,628fr) minmax(0,303fr) minmax(0,303fr);column-gap:24px;align-items:end}
.gb-no-pescoco .gb-ph{aspect-ratio:4/5;background:#FBFAF7}
.gb-no-pescoco .gb-a img{object-position:50% 40%}

/* detalhe */
.gb-detalhe{padding:96px 0}
.gb-detalhe .gb-in{display:grid;grid-template-columns:minmax(0,412fr) minmax(0,844fr);column-gap:24px;align-items:center}
.gb-detalhe .gb-t{padding-right:40px}
.gb-detalhe .gb-pair{display:grid;grid-template-columns:1fr 1fr;column-gap:24px}
.gb-detalhe .gb-ph{aspect-ratio:1/1}
.gb-detalhe figcaption{font-size:13px;line-height:1.5;color:#5B6170;margin-top:12px}

/* medida */
.gb-medida{background:#F3EFE7;padding:96px 0}
.gb-medida .gb-in{display:grid;grid-template-columns:minmax(0,628fr) minmax(0,521fr);column-gap:clamp(40px,9vw,131px);align-items:center}
.gb-medida svg{width:100%;height:auto;background:#FBFAF7;display:block}
.gb-specs{margin-top:32px;border-top:1px solid #E4DED2;font-size:14px}
.gb-specs li{display:grid;grid-template-columns:120px 1fr;padding:14px 0;border-bottom:1px solid #E4DED2}

/* conjunto */
.gb-conjunto{padding:96px 0}
.gb-conjunto .gb-in{display:grid;grid-template-columns:minmax(0,521fr) minmax(0,630fr);column-gap:clamp(40px,9vw,129px);align-items:center}
.gb-conjunto .gb-big{aspect-ratio:4/5}
.gb-conjunto .gb-big img{object-position:50% 40%}
.gb-set-name{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:24px;line-height:1.2;margin-top:36px}
.gb-pieces{display:grid;grid-template-columns:repeat(3,1fr);column-gap:15px;align-items:start;margin-top:20px}
.gb-pieces button{display:block;text-align:left}
.gb-pieces .gb-pf{position:relative;display:block;aspect-ratio:4/5;background:#F3EFE7;overflow:hidden;border:1.5px solid transparent}
.gb-pieces button[aria-checked="true"] .gb-pf{border-color:#1F2A44}
.gb-pieces .gb-pf img{width:100%;height:100%;object-fit:cover;object-position:50% 55%;opacity:.45}
.gb-pieces button[aria-checked="true"] .gb-pf img{opacity:1}
.gb-chk{position:absolute;top:10px;right:10px;width:24px;height:24px;border:1px solid #1F2A44;background:#FBFAF7;color:#FBFAF7;display:flex;align-items:center;justify-content:center}
.gb-chk svg{visibility:hidden}
.gb-pieces button[aria-checked="true"] .gb-chk{background:#1F2A44}
.gb-pieces button[aria-checked="true"] .gb-chk svg{visibility:visible}
.gb-pn{display:block;font-family:Newsreader,Georgia,serif;font-weight:300;font-size:18px;line-height:1.25;margin-top:12px}
.gb-pp{display:block;font-size:14px;color:#5B6170;margin-top:4px}
.gb-sum{display:flex;justify-content:space-between;align-items:baseline;margin-top:24px;padding-top:16px;border-top:1px solid #E4DED2}
.gb-sum-l{font-size:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.gb-sum-p{font-size:20px;font-weight:500}
.gb-sum-p s{font-size:14px;font-weight:400;color:#5B6170;margin-right:8px}
.gb-sum-n{font-size:13px;color:#7A5E2E;text-align:right;margin-top:4px}
.gb-set-cta{display:flex;align-items:center;gap:32px;margin-top:24px}
.gb-set-cta .gb-btn{flex:1}

/* presente */
.gb-presente{background:#F3EFE7;padding:96px 0}
.gb-presente .gb-in{display:grid;grid-template-columns:minmax(0,628fr) minmax(0,521fr);column-gap:clamp(40px,9vw,131px);align-items:center}
.gb-occ{display:grid;grid-template-columns:1fr 1fr;column-gap:40px;margin-top:36px;border-top:1px solid #E4DED2}
.gb-occ li{border-bottom:1px solid #E4DED2}
.gb-occ a{display:flex;justify-content:space-between;align-items:center;min-height:56px;font-family:Newsreader,Georgia,serif;font-weight:300;font-size:20px}
.gb-presente .gb-btn2{margin-top:36px}
.gb-box{position:relative;aspect-ratio:521/400;overflow:hidden;background:#FBFAF7}
.gb-box img{position:absolute;top:0;left:50%;width:160%;max-width:none;height:auto;transform:translateX(-50%)}

/* ophir */
.gb-ophir{padding:72px 0 64px}
.gb-ophir .gb-in{width:min(880px,100% - 160px);margin:0 auto;display:flex;align-items:center;gap:56px}
.gb-ophir .gb-ph{width:200px;height:200px;flex:none}
.gb-fio{display:block;width:40px;height:1px;background:#B08D57}
.gb-ophir blockquote{font-family:Newsreader,Georgia,serif;font-weight:300;font-style:italic;font-size:32px;line-height:1.25;margin-top:24px}
.gb-ophir .gb-link{margin-top:20px}

/* selos */
.gb-selos{padding:0 0 96px}
.gb-selos ul{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #E4DED2;border-bottom:1px solid #E4DED2}
.gb-selos li{display:flex;align-items:center;gap:14px;padding:24px 20px;border-right:1px solid #E4DED2}
.gb-selos li:last-child{border-right:0}
.gb-selos b{display:block;font-size:14px;font-weight:500}
.gb-selos small{display:block;font-size:13px;color:#5B6170;margin-top:2px}

/* cuidados */
.gb-cuidados{background:#F3EFE7;padding:72px 0}
.gb-cuidados .gb-in{display:grid;grid-template-columns:minmax(0,412fr) minmax(0,844fr);column-gap:24px;align-items:center}
.gb-cuidados ol{display:grid;grid-template-columns:1fr 1fr;column-gap:24px}
.gb-cuidados li{display:flex;align-items:baseline;gap:20px;padding:8px 0 8px 24px;border-left:1px solid #E4DED2}
.gb-num{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:40px;line-height:1;color:#B08D57}
.gb-cuidados li span+span{font-size:15px;line-height:1.6}

/* perguntas */
.gb-perguntas{padding:96px 0}
.gb-perguntas .gb-in{display:grid;grid-template-columns:minmax(0,412fr) minmax(0,739fr);grid-template-rows:auto 1fr;column-gap:clamp(40px,9vw,129px);align-items:start}
.gb-perguntas .gb-faq{grid-column:2;grid-row:1 / span 2}
.gb-perguntas .gb-ask{grid-column:1;grid-row:2;max-width:300px}
.gb-faq{border-top:1px solid #E4DED2}
.gb-ask{font-size:15px;line-height:1.6;color:#5B6170;margin-top:24px}
.gb-ask a{color:#1F2A44;border-bottom:1px solid #B08D57}

/* avaliacoes */
.gb-avaliacoes{padding:96px 0;border-top:1px solid #E4DED2}
.gb-avaliacoes .gb-in{max-width:640px;margin:0 auto;text-align:center;padding:0 20px}
.gb-avaliacoes h2{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:40px;line-height:1.1}
.gb-avaliacoes p.gb-muted{font-size:15px;line-height:1.6;margin:16px 0 28px}
.gb-avaliacoes .gb-btn2{height:48px;padding:0 28px;font-size:12px}

/* combine com */
.gb-combine-com{background:#F3EFE7;padding:96px 0}
.gb-cc-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:40px;gap:24px}
.gb-cc-head p.gb-muted{font-size:13px}
.gb-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.gb-card .gb-ph{aspect-ratio:4/5;background:#FBFAF7}
.gb-card .gb-ph img{object-position:50% 55%}
.gb-card-n{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:20px;line-height:1.25;margin:16px 0 4px}
.gb-card-p{font-size:14px;color:#5B6170}
.gb-add{height:44px;padding:0 24px;margin-top:14px;border:1px solid #1F2A44;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}

/* rodape */
.gb-rodape{background:#1F2A44;color:#FBFAF7;padding:80px 0 32px}
.gb-rodape .gb-cols{display:grid;grid-template-columns:4fr 2fr 2fr 4fr;gap:48px}
.gb-rodape .gb-fl{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#C9A86A;margin-bottom:16px}
.gb-rodape ul{display:grid;gap:10px;font-size:14px}
.gb-rodape .gb-ft{font-size:14px;line-height:1.6;color:#D9DCE3}
.gb-rodape .gb-mail{display:inline-block;margin-top:12px;font-size:14px;border-bottom:1px solid #C9A86A;padding-bottom:2px}
.gb-rodape .gb-base{margin-top:64px;padding-top:24px;border-top:1px solid #3A4562;display:flex;justify-content:space-between;font-size:12px;color:#D9DCE3}

/* gaveta do carrinho e menu */
.gb-veu{position:fixed;inset:0;background:rgba(31,42,68,.35);z-index:40;opacity:0;pointer-events:none;transition:opacity .2s}
.gb-veu.gb-on{opacity:1;pointer-events:auto}
.gb-gaveta-carrinho{position:fixed;top:0;right:0;bottom:0;width:440px;max-width:100%;background:#FBFAF7;z-index:50;transform:translateX(100%);transition:transform .25s ease;display:flex;flex-direction:column}
.gb-gaveta-carrinho.gb-on{transform:none}
.gb-gv-head{display:flex;justify-content:space-between;align-items:center;padding:20px 12px 16px 24px}
.gb-gv-head p{font-family:Newsreader,Georgia,serif;font-weight:300;font-size:24px}
.gb-gv-prog{padding:0 24px 20px;border-bottom:1px solid #E4DED2;font-size:14px;line-height:1.5}
.gb-bar{position:relative;height:4px;background:#E4DED2;margin-top:14px}
.gb-bar i{position:absolute;left:0;top:0;bottom:0;background:#B08D57;display:block;transition:width .25s}
.gb-marks{position:relative;height:18px;font-size:12px;color:#5B6170;margin-top:8px}
.gb-marks span{position:absolute;top:0}
.gb-gv-body{flex:1;overflow:auto;padding:0 24px}
.gb-gv-item{display:grid;grid-template-columns:72px 1fr auto;gap:16px;padding:20px 0;border-bottom:1px solid #E4DED2;font-size:14px}
.gb-gv-item img{width:72px;height:90px;object-fit:cover;background:#F3EFE7}
.gb-step{display:flex;align-items:center;border:1px solid #E4DED2}
.gb-step button{width:44px;height:44px;font-size:16px}
.gb-step span{width:24px;text-align:center}
.gb-rm{font-size:13px;color:#5B6170;min-height:44px;text-decoration:underline;text-decoration-color:#E4DED2;text-underline-offset:4px}
.gb-gv-sug{padding:20px 0}
.gb-gv-sug .gb-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.gb-gv-sug img{width:100%;aspect-ratio:4/5;object-fit:cover;background:#F3EFE7}
.gb-gv-foot{padding:20px 24px 24px;border-top:1px solid #E4DED2}
.gb-gv-foot .gb-ln{display:flex;justify-content:space-between;font-size:14px}
.gb-gv-foot .gb-sub{font-size:16px;font-weight:500;margin-top:12px}
.gb-sec{display:flex;justify-content:center;align-items:center;gap:8px;font-size:12px;color:#5B6170;margin-top:12px}
.gb-menu{position:fixed;top:0;left:0;bottom:0;width:340px;max-width:88%;background:#FBFAF7;z-index:50;transform:translateX(-100%);transition:transform .25s ease;padding:8px 20px 24px;overflow:auto}
.gb-menu.gb-on{transform:none}
.gb-menu > ul > li{border-bottom:1px solid #E4DED2}
.gb-menu > ul > li > a,.gb-menu summary{display:flex;justify-content:space-between;align-items:center;min-height:60px;font-family:Newsreader,Georgia,serif;font-weight:300;font-size:26px;list-style:none;cursor:pointer}
.gb-menu summary::-webkit-details-marker{display:none}
.gb-menu details ul{padding:0 0 12px}
.gb-menu details a{display:flex;align-items:center;min-height:44px;font-size:15px;color:#5B6170}
.gb-menu-foot{margin-top:32px;display:grid;gap:12px;font-size:14px}

/* barra fixa */
.gb-barra-fixa{display:none}
.gb-ib.gb-m,.gb-medida svg.gb-m{display:none}
.gb-cabecalho nav a{white-space:nowrap}

@media (max-width:1099px){
  .gb-wrap,.gb-ophir .gb-in{width:min(1280px,100% - 80px)}
  .gb-galeria-compra .gb-in{grid-template-columns:1fr 1fr}
  .gb-buy{padding-left:32px}
  .gb-h2{font-size:40px}
  .gb-cabecalho nav{gap:20px}
}

@media (max-width:759px){
  .gb-d{display:none !important}
  .gb-m{display:block}
  .gb-wrap,.gb-ophir .gb-in{width:calc(100% - 40px)}
  .gb-label{margin-bottom:12px}
  .gb-h2{font-size:32px;line-height:1.12}
  .gb-lead{font-size:15px;line-height:1.55;margin-top:12px}
  .gb-barra-aviso{height:36px;font-size:11px;letter-spacing:.12em;padding:0 16px;text-align:center}
  .gb-cabecalho{height:56px}
  .gb-cabecalho .gb-in{width:100%;height:56px;grid-template-columns:88px 1fr 88px;padding:0 8px}
  .gb-cabecalho .gb-l,.gb-cabecalho .gb-r{gap:0}
  .gb-logo{font-size:22px;letter-spacing:.2em;text-align:center}
  .gb-ib.gb-m{display:flex}
  .gb-mi-inline{display:inline}

  .gb-galeria-compra{padding:0}
  .gb-galeria-compra .gb-in{display:block;width:100%}
  .gb-gal-strip{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .gb-gal-strip::-webkit-scrollbar{display:none}
  .gb-gal-strip .gb-ph{flex:0 0 100%;height:288px;scroll-snap-align:start}
  .gb-gal-nav{position:absolute;top:50%;margin-top:-22px;width:44px;height:44px;display:flex;align-items:center;justify-content:center}
  .gb-gal-nav span{width:32px;height:32px;background:rgba(251,250,247,.85);display:flex;align-items:center;justify-content:center}
  .gb-gal-prev{left:4px}.gb-gal-next{right:4px}
  .gb-gal-count{position:absolute;right:12px;bottom:12px;background:#FBFAF7;padding:3px 8px;font-size:12px;letter-spacing:.06em}
  .gb-buy{position:static;padding:16px 20px 0}
  .gb-buy h1{font-size:26px;line-height:1.15}
  .gb-price{font-size:18px;margin-top:6px}
  .gb-mat{margin-top:2px}
  .gb-bens{gap:6px;margin-top:12px}
  .gb-bens li{gap:10px}
  .gb-finish{justify-content:space-between;height:48px;margin-top:4px}
  .gb-finish .gb-ib{margin-right:-4px}
  .gb-qty{gap:7px;margin-top:12px}
  .gb-qty button{min-height:76px;height:76px;padding:10px 8px;gap:3px}
  .gb-qty button[aria-checked="true"]{padding:9.5px 7.5px}
  .gb-qty .gb-q1{font-size:11px}
  .gb-qty .gb-q2 s{font-size:11px}
  .gb-badge{left:7px}
  .gb-buy-btn{order:1;margin-top:12px}
  .gb-note{order:1;margin-top:10px}
  .gb-set-list{order:2}
  .gb-set-list li{grid-template-columns:48px 1fr auto;padding:8px 0}
  .gb-set-list li img{width:48px;height:60px}
  .gb-mini{order:3;margin:24px 0 0;padding:0;gap:0;border-bottom:1px solid #E4DED2}
  .gb-mini p{padding:16px 12px 16px 0;line-height:1.35}
  .gb-mini p:nth-child(odd){border-right:1px solid #E4DED2}
  .gb-mini p:nth-child(even){padding:16px 0 16px 12px}
  .gb-mini p:nth-child(-n+2){border-bottom:1px solid #E4DED2}
  .gb-mini svg{color:#B08D57}

  .gb-beneficios{padding:48px 0;margin-top:48px}
  .gb-beneficios .gb-in,.gb-detalhe .gb-in,.gb-medida .gb-in,.gb-conjunto .gb-in,.gb-presente .gb-in,.gb-cuidados .gb-in,.gb-perguntas .gb-in{display:block}
  .gb-beneficios ul{display:block;margin-top:24px;padding:0}
  .gb-beneficios li{display:grid;grid-template-columns:24px 1fr;gap:16px;padding:20px 0;border-left:0;border-top:1px solid #E4DED2}
  .gb-beneficios li:last-child{padding-bottom:0}
  .gb-beneficios h3{margin-top:0}
  .gb-beneficios li p{margin-top:4px;line-height:1.5}

  .gb-no-pescoco{padding:0 0 56px}
  .gb-no-pescoco .gb-in{display:flex;flex-direction:column;width:100%;align-items:stretch}
  .gb-no-pescoco .gb-a{aspect-ratio:auto;height:460px;order:1}
  .gb-no-pescoco .gb-t{order:2;padding:32px 20px}
  .gb-no-pescoco .gb-b{order:3;margin:0 20px}

  .gb-detalhe{padding:56px 0}
  .gb-detalhe .gb-t{padding:0}
  .gb-detalhe .gb-pair{display:block}
  .gb-detalhe figure{margin-top:24px}
  .gb-detalhe figcaption{margin-top:10px}

  .gb-medida{padding:56px 0}
  .gb-medida svg.gb-m{display:block}
  .gb-medida .gb-t{margin-top:32px}
  .gb-specs{margin-top:24px}
  .gb-specs li{grid-template-columns:96px 1fr;padding:12px 0}

  .gb-conjunto{padding:56px 0}
  .gb-conjunto .gb-in{width:100%}
  .gb-conjunto .gb-pad{padding:0 20px}
  .gb-conjunto .gb-big{aspect-ratio:auto;height:440px;margin-top:24px}
  .gb-conjunto .gb-hd{order:-1}
  .gb-set-name{font-size:21px;margin-top:24px;padding:0 20px}
  .gb-pieces{display:flex;gap:12px;overflow-x:auto;padding:16px 20px 4px;margin:0;scrollbar-width:none}
  .gb-pieces button{flex:0 0 150px}
  .gb-pn{font-size:17px;margin-top:10px}
  .gb-chk{top:8px;right:8px}
  .gb-sum{margin-top:20px}
  .gb-sum-l{font-size:13px}
  .gb-sum-p{font-size:18px}
  .gb-set-cta{display:block;margin-top:20px;text-align:center}
  .gb-set-cta .gb-link{margin-top:20px;padding-top:14px}

  .gb-presente{padding:0 0 56px}
  .gb-presente .gb-in{display:flex;flex-direction:column;width:100%}
  .gb-presente .gb-box{order:-1}
  .gb-presente .gb-t{padding:32px 20px 0}
  .gb-occ{display:block;margin-top:24px}
  .gb-occ a{min-height:48px}
  .gb-presente .gb-btn2{display:flex;width:100%;margin-top:24px}

  .gb-ophir{padding:56px 0 40px;text-align:center}
  .gb-ophir .gb-in{display:block}
  .gb-ophir .gb-ph{width:120px;height:120px;margin:0 auto}
  .gb-fio{margin:24px auto 0}
  .gb-ophir blockquote{font-size:24px;line-height:1.3;margin-top:20px}
  .gb-ophir .gb-link{margin-top:12px;padding-top:14px}

  .gb-selos{padding:0 0 56px}
  .gb-selos ul{grid-template-columns:1fr 1fr}
  .gb-selos li{display:block;padding:16px 12px 16px 0}
  .gb-selos li:nth-child(even){border-right:0;padding:16px 0 16px 12px}
  .gb-selos li:nth-child(-n+2){border-bottom:1px solid #E4DED2}
  .gb-selos b{font-size:13px;margin-top:10px}
  .gb-selos small{font-size:12px;line-height:1.4}

  .gb-cuidados{padding:56px 0}
  .gb-cuidados ol{display:block;margin-top:24px}
  .gb-cuidados li{padding:16px 0;border-left:0;border-top:1px solid #E4DED2}
  .gb-cuidados li:last-child{padding-bottom:0}

  .gb-perguntas{padding:56px 0}
  .gb-faq{margin-top:24px}
  .gb-acc summary{min-height:56px;font-size:18px}
  .gb-acc p{line-height:1.55;padding:0 24px 20px 0}
  .gb-acc.gb-m{display:block}
  .gb-ask{font-size:14px}

  .gb-avaliacoes{padding:56px 0}
  .gb-avaliacoes h2{font-size:28px;line-height:1.15}
  .gb-avaliacoes p.gb-muted{margin:12px 0 24px}

  .gb-combine-com{padding:56px 0}
  .gb-cc-head{display:block;margin-bottom:24px}
  .gb-cc-head p.gb-muted{margin-top:8px}
  .gb-cards{grid-template-columns:1fr 1fr;gap:24px 16px}
  .gb-card-n{font-size:17px;margin-top:12px}
  .gb-add{width:100%;margin-top:12px}

  .gb-rodape{padding:56px 0 24px}
  .gb-rodape .gb-cols{grid-template-columns:1fr 1fr;gap:24px}
  .gb-rodape .gb-brand,.gb-rodape .gb-write{grid-column:1 / -1}
  .gb-rodape .gb-write{order:3}
  .gb-rodape ul{gap:0}
  .gb-rodape ul a{display:block;padding:12px 0}
  .gb-rodape .gb-fl{margin-bottom:8px}
  .gb-rodape .gb-base{margin-top:40px;padding-top:20px}
  .gb-rodape .gb-mail{padding-top:12px}

  .gb-gaveta-carrinho{width:100%}
  .gb-barra-fixa{display:grid;position:fixed;left:0;right:0;bottom:0;z-index:30;height:72px;background:#FBFAF7;border-top:1px solid #E4DED2;grid-template-columns:48px 1fr 140px;gap:12px;align-items:center;padding:0 16px 0 12px;transform:translateY(100%);transition:transform .2s}
  .gb-barra-fixa.gb-on{transform:none}
  .gb-barra-fixa img{width:48px;height:60px;object-fit:cover;object-position:50% 40%;background:#F3EFE7}
  .gb-barra-fixa p{font-size:14px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .gb-barra-fixa .gb-btn{width:140px;height:44px;font-size:12px;letter-spacing:.14em}
}
@media (prefers-reduced-motion:reduce){*{transition:none !important}}
</style>
</head>
<body>

<!-- secao: barra-aviso -->
<div class="gb-barra-aviso">
<span>Buy 3 necklaces, get 20% off. No code needed</span>
<i class="gb-d" aria-hidden="true"></i>
<span class="gb-d">Free US shipping over $50</span>
</div>

<!-- secao: cabecalho -->
<header class="gb-cabecalho">
<div class="gb-wrap gb-in">
<div class="gb-l">
<button type="button" class="gb-ib gb-m" aria-label="Menu" aria-controls="gb-menu" aria-expanded="false" data-gb-menu><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
<a href="/search" class="gb-ib gb-m" aria-label="Search"><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg></a>
<nav class="gb-d" aria-label="Main"><a href="/collections/necklaces">Necklaces</a><a href="/collections/cross-necklaces">Cross Necklaces</a><a href="/collections/gifts">Gifts</a><a href="/pages/our-story">Our Story</a></nav>
</div>
<a href="/" class="gb-logo">OFIRELLE</a>
<div class="gb-r">
<a href="/search" class="gb-ib gb-d" aria-label="Search"><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg></a>
<a href="/account" class="gb-ib gb-m" aria-label="Account"><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.75"/><path d="M4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6"/></svg></a>
<a href="/cart" class="gb-ib" aria-label="Bag" data-gb-open-cart><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12.5H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg><span class="gb-count" id="gb-count" hidden></span></a>
</div>
</div>
</header>

<main>
<!-- secao: galeria-compra -->
<section class="gb-galeria-compra">
<div class="gb-wrap gb-in">
<div class="gb-gal">
<div class="gb-d">
<div class="gb-ph gb-gal-main"><img id="gb-main" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace worn at the base of the neck" style="object-position:50% 40%" width="741" height="926"></div>
<div class="gb-gal-grid" id="gb-thumbs"></div>
</div>
<div class="gb-m gb-gal-strip-wrap">
<div class="gb-gal-strip" id="gb-strip" tabindex="0" aria-label="Product photos">
<div class="gb-ph"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace worn at the base of the neck" style="object-position:50% 45%"></div>
<div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-3.jpg?v=1794615188&amp;width=1200" alt="Close-up of the puffed gold cross on champagne satin" style="object-position:50% 60%"></div>
<div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace laid flat, with clasp and extender"></div>
<div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0930/1858/7481/files/1_6e01cc3f-8b9f-4d00-a2a9-5caad1e6953c.png?v=1774266622&amp;width=1200" alt="A hand on the chest holding a gold cross pendant"></div>
<div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0519/6100/4203/files/4IMAGE.jpg?v=1778778736&amp;width=1200" alt="Gold lobster clasp and extender chain"></div>
</div>
<button type="button" class="gb-gal-nav gb-gal-prev" aria-label="Previous photo" data-gb-step="-1"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px;transform:scaleX(-1)"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></button>
<button type="button" class="gb-gal-nav gb-gal-next" aria-label="Next photo" data-gb-step="1"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></button>
<span class="gb-gal-count" id="gb-gcount" aria-live="polite">1 / 5</span>
</div>
</div>

<div class="gb-buy">
<nav class="gb-crumb gb-d" aria-label="Breadcrumb"><a href="/collections/cross-necklaces">Cross Necklaces</a><span aria-hidden="true">/</span><span>Petite Puffed Cross Necklace</span></nav>
<h1>Petite Puffed Cross Necklace</h1>
<p class="gb-price">$39.99</p>
<p class="gb-mat">Gold-tone stainless steel</p>
<ul class="gb-bens">
<li><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/></svg>Sits at the base of your neck</li>
<li><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.75"/><circle cx="17" cy="17.5" r="1.75"/></svg>Free US shipping over $50</li>
<li><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8h17v4h-17z"/><path d="M5 12v8.5h14V12"/><path d="M12 8v12.5"/><path d="M12 8C10.2 4.6 6.6 4.7 7 6.6 7.3 8 12 8 12 8zM12 8c1.8-3.4 5.4-3.3 5-1.4-.3 1.4-5 1.4-5 1.4z"/></svg>Gift-ready, 30-day returns</li>
</ul>
<div class="gb-rule gb-d"></div>
<div class="gb-finish">
<p>Finish: Gold</p>
<button type="button" class="gb-ib" aria-label="Gold finish, selected" aria-pressed="true"><span class="gb-sw"><i></i></span></button>
</div>
<p class="gb-label gb-set-label gb-d">Build your faith set</p>
<div class="gb-qty" role="radiogroup" aria-label="How many necklaces">
<button type="button" role="radio" aria-checked="false" data-gb-qty="1"><span class="gb-q1">1 necklace</span><span class="gb-q2">$39.99</span><span class="gb-q3">Just this one</span></button>
<button type="button" role="radio" aria-checked="false" data-gb-qty="2"><span class="gb-q1">2 necklaces</span><span class="gb-q2">$79.98</span><span class="gb-q3 gb-gold">Free <span class="gb-d" style="display:inline">US </span>shipping</span></button>
<button type="button" role="radio" aria-checked="true" data-gb-qty="3"><span class="gb-badge">Best value</span><span class="gb-q1">3 necklaces</span><span class="gb-q2">$95.98 <s>$119.97</s></span><span class="gb-q3 gb-gold">about $31.99 each<span class="gb-d" style="display:inline">, save $23.99</span></span></button>
</div>
<div class="gb-set-list" id="gb-set-list">
<ul>
<li><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace" loading="lazy"><span>Petite Puffed Cross Necklace</span><span>$39.99</span></li>
<li data-gb-min="2"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-1.png?v=1794614281&amp;width=1200" alt="Sideways Cross Necklace with Crystal" loading="lazy"><span>Sideways Cross Necklace with Crystal<br><a href="/collections/cross-necklaces?filter.v.price.lte=39.99">Change</a></span><span>$39.99</span></li>
<li data-gb-min="3"><img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/infinity-cross-necklace-1.png?v=1794612824&amp;width=1200" alt="Infinity Cross Necklace" loading="lazy"><span>Infinity Cross Necklace<br><a href="/collections/cross-necklaces?filter.v.price.lte=39.99">Change</a></span><span>$39.99</span></li>
</ul>
<p class="gb-set-total" id="gb-set-total"><span>Total</span><span><s>$119.97</s> <strong>$95.98</strong></span></p>
</div>
<button type="button" class="gb-btn gb-buy-btn" id="gb-buy-btn">Add 3 necklaces · $95.98</button>
<p class="gb-note" id="gb-note"><span class="gb-m gb-mi-inline" data-gb-save>You save $23.99. </span>20% off applied in your bag. No code needed.</p>
<div class="gb-mini">
<p><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.75"/><circle cx="17" cy="17.5" r="1.75"/></svg>Free US shipping over $50</p>
<p><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 9.5h10a5 5 0 0 1 0 10H8"/><path d="M8.5 5.5l-4 4 4 4"/></svg>30-day returns</p>
<p><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>1-year warranty</p>
<p><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8h17v4h-17z"/><path d="M5 12v8.5h14V12"/><path d="M12 8v12.5"/><path d="M12 8C10.2 4.6 6.6 4.7 7 6.6 7.3 8 12 8 12 8zM12 8c1.8-3.4 5.4-3.3 5-1.4-.3 1.4-5 1.4-5 1.4z"/></svg>Gift-ready</p>
</div>
<div class="gb-tabs gb-d">
<details class="gb-acc"><summary>Details<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>A small, softly rounded gold cross that sits right at the base of your neck. A solid puffed shape with smooth edges, on a fine cable chain with a lobster clasp and extender.</p></details>
<details class="gb-acc"><summary>Shipping and returns<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Processed in 1 to 3 business days, with tracking by email. Free US shipping over $50. Returns within 30 days for a refund or exchange, unworn and in its original packaging. 1-year warranty against manufacturing defects.</p></details>
<details class="gb-acc"><summary>Care<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Put it on after perfume and lotion. Wipe it with a soft cloth.</p></details>
</div>
</div>
</div>
</section>

<!-- secao: beneficios -->
<section class="gb-beneficios">
<div class="gb-wrap gb-in">
<div>
<p class="gb-label"><span class="gb-d" style="display:inline-block;width:24px;height:1px;background:#B08D57;vertical-align:middle;margin-right:12px"></span>Made for every day</p>
<h2 class="gb-h2">Small, soft, and <em>easy to wear.</em></h2>
</div>
<ul>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M7 8.5h10"/></svg><div><h3>A softly rounded cross</h3><p>A solid puffed shape with smooth edges that catch the light.</p></div></li>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 8.5h19v7h-19z"/><path d="M6 8.5v3M9.5 8.5v2M13 8.5v3M16.5 8.5v2"/></svg><div><h3>Choker to collarbone</h3><p>Adjust it with the extender.</p></div></li>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/></svg><div><h3>Easy to layer</h3><p>Wear it alone or layered with other necklaces.</p></div></li>
</ul>
</div>
</section>

<!-- secao: no-pescoco -->
<section class="gb-no-pescoco">
<div class="gb-wrap gb-in">
<div class="gb-ph gb-a"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace worn at the base of the neck"></div>
<div class="gb-ph gb-b"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0930/1858/7481/files/1_6e01cc3f-8b9f-4d00-a2a9-5caad1e6953c.png?v=1774266622&amp;width=1200" alt="A hand resting on the chest, holding a gold cross pendant"></div>
<div class="gb-t">
<p class="gb-label">On the neck</p>
<h2 class="gb-h2">Close to your <em>heart.</em></h2>
<p class="gb-lead">It sits right at the base of your neck, small enough to wear with everything you own.</p>
</div>
</div>
</section>

<!-- secao: detalhe -->
<section class="gb-detalhe">
<div class="gb-wrap gb-in">
<div class="gb-t">
<p class="gb-label">Up close</p>
<h2 class="gb-h2">Rounded, so it <em>catches the light.</em></h2>
<p class="gb-lead">Smooth edges, on a fine cable chain with a lobster clasp.</p>
</div>
<div class="gb-pair">
<figure><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-3.jpg?v=1794615188&amp;width=1200" alt="Close-up of the puffed gold cross pendant on champagne satin"></div><figcaption>The pendant</figcaption></figure>
<figure><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0519/6100/4203/files/4IMAGE.jpg?v=1778778736&amp;width=1200" alt="Gold lobster clasp and extender chain on satin"></div><figcaption>The clasp</figcaption></figure>
</div>
</div>
</section>

<!-- secao: medida -->
<section class="gb-medida">
<div class="gb-wrap gb-in">
<div>
<svg class="gb-d" viewBox="0 0 628 440" fill="none" role="img" aria-label="Where the necklace sits: at the base of the neck with the extender closed, at the collarbone with it open">
<path d="M262 40C263 120 264 180 246 214C218 252 128 262 48 300" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
<path d="M366 40C365 120 364 180 382 214C410 252 500 262 580 300" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
<path d="M258 196Q314 284 370 196" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
<path d="M314 238v12M310 242h8" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
<path d="M250 214Q314 420 378 214" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"/>
<path d="M314 314v12M310 318h8" stroke="#B08D57" stroke-width="1.5" stroke-linecap="round"/>
<path d="M326 244H436" stroke="#5B6170" stroke-width="1"/><circle cx="326" cy="244" r="2" fill="#1F2A44"/>
<text x="446" y="248" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="13">Choker, extender closed</text>
<path d="M302 320H210" stroke="#5B6170" stroke-width="1"/><circle cx="302" cy="320" r="2" fill="#B08D57"/>
<text x="200" y="324" text-anchor="end" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="13">Collarbone, extender open</text>
</svg>
<svg class="gb-m" viewBox="0 0 350 260" fill="none" role="img" aria-label="Where the necklace sits: at the base of the neck with the extender closed, at the collarbone with it open">
<path d="M146 24C147 84 148 120 136 142C116 170 60 178 10 200" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
<path d="M204 24C203 84 202 120 214 142C234 170 290 178 340 200" stroke="#B08D57" stroke-width="1" stroke-linecap="round"/>
<path d="M144 128Q175 186 206 128" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
<path d="M175 153v10M171 156.5h8" stroke="#1F2A44" stroke-width="1.5" stroke-linecap="round"/>
<path d="M138 142Q175 300 212 142" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="4 4" stroke-linecap="round"/>
<path d="M175 216v10M171 219.5h8" stroke="#B08D57" stroke-width="1.5" stroke-linecap="round"/>
<path d="M184 158L208 96H220" stroke="#5B6170" stroke-width="1"/><circle cx="184" cy="158" r="2" fill="#1F2A44"/>
<text x="224" y="99" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">Choker, extender</text>
<text x="224" y="113" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">closed</text>
<path d="M184 222H226" stroke="#5B6170" stroke-width="1"/><circle cx="184" cy="222" r="2" fill="#B08D57"/>
<text x="232" y="219" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">Collarbone,</text>
<text x="232" y="233" fill="#1F2A44" font-family="'Red Hat Text',Arial,sans-serif" font-size="11">extender open</text>
</svg>
</div>
<div class="gb-t">
<p class="gb-label">Size</p>
<h2 class="gb-h2">From choker <em>to collarbone.</em></h2>
<p class="gb-lead">The extender chain lets you choose where it sits.</p>
<ul class="gb-specs">
<li><span class="gb-muted">Pendant</span><span>Petite puffed cross</span></li>
<li><span class="gb-muted">Chain</span><span>Fine cable chain</span></li>
<li><span class="gb-muted">Clasp</span><span>Lobster, with extender chain</span></li>
</ul>
</div>
</div>
</section>

<!-- secao: conjunto -->
<section class="gb-conjunto" id="set">
<div class="gb-wrap gb-in">
<div class="gb-ph gb-big"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0459/0744/3880/files/pearl-cross-pendant.jpg?v=1710749193&amp;width=1200" alt="Two fine gold necklaces layered on the collarbone"></div>
<div class="gb-hd-wrap">
<div class="gb-pad">
<p class="gb-label">Build your faith set</p>
<h2 class="gb-h2">Three crosses. One for you, <em>two to give.</em></h2>
<p class="gb-lead" style="max-width:520px">3 necklaces take 20% off in your bag. Start with this one.</p>
</div>
</div>
<div class="gb-set-box">
<p class="gb-set-name">The Everyday Grace Set</p>
<div class="gb-pieces" role="group" aria-label="The Everyday Grace Set">
<button type="button" role="checkbox" aria-checked="true" data-gb-piece="petite"><span class="gb-pf"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-1.png?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace"><span class="gb-chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span></span><span class="gb-pn">Petite Puffed Cross Necklace</span><span class="gb-pp">$39.99</span></button>
<button type="button" role="checkbox" aria-checked="true" data-gb-piece="sideways"><span class="gb-pf"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-1.png?v=1794614281&amp;width=1200" alt="Sideways Cross Necklace with Crystal"><span class="gb-chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span></span><span class="gb-pn">Sideways Cross Necklace with Crystal</span><span class="gb-pp">$39.99</span></button>
<button type="button" role="checkbox" aria-checked="true" data-gb-piece="infinity"><span class="gb-pf"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/infinity-cross-necklace-1.png?v=1794612824&amp;width=1200" alt="Infinity Cross Necklace"><span class="gb-chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span></span><span class="gb-pn">Infinity Cross Necklace</span><span class="gb-pp">$39.99</span></button>
</div>
<div class="gb-pad">
<div class="gb-sum"><span class="gb-sum-l" id="gb-sum-l">3 necklaces</span><span class="gb-sum-p"><s id="gb-sum-s">$119.97</s><span id="gb-sum-p">$95.98</span></span></div>
<p class="gb-sum-n" id="gb-sum-n">about $31.99 each, you save $23.99</p>
<div class="gb-set-cta">
<button type="button" class="gb-btn" id="gb-set-btn">Add the set · $95.98</button>
<a href="/collections/necklaces" class="gb-link">Choose your own 3</a>
</div>
</div>
</div>
</div>
</section>

<!-- secao: presente -->
<section class="gb-presente">
<div class="gb-wrap gb-in">
<div class="gb-t">
<p class="gb-label">A gift for her</p>
<h2 class="gb-h2">For the days she <em>will remember.</em></h2>
<p class="gb-lead">Every necklace arrives gift-ready, with 30 days to return or exchange.</p>
<ul class="gb-occ">
<li><a href="/collections/gifts?filter.p.tag=baptism">Baptism<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=communion">First Communion<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=confirmation">Confirmation<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=mom">Mother's Day<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=christmas">Christmas<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=birthday">Birthday<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
<li><a href="/collections/gifts?filter.p.tag=godmother">For a Godmother<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></li>
</ul>
<a href="/collections/gifts" class="gb-btn2">Shop gifts</a>
</div>
<div class="gb-box"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/0519/6100/4203/files/1_26992984-bb2a-44e9-88b5-b72c2cd86e8a.png?v=1778865825&amp;width=1200" alt="Gold cross necklace, gift-ready"></div>
</div>
</section>

<!-- secao: ophir -->
<section class="gb-ophir">
<div class="gb-in">
<div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1008/2949/5588/files/cross-inside-pearls-necklace-1042996.png?v=1790219712&amp;width=1200" alt="A gold medallion necklace on stone beside an olive branch"></div>
<div>
<span class="gb-fio" aria-hidden="true"></span>
<blockquote>Named after Ophir, the land of gold in the Bible.</blockquote>
<a href="/pages/our-story" class="gb-link">Our story</a>
</div>
</div>
</section>

<!-- secao: selos -->
<section class="gb-selos">
<div class="gb-wrap">
<ul>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="17.5" r="1.75"/><circle cx="17" cy="17.5" r="1.75"/></svg><div><b>Free US shipping over $50</b><small>Processed in 1 to 3 business days</small></div></li>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 9.5h10a5 5 0 0 1 0 10H8"/><path d="M8.5 5.5l-4 4 4 4"/></svg><div><b>30-day returns</b><small>Refund or exchange</small></div></li>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg><div><b>1-year warranty</b><small>Manufacturing defects</small></div></li>
<li><svg class="gb-ico24" viewBox="0 0 24 24" fill="none" stroke="#B08D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8h17v4h-17z"/><path d="M5 12v8.5h14V12"/><path d="M12 8v12.5"/><path d="M12 8C10.2 4.6 6.6 4.7 7 6.6 7.3 8 12 8 12 8zM12 8c1.8-3.4 5.4-3.3 5-1.4-.3 1.4-5 1.4-5 1.4z"/></svg><div><b>Gift-ready</b><small>Ready to give</small></div></li>
</ul>
</div>
</section>

<!-- secao: cuidados -->
<section class="gb-cuidados">
<div class="gb-wrap gb-in">
<div>
<p class="gb-label">Care</p>
<h2 class="gb-h2">Keep it <em>bright.</em></h2>
</div>
<ol>
<li><span class="gb-num">01</span><span>Put it on after perfume and lotion.</span></li>
<li><span class="gb-num">02</span><span>Wipe it with a soft cloth.</span></li>
</ol>
</div>
</section>

<!-- secao: perguntas -->
<section class="gb-perguntas">
<div class="gb-wrap gb-in">
<div>
<p class="gb-label">Questions</p>
<h2 class="gb-h2">Before you <em>choose.</em></h2>
</div>
<div class="gb-faq">
<details class="gb-acc gb-m"><summary>Details<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>A small, softly rounded gold cross that sits right at the base of your neck. A solid puffed shape with smooth edges, on a fine cable chain with a lobster clasp and extender.</p></details>
<details class="gb-acc gb-m"><summary>Shipping and returns<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Processed in 1 to 3 business days, with tracking by email. Free US shipping over $50. Returns within 30 days for a refund or exchange, unworn and in its original packaging. 1-year warranty against manufacturing defects.</p></details>
<details class="gb-acc" open><summary>How does Buy 3, get 20% off work?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Add 3 necklaces to your bag and the 20% comes off automatically at checkout.</p></details>
<details class="gb-acc" open><summary>Where does it sit on the neck?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>It closes with a lobster clasp and an extender chain, so it sits at the base of the neck or drops to the collarbone.</p></details>
<details class="gb-acc"><summary>What is it made of?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Gold-tone stainless steel, with a fine cable chain.</p></details>
<details class="gb-acc"><summary>How long does shipping take?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Orders are processed in 1 to 3 business days, with tracking by email. Delivery time shows at checkout. Free US shipping over $50.</p></details>
<details class="gb-acc"><summary>Can I return it?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Yes, within 30 days for a refund or exchange, unworn and in its original packaging.</p></details>
<details class="gb-acc"><summary>Is there a warranty?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Yes, 1 year against manufacturing defects.</p></details>
<details class="gb-acc"><summary>Is it ready to give?<svg class="gb-pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg><svg class="gb-mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M5 12h14"/></svg></summary><p>Yes. Every necklace arrives gift-ready.</p></details>
</div>
<p class="gb-ask">Something else on your mind? <a href="mailto:support@ofirelle.com">support@ofirelle.com</a></p>
</div>
</section>

<!-- secao: avaliacoes -->
<section class="gb-avaliacoes" id="reviews">
<div class="gb-in">
<p class="gb-label">Reviews</p>
<h2>No reviews yet.</h2>
<p class="gb-muted">If you wear one, tell us how.</p>
<a href="#review" class="gb-btn2">Write a review</a>
</div>
</section>

<!-- secao: combine-com -->
<section class="gb-combine-com">
<div class="gb-wrap">
<div class="gb-cc-head">
<div><p class="gb-label">Complete your set</p><h2 class="gb-h2">Wear it <em>with.</em></h2></div>
<p class="gb-muted">3 necklaces, 20% off.</p>
</div>
<div class="gb-cards">
<div class="gb-card"><a href="/products/sideways-cross-crystal-necklace"><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/sideways-cross-crystal-necklace-1.png?v=1794614281&amp;width=1200" alt="Sideways Cross Necklace with Crystal in gold"></div><p class="gb-card-n">Sideways Cross Necklace with Crystal</p><p class="gb-card-p">$39.99</p></a><button type="button" class="gb-add" data-gb-add="sideways">Add</button></div>
<div class="gb-card"><a href="/products/infinity-cross-necklace"><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/infinity-cross-necklace-1.png?v=1794612824&amp;width=1200" alt="Infinity Cross Necklace in gold"></div><p class="gb-card-n">Infinity Cross Necklace</p><p class="gb-card-p">$39.99</p></a><button type="button" class="gb-add" data-gb-add="infinity">Add</button></div>
<div class="gb-card"><a href="/products/layered-cross-crystal-necklace"><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/layered-cross-crystal-necklace-1.png?v=1794612542&amp;width=1200" alt="Layered Cross Necklace with Crystal in gold"></div><p class="gb-card-n">Layered Cross Necklace with Crystal</p><p class="gb-card-p">$39.99</p></a><button type="button" class="gb-add" data-gb-add="layered">Add</button></div>
<div class="gb-card"><a href="/products/dove-cross-necklace"><div class="gb-ph"><img loading="lazy" src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/dove-cross-necklace-1.png?v=1794611995&amp;width=1200" alt="Dove Cross Necklace in gold"></div><p class="gb-card-n">Dove Cross Necklace</p><p class="gb-card-p">$39.99</p></a><button type="button" class="gb-add" data-gb-add="dove">Add</button></div>
</div>
</div>
</section>
</main>

<!-- secao: rodape -->
<footer class="gb-rodape">
<div class="gb-wrap">
<div class="gb-cols">
<div class="gb-brand"><p class="gb-serif" style="font-size:28px;letter-spacing:.22em">OFIRELLE</p><p class="gb-ft" style="margin-top:16px;max-width:300px">Small gold-tone crosses for every day.</p></div>
<div><p class="gb-fl">Shop</p><ul><li><a href="/collections/necklaces">Necklaces</a></li><li><a href="/collections/cross-necklaces">Cross Necklaces</a></li><li><a href="/collections/gifts">Gifts</a></li><li><a href="/pages/our-story">Our Story</a></li></ul></div>
<div><p class="gb-fl">Help</p><ul><li><a href="/policies/shipping-policy">Shipping</a></li><li><a href="/policies/refund-policy">Returns and warranty</a></li><li><a href="/pages/faq">FAQ</a></li><li><a href="/pages/contact">Contact</a></li></ul></div>
<div class="gb-write"><p class="gb-fl">Write to us</p><p class="gb-ft">We answer by email.</p><a href="mailto:support@ofirelle.com" class="gb-mail">support@ofirelle.com</a></div>
</div>
<div class="gb-base"><span>© 2026 Ofirelle</span><span><a href="/policies/privacy-policy">Privacy</a> · <a href="/policies/terms-of-service">Terms</a></span></div>
</div>
</footer>

<!-- secao: barra-fixa -->
<div class="gb-barra-fixa" id="gb-barra-fixa" aria-hidden="true">
<img src="https://cdn.shopify.com/s/files/1/1004/3238/0208/files/petite-puffed-cross-necklace-2.jpg?v=1794615188&amp;width=1200" alt="Petite Puffed Cross Necklace worn at the neck" loading="lazy">
<div style="min-width:0"><p>Petite Puffed Cross</p><p style="font-weight:500">$39.99</p></div>
<button type="button" class="gb-btn" data-gb-add="petite" tabindex="-1">Add to bag</button>
</div>

<!-- secao: gaveta-carrinho -->
<div class="gb-veu" id="gb-veu"></div>
<aside class="gb-gaveta-carrinho" id="gb-cart" aria-label="Your bag" aria-hidden="true"></aside>

<!-- secao: menu -->
<nav class="gb-menu" id="gb-menu" aria-label="Menu" aria-hidden="true"></nav>
<template id="gb-menu-tpl">
<div style="display:flex;justify-content:flex-end"><button type="button" class="gb-ib" aria-label="Close menu" data-gb-close><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
<ul>
<li><a href="/collections/necklaces">Necklaces</a></li>
<li><a href="/collections/cross-necklaces">Cross Necklaces</a></li>
<li><details><summary>Gifts<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg></summary><ul>
<li><a href="/collections/gifts?filter.p.tag=baptism">Baptism and First Communion</a></li>
<li><a href="/collections/gifts?filter.p.tag=confirmation">Confirmation</a></li>
<li><a href="/collections/gifts?filter.p.tag=mom">For Mom</a></li>
<li><a href="/collections/gifts?filter.p.tag=christmas">Christmas</a></li>
<li><a href="/collections/gifts?filter.p.tag=birthday">Birthday</a></li>
<li><a href="/collections/gifts?filter.p.tag=godmother">For a Godmother</a></li>
</ul></details></li>
<li><a href="/pages/our-story">Our Story</a></li>
</ul>
<div class="gb-menu-foot"><a href="#set" class="gb-link" data-gb-close style="justify-self:start">Build your faith set</a><a href="mailto:support@ofirelle.com" class="gb-muted">support@ofirelle.com</a></div>
</template>

<script>
(function () {
  var CDN = 'https://cdn.shopify.com/s/files/1/1004/3238/0208/files/';
  var P = {
    petite: { name: 'Petite Puffed Cross Necklace', img: CDN + 'petite-puffed-cross-necklace-1.png?v=1794615188&width=1200' },
    sideways: { name: 'Sideways Cross Necklace with Crystal', img: CDN + 'sideways-cross-crystal-necklace-1.png?v=1794614281&width=1200' },
    infinity: { name: 'Infinity Cross Necklace', img: CDN + 'infinity-cross-necklace-1.png?v=1794612824&width=1200' },
    layered: { name: 'Layered Cross Necklace with Crystal', img: CDN + 'layered-cross-crystal-necklace-1.png?v=1794612542&width=1200' },
    dove: { name: 'Dove Cross Necklace', img: CDN + 'dove-cross-necklace-1.png?v=1794611995&width=1200' }
  };
  var PRICE = 39.99;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (v) { return '$' + v.toFixed(2); };

  /* galeria do computador: a miniatura troca de lugar com a foto principal */
  var G = [
    { src: CDN + 'petite-puffed-cross-necklace-2.jpg?v=1794615188&width=1200', alt: 'Petite Puffed Cross Necklace worn at the base of the neck', pos: '50% 40%' },
    { src: CDN + 'petite-puffed-cross-necklace-3.jpg?v=1794615188&width=1200', alt: 'Close-up of the puffed gold cross on champagne satin', pos: '50% 50%' },
    { src: CDN + 'petite-puffed-cross-necklace-1.png?v=1794615188&width=1200', alt: 'Petite Puffed Cross Necklace laid flat, with clasp and extender', pos: '50% 55%' },
    { src: 'https://cdn.shopify.com/s/files/1/0930/1858/7481/files/1_6e01cc3f-8b9f-4d00-a2a9-5caad1e6953c.png?v=1774266622&width=1200', alt: 'A hand on the chest holding a gold cross pendant', pos: '50% 50%' },
    { src: 'https://cdn.shopify.com/s/files/1/0519/6100/4203/files/4IMAGE.jpg?v=1778778736&width=1200', alt: 'Gold lobster clasp and extender chain', pos: '50% 50%' }
  ];
  var sel = 0;
  function drawGallery() {
    var m = $('#gb-main'); m.src = G[sel].src; m.alt = G[sel].alt; m.style.objectPosition = G[sel].pos;
    var box = $('#gb-thumbs'); box.innerHTML = '';
    G.forEach(function (g, i) {
      if (i === sel) return;
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show photo: ' + g.alt);
      var im = document.createElement('img'); im.src = g.src; im.alt = g.alt; im.loading = 'lazy'; im.style.objectPosition = g.pos;
      b.appendChild(im); b.addEventListener('click', function () { sel = i; drawGallery(); });
      box.appendChild(b);
    });
  }
  drawGallery();

  /* galeria do celular: rolagem lateral com contador */
  var strip = $('#gb-strip'), gc = $('#gb-gcount');
  strip.addEventListener('scroll', function () { gc.textContent = (Math.round(strip.scrollLeft / strip.clientWidth) + 1) + ' / 5'; }, { passive: true });
  $$('[data-gb-step]').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = Math.round(strip.scrollLeft / strip.clientWidth) + Number(b.getAttribute('data-gb-step'));
      i = (i + 5) % 5; strip.scrollTo({ left: i * strip.clientWidth, behavior: 'smooth' });
    });
  });

  /* cartoes 1, 2 e 3 colares */
  var qty = 3;
  var BTN = { 1: 'Add to bag · $39.99', 2: 'Add 2 necklaces · $79.98', 3: 'Add 3 necklaces · $95.98' };
  var NOTE = { 1: 'Add 2 more necklaces for 20% off.', 2: 'Free US shipping included. Add 1 more for 20% off.' };
  var noteHTML = $('#gb-note').innerHTML;
  function drawQty() {
    $$('[data-gb-qty]').forEach(function (b) { b.setAttribute('aria-checked', String(Number(b.getAttribute('data-gb-qty')) === qty)); });
    $('#gb-buy-btn').textContent = BTN[qty];
    $('#gb-note').innerHTML = qty === 3 ? noteHTML : NOTE[qty];
    var list = $('#gb-set-list'); list.hidden = qty < 2;
    $$('[data-gb-min]', list).forEach(function (li) { li.hidden = qty < Number(li.getAttribute('data-gb-min')); });
    var t = $('#gb-set-total');
    t.innerHTML = qty === 3 ? '<span>Total</span><span><s>$119.97</s> <strong>$95.98</strong></span>' : '<span>Free US shipping included</span><strong>$79.98</strong>';
  }
  $$('[data-gb-qty]').forEach(function (b) { b.addEventListener('click', function () { qty = Number(b.getAttribute('data-gb-qty')); drawQty(); }); });
  $$('.gb-qty [role=radio]').forEach(function (b, i, all) {
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0);
      if (!d) return; e.preventDefault(); var n = all[(i + d + 3) % 3]; n.click(); n.focus();
    });
  });
  $('#gb-buy-btn').addEventListener('click', function () {
    var ids = ['petite', 'sideways', 'infinity'].slice(0, qty);
    ids.forEach(function (id) { add(id, true); }); openCart();
  });

  /* conjunto pronto: liga e desliga pecas */
  function drawSet() {
    var on = $$('[data-gb-piece]').filter(function (b) { return b.getAttribute('aria-checked') === 'true'; });
    var n = on.length;
    $('#gb-sum-l').textContent = n === 1 ? '1 necklace' : n + ' necklaces';
    $('#gb-sum-s').hidden = n !== 3;
    $('#gb-sum-p').textContent = n === 3 ? '$95.98' : money(n * PRICE);
    $('#gb-sum-n').textContent = n === 3 ? 'about $31.99 each, you save $23.99' : (n === 2 ? 'Add 1 more for 20% off' : 'Add 2 more for 20% off');
    $('#gb-set-btn').textContent = n === 3 ? 'Add the set · $95.98' : (n === 2 ? 'Add 2 necklaces · $79.98' : 'Add to bag · $39.99');
  }
  $$('[data-gb-piece]').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-checked') === 'true';
      var count = $$('[data-gb-piece][aria-checked="true"]').length;
      if (on && count === 1) return;
      b.setAttribute('aria-checked', String(!on)); drawSet();
    });
  });
  $('#gb-set-btn').addEventListener('click', function () {
    $$('[data-gb-piece][aria-checked="true"]').forEach(function (b) { add(b.getAttribute('data-gb-piece'), true); });
    openCart();
  });

  /* gaveta do carrinho */
  var cart = {}, cartEl = $('#gb-cart'), veu = $('#gb-veu'), lastFocus = null;
  function add(id, silent) { cart[id] = (cart[id] || 0) + 1; if (!silent) openCart(); else drawCart(); }
  function count() { return Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0); }
  function drawCart() {
    var n = count(), sub = n * PRICE, off = n >= 3 ? Math.round(sub * 20) / 100 : 0, total = sub - off;
    var badge = $('#gb-count'); badge.hidden = !n; badge.textContent = n;
    var msg = n === 0 ? 'Your bag is empty.' : (n === 1 ? "You're $10.01 away from free US shipping. Add 2 more necklaces for 20% off." : (n === 2 ? 'Free US shipping unlocked. Add 1 more necklace for 20% off.' : 'Your faith set is complete. 20% off applied.'));
    var items = Object.keys(cart).map(function (id) {
      return '<div class="gb-gv-item"><img src="' + P[id].img + '" alt="' + P[id].name + '"><div><p>' + P[id].name + '</p><p class="gb-muted" style="font-size:13px;margin-top:2px">Gold</p>' +
        '<div style="display:flex;align-items:center;gap:16px;margin-top:8px"><div class="gb-step"><button type="button" aria-label="Decrease quantity" data-gb-dec="' + id + '">−</button><span>' + cart[id] + '</span><button type="button" aria-label="Increase quantity" data-gb-inc="' + id + '">+</button></div>' +
        '<button type="button" class="gb-rm" data-gb-rm="' + id + '">Remove</button></div></div><p>' + money(cart[id] * PRICE) + '</p></div>';
    }).join('');
    var sug = n > 0 && n < 3 ? '<div class="gb-gv-sug"><p class="gb-label" style="margin:0">Complete your set</p><div class="gb-row">' +
      ['sideways', 'infinity', 'layered', 'dove'].filter(function (id) { return !cart[id]; }).slice(0, 2).map(function (id) { return '<div><img src="' + P[id].img + '" alt="' + P[id].name + '"><p style="font-size:13px;margin-top:8px">' + P[id].name + '</p><p class="gb-muted" style="font-size:13px">$39.99</p><button type="button" class="gb-add" style="width:100%;margin-top:8px" data-gb-inc="' + id + '">Add</button></div>'; }).join('') + '</div></div>' : '';
    cartEl.innerHTML =
      '<div class="gb-gv-head"><p>Your bag (' + n + ')</p><button type="button" class="gb-ib" aria-label="Close bag" data-gb-close><svg class="gb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<div class="gb-gv-prog"><p>' + msg + '</p><div class="gb-bar"><i style="width:' + Math.min(100, sub / 119.97 * 100) + '%"></i></div><div class="gb-marks"><span style="left:41.7%;transform:translateX(-50%)">$50</span><span style="right:0">3 necklaces</span></div></div>' +
      '<div class="gb-gv-body">' + items + sug + '</div>' +
      '<div class="gb-gv-foot">' + (off ? '<p class="gb-ln"><span>Faith set, 20% off</span><span style="color:#7A5E2E">−' + money(off) + '</span></p>' : '') +
      '<p class="gb-ln gb-sub"><span>Subtotal</span><span>' + money(total) + '</span></p><p class="gb-muted" style="font-size:13px;margin-top:6px">Shipping and taxes calculated at checkout.</p>' +
      '<a href="/checkout" class="gb-btn" style="margin-top:20px">Checkout</a><p class="gb-sec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="M5 10.5h14v10H5z"/><path d="M8 10.5v-3a4 4 0 0 1 8 0v3"/></svg>Secure checkout</p></div>';
  }
  function openCart() { drawCart(); lastFocus = document.activeElement; cartEl.classList.add('gb-on'); veu.classList.add('gb-on'); cartEl.setAttribute('aria-hidden', 'false'); var c = $('[data-gb-close]', cartEl); if (c) c.focus(); }
  function closeAll() {
    cartEl.classList.remove('gb-on'); cartEl.setAttribute('aria-hidden', 'true');
    menu.classList.remove('gb-on'); menu.setAttribute('aria-hidden', 'true'); $('[data-gb-menu]').setAttribute('aria-expanded', 'false');
    veu.classList.remove('gb-on'); if (lastFocus) lastFocus.focus();
  }
  cartEl.addEventListener('click', function (e) {
    var t = e.target.closest('button'); if (!t) return;
    if (t.hasAttribute('data-gb-close')) return closeAll();
    var id;
    if ((id = t.getAttribute('data-gb-inc'))) cart[id] = (cart[id] || 0) + 1;
    else if ((id = t.getAttribute('data-gb-dec'))) { cart[id]--; if (cart[id] <= 0) delete cart[id]; }
    else if ((id = t.getAttribute('data-gb-rm'))) delete cart[id];
    drawCart();
  });
  $$('[data-gb-add]').forEach(function (b) { b.addEventListener('click', function () { add(b.getAttribute('data-gb-add')); }); });
  $('[data-gb-open-cart]').addEventListener('click', function (e) { e.preventDefault(); openCart(); });
  veu.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* menu do celular */
  var menu = $('#gb-menu');
  menu.appendChild($('#gb-menu-tpl').content.cloneNode(true));
  $('[data-gb-menu]').addEventListener('click', function (e) {
    lastFocus = e.currentTarget; menu.classList.add('gb-on'); veu.classList.add('gb-on'); menu.setAttribute('aria-hidden', 'false'); e.currentTarget.setAttribute('aria-expanded', 'true');
    $('[data-gb-close]', menu).focus();
  });
  $$('[data-gb-close]', menu).forEach(function (b) { b.addEventListener('click', closeAll); });

  /* barra fixa: aparece quando o botao principal sai da tela */
  var bar = $('#gb-barra-fixa');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      var past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      bar.classList.toggle('gb-on', past); bar.setAttribute('aria-hidden', String(!past));
      $('button', bar).tabIndex = past ? 0 : -1;
    }).observe($('#gb-buy-btn'));
  }
})();
</script>
</body>
</html>

```

