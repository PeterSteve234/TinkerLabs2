# 🎮 TinkerLabs - Guia de Setup Local

Bem-vindo ao TinkerLabs! Este guia vai te ajudar a rodar o projeto na sua máquina.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** → [Download](https://nodejs.org/)
- **Git** → [Download](https://git-scm.com/)
- **pnpm** (gerenciador de pacotes) → Instale com:
  ```bash
  npm install -g pnpm
  ```

---

## 🚀 Instalação Rápida

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/tinkerlabs.git
cd tinkerlabs
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Configuração da Aplicação
VITE_APP_TITLE=TinkerLabs
VITE_APP_LOGO=/logo.svg
VITE_APP_ID=seu_app_id_aqui

# Banco de Dados (opcional para desenvolvimento local)
DATABASE_URL=mysql://usuario:senha@localhost:3306/tinkerlabs

# APIs (opcional - use valores de teste)
RAWG_API_KEY=6603586d2b01415b9a433df6b609c458
```

### 4. Rode o Servidor de Desenvolvimento

```bash
pnpm dev
```

### 5. Acesse no Navegador

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📁 Estrutura do Projeto

```
tinkerlabs/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/         # Páginas (Home, Deals, Anime, etc)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários (tRPC client)
│   │   ├── App.tsx        # Roteamento principal
│   │   └── index.css      # Estilos globais
│   └── public/            # Arquivos estáticos
│
├── server/                # Backend (Express + tRPC)
│   ├── routers.ts         # Procedimentos tRPC
│   ├── db.ts              # Funções de banco de dados
│   └── _core/             # Configuração interna
│
├── drizzle/               # Banco de dados
│   └── schema.ts          # Definição de tabelas
│
└── package.json           # Dependências do projeto
```

---

## 🛠️ Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Compila para produção |
| `pnpm preview` | Visualiza build de produção |
| `pnpm type-check` | Verifica tipos TypeScript |
| `pnpm db:push` | Sincroniza banco de dados |

---

## 🔧 Configuração de Banco de Dados (Opcional)

Se quiser usar banco de dados localmente:

### 1. Instale MySQL/MariaDB

- **Windows/Mac**: [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- **Linux**: `sudo apt-get install mysql-server`

### 2. Crie um Banco de Dados

```bash
mysql -u root -p
```

```sql
CREATE DATABASE tinkerlabs;
EXIT;
```

### 3. Configure a Connection String

Atualize `.env.local`:

```env
DATABASE_URL=mysql://root:sua_senha@localhost:3306/tinkerlabs
```

### 4. Sincronize o Schema

```bash
pnpm db:push
```

---

## 🌐 APIs Integradas

O projeto usa as seguintes APIs **gratuitas**:

| API | Descrição | Endpoint |
|-----|-----------|----------|
| **CheapShark** | Jogos em promoção | https://www.cheapshark.com/api/1.0/ |
| **RAWG** | Dados de jogos | https://api.rawg.io/api/ |
| **Jikan** | Informações de animes | https://api.jikan.moe/v4/ |
| **GamerPower** | Notícias de games | https://www.gamerpower.com/api/ |

Nenhuma chave de API é necessária para desenvolvimento local (exceto RAWG, que fornece uma gratuita).

---

## 🎨 Personalizando o Design

### Cores Principais

Edite `client/src/index.css` para mudar as cores:

```css
.dark {
  --accent: oklch(0.65 0.25 290); /* Rosa/Magenta vibrante */
  --background: oklch(0.18 0.08 270); /* Roxo escuro */
}
```

### Fontes

As fontes são importadas do Google Fonts em `client/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module..."

```bash
pnpm install
```

### Erro: "Port 3000 is already in use"

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Database connection failed"

- Verifique se MySQL está rodando
- Confirme a connection string em `.env.local`
- Tente: `pnpm db:push`

---

## 📦 Build para Produção

### 1. Compile o Projeto

```bash
pnpm build
```

### 2. Teste o Build Localmente

```bash
pnpm preview
```

### 3. Deploy

Você pode fazer deploy em:

- **Vercel** (recomendado para Next.js)
- **GitHub Pages** (estático)
- **Netlify**
- **Railway**
- **Render**

---

## 🚀 Melhorias Futuras

Aqui estão ideias para expandir o TinkerLabs:

### 🎯 Curto Prazo (1-2 semanas)

- [ ] **Sistema de Favoritos** - Salvar jogos/animes favoritos no localStorage
- [ ] **Notificações por Email** - Alertar quando um jogo cai de preço
- [ ] **Histórico de Preços** - Gráfico mostrando variação de preço ao longo do tempo
- [ ] **Busca Avançada** - Filtros por plataforma, gênero, preço máximo
- [ ] **Dark/Light Mode Toggle** - Permitir trocar tema

### 📊 Médio Prazo (1 mês)

- [ ] **Autenticação de Usuário** - Login com Google/Discord
- [ ] **Wishlist Sincronizada** - Salvar favoritos na nuvem
- [ ] **Recomendações Personalizadas** - Baseado em histórico de visualização
- [ ] **Comparação de Preços** - Mostrar mesmo jogo em diferentes lojas
- [ ] **Reviews de Usuários** - Comentários sobre jogos/animes
- [ ] **Sistema de Pontos** - Gamificar com badges e achievements

### 🎬 Longo Prazo (2+ meses)

- [ ] **Integração com Steam** - Login via Steam, sincronizar biblioteca
- [ ] **Comunidade** - Fórum de discussão sobre jogos/animes
- [ ] **Mobile App** - Versão nativa iOS/Android com React Native
- [ ] **Análise de Dados** - Dashboard com estatísticas de tendências
- [ ] **API Pública** - Permitir que outros desenvolvedores usem dados
- [ ] **Inteligência Artificial** - Recomendações com ML
- [ ] **Streaming Integration** - Links para Twitch/YouTube de gameplay
- [ ] **Multiplayer Features** - Grupos de amigos, chat em tempo real

### 💰 Monetização (Opcional)

- [ ] **Plano Premium** - Notificações prioritárias, sem anúncios
- [ ] **Afiliados** - Comissão em cliques para CheapShark
- [ ] **Anúncios Contextuais** - Publicidade relevante
- [ ] **Sponsorships** - Parcerias com publishers

---

## 📚 Recursos Úteis

- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **tRPC**: https://trpc.io/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs

---

## 🤝 Contribuindo

Quer melhorar o TinkerLabs? Siga estes passos:

1. Fork o repositório
2. Crie uma branch para sua feature: `git checkout -b feature/sua-feature`
3. Commit suas mudanças: `git commit -m "Add: sua feature"`
4. Push para a branch: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja `LICENSE` para mais detalhes.

---

## 💬 Suporte

Tem dúvidas? Abra uma issue no GitHub ou entre em contato!

**Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS**
