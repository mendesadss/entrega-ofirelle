---
name: shopify-dev
description: Desenvolve, configura e investiga lojas Shopify, temas Dawn e outros, Liquid, HTML, CSS, JavaScript, aplicativos, APIs e integrações. Use para construir, alterar, testar ou preparar temas e recursos Shopify.
---

# Shopify Dev

Use esta skill em tarefas Shopify, inclusive desenvolvimento, configuração, upload de temas, aplicativos e APIs. Dawn é a base preferida do Mendes, mas identifique o tema real e sua versão antes de alterar uma loja existente. Não substitua outro tema sem pedido.

## Trabalho

1. Identifique loja, objetivo, ambiente, tema, versão, recursos e contexto do projeto (AGENTS.md ou CLAUDE.md, design guide e orientações específicas existentes). Consulte a implementação real, não presuma que corresponde ao Dawn original.
2. Escolha as referências conforme o problema em [references/guia.md](references/guia.md). Consulte a documentação oficial em https://shopify.dev/docs. Leia [references/dawn.md](references/dawn.md) para modificações de tema Dawn e [references/apps-apis.md](references/apps-apis.md) para apps, APIs e credenciais. O toolkit oficial de IA da Shopify está em https://shopify.dev/docs/apps/build/ai-toolkit.
3. A documentação oficial muda; confira a documentação oficial e a versão pertinente antes de decisão dependente de versão, limites, permissões, segurança, configuração, políticas, preço ou publicação. Cite links ao justificar comportamento; não alegue cobertura total só porque um arquivo existe.
4. Faça a mudança no menor escopo útil, mantendo recursos, traduções, configurações, dados e integrações existentes. Dados e promessas comerciais devem vir de evidências. Não invente desconto, estoque, avaliações, garantias ou prazo.
5. Valide com Theme Check e/ou validadores disponíveis quando adequados, além de testes reais proporcionais: renderização, editor, mobile/desktop, variantes, carrinho, acessibilidade e integrações afetadas. Relate explicitamente testes não realizados; análise estática não é compilação ou teste em loja.
6. Para trabalho remoto, confirme domínio, identidade, tema e escopo antes de qualquer alteração. Faça backup recuperável, prefira cópia não publicada e verifique o resultado. Publicação, alterações em loja ativa e outras mudanças externas seguem a autorização concedida pelo usuário e as permissões da plataforma. Nunca presuma que um comando ou API é seguro só pelo nome.

## Princípios

- HTML semântico, aprimoramento progressivo, responsividade, acessibilidade e código compatível com padrões existentes do tema. Evite dependências desnecessárias e conflitos CSS/JS.
- Liquid renderiza no servidor; use contextos, filtros e escape apropriados. Preserve `content_for_header`, `content_for_layout`, schema, configurações e `block.shopify_attributes` quando aplicáveis. Faça JS sobreviver à montagem e desmontagem do editor.
- Use rotas localizadas do Shopify, trate HTTP e erros funcionais. Ao substituir seções, preserve contexto e inicialização e trate HTML `null`. Preserve os mecanismos de carrinho, variantes, eventos e acessibilidade da versão instalada.
- Não aplique lazy loading indiscriminadamente a imagens principais visíveis no primeiro carregamento. Meça desempenho e valide impacto.
- Segredos, tokens e dados pessoais não entram em output, arquivos públicos, código de tema, linha de comando ou logs. Utilize acesso mínimo e fonte segura apropriada ao ambiente. Não presuma validade, duração, fluxo de renovação ou localização fixa de credenciais.
- Para políticas, checkout, privacidade, mercados, impostos, frete e pagamentos, confira configurações reais, elegibilidade e regras oficiais atuais; não trate texto gerado como comprovação legal ou operacional.
