# Controle de Gastos — app instalável e sincronizado

Este pacote contém o app de controle de gastos pronto para:
- Guardar os dados no **Firebase** (sincroniza sozinho entre os dispositivos)
- Ser hospedado de graça no **GitHub Pages**
- Ser **instalado** como um app de verdade (com ícone) no PC (Windows/Mac) e no celular (Android/iOS)

Leva uns 15-20 minutos na primeira vez. Depois disso é só usar.

---

## Parte 1 — Criar o projeto no Firebase (gratuito)

1. Acesse **https://console.firebase.google.com** e entre com sua conta Google.
2. Clique em **"Criar projeto"**. Dê um nome (ex: `controle-gastos`) e siga o assistente (pode desativar o Google Analytics, não é necessário).
3. Dentro do projeto, no menu lateral, clique em **Compilação → Firestore Database**.
4. Clique em **"Criar banco de dados"**. Escolha o modo **produção** e a localização mais próxima de você (ex: `southamerica-east1` para Brasil, ou `europe-west` para Suíça).
5. Depois de criado, vá na aba **Regras** (Rules) do Firestore e substitua o conteúdo pelo que está no arquivo `firestore.rules` deste pacote. Clique em **Publicar**.
6. No menu lateral, vá em **Compilação → Authentication**. Clique em **"Vamos começar"**, depois na aba **Sign-in method**, ative o provedor **Anônimo** (Anonymous).
7. Agora vá nas **Configurações do projeto** (ícone de engrenagem, no topo) → aba **Geral**. Role até "Seus aplicativos" e clique no ícone **`</>`** (Web) para registrar um app.
8. Dê um nome (ex: `gastos-web`) e clique em **Registrar app**. Você vai ver um bloco de código parecido com isto:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "controle-gastos-xxxx.firebaseapp.com",
     projectId: "controle-gastos-xxxx",
     storageBucket: "controle-gastos-xxxx.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

   **Copie esse objeto `{ ... }`** — você vai colar ele dentro do app na Parte 3.

---

## Parte 2 — Colocar o app no GitHub Pages (hospedagem gratuita)

1. Acesse **https://github.com** e crie uma conta (se ainda não tiver).
2. Clique em **"New repository"**. Dê um nome (ex: `controle-gastos`), marque como **Public**, e clique em **Create repository**.
3. Na página do repositório vazio, clique em **"uploading an existing file"** (ou "Add file → Upload files").
4. Arraste **todos os arquivos deste pacote** para lá: `index.html`, `manifest.json`, `sw.js`, a pasta `icons` (com os dois PNGs). Não precisa subir o `firestore.rules` nem este `README.md`, mas não tem problema se subir.
5. Clique em **Commit changes**.
6. Vá em **Settings → Pages** (menu lateral do repositório).
7. Em "Build and deployment", em **Source**, escolha **Deploy from a branch**. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
8. Espere 1-2 minutos. A página vai te dar um link tipo:

   `https://SEU-USUARIO.github.io/controle-gastos/`

   **Esse é o endereço do seu app.** Abra ele.

---

## Parte 3 — Primeira configuração (fazer uma vez em cada aparelho)

1. Abra o link do GitHub Pages no navegador.
2. Vai aparecer uma tela pedindo:
   - **Configuração do Firebase**: cole ali o objeto `firebaseConfig` que você copiou na Parte 1 (passo 8).
   - **Código da casa**: invente uma senha/código simples que só você e a Gabriela vão saber (ex: `marcelo-gabriela-2026`). **Use exatamente o mesmo código em todos os aparelhos** — é isso que faz os dados se encontrarem.
3. Clique em **Salvar e conectar**.
4. Pronto — os dados começam a sincronizar. Repita esse passo (com o mesmo código) no outro PC e no celular.

---

## Parte 4 — Instalar como app (ícone na tela)

**No computador (Chrome/Edge):**
Abra o link do app → clique no ícone de instalação que aparece na barra de endereço (geralmente um monitor com uma seta, ou os três pontinhos → "Instalar app...").

**No celular Android (Chrome):**
Abra o link → toque nos três pontinhos (⋮) → **"Adicionar à tela inicial"** ou **"Instalar app"**.

**No iPhone (Safari):**
Abra o link → toque no ícone de compartilhar (quadrado com seta) → **"Adicionar à Tela de Início"**.

Em todos os casos, vai aparecer um ícone do app (verde, com um cartão e uma moedinha dourada) que abre direto, sem barra de navegador.

---

## Como a sincronização funciona

- Os dois aparelhos (e quantos mais você quiser) escrevem e leem do mesmo "documento" no Firestore, identificado pelo código da casa.
- Assim que você edita algo num aparelho, ele sobe pro Firebase e desce automaticamente pro outro em poucos segundos (contanto que ambos tenham internet).
- **Evite editar a mesma coisa ao mesmo tempo nos dois aparelhos** — como é um arquivo único sincronizado, quem salvar por último "ganha" naquele campo específico.
- Se algum dia quiser trocar o código de sincronização ou os dados do Firebase, tem um botão **"Trocar código de sincronização"** no rodapé da tela inicial do app.

## Sobre segurança

O código da casa funciona como uma senha simples: qualquer pessoa que souber seu código E as chaves do seu projeto Firebase consegue ler os dados. Não é o mesmo nível de um banco, mas é bem razoável para um orçamento pessoal — ninguém encontra isso por acaso. Se um dia quiser reforçar (login de verdade com email/senha), é possível evoluir depois.
