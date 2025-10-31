# TinkerLabs - Game Deal Aggregator

## Website Overview

**Purpose:** Encontre as melhores promoções de jogos em múltiplas plataformas com filtros inteligentes, atualizações em tempo real e as últimas notícias do mundo gamer.

**Access:** Public (sem login necessário para navegar)

---

## Powered by TinkerLabs

**Tech Stack:**
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Backend:** Express 4 + tRPC 11 + Node.js
- **Database:** MySQL/TiDB com Drizzle ORM
- **APIs:** CheapShark (promoções de jogos), RAWG (detalhes e imagens de jogos), GamerPower (notícias e giveaways)
- **Deployment:** Auto-scaling infrastructure com global CDN

---

## Using Your Website

### 1. Explorar Deals (Página Principal)

Clique em **"EXPLORAR DEALS"** na página inicial para acessar o catálogo completo de jogos em promoção. Você verá cards com imagens reais dos jogos, preço, desconto e loja.

### 2. Filtrar Jogos

Na página de deals, use os filtros disponíveis:
- **Desconto Mínimo:** Ajuste o slider para mostrar apenas jogos com desconto igual ou superior
- **Plataforma:** Selecione a plataforma desejada (PC, PlayStation, Xbox, Nintendo Switch)
- **Gênero:** Filtre por gênero do jogo (Ação, RPG, Estratégia, etc.)

### 3. Buscar Jogos Específicos

Use a barra de busca no topo da página de deals. Digite o nome do jogo e os resultados serão atualizados automaticamente.

### 4. Ver Promoções da Steam

Clique em **"STEAM"** na navegação para ver uma página dedicada às promoções específicas da Steam. Você também pode ver um widget com as 3 melhores ofertas da Steam no canto superior direito da página inicial.

### 5. Acompanhar Notícias de Games

Clique em **"NOTICIAS"** na navegação para acessar as últimas notícias, giveaways e promoções do mundo gamer. Filtre entre notícias ativas e expiradas.

### 6. Acessar as Ofertas

Clique no botão **"VER OFERTA"** em qualquer card de jogo para ser redirecionado para a oferta no CheapShark, onde você poderá completar a compra.

### 7. Navegação

Use o menu superior para navegar entre as seções:
- **HOME:** Página inicial com informações sobre o site
- **DEALS:** Catálogo completo de jogos em promoção
- **STEAM:** Promoções específicas da plataforma Steam
- **NOTICIAS:** Últimas notícias e giveaways de games

---

## Managing Your Website

### Settings & Configuration

Acesse o painel de gerenciamento (Management UI) para:
- **Settings:** Altere o título do site, logo e configurações gerais
- **Domains:** Configure seu domínio personalizado (tinkerlabs.com.br ou .net)
- **Dashboard:** Monitore estatísticas de uso e visibilidade
- **Database:** Acesse dados do banco de dados (se necessário)
- **Secrets:** Gerencie variáveis de ambiente e chaves de API

### Atualizações de Dados

Os dados são atualizados em tempo real através das APIs:
- **CheapShark API:** Fornece dados de promoções de múltiplas lojas
- **RAWG API:** Fornece detalhes enriquecidos dos jogos (gêneros, plataformas, imagens)
- **GamerPower API:** Fornece notícias, giveaways e promoções de games

---

## Next Steps

**Fale com o TinkerLabs anytime** para solicitar mudanças, adicionar novos recursos ou reportar bugs.

Algumas ideias para melhorias futuras:
- Adicionar sistema de favoritos para usuários logados
- Implementar notificações de promoções para jogos específicos
- Criar comparador de preços entre lojas
- Adicionar avaliações e reviews dos usuários
- Integrar mais fontes de notícias de games

Comece agora explorando as melhores ofertas de jogos! Clique em **"EXPLORAR DEALS"** para descobrir promoções incríveis.
