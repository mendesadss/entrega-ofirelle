# Aplicativos, APIs e autenticação

Fontes: https://shopify.dev/docs/apps/build, https://shopify.dev/docs/api, https://shopify.dev/docs/api/usage/authentication, https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens e https://shopify.dev/docs/api/usage/access-scopes.

- Distinga Ajax API de tema hospedado, Storefront API e GraphQL Admin API. Escolha o recurso e permissões pelo uso; não coloque token administrativo no navegador. GraphQL Admin é a referência moderna, REST Admin é legado. Consulte versão, tipos e limites específicos.
- Identifique tipo de app, método de instalação, loja e escopos disponíveis antes de conectar ou modificar. Verifique erros GraphQL inclusive `userErrors`, paginação, limites, operações assíncronas e efeitos parciais. `200` por si só não demonstra sucesso funcional.
- A validade e renovação dependem do tipo de token e do fluxo. Verifique a documentação e a credencial real, sem inferir pelo prefixo. Minimize privilégios, mantenha segredos em armazenamento apropriado e trate rotação ou revogação conforme o fluxo efetivo.
- Apps podem usar app blocks, app embeds ou código injetado. Ao trocar de tema, verifique individualmente ativação e dependências: https://help.shopify.com/en/manual/online-store/themes/customizing-themes/apps. Não remova vestígios sem identificar dependências.
- Checkout e contas possuem superfícies e restrições próprias; não prometa acesso por Liquid do tema ou funcionalidade disponível em todos os planos. Confira extensões e elegibilidade atuais.
- Considere validação de webhooks e autenticação, proteção de dados, consentimento e idempotência conforme a implementação e documentação atual. Não imprima credenciais, cookies, dados pessoais ou URLs de acesso.
