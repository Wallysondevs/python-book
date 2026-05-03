import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "funcoes-def",
    section: "funcoes",
    title: "Definindo funções (def)",
    difficulty: "iniciante",
    subtitle: "Reusando código com blocos nomeados.",
    intro: `Imagine que você tem uma receita de bolo escrita num caderno. Toda vez que alguém quer fazer o bolo, basta abrir na página certa e seguir os passos. Você não reescreve a receita do zero a cada tentativa. Funções em Python são exatamente isso: receitas com nome, que você escreve uma vez e usa quando quiser.

No começo todo programa cabe em poucas linhas, então parece exagero criar funções. Mas em pouco tempo o código cresce e você percebe que está copiando e colando o mesmo trecho. Quando precisa corrigir um detalhe, tem que lembrar de todos os lugares onde colou. Função resolve isso: você muda em um lugar só.

Uma função tem três partes: a palavra def seguida do nome, parênteses com a lista de entradas (parâmetros) e um bloco indentado com o que ela faz. Opcionalmente, retorna um valor com return. Esse valor é o "resultado" da receita, que pode ser guardado numa variável ou usado direto em outra expressão.

Definir não é executar. Quando você escreve def saudacao(): ..., o Python só anota a receita. Ela só roda quando você chama saudacao(). Esse detalhe parece bobo, mas é a fonte número um de confusão de quem está começando.`,
    codes: [
      {
        lang: "python",
        code: `# A função mais simples possível: sem entrada e sem retorno.
def ola():
    print("Olá, mundo!")

# Definir não executa. Precisamos chamar.
ola()  # → Olá, mundo!
ola()  # → Olá, mundo!  (podemos chamar quantas vezes quisermos)`,
      },
      {
        lang: "python",
        code: `# Função com parâmetro: o "nome" muda a cada chamada.
def saudacao(nome):
    print(f"Bem-vinda, {nome}!")

saudacao("Ana")    # → Bem-vinda, Ana!
saudacao("Bruno")  # → Bem-vinda, Bruno!`,
      },
      {
        lang: "python",
        code: `# Função que retorna um valor em vez de só imprimir.
def soma(a, b):
    return a + b  # devolve o resultado pra quem chamou

resultado = soma(3, 4)
print(resultado)        # → 7
print(soma(10, 20) * 2) # → 60  (usamos o retorno direto numa expressão)`,
      },
      {
        lang: "python",
        code: `# Sem return, a função devolve None automaticamente.
def imprime_dobro(x):
    print(x * 2)  # imprime, mas não retorna nada

valor = imprime_dobro(5)  # → 10
print(valor)              # → None  (pegou None porque não houve return)`,
      },
      {
        lang: "python",
        code: `# Várias instruções: a função para no primeiro return executado.
def classifica_idade(idade):
    if idade < 18:
        return "menor de idade"
    if idade < 60:
        return "adulto"
    return "idoso"

print(classifica_idade(15))  # → menor de idade
print(classifica_idade(40))  # → adulto`,
      },
      {
        lang: "python",
        code: `# Erro clássico: chamar a função antes de defini-la no arquivo.
ola()  # NameError: name 'ola' is not defined

def ola():
    print("oi")

# Solução: defina a função ANTES de chamar.`,
      },
    ],
    points: [
      "def cria a função, mas só chamar com parênteses executa o código.",
      "return entrega um valor pra quem chamou; sem return, o resultado é None.",
      "O nome do parâmetro vale só dentro da função, é como um apelido temporário.",
      "Funções devem ter nomes em snake_case que descrevam o que fazem.",
      "Uma função bem feita faz uma coisa só e cabe na cabeça em poucos segundos.",
      "Armadilha: confundir print com return. print mostra na tela, return devolve um valor.",
      "Armadilha: definir a função depois de chamá-la causa NameError.",
      "Várias instruções return são permitidas; a função encerra na primeira que executa.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de copiar e colar código pela segunda vez, pare e transforme aquilo numa função. Você vai economizar muito tempo no futuro.",
      },
      {
        type: "warning",
        content: "print não é return. print só mostra texto no terminal. Se você precisa usar o valor depois, use return e capture o resultado em uma variável.",
      },
      {
        type: "info",
        content: "Toda função em Python retorna algo. Quando você não escreve return, o Python devolve None silenciosamente, o que pode confundir em comparações.",
      },
    ],
  },
  {
    slug: "argumentos-nomeados",
    section: "funcoes",
    title: "Argumentos posicionais e nomeados",
    difficulty: "iniciante",
    subtitle: "Chamando funções de forma flexível e legível.",
    intro: `Quando você chama uma função, precisa entregar os valores que ela espera. Existem duas formas de fazer isso: pela posição ou pelo nome. As duas funcionam, mas escolher a certa deixa o código muito mais fácil de ler.

Argumento posicional é o jeito mais direto: o primeiro valor entra no primeiro parâmetro, o segundo no segundo, e por aí vai. Funciona bem quando a função tem poucos parâmetros e a ordem é óbvia, como em soma(2, 3).

Mas imagine uma função criar_usuario(nome, idade, ativo, admin). Olhando criar_usuario("Ana", 30, True, False), você consegue lembrar o que cada True e False significa? Argumento nomeado resolve isso: criar_usuario(nome="Ana", idade=30, ativo=True, admin=False) vira autoexplicativo.

Você também pode definir valores padrão na assinatura da função. Aí, na hora de chamar, só passa o que for diferente do padrão. Isso cria funções flexíveis sem obrigar o usuário a preencher tudo. Cuidado com uma armadilha famosa: usar listas ou dicionários como valor padrão dá bug. Vamos ver isso adiante.`,
    codes: [
      {
        lang: "python",
        code: `# Argumentos posicionais: a ordem importa.
def divide(a, b):
    return a / b

print(divide(10, 2))  # → 5.0
print(divide(2, 10))  # → 0.2  (ordem trocada muda o resultado)`,
      },
      {
        lang: "python",
        code: `# Argumentos nomeados: a ordem não importa, o nome importa.
def cadastrar(nome, idade, cidade):
    print(f"{nome}, {idade} anos, mora em {cidade}")

cadastrar(nome="Ana", idade=28, cidade="Recife")
cadastrar(cidade="Salvador", nome="Bruno", idade=35)  # ordem livre`,
      },
      {
        lang: "python",
        code: `# Misturando: posicionais primeiro, nomeados depois.
def pedido(produto, quantidade, preco):
    total = quantidade * preco
    print(f"{quantidade}x {produto} = R$ {total:.2f}")

pedido("café", quantidade=3, preco=8.50)
# → 3x café = R$ 25.50`,
      },
      {
        lang: "python",
        code: `# Valores padrão: parâmetros opcionais.
def saudacao(nome, mensagem="Olá"):
    print(f"{mensagem}, {nome}!")

saudacao("Ana")                    # → Olá, Ana!
saudacao("Bruno", "Bom dia")       # → Bom dia, Bruno!
saudacao("Carla", mensagem="Oi")   # → Oi, Carla!`,
      },
      {
        lang: "python",
        code: `# Erro comum: posicional depois de nomeado dá SyntaxError.
def exemplo(a, b, c):
    return a + b + c

# exemplo(a=1, 2, 3)
# SyntaxError: positional argument follows keyword argument

# Forma correta:
exemplo(1, 2, c=3)  # → 6`,
      },
      {
        lang: "python",
        code: `# Armadilha do mutável padrão: NÃO faça isso.
def adicionar_item(item, lista=[]):  # lista é compartilhada entre chamadas!
    lista.append(item)
    return lista

print(adicionar_item("a"))  # → ['a']
print(adicionar_item("b"))  # → ['a', 'b']  (acumulou!)

# Forma correta: use None como sentinela.
def adicionar_item_ok(item, lista=None):
    if lista is None:
        lista = []
    lista.append(item)
    return lista`,
      },
    ],
    points: [
      "Argumentos posicionais seguem a ordem da definição da função.",
      "Argumentos nomeados (keyword) usam nome=valor e tornam a chamada autoexplicativa.",
      "Você pode misturar os dois, mas posicionais sempre vêm antes dos nomeados.",
      "Valores padrão tornam parâmetros opcionais e simplificam chamadas comuns.",
      "Use argumentos nomeados quando a função tiver booleanos ou muitos parâmetros.",
      "Armadilha: nunca use listas, dicionários ou outros mutáveis como valor padrão.",
      "Armadilha: trocar a ordem dos posicionais sem perceber gera bugs silenciosos.",
      "O padrão é avaliado uma vez só, no momento da definição da função.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre que sua função tiver um parâmetro booleano, prefira passar com nome: enviar_email(urgente=True) é muito mais claro do que enviar_email(True).",
      },
      {
        type: "danger",
        content: "Nunca coloque uma lista, dicionário ou conjunto como valor padrão de um parâmetro. Use None e crie o objeto dentro da função, ou você terá bugs estranhos.",
      },
      {
        type: "info",
        content: "A partir do Python 3.8 dá pra forçar parâmetros só posicionais com / e só nomeados com *, mas isso é mais avançado e raramente necessário no início.",
      },
    ],
  },
  {
    slug: "args-kwargs",
    section: "funcoes",
    title: "*args e **kwargs",
    difficulty: "intermediario",
    subtitle: "Funções com número variável de argumentos.",
    intro: `Às vezes você quer escrever uma função que aceite uma quantidade desconhecida de entradas. Pense em print: você pode chamar print("a"), print("a", "b") ou print("a", "b", "c", "d"). Não existe versão fixa com três parâmetros. O Python tem dois mecanismos para isso: *args e **kwargs.

O nome dos parâmetros não precisa ser literalmente args e kwargs, é só convenção. O que conta é o asterisco. Um asterisco coleta argumentos posicionais extras numa tupla. Dois asteriscos coletam argumentos nomeados extras num dicionário.

Esses recursos são poderosos para escrever funções genéricas, fachadas que repassam tudo para outra função, e helpers de bibliotecas. Mas use com critério: uma função que aceita qualquer coisa fica difícil de entender. Quase sempre é melhor declarar parâmetros explícitos e só usar *args/**kwargs quando realmente faz sentido.

Existe também o uso oposto: o operador * e ** servem para "desempacotar" uma lista ou dicionário na hora de chamar uma função. É a outra metade da mesma ideia.`,
    codes: [
      {
        lang: "python",
        code: `# *args: coleta posicionais extras numa tupla.
def somar_tudo(*numeros):
    print(type(numeros), numeros)
    return sum(numeros)

print(somar_tudo(1, 2, 3))         # → 6
print(somar_tudo(10, 20, 30, 40))  # → 100
print(somar_tudo())                # → 0  (tupla vazia)`,
      },
      {
        lang: "python",
        code: `# **kwargs: coleta nomeados extras num dicionário.
def perfil(**dados):
    for chave, valor in dados.items():
        print(f"{chave}: {valor}")

perfil(nome="Ana", idade=28, cidade="Recife")
# nome: Ana
# idade: 28
# cidade: Recife`,
      },
      {
        lang: "python",
        code: `# Misturando tudo: ordem obrigatória é parâmetros normais, *args, **kwargs.
def registrar(evento, *participantes, **detalhes):
    print(f"Evento: {evento}")
    print(f"Participantes: {participantes}")
    print(f"Detalhes: {detalhes}")

registrar("Workshop", "Ana", "Bruno", local="Recife", vagas=20)
# Evento: Workshop
# Participantes: ('Ana', 'Bruno')
# Detalhes: {'local': 'Recife', 'vagas': 20}`,
      },
      {
        lang: "python",
        code: `# Desempacotando na chamada: o lado oposto.
def soma_tres(a, b, c):
    return a + b + c

valores = [1, 2, 3]
print(soma_tres(*valores))  # → 6  (* desempacota a lista)

dados = {"a": 10, "b": 20, "c": 30}
print(soma_tres(**dados))   # → 60  (** desempacota o dicionário)`,
      },
      {
        lang: "python",
        code: `# Caso real: função "fachada" que repassa tudo pra outra.
def log(*args, **kwargs):
    print("[LOG]", *args, **kwargs)

log("Usuário criado", "Ana", sep=" - ", end="!\n")
# [LOG] Usuário criado - Ana!`,
      },
      {
        lang: "python",
        code: `# Erro: passar nomeado depois de **kwargs já capturar tudo.
def f(**kw):
    print(kw)

# f(nome="Ana", nome="Bruno")
# SyntaxError: keyword argument repeated: nome
f(nome="Ana", apelido="Bruno")  # → {'nome': 'Ana', 'apelido': 'Bruno'}`,
      },
    ],
    points: [
      "*args junta argumentos posicionais extras numa tupla.",
      "**kwargs junta argumentos nomeados extras num dicionário.",
      "Os nomes args e kwargs são convenção; o que importa são os asteriscos.",
      "A ordem na assinatura é: parâmetros normais, *args, parâmetros só-nomeados, **kwargs.",
      "Na chamada, * desempacota uma lista e ** desempacota um dicionário em argumentos.",
      "Armadilha: abusar de *args/**kwargs deixa a função opaca; prefira parâmetros explícitos.",
      "Armadilha: chaves repetidas em **kwargs causam SyntaxError na chamada.",
      "Útil em decorators e wrappers que precisam repassar argumentos sem saber quais são.",
    ],
    alerts: [
      {
        type: "info",
        content: "args vem de arguments e kwargs de keyword arguments. Você pode chamar de *itens e **opcoes se ficar mais claro no contexto.",
      },
      {
        type: "warning",
        content: "Funções que aceitam qualquer coisa via **kwargs perdem o autocomplete e a checagem do editor. Use só quando realmente precisar de flexibilidade.",
      },
      {
        type: "tip",
        content: "O desempacotamento * e ** também funciona em chamadas de print, max, min e em construção de listas e dicionários. Vale a pena dominar.",
      },
    ],
  },
  {
    slug: "funcoes-lambda",
    section: "funcoes",
    title: "Funções lambda",
    difficulty: "intermediario",
    subtitle: "Funções anônimas em uma linha.",
    intro: `Lambda é simplesmente uma maneira curta de escrever uma função pequena, sem precisar dar um nome a ela. O nome "lambda" vem da matemática, não se assuste. Em Python, lambda x: x * 2 é equivalente a uma função que recebe x e devolve x vezes dois.

Lambdas existem para situações em que você precisa de uma função só por alguns segundos, geralmente como argumento de outra função. O caso clássico é ordenar uma lista por um critério: sorted(pessoas, key=lambda p: p["idade"]). Escrever um def só pra isso seria barulhento.

Existem regras importantes. Lambda só aceita uma única expressão, não um bloco. Não pode ter if/elif/else estendido, não pode ter return explícito (o resultado da expressão já é o retorno). Se sua lógica precisa de mais que isso, escreva um def normal.

Outra confusão comum: você pode atribuir uma lambda a uma variável (dobro = lambda x: x * 2), mas isso é considerado mau estilo. Se vai dar nome, use def. A graça da lambda é justamente ser anônima e descartável.`,
    codes: [
      {
        lang: "python",
        code: `# Forma básica: lambda parametros: expressao
dobro = lambda x: x * 2
print(dobro(5))  # → 10

# Equivalente em def:
def dobro_def(x):
    return x * 2`,
      },
      {
        lang: "python",
        code: `# Lambda com vários parâmetros.
soma = lambda a, b: a + b
print(soma(3, 7))  # → 10

# Com valor padrão também funciona.
saudar = lambda nome, msg="Oi": f"{msg}, {nome}!"
print(saudar("Ana"))             # → Oi, Ana!
print(saudar("Bruno", "Olá"))    # → Olá, Bruno!`,
      },
      {
        lang: "python",
        code: `# Uso clássico: ordenar por um critério.
pessoas = [
    {"nome": "Ana", "idade": 30},
    {"nome": "Bruno", "idade": 25},
    {"nome": "Carla", "idade": 40},
]

# Ordena por idade sem precisar definir uma função nomeada.
ordenadas = sorted(pessoas, key=lambda p: p["idade"])
for p in ordenadas:
    print(p["nome"], p["idade"])
# Bruno 25 / Ana 30 / Carla 40`,
      },
      {
        lang: "python",
        code: `# Lambda dentro de map e filter.
numeros = [1, 2, 3, 4, 5]

quadrados = list(map(lambda n: n ** 2, numeros))
print(quadrados)  # → [1, 4, 9, 16, 25]

pares = list(filter(lambda n: n % 2 == 0, numeros))
print(pares)      # → [2, 4]`,
      },
      {
        lang: "python",
        code: `# Expressão condicional dentro da lambda (em uma linha).
classificar = lambda idade: "adulto" if idade >= 18 else "menor"
print(classificar(15))  # → menor
print(classificar(30))  # → adulto

# Mas isto NÃO funciona dentro de lambda:
# lambda x: if x > 0: print(x)  # SyntaxError
# Pra lógica com bloco, use def normal.`,
      },
      {
        lang: "python",
        code: `# Mau estilo: dar nome a uma lambda.
# Em vez disso, escreva um def explícito.

# Ruim:
quadrado = lambda x: x ** 2

# Bom:
def quadrado(x):
    return x ** 2`,
      },
    ],
    points: [
      "lambda cria uma função anônima de uma única expressão.",
      "O resultado da expressão é automaticamente retornado, sem return.",
      "Útil principalmente como argumento de funções como sorted, map, filter, max.",
      "Não dá pra usar bloco de instruções, while, for ou try dentro de lambda.",
      "Pode usar expressão condicional (a if cond else b) para escolhas simples.",
      "Armadilha: atribuir lambda a uma variável é considerado mau estilo, prefira def.",
      "Armadilha: lambdas longas viram código ilegível, use def quando crescer.",
      "Não confunda lambda com função sem retorno: ela sempre retorna a expressão.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando ler key=lambda x: ... em código alheio, traduza mentalmente para o critério de ordenação ou seleção. É o uso mais comum por longe.",
      },
      {
        type: "warning",
        content: "Se sua lambda precisar de if/else aninhado ou ocupar mais de uma linha, pare e escreva um def. Lambda longa é muito mais difícil de depurar.",
      },
      {
        type: "info",
        content: "Lambdas capturam variáveis do escopo onde foram criadas. Em loops, isso pode causar surpresas porque elas pegam o valor final da variável.",
      },
    ],
  },
  {
    slug: "map-filter-reduce",
    section: "funcoes",
    title: "map, filter e reduce",
    difficulty: "intermediario",
    subtitle: "Programação funcional clássica em Python.",
    intro: `map, filter e reduce são três ferramentas que vêm da programação funcional. A ideia é tratar listas como dados que passam por transformações. Em vez de você escrever loops manuais, você diz "aplique esta função em cada elemento", "fique só com os que passam neste teste" ou "reduza tudo a um único valor".

map(funcao, lista) aplica a função em cada item e devolve um novo iterável. filter(funcao, lista) mantém só os itens em que a função devolve True. reduce(funcao, lista) combina os itens dois a dois até sobrar um só, somando, multiplicando ou o que você quiser.

No Python moderno, list comprehensions costumam ser mais lidas que map e filter. Mas saber map e filter ainda é importante porque você vai encontrar em código de outras pessoas e em bibliotecas como pandas e PySpark. reduce é mais raro e fica num módulo separado, functools.

Atenção: map e filter não devolvem listas, devolvem objetos preguiçosos (iteradores). Você precisa converter com list() pra ver o resultado, ou consumir num for. Esquecer disso confunde bastante no começo.`,
    codes: [
      {
        lang: "python",
        code: `# map: aplica uma função a cada item.
numeros = [1, 2, 3, 4, 5]

dobrados = map(lambda n: n * 2, numeros)
print(dobrados)         # → <map object ...>  (preguiçoso!)
print(list(dobrados))   # → [2, 4, 6, 8, 10]`,
      },
      {
        lang: "python",
        code: `# filter: mantém só os que passam no teste.
idades = [12, 17, 18, 25, 60, 70]

maiores = filter(lambda i: i >= 18, idades)
print(list(maiores))  # → [18, 25, 60, 70]`,
      },
      {
        lang: "python",
        code: `# reduce: combina tudo num único valor. Vem de functools.
from functools import reduce

numeros = [1, 2, 3, 4, 5]

# Soma manual usando reduce.
total = reduce(lambda acc, n: acc + n, numeros)
print(total)  # → 15

# Com valor inicial (terceiro argumento).
total_com_base = reduce(lambda acc, n: acc + n, numeros, 100)
print(total_com_base)  # → 115`,
      },
      {
        lang: "python",
        code: `# Caso real: total de uma lista de pedidos.
from functools import reduce

pedidos = [
    {"item": "café", "preco": 8.50},
    {"item": "pão", "preco": 5.00},
    {"item": "suco", "preco": 7.00},
]

total = reduce(lambda acc, p: acc + p["preco"], pedidos, 0)
print(f"Total: R$ {total:.2f}")  # → Total: R$ 20.50`,
      },
      {
        lang: "python",
        code: `# Comparando: map/filter vs list comprehension.
numeros = [1, 2, 3, 4, 5]

# Versão funcional:
quadrados_pares = list(map(lambda n: n ** 2, filter(lambda n: n % 2 == 0, numeros)))

# Versão com comprehension (mais idiomática em Python):
quadrados_pares_v2 = [n ** 2 for n in numeros if n % 2 == 0]

print(quadrados_pares)     # → [4, 16]
print(quadrados_pares_v2)  # → [4, 16]`,
      },
      {
        lang: "python",
        code: `# Armadilha: iterador se esgota depois de consumido.
m = map(str.upper, ["ana", "bruno"])
print(list(m))  # → ['ANA', 'BRUNO']
print(list(m))  # → []  (acabou! o iterador foi consumido)

# Solução: guarde como lista se vai usar mais de uma vez.
nomes = list(map(str.upper, ["ana", "bruno"]))`,
      },
    ],
    points: [
      "map(f, it) aplica f em cada item e devolve um iterador preguiçoso.",
      "filter(f, it) mantém os itens em que f(item) é verdadeiro.",
      "reduce(f, it, inicial) combina os itens em um único valor; está em functools.",
      "Em Python idiomático, list/dict comprehensions são preferidas a map e filter.",
      "Iteradores se esgotam após o primeiro consumo, então cuidado ao reusar.",
      "sum, min, max, any e all costumam substituir reduce em casos comuns.",
      "Armadilha: esquecer de converter com list() e tentar imprimir o map direto.",
      "Armadilha: criar lambdas ilegíveis dentro de map; muitas vezes um for é melhor.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para somar use sum(lista) em vez de reduce(lambda a,b: a+b, lista). É mais curto, mais rápido e qualquer pessoa lê de imediato.",
      },
      {
        type: "info",
        content: "map e filter foram herdados de Lisp. Em Python, são preguiçosos por design para economizar memória ao processar grandes coleções.",
      },
      {
        type: "warning",
        content: "Se você precisa do resultado mais de uma vez, converta o iterador em list. Ler dele duas vezes vai retornar vazio na segunda.",
      },
    ],
  },
  {
    slug: "escopo-variaveis",
    section: "funcoes",
    title: "Escopo de variáveis (LEGB)",
    difficulty: "intermediario",
    subtitle: "Local, Enclosing, Global e Built-in.",
    intro: `Quando o Python encontra um nome de variável dentro de uma função, ele precisa decidir de onde vem aquele nome. A regra que ele usa se chama LEGB, sigla para Local, Enclosing, Global e Built-in. É a ordem em que ele procura.

Local é o que está dentro da função atual. Enclosing é o de uma função que envolve a sua (caso de funções aninhadas). Global é o que está no nível do arquivo. Built-in são os nomes que vêm prontos com o Python, como print, len, range. O Python procura nessa ordem e usa o primeiro que encontrar.

Entender LEGB resolve aquele bug clássico: você cria uma variável fora da função, tenta modificar dentro, e nada acontece. Isso porque atribuir cria uma variável local nova que apenas mascara a global. Para realmente alterar a global, você precisa da palavra-chave global. Para alterar uma de uma função externa, usa nonlocal.

Na prática, depender de variáveis globais é considerado má prática. Funções devem receber tudo que precisam pelos parâmetros e devolver o resultado. Globais quebram a previsibilidade e dificultam testes.`,
    codes: [
      {
        lang: "python",
        code: `# Escopo Local: variável só existe dentro da função.
def f():
    x = 10        # local
    print(x)      # → 10

f()
# print(x)        # NameError: name 'x' is not defined`,
      },
      {
        lang: "python",
        code: `# Escopo Global: variável definida fora de qualquer função.
mensagem = "olá"  # global

def mostrar():
    print(mensagem)  # Python procura local, não acha, sobe pra global

mostrar()  # → olá`,
      },
      {
        lang: "python",
        code: `# A pegadinha: atribuir cria uma local que sombreia a global.
contador = 0

def incrementar_errado():
    contador = contador + 1  # UnboundLocalError!
    print(contador)

# incrementar_errado()  # erro porque Python vê atribuição e marca como local

def incrementar_certo():
    global contador      # avisa: quero usar a global
    contador = contador + 1
    print(contador)

incrementar_certo()  # → 1
incrementar_certo()  # → 2`,
      },
      {
        lang: "python",
        code: `# Enclosing: função dentro de função.
def fora():
    nome = "Ana"  # vive no escopo de fora()

    def dentro():
        print(nome)  # acessa o escopo "enclosing"

    dentro()

fora()  # → Ana`,
      },
      {
        lang: "python",
        code: `# Para alterar (não só ler) uma variável do escopo enclosing, use nonlocal.
def contador_factory():
    n = 0
    def incrementar():
        nonlocal n     # sem isso, n seria local nova
        n += 1
        return n
    return incrementar

c = contador_factory()
print(c())  # → 1
print(c())  # → 2
print(c())  # → 3`,
      },
      {
        lang: "python",
        code: `# Built-in: nomes que sempre existem.
print(len("python"))  # → 6  (len é built-in)

# Cuidado: criar variável com nome de built-in mascara o original.
list = [1, 2, 3]      # péssima ideia: redefiniu list
# nova = list("abc")  # TypeError: 'list' object is not callable
del list              # remove e recupera o built-in
print(list("abc"))    # → ['a', 'b', 'c']`,
      },
    ],
    points: [
      "LEGB define a ordem de busca: Local, Enclosing, Global, Built-in.",
      "Atribuir um nome dentro da função, por padrão, cria uma variável local.",
      "Use global para modificar (não só ler) uma variável do nível do arquivo.",
      "Use nonlocal para modificar uma variável de uma função externa que envolve a sua.",
      "Ler uma global dentro de função é permitido sem declaração; modificar não.",
      "Armadilha: nomear suas variáveis como list, dict, str, type mascara built-ins.",
      "Armadilha: confiar em variáveis globais torna funções imprevisíveis e difíceis de testar.",
      "Prefira passar dados por parâmetros e retornar resultados explícitos.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Se aparecer UnboundLocalError, quase sempre é porque você atribuiu a uma variável dentro da função sem declarar global ou nonlocal antes.",
      },
      {
        type: "danger",
        content: "Evite usar global em código de produção. Funções que dependem do estado externo são uma fonte enorme de bugs difíceis de rastrear.",
      },
      {
        type: "tip",
        content: "Para descobrir os built-ins disponíveis, abra o terminal Python e digite dir(__builtins__). Você verá list, len, print, range e muitos outros.",
      },
    ],
  },
  {
    slug: "closures",
    section: "funcoes",
    title: "Closures",
    difficulty: "avancado",
    subtitle: "Funções que carregam contexto.",
    intro: `Closure é um nome técnico para uma ideia simples: uma função que "lembra" valores do lugar onde foi criada, mesmo depois de a função externa terminar. Ela carrega seu contexto pra onde for chamada.

Imagine uma fábrica de funções. Você passa um parâmetro pra fábrica, e ela devolve uma função personalizada. Por exemplo, uma fábrica de calculadores de juros: você passa a taxa, e recebe uma função que calcula o valor com aquela taxa, sem precisar passar de novo.

Para uma closure existir, três coisas precisam acontecer: uma função aninhada (definida dentro de outra), essa função interna tem que usar uma variável do escopo da função externa, e a função externa tem que retornar a função interna. Quando isso acontece, o Python guarda as variáveis necessárias junto com a função.

Closures são a base para entender decorators, callbacks e muito código de bibliotecas. Também são úteis para criar contadores, configurações personalizadas e funções de ordenação dinâmica. O segredo é entender que cada closure mantém suas próprias cópias das variáveis capturadas.`,
    codes: [
      {
        lang: "python",
        code: `# Closure básica: a função interna lembra "fator".
def multiplicador(fator):
    def multiplica(x):
        return x * fator   # captura "fator" do escopo de cima
    return multiplica

dobro = multiplicador(2)
triplo = multiplicador(3)

print(dobro(10))   # → 20
print(triplo(10))  # → 30`,
      },
      {
        lang: "python",
        code: `# Cada closure tem seu próprio estado.
def contador():
    n = 0
    def incrementar():
        nonlocal n
        n += 1
        return n
    return incrementar

c1 = contador()
c2 = contador()
print(c1(), c1(), c1())  # → 1 2 3
print(c2())              # → 1  (independente de c1)`,
      },
      {
        lang: "python",
        code: `# Inspeciona as variáveis capturadas por uma closure.
def saudacao(msg):
    def falar(nome):
        return f"{msg}, {nome}!"
    return falar

ola = saudacao("Olá")
print(ola("Ana"))                    # → Olá, Ana!
print(ola.__closure__)               # tupla de células
print(ola.__closure__[0].cell_contents)  # → 'Olá'`,
      },
      {
        lang: "python",
        code: `# Caso real: criar validadores configuráveis.
def faixa(minimo, maximo):
    def valida(valor):
        return minimo <= valor <= maximo
    return valida

idade_adulta = faixa(18, 120)
nota_valida = faixa(0, 10)

print(idade_adulta(30))   # → True
print(idade_adulta(5))    # → False
print(nota_valida(7.5))   # → True`,
      },
      {
        lang: "python",
        code: `# Armadilha: capturar variável de loop pega o valor final.
funcoes = []
for i in range(3):
    funcoes.append(lambda: i)

print([f() for f in funcoes])  # → [2, 2, 2]  (todas pegaram o último i)

# Solução: forçar a captura como parâmetro com valor padrão.
funcoes_ok = []
for i in range(3):
    funcoes_ok.append(lambda i=i: i)

print([f() for f in funcoes_ok])  # → [0, 1, 2]`,
      },
      {
        lang: "python",
        code: `# Closures como alternativa simples a classes pequenas.
def conta_bancaria(saldo_inicial):
    saldo = saldo_inicial
    def operar(valor):
        nonlocal saldo
        saldo += valor
        return saldo
    return operar

minha = conta_bancaria(100)
print(minha(50))    # → 150
print(minha(-30))   # → 120`,
      },
    ],
    points: [
      "Uma closure é uma função interna que lembra variáveis da função externa.",
      "Para alterar uma variável capturada, use a palavra-chave nonlocal.",
      "Cada chamada da função externa cria um conjunto novo de variáveis capturadas.",
      "Closures são a base de decorators, callbacks e factories de funções.",
      "Você pode inspecionar as variáveis capturadas via atributo __closure__.",
      "Armadilha: capturar variável de loop dentro de lambda pega o valor final.",
      "Armadilha: closures complexas com muito estado é hora de migrar pra classe.",
      "Use o truque param=valor na lambda quando precisar capturar variável de loop.",
    ],
    alerts: [
      {
        type: "info",
        content: "O nome closure significa que a função se fecha em torno do ambiente em que nasceu. Esse ambiente fica preso a ela enquanto a função existir.",
      },
      {
        type: "warning",
        content: "Em loops, lambdas e funções aninhadas capturam a variável, não o valor naquele instante. Use parâmetro com padrão para fixar o valor desejado.",
      },
      {
        type: "tip",
        content: "Quando uma closure começa a ter três ou quatro variáveis nonlocal, pare e considere reescrever como classe. Fica muito mais legível.",
      },
    ],
  },
  {
    slug: "funcoes-recursivas",
    section: "funcoes",
    title: "Funções recursivas",
    difficulty: "intermediario",
    subtitle: "Funções que chamam a si mesmas.",
    intro: `Recursão é quando uma função chama ela mesma para resolver uma versão menor do mesmo problema. Parece estranho à primeira vista, mas é apenas outra forma de repetição, alternativa ao while e ao for.

A analogia clássica é a boneca russa: você abre uma boneca e tem outra menor dentro, abre essa e tem outra ainda menor, até chegar na minúscula que não abre mais. Toda função recursiva precisa de duas coisas: o caso base (quando parar) e o passo recursivo (chamar a si mesma com um problema menor).

Sem caso base, a função se chama para sempre e o Python eventualmente estoura com RecursionError. Por padrão, o Python permite cerca de mil chamadas recursivas, justamente como rede de proteção contra recursões infinitas.

Recursão brilha em problemas naturalmente recursivos: árvores, sistemas de arquivos, fractais, busca em grafos, parsing. Em problemas que cabem num for simples, prefira o for, costuma ser mais fácil de ler. E lembre: muitos algoritmos recursivos podem ser otimizados com memoization (functools.lru_cache) para evitar recalcular as mesmas coisas.`,
    codes: [
      {
        lang: "python",
        code: `# Exemplo clássico: fatorial.
def fatorial(n):
    if n <= 1:           # caso base
        return 1
    return n * fatorial(n - 1)  # passo recursivo

print(fatorial(5))  # → 120  (5*4*3*2*1)
print(fatorial(0))  # → 1`,
      },
      {
        lang: "python",
        code: `# Sem caso base = recursão infinita = erro.
def explode(n):
    return explode(n + 1)

# explode(0)
# RecursionError: maximum recursion depth exceeded
# Sempre garanta um caminho para o caso base!`,
      },
      {
        lang: "python",
        code: `# Soma de uma lista recursivamente.
def soma_lista(lista):
    if not lista:           # caso base: lista vazia
        return 0
    return lista[0] + soma_lista(lista[1:])

print(soma_lista([1, 2, 3, 4, 5]))  # → 15`,
      },
      {
        lang: "python",
        code: `# Fibonacci ingênuo: lento por recalcular muito.
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))  # → 55
# fib(35) já demora bastante por causa das chamadas duplicadas.`,
      },
      {
        lang: "python",
        code: `# Solução: cache automático com lru_cache.
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # → 354224848179261915075  (rápido com cache)`,
      },
      {
        lang: "python",
        code: `# Caso real: percorrer uma árvore (estrutura de pastas).
arvore = {
    "nome": "raiz",
    "filhos": [
        {"nome": "a", "filhos": []},
        {"nome": "b", "filhos": [
            {"nome": "b1", "filhos": []},
            {"nome": "b2", "filhos": []},
        ]},
    ],
}

def listar(no, nivel=0):
    print("  " * nivel + no["nome"])
    for filho in no["filhos"]:
        listar(filho, nivel + 1)

listar(arvore)
# raiz
#   a
#   b
#     b1
#     b2`,
      },
    ],
    points: [
      "Toda função recursiva precisa de caso base e passo recursivo.",
      "O caso base evita a recursão infinita e o RecursionError.",
      "Cada chamada recursiva consome espaço na pilha; profundidades grandes quebram.",
      "Em Python, o limite padrão fica em torno de 1000 chamadas (sys.getrecursionlimit).",
      "Recursão brilha em estruturas em árvore, grafos e divisão de problemas.",
      "Para problemas iterativos simples, um for ou while costuma ser mais legível.",
      "Armadilha: esquecer o caso base ou montar passo que não se aproxima dele.",
      "Use @lru_cache para evitar recalcular subproblemas em recursões matemáticas.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Python não otimiza chamadas recursivas em cauda como outras linguagens. Recursões muito profundas vão estourar a pilha mesmo que pareçam corretas.",
      },
      {
        type: "tip",
        content: "Quando estiver depurando recursão, imprima n e a profundidade no início da função. Você vai enxergar a árvore de chamadas e entender o que está acontecendo.",
      },
      {
        type: "info",
        content: "lru_cache vem do módulo functools e funciona como um dicionário oculto que guarda os resultados já calculados, transformando algoritmos lentos em rápidos.",
      },
    ],
  },
  {
    slug: "docstrings-anotacoes",
    section: "funcoes",
    title: "Docstrings e anotações de tipo",
    difficulty: "intermediario",
    subtitle: "Documentando o contrato da função.",
    intro: `Código que você escreve hoje vai ser lido por outra pessoa amanhã. Essa pessoa pode ser um colega, um futuro mantenedor, ou você mesmo daqui a três meses, sem lembrar o que estava pensando. Documentar funções não é frescura, é investimento.

Docstring é uma string colocada logo na primeira linha do corpo da função. Ela vira o "manual" daquela função, acessível via help() e exibida pelo VSCode no autocomplete. Existem estilos populares como Google, NumPy e reST, mas o importante é ser consistente no projeto.

Anotações de tipo, ou type hints, dizem que tipo cada parâmetro espera e qual tipo a função retorna. Em def soma(a: int, b: int) -> int, deixamos claro que a e b são inteiros e o resultado também. Python não força esses tipos em tempo de execução, mas o editor e ferramentas como mypy verificam pra você.

Juntos, docstring e type hints formam o contrato da função. Quem usa sabe o que entrega e o que recebe sem precisar abrir o código. Quem escreve fica forçado a pensar nas entradas e saídas antes de programar a lógica. Funciona bem.`,
    codes: [
      {
        lang: "python",
        code: `# Docstring simples (uma linha).
def saudacao(nome):
    """Retorna uma saudação personalizada."""
    return f"Olá, {nome}!"

print(saudacao.__doc__)  # → Retorna uma saudação personalizada.
help(saudacao)`,
      },
      {
        lang: "python",
        code: `# Docstring no estilo Google: descrição, parâmetros, retorno.
def calcular_imc(peso, altura):
    """Calcula o Índice de Massa Corporal.

    Args:
        peso: Peso em quilogramas.
        altura: Altura em metros.

    Returns:
        IMC arredondado em duas casas decimais.

    Raises:
        ValueError: Se altura for zero ou negativa.
    """
    if altura <= 0:
        raise ValueError("altura deve ser positiva")
    return round(peso / (altura ** 2), 2)

print(calcular_imc(70, 1.75))  # → 22.86`,
      },
      {
        lang: "python",
        code: `# Anotações de tipo: indicam o tipo esperado.
def soma(a: int, b: int) -> int:
    return a + b

print(soma(3, 4))     # → 7
# print(soma("a","b"))  # roda, mas mypy/IDE acusa erro de tipo.`,
      },
      {
        lang: "python",
        code: `# Tipos compostos do typing.
from typing import Optional

def primeiro_par(numeros: list[int]) -> Optional[int]:
    """Retorna o primeiro número par da lista, ou None se não houver."""
    for n in numeros:
        if n % 2 == 0:
            return n
    return None

print(primeiro_par([1, 3, 4, 7]))  # → 4
print(primeiro_par([1, 3, 5]))     # → None`,
      },
      {
        lang: "python",
        code: `# Anotações em parâmetros com valor padrão.
def conectar(host: str, porta: int = 5432, timeout: float = 30.0) -> bool:
    """Tenta conectar a um banco e devolve True em caso de sucesso."""
    print(f"Conectando em {host}:{porta} (timeout={timeout}s)")
    return True

conectar("localhost")
conectar("db.exemplo.com", porta=5433, timeout=10)`,
      },
      {
        lang: "python",
        code: `# Inspecionando anotações.
def f(x: int, y: str = "ok") -> bool:
    return True

print(f.__annotations__)
# → {'x': <class 'int'>, 'y': <class 'str'>, 'return': <class 'bool'>}`,
      },
    ],
    points: [
      "Docstring é uma string na primeira linha do corpo da função, acessível via help().",
      "Type hints declaram os tipos de parâmetros e do retorno, mas não forçam em runtime.",
      "Ferramentas como mypy verificam estaticamente se os tipos batem.",
      "IDE usa docstrings e type hints para autocomplete e dicas em tempo real.",
      "Estilos comuns de docstring: Google, NumPy e reST; escolha um e mantenha.",
      "Armadilha: type hint não substitui validação; tipos são apenas dica.",
      "Armadilha: docstring desatualizada engana mais do que a falta dela.",
      "Use Optional[X] ou X | None pra indicar que o valor pode ser None.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Escreva a docstring antes de implementar a função. Esse exercício obriga você a pensar no que ela faz, o que recebe e o que devolve antes de codar.",
      },
      {
        type: "info",
        content: "A partir do Python 3.9 você pode usar list[int], dict[str, int] direto, sem importar do typing. Em 3.10+ também vale int | None em vez de Optional.",
      },
      {
        type: "success",
        content: "Type hints melhoram drasticamente o autocomplete e ajudam a pegar bugs sem rodar o código. Adote em projetos novos desde o início.",
      },
    ],
  },
  {
    slug: "decorators",
    section: "funcoes",
    title: "Decorators",
    difficulty: "avancado",
    subtitle: "Funções que envolvem outras funções.",
    intro: `Decorator é uma função que recebe outra função e devolve uma versão modificada dela. Pense em uma capa que você coloca sobre a função original: ela continua fazendo o que fazia, mas agora com algo a mais antes ou depois. Logging, medição de tempo, autenticação, cache, são casos típicos.

A sintaxe @decorator em cima de uma função é só um açúcar para fazer funcao = decorator(funcao). O Python pega sua função, passa pelo decorator e substitui pelo retorno. Por isso o decorator recebe uma função e devolve uma função.

Para escrever um decorator você precisa entender closures bem, porque a função interna captura a função original. Quando o usuário chama o resultado, na verdade está chamando a interna, que faz o seu "extra" e depois delega pra original. Não é mágica, é composição.

Decorators podem ter parâmetros próprios, encadear vários (@a @b @c), e até ser aplicados a métodos de classe. No início, basta saber usá-los: @lru_cache, @staticmethod, @property aparecem em todo lugar. Depois, escrever os seus próprios vira natural.`,
    codes: [
      {
        lang: "python",
        code: `# Versão manual: decorator é só uma função que envolve outra.
def gritar(funcao):
    def wrapper(texto):
        resultado = funcao(texto)
        return resultado.upper() + "!!!"
    return wrapper

def saudar(nome):
    return f"olá {nome}"

saudar = gritar(saudar)
print(saudar("ana"))  # → OLÁ ANA!!!`,
      },
      {
        lang: "python",
        code: `# Mesma coisa com a sintaxe @.
def gritar(funcao):
    def wrapper(texto):
        return funcao(texto).upper() + "!!!"
    return wrapper

@gritar
def saudar(nome):
    return f"olá {nome}"

print(saudar("bruno"))  # → OLÁ BRUNO!!!`,
      },
      {
        lang: "python",
        code: `# Decorator genérico que aceita *args e **kwargs.
import time

def cronometro(funcao):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = funcao(*args, **kwargs)
        print(f"{funcao.__name__} levou {time.time() - inicio:.4f}s")
        return resultado
    return wrapper

@cronometro
def somar_lento(n):
    return sum(range(n))

print(somar_lento(1_000_000))`,
      },
      {
        lang: "python",
        code: `# Preservando metadados com functools.wraps.
from functools import wraps

def logar(funcao):
    @wraps(funcao)               # mantém __name__, __doc__ originais
    def wrapper(*args, **kwargs):
        print(f"Chamando {funcao.__name__}")
        return funcao(*args, **kwargs)
    return wrapper

@logar
def cumprimentar(nome):
    """Cumprimenta uma pessoa."""
    return f"oi {nome}"

print(cumprimentar.__name__)  # → cumprimentar (sem wraps seria 'wrapper')
print(cumprimentar.__doc__)   # → Cumprimenta uma pessoa.`,
      },
      {
        lang: "python",
        code: `# Decorator com parâmetros: precisa de uma camada extra.
def repetir(vezes):
    def decorator(funcao):
        def wrapper(*args, **kwargs):
            for _ in range(vezes):
                resultado = funcao(*args, **kwargs)
            return resultado
        return wrapper
    return decorator

@repetir(vezes=3)
def cumprimentar(nome):
    print(f"oi {nome}")

cumprimentar("Ana")
# oi Ana
# oi Ana
# oi Ana`,
      },
      {
        lang: "python",
        code: `# Decorators prontos do Python: lru_cache, property, staticmethod.
from functools import lru_cache

@lru_cache(maxsize=None)
def quadrado(n):
    print(f"calculando {n}")
    return n * n

print(quadrado(4))  # calculando 4 / 16
print(quadrado(4))  # 16  (sem recalcular, veio do cache)
print(quadrado(5))  # calculando 5 / 25`,
      },
    ],
    points: [
      "Decorator é uma função que recebe outra e devolve uma versão modificada.",
      "A sintaxe @decorator é açúcar para funcao = decorator(funcao).",
      "Use *args e **kwargs no wrapper para que o decorator funcione com qualquer assinatura.",
      "@functools.wraps preserva nome, docstring e anotações da função original.",
      "Decorators com parâmetros precisam de três níveis de função aninhada.",
      "Decorators usam closures por baixo dos panos para lembrar da função original.",
      "Armadilha: esquecer @wraps faz help() e __name__ mostrarem 'wrapper' confuso.",
      "Armadilha: decorators muito mágicos atrapalham debugging; documente bem o que fazem.",
    ],
    alerts: [
      {
        type: "info",
        content: "Você já está usando decorators há tempos sem perceber: @staticmethod, @classmethod, @property e @lru_cache são exemplos clássicos da biblioteca padrão.",
      },
      {
        type: "tip",
        content: "Sempre use @functools.wraps no wrapper interno do seu decorator. Custa zero e mantém o autocomplete e o help corretos.",
      },
      {
        type: "warning",
        content: "Decorators rodam no momento da definição da função, não quando ela é chamada. Erros no decorator aparecem antes mesmo de você chamar a função decorada.",
      },
    ],
  },
];
