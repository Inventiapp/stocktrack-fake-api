# 🔐 Credenciales de Acceso - StockTrack API

## 🚀 Estado de Protección

✅ **Todas las rutas están protegidas** - Requieren autenticación JWT

## 👥 Usuarios de Prueba

Todos los usuarios tienen la misma contraseña para facilitar las pruebas:

| Email | Contraseña | Rol | Estado |
|-------|-----------|-----|--------|
| `admin@company.com` | `password123` | Administrador | Activo |
| `perez.j@company.com` | `password123` | Vendedor | Activo |
| `lopez.m@company.com` | `password123` | Vendedor | Inactivo |
| `ramirez.l@company.com` | `password123` | Vendedor | Activo |

## 🔑 Cómo Usar la Autenticación

### 1. Login (Obtener Token)

```bash
POST http://localhost:8080/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 4,
    "name": "Juan Pérez Aguirre",
    "role": "Administrador",
    "email": "admin@company.com",
    "status": "Activo"
  }
}
```

### 2. Usar el Token en Peticiones

Incluye el token en el header `Authorization`:

```bash
GET http://localhost:8080/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Registrar Nuevo Usuario

```bash
POST http://localhost:8080/register
Content-Type: application/json

{
  "email": "nuevo@company.com",
  "password": "mipassword",
  "name": "Nuevo Usuario",
  "role": "Vendedor",
  "status": "Activo"
}
```

## 🔒 Configuración de Permisos

### Rutas con Permiso 660 (Solo usuarios autenticados):
- `/providers` - Proveedores
- `/categories` - Categorías
- `/products` - Productos
- `/stock` - Inventario
- `/restockings` - Reabastecimientos
- `/dashboard` - Dashboard
- `/kits` - Kits/Combos

**Requieren token JWT para:**
- ✅ GET (Leer)
- ✅ POST (Crear)
- ✅ PUT/PATCH (Actualizar)
- ✅ DELETE (Eliminar)

### Rutas con Permiso 600 (Solo el propietario):
- `/users` - Usuarios
- `/currentUser` - Usuario actual

**Requieren token JWT y solo el propietario puede acceder**

## 🚫 Sin Token = Error 401

Si intentas acceder sin token:

```bash
GET http://localhost:8080/products
# Sin Authorization header
```

**Respuesta:**
```json
{
  "error": "Missing authorization header"
}
```

## 📝 Ejemplo con cURL

```bash
# 1. Login
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"password123"}'

# 2. Guardar el token (ejemplo)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. Usar el token
curl http://localhost:8080/products \
  -H "Authorization: Bearer $TOKEN"
```

## 📝 Ejemplo con JavaScript/Fetch

```javascript
// 1. Login
const loginResponse = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@company.com',
    password: 'password123'
  })
});

const { accessToken, user } = await loginResponse.json();

// 2. Usar el token en peticiones
const productsResponse = await fetch('http://localhost:8080/products', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const products = await productsResponse.json();
```

## 🔄 Duración del Token

- Los tokens JWT expiran en **1 hora** por defecto
- Después de expirar, debes hacer login nuevamente

## 💡 Tips

1. **Guarda el token** en localStorage o sessionStorage en el frontend
2. **Incluye el token** en todas las peticiones protegidas
3. **Maneja errores 401** para redirigir al login cuando expire
4. **No compartas** el token, es como una contraseña temporal

---

¡API protegida y lista para usar! 🎉

