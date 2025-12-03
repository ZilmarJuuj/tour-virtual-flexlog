# Deploy no AWS Amplify - Tour Virtual FlexLog

## ✅ Repositório GitHub Configurado
https://github.com/ZilmarJuuj/tour-virtual-flexlog

## 🚀 Como fazer deploy de alterações

Agora que está conectado ao GitHub, qualquer alteração é automática:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O Amplify detecta automaticamente e faz o deploy!

## 📁 Estrutura do Projeto

- `amplify.yml` - Configuração do build do Amplify
- `index.html` - Página principal da plataforma Lapentor
- `tour.html` - Página do tour virtual
- `db.json` - Dados das cenas do tour
- `assets/` - CSS, imagens e favicons
- `dist/` - JavaScript compilado (vendors1.min.js, scripts.js)
- `modules/` - Módulos da plataforma (lapentor.app, lapentor.marketplace)
- `bower_components/krpano/` - Engine do tour 360°
- `vrcore/` - Arquivos core do VR

## 🚫 Arquivos Ignorados (.gitignore)

Estes arquivos NÃO vão para o Git:
- `uploads/` - Arquivos gerados pelo usuário
- `*.zip` - Arquivos de deploy
- `*.ps1` - Scripts PowerShell
- `temp-check/` - Pasta temporária
- `node_modules/` - Dependências

## 🔧 Troubleshooting

### Erros 404 nos arquivos CSS/JS
1. Verifique os logs de build no Amplify Console
2. Confirme que todos os arquivos foram commitados no Git
3. Limpe o cache do navegador (Ctrl + Shift + Delete)
4. Verifique se o `amplify.yml` tem o `baseDirectory` correto

### Build falhou
1. Veja os logs no Amplify Console
2. Verifique se o `amplify.yml` está na raiz do projeto
3. Confirme que não há erros de sintaxe no YAML

### Arquivos não aparecem
1. Verifique se não estão no `.gitignore`
2. Confirme que foram commitados: `git status`
3. Force um novo deploy no Amplify Console

## 📝 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Desfazer alterações não commitadas
git checkout -- arquivo.html

# Criar nova branch para testar
git checkout -b teste
git push -u origin teste

# Voltar para main
git checkout main
```

## 🌐 URLs do Projeto

- **Repositório**: https://github.com/ZilmarJuuj/tour-virtual-flexlog
- **Amplify Console**: https://console.aws.amazon.com/amplify/
- **URL do Site**: Será gerada após o deploy (formato: `https://main.xxxxx.amplifyapp.com`)

## 💰 Custos AWS Amplify

- **Grátis**: 1000 minutos de build/mês + 15GB armazenamento + 15GB transferência
- **Depois**: ~$0.01/min build, $0.023/GB armazenado, $0.15/GB transferido

## 🔐 Domínio Customizado (Futuro)

Quando quiser adicionar um domínio próprio:
1. No Amplify Console → "Domain management"
2. Adicione seu domínio
3. Configure DNS (Route 53 ou externo)
4. HTTPS configurado automaticamente
