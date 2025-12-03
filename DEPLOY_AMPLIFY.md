# Deploy no AWS Amplify

## Passo 1: Preparar o Repositório Git

Se ainda não tem um repositório Git, crie um:

```bash
git init
git add .
git commit -m "Initial commit"
```

Depois, envie para GitHub, GitLab ou Bitbucket:

```bash
# Exemplo GitHub
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```

## Passo 2: Criar App no AWS Amplify

1. Acesse o console AWS: https://console.aws.amazon.com/amplify/
2. Clique em **"New app"** → **"Host web app"**
3. Escolha seu provedor Git (GitHub, GitLab, Bitbucket, etc.)
4. Autorize o acesso ao seu repositório
5. Selecione o repositório e branch (main/master)

## Passo 3: Configurar Build Settings

O Amplify vai detectar automaticamente o arquivo `amplify.yml` criado.

**Configurações importantes:**
- **App name**: Escolha um nome para sua aplicação
- **Environment**: production (ou outro nome)
- **Build settings**: Já configurado no amplify.yml

## Passo 4: Configurar Rewrites (Importante para SPA)

Após o deploy inicial, configure as regras de redirecionamento:

1. No console do Amplify, vá em **"Rewrites and redirects"**
2. Adicione esta regra:

```
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json|html)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

Ou use a regra simples:
```
Source: /<*>
Target: /index.html
Type: 404 (Redirect)
```

## Passo 5: Deploy

O Amplify vai fazer o deploy automaticamente!

- Cada push no branch configurado dispara um novo deploy
- Você pode ver os logs em tempo real
- URL gerada automaticamente: `https://[branch].[app-id].amplifyapp.com`

## Passo 6: Domínio Customizado (Opcional)

1. Vá em **"Domain management"**
2. Clique em **"Add domain"**
3. Configure seu domínio (Route 53 ou externo)
4. O Amplify configura HTTPS automaticamente

## Deploy Manual (Alternativa sem Git)

Se não quiser usar Git, você pode fazer deploy manual:

1. No console Amplify, escolha **"Deploy without Git provider"**
2. Faça upload de um arquivo ZIP com todos os arquivos
3. O Amplify vai hospedar os arquivos

Para criar o ZIP:
```bash
# Windows (PowerShell)
Compress-Archive -Path * -DestinationPath deploy.zip

# Ou use o explorador de arquivos para criar o ZIP
```

## Variáveis de Ambiente (Se necessário)

Se precisar configurar variáveis:
1. Vá em **"Environment variables"**
2. Adicione as variáveis necessárias

## Custos

- **Grátis**: 1000 minutos de build/mês + 15GB de armazenamento + 15GB de transferência
- Depois: ~$0.01 por minuto de build, $0.023/GB armazenado, $0.15/GB transferido

## Monitoramento

- Acesse **"Monitoring"** no console para ver métricas
- Logs de build disponíveis em cada deploy
