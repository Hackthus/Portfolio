export default {

  title: "Hackthus",
  description: "Offensive security Projects",
  base: "/Portfolio/",

  themeConfig: {

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hackthus/' }
    ],

    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "CV", link: "/cv" },
      { text: "Projets", link: "/projets" },
      { text: "Methodology", link: "/methodology/methodology" },
      { text: "Labs", link: "/labs/" },
      { text: "Writeups", link: "/writeups/" },
      { text: "Tools", link: "/tools/" },
      { text: "Certifications", link: "/certifications" },
      { text: "Contact", link: "/contact" }
    ],

    sidebar: [

      {
        text: "Methodology",
        collapsed: true,
        items: [
          { text: "Personnel", link: "/methodology/methodology" },
          { text: "PTES", link: "/methodology/ossm" },
          { text: "OWASP", link: "/methodology/owasp" }
        ]
      },
 
      {
        text: "Projets",
        collapsed: true,
        items: [

          { text: "The Hackers 237 Wiki", link: "https://hackthus.github.io/The-Hackers-237/" },

          {
            text: "Dev Tools",
            collapsed: true,
            items: [
              { text: "WebSpider", link: "/tools/dev-tools/webspider" },
              { text: "HttpClient", link: "/tools/dev-tools/httpclient" },
              { text: "Finder", link: "/tools/dev-tools/finder" },
            ]
          },

          {
            text: "Other",
            collapsed: true,
            items: [
              { text: "Relevant", link: "/writeups/tryhackme/relevant" },
              { text: "Lookup", link: "/writeups/tryhackme/lookup/lookup" },
              { text: "kiba", link: "/writeups/tryhackme/kiba" }
            ]
          }

        ]
      },

      {
        text: "Labs",
        collapsed: false,
        items: [

          {
            text: "Active Directory Lab",
            collapsed: true,
            items: [
              { text: "Archeo-IT", link: "/labs/active-directory-lab/enumeration" },
              { text: "GOAD", link: "/labs/active-directory-lab/privilege-escalation" },
              { text: "Mairie", link: "/labs/active-directory-lab/mairie/mairie.pdf" }
            ]
          },

          {
            text: "Web Pentest Lab",
            collapsed: true,
            items: [
              { text: "Juiceshop", link: "/labs/web-pentest-lab/juiceshop" },
              { text: "SQL Injection", link: "/labs/web-pentest-lab/sqli" }
            ]
          }

        ]
      },

      {
        text: "Writeups",
        collapsed: true,
        items: [

          {
            text: "HackTheBox",
            collapsed: true,
            items: [
              { text: "Machine 1", link: "/writeups/hackthebox/machine1" },
              { text: "Machine 2", link: "/writeups/hackthebox/machine2" }
            ]
          },

          {
            text: "TryHackMe",
            collapsed: true,
            items: [
              { text: "Lookup", link: "/writeups/tryhackme/lookup/lookup" },
              { text: "Relevant", link: "/writeups/tryhackme/relevant/relevant" }
            ]
          }

        ]
      },

      {
        text: "Tools",
        collapsed: true,
        items: [
          { text: "Nmap", link: "/tools/nmap" },
          { text: "Burp Suite", link: "/tools/burpsuite" },
          { text: "Metasploit", link: "/tools/metasploit" }
        ]
      },

      {
        text: "C2 Frameworks",
        collapsed: true,
        items: [
          { text: "Metasploit", link: "/frameworks/metasploit-framework" },
          { text: "Sliver", link: "/frameworks/sliver-framework" }
        ]
      },

      {
        text: "Reports",
        collapsed: true,
        items: [
          { text: "Sample Pentest Report", link: "/reports/sample-pentest-report1" },
          { text: "Sample Pentest Report", link: "/reports/sample-pentest-report2" }
        ]
      },

      {
        text: "Cyber Event",
        collapsed: true,
        items: [
          { text: "Advent Of Cyber 2025", link: "/events/advent-of-cyber-2025" },
          { text: "Other Event", link: "/reports/sample-pentest-report2" }
        ]
      },

      {
        text: "Certificats Completions",
        collapsed: true,
        items: [
          { text: "Jr Pentration Tester", link: "/certificats-completions/jr-penetration-tester" },
          { text: "Ethical Hacker", link: "/certificats-completions/ethical-hacker"},
          { text: "Web Fondamentales", link: "/certificats-completions/web-fondamental" },
          { text: "Cyber Security 101", link: "/certificats-completions/cyber-security-101"}
          
        ]
      },

      {
        text: "Certifications",
        collapsed: true,
        items: [
          { text: "CCNA", link: "/frameworks/metasploit-framework" },
          { text: "CPTS", link: "/frameworks/sliver-framework" }
        ]
      }

    ]

  }

}