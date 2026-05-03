// AUTO-GENERATED — Do not edit by hand. Run /tmp/gen.mjs to regenerate.
export type Difficulty = "iniciante" | "intermediario" | "avancado";
export type AlertType = "info" | "warning" | "danger" | "success" | "tip";

export interface CodeSample { lang: string; code: string }
export interface AlertSpec { type: AlertType; content: string }

export interface Chapter {
  slug: string;
  section: string;
  title: string;
  difficulty: Difficulty;
  subtitle: string;
  intro: string;
  codes: CodeSample[];
  points: string[];
  alerts: AlertSpec[];
}

export interface Section {
  id: string;
  icon: string;
  label: string;
  chapterSlugs: string[];
}

export const sections: Section[] = [
  {
    "id": "boas-vindas",
    "icon": "BookOpen",
    "label": "Boas-vindas e Fundamentos",
    "chapterSlugs": [
      "bem-vindo",
      "por-que-python",
      "historia-python",
      "python-2-vs-3",
      "onde-python-roda"
    ]
  },
  {
    "id": "instalacao",
    "icon": "Terminal",
    "label": "Instalação e Primeiros Passos",
    "chapterSlugs": [
      "instalacao",
      "interpretador-repl",
      "primeiro-script",
      "editores-ides",
      "pip-pacotes",
      "ambientes-virtuais",
      "uv-poetry",
      "estrutura-projeto",
      "hello-world-completo"
    ]
  },
  {
    "id": "sintaxe",
    "icon": "Code2",
    "label": "Sintaxe e Tipos Básicos",
    "chapterSlugs": [
      "sintaxe-basica",
      "variaveis",
      "tipos-numericos",
      "strings-basico",
      "fstrings",
      "metodos-string",
      "slicing-strings",
      "booleanos",
      "operadores-comparacao",
      "conversao-tipos",
      "entrada-saida"
    ]
  },
  {
    "id": "controle",
    "icon": "GitBranch",
    "label": "Controle de Fluxo",
    "chapterSlugs": [
      "if-else",
      "operador-ternario",
      "match-case",
      "loop-for",
      "loop-while",
      "break-continue",
      "range-detalhes",
      "enumerate",
      "zip-loop",
      "compreensoes-list"
    ]
  },
  {
    "id": "estruturas",
    "icon": "Database",
    "label": "Estruturas de Dados",
    "chapterSlugs": [
      "listas",
      "metodos-listas",
      "copia-listas",
      "tuplas",
      "dicionarios",
      "metodos-dict",
      "dict-comprehension",
      "sets",
      "frozenset",
      "estruturas-aninhadas"
    ]
  },
  {
    "id": "funcoes",
    "icon": "Sparkles",
    "label": "Funções",
    "chapterSlugs": [
      "funcoes-def",
      "argumentos-nomeados",
      "args-kwargs",
      "funcoes-lambda",
      "map-filter-reduce",
      "escopo-variaveis",
      "closures",
      "funcoes-recursivas",
      "docstrings-anotacoes",
      "decorators"
    ]
  },
  {
    "id": "oop",
    "icon": "Cpu",
    "label": "Orientação a Objetos",
    "chapterSlugs": [
      "intro-oop",
      "classes-instancias",
      "atributos-classe",
      "metodos-tipos",
      "heranca",
      "heranca-multipla",
      "encapsulamento",
      "dunder-methods",
      "dataclasses",
      "abstratas-protocols"
    ]
  },
  {
    "id": "modulos-erros",
    "icon": "Wrench",
    "label": "Módulos, Erros e Stdlib",
    "chapterSlugs": [
      "modulos-import",
      "if-name-main",
      "pacotes",
      "excecoes",
      "raise-excecoes",
      "context-managers",
      "logging",
      "datetime",
      "math-random",
      "json-modulo",
      "csv-modulo",
      "pathlib",
      "os-sys",
      "argparse"
    ]
  },
  {
    "id": "io-tipagem",
    "icon": "Wrench",
    "label": "Arquivos, Tipagem e Async",
    "chapterSlugs": [
      "arquivos-texto",
      "arquivos-binarios",
      "pickle",
      "type-hints",
      "typing-avancado",
      "mypy",
      "geradores",
      "iteradores-customizados",
      "asyncio-intro",
      "async-await-detalhes",
      "threads",
      "multiprocessing",
      "concurrent-futures",
      "gil"
    ]
  },
  {
    "id": "testes-web",
    "icon": "Globe",
    "label": "Testes, Web e Frameworks",
    "chapterSlugs": [
      "unittest",
      "pytest",
      "fixtures",
      "mocks",
      "tdd",
      "coverage",
      "http-requests",
      "httpx-async",
      "beautifulsoup",
      "selenium",
      "playwright",
      "websockets"
    ]
  },
  {
    "id": "frameworks-web",
    "icon": "Globe",
    "label": "Web, APIs e Banco de Dados",
    "chapterSlugs": [
      "fastapi",
      "fastapi-rotas",
      "fastapi-deps",
      "flask",
      "django",
      "django-models",
      "sqlalchemy-orm",
      "sqlite",
      "postgresql",
      "redis-py",
      "mongodb",
      "jinja2",
      "autenticacao",
      "graphql"
    ]
  },
  {
    "id": "data-ml",
    "icon": "BarChart3",
    "label": "Data Science e Machine Learning",
    "chapterSlugs": [
      "numpy-intro",
      "numpy-broadcasting",
      "pandas-intro",
      "pandas-limpeza",
      "matplotlib",
      "seaborn",
      "plotly",
      "jupyter",
      "scikit-intro",
      "regressao",
      "classificacao",
      "clustering",
      "deep-learning",
      "llms-openai"
    ]
  },
  {
    "id": "automacao-perf",
    "icon": "Brain",
    "label": "Automação, Performance e Boas Práticas",
    "chapterSlugs": [
      "automacao-arquivos",
      "automacao-excel",
      "automacao-pdf",
      "automacao-email",
      "agendamento",
      "regex",
      "performance-tips",
      "cython-numba",
      "caching",
      "pep8",
      "ruff-black",
      "pre-commit",
      "security-basics",
      "12-factor"
    ]
  },
  {
    "id": "casos-apendice",
    "icon": "BookOpen",
    "label": "Casos Práticos e Apêndice",
    "chapterSlugs": [
      "projeto-cli-todo",
      "projeto-api-rest",
      "projeto-bot-discord",
      "projeto-scraper",
      "projeto-dashboard",
      "empacotando",
      "docker-python",
      "ci-github-actions",
      "debugging",
      "error-handling",
      "zen-python",
      "recursos",
      "glossario",
      "proximos-passos"
    ]
  }
];

export const chapters: Chapter[] = [
  {
    "slug": "bem-vindo",
    "section": "boas-vindas",
    "title": "Bem-vindo ao Python",
    "difficulty": "iniciante",
    "subtitle": "O que você vai aprender neste livro completo de Python.",
    "intro": "Python é uma das linguagens mais populares do mundo, conhecida por sua sintaxe limpa e legível. Este livro foi pensado para te levar do absoluto zero até tópicos avançados como concorrência, arquitetura de software, ciência de dados e machine learning.",
    "codes": [
      [
        "python",
        "print('Olá, Python!')\n# Python lê esta linha e imprime no terminal."
      ]
    ],
    "points": [
      "Mais de 170 capítulos organizados em 11 trilhas",
      "Exemplos práticos e executáveis em cada capítulo",
      "Do iniciante ao nível avançado"
    ],
    "alerts": [
      [
        "tip",
        "Leia em ordem se for iniciante. Quem já programa pode pular direto para tópicos específicos pelo menu lateral."
      ]
    ]
  },
  {
    "slug": "por-que-python",
    "section": "boas-vindas",
    "title": "Por que aprender Python?",
    "difficulty": "iniciante",
    "subtitle": "Vantagens, ecossistema e oportunidades de carreira.",
    "intro": "Python é usado em desenvolvimento web, automação, IA, ciência de dados, jogos, scripts de DevOps e muito mais. Empresas como Google, Instagram, Netflix e NASA usam Python em larga escala.",
    "codes": [
      [
        "python",
        "# Python é multiparadigma\n# Funcional\nquadrados = list(map(lambda x: x**2, range(5)))\n# Orientado a objetos\nclass Pessoa:\n    def __init__(self, nome): self.nome = nome"
      ]
    ],
    "points": [
      "Sintaxe próxima da linguagem natural",
      "Comunidade gigante e ativa",
      "Bibliotecas para praticamente qualquer coisa",
      "Alta demanda no mercado"
    ],
    "alerts": []
  },
  {
    "slug": "historia-python",
    "section": "boas-vindas",
    "title": "A história do Python",
    "difficulty": "iniciante",
    "subtitle": "Da criação por Guido van Rossum até hoje.",
    "intro": "Criado em 1991 por Guido van Rossum como um projeto de Natal, Python foi inspirado na linguagem ABC. O nome vem do grupo de comédia britânico Monty Python, não da cobra.",
    "codes": [
      [
        "text",
        "1991 - Python 0.9.0\n2000 - Python 2.0\n2008 - Python 3.0 (quebra de compatibilidade)\n2020 - Fim do suporte ao Python 2\n2023+ - Python 3.12, 3.13 com melhorias de performance"
      ]
    ],
    "points": [
      "Filosofia: 'Bonito é melhor que feio'",
      "Python 2 está oficialmente morto desde 2020",
      "Use sempre Python 3.10+ em projetos novos"
    ],
    "alerts": []
  },
  {
    "slug": "python-2-vs-3",
    "section": "boas-vindas",
    "title": "Python 2 vs Python 3",
    "difficulty": "iniciante",
    "subtitle": "Por que Python 3 é o padrão hoje.",
    "intro": "Python 3 quebrou compatibilidade com Python 2 para corrigir falhas de design (Unicode por padrão, divisão real, print como função). Hoje, todo código novo deve usar Python 3.",
    "codes": [
      [
        "python",
        "# Python 2 (NÃO use mais)\nprint 'olá'\n# Python 3 (use sempre)\nprint('olá')\n\n# Divisão\n5 / 2  # Python 2: 2 | Python 3: 2.5\n5 // 2 # Divisão inteira em ambos: 2"
      ]
    ],
    "points": [
      "Strings são Unicode por padrão no Python 3",
      "print é função em Python 3",
      "Use sempre Python 3.10 ou superior"
    ],
    "alerts": [
      [
        "danger",
        "Nunca inicie um projeto novo em Python 2. Não há suporte de segurança."
      ]
    ]
  },
  {
    "slug": "onde-python-roda",
    "section": "boas-vindas",
    "title": "Onde o Python roda",
    "difficulty": "iniciante",
    "subtitle": "Plataformas, sistemas e dispositivos.",
    "intro": "Python roda em Windows, macOS, Linux, BSDs, Raspberry Pi, Android (Termux), iOS (Pythonista), e até em microcontroladores via MicroPython.",
    "codes": [
      [
        "bash",
        "# Verificar se Python está instalado\npython3 --version\n# Saída esperada: Python 3.12.x"
      ]
    ],
    "points": [
      "Multiplataforma de verdade",
      "MicroPython para hardware embarcado",
      "WebAssembly via Pyodide para o navegador"
    ],
    "alerts": []
  },
  {
    "slug": "instalacao",
    "section": "instalacao",
    "title": "Instalando o Python",
    "difficulty": "iniciante",
    "subtitle": "Como instalar Python no seu sistema operacional.",
    "intro": "A instalação varia por sistema. No Windows, baixe do site oficial e marque 'Add to PATH'. No macOS, use Homebrew. No Linux, geralmente já vem instalado.",
    "codes": [
      [
        "bash",
        "# Windows (PowerShell, via winget)\nwinget install Python.Python.3.12\n\n# macOS (Homebrew)\nbrew install python@3.12\n\n# Ubuntu/Debian\nsudo apt update && sudo apt install python3 python3-pip python3-venv\n\n# Verificar\npython3 --version\npip3 --version"
      ]
    ],
    "points": [
      "Sempre instale a versão mais recente estável",
      "No Windows, marque 'Add Python to PATH'",
      "pip vem junto com o instalador"
    ],
    "alerts": [
      [
        "warning",
        "No macOS, o 'python' do sistema é antigo. Sempre prefira o instalado via Homebrew ou pyenv."
      ]
    ]
  },
  {
    "slug": "interpretador-repl",
    "section": "instalacao",
    "title": "O interpretador interativo (REPL)",
    "difficulty": "iniciante",
    "subtitle": "Testando código direto no terminal.",
    "intro": "Digite 'python3' no terminal para entrar no REPL (Read-Eval-Print-Loop). É excelente para experimentar comandos rapidamente.",
    "codes": [
      [
        "bash",
        "$ python3\nPython 3.12.0\n>>> 2 + 2\n4\n>>> nome = 'Maria'\n>>> print(f'Olá, {nome}')\nOlá, Maria\n>>> exit()"
      ]
    ],
    "points": [
      "Útil para testar trechos rápidos",
      "Use Ctrl+D ou exit() para sair",
      "Experimente o IPython para um REPL melhor: pip install ipython"
    ],
    "alerts": []
  },
  {
    "slug": "primeiro-script",
    "section": "instalacao",
    "title": "Seu primeiro script",
    "difficulty": "iniciante",
    "subtitle": "Crie e execute um arquivo .py.",
    "intro": "Crie um arquivo de texto chamado ola.py com o conteúdo abaixo e execute com 'python3 ola.py'.",
    "codes": [
      [
        "python",
        "# arquivo: ola.py\nnome = input('Qual seu nome? ')\nprint(f'Olá, {nome}! Bem-vindo ao Python.')"
      ]
    ],
    "points": [
      "Arquivos Python têm extensão .py",
      "Use python3 nome_arquivo.py para executar",
      "input() lê do teclado, print() escreve na tela"
    ],
    "alerts": []
  },
  {
    "slug": "editores-ides",
    "section": "instalacao",
    "title": "Editores e IDEs",
    "difficulty": "iniciante",
    "subtitle": "VS Code, PyCharm, Jupyter e outros.",
    "intro": "Para projetos sérios, use uma IDE. VS Code com a extensão Python é gratuito e excelente. PyCharm é referência profissional. Jupyter é o padrão para data science.",
    "codes": [
      [
        "text",
        "Recomendações:\n- Iniciantes: VS Code + extensão Python da Microsoft\n- Web/Backend: PyCharm Professional\n- Data Science: Jupyter Lab ou VS Code + Jupyter\n- Mobile/leve: Thonny (excelente para crianças)"
      ]
    ],
    "points": [
      "VS Code é gratuito e o mais popular",
      "Instale também a extensão Pylance para autocomplete",
      "Configure o linter (ruff ou flake8) desde o início"
    ],
    "alerts": []
  },
  {
    "slug": "pip-pacotes",
    "section": "instalacao",
    "title": "Instalando pacotes com pip",
    "difficulty": "iniciante",
    "subtitle": "Gerenciador oficial de pacotes do Python.",
    "intro": "pip é o gerenciador padrão do Python. Use para instalar bibliotecas do PyPI (Python Package Index), o repositório oficial.",
    "codes": [
      [
        "bash",
        "pip install requests           # instalar\npip install requests==2.31.0   # versão específica\npip install -U requests        # atualizar\npip uninstall requests         # remover\npip list                       # listar instalados\npip show requests              # detalhes do pacote"
      ]
    ],
    "points": [
      "PyPI tem mais de 500 mil pacotes",
      "Use sempre dentro de um ambiente virtual",
      "requirements.txt lista as dependências do projeto"
    ],
    "alerts": [
      [
        "warning",
        "Nunca use 'sudo pip install' — isso bagunça o Python do sistema. Use ambientes virtuais."
      ]
    ]
  },
  {
    "slug": "ambientes-virtuais",
    "section": "instalacao",
    "title": "Ambientes virtuais (venv)",
    "difficulty": "iniciante",
    "subtitle": "Isolando dependências por projeto.",
    "intro": "Cada projeto deve ter seu próprio ambiente virtual para evitar conflitos de versões. O módulo venv já vem com o Python.",
    "codes": [
      [
        "bash",
        "# Criar\npython3 -m venv .venv\n\n# Ativar\nsource .venv/bin/activate    # Linux/macOS\n.venv\\Scripts\\activate       # Windows\n\n# Desativar\ndeactivate\n\n# Instalar dependências do projeto\npip install -r requirements.txt"
      ]
    ],
    "points": [
      "Sempre crie um venv por projeto",
      "Adicione .venv/ ao .gitignore",
      "Use 'pip freeze > requirements.txt' para salvar versões"
    ],
    "alerts": [
      [
        "tip",
        "Ferramentas modernas como uv ou poetry tornam isso ainda mais fácil — vamos ver depois."
      ]
    ]
  },
  {
    "slug": "uv-poetry",
    "section": "instalacao",
    "title": "Gerenciadores modernos: uv e poetry",
    "difficulty": "intermediario",
    "subtitle": "Alternativas mais rápidas ao pip+venv.",
    "intro": "uv (escrito em Rust) e poetry oferecem instalação muito mais rápida e gestão de lockfiles para reprodutibilidade.",
    "codes": [
      [
        "bash",
        "# uv (recomendado, ultra-rápido)\ncurl -LsSf https://astral.sh/uv/install.sh | sh\nuv init meu-projeto\nuv add requests\nuv run main.py\n\n# poetry\npip install poetry\npoetry new meu-projeto\npoetry add requests\npoetry install"
      ]
    ],
    "points": [
      "uv é até 100x mais rápido que pip",
      "Ambos criam lockfiles para builds reproduzíveis",
      "Para projetos novos, use uv"
    ],
    "alerts": []
  },
  {
    "slug": "estrutura-projeto",
    "section": "instalacao",
    "title": "Estrutura recomendada de projetos",
    "difficulty": "intermediario",
    "subtitle": "Como organizar pastas e arquivos.",
    "intro": "Uma estrutura clara facilita a manutenção e a colaboração. Veja o padrão moderno usando src-layout.",
    "codes": [
      [
        "text",
        "meu-projeto/\n├── pyproject.toml      # configuração e deps\n├── README.md\n├── .gitignore\n├── src/\n│   └── meu_pacote/\n│       ├── __init__.py\n│       └── main.py\n└── tests/\n    └── test_main.py"
      ]
    ],
    "points": [
      "src-layout evita imports acidentais",
      "pyproject.toml substitui setup.py em projetos modernos",
      "Sempre tenha tests/ separado"
    ],
    "alerts": []
  },
  {
    "slug": "hello-world-completo",
    "section": "instalacao",
    "title": "Hello World completo",
    "difficulty": "iniciante",
    "subtitle": "Um primeiro programa que faz algo útil.",
    "intro": "Vamos juntar o que aprendemos em um pequeno script que cumprimenta o usuário com base na hora.",
    "codes": [
      [
        "python",
        "from datetime import datetime\n\nnome = input('Como você se chama? ')\nhora = datetime.now().hour\n\nif hora < 12:\n    saudacao = 'Bom dia'\nelif hora < 18:\n    saudacao = 'Boa tarde'\nelse:\n    saudacao = 'Boa noite'\n\nprint(f'{saudacao}, {nome}! Já são {hora}h.')"
      ]
    ],
    "points": [
      "f-strings facilitam a interpolação",
      "datetime fornece data e hora",
      "if/elif/else controla o fluxo"
    ],
    "alerts": []
  },
  {
    "slug": "sintaxe-basica",
    "section": "sintaxe",
    "title": "Sintaxe básica do Python",
    "difficulty": "iniciante",
    "subtitle": "Indentação, comentários e blocos.",
    "intro": "Python usa indentação (4 espaços) para definir blocos. Não há chaves. Comentários começam com # ou ficam entre aspas triplas.",
    "codes": [
      [
        "python",
        "# Comentário de uma linha\n\"\"\" Comentário (na verdade docstring)\nde múltiplas linhas \"\"\"\n\nif True:\n    print('Indentação define o bloco')\n    print('4 espaços é o padrão (PEP 8)')\nprint('Fora do if')"
      ]
    ],
    "points": [
      "Indentação NÃO é estética: é sintática",
      "Sempre 4 espaços (nada de tabs)",
      "Configure seu editor para mostrar espaços"
    ],
    "alerts": [
      [
        "danger",
        "Misturar tabs e espaços causa IndentationError. Configure o editor para 'insert spaces'."
      ]
    ]
  },
  {
    "slug": "variaveis",
    "section": "sintaxe",
    "title": "Variáveis e atribuição",
    "difficulty": "iniciante",
    "subtitle": "Como armazenar valores em Python.",
    "intro": "Variáveis em Python não precisam ser declaradas. O tipo é inferido automaticamente.",
    "codes": [
      [
        "python",
        "idade = 30\nnome = 'Ana'\naltura = 1.65\nativo = True\n\n# Múltipla atribuição\nx, y, z = 1, 2, 3\n\n# Mesmo valor para vários\na = b = c = 0"
      ]
    ],
    "points": [
      "Não declare tipo: x = 5 já cria a variável",
      "Use snake_case (idade_atual, não idadeAtual)",
      "Constantes por convenção em MAIÚSCULA: PI = 3.14"
    ],
    "alerts": []
  },
  {
    "slug": "tipos-numericos",
    "section": "sintaxe",
    "title": "Tipos numéricos: int, float, complex",
    "difficulty": "iniciante",
    "subtitle": "Inteiros, flutuantes e operações.",
    "intro": "Python tem int (precisão arbitrária!), float (precisão dupla) e complex (números complexos).",
    "codes": [
      [
        "python",
        "# int sem limite de tamanho\ngrande = 10 ** 100\nprint(grande)\n\n# float\npi = 3.14159\n\n# notação científica\navogadro = 6.022e23\n\n# complexos\nz = 2 + 3j\nprint(z.real, z.imag)"
      ]
    ],
    "points": [
      "int em Python não estoura",
      "float tem precisão limitada — use Decimal para dinheiro",
      "Operadores: + - * / // % **"
    ],
    "alerts": [
      [
        "warning",
        "0.1 + 0.2 != 0.3 em float. Para finanças, use o módulo decimal."
      ]
    ]
  },
  {
    "slug": "strings-basico",
    "section": "sintaxe",
    "title": "Strings: básico",
    "difficulty": "iniciante",
    "subtitle": "Texto em Python.",
    "intro": "Strings são imutáveis e podem usar aspas simples, duplas ou triplas. Suportam Unicode nativamente.",
    "codes": [
      [
        "python",
        "s1 = 'aspas simples'\ns2 = \"aspas duplas\"\ns3 = '''várias\nlinhas'''\n\n# Concatenação\nnome = 'Python ' + '3.12'\n\n# Repetição\nlinha = '-' * 40\n\n# Tamanho\nprint(len('Python'))  # 6"
      ]
    ],
    "points": [
      "Aspas simples e duplas são equivalentes",
      "Triplas para múltiplas linhas",
      "Strings são imutáveis"
    ],
    "alerts": []
  },
  {
    "slug": "fstrings",
    "section": "sintaxe",
    "title": "f-strings: formatação moderna",
    "difficulty": "iniciante",
    "subtitle": "A forma mais limpa de formatar texto.",
    "intro": "Introduzidas no Python 3.6, f-strings permitem incorporar expressões diretamente nas strings.",
    "codes": [
      [
        "python",
        "nome = 'Ana'\nidade = 30\nprint(f'{nome} tem {idade} anos')\n\n# Expressões\nprint(f'Em 5 anos terá {idade + 5}')\n\n# Formatação numérica\npi = 3.14159\nprint(f'{pi:.2f}')        # 3.14\nprint(f'{1234567:,}')     # 1,234,567\nprint(f'{0.85:.1%}')      # 85.0%\n\n# Debug (Python 3.8+)\nprint(f'{nome=}')         # nome='Ana'"
      ]
    ],
    "points": [
      "f-string é a forma recomendada hoje",
      "Suporta expressões, métodos e formatação",
      "f'{var=}' ótimo para debug"
    ],
    "alerts": []
  },
  {
    "slug": "metodos-string",
    "section": "sintaxe",
    "title": "Métodos de string",
    "difficulty": "iniciante",
    "subtitle": "upper, lower, strip, split, replace e mais.",
    "intro": "Strings têm dezenas de métodos úteis. Como são imutáveis, todo método retorna uma nova string.",
    "codes": [
      [
        "python",
        "texto = '  Olá Mundo  '\ntexto.strip()           # 'Olá Mundo'\ntexto.lower()           # '  olá mundo  '\ntexto.upper()           # '  OLÁ MUNDO  '\ntexto.replace('Mundo', 'Python')\n'a,b,c'.split(',')      # ['a','b','c']\n'-'.join(['a','b'])     # 'a-b'\n'python'.startswith('py')  # True\n'arquivo.txt'.endswith('.txt')  # True"
      ]
    ],
    "points": [
      "str é imutável: métodos retornam nova string",
      "split/join são essenciais para CSV simples",
      "strip remove espaços/quebras nas pontas"
    ],
    "alerts": []
  },
  {
    "slug": "slicing-strings",
    "section": "sintaxe",
    "title": "Fatiamento (slicing) de strings",
    "difficulty": "iniciante",
    "subtitle": "Acessando partes de uma string.",
    "intro": "Use a sintaxe [início:fim:passo] para extrair partes de uma string. Índices começam em 0 e podem ser negativos.",
    "codes": [
      [
        "python",
        "s = 'Python'\ns[0]      # 'P'\ns[-1]     # 'n' (último)\ns[0:3]    # 'Pyt'\ns[:3]     # 'Pyt'\ns[3:]     # 'hon'\ns[::2]    # 'Pto' (de 2 em 2)\ns[::-1]   # 'nohtyP' (reverso)"
      ]
    ],
    "points": [
      "Funciona em strings, listas e tuplas",
      "Índice negativo conta do fim",
      "[::-1] inverte a sequência"
    ],
    "alerts": []
  },
  {
    "slug": "booleanos",
    "section": "sintaxe",
    "title": "Booleanos e operadores lógicos",
    "difficulty": "iniciante",
    "subtitle": "True, False, and, or, not.",
    "intro": "Em Python, True e False começam com maiúscula. Operadores lógicos são and, or, not (não &&, ||, !).",
    "codes": [
      [
        "python",
        "ativo = True\nadmin = False\n\nativo and admin  # False\nativo or admin   # True\nnot ativo        # False\n\n# Curto-circuito\nresultado = nome or 'Anônimo'  # se nome for falsy, usa 'Anônimo'\n\n# Falsy: 0, '', [], {}, None, False"
      ]
    ],
    "points": [
      "True/False com maiúscula",
      "and/or/not são palavras-chave",
      "Valores 'falsy': 0, '', [], {}, None"
    ],
    "alerts": []
  },
  {
    "slug": "operadores-comparacao",
    "section": "sintaxe",
    "title": "Operadores de comparação",
    "difficulty": "iniciante",
    "subtitle": "Comparando valores.",
    "intro": "Use ==, !=, <, >, <=, >=. Note que = é atribuição e == é comparação.",
    "codes": [
      [
        "python",
        "5 == 5     # True\n5 != 4     # True\n5 < 10     # True\n\n# Encadeamento (Python permite!)\nidade = 25\n18 <= idade < 65  # True (apenas Python)\n\n# is vs ==\na = [1,2,3]; b = [1,2,3]\na == b   # True (valores iguais)\na is b   # False (objetos diferentes)"
      ]
    ],
    "points": [
      "== compara valores; is compara identidade",
      "Encadeamento estilo matemático funciona",
      "Use 'is None' (não '== None')"
    ],
    "alerts": []
  },
  {
    "slug": "conversao-tipos",
    "section": "sintaxe",
    "title": "Conversão de tipos (casting)",
    "difficulty": "iniciante",
    "subtitle": "int(), float(), str(), bool().",
    "intro": "Conversões explícitas usam funções com o nome do tipo. Python não converte automaticamente entre str e número.",
    "codes": [
      [
        "python",
        "int('42')        # 42\nfloat('3.14')    # 3.14\nstr(100)         # '100'\nbool(0)          # False\nbool('texto')    # True\nlist('abc')      # ['a','b','c']\n\n# input() sempre devolve str\nidade = int(input('Idade: '))"
      ]
    ],
    "points": [
      "input() sempre é string — converta!",
      "int('3.14') dá erro; use int(float('3.14'))",
      "bool('False') é True (string não vazia!)"
    ],
    "alerts": [
      [
        "warning",
        "bool('False') retorna True porque é uma string não-vazia. Cuidado com strings booleanas."
      ]
    ]
  },
  {
    "slug": "entrada-saida",
    "section": "sintaxe",
    "title": "Entrada e saída no terminal",
    "difficulty": "iniciante",
    "subtitle": "input() e print() em detalhe.",
    "intro": "input() lê uma linha do teclado. print() aceita múltiplos argumentos, sep e end.",
    "codes": [
      [
        "python",
        "# input\nnome = input('Nome: ')\nidade = int(input('Idade: '))\n\n# print avançado\nprint('a', 'b', 'c')                    # a b c\nprint('a', 'b', 'c', sep='-')           # a-b-c\nprint('sem quebra', end=' ')\nprint('continua')\n\n# em arquivo\nwith open('saida.txt','w') as f:\n    print('texto', file=f)"
      ]
    ],
    "points": [
      "sep define o separador entre argumentos",
      "end='' evita a quebra de linha",
      "file= permite imprimir em arquivos"
    ],
    "alerts": []
  },
  {
    "slug": "if-else",
    "section": "controle",
    "title": "Estruturas if / elif / else",
    "difficulty": "iniciante",
    "subtitle": "Tomada de decisão.",
    "intro": "if executa se a condição for verdadeira. Use elif (else if) para múltiplas alternativas e else para o caso padrão.",
    "codes": [
      [
        "python",
        "idade = int(input('Idade: '))\n\nif idade < 0:\n    print('Inválida')\nelif idade < 18:\n    print('Menor de idade')\nelif idade < 60:\n    print('Adulto')\nelse:\n    print('Idoso')"
      ]
    ],
    "points": [
      "Não há switch tradicional (use match)",
      "elif é equivalente ao 'else if'",
      "Indentação define o bloco"
    ],
    "alerts": []
  },
  {
    "slug": "operador-ternario",
    "section": "controle",
    "title": "Operador ternário",
    "difficulty": "iniciante",
    "subtitle": "If em uma linha.",
    "intro": "Python tem uma forma compacta: 'valor_se_true if condição else valor_se_false'.",
    "codes": [
      [
        "python",
        "idade = 20\nstatus = 'adulto' if idade >= 18 else 'menor'\n\n# Aninhado (evite muitos!)\nfaixa = 'criança' if idade < 12 else 'jovem' if idade < 18 else 'adulto'"
      ]
    ],
    "points": [
      "Use para atribuições simples",
      "Evite aninhar mais de uma vez",
      "Diferente de outras linguagens: 'a if cond else b'"
    ],
    "alerts": []
  },
  {
    "slug": "match-case",
    "section": "controle",
    "title": "Pattern matching com match/case",
    "difficulty": "intermediario",
    "subtitle": "O 'switch' moderno do Python (3.10+).",
    "intro": "Introduzido no Python 3.10, match permite casamento de padrões poderoso, não só comparação simples.",
    "codes": [
      [
        "python",
        "def descrever(p):\n    match p:\n        case 0:\n            return 'zero'\n        case n if n < 0:\n            return 'negativo'\n        case [x, y]:\n            return f'par {x},{y}'\n        case {'tipo': t, **resto}:\n            return f'dict tipo={t}'\n        case _:\n            return 'outro'"
      ]
    ],
    "points": [
      "Disponível só no Python 3.10+",
      "Bem mais poderoso que switch",
      "case _ é o catch-all"
    ],
    "alerts": []
  },
  {
    "slug": "loop-for",
    "section": "controle",
    "title": "Laço for",
    "difficulty": "iniciante",
    "subtitle": "Iterando sobre sequências.",
    "intro": "Em Python, for itera sobre qualquer iterável (lista, tupla, string, range, dicionário, gerador).",
    "codes": [
      [
        "python",
        "for letra in 'Python':\n    print(letra)\n\nfor n in [1, 2, 3]:\n    print(n)\n\nfor i in range(5):\n    print(i)  # 0,1,2,3,4\n\nfor i in range(2, 10, 2):\n    print(i)  # 2,4,6,8"
      ]
    ],
    "points": [
      "range(start, stop, step) gera números",
      "for varre qualquer iterável",
      "Não há for(int i=0; i<n; i++) — use range"
    ],
    "alerts": []
  },
  {
    "slug": "loop-while",
    "section": "controle",
    "title": "Laço while",
    "difficulty": "iniciante",
    "subtitle": "Repetição condicional.",
    "intro": "while executa enquanto a condição for verdadeira. Use com cuidado para não criar loops infinitos.",
    "codes": [
      [
        "python",
        "contador = 0\nwhile contador < 5:\n    print(contador)\n    contador += 1\n\n# Loop com saída por condição\nwhile True:\n    resp = input('Continuar? (s/n) ')\n    if resp == 'n':\n        break"
      ]
    ],
    "points": [
      "Garanta que a condição vai mudar",
      "break sai do loop; continue pula para próxima iteração",
      "while True + break é padrão comum"
    ],
    "alerts": [
      [
        "danger",
        "Esqueça-se de incrementar e você terá um loop infinito. Use Ctrl+C para interromper."
      ]
    ]
  },
  {
    "slug": "break-continue",
    "section": "controle",
    "title": "break, continue e else em loops",
    "difficulty": "iniciante",
    "subtitle": "Controlando o fluxo dentro de laços.",
    "intro": "break sai do loop. continue pula para a próxima iteração. else executa se o loop terminou sem break.",
    "codes": [
      [
        "python",
        "for n in range(10):\n    if n == 5:\n        break\n    print(n)\n\nfor n in range(10):\n    if n % 2 == 0:\n        continue\n    print(n)  # só ímpares\n\n# else em loop\nfor n in [1,3,5]:\n    if n == 4:\n        break\nelse:\n    print('Não encontrou 4')"
      ]
    ],
    "points": [
      "else em for executa só se NÃO houve break",
      "continue pula o resto da iteração",
      "break/continue afetam só o loop interno"
    ],
    "alerts": []
  },
  {
    "slug": "range-detalhes",
    "section": "controle",
    "title": "A função range em detalhe",
    "difficulty": "iniciante",
    "subtitle": "Gerando sequências numéricas.",
    "intro": "range é um iterável preguiçoso (não cria a lista na memória). Aceita 1, 2 ou 3 argumentos.",
    "codes": [
      [
        "python",
        "range(5)         # 0,1,2,3,4\nrange(2, 7)      # 2,3,4,5,6\nrange(10, 0, -1) # 10,9,8,7,6,5,4,3,2,1\nrange(0, 100, 10)# 0,10,20,...,90\n\n# Converter em lista\nlist(range(3))  # [0,1,2]"
      ]
    ],
    "points": [
      "range é preguiçoso (não ocupa memória)",
      "Padrão step é 1, mas pode ser negativo",
      "Combine com len() para iterar índices"
    ],
    "alerts": []
  },
  {
    "slug": "enumerate",
    "section": "controle",
    "title": "enumerate: índice e valor juntos",
    "difficulty": "iniciante",
    "subtitle": "Iterando com contador.",
    "intro": "enumerate produz pares (índice, valor). Mais limpo que usar range(len(lista)).",
    "codes": [
      [
        "python",
        "frutas = ['maçã','banana','uva']\nfor i, fruta in enumerate(frutas):\n    print(f'{i}: {fruta}')\n\n# Começando de outro número\nfor i, fruta in enumerate(frutas, start=1):\n    print(f'{i}º: {fruta}')"
      ]
    ],
    "points": [
      "Mais pythônico que range(len(lista))",
      "Aceita start= para começar de outro número",
      "Funciona com qualquer iterável"
    ],
    "alerts": []
  },
  {
    "slug": "zip-loop",
    "section": "controle",
    "title": "zip: iterando duas listas juntas",
    "difficulty": "iniciante",
    "subtitle": "Iteração paralela.",
    "intro": "zip combina iteráveis elemento por elemento. Para se quando o menor acabar.",
    "codes": [
      [
        "python",
        "nomes = ['Ana','Bia','Caio']\nidades = [25, 30, 22]\n\nfor nome, idade in zip(nomes, idades):\n    print(f'{nome} tem {idade}')\n\n# Três listas\nfor a, b, c in zip([1,2,3], 'abc', [10,20,30]):\n    print(a, b, c)"
      ]
    ],
    "points": [
      "Para no comprimento da menor sequência",
      "Use itertools.zip_longest para preencher",
      "Excelente para listas paralelas"
    ],
    "alerts": []
  },
  {
    "slug": "compreensoes-list",
    "section": "controle",
    "title": "List comprehensions",
    "difficulty": "intermediario",
    "subtitle": "Criando listas de forma elegante.",
    "intro": "List comprehensions são uma forma compacta e idiomática de criar listas a partir de iteráveis.",
    "codes": [
      [
        "python",
        "quadrados = [x**2 for x in range(10)]\npares    = [x for x in range(20) if x % 2 == 0]\nmatriz   = [[i*j for j in range(3)] for i in range(3)]\n\n# Equivalente sem comprehension\nquadrados = []\nfor x in range(10):\n    quadrados.append(x**2)"
      ]
    ],
    "points": [
      "Mais legível e rápido que loop+append",
      "Pode incluir if para filtrar",
      "Não abuse: legibilidade primeiro"
    ],
    "alerts": []
  },
  {
    "slug": "listas",
    "section": "estruturas",
    "title": "Listas: criação e acesso",
    "difficulty": "iniciante",
    "subtitle": "A estrutura mais usada do Python.",
    "intro": "Listas são mutáveis, ordenadas e podem conter qualquer tipo. Use [] para criar.",
    "codes": [
      [
        "python",
        "frutas = ['maçã', 'banana', 'uva']\nfrutas[0]       # 'maçã'\nfrutas[-1]      # 'uva'\nfrutas[1:3]     # ['banana','uva']\nlen(frutas)     # 3\n'uva' in frutas # True"
      ]
    ],
    "points": [
      "Mutáveis (podem ser alteradas)",
      "Aceitam tipos misturados",
      "Indexação a partir de 0"
    ],
    "alerts": []
  },
  {
    "slug": "metodos-listas",
    "section": "estruturas",
    "title": "Métodos de listas",
    "difficulty": "iniciante",
    "subtitle": "append, extend, insert, remove, pop, sort.",
    "intro": "Listas têm vários métodos para modificar in-place. A maioria não retorna a lista nova; modifica a existente.",
    "codes": [
      [
        "python",
        "l = [3, 1, 2]\nl.append(4)        # [3,1,2,4]\nl.extend([5,6])    # [3,1,2,4,5,6]\nl.insert(0, 0)     # [0,3,1,2,4,5,6]\nl.remove(3)        # remove primeiro 3\nl.pop()            # remove e retorna o último\nl.sort()           # ordena in-place\nsorted(l)          # retorna nova lista ordenada\nl.reverse()        # inverte in-place"
      ]
    ],
    "points": [
      "sort() modifica; sorted() retorna nova",
      "append adiciona 1; extend adiciona vários",
      "pop() sem índice remove o último"
    ],
    "alerts": []
  },
  {
    "slug": "copia-listas",
    "section": "estruturas",
    "title": "Copiando listas (e o erro comum)",
    "difficulty": "intermediario",
    "subtitle": "Cópia rasa vs profunda.",
    "intro": "Atribuir uma lista a outra variável NÃO copia: ambas apontam para o mesmo objeto. Use .copy() ou copy.deepcopy().",
    "codes": [
      [
        "python",
        "a = [1, 2, 3]\nb = a            # mesmo objeto!\nb.append(4)\nprint(a)         # [1,2,3,4] — surpresa!\n\nc = a.copy()     # cópia rasa\nc = a[:]         # outra forma\nc = list(a)      # outra forma\n\nimport copy\nd = copy.deepcopy(a)  # para listas aninhadas"
      ]
    ],
    "points": [
      "a = b NÃO copia listas",
      "Use .copy() ou a[:] para cópia rasa",
      "deepcopy para estruturas aninhadas"
    ],
    "alerts": [
      [
        "danger",
        "Listas mutáveis como argumento padrão de função são uma armadilha clássica! Veremos depois."
      ]
    ]
  },
  {
    "slug": "tuplas",
    "section": "estruturas",
    "title": "Tuplas: imutáveis e rápidas",
    "difficulty": "iniciante",
    "subtitle": "Quando usar ao invés de listas.",
    "intro": "Tuplas são como listas, mas imutáveis. Use para dados que não devem mudar (coordenadas, registros, retornos múltiplos).",
    "codes": [
      [
        "python",
        "ponto = (3, 4)\nx, y = ponto         # desempacotamento\n\n# Tupla de um elemento precisa da vírgula\nt = (5,)\n\n# Tuplas como retorno\ndef divmod_(a, b):\n    return a // b, a % b\n\nq, r = divmod_(17, 5)"
      ]
    ],
    "points": [
      "Imutáveis: mais rápidas e podem ser chave de dict",
      "Usadas em retornos múltiplos",
      "Tupla de 1 elemento: (x,) — não esqueça a vírgula"
    ],
    "alerts": []
  },
  {
    "slug": "dicionarios",
    "section": "estruturas",
    "title": "Dicionários: chave-valor",
    "difficulty": "iniciante",
    "subtitle": "Mapeamento estruturado.",
    "intro": "Dicionários armazenam pares chave-valor. Chaves são únicas e devem ser imutáveis.",
    "codes": [
      [
        "python",
        "pessoa = {'nome': 'Ana', 'idade': 30}\npessoa['nome']            # 'Ana'\npessoa['email'] = 'a@x.com'  # adiciona\ndel pessoa['idade']\n\n'nome' in pessoa          # True\nlen(pessoa)               # 2\n\n# Iteração\nfor chave, valor in pessoa.items():\n    print(chave, '=', valor)"
      ]
    ],
    "points": [
      "Acesso O(1) por chave",
      "Desde Python 3.7 mantém ordem de inserção",
      "Chaves devem ser hashable (imutáveis)"
    ],
    "alerts": []
  },
  {
    "slug": "metodos-dict",
    "section": "estruturas",
    "title": "Métodos de dicionário",
    "difficulty": "iniciante",
    "subtitle": "get, keys, values, items, update.",
    "intro": "Métodos essenciais para trabalhar com dicionários sem riscos de KeyError.",
    "codes": [
      [
        "python",
        "d = {'a': 1, 'b': 2}\nd.get('c')             # None (sem erro!)\nd.get('c', 0)          # 0 (padrão)\nd.keys()               # dict_keys(['a','b'])\nd.values()             # dict_values([1,2])\nd.items()              # pares\nd.update({'c': 3})     # mescla\nd.pop('a')             # remove e retorna\nd.setdefault('x', 0)   # cria se não existe"
      ]
    ],
    "points": [
      "d.get(k) evita KeyError",
      "items() é o jeito pythônico de iterar",
      "setdefault é útil para contadores simples"
    ],
    "alerts": []
  },
  {
    "slug": "dict-comprehension",
    "section": "estruturas",
    "title": "Dict comprehensions",
    "difficulty": "intermediario",
    "subtitle": "Criando dicionários elegantemente.",
    "intro": "Sintaxe similar às list comprehensions, mas para dicionários.",
    "codes": [
      [
        "python",
        "quadrados = {n: n**2 for n in range(5)}\n# {0:0, 1:1, 2:4, 3:9, 4:16}\n\n# Inverter chave/valor\noriginal = {'a': 1, 'b': 2}\ninvertido = {v: k for k, v in original.items()}\n\n# Filtrando\npares = {k: v for k, v in original.items() if v % 2 == 0}"
      ]
    ],
    "points": [
      "Sintaxe: {chave: valor for ... in ...}",
      "Pode incluir if para filtrar",
      "Útil para inverter ou transformar dicts"
    ],
    "alerts": []
  },
  {
    "slug": "sets",
    "section": "estruturas",
    "title": "Conjuntos (set)",
    "difficulty": "iniciante",
    "subtitle": "Coleções sem repetição.",
    "intro": "Sets são coleções não ordenadas, sem elementos repetidos. Excelentes para deduplicar e operações de conjunto.",
    "codes": [
      [
        "python",
        "numeros = {1, 2, 3, 2, 1}\nprint(numeros)       # {1, 2, 3}\n\n# Operações de conjunto\nA = {1, 2, 3}\nB = {3, 4, 5}\nA | B   # união:        {1,2,3,4,5}\nA & B   # interseção:   {3}\nA - B   # diferença:    {1,2}\nA ^ B   # diferença simétrica: {1,2,4,5}\n\n# Deduplicar lista\nunicos = list(set([1,1,2,3,3]))"
      ]
    ],
    "points": [
      "Sem ordem garantida",
      "Sem duplicatas",
      "Operações: | & - ^"
    ],
    "alerts": []
  },
  {
    "slug": "frozenset",
    "section": "estruturas",
    "title": "frozenset: o set imutável",
    "difficulty": "intermediario",
    "subtitle": "Sets que podem ser chave.",
    "intro": "frozenset é igual a set, mas imutável. Pode ser usado como chave de dicionário ou elemento de outro set.",
    "codes": [
      [
        "python",
        "fs = frozenset([1, 2, 3])\n# fs.add(4) — ERRO, é imutável\n\n# Como chave de dict\ngrupos = {\n    frozenset(['ana','bia']): 'time A',\n    frozenset(['caio','dani']): 'time B',\n}"
      ]
    ],
    "points": [
      "Imutável",
      "Hashable: serve como chave",
      "Útil para conjuntos como chave"
    ],
    "alerts": []
  },
  {
    "slug": "estruturas-aninhadas",
    "section": "estruturas",
    "title": "Estruturas aninhadas",
    "difficulty": "intermediario",
    "subtitle": "Listas de dicts, dicts de listas etc.",
    "intro": "Combinações de estruturas modelam dados reais como JSON, registros e configurações.",
    "codes": [
      [
        "python",
        "usuarios = [\n    {'nome': 'Ana', 'tags': ['admin', 'beta']},\n    {'nome': 'Bia', 'tags': ['user']},\n]\n\nfor u in usuarios:\n    if 'admin' in u['tags']:\n        print(u['nome'])\n\n# Acesso aninhado\nconfig = {'db': {'host': 'localhost', 'port': 5432}}\nporta = config['db']['port']"
      ]
    ],
    "points": [
      "JSON é praticamente uma estrutura aninhada Python",
      "Cuidado com KeyError em níveis profundos",
      "Para dados complexos, considere dataclasses"
    ],
    "alerts": []
  },
  {
    "slug": "funcoes-def",
    "section": "funcoes",
    "title": "Definindo funções (def)",
    "difficulty": "iniciante",
    "subtitle": "Reusando código.",
    "intro": "Use def para criar funções. Parâmetros podem ter valores padrão. return devolve um valor (ou None se omitido).",
    "codes": [
      [
        "python",
        "def saudacao(nome, formal=False):\n    if formal:\n        return f'Prezado(a) {nome}'\n    return f'Olá, {nome}!'\n\nprint(saudacao('Ana'))\nprint(saudacao('Dr. Silva', formal=True))"
      ]
    ],
    "points": [
      "Use snake_case para nomes",
      "Parâmetros com padrão devem vir após os obrigatórios",
      "Sem return → retorna None"
    ],
    "alerts": []
  },
  {
    "slug": "argumentos-nomeados",
    "section": "funcoes",
    "title": "Argumentos posicionais e nomeados",
    "difficulty": "iniciante",
    "subtitle": "Chamando funções de forma flexível.",
    "intro": "Você pode passar argumentos por posição ou por nome (keyword), o que torna o código mais legível.",
    "codes": [
      [
        "python",
        "def criar_user(nome, email, ativo=True):\n    return {'nome': nome, 'email': email, 'ativo': ativo}\n\n# Posicional\ncriar_user('Ana', 'a@x.com')\n\n# Nomeado (keyword)\ncriar_user(email='b@x.com', nome='Bia')\n\n# Misto: posicional vem primeiro\ncriar_user('Caio', email='c@x.com', ativo=False)"
      ]
    ],
    "points": [
      "Argumentos nomeados melhoram legibilidade",
      "Posicionais sempre antes dos nomeados na chamada",
      "Use / e * para forçar posicional/nomeado"
    ],
    "alerts": []
  },
  {
    "slug": "args-kwargs",
    "section": "funcoes",
    "title": "*args e **kwargs",
    "difficulty": "intermediario",
    "subtitle": "Funções com número variável de argumentos.",
    "intro": "*args coleta argumentos posicionais extras em uma tupla. **kwargs coleta nomeados extras em um dict.",
    "codes": [
      [
        "python",
        "def soma(*args):\n    return sum(args)\n\nsoma(1, 2, 3, 4)  # 10\n\ndef config(**kwargs):\n    for k, v in kwargs.items():\n        print(f'{k}={v}')\n\nconfig(host='localhost', port=8080)\n\n# Desempacotando\nargs = [1, 2, 3]\nkwargs = {'host': 'x', 'port': 80}\nsoma(*args)\nconfig(**kwargs)"
      ]
    ],
    "points": [
      "Os nomes args/kwargs são convenção",
      "* sozinho na assinatura força nomeados depois",
      "** desempacota dict em chamada"
    ],
    "alerts": []
  },
  {
    "slug": "funcoes-lambda",
    "section": "funcoes",
    "title": "Funções lambda",
    "difficulty": "intermediario",
    "subtitle": "Funções anônimas em uma linha.",
    "intro": "Lambdas são úteis para funções simples passadas como argumento. Limitam-se a uma única expressão.",
    "codes": [
      [
        "python",
        "quadrado = lambda x: x ** 2\nquadrado(5)  # 25\n\n# Em sorted\npessoas = [{'nome':'Ana','idade':30},{'nome':'Bia','idade':25}]\npessoas.sort(key=lambda p: p['idade'])\n\n# Em filter/map\npares = list(filter(lambda x: x % 2 == 0, range(10)))"
      ]
    ],
    "points": [
      "Apenas uma expressão (sem statements)",
      "Excelente como key= em sort/sorted",
      "Para algo maior, use def normal"
    ],
    "alerts": []
  },
  {
    "slug": "map-filter-reduce",
    "section": "funcoes",
    "title": "map, filter e reduce",
    "difficulty": "intermediario",
    "subtitle": "Programação funcional clássica.",
    "intro": "Funções de ordem superior. Hoje, list comprehensions costumam ser preferidas, mas map/filter ainda aparecem.",
    "codes": [
      [
        "python",
        "# map\ndobrados = list(map(lambda x: x*2, [1,2,3]))\n\n# filter\npares = list(filter(lambda x: x%2==0, range(10)))\n\n# reduce (em functools)\nfrom functools import reduce\nproduto = reduce(lambda a,b: a*b, [1,2,3,4])  # 24"
      ]
    ],
    "points": [
      "map e filter são preguiçosos (devolvem iteradores)",
      "Geralmente list comprehension é mais clara",
      "reduce vem do functools"
    ],
    "alerts": []
  },
  {
    "slug": "escopo-variaveis",
    "section": "funcoes",
    "title": "Escopo de variáveis (LEGB)",
    "difficulty": "intermediario",
    "subtitle": "Local, Enclosing, Global, Built-in.",
    "intro": "Python procura nomes em 4 escopos: Local, Enclosing (funções aninhadas), Global e Built-in.",
    "codes": [
      [
        "python",
        "x = 'global'\n\ndef externa():\n    x = 'enclosing'\n    def interna():\n        x = 'local'\n        print(x)\n    interna()\n    print(x)\n\nexterna()\nprint(x)"
      ]
    ],
    "points": [
      "LEGB é a ordem de busca",
      "global x permite alterar variável global",
      "nonlocal x altera variável do escopo enclosing"
    ],
    "alerts": []
  },
  {
    "slug": "closures",
    "section": "funcoes",
    "title": "Closures",
    "difficulty": "avancado",
    "subtitle": "Funções que capturam contexto.",
    "intro": "Uma closure é uma função interna que lembra variáveis do escopo onde foi criada, mesmo após o escopo externo terminar.",
    "codes": [
      [
        "python",
        "def contador(inicio=0):\n    n = inicio\n    def incrementar():\n        nonlocal n\n        n += 1\n        return n\n    return incrementar\n\nc = contador()\nc()  # 1\nc()  # 2\nc()  # 3"
      ]
    ],
    "points": [
      "Closure 'lembra' do escopo de criação",
      "Use nonlocal para modificar variável capturada",
      "Base para decorators"
    ],
    "alerts": []
  },
  {
    "slug": "funcoes-recursivas",
    "section": "funcoes",
    "title": "Funções recursivas",
    "difficulty": "intermediario",
    "subtitle": "Funções que chamam a si mesmas.",
    "intro": "Recursão é elegante para problemas como árvores, fractais e fatorial. Cuidado com o limite de recursão (~1000).",
    "codes": [
      [
        "python",
        "def fatorial(n):\n    if n <= 1:\n        return 1\n    return n * fatorial(n - 1)\n\nprint(fatorial(5))  # 120\n\n# Fibonacci com memoização\nfrom functools import lru_cache\n\n@lru_cache\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)"
      ]
    ],
    "points": [
      "Sempre tenha caso base",
      "Limite padrão: 1000 (sys.setrecursionlimit)",
      "Use lru_cache para evitar recomputação"
    ],
    "alerts": [
      [
        "warning",
        "Python não otimiza tail-call. Para recursão profunda, prefira iteração."
      ]
    ]
  },
  {
    "slug": "docstrings-anotacoes",
    "section": "funcoes",
    "title": "Docstrings e anotações de tipo",
    "difficulty": "intermediario",
    "subtitle": "Documentando funções.",
    "intro": "Docstrings são strings de documentação. Anotações (type hints) ajudam ferramentas e leitores.",
    "codes": [
      [
        "python",
        "def calcular_imc(peso: float, altura: float) -> float:\n    \"\"\"Calcula o Índice de Massa Corporal.\n\n    Args:\n        peso: peso em quilogramas.\n        altura: altura em metros.\n\n    Returns:\n        IMC = peso / altura ** 2\n    \"\"\"\n    return peso / altura ** 2\n\nhelp(calcular_imc)"
      ]
    ],
    "points": [
      "help() mostra a docstring",
      "Type hints não são checados em runtime",
      "Use mypy ou pyright para checagem estática"
    ],
    "alerts": []
  },
  {
    "slug": "decorators",
    "section": "funcoes",
    "title": "Decorators",
    "difficulty": "avancado",
    "subtitle": "Funções que modificam outras funções.",
    "intro": "Um decorator é uma função que recebe outra função e devolve uma versão modificada. Sintaxe: @nome.",
    "codes": [
      [
        "python",
        "import time\n\ndef cronometrar(func):\n    def wrapper(*args, **kwargs):\n        inicio = time.time()\n        resultado = func(*args, **kwargs)\n        print(f'{func.__name__} levou {time.time()-inicio:.3f}s')\n        return resultado\n    return wrapper\n\n@cronometrar\ndef demorada():\n    time.sleep(1)\n\ndemorada()"
      ]
    ],
    "points": [
      "@func equivale a func = decorator(func)",
      "Use functools.wraps para preservar metadados",
      "Base de Flask, FastAPI, Django views"
    ],
    "alerts": []
  },
  {
    "slug": "intro-oop",
    "section": "oop",
    "title": "Introdução à orientação a objetos",
    "difficulty": "intermediario",
    "subtitle": "Por que usar OOP em Python.",
    "intro": "OOP organiza código em torno de objetos que combinam dados (atributos) e comportamento (métodos). Em Python, tudo é objeto.",
    "codes": [
      [
        "python",
        "# 'tudo é objeto'\nprint(type(42))     # <class 'int'>\nprint(type('hi'))   # <class 'str'>\nprint((5).bit_length())  # int tem método!\n\nclass Cao:\n    def __init__(self, nome):\n        self.nome = nome\n    def latir(self):\n        print(f'{self.nome}: au!')\n\nrex = Cao('Rex')\nrex.latir()"
      ]
    ],
    "points": [
      "Tudo em Python é objeto",
      "Classes são templates",
      "Instâncias são objetos concretos"
    ],
    "alerts": []
  },
  {
    "slug": "classes-instancias",
    "section": "oop",
    "title": "Classes e instâncias",
    "difficulty": "intermediario",
    "subtitle": "Definindo seus próprios tipos.",
    "intro": "Use class para definir uma classe. __init__ é o construtor. self refere-se à instância atual.",
    "codes": [
      [
        "python",
        "class Pessoa:\n    def __init__(self, nome, idade):\n        self.nome = nome\n        self.idade = idade\n\n    def cumprimentar(self):\n        return f'Oi, sou {self.nome}, tenho {self.idade}'\n\nana = Pessoa('Ana', 30)\nprint(ana.cumprimentar())\nprint(ana.nome, ana.idade)"
      ]
    ],
    "points": [
      "__init__ inicializa atributos",
      "self é o primeiro parâmetro de métodos de instância",
      "Atributos são criados em self.x = ..."
    ],
    "alerts": []
  },
  {
    "slug": "atributos-classe",
    "section": "oop",
    "title": "Atributos de classe vs instância",
    "difficulty": "intermediario",
    "subtitle": "A diferença que confunde iniciantes.",
    "intro": "Atributos de classe são compartilhados por todas as instâncias. Atributos de instância são únicos.",
    "codes": [
      [
        "python",
        "class Cao:\n    especie = 'Canis lupus familiaris'  # de classe\n\n    def __init__(self, nome):\n        self.nome = nome  # de instância\n\nrex = Cao('Rex')\nlola = Cao('Lola')\nprint(rex.especie, lola.especie)  # mesmo\nCao.especie = 'X'                  # muda para todos"
      ]
    ],
    "points": [
      "Atributos de classe são compartilhados",
      "Cuidado com mutáveis como atributos de classe",
      "Atributos de instância vivem em self"
    ],
    "alerts": [
      [
        "danger",
        "Nunca use lista mutável como atributo de classe — todas as instâncias compartilham!"
      ]
    ]
  },
  {
    "slug": "metodos-tipos",
    "section": "oop",
    "title": "Métodos de instância, classe e estáticos",
    "difficulty": "intermediario",
    "subtitle": "Os três tipos de métodos.",
    "intro": "Use @classmethod para métodos que recebem a classe, @staticmethod para funções utilitárias dentro da classe.",
    "codes": [
      [
        "python",
        "class Pizza:\n    def __init__(self, ingredientes):\n        self.ingredientes = ingredientes\n\n    @classmethod\n    def margherita(cls):\n        return cls(['mussarela','manjericão','tomate'])\n\n    @staticmethod\n    def precos():\n        return {'P': 30, 'M': 45, 'G': 60}\n\np = Pizza.margherita()\nprint(Pizza.precos())"
      ]
    ],
    "points": [
      "@classmethod recebe cls",
      "@staticmethod não recebe self nem cls",
      "classmethod é usado para fábricas alternativas"
    ],
    "alerts": []
  },
  {
    "slug": "heranca",
    "section": "oop",
    "title": "Herança",
    "difficulty": "intermediario",
    "subtitle": "Reaproveitando código entre classes.",
    "intro": "Herança permite criar uma classe que herda atributos e métodos de outra. Use super() para acessar a classe pai.",
    "codes": [
      [
        "python",
        "class Animal:\n    def __init__(self, nome):\n        self.nome = nome\n    def mover(self):\n        print(f'{self.nome} se move')\n\nclass Cao(Animal):\n    def __init__(self, nome, raca):\n        super().__init__(nome)\n        self.raca = raca\n    def mover(self):\n        super().mover()\n        print('correndo!')\n\nrex = Cao('Rex','SRD')\nrex.mover()"
      ]
    ],
    "points": [
      "super() acessa a superclasse",
      "Pode sobrescrever métodos",
      "Prefira composição quando possível"
    ],
    "alerts": []
  },
  {
    "slug": "heranca-multipla",
    "section": "oop",
    "title": "Herança múltipla e MRO",
    "difficulty": "avancado",
    "subtitle": "Quando uma classe herda de várias.",
    "intro": "Python suporta herança múltipla. A ordem de resolução (MRO) é determinada pelo algoritmo C3 linearization.",
    "codes": [
      [
        "python",
        "class A:\n    def saudar(self): print('A')\nclass B(A):\n    def saudar(self): print('B'); super().saudar()\nclass C(A):\n    def saudar(self): print('C'); super().saudar()\nclass D(B, C):\n    def saudar(self): print('D'); super().saudar()\n\nD().saudar()       # D B C A\nprint(D.__mro__)   # ordem"
      ]
    ],
    "points": [
      "Use com cuidado",
      "Mixins são uma forma comum",
      "Veja .__mro__ para a ordem real"
    ],
    "alerts": []
  },
  {
    "slug": "encapsulamento",
    "section": "oop",
    "title": "Encapsulamento e propriedades",
    "difficulty": "intermediario",
    "subtitle": "Controlando acesso aos atributos.",
    "intro": "Python não tem private/public real. Convenção: _atributo (protegido), __atributo (mangling). Use @property para acessores.",
    "codes": [
      [
        "python",
        "class Conta:\n    def __init__(self, saldo=0):\n        self._saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\n    @saldo.setter\n    def saldo(self, valor):\n        if valor < 0:\n            raise ValueError('Negativo!')\n        self._saldo = valor\n\nc = Conta(100)\nc.saldo = 200    # vai pelo setter"
      ]
    ],
    "points": [
      "_x sinaliza 'não use de fora' (convenção)",
      "@property transforma método em atributo",
      "Validação fica no setter"
    ],
    "alerts": []
  },
  {
    "slug": "dunder-methods",
    "section": "oop",
    "title": "Métodos especiais (dunder)",
    "difficulty": "avancado",
    "subtitle": "Personalizando comportamento.",
    "intro": "__init__, __str__, __repr__, __eq__, __len__, __add__... Permitem que objetos se integrem com sintaxe nativa.",
    "codes": [
      [
        "python",
        "class Vetor:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f'Vetor({self.x},{self.y})'\n    def __add__(self, outro):\n        return Vetor(self.x+outro.x, self.y+outro.y)\n    def __eq__(self, outro):\n        return (self.x, self.y) == (outro.x, outro.y)\n\nprint(Vetor(1,2) + Vetor(3,4))  # Vetor(4,6)"
      ]
    ],
    "points": [
      "Permitem usar +, ==, len() etc.",
      "__repr__ deve ser representação inequívoca",
      "Veja a documentação do data model"
    ],
    "alerts": []
  },
  {
    "slug": "dataclasses",
    "section": "oop",
    "title": "@dataclass: classes sem boilerplate",
    "difficulty": "intermediario",
    "subtitle": "Atalho para classes de dados.",
    "intro": "@dataclass gera __init__, __repr__ e __eq__ automaticamente. Excelente para classes de dados.",
    "codes": [
      [
        "python",
        "from dataclasses import dataclass, field\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    tags: list = field(default_factory=list)\n\np = Produto('Café', 12.5)\nprint(p)  # Produto(nome='Café', preco=12.5, tags=[])"
      ]
    ],
    "points": [
      "Reduz boilerplate",
      "Use field(default_factory=list) para mutáveis",
      "frozen=True torna o dataclass imutável"
    ],
    "alerts": []
  },
  {
    "slug": "abstratas-protocols",
    "section": "oop",
    "title": "Classes abstratas e Protocols",
    "difficulty": "avancado",
    "subtitle": "Definindo interfaces.",
    "intro": "ABC define classes abstratas (não instanciáveis). Protocol (PEP 544) faz duck typing estático.",
    "codes": [
      [
        "python",
        "from abc import ABC, abstractmethod\n\nclass Forma(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\nclass Quadrado(Forma):\n    def __init__(self, lado): self.lado = lado\n    def area(self): return self.lado ** 2\n\n# Forma() — TypeError\nQuadrado(3).area()  # 9"
      ]
    ],
    "points": [
      "ABC força implementação de métodos",
      "Protocol = duck typing checado estaticamente",
      "Use para definir contratos"
    ],
    "alerts": []
  },
  {
    "slug": "modulos-import",
    "section": "modulos-erros",
    "title": "Módulos e import",
    "difficulty": "iniciante",
    "subtitle": "Organizando código em arquivos.",
    "intro": "Cada arquivo .py é um módulo. Use import para reaproveitá-lo. Pacotes são pastas com __init__.py.",
    "codes": [
      [
        "python",
        "# arquivo: mate.py\ndef somar(a, b): return a + b\nPI = 3.14159\n\n# arquivo: app.py\nimport mate\nprint(mate.somar(2, 3))\n\nfrom mate import PI, somar\nfrom mate import somar as add\nimport mate as m"
      ]
    ],
    "points": [
      "Cada .py é um módulo",
      "Pasta com __init__.py é um pacote",
      "Evite 'from mod import *'"
    ],
    "alerts": []
  },
  {
    "slug": "if-name-main",
    "section": "modulos-erros",
    "title": "if __name__ == '__main__'",
    "difficulty": "iniciante",
    "subtitle": "Por que esse padrão existe.",
    "intro": "Quando um arquivo é executado direto, __name__ vale '__main__'. Quando é importado, vale o nome do módulo.",
    "codes": [
      [
        "python",
        "# arquivo: util.py\ndef principal():\n    print('rodando direto')\n\nif __name__ == '__main__':\n    principal()\n\n# python3 util.py  → executa principal()\n# import util      → não executa"
      ]
    ],
    "points": [
      "Permite que o arquivo seja módulo E script",
      "Padrão muito comum",
      "Evita execução em import"
    ],
    "alerts": []
  },
  {
    "slug": "pacotes",
    "section": "modulos-erros",
    "title": "Criando pacotes",
    "difficulty": "intermediario",
    "subtitle": "Organizando módulos em pastas.",
    "intro": "Pacotes agrupam módulos relacionados. __init__.py marca a pasta como pacote (opcional desde Python 3.3 com namespace packages).",
    "codes": [
      [
        "text",
        "meu_pacote/\n├── __init__.py\n├── modulo_a.py\n└── sub/\n    ├── __init__.py\n    └── modulo_b.py\n\n# Uso\nfrom meu_pacote import modulo_a\nfrom meu_pacote.sub.modulo_b import funcao"
      ]
    ],
    "points": [
      "__init__.py pode estar vazio",
      "Pacotes podem ter subpacotes",
      "Use imports relativos com cuidado"
    ],
    "alerts": []
  },
  {
    "slug": "excecoes",
    "section": "modulos-erros",
    "title": "Exceções: try/except/finally",
    "difficulty": "iniciante",
    "subtitle": "Lidando com erros.",
    "intro": "Exceções interrompem o fluxo. Use try/except para capturar e tratar. finally sempre executa.",
    "codes": [
      [
        "python",
        "try:\n    n = int(input('Número: '))\n    r = 10 / n\nexcept ValueError:\n    print('Não é número')\nexcept ZeroDivisionError:\n    print('Não pode dividir por zero')\nexcept Exception as e:\n    print(f'Erro: {e}')\nelse:\n    print(f'Resultado: {r}')\nfinally:\n    print('Fim')"
      ]
    ],
    "points": [
      "else: roda se NÃO houve exceção",
      "finally: sempre roda",
      "Capture exceções específicas, não Exception"
    ],
    "alerts": []
  },
  {
    "slug": "raise-excecoes",
    "section": "modulos-erros",
    "title": "raise: lançando exceções",
    "difficulty": "intermediario",
    "subtitle": "Sinalizando erros no seu código.",
    "intro": "Use raise para lançar uma exceção. Crie suas próprias subclassando Exception.",
    "codes": [
      [
        "python",
        "def dividir(a, b):\n    if b == 0:\n        raise ValueError('Divisor não pode ser zero')\n    return a / b\n\nclass SaldoInsuficienteError(Exception):\n    pass\n\nraise SaldoInsuficienteError('saldo abaixo de zero')"
      ]
    ],
    "points": [
      "raise X(...) lança exceção",
      "Crie classes específicas para erros do seu domínio",
      "Não capture sem necessidade"
    ],
    "alerts": []
  },
  {
    "slug": "context-managers",
    "section": "modulos-erros",
    "title": "Gerenciadores de contexto (with)",
    "difficulty": "intermediario",
    "subtitle": "Garantindo limpeza com 'with'.",
    "intro": "with garante que recursos sejam liberados (arquivos, locks, conexões) mesmo em caso de erro.",
    "codes": [
      [
        "python",
        "with open('arquivo.txt') as f:\n    dados = f.read()\n# arquivo é fechado automaticamente\n\n# Criar o seu próprio\nfrom contextlib import contextmanager\n\n@contextmanager\ndef cronometro():\n    import time\n    inicio = time.time()\n    yield\n    print(f'{time.time()-inicio:.3f}s')\n\nwith cronometro():\n    sum(range(10**6))"
      ]
    ],
    "points": [
      "with chama __enter__ e __exit__",
      "Sempre use para arquivos e conexões",
      "@contextmanager facilita criar os seus"
    ],
    "alerts": []
  },
  {
    "slug": "logging",
    "section": "modulos-erros",
    "title": "Logging em vez de print",
    "difficulty": "intermediario",
    "subtitle": "Registro profissional de eventos.",
    "intro": "logging é o módulo padrão para logs. Suporta níveis, formatadores e handlers múltiplos.",
    "codes": [
      [
        "python",
        "import logging\n\nlogging.basicConfig(\n    level=logging.INFO,\n    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'\n)\nlog = logging.getLogger(__name__)\n\nlog.debug('detalhe')\nlog.info('iniciando')\nlog.warning('atenção')\nlog.error('falhou')\nlog.exception('com stack trace')"
      ]
    ],
    "points": [
      "Níveis: DEBUG INFO WARNING ERROR CRITICAL",
      "Use logger por módulo",
      "Configure no entrypoint da aplicação"
    ],
    "alerts": []
  },
  {
    "slug": "datetime",
    "section": "modulos-erros",
    "title": "Datas e horas: datetime",
    "difficulty": "intermediario",
    "subtitle": "Trabalhando com tempo.",
    "intro": "datetime cobre datas, horas, intervalos e fusos. Para fusos, use também zoneinfo.",
    "codes": [
      [
        "python",
        "from datetime import datetime, timedelta, date\nfrom zoneinfo import ZoneInfo\n\nagora = datetime.now()\nhoje = date.today()\namanha = hoje + timedelta(days=1)\n\n# Com fuso horário\nsao_paulo = datetime.now(ZoneInfo('America/Sao_Paulo'))\n\n# Formatação\nprint(agora.strftime('%d/%m/%Y %H:%M'))\n# Parsing\ndt = datetime.strptime('2026-01-15', '%Y-%m-%d')"
      ]
    ],
    "points": [
      "timedelta para intervalos",
      "ZoneInfo para fusos (Python 3.9+)",
      "strftime/strptime para formatação"
    ],
    "alerts": []
  },
  {
    "slug": "math-random",
    "section": "modulos-erros",
    "title": "math e random",
    "difficulty": "iniciante",
    "subtitle": "Matemática e aleatoriedade.",
    "intro": "math contém funções matemáticas. random gera valores pseudoaleatórios.",
    "codes": [
      [
        "python",
        "import math, random\n\nmath.sqrt(16)        # 4.0\nmath.pi              # 3.14159...\nmath.factorial(5)    # 120\nmath.log(100, 10)    # 2.0\n\nrandom.random()              # [0,1)\nrandom.randint(1, 10)        # inteiro\nrandom.choice(['a','b','c'])\nrandom.shuffle([1,2,3,4])    # embaralha in-place\nrandom.sample(range(100), 5)"
      ]
    ],
    "points": [
      "random NÃO é seguro para criptografia",
      "Use secrets para senhas/tokens",
      "math.inf e math.nan existem"
    ],
    "alerts": []
  },
  {
    "slug": "json-modulo",
    "section": "modulos-erros",
    "title": "Manipulando JSON",
    "difficulty": "iniciante",
    "subtitle": "Lendo e escrevendo JSON.",
    "intro": "json converte entre estruturas Python (dict, list, str, num, bool, None) e texto JSON.",
    "codes": [
      [
        "python",
        "import json\n\ndados = {'nome': 'Ana', 'idades': [30, 25]}\n\n# Para string\ntexto = json.dumps(dados, indent=2, ensure_ascii=False)\n\n# De string\nde_volta = json.loads(texto)\n\n# Para arquivo\nwith open('dados.json','w', encoding='utf-8') as f:\n    json.dump(dados, f, indent=2, ensure_ascii=False)\n\nwith open('dados.json', encoding='utf-8') as f:\n    lido = json.load(f)"
      ]
    ],
    "points": [
      "dumps/loads para string; dump/load para arquivo",
      "ensure_ascii=False mantém acentos",
      "indent= deixa legível"
    ],
    "alerts": []
  },
  {
    "slug": "csv-modulo",
    "section": "modulos-erros",
    "title": "Manipulando CSV",
    "difficulty": "iniciante",
    "subtitle": "Lendo e escrevendo CSV.",
    "intro": "csv lê e escreve arquivos separados por vírgula (ou outro delimitador).",
    "codes": [
      [
        "python",
        "import csv\n\n# Ler\nwith open('dados.csv', encoding='utf-8') as f:\n    leitor = csv.DictReader(f)\n    for linha in leitor:\n        print(linha['nome'], linha['idade'])\n\n# Escrever\nwith open('saida.csv','w', newline='', encoding='utf-8') as f:\n    escritor = csv.DictWriter(f, fieldnames=['nome','idade'])\n    escritor.writeheader()\n    escritor.writerow({'nome':'Ana','idade':30})"
      ]
    ],
    "points": [
      "DictReader/DictWriter usam dicts",
      "Sempre passe newline='' ao escrever",
      "Para CSVs grandes, use pandas"
    ],
    "alerts": []
  },
  {
    "slug": "pathlib",
    "section": "modulos-erros",
    "title": "pathlib: caminhos modernos",
    "difficulty": "intermediario",
    "subtitle": "Substituindo os.path.",
    "intro": "pathlib oferece uma API orientada a objetos para caminhos de arquivo. Mais limpa que os.path.",
    "codes": [
      [
        "python",
        "from pathlib import Path\n\np = Path('/home/ana/docs/notas.txt')\np.exists()\np.is_file()\np.suffix         # '.txt'\np.stem           # 'notas'\np.parent         # /home/ana/docs\np.name           # 'notas.txt'\n\n# Combinar caminhos\nbase = Path.home() / 'projetos' / 'app'\n\n# Iterar arquivos\nfor f in Path('.').glob('*.py'):\n    print(f.read_text(encoding='utf-8'))"
      ]
    ],
    "points": [
      "Use / para combinar caminhos",
      "read_text/write_text para texto rápido",
      "glob/rglob para busca de arquivos"
    ],
    "alerts": []
  },
  {
    "slug": "os-sys",
    "section": "modulos-erros",
    "title": "Módulos os e sys",
    "difficulty": "intermediario",
    "subtitle": "Interagindo com SO e interpretador.",
    "intro": "os fornece acesso a operações do sistema. sys, ao próprio interpretador.",
    "codes": [
      [
        "python",
        "import os, sys\n\nos.getcwd()              # diretório atual\nos.environ.get('HOME')   # variáveis de ambiente\nos.listdir('.')          # lista pasta\nos.makedirs('a/b/c', exist_ok=True)\n\nsys.argv                 # argumentos de linha de comando\nsys.exit(0)              # encerra\nsys.platform             # 'linux','darwin','win32'"
      ]
    ],
    "points": [
      "Para caminhos, prefira pathlib",
      "sys.argv para CLI simples",
      "Use argparse para CLIs sérias"
    ],
    "alerts": []
  },
  {
    "slug": "argparse",
    "section": "modulos-erros",
    "title": "argparse: CLIs profissionais",
    "difficulty": "intermediario",
    "subtitle": "Construindo argumentos de linha de comando.",
    "intro": "argparse gera --help automaticamente, valida tipos e mensagens de erro claras.",
    "codes": [
      [
        "python",
        "import argparse\n\np = argparse.ArgumentParser(description='Soma dois números')\np.add_argument('a', type=int)\np.add_argument('b', type=int)\np.add_argument('-v','--verbose', action='store_true')\nargs = p.parse_args()\n\nif args.verbose:\n    print(f'Calculando {args.a} + {args.b}')\nprint(args.a + args.b)"
      ]
    ],
    "points": [
      "Gera --help automaticamente",
      "Tipos validados (int, float)",
      "Para CLIs ricas, veja Click ou Typer"
    ],
    "alerts": []
  },
  {
    "slug": "arquivos-texto",
    "section": "io-tipagem",
    "title": "Lendo e escrevendo arquivos de texto",
    "difficulty": "iniciante",
    "subtitle": "open() com modos r, w, a.",
    "intro": "open() retorna um arquivo. Sempre use 'with' para garantir fechamento. Especifique encoding.",
    "codes": [
      [
        "python",
        "# Ler tudo\nwith open('texto.txt', encoding='utf-8') as f:\n    conteudo = f.read()\n\n# Linha a linha\nwith open('texto.txt', encoding='utf-8') as f:\n    for linha in f:\n        print(linha.rstrip())\n\n# Escrever (sobrescreve!)\nwith open('saida.txt', 'w', encoding='utf-8') as f:\n    f.write('linha 1\\n')\n\n# Append\nwith open('log.txt', 'a', encoding='utf-8') as f:\n    f.write('nova entrada\\n')"
      ]
    ],
    "points": [
      "Sempre use encoding='utf-8'",
      "'w' apaga o arquivo!",
      "Iterar o arquivo lê linha a linha"
    ],
    "alerts": []
  },
  {
    "slug": "arquivos-binarios",
    "section": "io-tipagem",
    "title": "Arquivos binários",
    "difficulty": "intermediario",
    "subtitle": "Modos rb e wb.",
    "intro": "Para arquivos não-texto (imagens, PDFs, etc.), use modo binário ('rb', 'wb'). Trabalha com bytes.",
    "codes": [
      [
        "python",
        "# Copiar arquivo\nwith open('foto.jpg','rb') as orig, open('copia.jpg','wb') as cop:\n    cop.write(orig.read())\n\n# Em pedaços (para grandes)\nCHUNK = 64 * 1024\nwith open('grande.bin','rb') as f:\n    while pedaco := f.read(CHUNK):\n        processar(pedaco)"
      ]
    ],
    "points": [
      "Use 'rb'/'wb' para binário",
      "bytes (não str) é o tipo",
      "Walrus := é útil em loops de leitura"
    ],
    "alerts": []
  },
  {
    "slug": "pickle",
    "section": "io-tipagem",
    "title": "Serialização com pickle",
    "difficulty": "intermediario",
    "subtitle": "Salvando objetos Python.",
    "intro": "pickle salva qualquer objeto Python em arquivo. Cuidado: NUNCA carregue pickle de fonte não confiável.",
    "codes": [
      [
        "python",
        "import pickle\n\ndados = {'usuarios': [{'nome':'Ana'}], 'total': 100}\n\nwith open('estado.pkl','wb') as f:\n    pickle.dump(dados, f)\n\nwith open('estado.pkl','rb') as f:\n    carregado = pickle.load(f)"
      ]
    ],
    "points": [
      "Funciona com quase qualquer objeto",
      "Específico do Python (não interoperável)",
      "Inseguro com fontes externas — pode executar código!"
    ],
    "alerts": [
      [
        "danger",
        "NUNCA faça pickle.load() em arquivo recebido de fora. Pode executar código arbitrário."
      ]
    ]
  },
  {
    "slug": "type-hints",
    "section": "io-tipagem",
    "title": "Type hints (PEP 484)",
    "difficulty": "intermediario",
    "subtitle": "Anotando tipos.",
    "intro": "Type hints são opcionais mas ajudam ferramentas (mypy, pyright) e leitores. Não afetam o runtime.",
    "codes": [
      [
        "python",
        "def saudar(nome: str) -> str:\n    return f'Olá, {nome}'\n\nidades: list[int] = [25, 30]\nconfig: dict[str, str] = {}\n\n# Optional / União\nfrom typing import Optional\ndef buscar(id: int) -> Optional[str]: ...\n\n# Sintaxe nova (3.10+)\ndef buscar(id: int) -> str | None: ..."
      ]
    ],
    "points": [
      "Hints são opcionais",
      "Use mypy ou pyright para checagem",
      "Sintaxe X | None > Optional[X] em Python 3.10+"
    ],
    "alerts": []
  },
  {
    "slug": "typing-avancado",
    "section": "io-tipagem",
    "title": "typing avançado",
    "difficulty": "avancado",
    "subtitle": "Generics, TypedDict, Protocol.",
    "intro": "O módulo typing oferece tipos sofisticados para APIs robustas.",
    "codes": [
      [
        "python",
        "from typing import TypedDict, Protocol, TypeVar, Generic\n\nclass Usuario(TypedDict):\n    nome: str\n    idade: int\n\nT = TypeVar('T')\n\nclass Pilha(Generic[T]):\n    def __init__(self): self.itens: list[T] = []\n    def push(self, x: T): self.itens.append(x)\n    def pop(self) -> T: return self.itens.pop()\n\np: Pilha[int] = Pilha()"
      ]
    ],
    "points": [
      "TypedDict tipa dicts",
      "Generic permite contêineres tipados",
      "Protocol = duck typing checado"
    ],
    "alerts": []
  },
  {
    "slug": "mypy",
    "section": "io-tipagem",
    "title": "Checagem com mypy/pyright",
    "difficulty": "intermediario",
    "subtitle": "Validando tipos antes de rodar.",
    "intro": "Ferramentas como mypy e pyright analisam o código e apontam erros de tipo sem executar.",
    "codes": [
      [
        "bash",
        "pip install mypy\nmypy meu_arquivo.py\n\n# Configuração em pyproject.toml\n[tool.mypy]\nstrict = true\npython_version = '3.12'"
      ]
    ],
    "points": [
      "mypy é o checador padrão",
      "pyright é mais rápido (Microsoft)",
      "Roda em CI para garantir qualidade"
    ],
    "alerts": []
  },
  {
    "slug": "geradores",
    "section": "io-tipagem",
    "title": "Geradores e yield",
    "difficulty": "intermediario",
    "subtitle": "Iteradores preguiçosos.",
    "intro": "Funções com yield são geradores: produzem valores sob demanda, sem materializar tudo na memória.",
    "codes": [
      [
        "python",
        "def contar(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nfor x in contar(5):\n    print(x)\n\n# Generator expression\nquadrados = (x**2 for x in range(10**6))\nsoma = sum(quadrados)  # não cria lista gigante"
      ]
    ],
    "points": [
      "Use yield para produzir valores",
      "Geradores são preguiçosos (lazy)",
      "Excelentes para processar dados grandes"
    ],
    "alerts": []
  },
  {
    "slug": "iteradores-customizados",
    "section": "io-tipagem",
    "title": "Iteradores customizados",
    "difficulty": "avancado",
    "subtitle": "__iter__ e __next__.",
    "intro": "Implemente __iter__ e __next__ para criar iteráveis personalizados (na maioria das vezes, geradores são mais simples).",
    "codes": [
      [
        "python",
        "class Fibonacci:\n    def __init__(self, limite):\n        self.limite = limite\n    def __iter__(self):\n        a, b = 0, 1\n        while a < self.limite:\n            yield a\n            a, b = b, a + b\n\nfor n in Fibonacci(50):\n    print(n)"
      ]
    ],
    "points": [
      "__iter__ pode ser um generator method",
      "StopIteration sinaliza fim",
      "Geradores são quase sempre suficientes"
    ],
    "alerts": []
  },
  {
    "slug": "asyncio-intro",
    "section": "io-tipagem",
    "title": "Introdução ao asyncio",
    "difficulty": "avancado",
    "subtitle": "Programação assíncrona.",
    "intro": "asyncio é o módulo padrão para concorrência baseada em corrotinas. Útil para I/O-bound (rede, disco).",
    "codes": [
      [
        "python",
        "import asyncio\n\nasync def baixar(nome, segundos):\n    print(f'iniciando {nome}')\n    await asyncio.sleep(segundos)\n    print(f'pronto {nome}')\n    return nome\n\nasync def main():\n    resultados = await asyncio.gather(\n        baixar('a', 2),\n        baixar('b', 1),\n        baixar('c', 3),\n    )\n    print(resultados)\n\nasyncio.run(main())"
      ]
    ],
    "points": [
      "async def define corrotina",
      "await espera resultado",
      "asyncio.gather paraleliza"
    ],
    "alerts": []
  },
  {
    "slug": "async-await-detalhes",
    "section": "io-tipagem",
    "title": "async/await em profundidade",
    "difficulty": "avancado",
    "subtitle": "Loop, tasks e cancelamento.",
    "intro": "Tasks são corrotinas agendadas. O event loop coordena tudo. Cuidado com bloqueio de CPU dentro de async.",
    "codes": [
      [
        "python",
        "import asyncio\n\nasync def trabalho():\n    await asyncio.sleep(1)\n    return 42\n\nasync def main():\n    t = asyncio.create_task(trabalho())\n    # ... outras coisas\n    resultado = await t\n\n    # Timeout\n    try:\n        await asyncio.wait_for(trabalho(), timeout=0.5)\n    except asyncio.TimeoutError:\n        print('demorou demais')\n\nasyncio.run(main())"
      ]
    ],
    "points": [
      "create_task agenda corrotina",
      "wait_for impõe timeout",
      "Não use time.sleep dentro de async!"
    ],
    "alerts": []
  },
  {
    "slug": "threads",
    "section": "io-tipagem",
    "title": "Threads em Python",
    "difficulty": "avancado",
    "subtitle": "Concorrência com threading.",
    "intro": "Threads servem para I/O-bound (rede, disco). Para CPU-bound, o GIL impede paralelismo real — use multiprocessing.",
    "codes": [
      [
        "python",
        "import threading, time\n\ndef tarefa(n):\n    print(f'tarefa {n} começou')\n    time.sleep(1)\n    print(f'tarefa {n} terminou')\n\nthreads = [threading.Thread(target=tarefa, args=(i,)) for i in range(3)]\nfor t in threads: t.start()\nfor t in threads: t.join()"
      ]
    ],
    "points": [
      "Boas para I/O",
      "GIL limita CPU paralela",
      "join() espera a thread terminar"
    ],
    "alerts": []
  },
  {
    "slug": "multiprocessing",
    "section": "io-tipagem",
    "title": "multiprocessing: paralelismo real",
    "difficulty": "avancado",
    "subtitle": "Vários processos para CPU-bound.",
    "intro": "multiprocessing usa processos separados, contornando o GIL. Cada um tem seu próprio Python.",
    "codes": [
      [
        "python",
        "from multiprocessing import Pool\n\ndef quadrado(n):\n    return n * n\n\nif __name__ == '__main__':\n    with Pool(4) as pool:\n        resultados = pool.map(quadrado, range(10))\n    print(resultados)"
      ]
    ],
    "points": [
      "Cada processo tem seu interpretador",
      "Comunicação custa (serialização)",
      "Use para CPU-bound"
    ],
    "alerts": []
  },
  {
    "slug": "concurrent-futures",
    "section": "io-tipagem",
    "title": "concurrent.futures",
    "difficulty": "intermediario",
    "subtitle": "API simples para threads/processos.",
    "intro": "ThreadPoolExecutor e ProcessPoolExecutor abstraem concorrência. Mais alto nível que threading e multiprocessing.",
    "codes": [
      [
        "python",
        "from concurrent.futures import ThreadPoolExecutor, as_completed\nimport requests\n\ndef baixar(url):\n    return len(requests.get(url).content)\n\nurls = ['https://example.com'] * 5\n\nwith ThreadPoolExecutor(max_workers=5) as ex:\n    futuros = {ex.submit(baixar, u): u for u in urls}\n    for f in as_completed(futuros):\n        print(futuros[f], f.result())"
      ]
    ],
    "points": [
      "Mais simples que threading direto",
      "ProcessPoolExecutor para CPU",
      "as_completed retorna quando termina"
    ],
    "alerts": []
  },
  {
    "slug": "gil",
    "section": "io-tipagem",
    "title": "Entendendo o GIL",
    "difficulty": "avancado",
    "subtitle": "O Global Interpreter Lock.",
    "intro": "O GIL é um lock que garante que apenas uma thread Python execute por vez. Não afeta I/O, mas limita CPU.",
    "codes": [
      [
        "text",
        "Implicações:\n- Threads ajudam em I/O (rede, disco)\n- Threads NÃO ajudam em CPU pura (loops pesados)\n- Para CPU: use multiprocessing ou bibliotecas em C (numpy)\n\nPython 3.13 introduziu modo experimental sem GIL (--disable-gil)."
      ]
    ],
    "points": [
      "GIL = uma thread Python por vez",
      "I/O libera o GIL — threads ajudam",
      "Para CPU: multiprocessing ou C extensions"
    ],
    "alerts": []
  },
  {
    "slug": "unittest",
    "section": "testes-web",
    "title": "unittest: testes da stdlib",
    "difficulty": "intermediario",
    "subtitle": "Testes inclusos no Python.",
    "intro": "unittest é o framework de testes da biblioteca padrão. Inspirado no JUnit. Testes em classes que herdam de TestCase.",
    "codes": [
      [
        "python",
        "import unittest\n\ndef somar(a, b): return a + b\n\nclass TesteSomar(unittest.TestCase):\n    def test_positivos(self):\n        self.assertEqual(somar(2,3), 5)\n    def test_negativos(self):\n        self.assertEqual(somar(-1,-1), -2)\n\nif __name__ == '__main__':\n    unittest.main()"
      ]
    ],
    "points": [
      "Inclui no Python — sem instalar",
      "Verbose: setUp, assertEqual, etc.",
      "Hoje muita gente prefere pytest"
    ],
    "alerts": []
  },
  {
    "slug": "pytest",
    "section": "testes-web",
    "title": "pytest: o framework moderno",
    "difficulty": "intermediario",
    "subtitle": "O padrão de fato hoje.",
    "intro": "pytest é mais conciso que unittest e tem ecossistema gigante de plugins.",
    "codes": [
      [
        "python",
        "# arquivo: test_calc.py\ndef somar(a, b): return a + b\n\ndef test_positivos():\n    assert somar(2, 3) == 5\n\ndef test_negativos():\n    assert somar(-1, -1) == -2\n\n# rodar: pytest -v"
      ]
    ],
    "points": [
      "assert simples — sem métodos especiais",
      "Descobre testes automaticamente",
      "Plugins: pytest-cov, pytest-mock, pytest-asyncio"
    ],
    "alerts": []
  },
  {
    "slug": "fixtures",
    "section": "testes-web",
    "title": "pytest fixtures",
    "difficulty": "intermediario",
    "subtitle": "Setup/teardown elegante.",
    "intro": "Fixtures injetam dependências nos testes (banco em memória, cliente HTTP, dados de exemplo).",
    "codes": [
      [
        "python",
        "import pytest\n\n@pytest.fixture\ndef usuario():\n    return {'nome': 'Ana', 'idade': 30}\n\ndef test_nome(usuario):\n    assert usuario['nome'] == 'Ana'\n\n@pytest.fixture(scope='session')\ndef db():\n    conn = abrir()\n    yield conn\n    conn.close()"
      ]
    ],
    "points": [
      "Fixtures eliminam setUp repetitivo",
      "scope: function (padrão), class, module, session",
      "yield permite cleanup"
    ],
    "alerts": []
  },
  {
    "slug": "mocks",
    "section": "testes-web",
    "title": "Mocks com unittest.mock",
    "difficulty": "avancado",
    "subtitle": "Substituindo dependências em testes.",
    "intro": "Mock substitui objetos para isolar a unidade testada. patch decora funções/contexto.",
    "codes": [
      [
        "python",
        "from unittest.mock import Mock, patch\n\ndef enviar_email(client, dest, texto):\n    return client.send(dest, texto)\n\ndef test_envio():\n    cliente_falso = Mock()\n    cliente_falso.send.return_value = 'ok'\n    assert enviar_email(cliente_falso, 'a@x','oi') == 'ok'\n    cliente_falso.send.assert_called_once_with('a@x','oi')"
      ]
    ],
    "points": [
      "Mock simula qualquer objeto",
      "patch substitui temporariamente",
      "assert_called_*: verificações de chamada"
    ],
    "alerts": []
  },
  {
    "slug": "tdd",
    "section": "testes-web",
    "title": "TDD: Test-Driven Development",
    "difficulty": "intermediario",
    "subtitle": "Red, Green, Refactor.",
    "intro": "TDD é a prática de escrever o teste antes do código. Ciclo: teste falha → faz passar → refatora.",
    "codes": [
      [
        "text",
        "Ciclo TDD:\n1. Red: escreva um teste que FALHA\n2. Green: implemente o mínimo para passar\n3. Refactor: melhore o código sem quebrar testes\n\nBenefícios:\n- Especificação executável\n- Cobertura natural\n- Design guiado por uso"
      ]
    ],
    "points": [
      "Teste primeiro, código depois",
      "Pequenos passos",
      "Refatoração segura"
    ],
    "alerts": []
  },
  {
    "slug": "coverage",
    "section": "testes-web",
    "title": "Cobertura de testes",
    "difficulty": "intermediario",
    "subtitle": "Medindo o que foi testado.",
    "intro": "coverage.py mede quais linhas foram executadas pelos testes.",
    "codes": [
      [
        "bash",
        "pip install pytest-cov\npytest --cov=meu_pacote --cov-report=html\n\n# Abre htmlcov/index.html\nopen htmlcov/index.html"
      ]
    ],
    "points": [
      "Cobertura ≠ qualidade!",
      "Mire 80%+ em código de negócio",
      "Use --cov-report=term-missing"
    ],
    "alerts": []
  },
  {
    "slug": "http-requests",
    "section": "testes-web",
    "title": "HTTP com requests",
    "difficulty": "intermediario",
    "subtitle": "Fazendo requisições HTTP.",
    "intro": "requests é a biblioteca mais popular para HTTP em Python. Sintaxe limpa e poderosa.",
    "codes": [
      [
        "python",
        "import requests\n\nr = requests.get('https://api.github.com/users/python')\nprint(r.status_code, r.json()['name'])\n\n# POST com JSON\nr = requests.post('https://httpbin.org/post',\n                  json={'msg': 'oi'},\n                  headers={'X-API-Key': 'xxx'},\n                  timeout=10)\n\n# Sessão (reutiliza conexão)\nwith requests.Session() as s:\n    s.headers['Authorization'] = 'Bearer ...'\n    s.get('https://api.exemplo.com/me')"
      ]
    ],
    "points": [
      "Sempre use timeout=",
      "json= envia como JSON automaticamente",
      "Session reutiliza conexões TCP"
    ],
    "alerts": []
  },
  {
    "slug": "httpx-async",
    "section": "testes-web",
    "title": "httpx: alternativa moderna",
    "difficulty": "intermediario",
    "subtitle": "API igual ao requests, mas com async.",
    "intro": "httpx é compatível com requests e suporta async/await nativamente. Padrão em códigos modernos.",
    "codes": [
      [
        "python",
        "import httpx, asyncio\n\nasync def baixar(url):\n    async with httpx.AsyncClient() as client:\n        r = await client.get(url)\n        return r.status_code, len(r.text)\n\nresultados = asyncio.run(\n    asyncio.gather(*[baixar(u) for u in urls])\n)"
      ]
    ],
    "points": [
      "API quase idêntica ao requests",
      "Suporte nativo a async",
      "Recomendado para código async"
    ],
    "alerts": []
  },
  {
    "slug": "beautifulsoup",
    "section": "testes-web",
    "title": "Web scraping com BeautifulSoup",
    "difficulty": "intermediario",
    "subtitle": "Extraindo dados de HTML.",
    "intro": "BeautifulSoup analisa HTML/XML e permite navegar/extrair com seletores simples.",
    "codes": [
      [
        "python",
        "import requests\nfrom bs4 import BeautifulSoup\n\nhtml = requests.get('https://news.ycombinator.com').text\nsoup = BeautifulSoup(html, 'html.parser')\n\nfor t in soup.select('span.titleline > a'):\n    print(t.get_text(), t['href'])"
      ]
    ],
    "points": [
      "select usa seletores CSS",
      "find/find_all para busca por tag",
      "Respeite robots.txt e rate limits"
    ],
    "alerts": [
      [
        "warning",
        "Scrapping pode violar termos de uso. Verifique robots.txt e limites."
      ]
    ]
  },
  {
    "slug": "selenium",
    "section": "testes-web",
    "title": "Automação de browser com Selenium",
    "difficulty": "avancado",
    "subtitle": "Quando o conteúdo precisa de JS.",
    "intro": "Para páginas que renderizam com JavaScript, requests/BeautifulSoup não bastam. Selenium controla um navegador real.",
    "codes": [
      [
        "python",
        "from selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\nd = webdriver.Chrome()\nd.get('https://example.com')\ntitulo = d.find_element(By.TAG_NAME, 'h1').text\nprint(titulo)\nd.quit()"
      ]
    ],
    "points": [
      "Pesado, mas funciona com qualquer site",
      "Considere Playwright (mais moderno)",
      "Use headless em produção"
    ],
    "alerts": []
  },
  {
    "slug": "playwright",
    "section": "testes-web",
    "title": "Playwright: scraping moderno",
    "difficulty": "avancado",
    "subtitle": "Alternativa moderna ao Selenium.",
    "intro": "Playwright (Microsoft) é mais rápido e tem API melhor que Selenium para automação de browser.",
    "codes": [
      [
        "python",
        "from playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n    page = browser.new_page()\n    page.goto('https://example.com')\n    print(page.title())\n    browser.close()"
      ]
    ],
    "points": [
      "Mais rápido e estável que Selenium",
      "Suporta async também",
      "Excelente para testes E2E"
    ],
    "alerts": []
  },
  {
    "slug": "websockets",
    "section": "testes-web",
    "title": "WebSockets em Python",
    "difficulty": "avancado",
    "subtitle": "Comunicação bidirecional em tempo real.",
    "intro": "WebSockets mantêm conexão aberta para troca contínua. A lib websockets é o padrão.",
    "codes": [
      [
        "python",
        "import asyncio, websockets\n\nasync def cliente():\n    async with websockets.connect('wss://echo.websocket.org') as ws:\n        await ws.send('oi')\n        resposta = await ws.recv()\n        print(resposta)\n\nasyncio.run(cliente())"
      ]
    ],
    "points": [
      "Útil para chats, dashboards, jogos",
      "FastAPI suporta WebSockets nativamente",
      "Considere SSE para casos só-server-pra-cliente"
    ],
    "alerts": []
  },
  {
    "slug": "fastapi",
    "section": "frameworks-web",
    "title": "FastAPI: APIs modernas",
    "difficulty": "intermediario",
    "subtitle": "O framework web mais moderno.",
    "intro": "FastAPI usa type hints para validação automática, gera docs OpenAPI, é assíncrono e muito rápido.",
    "codes": [
      [
        "python",
        "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    nome: str\n    preco: float\n\n@app.get('/')\ndef raiz():\n    return {'msg': 'olá'}\n\n@app.post('/itens')\ndef criar(item: Item):\n    return {'criado': item}\n\n# uvicorn main:app --reload"
      ]
    ],
    "points": [
      "Validação automática via Pydantic",
      "Docs em /docs (Swagger) e /redoc",
      "Performance excelente"
    ],
    "alerts": []
  },
  {
    "slug": "fastapi-rotas",
    "section": "frameworks-web",
    "title": "FastAPI: rotas e parâmetros",
    "difficulty": "intermediario",
    "subtitle": "Path params, query strings, headers.",
    "intro": "FastAPI infere o tipo de cada parâmetro e valida automaticamente.",
    "codes": [
      [
        "python",
        "from fastapi import FastAPI, Query, Header\n\napp = FastAPI()\n\n@app.get('/itens/{item_id}')\ndef ler(item_id: int, q: str | None = Query(None, max_length=50)):\n    return {'id': item_id, 'q': q}\n\n@app.get('/me')\ndef me(authorization: str = Header(...)):\n    return {'token': authorization[:8]}"
      ]
    ],
    "points": [
      "Path: na URL",
      "Query: depois de ?",
      "Header: cabeçalhos HTTP"
    ],
    "alerts": []
  },
  {
    "slug": "fastapi-deps",
    "section": "frameworks-web",
    "title": "Injeção de dependências no FastAPI",
    "difficulty": "avancado",
    "subtitle": "Compartilhando lógica entre rotas.",
    "intro": "Depends() permite injetar funções (autenticação, conexão de banco, etc.) em rotas.",
    "codes": [
      [
        "python",
        "from fastapi import FastAPI, Depends, HTTPException\n\napp = FastAPI()\n\ndef get_user(token: str):\n    if token != 'segredo':\n        raise HTTPException(401)\n    return {'nome': 'Ana'}\n\n@app.get('/me')\ndef me(user = Depends(get_user)):\n    return user"
      ]
    ],
    "points": [
      "Depends() injeta valores",
      "Pode aninhar dependências",
      "Excelente para auth e DB sessions"
    ],
    "alerts": []
  },
  {
    "slug": "flask",
    "section": "frameworks-web",
    "title": "Flask: micro-framework clássico",
    "difficulty": "intermediario",
    "subtitle": "Simples e flexível.",
    "intro": "Flask é minimalista. Você escolhe cada peça (ORM, validação, etc.). Ótimo para projetos pequenos.",
    "codes": [
      [
        "python",
        "from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\n@app.get('/')\ndef raiz():\n    return jsonify({'msg':'olá'})\n\n@app.post('/echo')\ndef echo():\n    return jsonify(request.get_json())\n\nif __name__ == '__main__':\n    app.run(debug=True)"
      ]
    ],
    "points": [
      "Mínimo e flexível",
      "Sem opinião — você escolhe",
      "FastAPI é mais moderno em geral"
    ],
    "alerts": []
  },
  {
    "slug": "django",
    "section": "frameworks-web",
    "title": "Django: o framework completo",
    "difficulty": "intermediario",
    "subtitle": "Batteries included.",
    "intro": "Django vem com ORM, admin, autenticação, migrations, formulários — tudo. Excelente para sites tradicionais.",
    "codes": [
      [
        "bash",
        "pip install django\ndjango-admin startproject meusite\ncd meusite\npython manage.py startapp blog\npython manage.py migrate\npython manage.py runserver"
      ]
    ],
    "points": [
      "ORM, admin e auth inclusos",
      "Excelente para sites com painel",
      "Django REST Framework para APIs"
    ],
    "alerts": []
  },
  {
    "slug": "django-models",
    "section": "frameworks-web",
    "title": "Django: models e ORM",
    "difficulty": "intermediario",
    "subtitle": "Modelagem de dados.",
    "intro": "Models do Django mapeiam classes para tabelas. Migrations geram SQL automaticamente.",
    "codes": [
      [
        "python",
        "# blog/models.py\nfrom django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    conteudo = models.TextField()\n    publicado_em = models.DateTimeField(auto_now_add=True)\n\n    def __str__(self): return self.titulo\n\n# manage.py makemigrations\n# manage.py migrate"
      ]
    ],
    "points": [
      "Migrations criam SQL automaticamente",
      "QuerySets são preguiçosos",
      "Use select_related/prefetch_related contra N+1"
    ],
    "alerts": []
  },
  {
    "slug": "sqlalchemy-orm",
    "section": "frameworks-web",
    "title": "SQLAlchemy: o ORM mais usado",
    "difficulty": "intermediario",
    "subtitle": "Funciona com qualquer framework.",
    "intro": "SQLAlchemy é o ORM Python mais maduro. Independe de framework, suporta SQL puro e mapeamento ORM.",
    "codes": [
      [
        "python",
        "from sqlalchemy import create_engine, String\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker\n\nclass Base(DeclarativeBase): pass\n\nclass Usuario(Base):\n    __tablename__ = 'usuarios'\n    id: Mapped[int] = mapped_column(primary_key=True)\n    nome: Mapped[str] = mapped_column(String(100))\n\nengine = create_engine('sqlite:///app.db')\nBase.metadata.create_all(engine)\n\nSession = sessionmaker(engine)\nwith Session() as s:\n    s.add(Usuario(nome='Ana'))\n    s.commit()"
      ]
    ],
    "points": [
      "SQLAlchemy 2.0 tem nova API tipada",
      "Funciona com FastAPI, Flask, etc.",
      "Considera Alembic para migrações"
    ],
    "alerts": []
  },
  {
    "slug": "sqlite",
    "section": "frameworks-web",
    "title": "SQLite com sqlite3",
    "difficulty": "iniciante",
    "subtitle": "Banco em arquivo, sem servidor.",
    "intro": "SQLite é um banco SQL completo armazenado em um único arquivo. Excelente para projetos pequenos e protótipos.",
    "codes": [
      [
        "python",
        "import sqlite3\n\nwith sqlite3.connect('dados.db') as conn:\n    conn.execute('CREATE TABLE IF NOT EXISTS pessoas (nome, idade)')\n    conn.execute('INSERT INTO pessoas VALUES (?, ?)', ('Ana', 30))\n    conn.commit()\n    for r in conn.execute('SELECT * FROM pessoas'):\n        print(r)"
      ]
    ],
    "points": [
      "Sem servidor — só arquivo",
      "Excelente para protótipos",
      "Use parâmetros (?) para evitar SQL injection"
    ],
    "alerts": []
  },
  {
    "slug": "postgresql",
    "section": "frameworks-web",
    "title": "PostgreSQL com psycopg",
    "difficulty": "intermediario",
    "subtitle": "Conectando ao Postgres.",
    "intro": "PostgreSQL é o banco relacional open source mais robusto. psycopg (v3) é o driver padrão.",
    "codes": [
      [
        "python",
        "import psycopg\n\nwith psycopg.connect('postgresql://user:pass@host/db') as conn:\n    with conn.cursor() as cur:\n        cur.execute('SELECT * FROM usuarios WHERE ativo = %s', (True,))\n        for r in cur.fetchall():\n            print(r)"
      ]
    ],
    "points": [
      "psycopg 3 é a versão atual",
      "Use parâmetros %s contra SQL injection",
      "Combine com SQLAlchemy para ORM"
    ],
    "alerts": []
  },
  {
    "slug": "redis-py",
    "section": "frameworks-web",
    "title": "Redis com Python",
    "difficulty": "intermediario",
    "subtitle": "Cache e filas em memória.",
    "intro": "Redis é um armazenamento chave-valor em memória extremamente rápido. Usado para cache, filas, pub/sub.",
    "codes": [
      [
        "python",
        "import redis\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\nr.set('chave','valor')\nr.expire('chave', 60)  # expira em 60s\nr.get('chave')\n\n# Fila simples\nr.rpush('fila','msg1')\nr.lpop('fila')"
      ]
    ],
    "points": [
      "Tudo em memória — ultra rápido",
      "Use para cache, sessions, filas",
      "decode_responses=True devolve strings"
    ],
    "alerts": []
  },
  {
    "slug": "mongodb",
    "section": "frameworks-web",
    "title": "MongoDB com pymongo",
    "difficulty": "intermediario",
    "subtitle": "NoSQL orientado a documentos.",
    "intro": "MongoDB armazena documentos JSON-like. pymongo é o driver oficial.",
    "codes": [
      [
        "python",
        "from pymongo import MongoClient\n\nclient = MongoClient('mongodb://localhost')\ndb = client.meubanco\nposts = db.posts\n\nposts.insert_one({'titulo':'Olá','tags':['py']})\nfor p in posts.find({'tags':'py'}):\n    print(p)"
      ]
    ],
    "points": [
      "Documentos = dicts Python",
      "Sem schema rígido",
      "Use índices para performance"
    ],
    "alerts": []
  },
  {
    "slug": "jinja2",
    "section": "frameworks-web",
    "title": "Templates com Jinja2",
    "difficulty": "intermediario",
    "subtitle": "Renderizando HTML server-side.",
    "intro": "Jinja2 é o motor de templates do Flask e padrão de fato. Sintaxe parecida com Django templates.",
    "codes": [
      [
        "python",
        "from jinja2 import Template\n\ntpl = Template('''\n<h1>{{ titulo }}</h1>\n<ul>\n{% for item in itens %}\n  <li>{{ item }}</li>\n{% endfor %}\n</ul>\n''')\nprint(tpl.render(titulo='Lista', itens=['a','b']))"
      ]
    ],
    "points": [
      "{{ }} para expressão, {% %} para bloco",
      "Suporta herança de templates",
      "Padrão do Flask"
    ],
    "alerts": []
  },
  {
    "slug": "autenticacao",
    "section": "frameworks-web",
    "title": "Autenticação: JWT e sessões",
    "difficulty": "avancado",
    "subtitle": "Login seguro em APIs.",
    "intro": "JWT (JSON Web Tokens) é o padrão para autenticação stateless em APIs. Use bibliotecas como PyJWT.",
    "codes": [
      [
        "python",
        "import jwt, datetime\n\nSEGREDO = 'mude-isto-em-prod'\n\ndef gerar_token(user_id):\n    payload = {\n        'sub': user_id,\n        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)\n    }\n    return jwt.encode(payload, SEGREDO, algorithm='HS256')\n\ndef validar(token):\n    return jwt.decode(token, SEGREDO, algorithms=['HS256'])"
      ]
    ],
    "points": [
      "Sessões: estado no servidor",
      "JWT: estado no token (stateless)",
      "Nunca armazene segredo no código!"
    ],
    "alerts": [
      [
        "danger",
        "Nunca commit segredos. Use variáveis de ambiente ou secret managers."
      ]
    ]
  },
  {
    "slug": "graphql",
    "section": "frameworks-web",
    "title": "GraphQL com Strawberry",
    "difficulty": "avancado",
    "subtitle": "API alternativa a REST.",
    "intro": "GraphQL permite que o cliente especifique exatamente quais campos quer. Strawberry é uma lib Python moderna.",
    "codes": [
      [
        "python",
        "import strawberry\n\n@strawberry.type\nclass Usuario:\n    id: int\n    nome: str\n\n@strawberry.type\nclass Query:\n    @strawberry.field\n    def usuario(self, id: int) -> Usuario:\n        return Usuario(id=id, nome='Ana')\n\nschema = strawberry.Schema(query=Query)"
      ]
    ],
    "points": [
      "Cliente escolhe campos",
      "Resolve N+1 com dataloaders",
      "Excelente para frontends complexos"
    ],
    "alerts": []
  },
  {
    "slug": "numpy-intro",
    "section": "data-ml",
    "title": "NumPy: arrays numéricos",
    "difficulty": "intermediario",
    "subtitle": "A base do ecossistema científico.",
    "intro": "NumPy traz arrays multidimensionais e operações vetorizadas em C. Essencial para ciência de dados.",
    "codes": [
      [
        "python",
        "import numpy as np\n\na = np.array([1,2,3,4])\nb = np.array([[1,2],[3,4]])\n\na * 2          # [2,4,6,8]\na.sum()        # 10\na.mean()       # 2.5\nb.shape        # (2,2)\nb.T            # transposta\n\nnp.zeros((3,3))\nnp.linspace(0, 1, 11)  # 0.0, 0.1, ..., 1.0"
      ]
    ],
    "points": [
      "Operações em arrays inteiros (vetorização)",
      "Muito mais rápido que loops Python",
      "Base para pandas, sklearn, etc."
    ],
    "alerts": []
  },
  {
    "slug": "numpy-broadcasting",
    "section": "data-ml",
    "title": "NumPy: broadcasting e indexação",
    "difficulty": "intermediario",
    "subtitle": "Operações entre shapes diferentes.",
    "intro": "Broadcasting permite operar entre arrays de tamanhos diferentes seguindo regras automáticas.",
    "codes": [
      [
        "python",
        "import numpy as np\n\nm = np.array([[1,2,3],[4,5,6]])\nm + np.array([10,20,30])   # broadcast\n# [[11,22,33],[14,25,36]]\n\n# Indexação avançada\nm[m > 3]                 # [4,5,6]\nm[:, 0]                  # primeira coluna\nm[0, :]                  # primeira linha"
      ]
    ],
    "points": [
      "Broadcasting evita loops",
      "Slicing e máscara booleana são poderosos",
      "Veja a documentação para regras completas"
    ],
    "alerts": []
  },
  {
    "slug": "pandas-intro",
    "section": "data-ml",
    "title": "pandas: DataFrames",
    "difficulty": "intermediario",
    "subtitle": "A planilha programática do Python.",
    "intro": "pandas oferece DataFrame e Series, estruturas tabulares com milhares de operações.",
    "codes": [
      [
        "python",
        "import pandas as pd\n\ndf = pd.read_csv('vendas.csv')\nprint(df.head())\nprint(df.info())\nprint(df.describe())\n\ndf['total'] = df['qtd'] * df['preco']\ndf[df['total'] > 100]\ndf.groupby('categoria')['total'].sum()\ndf.to_excel('saida.xlsx', index=False)"
      ]
    ],
    "points": [
      "DataFrame = tabela",
      "Series = coluna",
      "groupby/merge/pivot são essenciais"
    ],
    "alerts": []
  },
  {
    "slug": "pandas-limpeza",
    "section": "data-ml",
    "title": "pandas: limpeza de dados",
    "difficulty": "intermediario",
    "subtitle": "Tratando dados sujos do mundo real.",
    "intro": "A maior parte do tempo em data science é limpar dados. pandas tem ferramentas excelentes.",
    "codes": [
      [
        "python",
        "import pandas as pd\n\ndf.isna().sum()              # contar nulos\ndf.dropna()                  # remover linhas com nulo\ndf.fillna(0)                 # preencher\ndf['data'] = pd.to_datetime(df['data'])\ndf['preco'] = df['preco'].astype(float)\ndf.drop_duplicates()\n\n# Renomear\ndf.rename(columns={'old':'new'}, inplace=True)"
      ]
    ],
    "points": [
      "isna/fillna/dropna para nulos",
      "to_datetime/astype para tipos",
      "drop_duplicates remove duplicatas"
    ],
    "alerts": []
  },
  {
    "slug": "matplotlib",
    "section": "data-ml",
    "title": "matplotlib: gráficos",
    "difficulty": "intermediario",
    "subtitle": "Visualização clássica.",
    "intro": "matplotlib é a biblioteca de gráficos mais antiga e flexível. Base de muitas outras (seaborn, pandas plotting).",
    "codes": [
      [
        "python",
        "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 2*np.pi, 100)\nplt.plot(x, np.sin(x), label='sin')\nplt.plot(x, np.cos(x), label='cos')\nplt.title('Senoides')\nplt.xlabel('x'); plt.ylabel('y')\nplt.legend(); plt.grid()\nplt.savefig('plot.png', dpi=150)\nplt.show()"
      ]
    ],
    "points": [
      "pyplot é a interface mais usada",
      "Use savefig() para arquivo",
      "Combine com pandas: df.plot()"
    ],
    "alerts": []
  },
  {
    "slug": "seaborn",
    "section": "data-ml",
    "title": "seaborn: gráficos estatísticos",
    "difficulty": "intermediario",
    "subtitle": "Visualização bonita por padrão.",
    "intro": "seaborn fica em cima do matplotlib e gera visualizações estatísticas com pouca configuração.",
    "codes": [
      [
        "python",
        "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('tips')\nsns.histplot(df['total_bill'], kde=True)\nplt.show()\n\nsns.scatterplot(data=df, x='total_bill', y='tip', hue='time')\nplt.show()"
      ]
    ],
    "points": [
      "Visuais bonitos por padrão",
      "Excelente para análise exploratória",
      "Bom para boxplot, violin, heatmap"
    ],
    "alerts": []
  },
  {
    "slug": "plotly",
    "section": "data-ml",
    "title": "plotly: gráficos interativos",
    "difficulty": "intermediario",
    "subtitle": "Visualizações interativas para web.",
    "intro": "plotly gera gráficos interativos (HTML/JS). Excelente para dashboards e relatórios web.",
    "codes": [
      [
        "python",
        "import plotly.express as px\n\ndf = px.data.iris()\nfig = px.scatter(df, x='sepal_width', y='sepal_length',\n                 color='species', size='petal_length')\nfig.write_html('plot.html')\nfig.show()"
      ]
    ],
    "points": [
      "Saída HTML interativa",
      "px (express) é a API rápida",
      "Ótimo para dashboards"
    ],
    "alerts": []
  },
  {
    "slug": "jupyter",
    "section": "data-ml",
    "title": "Jupyter Notebooks",
    "difficulty": "intermediario",
    "subtitle": "Ambiente interativo para análise.",
    "intro": "Notebooks combinam código, visualizações e texto. Padrão em data science.",
    "codes": [
      [
        "bash",
        "pip install jupyterlab\njupyter lab\n\n# Ou só notebook clássico\njupyter notebook"
      ]
    ],
    "points": [
      "Células de código + markdown",
      "Excelente para exploração",
      "Para produção, exporte para .py"
    ],
    "alerts": []
  },
  {
    "slug": "scikit-intro",
    "section": "data-ml",
    "title": "scikit-learn: ML clássico",
    "difficulty": "avancado",
    "subtitle": "A biblioteca de machine learning padrão.",
    "intro": "scikit-learn cobre ML clássico (regressão, classificação, clustering). API consistente: fit/predict.",
    "codes": [
      [
        "python",
        "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nXtr, Xts, ytr, yts = train_test_split(X, y, random_state=42)\n\nm = RandomForestClassifier()\nm.fit(Xtr, ytr)\npred = m.predict(Xts)\nprint(accuracy_score(yts, pred))"
      ]
    ],
    "points": [
      "API consistente: fit/predict",
      "Excelente documentação",
      "Pipelines combinam preprocess + model"
    ],
    "alerts": []
  },
  {
    "slug": "regressao",
    "section": "data-ml",
    "title": "Regressão linear",
    "difficulty": "avancado",
    "subtitle": "Modelo mais básico de ML.",
    "intro": "Regressão linear ajusta uma reta (ou hiperplano) aos dados. Base de muitos modelos.",
    "codes": [
      [
        "python",
        "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[1],[2],[3],[4],[5]])\ny = np.array([2, 4, 6, 8, 10])\n\nm = LinearRegression().fit(X, y)\nprint(m.coef_, m.intercept_)\nprint(m.predict([[6]]))"
      ]
    ],
    "points": [
      "Bom baseline",
      "Sensível a outliers",
      "Requer features escaladas"
    ],
    "alerts": []
  },
  {
    "slug": "classificacao",
    "section": "data-ml",
    "title": "Classificação",
    "difficulty": "avancado",
    "subtitle": "Prever categorias.",
    "intro": "Classificação prevê uma categoria (spam/não-spam, etc.). Modelos comuns: regressão logística, árvores, SVM.",
    "codes": [
      [
        "python",
        "from sklearn.datasets import load_breast_cancer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.model_selection import cross_val_score\n\nX, y = load_breast_cancer(return_X_y=True)\npipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\nprint(cross_val_score(pipe, X, y, cv=5).mean())"
      ]
    ],
    "points": [
      "Métricas: accuracy, precision, recall, F1",
      "Use cross_val_score para validar",
      "Pipeline encapsula preprocess + model"
    ],
    "alerts": []
  },
  {
    "slug": "clustering",
    "section": "data-ml",
    "title": "Clustering: K-Means",
    "difficulty": "avancado",
    "subtitle": "Aprendizado não supervisionado.",
    "intro": "Clustering agrupa dados sem rótulos. K-Means é o algoritmo mais conhecido.",
    "codes": [
      [
        "python",
        "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.random.rand(100, 2)\nkm = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X)\nprint(km.labels_)\nprint(km.cluster_centers_)"
      ]
    ],
    "points": [
      "K-Means precisa do K (use elbow/silhouette)",
      "Sensível a escala",
      "DBSCAN para clusters de forma livre"
    ],
    "alerts": []
  },
  {
    "slug": "deep-learning",
    "section": "data-ml",
    "title": "Deep Learning: PyTorch",
    "difficulty": "avancado",
    "subtitle": "Redes neurais com PyTorch.",
    "intro": "PyTorch é o framework de deep learning mais popular. Pythônico e flexível.",
    "codes": [
      [
        "python",
        "import torch\nimport torch.nn as nn\n\nclass Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Sequential(\n            nn.Linear(784, 128), nn.ReLU(),\n            nn.Linear(128, 10)\n        )\n    def forward(self, x):\n        return self.fc(x)\n\nmodelo = Net()\nx = torch.randn(1, 784)\nprint(modelo(x).shape)"
      ]
    ],
    "points": [
      "PyTorch: pythônico, dinâmico",
      "TensorFlow é alternativa",
      "Hugging Face para NLP/LLMs"
    ],
    "alerts": []
  },
  {
    "slug": "llms-openai",
    "section": "data-ml",
    "title": "LLMs com a API OpenAI",
    "difficulty": "avancado",
    "subtitle": "Integrando GPT em aplicações.",
    "intro": "A biblioteca openai facilita chamadas a modelos como GPT-4. Use para chatbots, resumos, classificação.",
    "codes": [
      [
        "python",
        "from openai import OpenAI\nclient = OpenAI()\n\nresp = client.chat.completions.create(\n    model='gpt-4o-mini',\n    messages=[\n        {'role':'system','content':'Você responde em português.'},\n        {'role':'user','content':'O que é Python?'}\n    ]\n)\nprint(resp.choices[0].message.content)"
      ]
    ],
    "points": [
      "Chave de API via OPENAI_API_KEY",
      "Nunca commit a chave!",
      "Veja LangChain/LlamaIndex para fluxos complexos"
    ],
    "alerts": []
  },
  {
    "slug": "automacao-arquivos",
    "section": "automacao-perf",
    "title": "Automação: organizar arquivos",
    "difficulty": "intermediario",
    "subtitle": "Script para organizar Downloads.",
    "intro": "Um exemplo prático: mover arquivos de Downloads para pastas por extensão.",
    "codes": [
      [
        "python",
        "from pathlib import Path\nimport shutil\n\nDOWNLOADS = Path.home() / 'Downloads'\nMAPA = {'imagens':['.jpg','.png'], 'docs':['.pdf','.docx'], 'zip':['.zip','.rar']}\n\nfor arq in DOWNLOADS.iterdir():\n    if arq.is_file():\n        for pasta, exts in MAPA.items():\n            if arq.suffix.lower() in exts:\n                destino = DOWNLOADS / pasta\n                destino.mkdir(exist_ok=True)\n                shutil.move(str(arq), destino / arq.name)\n                break"
      ]
    ],
    "points": [
      "pathlib torna scripts assim simples",
      "shutil.move troca de pasta",
      "Cuidado: faça backup antes!"
    ],
    "alerts": []
  },
  {
    "slug": "automacao-excel",
    "section": "automacao-perf",
    "title": "Automação: Excel com openpyxl",
    "difficulty": "intermediario",
    "subtitle": "Lendo e escrevendo planilhas.",
    "intro": "openpyxl manipula .xlsx sem precisar do Excel instalado. Ótimo para relatórios automatizados.",
    "codes": [
      [
        "python",
        "from openpyxl import Workbook, load_workbook\n\nwb = Workbook()\nws = wb.active\nws['A1'] = 'Nome'\nws['B1'] = 'Idade'\nws.append(['Ana', 30])\nws.append(['Bia', 25])\nwb.save('dados.xlsx')\n\n# Ler\nwb = load_workbook('dados.xlsx')\nfor row in wb.active.iter_rows(values_only=True):\n    print(row)"
      ]
    ],
    "points": [
      "openpyxl é puro Python",
      "Para .xls antigos: xlrd",
      "pandas lê/escreve Excel também"
    ],
    "alerts": []
  },
  {
    "slug": "automacao-pdf",
    "section": "automacao-perf",
    "title": "Automação: PDFs",
    "difficulty": "intermediario",
    "subtitle": "Lendo e gerando PDFs.",
    "intro": "pypdf para ler/manipular, reportlab para gerar PDFs do zero.",
    "codes": [
      [
        "python",
        "from pypdf import PdfReader\n\nr = PdfReader('arquivo.pdf')\nprint(len(r.pages))\nprint(r.pages[0].extract_text())\n\n# Gerar\nfrom reportlab.pdfgen import canvas\nc = canvas.Canvas('saida.pdf')\nc.drawString(100, 750, 'Olá, PDF!')\nc.save()"
      ]
    ],
    "points": [
      "pypdf para extrair texto",
      "reportlab para gerar",
      "Para layout complexo, considere weasyprint (HTML→PDF)"
    ],
    "alerts": []
  },
  {
    "slug": "automacao-email",
    "section": "automacao-perf",
    "title": "Automação: enviando email",
    "difficulty": "intermediario",
    "subtitle": "smtplib e bibliotecas modernas.",
    "intro": "smtplib (stdlib) envia email via SMTP. Para serviços modernos, use APIs como SendGrid ou Resend.",
    "codes": [
      [
        "python",
        "import smtplib\nfrom email.message import EmailMessage\n\nmsg = EmailMessage()\nmsg['Subject'] = 'Teste'\nmsg['From'] = 'eu@exemplo.com'\nmsg['To'] = 'voce@exemplo.com'\nmsg.set_content('Olá do Python!')\n\nwith smtplib.SMTP_SSL('smtp.gmail.com', 465) as s:\n    s.login('eu@gmail.com', 'senha-de-app')\n    s.send_message(msg)"
      ]
    ],
    "points": [
      "Use senhas de app, nunca a real",
      "Para volume, prefira API (SendGrid, etc.)",
      "EmailMessage substitui MIME manual"
    ],
    "alerts": []
  },
  {
    "slug": "agendamento",
    "section": "automacao-perf",
    "title": "Agendamento de tarefas",
    "difficulty": "intermediario",
    "subtitle": "schedule e APScheduler.",
    "intro": "Para rodar tarefas periódicas dentro de um processo Python, use schedule (simples) ou APScheduler (robusto).",
    "codes": [
      [
        "python",
        "import schedule, time\n\ndef tarefa():\n    print('rodando!')\n\nschedule.every(10).minutes.do(tarefa)\nschedule.every().day.at('10:30').do(tarefa)\n\nwhile True:\n    schedule.run_pending()\n    time.sleep(1)"
      ]
    ],
    "points": [
      "schedule = simples",
      "APScheduler = mais features (cron, persistente)",
      "Para sistemas, considere cron ou Airflow"
    ],
    "alerts": []
  },
  {
    "slug": "regex",
    "section": "automacao-perf",
    "title": "Expressões regulares (re)",
    "difficulty": "intermediario",
    "subtitle": "Padrões de busca em texto.",
    "intro": "Regex é poderoso para busca/substituição em texto. Sintaxe densa, mas vale aprender.",
    "codes": [
      [
        "python",
        "import re\n\ntexto = 'Email: ana@x.com, bia@y.com'\nemails = re.findall(r'[\\w.]+@[\\w.]+', texto)\nprint(emails)\n\n# Substituir\nresultado = re.sub(r'\\d+', '#', 'tel: 12345')\n\n# Compilar para reuso\np = re.compile(r'^\\d{4}-\\d{2}-\\d{2}$')\np.match('2026-01-15')"
      ]
    ],
    "points": [
      "findall, search, match, sub são essenciais",
      "Use raw strings r'...'",
      "re.compile cacheia padrão"
    ],
    "alerts": []
  },
  {
    "slug": "performance-tips",
    "section": "automacao-perf",
    "title": "Performance: dicas práticas",
    "difficulty": "avancado",
    "subtitle": "Tornando Python mais rápido.",
    "intro": "Antes de otimizar, MEÇA. Use cProfile/timeit. Em geral: vetorize, evite loops Python sobre dados grandes.",
    "codes": [
      [
        "python",
        "import timeit\n\n# Comparar\nt1 = timeit.timeit('sum(range(1000))', number=10000)\nt2 = timeit.timeit('sum([i for i in range(1000)])', number=10000)\nprint(t1, t2)\n\n# Profile\nimport cProfile\ncProfile.run('minha_funcao()')"
      ]
    ],
    "points": [
      "Meça antes de otimizar",
      "Vetorize com NumPy",
      "list comprehension > loop+append"
    ],
    "alerts": []
  },
  {
    "slug": "cython-numba",
    "section": "automacao-perf",
    "title": "Cython e Numba",
    "difficulty": "avancado",
    "subtitle": "Acelerando hotspots de CPU.",
    "intro": "Para código Python crítico, Cython compila para C. Numba aplica JIT a NumPy.",
    "codes": [
      [
        "python",
        "# Numba: decorator + tipo\nfrom numba import njit\nimport numpy as np\n\n@njit\ndef soma_quadrados(arr):\n    s = 0.0\n    for x in arr:\n        s += x * x\n    return s\n\nsoma_quadrados(np.arange(10**6).astype(float))"
      ]
    ],
    "points": [
      "Numba: rapidíssimo, fácil de usar",
      "Cython: integra C, mais complexo",
      "Use só nos hotspots"
    ],
    "alerts": []
  },
  {
    "slug": "caching",
    "section": "automacao-perf",
    "title": "Caching: lru_cache e Redis",
    "difficulty": "intermediario",
    "subtitle": "Memoização para evitar recomputação.",
    "intro": "functools.lru_cache cacheia resultados de função. Para cache distribuído, use Redis.",
    "codes": [
      [
        "python",
        "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef pesado(n):\n    return sum(i*i for i in range(n))\n\npesado(10000)  # calcula\npesado(10000)  # cacheado, instantâneo"
      ]
    ],
    "points": [
      "lru_cache para cache em memória",
      "maxsize=None = ilimitado",
      "Argumentos devem ser hashable"
    ],
    "alerts": []
  },
  {
    "slug": "pep8",
    "section": "automacao-perf",
    "title": "PEP 8: estilo de código",
    "difficulty": "iniciante",
    "subtitle": "O guia de estilo oficial.",
    "intro": "PEP 8 é o guia oficial de estilo Python. Use ferramentas como ruff para garantir conformidade automaticamente.",
    "codes": [
      [
        "python",
        "# RUIM\ndef Calc( a , b ):return a+b\n\n# BOM (PEP 8)\ndef calc(a, b):\n    return a + b\n\n# 4 espaços, snake_case, espaços ao redor de operadores\n# Linhas <= 79 chars (em geral)"
      ]
    ],
    "points": [
      "snake_case para funções/variáveis",
      "PascalCase para classes",
      "ruff format ou black faz tudo automaticamente"
    ],
    "alerts": []
  },
  {
    "slug": "ruff-black",
    "section": "automacao-perf",
    "title": "Ferramentas: ruff, black, isort",
    "difficulty": "intermediario",
    "subtitle": "Linting e formatação automáticas.",
    "intro": "ruff (Rust) é linter+formatter ultra-rápido. Black formata sem opção, sem discussão.",
    "codes": [
      [
        "bash",
        "pip install ruff\n\nruff check .          # lint\nruff format .         # formatar (substitui black)\nruff check --fix .    # corrigir o que dá"
      ]
    ],
    "points": [
      "ruff substitui flake8 + isort + parte do pylint",
      "Configure em pyproject.toml",
      "Rode em pre-commit"
    ],
    "alerts": []
  },
  {
    "slug": "pre-commit",
    "section": "automacao-perf",
    "title": "pre-commit: hooks de qualidade",
    "difficulty": "intermediario",
    "subtitle": "Validações antes do commit.",
    "intro": "pre-commit roda checagens automaticamente antes de cada commit. Padroniza qualidade no time.",
    "codes": [
      [
        "yaml",
        "# .pre-commit-config.yaml\nrepos:\n  - repo: https://github.com/astral-sh/ruff-pre-commit\n    rev: v0.6.0\n    hooks:\n      - id: ruff\n      - id: ruff-format"
      ]
    ],
    "points": [
      "pre-commit install: ativa",
      "Roda só no que mudou",
      "Garante padrão no repositório"
    ],
    "alerts": []
  },
  {
    "slug": "security-basics",
    "section": "automacao-perf",
    "title": "Segurança básica",
    "difficulty": "avancado",
    "subtitle": "Pitfalls comuns e como evitar.",
    "intro": "Nunca commite segredos, sempre valide inputs, prefira parametrized queries, mantenha deps atualizadas.",
    "codes": [
      [
        "text",
        "Checklist:\n- Use python-dotenv ou variáveis de ambiente para segredos\n- Nunca use eval() ou exec() com input do usuário\n- Use parametrized queries (?, :name)\n- Atualize deps (pip-audit, dependabot)\n- Use bcrypt/argon2 para senhas, NUNCA md5/sha1\n- HTTPS sempre em produção"
      ]
    ],
    "points": [
      "Variáveis de ambiente para segredos",
      "bcrypt/argon2 para senhas",
      "Rode pip-audit regularmente"
    ],
    "alerts": [
      [
        "danger",
        "eval(input()) é uma das piores ideias possíveis. Nunca faça."
      ]
    ]
  },
  {
    "slug": "12-factor",
    "section": "automacao-perf",
    "title": "12-Factor App",
    "difficulty": "avancado",
    "subtitle": "Princípios para apps modernos.",
    "intro": "Os 12 fatores são princípios para construir apps escaláveis em nuvem. Vale para Python e qualquer linguagem.",
    "codes": [
      [
        "text",
        "Os 12 fatores:\n1. Codebase única\n2. Dependências explícitas\n3. Configurações no ambiente\n4. Backing services como recursos\n5. Build, release, run separados\n6. Processos stateless\n7. Port binding\n8. Concorrência por processos\n9. Disposability (start/stop rápidos)\n10. Dev/prod parity\n11. Logs como streams\n12. Admin tasks como processos one-off"
      ]
    ],
    "points": [
      "Configurações sempre no ambiente",
      "Apps stateless escalam horizontalmente",
      "Logs em stdout, não arquivo"
    ],
    "alerts": []
  },
  {
    "slug": "projeto-cli-todo",
    "section": "casos-apendice",
    "title": "Projeto: CLI de To-Do",
    "difficulty": "intermediario",
    "subtitle": "Construindo uma aplicação de linha de comando.",
    "intro": "Vamos juntar argparse, JSON e pathlib para criar uma to-do list em CLI.",
    "codes": [
      [
        "python",
        "import json, argparse\nfrom pathlib import Path\n\nARQ = Path('tarefas.json')\n\ndef carregar(): return json.loads(ARQ.read_text()) if ARQ.exists() else []\ndef salvar(d): ARQ.write_text(json.dumps(d, indent=2, ensure_ascii=False))\n\np = argparse.ArgumentParser()\nsub = p.add_subparsers(dest='cmd', required=True)\nsub.add_parser('listar')\nadd = sub.add_parser('add'); add.add_argument('texto')\nrem = sub.add_parser('rem'); rem.add_argument('id', type=int)\n\nargs = p.parse_args()\ntarefas = carregar()\nif args.cmd == 'listar':\n    for i, t in enumerate(tarefas): print(f'{i}: {t}')\nelif args.cmd == 'add':\n    tarefas.append(args.texto); salvar(tarefas)\nelif args.cmd == 'rem':\n    tarefas.pop(args.id); salvar(tarefas)"
      ]
    ],
    "points": [
      "Subcomandos com argparse",
      "JSON como persistência simples",
      "Base para evoluir com Click/Typer"
    ],
    "alerts": []
  },
  {
    "slug": "projeto-api-rest",
    "section": "casos-apendice",
    "title": "Projeto: API REST com FastAPI",
    "difficulty": "avancado",
    "subtitle": "Uma API completa de tarefas.",
    "intro": "Vamos juntar FastAPI + Pydantic + SQLite para uma API REST funcional.",
    "codes": [
      [
        "python",
        "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\nDB: dict[int, dict] = {}\nseq = 0\n\nclass TarefaIn(BaseModel):\n    titulo: str\n    feita: bool = False\n\n@app.get('/tarefas')\ndef listar(): return list(DB.values())\n\n@app.post('/tarefas', status_code=201)\ndef criar(t: TarefaIn):\n    global seq\n    seq += 1\n    DB[seq] = {'id': seq, **t.model_dump()}\n    return DB[seq]\n\n@app.delete('/tarefas/{id}', status_code=204)\ndef remover(id: int):\n    if id not in DB: raise HTTPException(404)\n    del DB[id]"
      ]
    ],
    "points": [
      "FastAPI + Pydantic = código curto e validado",
      "Próximo passo: SQLAlchemy",
      "uvicorn main:app --reload"
    ],
    "alerts": []
  },
  {
    "slug": "projeto-bot-discord",
    "section": "casos-apendice",
    "title": "Projeto: bot de Discord",
    "difficulty": "intermediario",
    "subtitle": "Bot simples com discord.py.",
    "intro": "discord.py permite criar bots facilmente. Você precisa de um token criado no Discord Developer Portal.",
    "codes": [
      [
        "python",
        "import discord, os\n\nclient = discord.Client(intents=discord.Intents.default())\n\n@client.event\nasync def on_ready():\n    print(f'logado como {client.user}')\n\n@client.event\nasync def on_message(msg):\n    if msg.author == client.user: return\n    if msg.content.startswith('!ping'):\n        await msg.channel.send('pong!')\n\nclient.run(os.environ['DISCORD_TOKEN'])"
      ]
    ],
    "points": [
      "Token vai em variável de ambiente",
      "Use intents apropriados",
      "Veja discord.ext.commands para CLIs ricas"
    ],
    "alerts": []
  },
  {
    "slug": "projeto-scraper",
    "section": "casos-apendice",
    "title": "Projeto: scraper de notícias",
    "difficulty": "intermediario",
    "subtitle": "Coletando manchetes do HN.",
    "intro": "Um scraper simples do Hacker News salvando em CSV.",
    "codes": [
      [
        "python",
        "import requests, csv\nfrom bs4 import BeautifulSoup\n\nhtml = requests.get('https://news.ycombinator.com', timeout=10).text\nsoup = BeautifulSoup(html, 'html.parser')\n\nlinhas = []\nfor t in soup.select('span.titleline > a'):\n    linhas.append({'titulo': t.get_text(), 'url': t['href']})\n\nwith open('hn.csv','w', newline='', encoding='utf-8') as f:\n    w = csv.DictWriter(f, fieldnames=['titulo','url'])\n    w.writeheader(); w.writerows(linhas)\n\nprint(f'{len(linhas)} manchetes salvas')"
      ]
    ],
    "points": [
      "Sempre verifique robots.txt e ToS",
      "Adicione User-Agent customizado",
      "Adicione delay entre requests"
    ],
    "alerts": []
  },
  {
    "slug": "projeto-dashboard",
    "section": "casos-apendice",
    "title": "Projeto: dashboard com Streamlit",
    "difficulty": "intermediario",
    "subtitle": "Interface web sem HTML.",
    "intro": "Streamlit transforma scripts Python em apps web interativos. Excelente para protótipos de data science.",
    "codes": [
      [
        "python",
        "# arquivo: app.py\nimport streamlit as st\nimport pandas as pd\n\nst.title('Dashboard de Vendas')\nuploaded = st.file_uploader('CSV de vendas')\nif uploaded:\n    df = pd.read_csv(uploaded)\n    st.write(df.describe())\n    st.bar_chart(df.groupby('categoria')['total'].sum())\n\n# rodar: streamlit run app.py"
      ]
    ],
    "points": [
      "Sem HTML/CSS necessários",
      "Excelente para protótipos",
      "Para produção real, FastAPI + frontend"
    ],
    "alerts": []
  },
  {
    "slug": "empacotando",
    "section": "casos-apendice",
    "title": "Empacotando: criar uma biblioteca",
    "difficulty": "avancado",
    "subtitle": "Distribuindo no PyPI.",
    "intro": "Crie um pyproject.toml, faça o build com 'build', publique com 'twine'.",
    "codes": [
      [
        "bash",
        "pip install build twine\n\n# pyproject.toml mínimo\n# [project]\n# name = 'meu-pacote'\n# version = '0.1.0'\n\npython -m build           # cria dist/\ntwine upload dist/*       # publica no PyPI"
      ]
    ],
    "points": [
      "pyproject.toml é o padrão moderno",
      "Use TestPyPI primeiro",
      "Versionamento semântico"
    ],
    "alerts": []
  },
  {
    "slug": "docker-python",
    "section": "casos-apendice",
    "title": "Docker para apps Python",
    "difficulty": "avancado",
    "subtitle": "Containerizando seu projeto.",
    "intro": "Docker garante que seu app rode igual em qualquer máquina. Multi-stage builds reduzem tamanho.",
    "codes": [
      [
        "dockerfile",
        "FROM python:3.12-slim AS base\nWORKDIR /app\n\nFROM base AS deps\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nFROM deps AS app\nCOPY . .\nCMD ['python', 'main.py']"
      ]
    ],
    "points": [
      "Use python:X-slim para imagem menor",
      "Multi-stage para builds reproduzíveis",
      "Não rode como root em prod"
    ],
    "alerts": []
  },
  {
    "slug": "ci-github-actions",
    "section": "casos-apendice",
    "title": "CI/CD com GitHub Actions",
    "difficulty": "avancado",
    "subtitle": "Testes automáticos em cada push.",
    "intro": "GitHub Actions roda jobs em cada push/PR. Defina em .github/workflows/.",
    "codes": [
      [
        "yaml",
        "# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with: { python-version: '3.12' }\n      - run: pip install -r requirements.txt pytest\n      - run: pytest"
      ]
    ],
    "points": [
      "Workflows em .github/workflows/",
      "Roda em push/PR/cron",
      "Use matrix para várias versões"
    ],
    "alerts": []
  },
  {
    "slug": "debugging",
    "section": "casos-apendice",
    "title": "Debugging com pdb e VS Code",
    "difficulty": "intermediario",
    "subtitle": "Encontrando bugs eficientemente.",
    "intro": "pdb é o debugger embutido. Em IDEs modernas, breakpoints visuais são mais práticos.",
    "codes": [
      [
        "python",
        "# Inserir breakpoint\nbreakpoint()  # Python 3.7+\n\n# Comandos do pdb:\n# n - next, s - step, c - continue\n# p var - print, l - list, q - quit"
      ]
    ],
    "points": [
      "breakpoint() é o método moderno",
      "Em VS Code: F5 para iniciar debug",
      "ipdb tem cores e autocomplete"
    ],
    "alerts": []
  },
  {
    "slug": "error-handling",
    "section": "casos-apendice",
    "title": "Tratamento robusto de erros",
    "difficulty": "intermediario",
    "subtitle": "Padrões para apps resilientes.",
    "intro": "Capture exceções específicas, registre logs, faça retry quando apropriado, falhe rápido em erros não-recuperáveis.",
    "codes": [
      [
        "python",
        "import logging, time\nlog = logging.getLogger(__name__)\n\ndef retry(n=3, delay=1):\n    def deco(f):\n        def wrapper(*args, **kwargs):\n            for tentativa in range(n):\n                try:\n                    return f(*args, **kwargs)\n                except Exception as e:\n                    log.warning(f'tentativa {tentativa+1} falhou: {e}')\n                    time.sleep(delay)\n            raise\n        return wrapper\n    return deco"
      ]
    ],
    "points": [
      "Capture específico, não genérico",
      "Loggue antes de re-raise",
      "Tenacity é uma lib madura para retry"
    ],
    "alerts": []
  },
  {
    "slug": "zen-python",
    "section": "casos-apendice",
    "title": "O Zen do Python",
    "difficulty": "iniciante",
    "subtitle": "import this — a filosofia do Python.",
    "intro": "Um conjunto de aforismos que guiam o design do Python. Veja com 'import this' no REPL.",
    "codes": [
      [
        "python",
        "# python -c 'import this'\n\n# Bonito é melhor que feio\n# Explícito é melhor que implícito\n# Simples é melhor que complexo\n# Legibilidade conta\n# Erros nunca devem passar silenciosos\n# Diante da ambiguidade, recuse a tentação de adivinhar\n# Deve haver um — e preferencialmente apenas um — modo óbvio de fazer"
      ]
    ],
    "points": [
      "Import this no REPL para ver tudo",
      "Guia o design da linguagem",
      "Vale internalizar para escrever código pythônico"
    ],
    "alerts": []
  },
  {
    "slug": "recursos",
    "section": "casos-apendice",
    "title": "Para continuar aprendendo",
    "difficulty": "iniciante",
    "subtitle": "Livros, sites e comunidades.",
    "intro": "Links e recursos para se aprofundar.",
    "codes": [
      [
        "text",
        "Documentação oficial: https://docs.python.org/pt-br/\nPython Brasil: https://python.org.br/\nReal Python: https://realpython.com/\nFull Stack Python: https://fullstackpython.com/\n\nLivros:\n- Fluent Python (Luciano Ramalho)\n- Python Cookbook (David Beazley)\n- Effective Python (Brett Slatkin)\n\nPodcasts:\n- Talk Python To Me\n- Real Python Podcast\n- Python Pizza"
      ]
    ],
    "points": [
      "Documentação oficial é EXCELENTE",
      "Real Python tem tutoriais profundos",
      "Fluent Python é leitura obrigatória"
    ],
    "alerts": []
  },
  {
    "slug": "glossario",
    "section": "casos-apendice",
    "title": "Glossário de termos",
    "difficulty": "iniciante",
    "subtitle": "Vocabulário essencial do Python.",
    "intro": "Termos que aparecem o tempo todo na documentação e comunidade.",
    "codes": [
      [
        "text",
        "CPython: implementação padrão (em C)\nPyPy: implementação JIT, mais rápida em alguns casos\nPEP: Python Enhancement Proposal\nGIL: Global Interpreter Lock\nDuck typing: 'se anda como pato e grasna como pato...'\nPythonic: idiomático, no estilo da linguagem\nIterable: tem __iter__\nIterator: tem __next__\nGenerator: função com yield\nDecorator: função que modifica outra\nCorrotina: função async\nCoroutine vs Task: corrotina executada vs agendada"
      ]
    ],
    "points": [
      "CPython é o padrão",
      "Pythonic = idiomático",
      "Duck typing é central"
    ],
    "alerts": []
  },
  {
    "slug": "proximos-passos",
    "section": "casos-apendice",
    "title": "Próximos passos",
    "difficulty": "iniciante",
    "subtitle": "Para onde ir depois deste livro.",
    "intro": "Você terminou o livro! Aqui estão sugestões para continuar.",
    "codes": [
      [
        "text",
        "Áreas para se aprofundar:\n1. Construa projetos reais (portfolio!)\n2. Contribua para open source (issues 'good first issue')\n3. Especialize-se: Web (FastAPI), Data (pandas/sklearn), DevOps (Ansible), AI (PyTorch)\n4. Estude algoritmos e estruturas de dados\n5. Aprenda SQL — toda app usa\n6. Pratique em desafios (Exercism, LeetCode, HackerRank)\n7. Leia código de bibliotecas que você usa\n\nE o mais importante: pratique. Muito."
      ]
    ],
    "points": [
      "Construa projetos reais",
      "Contribua para open source",
      "Pratique todos os dias"
    ],
    "alerts": [
      [
        "success",
        "Parabéns por chegar até aqui! O caminho do conhecimento é contínuo. Boa jornada Python!"
      ]
    ]
  }
];

export const chapterMap: Record<string, Chapter> = Object.fromEntries(
  chapters.map(c => [c.slug, c])
);

export function chapterIndex(slug: string): number {
  return chapters.findIndex(c => c.slug === slug);
}
