# Moje-apibi

Jednoduché první API v Node.js bez frameworku.

## Co umí
- `GET /` vrátí informaci, že API běží
- `GET /notes` vrátí seznam poznámek
- `POST /notes` přidá novou poznámku

## Spuštění
```bash
npm install
npm start
```

Server poběží na:
```bash
http://localhost:3000
```

## Test
### 1. Kontrola API
```bash
curl http://localhost:3000/
```

### 2. Seznam poznámek
```bash
curl http://localhost:3000/notes
```

### 3. Přidání poznámky
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text":"Moje první poznámka"}'
```
