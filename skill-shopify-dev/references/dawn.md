# Dawn 16.0.0

Referência: https://github.com/Shopify/dawn/tree/v16.0.0, commit `bc39a7d2024f1e5c14c42f855bd3552b4913e204`. O código publicado e a licença estão no repositório. É referência fixa, não substitui a inspeção do tema instalado ou da versão atual. A branch main pode conter recursos não lançados.

A versão 16 remove modelos e seções de contas legadas; confira as notas e compatibilidade de contas antes de atualizar: https://github.com/Shopify/dawn/releases/tag/v16.0.0. Uma atualização de código não migra automaticamente configurações, apps ou personalizações da loja.

## Onde investigar

- `layout/theme.liquid`: estrutura global e carregamento.
- `templates/*.json`, `sections/`, `snippets/`, `config/`, `locales/`: composição, opções, blocos e traduções. Leia template específico e dados configurados antes de editar.
- `sections/main-product.liquid`, `snippets/buy-buttons.liquid`, `assets/product-info.js`, `assets/product-form.js`: formulário, opções e atualização de variantes. Confira outros arquivos envolvidos no tema real.
- `snippets/cart-drawer.liquid`, `sections/main-cart-items.liquid`, `assets/cart.js`, `assets/cart-drawer.js`: carrinho e feedback. `assets/constants.js` e `assets/pubsub.js` definem eventos internos desta versão. Não suponha estabilidade de interfaces internas em outras versões.
- `sections/header-group.json`, `sections/footer-group.json`, se presentes, e respectivos componentes: estrutura dos grupos. Identifique IDs efetivos nas configurações reais.

O Dawn privilegia HTML renderizado no servidor, JS quando necessário, aprimoramento progressivo e comportamento acessível. A integração com editor exige inicialização e limpeza quando seções são atualizadas: https://shopify.dev/docs/storefronts/themes/best-practices/editor/integrate-sections-and-blocks.

A Section Rendering API aceita até cinco IDs e usa o contexto da URL; respostas podem conter `null` mesmo em HTTP 200. No carrinho, erros de renderização ou parâmetros inválidos não provam que a mutação falhou. Confira o estado antes de tentar novamente: https://shopify.dev/docs/api/ajax/reference/cart e https://shopify.dev/docs/api/ajax/section-rendering.

Antes de subir, verifique loja e ID, backup, diferenças dos arquivos e se o alvo é publicado. Preserve configurações, arquivos de terceiros e instalações de apps. Avalie blocos e app embeds na cópia e faça QA de funcionalidades críticas antes de qualquer publicação autorizada.

Migração de outro tema para o Dawn, paridade visual, animação de entrada, filtros, carrinho e como medir: [dawn-paridade.md](dawn-paridade.md).
