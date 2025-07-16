
### 📄 Seção 1: **Autenticação via Token**

```md
## 🔐 Autenticação por Token

Todas as chamadas à API requerem o seguinte header:

```

Authorization: wQ8ehU2x4gj93CH9lMTnelQO3GcFvLzyqn8Fj3WA0ffQy57I60
Accept: application/json
Content-Type: application/json

```

Esse token é validado automaticamente pelo middleware global `EnsureTokenIsValid`.
```

---

### 📄 Seção 2: **Exemplo de requisição – Finalização de Pedido**

```md
## ✅ Exemplo de Finalização de Pedido

Endpoint:

```

POST /api/order-products

````

Payload esperado:

```json
{
  "order_id": "019809f8-61c1-7252-853b-58c0432fce2a"
}
````

Resposta de sucesso (`200`):

```json
{
  "message": "Pedido finalizado com sucesso.",
  "data": {
    "mensagem": "Pedido criado com sucesso.",
    "entrega": "2025-07-15T20:47:01Z",
    "pedido": [ ... ]
  }
}
```

Resposta de erro (`500` – falha de integração externa):

```json
{
  "message": "Erro ao integrar com o sistema externo. Nenhuma alteração foi salva."
}
```

````

---

### 📄 Seção 3: **Fluxo completo do checkout**

```md
## 🛒 Fluxo completo de Checkout (Front-end)

1. O usuário clica em **"Adicionar"** → chama `POST /api/orders`
2. Os produtos são exibidos no **modal de carrinho**
3. Ao clicar em **"Finalizar pedido"**:
   - Envia `POST /api/order-products`
   - Se for sucesso: mostra `SweetAlert` com data estimada de entrega
   - Se falhar (500): exibe alerta amigável com o erro retornado
4. Após finalização:
   - Carrinho é limpo
   - Pedido é movido para o histórico
````
