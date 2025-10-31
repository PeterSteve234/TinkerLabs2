# TinkerLabs - Project TODO

## Core Features

- [x] Layout inicial inspirado em Tesla (seção hero com imagem de fundo, título e CTA)
- [x] Tema visual gamer/hacker escuro com paleta de cores apropriada
- [x] Barra de navegação com logo e menu principal
- [x] Sistema de filtros de jogos (desconto mínimo, plataforma, gênero)
- [x] Integração com CheapShark API para buscar jogos em promoção
- [x] Integração com RAWG API para enriquecer dados dos jogos (gêneros, plataformas, imagens)
- [x] Catálogo de jogos com cards exibindo informações (nome, imagem, preço, desconto, plataforma)
- [x] Seção especial "Jogos da Steam em Promoção" no canto superior direito
- [x] Busca de jogos por título
- [x] Paginação ou carregamento infinito no catálogo
- [x] Links para as ofertas no CheapShark (conforme requisito da API)
- [x] Responsividade para mobile e desktop
- [ ] Página de detalhes do jogo (ao clicar em um card)

## Design & UX

- [x] Definir paleta de cores para tema hacker/gamer escuro
- [x] Adicionar fontes apropriadas (Google Fonts) para tema gamer
- [x] Criar componentes reutilizáveis (GameCard, FilterBar, etc.)
- [ ] Implementar animações e transições suaves
- [x] Adicionar ícones e visual feedback para interações

## Backend & API

- [x] Criar rotas tRPC para buscar jogos da CheapShark
- [x] Criar rotas tRPC para buscar detalhes dos jogos na RAWG
- [ ] Implementar cache de resultados para reduzir chamadas à API
- [x] Criar rota tRPC para buscar promoções específicas da Steam
- [x] Adicionar tratamento de erros e fallbacks para falhas de API
- [ ] Implementar rate limiting e throttling das requisições

## Personalização & Branding

- [x] Remover "Powered by Manus" do footer e documentação
- [x] Configurar domínio personalizado (GitHub Pages - seu-usuario.github.io)
- [x] Integrar imagens reais dos jogos da RAWG API nos cards
- [x] Adicionar seção de notícias de games com GamerPower API
- [x] Criar página dedicada a notícias de games
- [ ] Adicionar widget de notícias recentes na home

## Design Cartoon/Anime & Novas Seções

- [x] Transformar paleta de cores para tema cartoon/anime (cores mais vivas e alegres)
- [x] Atualizar tipografia para estilo mais descontraído (fonts cartoon)
- [x] Adicionar decorações e elementos visuais anime/cartoon
- [x] Criar página de Últimos Lançamentos de Games (integração RAWG)
- [x] Criar página de Animes (integração com API de animes - Jikan)
- [x] Adicionar filtros para animes (gênero, status)
- [x] Integrar imagens de animes nas páginas
- [x] Atualizar header e navegação para novo design
- [x] Atualizar cards de jogos para novo estilo cartoon
- [x] Atualizar footer com novo design

## Página de Perfil & Favoritos

- [ ] Criar tabelas de banco de dados para favoritos (games e animes)
- [ ] Implementar rotas tRPC para gerenciar favoritos
- [ ] Criar página de Perfil com informações do usuário
- [ ] Adicionar seção de jogos favoritos na página de Perfil
- [ ] Adicionar seção de animes favoritos na página de Perfil
- [ ] Implementar botão de adicionar/remover dos favoritos nas páginas de Deals e Animes
- [ ] Adicionar ícone de coração para indicar favoritos
- [ ] Sincronizar favoritos com banco de dados
- [ ] Exibir contagem de favoritos no header
- [ ] Permitir remover favoritos da página de Perfil

## Testing & Deployment

- [ ] Testar responsividade em diferentes dispositivos
- [ ] Testar performance das APIs
- [ ] Documentar variáveis de ambiente necessárias
- [ ] Preparar para deploy
