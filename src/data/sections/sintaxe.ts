import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "sintaxe-basica",
    section: "sintaxe",
    title: "Sintaxe básica do Python",
    difficulty: "iniciante",
    subtitle: "Indentação, comentários e blocos de código.",
    intro: `Toda linguagem de programação tem regras de escrita, igual ao português tem vírgula e ponto. Em Python, essas regras são propositalmente simples e parecidas com pseudo-código. A grande característica é que o próprio espaçamento (a indentação) define o que pertence a cada bloco, em vez de chaves \`{}\` como em outras linguagens.

Isso assusta no começo, mas tem um efeito ótimo: dois programadores diferentes acabam escrevendo Python parecido, o que facilita ler código alheio. Se você trocar quatro espaços por dois ou misturar tab com espaço, o Python reclama na hora.

Neste capítulo você vai entender como escrever uma linha de Python, como agrupar comandos em blocos, como deixar comentários para o seu eu do futuro e por que o interpretador é tão chato com espaçamento. Esse é o alicerce: sem ele, qualquer coisa que vier depois (variáveis, funções, classes) parece confusa.`,
    codes: [
      {
        lang: "python",
        code: `# Esta é uma linha de comentário: o Python ignora tudo depois do #
# Comentários servem para você (e outras pessoas) entenderem o código

print("Olá, mundo!")  # print() mostra algo no terminal
# saída: Olá, mundo!`,
      },
      {
        lang: "python",
        code: `# Em Python, o final da linha já encerra o comando.
# Não precisa de ponto e vírgula no final como em outras linguagens.
nome = "Ana"
idade = 30
print(nome, idade)  # → Ana 30`,
      },
      {
        lang: "python",
        code: `# Indentação: o que está "dentro" de algo precisa estar deslocado.
# A convenção é usar 4 espaços. NUNCA misture tab com espaço.
idade = 18

if idade >= 18:
    # Estas duas linhas pertencem ao if porque estão indentadas
    print("Você é maior de idade")
    print("Pode tirar a CNH")

print("Esta linha roda sempre, está fora do if")`,
      },
      {
        lang: "python",
        code: `# Se você esquecer a indentação, o Python reclama:
if True:
print("Erro!")
# IndentationError: expected an indented block after 'if' statement`,
      },
      {
        lang: "python",
        code: `# Comentários longos podem usar várias linhas com #
# como aqui, uma abaixo da outra.

# Strings entre aspas triplas costumam ser usadas como
# "docstrings" para documentar funções, mas não são
# comentários de verdade — o Python cria a string na memória.
"""
Este texto vira uma string na memória,
mesmo que ninguém use ela.
Use # para comentários reais.
"""`,
      },
      {
        lang: "python",
        code: `# Linhas muito longas podem ser quebradas com \\ no final
total = 10 + 20 + 30 + \\
        40 + 50

# Ou, melhor ainda, dentro de parênteses (mais limpo):
total = (10 + 20 + 30 +
         40 + 50)
print(total)  # → 150`,
      },
    ],
    points: [
      "O Python usa indentação (espaços no início da linha) para definir blocos, não chaves.",
      "A convenção da comunidade é 4 espaços por nível de indentação.",
      "Nunca misture tabulação e espaços no mesmo arquivo — isso quebra o código.",
      "Comentários começam com # e vão até o fim da linha.",
      "Não existe ponto e vírgula no fim da linha; cada linha já é um comando.",
      "Aspas triplas viram strings, não comentários — use # para comentar de verdade.",
      "Para quebrar uma linha longa, prefira parênteses a contrabarra \\.",
      "Erros de indentação aparecem como IndentationError ou TabError; leia a mensagem com calma.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Configure seu editor para mostrar espaços e tabs e converter tab automaticamente em 4 espaços. Isso evita um dos erros mais frustrantes do iniciante.",
      },
      {
        type: "tip",
        content: "Se sua função não tem nada para fazer ainda, escreva 'pass' como corpo. O Python exige ao menos uma instrução dentro de cada bloco indentado.",
      },
      {
        type: "info",
        content: "O guia oficial de estilo do Python é a PEP 8. Vale uma lida quando você se sentir mais confortável: ela padroniza espaçamento, nomes e organização.",
      },
    ],
  },
  {
    slug: "variaveis",
    section: "sintaxe",
    title: "Variáveis e atribuição",
    difficulty: "iniciante",
    subtitle: "Como guardar valores na memória e dar nome a eles.",
    intro: `Uma variável é só um apelido para um valor. Quando você escreve \`preco = 19.90\`, está dizendo ao Python: "guarde esse número e me deixe chamar de preço daqui pra frente". Sem variáveis, todo programa precisaria repetir os mesmos números e textos várias vezes.

Em Python, você não precisa avisar de antemão que tipo de valor a variável vai guardar. Basta atribuir com o sinal de igual. A variável passa a apontar para o valor, e pode trocar de valor (e até de tipo) a qualquer momento.

Isso é confortável, mas exige cuidado: como o Python não te alerta quando você troca o tipo, é fácil acabar somando texto com número sem perceber. Neste capítulo você vai aprender a escolher bons nomes, o que pode e o que não pode ser nome de variável, e como o Python "enxerga" essa atribuição por dentro.`,
    codes: [
      {
        lang: "python",
        code: `# Atribuição: nome = valor
nome = "Bruno"
idade = 25
saldo = 1500.75
ativo = True

print(nome, idade, saldo, ativo)
# → Bruno 25 1500.75 True`,
      },
      {
        lang: "python",
        code: `# A mesma variável pode receber novos valores depois.
# Inclusive de tipos diferentes (mas evite fazer isso).
contador = 0
contador = contador + 1
contador = "agora virei texto"  # legal, mas confuso
print(contador)`,
      },
      {
        lang: "python",
        code: `# Você pode atribuir várias variáveis ao mesmo tempo.
x, y, z = 1, 2, 3
print(x, y, z)  # → 1 2 3

# E trocar o valor entre elas em uma linha só:
a, b = 10, 20
a, b = b, a
print(a, b)  # → 20 10`,
      },
      {
        lang: "python",
        code: `# Regras de nomes:
# - Começam com letra ou _
# - Podem ter letras, números e _
# - NÃO podem começar com número
# - NÃO podem ser palavras reservadas (if, for, class, etc.)

idade_do_cliente = 30   # ok, snake_case (padrão Python)
_total = 100            # ok
total2 = 200            # ok

# 2total = 1   # SyntaxError: nome não pode começar com número
# class = 1    # SyntaxError: 'class' é palavra reservada`,
      },
      {
        lang: "python",
        code: `# Dica: nomes devem dizer o que a variável guarda.
# Ruim:
x = 19.90
y = 3
z = x * y

# Bom:
preco_unitario = 19.90
quantidade = 3
total = preco_unitario * quantidade
print(total)  # → 59.7`,
      },
      {
        lang: "python",
        code: `# Constantes em Python são uma convenção, não uma regra.
# Escrevemos em MAIÚSCULAS para sinalizar "não mude isso".
TAXA_JUROS = 0.02
PI = 3.14159

# O Python não impede você de mudar, mas outros leitores entendem
# que esse valor não deveria ser alterado.`,
      },
    ],
    points: [
      "Atribuir é simples: nome = valor; o tipo é deduzido pelo Python.",
      "O nome aponta para o valor; o mesmo nome pode apontar para outro valor depois.",
      "Use snake_case (palavras separadas por _) para nomes de variáveis.",
      "Escolha nomes descritivos: 'preco' é melhor que 'p'.",
      "Variáveis em MAIÚSCULAS sinalizam constantes (convenção, não obrigação).",
      "Evite trocar o tipo de uma variável no meio do programa, isso confunde quem lê.",
      "Palavras reservadas (if, for, def, class, etc.) não podem virar nomes de variável.",
      "Nomes não podem começar com número, mas podem começar com _ ou letra.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você não consegue achar um bom nome para uma variável, talvez ela esteja fazendo coisa demais. Dividir em duas variáveis menores costuma resolver.",
      },
      {
        type: "warning",
        content: "Atenção a maiúsculas e minúsculas: 'idade' e 'Idade' são variáveis diferentes para o Python. Confundir isso causa NameError.",
      },
      {
        type: "info",
        content: "Internamente, atribuir não copia o valor: a variável vira uma referência. Para tipos imutáveis (números, strings) isso não muda nada na prática.",
      },
      {
        type: "success",
        content: "Sempre que possível, dê nome aos números mágicos do seu código. 'preco * 0.10' fica mais claro como 'preco * DESCONTO_PADRAO'.",
      },
    ],
  },
  {
    slug: "tipos-numericos",
    section: "sintaxe",
    title: "Tipos numéricos: int, float, complex",
    difficulty: "iniciante",
    subtitle: "Inteiros, decimais, complexos e contas básicas.",
    intro: `Quase todo programa precisa fazer conta. O Python oferece três tipos de número embutidos: \`int\` para inteiros (1, -7, 1000), \`float\` para números com casas decimais (1.5, -0.001) e \`complex\` para números complexos da matemática (raramente usado fora de cálculo científico).

A boa notícia é que você não precisa declarar o tipo: o Python escolhe sozinho. \`a = 3\` é int, \`a = 3.0\` é float. As operações são parecidas com a calculadora do celular, mas tem um detalhe importante: divisão com / sempre devolve float, mesmo se o resultado for redondo.

Você também vai esbarrar logo cedo no famoso "0.1 + 0.2 não dá 0.3 exato". Não é bug do Python: é como números decimais são representados em binário em todo computador. Aqui você aprende a fazer contas, escolher o operador certo e evitar surpresas com float.`,
    codes: [
      {
        lang: "python",
        code: `# Inteiros e floats
idade = 30          # int
altura = 1.75       # float
preco = 9.90        # float

print(type(idade))   # → <class 'int'>
print(type(altura))  # → <class 'float'>`,
      },
      {
        lang: "python",
        code: `# Operações básicas
print(2 + 3)    # 5  soma
print(10 - 4)   # 6  subtração
print(3 * 4)    # 12 multiplicação
print(10 / 3)   # 3.3333333333333335  divisão (sempre float!)
print(10 // 3)  # 3  divisão inteira (descarta a parte decimal)
print(10 % 3)   # 1  resto da divisão
print(2 ** 10)  # 1024  potência`,
      },
      {
        lang: "python",
        code: `# O famoso problema do float:
print(0.1 + 0.2)  # → 0.30000000000000004

# Para dinheiro, evite float direto. Use a biblioteca decimal:
from decimal import Decimal
total = Decimal("0.1") + Decimal("0.2")
print(total)  # → 0.3`,
      },
      {
        lang: "python",
        code: `# Inteiros em Python NÃO têm limite de tamanho.
# Pode multiplicar à vontade que ele segura.
gigante = 2 ** 100
print(gigante)  # → 1267650600228229401496703205376`,
      },
      {
        lang: "python",
        code: `# Atribuições compostas: forma curta de atualizar valor
saldo = 100
saldo += 50   # equivale a saldo = saldo + 50
saldo -= 20   # saldo = saldo - 20
saldo *= 2    # saldo = saldo * 2
saldo /= 4    # saldo = saldo / 4
print(saldo)  # → 65.0`,
      },
      {
        lang: "python",
        code: `# Números complexos (raro, mas existem)
z = 2 + 3j     # j é a unidade imaginária
print(z.real)  # → 2.0
print(z.imag)  # → 3.0
print(type(z)) # → <class 'complex'>`,
      },
      {
        lang: "python",
        code: `# Funções úteis com números
print(abs(-7))       # 7    valor absoluto
print(round(3.567, 2))  # 3.57  arredonda para 2 casas
print(min(4, 2, 9))  # 2
print(max(4, 2, 9))  # 9
print(pow(2, 8))     # 256  igual a 2 ** 8`,
      },
    ],
    points: [
      "int é número inteiro; float tem casa decimal; complex tem parte imaginária.",
      "A divisão / sempre devolve float, mesmo quando o resultado é exato.",
      "// é divisão inteira (chão), e % devolve o resto.",
      "** é potência; ^ NÃO é potência em Python (é operador bit-a-bit).",
      "0.1 + 0.2 dá 0.30000000000000004 por causa de como floats são armazenados.",
      "Para dinheiro e contas exatas, use o módulo decimal em vez de float.",
      "Inteiros em Python crescem o quanto precisar; não estouram.",
      "Atalhos como += e *= deixam o código mais curto e legível.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca use float para valores monetários em sistemas reais. Use Decimal ou trabalhe em centavos como inteiro. Erros de centavo viram bugs sérios em produção.",
      },
      {
        type: "info",
        content: "O resultado de qualquer operação entre int e float é float. Por isso 4 / 2 dá 2.0 e não 2.",
      },
      {
        type: "tip",
        content: "Use round(valor, 2) só para mostrar resultado ao usuário, nunca para guardar dinheiro: arredondar repetidas vezes acumula erro.",
      },
    ],
  },
  {
    slug: "strings-basico",
    section: "sintaxe",
    title: "Strings: básico",
    difficulty: "iniciante",
    subtitle: "Texto em Python: aspas, concatenação e caracteres especiais.",
    intro: `String é o nome técnico para "texto". Sempre que você for guardar uma palavra, frase, nome ou qualquer sequência de caracteres, vai usar uma string. Em Python, ela é delimitada por aspas — simples \`'\`, duplas \`"\` ou triplas \`"""\` para texto de várias linhas.

Strings em Python são imutáveis. Isso significa que, depois de criada, você não consegue trocar uma letra dela diretamente. Quando parece que está mudando, na verdade o Python cria uma nova string. Isso evita bugs estranhos e deixa o comportamento previsível.

Antes de partir para os métodos chiques (próximo capítulo) e para o fatiamento, você precisa firmar três coisas: como criar strings, como juntar pedaços e como representar caracteres especiais como quebra de linha. Isso é o pão com manteiga de qualquer programa que mostra texto na tela.`,
    codes: [
      {
        lang: "python",
        code: `# Aspas simples e duplas funcionam igual
nome = "Ana"
sobrenome = 'Silva'
print(nome, sobrenome)  # → Ana Silva

# Use as duplas quando o texto tiver aspas simples e vice-versa
frase = "Ela disse: 'oi'"
outra = 'O arquivo é "config.json"'
print(frase)
print(outra)`,
      },
      {
        lang: "python",
        code: `# Aspas triplas para texto de várias linhas
endereco = """Rua das Flores, 123
Bairro Centro
Belo Horizonte - MG"""
print(endereco)`,
      },
      {
        lang: "python",
        code: `# Concatenação: juntar duas strings com +
nome = "Ana"
mensagem = "Olá, " + nome + "!"
print(mensagem)  # → Olá, Ana!

# Repetir string com *
linha = "-" * 20
print(linha)  # → --------------------`,
      },
      {
        lang: "python",
        code: `# Caracteres especiais usam contrabarra (escape)
print("Linha 1\\nLinha 2")   # \\n quebra a linha
print("Coluna1\\tColuna2")   # \\t é uma tabulação
print("Aspas: \\"oi\\"")        # \\" para usar aspas dentro
print("Caminho: C:\\\\users")  # \\\\ para uma contrabarra literal`,
      },
      {
        lang: "python",
        code: `# Strings "raw" ignoram os escapes — útil para caminhos e regex
caminho = r"C:\\Users\\Ana\\arquivos"
print(caminho)  # → C:\\Users\\Ana\\arquivos`,
      },
      {
        lang: "python",
        code: `# Strings têm tamanho que pode ser medido com len()
nome = "Ana Silva"
print(len(nome))  # → 9 (incluindo o espaço)

# E você pode somar números convertendo, mas NÃO somar texto + número direto:
idade = 30
# print("Idade: " + idade)  # TypeError: can only concatenate str
print("Idade: " + str(idade))  # converte primeiro`,
      },
    ],
    points: [
      "Strings ficam entre aspas simples, duplas ou triplas.",
      "Aspas triplas guardam texto com várias linhas exatamente como você digitou.",
      "Use + para concatenar strings e * para repetir.",
      "\\n quebra linha, \\t tabula, \\\" insere aspas, \\\\ insere contrabarra.",
      "Prefixo r faz uma string 'crua': ignora escapes (bom para caminhos do Windows).",
      "len(texto) devolve a quantidade de caracteres, espaços incluídos.",
      "Strings são imutáveis: você não muda uma letra no lugar, cria outra string.",
      "Não dá para somar texto com número: converta o número com str() primeiro.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para juntar muitos pedaços de texto, prefira f-strings (próximo capítulo) ou o método join. Concatenar com + dentro de loop fica lento e poluído.",
      },
      {
        type: "warning",
        content: "Se você esquecer de fechar a aspa, o Python mostra SyntaxError. Sempre confira se cada aspa aberta tem uma fechando do mesmo tipo.",
      },
      {
        type: "info",
        content: "Strings em Python 3 são Unicode por padrão, então acentos, ç e emojis funcionam sem configuração extra.",
      },
    ],
  },
  {
    slug: "fstrings",
    section: "sintaxe",
    title: "f-strings: formatação moderna",
    difficulty: "iniciante",
    subtitle: "A forma mais limpa e rápida de montar texto com variáveis.",
    intro: `Antes das f-strings, montar uma frase com variáveis era feio: \`"Olá, " + nome + ", você tem " + str(idade) + " anos"\`. Bagunçado e fácil de errar. Hoje, basta colocar um \`f\` antes da aspa e usar \`{}\` para inserir variáveis no meio do texto. O Python resolve tudo na hora.

f-strings (introduzidas no Python 3.6) são a forma recomendada de formatar texto. Elas são mais rápidas que os métodos antigos (\`.format()\` e \`%\`), mais fáceis de ler e ainda permitem fazer cálculos, chamar funções e formatar números diretamente dentro das chaves.

Neste capítulo, você aprende a sintaxe, os truques de formatação (casas decimais, alinhamento, separador de milhar) e as armadilhas comuns: esquecer o \`f\`, misturar aspas, ou tentar quebrar a string sem cuidado. Depois disso, você nunca mais vai querer voltar ao \`+\`.`,
    codes: [
      {
        lang: "python",
        code: `# Sintaxe básica: f antes da aspa, variável entre {}
nome = "Ana"
idade = 30
print(f"Olá, {nome}, você tem {idade} anos.")
# → Olá, Ana, você tem 30 anos.`,
      },
      {
        lang: "python",
        code: `# Pode colocar expressões inteiras dentro das chaves
preco = 19.90
quantidade = 3
print(f"Total: R$ {preco * quantidade}")
# → Total: R$ 59.7

# Até chamar funções:
nome = "ana"
print(f"Olá, {nome.upper()}!")  # → Olá, ANA!`,
      },
      {
        lang: "python",
        code: `# Formatação de números: :.Nf para N casas decimais
preco = 19.9
print(f"R$ {preco:.2f}")    # → R$ 19.90
print(f"R$ {1234.5:.2f}")   # → R$ 1234.50

# Separador de milhar com vírgula (padrão americano):
populacao = 12305000
print(f"{populacao:,}")     # → 12,305,000`,
      },
      {
        lang: "python",
        code: `# Alinhamento e largura
# < alinha à esquerda, > à direita, ^ centraliza
print(f"|{'oi':<10}|")  # → |oi        |
print(f"|{'oi':>10}|")  # → |        oi|
print(f"|{'oi':^10}|")  # → |    oi    |

# Útil para imprimir tabelas:
itens = [("Maçã", 3), ("Banana", 12), ("Uva", 1)]
for nome, qtd in itens:
    print(f"{nome:<10} {qtd:>3}")`,
      },
      {
        lang: "python",
        code: `# Truque útil do Python 3.8+: = mostra o nome e o valor
# (ótimo para depurar)
x = 42
print(f"{x=}")          # → x=42
print(f"{x * 2 = }")    # → x * 2 = 84`,
      },
      {
        lang: "python",
        code: `# Erros comuns:

# 1) Esquecer o f — vira string literal:
nome = "Ana"
print("Olá, {nome}")   # → Olá, {nome}    (não interpola!)
print(f"Olá, {nome}")  # → Olá, Ana

# 2) Aspas dentro: use o tipo oposto
fruta = "maçã"
print(f"Eu como {fruta}")             # ok
print(f"Eu como '{fruta}'")           # ok

# 3) Chaves literais: dobre {{ e }}
print(f"Use {{chaves}} assim")  # → Use {chaves} assim`,
      },
    ],
    points: [
      "f-string é uma string normal com 'f' antes da aspa: f\"texto {variavel}\".",
      "Dentro das chaves cabem variáveis, contas e até chamadas de função.",
      "Formate float com {valor:.2f} para mostrar duas casas decimais.",
      "Use {numero:,} para separador de milhar com vírgula.",
      "<, >, ^ controlam alinhamento; combinados com largura criam colunas.",
      "{x=} (Python 3.8+) imprime 'x=valor', útil para depurar.",
      "Esquecer o f é o erro mais comum: a string sai literalmente com {nome} dentro.",
      "Para imprimir uma chave de verdade, escreva duas: {{ ou }}.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use f-strings sempre que puder. Os formatos antigos (% e .format) ainda funcionam, mas são mais verbosos e menos legíveis em código novo.",
      },
      {
        type: "warning",
        content: "f-strings interpolam no momento em que a linha roda. Se a variável ainda não foi definida, dá NameError. Não dá para 'guardar' um modelo para preencher depois.",
      },
      {
        type: "danger",
        content: "Nunca use f-string para montar SQL ou HTML com dados do usuário: isso abre brecha de injeção. Use parametrização do banco ou bibliotecas de template.",
      },
    ],
  },
  {
    slug: "metodos-string",
    section: "sintaxe",
    title: "Métodos de string",
    difficulty: "iniciante",
    subtitle: "upper, lower, strip, split, replace e companhia.",
    intro: `Texto que vem do mundo real é sempre meio bagunçado: cheio de espaços extras, mistura de maiúscula e minúscula, vírgula no lugar errado. Os métodos de string são as ferramentas embutidas do Python para limpar, transformar e procurar coisas dentro de um texto.

Um método é uma função que pertence a um objeto. Você chama ele com um ponto: \`texto.upper()\`. A grande sacada é que strings são imutáveis: nenhum método muda a string original, todos devolvem uma nova. Se você quiser guardar o resultado, atribua a uma variável.

Os métodos que você vai usar todo dia são poucos: \`strip\` para tirar espaços, \`upper\`/\`lower\` para padronizar caixa, \`replace\` para trocar pedaços, \`split\` para quebrar em lista e \`startswith\`/\`endswith\`/\`in\` para verificar se algo aparece. Domine esses cinco e você resolve 90% das tarefas com texto.`,
    codes: [
      {
        lang: "python",
        code: `# Caixa: upper, lower, title, capitalize
nome = "ana silva"
print(nome.upper())       # → ANA SILVA
print(nome.lower())       # → ana silva
print(nome.title())       # → Ana Silva
print(nome.capitalize())  # → Ana silva

# A string original não muda:
print(nome)               # → ana silva`,
      },
      {
        lang: "python",
        code: `# Limpar espaços com strip
entrada = "   ana@email.com   \\n"
limpa = entrada.strip()
print(repr(limpa))  # → 'ana@email.com'

# lstrip tira só da esquerda, rstrip só da direita
print("---ana---".strip("-"))  # → ana`,
      },
      {
        lang: "python",
        code: `# Substituir trechos com replace
texto = "Eu gosto de café. Café é bom."
novo = texto.replace("café", "chá", 1)  # 1 = só a primeira ocorrência
print(novo)  # → Eu gosto de chá. Café é bom.

# Sem o número, troca tudo:
print(texto.replace("Café", "Chá"))`,
      },
      {
        lang: "python",
        code: `# Quebrar em lista com split, juntar com join
linha = "Ana,Bruno,Carlos,Diana"
nomes = linha.split(",")
print(nomes)  # → ['Ana', 'Bruno', 'Carlos', 'Diana']

# join faz o caminho contrário
de_volta = " | ".join(nomes)
print(de_volta)  # → Ana | Bruno | Carlos | Diana`,
      },
      {
        lang: "python",
        code: `# Procurar e verificar
email = "ana@gmail.com"
print(email.startswith("ana"))     # True
print(email.endswith(".com"))      # True
print("@" in email)                # True (operador, não método)
print(email.find("@"))             # 3 (posição), -1 se não achar
print(email.count("a"))            # 2`,
      },
      {
        lang: "python",
        code: `# Métodos de verificação devolvem True/False
print("12345".isdigit())   # True (só dígitos)
print("abc".isalpha())     # True (só letras)
print("abc123".isalnum())  # True (letras e dígitos)
print("   ".isspace())     # True
print("Ana".istitle())     # True (começa com maiúscula)`,
      },
      {
        lang: "python",
        code: `# Encadeamento: vários métodos seguidos
entrada = "   ANA SILVA   "
limpo = entrada.strip().lower().replace(" ", "_")
print(limpo)  # → ana_silva`,
      },
    ],
    points: [
      "Métodos de string nunca mudam a string original; eles devolvem uma nova.",
      "upper, lower, title e capitalize controlam caixa do texto.",
      "strip remove espaços e quebras nas pontas; aceita caracteres customizados.",
      "replace troca trechos; passe um terceiro argumento para limitar quantas vezes.",
      "split quebra em lista pelo separador; join faz o caminho contrário.",
      "in verifica se um trecho aparece; find devolve a posição (-1 se não achar).",
      "Métodos is... (isdigit, isalpha, isspace) devolvem True/False para validação.",
      "Você pode encadear métodos com pontos: texto.strip().lower().replace(...).",
    ],
    alerts: [
      {
        type: "warning",
        content: "Esquecer de atribuir o resultado é a armadilha mais comum: 'texto.strip()' sozinho não muda nada. Você precisa fazer 'texto = texto.strip()'.",
      },
      {
        type: "tip",
        content: "Para padronizar entrada do usuário (login, e-mail, CPF), aplique strip e lower antes de comparar. Isso evita erros bobos por causa de espaço ou maiúscula.",
      },
      {
        type: "info",
        content: "Existem dezenas de métodos. Use help(str) ou dir(str) no terminal Python para ver a lista completa quando precisar.",
      },
    ],
  },
  {
    slug: "slicing-strings",
    section: "sintaxe",
    title: "Fatiamento (slicing) de strings",
    difficulty: "iniciante",
    subtitle: "Pegando pedaços de uma string usando índices.",
    intro: `Toda string em Python é uma sequência indexada. A primeira letra está na posição 0, a segunda na 1, e assim por diante. Fatiar (slice) é a forma de pegar um pedaço da string usando essas posições, com a sintaxe \`texto[inicio:fim:passo]\`.

Aqui mora uma das pegadinhas clássicas: o índice de início é incluído, mas o de fim NÃO. Então \`"python"[0:3]\` devolve "pyt", não "pyth". Parece estranho no começo, mas tem uma vantagem: \`fim - inicio\` é exatamente o tamanho do pedaço.

Você também pode usar índices negativos para contar do final pra trás: -1 é a última letra, -2 a penúltima. E pode pular elementos com o passo. Slicing serve para extrair as 4 primeiras letras de um CPF, pegar a extensão de um arquivo, inverter uma string ou pular caracteres em alternância. Vale dominar — esse mesmo mecanismo funciona em listas e tuplas.`,
    codes: [
      {
        lang: "python",
        code: `# Índices: cada caractere tem uma posição
texto = "python"
#         0 1 2 3 4 5
#        -6-5-4-3-2-1

print(texto[0])   # → p
print(texto[3])   # → h
print(texto[-1])  # → n  (último)
print(texto[-2])  # → o  (penúltimo)`,
      },
      {
        lang: "python",
        code: `# Fatiamento: texto[inicio:fim]
# inicio é incluído, fim é EXCLUÍDO
texto = "python"
print(texto[0:3])   # → pyt
print(texto[2:5])   # → tho
print(texto[:3])    # → pyt   (omite início = 0)
print(texto[3:])    # → hon   (omite fim = até o final)
print(texto[:])     # → python (cópia inteira)`,
      },
      {
        lang: "python",
        code: `# Índices negativos no slice
texto = "programacao"
print(texto[-5:])    # → macao  (últimos 5)
print(texto[:-3])    # → program  (tudo menos os 3 últimos)
print(texto[-5:-2])  # → mac`,
      },
      {
        lang: "python",
        code: `# Terceiro número: o passo
texto = "0123456789"
print(texto[::2])    # → 02468   (de 2 em 2)
print(texto[1::2])   # → 13579   (ímpares)
print(texto[::-1])   # → 9876543210  (inverter!)`,
      },
      {
        lang: "python",
        code: `# Caso prático: extrair partes de um CPF
cpf = "12345678900"
print(cpf[:3])      # → 123
print(cpf[3:6])     # → 456
print(cpf[6:9])     # → 789
print(cpf[-2:])     # → 00 (dígitos verificadores)

# Formatado:
formatado = f"{cpf[:3]}.{cpf[3:6]}.{cpf[6:9]}-{cpf[-2:]}"
print(formatado)    # → 123.456.789-00`,
      },
      {
        lang: "python",
        code: `# Strings são IMUTÁVEIS — não dá para mudar uma letra:
texto = "python"
# texto[0] = "P"  # TypeError: 'str' object does not support item assignment

# Faça uma nova string:
nova = "P" + texto[1:]
print(nova)  # → Python`,
      },
      {
        lang: "python",
        code: `# Slice nunca dá erro de índice fora — devolve string vazia
texto = "abc"
print(texto[10:20])   # → '' (sem erro)
print(texto[10])      # IndexError: string index out of range`,
      },
    ],
    points: [
      "Índices começam em 0; -1 é a última letra.",
      "Slice é texto[inicio:fim:passo]; o fim NÃO é incluído.",
      "Omita início para começar do 0; omita fim para ir até o final.",
      "texto[::-1] é o jeito clássico de inverter uma string.",
      "fim - inicio é exatamente o tamanho do pedaço — facilita pensar.",
      "Fatiar nunca dá IndexError, mesmo com índices fora do range.",
      "Strings são imutáveis: você não troca uma letra, monta uma nova.",
      "A mesma sintaxe de slice funciona em listas, tuplas e bytes.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Acessar texto[i] com i fora do tamanho gera IndexError. Já texto[i:j] não — devolve vazio. Os comportamentos são diferentes de propósito.",
      },
      {
        type: "tip",
        content: "Quando usar slice, leia mentalmente como 'do índice X até antes do índice Y'. Isso evita confusão com o limite excluído.",
      },
      {
        type: "info",
        content: "Internamente, slicing cria uma nova string. Para textos enormes, isso consome memória — em casos extremos, prefira views específicas como memoryview com bytes.",
      },
    ],
  },
  {
    slug: "booleanos",
    section: "sintaxe",
    title: "Booleanos e operadores lógicos",
    difficulty: "iniciante",
    subtitle: "True, False e como combinar condições com and, or e not.",
    intro: `Booleano é o tipo de dado mais simples que existe: ele só pode valer \`True\` (verdadeiro) ou \`False\` (falso). Apesar da simplicidade, é o que sustenta toda decisão dentro de um programa. Cada \`if\`, cada \`while\`, cada filtro depende de uma expressão booleana.

Em Python, escreva sempre com letra maiúscula: \`True\` e \`False\`. Se escrever \`true\` em minúsculo, o Python pensa que é o nome de uma variável e dá NameError.

Os operadores lógicos são três: \`and\` (E — só é verdadeiro se as duas partes forem), \`or\` (OU — basta uma ser verdadeira) e \`not\` (NÃO — inverte). Diferente de outras linguagens, o Python usa palavras em vez de \`&&\`, \`||\` e \`!\`. E tem um truque importante: muitos valores que não são booleanos se comportam como verdadeiros ou falsos quando usados em condição. Saber quem é "falsy" evita um monte de bug.`,
    codes: [
      {
        lang: "python",
        code: `# Os dois únicos valores booleanos
ligado = True
desligado = False
print(type(ligado))  # → <class 'bool'>

# Sempre com inicial maiúscula!
# true / false em minúsculo dá NameError`,
      },
      {
        lang: "python",
        code: `# and: verdadeiro só se AMBOS forem verdadeiros
idade = 25
tem_cnh = True
pode_dirigir = idade >= 18 and tem_cnh
print(pode_dirigir)  # → True

# or: verdadeiro se PELO MENOS UM for verdadeiro
fim_de_semana = False
feriado = True
folga = fim_de_semana or feriado
print(folga)  # → True

# not: inverte
print(not True)   # → False
print(not folga)  # → False`,
      },
      {
        lang: "python",
        code: `# Combinando: use parênteses para deixar claro
idade = 17
acompanhado = True

# "maior de 18 OU acompanhado por adulto"
pode_entrar = idade >= 18 or acompanhado
print(pode_entrar)  # → True

# Negação composta:
nao_pode = not (idade >= 18 or acompanhado)
print(nao_pode)  # → False`,
      },
      {
        lang: "python",
        code: `# Valores "falsy" — contam como False em condições:
# 0, 0.0, "", [], {}, (), None
if not "":
    print("string vazia é falsy")
if not 0:
    print("zero é falsy")
if not []:
    print("lista vazia é falsy")

# Tudo o resto é "truthy":
if "ana":
    print("string não vazia é truthy")
if [0]:
    print("lista com algo é truthy, mesmo que seja zero")`,
      },
      {
        lang: "python",
        code: `# Curto-circuito: o Python para de avaliar quando já sabe a resposta
def caro():
    print("calculando...")
    return True

# Em "or", se a primeira já é True, não chama a segunda
print(True or caro())   # → True (não imprime "calculando...")

# Em "and", se a primeira é False, não chama a segunda
print(False and caro()) # → False (não imprime "calculando...")`,
      },
      {
        lang: "python",
        code: `# Booleano é, no fundo, um número: True == 1 e False == 0
print(True + True)   # → 2
print(False * 10)    # → 0
print(sum([True, True, False, True]))  # → 3 (conta os True)`,
      },
    ],
    points: [
      "Só existem dois valores booleanos: True e False, sempre com inicial maiúscula.",
      "and exige ambos verdadeiros; or basta um; not inverte.",
      "Em Python use palavras (and/or/not), não símbolos (&&/||/!).",
      "Vazios são 'falsy': 0, '', [], {}, None. Tudo mais é 'truthy'.",
      "Operadores curto-circuitam: param de avaliar assim que a resposta está decidida.",
      "True vale 1 e False vale 0 quando usados em conta — útil para contar.",
      "Use parênteses em expressões longas para deixar a precedência clara.",
      "Confundir = (atribui) com == (compara) é um clássico — preste atenção.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Cuidado com 'if x == True:'. Prefira 'if x:'. Comparar booleanos com == funciona, mas é redundante e ainda quebra para valores truthy que não são exatamente True.",
      },
      {
        type: "tip",
        content: "Quando uma condição ficar com mais de três operadores, extraia para uma variável com nome descritivo. 'pode_acessar = ...' é mais legível dentro do if.",
      },
      {
        type: "info",
        content: "Operadores 'and' e 'or' não devolvem necessariamente True/False: eles devolvem o último valor avaliado. Por exemplo, 'a or b' devolve b se a for falsy.",
      },
    ],
  },
  {
    slug: "operadores-comparacao",
    section: "sintaxe",
    title: "Operadores de comparação",
    difficulty: "iniciante",
    subtitle: "Comparando valores e construindo condições.",
    intro: `Comparações são a base das decisões em qualquer programa. Toda vez que você quer perguntar "essa idade é maior que 18?", "esse nome é igual ao usuário cadastrado?" ou "esse saldo está negativo?", você usa um operador de comparação. O resultado é sempre booleano: \`True\` ou \`False\`.

O Python tem os clássicos: igual (\`==\`), diferente (\`!=\`), maior (\`>\`), menor (\`<\`), maior ou igual (\`>=\`), menor ou igual (\`<=\`). Também tem dois especiais: \`is\` (mesma identidade na memória) e \`in\` (pertence a uma coleção).

A confusão mais clássica do iniciante é \`=\` vs \`==\`. \`=\` ATRIBUI valor; \`==\` PERGUNTA se são iguais. Outra que pega muita gente é a diferença entre \`==\` e \`is\`: o primeiro compara valores, o segundo compara se são literalmente o mesmo objeto na memória. Em quase tudo no dia a dia, você quer \`==\`. Use \`is\` apenas para comparar com \`None\`, \`True\` ou \`False\`.`,
    codes: [
      {
        lang: "python",
        code: `# Operadores de comparação devolvem True ou False
print(5 == 5)   # → True   (igual)
print(5 != 3)   # → True   (diferente)
print(7 > 4)    # → True
print(7 < 4)    # → False
print(7 >= 7)   # → True
print(7 <= 6)   # → False`,
      },
      {
        lang: "python",
        code: `# = vs == — confusão clássica
idade = 18      # ATRIBUIÇÃO (guarda 18 em idade)
print(idade == 18)  # COMPARAÇÃO (pergunta se é igual)

# if idade = 18:    # SyntaxError! atribuição não cabe em condição
if idade == 18:
    print("Maior de idade")`,
      },
      {
        lang: "python",
        code: `# Strings são comparadas pela ordem alfabética (na real, Unicode)
print("ana" == "ana")    # True
print("ana" == "Ana")    # False (diferente caixa)
print("ana" < "banana")  # True (a vem antes de b)
print("Z" < "a")         # True (maiúsculas vêm antes de minúsculas no Unicode)`,
      },
      {
        lang: "python",
        code: `# Comparações encadeadas (Python deixa juntar)
idade = 25
if 18 <= idade <= 65:
    print("idade adulta de trabalho")

# Equivale a: idade >= 18 and idade <= 65, mas mais legível.`,
      },
      {
        lang: "python",
        code: `# in: pertence a uma coleção
nome = "Ana"
print(nome in ["Ana", "Bruno", "Carlos"])  # True
print("@" in "ana@email.com")              # True
print(3 in (1, 2, 4))                      # False

# not in inverte
print("@" not in "ana")  # True`,
      },
      {
        lang: "python",
        code: `# is: mesma identidade (mesmo objeto na memória)
# Use APENAS para None, True, False
valor = None
if valor is None:
    print("não tem valor")

# Para comparar números/strings/listas, use ==
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True (mesmos elementos)
print(a is b)  # False (são duas listas diferentes na memória)`,
      },
      {
        lang: "python",
        code: `# Cuidado: comparar tipos diferentes pode dar erro ou resultado estranho
print(5 == "5")     # False (int e str nunca são iguais)
# print(5 < "5")    # TypeError: '<' not supported between int and str

# Converta antes:
nota_texto = "8"
nota = int(nota_texto)
print(nota >= 7)  # True`,
      },
    ],
    points: [
      "Os operadores são: ==, !=, >, <, >=, <=. Resultado sempre booleano.",
      "= atribui; == compara. Confundir os dois é o erro mais frequente.",
      "Strings comparam por Unicode: 'a' > 'Z' porque minúsculas vêm depois.",
      "Python aceita comparações encadeadas: 18 <= idade <= 65.",
      "in verifica se algo pertence a uma string, lista, tupla ou dicionário.",
      "is compara identidade na memória, não valor. Use só com None/True/False.",
      "Comparar tipos incompatíveis (int < str) dá TypeError em Python 3.",
      "Converta strings com int() ou float() antes de comparar como número.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Nunca use 'is' para comparar números, strings ou listas. Pode funcionar por acaso para valores pequenos e falhar de repente para valores maiores. Use ==.",
      },
      {
        type: "tip",
        content: "Para verificar se uma variável é None, escreva 'if x is None:'. É mais rápido e é a forma idiomática recomendada pela PEP 8.",
      },
      {
        type: "info",
        content: "O resultado de == em float pode surpreender por causa da imprecisão decimal. Para comparar floats, use math.isclose(a, b) em vez de a == b.",
      },
    ],
  },
  {
    slug: "conversao-tipos",
    section: "sintaxe",
    title: "Conversão de tipos (casting)",
    difficulty: "iniciante",
    subtitle: "Transformando valores entre int, float, str e bool.",
    intro: `O Python descobre o tipo da variável sozinho, mas isso não significa que ele converta automaticamente entre tipos. Se você pegou uma idade vinda do \`input()\`, recebeu uma string. Se tentar somar com um número, dá erro. Você precisa converter explicitamente.

Conversão (também chamada de "casting") é feita chamando o nome do tipo como função: \`int("5")\` vira o número 5, \`str(5)\` vira o texto "5", \`float("3.14")\` vira 3.14. É um dos passos mais comuns em qualquer programa, principalmente quando você lê dados de fora (teclado, arquivo, internet).

Aqui também moram alguns dos primeiros erros do iniciante: tentar converter uma string que não é número (\`int("abc")\`), perder a parte decimal por descuido (\`int(3.99)\` vira 3, não 4), ou achar que \`bool("False")\` devolve \`False\` (devolve \`True\`, porque a string não está vazia). Saber as regras de cada conversão evita armadilha.`,
    codes: [
      {
        lang: "python",
        code: `# Conversões básicas
print(int("42"))      # → 42      (str → int)
print(float("3.14"))  # → 3.14    (str → float)
print(str(100))       # → "100"   (int → str)
print(bool(1))        # → True    (int → bool)
print(int(3.99))      # → 3       (float → int: TRUNCA, não arredonda!)`,
      },
      {
        lang: "python",
        code: `# Caso comum: input() sempre devolve string
idade_texto = input("Digite sua idade: ")  # "30" (str)
idade = int(idade_texto)                   # 30 (int)
print(idade + 1)                           # → 31

# Forma compacta:
idade = int(input("Digite sua idade: "))`,
      },
      {
        lang: "python",
        code: `# int() não converte string com decimal direto
# print(int("3.14"))  # ValueError!

# Você precisa passar por float primeiro:
print(int(float("3.14")))  # → 3

# E não aceita texto não-numérico:
# print(int("abc"))  # ValueError: invalid literal for int()`,
      },
      {
        lang: "python",
        code: `# Cuidado com bool — quase tudo é True!
print(bool(0))         # False
print(bool(""))        # False
print(bool([]))        # False
print(bool(None))      # False

print(bool("False"))   # True!  (é uma string não vazia)
print(bool("0"))       # True!  (também não vazia)
print(bool(-1))        # True   (qualquer número diferente de 0)
print(bool(0.1))       # True`,
      },
      {
        lang: "python",
        code: `# Tratando erro de conversão com try/except
texto = "abc"
try:
    numero = int(texto)
except ValueError:
    print(f"'{texto}' não é um número válido")
    numero = 0
print(numero)  # → 0`,
      },
      {
        lang: "python",
        code: `# Conversões úteis com listas e strings
# str para lista de caracteres:
print(list("abc"))           # → ['a', 'b', 'c']

# Lista de strings para uma string única (com join):
print("-".join(["12", "34", "56"]))  # → '12-34-56'

# Inverso: split quebra string em lista
print("12-34-56".split("-"))  # → ['12', '34', '56']`,
      },
      {
        lang: "python",
        code: `# round() é diferente de int() — ele arredonda de verdade
print(int(3.9))      # → 3   (trunca)
print(round(3.9))    # → 4   (arredonda)
print(round(3.5))    # → 4
print(round(2.5))    # → 2   (banker's rounding: arredonda para o par)
print(round(3.567, 2))  # → 3.57`,
      },
    ],
    points: [
      "Conversão é explícita: chame int(), float(), str(), bool() conforme o caso.",
      "input() sempre devolve string; converta com int()/float() para fazer contas.",
      "int() de float TRUNCA (corta a parte decimal), não arredonda.",
      "int(\"3.14\") dá erro: passe por float(\"3.14\") primeiro.",
      "bool(\"False\") é True — qualquer string não vazia conta como verdadeira.",
      "Tudo que é vazio (0, '', [], None) vira False ao converter para bool.",
      "Use try/except ValueError para tratar conversões que podem falhar.",
      "round() arredonda, int() trunca. Para dinheiro, prefira round() com casas.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Lembre que int(3.9) dá 3, não 4. Se você quer arredondar de verdade, use round(). Esse engano causa diferenças de centavos em cálculos financeiros.",
      },
      {
        type: "danger",
        content: "Validar entrada do usuário com bool(input()) NUNCA funciona como intuição diz. Qualquer texto digitado (incluindo 'nao' ou 'False') vai dar True.",
      },
      {
        type: "tip",
        content: "Antes de converter algo que vem de fora, pergunte: 'e se for inválido?'. Envolva em try/except ou valide com um método como .isdigit() antes.",
      },
      {
        type: "info",
        content: "round() em Python usa arredondamento bancário: 0.5 arredonda para o número par mais próximo. Por isso round(2.5) é 2 e round(3.5) é 4.",
      },
    ],
  },
  {
    slug: "entrada-saida",
    section: "sintaxe",
    title: "Entrada e saída no terminal",
    difficulty: "iniciante",
    subtitle: "Lendo do teclado com input() e mostrando texto com print().",
    intro: `Todo programa precisa, em algum momento, conversar com quem está usando: receber dados e mostrar resultados. No Python, as duas funções principais para isso são \`print()\` (mostra algo na tela) e \`input()\` (espera o usuário digitar e dá Enter).

Parece básico — e é —, mas você vai usar essas duas funções em quase todos os exercícios e protótipos. Por trás da simplicidade, há detalhes úteis: \`print\` aceita vários valores separados por vírgula, deixa você escolher o separador (\`sep\`) e o que vai no final (\`end\`). \`input\` sempre devolve string, então você quase sempre precisa converter o resultado.

Neste capítulo, você fecha o conjunto de habilidades fundamentais: entender variáveis, tipos, condições e finalmente conseguir montar um programa interativo de verdade. A partir daqui, com loops e listas, você consegue escrever pequenos utilitários úteis no dia a dia.`,
    codes: [
      {
        lang: "python",
        code: `# print() — mostra algo no terminal
print("Olá!")
print("Olá,", "mundo!")        # → Olá, mundo!  (vírgula vira espaço)
print(1, 2, 3)                 # → 1 2 3
print("Linha 1")
print("Linha 2")               # cada print() já quebra linha`,
      },
      {
        lang: "python",
        code: `# Personalizando sep e end
print("a", "b", "c", sep="-")        # → a-b-c
print("a", "b", "c", sep="")         # → abc
print("primeiro", end=" | ")
print("segundo", end=" | ")
print("terceiro")
# → primeiro | segundo | terceiro`,
      },
      {
        lang: "python",
        code: `# input() — espera o usuário digitar
nome = input("Como você se chama? ")
print(f"Prazer, {nome}!")

# Saída esperada:
# Como você se chama? Ana
# Prazer, Ana!`,
      },
      {
        lang: "python",
        code: `# input() SEMPRE devolve string. Para número, converta:
idade_texto = input("Idade: ")     # "25"
idade = int(idade_texto)            # 25 (int)
print(f"Ano que vem você terá {idade + 1}")

# Forma curta:
altura = float(input("Altura em metros: "))
print(f"Sua altura ao quadrado é {altura ** 2:.2f}")`,
      },
      {
        lang: "python",
        code: `# Programinha completo: calculadora de IMC
peso = float(input("Peso (kg): "))
altura = float(input("Altura (m): "))

imc = peso / (altura ** 2)
print(f"Seu IMC é {imc:.2f}")

if imc < 18.5:
    print("Abaixo do peso")
elif imc < 25:
    print("Peso normal")
elif imc < 30:
    print("Sobrepeso")
else:
    print("Obesidade")`,
      },
      {
        lang: "python",
        code: `# Validação básica com try/except
try:
    idade = int(input("Digite sua idade: "))
    print(f"Você tem {idade} anos.")
except ValueError:
    print("Você precisa digitar um número inteiro!")`,
      },
      {
        lang: "python",
        code: `# Lendo vários valores de uma vez
linha = input("Digite três números separados por espaço: ")
# Ex: "10 20 30"
partes = linha.split()           # ['10', '20', '30']
numeros = [int(x) for x in partes]
print("Soma:", sum(numeros))
print("Maior:", max(numeros))`,
      },
      {
        lang: "bash",
        code: `# Para rodar um arquivo Python no terminal:
python meu_programa.py

# Em alguns sistemas, o comando é python3:
python3 meu_programa.py`,
      },
    ],
    points: [
      "print() mostra valores e quebra linha por padrão; aceita vários argumentos separados por vírgula.",
      "Use sep para mudar o separador entre argumentos e end para mudar o final.",
      "input() pausa o programa, espera o usuário digitar e devolve uma string.",
      "Para usar input como número, converta com int() ou float().",
      "input(\"texto: \") mostra um aviso antes de esperar a digitação.",
      "Combinar input + conversão + condição já permite criar programas interativos.",
      "Trate erros de conversão com try/except para o programa não quebrar.",
      "Para vários valores na mesma linha, use input().split() e converta cada parte.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Termine a mensagem do input com espaço, como input('Nome: '). Sem o espaço, o cursor cola na palavra digitada e fica feio.",
      },
      {
        type: "warning",
        content: "Esquecer de converter o input para número e tentar fazer conta gera TypeError. Sempre pense: 'esse valor precisa virar int ou float?'.",
      },
      {
        type: "info",
        content: "input() não funciona em alguns ambientes online (como notebooks de produção). Em scripts no terminal e no IDLE, funciona normalmente.",
      },
      {
        type: "success",
        content: "Validar entrada com try/except e dar uma mensagem clara ao usuário é a marca de um programa que respeita quem está usando. Vale o esforço extra.",
      },
    ],
  },
];
