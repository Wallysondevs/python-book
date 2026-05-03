import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "projeto-cli-todo",
    section: "casos-apendice",
    title: "Projeto: CLI de To-Do",
    difficulty: "intermediario",
    subtitle: "Construindo uma aplicação de linha de comando.",
    intro: `Quase todo programador, em algum momento, escreve um app de tarefas. Não é por falta de criatividade: é porque um to-do tem tudo o que um projeto real tem em miniatura. Você precisa receber entrada do usuário, guardar dados em algum lugar, listar, atualizar, remover. É o "olá, mundo" das aplicações reais.

Aqui você vai construir uma CLI (command line interface), ou seja, um programinha que roda no terminal. Sem botões, sem janela bonita, só texto. Pode parecer pré-histórico, mas CLIs são poderosas: rodam em servidor, encaixam em scripts, são rápidas de usar para quem digita rápido.

Vamos usar a biblioteca padrão argparse para entender os comandos do usuário e um arquivo JSON para guardar as tarefas no disco. Nada de banco de dados ainda. O objetivo é você ver um projeto inteiro do começo ao fim e perceber que software é, na maior parte, juntar peças simples com cuidado.`,
    codes: [
      {
        lang: "bash",
        code: `# Primeiro, crie a pasta do projeto
mkdir todo-cli
cd todo-cli
# vamos ter só um arquivo Python por enquanto
touch todo.py`,
      },
      {
        lang: "python",
        code: `# todo.py — versão 1: só lista tarefas fixas
# Rodando: python todo.py
tarefas = ["Estudar Python", "Comprar pão", "Ligar para a Ana"]

for i, tarefa in enumerate(tarefas, start=1):
    # enumerate dá número e item ao mesmo tempo
    print(f"{i}. {tarefa}")`,
      },
      {
        lang: "python",
        code: `# todo.py — versão 2: salvando em JSON para não perder ao fechar
import json
from pathlib import Path

ARQUIVO = Path("tarefas.json")

def carregar() -> list[str]:
    # se o arquivo não existe, começamos com lista vazia
    if not ARQUIVO.exists():
        return []
    # json.loads transforma texto em estrutura Python
    return json.loads(ARQUIVO.read_text(encoding="utf-8"))

def salvar(tarefas: list[str]) -> None:
    # ensure_ascii=False mantém acentos legíveis no arquivo
    ARQUIVO.write_text(
        json.dumps(tarefas, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )`,
      },
      {
        lang: "python",
        code: `# todo.py — versão 3: aceitando comandos pela linha de comando
import argparse

parser = argparse.ArgumentParser(description="Gerencia sua lista de tarefas.")
sub = parser.add_subparsers(dest="comando", required=True)

# subcomando "add" recebe o texto da tarefa
p_add = sub.add_parser("add", help="Adiciona uma tarefa")
p_add.add_argument("texto", help="Descrição da tarefa")

# subcomando "list" não recebe nada
sub.add_parser("list", help="Lista todas as tarefas")

# subcomando "rm" recebe o número da tarefa
p_rm = sub.add_parser("rm", help="Remove tarefa pelo número")
p_rm.add_argument("numero", type=int)

args = parser.parse_args()
print(args)  # só para ver o que chegou`,
      },
      {
        lang: "python",
        code: `# todo.py — versão final, juntando tudo
import argparse, json
from pathlib import Path

ARQUIVO = Path("tarefas.json")

def carregar():
    return json.loads(ARQUIVO.read_text(encoding="utf-8")) if ARQUIVO.exists() else []

def salvar(tarefas):
    ARQUIVO.write_text(json.dumps(tarefas, ensure_ascii=False, indent=2), encoding="utf-8")

def cmd_add(args):
    tarefas = carregar()
    tarefas.append(args.texto)
    salvar(tarefas)
    print(f"Adicionada: {args.texto}")

def cmd_list(_):
    tarefas = carregar()
    if not tarefas:
        print("Nenhuma tarefa. Aproveite o dia!")
        return
    for i, t in enumerate(tarefas, start=1):
        print(f"{i}. {t}")

def cmd_rm(args):
    tarefas = carregar()
    # validação: número precisa existir
    if not 1 <= args.numero <= len(tarefas):
        print("Número inválido.")
        return
    removida = tarefas.pop(args.numero - 1)
    salvar(tarefas)
    print(f"Removida: {removida}")

def main():
    parser = argparse.ArgumentParser(prog="todo")
    sub = parser.add_subparsers(dest="comando", required=True)

    p_add = sub.add_parser("add"); p_add.add_argument("texto"); p_add.set_defaults(func=cmd_add)
    p_list = sub.add_parser("list"); p_list.set_defaults(func=cmd_list)
    p_rm = sub.add_parser("rm"); p_rm.add_argument("numero", type=int); p_rm.set_defaults(func=cmd_rm)

    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()`,
      },
      {
        lang: "bash",
        code: `# Usando o CLI no terminal
python todo.py add "Estudar Python"
python todo.py add "Pagar boleto"
python todo.py list
# 1. Estudar Python
# 2. Pagar boleto
python todo.py rm 1
python todo.py list
# 1. Pagar boleto`,
      },
    ],
    points: [
      "argparse evita você escrever sua própria lógica de parsing de argumentos.",
      "Subcomandos (add/list/rm) deixam a CLI parecida com git e pip.",
      "Salvar em JSON é simples e suficiente para projetos pequenos.",
      "Sempre passe encoding='utf-8' ao ler/escrever para evitar problema com acentos.",
      "Funções pequenas (cmd_add, cmd_list) facilitam testar e manter.",
      "if __name__ == '__main__' garante que o arquivo possa ser importado sem rodar o CLI.",
      "Erro comum: esquecer de validar o número antes de pop — o programa quebra com IndexError.",
      "Outro erro comum: salvar a lista direto sem ensure_ascii=False, o que vira sequências \\u00e1.",
    ],
    alerts: [
      { type: "tip", content: "Quando seu CLI crescer, troque argparse por typer ou click. Ambos dão autocomplete e sintaxe mais limpa, mas a ideia é a mesma." },
      { type: "warning", content: "JSON é ótimo até umas centenas de itens. Para milhares, prefira SQLite (que já vem com Python). Carregar tudo a cada comando fica lento." },
      { type: "info", content: "O bloco if __name__ == '__main__' permite importar funções deste arquivo em testes sem disparar a CLI inteira." },
    ],
  },
  {
    slug: "projeto-api-rest",
    section: "casos-apendice",
    title: "Projeto: API REST com FastAPI",
    difficulty: "avancado",
    subtitle: "Uma API completa de tarefas em Python.",
    intro: `Uma API REST é a maneira como dois programas conversam pela internet usando HTTP. O cliente (um app no celular, um site, outro servidor) faz uma requisição. O servidor responde com dados, normalmente em JSON. Se você já consumiu uma API, agora vai aprender o outro lado: oferecê-la.

Vamos usar FastAPI, um framework moderno que aproveita as type hints do Python. Você descreve o formato dos dados com classes Pydantic e o FastAPI cuida da validação, da documentação automática (em /docs), da serialização JSON. Você escreve menos código e ganha mais segurança.

O projeto vai expor uma API de tarefas: criar, listar, atualizar status, deletar. As mesmas operações do CRUD que toda aplicação faz. Por simplicidade, vamos guardar em memória — em um projeto real você plugaria SQLite, Postgres ou MongoDB. Foque na estrutura: rotas, modelos, status codes, tratamento de erro. O resto é detalhe.`,
    codes: [
      {
        lang: "bash",
        code: `# Crie um ambiente virtual e instale as dependências
python -m venv .venv
source .venv/bin/activate  # no Windows: .venv\\Scripts\\activate
pip install fastapi uvicorn[standard]`,
      },
      {
        lang: "python",
        code: `# main.py — primeira rota, só para testar
from fastapi import FastAPI

app = FastAPI(title="API de Tarefas")

@app.get("/")
def raiz():
    # GET / devolve um JSON simples
    return {"mensagem": "API no ar"}`,
      },
      {
        lang: "bash",
        code: `# Sobe o servidor com recarga automática
uvicorn main:app --reload
# Abra http://localhost:8000  → veja o JSON
# Abra http://localhost:8000/docs → documentação interativa pronta`,
      },
      {
        lang: "python",
        code: `# main.py — modelos de dados com Pydantic
from pydantic import BaseModel, Field
from typing import Optional

class TarefaIn(BaseModel):
    # o que o cliente envia ao criar
    titulo: str = Field(min_length=1, max_length=120)
    descricao: Optional[str] = None

class Tarefa(TarefaIn):
    # o que devolvemos: inclui id e estado
    id: int
    feita: bool = False`,
      },
      {
        lang: "python",
        code: `# main.py — CRUD completo de tarefas em memória
from fastapi import FastAPI, HTTPException, status

app = FastAPI(title="API de Tarefas")
tarefas: dict[int, Tarefa] = {}
proximo_id = 1

@app.post("/tarefas", response_model=Tarefa, status_code=status.HTTP_201_CREATED)
def criar(dados: TarefaIn):
    global proximo_id
    nova = Tarefa(id=proximo_id, **dados.model_dump())
    tarefas[proximo_id] = nova
    proximo_id += 1
    return nova

@app.get("/tarefas", response_model=list[Tarefa])
def listar():
    return list(tarefas.values())

@app.get("/tarefas/{tarefa_id}", response_model=Tarefa)
def obter(tarefa_id: int):
    if tarefa_id not in tarefas:
        # retornar 404 explicitamente, não 500
        raise HTTPException(404, detail="Tarefa não encontrada")
    return tarefas[tarefa_id]

@app.patch("/tarefas/{tarefa_id}/concluir", response_model=Tarefa)
def concluir(tarefa_id: int):
    if tarefa_id not in tarefas:
        raise HTTPException(404, detail="Tarefa não encontrada")
    tarefas[tarefa_id].feita = True
    return tarefas[tarefa_id]

@app.delete("/tarefas/{tarefa_id}", status_code=204)
def deletar(tarefa_id: int):
    if tarefas.pop(tarefa_id, None) is None:
        raise HTTPException(404, detail="Tarefa não encontrada")`,
      },
      {
        lang: "bash",
        code: `# Testando com curl
curl -X POST http://localhost:8000/tarefas \\
  -H "Content-Type: application/json" \\
  -d '{"titulo": "Estudar FastAPI"}'
# {"titulo":"Estudar FastAPI","descricao":null,"id":1,"feita":false}

curl http://localhost:8000/tarefas
curl -X PATCH http://localhost:8000/tarefas/1/concluir
curl -X DELETE http://localhost:8000/tarefas/1 -i  # -i mostra o status 204`,
      },
    ],
    points: [
      "FastAPI usa type hints para validar entrada e gerar /docs automaticamente.",
      "Pydantic separa modelos de entrada (sem id) e de saída (com id) — boa prática.",
      "Status codes importam: 201 ao criar, 204 ao deletar, 404 quando não acha.",
      "Use HTTPException, nunca retorne {'erro': ...} com status 200.",
      "uvicorn --reload é só para desenvolvimento; em produção use gunicorn ou uvicorn sem reload.",
      "Guardar em dicionário some quando o servidor reinicia — em produção use banco de dados.",
      "Erro comum: confundir POST (cria) com PUT (substitui inteiro) e PATCH (atualiza parcial).",
      "Outro erro comum: esquecer response_model e expor campos internos sem perceber.",
    ],
    alerts: [
      { type: "info", content: "FastAPI gera dois sites grátis para você: /docs (Swagger) e /redoc. Ambos leem suas type hints. Documentação que nunca desatualiza." },
      { type: "warning", content: "Variável global como o dicionário tarefas não funciona se você rodar com vários workers. Cada processo tem o seu. Em produção, banco de dados resolve." },
      { type: "danger", content: "Nunca exponha uma API pública sem autenticação. FastAPI tem suporte a OAuth2 e API keys; estude antes de publicar algo de verdade." },
      { type: "tip", content: "Use uv ou poetry para gerenciar dependências do projeto. Mantém o requirements travado e reproduzível em qualquer máquina." },
    ],
  },
  {
    slug: "projeto-bot-discord",
    section: "casos-apendice",
    title: "Projeto: bot de Discord",
    difficulty: "intermediario",
    subtitle: "Bot simples com discord.py.",
    intro: `Bots de Discord são programinhas que ficam logados num servidor como se fossem usuários, mas controlados por código. Eles podem responder comandos, mandar avisos, moderar canais, tocar música, mostrar memes — qualquer coisa que você programar.

Para o Python, a biblioteca mais usada é a discord.py. Ela cuida da conexão WebSocket com o Discord e expõe eventos (mensagem recebida, alguém entrou, reação adicionada) e comandos para você responder. Toda a parte chata de protocolo fica escondida.

Antes do código você precisa criar uma conta de bot no Developer Portal do Discord, copiar o token (uma senha longa) e convidar o bot para um servidor seu. Cuide bem desse token: quem tiver ele pode controlar o bot inteiro. Vamos guardar em variável de ambiente, nunca dentro do código. Bot pronto, código pronto, hora de brincar.`,
    codes: [
      {
        lang: "bash",
        code: `# Instale a biblioteca e o python-dotenv para ler .env
pip install -U discord.py python-dotenv

# Crie um arquivo .env (e nunca commite no git)
echo "DISCORD_TOKEN=cole_seu_token_aqui" > .env
echo ".env" >> .gitignore`,
      },
      {
        lang: "python",
        code: `# bot.py — esqueleto mínimo: conecta e avisa quando está pronto
import os, discord
from dotenv import load_dotenv

load_dotenv()  # carrega o .env para o ambiente
TOKEN = os.environ["DISCORD_TOKEN"]

intents = discord.Intents.default()
intents.message_content = True  # precisa para ler mensagens

bot = discord.Client(intents=intents)

@bot.event
async def on_ready():
    print(f"Conectado como {bot.user}")

bot.run(TOKEN)`,
      },
      {
        lang: "python",
        code: `# bot.py — respondendo a mensagens com "ping" → "pong"
@bot.event
async def on_message(msg: discord.Message):
    # ignora mensagens do próprio bot para evitar loop infinito
    if msg.author == bot.user:
        return
    if msg.content.lower() == "!ping":
        await msg.channel.send("pong")`,
      },
      {
        lang: "python",
        code: `# bot.py — usando o framework de comandos (mais limpo que on_message)
from discord.ext import commands

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.command(help="Mostra a latência do bot")
async def ping(ctx: commands.Context):
    # ctx.send envia no mesmo canal de onde veio o comando
    latencia_ms = round(bot.latency * 1000)
    await ctx.send(f"pong! {latencia_ms}ms")

@bot.command(help="Diz olá ao usuário")
async def ola(ctx: commands.Context):
    await ctx.send(f"Olá, {ctx.author.mention}!")`,
      },
      {
        lang: "python",
        code: `# bot.py — comando com argumento e tratamento de erro
@bot.command(help="Soma dois números: !somar 3 4")
async def somar(ctx, a: int, b: int):
    # discord.py converte os argumentos para int automaticamente
    await ctx.send(f"{a} + {b} = {a + b}")

@somar.error
async def somar_error(ctx, error):
    if isinstance(error, commands.BadArgument):
        await ctx.send("Use números inteiros: !somar 3 4")
    else:
        # outros erros sobem para o log para você investigar
        raise error`,
      },
      {
        lang: "bash",
        code: `# Rode o bot
python bot.py
# No Discord, em um canal onde o bot está:
# !ping       → pong! 42ms
# !ola        → Olá, @você!
# !somar 3 4  → 3 + 4 = 7`,
      },
    ],
    points: [
      "Token é senha. Nunca cole em código público; use .env e .gitignore.",
      "Intents controlam o que o bot pode ver. message_content é obrigatório para ler texto.",
      "commands.Bot é mais alto nível que Client e cuida de prefixo e parsing de argumentos.",
      "Tudo é assíncrono — sempre await em chamadas de envio de mensagem.",
      "Ignore mensagens do próprio bot, ou ele responderá a si mesmo em loop.",
      "Erros em comandos viram exceções; trate-as ou aparecem no terminal.",
      "Erro comum: esquecer de habilitar o intent message_content também no portal do Discord.",
      "Outro erro comum: rodar o bot em hospedagens grátis instáveis e perder a conexão sem perceber.",
    ],
    alerts: [
      { type: "danger", content: "Se você vazar o token no GitHub, qualquer pessoa pode controlar o bot. Revogue imediatamente no Developer Portal e gere um novo." },
      { type: "info", content: "discord.py voltou a ter manutenção ativa após uma pausa em 2021. Confirme que está usando uma versão >= 2.0." },
      { type: "tip", content: "Para hospedar o bot 24h, use serviços como Railway, Fly.io ou um VPS barato. Replit Free desliga o bot quando ninguém visita." },
    ],
  },
  {
    slug: "projeto-scraper",
    section: "casos-apendice",
    title: "Projeto: scraper de notícias",
    difficulty: "intermediario",
    subtitle: "Coletando manchetes do Hacker News.",
    intro: `Web scraping é o ato de baixar uma página da web e extrair dela só o que interessa. É útil quando o site não oferece API: você simula um navegador, baixa o HTML e usa código para achar os pedaços relevantes. Bem feito, vira coleta de dados; mal feito, vira dor de cabeça jurídica.

Vamos coletar as manchetes da capa do Hacker News, um agregador clássico de notícias de tecnologia. Ele tem HTML simples e estável, ideal para aprender. Usaremos requests para baixar a página e BeautifulSoup para navegar pela estrutura HTML.

A ideia geral do scraping é: 1) baixar a página, 2) abrir no navegador e usar o "inspecionar" para descobrir o seletor CSS de cada elemento, 3) traduzir esse seletor para código, 4) iterar e extrair. O HTML pode mudar a qualquer momento — então scraper bem escrito é defensivo: trata campos faltando, espera entre requisições e respeita o robots.txt do site.`,
    codes: [
      {
        lang: "bash",
        code: `# Instale as duas bibliotecas mais comuns para scraping
pip install requests beautifulsoup4`,
      },
      {
        lang: "python",
        code: `# scraper.py — baixando a página
import requests

URL = "https://news.ycombinator.com/"

# headers com User-Agent é educação (e alguns sites exigem)
HEADERS = {"User-Agent": "Mozilla/5.0 (estudo-scraping)"}

resp = requests.get(URL, headers=HEADERS, timeout=10)
resp.raise_for_status()  # erra se status >= 400
html = resp.text
print(html[:200])  # primeiros 200 chars só para conferir`,
      },
      {
        lang: "python",
        code: `# scraper.py — extraindo as manchetes
from bs4 import BeautifulSoup

sopa = BeautifulSoup(html, "html.parser")

# cada manchete está em <span class="titleline">
manchetes = sopa.select("span.titleline > a")

for i, link in enumerate(manchetes[:10], start=1):
    titulo = link.get_text(strip=True)
    href = link.get("href")
    print(f"{i}. {titulo}\\n   {href}\\n")`,
      },
      {
        lang: "python",
        code: `# scraper.py — versão com função e tratamento de erro
import requests
from bs4 import BeautifulSoup

def buscar_manchetes(quantidade: int = 10) -> list[dict]:
    resp = requests.get(URL, headers=HEADERS, timeout=10)
    resp.raise_for_status()
    sopa = BeautifulSoup(resp.text, "html.parser")
    itens = []
    for link in sopa.select("span.titleline > a")[:quantidade]:
        # .get evita KeyError se o href sumir um dia
        itens.append({
            "titulo": link.get_text(strip=True),
            "url": link.get("href", ""),
        })
    return itens

if __name__ == "__main__":
    for i, item in enumerate(buscar_manchetes(5), start=1):
        print(f"{i}. {item['titulo']}")`,
      },
      {
        lang: "python",
        code: `# scraper.py — salvando em CSV para análise depois
import csv
from datetime import datetime

manchetes = buscar_manchetes(30)

nome = f"hn_{datetime.now():%Y-%m-%d}.csv"
with open(nome, "w", newline="", encoding="utf-8") as f:
    escritor = csv.DictWriter(f, fieldnames=["titulo", "url"])
    escritor.writeheader()
    escritor.writerows(manchetes)

print(f"Salvas {len(manchetes)} manchetes em {nome}")`,
      },
      {
        lang: "python",
        code: `# scraper.py — sendo educado: pausa entre requisições
import time

paginas = ["https://news.ycombinator.com/", "https://news.ycombinator.com/news?p=2"]
todas = []

for url in paginas:
    resp = requests.get(url, headers=HEADERS, timeout=10)
    resp.raise_for_status()
    sopa = BeautifulSoup(resp.text, "html.parser")
    for link in sopa.select("span.titleline > a"):
        todas.append(link.get_text(strip=True))
    # esperar 1s evita martelar o servidor (e ser bloqueado)
    time.sleep(1)

print(f"Total coletado: {len(todas)} manchetes")`,
      },
    ],
    points: [
      "requests baixa o HTML; BeautifulSoup navega por ele.",
      "Use sempre timeout em requests para não travar o programa para sempre.",
      "raise_for_status() transforma 404/500 em exceção fácil de tratar.",
      "Inspecione o site no navegador para descobrir o seletor CSS certo.",
      "Sites mudam HTML sem aviso; faça extração defensiva (.get com default).",
      "Pause entre requisições. Site bom é site não derrubado.",
      "Erro comum: ignorar robots.txt e termos de uso — pode dar problema legal.",
      "Outro erro comum: usar scraping em sites com API oficial (mais lento e mais frágil).",
    ],
    alerts: [
      { type: "warning", content: "Confira sempre /robots.txt e os termos de uso. Alguns sites proíbem scraping. Respeite o limite de requisições por minuto." },
      { type: "info", content: "Sites com muito JavaScript (como Twitter) não funcionam só com requests. Para esses casos, use Playwright ou Selenium para simular um navegador real." },
      { type: "tip", content: "Para projetos sérios, use scrapy. Ele cuida de fila, retry, paralelismo e exporta para vários formatos. Vale a curva de aprendizado." },
      { type: "danger", content: "Não scrape dados pessoais sem base legal (LGPD). E nunca use scraping para repostar conteúdo protegido por direitos autorais." },
    ],
  },
  {
    slug: "projeto-dashboard",
    section: "casos-apendice",
    title: "Projeto: dashboard com Streamlit",
    difficulty: "intermediario",
    subtitle: "Interface web sem precisar escrever HTML.",
    intro: `Imagine que você tem uma planilha de vendas e quer mostrar gráficos para o seu chefe. Você poderia mandar um print, exportar PDF, ou aprender HTML/CSS/JavaScript para fazer um site. Streamlit oferece um caminho mais curto: você escreve Python normal e ele constrói um app web interativo automaticamente.

Cada vez que o usuário interage (mexe num slider, escolhe uma opção), o Streamlit roda o seu script de cima a baixo de novo, com os novos valores. Soa estranho mas é simples e suficiente para protótipos, ferramentas internas e dashboards.

Vamos construir um dashboard que lê um CSV de vendas, deixa o usuário filtrar por categoria e mostra métricas e gráficos. Sem JavaScript, sem framework de frontend. Você verá que com poucas dezenas de linhas dá para entregar algo bonito o bastante para reunião.`,
    codes: [
      {
        lang: "bash",
        code: `# Instale o streamlit e o pandas
pip install streamlit pandas
# Para rodar (já no app.py):
# streamlit run app.py
# Abre uma aba no navegador automaticamente.`,
      },
      {
        lang: "python",
        code: `# app.py — primeiro app: olá mundo + interação
import streamlit as st

st.title("Meu primeiro dashboard")
st.write("Bem-vindo!")

nome = st.text_input("Qual seu nome?")
if nome:
    st.success(f"Olá, {nome}!")`,
      },
      {
        lang: "python",
        code: `# app.py — preparando dados de exemplo
import pandas as pd

# DataFrame fictício de vendas
dados = pd.DataFrame({
    "data": pd.date_range("2024-01-01", periods=12, freq="MS"),
    "categoria": ["Eletrônicos", "Roupas", "Livros"] * 4,
    "valor": [1200, 800, 450, 1500, 900, 600, 1800, 1100, 700, 2000, 1300, 850],
})

st.dataframe(dados)  # tabela interativa pronta`,
      },
      {
        lang: "python",
        code: `# app.py — filtros na sidebar
st.sidebar.header("Filtros")

categorias = st.sidebar.multiselect(
    "Categorias",
    options=dados["categoria"].unique(),
    default=list(dados["categoria"].unique()),
)

# filtra o DataFrame conforme a seleção
filtrado = dados[dados["categoria"].isin(categorias)]
st.write(f"{len(filtrado)} linhas após filtros")`,
      },
      {
        lang: "python",
        code: `# app.py — métricas e gráficos
col1, col2, col3 = st.columns(3)
col1.metric("Total vendido", f"R$ {filtrado['valor'].sum():,.2f}")
col2.metric("Média por venda", f"R$ {filtrado['valor'].mean():,.2f}")
col3.metric("Maior venda", f"R$ {filtrado['valor'].max():,.2f}")

st.subheader("Vendas ao longo do tempo")
serie = filtrado.groupby("data")["valor"].sum()
st.line_chart(serie)

st.subheader("Vendas por categoria")
por_cat = filtrado.groupby("categoria")["valor"].sum()
st.bar_chart(por_cat)`,
      },
      {
        lang: "python",
        code: `# app.py — cache para não recarregar dados a cada interação
@st.cache_data
def carregar_csv(caminho: str) -> pd.DataFrame:
    # roda só uma vez por arquivo; nas próximas vezes devolve do cache
    return pd.read_csv(caminho, parse_dates=["data"])

arquivo = st.file_uploader("Carregue um CSV", type="csv")
if arquivo is not None:
    df = carregar_csv(arquivo)
    st.dataframe(df.head())`,
      },
    ],
    points: [
      "Streamlit roda o script inteiro a cada interação — pense em estado global, não em eventos.",
      "st.sidebar é o lugar natural para filtros e configurações.",
      "st.metric, st.dataframe, st.line_chart entregam visual decente sem esforço.",
      "Use @st.cache_data em funções caras (ler arquivos, chamar APIs) para não repetir.",
      "st.columns(n) divide a tela em colunas — ótimo para painéis de KPIs.",
      "Streamlit é perfeito para protótipos e ferramentas internas, não para sites de produção com milhões de usuários.",
      "Erro comum: mexer em variáveis globais entre execuções; use st.session_state.",
      "Outro erro comum: gráfico não atualiza porque você não está passando o DataFrame filtrado.",
    ],
    alerts: [
      { type: "tip", content: "Para deploy grátis e fácil, use Streamlit Community Cloud: você conecta o repositório do GitHub e em segundos seu app está no ar." },
      { type: "info", content: "Streamlit tem alternativas: Gradio (focada em ML), Dash (mais customizável) e Panel. Streamlit é a mais simples para começar." },
      { type: "warning", content: "Nunca coloque chaves de API direto no código de um app público. Use st.secrets para guardar credenciais com segurança." },
    ],
  },
  {
    slug: "empacotando",
    section: "casos-apendice",
    title: "Empacotando: criar uma biblioteca",
    difficulty: "avancado",
    subtitle: "Distribuindo seu código no PyPI.",
    intro: `Em algum momento você cria uma função tão útil que vai querer usá-la em vários projetos. Copiar e colar funciona até a terceira vez. Aí você empacota o código como uma biblioteca: outros projetos (e outras pessoas) instalam com pip e importam.

O Python tem um padrão moderno chamado pyproject.toml que descreve sua biblioteca: nome, versão, dependências, autor. Com isso e dois comandos você gera arquivos .whl e .tar.gz prontos para o PyPI, o repositório oficial onde mora todo pacote que você já instalou na vida.

Vamos criar uma biblioteca de exemplo chamada saudacoes que expõe uma função simples. Vamos publicar primeiro no TestPyPI (uma versão de testes do PyPI, perfeita para ensaios) e depois no PyPI de verdade. O processo é o mesmo de bibliotecas gigantes como requests ou pandas — você só está aprendendo o caminho oficial de virar autor de pacote Python.`,
    codes: [
      {
        lang: "bash",
        code: `# Estrutura mínima do projeto
saudacoes/
├── pyproject.toml
├── README.md
├── LICENSE
└── src/
    └── saudacoes/
        ├── __init__.py
        └── core.py`,
      },
      {
        lang: "python",
        code: `# src/saudacoes/core.py
def ola(nome: str = "mundo") -> str:
    """Devolve uma saudação amigável."""
    return f"Olá, {nome}!"

# src/saudacoes/__init__.py
from .core import ola
__all__ = ["ola"]
__version__ = "0.1.0"`,
      },
      {
        lang: "python",
        code: `# pyproject.toml — descrição completa do pacote
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "saudacoes"
version = "0.1.0"
description = "Saudações simples em português."
readme = "README.md"
requires-python = ">=3.10"
license = { file = "LICENSE" }
authors = [{ name = "Seu Nome", email = "voce@email.com" }]
keywords = ["saudacao", "exemplo"]
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]

[project.urls]
Homepage = "https://github.com/seuuser/saudacoes"`,
      },
      {
        lang: "bash",
        code: `# Instale as ferramentas oficiais de build/upload
pip install build twine

# Gera os arquivos em dist/ (.whl e .tar.gz)
python -m build

# Confere que os pacotes estão bem formados
twine check dist/*`,
      },
      {
        lang: "bash",
        code: `# Antes de publicar, instale localmente para testar
pip install -e .          # modo "editável": vê suas mudanças em tempo real
python -c "from saudacoes import ola; print(ola('Ana'))"
# Olá, Ana!`,
      },
      {
        lang: "bash",
        code: `# Publicação no TestPyPI (rascunho — sem afetar o PyPI real)
# Crie conta em https://test.pypi.org/ e gere um API token
twine upload --repository testpypi dist/*

# Para instalar de lá (em outra máquina, por exemplo):
pip install --index-url https://test.pypi.org/simple/ saudacoes

# Quando tiver certeza, publique no PyPI de verdade
twine upload dist/*`,
      },
      {
        lang: "python",
        code: `# Versionamento: ao subir uma versão nova, mude APENAS em um lugar
# pyproject.toml: version = "0.1.1"
# e __init__.py:  __version__ = "0.1.1"
# Depois: python -m build && twine upload dist/*

# Siga SemVer: MAJOR.MINOR.PATCH
# - PATCH (0.1.x): só correção de bug
# - MINOR (0.x.0): nova feature compatível
# - MAJOR (x.0.0): mudança que quebra código existente`,
      },
    ],
    points: [
      "pyproject.toml é o padrão atual; setup.py está obsoleto para projetos novos.",
      "src/ layout evita o erro clássico de testar a versão errada (a do diretório atual em vez da instalada).",
      "pip install -e . instala em modo editável — útil enquanto desenvolve.",
      "twine check pega problemas de metadados antes de subir.",
      "TestPyPI é seu ambiente de ensaio; use sempre antes do PyPI real.",
      "Versão publicada no PyPI é imutável — não dá para sobrescrever, só subir nova.",
      "Erro comum: nome do pacote já existir no PyPI; cheque antes de escolher.",
      "Outro erro comum: esquecer de atualizar a versão e o upload falhar com 'file already exists'.",
    ],
    alerts: [
      { type: "info", content: "API tokens substituem usuário/senha no PyPI. São mais seguros e podem ser limitados a um pacote específico. Configure em ~/.pypirc ou variáveis de ambiente." },
      { type: "warning", content: "Antes de escolher o nome, pesquise no PyPI. Nomes parecidos com pacotes famosos (typosquatting) são removidos sem aviso." },
      { type: "tip", content: "Use ferramentas modernas como hatch, poetry ou uv para automatizar build, versionamento e publicação. Salvam tempo." },
      { type: "danger", content: "Nunca commit seu API token no Git. Use GitHub Secrets se for publicar via CI/CD." },
    ],
  },
  {
    slug: "docker-python",
    section: "casos-apendice",
    title: "Docker para apps Python",
    difficulty: "avancado",
    subtitle: "Containerizando seu projeto.",
    intro: `Container é um pacote que carrega o seu código junto com tudo o que ele precisa para rodar: a versão exata do Python, as bibliotecas, os arquivos de configuração. O resultado é um app que roda igualzinho na sua máquina, na do colega e no servidor da nuvem. Docker é a ferramenta mais popular para criar e rodar containers.

Funciona assim: você escreve um arquivo chamado Dockerfile com a receita do ambiente. Docker lê essa receita e gera uma imagem (o template). A partir da imagem você cria containers (instâncias rodando). Imagine uma imagem como uma classe e um container como um objeto — a analogia não é perfeita mas ajuda no começo.

O grande ganho é parar de ouvir "na minha máquina funciona". Você empacota Python 3.11, FastAPI 0.110, suas variáveis de ambiente, e em qualquer lugar com Docker o app sobe igual. Em produção é praticamente padrão — Kubernetes, ECS, Cloud Run, todos rodam containers.`,
    codes: [
      {
        lang: "bash",
        code: `# Instale o Docker Desktop (Windows/macOS) ou docker-engine (Linux)
docker --version
# Docker version 24.x.x

# Estrutura do projeto que vamos containerizar
meu-app/
├── Dockerfile
├── requirements.txt
├── .dockerignore
└── app.py`,
      },
      {
        lang: "python",
        code: `# app.py — uma API simples com FastAPI para o exemplo
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def raiz():
    return {"status": "rodando dentro do container"}`,
      },
      {
        lang: "bash",
        code: `# requirements.txt — dependências do projeto
fastapi==0.110.0
uvicorn[standard]==0.27.0`,
      },
      {
        lang: "bash",
        code: `# .dockerignore — não copiar lixo para dentro da imagem
__pycache__
*.pyc
.venv/
.git/
.env
.pytest_cache/`,
      },
      {
        lang: "bash",
        code: `# Dockerfile — receita do ambiente
# 1. Imagem base oficial e leve do Python
FROM python:3.11-slim

# 2. Pasta de trabalho dentro do container
WORKDIR /app

# 3. Variáveis de ambiente boas para Python em container
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

# 4. Copie só requirements primeiro (camada cacheável)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Agora copie o código (muda mais frequentemente)
COPY . .

# 6. Porta que o app expõe (documentação)
EXPOSE 8000

# 7. Comando que roda quando o container inicia
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`,
      },
      {
        lang: "bash",
        code: `# Construir a imagem (a primeira vez demora; depois cacheia)
docker build -t meu-app:0.1 .

# Rodar um container, mapeando a porta 8000
docker run --rm -p 8000:8000 --name meu-app meu-app:0.1
# Acesse http://localhost:8000 no navegador

# Em outro terminal: ver containers rodando
docker ps

# Parar
docker stop meu-app`,
      },
      {
        lang: "bash",
        code: `# docker-compose.yml — para subir vários serviços juntos
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:senha@db/app
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=senha
      - POSTGRES_DB=app
    volumes:
      - dados-db:/var/lib/postgresql/data

volumes:
  dados-db:`,
      },
    ],
    points: [
      "Use imagens -slim ou -alpine para reduzir tamanho final.",
      "Copie requirements.txt antes do código para aproveitar cache de camadas.",
      "PYTHONUNBUFFERED=1 garante que prints apareçam em tempo real nos logs.",
      "EXPOSE é só documentação; quem mapeia a porta é a flag -p ao rodar.",
      "host 0.0.0.0 dentro do container expõe para fora; 127.0.0.1 fica preso.",
      "docker compose orquestra vários containers (app + banco + redis) com um arquivo só.",
      "Erro comum: copiar .git ou .venv para dentro da imagem — fica enorme. Use .dockerignore.",
      "Outro erro comum: rodar como root dentro do container; em produção crie usuário não-root.",
    ],
    alerts: [
      { type: "tip", content: "Use multi-stage builds para imagens menores: uma fase compila dependências e a final só copia o resultado. Pode reduzir 80% do tamanho." },
      { type: "warning", content: "Volumes persistem dados entre execuções. Sem volume, ao remover o container o banco esvazia. Configure direito em produção." },
      { type: "info", content: "Imagem do Docker Hub passa por scanners de segurança. Ainda assim, prefira imagens oficiais ou verificadas e mantenha a base atualizada." },
      { type: "danger", content: "Nunca coloque senha hardcoded no Dockerfile — qualquer um que acessar a imagem vê. Use variáveis de ambiente ou secrets." },
    ],
  },
  {
    slug: "ci-github-actions",
    section: "casos-apendice",
    title: "CI/CD com GitHub Actions",
    difficulty: "avancado",
    subtitle: "Testes automáticos em cada push.",
    intro: `CI significa "integração contínua" e CD significa "entrega contínua". Em prática: toda vez que você empurra código para o GitHub, um robô na nuvem baixa o repositório, instala as dependências, roda os testes e te avisa se algo quebrou. Se quiser, ele também publica a versão nova automaticamente.

Por que isso importa? Porque humanos esquecem. Você corrige um bug, sobe o código e meses depois descobre que essa correção quebrou outra coisa. Com CI rodando a cada commit, o erro aparece em minutos, ainda fresco na cabeça.

GitHub Actions é a ferramenta de CI/CD do próprio GitHub: gratuita para repositórios públicos, integrada na interface, configurada com arquivos YAML em .github/workflows/. Você descreve o que rodar, em quais sistemas operacionais, em quais versões. Vamos começar simples: rodar pytest em cada push e em cada pull request.`,
    codes: [
      {
        lang: "bash",
        code: `# Estrutura esperada pelo GitHub Actions
meu-projeto/
├── .github/
│   └── workflows/
│       └── ci.yml      ← arquivo do pipeline
├── src/
├── tests/
├── pyproject.toml
└── requirements.txt`,
      },
      {
        lang: "bash",
        code: `# .github/workflows/ci.yml — pipeline mínimo
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  testar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Instalar Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Instalar dependências
        run: |
          pip install -r requirements.txt
          pip install pytest

      - name: Rodar testes
        run: pytest -v`,
      },
      {
        lang: "bash",
        code: `# Versão com matriz: testa em várias versões do Python
jobs:
  testar:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.10", "3.11", "3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: \${{ matrix.python-version }}
      - run: pip install -r requirements.txt pytest
      - run: pytest`,
      },
      {
        lang: "bash",
        code: `# Adicionando lint, type-check e cobertura
      - name: Lint com ruff
        run: |
          pip install ruff
          ruff check .

      - name: Type check com mypy
        run: |
          pip install mypy
          mypy src

      - name: Cobertura
        run: |
          pip install pytest-cov
          pytest --cov=src --cov-report=xml`,
      },
      {
        lang: "bash",
        code: `# Cache de dependências para acelerar builds
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"
          cache-dependency-path: requirements.txt
      # primeira vez: ~40s; próximas: ~5s`,
      },
      {
        lang: "bash",
        code: `# CD: publicar no PyPI quando criar uma tag de release
name: Publicar

on:
  push:
    tags:
      - "v*"

jobs:
  publicar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install build twine
      - run: python -m build
      - run: twine upload dist/*
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: \${{ secrets.PYPI_TOKEN }}`,
      },
    ],
    points: [
      "Pipelines ficam em .github/workflows/ como arquivos YAML.",
      "on: define quando rodar (push, pull_request, schedule, tag).",
      "actions/checkout@v4 baixa o repositório dentro do runner.",
      "Use matrix para testar em várias versões de Python ao mesmo tempo.",
      "Cache de pip pode reduzir build de 40s para 5s.",
      "Secrets ficam em Settings > Secrets do repositório, nunca no YAML.",
      "Erro comum: usar a versão errada do action (sempre confira @v4 vs @v5).",
      "Outro erro comum: pipeline verde sem testar nada — confirme que pytest realmente coletou testes.",
    ],
    alerts: [
      { type: "tip", content: "Coloque um badge no README: ![CI](https://github.com/usuario/repo/actions/workflows/ci.yml/badge.svg). Mostra status verde/vermelho aos visitantes." },
      { type: "info", content: "GitHub Actions é grátis em repositórios públicos. Em privados, há cota de minutos por mês — mais que suficiente para projetos pequenos." },
      { type: "warning", content: "Não use \${{ secrets.X }} em código de pull request vindo de fork — secrets não são expostos por segurança, e o build vai falhar." },
      { type: "success", content: "CI bem montado é seguro de bagunçar — você sabe que se algo quebrar o pipeline avisa antes do deploy." },
    ],
  },
  {
    slug: "debugging",
    section: "casos-apendice",
    title: "Debugging com pdb e VS Code",
    difficulty: "intermediario",
    subtitle: "Encontrando bugs de forma eficiente.",
    intro: `Bug é normal. Todo programador escreve código que não funciona na primeira vez, todos os dias. O que diferencia gente experiente de iniciante não é não ter bug — é como caçar bug. E aí entra o debugging: a arte de pausar o programa, olhar variáveis, executar passo a passo, entender o que está acontecendo de verdade.

Muita gente debuga só com print. Funciona para casos simples, mas é lento: você adiciona print, roda, vê, edita, roda de novo. O debugger faz isso melhor: pausa onde você quiser, mostra todas as variáveis no escopo, deixa você executar uma linha, ir para próxima, entrar em uma função, voltar.

Python tem um debugger embutido chamado pdb (Python debugger). Você pode usá-lo no terminal puro, sem instalar nada. Para uma experiência visual mais agradável, o VS Code tem debugger gráfico ótimo. Vamos ver os dois — entendendo pdb você entende qualquer debugger gráfico, porque os comandos são os mesmos.`,
    codes: [
      {
        lang: "python",
        code: `# bug.py — código com um problema sutil
def media(numeros):
    total = 0
    for n in numeros:
        total += n
    return total / len(numeros)

resultado = media([10, 20, 30, []])  # quem colocou [] aí?
print(resultado)`,
      },
      {
        lang: "python",
        code: `# Inserindo um breakpoint com a função embutida (Python 3.7+)
def media(numeros):
    breakpoint()  # programa pausa aqui
    total = 0
    for n in numeros:
        total += n
    return total / len(numeros)

# Ao rodar: python bug.py
# (Pdb) entra em modo interativo`,
      },
      {
        lang: "bash",
        code: `# Comandos básicos do pdb (digite no prompt (Pdb))
n        # next: executa a linha atual e vai para a próxima
s        # step: entra na função chamada na linha atual
c        # continue: roda até o próximo breakpoint ou o fim
l        # list: mostra o código ao redor da linha atual
p var    # print: mostra o valor de var
pp obj   # pretty print: imprime estruturas grandes formatadas
w        # where: mostra a pilha de chamadas
q        # quit: sai do debugger
h        # help: lista todos os comandos`,
      },
      {
        lang: "python",
        code: `# Sessão típica de debugging
# (Pdb) p numeros
# [10, 20, 30, []]
# (Pdb) n
# > bug.py(4)media()
# (Pdb) p total
# 0
# (Pdb) n
# > bug.py(5)media()
# (Pdb) p n
# 10
# (Pdb) c   # continua até o próximo problema
# TypeError: unsupported operand type(s) for +=: 'int' and 'list'`,
      },
      {
        lang: "python",
        code: `# Breakpoint condicional: pausa só quando algo for verdade
def processar(itens):
    for i, item in enumerate(itens):
        # quebra só quando o item for problemático
        if not isinstance(item, (int, float)):
            breakpoint()
        soma = item * 2
        print(soma)

processar([1, 2, "três", 4])  # pausa quando chegar em "três"`,
      },
      {
        lang: "bash",
        code: `# .vscode/launch.json — configuração para o debugger gráfico
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: arquivo atual",
      "type": "debugpy",
      "request": "launch",
      "program": "\${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    }
  ]
}
# No VS Code: clique na margem para colocar breakpoint (bola vermelha)
# F5 inicia o debug, F10 next, F11 step in, Shift+F11 step out`,
      },
      {
        lang: "python",
        code: `# Truque: post-mortem — investiga a exceção depois que estourou
import pdb

try:
    media([10, 20, 30, []])
except Exception:
    pdb.post_mortem()  # entra no estado exato da exceção
# Agora p numeros, p total, etc — sem precisar rodar de novo`,
      },
    ],
    points: [
      "breakpoint() é a forma moderna de pausar; substitui import pdb; pdb.set_trace().",
      "n (next) executa linha atual; s (step) entra dentro da função chamada.",
      "p var imprime; pp var imprime estruturas grandes formatadas.",
      "Breakpoints condicionais economizam tempo em loops grandes.",
      "post_mortem investiga exceções já estouradas — sem precisar reproduzir.",
      "VS Code, PyCharm e Cursor têm debuggers gráficos; mesmos conceitos do pdb.",
      "Erro comum: deixar breakpoint() em código que vai para produção (trava esperando input!).",
      "Outro erro comum: depurar com print onde 5 minutos de pdb resolveriam mais rápido.",
    ],
    alerts: [
      { type: "tip", content: "Use ipdb (pip install ipdb) para um pdb com cores e autocomplete. A diferença na experiência é enorme." },
      { type: "warning", content: "Esqueceu um breakpoint() no código? Em CI o teste fica esperando input para sempre e estoura timeout. Configure ruff para alertar." },
      { type: "info", content: "Em produção, em vez de debugger use logging estruturado e ferramentas como Sentry. Pausa em produção quase nunca é uma opção." },
    ],
  },
  {
    slug: "error-handling",
    section: "casos-apendice",
    title: "Tratamento robusto de erros",
    difficulty: "intermediario",
    subtitle: "Padrões para apps que sobrevivem ao mundo real.",
    intro: `Software vive em um mundo bagunçado. A internet cai. O disco enche. O usuário digita texto onde se espera número. A API que você consome muda sem avisar. Código que ignora isso parece elegante mesmo num tutorial e quebra na primeira semana de produção.

Tratar erro não é encher o código de try/except em todo lugar. É decidir, com calma, o que pode dar errado, em qual camada cada erro deve ser tratado e o que fazer quando acontece: tentar de novo, devolver um padrão, registrar e seguir, ou parar tudo. As escolhas certas dependem do contexto, mas existem padrões que valem para quase todo projeto.

Vamos ver como capturar exceções específicas (e não Exception nu), criar exceções próprias, usar context managers, registrar com logging em vez de print, e implementar retry com backoff para chamadas instáveis. No fim, você terá um repertório que separa scripts de brincadeira de aplicações de verdade.`,
    codes: [
      {
        lang: "python",
        code: `# Ruim: capturar tudo apaga sintomas e esconde bugs reais
try:
    valor = int(input("Idade: "))
except Exception:  # ← cuidado!
    valor = 0
# Se o usuário apertar Ctrl+C, isso engole a interrupção também.

# Bom: capturar só o que você sabe tratar
try:
    valor = int(input("Idade: "))
except ValueError:
    print("Digite um número inteiro.")
    valor = None`,
      },
      {
        lang: "python",
        code: `# else e finally: cada um tem um papel
arquivo = None
try:
    arquivo = open("dados.txt", encoding="utf-8")
    conteudo = arquivo.read()
except FileNotFoundError:
    print("Arquivo não existe.")
    conteudo = ""
else:
    # roda só se NÃO houve exceção
    print(f"Lidos {len(conteudo)} caracteres")
finally:
    # roda sempre, mesmo com exceção
    if arquivo:
        arquivo.close()`,
      },
      {
        lang: "python",
        code: `# Melhor ainda: context manager (with) fecha sozinho
try:
    with open("dados.txt", encoding="utf-8") as f:
        conteudo = f.read()
except FileNotFoundError:
    conteudo = ""
# Não importa o que aconteça dentro do with, o arquivo fecha.`,
      },
      {
        lang: "python",
        code: `# Criando exceções próprias para erros do seu domínio
class SaldoInsuficienteError(Exception):
    """Lançada quando uma transação excede o saldo disponível."""

class Conta:
    def __init__(self, saldo: float):
        self.saldo = saldo

    def sacar(self, valor: float) -> None:
        if valor > self.saldo:
            raise SaldoInsuficienteError(
                f"Tentou sacar R$ {valor:.2f} com saldo R$ {self.saldo:.2f}"
            )
        self.saldo -= valor

try:
    Conta(100).sacar(150)
except SaldoInsuficienteError as e:
    print(f"Operação negada: {e}")`,
      },
      {
        lang: "python",
        code: `# logging em vez de print: ganha nível, timestamp, módulo
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger(__name__)

def dividir(a: float, b: float) -> float:
    try:
        return a / b
    except ZeroDivisionError:
        # exc_info=True inclui stacktrace no log
        log.error("Divisão por zero: a=%s b=%s", a, b, exc_info=True)
        return float("inf")`,
      },
      {
        lang: "python",
        code: `# Retry com backoff exponencial para chamadas instáveis
import time, random
import requests

def baixar_com_retry(url: str, tentativas: int = 4) -> str:
    espera = 1.0
    for tentativa in range(1, tentativas + 1):
        try:
            r = requests.get(url, timeout=5)
            r.raise_for_status()
            return r.text
        except requests.RequestException as e:
            if tentativa == tentativas:
                # esgotou; relança para quem chamou decidir
                raise
            log.warning("Tentativa %d falhou (%s). Esperando %.1fs", tentativa, e, espera)
            time.sleep(espera + random.random())  # jitter evita "rebanho"
            espera *= 2  # 1s, 2s, 4s, 8s...`,
      },
      {
        lang: "python",
        code: `# raise from: preserva a causa original ao traduzir um erro
class FalhaCarregamento(Exception):
    pass

def carregar_config(caminho: str) -> dict:
    try:
        with open(caminho) as f:
            return json.loads(f.read())
    except FileNotFoundError as e:
        # erro de domínio, mas mantém o original na cadeia
        raise FalhaCarregamento(f"Config {caminho} não existe") from e`,
      },
    ],
    points: [
      "Capture exceções específicas (ValueError, FileNotFoundError) em vez de Exception nu.",
      "with é o jeito mais seguro de garantir que recursos fechem.",
      "Crie exceções próprias para erros do seu domínio — facilitam capturar o caso certo.",
      "Use logging em vez de print: tem nível, timestamp e vai para arquivo.",
      "exc_info=True no log inclui o traceback completo, essencial para investigar depois.",
      "Retry com backoff exponencial + jitter é padrão para chamadas de rede.",
      "raise from preserva a causa original e ajuda muito no debug.",
      "Erro comum: engolir except sem logar nada — o bug some sem deixar rastro.",
    ],
    alerts: [
      { type: "danger", content: "Nunca capture KeyboardInterrupt ou SystemExit por acidente. Por isso evite except Exception sem motivo claro." },
      { type: "warning", content: "Retry sem limite vira loop infinito. Sempre defina máximo de tentativas e timeout em cada requisição." },
      { type: "tip", content: "Para retry, considere a biblioteca tenacity. Ela faz backoff, jitter e condições de parada com um decorador." },
      { type: "info", content: "Em produção, integre logging com Sentry ou Datadog. Você recebe alerta antes do usuário reclamar." },
    ],
  },
  {
    slug: "zen-python",
    section: "casos-apendice",
    title: "O Zen do Python",
    difficulty: "iniciante",
    subtitle: "import this — a filosofia da linguagem.",
    intro: `Em 1999, Tim Peters, um dos primeiros mantenedores do Python, escreveu vinte aforismos que resumem a filosofia da linguagem. Eles foram batizados de "The Zen of Python" e estão escondidos como um easter egg: digite import this no interpretador e os vinte princípios aparecem.

Não é regra rígida e nem dogma. São princípios que guiam decisões de design da linguagem e dos programadores que a escrevem. Coisas como "explícito é melhor que implícito" e "simples é melhor que complexo". Quando você entender o porquê de cada um, vai começar a escrever Python que parece Python — e não Java disfarçado, ou JavaScript com indentação.

Capítulo curto, mas importante. Vale ler com calma, parar em cada frase, pensar quando você já viu o oposto acontecer. Conforme você programa mais, eles vão deixando de ser frases bonitinhas e viram intuição: "isso aqui está ficando complicado demais, alguma coisa está errada".`,
    codes: [
      {
        lang: "python",
        code: `# Easter egg embutido em qualquer Python
import this
# The Zen of Python, by Tim Peters
#
# Beautiful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# ... e mais 16 frases`,
      },
      {
        lang: "python",
        code: `# "Explicit is better than implicit"
# Ruim: importação implícita esconde de onde vem cada coisa
from time import *
print(time())  # de onde veio time? Não fica óbvio.

# Bom: import explícito mostra a origem
import time
print(time.time())`,
      },
      {
        lang: "python",
        code: `# "Simple is better than complex"
# Ruim: comprehension aninhada que ninguém entende em 30s
matriz = [[1,2,3],[4,5,6]]
plano = [item for sub in matriz for item in sub if item % 2 == 0]

# Bom: dois passos simples
plano = []
for sub in matriz:
    for item in sub:
        if item % 2 == 0:
            plano.append(item)`,
      },
      {
        lang: "python",
        code: `# "Readability counts" + "There should be one obvious way"
# Ruim: condicional ternária encadeada
status = "ok" if idade >= 18 else "menor" if idade > 0 else "inválida"

# Bom: if/elif explícito é mais legível
if idade < 0:
    status = "inválida"
elif idade < 18:
    status = "menor"
else:
    status = "ok"`,
      },
      {
        lang: "python",
        code: `# "Errors should never pass silently. Unless explicitly silenced."
# Ruim: engole tudo
try:
    fazer_algo()
except:
    pass

# Bom: registra ou silencia conscientemente
try:
    fazer_algo()
except ValueError as e:
    log.warning("Valor inválido, ignorando: %s", e)`,
      },
      {
        lang: "python",
        code: `# "If the implementation is hard to explain, it's a bad idea"
# Quando você passa 10 minutos para explicar uma função
# para um colega, geralmente o problema é a função, não o colega.

# Reescreva. Quebre em funções menores. Renomeie variáveis.
# Código bom é código que se explica.`,
      },
    ],
    points: [
      "Bonito é melhor que feio — código tem estética.",
      "Explícito é melhor que implícito — leitor não deveria adivinhar.",
      "Simples é melhor que complexo — escolha a solução mais direta que resolve.",
      "Complexo é melhor que complicado — se precisar de complexidade, organize-a bem.",
      "Legibilidade conta — você lê código mais vezes do que escreve.",
      "Erros não devem passar silenciosamente — exceto se você silenciar de propósito.",
      "Casos especiais não são especiais o bastante para quebrar regras.",
      "Se é difícil explicar a implementação, provavelmente é uma má ideia.",
    ],
    alerts: [
      { type: "tip", content: "Releia o Zen depois de seis meses programando. Frases que pareciam óbvias vão ganhar significado novo." },
      { type: "info", content: "O Zen tem 20 frases conhecidas, mas Tim Peters disse que existe uma 21ª — nunca escrita. A piada é que cabe a cada programador descobrir a sua." },
      { type: "success", content: "Quando estiver em dúvida entre duas soluções, escolha a que respeita mais princípios do Zen. Quase nunca falha." },
    ],
  },
  {
    slug: "recursos",
    section: "casos-apendice",
    title: "Para continuar aprendendo",
    difficulty: "iniciante",
    subtitle: "Livros, sites, podcasts e comunidades.",
    intro: `Este livro foi um começo. A boa notícia é que existem ótimos materiais gratuitos e pagos para você continuar evoluindo. A má notícia é que existem materiais demais, e muito conteúdo ruim no meio. Saber escolher o que ler poupa meses.

A primeira regra é: programar é prática, não consumo de conteúdo. Ver vinte horas de aulas sem escrever código não te ensina. Escrever projetos pequenos, errar, voltar para a documentação, errar de novo — esse é o caminho. Use os recursos abaixo como referência e inspiração, não como uma lista a checar.

A segunda regra é: confie na documentação oficial. docs.python.org e a documentação das bibliotecas que você usa são quase sempre melhores que tutoriais aleatórios. Tutoriais ficam desatualizados; documentação oficial é mantida pelos próprios autores. Comece sempre por ela.`,
    codes: [
      {
        lang: "python",
        code: `# Documentação oficial — sempre o primeiro lugar
# https://docs.python.org/pt-br/3/   ← já tem em português
# https://docs.python.org/3/library/  ← biblioteca padrão
# https://peps.python.org/            ← propostas e padrões

# Dica: dentro do REPL você consulta direto
help(str.split)
help(list)`,
      },
      {
        lang: "python",
        code: `# Livros (em inglês, mas vale o esforço)
# - "Fluent Python" (Luciano Ramalho) — brasileiro, intermediário/avançado
# - "Python Crash Course" (Eric Matthes) — iniciante prático
# - "Effective Python" (Brett Slatkin) — 90 dicas de Python idiomático
# - "Architecture Patterns with Python" (Percival/Gregory) — projetos reais

# Em português:
# - "Introdução à Programação com Python" (Nilo Ney Coutinho Menezes)
# - Documentação oficial traduzida em docs.python.org/pt-br/`,
      },
      {
        lang: "python",
        code: `# Sites e cursos
# Real Python (realpython.com) — tutoriais excelentes, parte gratuita
# Python.org Beginner's Guide
# Awesome Python (github.com/vinta/awesome-python) — bibliotecas curadas
# Full Stack Python (fullstackpython.com) — visão de produção
# Python Brasil (python.org.br) — comunidade nacional`,
      },
      {
        lang: "python",
        code: `# Podcasts e canais
# - Talk Python To Me (podcast em inglês)
# - Python Bytes (podcast curto, semanal)
# - Real Python Podcast
# - Canal Eduardo Mendes (mendesreis) — em português, prático
# - Canal mtsouza — Python e ciência de dados em português`,
      },
      {
        lang: "python",
        code: `# Praticando
# - Exercism.io — exercícios com mentoria gratuita
# - HackerRank, LeetCode — problemas de algoritmo
# - Codewars — katas em vários níveis
# - Advent of Code — desafios anuais em dezembro

# Para projetos: contribua em open source
# Procure issues marcadas como "good first issue" no GitHub`,
      },
      {
        lang: "python",
        code: `# Comunidades
# - Python Brasil no Telegram (oficial)
# - Discord oficial do Python (em inglês)
# - r/learnpython no Reddit
# - Stack Overflow em português
# - Encontros locais: Python Brasil (conferência anual)
#   e PyLadies (mulheres na programação)`,
      },
    ],
    points: [
      "Documentação oficial é o primeiro recurso, não o último.",
      "Pratique escrevendo código, não só consumindo conteúdo.",
      "Tutoriais envelhecem rápido; sempre confira a data de publicação.",
      "Real Python e Fluent Python são duas referências quase universais.",
      "Comunidades em português ajudam muito quando o inglês trava você.",
      "Contribuir em open source ensina mais que cem tutoriais.",
      "Erro comum: comprar dez cursos e não terminar nenhum.",
      "Outro erro comum: aprender bibliotecas hype antes de dominar a biblioteca padrão.",
    ],
    alerts: [
      { type: "tip", content: "Marque uma meta semanal: terminar um capítulo, resolver dois exercícios, abrir uma issue. Pequeno e constante vence intenso e esporádico." },
      { type: "info", content: "ChatGPT, Claude e Copilot ajudam, mas não substituem entender o que você está escrevendo. Use como tutor que pergunta, não como autocompletar acerebral." },
      { type: "success", content: "Aprender em público — escrever um blog, postar no LinkedIn, contribuir em repositório — acelera muito a evolução." },
    ],
  },
  {
    slug: "glossario",
    section: "casos-apendice",
    title: "Glossário de termos",
    difficulty: "iniciante",
    subtitle: "Vocabulário essencial do Python.",
    intro: `Toda área tem seu jargão. Em programação, os termos vêm misturados em inglês, em português e em traduções tortas. Quando você está começando, metade da dificuldade não é o conceito — é decifrar o vocabulário. "Iterável", "mutável", "decorator", "comprehension"... soa difícil, mas cada um descreve uma ideia simples.

Este glossário reúne os termos que mais aparecem ao longo do livro e da sua jornada com Python. Não precisa decorar tudo de uma vez. Use como dicionário: quando bater em uma palavra desconhecida, volta aqui. Repetição faz o vocabulário grudar.

Os termos estão em ordem alfabética. Para cada um, uma definição curta e quando faz sentido um exemplo de código. A ideia é que você consiga ler documentação, posts de blog e respostas no Stack Overflow sem se perder. Vocabulário fluente é metade da batalha.`,
    codes: [
      {
        lang: "python",
        code: `# A — argumento, atributo
# Argumento: valor passado para uma função
def somar(a, b):  # a e b são parâmetros
    return a + b
somar(2, 3)       # 2 e 3 são argumentos

# Atributo: dado ou método ligado a um objeto
texto = "olá"
texto.upper()     # upper é um atributo (método) da str`,
      },
      {
        lang: "python",
        code: `# C — callable, comprehension, context manager
# Callable: qualquer coisa que pode ser chamada com ()
print(callable(len))      # True (função)
print(callable("oi"))     # False (string)

# Comprehension: forma curta de criar lista/dict/set
quadrados = [x*x for x in range(5)]
mapa = {x: x*x for x in range(5)}

# Context manager: objeto que funciona com "with"
with open("a.txt") as f:  # f é gerenciado automaticamente
    f.read()`,
      },
      {
        lang: "python",
        code: `# D — decorator, dict, dunder
# Decorator: função que modifica outra função
@staticmethod
def metodo(): pass

# Dict (dicionário): mapa chave → valor
pessoa = {"nome": "Ana", "idade": 30}

# Dunder: métodos com __ antes e depois (double underscore)
class Ponto:
    def __init__(self, x, y): self.x, self.y = x, y
    def __repr__(self): return f"Ponto({self.x},{self.y})"`,
      },
      {
        lang: "python",
        code: `# I — imutável, iterable, iterator
# Imutável: não muda depois de criado (str, tuple, int, frozenset)
s = "olá"
# s[0] = "O"  # TypeError

# Iterable: pode ser percorrido com for (list, str, dict, generator)
for c in "abc": pass

# Iterator: objeto que devolve um por vez via next()
it = iter([1, 2, 3])
print(next(it))  # 1`,
      },
      {
        lang: "python",
        code: `# L — lambda, list
# Lambda: função anônima de uma expressão
dobro = lambda x: x * 2

# List: sequência mutável
items = [1, 2, 3]
items.append(4)

# M — mutável, módulo
# Mutável: pode mudar depois de criado (list, dict, set)
# Módulo: arquivo .py que pode ser importado
import math  # módulo da biblioteca padrão`,
      },
      {
        lang: "python",
        code: `# P — pacote, PEP, PEP 8
# Pacote: pasta com __init__.py contendo módulos
# PEP: Python Enhancement Proposal — documento que propõe mudanças
# PEP 8: guia oficial de estilo de código

# S — slice, string, set
nums = [10, 20, 30, 40]
nums[1:3]  # slice → [20, 30]

s = {1, 2, 3}  # set: coleção sem repetição

# T — tuple, type hint
ponto = (3, 4)  # tuple imutável

def soma(a: int, b: int) -> int:  # type hints
    return a + b`,
      },
      {
        lang: "python",
        code: `# V — variável, virtual environment
# Variável: nome ligado a um valor
x = 10

# Virtual environment (venv): Python isolado por projeto
# python -m venv .venv
# source .venv/bin/activate

# Y — yield
# yield: torna uma função em generator
def contar(ate):
    for i in range(ate):
        yield i  # devolve um por vez, lembra de onde parou`,
      },
    ],
    points: [
      "Argumento é o valor passado; parâmetro é o nome na assinatura da função.",
      "Mutável muda no lugar (list, dict); imutável não (str, tuple, int).",
      "Iterable suporta for; iterator devolve um item por chamada de next().",
      "Decorator é função que recebe e devolve outra função.",
      "Dunder methods (__init__, __repr__) personalizam comportamento de objetos.",
      "Pacote é pasta com __init__.py; módulo é arquivo .py.",
      "venv isola dependências por projeto — fundamental para evitar conflitos.",
      "Erro comum: confundir tupla com lista — tupla não muda, lista muda.",
    ],
    alerts: [
      { type: "tip", content: "Quando bater em um termo novo na documentação, anote em um glossário pessoal. Em poucas semanas você terá um vocabulário sólido." },
      { type: "info", content: "Glossário oficial e completo está em docs.python.org/3/glossary.html. Vale a leitura para ver todos os termos." },
    ],
  },
  {
    slug: "proximos-passos",
    section: "casos-apendice",
    title: "Próximos passos",
    difficulty: "iniciante",
    subtitle: "Para onde ir depois deste livro.",
    intro: `Você chegou ao fim. Sério, parabéns — terminar um livro inteiro de programação é mais raro do que parece. A maioria das pessoas para no capítulo cinco. Você não.

Agora vem a parte interessante: decidir para onde ir. Python é uma linguagem extremamente versátil. As mesmas estruturas que você aprendeu (listas, funções, classes, async) servem para construir API, treinar modelo de IA, automatizar planilha, raspar site, fazer jogo, processar imagem. Você não precisa escolher um caminho só. Mas escolher um para começar evita ficar parado.

A regra de ouro daqui pra frente é: tenha sempre um projeto pessoal. Pode ser um bot que avisa quando o preço da passagem cai. Um script que renomeia suas fotos. Uma API para sua família. Não importa. Projeto é o que transforma quem leu sobre Python em quem programa em Python. Abaixo, sugestões de caminhos por área.`,
    codes: [
      {
        lang: "python",
        code: `# Caminho 1: backend e APIs
# Aprenda em ordem:
# 1. FastAPI a fundo (dependências, autenticação, background tasks)
# 2. SQLAlchemy ou SQLModel para banco de dados relacional
# 3. Alembic para migrations
# 4. pytest para testes
# 5. Docker e CI/CD (você já viu aqui)
# 6. Deploy em Railway, Fly.io ou AWS`,
      },
      {
        lang: "python",
        code: `# Caminho 2: ciência de dados
# 1. NumPy — arrays e operações vetorizadas
# 2. pandas — manipulação de tabelas
# 3. matplotlib + seaborn — gráficos
# 4. Jupyter notebooks — exploração interativa
# 5. scikit-learn — machine learning clássico
# 6. Kaggle — competições para praticar com dados reais`,
      },
      {
        lang: "python",
        code: `# Caminho 3: machine learning e IA
# 1. Fundamentos de estatística (média, desvio, distribuição)
# 2. scikit-learn (regressão, classificação, clustering)
# 3. PyTorch ou TensorFlow para deep learning
# 4. Hugging Face Transformers para NLP
# 5. LangChain ou similares para LLMs
# 6. Cursos: fast.ai (prático), Andrew Ng (teórico)`,
      },
      {
        lang: "python",
        code: `# Caminho 4: automação e scripts
# 1. pathlib, os, shutil — manipular arquivos
# 2. subprocess — chamar outros programas
# 3. schedule ou cron — rodar em horários
# 4. openpyxl, python-docx — Office
# 5. selenium ou playwright — automatizar navegador
# 6. APIs (Google, Notion, Trello) para integrar tudo`,
      },
      {
        lang: "python",
        code: `# Caminho 5: jogos e visual
# 1. pygame — jogos 2D simples
# 2. arcade — alternativa moderna
# 3. Pillow — manipulação de imagens
# 4. moviepy — edição de vídeo
# 5. manim — animações matemáticas (canal 3Blue1Brown usa)
# 6. blender Python API — modelagem 3D`,
      },
      {
        lang: "python",
        code: `# Hábitos que aceleram quem começa
# 1. Tenha um projeto pessoal sempre rodando.
# 2. Leia código de outras pessoas (clone uma lib pequena).
# 3. Escreva testes — força a entender o que você fez.
# 4. Use type hints — vai te poupar muitos bugs.
# 5. Aprenda git de verdade — não só add/commit/push.
# 6. Compartilhe o que aprende — blog, twitter, README.`,
      },
      {
        lang: "python",
        code: `# Mini-desafios para começar hoje
# - Reescreva um script da sua rotina (renomear, organizar pastas).
# - Faça uma API que devolva uma piada aleatória do seu acervo.
# - Crie um bot do Telegram que avisa quando algo acontece.
# - Construa um dashboard do seu gasto no banco com Streamlit.
# - Treine um modelo simples para prever algo (chuva, preço).

# Escolha um. Comece hoje. Termine em uma semana.`,
      },
    ],
    points: [
      "Escolha um caminho para começar — não tente tudo ao mesmo tempo.",
      "Ter projeto pessoal ativo é o que separa quem aprende de quem só estuda.",
      "Backend, dados, IA, automação, jogos: Python serve para todos.",
      "Aprofunde em git, testes e type hints independentemente do caminho.",
      "Leia código de outras pessoas; é o atalho que ninguém indica.",
      "Compartilhar aprendizado em público acelera muito.",
      "Erro comum: começar 10 projetos e terminar nenhum.",
      "Outro erro comum: estudar sem objetivo — defina algo concreto que você quer construir.",
    ],
    alerts: [
      { type: "success", content: "Terminar este livro já é uma vitória rara. Comemore, mas não pare aqui — escolha um projeto e comece amanhã, ainda em ritmo." },
      { type: "tip", content: "Coloque seus projetos no GitHub mesmo que estejam imperfeitos. Currículo de programador é o que está nos repositórios, não no PDF." },
      { type: "info", content: "Comunidade Python brasileira é acolhedora. Apareça em meetups, conferências e canais no Telegram. Networking acontece naturalmente quando você participa." },
    ],
  },
];
