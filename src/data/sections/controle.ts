import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "if-else",
    section: "controle",
    title: "Estruturas if / elif / else",
    difficulty: "iniciante",
    subtitle: "Tomada de decisão no seu programa.",
    intro: `Imagine que você está num caixa de mercado. Se o cliente paga em dinheiro, você abre a gaveta. Se paga no cartão, você passa a maquininha. Se não paga nada, você não entrega o produto. Essa é a essência do \`if\`: o programa olha uma condição e decide o que fazer.

Até agora seu código rodava sempre na mesma sequência, linha após linha. Com \`if\`, \`elif\` e \`else\` ele ganha caminhos diferentes. Cada caminho é um bloco de código identado (com 4 espaços) que só executa quando a condição correspondente for verdadeira.

A confusão mais comum no começo é esquecer dos dois pontos no final da linha (\`if idade >= 18:\`) ou misturar tabs e espaços na identação. O Python é rígido com isso e vai reclamar. Outra dúvida típica: \`elif\` é a abreviação de "else if", ou seja, "senão se". Use \`elif\` quando tiver várias condições alternativas e \`else\` no final como o "caso nenhuma das anteriores".

Dominar \`if/elif/else\` é o primeiro passo para sair de scripts lineares e começar a escrever programas que de fato reagem ao mundo.`,
    codes: [
      {
        lang: "python",
        code: `# Exemplo mais simples possível
idade = 20

if idade >= 18:
    print("Você é maior de idade.")  # roda só se a condição for True`,
      },
      {
        lang: "python",
        code: `# Usando else para o caso contrário
saldo = 50.0
preco = 80.0

if saldo >= preco:
    print("Compra aprovada")
else:
    # qualquer coisa que NÃO satisfaça o if cai aqui
    print("Saldo insuficiente")`,
      },
      {
        lang: "python",
        code: `# Várias faixas com elif
nota = 7.5

if nota >= 9:
    conceito = "A"
elif nota >= 7:
    # só chega aqui se a primeira foi False
    conceito = "B"
elif nota >= 5:
    conceito = "C"
else:
    conceito = "Reprovado"

print(conceito)  # → B`,
      },
      {
        lang: "python",
        code: `# Combinando condições com and / or / not
idade = 17
tem_autorizacao = True

if idade >= 18 or tem_autorizacao:
    print("Pode entrar")
else:
    print("Não pode entrar")

# not inverte: not True == False
ativo = False
if not ativo:
    print("Conta inativa")`,
      },
      {
        lang: "python",
        code: `# if aninhado: um if dentro de outro
usuario_logado = True
papel = "admin"

if usuario_logado:
    if papel == "admin":
        print("Acesso total")
    else:
        print("Acesso limitado")
else:
    print("Faça login primeiro")`,
      },
      {
        lang: "python",
        code: `# Erro clássico: esquecer dos dois pontos
idade = 18

# if idade >= 18           # SyntaxError: expected ':'
#     print("ok")

# Outro erro: usar = (atribuição) em vez de == (comparação)
# if idade = 18:           # SyntaxError
if idade == 18:
    print("Tem 18 exatos")`,
      },
    ],
    points: [
      "Todo if termina com dois pontos e o bloco abaixo é identado com 4 espaços.",
      "elif só é avaliado se o if anterior deu False; else cobre tudo o que sobrou.",
      "Use and, or e not para combinar condições em vez de aninhar muitos ifs.",
      "Comparação é com ==, atribuição é com =. Trocar um pelo outro é o erro nº 1 de iniciante.",
      "Misturar tabs e espaços na identação gera IndentationError, mesmo que pareça igual.",
      "Em Python, valores como 0, '', [], None contam como False dentro de um if.",
      "Coloque o caso mais específico antes do mais genérico, senão o elif nunca executa.",
      "Não precisa de chaves, parênteses ou ponto e vírgula — a identação é a estrutura.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando você tiver vários if seguidos checando a mesma variável, troque por elif. Fica mais rápido e mais legível.",
      },
      {
        type: "warning",
        content: "if 0: nunca executa, e if []: também não. Tudo que é 'vazio' ou 'zero' em Python é considerado falso (chamamos isso de 'falsy').",
      },
      {
        type: "danger",
        content: "Nunca use = dentro de um if para comparar valores. O Python aceitaria como atribuição em outras linguagens, mas aqui dá SyntaxError — e é uma falha grave de lógica em qualquer caso.",
      },
    ],
  },
  {
    slug: "operador-ternario",
    section: "controle",
    title: "Operador ternário",
    difficulty: "iniciante",
    subtitle: "If e else condensados em uma única linha.",
    intro: `Às vezes você só quer escolher entre dois valores e atribuir o resultado a uma variável. Escrever um \`if\` de quatro linhas para isso polui o código. Pensa numa etiqueta de produto: ou está "em promoção" ou "preço normal". É só uma decisão binária.

Para esses casos, Python oferece o operador ternário, que tem uma ordem diferente da maioria das linguagens. Em vez de \`condição ? a : b\`, escrevemos \`a if condição else b\`. Lê-se quase como inglês: "use a, se a condição for verdadeira, senão use b".

A grande tentação do iniciante é usar o ternário para tudo, inclusive aninhado (\`x if a else y if b else z\`). Resista. Quando a lógica fica longa, volte ao \`if/elif/else\` tradicional — ele é mais fácil de ler de bate-pronto.

Use o ternário quando ele cabe confortavelmente em uma linha, deixa a intenção clara e evita repetir o nome da variável. É um açúcar sintático muito útil para definir valores padrões, formatar mensagens curtas e simplificar listas de retorno.`,
    codes: [
      {
        lang: "python",
        code: `# A forma mais simples
idade = 20
status = "adulto" if idade >= 18 else "menor"
print(status)  # → adulto`,
      },
      {
        lang: "python",
        code: `# Comparando com o if tradicional
preco = 100
desconto = 0.1

# Forma longa
if desconto > 0:
    final = preco * (1 - desconto)
else:
    final = preco

# Mesma coisa, em uma linha
final = preco * (1 - desconto) if desconto > 0 else preco
print(final)  # → 90.0`,
      },
      {
        lang: "python",
        code: `# Útil para evitar erro com valor None
nome = None
saudacao = f"Olá, {nome}" if nome else "Olá, visitante"
print(saudacao)  # → Olá, visitante

# Também muito comum em valores padrão
quantidade = 0
texto = "vários" if quantidade > 1 else "nenhum" if quantidade == 0 else "um"
print(texto)  # → nenhum`,
      },
      {
        lang: "python",
        code: `# Dentro de uma list comprehension (você verá depois)
numeros = [1, 2, 3, 4, 5]
paridade = ["par" if n % 2 == 0 else "ímpar" for n in numeros]
print(paridade)  # → ['ímpar', 'par', 'ímpar', 'par', 'ímpar']`,
      },
      {
        lang: "python",
        code: `# Quando NÃO usar: lógica complexa fica ilegível
# Ruim:
# msg = "A" if x > 10 else "B" if x > 5 else "C" if x > 0 else "D"

# Melhor: escreva como if/elif/else normal
x = 7
if x > 10:
    msg = "A"
elif x > 5:
    msg = "B"
elif x > 0:
    msg = "C"
else:
    msg = "D"
print(msg)  # → B`,
      },
    ],
    points: [
      "A ordem é: valor_se_verdadeiro if condição else valor_se_falso.",
      "Sempre obrigatório ter o else — não existe ternário sem ele.",
      "Use só quando cabe em uma linha legível; senão, prefira if/else tradicional.",
      "Ternários aninhados são tecnicamente válidos, mas péssimos para revisão de código.",
      "Funciona bem para definir valores padrão e dentro de comprehensions.",
      "Lembre que o resultado é um valor — você normalmente atribui a uma variável ou retorna.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você sentir vontade de aninhar dois ternários, é sinal de que o if/elif/else clássico vai deixar seu código mais fácil de manter.",
      },
      {
        type: "info",
        content: "Em outras linguagens (JavaScript, C, Java) o operador ternário é cond ? a : b. Em Python a ordem é invertida: a if cond else b.",
      },
    ],
  },
  {
    slug: "match-case",
    section: "controle",
    title: "Pattern matching com match/case",
    difficulty: "intermediario",
    subtitle: "O 'switch' moderno do Python (3.10+).",
    intro: `Por décadas, Python não teve um \`switch\` como C ou JavaScript. A solução era empilhar \`if/elif\`. Funcionava, mas ficava verboso quando você queria comparar uma variável contra muitas opções.

Em 2021, com o Python 3.10, chegou o \`match/case\`. Ele não é só um \`switch\` simples: é um sistema de "casamento de padrões" (pattern matching). Você descreve o formato dos dados que espera, e o Python desmonta o valor para você. Pode comparar contra constantes, contra estruturas de listas e dicionários, contra tipos de objetos, e ainda extrair partes durante o processo.

A confusão mais comum: \`case x:\` (com nome simples e sem ponto) cria uma variável chamada \`x\` com o valor da entrada — sempre dá match. Para comparar contra uma constante de outro módulo, use \`Cor.AZUL\` (com ponto) ou um literal direto. Outro detalhe: o \`_\` é o "case default", aquele que pega tudo o que sobrou.

Comece usando \`match/case\` para substituir cadeias de \`if/elif\` que comparam a mesma variável. Quando se acostumar, descobrirá que ele brilha mesmo ao desempacotar tuplas, listas e dicionários vindos de APIs.`,
    codes: [
      {
        lang: "python",
        code: `# Substituindo um if/elif simples
comando = "iniciar"

match comando:
    case "iniciar":
        print("Sistema iniciando...")
    case "parar":
        print("Sistema parando...")
    case "reiniciar":
        print("Reiniciando...")
    case _:                       # _ é o caso padrão (else)
        print("Comando desconhecido")`,
      },
      {
        lang: "python",
        code: `# Vários valores no mesmo case com |
letra = "a"

match letra.lower():
    case "a" | "e" | "i" | "o" | "u":
        print("vogal")
    case _:
        print("consoante")`,
      },
      {
        lang: "python",
        code: `# Casando estruturas: tuplas e listas
ponto = (0, 5)

match ponto:
    case (0, 0):
        print("origem")
    case (0, y):                  # extrai o segundo valor em y
        print(f"no eixo Y, y={y}")
    case (x, 0):
        print(f"no eixo X, x={x}")
    case (x, y):
        print(f"ponto qualquer ({x}, {y})")`,
      },
      {
        lang: "python",
        code: `# Casando dicionários (útil para respostas de API)
resposta = {"status": "ok", "dados": [1, 2, 3]}

match resposta:
    case {"status": "ok", "dados": dados}:
        print(f"Recebi {len(dados)} itens")
    case {"status": "erro", "mensagem": msg}:
        print(f"Falhou: {msg}")
    case _:
        print("Resposta em formato inesperado")`,
      },
      {
        lang: "python",
        code: `# Guardas: uma condição extra com 'if' no case
idade = 25

match idade:
    case n if n < 0:
        print("idade inválida")
    case n if n < 18:
        print("menor")
    case n if n < 65:
        print("adulto")
    case _:
        print("idoso")`,
      },
      {
        lang: "python",
        code: `# Armadilha clássica: nome simples vira variável (sempre dá match)
VERMELHO = "vermelho"
cor = "azul"

match cor:
    case VERMELHO:                # NÃO compara com a constante!
        print("é vermelho")       # ATENÇÃO: VERMELHO aqui é tratado
                                  # como variável nova e captura "azul"
    case _:
        print("outra cor")

# Forma correta: use ponto (atributo) ou string literal
class Cor:
    VERMELHO = "vermelho"

match cor:
    case Cor.VERMELHO:            # com ponto, compara de fato
        print("é vermelho")
    case "azul":                  # literal também funciona
        print("é azul")`,
      },
    ],
    points: [
      "Disponível só a partir do Python 3.10. Em versões anteriores, dá SyntaxError.",
      "case _ é o caso padrão, equivalente ao else.",
      "Use | para listar várias opções no mesmo case.",
      "match desmonta tuplas, listas e dicionários e ainda extrai variáveis no processo.",
      "Guardas (case x if condição) permitem filtros mais finos.",
      "Nome simples sem ponto vira variável e sempre captura — use literais ou Classe.CONSTANTE.",
      "match/case não substitui if/else; é uma ferramenta a mais para casos com muitas opções estruturadas.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Se sua versão de Python for menor que 3.10, match/case não existe. Confira com 'python --version' antes de usar em produção.",
      },
      {
        type: "danger",
        content: "case minha_constante: não compara com a constante, ele cria uma variável nova chamada minha_constante. É um bug silencioso muito comum — sempre use literais ou atributos com ponto.",
      },
      {
        type: "tip",
        content: "Pattern matching com dicionários é ideal para tratar respostas JSON de APIs: você descreve os formatos esperados e cada case lida com um cenário.",
      },
    ],
  },
  {
    slug: "loop-for",
    section: "controle",
    title: "Laço for",
    difficulty: "iniciante",
    subtitle: "Repetindo ações para cada item de uma sequência.",
    intro: `Imagine que você tem uma sacola de compras e precisa conferir o preço de cada produto. Você não confere todos de uma vez: pega um, olha o preço, anota, pega o próximo. Esse "para cada item, faça isso" é exatamente o que o \`for\` faz em Python.

Ao contrário de outras linguagens, o \`for\` do Python não é um contador (\`for i = 0; i < 10; i++\`). Ele é um \`for-each\`: percorre qualquer coisa que seja "iterável" — listas, strings, tuplas, dicionários, arquivos, até números gerados por \`range\`. O Python entrega um item por vez para a variável que você escolheu.

Confusão típica: muitos iniciantes vindos de outras linguagens tentam acessar índices manualmente. Em Python, isso quase nunca é necessário. Se você precisa do índice, use \`enumerate\` (próximos capítulos). Se precisa de um contador, use \`range\`.

Outro erro frequente é modificar a lista enquanto faz \`for\` nela. Isso confunde o iterador interno e gera bugs estranhos. A regra é: para alterar, percorra uma cópia ou construa uma nova lista. Vamos aos exemplos.`,
    codes: [
      {
        lang: "python",
        code: `# Iterando uma lista
frutas = ["maçã", "banana", "uva"]

for fruta in frutas:
    # 'fruta' recebe um valor por vez
    print(f"Eu gosto de {fruta}")`,
      },
      {
        lang: "python",
        code: `# Iterando com range para repetir N vezes
for i in range(5):
    # range(5) gera 0, 1, 2, 3, 4
    print(f"Volta número {i}")`,
      },
      {
        lang: "python",
        code: `# Strings também são iteráveis (caractere por caractere)
nome = "Ana"

for letra in nome:
    print(letra)
# saída:
# A
# n
# a`,
      },
      {
        lang: "python",
        code: `# Iterando dicionários
precos = {"pão": 0.50, "leite": 4.20, "café": 18.90}

# Por padrão, for em dicionário pega as chaves
for produto in precos:
    print(produto)

# Para chave e valor juntos, use .items()
for produto, preco in precos.items():
    print(f"{produto}: R$ {preco:.2f}")`,
      },
      {
        lang: "python",
        code: `# Acumulando um total
valores = [10.5, 22.0, 7.30, 5.0]
total = 0

for v in valores:
    total += v                    # equivalente a total = total + v

print(f"Total: R$ {total:.2f}")   # → Total: R$ 44.80`,
      },
      {
        lang: "python",
        code: `# Erro clássico: alterar a lista durante o for
numeros = [1, 2, 3, 4, 5]

# NÃO faça isso — pode pular itens
# for n in numeros:
#     if n % 2 == 0:
#         numeros.remove(n)

# Faça uma cópia ou construa uma nova lista
impares = []
for n in numeros:
    if n % 2 != 0:
        impares.append(n)

print(impares)  # → [1, 3, 5]`,
      },
    ],
    points: [
      "for em Python é um for-each: ele entrega o item, não o índice.",
      "Qualquer iterável serve: lista, tupla, string, dicionário, conjunto, range, arquivo.",
      "Use range(n) quando quiser apenas repetir n vezes.",
      "Dicionário iterado direto entrega as chaves; use .items() para chave e valor.",
      "Não modifique a lista enquanto faz for nela — construa uma nova ou itere uma cópia.",
      "A variável do for continua existindo depois que o loop termina (com o último valor).",
      "for else (com else no fim) executa só se o loop terminou sem break (veja o capítulo de break/continue).",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se seu primeiro instinto é escrever for i in range(len(lista)) para pegar índices, troque por enumerate(lista). É mais idiomático e legível.",
      },
      {
        type: "warning",
        content: "Modificar uma lista enquanto você itera sobre ela com for pode pular elementos silenciosamente. É um dos bugs mais difíceis de detectar para quem está começando.",
      },
      {
        type: "info",
        content: "A variável de loop continua acessível após o for terminar, com o valor da última iteração. Em outras linguagens isso seria um erro de escopo — em Python é normal.",
      },
    ],
  },
  {
    slug: "loop-while",
    section: "controle",
    title: "Laço while",
    difficulty: "iniciante",
    subtitle: "Repetindo enquanto uma condição for verdadeira.",
    intro: `O \`for\` é ideal quando você sabe sobre o que quer iterar (uma lista, um arquivo, um intervalo). Mas e quando você não sabe quantas vezes vai precisar repetir? Pensa num programa que pede senha até o usuário acertar. Pode acertar de primeira ou na décima tentativa. Para esses casos existe o \`while\`.

A leitura é literal: "enquanto a condição for verdadeira, faça". Antes de cada repetição, o Python checa a condição. Se for True, executa o bloco. Se for False, sai do loop. Simples assim.

A grande armadilha do \`while\` é o loop infinito: você esqueceu de atualizar a variável que está na condição, e o programa nunca termina. Se isso acontecer no terminal, pressione Ctrl+C para abortar. Toda vez que escrever um \`while\`, pergunte-se: "o que dentro do bloco vai eventualmente fazer essa condição virar False?".

Use \`while True\` com um \`break\` interno quando a saída depende de algo que só dá pra checar no meio do bloco (como ler entrada do usuário). É um padrão comum e legítimo, desde que o break esteja claro.`,
    codes: [
      {
        lang: "python",
        code: `# Exemplo simples: contar até 5
contador = 1

while contador <= 5:
    print(contador)
    contador += 1                 # passo crucial: atualizar a variável!

# Sem o "contador += 1" o loop nunca terminaria.`,
      },
      {
        lang: "python",
        code: `# Pedindo senha até acertar
senha_correta = "python123"
tentativa = ""

while tentativa != senha_correta:
    tentativa = input("Digite a senha: ")

print("Acesso liberado")`,
      },
      {
        lang: "python",
        code: `# while True com break: padrão para menus
while True:
    opcao = input("[1] continuar  [2] sair: ")
    if opcao == "2":
        break                     # sai do while
    print("Continuando...")`,
      },
      {
        lang: "python",
        code: `# Consumindo uma fila até esvaziar
fila = ["Ana", "Bruno", "Carla"]

while fila:                       # lista não vazia é True
    proximo = fila.pop(0)         # remove e devolve o primeiro
    print(f"Atendendo {proximo}")

print("Fila vazia.")`,
      },
      {
        lang: "python",
        code: `# while com else: executa se o loop terminou sem break
n = 10
divisor = 2

while divisor < n:
    if n % divisor == 0:
        print(f"{n} é divisível por {divisor}")
        break
    divisor += 1
else:
    # só roda se NÃO houve break
    print(f"{n} é primo")`,
      },
      {
        lang: "python",
        code: `# Erro clássico: loop infinito
# x = 0
# while x < 10:
#     print(x)        # esquecemos de incrementar x!
#     # x += 1        ← essa linha foi esquecida

# Resultado: trava o programa. Aborte com Ctrl+C.

# Outro caso sutil: condição que nunca muda
# texto = "ok"
# while texto:        # texto sempre será verdadeiro
#     print("loop infinito")`,
      },
    ],
    points: [
      "Use while quando o número de repetições depende de uma condição, não de uma sequência.",
      "Sempre garanta que algo dentro do loop vai eventualmente mudar a condição.",
      "while True + break é um padrão válido para loops de menu e leitura de entrada.",
      "Coleções vazias ([], '', {}) são consideradas False — você pode usar while colecao:",
      "Loop infinito por esquecimento é o erro nº 1 com while; aborte com Ctrl+C no terminal.",
      "while else só executa se o loop terminou naturalmente, sem break.",
      "Para repetir N vezes exatas, prefira for com range — é mais seguro que while contador < N.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Loop infinito trava seu programa e pode consumir 100% da CPU. Sempre revise se a variável da condição está sendo modificada dentro do bloco.",
      },
      {
        type: "tip",
        content: "Antes de escrever um while, pergunte: 'eu sei a quantidade de iterações?'. Se sim, use for com range — fica mais difícil de errar.",
      },
      {
        type: "info",
        content: "No terminal, Ctrl+C envia um KeyboardInterrupt que aborta loops infinitos. Em editores como VS Code ou Jupyter, há um botão de parar a execução.",
      },
    ],
  },
  {
    slug: "break-continue",
    section: "controle",
    title: "break, continue e else em loops",
    difficulty: "iniciante",
    subtitle: "Controlando o fluxo dentro de laços.",
    intro: `Loops são poderosos, mas nem sempre você quer percorrer tudo até o fim. Pensa numa busca: assim que você acha o item, não precisa continuar olhando. Ou pensa numa lista de pedidos: você quer pular os cancelados sem interromper a contagem dos válidos. Para isso existem \`break\` e \`continue\`.

\`break\` interrompe o loop imediatamente e salta para a primeira linha depois dele. \`continue\` pula o resto da iteração atual e vai para a próxima volta. São duas ferramentas pequenas, mas que mudam totalmente a forma como você escreve loops.

Existe ainda o \`else\` em loops, um recurso pouco conhecido. Tanto \`for\` quanto \`while\` aceitam um \`else\` no final, e ele só roda se o loop terminou de forma natural — ou seja, sem ter sido interrompido por \`break\`. É útil em buscas: o \`else\` é o "não encontrei nada".

Cuidado com o vício: usar \`break\` e \`continue\` demais bagunça a leitura. Quando há vários no mesmo loop, geralmente é sinal de que o código pediria uma função separada ou uma condição mais clara. Use com moderação.`,
    codes: [
      {
        lang: "python",
        code: `# break: para o loop assim que achar o que procura
numeros = [3, 7, 12, 19, 25]

for n in numeros:
    if n > 10:
        print(f"Achei o primeiro maior que 10: {n}")
        break                     # sai do for, não checa os próximos`,
      },
      {
        lang: "python",
        code: `# continue: pula esta volta e vai para a próxima
for n in range(1, 8):
    if n % 2 == 0:
        continue                  # pula os pares
    print(n)
# saída: 1 3 5 7`,
      },
      {
        lang: "python",
        code: `# for / else: o else só roda se NÃO houve break
nomes = ["Ana", "Bruno", "Carla"]
procurado = "Diego"

for nome in nomes:
    if nome == procurado:
        print("encontrei")
        break
else:
    # só executa porque o break nunca aconteceu
    print(f"{procurado} não está na lista")`,
      },
      {
        lang: "python",
        code: `# Validando entrada com while True + break
while True:
    idade_str = input("Digite sua idade: ")
    if idade_str.isdigit():
        idade = int(idade_str)
        break                     # sai assim que tiver número válido
    print("Valor inválido, tente de novo.")

print(f"Idade registrada: {idade}")`,
      },
      {
        lang: "python",
        code: `# break só sai do loop MAIS INTERNO
for i in range(3):
    for j in range(3):
        if j == 2:
            break                 # sai só do for de j
        print(i, j)
# saída:
# 0 0
# 0 1
# 1 0
# 1 1
# 2 0
# 2 1`,
      },
      {
        lang: "python",
        code: `# Padrão comum: contar e ignorar
pedidos = [
    {"id": 1, "status": "pago"},
    {"id": 2, "status": "cancelado"},
    {"id": 3, "status": "pago"},
]

pagos = 0
for p in pedidos:
    if p["status"] != "pago":
        continue                  # ignora os cancelados
    pagos += 1

print(f"Pedidos pagos: {pagos}")  # → 2`,
      },
    ],
    points: [
      "break encerra o loop atual imediatamente.",
      "continue pula o resto da iteração e volta para o próximo item.",
      "O else de um loop roda apenas se o loop terminar SEM break.",
      "break só afeta o loop mais interno; para sair de loops aninhados, use uma flag ou função.",
      "Use continue para evitar identar tudo dentro de um if; o código fica mais limpo.",
      "Excesso de break/continue espalhados é sinal de que o loop deveria virar função.",
      "for/else é uma das partes menos conhecidas do Python — combine com break para buscas.",
    ],
    alerts: [
      {
        type: "info",
        content: "O else de loop confunde até desenvolvedores experientes. Pense nele como 'else do break': roda se o break NÃO aconteceu.",
      },
      {
        type: "warning",
        content: "break sai apenas do loop mais interno. Em loops aninhados, você precisará usar uma variável de controle ou extrair para uma função com return.",
      },
      {
        type: "tip",
        content: "Padrão 'guard clause' com continue: se a condição não te interessa, faça continue logo no começo da iteração. Isso evita aninhar muitos ifs.",
      },
    ],
  },
  {
    slug: "range-detalhes",
    section: "controle",
    title: "A função range em detalhe",
    difficulty: "iniciante",
    subtitle: "Gerando sequências numéricas sob demanda.",
    intro: `Você já viu \`range\` aparecendo em vários exemplos. Chegou a hora de entender direito. \`range\` é uma função que gera uma sequência de números inteiros. Ela é usada quase sempre dentro de \`for\`, mas tem detalhes que fazem diferença.

A função aceita até três argumentos: \`range(início, fim, passo)\`. O início é incluído, o fim NÃO é. Esse é o ponto que mais confunde: \`range(5)\` gera 0, 1, 2, 3, 4 — sem o 5. Pensa como "vai até, mas sem chegar". O passo padrão é 1, mas pode ser maior, ou negativo para contar para trás.

Outro detalhe importante: \`range\` não cria uma lista. Ele é "preguiçoso" (lazy) — gera um número por vez quando solicitado. Isso significa que \`range(1_000_000_000)\` ocupa pouquíssima memória, mesmo representando um bilhão de números. Se você quiser uma lista de verdade, basta envolver com \`list(range(...))\`.

Iniciantes vindos de outras linguagens tentam usar \`range\` para iterar sobre listas. Não precisa. \`for item in lista\` é mais idiomático em Python. Use \`range\` quando você de fato precisa dos números, não dos elementos.`,
    codes: [
      {
        lang: "python",
        code: `# Forma mais simples: 0 até n-1
for i in range(5):
    print(i)
# saída: 0 1 2 3 4   (o 5 NÃO entra!)`,
      },
      {
        lang: "python",
        code: `# Início e fim
for i in range(2, 7):
    print(i, end=" ")
# saída: 2 3 4 5 6   (começa em 2, vai até 6)`,
      },
      {
        lang: "python",
        code: `# Início, fim e passo
for i in range(0, 20, 3):
    print(i, end=" ")
# saída: 0 3 6 9 12 15 18`,
      },
      {
        lang: "python",
        code: `# Passo negativo: contagem regressiva
for i in range(10, 0, -1):
    print(i, end=" ")
# saída: 10 9 8 7 6 5 4 3 2 1   (o 0 não entra)`,
      },
      {
        lang: "python",
        code: `# range é "preguiçoso": não é uma lista
r = range(1_000_000)
print(r)            # → range(0, 1000000)
print(type(r))      # → <class 'range'>

# Para virar lista de verdade:
pequena = list(range(5))
print(pequena)      # → [0, 1, 2, 3, 4]`,
      },
      {
        lang: "python",
        code: `# Erros e armadilhas
# range com float NÃO funciona
# for x in range(0, 1, 0.1):     # TypeError
#     print(x)

# Use ints; se precisar de fracionados, divida no final
for i in range(0, 10):
    print(i / 10, end=" ")        # 0.0 0.1 0.2 ... 0.9

# Passo zero também é proibido
# range(0, 10, 0)                 # ValueError`,
      },
      {
        lang: "python",
        code: `# Usando range para indexar (quando realmente precisa)
nomes = ["Ana", "Bruno", "Carla"]

for i in range(len(nomes)):
    print(f"{i}: {nomes[i]}")
# Funciona, mas existe forma melhor: enumerate (próximo capítulo)`,
      },
    ],
    points: [
      "range(fim) gera de 0 até fim-1; o valor fim nunca é incluído.",
      "range(início, fim) e range(início, fim, passo) dão mais controle.",
      "Passo negativo permite contar para trás.",
      "range não é uma lista; é um objeto preguiçoso que não ocupa memória.",
      "Use list(range(...)) quando precisar mesmo de uma lista materializada.",
      "range só aceita inteiros; floats geram TypeError.",
      "Passo igual a 0 levanta ValueError porque criaria loop infinito.",
      "Para iterar lista, prefira for x in lista; use range só quando precisa do número.",
    ],
    alerts: [
      {
        type: "warning",
        content: "O segundo argumento de range é exclusivo. range(1, 10) vai de 1 até 9, não até 10. Esse é um dos enganos mais frequentes.",
      },
      {
        type: "tip",
        content: "Para descer de N até 1 inclusive, use range(N, 0, -1). Para descer até 0 inclusive, use range(N, -1, -1). Pense sempre no 'um a menos' da extremidade.",
      },
      {
        type: "info",
        content: "Como range é preguiçoso, range(10**12) é instantâneo e não consome memória. Iterar sobre ele todo é que demoraria.",
      },
    ],
  },
  {
    slug: "enumerate",
    section: "controle",
    title: "enumerate: índice e valor juntos",
    difficulty: "iniciante",
    subtitle: "Iterando com contador automático.",
    intro: `Acontece com frequência: você está iterando uma lista e, no meio do caminho, percebe que precisa também do índice (a posição do item). Em outras linguagens, isso é normal — você já tem o índice porque está usando \`for (i = 0; i < n; i++)\`. Em Python, você não tem o índice de graça com \`for x in lista\`.

A solução amadora é escrever \`for i in range(len(lista)): item = lista[i]\`. Funciona, mas é deselegante e propenso a erros. A solução elegante é \`enumerate\`, uma função que envolve qualquer iterável e devolve pares \`(índice, valor)\`. Você desempacota direto na declaração do for.

Por padrão, \`enumerate\` começa contando do zero — combinando com a indexação natural do Python. Se você precisa começar de outro número (por exemplo, para mostrar "Item 1, Item 2..." ao usuário), passe \`start=1\` como segundo argumento.

\`enumerate\` é um daqueles recursos que parece pequeno, mas que distingue código Python "iniciante" de código "experiente". Adote desde já.`,
    codes: [
      {
        lang: "python",
        code: `# Sem enumerate: o jeito chato
nomes = ["Ana", "Bruno", "Carla"]

for i in range(len(nomes)):
    print(f"{i}: {nomes[i]}")

# Com enumerate: o jeito Python
for i, nome in enumerate(nomes):
    print(f"{i}: {nome}")

# saída (igual em ambos):
# 0: Ana
# 1: Bruno
# 2: Carla`,
      },
      {
        lang: "python",
        code: `# Começando a contagem em 1 (mais amigável ao usuário)
itens = ["pão", "leite", "café"]

for i, item in enumerate(itens, start=1):
    print(f"Item {i}: {item}")
# saída:
# Item 1: pão
# Item 2: leite
# Item 3: café`,
      },
      {
        lang: "python",
        code: `# Usando enumerate para saber QUANDO modificar
notas = [4, 7, 9, 3, 8]

for i, nota in enumerate(notas):
    if nota < 5:
        notas[i] = 5              # eleva pra nota mínima
        # aqui modificar PELO ÍNDICE é seguro

print(notas)  # → [5, 7, 9, 5, 8]`,
      },
      {
        lang: "python",
        code: `# enumerate em strings também funciona
texto = "Python"

for i, letra in enumerate(texto):
    print(i, letra)
# 0 P
# 1 y
# 2 t
# 3 h
# 4 o
# 5 n`,
      },
      {
        lang: "python",
        code: `# Achando a posição de um item
frutas = ["maçã", "banana", "uva", "kiwi"]

posicao = -1
for i, f in enumerate(frutas):
    if f == "uva":
        posicao = i
        break

print(f"Uva está na posição {posicao}")  # → 2`,
      },
      {
        lang: "python",
        code: `# enumerate é preguiçoso, igual range
e = enumerate(["a", "b"])
print(e)               # → <enumerate object at 0x...>
print(list(e))         # → [(0, 'a'), (1, 'b')]`,
      },
    ],
    points: [
      "enumerate(iteravel) devolve pares (índice, valor) já desempacotáveis no for.",
      "O índice começa em 0 por padrão; use start=1 para começar de outro número.",
      "Substitui o anti-padrão for i in range(len(lista)): lista[i].",
      "Funciona em qualquer iterável: lista, tupla, string, gerador, arquivo.",
      "É preguiçoso (lazy) — não cria a lista de pares na memória.",
      "É a forma idiomática de modificar elementos pelo índice durante o loop.",
      "Combine com unpacking: for i, item in enumerate(...) lê quase como inglês.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Toda vez que você escrever range(len(...)), pare e troque por enumerate. É mais legível e impossível de errar o índice.",
      },
      {
        type: "info",
        content: "O parâmetro start só afeta o número que aparece, não o iterável em si. enumerate(['a','b'], start=10) dá (10,'a'), (11,'b').",
      },
    ],
  },
  {
    slug: "zip-loop",
    section: "controle",
    title: "zip: iterando duas listas juntas",
    difficulty: "iniciante",
    subtitle: "Iteração paralela em mais de uma sequência.",
    intro: `Imagine duas listas relacionadas: uma com nomes de alunos e outra com as notas correspondentes, na mesma ordem. Você quer percorrer as duas em paralelo — pegar o primeiro nome com a primeira nota, o segundo com a segunda, e assim por diante. É exatamente o que o \`zip\` faz.

O nome vem do zíper: ele "fecha" duas (ou mais) sequências, alinhando item a item. O resultado é uma série de tuplas que você normalmente desempacota direto no \`for\`. Funciona com qualquer iterável e quantos você quiser passar — \`zip(a, b, c, d)\` é válido.

A pegadinha clássica: \`zip\` para na menor sequência. Se uma lista tem 3 itens e outra tem 5, você só percorre 3 pares. Os dois últimos da segunda são ignorados, sem aviso. Se você precisa que todas tenham o mesmo tamanho, valide antes — ou use \`zip_longest\` da biblioteca \`itertools\`, que preenche os faltantes.

Como \`enumerate\` e \`range\`, \`zip\` é preguiçoso. Se você quiser ver o resultado, envolva com \`list(zip(...))\`. Para "desfazer" um zip, use o truque \`zip(*pares)\`.`,
    codes: [
      {
        lang: "python",
        code: `# Iterando duas listas em paralelo
alunos = ["Ana", "Bruno", "Carla"]
notas = [9.0, 7.5, 8.2]

for aluno, nota in zip(alunos, notas):
    print(f"{aluno}: {nota}")
# Ana: 9.0
# Bruno: 7.5
# Carla: 8.2`,
      },
      {
        lang: "python",
        code: `# zip aceita 3 ou mais sequências
nomes = ["Ana", "Bruno"]
idades = [25, 32]
cidades = ["São Paulo", "Recife"]

for n, i, c in zip(nomes, idades, cidades):
    print(f"{n}, {i} anos, mora em {c}")`,
      },
      {
        lang: "python",
        code: `# Atenção: zip para na menor lista (sem aviso)
a = [1, 2, 3, 4, 5]
b = ["x", "y"]

for x, y in zip(a, b):
    print(x, y)
# 1 x
# 2 y
# Os elementos 3, 4, 5 de 'a' são silenciosamente ignorados`,
      },
      {
        lang: "python",
        code: `# Quando precisar avisar que tamanhos diferem (Python 3.10+)
a = [1, 2, 3]
b = ["x", "y"]

# strict=True levanta erro se as sequências tiverem tamanhos diferentes
try:
    for x, y in zip(a, b, strict=True):
        print(x, y)
except ValueError as e:
    print("Tamanhos diferentes:", e)`,
      },
      {
        lang: "python",
        code: `# Construindo um dicionário a partir de duas listas
chaves = ["nome", "idade", "cidade"]
valores = ["Ana", 30, "Recife"]

pessoa = dict(zip(chaves, valores))
print(pessoa)
# → {'nome': 'Ana', 'idade': 30, 'cidade': 'Recife'}`,
      },
      {
        lang: "python",
        code: `# Truque do "unzip" com zip(*...)
pares = [("Ana", 25), ("Bruno", 32), ("Carla", 28)]

nomes, idades = zip(*pares)
print(nomes)    # → ('Ana', 'Bruno', 'Carla')
print(idades)   # → (25, 32, 28)`,
      },
      {
        lang: "python",
        code: `# Quando quiser preencher os faltantes, use zip_longest
from itertools import zip_longest

a = [1, 2, 3, 4]
b = ["x", "y"]

for x, y in zip_longest(a, b, fillvalue="-"):
    print(x, y)
# 1 x
# 2 y
# 3 -
# 4 -`,
      },
    ],
    points: [
      "zip percorre múltiplas sequências em paralelo, item a item.",
      "Para na menor sequência por padrão — silenciosamente.",
      "Use strict=True (Python 3.10+) para forçar erro quando os tamanhos diferem.",
      "dict(zip(chaves, valores)) é o jeito clássico de construir dicionários a partir de listas pareadas.",
      "zip(*pares) faz o caminho contrário: separa pares em tuplas independentes.",
      "Para preencher os faltantes em vez de truncar, use itertools.zip_longest.",
      "Como range e enumerate, zip é preguiçoso; envolva com list() para visualizar.",
    ],
    alerts: [
      {
        type: "warning",
        content: "zip para na menor sequência sem reclamar. Se você espera que todas tenham o mesmo tamanho, use strict=True ou valide o tamanho antes.",
      },
      {
        type: "tip",
        content: "dict(zip(chaves, valores)) é o atalho mais elegante para montar um dicionário quando você tem as chaves e os valores em listas separadas.",
      },
      {
        type: "info",
        content: "O truque zip(*lista_de_pares) é como uma transposição: linhas viram colunas. Útil para inverter dados tabulares.",
      },
    ],
  },
  {
    slug: "compreensoes-list",
    section: "controle",
    title: "List comprehensions",
    difficulty: "intermediario",
    subtitle: "Criando listas de forma elegante e expressiva.",
    intro: `Existe um padrão que aparece o tempo todo em código Python: criar uma lista vazia, percorrer outra coisa com \`for\`, talvez filtrar com um \`if\`, e ir adicionando itens com \`append\`. É tão comum que a linguagem oferece uma sintaxe condensada para fazer isso em uma única expressão: a list comprehension.

A forma básica é \`[expressão for item in iterável]\`. Isso lê quase como matemática: "construa uma lista com expressão, para cada item do iterável". Pode adicionar um filtro com \`if\` no final, transformações condicionais com ternário, e até combinar vários \`for\`. O resultado é uma lista de verdade, criada de uma vez.

Vantagens: o código fica mais curto, geralmente mais rápido (Python otimiza esse caso) e a intenção fica explícita — você está dizendo "quero uma nova lista derivada daquela", não escondendo isso atrás de um loop genérico.

A armadilha é o exagero. Comprehensions com 3 \`for\` aninhados, condições complexas e funções dentro viram puzzles ilegíveis. Se a sua não cabe confortavelmente em uma ou duas linhas, volte ao loop tradicional. Existem ainda variantes para conjuntos (\`{x for ...}\`), dicionários (\`{k: v for ...}\`) e geradores (\`(x for ...)\`), com a mesma sintaxe.`,
    codes: [
      {
        lang: "python",
        code: `# Antes: jeito longo
quadrados = []
for n in range(1, 6):
    quadrados.append(n ** 2)
print(quadrados)  # → [1, 4, 9, 16, 25]

# Depois: list comprehension
quadrados = [n ** 2 for n in range(1, 6)]
print(quadrados)  # → [1, 4, 9, 16, 25]`,
      },
      {
        lang: "python",
        code: `# Com filtro: só os pares
pares = [n for n in range(1, 11) if n % 2 == 0]
print(pares)  # → [2, 4, 6, 8, 10]

# Filtrando string: só letras maiúsculas
texto = "Python é Legal"
maiusculas = [c for c in texto if c.isupper()]
print(maiusculas)  # → ['P', 'L']`,
      },
      {
        lang: "python",
        code: `# Transformação condicional (ternário dentro)
numeros = [1, -2, 3, -4, 5]
absolutos = [n if n >= 0 else -n for n in numeros]
print(absolutos)  # → [1, 2, 3, 4, 5]`,
      },
      {
        lang: "python",
        code: `# Comprehension sobre lista de objetos (dicionários)
produtos = [
    {"nome": "Café", "preco": 18.90},
    {"nome": "Pão",  "preco": 0.50},
    {"nome": "Leite", "preco": 4.20},
]

# Só os nomes
nomes = [p["nome"] for p in produtos]
print(nomes)  # → ['Café', 'Pão', 'Leite']

# Só os caros
caros = [p for p in produtos if p["preco"] > 5]
print(caros)`,
      },
      {
        lang: "python",
        code: `# Dois for: combinação de duas listas
cores = ["azul", "verde"]
tamanhos = ["P", "M", "G"]

combinacoes = [(c, t) for c in cores for t in tamanhos]
print(combinacoes)
# → [('azul','P'), ('azul','M'), ('azul','G'),
#    ('verde','P'), ('verde','M'), ('verde','G')]`,
      },
      {
        lang: "python",
        code: `# Variantes: set, dict e generator comprehensions
numeros = [1, 2, 2, 3, 3, 3, 4]

# set comprehension (chaves únicas)
unicos = {n for n in numeros}
print(unicos)         # → {1, 2, 3, 4}

# dict comprehension
quadrados = {n: n ** 2 for n in range(1, 5)}
print(quadrados)      # → {1: 1, 2: 4, 3: 9, 4: 16}

# generator expression (preguiçoso, sem colchetes)
soma = sum(n ** 2 for n in range(1, 5))
print(soma)           # → 30`,
      },
      {
        lang: "python",
        code: `# Quando NÃO usar: comprehensions ilegíveis
# Ruim — ninguém entende de primeira:
# resultado = [[x*y for y in range(5) if y != x] for x in range(5) if x % 2 == 0]

# Melhor: volte ao loop tradicional, mais claro
resultado = []
for x in range(5):
    if x % 2 != 0:
        continue
    linha = []
    for y in range(5):
        if y != x:
            linha.append(x * y)
    resultado.append(linha)
print(resultado)`,
      },
    ],
    points: [
      "Sintaxe básica: [expressão for item in iterável].",
      "Filtro opcional ao final com if: [x for x in lista if condição].",
      "Transformação condicional usa ternário ANTES do for: [a if cond else b for x in ...].",
      "Cuidado: o if no final filtra; o ternário no início transforma. São coisas diferentes.",
      "Existem variantes para set ({...}), dict ({k: v...}) e generator ((...)).",
      "Generator expression é preguiçoso — ideal para somatórios e quando a lista seria gigante.",
      "Comprehensions costumam ser mais rápidas que loops equivalentes, mas legibilidade vem antes de performance.",
      "Se passar de duas linhas ou três níveis de aninhamento, volte ao for tradicional.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Toda vez que você escrever lista = [] seguido de for + append, considere transformar em list comprehension. É o caso de uso ideal.",
      },
      {
        type: "warning",
        content: "Não confunda: [x for x in lista if cond] filtra, [a if cond else b for x in lista] transforma cada item. A posição do if muda completamente o significado.",
      },
      {
        type: "info",
        content: "Generator expressions usam parênteses em vez de colchetes e não criam lista — produzem itens sob demanda. Perfeito para sum(), max(), any(), all().",
      },
      {
        type: "success",
        content: "Comprehensions tornam a intenção explícita ('quero uma nova lista derivada') e por isso são consideradas idiomáticas em Python. Use sem medo, mas sem exagero.",
      },
    ],
  },
];
