const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// Bind router db to server
server.db = router.db;

// Configuración CORS para permitir peticiones desde cualquier origen
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

server.use(middlewares);

// Configurar reglas de autenticación
const rules = auth.rewriter(require('./routes.json'));
server.use(rules);

// Integrar autenticación
server.use(auth);

server.use(router);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 API Server running on http://${HOST}:${PORT}`);
  console.log(`\n📡 Endpoints disponibles:`);
  console.log(`   - Providers: http://${HOST}:${PORT}/providers`);
  console.log(`   - Categories: http://${HOST}:${PORT}/categories`);
  console.log(`   - Products: http://${HOST}:${PORT}/products`);
  console.log(`   - Stock: http://${HOST}:${PORT}/stock`);
  console.log(`   - Restockings: http://${HOST}:${PORT}/restockings`);
  console.log(`   - Dashboard: http://${HOST}:${PORT}/dashboard`);
  console.log(`   - Kits: http://${HOST}:${PORT}/kits`);
  console.log(`   - Users: http://${HOST}:${PORT}/users`);
  console.log(`   - Current User: http://${HOST}:${PORT}/currentUser`);
  console.log(`\n🔐 Auth endpoints: /register, /login`);
});

