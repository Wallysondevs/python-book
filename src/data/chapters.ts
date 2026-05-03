// Aggregator — content lives in sections/<sectionId>.ts (one file per trail)
import type { Chapter, Section } from './types';
import { chapters as s0 } from './sections/boas-vindas';
import { chapters as s1 } from './sections/instalacao';
import { chapters as s2 } from './sections/sintaxe';
import { chapters as s3 } from './sections/controle';
import { chapters as s4 } from './sections/estruturas';
import { chapters as s5 } from './sections/funcoes';
import { chapters as s6 } from './sections/oop';
import { chapters as s7 } from './sections/modulos-erros';
import { chapters as s8 } from './sections/io-tipagem';
import { chapters as s9 } from './sections/testes-web';
import { chapters as s10 } from './sections/frameworks-web';
import { chapters as s11 } from './sections/data-ml';
import { chapters as s12 } from './sections/automacao-perf';
import { chapters as s13 } from './sections/casos-apendice';

export type { Chapter, Section, Difficulty, AlertType, CodeSample, AlertSpec } from './types';

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

export const chapters: Chapter[] = [...s0, ...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7, ...s8, ...s9, ...s10, ...s11, ...s12, ...s13];

export const chapterMap: Record<string, Chapter> = Object.fromEntries(
  chapters.map(c => [c.slug, c])
);

export function chapterIndex(slug: string): number {
  return chapters.findIndex(c => c.slug === slug);
}
