import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "arquivos-texto",
    section: "io-tipagem",
    title: "Lendo e escrevendo arquivos de texto",
    difficulty: "iniciante",
    subtitle: "open() com modos r, w e a, sempre dentro de um with.",
    intro: `Imagine um caderno em cima da mesa. Para usá-lo, você precisa abrir, escrever ou ler, e depois fechar. No Python, arquivos de texto funcionam exatamente assim: você abre, faz alguma coisa, e fecha.

A função que faz isso é \`open()\`. Ela recebe o caminho do arquivo e um "modo" que diz se você quer ler, escrever do zero ou só acrescentar no final. Os modos básicos são \`"r"\` (leitura), \`"w"\` (escrita, apaga o que já existia) e \`"a"\` (acrescenta no final).

Esquecer de fechar um arquivo é um problema clássico: o sistema operacional pode prender o conteúdo na memória e seu arquivo aparece vazio. Por isso, sempre que possível, abrimos arquivos com a palavra \`with\`. Ela garante que o arquivo será fechado mesmo se acontecer um erro no meio do caminho.

Neste capítulo você vai aprender a ler tudo de uma vez, ler linha por linha, escrever um arquivo novo e adicionar conteúdo no final, sempre cuidando da codificação \`utf-8\` para que acentos não virem caracteres estranhos.`,
    codes: [
      {
        lang: "python",
        code: `# Escrevendo um arquivo de texto do zero
# O modo "w" cria o arquivo se não existir e apaga o conteúdo se já existir.
with open("notas.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write("Ana: 9.5\\n")  # \\n quebra a linha dentro do arquivo
    arquivo.write("Bruno: 7.0\\n")
# Ao sair do bloco "with", o arquivo é fechado automaticamente.`,
      },
      {
        lang: "python",
        code: `# Lendo o arquivo inteiro de uma vez
with open("notas.txt", "r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()  # devolve uma única string com tudo

print(conteudo)
# → Ana: 9.5
# → Bruno: 7.0`,
      },
      {
        lang: "python",
        code: `# Lendo linha por linha (mais econômico para arquivos grandes)
with open("notas.txt", "r", encoding="utf-8") as arquivo:
    for linha in arquivo:           # itera direto sobre as linhas
        print(linha.rstrip())       # rstrip remove o "\\n" do fim`,
      },
      {
        lang: "python",
        code: `# Acrescentando sem apagar o que já existia
with open("notas.txt", "a", encoding="utf-8") as arquivo:
    arquivo.write("Carla: 8.2\\n")

# O modo "a" sempre escreve no final, nunca sobrescreve.`,
      },
      {
        lang: "python",
        code: `# readlines() devolve uma lista — útil quando o arquivo cabe na memória
with open("notas.txt", "r", encoding="utf-8") as arquivo:
    linhas = arquivo.readlines()

print(len(linhas), "linhas no total")
print(linhas[0])  # primeira linha, ainda com o \\n no fim`,
      },
      {
        lang: "python",
        code: `# Tratando arquivo que pode não existir
try:
    with open("inexistente.txt", "r", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("O arquivo ainda não foi criado.")`,
      },
    ],
    points: [
      "open() abre o arquivo; with garante o fechamento automático ao final do bloco.",
      "Modo r lê, w sobrescreve do zero, a acrescenta no final.",
      "Sempre passe encoding='utf-8' para evitar problemas com acentos no Windows.",
      "Iterar com 'for linha in arquivo' lê linha por linha sem carregar tudo na memória.",
      "rstrip() é útil para tirar o '\\n' que vem grudado em cada linha.",
      "Abrir com 'w' apaga silenciosamente o conteúdo anterior — cuidado.",
      "Caminhos relativos dependem do diretório onde você roda o script, não onde o .py está salvo.",
      "FileNotFoundError aparece quando o arquivo não existe no modo de leitura.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Abrir um arquivo no modo 'w' apaga tudo que estava nele antes de você escrever a primeira linha. Use 'a' se a intenção é só adicionar.",
      },
      {
        type: "tip",
        content: "Prefira sempre o bloco with em vez de chamar open() e close() na mão. Ele fecha o arquivo até se uma exceção for lançada no meio.",
      },
      {
        type: "info",
        content: "No Windows, o encoding padrão pode ser 'cp1252', o que quebra caracteres acentuados. Ser explícito com encoding='utf-8' resolve.",
      },
    ],
  },
  {
    slug: "arquivos-binarios",
    section: "io-tipagem",
    title: "Arquivos binários",
    difficulty: "intermediario",
    subtitle: "Modos rb e wb para imagens, PDFs e qualquer arquivo não-texto.",
    intro: `Nem todo arquivo é texto. Uma foto, um PDF, um áudio, um executável: tudo isso é uma sequência crua de bytes. Se você abrir um JPG no modo de texto, o Python vai tentar interpretar aqueles bytes como caracteres, vai falhar feio e ainda pode corromper o arquivo na hora de salvar.

Para esses casos existem os modos binários: \`"rb"\` (read binary) e \`"wb"\` (write binary). A diferença prática é que, em vez de strings (\`str\`), você passa e recebe \`bytes\`. Bytes são parecidos com strings, mas representam números crus de 0 a 255.

Você usa modo binário para copiar arquivos, baixar conteúdo da internet, ler cabeçalhos de imagem ou simplesmente quando não tem certeza do que está dentro. Também é o modo certo quando você quer evitar que o Python "ajude" convertendo \\r\\n em \\n no Windows — em binário, nada é convertido.

Nos exemplos abaixo você vai copiar um arquivo, ler em pedaços para não estourar a memória e inspecionar os primeiros bytes para descobrir o tipo do arquivo.`,
    codes: [
      {
        lang: "python",
        code: `# Lendo um arquivo binário inteiro
with open("foto.jpg", "rb") as f:
    dados = f.read()  # devolve bytes, não str

print(type(dados))     # → <class 'bytes'>
print(len(dados), "bytes")`,
      },
      {
        lang: "python",
        code: `# Copiando um arquivo de qualquer tipo
with open("foto.jpg", "rb") as origem:
    conteudo = origem.read()

with open("copia.jpg", "wb") as destino:
    destino.write(conteudo)`,
      },
      {
        lang: "python",
        code: `# Lendo em pedaços para não carregar tudo na memória
TAMANHO = 64 * 1024  # 64 KB por leitura

with open("video.mp4", "rb") as origem, open("saida.mp4", "wb") as destino:
    while True:
        pedaco = origem.read(TAMANHO)
        if not pedaco:           # acabou o arquivo
            break
        destino.write(pedaco)`,
      },
      {
        lang: "python",
        code: `# Inspecionando os primeiros bytes (assinatura do arquivo)
with open("documento.pdf", "rb") as f:
    cabecalho = f.read(4)

print(cabecalho)            # → b'%PDF'
print(cabecalho == b"%PDF") # → True para PDFs reais`,
      },
      {
        lang: "python",
        code: `# Convertendo entre str e bytes
texto = "Olá, mundo"
codificado = texto.encode("utf-8")   # str → bytes
print(codificado)                    # → b'Ol\\xc3\\xa1, mundo'

de_volta = codificado.decode("utf-8")  # bytes → str
print(de_volta)                       # → Olá, mundo`,
      },
      {
        lang: "python",
        code: `# Tentar escrever str em arquivo binário dá erro
with open("teste.bin", "wb") as f:
    # f.write("oi")  # TypeError: a bytes-like object is required, not 'str'
    f.write(b"oi")    # certo: prefixe com b para criar bytes`,
      },
    ],
    points: [
      "Modos rb e wb tratam o arquivo como sequência de bytes, sem nenhuma conversão.",
      "Em modo binário, você lê e escreve objetos bytes, não str.",
      "Use binário para imagens, PDFs, vídeos, áudios e qualquer formato não-texto.",
      "Ler em pedaços (chunks) evita estourar a memória com arquivos enormes.",
      "str.encode() vira bytes; bytes.decode() vira str. Sempre informe o encoding.",
      "Tentar escrever str em modo binário gera TypeError pedindo bytes-like.",
      "No modo binário, o Python NÃO converte \\r\\n em \\n no Windows.",
      "Os primeiros bytes (magic number) costumam revelar o tipo real do arquivo.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Abrir um arquivo binário em modo texto e salvar de volta pode corrompê-lo permanentemente. Quando em dúvida, use rb/wb.",
      },
      {
        type: "tip",
        content: "Para copiar arquivos grandes, leia em blocos de 64 KB ou use shutil.copyfileobj — é mais eficiente do que ler tudo de uma vez.",
      },
      {
        type: "info",
        content: "O literal b'...' cria bytes diretamente. Útil para constantes binárias como assinaturas de formato.",
      },
    ],
  },
  {
    slug: "pickle",
    section: "io-tipagem",
    title: "Serialização com pickle",
    difficulty: "intermediario",
    subtitle: "Salvando objetos Python inteiros em disco.",
    intro: `Imagine que você está jogando um RPG e quer salvar o jogo. O personagem tem nome, vida, inventário, cada item tem propriedades. Você poderia escrever tudo isso em um arquivo de texto manualmente, mas seria trabalhoso e fácil de errar.

O módulo \`pickle\` resolve esse problema "congelando" um objeto Python (qualquer dicionário, lista, instância de classe, conjunto, etc.) em uma sequência de bytes que você pode salvar em arquivo. Depois, basta "descongelar" para ter o objeto de volta exatamente como era. Esse processo se chama serialização.

\`pickle\` é prático porque entende quase qualquer estrutura Python, inclusive objetos aninhados. Mas tem um pegadinha grande: pickle não é seguro. Carregar um pickle vindo de uma fonte desconhecida pode executar código arbitrário no seu computador. Use pickle apenas para dados que VOCÊ mesmo gerou, em ambiente controlado.

Para troca de dados entre programas diferentes ou linguagens diferentes, prefira JSON. Pickle é ideal para cache local, salvar progresso, snapshots rápidos de objetos complexos.`,
    codes: [
      {
        lang: "python",
        code: `import pickle

# Qualquer objeto Python pode ser "picklado"
personagem = {
    "nome": "Ana",
    "vida": 80,
    "inventario": ["espada", "poção", "mapa"],
    "atributos": {"forca": 12, "magia": 7},
}

with open("save.pkl", "wb") as f:   # binário, sempre
    pickle.dump(personagem, f)`,
      },
      {
        lang: "python",
        code: `import pickle

# Carregando o objeto de volta
with open("save.pkl", "rb") as f:
    dados = pickle.load(f)

print(dados["nome"])             # → Ana
print(dados["inventario"][0])    # → espada`,
      },
      {
        lang: "python",
        code: `import pickle

# Salvando uma instância de classe
class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

p = Produto("Café", 18.90)

with open("produto.pkl", "wb") as f:
    pickle.dump(p, f)

with open("produto.pkl", "rb") as f:
    p2 = pickle.load(f)

print(p2.nome, p2.preco)  # → Café 18.9`,
      },
      {
        lang: "python",
        code: `import pickle

# Serializando para bytes em memória, sem passar por arquivo
lista = [1, 2, 3, {"a": True}]
blob = pickle.dumps(lista)        # dumpS com S de string-de-bytes
print(type(blob))                  # → <class 'bytes'>

restaurado = pickle.loads(blob)    # loadS
print(restaurado)                  # → [1, 2, 3, {'a': True}]`,
      },
      {
        lang: "python",
        code: `import pickle

# Salvando vários objetos no mesmo arquivo
with open("multi.pkl", "wb") as f:
    pickle.dump({"tipo": "config"}, f)
    pickle.dump([1, 2, 3], f)
    pickle.dump("fim", f)

# E lendo na mesma ordem
with open("multi.pkl", "rb") as f:
    while True:
        try:
            print(pickle.load(f))
        except EOFError:
            break`,
      },
    ],
    points: [
      "pickle.dump grava no arquivo; pickle.load lê de volta.",
      "Sempre abra o arquivo em modo binário (wb/rb).",
      "Funciona com quase qualquer objeto: dicts, listas, sets, instâncias de classe.",
      "Não é seguro: nunca carregue pickle vindo de fonte desconhecida.",
      "Para dados portáveis entre linguagens, use JSON em vez de pickle.",
      "Funções lambda e conexões de banco/sockets não podem ser pickladas.",
      "dumps/loads trabalham com bytes em memória, sem precisar de arquivo.",
      "Se a classe mudar entre salvar e carregar, pode dar erro ao desserializar.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Carregar um pickle de fonte não confiável é equivalente a executar código arbitrário. Trate todo pickle externo como hostil.",
      },
      {
        type: "warning",
        content: "Pickle é um formato Python-específico. Outro programa em Java ou Go não vai conseguir ler. Para interoperabilidade, prefira JSON.",
      },
      {
        type: "tip",
        content: "Se você só precisa salvar dicts e listas com tipos básicos (str, int, float, bool), JSON é mais simples, legível e seguro.",
      },
    ],
  },
  {
    slug: "type-hints",
    section: "io-tipagem",
    title: "Type hints (PEP 484)",
    difficulty: "intermediario",
    subtitle: "Anotando tipos para deixar o código autoexplicativo.",
    intro: `Quando você lê uma função escrita por outra pessoa (ou por você mesmo há seis meses), uma pergunta aparece rápido: "que tipo de dado essa função recebe e devolve?". Adivinhar olhando o nome da variável é frágil. Type hints são pequenas anotações que respondem isso de forma explícita.

Type hints foram padronizadas pela PEP 484 em 2014. Elas dizem ao leitor (e ao seu editor) que \`nome: str\` espera uma string e que \`-> int\` significa "retorna um inteiro". O Python NÃO força esses tipos em tempo de execução: se você passar um número onde era esperada uma string, o programa roda do mesmo jeito. Quem cobra os tipos são ferramentas externas como mypy ou pyright.

Ainda assim, o ganho é enorme. O autocomplete do VSCode fica muito melhor, erros bobos aparecem antes de rodar, e o código se torna autodocumentado. É um dos hábitos que mais melhora a vida de quem trabalha em projetos com mais de um arquivo.

Neste capítulo você verá como anotar variáveis, parâmetros, retorno e estruturas comuns como listas e dicionários.`,
    codes: [
      {
        lang: "python",
        code: `# Anotando parâmetros e retorno
def saudacao(nome: str) -> str:
    return f"Olá, {nome}!"

print(saudacao("Ana"))   # → Olá, Ana!

# O Python não bloqueia se você passar errado:
print(saudacao(42))       # → Olá, 42!  (roda, mas mypy reclamaria)`,
      },
      {
        lang: "python",
        code: `# Anotando variáveis comuns
idade: int = 30
preco: float = 9.90
ativo: bool = True
nomes: list[str] = ["Ana", "Bruno"]
estoque: dict[str, int] = {"caneta": 50, "caderno": 12}`,
      },
      {
        lang: "python",
        code: `# Funções com vários parâmetros e default
def calcular_total(precos: list[float], desconto: float = 0.0) -> float:
    subtotal = sum(precos)
    return subtotal * (1 - desconto)

print(calcular_total([10.0, 20.0, 5.5], desconto=0.1))`,
      },
      {
        lang: "python",
        code: `# Valores que podem ser None: use | None (Python 3.10+)
def buscar_usuario(id: int) -> dict | None:
    if id == 1:
        return {"nome": "Ana"}
    return None

resultado = buscar_usuario(2)
if resultado is None:
    print("não encontrado")`,
      },
      {
        lang: "python",
        code: `# Funções que não retornam nada usam -> None
def log(mensagem: str) -> None:
    print(f"[LOG] {mensagem}")

log("começou")  # não devolve nada útil`,
      },
      {
        lang: "python",
        code: `# Tuplas e tipos compostos
def coordenada() -> tuple[float, float]:
    return (-23.55, -46.63)

x, y = coordenada()
print(x, y)`,
      },
    ],
    points: [
      "Type hints documentam intenção, mas não são checadas em tempo de execução.",
      "O autocomplete do editor melhora drasticamente quando você anota tudo.",
      "Use list[str], dict[str, int] etc. (a partir do Python 3.9) sem precisar importar do typing.",
      "X | None substitui o antigo Optional[X] desde o Python 3.10.",
      "Funções sem retorno útil devem ser anotadas com -> None.",
      "Quem realmente valida os tipos é o mypy, pyright ou o Pylance no VSCode.",
      "Tipo errado não quebra o programa, mas confunde quem lê e atrapalha o editor.",
      "Para casos complexos (genéricos, união, etc.), o módulo typing tem ferramentas extras.",
    ],
    alerts: [
      {
        type: "info",
        content: "Type hints são opcionais e não afetam a execução. Você pode adicionar aos poucos, começando pelas funções públicas mais usadas.",
      },
      {
        type: "tip",
        content: "Configure o pyright/Pylance no VSCode em modo basic. Ele reclama de erros de tipo enquanto você digita, sem precisar rodar nada.",
      },
      {
        type: "warning",
        content: "Anotar errado é pior do que não anotar: induz quem lê ao engano. Se não tem certeza do tipo, deixe sem ou use 'object'.",
      },
    ],
  },
  {
    slug: "typing-avancado",
    section: "io-tipagem",
    title: "typing avançado",
    difficulty: "avancado",
    subtitle: "Generics, TypedDict, Protocol e Literal para tipos precisos.",
    intro: `Type hints simples cobrem 80% dos casos. Mas quando você está escrevendo uma biblioteca, lidando com APIs externas ou modelando dados estruturados, o módulo \`typing\` oferece ferramentas mais expressivas.

\`Generic\` permite escrever funções e classes que funcionam para qualquer tipo, mas mantendo a relação entre entrada e saída ("se entra um T, sai uma list[T]"). \`TypedDict\` descreve dicionários com chaves fixas — perfeito para resposta de APIs JSON. \`Protocol\` define "duck typing" estruturado: qualquer objeto que tenha os métodos certos serve, sem precisar herdar. \`Literal\` aceita só um conjunto exato de valores.

Essas ferramentas elevam a qualidade do código, mas têm uma curva. O conselho é introduzi-las quando o tipo simples não conseguir mais expressar a intenção. Não use Generic só por usar.

Os exemplos abaixo mostram cada uma em um cenário concreto: um cache genérico, um payload de API, uma função que aceita "qualquer coisa que tenha .name", e parâmetros com valores fechados.`,
    codes: [
      {
        lang: "python",
        code: `from typing import TypeVar

# T é um "tipo qualquer", mas a função preserva o tipo entre entrada e saída
T = TypeVar("T")

def primeiro(itens: list[T]) -> T:
    return itens[0]

n: int = primeiro([1, 2, 3])         # mypy entende que n é int
s: str = primeiro(["a", "b"])         # e que s é str`,
      },
      {
        lang: "python",
        code: `from typing import TypedDict

# Dicionário com chaves e tipos fixos — comum em respostas de API
class Usuario(TypedDict):
    id: int
    nome: str
    ativo: bool

def saudar(u: Usuario) -> str:
    return f"Olá, {u['nome']}!"

ana: Usuario = {"id": 1, "nome": "Ana", "ativo": True}
print(saudar(ana))`,
      },
      {
        lang: "python",
        code: `from typing import Protocol

# Qualquer objeto que tenha .name conta como Nomeavel — sem herança explícita
class Nomeavel(Protocol):
    name: str

class Produto:
    def __init__(self, name: str):
        self.name = name

def descrever(item: Nomeavel) -> str:
    return f"item: {item.name}"

print(descrever(Produto("Café")))`,
      },
      {
        lang: "python",
        code: `from typing import Literal

# O parâmetro só aceita esses três valores específicos
def alinhar(texto: str, lado: Literal["esquerda", "centro", "direita"]) -> str:
    return f"{lado}: {texto}"

alinhar("oi", "centro")        # ok
# alinhar("oi", "topo")        # mypy: erro — "topo" não é permitido`,
      },
      {
        lang: "python",
        code: `from typing import Generic, TypeVar

T = TypeVar("T")

# Classe genérica: o tipo é definido na hora de usar
class Caixa(Generic[T]):
    def __init__(self, conteudo: T) -> None:
        self.conteudo = conteudo

    def abrir(self) -> T:
        return self.conteudo

c1: Caixa[int] = Caixa(42)
c2: Caixa[str] = Caixa("oi")
print(c1.abrir(), c2.abrir())`,
      },
      {
        lang: "python",
        code: `from typing import Callable

# Anotando funções que recebem outras funções
def aplicar(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

print(aplicar(lambda x, y: x + y, 2, 3))   # → 5
print(aplicar(lambda x, y: x * y, 4, 5))   # → 20`,
      },
    ],
    points: [
      "TypeVar permite escrever funções genéricas que preservam o tipo de entrada.",
      "TypedDict descreve dicts com chaves fixas, perfeito para JSON estruturado.",
      "Protocol implementa duck typing estático: basta ter os atributos certos.",
      "Literal restringe um parâmetro a um conjunto exato de valores.",
      "Callable[[int, int], int] anota funções que recebem 2 ints e retornam int.",
      "Generic[T] permite criar classes que se adaptam ao tipo passado.",
      "Use essas ferramentas só quando o tipo simples não cobrir mais o caso real.",
      "Tudo isso continua sendo verificado por mypy/pyright, não em runtime.",
    ],
    alerts: [
      {
        type: "info",
        content: "TypedDict não cria uma classe real — é só uma descrição. O objeto continua sendo um dict comum em tempo de execução.",
      },
      {
        type: "tip",
        content: "Antes de criar um Protocol, pergunte se uma classe abstrata simples não resolve. Protocol brilha quando você não controla as classes que vão se encaixar.",
      },
      {
        type: "warning",
        content: "Tipos muito complexos podem confundir mais do que ajudar. Se a anotação ficou maior que a função, recue e simplifique.",
      },
    ],
  },
  {
    slug: "mypy",
    section: "io-tipagem",
    title: "Checagem com mypy/pyright",
    difficulty: "intermediario",
    subtitle: "Validando tipos antes mesmo de rodar o código.",
    intro: `Você pode escrever type hints lindas, mas o Python não vai cobrar nada delas em tempo de execução. Para que essas anotações virem garantia de verdade, é preciso passar uma ferramenta externa que LEIA seu código e confirme se os tipos batem. As duas mais usadas são \`mypy\` (escrito em Python) e \`pyright\` (escrito em TypeScript pela Microsoft, é o motor por trás do Pylance no VSCode).

A ideia é simples: você roda \`mypy meu_arquivo.py\` no terminal e ele aponta cada lugar onde os tipos não combinam. É como um corretor ortográfico para tipos. Você descobre antes de rodar que está somando uma string com um inteiro, ou passando \`None\` onde a função não aceita.

Em projetos sérios, essa checagem entra no CI: nenhum código sobe se o mypy reclamar. No início, você pode começar em modo permissivo e ir apertando aos poucos. Ferramentas de tipo costumam ter dezenas de flags para configurar o quão rigoroso querem ser.

Este capítulo mostra como instalar, rodar e configurar mypy, além de exemplos clássicos do que ele pega.`,
    codes: [
      {
        lang: "bash",
        code: `# Instalando o mypy via pip
pip install mypy

# Ou pyright (se preferir)
pip install pyright`,
      },
      {
        lang: "python",
        code: `# arquivo: exemplo.py
def dobrar(n: int) -> int:
    return n * 2

resultado = dobrar("oi")  # erro: passou str onde era int
print(resultado)`,
      },
      {
        lang: "bash",
        code: `# Rodando o mypy no arquivo
mypy exemplo.py

# Saída típica:
# exemplo.py:4: error: Argument 1 to "dobrar" has incompatible type "str"; expected "int"
# Found 1 error in 1 file (checked 1 source file)`,
      },
      {
        lang: "python",
        code: `# Erros comuns que mypy detecta
def buscar(id: int) -> dict | None:
    if id < 0:
        return None
    return {"id": id}

dado = buscar(1)
print(dado["id"])
# mypy: error — "dado" pode ser None, você precisa checar antes`,
      },
      {
        lang: "python",
        code: `# Versão corrigida — agora mypy fica feliz
def buscar(id: int) -> dict | None:
    if id < 0:
        return None
    return {"id": id}

dado = buscar(1)
if dado is not None:        # estreita o tipo para dict
    print(dado["id"])`,
      },
      {
        lang: "bash",
        code: `# Configurando o mypy via arquivo mypy.ini ou pyproject.toml
# Exemplo de pyproject.toml:
# [tool.mypy]
# strict = true
# python_version = "3.11"
# ignore_missing_imports = true`,
      },
    ],
    points: [
      "mypy e pyright leem o código e cobram os type hints, sem precisar executar.",
      "O Python continua rodando código com tipo errado — quem trava é o checker.",
      "Rode na linha de comando ou deixe o editor (Pylance) avisar enquanto você digita.",
      "O modo strict do mypy é rigoroso: bom para projetos novos, doloroso para legados.",
      "ignore_missing_imports é útil quando bibliotecas externas não têm tipos.",
      "Em CI, faça o build falhar se o mypy reclamar — assim erros não voltam.",
      "Comece em modo permissivo e aumente a rigidez conforme o time se acostuma.",
      "Pyright costuma ser mais rápido e tem feedback em tempo real no VSCode.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Comece com mypy --strict apenas em arquivos novos. Aplicar strict de uma vez em código antigo gera centenas de erros e desanima o time.",
      },
      {
        type: "info",
        content: "O Pylance, extensão padrão do VSCode para Python, usa o pyright por baixo. Você já tem checagem de tipos sem instalar nada extra.",
      },
      {
        type: "warning",
        content: "Bibliotecas antigas podem não ter type hints. Use 'types-NomeDaLib' do PyPI ou ignore_missing_imports para silenciar avisos.",
      },
    ],
  },
  {
    slug: "geradores",
    section: "io-tipagem",
    title: "Geradores e yield",
    difficulty: "intermediario",
    subtitle: "Iteradores preguiçosos que economizam memória.",
    intro: `Imagine processar um arquivo de log com 10 milhões de linhas. Se você usar \`linhas = arquivo.readlines()\`, o Python carrega tudo na memória e seu programa pode travar. Geradores resolvem esse problema produzindo um valor por vez, só quando alguém pede.

A palavra-chave \`yield\` é o que diferencia uma função normal de um gerador. Quando o Python encontra \`yield\` no corpo, a função para de ser uma função comum: ela vira uma fábrica de iteradores. Cada vez que você itera sobre ela, ela executa até o próximo \`yield\`, devolve o valor e congela ali, esperando ser chamada de novo.

Isso é o que chamamos de avaliação preguiçosa (lazy). O gerador não calcula nada até ser pedido. E quando termina (a função "cai do fim" ou bate em um \`return\`), ele lança \`StopIteration\` automaticamente, sinalizando o fim do loop.

Geradores brilham para sequências infinitas, processamento de arquivos enormes e pipelines de transformação de dados. Eles também têm uma sintaxe enxuta de "expressão geradora", parecida com list comprehension mas com parênteses.`,
    codes: [
      {
        lang: "python",
        code: `# Função normal vs. gerador
def lista_normal(n):
    return [i * 2 for i in range(n)]   # cria a lista inteira

def gerador(n):
    for i in range(n):
        yield i * 2                     # devolve um por vez

print(lista_normal(5))    # → [0, 2, 4, 6, 8]
print(gerador(5))         # → <generator object ...>
print(list(gerador(5)))   # → [0, 2, 4, 6, 8]`,
      },
      {
        lang: "python",
        code: `# Iterando passo a passo com next()
def contagem():
    yield "um"
    yield "dois"
    yield "três"

g = contagem()
print(next(g))   # → um
print(next(g))   # → dois
print(next(g))   # → três
# print(next(g)) # StopIteration: acabou`,
      },
      {
        lang: "python",
        code: `# Lendo arquivo gigante linha por linha sem estourar memória
def linhas_uteis(caminho):
    with open(caminho, "r", encoding="utf-8") as f:
        for linha in f:
            linha = linha.strip()
            if linha and not linha.startswith("#"):
                yield linha

# Só lê do disco enquanto você consome
for linha in linhas_uteis("config.txt"):
    print(linha)`,
      },
      {
        lang: "python",
        code: `# Sequência infinita — só funciona porque é preguiçoso
def naturais():
    n = 1
    while True:        # loop infinito, sem problema
        yield n
        n += 1

g = naturais()
print(next(g), next(g), next(g))  # → 1 2 3`,
      },
      {
        lang: "python",
        code: `# Expressão geradora: parecida com list comprehension, mas com parênteses
quadrados = (x * x for x in range(10))    # NÃO calcula ainda
print(sum(quadrados))                      # 285

# Comparado à versão lista (que cria 10 elementos na memória):
quadrados_lista = [x * x for x in range(10)]`,
      },
      {
        lang: "python",
        code: `# Geradores se esgotam — só dá pra iterar uma vez
g = (x for x in [1, 2, 3])
print(list(g))   # → [1, 2, 3]
print(list(g))   # → []  (acabou, o gerador foi consumido)`,
      },
    ],
    points: [
      "yield transforma uma função em gerador, que produz valores sob demanda.",
      "Geradores não armazenam tudo: economizam memória em datasets grandes.",
      "Cada chamada a next() avança até o próximo yield e devolve o valor.",
      "Quando o gerador termina, lança StopIteration — o for trata isso sozinho.",
      "Expressões geradoras usam (parênteses) em vez de [colchetes].",
      "Geradores permitem sequências infinitas sem travar a memória.",
      "Cuidado: um gerador só pode ser percorrido uma vez. Depois, fica vazio.",
      "Ideais para pipelines: ler, filtrar, transformar, agregar — sem listas intermediárias.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando o resultado vai ser consumido só uma vez, use gerador. Quando precisa indexar ou percorrer várias vezes, use lista.",
      },
      {
        type: "warning",
        content: "Geradores são consumidos. Iterar duas vezes no mesmo gerador devolve nada na segunda. Recrie-o se precisar repetir.",
      },
      {
        type: "info",
        content: "Funções como sum(), max(), any() aceitam geradores e processam sob demanda — combinação perfeita para grandes volumes.",
      },
    ],
  },
  {
    slug: "iteradores-customizados",
    section: "io-tipagem",
    title: "Iteradores customizados",
    difficulty: "avancado",
    subtitle: "Implementando __iter__ e __next__ na sua própria classe.",
    intro: `Toda vez que você escreve \`for x in algo\`, o Python por baixo dos panos chama dois métodos: \`__iter__\`, que devolve um objeto iterador, e \`__next__\`, que produz o próximo valor. Listas, tuplas, dicionários, arquivos — todos seguem esse contrato chamado de "protocolo de iteração".

Geradores com \`yield\` são a forma mais simples de criar iteradores, e cobrem quase todos os casos. Mas há situações em que faz mais sentido controlar o ciclo manualmente: quando o estado é complexo, quando você precisa de métodos extras, quando quer reiniciar a iteração ou quando está modelando algo conceitual como uma "página" ou "intervalo".

Para criar um iterador customizado, você define uma classe com \`__iter__\` (que devolve \`self\`, geralmente) e \`__next__\` (que devolve o próximo valor ou levanta \`StopIteration\`). Opcionalmente, separa "iterável" e "iterador" em duas classes distintas, o que permite percorrer o mesmo iterável várias vezes.

Esse padrão é mais verboso que \`yield\`, mas dá controle total e ajuda a entender como o \`for\` realmente funciona por dentro.`,
    codes: [
      {
        lang: "python",
        code: `# Iterador simples: contador até um limite
class Contador:
    def __init__(self, limite):
        self.limite = limite
        self.atual = 0

    def __iter__(self):
        return self                  # o próprio objeto é o iterador

    def __next__(self):
        if self.atual >= self.limite:
            raise StopIteration       # sinaliza fim
        self.atual += 1
        return self.atual

for n in Contador(3):
    print(n)
# → 1 2 3`,
      },
      {
        lang: "python",
        code: `# Separando "iterável" de "iterador" — permite reiniciar
class Range3:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return Range3Iter(self.n)    # cria iterador novo a cada for

class Range3Iter:
    def __init__(self, n):
        self.n = n
        self.i = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        v = self.i
        self.i += 1
        return v

r = Range3(3)
print(list(r))  # → [0, 1, 2]
print(list(r))  # → [0, 1, 2]  funciona de novo!`,
      },
      {
        lang: "python",
        code: `# A mesma ideia muito mais curta com yield
class Range3:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        i = 0
        while i < self.n:
            yield i
            i += 1

print(list(Range3(3)))  # → [0, 1, 2]`,
      },
      {
        lang: "python",
        code: `# Iterador "infinito" controlado externamente
import itertools

class IDsAutomaticos:
    def __init__(self, prefixo):
        self.prefixo = prefixo
        self.contador = itertools.count(1)

    def __iter__(self):
        return self

    def __next__(self):
        return f"{self.prefixo}-{next(self.contador):04d}"

g = IDsAutomaticos("USR")
print(next(g))   # → USR-0001
print(next(g))   # → USR-0002`,
      },
      {
        lang: "python",
        code: `# Erro clássico: esquecer de levantar StopIteration
class Quebrado:
    def __iter__(self):
        return self

    def __next__(self):
        return 1                     # nunca para — for vira loop infinito!

# for x in Quebrado():
#     print(x)   # → trava o terminal
`,
      },
    ],
    points: [
      "O for usa __iter__ e __next__ por baixo — esse é o protocolo de iteração.",
      "__iter__ devolve um iterador; __next__ devolve o próximo valor.",
      "StopIteration sinaliza o fim — sem ela, o loop nunca para.",
      "Separar iterável e iterador permite percorrer o mesmo objeto várias vezes.",
      "Geradores com yield resolvem 90% dos casos com muito menos código.",
      "Use classe iteradora quando precisar de estado complexo ou métodos extras.",
      "Esquecer StopIteration causa loop infinito — atenção redobrada.",
      "iter(obj) e next(obj) são as funções builtin que invocam o protocolo.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de escrever uma classe iteradora, considere se yield resolve. Funções geradoras são quase sempre mais curtas e claras.",
      },
      {
        type: "warning",
        content: "Se __next__ nunca lança StopIteration, qualquer for vira loop infinito. Sempre defina uma condição de parada explícita.",
      },
      {
        type: "info",
        content: "iter() e next() são funções built-in que invocam __iter__ e __next__. Use next(g, padrao) para evitar StopIteration na mão.",
      },
    ],
  },
  {
    slug: "asyncio-intro",
    section: "io-tipagem",
    title: "Introdução ao asyncio",
    difficulty: "avancado",
    subtitle: "Programação assíncrona para tarefas de espera.",
    intro: `Imagine um garçom em um restaurante. Se ele esperasse cada cliente terminar de comer antes de atender o próximo, o lugar estaria vazio. O que ele faz é levar o pedido, ir para a cozinha, atender outras mesas enquanto a comida fica pronta. Programação assíncrona é exatamente isso: enquanto uma tarefa está esperando algo (uma resposta de rede, um arquivo, um banco de dados), o programa atende outras.

\`asyncio\` é o módulo padrão do Python para esse modelo. A palavra-chave \`async\` marca uma função como "corotina" — ou seja, uma função que pode ser pausada. \`await\` é o ponto onde a corotina diz "pode trocar de tarefa, eu vou esperar isso aqui". O loop de eventos cuida de coordenar tudo, sem usar threads ou processos.

Importante: asyncio brilha em tarefas de espera (I/O), como chamadas HTTP, leitura de arquivos, queries de banco. Para cálculo pesado de CPU, asyncio NÃO ajuda — para isso existem threads e multiprocessing.

Comece pequeno: defina uma função async, rode com \`asyncio.run\` e use \`asyncio.gather\` para disparar várias tarefas em paralelo. Você vai ver concorrência real em código que parece sequencial.`,
    codes: [
      {
        lang: "python",
        code: `import asyncio

# Função async é uma corotina — não roda direto
async def saudar(nome):
    print(f"oi, {nome}")
    await asyncio.sleep(1)        # espera 1 segundo sem bloquear
    print(f"tchau, {nome}")

# asyncio.run dispara o loop de eventos
asyncio.run(saudar("Ana"))`,
      },
      {
        lang: "python",
        code: `import asyncio

async def tarefa(nome, segundos):
    print(f"{nome} começou")
    await asyncio.sleep(segundos)
    print(f"{nome} terminou")
    return nome

async def principal():
    # gather dispara várias corotinas em paralelo
    resultados = await asyncio.gather(
        tarefa("A", 2),
        tarefa("B", 1),
        tarefa("C", 3),
    )
    print("tudo pronto:", resultados)

asyncio.run(principal())
# Tempo total ~3s, não 6s — porque rodam em paralelo`,
      },
      {
        lang: "python",
        code: `import asyncio

# Sem await — perde toda a vantagem
async def sequencial():
    await tarefa("A", 2)        # espera A terminar
    await tarefa("B", 1)        # só então começa B
    # tempo total: 3s

async def tarefa(nome, s):
    await asyncio.sleep(s)
    return nome

asyncio.run(sequencial())`,
      },
      {
        lang: "python",
        code: `import asyncio

# Erro comum: chamar async sem await
async def diga():
    return "oi"

# Errado: corotina não é executada, só é criada
resultado = diga()
print(resultado)  # → <coroutine object diga at 0x...>

# Certo: precisa do await dentro de outra async, ou asyncio.run
print(asyncio.run(diga()))   # → oi`,
      },
      {
        lang: "python",
        code: `import asyncio

# Simulando várias requisições HTTP em paralelo
async def baixar(url):
    print(f"baixando {url}")
    await asyncio.sleep(1)              # simula latência de rede
    return f"conteúdo de {url}"

async def principal():
    urls = ["site1", "site2", "site3"]
    resultados = await asyncio.gather(*(baixar(u) for u in urls))
    for r in resultados:
        print(r)

asyncio.run(principal())`,
      },
    ],
    points: [
      "async define uma corotina; await pausa-a esperando outra corotina.",
      "asyncio.run inicia o loop de eventos a partir do código síncrono.",
      "asyncio.gather dispara várias corotinas em paralelo e espera todas.",
      "Asyncio é ótimo para I/O (rede, disco), não para CPU.",
      "Chamar uma async sem await só cria a corotina — não executa.",
      "Misturar código bloqueante (time.sleep, requests) dentro de async trava o loop.",
      "Cada operação de espera precisa ser substituída por sua versão async.",
      "asyncio.sleep simula espera não bloqueante e é ideal para testes.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Chamar funções bloqueantes (como time.sleep ou requests.get) dentro de uma corotina trava o loop inteiro. Use as versões async.",
      },
      {
        type: "tip",
        content: "Para HTTP assíncrono, use httpx ou aiohttp em vez de requests. Para banco, use asyncpg, aiomysql ou sqlmodel async.",
      },
      {
        type: "info",
        content: "asyncio não cria threads. Tudo roda em uma única thread, alternando entre corotinas. É concorrência cooperativa, não paralelismo real.",
      },
    ],
  },
  {
    slug: "async-await-detalhes",
    section: "io-tipagem",
    title: "async/await em profundidade",
    difficulty: "avancado",
    subtitle: "Tasks, cancelamento, timeout e como o loop funciona por dentro.",
    intro: `Depois de entender o básico de asyncio, é hora de mergulhar nos detalhes que aparecem em código real: criar tarefas que rodam em segundo plano, cancelá-las quando não forem mais necessárias, aplicar timeouts e tratar erros que acontecem em corotinas paralelas.

Uma corotina sozinha não roda — ela precisa ser agendada no loop. \`asyncio.create_task\` agenda uma corotina e devolve uma \`Task\` que você pode acompanhar, cancelar ou esperar. Diferente de \`gather\`, que dispara e espera tudo de uma vez, tasks dão controle individual.

Cancelamento é tratado por \`task.cancel()\`, que faz a corotina receber um \`CancelledError\` no próximo \`await\`. Isso permite parar tarefas longas educadamente, liberando recursos. Timeouts são feitos com \`asyncio.wait_for(coro, timeout=segundos)\`, que cancela automaticamente se passar do tempo.

Outro padrão importante são os \`async with\` e \`async for\`: versões assíncronas dos blocos \`with\` e \`for\`, usadas com bibliotecas async (sessões HTTP, cursores de banco). Saber usar tudo isso é o que separa código asyncio brincalhão de código asyncio profissional.`,
    codes: [
      {
        lang: "python",
        code: `import asyncio

async def trabalhar(nome, s):
    print(f"{nome} iniciou")
    await asyncio.sleep(s)
    print(f"{nome} terminou")
    return f"resultado de {nome}"

async def principal():
    # create_task agenda e roda em background
    t1 = asyncio.create_task(trabalhar("A", 2))
    t2 = asyncio.create_task(trabalhar("B", 1))

    # podemos fazer outras coisas aqui
    print("tarefas disparadas")

    r1 = await t1
    r2 = await t2
    print(r1, r2)

asyncio.run(principal())`,
      },
      {
        lang: "python",
        code: `import asyncio

async def longa():
    try:
        await asyncio.sleep(10)
        return "terminou"
    except asyncio.CancelledError:
        print("fui cancelada, limpando recursos")
        raise

async def principal():
    t = asyncio.create_task(longa())
    await asyncio.sleep(1)
    t.cancel()              # pede cancelamento
    try:
        await t
    except asyncio.CancelledError:
        print("task cancelada com sucesso")

asyncio.run(principal())`,
      },
      {
        lang: "python",
        code: `import asyncio

async def lenta():
    await asyncio.sleep(5)
    return "pronto"

async def principal():
    try:
        # cancela automaticamente se passar de 2s
        resultado = await asyncio.wait_for(lenta(), timeout=2)
        print(resultado)
    except asyncio.TimeoutError:
        print("estourou o tempo!")

asyncio.run(principal())`,
      },
      {
        lang: "python",
        code: `import asyncio

# return_exceptions=True faz gather não interromper as outras
async def pode_falhar(x):
    if x == 2:
        raise ValueError("dois quebra")
    await asyncio.sleep(0.1)
    return x

async def principal():
    resultados = await asyncio.gather(
        pode_falhar(1),
        pode_falhar(2),
        pode_falhar(3),
        return_exceptions=True,    # erros viram itens da lista
    )
    print(resultados)
# → [1, ValueError('dois quebra'), 3]

asyncio.run(principal())`,
      },
      {
        lang: "python",
        code: `import asyncio

# async for / async with funcionam com bibliotecas async-aware
class CursorFake:
    def __init__(self):
        self.i = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.i >= 3:
            raise StopAsyncIteration
        self.i += 1
        await asyncio.sleep(0.1)
        return f"linha {self.i}"

async def principal():
    async for linha in CursorFake():
        print(linha)

asyncio.run(principal())`,
      },
    ],
    points: [
      "create_task agenda uma corotina para rodar em segundo plano.",
      "Task.cancel() pede o cancelamento; CancelledError chega no próximo await.",
      "asyncio.wait_for aplica timeout e cancela se exceder.",
      "gather com return_exceptions=True coleta erros em vez de propagar.",
      "async with e async for são versões assíncronas de with/for.",
      "Tudo roda em um único thread, alternando entre corotinas no loop.",
      "Tarefas órfãs (sem await) podem ser garbage-coletadas e perder o resultado.",
      "Erros em uma das tasks de gather, sem return_exceptions, cancelam as outras.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Não bloqueie o loop com chamadas síncronas pesadas. Use asyncio.to_thread ou loop.run_in_executor para mover trabalho de CPU para fora.",
      },
      {
        type: "tip",
        content: "Para limpar recursos no cancelamento, capture CancelledError, faça a limpeza e re-lance. Engolir o erro quebra o controle de fluxo.",
      },
      {
        type: "info",
        content: "A partir do Python 3.11, asyncio.TaskGroup oferece uma API moderna para gerenciar várias tarefas com tratamento de erros mais limpo.",
      },
    ],
  },
  {
    slug: "threads",
    section: "io-tipagem",
    title: "Threads em Python",
    difficulty: "avancado",
    subtitle: "Concorrência com threading para tarefas de I/O.",
    intro: `Threads são linhas de execução que rodam dentro do mesmo processo, compartilhando memória. No Python, o módulo \`threading\` permite criar várias delas para fazer coisas em paralelo — pelo menos do ponto de vista do programador.

A grande pegadinha do Python é o GIL (Global Interpreter Lock): mesmo com várias threads, só uma executa código Python por vez. Isso significa que threads NÃO aceleram cálculo puro de CPU. Em compensação, durante operações de I/O (leitura de arquivo, rede, banco), o GIL é liberado, e threads brilham para esperar várias coisas ao mesmo tempo.

Use threads quando: você tem várias requisições HTTP para fazer, vários arquivos para baixar, várias conexões abertas. Não use threads para: comprimir vídeos, renderizar imagens, treinar redes neurais — para esses casos, use \`multiprocessing\`.

Outro cuidado clássico: threads compartilham memória, então duas threads alterando a mesma variável podem causar resultados imprevisíveis. Para isso existem \`Lock\`, \`Queue\` e outras primitivas de sincronização.`,
    codes: [
      {
        lang: "python",
        code: `import threading
import time

def trabalhar(nome, segundos):
    print(f"{nome} começou")
    time.sleep(segundos)         # simula I/O
    print(f"{nome} terminou")

# Cria duas threads que rodam em paralelo
t1 = threading.Thread(target=trabalhar, args=("A", 2))
t2 = threading.Thread(target=trabalhar, args=("B", 2))

t1.start()
t2.start()
t1.join()    # espera A terminar
t2.join()    # espera B terminar
# Tempo total ~2s, não 4s`,
      },
      {
        lang: "python",
        code: `import threading

# Acesso concorrente sem proteção — resultado imprevisível
contador = 0

def incrementar():
    global contador
    for _ in range(100_000):
        contador += 1     # NÃO é atômico

threads = [threading.Thread(target=incrementar) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()

print(contador)   # esperado 400_000, mas pode dar menos`,
      },
      {
        lang: "python",
        code: `import threading

# Versão segura: protege com Lock
contador = 0
lock = threading.Lock()

def incrementar():
    global contador
    for _ in range(100_000):
        with lock:               # só uma thread por vez aqui dentro
            contador += 1

threads = [threading.Thread(target=incrementar) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()

print(contador)   # → 400000, sempre`,
      },
      {
        lang: "python",
        code: `import threading
import queue
import time

# Padrão produtor/consumidor com Queue (já é thread-safe)
fila = queue.Queue()

def produtor():
    for i in range(5):
        fila.put(i)
        time.sleep(0.1)
    fila.put(None)              # sinaliza fim

def consumidor():
    while True:
        item = fila.get()
        if item is None:
            break
        print("processei", item)

t1 = threading.Thread(target=produtor)
t2 = threading.Thread(target=consumidor)
t1.start(); t2.start()
t1.join(); t2.join()`,
      },
      {
        lang: "python",
        code: `import threading

# Daemon threads morrem junto com o programa principal
def loop_eterno():
    while True:
        pass

t = threading.Thread(target=loop_eterno, daemon=True)
t.start()
# Programa principal termina, daemon vai junto.`,
      },
    ],
    points: [
      "Threading roda várias linhas de execução no mesmo processo.",
      "O GIL impede que threads acelerem código de CPU puro.",
      "Threads brilham em I/O: rede, disco, banco, espera de qualquer tipo.",
      "Compartilham memória, então race conditions são reais — use Lock.",
      "queue.Queue é thread-safe e ideal para padrão produtor/consumidor.",
      "Sempre chame t.join() para esperar a thread terminar antes de prosseguir.",
      "Daemon threads morrem junto com o programa principal — úteis para tarefas de fundo.",
      "Para CPU-bound, use multiprocessing em vez de threading.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Acessar variáveis compartilhadas sem Lock leva a bugs intermitentes e dificílimos de reproduzir. Sempre proteja escrita concorrente.",
      },
      {
        type: "tip",
        content: "Para muitos casos de I/O, asyncio é mais leve que threads. Threads ainda valem quando você usa bibliotecas síncronas que não têm versão async.",
      },
      {
        type: "danger",
        content: "Não tente usar threads para acelerar código que faz cálculo numérico pesado em puro Python. O GIL vai serializar tudo.",
      },
    ],
  },
  {
    slug: "multiprocessing",
    section: "io-tipagem",
    title: "multiprocessing: paralelismo real",
    difficulty: "avancado",
    subtitle: "Vários processos para escapar do GIL e usar todos os núcleos.",
    intro: `Quando você precisa de paralelismo de verdade — usar todos os núcleos do processador para tarefas pesadas de CPU — threads não resolvem por causa do GIL. A solução é \`multiprocessing\`: criar processos separados, cada um com seu próprio interpretador Python e seu próprio GIL.

Cada processo é uma cópia independente do programa. Eles não compartilham memória diretamente: para trocar dados é preciso usar filas, pipes ou memória compartilhada. Isso traz overhead, mas em troca você tem paralelismo real, com cada núcleo da CPU trabalhando ao mesmo tempo.

O caso de uso clássico é processamento de imagens, machine learning, simulações numéricas, qualquer coisa que faria a CPU ferver. Para tarefas leves ou de I/O, multiprocessing é exagero — o custo de criar processo e serializar dados pode ser maior que o ganho.

Os exemplos abaixo mostram como criar processos manualmente, como usar \`Pool\` para distribuir trabalho entre vários workers e por que objetos passados entre processos precisam ser serializáveis com pickle.`,
    codes: [
      {
        lang: "python",
        code: `import multiprocessing as mp
import time

def cpu_pesado(n):
    soma = 0
    for i in range(n):
        soma += i * i
    return soma

if __name__ == "__main__":
    inicio = time.time()
    processos = []
    for _ in range(4):
        p = mp.Process(target=cpu_pesado, args=(10_000_000,))
        p.start()
        processos.append(p)
    for p in processos:
        p.join()
    print(f"tempo: {time.time() - inicio:.2f}s")`,
      },
      {
        lang: "python",
        code: `import multiprocessing as mp

def quadrado(x):
    return x * x

if __name__ == "__main__":
    # Pool distribui trabalho entre N workers
    with mp.Pool(processes=4) as pool:
        resultados = pool.map(quadrado, range(10))
    print(resultados)
    # → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
      },
      {
        lang: "python",
        code: `import multiprocessing as mp

def trabalhar(item, fila):
    fila.put(f"processei {item}")

if __name__ == "__main__":
    fila = mp.Queue()
    processos = []
    for i in range(3):
        p = mp.Process(target=trabalhar, args=(i, fila))
        p.start()
        processos.append(p)
    for p in processos:
        p.join()

    while not fila.empty():
        print(fila.get())`,
      },
      {
        lang: "python",
        code: `import multiprocessing as mp

# Comparando map paralelo vs sequencial
import time

def lento(n):
    time.sleep(0.5)
    return n * 2

if __name__ == "__main__":
    inicio = time.time()
    seq = [lento(i) for i in range(8)]
    print(f"seq: {time.time() - inicio:.1f}s")  # ~4s

    inicio = time.time()
    with mp.Pool(4) as pool:
        par = pool.map(lento, range(8))
    print(f"par: {time.time() - inicio:.1f}s")  # ~1s`,
      },
      {
        lang: "python",
        code: `import multiprocessing as mp

# Tudo que viaja entre processos precisa ser pickle-friendly
def trabalho(func):
    return func()

if __name__ == "__main__":
    # Lambdas não são pickláveis — vai dar erro
    try:
        with mp.Pool(2) as pool:
            pool.map(trabalho, [lambda: 1, lambda: 2])
    except Exception as e:
        print("erro:", type(e).__name__)`,
      },
    ],
    points: [
      "Cada processo tem seu próprio interpretador e seu próprio GIL.",
      "Multiprocessing dá paralelismo real, ideal para CPU-bound.",
      "Pool.map distribui itens entre workers automaticamente.",
      "Trocar dados entre processos exige pickle e tem overhead.",
      "Sempre proteja com if __name__ == '__main__': no Windows e macOS.",
      "Lambdas e funções aninhadas não são pickláveis — vão falhar.",
      "Para I/O leve, multiprocessing é overkill: use threads ou asyncio.",
      "Queue, Pipe e Manager permitem comunicação entre processos.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Sempre proteja seu código com if __name__ == '__main__'. Sem isso, no Windows os filhos importam o módulo de novo e entram em loop infinito.",
      },
      {
        type: "info",
        content: "Funções e dados passados para Pool precisam ser pickláveis. Defina-as no nível do módulo, não dentro de outras funções ou como lambdas.",
      },
      {
        type: "tip",
        content: "Para bibliotecas como NumPy ou Pandas que liberam o GIL internamente, threads podem ser suficientes. Faça benchmark antes de partir para processos.",
      },
    ],
  },
  {
    slug: "concurrent-futures",
    section: "io-tipagem",
    title: "concurrent.futures",
    difficulty: "intermediario",
    subtitle: "API uniforme para threads e processos.",
    intro: `Lidar diretamente com \`threading\` e \`multiprocessing\` exige conhecer suas APIs específicas, gerenciar joins, locks, filas. O módulo \`concurrent.futures\` oferece uma camada de abstração superior, com uma API simples e idêntica para threads e processos.

A ideia central é o "executor": você cria um pool (\`ThreadPoolExecutor\` ou \`ProcessPoolExecutor\`), submete tarefas com \`submit()\` ou \`map()\`, e recebe \`Future\` objects que representam o resultado pendente. Quando o trabalho termina, o future entrega o resultado ou levanta a exceção.

A grande beleza é que você pode trocar threads por processos mudando uma única classe — o resto do código continua igual. Isso facilita experimentar qual modelo é melhor para seu problema sem reescrever tudo.

Use \`ThreadPoolExecutor\` para I/O e \`ProcessPoolExecutor\` para CPU. Para a maioria dos casos do dia a dia, é a forma mais limpa e legível de escrever código concorrente em Python. Não substitui asyncio quando você precisa de eficiência máxima em I/O massivo, mas é mais fácil de adotar.`,
    codes: [
      {
        lang: "python",
        code: `from concurrent.futures import ThreadPoolExecutor
import time

def baixar(url):
    print(f"baixando {url}")
    time.sleep(1)              # simula latência
    return f"ok {url}"

urls = ["a.com", "b.com", "c.com"]

with ThreadPoolExecutor(max_workers=3) as ex:
    resultados = list(ex.map(baixar, urls))

print(resultados)  # → ['ok a.com', 'ok b.com', 'ok c.com']`,
      },
      {
        lang: "python",
        code: `from concurrent.futures import ProcessPoolExecutor

def quadrado(n):
    return n * n

if __name__ == "__main__":
    # Mesma API, agora com processos para CPU
    with ProcessPoolExecutor(max_workers=4) as ex:
        resultados = list(ex.map(quadrado, range(10)))
    print(resultados)`,
      },
      {
        lang: "python",
        code: `from concurrent.futures import ThreadPoolExecutor, as_completed
import time, random

def tarefa(n):
    time.sleep(random.random())
    return n * 10

with ThreadPoolExecutor(max_workers=4) as ex:
    futures = [ex.submit(tarefa, i) for i in range(5)]
    # Recebe resultados na ordem em que ficam prontos, não na ordem submetida
    for f in as_completed(futures):
        print("pronto:", f.result())`,
      },
      {
        lang: "python",
        code: `from concurrent.futures import ThreadPoolExecutor

def pode_falhar(n):
    if n == 2:
        raise ValueError("dois quebra")
    return n

with ThreadPoolExecutor() as ex:
    futures = [ex.submit(pode_falhar, i) for i in range(4)]
    for f in futures:
        try:
            print(f.result())   # re-lança a exceção
        except ValueError as e:
            print("erro:", e)`,
      },
      {
        lang: "python",
        code: `from concurrent.futures import ThreadPoolExecutor

# submit devolve um Future, que tem result(), done() e exception()
with ThreadPoolExecutor() as ex:
    f = ex.submit(pow, 2, 10)
    print(f.done())              # → False (provavelmente)
    print(f.result(timeout=2))   # → 1024  (espera com timeout)`,
      },
    ],
    points: [
      "concurrent.futures unifica threads e processos com a mesma API.",
      "ThreadPoolExecutor para I/O; ProcessPoolExecutor para CPU.",
      "submit() devolve um Future; result() bloqueia até terminar.",
      "map() preserva a ordem; as_completed() entrega na ordem de conclusão.",
      "Exceções dentro da tarefa são re-lançadas quando você chama result().",
      "Sempre use o executor com 'with' para garantir o shutdown limpo.",
      "Trocar Thread por Process geralmente exige só mudar a classe usada.",
      "Para I/O massivo de altíssima escala, asyncio ainda costuma ser mais eficiente.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Comece com ThreadPoolExecutor. Se descobrir que o gargalo é CPU e não I/O, troque por ProcessPoolExecutor — o resto do código fica igual.",
      },
      {
        type: "info",
        content: "as_completed é ideal quando algumas tarefas terminam antes de outras e você quer começar a processar resultados o quanto antes.",
      },
      {
        type: "warning",
        content: "Cuidado com pools muito grandes. Cada thread consome memória, e cada processo muito mais. Comece pequeno e meça.",
      },
    ],
  },
  {
    slug: "gil",
    section: "io-tipagem",
    title: "Entendendo o GIL",
    difficulty: "avancado",
    subtitle: "O Global Interpreter Lock e por que ele importa para você.",
    intro: `O GIL — Global Interpreter Lock — é provavelmente o tema mais polêmico do Python. É um mutex (um cadeado) dentro do CPython, a implementação oficial, que garante que apenas uma thread execute bytecode Python por vez. Mesmo em uma máquina com 16 núcleos, só uma thread Python roda por vez.

A razão de ele existir é histórica e prática: o GIL torna o gerenciamento de memória do CPython muito mais simples e rápido para código de uma thread só. Remover o GIL é tecnicamente possível (existem esforços recentes como o "free-threaded Python" da PEP 703), mas significa repensar décadas de código.

Na prática, o GIL afeta você de forma específica: threads não aceleram tarefas de CPU, mas continuam excelentes para I/O, porque o GIL é liberado quando uma thread espera operações fora do interpretador (rede, disco, syscall). Para CPU paralela de verdade, use multiprocessing, que cria processos com seus próprios GILs.

Saber disso evita frustração: muita gente tenta paralelizar um cálculo pesado com threads e descobre que o programa fica IGUAL ou mais lento. Conhecer o GIL é saber qual ferramenta escolher para qual problema.`,
    codes: [
      {
        lang: "python",
        code: `import threading
import time

def cpu_pesado(n):
    soma = 0
    for i in range(n):
        soma += i * i

# Sequencial
inicio = time.time()
cpu_pesado(20_000_000)
cpu_pesado(20_000_000)
print(f"sequencial: {time.time() - inicio:.2f}s")`,
      },
      {
        lang: "python",
        code: `import threading
import time

def cpu_pesado(n):
    soma = 0
    for i in range(n):
        soma += i * i

# Com threads — esperaríamos cair pela metade, mas não cai
inicio = time.time()
t1 = threading.Thread(target=cpu_pesado, args=(20_000_000,))
t2 = threading.Thread(target=cpu_pesado, args=(20_000_000,))
t1.start(); t2.start()
t1.join();  t2.join()
print(f"2 threads CPU: {time.time() - inicio:.2f}s")
# Tempo igual ou maior que sequencial — culpa do GIL`,
      },
      {
        lang: "python",
        code: `import threading
import time

# Para I/O, o GIL é liberado e threads brilham
def io_pesado():
    time.sleep(2)        # simula chamada de rede

inicio = time.time()
threads = [threading.Thread(target=io_pesado) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(f"5 threads I/O: {time.time() - inicio:.2f}s")
# → ~2s, não 10s`,
      },
      {
        lang: "python",
        code: `import multiprocessing as mp
import time

def cpu_pesado(n):
    soma = 0
    for i in range(n):
        soma += i * i

if __name__ == "__main__":
    inicio = time.time()
    p1 = mp.Process(target=cpu_pesado, args=(20_000_000,))
    p2 = mp.Process(target=cpu_pesado, args=(20_000_000,))
    p1.start(); p2.start()
    p1.join();  p2.join()
    print(f"2 processos CPU: {time.time() - inicio:.2f}s")
    # Cai pela metade — paralelismo real`,
      },
      {
        lang: "python",
        code: `# Bibliotecas que liberam o GIL internamente continuam aproveitando threads
import threading
import numpy as np

def calc():
    a = np.random.rand(2000, 2000)
    np.dot(a, a)              # NumPy libera o GIL aqui

threads = [threading.Thread(target=calc) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
# NumPy/Pandas/scikit-learn liberam GIL em operações vetorizadas`,
      },
    ],
    points: [
      "GIL é o cadeado que garante uma thread Python por vez no CPython.",
      "Threads não aceleram CPU pura, mas brilham em I/O.",
      "Multiprocessing cria processos com GILs próprios — paralelismo real.",
      "Bibliotecas como NumPy liberam o GIL em operações C-internas.",
      "Outras implementações (PyPy, Jython) têm comportamento diferente.",
      "PEP 703 propõe Python sem GIL; ainda experimental no 3.13.",
      "Saber disso evita escolher a ferramenta errada para o problema.",
      "Para I/O em escala, asyncio é mais leve do que threads ou processos.",
    ],
    alerts: [
      {
        type: "info",
        content: "O GIL existe só no CPython. Implementações alternativas como Jython e IronPython não têm GIL, mas raramente são usadas em produção.",
      },
      {
        type: "tip",
        content: "Antes de partir para multiprocessing, veja se sua biblioteca já libera o GIL. NumPy, Pandas e scikit-learn fazem isso na maioria das operações pesadas.",
      },
      {
        type: "warning",
        content: "Não use threads esperando ganho de CPU em código Python puro. Você vai descobrir que ficou igual ou pior que a versão sequencial.",
      },
    ],
  },
];
