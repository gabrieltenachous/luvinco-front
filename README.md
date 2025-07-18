
## ▶️ Rodando com Docker

### 1. Pré-requisitos

* Docker e Docker Compose instalados
* Backend rodando em `http://localhost:8000`
* Token de autenticação válido

> ⚠️ O arquivo `.env` **não está versionado** por segurança.
> Crie um novo `.env` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env
```

O conteúdo do `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TOKEN=sua-chave-de-autenticacao-aqui
```

Substitua `sua-chave-de-autenticacao-aqui` pelo token de acesso da API.

---

### 2. Build do container

```bash
docker-compose build
```

---

### 3. Subir o front-end

```bash
docker-compose up
```

O projeto estará disponível em:

```
http://localhost:5173
```

---

### 4. Parar o container

```bash
docker-compose down
```

---

## 🧭 Estrutura de Rotas

```ts
{
  path: '/',
  component: DefaultLayout,
  children: [
    { path: '', name: 'home', component: Home },
    { path: 'checkout', name: 'checkout', component: Checkout },
    { path: 'history', name: 'history', component: History },
    { path: 'completed', name: 'completed', component: CompletedOrders },
  ]
}
```

| Rota         | Componente            | Descrição                                                              |
| ------------ | --------------------- | ---------------------------------------------------------------------- |
| `/`          | `Home.vue`            | Página inicial com vitrine de produtos e filtros                       | 
| `/history`   | `History.vue`         | Histórico de pedidos realizados                                        |
| `/completed` | `CompletedOrders.vue` | Listagem de pedidos concluídos paginados (GET `/api/orders/completed`) |

---

## 🛠️ Tech Stack

* Vue 3 + TypeScript
* Pinia (gerenciamento de estado)
* Vue Router (roteamento)
* TailwindCSS (estilização)
* Axios (requisições HTTP)
* SweetAlert2 (feedbacks visuais)
* Vite (dev server e build)
* Docker (ambiente isolado)

---
