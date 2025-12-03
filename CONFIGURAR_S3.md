# Configurar Acesso do Amplify ao S3

## ❌ Problema Atual

O build do Amplify está falando porque não tem permissões para acessar o bucket S3 `skylineip`.

```
Error: Command failed with exit code 1
aws s3 sync "s3://skylineip/Tour Virtual/ancora/lapentor/uploads/" ./uploads/
```

## ✅ Solução: Adicionar Permissões IAM

### Passo 1: Acessar o Console do Amplify

1. Acesse: https://console.aws.amazon.com/amplify/
2. Clique no app **tour-virtual-flexlog**
3. Vá em **App settings** → **General**

### Passo 2: Editar Service Role

1. Procure por **Service role**
2. Clique no link da role (algo como `amplifyconsole-backend-role`)
3. Você será redirecionado para o IAM Console

### Passo 3: Adicionar Política S3

1. No IAM Console, clique em **Add permissions** → **Attach policies**
2. Procure por `AmazonS3ReadOnlyAccess` e selecione
3. Clique em **Add permissions**

**OU** crie uma política customizada mais restrita:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::skylineip",
        "arn:aws:s3:::skylineip/*"
      ]
    }
  ]
}
```

### Passo 4: Atualizar amplify.yml

Depois de configurar as permissões, atualize o `amplify.yml`:

```yaml
frontend:
  phases:
    preBuild:
      commands:
        - echo "Starting deployment"
        - echo "Downloading images from S3..."
        - aws s3 sync "s3://skylineip/Tour Virtual/ancora/lapentor/uploads/" ./uploads/ --quiet
        - echo "Images downloaded successfully"
    build:
      commands:
        - echo "Build complete - static site ready"
        - ls -la uploads/ | head -20
```

### Passo 5: Fazer Deploy

```bash
git add amplify.yml
git commit -m "Adiciona download de imagens do S3"
git push
```

## 🔄 Alternativa: Usar URLs Públicas do S3

Se o bucket já for público, você pode configurar o tour para carregar as imagens diretamente do S3:

1. Edite `config.js` ou `db.json`
2. Atualize os caminhos das imagens para:
   ```
   https://skylineip.s3.amazonaws.com/Tour Virtual/ancora/lapentor/uploads/...
   ```

## 📝 Verificar Permissões Atuais

Para ver qual role o Amplify está usando:

```bash
aws amplify get-app --app-id d39chswvs5o5sw --region us-east-1
```

## 🆘 Precisa de Ajuda?

Se não tiver acesso ao IAM, peça ao administrador AWS para:
1. Adicionar permissões S3 à role do Amplify
2. OU tornar o bucket `skylineip` público (menos seguro)
