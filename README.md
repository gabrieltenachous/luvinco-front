### ▶️ Rodando com Docker

#### 1. Pré-requisitos

* Docker e Docker Compose instalados
* Backend rodando em `http://localhost:8000`
* Token de autenticação válido (verifique `.env`)

#### 2. Build do container

```bash
docker compose build
```

#### 3. Subir o front-end

```bash
docker compose up
```

O projeto estará disponível em:

```
http://localhost:5173
```

#### 4. Parar o container

```bash
docker compose down
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
| `/checkout`  | `Checkout.vue`        | Tela de finalização de pedido                                          |
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

Se quiser que o `.env` de exemplo, `docker-compose.yml` e `Dockerfile` também entrem aqui, posso expandir. Deseja isso?
