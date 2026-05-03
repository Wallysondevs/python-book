import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "listas",
    section: "estruturas",
    title: "Listas: criação e acesso",
    difficulty: "iniciante",
    subtitle: "A estrutura mais usada do Python no dia a dia.",
    intro: `Imagine a lista de compras do supermercado anotada num papel: tem ovos, leite, pão, café. A ordem importa (o que você escreveu primeiro continua no topo), você pode adicionar mais itens depois, riscar algum e até repetir. A lista do Python funciona exatamente assim: é uma sequência ordenada de valores guardados juntos sob um único nome.\n\nListas existem porque, na prática, raramente trabalhamos com um valor só. Você não tem "um produto", tem vários. Não tem "um aluno", tem uma turma. Em vez de criar produto1, produto2, produto3 (o que seria um pesadelo), você guarda tudo numa lista e acessa por posição.\n\nNeste capítulo você vai aprender a criar listas, ler valores específicos pela posição (índice) e fatiar pedaços. Cuidado com uma pegadinha clássica: o Python começa a contar do zero, não do um. Isso confunde no começo, mas faz sentido depois. Dominar listas é pré-requisito para quase tudo: laços, leitura de arquivos, dados vindos de APIs.`,
    codes: [
      {
        lang: "python",
        code: `# Criando uma lista de compras
compras = ["ovos", "leite", "pão", "café"]

# A lista inteira
print(compras)
# → ['ovos', 'leite', 'pão', 'café']

# Quantos itens tem?
print(len(compras))  # → 4`,
      },
      {
        lang: "python",
        code: `# Acesso por índice — começa em 0!
frutas = ["maçã", "banana", "uva", "manga"]

print(frutas[0])   # → maçã  (primeiro)
print(frutas[1])   # → banana
print(frutas[3])   # → manga (último)

# Índice negativo conta de trás pra frente
print(frutas[-1])  # → manga
print(frutas[-2])  # → uva`,
      },
      {
        lang: "python",
        code: `# Fatiamento (slicing): pega um pedaço da lista
numeros = [10, 20, 30, 40, 50, 60]

print(numeros[1:4])   # → [20, 30, 40]  (do índice 1 até antes do 4)
print(numeros[:3])    # → [10, 20, 30]  (do começo até antes do 3)
print(numeros[3:])    # → [40, 50, 60]  (do 3 até o fim)
print(numeros[::2])   # → [10, 30, 50]  (de 2 em 2)
print(numeros[::-1])  # → [60, 50, 40, 30, 20, 10]  (invertida)`,
      },
      {
        lang: "python",
        code: `# Listas podem misturar tipos (mas evite quando puder)
mistura = ["Ana", 28, True, 1.75]
print(mistura[0])  # → Ana
print(mistura[1])  # → 28

# Lista vazia (você vai preencher depois)
carrinho = []
print(len(carrinho))  # → 0`,
      },
      {
        lang: "python",
        code: `# Trocar um valor pela posição
notas = [7.5, 8.0, 6.0]
notas[2] = 9.0
print(notas)  # → [7.5, 8.0, 9.0]

# Erro clássico: índice que não existe
print(notas[10])
# IndexError: list index out of range`,
      },
      {
        lang: "python",
        code: `# Verificar se algo está na lista
times = ["Flamengo", "Corinthians", "Grêmio"]

print("Flamengo" in times)   # → True
print("Cuiabá" in times)     # → False

# Usado em condicionais
if "Corinthians" in times:
    print("Já está cadastrado")`,
      },
    ],
    points: [
      "Listas são ordenadas: a posição importa e se mantém.",
      "Índice começa em 0; o último item é len(lista) - 1.",
      "Índice negativo conta de trás pra frente: -1 é o último.",
      "Fatias usam lista[início:fim:passo] e o fim é exclusivo.",
      "Listas são mutáveis: você pode trocar, adicionar e remover itens.",
      "Acessar índice inexistente gera IndexError; sempre confira o tamanho.",
      "Use 'in' para checar se um valor existe antes de tentar usá-lo.",
      "Listas podem ter tipos diferentes, mas dados homogêneos são mais fáceis de trabalhar.",
    ],
    alerts: [
      { type: "warning", content: "O fim do slice é EXCLUSIVO. lista[1:4] devolve os índices 1, 2 e 3 — não inclui o 4. Esse detalhe pega muita gente." },
      { type: "tip", content: "Para copiar uma lista rapidinho sem alterar a original, use lista[:]. É um fatiamento que pega tudo e devolve uma nova lista." },
      { type: "info", content: "len(lista) devolve a quantidade de itens. Combine com índices negativos para acessar o final sem precisar calcular nada." },
    ],
  },
  {
    slug: "metodos-listas",
    section: "estruturas",
    title: "Métodos de listas",
    difficulty: "iniciante",
    subtitle: "append, extend, insert, remove, pop, sort e amigos.",
    intro: `Criar uma lista é só o começo. Na vida real você precisa adicionar itens, tirar outros, ordenar, inverter, contar. O Python já vem com uma caixa de ferramentas pronta para isso: são os chamados métodos da lista. Você chama um método com a sintaxe lista.metodo(), como se estivesse dando uma ordem para a lista executar.\n\nA confusão comum aqui é entre métodos que MODIFICAM a lista no lugar (como append, sort, reverse) e funções que devolvem um novo valor (como sorted, reversed). Os métodos que mudam a lista geralmente devolvem None, e isso surpreende muita gente que tenta fazer "lista = lista.sort()" e descobre que perdeu tudo.\n\nNeste capítulo você vai aprender os métodos mais usados no dia a dia: adicionar no final, no meio, ou várias coisas de uma vez; remover por valor ou por posição; ordenar de várias formas; e contar quantas vezes algo aparece. São operações simples, mas você vai usá-las em quase todo programa que escrever.`,
    codes: [
      {
        lang: "python",
        code: `# append: adiciona UM item no final
tarefas = ["estudar", "treinar"]
tarefas.append("ler")
print(tarefas)  # → ['estudar', 'treinar', 'ler']

# extend: adiciona VÁRIOS itens (de outra lista)
tarefas.extend(["jantar", "dormir"])
print(tarefas)  # → ['estudar', 'treinar', 'ler', 'jantar', 'dormir']`,
      },
      {
        lang: "python",
        code: `# Cuidado: append vs extend com uma lista
a = [1, 2]
a.append([3, 4])
print(a)  # → [1, 2, [3, 4]]   (lista dentro da lista!)

b = [1, 2]
b.extend([3, 4])
print(b)  # → [1, 2, 3, 4]     (espalhou os itens)`,
      },
      {
        lang: "python",
        code: `# insert: coloca em uma posição específica
fila = ["Ana", "Bruno", "Carla"]
fila.insert(1, "Diego")  # entra na posição 1, empurra o resto
print(fila)  # → ['Ana', 'Diego', 'Bruno', 'Carla']

# remove: tira a PRIMEIRA ocorrência daquele valor
fila.remove("Bruno")
print(fila)  # → ['Ana', 'Diego', 'Carla']`,
      },
      {
        lang: "python",
        code: `# pop: remove pela posição e DEVOLVE o item retirado
estoque = ["caneta", "lápis", "borracha", "régua"]

ultimo = estoque.pop()       # sem argumento = último
print(ultimo)   # → régua
print(estoque)  # → ['caneta', 'lápis', 'borracha']

primeiro = estoque.pop(0)
print(primeiro)  # → caneta`,
      },
      {
        lang: "python",
        code: `# sort: ordena no lugar (não devolve nada)
notas = [7.5, 5.0, 9.0, 6.5]
notas.sort()
print(notas)  # → [5.0, 6.5, 7.5, 9.0]

notas.sort(reverse=True)
print(notas)  # → [9.0, 7.5, 6.5, 5.0]

# sorted: devolve uma NOVA lista ordenada (não mexe na original)
originais = [3, 1, 2]
ordenadas = sorted(originais)
print(originais)  # → [3, 1, 2]
print(ordenadas)  # → [1, 2, 3]`,
      },
      {
        lang: "python",
        code: `# count e index: estatísticas rápidas
votos = ["sim", "não", "sim", "sim", "não"]

print(votos.count("sim"))   # → 3
print(votos.index("não"))   # → 1  (primeira posição que aparece)

# reverse: inverte no lugar
nums = [1, 2, 3]
nums.reverse()
print(nums)  # → [3, 2, 1]`,
      },
      {
        lang: "python",
        code: `# Pegadinha: métodos que mudam a lista devolvem None
lista = [3, 1, 2]
resultado = lista.sort()
print(resultado)  # → None  (NÃO é a lista ordenada!)
print(lista)      # → [1, 2, 3]  (a lista mudou, mas o retorno é None)

# Para guardar o resultado, use sorted()
lista2 = [3, 1, 2]
resultado2 = sorted(lista2)
print(resultado2)  # → [1, 2, 3]`,
      },
    ],
    points: [
      "append adiciona um item; extend adiciona vários de uma vez.",
      "insert(pos, valor) coloca em uma posição e empurra o resto.",
      "remove(valor) tira a primeira ocorrência; gera ValueError se não existir.",
      "pop(pos) remove e devolve o item; sem argumento, remove o último.",
      "sort() altera a lista; sorted() devolve uma nova sem mexer na original.",
      "Métodos que modificam (sort, reverse, append) devolvem None.",
      "count e index ajudam a inspecionar a lista sem precisar de loops.",
      "reverse() inverte; reversed() devolve um iterador para uma nova ordem.",
      "Confunda append com extend e você acaba com listas dentro de listas.",
    ],
    alerts: [
      { type: "danger", content: "Nunca faça lista = lista.sort(). O método devolve None e você apaga a lista. Use lista.sort() sozinho ou nova = sorted(lista)." },
      { type: "warning", content: "remove(x) só tira a PRIMEIRA ocorrência de x. Se houver vários iguais, você precisa chamar várias vezes ou usar um loop." },
      { type: "tip", content: "Quando precisar da lista original intacta, prefira sorted() e reversed(). Eles não destroem o que você tinha." },
    ],
  },
  {
    slug: "copia-listas",
    section: "estruturas",
    title: "Copiando listas (e o erro comum)",
    difficulty: "intermediario",
    subtitle: "Cópia rasa, cópia profunda e o porquê de tudo dar errado.",
    intro: `Aqui mora um dos bugs mais frustrantes do Python para iniciantes. Você cria uma lista, faz "outra = lista", muda a outra... e a original também muda. Como assim?\n\nO truque é que, em Python, uma variável não guarda a lista em si, ela guarda uma referência (uma seta apontando para onde a lista está na memória). Quando você escreve outra = lista, você está copiando a SETA, não a lista. Os dois nomes apontam para o mesmo lugar, então qualquer mudança aparece dos dois lados.\n\nPara realmente duplicar os dados existem várias formas: lista[:], list(lista), lista.copy() — todas fazem o que chamamos de cópia rasa, ou seja, criam uma nova lista, mas se houver listas DENTRO da lista, essas internas continuam compartilhadas. Para o caso de estruturas aninhadas, existe o copy.deepcopy(), que duplica tudo até o último nível.\n\nEntender isso vai te poupar horas de debugging. Vamos ver na prática.`,
    codes: [
      {
        lang: "python",
        code: `# A armadilha: atribuição NÃO copia
a = [1, 2, 3]
b = a            # b é só outro nome para a MESMA lista

b.append(4)
print(a)  # → [1, 2, 3, 4]   (mudou também!)
print(b)  # → [1, 2, 3, 4]
print(a is b)  # → True  (são o mesmo objeto)`,
      },
      {
        lang: "python",
        code: `# Cópia rasa — três formas equivalentes
original = [1, 2, 3]

c1 = original[:]        # fatiamento completo
c2 = list(original)     # construtor list()
c3 = original.copy()    # método copy

c1.append(99)
print(original)  # → [1, 2, 3]   (intacta)
print(c1)        # → [1, 2, 3, 99]
print(original is c1)  # → False  (objetos diferentes)`,
      },
      {
        lang: "python",
        code: `# O problema da cópia rasa com listas aninhadas
matriz = [[1, 2], [3, 4]]
copia = matriz.copy()   # cópia rasa

copia[0].append(999)
print(matriz)  # → [[1, 2, 999], [3, 4]]   (vazou!)
print(copia)   # → [[1, 2, 999], [3, 4]]

# A lista de fora foi duplicada, mas as listas internas
# continuam sendo as mesmas dos dois lados.`,
      },
      {
        lang: "python",
        code: `# Solução: cópia profunda (deepcopy)
import copy

matriz = [[1, 2], [3, 4]]
profunda = copy.deepcopy(matriz)

profunda[0].append(999)
print(matriz)    # → [[1, 2], [3, 4]]        (intacta)
print(profunda)  # → [[1, 2, 999], [3, 4]]`,
      },
      {
        lang: "python",
        code: `# == compara conteúdo, is compara identidade
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(x == y)  # → True   (mesmo conteúdo)
print(x is y)  # → False  (objetos diferentes na memória)
print(x is z)  # → True   (mesmo objeto)`,
      },
      {
        lang: "python",
        code: `# Caso real: enviando lista para uma função
def adicionar_item(lst, item):
    lst.append(item)  # modifica a lista original!

carrinho = ["arroz"]
adicionar_item(carrinho, "feijão")
print(carrinho)  # → ['arroz', 'feijão']

# Se você NÃO quiser que a função altere a original:
def adicionar_seguro(lst, item):
    nova = lst.copy()
    nova.append(item)
    return nova`,
      },
    ],
    points: [
      "Atribuição (b = a) copia a referência, não a lista.",
      "Use lista[:], list(lista) ou lista.copy() para cópia rasa.",
      "Cópia rasa duplica só o nível externo; objetos aninhados continuam compartilhados.",
      "Para estruturas aninhadas, importe copy e use copy.deepcopy().",
      "== compara valores; is compara se é o mesmo objeto na memória.",
      "Funções que recebem lista podem alterar a original — cuidado com efeitos colaterais.",
      "deepcopy é mais lento; só use quando realmente precisar.",
      "Se você ver mudanças misteriosas, suspeite de cópia faltando.",
    ],
    alerts: [
      { type: "danger", content: "Atribuir uma lista a outra variável NÃO cria uma cópia. Os dois nomes passam a apontar para a mesma lista, e mudanças aparecem em ambos." },
      { type: "warning", content: "lista.copy() resolve o nível mais externo. Se há listas (ou dicts) dentro, elas continuam compartilhadas. Use deepcopy nesse caso." },
      { type: "info", content: "O operador 'is' verifica identidade de objeto, não igualdade de valor. Para comparar conteúdo, use sempre ==." },
    ],
  },
  {
    slug: "tuplas",
    section: "estruturas",
    title: "Tuplas: imutáveis e rápidas",
    difficulty: "iniciante",
    subtitle: "Quando usar uma tupla em vez de uma lista.",
    intro: `Tupla é parecida com lista: também é uma sequência ordenada de valores. A diferença fundamental é uma só, mas faz toda a diferença: tupla é IMUTÁVEL. Depois de criada, você não pode adicionar, remover ou trocar nada dentro dela.\n\nIsso parece uma limitação, mas é justamente o ponto forte. Imagine as coordenadas de um ponto no mapa: latitude e longitude formam um par que não faz sentido alterar isoladamente. Ou as cores RGB de uma cor: três números fixos. Ou a data de nascimento de alguém: dia, mês, ano. Para esses casos, tupla é mais clara, mais segura e mais rápida que lista.\n\nA sintaxe usa parênteses (em vez de colchetes), mas o que define a tupla são as vírgulas. Existe uma pegadinha famosa: (5) é apenas o número 5 entre parênteses, não uma tupla. Para criar uma tupla de um item só, você precisa da vírgula: (5,).\n\nTuplas também aparecem o tempo todo em Python sem você notar: funções que devolvem vários valores na verdade devolvem uma tupla. Vamos ver tudo isso.`,
    codes: [
      {
        lang: "python",
        code: `# Criando tuplas
ponto = (10, 20)
cor = (255, 128, 0)
pessoa = ("Ana", 28, "Recife")

print(ponto[0])   # → 10
print(cor[2])     # → 0
print(pessoa[1])  # → 28`,
      },
      {
        lang: "python",
        code: `# Tupla é IMUTÁVEL
ponto = (10, 20)
ponto[0] = 50
# TypeError: 'tuple' object does not support item assignment

# Para "mudar", você cria uma nova
novo_ponto = (50, ponto[1])
print(novo_ponto)  # → (50, 20)`,
      },
      {
        lang: "python",
        code: `# Pegadinha: parênteses sozinhos não fazem tupla
nao_e_tupla = (5)
print(type(nao_e_tupla))  # → <class 'int'>

e_tupla = (5,)            # a vírgula é obrigatória!
print(type(e_tupla))      # → <class 'tuple'>

# Tupla vazia precisa dos parênteses
vazia = ()
print(type(vazia))        # → <class 'tuple'>`,
      },
      {
        lang: "python",
        code: `# Desempacotamento: separar uma tupla em variáveis
ponto = (10, 20)
x, y = ponto
print(x)  # → 10
print(y)  # → 20

# Útil para trocar valores sem variável temporária
a, b = 1, 2
a, b = b, a
print(a, b)  # → 2 1`,
      },
      {
        lang: "python",
        code: `# Funções podem devolver várias coisas — é uma tupla disfarçada
def divisao_inteira(x, y):
    return x // y, x % y   # devolve (quociente, resto)

quociente, resto = divisao_inteira(17, 5)
print(quociente)  # → 3
print(resto)      # → 2`,
      },
      {
        lang: "python",
        code: `# Tuplas podem ser chave de dicionário (listas não podem)
distancias = {
    ("Recife", "Olinda"): 7,
    ("São Paulo", "Campinas"): 95,
}
print(distancias[("Recife", "Olinda")])  # → 7

# Tentar usar lista como chave dá erro
# {[1, 2]: "ops"}  # TypeError: unhashable type: 'list'`,
      },
    ],
    points: [
      "Tupla é uma sequência ordenada e imutável.",
      "Use parênteses na criação, mas a vírgula é o que define a tupla.",
      "(5) é um inteiro; (5,) é uma tupla de um elemento.",
      "Tuplas são levemente mais rápidas e ocupam menos memória que listas.",
      "Funções que retornam vários valores estão retornando uma tupla.",
      "Desempacotamento (a, b = tupla) é uma das ferramentas mais elegantes do Python.",
      "Tuplas podem ser usadas como chave de dicionário; listas não podem.",
      "Para 'modificar' uma tupla, na verdade você cria uma nova.",
    ],
    alerts: [
      { type: "warning", content: "Para criar uma tupla com um único elemento, a vírgula é obrigatória: (5,). Sem vírgula, você só tem um número entre parênteses." },
      { type: "tip", content: "Use tuplas quando os dados representam um registro fixo (ponto, cor, data). Listas são para coleções que crescem e mudam." },
      { type: "info", content: "Tuplas são hasheáveis (desde que seus elementos também sejam), por isso podem virar chaves de dicionário e elementos de set." },
    ],
  },
  {
    slug: "dicionarios",
    section: "estruturas",
    title: "Dicionários: chave-valor",
    difficulty: "iniciante",
    subtitle: "Mapeando informações com nomes em vez de posições.",
    intro: `Pense numa agenda telefônica: cada nome aponta para um número. Você não procura "a pessoa da posição 47", procura por "Ana". Esse é exatamente o modelo do dicionário em Python: uma estrutura onde cada valor é guardado sob uma chave, e você acessa pela chave em vez de pela posição.\n\nDicionários (também chamados de dict) são uma das estruturas mais poderosas do Python. Quase tudo que vem da web, de bancos de dados ou de arquivos JSON chega na forma de dicionário. Saber manipular dict é praticamente obrigatório para qualquer coisa real.\n\nA sintaxe usa chaves { } e pares chave: valor separados por dois-pontos. As chaves precisam ser únicas (se você repetir, a última vence) e imutáveis (strings, números e tuplas servem; listas não). Os valores podem ser qualquer coisa.\n\nNeste capítulo vamos criar dicionários, ler e escrever campos, atualizar e remover entradas. No próximo capítulo veremos os métodos auxiliares que tornam o trabalho com dicionários muito mais agradável.`,
    codes: [
      {
        lang: "python",
        code: `# Criando um dicionário
pessoa = {
    "nome": "Ana",
    "idade": 28,
    "cidade": "Recife",
}

# Acesso pela chave
print(pessoa["nome"])    # → Ana
print(pessoa["idade"])   # → 28`,
      },
      {
        lang: "python",
        code: `# Adicionar e atualizar é a mesma operação
pessoa = {"nome": "Ana"}

pessoa["idade"] = 28          # adiciona
pessoa["nome"] = "Ana Maria"  # atualiza

print(pessoa)
# → {'nome': 'Ana Maria', 'idade': 28}`,
      },
      {
        lang: "python",
        code: `# Chave inexistente dá erro
pessoa = {"nome": "Bruno"}
print(pessoa["telefone"])
# KeyError: 'telefone'

# Para evitar: verificar antes ou usar get()
if "telefone" in pessoa:
    print(pessoa["telefone"])
else:
    print("sem telefone")`,
      },
      {
        lang: "python",
        code: `# Remover entradas
estoque = {"caneta": 10, "lápis": 5, "borracha": 3}

del estoque["lápis"]
print(estoque)  # → {'caneta': 10, 'borracha': 3}

# pop devolve o valor removido
quantidade = estoque.pop("caneta")
print(quantidade)  # → 10
print(estoque)     # → {'borracha': 3}`,
      },
      {
        lang: "python",
        code: `# Iterar: por padrão percorre as chaves
precos = {"arroz": 25.0, "feijão": 9.5, "café": 18.0}

for produto in precos:
    print(produto, "→", precos[produto])
# arroz → 25.0
# feijão → 9.5
# café → 18.0`,
      },
      {
        lang: "python",
        code: `# Valores podem ser qualquer coisa, inclusive listas e dicts
aluno = {
    "nome": "Carla",
    "notas": [8.5, 7.0, 9.0],
    "endereco": {
        "rua": "Rua das Flores",
        "numero": 123,
    },
}

print(aluno["notas"][0])           # → 8.5
print(aluno["endereco"]["rua"])    # → Rua das Flores`,
      },
    ],
    points: [
      "Dicionário guarda pares chave-valor entre chaves { }.",
      "Acesso é por chave: dict[\"chave\"], não por posição.",
      "Atribuir a uma chave existente atualiza; a uma nova, adiciona.",
      "Acessar chave inexistente com [ ] gera KeyError.",
      "Chaves precisam ser únicas e imutáveis (str, int, tupla).",
      "Valores podem ser de qualquer tipo, incluindo outros dicts e listas.",
      "del e pop removem entradas; pop devolve o valor.",
      "Desde Python 3.7 a ordem de inserção é preservada.",
    ],
    alerts: [
      { type: "warning", content: "Acessar uma chave que não existe com colchetes gera KeyError e quebra o programa. Use 'in' ou .get() para casos onde a chave pode faltar." },
      { type: "tip", content: "Quando os dados têm campos com nomes (nome, idade, email), prefira dicionário. Quando são uma sequência homogênea (notas, preços), prefira lista." },
      { type: "info", content: "Dicionários do Python são extremamente otimizados. Buscar por chave é praticamente instantâneo, mesmo com milhares de entradas." },
    ],
  },
  {
    slug: "metodos-dict",
    section: "estruturas",
    title: "Métodos de dicionário",
    difficulty: "iniciante",
    subtitle: "get, keys, values, items, update e setdefault.",
    intro: `Agora que você já sabe criar e acessar dicionários, vamos aos métodos que fazem o dia a dia muito mais fácil. Eles resolvem situações comuns: pegar um valor sem dar erro se a chave não existir, percorrer todas as chaves ou todos os valores, juntar dois dicionários, garantir um valor padrão.\n\nO método get é talvez o mais útil. Em vez de acessar com colchetes (que quebra se a chave não existir), você usa dict.get("chave") e recebe None caso ela falte — ou um valor padrão que você definir. É a forma defensiva e segura de ler dicionários, especialmente quando os dados vêm de fora (JSON de uma API, formulário, banco de dados).\n\nOs métodos keys(), values() e items() são a base de qualquer iteração mais elaborada. items() devolve pares (chave, valor) que você desempacota direto no for, e isso é tão idiomático em Python quanto possível.\n\nDominar esses métodos é o passo que separa quem "consegue mexer com dict" de quem "trabalha bem com dict".`,
    codes: [
      {
        lang: "python",
        code: `# get: leitura segura
pessoa = {"nome": "Ana", "idade": 28}

print(pessoa.get("nome"))      # → Ana
print(pessoa.get("telefone"))  # → None  (não dá erro)

# Com valor padrão
print(pessoa.get("telefone", "não informado"))
# → não informado`,
      },
      {
        lang: "python",
        code: `# keys, values, items
precos = {"arroz": 25.0, "feijão": 9.5, "café": 18.0}

print(list(precos.keys()))    # → ['arroz', 'feijão', 'café']
print(list(precos.values()))  # → [25.0, 9.5, 18.0]
print(list(precos.items()))   # → [('arroz', 25.0), ('feijão', 9.5), ('café', 18.0)]`,
      },
      {
        lang: "python",
        code: `# Iterar com items() — o jeito idiomático
precos = {"arroz": 25.0, "feijão": 9.5, "café": 18.0}

for produto, preco in precos.items():
    print(f"{produto}: R$ {preco:.2f}")
# arroz: R$ 25.00
# feijão: R$ 9.50
# café: R$ 18.00`,
      },
      {
        lang: "python",
        code: `# update: junta outro dicionário (ou sobrescreve)
config = {"tema": "claro", "idioma": "pt"}
config.update({"tema": "escuro", "fonte": "16px"})

print(config)
# → {'tema': 'escuro', 'idioma': 'pt', 'fonte': '16px'}`,
      },
      {
        lang: "python",
        code: `# setdefault: pega o valor; se não existir, cria com o padrão
contagem = {}
palavras = ["python", "java", "python", "go", "java", "python"]

for palavra in palavras:
    contagem.setdefault(palavra, 0)
    contagem[palavra] += 1

print(contagem)
# → {'python': 3, 'java': 2, 'go': 1}`,
      },
      {
        lang: "python",
        code: `# pop e popitem
estoque = {"caneta": 10, "lápis": 5}

valor = estoque.pop("caneta")
print(valor)     # → 10
print(estoque)   # → {'lápis': 5}

# popitem remove e devolve o ÚLTIMO par inserido
estoque["régua"] = 4
chave, val = estoque.popitem()
print(chave, val)  # → régua 4`,
      },
      {
        lang: "python",
        code: `# A partir do Python 3.9: operador | para unir dicts
a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

c = a | b   # cria um novo (b vence em conflitos)
print(c)    # → {'x': 1, 'y': 99, 'z': 3}

a |= b      # atualiza a no lugar
print(a)    # → {'x': 1, 'y': 99, 'z': 3}`,
      },
    ],
    points: [
      "get(chave, padrao) lê sem quebrar se a chave não existir.",
      "items() devolve pares (chave, valor) — perfeito para for.",
      "keys() e values() devolvem visões dinâmicas do dicionário.",
      "update() funde outro dicionário, sobrescrevendo chaves repetidas.",
      "setdefault inicializa uma chave só se ela ainda não existir.",
      "pop(chave) remove e devolve o valor; popitem() tira o último par.",
      "Operador | (Python 3.9+) une dicionários criando um novo.",
      "Iterar direto no dict percorre só as chaves; use items() para valor junto.",
    ],
    alerts: [
      { type: "tip", content: "Sempre que ler dados de fonte externa (API, JSON, formulário), prefira .get() em vez de colchetes. Você evita um monte de KeyError." },
      { type: "warning", content: "update() sobrescreve em silêncio. Se houver chaves iguais nos dois dicionários, o segundo vence. Isso pode mascarar dados sem aviso." },
      { type: "success", content: "Para contar ocorrências, em vez de setdefault, considere collections.Counter. Ele é feito exatamente para isso e mais conciso." },
    ],
  },
  {
    slug: "dict-comprehension",
    section: "estruturas",
    title: "Dict comprehensions",
    difficulty: "intermediario",
    subtitle: "Criando dicionários em uma linha, com elegância.",
    intro: `Você já viu list comprehensions: aquela forma compacta de criar uma lista a partir de outra. Os dicionários têm a mesma ideia, com uma sintaxe parecida, e o nome também é parecido: dict comprehension.\n\nA estrutura é { chave: valor for item in iteravel }. Em vez de criar um dicionário vazio e ir preenchendo dentro de um for, você descreve em uma linha o resultado final. Isso é particularmente útil para transformar dados: pegar uma lista de tuplas e virar dicionário, inverter chaves e valores, filtrar entradas, gerar tabelas de conversão.\n\nA vantagem não é só ser curto. Comprehensions tornam o código mais legível QUANDO usadas em casos simples. Em casos complexos, elas viram um quebra-cabeça. A regra prática: se você não consegue ler em voz alta o que a comprehension faz, escreva como for tradicional.\n\nNeste capítulo vamos do exemplo mais básico até comprehensions com filtros e transformações, e também ver quando NÃO usar.`,
    codes: [
      {
        lang: "python",
        code: `# Caso clássico: transformar uma lista em dict
nomes = ["Ana", "Bruno", "Carla"]

# Forma longa
tamanhos = {}
for nome in nomes:
    tamanhos[nome] = len(nome)

# Forma comprehension
tamanhos = {nome: len(nome) for nome in nomes}
print(tamanhos)  # → {'Ana': 3, 'Bruno': 5, 'Carla': 5}`,
      },
      {
        lang: "python",
        code: `# Tabela de quadrados
quadrados = {n: n**2 for n in range(1, 6)}
print(quadrados)
# → {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Conversão de unidades (metros → pés)
metros = [1, 2, 5, 10]
em_pes = {m: round(m * 3.281, 2) for m in metros}
print(em_pes)
# → {1: 3.28, 2: 6.56, 5: 16.41, 10: 32.81}`,
      },
      {
        lang: "python",
        code: `# Com filtro: só pares
pares_ao_quadrado = {n: n**2 for n in range(1, 11) if n % 2 == 0}
print(pares_ao_quadrado)
# → {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}`,
      },
      {
        lang: "python",
        code: `# Inverter um dicionário (chaves <-> valores)
codigos = {"BR": "Brasil", "AR": "Argentina", "CL": "Chile"}
nomes_para_codigo = {nome: sigla for sigla, nome in codigos.items()}
print(nomes_para_codigo)
# → {'Brasil': 'BR', 'Argentina': 'AR', 'Chile': 'CL'}`,
      },
      {
        lang: "python",
        code: `# A partir de duas listas paralelas (zip)
produtos = ["arroz", "feijão", "café"]
precos   = [25.0, 9.5, 18.0]

tabela = {p: v for p, v in zip(produtos, precos)}
print(tabela)
# → {'arroz': 25.0, 'feijão': 9.5, 'café': 18.0}

# Equivalente direto (mais simples)
tabela = dict(zip(produtos, precos))`,
      },
      {
        lang: "python",
        code: `# Filtrando um dicionário existente
estoque = {"caneta": 10, "lápis": 0, "borracha": 3, "régua": 0}

em_falta = {p: q for p, q in estoque.items() if q == 0}
print(em_falta)  # → {'lápis': 0, 'régua': 0}

disponivel = {p: q for p, q in estoque.items() if q > 0}
print(disponivel)  # → {'caneta': 10, 'borracha': 3}`,
      },
      {
        lang: "python",
        code: `# Quando NÃO usar: lógica complicada
# Ruim — difícil de ler
resultado = {x: ("alto" if x > 10 else "baixo") for x in lista if x % 2 == 0 and x != 4}

# Melhor — for tradicional
resultado = {}
for x in lista:
    if x % 2 != 0 or x == 4:
        continue
    resultado[x] = "alto" if x > 10 else "baixo"`,
      },
    ],
    points: [
      "Sintaxe: {chave: valor for item in iteravel}.",
      "Pode incluir filtro com if no final.",
      "Ótimo para inverter dicionários, transformar listas e gerar tabelas.",
      "dict(zip(a, b)) costuma ser mais simples que comprehension equivalente.",
      "Iterar com .items() permite usar tanto chave quanto valor na expressão.",
      "Se a comprehension fica difícil de ler, volte para o for tradicional.",
      "Comprehensions criam um NOVO dict; não modificam o original.",
      "Cuidado ao inverter dicts: chaves que se repetem nos valores se sobrescrevem.",
    ],
    alerts: [
      { type: "tip", content: "Para criar dict a partir de duas listas paralelas, dict(zip(a, b)) é mais idiomático e curto que a comprehension equivalente." },
      { type: "warning", content: "Ao inverter chaves e valores, se houver valores duplicados, alguns pares vão desaparecer silenciosamente. O último vence." },
      { type: "info", content: "Comprehensions também existem para listas, sets e geradores. A estrutura é parecida, muda só o tipo de delimitador." },
    ],
  },
  {
    slug: "sets",
    section: "estruturas",
    title: "Conjuntos (set)",
    difficulty: "iniciante",
    subtitle: "Coleções sem ordem e sem repetição.",
    intro: `Set é a estrutura que você usa quando duas coisas importam: não pode ter elementos repetidos, e a ordem não interessa. Pense numa lista de convidados de uma festa: se a Ana aparecer duas vezes, ainda é uma pessoa só. Se a Ana foi convidada antes ou depois do Bruno, isso não muda o resultado.\n\nO set é inspirado no conceito matemático de conjunto. Ele oferece operações como união, intersecção, diferença — exatamente como você aprendeu na escola. Isso é maravilhoso para comparar coleções: quem está nos dois grupos? Quem está em A mas não em B? Quais elementos são únicos?\n\nOutra qualidade do set: a busca é praticamente instantânea, muito mais rápida que em listas. Verificar "x in conjunto" é eficiente mesmo com milhões de itens. Por isso, sempre que você precisar checar pertencimento muitas vezes, set é a escolha certa.\n\nA sintaxe usa chaves { } como dict, mas sem dois-pontos. Atenção: { } sozinho cria um dicionário vazio, não um set vazio. Para set vazio você usa set().`,
    codes: [
      {
        lang: "python",
        code: `# Criando sets
cores = {"vermelho", "azul", "verde"}
print(cores)  # ordem pode variar

# A partir de uma lista (remove duplicatas!)
numeros = [1, 2, 2, 3, 3, 3, 4]
unicos = set(numeros)
print(unicos)  # → {1, 2, 3, 4}

# Set vazio: NÃO use {}
vazio = set()
nao_e_set = {}     # isso é um dict vazio
print(type(vazio))      # → <class 'set'>
print(type(nao_e_set))  # → <class 'dict'>`,
      },
      {
        lang: "python",
        code: `# Adicionar e remover
cores = {"vermelho", "azul"}

cores.add("verde")
print(cores)  # → {'vermelho', 'azul', 'verde'}

cores.add("azul")  # já existe — não muda nada
print(cores)

cores.remove("vermelho")
# cores.remove("rosa")  # KeyError se não existir

cores.discard("rosa")  # não dá erro se não existir`,
      },
      {
        lang: "python",
        code: `# Operações de conjunto
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # união:        {1, 2, 3, 4, 5, 6}
print(a & b)   # intersecção:  {3, 4}
print(a - b)   # diferença:    {1, 2}
print(a ^ b)   # diferença simétrica: {1, 2, 5, 6}`,
      },
      {
        lang: "python",
        code: `# Caso real: comparar duas listas de emails
inscritos = {"ana@x.com", "bruno@x.com", "carla@x.com"}
pagantes  = {"bruno@x.com", "carla@x.com", "diego@x.com"}

# Quem se inscreveu mas não pagou
devedores = inscritos - pagantes
print(devedores)  # → {'ana@x.com'}

# Quem está nos dois
ativos = inscritos & pagantes
print(ativos)  # → {'bruno@x.com', 'carla@x.com'}`,
      },
      {
        lang: "python",
        code: `# Verificação de pertencimento — MUITO rápida
permitidos = {"admin", "editor", "leitor"}

usuario = "editor"
if usuario in permitidos:
    print("acesso liberado")

# Compare com lista: in funciona, mas é mais lento
# em coleções grandes`,
      },
      {
        lang: "python",
        code: `# Sets são iteráveis (mas ordem não é garantida)
times = {"Flamengo", "Santos", "Grêmio"}
for t in times:
    print(t)

# Para garantir ordem na exibição, ordene
for t in sorted(times):
    print(t)`,
      },
      {
        lang: "python",
        code: `# Subconjunto e superconjunto
a = {1, 2}
b = {1, 2, 3, 4}

print(a.issubset(b))    # → True   (a está dentro de b)
print(b.issuperset(a))  # → True
print(a <= b)           # → True   (mesma coisa, sintaxe alternativa)
print(a.isdisjoint({5, 6}))  # → True (sem elementos em comum)`,
      },
    ],
    points: [
      "Set não tem ordem garantida e não permite repetições.",
      "Criar set vazio é set(), não { } (que cria dict).",
      "set(lista) é o jeito mais simples de remover duplicatas.",
      "Operações: | união, & intersecção, - diferença, ^ diferença simétrica.",
      "Verificar pertencimento (x in s) é praticamente instantâneo.",
      "add adiciona, remove dá erro se não existir, discard não.",
      "Os elementos do set precisam ser imutáveis (str, int, tupla — não lista).",
      "Para exibir em ordem, use sorted(set).",
    ],
    alerts: [
      { type: "warning", content: "{ } cria um DICIONÁRIO vazio, não um set. Para um set vazio você precisa escrever set(). Esse é um erro silencioso muito comum." },
      { type: "tip", content: "Quando precisar testar 'x está em uma coleção?' várias vezes, converta para set primeiro. A diferença de velocidade é gigante em volumes grandes." },
      { type: "info", content: "Sets aceitam apenas elementos hasheáveis. Por isso você não pode ter listas dentro de sets, mas pode ter tuplas e strings." },
    ],
  },
  {
    slug: "frozenset",
    section: "estruturas",
    title: "frozenset: o set imutável",
    difficulty: "intermediario",
    subtitle: "Sets que podem ser usados como chaves.",
    intro: `O frozenset é primo direto do set: tem todos os métodos de leitura e operações de conjunto, mas é IMUTÁVEL. Uma vez criado, você não pode mais adicionar nem remover elementos. Pense nele como a tupla é para a lista: a versão "congelada" da estrutura.\n\nPor que precisamos disso? Porque sets normais não podem ser elementos de outro set, nem chaves de dicionário (justamente por serem mutáveis). Já o frozenset, sendo imutável, é hasheável, então pode aparecer nesses lugares onde só objetos imutáveis são aceitos.\n\nNo dia a dia, frozenset aparece menos que set, mas quando você precisa, ele resolve um problema específico: representar combinações fixas de itens como uma chave. Por exemplo, mapear pares de cidades sem se importar com a ordem da viagem (Recife-Olinda é o mesmo que Olinda-Recife). Ou agrupar alunos por matérias em comum.\n\nVeja como se cria, o que dá pra fazer e o que NÃO dá.`,
    codes: [
      {
        lang: "python",
        code: `# Criando um frozenset
fixo = frozenset(["python", "java", "go"])
print(fixo)  # → frozenset({'python', 'java', 'go'})

# A partir de uma string também funciona
letras = frozenset("python")
print(letras)  # → frozenset({'p', 'y', 't', 'h', 'o', 'n'})`,
      },
      {
        lang: "python",
        code: `# Operações de conjunto continuam funcionando
a = frozenset({1, 2, 3})
b = frozenset({3, 4, 5})

print(a | b)   # → frozenset({1, 2, 3, 4, 5})
print(a & b)   # → frozenset({3})
print(a - b)   # → frozenset({1, 2})

# O resultado também é frozenset`,
      },
      {
        lang: "python",
        code: `# O que NÃO funciona
fixo = frozenset({1, 2, 3})

fixo.add(4)
# AttributeError: 'frozenset' object has no attribute 'add'

fixo.remove(1)
# AttributeError: 'frozenset' object has no attribute 'remove'`,
      },
      {
        lang: "python",
        code: `# Por que existe: pode ser CHAVE de dicionário
distancias = {
    frozenset({"Recife", "Olinda"}): 7,
    frozenset({"São Paulo", "Campinas"}): 95,
}

# A ordem não importa porque frozenset não tem ordem
chave = frozenset({"Olinda", "Recife"})
print(distancias[chave])  # → 7`,
      },
      {
        lang: "python",
        code: `# E pode ser elemento DENTRO de outro set
grupos = {
    frozenset({"Ana", "Bruno"}),
    frozenset({"Carla", "Diego"}),
    frozenset({"Bruno", "Ana"}),  # duplicado — será ignorado
}
print(len(grupos))  # → 2`,
      },
      {
        lang: "python",
        code: `# Tentar usar set normal como chave dá erro
chave_errada = {1, 2, 3}
# d = {chave_errada: "ops"}
# TypeError: unhashable type: 'set'

# Convertendo para frozenset, funciona
d = {frozenset(chave_errada): "ok"}
print(d)  # → {frozenset({1, 2, 3}): 'ok'}`,
      },
    ],
    points: [
      "frozenset é a versão imutável do set.",
      "Tem todos os métodos de leitura, mas nenhum que altere o conteúdo.",
      "Sendo imutável, é hasheável: pode ser chave de dict ou elemento de set.",
      "Operações |, &, - continuam funcionando e devolvem frozenset.",
      "Cria-se com frozenset(iteravel); não há sintaxe literal especial.",
      "Use quando precisar de uma 'identidade' baseada em conjunto sem ordem.",
      "Tentar add/remove em frozenset gera AttributeError.",
      "Set normal não pode ser chave de dict, frozenset pode.",
    ],
    alerts: [
      { type: "info", content: "frozenset não tem sintaxe literal própria como { } — sempre use a função frozenset() passando um iterável." },
      { type: "tip", content: "Use frozenset quando quiser representar combinações sem ordem como chave (pares de cidades, grupos de pessoas, conjuntos de tags)." },
      { type: "warning", content: "Apesar de imutável, o frozenset só é hasheável se todos os seus elementos forem hasheáveis. Não tente colocar listas dentro." },
    ],
  },
  {
    slug: "estruturas-aninhadas",
    section: "estruturas",
    title: "Estruturas aninhadas",
    difficulty: "intermediario",
    subtitle: "Listas de dicts, dicts de listas e dados do mundo real.",
    intro: `No mundo real, dados quase nunca são planos. Uma turma tem vários alunos, e cada aluno tem várias notas. Um pedido tem vários itens, e cada item tem nome, quantidade e preço. Uma cidade tem vários bairros, e cada bairro tem várias ruas. Para representar tudo isso, você combina as estruturas que já aprendeu: lista dentro de dict, dict dentro de lista, dict dentro de dict, lista dentro de lista.\n\nA estrutura mais comum em programação web e em APIs é uma lista de dicionários. Cada item da lista é um registro (uma pessoa, um produto, um post), e o dicionário descreve seus campos. Quando você lê um JSON vindo da internet, é quase sempre isso que aparece.\n\nO desafio aninhado é o acesso: você precisa ir descendo nível por nível usando colchetes. Isso pode parecer confuso no começo, mas com prática vira automático. Outra dificuldade é a iteração: quando você tem listas dentro de dicts, geralmente precisa de loops aninhados (um for dentro de outro).\n\nVamos ver vários padrões reais e os erros típicos que aparecem.`,
    codes: [
      {
        lang: "python",
        code: `# Lista de dicionários — o padrão mais comum
alunos = [
    {"nome": "Ana",   "nota": 8.5},
    {"nome": "Bruno", "nota": 6.0},
    {"nome": "Carla", "nota": 9.0},
]

# Acessando o segundo aluno
print(alunos[1])           # → {'nome': 'Bruno', 'nota': 6.0}
print(alunos[1]["nome"])   # → Bruno

# Iterando
for aluno in alunos:
    print(aluno["nome"], "-", aluno["nota"])`,
      },
      {
        lang: "python",
        code: `# Dicionário com listas dentro
turma = {
    "professor": "Marina",
    "alunos": ["Ana", "Bruno", "Carla"],
    "notas":   [8.5, 6.0, 9.0],
}

print(turma["alunos"][0])   # → Ana
print(turma["notas"][2])    # → 9.0

# Adicionando um aluno
turma["alunos"].append("Diego")
turma["notas"].append(7.5)`,
      },
      {
        lang: "python",
        code: `# Dicionário aninhado
empresa = {
    "nome": "Acme",
    "endereco": {
        "rua": "Av. Boa Viagem",
        "numero": 1234,
        "cidade": "Recife",
    },
    "funcionarios": 50,
}

print(empresa["endereco"]["cidade"])  # → Recife

# Mudar um campo aninhado
empresa["endereco"]["numero"] = 1500`,
      },
      {
        lang: "python",
        code: `# Lista de dicts com listas dentro
pedidos = [
    {
        "cliente": "Ana",
        "itens": [
            {"produto": "caneta", "qtd": 3, "preco": 2.50},
            {"produto": "caderno", "qtd": 1, "preco": 18.00},
        ],
    },
    {
        "cliente": "Bruno",
        "itens": [
            {"produto": "lápis", "qtd": 5, "preco": 1.20},
        ],
    },
]

# Total de cada pedido
for pedido in pedidos:
    total = sum(item["qtd"] * item["preco"] for item in pedido["itens"])
    print(f"{pedido['cliente']}: R$ {total:.2f}")`,
      },
      {
        lang: "python",
        code: `# Matriz: lista de listas
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

print(matriz[0][0])  # → 1
print(matriz[1][2])  # → 6
print(matriz[2][1])  # → 8

# Percorrendo
for linha in matriz:
    for valor in linha:
        print(valor, end=" ")
    print()`,
      },
      {
        lang: "python",
        code: `# Acesso seguro com get encadeado
dados = {"usuario": {"nome": "Ana"}}

# Direto: pode quebrar
# print(dados["usuario"]["telefone"])  # KeyError

# Defensivo
telefone = dados.get("usuario", {}).get("telefone", "não informado")
print(telefone)  # → não informado`,
      },
      {
        lang: "python",
        code: `# Erro clássico: criar listas aninhadas com multiplicação
# RUIM
matriz = [[0] * 3] * 3
matriz[0][0] = 99
print(matriz)
# → [[99, 0, 0], [99, 0, 0], [99, 0, 0]]   (todas as linhas mudaram!)

# CORRETO
matriz = [[0] * 3 for _ in range(3)]
matriz[0][0] = 99
print(matriz)
# → [[99, 0, 0], [0, 0, 0], [0, 0, 0]]`,
      },
    ],
    points: [
      "Combine listas, dicts, tuplas e sets para representar dados reais.",
      "Acesse nível por nível: estrutura[chave1][chave2][indice].",
      "Lista de dicts é o padrão clássico (e o que JSON gera).",
      "Loops aninhados aparecem naturalmente para percorrer dados aninhados.",
      "Use .get() encadeado para evitar KeyError em dados incompletos.",
      "Cuidado ao criar listas aninhadas com multiplicação: as linhas viram a mesma referência.",
      "Para cópia segura de estruturas aninhadas, use copy.deepcopy().",
      "Quanto mais aninhado, mais difícil de manter — considere classes ou dataclasses em casos complexos.",
    ],
    alerts: [
      { type: "danger", content: "Nunca crie matrizes com [[0]*n]*m. Todas as linhas viram referências para a mesma lista, e mudar uma muda todas. Use list comprehension." },
      { type: "tip", content: "Quando ler dados de uma API, imprima primeiro com print() ou inspecione com type() em cada nível para entender a estrutura antes de acessar." },
      { type: "info", content: "Para estruturas muito complexas, classes ou dataclasses oferecem nomes claros, autocomplete e validação que dicts aninhados não dão." },
    ],
  },
];
