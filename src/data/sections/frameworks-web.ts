import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "fastapi",
    section: "frameworks-web",
    title: "FastAPI: APIs modernas",
    difficulty: "intermediario",
    subtitle: "Construindo sua primeira API HTTP em Python.",
    intro: `Imagine que você tem uma lojinha online e o app do celular precisa pedir ao servidor a lista de produtos. Esse "pedir" e "responder" entre programas é o trabalho de uma API. O FastAPI é uma biblioteca que ajuda você a criar essas APIs de um jeito muito direto: você escreve uma função Python comum, marca com um decorador e o framework cuida do HTTP, da validação dos dados e até da documentação automática.

A graça do FastAPI é usar duas ideias modernas do Python: type hints e funções assíncronas. Você diz "essa rota recebe um número inteiro" anotando o tipo, e o framework valida sozinho. Se vier texto, ele já devolve um erro 422 educado, sem você escrever um if.

Outro ponto que encanta iniciantes: ao subir o servidor, abrir /docs no navegador mostra uma página interativa onde dá para testar cada rota. Isso acelera muito o aprendizado. Neste capítulo você vai instalar, criar a primeira rota e entender o ciclo "requisição → função → resposta JSON" que sustenta tudo o que vem nos próximos capítulos.`,
    codes: [
      {
        lang: "bash",
        code: `# instale o FastAPI e o servidor uvicorn
pip install fastapi uvicorn`,
      },
      {
        lang: "python",
        code: `# arquivo: main.py
from fastapi import FastAPI  # importa a classe principal

app = FastAPI()  # cria a aplicação

@app.get("/")  # rota GET na raiz
def ola():
    # tudo que você retornar vira JSON automaticamente
    return {"mensagem": "Olá, mundo!"}`,
      },
      {
        lang: "bash",
        code: `# rode o servidor com recarga automática
uvicorn main:app --reload
# abra http://127.0.0.1:8000 no navegador
# abra http://127.0.0.1:8000/docs para ver a doc interativa`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI

app = FastAPI(title="Loja API")

@app.get("/produtos")
def listar_produtos():
    # devolver uma lista também vira JSON
    return [
        {"id": 1, "nome": "Caneca", "preco": 25.0},
        {"id": 2, "nome": "Camiseta", "preco": 59.9},
    ]`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI
from pydantic import BaseModel  # para validar entrada

app = FastAPI()

class Produto(BaseModel):
    nome: str
    preco: float

@app.post("/produtos")
def criar(produto: Produto):
    # se vier JSON sem 'preco', o FastAPI já recusa com 422
    return {"ok": True, "criado": produto}`,
      },
      {
        lang: "python",
        code: `# rotas async funcionam quando você chama I/O (banco, rede)
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/lento")
async def lento():
    await asyncio.sleep(1)  # simula uma chamada externa
    return {"status": "pronto"}`,
      },
    ],
    points: [
      "FastAPI transforma funções Python em endpoints HTTP usando decoradores.",
      "Os retornos viram JSON automaticamente; não precisa chamar json.dumps.",
      "Type hints servem para validar e gerar documentação em /docs.",
      "Use uvicorn main:app --reload no desenvolvimento para recarregar a cada salvar.",
      "Armadilha: esquecer de instalar o uvicorn — sem ele o servidor não sobe.",
      "Armadilha: nomear o arquivo de fastapi.py confunde o import e quebra tudo.",
      "Use async def só quando for chamar algo de I/O com await.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Acesse /docs e /redoc no navegador para uma documentação pronta da sua API. É ótimo para testar sem instalar Postman.",
      },
      {
        type: "warning",
        content: "Não chame seu arquivo de fastapi.py. O Python tenta importar a si mesmo em vez do pacote real e você recebe um erro confuso.",
      },
      {
        type: "info",
        content: "FastAPI roda em cima do Starlette (web) e do Pydantic (validação). Ao aprender FastAPI, você ganha esses dois de bônus.",
      },
    ],
  },
  {
    slug: "fastapi-rotas",
    section: "frameworks-web",
    title: "FastAPI: rotas e parâmetros",
    difficulty: "intermediario",
    subtitle: "Path params, query strings e headers explicados.",
    intro: `Toda API recebe informação do cliente de jeitos diferentes. Às vezes o dado vem na URL ("/produtos/42"), às vezes vem depois do "?" como filtro ("/produtos?categoria=roupa"), às vezes está num cabeçalho HTTP escondido ("Authorization") e às vezes vem no corpo da requisição em JSON. Saber escolher qual usar é metade do trabalho de quem desenha APIs.

O FastAPI deixa essa escolha bem visual: o que aparece entre chaves no caminho vira parâmetro de função obrigatório; argumentos com valor padrão viram query string opcional; e tipos do Python (int, str, bool) já fazem a conversão. Se alguém pedir /produtos/abc esperando um inteiro, você nem precisa validar — o framework devolve 422 sozinho.

Neste capítulo você vai ver os quatro lugares de onde os dados podem vir e quando usar cada um. No fim, vai conseguir desenhar URLs limpas, com filtros opcionais, sem misturar tudo no corpo da requisição.`,
    codes: [
      {
        lang: "python",
        code: `from fastapi import FastAPI

app = FastAPI()

# path param: o {id} no caminho vira argumento da função
@app.get("/produtos/{id}")
def obter(id: int):  # int converte automaticamente
    return {"id": id, "nome": "Caneca"}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI

app = FastAPI()

# query string: argumentos com default viram ?categoria=...&pagina=...
@app.get("/produtos")
def listar(categoria: str | None = None, pagina: int = 1):
    return {"categoria": categoria, "pagina": pagina}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Header

app = FastAPI()

# Header lê um cabeçalho HTTP; o nome vira header com _ trocado por -
@app.get("/perfil")
def perfil(authorization: str | None = Header(default=None)):
    return {"token_recebido": authorization}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Pedido(BaseModel):
    cliente: str
    itens: list[int]

# corpo da requisição: vem como JSON e é validado pelo BaseModel
@app.post("/pedidos")
def criar(pedido: Pedido):
    return {"ok": True, "pedido": pedido}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Path, Query

app = FastAPI()

# Path/Query permitem regras extras (mínimo, máximo, regex)
@app.get("/itens/{id}")
def detalhe(
    id: int = Path(ge=1, description="ID positivo"),
    q: str | None = Query(default=None, max_length=20),
):
    return {"id": id, "q": q}`,
      },
    ],
    points: [
      "Path params: dados que identificam um recurso (ex.: /produtos/42).",
      "Query strings: filtros e paginação opcionais (ex.: ?pagina=2).",
      "Headers: metadados como Authorization, idioma, versão da API.",
      "Body: cargas grandes ou estruturadas, usadas em POST/PUT.",
      "Anote tipos sempre — é grátis e dá validação automática.",
      "Armadilha: usar POST com dados na URL em vez do corpo polui logs.",
      "Armadilha: nomes de header em Python usam _, mas no HTTP usam -.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Regra prática: o que identifica um recurso vai no caminho, o que filtra vai na query, o que cria/atualiza vai no corpo.",
      },
      {
        type: "warning",
        content: "Nunca coloque senhas ou tokens em query string. Eles ficam salvos no histórico do navegador e em logs do servidor.",
      },
      {
        type: "info",
        content: "Em Python 3.10+ você pode escrever str | None em vez de Optional[str]. O FastAPI entende as duas formas.",
      },
    ],
  },
  {
    slug: "fastapi-deps",
    section: "frameworks-web",
    title: "Injeção de dependências no FastAPI",
    difficulty: "avancado",
    subtitle: "Reaproveitando lógica entre rotas com Depends.",
    intro: `Conforme a API cresce, várias rotas precisam das mesmas coisas: uma conexão com o banco, o usuário logado, parâmetros de paginação, um cliente HTTP. Copiar esse código em cada função é cansativo e perigoso — uma mudança vira maratona. O FastAPI oferece uma solução elegante chamada injeção de dependências.

A ideia é simples: você escreve uma função normal que prepara o que a rota precisa e, na rota, declara essa função como parâmetro usando Depends(). O FastAPI executa a dependência antes da rota e entrega o resultado pronto. Se a dependência tiver yield, o que vem depois roda como "limpeza" — perfeito para fechar conexões.

Outro superpoder: dependências podem depender de outras dependências, formando uma cadeia clara. Isso facilita testes, porque você consegue trocar uma dependência por uma versão falsa em um teste sem mexer na rota. É a base para autenticação, controle de acesso e organização de projetos médios e grandes.`,
    codes: [
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends

app = FastAPI()

# dependência: função simples que devolve algo
def paginacao(pagina: int = 1, tamanho: int = 10):
    return {"pagina": pagina, "tamanho": tamanho}

@app.get("/produtos")
def listar(p: dict = Depends(paginacao)):
    return {"filtro": p}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends, HTTPException, Header

app = FastAPI()

# dependência que valida um token muito simples
def usuario_atual(authorization: str | None = Header(default=None)):
    if authorization != "Bearer secreto":
        raise HTTPException(status_code=401, detail="Token invalido")
    return {"id": 1, "nome": "Ana"}

@app.get("/me")
def me(usuario: dict = Depends(usuario_atual)):
    return usuario`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends

app = FastAPI()

# dependência com yield: tudo após o yield roda como cleanup
def get_db():
    db = {"conexao": "aberta"}
    try:
        yield db  # entrega para a rota
    finally:
        db["conexao"] = "fechada"  # roda mesmo se der erro

@app.get("/itens")
def itens(db: dict = Depends(get_db)):
    return {"db": db}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends

app = FastAPI()

def conexao():
    return "conn"

# dependências encadeadas: 'repo' depende de 'conexao'
def repo(conn: str = Depends(conexao)):
    return f"repo({conn})"

@app.get("/x")
def rota(r: str = Depends(repo)):
    return {"repo": r}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends

# dependência aplicada a TODAS as rotas do app
def log_request():
    print("nova requisicao")

app = FastAPI(dependencies=[Depends(log_request)])

@app.get("/a")
def a():
    return {"ok": "a"}

@app.get("/b")
def b():
    return {"ok": "b"}`,
      },
    ],
    points: [
      "Depends() injeta o resultado de uma função antes da rota rodar.",
      "Use yield em dependências que abrem recursos (banco, arquivos).",
      "Dependências podem chamar outras dependências, formando uma árvore.",
      "Você pode aplicar dependências globalmente em FastAPI(dependencies=[...]).",
      "Em testes, app.dependency_overrides troca dependências por versões falsas.",
      "Armadilha: lançar HTTPException dentro da dependência funciona — o framework intercepta.",
      "Armadilha: esquecer o try/finally num yield deixa conexões abertas em caso de erro.",
    ],
    alerts: [
      {
        type: "success",
        content: "Use dependências para isolar autenticação, conexão com banco e validações que se repetem. O código fica testável e limpo.",
      },
      {
        type: "warning",
        content: "Dependência cara (consulta lenta, chamada HTTP) roda em CADA requisição. Considere cache ou Depends de escopo de aplicação.",
      },
      {
        type: "tip",
        content: "Para sobrescrever dependências em testes, use app.dependency_overrides[get_db] = lambda: db_de_teste antes de chamar o cliente.",
      },
    ],
  },
  {
    slug: "flask",
    section: "frameworks-web",
    title: "Flask: micro-framework clássico",
    difficulty: "intermediario",
    subtitle: "Pequeno por fora, poderoso por dentro.",
    intro: `Antes do FastAPI ficar popular, o Flask era a porta de entrada de quase todo mundo no mundo web em Python. Ele se chama "micro" porque vem com pouca coisa de fábrica: roteador, template engine e pouco mais. Em vez de impor um jeito de fazer tudo, ele te entrega uma caixa de Lego e deixa você escolher banco, autenticação, ORM. Isso assusta no começo, mas vira uma vantagem quando o projeto cresce: você só carrega o que usa.

Mesmo sendo simples, o Flask continua moderno: ganhou suporte a tipos e a ecossistema gigantesco (Flask-Login, Flask-SQLAlchemy, Flask-Migrate). Muita empresa ainda mantém serviços inteiros em Flask por causa da estabilidade.

Neste capítulo você vai criar um app mínimo, entender rotas, parâmetros, retornos JSON, métodos HTTP e como o Flask se compara ao FastAPI. No fim, vai saber qual escolher dependendo do problema.`,
    codes: [
      {
        lang: "bash",
        code: `pip install flask`,
      },
      {
        lang: "python",
        code: `# arquivo: app.py
from flask import Flask

app = Flask(__name__)  # __name__ ajuda o Flask a achar arquivos

@app.get("/")
def home():
    return "Ola, mundo!"  # texto puro vira HTML`,
      },
      {
        lang: "bash",
        code: `# rode em modo desenvolvimento
flask --app app run --debug
# abra http://127.0.0.1:5000/`,
      },
      {
        lang: "python",
        code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/produtos")
def listar():
    # jsonify converte dict em resposta JSON com header correto
    return jsonify([
        {"id": 1, "nome": "Caneca"},
        {"id": 2, "nome": "Camiseta"},
    ])`,
      },
      {
        lang: "python",
        code: `from flask import Flask, request

app = Flask(__name__)

# path param e query string
@app.get("/produtos/<int:id>")
def detalhe(id):
    cor = request.args.get("cor", "branco")  # ?cor=preto
    return {"id": id, "cor": cor}`,
      },
      {
        lang: "python",
        code: `from flask import Flask, request

app = Flask(__name__)

@app.post("/pedidos")
def criar():
    dados = request.get_json()  # le o corpo JSON
    if not dados or "cliente" not in dados:
        return {"erro": "cliente obrigatorio"}, 400
    return {"ok": True, "pedido": dados}, 201`,
      },
    ],
    points: [
      "Flask é minimalista: você escolhe ORM, autenticação e estrutura.",
      "Decoradores como @app.get definem rotas; o retorno vira a resposta HTTP.",
      "request.args lê query string; request.get_json() lê o corpo.",
      "Para retornar status code, devolva uma tupla (corpo, status).",
      "FastAPI tende a ser melhor para APIs JSON; Flask brilha em apps híbridos com HTML.",
      "Armadilha: rodar app.run() em produção — use gunicorn/uwsgi atrás de um nginx.",
      "Armadilha: esquecer debug=False em produção expõe um console interativo perigoso.",
    ],
    alerts: [
      {
        type: "info",
        content: "Flask ganhou suporte oficial a async em rotas, mas não é o foco. Para muito I/O assíncrono o FastAPI ainda é mais natural.",
      },
      {
        type: "danger",
        content: "Nunca deixe debug=True em produção. O debugger do Werkzeug permite executar código no servidor a partir do navegador.",
      },
      {
        type: "tip",
        content: "Use Blueprints para dividir um app Flask grande em módulos (usuarios, produtos, admin), cada um com suas próprias rotas.",
      },
    ],
  },
  {
    slug: "django",
    section: "frameworks-web",
    title: "Django: o framework completo",
    difficulty: "intermediario",
    subtitle: "Tudo o que um site precisa, já incluso.",
    intro: `Se Flask é uma caixa de Lego, Django é uma casa pré-fabricada. Ele já vem com ORM, painel administrativo, sistema de autenticação, templates, formulários, migrações e até proteção contra CSRF. O lema oficial é "batteries included" — pilhas inclusas. Isso significa que você consegue colocar um site complexo no ar sem instalar dezenas de pacotes.

Em troca, Django impõe estrutura. Você cria um projeto, dentro dele aplicativos (apps), cada app tem models, views, URLs, templates. No começo parece muita pasta, mas essa organização é justamente o que faz Django escalar bem em equipe — qualquer dev sabe onde achar cada coisa.

Neste capítulo você vai instalar, criar um projeto, rodar o servidor de desenvolvimento, fazer as primeiras migrações e ver o admin no navegador. Os capítulos seguintes aprofundam em models e ORM.`,
    codes: [
      {
        lang: "bash",
        code: `pip install django

# cria um projeto chamado loja
django-admin startproject loja
cd loja

# cria um app dentro dele
python manage.py startapp produtos`,
      },
      {
        lang: "bash",
        code: `# cria/atualiza o banco com as tabelas do Django
python manage.py migrate

# cria um superusuário para o admin
python manage.py createsuperuser

# sobe o servidor
python manage.py runserver`,
      },
      {
        lang: "python",
        code: `# loja/produtos/views.py
from django.http import JsonResponse

def lista(request):
    # views são funções que recebem request e devolvem response
    return JsonResponse({"produtos": ["Caneca", "Camiseta"]})`,
      },
      {
        lang: "python",
        code: `# loja/produtos/urls.py
from django.urls import path
from .views import lista

urlpatterns = [
    path("", lista, name="produtos-lista"),
]`,
      },
      {
        lang: "python",
        code: `# loja/loja/urls.py — roteador principal do projeto
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),  # painel admin pronto
    path("produtos/", include("produtos.urls")),  # delega para o app
]`,
      },
      {
        lang: "python",
        code: `# loja/loja/settings.py — registre o app criado
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "produtos",  # seu app
]`,
      },
    ],
    points: [
      "Django já traz ORM, admin, autenticação, templates e migrações.",
      "Um projeto Django contém vários apps; cada app é um módulo coeso.",
      "URLs delegam de urls.py raiz para urls.py de cada app via include().",
      "Sempre rode migrate após criar/alterar models para atualizar o banco.",
      "O admin em /admin/ é uma vitrine: mostra a estrutura dos seus models.",
      "Armadilha: esquecer de adicionar o app em INSTALLED_APPS faz views nunca rodarem.",
      "Armadilha: deixar SECRET_KEY do settings versionada no Git é um risco grave.",
    ],
    alerts: [
      {
        type: "success",
        content: "O painel /admin gerado pelo Django economiza dias de trabalho. Para muitos projetos internos, ele basta como interface.",
      },
      {
        type: "warning",
        content: "Em produção, defina DEBUG = False e configure ALLOWED_HOSTS. Caso contrário, qualquer erro vaza detalhes do servidor.",
      },
      {
        type: "info",
        content: "Para APIs REST puras, o Django Rest Framework (DRF) é o complemento padrão. Ele se encaixa perfeitamente no Django.",
      },
    ],
  },
  {
    slug: "django-models",
    section: "frameworks-web",
    title: "Django: models e ORM",
    difficulty: "intermediario",
    subtitle: "Modelando dados sem escrever SQL.",
    intro: `Toda aplicação séria precisa guardar dados: produtos, usuários, pedidos. Em vez de você escrever CREATE TABLE e INSERT manualmente, o Django oferece um ORM (Object Relational Mapper). Você descreve seus dados como classes Python — chamadas models — e o Django gera tabelas, queries e até a tela de edição no admin.

Cada atributo da classe vira uma coluna no banco. Precisa de relação um-para-muitos? ForeignKey. Muitos-para-muitos? ManyToManyField. Quando você muda o model, roda makemigrations (que gera um arquivo de migração) e migrate (que aplica no banco). Esse fluxo deixa a evolução do schema rastreável e versionada.

Neste capítulo você vai criar dois models relacionados, gerar migrações, salvar e consultar dados usando o ORM. Vai ver que dá para fazer 90% das consultas em uma linha de Python idiomático, sem SQL.`,
    codes: [
      {
        lang: "python",
        code: `# produtos/models.py
from django.db import models

class Categoria(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)`,
      },
      {
        lang: "bash",
        code: `# gere o arquivo de migração e aplique no banco
python manage.py makemigrations
python manage.py migrate`,
      },
      {
        lang: "python",
        code: `# uso do ORM no shell: python manage.py shell
from produtos.models import Categoria, Produto

c = Categoria.objects.create(nome="Cozinha")
Produto.objects.create(nome="Caneca", preco="25.00", categoria=c)

# consultas básicas
Produto.objects.all()             # todos
Produto.objects.filter(preco__lt=50)  # preço < 50
Produto.objects.get(id=1)         # um único; erro se não existir`,
      },
      {
        lang: "python",
        code: `# atravessar relações com __ (dois underscores)
from produtos.models import Produto

# produtos cuja categoria se chama "Cozinha"
Produto.objects.filter(categoria__nome="Cozinha")

# ordenação e limite
Produto.objects.order_by("-preco")[:5]  # 5 mais caros`,
      },
      {
        lang: "python",
        code: `# produtos/admin.py — registre para aparecer no /admin
from django.contrib import admin
from .models import Produto, Categoria

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ("nome", "preco", "categoria")
    list_filter = ("categoria",)
    search_fields = ("nome",)

admin.site.register(Categoria)`,
      },
      {
        lang: "python",
        code: `# evite o problema N+1 com select_related/prefetch_related
from produtos.models import Produto

# RUIM: cada produto faz 1 query extra para buscar a categoria
for p in Produto.objects.all():
    print(p.categoria.nome)

# BOM: 1 única query com JOIN
for p in Produto.objects.select_related("categoria"):
    print(p.categoria.nome)`,
      },
    ],
    points: [
      "Models são classes Python que viram tabelas no banco.",
      "ForeignKey representa um-para-muitos; ManyToManyField, muitos-para-muitos.",
      "makemigrations gera o arquivo; migrate aplica no banco.",
      "Filter usa __ para atravessar relações e operadores (lt, gt, icontains).",
      "select_related/prefetch_related evitam o famoso problema N+1.",
      "Armadilha: alterar um model sem rodar makemigrations deixa o banco fora de sincronia.",
      "Armadilha: get() sem try/except quebra a view se o objeto não existir.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use Produto.objects.get_or_create() para evitar duplicatas. Ele devolve (objeto, criado_bool) e é atômico.",
      },
      {
        type: "warning",
        content: "Não apague arquivos de migração já aplicados em produção. Eles são o histórico do schema; perder isso quebra deploys futuros.",
      },
      {
        type: "info",
        content: "QuerySets são preguiçosos: a query só roda quando você itera ou converte para list. Isso ajuda a montar filtros em pedaços.",
      },
    ],
  },
  {
    slug: "sqlalchemy-orm",
    section: "frameworks-web",
    title: "SQLAlchemy: o ORM mais usado",
    difficulty: "intermediario",
    subtitle: "Funciona com FastAPI, Flask ou script avulso.",
    intro: `SQLAlchemy é o ORM mais maduro do ecossistema Python. Diferente do ORM do Django, ele é independente: você consegue usar com FastAPI, Flask, scripts de linha de comando ou até em notebooks. Ele oferece duas camadas: o Core (linguagem para gerar SQL com Python) e o ORM (mapeamento de classes para tabelas).

A versão moderna (2.0+) ficou muito mais limpa: você declara modelos com type hints, cria uma engine apontando para o banco, abre uma Session para conversar com ele e usa select() para consultar. O que assusta no começo é a separação entre engine, session e model — mas faz sentido: engine é a "fábrica de conexões", session é "uma conversa", e model é a "forma" da tabela.

Neste capítulo você vai conectar a um SQLite, criar uma tabela, inserir e consultar dados. O mesmo código serve para PostgreSQL trocando só a URL de conexão.`,
    codes: [
      {
        lang: "bash",
        code: `pip install sqlalchemy`,
      },
      {
        lang: "python",
        code: `from sqlalchemy import create_engine, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# engine: conhece o banco. Aqui SQLite num arquivo local.
engine = create_engine("sqlite:///loja.db", echo=True)

class Base(DeclarativeBase):
    pass

class Produto(Base):
    __tablename__ = "produtos"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(100))
    preco: Mapped[float]

Base.metadata.create_all(engine)  # cria a tabela se não existir`,
      },
      {
        lang: "python",
        code: `from sqlalchemy.orm import Session

# Session é uma conversa com o banco; sempre feche
with Session(engine) as session:
    p = Produto(nome="Caneca", preco=25.0)
    session.add(p)
    session.commit()  # sem commit, nada vai pro banco
    print(p.id)  # já tem ID atribuído`,
      },
      {
        lang: "python",
        code: `from sqlalchemy import select

with Session(engine) as session:
    # consulta moderna usa select()
    stmt = select(Produto).where(Produto.preco < 50)
    for p in session.scalars(stmt):
        print(p.nome, p.preco)`,
      },
      {
        lang: "python",
        code: `from sqlalchemy import update, delete

with Session(engine) as session:
    # atualizar em massa
    session.execute(update(Produto).where(Produto.preco < 10).values(preco=10))
    # deletar
    session.execute(delete(Produto).where(Produto.nome == "Antigo"))
    session.commit()`,
      },
      {
        lang: "python",
        code: `# integração com FastAPI: cada request abre uma sessão
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

def get_session():
    with Session(engine) as s:
        yield s  # entrega para a rota e fecha automaticamente

@app.get("/produtos")
def listar(session: Session = Depends(get_session)):
    return list(session.scalars(select(Produto)))`,
      },
    ],
    points: [
      "Engine é a fábrica de conexões; Session é uma conversa transacional.",
      "Sempre faça commit() — sem ele, INSERT/UPDATE não persistem.",
      "Use select() em vez do antigo session.query() (estilo 2.0).",
      "Trocar o banco é trocar a URL: sqlite:///, postgresql+psycopg://, mysql+pymysql://.",
      "Em apps web, use uma Session por requisição (com Depends/yield).",
      "Armadilha: esquecer de fechar a Session vaza conexões do pool.",
      "Armadilha: alterar um objeto fora da Session que o trouxe pode levantar DetachedInstanceError.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use Alembic (do mesmo autor) para gerenciar migrações de schema do SQLAlchemy. É o equivalente ao migrate do Django.",
      },
      {
        type: "info",
        content: "echo=True na engine imprime no console todo SQL gerado. Excelente para aprender e depurar; desligue em produção.",
      },
      {
        type: "warning",
        content: "Não compartilhe a mesma Session entre threads ou requisições. Use uma instância por contexto para evitar bugs estranhos.",
      },
    ],
  },
  {
    slug: "sqlite",
    section: "frameworks-web",
    title: "SQLite com sqlite3",
    difficulty: "iniciante",
    subtitle: "Banco de dados em um arquivo, sem servidor.",
    intro: `Quase todo programa que precisa salvar dados acaba falando com um banco. Mas instalar PostgreSQL ou MySQL para um projetinho de estudo é exagero. SQLite resolve isso: o banco inteiro vira um único arquivo no disco e o módulo sqlite3 já vem dentro do Python — você não precisa instalar nada.

Apesar de simples, SQLite é levado a sério: navegadores, celulares e aplicativos como WhatsApp e Firefox usam SQLite internamente. Para sistemas pequenos e médios ele aguenta firme. Quando o projeto cresce a ponto de precisar de muitas escritas simultâneas, aí sim você migra para Postgres.

Neste capítulo você vai abrir uma conexão, criar uma tabela, inserir registros com parâmetros (jeito seguro), consultar e fechar. No fim vai entender por que usar "?" no SQL em vez de concatenar strings é uma questão de segurança, não estilo.`,
    codes: [
      {
        lang: "python",
        code: `import sqlite3

# se o arquivo nao existir, ele e criado
con = sqlite3.connect("loja.db")
cur = con.cursor()  # cursor: por onde os comandos passam

cur.execute("""
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL
    )
""")
con.commit()
con.close()`,
      },
      {
        lang: "python",
        code: `import sqlite3

con = sqlite3.connect("loja.db")
cur = con.cursor()

# parâmetros com ? evitam SQL injection
cur.execute(
    "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
    ("Caneca", 25.0),
)
con.commit()
print("ID inserido:", cur.lastrowid)
con.close()`,
      },
      {
        lang: "python",
        code: `import sqlite3

con = sqlite3.connect("loja.db")
cur = con.cursor()

# fetchall traz todas as linhas como tuplas
for linha in cur.execute("SELECT id, nome, preco FROM produtos"):
    print(linha)  # ex.: (1, 'Caneca', 25.0)

con.close()`,
      },
      {
        lang: "python",
        code: `import sqlite3

# row_factory permite acessar colunas por nome
con = sqlite3.connect("loja.db")
con.row_factory = sqlite3.Row
cur = con.cursor()

for row in cur.execute("SELECT * FROM produtos"):
    print(row["nome"], row["preco"])

con.close()`,
      },
      {
        lang: "python",
        code: `import sqlite3

# context manager: faz commit automatico e rollback em caso de erro
with sqlite3.connect("loja.db") as con:
    con.execute(
        "UPDATE produtos SET preco = ? WHERE id = ?",
        (30.0, 1),
    )
# fora do with a transação já foi resolvida`,
      },
      {
        lang: "python",
        code: `import sqlite3

con = sqlite3.connect("loja.db")
nome = "'; DROP TABLE produtos; --"  # tentativa de ataque

# JEITO ERRADO (vulneravel a SQL injection):
# cur.execute(f"SELECT * FROM produtos WHERE nome = '{nome}'")

# JEITO CERTO (parametros):
con.execute("SELECT * FROM produtos WHERE nome = ?", (nome,))
con.close()`,
      },
    ],
    points: [
      "SQLite guarda o banco inteiro num arquivo .db; nada para instalar.",
      "Sempre use ? como placeholder — nunca concatene strings em SQL.",
      "commit() persiste as alterações; sem ele, tudo se perde ao fechar.",
      "row_factory = sqlite3.Row permite acessar colunas por nome.",
      "Use with sqlite3.connect(...) para garantir commit/rollback automáticos.",
      "Armadilha: SQLite trava em escritas concorrentes; ruim para alta concorrência.",
      "Armadilha: tipos são flexíveis (TEXT vs INTEGER), o que mascara bugs de digitação.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca monte SQL com f-string ou + para incluir dados do usuário. SQL injection é uma das vulnerabilidades mais comuns e graves.",
      },
      {
        type: "tip",
        content: "Para inspecionar um banco SQLite visualmente, instale o DB Browser for SQLite. É grátis e vê todas as tabelas.",
      },
      {
        type: "info",
        content: "SQLite é ótimo para dev, testes, apps mobile e produtos com pouca escrita simultânea. Para web em escala, use Postgres.",
      },
    ],
  },
  {
    slug: "postgresql",
    section: "frameworks-web",
    title: "PostgreSQL com psycopg",
    difficulty: "intermediario",
    subtitle: "Conectando ao Postgres direto do Python.",
    intro: `Quando seu projeto cresce — várias pessoas escrevendo ao mesmo tempo, dados sensíveis, transações complexas — você sai do SQLite e entra no PostgreSQL. Ele é o banco relacional open source mais respeitado do mercado, com tipos avançados (JSONB, arrays, geo), transações sérias e desempenho excelente.

Para falar com Postgres em Python, o driver mais usado hoje é o psycopg (versão 3, sucessor do psycopg2). Ele se parece muito com o sqlite3: você abre conexão, executa SQL com parâmetros, faz commit. A diferença é que agora há um servidor separado rodando, e a string de conexão precisa indicar usuário, senha, host e nome do banco.

Neste capítulo você vai instalar o driver, conectar, criar tabela, inserir e ler. O conhecimento que aprendeu em SQLite vale aqui — só muda o "como conectar" e algumas pequenas diferenças de SQL.`,
    codes: [
      {
        lang: "bash",
        code: `# psycopg 3 com binário pronto (mais fácil de instalar)
pip install "psycopg[binary]"`,
      },
      {
        lang: "python",
        code: `import psycopg

# conexão: ajuste host, user, password e dbname
con = psycopg.connect(
    "host=localhost port=5432 dbname=loja user=postgres password=segredo"
)
with con.cursor() as cur:
    cur.execute("""
        CREATE TABLE IF NOT EXISTS produtos (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            preco NUMERIC(8, 2)
        )
    """)
    con.commit()
con.close()`,
      },
      {
        lang: "python",
        code: `import psycopg

with psycopg.connect("dbname=loja user=postgres password=segredo") as con:
    with con.cursor() as cur:
        # %s é o placeholder do psycopg (não use ? como no sqlite)
        cur.execute(
            "INSERT INTO produtos (nome, preco) VALUES (%s, %s) RETURNING id",
            ("Caneca", 25.00),
        )
        novo_id = cur.fetchone()[0]
        print("inserido id:", novo_id)`,
      },
      {
        lang: "python",
        code: `import psycopg
from psycopg.rows import dict_row

with psycopg.connect(
    "dbname=loja user=postgres password=segredo",
    row_factory=dict_row,
) as con:
    with con.cursor() as cur:
        cur.execute("SELECT id, nome, preco FROM produtos WHERE preco < %s", (50,))
        for row in cur.fetchall():
            print(row["nome"], row["preco"])`,
      },
      {
        lang: "python",
        code: `import psycopg

# transação: tudo dentro do with vira uma transação atômica
with psycopg.connect("dbname=loja user=postgres password=segredo") as con:
    with con.transaction():
        con.execute("UPDATE contas SET saldo = saldo - %s WHERE id = %s", (100, 1))
        con.execute("UPDATE contas SET saldo = saldo + %s WHERE id = %s", (100, 2))
    # se algum execute estourar, tudo é desfeito automaticamente`,
      },
      {
        lang: "python",
        code: `# guarde a senha em variável de ambiente, nunca no código
import os
import psycopg

dsn = os.environ["DATABASE_URL"]  # ex.: postgresql://user:pass@host/db
with psycopg.connect(dsn) as con:
    with con.cursor() as cur:
        cur.execute("SELECT version()")
        print(cur.fetchone())`,
      },
    ],
    points: [
      "Postgres é cliente-servidor; você precisa do servidor rodando à parte.",
      "Use psycopg (v3) — é a versão mantida ativamente.",
      "Placeholders em psycopg são %s, NÃO ? como no sqlite3.",
      "RETURNING id traz o ID gerado num único comando.",
      "with con.transaction() abre/fecha transação automaticamente.",
      "Armadilha: deixar a senha do banco no código versionado.",
      "Armadilha: confundir %s do psycopg com formatação Python (não é!).",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca commit credenciais no Git. Use variáveis de ambiente, .env (com .gitignore) ou um cofre de segredos.",
      },
      {
        type: "info",
        content: "Para muitas requisições simultâneas, abra um pool de conexões com psycopg_pool em vez de conectar/desconectar a cada chamada.",
      },
      {
        type: "tip",
        content: "Use o tipo JSONB no Postgres para armazenar documentos flexíveis. Você ganha indexação e filtros sem trocar de banco.",
      },
    ],
  },
  {
    slug: "redis-py",
    section: "frameworks-web",
    title: "Redis com Python",
    difficulty: "intermediario",
    subtitle: "Cache rápido e estruturas em memória.",
    intro: `Imagine que sua API consulta o banco para listar produtos populares e essa consulta leva 800ms. Se 1000 pessoas pedem isso por minuto, o banco sofre. A solução clássica é cache: você guarda a resposta numa memória rápida e devolve dali enquanto ela for válida. Redis é o canivete suíço para isso.

Redis é um banco de dados em memória, organizado por chave e valor, com tipos prontos: strings, listas, hashes, conjuntos, sorted sets. É também usado para filas de tarefas, contadores em tempo real, sessões e pub/sub. A biblioteca oficial em Python se chama redis (instalada como redis-py).

Neste capítulo você vai conectar a um servidor Redis, salvar e ler chaves, definir tempo de expiração para cache, usar listas como fila simples e contadores atômicos. Em quase toda arquitetura web moderna, Redis aparece em algum lugar.`,
    codes: [
      {
        lang: "bash",
        code: `pip install redis
# precisa de um servidor redis rodando localmente:
# docker run -p 6379:6379 redis:7`,
      },
      {
        lang: "python",
        code: `import redis

# decode_responses=True faz o Redis devolver str em vez de bytes
r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

r.set("nome", "Ana")
print(r.get("nome"))  # → 'Ana'`,
      },
      {
        lang: "python",
        code: `import redis

r = redis.Redis(decode_responses=True)

# cache com expiração de 60 segundos
r.set("produtos:populares", "[1,2,3]", ex=60)
print(r.ttl("produtos:populares"))  # segundos restantes`,
      },
      {
        lang: "python",
        code: `import redis

r = redis.Redis(decode_responses=True)

# contador atômico — perfeito para visitas, likes
r.set("visitas", 0)
r.incr("visitas")
r.incr("visitas")
print(r.get("visitas"))  # → '2'`,
      },
      {
        lang: "python",
        code: `import redis

r = redis.Redis(decode_responses=True)

# lista usada como fila simples
r.rpush("fila:emails", "ana@x.com")
r.rpush("fila:emails", "bruno@x.com")

# consumidor pega o próximo email
proximo = r.lpop("fila:emails")
print(proximo)  # → 'ana@x.com'`,
      },
      {
        lang: "python",
        code: `import json
import redis

r = redis.Redis(decode_responses=True)

def buscar_produto(id: int):
    chave = f"produto:{id}"
    cache = r.get(chave)
    if cache:
        return json.loads(cache)  # cache hit

    # simulando consulta cara ao banco
    produto = {"id": id, "nome": "Caneca"}
    r.set(chave, json.dumps(produto), ex=30)  # cacheia por 30s
    return produto`,
      },
    ],
    points: [
      "Redis vive em memória; é rápido, mas dados podem ser voláteis.",
      "Use decode_responses=True para receber str em vez de bytes.",
      "set(..., ex=segundos) é a forma mais simples de definir TTL.",
      "incr/decr são atômicos: ótimos para contadores em alta concorrência.",
      "Listas (lpush/rpush + lpop/rpop) viram filas leves.",
      "Armadilha: tratar Redis como banco principal — uma reinicialização pode apagar tudo se não houver persistência.",
      "Armadilha: cachear dados que variam por usuário sem incluir o ID na chave.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Padronize chaves com prefixos: usuario:42, produto:1, cache:home. Facilita debug e migração entre ambientes.",
      },
      {
        type: "warning",
        content: "Redis é memória: valores grandes (MBs) e milhões de chaves estouram a RAM do servidor. Monitore o uso.",
      },
      {
        type: "info",
        content: "Para filas robustas com retentativas e agendamento, use Celery ou RQ — ambas usam Redis por baixo, mas dão muito mais que listas.",
      },
    ],
  },
  {
    slug: "mongodb",
    section: "frameworks-web",
    title: "MongoDB com pymongo",
    difficulty: "intermediario",
    subtitle: "Banco NoSQL orientado a documentos JSON.",
    intro: `Em bancos relacionais (Postgres, MySQL) você desenha tabelas com colunas fixas. Mudou o que precisa guardar? Migração. Em alguns cenários — logs, eventos, catálogos com formatos variados — essa rigidez incomoda. Aí entra o MongoDB, um banco NoSQL onde você guarda documentos parecidos com JSON e cada documento pode ter campos diferentes.

A biblioteca oficial em Python é o pymongo. O modelo mental é: um cluster MongoDB tem databases; cada database tem collections (parecidas com tabelas, mas sem schema rígido); cada collection tem documents (parecidos com dicts Python). Você insere dicts, busca com filtros que também são dicts, e atualiza com operadores tipo $set, $inc.

Neste capítulo você conecta, insere alguns documentos, faz buscas com filtros, atualiza, deleta e cria índice para performance. Vai perceber como o estilo dict-em-tudo deixa o código bem fluido em Python.`,
    codes: [
      {
        lang: "bash",
        code: `pip install pymongo
# servidor local:
# docker run -p 27017:27017 mongo:7`,
      },
      {
        lang: "python",
        code: `from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["loja"]            # cria/usa o database 'loja'
produtos = db["produtos"]      # cria/usa a collection 'produtos'

resultado = produtos.insert_one({"nome": "Caneca", "preco": 25.0})
print("ID:", resultado.inserted_id)`,
      },
      {
        lang: "python",
        code: `from pymongo import MongoClient

produtos = MongoClient().loja.produtos

# inserir vários de uma vez
produtos.insert_many([
    {"nome": "Camiseta", "preco": 59.9, "tags": ["roupa"]},
    {"nome": "Boné", "preco": 39.9, "tags": ["roupa", "verao"]},
])`,
      },
      {
        lang: "python",
        code: `from pymongo import MongoClient

produtos = MongoClient().loja.produtos

# filtro: dict descreve a busca
for p in produtos.find({"preco": {"$lt": 50}}):
    print(p["nome"], p["preco"])

# encontrar um único documento
um = produtos.find_one({"nome": "Caneca"})
print(um)`,
      },
      {
        lang: "python",
        code: `from pymongo import MongoClient

produtos = MongoClient().loja.produtos

# atualizar com $set (define) e $inc (incrementa)
produtos.update_one(
    {"nome": "Caneca"},
    {"$set": {"preco": 30.0}, "$inc": {"vendas": 1}},
)

# deletar
produtos.delete_one({"nome": "Boné"})`,
      },
      {
        lang: "python",
        code: `from pymongo import MongoClient, ASCENDING

produtos = MongoClient().loja.produtos

# índice: acelera buscas por nome (sem ele, varre toda a collection)
produtos.create_index([("nome", ASCENDING)], unique=True)

# tentar inserir nome duplicado agora dá erro
# pymongo.errors.DuplicateKeyError`,
      },
    ],
    points: [
      "MongoDB guarda documentos JSON-like; cada um pode ter campos diferentes.",
      "Operadores começam com $: $lt, $gt, $in, $set, $inc.",
      "find() devolve um cursor; itere com for ou converta com list().",
      "Crie índices em campos usados em filtros frequentes.",
      "Use insert_many para lotes — muito mais rápido que vários insert_one.",
      "Armadilha: confiar que dados sempre têm os mesmos campos — sem schema, surpresas acontecem.",
      "Armadilha: usar MongoDB para dados que pedem JOINs e transações complexas.",
    ],
    alerts: [
      {
        type: "info",
        content: "Para validar a forma dos documentos, use validação de schema do próprio Mongo ou uma camada como Pydantic na aplicação.",
      },
      {
        type: "tip",
        content: "Para apps async (FastAPI), use motor — driver oficial assíncrono que espelha a API do pymongo.",
      },
      {
        type: "warning",
        content: "Não exponha a porta 27017 do MongoDB sem autenticação na internet. Vazamentos por bancos abertos são notícia recorrente.",
      },
    ],
  },
  {
    slug: "jinja2",
    section: "frameworks-web",
    title: "Templates com Jinja2",
    difficulty: "intermediario",
    subtitle: "Gerando HTML dinâmico no servidor.",
    intro: `Antes do mundo das SPAs com React e Vue, o jeito padrão de fazer páginas web era no servidor: o backend monta o HTML pronto e devolve para o navegador. Esse estilo continua útil para sites de conteúdo, painéis administrativos, e-mails transacionais e qualquer coisa que precise renderizar rápido sem JavaScript pesado.

Para montar HTML em Python sem virar uma sopa de strings, usamos uma engine de templates. A mais popular é o Jinja2: você escreve um arquivo .html com placeholders {{ variavel }} e blocos de controle {% if %}, {% for %}, e a engine substitui pelos valores reais. Flask já vem com Jinja2 incluso; FastAPI usa via Jinja2Templates.

Neste capítulo você vai aprender a sintaxe básica, variáveis, condicionais, loops, herança de templates (uma base com blocos preenchidos pelos filhos) e o detalhe de segurança mais importante: autoescape, que bloqueia injeção de HTML.`,
    codes: [
      {
        lang: "bash",
        code: `pip install jinja2`,
      },
      {
        lang: "python",
        code: `from jinja2 import Template

# template inline para entender a sintaxe
t = Template("Olá, {{ nome }}! Você tem {{ idade }} anos.")
print(t.render(nome="Ana", idade=30))
# → 'Olá, Ana! Você tem 30 anos.'`,
      },
      {
        lang: "python",
        code: `from jinja2 import Template

# {% %} para lógica, {{ }} para mostrar valores
src = """
{% if usuario %}
  Bem-vindo, {{ usuario }}.
{% else %}
  Faça login.
{% endif %}
"""
print(Template(src).render(usuario="Bruno"))`,
      },
      {
        lang: "python",
        code: `from jinja2 import Template

src = """
<ul>
{% for p in produtos %}
  <li>{{ p.nome }} — R$ {{ "%.2f"|format(p.preco) }}</li>
{% endfor %}
</ul>
"""
produtos = [{"nome": "Caneca", "preco": 25}, {"nome": "Camiseta", "preco": 59.9}]
print(Template(src).render(produtos=produtos))`,
      },
      {
        lang: "python",
        code: `from jinja2 import Environment, FileSystemLoader

# em projetos reais, templates ficam em arquivos
env = Environment(
    loader=FileSystemLoader("templates"),
    autoescape=True,  # IMPORTANTE: protege contra HTML injetado
)

template = env.get_template("home.html")
html = template.render(titulo="Loja", produtos=[])`,
      },
      {
        lang: "html",
        code: `{# templates/base.html — layout com blocos a serem preenchidos #}
<!doctype html>
<html>
  <head><title>{% block titulo %}Site{% endblock %}</title></head>
  <body>
    <header>Minha Loja</header>
    <main>{% block conteudo %}{% endblock %}</main>
  </body>
</html>

{# templates/home.html — herda da base #}
{% extends "base.html" %}
{% block titulo %}Home{% endblock %}
{% block conteudo %}<h1>Olá!</h1>{% endblock %}`,
      },
    ],
    points: [
      "{{ x }} imprime; {% if/for %} controla fluxo.",
      "Filtros com | transformam valores: {{ preco|round(2) }}.",
      "Herança via {% extends %} e {% block %} evita duplicação de layout.",
      "Sempre habilite autoescape — protege contra XSS automaticamente.",
      "FileSystemLoader carrega templates de uma pasta no projeto.",
      "Armadilha: deixar autoescape desligado e renderizar dado do usuário causa XSS.",
      "Armadilha: lógica complexa dentro do template — prefira preparar dados na view.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Jamais marque conteúdo vindo do usuário com |safe. Isso desliga o escape e abre porta para JavaScript injetado.",
      },
      {
        type: "tip",
        content: "Use macros do Jinja para criar 'componentes' reutilizáveis: cards, botões, campos de formulário com a mesma marcação.",
      },
      {
        type: "info",
        content: "No FastAPI, use templating = Jinja2Templates(directory='templates') e devolva templating.TemplateResponse('home.html', {...}).",
      },
    ],
  },
  {
    slug: "autenticacao",
    section: "frameworks-web",
    title: "Autenticação: JWT e sessões",
    difficulty: "avancado",
    subtitle: "Identificando usuários em APIs e sites.",
    intro: `Toda aplicação séria precisa saber quem é quem. Autenticação responde "quem é o usuário?" e autorização responde "o que ele pode fazer?". Em APIs modernas, dois jeitos dominam: cookies de sessão (clássico, ótimo para sites tradicionais) e JWT — JSON Web Tokens (mais comum em APIs e mobile).

Em sessão, o servidor guarda o estado: ao logar, ele cria um identificador, salva num cookie e a cada requisição consulta o banco para saber quem é o dono. Em JWT, o próprio token carrega as informações assinadas digitalmente. O servidor só verifica a assinatura — não precisa consultar nada.

Neste capítulo você vai aprender a guardar senhas com hash forte (jamais em texto puro), gerar e validar JWT com a biblioteca PyJWT, e proteger rotas no FastAPI. Vamos ver também os erros comuns: senha em texto puro, segredo fraco, expiração esquecida e armazenar JWT em localStorage sem cuidado.`,
    codes: [
      {
        lang: "bash",
        code: `pip install "passlib[bcrypt]" pyjwt`,
      },
      {
        lang: "python",
        code: `from passlib.hash import bcrypt

# NUNCA salve a senha em texto puro
hash_armazenado = bcrypt.hash("minhasenha123")
print(hash_armazenado)  # algo como $2b$12$...

# para conferir no login
print(bcrypt.verify("minhasenha123", hash_armazenado))  # → True
print(bcrypt.verify("errada", hash_armazenado))         # → False`,
      },
      {
        lang: "python",
        code: `import jwt
from datetime import datetime, timedelta, timezone

SEGREDO = "troque-isso-em-producao"

def criar_token(usuario_id: int) -> str:
    payload = {
        "sub": str(usuario_id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=2),
    }
    return jwt.encode(payload, SEGREDO, algorithm="HS256")

token = criar_token(42)
print(token)`,
      },
      {
        lang: "python",
        code: `import jwt

def validar(token: str) -> dict:
    try:
        return jwt.decode(token, SEGREDO, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("token expirado")
    except jwt.InvalidTokenError:
        raise ValueError("token invalido")

print(validar(token))  # {'sub': '42', 'exp': ...}`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

def usuario_atual(token: str = Depends(oauth2)):
    try:
        dados = jwt.decode(token, SEGREDO, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "credenciais invalidas")
    return {"id": int(dados["sub"])}

@app.get("/me")
def me(u: dict = Depends(usuario_atual)):
    return u`,
      },
      {
        lang: "python",
        code: `# rota de login que devolve o token
from fastapi import Form

USUARIOS = {"ana": bcrypt.hash("123")}  # exemplo; em produção use o banco

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    hash_salvo = USUARIOS.get(username)
    if not hash_salvo or not bcrypt.verify(password, hash_salvo):
        raise HTTPException(401, "usuario ou senha incorretos")
    token = criar_token(usuario_id=1)
    return {"access_token": token, "token_type": "bearer"}`,
      },
    ],
    points: [
      "Senhas SEMPRE com hash (bcrypt, argon2). Nunca texto puro.",
      "JWT carrega informação assinada; sessão guarda estado no servidor.",
      "Sempre defina exp no token; sem expiração, um token vazado vale para sempre.",
      "Use HTTPS em produção — token vazando em rede aberta é fim de jogo.",
      "Para invalidar JWT antes do exp, mantenha uma lista de revogados (banco/Redis).",
      "Armadilha: comparar senha com == em vez de usar bcrypt.verify.",
      "Armadilha: SEGREDO fraco ou versionado no Git permite forjar tokens.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca grave senhas em texto puro nem use SHA256 sem salt para guardar senhas. Use bcrypt, argon2 ou scrypt.",
      },
      {
        type: "warning",
        content: "JWT em localStorage é vulnerável a XSS. Para sites web, prefira cookies HttpOnly + SameSite. Para apps mobile, storage seguro do SO.",
      },
      {
        type: "tip",
        content: "Quer evitar reinventar a roda? Bibliotecas como Authlib (OAuth/OpenID) e fastapi-users entregam fluxos prontos e seguros.",
      },
    ],
  },
  {
    slug: "graphql",
    section: "frameworks-web",
    title: "GraphQL com Strawberry",
    difficulty: "avancado",
    subtitle: "Uma alternativa flexível ao REST.",
    intro: `Em uma API REST tradicional, cada recurso tem sua URL: /usuarios, /usuarios/1/posts, /posts/3/comentarios. Para montar uma tela, o frontend muitas vezes faz várias chamadas. Pior: às vezes o backend devolve campos demais, às vezes de menos. GraphQL inverte isso: existe uma única URL, e o cliente descreve exatamente o que quer numa "query" parecida com JSON. O servidor monta a resposta do tamanho pedido.

GraphQL tem três operações: query (ler), mutation (alterar) e subscription (eventos em tempo real). O coração é o schema, onde você define tipos e como cada campo é resolvido. Em Python, a biblioteca moderna mais limpa é o Strawberry, que usa type hints e decoradores — bem no estilo FastAPI.

Neste capítulo você vai criar um schema mínimo, expor uma rota /graphql no FastAPI e ver como uma única query traz exatamente o que o cliente pediu. No final, vai entender quando GraphQL ajuda e quando REST continua sendo a escolha mais simples.`,
    codes: [
      {
        lang: "bash",
        code: `pip install "strawberry-graphql[fastapi]"`,
      },
      {
        lang: "python",
        code: `import strawberry

@strawberry.type
class Produto:
    id: int
    nome: str
    preco: float

@strawberry.type
class Query:
    @strawberry.field
    def produtos(self) -> list[Produto]:
        return [Produto(id=1, nome="Caneca", preco=25.0)]

schema = strawberry.Schema(query=Query)`,
      },
      {
        lang: "python",
        code: `from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
# acesse http://127.0.0.1:8000/graphql para o playground interativo`,
      },
      {
        lang: "graphql",
        code: `# query que o cliente envia para /graphql
query {
  produtos {
    nome
    preco
  }
}

# resposta — apenas os campos pedidos
{
  "data": {
    "produtos": [
      { "nome": "Caneca", "preco": 25.0 }
    ]
  }
}`,
      },
      {
        lang: "python",
        code: `import strawberry

@strawberry.type
class Mutation:
    @strawberry.mutation
    def criar_produto(self, nome: str, preco: float) -> Produto:
        # aqui você salvaria no banco; devolvemos o criado
        return Produto(id=99, nome=nome, preco=preco)

schema = strawberry.Schema(query=Query, mutation=Mutation)`,
      },
      {
        lang: "python",
        code: `import strawberry

# argumentos em campos: filtragem direto na query
@strawberry.type
class Query:
    @strawberry.field
    def produto(self, id: int) -> Produto | None:
        if id == 1:
            return Produto(id=1, nome="Caneca", preco=25.0)
        return None

# query enviada:
# query { produto(id: 1) { nome } }`,
      },
    ],
    points: [
      "GraphQL tem uma única URL; o cliente escolhe os campos que quer.",
      "Tipos são declarados com @strawberry.type e funções com @strawberry.field.",
      "Mutations alteram dados; queries só leem.",
      "GraphQLRouter conecta o schema ao FastAPI numa rota só.",
      "É ótimo quando há muitos clientes diferentes (web, mobile) com necessidades distintas.",
      "Armadilha: queries muito profundas/ aninhadas podem virar ataque (depth/cost limit).",
      "Armadilha: problema N+1 em resolvers — use DataLoader para agrupar chamadas.",
    ],
    alerts: [
      {
        type: "info",
        content: "Cada @strawberry.field vira um resolver. Para acessar request/usuário logado, use Info: def campo(self, info: strawberry.Info).",
      },
      {
        type: "warning",
        content: "Sem limite de profundidade ou complexidade, um cliente mal-intencionado pode pedir queries que travam o servidor. Configure depth/cost limits.",
      },
      {
        type: "tip",
        content: "GraphQL não substitui REST sempre. Para CRUDs simples e cache HTTP fácil, REST continua mais direto. Escolha pelo problema, não pela moda.",
      },
    ],
  },
];
