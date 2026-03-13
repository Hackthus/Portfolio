# HttpClient 🔍

> HTTP Request & Recon Tool — Bug Bounty Arsenal

Un outil en ligne de commande Python orienté pentest et bug bounty, conçu pour envoyer des requêtes HTTP avec un maximum de contrôle et extraire automatiquement des informations de reconnaissance depuis les réponses HTML.

```
────────────────────────────────────────────────────────────────────────────
  HttpClient  v1.0  Arnold Edwin (hackthus)
  HTTP Request & Recon Tool — Bug Bounty Arsenal
────────────────────────────────────────────────────────────────────────────
```

---

## ✨ Features

- **Tous les verbes HTTP** — GET POST PUT PATCH DELETE HEAD OPTIONS TRACE
- **Auth complète** — Basic, Bearer, JWT (avec décodage automatique), OAuth2 refresh token
- **Recon HTML** — Extraction de forms, inputs orphelins, liens, ressources, chemins de fichiers et commentaires HTML via BeautifulSoup
- **Analyse de cookies** — Détection des flags manquants (HttpOnly, Secure, SameSite)
- **Gestion de session** — Save/Load/Set cookies, format Netscape (compatible Burp/curl)
- **Barre de progression** style Gobuster pour les gros fichiers
- **Mode silencieux** pour les pipelines (`-s | jq .`)
- **Grep** avec surlignage des matches dans le body
- **Upload de fichiers** en multipart (test d'upload non restreint)
- **Proxy** intégré (Burp Suite, ZAP…)
- **mTLS** — certificat client + clé privée

---

## Installation

### Prérequis

```bash
pip install requests beautifulsoup4
```

### Utilisation directe

```bash
git clone https://github.com/hackthus/httpclient.git
cd httpclient
python3 httpclient.py -u https://target.com/
```

### Alias global (optionnel)

```bash
chmod +x httpclient.py
sudo ln -s $(pwd)/httpclient.py /usr/local/bin/httpclient
httpclient -u https://target.com/
```

---

## Usage

```
httpclient -u URL [options]
```

---

## Options

### Target

| Option | Description |
|--------|-------------|
| `-u URL` / `--url URL` | URL cible **(obligatoire)** |
| `-X METHOD` / `--method METHOD` | Méthode HTTP. Défaut : `GET` |

---

### Authentication

| Option | Description |
|--------|-------------|
| `--username USER` | Champ `username` dans le body JSON |
| `--email EMAIL` | Champ `email` dans le body JSON |
| `-p PASS` / `--password PASS` | Mot de passe (obligatoire avec `--username` / `--email`) |
| `--auth-basic user:pass` | HTTP Basic Auth → `Authorization: Basic <base64>` |
| `--auth-bearer TOKEN` | Bearer token → `Authorization: Bearer TOKEN` |
| `--auth-jwt TOKEN` | JWT comme Bearer + décodage automatique du token |
| `--refresh-token URL CID SECRET RTOKEN` | Flow OAuth2 : échange le refresh token contre un access token |

---

### Payload

| Option | Description |
|--------|-------------|
| `--set-data key=value` | Champ dans le body JSON (répétable) |
| `--set-param key=value` | Paramètre query string (répétable) |
| `--raw-body '{"key":"val"}'` | Body JSON brut |
| `--form` | Envoyer en `application/x-www-form-urlencoded` |
| `--multipart key=value` | Champ `multipart/form-data` (répétable) |
| `--upload FILE` | Upload d'un fichier en multipart |

---

### Headers

| Option | Description |
|--------|-------------|
| `--set-header Key:Value` | Header HTTP personnalisé (répétable) |
| `--user-agent UA` | Définir le `User-Agent` |
| `--referer URL` | Définir le `Referer` |

---

### Cookies

| Option | Description |
|--------|-------------|
| `--set-cookie name=value` | Cookie direct en ligne de commande (répétable) |
| `--show-cookies` | Analyse des flags de sécurité des cookies de réponse |
| `--save-cookies FILE` | Sauvegarder les cookies dans un fichier Netscape |
| `--load-cookies FILE` | Charger des cookies depuis un fichier Netscape |

---

### Redirections

| Option | Description |
|--------|-------------|
| `--no-follow` | Ne pas suivre les redirections |
| `--max-redirects N` | Nombre maximum de redirections. Défaut : `10` |

---

### Output

| Option | Description |
|--------|-------------|
| `--headers-only` | Afficher uniquement les headers de réponse puis quitter |
| `-o FILE` / `--output FILE` | Sauvegarder le body dans un fichier (headers masqués) |
| `-s` / `--silent` | Mode silencieux — body brut uniquement (pipelines) |
| `--grep PATTERN` | Surligner les occurrences du pattern dans le body |
| `--timing` | Afficher les métriques de temps de réponse |
| `-v` / `--verbose` | Détails complets de la requête envoyée |

---

### Recon HTML

> Powered by [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)

| Option | Description |
|--------|-------------|
| `--show-inputs` | `<input>` hors de tout `<form>` (tokens CSRF, champs JS…) |
| `--show-forms` | Tous les `<form>` avec champs et action URLs résolues |
| `--show-links` | Liens, scripts, styles, images, iframes, chemins de fichiers |
| `--comments` | Commentaires HTML catégorisés : `CRED` `PATH` `TODO` `DEBUG` |

---

### Network / TLS

| Option | Description |
|--------|-------------|
| `--insecure` | Désactiver la vérification SSL (`curl -k`) |
| `--proxy URL` | Proxy HTTP/S (ex: `http://127.0.0.1:8080`) |
| `--cert FILE` | Certificat client `.pem` (mTLS) |
| `--key FILE` | Clé privée client |
| `--ca-bundle FILE` | CA bundle personnalisé |
| `--timeout SEC` | Timeout en secondes. Défaut : `15` |

---

## Exemples

### Recon passive

```bash
# Full recon sur une page de login
httpclient -u https://target.com/login \
  --show-forms --show-links --show-inputs --comments

# Chercher des secrets dans les commentaires HTML
httpclient -u https://target.com/ --comments

# Détecter les cookies mal configurés
httpclient -u https://target.com/login -X POST \
  --username admin -p password --show-cookies
```

### Authentification

```bash
# HTTP Basic Auth
httpclient -u https://target.com/api/admin --auth-basic admin:secret

# Bearer token
httpclient -u https://api.target.com/me --auth-bearer eyJhbGc...

# JWT avec décodage automatique
httpclient -u https://api.target.com/profile --auth-jwt eyJhbGc...

# Cookie de session direct
httpclient -u https://target.com/dashboard --set-cookie session=abc123

# Plusieurs cookies
httpclient -u https://target.com/admin \
  --set-cookie session=abc123 \
  --set-cookie csrftoken=xyz789
```

### Gestion de session

```bash
# Login + sauvegarde des cookies
httpclient -u https://target.com/login -X POST \
  --username admin -p pass --save-cookies session.txt

# Rejouer la session sauvegardée
httpclient -u https://target.com/dashboard \
  --load-cookies session.txt --show-links

# Session + cookie supplémentaire
httpclient -u https://target.com/admin \
  --load-cookies session.txt \
  --set-cookie csrftoken=abc123
```

### Manipulation de requêtes

```bash
# POST JSON
httpclient -u https://api.target.com/user/1 -X PUT \
  --set-data role=admin --set-data active=true

# POST form-urlencoded
httpclient -u https://target.com/login -X POST \
  --set-data username=admin --set-data password=pass --form

# Body JSON brut
httpclient -u https://api.target.com/graphql -X POST \
  --raw-body '{"query":"{ users { id email } }"}'

# Spoofer le User-Agent et le Referer
httpclient -u https://target.com/admin \
  --user-agent "Googlebot/2.1" --referer "https://google.com"
```

### Upload & fichiers

```bash
# Télécharger une image
httpclient -u https://target.com/photo.jpg -o photo.jpg

# Test upload non restreint
httpclient -u https://target.com/upload -X POST --upload /tmp/shell.php

# Upload multipart avec champs supplémentaires
httpclient -u https://target.com/upload -X POST \
  --upload /tmp/file.jpg \
  --multipart description="test" \
  --multipart category=image
```

### Analyse & pipelines

```bash
# Chercher des erreurs dans la réponse
httpclient -u https://target.com/search?q=test \
  --grep "error\|exception\|stack"

# Mode silencieux → pipeline jq
httpclient -u https://api.target.com/users \
  --auth-bearer TOKEN -s | jq '.[].email'

# Timing détaillé
httpclient -u https://target.com/ --timing

# Via Burp Suite
httpclient -u https://target.com/ \
  --proxy http://127.0.0.1:8080 --insecure --show-forms
```

### Redirections

```bash
# Voir le 302 brut sans suivre
httpclient -u https://target.com/admin --no-follow

# Limiter à 3 sauts
httpclient -u https://target.com/ --max-redirects 3
```

### OAuth2

```bash
# Obtenir un nouvel access_token via refresh token
httpclient --refresh-token \
  https://auth.target.com/token \
  CLIENT_ID \
  CLIENT_SECRET \
  REFRESH_TOKEN
```

---

## Comportements automatiques

| Comportement | Description |
|---|---|
| **Token détecté** | Si la réponse JSON contient `token`, `access_token`, `jwt`… il est mis en évidence |
| **Status coloré** | `2xx` vert · `3xx` jaune · `4xx/5xx` rouge |
| **Redirect chain** | La chaîne de redirections est affichée si des sauts ont eu lieu |
| **Barre de progression** | Activée automatiquement pour les réponses > 128 KB |
| **Masquage password** | En mode `--verbose`, le champ `password` est remplacé par `***` |
| **Content-Type guard** | Les options Recon vérifient que la réponse est bien du HTML |
| **Aide automatique** | Affichée si aucun argument n'est fourni |

---

## Architecture du code

```
httpclient.py
├── [1]  Imports & constants
├── [2]  Terminal UI       — couleurs, sections, barre de progression
├── [3]  Core helpers      — parse_kv, die, warn…
├── [4]  Auth helpers      — basic, bearer, JWT, OAuth2
├── [5]  Cookie helpers    — save, load, display
├── [6]  HTML parsers      — forms, inputs, links, comments (BeautifulSoup)
├── [7]  HTTP engine       — build_body, build_auth_header, fire()
├── [8]  Output functions  — status, headers, body, timing, verbose
├── [9]  CLI definition    — argparse
└── [10] Main entry point
```

---

## Dépendances

```bash
pip install requests beautifulsoup4
```

| Librairie | Rôle |
|-----------|------|
| `requests` | Moteur HTTP (sessions, cookies, redirections, streaming) |
| `beautifulsoup4` | Parsing HTML DOM |
| `http.cookiejar` | Format Netscape pour save/load cookies |
| `base64` | Encodage Basic Auth et décodage JWT |

---

## Auteur

Arnold Edwin (hackthus)