import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "modulos-import",
    section: "modulos-erros",
    title: "Módulos e import",
    difficulty: "iniciante",
    subtitle: "Organizando código em arquivos reutilizáveis.",
    intro: `Imagine que você abriu uma lojinha e está anotando tudo num único caderno: estoque, vendas, clientes, fornecedores. No começo funciona, mas quando o caderno passa de cem páginas, achar qualquer coisa vira um pesadelo. Programar é igual. Colocar tudo num único arquivo .py funciona até o projeto crescer.

Um módulo, em Python, é simplesmente um arquivo com extensão .py. Quando você escreve "import calculadora", o Python procura um arquivo chamado calculadora.py e carrega tudo que está dentro dele para você usar. É a forma de dividir o programa em pedaços menores, cada um com uma responsabilidade clara.

Além dos seus próprios módulos, o Python já vem com centenas prontos (a chamada biblioteca padrão): math, random, datetime, json, os, e por aí vai. Aprender a importar é o primeiro passo para parar de reinventar a roda.

Neste capítulo você vai entender as várias formas de importar, quando usar cada uma, e por que importar tudo com asterisco quase sempre é uma má ideia. Nos próximos, isso vai ser usado o tempo todo.`,
    codes: [
      {
        lang: "python",
        code: `# arquivo: calculadora.py
# Um módulo nada mais é que um arquivo .py com funções e variáveis.

PI = 3.14159  # constante exposta pelo módulo

def soma(a, b):
    return a + b

def area_circulo(raio):
    return PI * raio * raio`,
      },
      {
        lang: "python",
        code: `# arquivo: app.py (no mesmo diretório de calculadora.py)
import calculadora  # carrega o módulo inteiro

# Para usar algo de dentro, prefixamos com o nome do módulo.
print(calculadora.soma(2, 3))         # → 5
print(calculadora.area_circulo(10))   # → 314.159
print(calculadora.PI)                 # → 3.14159`,
      },
      {
        lang: "python",
        code: `# Importando só o que você precisa: economiza digitação.
from calculadora import soma, PI

print(soma(10, 5))  # → 15, sem precisar do prefixo
print(PI)           # → 3.14159

# Cuidado: agora "soma" no seu arquivo se refere à função importada.
# Se você criar outra "soma", a importada será sobrescrita.`,
      },
      {
        lang: "python",
        code: `# Apelidos com "as": útil quando o nome é longo ou conflita.
import calculadora as calc
from datetime import datetime as dt

print(calc.soma(1, 2))    # → 3
print(dt.now())            # mostra a data/hora atual

# Convenções comuns no ecossistema Python:
# import numpy as np
# import pandas as pd`,
      },
      {
        lang: "python",
        code: `# Importando da biblioteca padrão (já vem com Python).
import math
import random

print(math.sqrt(16))          # → 4.0  (raiz quadrada)
print(math.pi)                # → 3.141592653589793
print(random.randint(1, 10))  # → número aleatório entre 1 e 10`,
      },
      {
        lang: "python",
        code: `# O famoso "from módulo import *" — evite!
from math import *  # importa TUDO de math

# Funciona, mas polui o seu espaço de nomes:
print(sqrt(9))  # → 3.0
# Se você tinha uma variável "pi" antes, ela foi sobrescrita silenciosamente.
# Em projetos reais, isso causa bugs difíceis de rastrear.`,
      },
    ],
    points: [
      "Um módulo é apenas um arquivo .py — nada mais místico que isso.",
      "import módulo carrega o arquivo inteiro; você acessa tudo via módulo.coisa.",
      "from módulo import nome traz só o que você precisa, sem prefixo.",
      "import ... as apelido é útil para nomes longos ou conflitos.",
      "A biblioteca padrão (math, random, json, datetime) já vem instalada com o Python.",
      "Evite from módulo import * — sobrescreve nomes silenciosamente e dificulta debug.",
      "O Python procura módulos no diretório atual e em pastas do sys.path.",
      "Se o arquivo não for encontrado, você recebe ModuleNotFoundError.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Coloque os imports sempre no topo do arquivo, agrupados em três blocos: padrão, terceiros, e seus módulos. Essa é a convenção do PEP 8.",
      },
      {
        type: "warning",
        content: "Importar gera execução: todo código no nível de topo do módulo importado roda. Por isso código solto fora de funções pode causar surpresas.",
      },
      {
        type: "info",
        content: "ModuleNotFoundError quase sempre significa nome digitado errado, arquivo no diretório errado, ou ambiente virtual desativado.",
      },
    ],
  },
  {
    slug: "if-name-main",
    section: "modulos-erros",
    title: "if __name__ == '__main__'",
    difficulty: "iniciante",
    subtitle: "Por que esse padrão estranho aparece em todo lugar.",
    intro: `Quando você lê código Python na internet, mais cedo ou mais tarde se depara com a linha if __name__ == "__main__":. Para iniciantes, isso parece runas mágicas. Mas a ideia por trás é simples e útil.

Um arquivo .py tem dois papéis possíveis: ele pode ser executado diretamente (você roda "python app.py" no terminal) ou ele pode ser importado por outro arquivo (alguém escreve "import app"). Você muitas vezes quer que parte do código rode só no primeiro caso, nunca no segundo.

Por exemplo: você tem um módulo cheio de funções úteis e gostaria de testar essas funções rapidamente. Se você colocar prints e chamadas de teste soltos no fim do arquivo, eles vão executar mesmo quando alguém importar o módulo — o que polui a saída e às vezes quebra outros programas.

A variável __name__ é definida automaticamente pelo Python em cada módulo. Quando o arquivo é executado direto, ela vale "__main__". Quando é importado, ela vale o nome do módulo. Esse "if" é portanto um interruptor: rode isto só se eu fui chamado direto. É um padrão tão comum que vale a pena entender bem desde o início.`,
    codes: [
      {
        lang: "python",
        code: `# arquivo: saudacoes.py
def ola(nome):
    return f"Olá, {nome}!"

# Código de teste — queremos que rode apenas se o arquivo for executado direto.
if __name__ == "__main__":
    print(ola("Ana"))   # → Olá, Ana!
    print(ola("Bruno")) # → Olá, Bruno!`,
      },
      {
        lang: "bash",
        code: `# Executando direto: o bloco do if roda.
$ python saudacoes.py
Olá, Ana!
Olá, Bruno!`,
      },
      {
        lang: "python",
        code: `# arquivo: outro.py — importando saudacoes.
import saudacoes

print(saudacoes.ola("Carla"))
# → Olá, Carla!
# Repare que os prints de teste de saudacoes.py NÃO apareceram,
# porque __name__ dentro de saudacoes virou "saudacoes", não "__main__".`,
      },
      {
        lang: "python",
        code: `# Provando que __name__ muda dependendo do contexto.
# arquivo: detector.py
print(f"Meu __name__ vale: {__name__}")

if __name__ == "__main__":
    print("Estou sendo executado diretamente.")
else:
    print("Estou sendo importado por outro arquivo.")`,
      },
      {
        lang: "python",
        code: `# Padrão profissional: encapsular a lógica em uma função main().
def main():
    print("Iniciando o programa...")
    # toda a lógica do app fica aqui

def calcula(x, y):
    return x + y

if __name__ == "__main__":
    main()
# Vantagem: variáveis dentro de main() são locais, não poluem o módulo.`,
      },
    ],
    points: [
      "__name__ é uma variável automática que cada módulo recebe do Python.",
      "Quando o arquivo é executado direto, __name__ vale '__main__'.",
      "Quando o arquivo é importado, __name__ vale o nome do módulo.",
      "Use o if para isolar testes, demos e ponto de entrada do script.",
      "Sem isso, código de teste roda também ao importar — efeito colateral indesejado.",
      "Encapsular o ponto de entrada numa função main() é a forma mais limpa.",
      "Esse padrão é onipresente em projetos Python — vale memorizar.",
    ],
    alerts: [
      {
        type: "info",
        content: "Não é obrigatório usar esse if em todo arquivo. Faz sentido principalmente em módulos que também podem ser importados como biblioteca.",
      },
      {
        type: "tip",
        content: "Se você só vai executar o arquivo como script, pode escrever direto. Mas adquirir o hábito do if __name__ economiza dor de cabeça quando o projeto cresce.",
      },
      {
        type: "warning",
        content: "Esqueça o if e tudo que estiver no nível de topo do arquivo vai executar a cada import — incluindo prints, conexões de banco, downloads etc.",
      },
    ],
  },
  {
    slug: "pacotes",
    section: "modulos-erros",
    title: "Criando pacotes",
    difficulty: "intermediario",
    subtitle: "Organizando módulos em pastas com __init__.py.",
    intro: `Um módulo é um arquivo. Um pacote é uma pasta com vários arquivos. Quando seu projeto cresce e você tem dez, vinte, cinquenta arquivos .py, agrupá-los em pastas é o passo natural — exatamente como organizar fotos em álbuns em vez de jogar tudo numa pasta única.

Um pacote em Python é uma pasta que contém um arquivo especial chamado __init__.py. Esse arquivo pode estar vazio: a sua presença é o suficiente para o Python entender "esta pasta é um pacote, pode importar coisas dela". Ele também serve para configurar o que aparece quando alguém importa o pacote.

Pacotes podem conter outros pacotes, formando uma hierarquia. Por exemplo, "lojinha.estoque.produtos" significa: dentro do pacote lojinha, abra o subpacote estoque, e lá pegue o módulo produtos. Esse caminho com pontos espelha exatamente a estrutura de pastas no disco.

Saber estruturar pacotes é o que separa um script bagunçado de uma aplicação manutenível. Você verá esse padrão em qualquer biblioteca séria: Django, Flask, Pandas, FastAPI — todas são pacotes com subpacotes.`,
    codes: [
      {
        lang: "bash",
        code: `# Estrutura de pastas que vamos criar:
lojinha/
├── __init__.py          # marca lojinha como pacote
├── estoque.py
├── vendas.py
└── clientes/
    ├── __init__.py      # marca clientes como subpacote
    ├── pessoa_fisica.py
    └── pessoa_juridica.py`,
      },
      {
        lang: "python",
        code: `# arquivo: lojinha/estoque.py
def adicionar(produto, quantidade):
    print(f"Adicionando {quantidade}x {produto}")

def listar():
    return ["Caderno", "Caneta", "Borracha"]`,
      },
      {
        lang: "python",
        code: `# arquivo: lojinha/clientes/pessoa_fisica.py
def cadastrar(nome, cpf):
    return {"tipo": "PF", "nome": nome, "cpf": cpf}

# arquivo: lojinha/clientes/pessoa_juridica.py
def cadastrar(nome, cnpj):
    return {"tipo": "PJ", "nome": nome, "cnpj": cnpj}`,
      },
      {
        lang: "python",
        code: `# arquivo: app.py (na raiz, ao lado da pasta lojinha/)
# Importando módulos de dentro de pacotes:
from lojinha import estoque
from lojinha.clientes import pessoa_fisica

estoque.adicionar("Caderno", 5)
print(estoque.listar())

cliente = pessoa_fisica.cadastrar("Ana", "123.456.789-00")
print(cliente)`,
      },
      {
        lang: "python",
        code: `# arquivo: lojinha/__init__.py
# O __init__ pode expor coisas para quem importa o pacote diretamente.
from .estoque import listar as listar_estoque

# Agora alguém pode fazer:
# from lojinha import listar_estoque
# sem precisar saber o caminho interno completo.`,
      },
      {
        lang: "python",
        code: `# Imports relativos (dentro do mesmo pacote).
# arquivo: lojinha/vendas.py
from .estoque import listar  # o ponto significa "do mesmo pacote"
from .clientes import pessoa_fisica

def registrar_venda():
    produtos = listar()
    cliente = pessoa_fisica.cadastrar("Bruno", "111.222.333-44")
    print(f"Venda para {cliente['nome']}: {produtos}")`,
      },
    ],
    points: [
      "Pacote = pasta com um arquivo __init__.py dentro.",
      "Subpacotes funcionam aninhando pastas, cada uma com seu __init__.py.",
      "O caminho com pontos no import espelha a estrutura de pastas.",
      "__init__.py pode ficar vazio, ou pode reexportar coisas para simplificar a API do pacote.",
      "Imports relativos usam pontos: from . importa do mesmo pacote, from .. importa do pai.",
      "Imports relativos só funcionam dentro de pacotes, não em scripts soltos.",
      "Organize por domínio (estoque, vendas, clientes), não por tipo (models, views, utils) — é mais escalável.",
      "Sem __init__.py o Python ainda pode tratar a pasta como 'namespace package', mas ter o arquivo é mais previsível.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Um __init__.py bem escrito serve como porta da frente do pacote: importe nele as coisas que você quer expor publicamente, escondendo a estrutura interna.",
      },
      {
        type: "warning",
        content: "Se você executar python lojinha/vendas.py direto, os imports relativos quebram. Eles assumem que o arquivo está sendo carregado como parte de um pacote.",
      },
      {
        type: "info",
        content: "Em projetos modernos, o pacote principal costuma ficar dentro de uma pasta src/, separando código de testes e arquivos de configuração.",
      },
    ],
  },
  {
    slug: "excecoes",
    section: "modulos-erros",
    title: "Exceções: try/except/finally",
    difficulty: "iniciante",
    subtitle: "Lidando com erros sem o programa quebrar.",
    intro: `Programas reais lidam com o mundo real, e o mundo real falha. O usuário digita texto onde se esperava número. O arquivo não existe. A internet caiu. Sem um plano para esses momentos, o seu script morre com aquela tela vermelha cheia de "Traceback".

Python usa exceções para sinalizar erros. Quando algo dá errado, em vez de retornar um código de erro como em linguagens antigas, o Python "lança" uma exceção que sobe pela pilha de chamadas até alguém tratá-la. Se ninguém tratar, o programa termina e o traceback aparece.

A estrutura try/except diz: tente executar este bloco; se uma exceção aparecer, em vez de quebrar, rode esta outra parte. Você pode capturar tipos específicos (ValueError, FileNotFoundError, ZeroDivisionError) ou genéricos. Há também o else (roda quando deu certo) e o finally (roda sempre, deu certo ou não — perfeito para fechar arquivos e conexões).

Aprender a tratar exceções com cuidado é o que distingue script de hobby de software profissional. Mas atenção: capturar tudo e ignorar é tão ruim quanto não tratar nada — você esconde bugs reais.`,
    codes: [
      {
        lang: "python",
        code: `# Sem tratamento: o programa quebra e o usuário vê um traceback feio.
idade = int(input("Digite sua idade: "))
# Se o usuário digitar "vinte", crash:
# ValueError: invalid literal for int() with base 10: 'vinte'
print(f"Você tem {idade} anos.")`,
      },
      {
        lang: "python",
        code: `# Com try/except: tratamos o erro e damos uma mensagem amigável.
try:
    idade = int(input("Digite sua idade: "))
    print(f"Você tem {idade} anos.")
except ValueError:
    print("Por favor, digite um número inteiro válido.")`,
      },
      {
        lang: "python",
        code: `# Capturando tipos diferentes de exceção, cada um com sua mensagem.
try:
    a = int(input("Numerador: "))
    b = int(input("Denominador: "))
    print(a / b)
except ValueError:
    print("Você precisa digitar números.")
except ZeroDivisionError:
    print("Não dá para dividir por zero.")`,
      },
      {
        lang: "python",
        code: `# Capturando o objeto da exceção para inspecionar a mensagem.
try:
    open("config.txt")
except FileNotFoundError as erro:
    print(f"Arquivo não encontrado: {erro}")
    # erro.filename guarda o caminho que falhou
    print(f"Caminho tentado: {erro.filename}")`,
      },
      {
        lang: "python",
        code: `# else roda só se não houve exceção. finally roda sempre.
try:
    arquivo = open("dados.txt")
    conteudo = arquivo.read()
except FileNotFoundError:
    print("Arquivo não existe.")
else:
    # Só executa se o try terminou sem erro.
    print(f"Lidos {len(conteudo)} caracteres.")
finally:
    # Executa SEMPRE — perfeito para liberar recursos.
    print("Limpando recursos...")
    try:
        arquivo.close()
    except NameError:
        pass`,
      },
      {
        lang: "python",
        code: `# Anti-padrão: capturar tudo e engolir silenciosamente.
try:
    fazer_algo_complicado()
except Exception:
    pass  # PÉSSIMO: você esconde bugs reais e nunca descobre o porquê.

# Melhor: capturar o tipo certo e, no mínimo, registrar o erro.
try:
    fazer_algo_complicado()
except ValueError as e:
    print(f"Valor inválido: {e}")`,
      },
    ],
    points: [
      "Exceções sinalizam que algo saiu do esperado durante a execução.",
      "try roda o código suspeito; except trata erros específicos.",
      "Cada tipo de exceção (ValueError, FileNotFoundError etc.) tem sua causa típica.",
      "Use 'as nome' para inspecionar o objeto da exceção.",
      "else roda quando o try não lançou exceção; finally roda sempre.",
      "finally é o lugar certo para fechar arquivos, conexões, soltar locks.",
      "Capturar Exception nu (sem tipo) e dar pass é uma armadilha clássica — esconde bugs.",
      "Não use exceções para controle de fluxo normal; elas custam mais e ofuscam a lógica.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca escreva except: pass sem pensar. Você vai engolir KeyboardInterrupt, MemoryError e bugs de digitação, deixando o programa em estado imprevisível.",
      },
      {
        type: "tip",
        content: "Trate o erro mais específico primeiro. Se você capturar Exception antes de FileNotFoundError, o except específico nunca será alcançado.",
      },
      {
        type: "info",
        content: "Toda exceção em Python herda de BaseException. Na prática, capture sempre Exception (ou subclasses), nunca BaseException — senão você bloqueia o Ctrl+C.",
      },
    ],
  },
  {
    slug: "raise-excecoes",
    section: "modulos-erros",
    title: "raise: lançando exceções",
    difficulty: "intermediario",
    subtitle: "Sinalizando erros explícitos no seu próprio código.",
    intro: `Tratar exceções dos outros é metade da história. A outra metade é lançar as suas próprias quando algo não faz sentido continuar. É o jeito Python de dizer ao código que chamou o seu: "olha, isso aqui é um problema, decide o que fazer".

A palavra-chave raise faz exatamente isso. Você escolhe o tipo da exceção (Python tem dezenas prontas: ValueError, TypeError, KeyError, RuntimeError) e passa uma mensagem explicando o que deu errado. O programa para no ponto do raise e a exceção sobe até alguém capturá-la.

Lançar exceções deixa as funções honestas: em vez de retornar um valor mágico (None, -1, "ERRO") esperando que quem chamou se lembre de checar, você grita alto. Quem ignorar, sofre as consequências (e descobre o bug rapidamente).

Você também pode criar suas próprias classes de exceção, herdando de Exception. Isso é útil quando o domínio do seu projeto tem erros típicos: SaldoInsuficienteError numa carteira digital, CPFInvalidoError num cadastro. Nomes próprios deixam o except do chamador muito mais claro.

Por fim, há o re-raise: capturar uma exceção, fazer alguma coisa (logar, limpar) e jogar ela de volta para cima. Padrão comum em código de produção.`,
    codes: [
      {
        lang: "python",
        code: `# Lançando uma exceção embutida quando a entrada é inválida.
def calcular_idade(ano_nascimento):
    if ano_nascimento > 2025:
        raise ValueError(f"Ano de nascimento inválido: {ano_nascimento}")
    return 2025 - ano_nascimento

print(calcular_idade(1990))  # → 35
print(calcular_idade(2030))  # ValueError: Ano de nascimento inválido: 2030`,
      },
      {
        lang: "python",
        code: `# Escolha o tipo certo de exceção pelo significado:
def dividir(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError("a precisa ser número")
    if b == 0:
        raise ZeroDivisionError("não dá para dividir por zero")
    return a / b

# TypeError    → tipo errado
# ValueError   → tipo certo, mas valor não faz sentido
# KeyError     → chave inexistente em dicionário
# IndexError   → índice fora do range
# RuntimeError → erro genérico em tempo de execução`,
      },
      {
        lang: "python",
        code: `# Criando sua própria classe de exceção, herdando de Exception.
class SaldoInsuficienteError(Exception):
    """Lançada quando uma conta não tem saldo para a operação."""

class Conta:
    def __init__(self, saldo):
        self.saldo = saldo

    def sacar(self, valor):
        if valor > self.saldo:
            raise SaldoInsuficienteError(
                f"Saldo R$ {self.saldo:.2f} insuficiente para sacar R$ {valor:.2f}"
            )
        self.saldo -= valor`,
      },
      {
        lang: "python",
        code: `# Usando a exceção customizada — quem chama trata só o que interessa.
conta = Conta(saldo=100)

try:
    conta.sacar(150)
except SaldoInsuficienteError as e:
    print(f"Operação negada: {e}")
# → Operação negada: Saldo R$ 100.00 insuficiente para sacar R$ 150.00`,
      },
      {
        lang: "python",
        code: `# Re-raise: tratar parcialmente e relançar para o nível de cima decidir.
def processar_pagamento(valor):
    try:
        cobrar(valor)
    except Exception as e:
        print(f"[LOG] Falha ao cobrar R$ {valor}: {e}")
        raise  # 'raise' sem argumento relança a mesma exceção

def cobrar(valor):
    raise RuntimeError("gateway de pagamento fora do ar")

# A exceção sobe até onde alguém estiver preparado para tratar.`,
      },
      {
        lang: "python",
        code: `# Encadeamento com 'raise ... from ...': preserva a causa original.
def carregar_config(caminho):
    try:
        with open(caminho) as f:
            return f.read()
    except FileNotFoundError as e:
        raise RuntimeError("Configuração obrigatória ausente") from e

# O traceback mostra: RuntimeError causado por FileNotFoundError.
# Excelente para debug, sem perder a pista do erro original.`,
      },
    ],
    points: [
      "raise lança uma exceção; o programa para até alguém capturar.",
      "Escolha o tipo de exceção pelo significado: ValueError, TypeError, KeyError etc.",
      "Crie classes próprias herdando de Exception para erros do seu domínio.",
      "raise sem argumento (dentro de um except) relança a exceção atual — útil para logar e propagar.",
      "raise X from Y preserva a causa, deixando o traceback explícito.",
      "Lançar exceção é melhor que devolver None ou códigos mágicos para sinalizar falha.",
      "Mensagens de erro devem ser descritivas — incluem valores envolvidos quando possível.",
      "Nunca use exceções para controlar fluxo normal de sucesso (ex.: 'se chave existe, faz x').",
    ],
    alerts: [
      {
        type: "success",
        content: "Classes de exceção próprias documentam o domínio do seu sistema. Bate o olho num SaldoInsuficienteError e você entende sem ler nada mais.",
      },
      {
        type: "tip",
        content: "Comece capturando tipos embutidos. Só crie classes próprias quando o chamador realmente precisa diferenciar esse erro de outros parecidos.",
      },
      {
        type: "warning",
        content: "Não capture e relance perdendo informação. Faça raise (sem argumento) ou raise NovaExc from original. Caso contrário, o traceback fica confuso.",
      },
    ],
  },
  {
    slug: "context-managers",
    section: "modulos-erros",
    title: "Gerenciadores de contexto (with)",
    difficulty: "intermediario",
    subtitle: "Garantindo limpeza automática com 'with'.",
    intro: `Toda vez que você abre um arquivo, conecta num banco, adquire um lock ou inicia um cronômetro, você precisa de algum tipo de "limpeza" depois: fechar o arquivo, devolver a conexão, soltar o lock. Esquecer essa parte é a fonte número um de bugs sutis: arquivos truncados, conexões esgotadas, deadlocks.

A solução clássica é try/finally. Mas o Python oferece açúcar sintático específico para isso: a instrução with. Quando você escreve "with abrir() as x:", o Python garante que a limpeza correspondente vai rodar quando o bloco terminar — mesmo que aconteça uma exceção lá dentro. Isso é o gerenciador de contexto.

Você usa um gerenciador de contexto sempre que abre um arquivo. Isso é o "padrão ouro": with open("arq.txt") as f: torna impossível esquecer o close(). Mas a ideia se estende para qualquer recurso que precisa de pareamento abre/fecha.

Você também pode criar os seus próprios gerenciadores. Tem o jeito clássico (classe com __enter__ e __exit__) e o jeito moderno (decorator @contextmanager do módulo contextlib). Saber criar é útil para encapsular configurações temporárias, transações, métricas de tempo e tudo mais que peça começo+fim.`,
    codes: [
      {
        lang: "python",
        code: `# O jeito antigo: try/finally manual. Funciona, mas é verboso e fácil de errar.
arquivo = open("dados.txt", "w")
try:
    arquivo.write("Olá!")
finally:
    arquivo.close()  # se você esquecer, o arquivo pode não ser gravado

# Pior ainda: sem try, qualquer exceção entre abrir e close vaza o recurso.`,
      },
      {
        lang: "python",
        code: `# O jeito Python: with cuida do close() automaticamente.
with open("dados.txt", "w") as arquivo:
    arquivo.write("Olá, mundo!")
# Aqui fora, o arquivo já está garantidamente fechado,
# mesmo que tenha estourado uma exceção dentro do bloco.`,
      },
      {
        lang: "python",
        code: `# Múltiplos contextos no mesmo with — sintaxe enxuta.
with open("entrada.txt") as origem, open("saida.txt", "w") as destino:
    for linha in origem:
        destino.write(linha.upper())
# Os dois arquivos são fechados ao sair do bloco.`,
      },
      {
        lang: "python",
        code: `# Criando seu próprio gerenciador via classe (__enter__ / __exit__).
class Cronometro:
    def __enter__(self):
        import time
        self.inicio = time.perf_counter()
        return self  # o que vier depois do "as"

    def __exit__(self, tipo_exc, valor_exc, traceback):
        import time
        self.duracao = time.perf_counter() - self.inicio
        print(f"Bloco rodou em {self.duracao:.4f}s")
        # Retornar False (ou None) faz exceções continuarem propagando.

with Cronometro():
    sum(range(1_000_000))
# → Bloco rodou em 0.0123s`,
      },
      {
        lang: "python",
        code: `# Jeito moderno e enxuto: @contextmanager do módulo contextlib.
from contextlib import contextmanager

@contextmanager
def cd_temporario(novo_dir):
    import os
    anterior = os.getcwd()
    os.chdir(novo_dir)
    try:
        yield novo_dir   # tudo antes do yield = setup; depois = limpeza
    finally:
        os.chdir(anterior)

with cd_temporario("/tmp"):
    print("Dentro:", os.getcwd())
print("Fora:", os.getcwd())  # voltou ao diretório original`,
      },
      {
        lang: "python",
        code: `# with com tratamento de exceção: __exit__ recebe a exceção, se houver.
class Transacao:
    def __enter__(self):
        print("BEGIN")
        return self
    def __exit__(self, exc_type, exc_val, tb):
        if exc_type is None:
            print("COMMIT")
        else:
            print(f"ROLLBACK por {exc_type.__name__}: {exc_val}")
        # Retornar True suprimiria a exceção. Geralmente queremos False.
        return False

with Transacao():
    raise ValueError("dado invalido")
# Saída:
# BEGIN
# ROLLBACK por ValueError: dado invalido
# (a exceção continua propagando depois)`,
      },
    ],
    points: [
      "with garante que a limpeza acontece, mesmo se houver exceção dentro do bloco.",
      "open() é o caso mais clássico, mas vale para locks, conexões, transações, sessões.",
      "Você pode listar vários contextos separados por vírgula no mesmo with.",
      "Para criar um gerenciador, defina __enter__ e __exit__ na classe.",
      "@contextmanager do contextlib transforma uma função geradora em context manager.",
      "Tudo antes do yield é setup; tudo depois (preferencialmente em finally) é limpeza.",
      "__exit__ retornar True suprime a exceção. Faça isso só com muita cautela.",
      "Esquecer with em arquivos é bug clássico em Windows: o arquivo fica travado.",
    ],
    alerts: [
      {
        type: "success",
        content: "Sempre use with ao abrir arquivos. É menos código, mais seguro, e impede o bug onde o arquivo só é gravado se você lembrar de chamar close().",
      },
      {
        type: "tip",
        content: "Para criar gerenciadores rápidos, prefira @contextmanager: a função fica linear, com setup antes do yield e limpeza depois, dentro de um try/finally.",
      },
      {
        type: "info",
        content: "Bibliotecas como sqlite3, requests.Session e threading.Lock implementam o protocolo de context manager. Sempre dá uma olhada na documentação para confirmar.",
      },
    ],
  },
  {
    slug: "logging",
    section: "modulos-erros",
    title: "Logging em vez de print",
    difficulty: "intermediario",
    subtitle: "Registro profissional de eventos da aplicação.",
    intro: `Quando você está aprendendo, print é o seu melhor amigo: a gente joga prints por todo lado para ver o que está acontecendo. Mas em programas que vão rodar em produção, em servidor, em background ou em horário em que ninguém está olhando, print não dá conta.

O módulo logging da biblioteca padrão resolve isso. Ele permite que você registre eventos com níveis (DEBUG, INFO, WARNING, ERROR, CRITICAL), decida onde a mensagem vai (console, arquivo, serviço externo), formate a saída (com timestamp, nome do módulo, número da linha) e ajuste tudo isso sem alterar o código que produz o log.

A grande sacada é o nível: você pode encher o código de log.debug() durante o desenvolvimento e, em produção, configurar o sistema para ignorar tudo que for abaixo de WARNING. Os debugs ficam lá, dormindo, prontos para serem ligados quando algo der errado e você precisar investigar.

Logging também integra com o sistema de exceções: log.exception() dentro de um except registra automaticamente o traceback completo. É o jeito profissional de saber por que aquele erro misterioso aconteceu às 3 da manhã sem você estar olhando.`,
    codes: [
      {
        lang: "python",
        code: `# Configuração básica em uma linha — bom para começar.
import logging

logging.basicConfig(level=logging.INFO)

logging.debug("Detalhe técnico que normalmente não aparece")
logging.info("Operação concluída com sucesso")
logging.warning("Algo estranho, mas o programa continua")
logging.error("Algo deu errado")
logging.critical("Falha grave, talvez precise reiniciar")
# Saída padrão:
# INFO:root:Operação concluída com sucesso
# WARNING:root:Algo estranho, mas o programa continua
# ...`,
      },
      {
        lang: "python",
        code: `# Os 5 níveis padrão e quando usar cada um:
# DEBUG    – diagnóstico detalhado para desenvolvedores
# INFO     – marcos importantes do fluxo normal
# WARNING  – algo inesperado, mas o programa continua
# ERROR    – falha em uma operação específica
# CRITICAL – falha grave, programa pode parar

# Você define o nível mínimo que será exibido:
logging.basicConfig(level=logging.WARNING)
logging.info("Não vai aparecer")     # INFO < WARNING
logging.warning("Vai aparecer")`,
      },
      {
        lang: "python",
        code: `# Formato customizado: timestamp, nível, nome do logger, mensagem.
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logging.info("Aplicação iniciada")
# 2025-01-15 10:23:45 [INFO] root: Aplicação iniciada`,
      },
      {
        lang: "python",
        code: `# Logger por módulo — boa prática em projetos com vários arquivos.
import logging

# __name__ traz o nome do módulo automaticamente.
log = logging.getLogger(__name__)

def processar_pedido(pedido_id):
    log.info("Processando pedido %s", pedido_id)
    # ... lógica ...
    log.debug("Pedido %s detalhe interno: ...", pedido_id)

# Usar %s + argumentos é melhor que f-string em logs:
# evita formatar a string se o nível for filtrado.`,
      },
      {
        lang: "python",
        code: `# Gravando logs em arquivo, mantendo o console limpo.
import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logging.info("Tudo isso vai para app.log, não para a tela.")
logging.error("Erros também vão para o arquivo.")`,
      },
      {
        lang: "python",
        code: `# log.exception() dentro de except: registra o traceback completo.
import logging
logging.basicConfig(level=logging.ERROR)
log = logging.getLogger(__name__)

def dividir(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        log.exception("Erro ao dividir %s por %s", a, b)
        return None

dividir(10, 0)
# ERROR:__main__:Erro ao dividir 10 por 0
# Traceback (most recent call last):
#   File "...", line 8, in dividir
#     return a / b
# ZeroDivisionError: division by zero`,
      },
    ],
    points: [
      "print serve para script rápido; logging serve para tudo que vai rodar em produção.",
      "Cinco níveis padrão: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
      "Você ajusta o nível mínimo a exibir sem alterar o código que loga.",
      "Use logging.getLogger(__name__) para ter um logger por módulo.",
      "Prefira log.info('valor=%s', x) em vez de f-strings: evita formatar quando o nível está desligado.",
      "log.exception() dentro de except registra a stack trace completa, ótima para debug.",
      "Você pode mandar logs para console, arquivo, syslog, serviço externo — tudo configurável.",
      "Não logue dados sensíveis (senhas, tokens, dados pessoais) — logs vão parar em arquivos esquecidos.",
    ],
    alerts: [
      {
        type: "success",
        content: "Substituir prints por logger nas funções importantes do seu projeto é o passo mais barato e mais valioso para deixar o código pronto para produção.",
      },
      {
        type: "warning",
        content: "Chamar logging.basicConfig() depois que algum log já rodou não tem efeito. Configure logo no início do programa, antes de qualquer outra coisa.",
      },
      {
        type: "danger",
        content: "Nunca logue senhas, tokens de API, números completos de cartão ou CPFs sem máscara. Logs costumam ser persistidos e lidos por mais gente que você imagina.",
      },
    ],
  },
  {
    slug: "datetime",
    section: "modulos-erros",
    title: "Datas e horas: datetime",
    difficulty: "intermediario",
    subtitle: "Trabalhando com tempo de forma confiável.",
    intro: `Datas e horas parecem simples, mas escondem armadilhas: meses com tamanhos diferentes, anos bissextos, fusos horários, horário de verão. Tentar fazer "na mão" com strings é receita para bugs. O módulo datetime existe justamente para evitar isso, com tipos especializados em representar instantes, datas, durações e horários.

Os tipos principais são: date (dia/mês/ano), time (hora/minuto/segundo), datetime (dia + hora) e timedelta (uma duração: 5 dias, 3 horas etc.). Você cria objetos desses tipos, faz contas com eles ("daqui a 7 dias", "diferença entre duas datas") e o módulo cuida dos detalhes calendáricos por baixo.

Há também o conceito de fuso horário: um datetime "naive" não sabe em que fuso ele está; um "aware" carrega essa informação. Para sistemas que rodam em servidores ou conversam com usuários em vários lugares do mundo, sempre prefira datetimes aware (UTC + zona).

Por fim, vem a serialização: como representar uma data como texto para salvar num banco ou enviar via API. O padrão recomendado hoje é ISO 8601 ("2025-01-15T10:30:00"), suportado nativamente. Esqueça os formatos do tipo "15/01/2025" para troca de dados.`,
    codes: [
      {
        lang: "python",
        code: `from datetime import date, time, datetime, timedelta

hoje = date.today()
print(hoje)            # 2025-01-15

agora = datetime.now()
print(agora)           # 2025-01-15 10:30:45.123456

momento = datetime(2025, 12, 25, 9, 0, 0)
print(momento)         # 2025-12-25 09:00:00

duracao = timedelta(days=7, hours=2)
print(duracao)         # 7 days, 2:00:00`,
      },
      {
        lang: "python",
        code: `# Aritmética de datas é natural — soma e subtração geram timedelta.
from datetime import date, timedelta

hoje = date.today()
daqui_uma_semana = hoje + timedelta(days=7)
print(daqui_uma_semana)

natal = date(2025, 12, 25)
faltam = natal - hoje
print(f"Faltam {faltam.days} dias para o Natal")`,
      },
      {
        lang: "python",
        code: `# Formatando datas como string com strftime (format time).
from datetime import datetime

agora = datetime.now()
print(agora.strftime("%d/%m/%Y"))           # 15/01/2025
print(agora.strftime("%H:%M"))               # 10:30
print(agora.strftime("%A, %d de %B de %Y")) # Wednesday, 15 de January de 2025

# Códigos comuns:
# %d dia, %m mês, %Y ano (4 dígitos), %y ano (2)
# %H hora 24h, %M minuto, %S segundo
# %A dia da semana, %B nome do mês`,
      },
      {
        lang: "python",
        code: `# Lendo string e transformando em datetime: strptime (parse time).
from datetime import datetime

texto = "15/01/2025 10:30"
dt = datetime.strptime(texto, "%d/%m/%Y %H:%M")
print(dt)            # 2025-01-15 10:30:00
print(type(dt))      # <class 'datetime.datetime'>

# Formato ISO é mais simples ainda — não precisa de máscara:
dt_iso = datetime.fromisoformat("2025-01-15T10:30:00")
print(dt_iso)        # 2025-01-15 10:30:00`,
      },
      {
        lang: "python",
        code: `# Fusos horários com zoneinfo (Python 3.9+) — datetimes "aware".
from datetime import datetime
from zoneinfo import ZoneInfo

sp = datetime.now(ZoneInfo("America/Sao_Paulo"))
ny = datetime.now(ZoneInfo("America/New_York"))

print(sp)   # 2025-01-15 10:30:00-03:00
print(ny)   # 2025-01-15 08:30:00-05:00

# Converter de um fuso para outro:
mesmo_instante_em_ny = sp.astimezone(ZoneInfo("America/New_York"))
print(mesmo_instante_em_ny)`,
      },
      {
        lang: "python",
        code: `# Padrão recomendado para sistemas: salvar tudo em UTC.
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

agora_utc = datetime.now(timezone.utc)
print(agora_utc.isoformat())  # 2025-01-15T13:30:00+00:00

# Na hora de mostrar para o usuário, converte para o fuso dele:
em_brasilia = agora_utc.astimezone(ZoneInfo("America/Sao_Paulo"))
print(em_brasilia.strftime("%d/%m/%Y %H:%M"))`,
      },
    ],
    points: [
      "Use date para datas puras, time para horas puras, datetime para os dois juntos.",
      "timedelta representa duração (segundos, minutos, dias) e é o que sai da subtração.",
      "strftime formata datetime → string. strptime faz string → datetime.",
      "fromisoformat e isoformat lidam com o formato padrão ISO 8601 sem precisar de máscara.",
      "datetime 'naive' não tem fuso; datetime 'aware' carrega a zona — prefira sempre aware.",
      "Em sistemas distribuídos, armazene em UTC e converta para fuso local só na exibição.",
      "Nunca calcule duração com strings — sempre converta para datetime/timedelta antes.",
      "zoneinfo (Python 3.9+) substituiu o antigo pytz; use zoneinfo em código novo.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Misturar datetime naive com aware nas operações lança TypeError. Decida no início do projeto se trabalhará só com aware (recomendado) ou só com naive.",
      },
      {
        type: "tip",
        content: "Para registrar 'agora' com fuso UTC, use datetime.now(timezone.utc), não datetime.utcnow() — o segundo cria um datetime naive enganoso.",
      },
      {
        type: "info",
        content: "O ISO 8601 (ex.: 2025-01-15T10:30:00-03:00) é o formato universal de troca de datas. Use-o em APIs, JSON e logs em vez de formatos regionais.",
      },
    ],
  },
  {
    slug: "math-random",
    section: "modulos-erros",
    title: "math e random",
    difficulty: "iniciante",
    subtitle: "Matemática avançada e geração de aleatoriedade.",
    intro: `Os operadores +, -, *, / cobrem o básico, mas e quando você precisa calcular raiz quadrada, seno, logaritmo, ou simplesmente o valor de pi com mais precisão? Para isso existe o módulo math, que traz tudo o que você espera de uma calculadora científica.

E quando você precisa de aleatoriedade — sorteio de prêmio, embaralhar cartas, gerar dados de teste, escolher um item ao acaso — entra o random. Ele oferece de números aleatórios simples até amostragens estatísticas, sem você precisar entender a matemática por trás dos geradores pseudoaleatórios.

Os dois módulos vêm prontos com o Python (não precisa instalar nada) e são leves de aprender. Você importa, chama a função certa, e usa o resultado.

Uma observação importante sobre o random: ele é "pseudoaleatório", ótimo para jogos, sorteios e simulações, mas inseguro para uso em criptografia. Se você precisar de tokens, senhas ou nonces seguros, o módulo certo é secrets, não random — falaremos disso de passagem.`,
    codes: [
      {
        lang: "python",
        code: `import math

print(math.pi)           # 3.141592653589793
print(math.e)            # 2.718281828459045
print(math.sqrt(81))     # 9.0  – raiz quadrada
print(math.pow(2, 10))   # 1024.0 – potência
print(math.factorial(5)) # 120 – fatorial
print(math.log(100, 10)) # 2.0 – log base 10`,
      },
      {
        lang: "python",
        code: `# Trigonometria — todas as funções recebem RADIANOS, não graus.
import math

angulo_graus = 90
angulo_rad = math.radians(angulo_graus)

print(math.sin(angulo_rad))  # 1.0
print(math.cos(angulo_rad))  # ~6e-17 (quase zero, erro de ponto flutuante)

# Para converter de volta:
print(math.degrees(math.pi)) # 180.0`,
      },
      {
        lang: "python",
        code: `# Arredondamentos e teto/chão.
import math

print(math.floor(4.9))   # 4  – arredonda para baixo
print(math.ceil(4.1))    # 5  – arredonda para cima
print(math.trunc(-4.7))  # -4 – descarta a parte decimal

# Diferente de round() embutido, que arredonda "matematicamente":
print(round(4.5))   # 4 (banker's rounding!)
print(round(5.5))   # 6`,
      },
      {
        lang: "python",
        code: `import random

print(random.random())          # float entre 0.0 e 1.0
print(random.randint(1, 10))    # inteiro entre 1 e 10 (inclusive)
print(random.uniform(1.5, 3.5)) # float entre 1.5 e 3.5

cores = ["azul", "verde", "vermelho", "amarelo"]
print(random.choice(cores))     # escolhe um item ao acaso
print(random.sample(cores, 2))  # pega 2 itens distintos`,
      },
      {
        lang: "python",
        code: `# Embaralhando uma lista in-place.
import random

baralho = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
random.shuffle(baralho)
print(baralho)
# A ordem agora está aleatória; baralho foi MODIFICADO no lugar.`,
      },
      {
        lang: "python",
        code: `# Reproduzindo a mesma sequência com seed (útil em testes).
import random

random.seed(42)
print(random.randint(1, 100))  # sempre o mesmo número

random.seed(42)
print(random.randint(1, 100))  # ... porque a seed reinicia a sequência.

# Para segurança (tokens, senhas), use o módulo secrets, não random:
import secrets
print(secrets.token_hex(16))  # token aleatório criptograficamente seguro`,
      },
    ],
    points: [
      "math traz funções científicas: sqrt, log, sin, cos, fatorial, constantes pi e e.",
      "Funções trigonométricas usam radianos. Converta com math.radians/degrees.",
      "math.floor, math.ceil e math.trunc fazem arredondamentos diferentes — escolha o que serve.",
      "round() embutido usa 'arredondamento bancário', que pode surpreender (4.5 → 4).",
      "random.randint(a,b) é inclusivo nos dois lados; random.random() devolve float em [0.0, 1.0).",
      "random.shuffle modifica a lista no lugar; não retorna nova lista.",
      "Use random.seed() para sequências reprodutíveis em testes e simulações.",
      "Para qualquer aleatoriedade ligada a segurança, use secrets, NUNCA random.",
    ],
    alerts: [
      {
        type: "warning",
        content: "random.randint(1, 10) inclui o 10. Já random.randrange(1, 10) é exclusivo no fim, como um range comum. Confundir os dois é fonte clássica de bug off-by-one.",
      },
      {
        type: "danger",
        content: "Nunca gere senhas, tokens de sessão ou chaves criptográficas com random — ele é previsível. Use o módulo secrets, projetado para isso.",
      },
      {
        type: "info",
        content: "Resultados de math com floats podem trazer erros minúsculos (ex.: cos(pi/2) ≈ 6e-17). Para comparações, use math.isclose(a, b) em vez de a == b.",
      },
    ],
  },
  {
    slug: "json-modulo",
    section: "modulos-erros",
    title: "Manipulando JSON",
    difficulty: "iniciante",
    subtitle: "Lendo e escrevendo dados em JSON.",
    intro: `JSON virou o formato de troca de dados padrão da internet. Toda API REST que você consome, todo arquivo de configuração de ferramentas modernas, todo banco NoSQL — tudo fala JSON. A boa notícia é que a estrutura do JSON espelha quase exatamente as estruturas básicas do Python: objetos viram dicionários, arrays viram listas, strings, números e booleanos viram seus equivalentes.

O módulo json da biblioteca padrão faz duas operações essenciais: serializar (Python → JSON, virando texto) e desserializar (JSON → Python). As funções têm nomes curtos: dumps/loads para strings, dump/load para arquivos. O "s" no fim significa "string"; sem o "s", é arquivo.

Há detalhes sutis: nem todo objeto Python vira JSON automaticamente (datetime, set, classes próprias precisam de tratamento). Strings em JSON usam aspas duplas, sempre. Chaves em objetos JSON são sempre strings, mesmo que no Python a chave seja um número.

Saber JSON é pré-requisito para tudo que envolve APIs, integrações e armazenamento estruturado. Vamos ver os casos mais comuns: ler um arquivo de configuração, salvar um estado, consumir resposta de API, formatar bonito para debug.`,
    codes: [
      {
        lang: "python",
        code: `import json

# Python → JSON (string)
pessoa = {"nome": "Ana", "idade": 30, "ativa": True, "filhos": None}
texto = json.dumps(pessoa)
print(texto)
# {"nome": "Ana", "idade": 30, "ativa": true, "filhos": null}
# Repare: True virou true, None virou null, string com aspas duplas.`,
      },
      {
        lang: "python",
        code: `# JSON (string) → Python
import json

texto = '{"nome": "Bruno", "preco": 19.9, "tags": ["livro", "ficcao"]}'
dados = json.loads(texto)

print(dados["nome"])       # Bruno
print(dados["tags"][0])    # livro
print(type(dados))         # <class 'dict'>`,
      },
      {
        lang: "python",
        code: `# Salvando em arquivo: json.dump (sem 's').
import json

config = {
    "tema": "escuro",
    "lingua": "pt-BR",
    "atalhos": ["Ctrl+S", "Ctrl+Z"],
}

with open("config.json", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

# indent=2: deixa o arquivo bonito, indentado.
# ensure_ascii=False: preserva acentos como "ã", em vez de "\\u00e3".`,
      },
      {
        lang: "python",
        code: `# Lendo de arquivo: json.load.
import json

with open("config.json", encoding="utf-8") as f:
    config = json.load(f)

print(config["tema"])
print(config["atalhos"])`,
      },
      {
        lang: "python",
        code: `# Tipos não suportados estouram TypeError.
import json
from datetime import datetime

dados = {"agora": datetime.now()}
# json.dumps(dados)  # TypeError: Object of type datetime is not JSON serializable

# Solução: converta antes de serializar.
dados_ok = {"agora": datetime.now().isoformat()}
print(json.dumps(dados_ok))
# {"agora": "2025-01-15T10:30:00.123456"}`,
      },
      {
        lang: "python",
        code: `# Tratando JSON inválido — sempre embrulhe loads em try.
import json

texto_quebrado = '{"nome": "Ana", "idade": }'  # falta valor

try:
    dados = json.loads(texto_quebrado)
except json.JSONDecodeError as e:
    print(f"JSON inválido: {e}")
    print(f"Posição do erro: linha {e.lineno}, coluna {e.colno}")`,
      },
    ],
    points: [
      "json.dumps(obj) gera string. json.loads(texto) lê string. Com 's' no fim = string.",
      "json.dump(obj, arquivo) escreve em arquivo. json.load(arquivo) lê de arquivo.",
      "Mapeamento direto: dict ↔ object, list ↔ array, True ↔ true, None ↔ null.",
      "Use indent=2 para arquivos legíveis, ensure_ascii=False para preservar acentos.",
      "Tipos como datetime, set, Decimal não viram JSON sozinhos — converta antes.",
      "Chaves em JSON são sempre strings, mesmo que sua dict tenha chaves int/float.",
      "Capture json.JSONDecodeError ao processar JSON vindo de fora (API, usuário, arquivo).",
      "Para JSON gigantes, há bibliotecas streaming (ijson) — json carrega tudo em memória.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Ao salvar JSON com texto em português, sempre use ensure_ascii=False e abra o arquivo com encoding='utf-8'. Caso contrário, acentos viram códigos de escape.",
      },
      {
        type: "warning",
        content: "json.loads aceita JSON com aspas duplas, sempre. JSON com aspas simples não é JSON válido — é literal Python. São coisas diferentes.",
      },
      {
        type: "info",
        content: "Quando precisa de tipos avançados (datetime, Decimal, classes), olhe para Pydantic ou marshmallow. Para casos simples, json puro resolve perfeitamente.",
      },
    ],
  },
  {
    slug: "csv-modulo",
    section: "modulos-erros",
    title: "Manipulando CSV",
    difficulty: "iniciante",
    subtitle: "Lendo e escrevendo planilhas em CSV.",
    intro: `CSV (Comma-Separated Values) é o formato mais simples de planilha que existe: cada linha é uma linha de dados, campos separados por vírgula (ou ponto e vírgula no padrão brasileiro). Excel, Google Sheets, bancos de dados e ferramentas de BI exportam e importam CSV. É o formato pão-com-manteiga para troca de dados tabulares.

Parece tão simples que dá vontade de tratar com .split(","), mas isso desmorona rápido: campos com vírgula dentro, com aspas, com quebra de linha, com aspas de aspas. O módulo csv da biblioteca padrão lida com essas confusões direitinho, seguindo o RFC 4180.

Você tem duas formas de trabalhar: csv.reader/writer trabalha com listas (cada linha vira uma lista de strings); csv.DictReader/DictWriter trabalha com dicionários, usando a primeira linha como cabeçalho. Para dados nomeados, DictReader é muito mais legível.

Também é útil saber configurar o "dialeto": delimitador (Excel brasileiro adora ponto e vírgula), tipo de aspas, terminador de linha. E sempre — sempre — abrir os arquivos com newline="" para não duplicar linhas em branco no Windows.`,
    codes: [
      {
        lang: "python",
        code: `import csv

# Escrevendo um CSV com csv.writer.
linhas = [
    ["nome", "idade", "cidade"],   # cabeçalho
    ["Ana", 30, "São Paulo"],
    ["Bruno", 25, "Rio de Janeiro"],
    ["Carla", 35, "Belo Horizonte, MG"],  # vírgula dentro do campo!
]

with open("pessoas.csv", "w", newline="", encoding="utf-8") as f:
    escritor = csv.writer(f)
    escritor.writerows(linhas)
# O módulo coloca aspas em "Belo Horizonte, MG" automaticamente.`,
      },
      {
        lang: "python",
        code: `# Lendo o CSV de volta com csv.reader.
import csv

with open("pessoas.csv", newline="", encoding="utf-8") as f:
    leitor = csv.reader(f)
    for linha in leitor:
        print(linha)
# ['nome', 'idade', 'cidade']
# ['Ana', '30', 'São Paulo']
# ['Bruno', '25', 'Rio de Janeiro']
# ['Carla', '35', 'Belo Horizonte, MG']
# Atenção: tudo vem como string! Converta com int(), float() se precisar.`,
      },
      {
        lang: "python",
        code: `# DictReader: cada linha vira um dicionário usando o cabeçalho como chave.
import csv

with open("pessoas.csv", newline="", encoding="utf-8") as f:
    leitor = csv.DictReader(f)
    for pessoa in leitor:
        print(f"{pessoa['nome']} mora em {pessoa['cidade']}")
# Saída:
# Ana mora em São Paulo
# Bruno mora em Rio de Janeiro
# Carla mora em Belo Horizonte, MG`,
      },
      {
        lang: "python",
        code: `# DictWriter: escreve dicionários, com cabeçalho automático.
import csv

dados = [
    {"produto": "Caderno", "preco": 12.50, "estoque": 30},
    {"produto": "Caneta", "preco": 3.00, "estoque": 200},
    {"produto": "Borracha", "preco": 1.50, "estoque": 150},
]

with open("estoque.csv", "w", newline="", encoding="utf-8") as f:
    escritor = csv.DictWriter(f, fieldnames=["produto", "preco", "estoque"])
    escritor.writeheader()      # primeira linha com os nomes
    escritor.writerows(dados)`,
      },
      {
        lang: "python",
        code: `# CSV no padrão brasileiro: ponto e vírgula como separador.
import csv

with open("vendas_br.csv", "w", newline="", encoding="utf-8") as f:
    escritor = csv.writer(f, delimiter=";")
    escritor.writerow(["produto", "preço"])
    escritor.writerow(["Café", "29,90"])    # vírgula como decimal

# Lendo de volta com o mesmo delimiter:
with open("vendas_br.csv", newline="", encoding="utf-8") as f:
    leitor = csv.reader(f, delimiter=";")
    for linha in leitor:
        print(linha)`,
      },
      {
        lang: "python",
        code: `# Convertendo tipos enquanto lê (CSV traz tudo como string).
import csv

with open("estoque.csv", newline="", encoding="utf-8") as f:
    leitor = csv.DictReader(f)
    for item in leitor:
        nome = item["produto"]
        preco = float(item["preco"])
        estoque = int(item["estoque"])
        valor_total = preco * estoque
        print(f"{nome}: estoque vale R$ {valor_total:.2f}")`,
      },
    ],
    points: [
      "Use o módulo csv, não .split(','): ele lida com aspas, vírgulas internas e quebras de linha.",
      "Sempre abra arquivos CSV com newline='' para evitar linhas duplicadas no Windows.",
      "csv.reader devolve listas de strings; csv.DictReader devolve dicionários por cabeçalho.",
      "DictReader é geralmente mais legível em código que processa dados nomeados.",
      "Tudo lido de CSV é string — converta para int/float/date manualmente.",
      "Configure delimiter=';' para o padrão brasileiro de Excel; encoding='utf-8' para acentos.",
      "DictWriter exige declarar fieldnames e chamar writeheader() antes das linhas.",
      "Para dados muito grandes ou colunas tipadas, considere pandas em vez do csv puro.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Esquecer newline='' ao abrir o arquivo é o bug mais comum do módulo csv: no Windows, suas linhas escritas vêm dobradas no resultado.",
      },
      {
        type: "tip",
        content: "Para inspecionar um CSV desconhecido, abra-o num editor de texto puro antes de rodar Python. Você descobre o delimitador real e o encoding rapidinho.",
      },
      {
        type: "info",
        content: "Para análise de dados sério, pandas.read_csv() faz tudo isso e mais (tipos, datas, nulos). Mas para scripts pequenos e sem dependência, o csv padrão é perfeito.",
      },
    ],
  },
  {
    slug: "pathlib",
    section: "modulos-erros",
    title: "pathlib: caminhos modernos",
    difficulty: "intermediario",
    subtitle: "Caminhos como objetos, substituindo os.path.",
    intro: `Por décadas, manipular caminhos de arquivos em Python significou strings cheias de barras e o módulo os.path com funções tipo os.path.join(), os.path.exists(), os.path.basename(). Funcionava, mas o código ficava verboso e sujeito a bugs por concatenação errada de barras.

Desde o Python 3.4, existe pathlib: caminhos como objetos. Em vez de funções soltas que recebem strings, você cria um objeto Path e chama métodos sobre ele. O operador / foi sobrecarregado para concatenar partes de caminho de forma natural, e o objeto sabe responder perguntas sobre si mesmo: existe? é arquivo ou pasta? qual a extensão?

A grande virtude do pathlib é que ele funciona igual no Linux, no macOS e no Windows, escolhendo o separador certo automaticamente. Outra vantagem: leitura e escrita simples viram one-liners (caminho.read_text(), caminho.write_text()), sem precisar abrir/fechar manualmente.

Em código novo, pathlib é a recomendação oficial. Você ainda vai encontrar muito os.path em código antigo, e ambos coexistem bem (Path aceita string e vice-versa). Mas, partindo do zero, comece com Path.`,
    codes: [
      {
        lang: "python",
        code: `from pathlib import Path

# Criando um Path — não acessa o disco ainda, é só representação.
p = Path("dados/clientes.csv")
print(p)            # dados/clientes.csv
print(type(p))      # <class 'pathlib.PosixPath'> (ou WindowsPath)

# O operador / concatena partes de caminho:
base = Path("/home/ana/projeto")
arquivo = base / "src" / "main.py"
print(arquivo)      # /home/ana/projeto/src/main.py`,
      },
      {
        lang: "python",
        code: `# Inspecionando um caminho.
from pathlib import Path

p = Path("/home/ana/relatorio.pdf")

print(p.name)        # relatorio.pdf  – nome com extensão
print(p.stem)        # relatorio       – sem extensão
print(p.suffix)      # .pdf
print(p.parent)      # /home/ana
print(p.parts)       # ('/', 'home', 'ana', 'relatorio.pdf')
print(p.is_absolute()) # True`,
      },
      {
        lang: "python",
        code: `# Verificações que tocam o disco.
from pathlib import Path

p = Path("config.json")

print(p.exists())      # True ou False
print(p.is_file())     # True se for arquivo regular
print(p.is_dir())      # True se for diretório
print(p.absolute())    # caminho absoluto resolvido a partir do cwd

# Criando um diretório (parents=True cria intermediários):
Path("logs/2025/janeiro").mkdir(parents=True, exist_ok=True)`,
      },
      {
        lang: "python",
        code: `# Lendo e escrevendo arquivos com one-liners.
from pathlib import Path

p = Path("nota.txt")

# Escrever (cria ou sobrescreve):
p.write_text("Olá, mundo!\\n", encoding="utf-8")

# Ler tudo de uma vez:
conteudo = p.read_text(encoding="utf-8")
print(conteudo)

# Para arquivos binários: read_bytes() / write_bytes().`,
      },
      {
        lang: "python",
        code: `# Listando arquivos com glob — padrão de busca por nome.
from pathlib import Path

pasta = Path("/home/ana/projeto")

# Todos os .py diretamente nesta pasta:
for arquivo in pasta.glob("*.py"):
    print(arquivo.name)

# Recursivo: ** atravessa subpastas.
for arquivo in pasta.rglob("*.json"):
    print(arquivo)

# iterdir() lista TUDO no diretório, sem filtro.
for item in pasta.iterdir():
    print(item.name, "→", "pasta" if item.is_dir() else "arquivo")`,
      },
      {
        lang: "python",
        code: `# Comparando com o estilo antigo os.path:
import os.path
import os
from pathlib import Path

# Antigo:
caminho = os.path.join(os.path.expanduser("~"), "docs", "lista.txt")
existe = os.path.isfile(caminho)
nome = os.path.basename(caminho)

# Moderno:
caminho = Path.home() / "docs" / "lista.txt"
existe = caminho.is_file()
nome = caminho.name

# Menos imports, leitura mais natural, mesmo resultado.`,
      },
    ],
    points: [
      "Path representa um caminho como objeto, não como string crua.",
      "O operador / concatena partes (Path('a') / 'b' / 'c'), sem dor de cabeça com barras.",
      ".name, .stem, .suffix, .parent dão pedaços do caminho rapidamente.",
      "exists(), is_file(), is_dir() consultam o disco; .absolute() resolve relativo ao cwd.",
      "read_text() e write_text() substituem o open() + read() para casos simples.",
      "glob('*.py') filtra por padrão; rglob faz busca recursiva nas subpastas.",
      "Path.home() e Path.cwd() trazem pasta do usuário e diretório atual.",
      "Path funciona igual no Linux, macOS e Windows — adeus aos bugs de barra invertida.",
    ],
    alerts: [
      {
        type: "success",
        content: "Em código novo, prefira pathlib. É mais legível, multiplataforma, e dispensa imports espalhados de os, os.path, glob e shutil para tarefas básicas.",
      },
      {
        type: "tip",
        content: "Funções da biblioteca padrão e de terceiros geralmente aceitam tanto Path quanto string. Você pode usar Path no seu código e passar para qualquer função.",
      },
      {
        type: "warning",
        content: "Path('a') == Path('./a') é False, mesmo apontando para o mesmo lugar. Use .resolve() para comparar caminhos absolutos canônicos.",
      },
    ],
  },
  {
    slug: "os-sys",
    section: "modulos-erros",
    title: "Módulos os e sys",
    difficulty: "intermediario",
    subtitle: "Conversando com o sistema operacional e o interpretador.",
    intro: `Todo programa roda em algum sistema operacional, e às vezes precisa fazer perguntas para ele: qual é a pasta atual? quais são as variáveis de ambiente? quem é o usuário? qual o caminho do executável Python? Para isso existe o módulo os, uma porta de entrada para serviços do SO.

Em paralelo, o módulo sys lida com o próprio interpretador Python: quais argumentos foram passados na linha de comando? como saio do programa com um código de retorno específico? para onde vão prints e erros? que versão do Python está rodando?

Esses dois módulos são essenciais para scripts utilitários, ferramentas de linha de comando, automações e qualquer código que precisa se adaptar ao ambiente em que está rodando. Você não vai usar tudo todo dia, mas saber que existem evita reinventar soluções complicadas.

Algumas funções do os foram parcialmente substituídas por opções mais modernas: caminhos viraram pathlib, comandos shell viraram subprocess. Ainda assim, os é importantíssimo para variáveis de ambiente, listagem rápida de arquivos e controle de processo.`,
    codes: [
      {
        lang: "python",
        code: `import os

print(os.getcwd())                # diretório atual
print(os.listdir("."))            # lista entradas do diretório
print(os.name)                    # 'posix' (Linux/Mac) ou 'nt' (Windows)

# Mudar de diretório (afeta o resto do programa):
os.chdir("/tmp")
print(os.getcwd())                # /tmp`,
      },
      {
        lang: "python",
        code: `# Variáveis de ambiente — chave para configuração externa.
import os

# Pegar uma variável (com valor padrão se não existir):
home = os.environ.get("HOME", "/root")
debug = os.environ.get("DEBUG", "false")

print(f"HOME = {home}")
print(f"DEBUG = {debug}")

# Definir uma (só vale para o processo atual e seus filhos):
os.environ["MINHA_VAR"] = "valor"

# Listar todas:
for chave, valor in os.environ.items():
    print(f"{chave}={valor[:30]}")`,
      },
      {
        lang: "python",
        code: `# Caminhos com os.path (estilo antigo, ainda muito usado).
import os.path

caminho = os.path.join("dados", "2025", "vendas.csv")
print(caminho)                              # dados/2025/vendas.csv
print(os.path.exists(caminho))              # True/False
print(os.path.basename("/a/b/c.txt"))       # c.txt
print(os.path.dirname("/a/b/c.txt"))        # /a/b
print(os.path.splitext("relatorio.pdf"))    # ('relatorio', '.pdf')

# Em código novo, prefira pathlib (capítulo anterior).`,
      },
      {
        lang: "python",
        code: `import sys

print(sys.version)         # versão completa do Python
print(sys.platform)        # 'linux', 'darwin', 'win32'
print(sys.executable)      # caminho do interpretador rodando

# Onde o Python procura módulos:
for caminho in sys.path:
    print(caminho)`,
      },
      {
        lang: "python",
        code: `# Argumentos de linha de comando.
# arquivo: saudacao.py
import sys

print(f"Argumentos recebidos: {sys.argv}")
# sys.argv[0] é sempre o nome do script.

if len(sys.argv) < 2:
    print("Uso: python saudacao.py <nome>")
    sys.exit(1)            # encerra com código de erro 1

nome = sys.argv[1]
print(f"Olá, {nome}!")`,
      },
      {
        lang: "bash",
        code: `# Executando o script anterior.
$ python saudacao.py
Argumentos recebidos: ['saudacao.py']
Uso: python saudacao.py <nome>

$ python saudacao.py Ana
Argumentos recebidos: ['saudacao.py', 'Ana']
Olá, Ana!

# Para CLIs com várias opções, prefira argparse (próximo capítulo).`,
      },
      {
        lang: "python",
        code: `# stdout e stderr separados — boa prática para scripts.
import sys

print("Mensagem normal")                                # vai para stdout
print("Erro: arquivo não encontrado", file=sys.stderr)  # vai para stderr

# Em pipelines do shell:
#   python script.py > saida.txt          → captura só stdout
#   python script.py 2> erros.txt         → captura só stderr
# Separar permite filtrar saída útil de mensagens de erro.`,
      },
    ],
    points: [
      "os trata do sistema operacional: diretórios, variáveis de ambiente, processos.",
      "sys trata do interpretador Python: argumentos, versão, saída, caminhos de import.",
      "os.environ funciona como dicionário — use .get() com padrão para não estourar KeyError.",
      "sys.argv guarda os argumentos da linha de comando; argv[0] é o nome do script.",
      "sys.exit(código) encerra o programa; 0 = sucesso, qualquer outro = erro.",
      "Mensagens de erro devem ir para sys.stderr, não stdout, para facilitar pipelines.",
      "Para caminhos novos, prefira pathlib em vez de os.path.",
      "Para rodar comandos do sistema, use subprocess, não os.system (mais seguro e completo).",
    ],
    alerts: [
      {
        type: "tip",
        content: "Variáveis de ambiente são o jeito padrão de configurar segredos (senhas, tokens, URLs) em produção. Nunca grave segredos direto no código-fonte.",
      },
      {
        type: "warning",
        content: "os.system('rm -rf algo') é perigoso e antigo. Use subprocess.run com lista de argumentos: evita injeção de shell e devolve resultado estruturado.",
      },
      {
        type: "info",
        content: "sys.path é uma lista — você pode até modificar para incluir pastas no momento do import, mas geralmente é melhor configurar via PYTHONPATH ou estrutura de pacotes.",
      },
    ],
  },
  {
    slug: "argparse",
    section: "modulos-erros",
    title: "argparse: CLIs profissionais",
    difficulty: "intermediario",
    subtitle: "Construindo interfaces de linha de comando completas.",
    intro: `Você já viu como ler argumentos com sys.argv: chega uma lista de strings, você decide o que fazer. Funciona para casos simples ("python script.py nome"), mas escala mal: e se tiver opção --verbose, parâmetro --output, valor padrão, tipo, validação, mensagem de ajuda automática? Tudo isso na mão fica trabalhoso.

argparse é o módulo da biblioteca padrão para construir interfaces de linha de comando bonitas e robustas. Você declara que argumentos seu programa aceita, com seus tipos, padrões e descrições — e o argparse cuida do parsing, da validação e até gera o --help automaticamente, no estilo de qualquer ferramenta Unix decente.

Há dois tipos básicos de argumento: posicionais (ordem importa, são obrigatórios por padrão) e opcionais (começam com - ou --, geralmente têm padrão). Você também tem flags booleanas (--verbose ativa um modo) e subcomandos (como "git commit" ou "docker run"), que são programas dentro do programa.

Aprender argparse vale muito a pena: scripts pequenos e ferramentas internas se beneficiam imediatamente. Para CLIs maiores e mais bonitos, ferramentas de terceiros como typer ou click são populares, mas argparse continua sendo a base, sem dependência nenhuma.`,
    codes: [
      {
        lang: "python",
        code: `# arquivo: saudar.py — CLI mínima.
import argparse

parser = argparse.ArgumentParser(description="Cumprimenta uma pessoa.")
parser.add_argument("nome", help="Nome de quem será cumprimentado")

args = parser.parse_args()
print(f"Olá, {args.nome}!")`,
      },
      {
        lang: "bash",
        code: `# Uso básico — observe o --help gerado de graça.
$ python saudar.py Ana
Olá, Ana!

$ python saudar.py
usage: saudar.py [-h] nome
saudar.py: error: the following arguments are required: nome

$ python saudar.py --help
usage: saudar.py [-h] nome

Cumprimenta uma pessoa.

positional arguments:
  nome        Nome de quem será cumprimentado

options:
  -h, --help  show this help message and exit`,
      },
      {
        lang: "python",
        code: `# Argumentos opcionais com tipo, padrão e abreviação.
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("entrada", help="arquivo de entrada")
parser.add_argument("-o", "--output", default="saida.txt",
                    help="arquivo de saída (padrão: saida.txt)")
parser.add_argument("-n", "--linhas", type=int, default=10,
                    help="quantas linhas processar")

args = parser.parse_args()
print(f"Lendo de {args.entrada}, escrevendo em {args.output}, {args.linhas} linhas")`,
      },
      {
        lang: "bash",
        code: `# Várias formas de passar opções:
$ python script.py dados.txt
Lendo de dados.txt, escrevendo em saida.txt, 10 linhas

$ python script.py dados.txt -o resultado.txt -n 50
Lendo de dados.txt, escrevendo em resultado.txt, 50 linhas

$ python script.py dados.txt --linhas=100
Lendo de dados.txt, escrevendo em saida.txt, 100 linhas`,
      },
      {
        lang: "python",
        code: `# Flags booleanas e escolhas restritas.
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--verbose", "-v", action="store_true",
                    help="mostra mais detalhes")
parser.add_argument("--formato", choices=["json", "csv", "xml"],
                    default="json", help="formato de saída")

args = parser.parse_args()
if args.verbose:
    print("Modo verbose ativado")
print(f"Formato: {args.formato}")
# action="store_true": presente → True, ausente → False.
# choices: argparse rejeita valores fora da lista automaticamente.`,
      },
      {
        lang: "python",
        code: `# Subcomandos: como "git add", "git commit".
import argparse

parser = argparse.ArgumentParser(prog="todo")
sub = parser.add_subparsers(dest="comando", required=True)

p_add = sub.add_parser("add", help="adicionar tarefa")
p_add.add_argument("texto")

p_listar = sub.add_parser("listar", help="listar tarefas")
p_listar.add_argument("--pendentes", action="store_true")

args = parser.parse_args()

if args.comando == "add":
    print(f"Adicionando: {args.texto}")
elif args.comando == "listar":
    print("Listando" + (" pendentes" if args.pendentes else " todas"))

# Uso:
#   python todo.py add "Comprar pão"
#   python todo.py listar --pendentes`,
      },
      {
        lang: "python",
        code: `# Padrão idiomático: encapsular em main() e chamar via if __name__.
import argparse
import sys

def parse_args():
    p = argparse.ArgumentParser(description="Conta linhas de um arquivo.")
    p.add_argument("arquivo")
    p.add_argument("--ignorar-vazias", action="store_true")
    return p.parse_args()

def main():
    args = parse_args()
    try:
        with open(args.arquivo, encoding="utf-8") as f:
            linhas = f.readlines()
    except FileNotFoundError:
        print(f"Arquivo não encontrado: {args.arquivo}", file=sys.stderr)
        sys.exit(1)

    if args.ignorar_vazias:
        linhas = [l for l in linhas if l.strip()]
    print(len(linhas))

if __name__ == "__main__":
    main()`,
      },
    ],
    points: [
      "argparse parseia argumentos de linha de comando, valida e gera --help automático.",
      "Argumentos posicionais são obrigatórios por ordem; opcionais começam com - ou --.",
      "type=int, type=float etc. converte e valida o valor recebido (string vira tipo).",
      "default define o valor quando o usuário não passa a opção.",
      "action='store_true' transforma a opção em flag booleana (presente = True).",
      "choices=[...] restringe valores aceitos e mostra os válidos no --help.",
      "Subcomandos (add_subparsers) permitem CLIs estilo git: tool add, tool list, tool delete.",
      "Em caso de erro de uso, argparse imprime mensagem amigável e encerra com código != 0.",
    ],
    alerts: [
      {
        type: "success",
        content: "Use argparse mesmo em scripts pessoais pequenos. O --help gerado salva sua memória meses depois e impede confusões com a ordem dos argumentos.",
      },
      {
        type: "tip",
        content: "Encapsule a definição do parser numa função (parse_args) e a lógica em main(). Fica fácil de testar e segue o padrão idiomático Python.",
      },
      {
        type: "info",
        content: "Para CLIs grandes com cores, autocomplete e tipagem rica, considere typer ou click. Mas argparse é zero dependência e suficiente para a maioria das ferramentas internas.",
      },
    ],
  },
];
