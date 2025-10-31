# 🎮 TinkerLabs - Game Deal Aggregator

Um agregador de promoções de jogos e animes com design cartoon/anime vibrante. Encontre as melhores ofertas em múltiplas plataformas e descubra novos animes!

![TinkerLabs](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-18+-green)

---

## ✨ Funcionalidades

### 🎮 Jogos
- **Deals em Tempo Real** - Busca promoções de múltiplas lojas (Steam, Epic, GOG, etc)
- **Filtros Inteligentes** - Filtre por desconto mínimo, plataforma e gênero
- **Detalhes Expandidos** - Modal com informações completas do jogo
- **Links Diretos** - Compre diretamente da loja com um clique

### 🎬 Animes
- **Catálogo Completo** - Integração com Jikan API
- **Filtros por Gênero** - Ação, Drama, Romance, Ficção Científica, etc
- **Status do Anime** - Airing, Complete, Upcoming
- **Avaliações** - Veja a nota de cada anime

### 📰 Notícias
- **Últimas Notícias** - Atualizações de games via GamerPower API
- **Últimos Lançamentos** - Novos games com detalhes da RAWG API
- **Steam Deals** - Widget com top 3 promoções da Steam

### 🎨 Design
- **Tema Cartoon/Anime** - Paleta roxo/rosa vibrante
- **Responsivo** - Funciona perfeitamente em mobile e desktop
- **Modais de Detalhes** - Visualize informações sem sair do site
- **Interface Intuitiva** - Fácil de navegar e usar

---

## 🚀 Quick Start

### Opção 1: Rodar Online (Recomendado)

Acesse: [TinkerLabs Online](https://seu-dominio.com)

### Opção 2: Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tinkerlabs.git
cd tinkerlabs

# Instale dependências
pnpm install

# Rode o servidor
pnpm dev

# Acesse http://localhost:3000
```

Para instruções detalhadas, veja [SETUP_LOCAL.md](./SETUP_LOCAL.md)

---

## 📊 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Wouter** - Routing

### Backend
- **Express 4** - Server framework
- **tRPC 11** - Type-safe APIs
- **Drizzle ORM** - Database ORM
- **MySQL/TiDB** - Database

### APIs Externas
- **CheapShark** - Game deals
- **RAWG** - Game database
- **Jikan** - Anime database
- **GamerPower** - Game news

---

## 📁 Estrutura do Projeto

```
tinkerlabs/
├── client/              # Frontend React
│   ├── src/pages/       # Páginas (Home, Deals, Anime, etc)
│   ├── src/components/  # Componentes reutilizáveis
│   └── src/lib/         # Utilitários (tRPC client)
├── server/              # Backend Express + tRPC
│   ├── routers.ts       # Procedimentos tRPC
│   └── db.ts            # Database queries
├── drizzle/             # Database schema
└── SETUP_LOCAL.md       # Guia de instalação
```

---

## 🎯 Funcionalidades Principais

| Página | Descrição |
|--------|-----------|
| **Home** | Landing page com hero section e recursos principais |
| **Deals** | Catálogo de jogos em promoção com filtros |
| **Steam** | Promoções específicas da Steam |
| **Lançamentos** | Últimos jogos lançados |
| **Animes** | Catálogo de animes com filtros |
| **Notícias** | Últimas notícias sobre games |

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env.local`:

```env
VITE_APP_TITLE=TinkerLabs
VITE_APP_LOGO=/logo.svg
RAWG_API_KEY=seu_key_aqui
```

### Banco de Dados (Opcional)

```bash
pnpm db:push
```

---

## 🎨 Personalização

### Mudar Cores

Edite `client/src/index.css`:

```css
.dark {
  --accent: oklch(0.65 0.25 290); /* Sua cor aqui */
  --background: oklch(0.18 0.08 270);
}
```

### Mudar Fontes

Edite `client/src/index.css` - import do Google Fonts

---

## 🚀 Deploy

### GitHub Pages
```bash
pnpm build
# Configure em Settings → Pages
```

### Vercel
```bash
vercel deploy
```

### Railway/Render
Conecte seu repositório GitHub

---

## 🐛 Troubleshooting

**Erro: "Cannot find module"**
```bash
pnpm install
```

**Erro: "Port 3000 in use"**
```bash
# Linux/Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Filtro de desconto não funciona**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Recarregue a página (Ctrl+R)

---

## 📚 Melhorias Futuras

Veja [SETUP_LOCAL.md - Melhorias Futuras](./SETUP_LOCAL.md#-melhorias-futuras) para uma lista completa de ideias!

### Próximas Prioridades
- [ ] Sistema de Favoritos
- [ ] Notificações por Email
- [ ] Histórico de Preços
- [ ] Autenticação de Usuário
- [ ] Wishlist Sincronizada

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m "Add: sua feature"`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📝 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes

---

## 💬 Suporte

- 📧 Email: pedroestevesnt@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/PeterSteve234/tinkerlabs/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/PeterSteve234/tinkerlabs/discussions)

---

## 🙏 Agradecimentos

- **CheapShark** - Game deals API
- **RAWG** - Game database
- **Jikan** - Anime database
- **GamerPower** - Game news
- **React Team** - Amazing framework
- **Tailwind Labs** - Beautiful CSS framework

---

**Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS**

⭐ Se gostou, deixe uma estrela no GitHub!
