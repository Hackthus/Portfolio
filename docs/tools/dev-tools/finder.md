# OSINT Reconnaissance Tool 🔍
**Red Team & Bug Bounty Edition – v1.0**

A modular Python CLI tool for passive/active reconnaissance on a target domain.

---

## ✨ Features

| Module | What it does |
|---|---|
| `email_finder` | Scrapes website pages, Bing, DuckDuckGo; generates common mailbox patterns |
| `subdomain_enum` | crt.sh CT logs · HackerTarget API · parallel DNS brute-force |
| `social_finder` | Google-dorks via DDG · direct URL probes · GitHub API |

- ✅ Saves results as **JSON** and **TXT**
- ✅ Rate limiting to avoid bans
- ✅ Optional **proxy** support (Burp, SOCKS, etc.)
- ✅ Coloured, readable terminal output
- ✅ Run all modules or a **single module**

---

## Installation

```bash
# 1. Clone / unzip the project
git clone https://github.com/Hackthus/Finder.git
cd Finder

# 2. (Recommended) Create a virtual environment
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

---

## Usage

```bash
# Full scan (emails + subdomains + social)
python finder.py -d example.com

# Run only one module
python finder.py -d example.com --module emails
python finder.py -d example.com --module subdomains
python finder.py -d example.com --module social

# Use a proxy (Burp Suite, SOCKS5 …)
python finder.py -d example.com --proxy http://127.0.0.1:8080

# Skip social discovery (faster)
python finder.py -d example.com --skip-social

# Custom output directory and timeout
python finder.py -d example.com --output ./reports --timeout 20

# Do not save results to disk
python finder.py -d example.com --no-save
```

### All options

```
-d / --domain      Target domain (required)
--module           emails | subdomains | social  (default: all)
--proxy            HTTP/HTTPS proxy URL
--output           Output directory (default: ./results)
--timeout          Request timeout in seconds (default: 15)
--skip-social      Skip social media module
--no-save          Print-only mode, no files written
```

---

## Output

Results are saved in `results/` (or your `--output` folder):

```
results/
└── example_com_20240315_142301.json
└── example_com_20240315_142301.txt
```

**JSON structure:**
```json
{
    "target": "example.com",
    "timestamp": "2024-03-15T14:23:01",
    "emails": ["admin@example.com", "info@example.com"],
    "subdomains": ["api.example.com", "dev.example.com"],
    "social_profiles": {
        "GitHub": ["https://github.com/example"],
        "LinkedIn": ["https://linkedin.com/company/example"]
    }
}
```

---

## Project Structure

```
osint_tool/
├── finder.py            # CLI entry point & orchestrator
├── email_finder.py    # Email discovery module
├── subdomain_enum.py  # Subdomain enumeration module
├── social_finder.py   # Social media discovery module
├── utils.py           # Shared utilities (HTTP, output, colours)
├── requirements.txt   # Python dependencies
└── README.md          # This file
```

---

## Legal Disclaimer

> This tool is intended **exclusively for authorised security assessments**,
> penetration tests, and bug bounty programs where you have explicit written
> permission from the asset owner.  
> Unauthorised use against systems you do not own or have permission to test
> is illegal and unethical. The authors accept no liability for misuse.

---

## Tips

- **Rate limits**: The tool already sleeps between requests. If you still get
  blocked, increase delays in `utils.rate_limit()` or use `--proxy` with a
  rotating proxy pool.
- **Wordlist**: Edit the `WORDLIST` constant in `subdomain_enum.py` to add
  your own entries.
- **GitHub token**: Uncommenting a `Authorization: token <PAT>` header in
  `social_finder._github_api_search()` will raise the API rate limit from
  10 to 5 000 requests/hour.
