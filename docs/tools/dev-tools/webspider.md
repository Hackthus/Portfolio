# 🕷️ WebSpider

![webspider](./webspider.svg)


WebSpider est un outil de reconnaissance web et d'énumération, conçu pour les tests de sécurité, l'audit et l'apprentissage de la cybersécurité. Inspiré par des outils comme Gobuster et Ffuf, WebSpider offre une interface simple et unifiée pour différents types de scans.

---

## ✨ Features

-  **Bruteforce de répertoires**  Découverte de chemins cachés sur les serveurs web
-  **Bruteforce de fichiers**  Recherche de fichiers sensibles avec extensions multiples
-  **Énumération DNS**  Découverte de sous-domaines avec support wildcard
-  **Performances optimisées**  Multi-threading avec gestion intelligente des requêtes
-  **Anti-détection**  User-Agent personnalisable et gestion des cookies
-  **Filtres intelligents**  Par code HTTP, taille de réponse, chaînes de caractères
-  **Export flexible**  Formats TXT, JSON, CSV
-  **Interface claire**  Affichage coloré avec barre de progression en temps réel


---

##  Installation

### 🔧 Prérequis
- **Linux (Debian / Ubuntu recommandé)**
- **Python 3.9+**
- **pip** (gestionnaire de paquets Python)
- Accès réseau
- `git`

###  Installation via Git
```bash
# Cloner le repository
git clone https://github.com/Hackthus/Webspider.git
cd Webspider
```
###  Exécution du Script d'installation  
```bash
# Installer les dépendances
chmod +x install.sh
./install.sh
```
Cette méthode permet d'utiliser `webspider` directement depuis n'importe quel répertoire.

###  Dépendances
```
requests>=2.31.0
dnspython>=2.4.0
urllib3>=2.0.0
argparse>=1.4.0
colorama>=0.4.6
```

---
## ⚙️ Usage

### 📖 Aide générale
```bash
webspider -h
```
###  Aide sur un mode spécifique
```bash
webspider dir -h
```
```bash
webspider file -h
```
```bash
webspider vhost -h
```
###  Modes disponibles

WebSpider propose 4 modes principaux :

| Mode | Description | Usage typique |
|------|-------------|---------------|
| `dir` | Bruteforce de répertoires | Découverte de chemins web cachés |
| `file` | Bruteforce de fichiers | Recherche de fichiers sensibles |
| `dns` | Énumération DNS | Découverte de sous-domaines |
| `vhost` | Fuzzing de vhost | Découverte des hotes virtuels  |

---

## 📂 Mode DIR Bruteforce de répertoires

###  Usage basique
```bash
webspider dir -u http://example.com -w wordlists/directories.txt
```

### ⚙️ Options principales

| Option | Description | Défaut |
|--------|-------------|--------|
| `-u, --url` | URL cible (obligatoire) | - |
| `-w, --wordlist` | Fichier wordlist (obligatoire) | - |
| `-t, --threads` | Nombre de threads | `10` |
| `-s, --status-codes` | Codes HTTP à afficher | `200,204,301,302,307,401,403` |
| `--timeout` | Timeout des requêtes (sec) | `10` |
| `-o, --output` | Fichier de sortie | - |
| `--user-agent` | User-Agent personnalisé | `Mozilla/5.0...` |
| `--cookies` | Cookies HTTP | - |

###  Exemples pratiques

#### Scan simple
```bash
webspider dir -u http://target.com -w common.txt
```

#### Scan avec codes HTTP spécifiques
```bash
webspider dir -u http://target.com -w common.txt -s 200,301,403
```

#### Scan rapide avec plus de threads
```bash
webspider dir -u http://target.com -w big.txt -t 50
```

#### Scan avec authentification
```bash
webspider dir -u http://target.com -w dirs.txt --cookies "session=abc123; token=xyz"
```

#### Scan avec sauvegarde
```bash
webspider dir -u http://target.com -w dirs.txt -o results.txt
```

###  Sortie exemple
```
================================================================================
Webspider v1.0 | 2025-01-15 14:30:00 | By Arnold Edwin (hackthus)
================================================================================
[*] Cible       : http://example.com
[*] Wordlist    : dirs.txt
[*] Threads     : 10
[*] Timeout     : 10s
[*] StatusCodes : 200,301,302,403
================================================================================
Demarrage Webspider en mode Dir Enumeration
================================================================================

[+] Trouvé [status:200] → http://example.com/admin
[+] Trouvé [status:301] → http://example.com/backup
[+] Trouvé [status:403] → http://example.com/config
[*] Progression : 1543/5000 (30.9%)

[*] Scan terminé en 23.45s | Résultats : 3
```

---

## 📄 Mode FILE Bruteforce de fichiers

###  Usage basique
```bash
webspider file -u http://target.com -w files.txt -x php,txt,zip
```

### ⚙️ Options principales

| Option | Description | Défaut |
|--------|-------------|--------|
| `-u, --url` | URL cible (obligatoire) | - |
| `-w, --wordlist` | Wordlist de noms de fichiers (obligatoire) | - |
| `-x, --extensions` | Extensions à tester (obligatoire) | - |
| `-t, --threads` | Nombre de threads | `10` |
| `-s, --status-codes` | Codes HTTP à afficher | `200,204,301,302,307,401,403` |
| `--exclude-size` | Tailles à exclure (octets) | - |
| `--timeout` | Timeout des requêtes (sec) | `10` |
| `-o, --output` | Fichier de sortie | - |

###  Exemples pratiques

#### Recherche de backups
```bash
webspider file -u http://target.com -w files.txt -x zip,tar,gz,bak
```

#### Recherche de fichiers sensibles
```bash
webspider file -u http://target.com -w sensitive.txt -x php,txt,conf,config
```

#### Exclusion des faux positifs par taille
```bash
webspider file -u http://target.com -w files.txt -x php --exclude-size 1543,1544
```

#### Scan exhaustif avec multiple extensions
```bash
webspider file -u http://target.com -w common.txt -x php,asp,aspx,jsp,html,txt,xml,json -t 30
```

###  Sortie exemple
```
================================================================================
Webspider v1.0 | 2025-01-15 14:30:00 | By Arnold Edwin (hackthus)
================================================================================
[*] Cible       : http://example.com
[*] Wordlist    : files.txt
[*] Threads     : 10
[*] Timeout     : 10s
[*] Extensions  : php, txt, zip
================================================================================
Demarrage Webspider en mode File Enumeration
================================================================================

[+] Trouvé [status:200] [size:15.2KB] → http://example.com/config.php
[+] Trouvé [status:200] [size:2.8MB] → http://example.com/backup.zip
[+] Trouvé [status:200] [size:456B] → http://example.com/readme.txt
[*] Progression : 2341/10000 (23.4%)

[*] Scan terminé en 45.67s | Résultats : 3
```

---

##  Mode DNS Énumération de sous-domaines

###  Usage basique
```bash
webspider dns -d example.com -w subdomains.txt
```

### ⚙️ Options principales

| Option | Description | Défaut |
|--------|-------------|--------|
| `-d, --domain` | Domaine cible (obligatoire) | - |
| `-w, --wordlist` | Wordlist de sous-domaines (obligatoire) | - |
| `-t, --threads` | Nombre de threads | `50` |
| `--timeout` | Timeout DNS (sec) | `2.0` |
| `--dns-servers` | Serveurs DNS personnalisés | Système |
| `--record-types` | Types d'enregistrements DNS | `A,AAAA,CNAME` |
| `--wildcard` | Détecter et filtrer les wildcards | `False` |
| `-o, --output` | Fichier de sortie | - |
| `--output-format` | Format de sortie (txt/json/csv) | `txt` |
| `--show-cname` | Afficher les enregistrements CNAME | `True` |
| `--show-ips` | Afficher les adresses IP | `True` |
| `-v, --verbose` | Mode verbeux | `False` |

###  Exemples pratiques

#### Scan basique
```bash
webspider dns -d example.com -w subdomains.txt
```

#### Scan avec serveurs DNS personnalisés
```bash
webspider dns -d example.com -w subdomains.txt --dns-servers 8.8.8.8,1.1.1.1
```

#### Scan avec détection de wildcard
```bash
webspider dns -d example.com -w subdomains.txt --wildcard
```

#### Scan rapide avec plus de threads
```bash
webspider dns -d example.com -w huge-list.txt -t 100
```

#### Scan avec types d'enregistrements spécifiques
```bash
webspider dns -d example.com -w subdomains.txt --record-types A,MX,TXT
```

#### Export JSON
```bash
webspider dns -d example.com -w subdomains.txt -o results.json --output-format json
```

#### Mode verbeux (afficher les échecs)
```bash
webspider dns -d example.com -w subdomains.txt -v
```

###  Sortie exemple
```
================================================================================
Webspider v1.0 | 2025-01-15 14:30:00 | By Arnold Edwin (hackthus)
================================================================================
[*] Domaine     : example.com
[*] Wordlist    : subdomains.txt
[*] Threads     : 50
[*] Timeout     : 2.0s
[*] Records     : A,AAAA,CNAME
[*] DNS Servers : 8.8.8.8, 1.1.1.1
[*] Wildcard    : Activé
================================================================================
Demarrage Webspider en mode DNS Enumeration
================================================================================

[*] Détection des wildcards DNS...
[+] Aucun wildcard détecté
[+] Domaine principal accessible

[+] admin.example.com [A] → 192.168.1.10
[+] www.example.com [A] → 93.184.216.34
[+] mail.example.com [CNAME] → mail-server.example.com
[+] api.example.com [A] → 10.0.0.5
[*] Progression : 2456/10000 (24.6%)

[*] Scan terminé en 45.23s | Sous-domaines trouvés : 15
[*] Résultats sauvegardés dans : results.json
```

### 📄 Formats de sortie

#### TXT (défaut)
```
# DNS Enumeration Results
# Date: 2025-01-15 14:30:00
# Domain: example.com
# Found: 15 subdomains

admin.example.com [A] → 192.168.1.10
www.example.com [A] → 93.184.216.34
mail.example.com [CNAME] → mail-server.example.com
```

#### JSON
```json
{
  "timestamp": "2025-01-15 14:30:00",
  "domain": "example.com",
  "found": 15,
  "results": [
    {
      "domain": "admin.example.com",
      "type": "A",
      "addresses": ["192.168.1.10"]
    }
  ]
}
```
---

## 📚 Wordlists recommandées

###  Sources de wordlists

- **SecLists** : https://github.com/danielmiessler/SecLists
- **FuzzDB** : https://github.com/fuzzdb-project/fuzzdb
- **PayloadsAllTheThings** : https://github.com/swisskyrepo/PayloadsAllTheThings

### 📂 Wordlists par catégorie

#### Répertoires
- `common.txt` Chemins web courants (~1K lignes)
- `big.txt` Liste étendue (20K lignes)
- `raft-large-directories.txt` RAFT project

#### Fichiers
- `common-files.txt` Noms de fichiers courants
- `sensitive-files.txt` Fichiers sensibles (.env, config, etc.)
- `backup-files.txt` Extensions de backup

#### Sous-domaines
- `subdomains-top1million.txt` Top 1M sous-domaines
- `fierce-hostlist.txt` Liste Fierce DNS
- `bitquark-subdomains-top100000.txt`

#### Fuzzing
- `sqli.txt` Payloads SQL injection
- `xss.txt` Payloads XSS
- `command-injection.txt` Command injection
- `lfi.txt` Local File Inclusion

---

## 🔧 Configuration avancée

###  User-Agent personnalisé
```bash
webspider dir -u http://target.com -w dirs.txt --user-agent "user-agent/1.0"
```

### 🍪 Gestion des cookies
```bash
webspider dir -u http://target.com -w dirs.txt --cookies "session=abc123; auth=xyz789"
```

### ⚡ Optimisation des performances
```bash
# Augmenter les threads (attention à la charge serveur)
webspider dir -u http://target.com -w huge.txt -t 100
```
### 🛡️ Bypass de protections
```bash
# User-Agent mobile
webspider dir -u http://target.com -w dirs.txt --user-agent "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)"

# Réduire les threads pour éviter le rate limiting
webspider dir -u http://target.com -w dirs.txt -t 5 --timeout 15
```

##  Résolution de problèmes

###  Erreur : "Cible injoignable"

**Cause** : Le serveur ne répond pas ou refuse les connexions

**Solutions** :
```bash
# Vérifier l'URL
ping target.com

# Augmenter le timeout
webspider dir -u http://target.com -w dirs.txt --timeout 20

# Changer le User-Agent
webspider dir -u http://target.com -w dirs.txt --user-agent "Mozilla/5.0..."
```

###  Erreur : "Timeout DNS"

**Cause** : Résolution DNS trop lente

**Solutions** :
```bash
# Utiliser des DNS plus rapides
webspider dns -d target.com -w subs.txt --dns-servers 8.8.8.8,1.1.1.1

# Augmenter le timeout
webspider dns -d target.com -w subs.txt --timeout 20

```

###  Trop de faux positifs (mode file)

**Cause** : Page d'erreur 200 générique

**Solutions** :
```bash
# Exclure les tailles communes
webspider file -u http://target.com -w files.txt -x php --exclude-size 1543,4567

# Filtrer par codes HTTP stricts
webspider file -u http://target.com -w files.txt -x php -s 200
```

###  Wildcard DNS pollue les résultats

**Solution** :
```bash
# Activer la détection wildcard
webspider dns -d target.com -w subs.txt --wildcard
```

---

### Pour la reconnaissance

1. **Mode DNS en premier** pour cartographier l'infrastructure
2. **Mode DIR ensuite** pour découvrir les chemins web
3. **Mode FILE** pour trouver des fichiers sensibles
4. **Mode FUZZ** pour tester des paramètres spécifiques

### Pour l'apprentissage

1. **Commencer avec des cibles légales** (HackTheBox, TryHackMe)
2. **Analyser les résultats** pour comprendre la structure web
3. **Comparer différentes wordlists** pour voir l'impact
4. **Tester différents threads** pour comprendre les performances

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 


##  Support

Si ce projet vous aide :

- ⭐ **Mettez une étoile** au repo
-  **Signalez les bugs** via les Issues
-  **Proposez des améliorations** via les Pull Requests
-  **Partagez** avec la communauté

---

## 👤 Auteur

**Arnold Edwin**

- GitHub: [@Hackthus](https://github.com/Hackthus)
- Projet: [WebSpider](https://github.com/Hackthus/Webspider)

---

## 🙏 Remerciements

Inspiré par :
- [Gobuster](https://github.com/OJ/gobuster) 
- [Ffuf](https://github.com/ffuf/ffuf) 
- [DirBuster](https://www.owasp.org/index.php/Category:OWASP_DirBuster_Project) 


---

<div align="center">

**for the cybersecurity community**

</div>