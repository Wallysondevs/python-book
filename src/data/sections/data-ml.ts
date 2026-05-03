import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "numpy-intro",
    section: "data-ml",
    title: "NumPy: arrays numéricos",
    difficulty: "intermediario",
    subtitle: "A base do ecossistema científico do Python.",
    intro: `Imagine que você tem as notas de mil alunos e quer somar dez pontos em todas. Com listas comuns do Python, você precisaria de um for percorrendo elemento por elemento. Funciona, mas é lento e o código fica longo.

NumPy resolve isso. Ele oferece um tipo novo chamado ndarray (n-dimensional array), que é uma caixa especializada em guardar números. Por dentro, esses números ficam em memória contígua, do mesmo tipo, e o NumPy delega as contas para código C otimizado. O resultado é que somar dez pontos em um array de mil notas vira uma única linha que roda em microssegundos.

Quase todo o ecossistema de dados de Python (pandas, scikit-learn, PyTorch, TensorFlow) é construído em cima de NumPy. Aprender essa biblioteca é como aprender o alfabeto antes de escrever frases. Neste capítulo você vai criar arrays, ver suas dimensões, fazer contas e entender por que ele é tão mais rápido do que listas comuns.`,
    codes: [
      {
        lang: "bash",
        code: `# instale o NumPy no seu ambiente
pip install numpy`,
      },
      {
        lang: "python",
        code: `# o apelido np é a convenção universal — todo mundo usa
import numpy as np

# array unidimensional a partir de uma lista comum
notas = np.array([7.5, 8.0, 6.2, 9.1])
print(notas)         # → [7.5 8.  6.2 9.1]
print(notas.dtype)   # → float64 (tipo dos elementos)
print(notas.shape)   # → (4,) — formato: 4 elementos em 1 dimensão`,
      },
      {
        lang: "python",
        code: `import numpy as np

# operações vetorizadas: agem em todos os elementos de uma vez
notas = np.array([7.5, 8.0, 6.2, 9.1])
notas_ajustadas = notas + 1     # soma 1 em CADA nota
print(notas_ajustadas)          # → [8.5 9.  7.2 10.1]
print(notas.mean())             # média: 7.7
print(notas.max(), notas.min()) # 9.1 6.2`,
      },
      {
        lang: "python",
        code: `import numpy as np

# array bidimensional (matriz): linhas x colunas
matriz = np.array([
    [1, 2, 3],
    [4, 5, 6],
])
print(matriz.shape)  # → (2, 3): 2 linhas, 3 colunas
print(matriz.ndim)   # → 2 dimensões
print(matriz.sum(axis=0))  # soma por coluna → [5 7 9]
print(matriz.sum(axis=1))  # soma por linha  → [ 6 15]`,
      },
      {
        lang: "python",
        code: `import numpy as np

# atalhos para criar arrays sem digitar valores
zeros = np.zeros(5)              # [0. 0. 0. 0. 0.]
uns   = np.ones((2, 3))          # matriz 2x3 cheia de 1
seq   = np.arange(0, 10, 2)      # [0 2 4 6 8] — como range()
linsp = np.linspace(0, 1, 5)     # 5 pontos igualmente espaçados de 0 a 1
print(linsp)  # → [0.   0.25 0.5  0.75 1.  ]`,
      },
      {
        lang: "python",
        code: `import numpy as np
import time

# por que NumPy é mais rápido? medindo a diferença
n = 1_000_000
lista = list(range(n))
arr = np.arange(n)

t0 = time.perf_counter()
soma_lista = sum(x * 2 for x in lista)
t1 = time.perf_counter()
soma_arr = (arr * 2).sum()
t2 = time.perf_counter()

print(f"lista: {t1 - t0:.4f}s")  # bem mais lento
print(f"numpy: {t2 - t1:.4f}s")  # tipicamente 20x a 100x mais rápido`,
      },
    ],
    points: [
      "Importe sempre como `import numpy as np` — convenção respeitada por toda a comunidade.",
      "Arrays NumPy guardam apenas um tipo de dado (homogêneos), enquanto listas Python aceitam tipos misturados.",
      "Operações vetorizadas (sem for) são quase sempre dezenas de vezes mais rápidas que loops em Python puro.",
      "`shape` informa as dimensões; `dtype` informa o tipo; `ndim` informa quantos eixos existem.",
      "Use `axis=0` para operar nas colunas e `axis=1` para operar nas linhas.",
      "Armadilha: `np.array([1, 2, 'oi'])` converte tudo para string silenciosamente — confira sempre o `dtype`.",
      "Armadilha: arrays não crescem como listas; criar com `np.append` em loop é lento. Pré-aloque com `np.zeros` ou junte tudo com `np.concatenate` no fim.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando precisar performance, pergunte sempre: 'dá para escrever isso sem for?'. A resposta quase sempre é sim, usando operações vetorizadas.",
      },
      {
        type: "warning",
        content: "Atribuir um valor float em um array de inteiros trunca o número silenciosamente. Crie arrays já com `dtype=float` se for trabalhar com decimais.",
      },
      {
        type: "info",
        content: "NumPy tem mais de 600 funções. Não tente decorar tudo: foque em criar, indexar, fatiar e aplicar agregações como `mean`, `sum` e `std`.",
      },
    ],
  },

  {
    slug: "numpy-broadcasting",
    section: "data-ml",
    title: "NumPy: broadcasting e indexação",
    difficulty: "intermediario",
    subtitle: "Operando entre shapes diferentes sem escrever loops.",
    intro: `Imagine uma planilha com a temperatura de 7 dias em 3 cidades (uma matriz 7x3). Você quer subtrair a média de cada cidade para ver o desvio. As médias formam um vetor de 3 números. Como Python sabe encaixar um vetor de 3 contra uma matriz 7x3?

Esse mecanismo se chama broadcasting. NumPy "estica" mentalmente o array menor para que ele se alinhe ao maior, sem realmente copiar memória. É um dos truques mais poderosos (e confusos) da biblioteca: dominá-lo é o que separa quem escreve fors lentos de quem escreve uma única linha rápida.

Junto com broadcasting, você precisa entender indexação avançada: pegar a terceira coluna, todas as linhas onde a temperatura passou de 30 graus, ou trocar valores que sejam negativos por zero. Tudo isso sem for, com fatias (\`[:, 1]\`), máscaras booleanas (\`arr[arr > 30]\`) e listas de índices. Este capítulo dá os atalhos que você vai usar todo dia em pandas e scikit-learn.`,
    codes: [
      {
        lang: "python",
        code: `import numpy as np

# indexação básica é parecida com listas, mas com um detalhe novo: vírgula
matriz = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
])
print(matriz[0, 2])    # linha 0, coluna 2 → 30
print(matriz[:, 1])    # TODAS as linhas, coluna 1 → [20 50 80]
print(matriz[1, :])    # linha 1, todas as colunas → [40 50 60]
print(matriz[0:2, 1:]) # submatriz: linhas 0-1, colunas 1 em diante`,
      },
      {
        lang: "python",
        code: `import numpy as np

# máscara booleana: filtra por condição sem if/for
temperaturas = np.array([22, 31, 28, 35, 19, 33])
quentes = temperaturas > 30           # array de True/False
print(quentes)                        # → [F  T  F  T  F  T]
print(temperaturas[quentes])          # → [31 35 33]
print(temperaturas[temperaturas > 30])# mesma coisa, em uma linha`,
      },
      {
        lang: "python",
        code: `import numpy as np

# alterar valores por máscara: sem for, sem if
notas = np.array([5.0, 8.0, 4.5, 9.1, 6.0])
notas[notas < 6] = 6     # arredonda para 6 quem reprovou
print(notas)             # → [6.  8.  6.  9.1 6. ]`,
      },
      {
        lang: "python",
        code: `import numpy as np

# BROADCASTING: array pequeno se ajusta ao grande
# 3 cidades x 4 dias de temperatura
temp = np.array([
    [22, 24, 23, 25],   # São Paulo
    [30, 31, 29, 32],   # Recife
    [18, 20, 19, 17],   # Curitiba
])
medias = temp.mean(axis=1)         # uma média por cidade → shape (3,)
print(medias)                      # → [23.5 30.5 18.5]

# para subtrair uma média por linha precisamos transformar (3,) em (3, 1)
desvio = temp - medias.reshape(3, 1)
print(desvio)`,
      },
      {
        lang: "python",
        code: `import numpy as np

# regras de broadcasting (resumo prático):
# dimensões compatíveis quando são iguais OU uma delas é 1
a = np.array([[1], [2], [3]])  # shape (3, 1)
b = np.array([10, 20, 30])     # shape (3,) — vira (1, 3)
print(a + b)
# → [[11 21 31]
#    [12 22 32]
#    [13 23 33]]`,
      },
      {
        lang: "python",
        code: `import numpy as np

# indexação por lista (fancy indexing): pega itens em qualquer ordem
nomes = np.array(["Ana", "Bruno", "Carla", "Davi", "Eva"])
print(nomes[[0, 2, 4]])     # → ['Ana' 'Carla' 'Eva']
print(nomes[[-1, -2]])      # últimos dois → ['Eva' 'Davi']

# erro clássico de broadcasting incompatível
x = np.ones((3, 4))
y = np.ones((2, 4))
# x + y  →  ValueError: operands could not be broadcast together (3,4) (2,4)`,
      },
    ],
    points: [
      "Use vírgula para separar dimensões: `arr[linha, coluna]`, não `arr[linha][coluna]` (isso funciona mas é mais lento).",
      "`:` significa 'todos' naquele eixo; combine com fatias para extrair submatrizes.",
      "Máscara booleana é o filtro do NumPy — substitui o filter() do Python puro com mais velocidade.",
      "Broadcasting funciona quando, comparando os shapes da direita pra esquerda, cada par é igual ou um vale 1.",
      "Use `reshape(-1, 1)` para transformar um vetor em coluna; `-1` significa 'calcule o tamanho automaticamente'.",
      "Armadilha: fatia retorna VIEW (vista) do array original; alterar a fatia altera o original. Use `.copy()` se precisar duplicar.",
      "Armadilha: ao misturar máscaras, use `&`, `|` e `~`, nunca `and`, `or` e `not` — esses não funcionam em arrays.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando ver um ValueError sobre broadcasting, imprima `arr.shape` dos dois lados. O erro aponta a dimensão incompatível e geralmente um `reshape` resolve.",
      },
      {
        type: "danger",
        content: "Misturar `and` com arrays causa o erro 'truth value of an array is ambiguous'. Use `&` entre parênteses: `(a > 0) & (a < 10)`.",
      },
      {
        type: "success",
        content: "Sempre que escrever um for em cima de um array NumPy, pare e pense: existe uma operação vetorizada equivalente? Quase sempre existe e é mais legível.",
      },
      {
        type: "info",
        content: "Em pandas, indexação e broadcasting funcionam de forma muito parecida. Aprender bem em NumPy economiza retrabalho depois.",
      },
    ],
  },

  {
    slug: "pandas-intro",
    section: "data-ml",
    title: "pandas: DataFrames",
    difficulty: "intermediario",
    subtitle: "A planilha programática do Python.",
    intro: `Se você já mexeu em Excel ou Google Sheets, pandas vai parecer familiar logo de cara. Um DataFrame é uma tabela: linhas são registros (clientes, vendas, leituras de sensor) e colunas são atributos (nome, preço, data). A diferença é que, em vez de clicar e arrastar, você manipula tudo com código — o que torna o trabalho repetível e auditável.

Pandas é construído em cima de NumPy, então herda toda a velocidade dos arrays, mas adiciona algo essencial: rótulos. Cada coluna tem um nome, cada linha tem um índice. Você não precisa lembrar 'a coluna 3 é o preço'; basta escrever \`df["preco"]\`. Isso muda completamente como você lê e escreve análises de dados.

Neste capítulo você vai criar DataFrames, ler arquivos CSV, selecionar partes da tabela, filtrar linhas e calcular agregações. É a porta de entrada para qualquer trabalho com dados em Python — desde uma análise rápida até o pré-processamento de um modelo de machine learning.`,
    codes: [
      {
        lang: "bash",
        code: `pip install pandas`,
      },
      {
        lang: "python",
        code: `import pandas as pd

# criando um DataFrame a partir de um dicionário
# chaves viram nomes de coluna, listas viram dados
vendas = pd.DataFrame({
    "produto": ["Caneta", "Caderno", "Borracha", "Caneta"],
    "preco":   [3.50, 22.00, 1.20, 3.50],
    "qtd":     [10, 4, 25, 7],
})
print(vendas)
#     produto  preco  qtd
# 0   Caneta    3.50   10
# 1   Caderno  22.00    4
# 2   Borracha  1.20   25
# 3   Caneta    3.50    7`,
      },
      {
        lang: "python",
        code: `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["Caneta", "Caderno", "Borracha"],
    "preco":   [3.50, 22.00, 1.20],
    "qtd":     [10, 4, 25],
})

# selecionar coluna: retorna uma Series (vetor com rótulo)
print(vendas["preco"])

# selecionar várias colunas: lista dentro do colchete → DataFrame
print(vendas[["produto", "preco"]])

# criar coluna nova com aritmética entre colunas (vetorizado)
vendas["total"] = vendas["preco"] * vendas["qtd"]
print(vendas)`,
      },
      {
        lang: "python",
        code: `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["Caneta", "Caderno", "Borracha", "Caneta"],
    "preco":   [3.50, 22.00, 1.20, 3.50],
    "qtd":     [10, 4, 25, 7],
})

# filtrar linhas com máscara booleana, igual ao NumPy
caras = vendas[vendas["preco"] > 5]
print(caras)

# combinar condições: use & (e), | (ou), entre parênteses
muitas_canetas = vendas[(vendas["produto"] == "Caneta") & (vendas["qtd"] > 5)]
print(muitas_canetas)`,
      },
      {
        lang: "python",
        code: `import pandas as pd

# loc usa rótulos, iloc usa posições inteiras
df = pd.DataFrame(
    {"nota": [7, 8, 9], "faltas": [2, 0, 1]},
    index=["Ana", "Bruno", "Carla"],
)
print(df.loc["Ana"])             # linha pelo rótulo
print(df.loc["Ana", "nota"])     # célula específica → 7
print(df.iloc[0])                # primeira linha (posição)
print(df.iloc[0:2, 0])           # fatia por posição`,
      },
      {
        lang: "python",
        code: `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["Caneta", "Caderno", "Borracha", "Caneta"],
    "preco":   [3.50, 22.00, 1.20, 3.50],
    "qtd":     [10, 4, 25, 7],
})

# describe(): resumo estatístico das colunas numéricas
print(vendas.describe())

# groupby: agrupa por produto e soma a quantidade vendida
total_por_produto = vendas.groupby("produto")["qtd"].sum()
print(total_por_produto)
# produto
# Borracha    25
# Caderno      4
# Caneta      17`,
      },
      {
        lang: "python",
        code: `import pandas as pd

# lendo e escrevendo arquivos: o uso mais comum no dia a dia
df = pd.read_csv("vendas.csv")          # tab/separador automático
print(df.head())                         # 5 primeiras linhas
print(df.info())                         # tipos e quantos não-nulos
print(df.shape)                          # (linhas, colunas)

df.to_csv("vendas_tratadas.csv", index=False)
df.to_excel("vendas.xlsx", index=False)  # requer pip install openpyxl`,
      },
    ],
    points: [
      "DataFrame é tabela com rótulos; Series é uma coluna ou linha isolada (vetor rotulado).",
      "Acesse colunas com `df['nome']` ou `df.nome` — a primeira forma sempre funciona, a segunda quebra com nomes que têm espaço.",
      "`loc` indexa por rótulo, `iloc` indexa por posição inteira. Confundir os dois é o erro número 1 de iniciantes.",
      "Filtre linhas com máscara booleana e combine com `&` e `|`, sempre entre parênteses.",
      "`groupby` é o coração da análise: agrupa por uma coluna e aplica uma agregação (sum, mean, count).",
      "`head()`, `info()`, `describe()` e `shape` são seus quatro primeiros comandos ao abrir qualquer dataset novo.",
      "Armadilha: `df['preco'] * 1.1` cria um novo Series; ele só altera o DataFrame se você atribuir de volta a uma coluna.",
      "Armadilha: ler CSV brasileiro pode exigir `pd.read_csv(..., sep=';', decimal=',', encoding='latin-1')`.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre comece a explorar um dataset novo com `df.head()`, `df.info()` e `df.describe()`. São 3 segundos que evitam horas de confusão.",
      },
      {
        type: "warning",
        content: "Operações em pandas geralmente retornam uma cópia. Se você fizer `df.dropna()` sem atribuir de volta, o DataFrame original fica intacto.",
      },
      {
        type: "info",
        content: "Pandas aceita ler CSV, Excel, JSON, Parquet, SQL e até HTML. O método é sempre `pd.read_<formato>` e a saída é sempre um DataFrame.",
      },
    ],
  },

  {
    slug: "pandas-limpeza",
    section: "data-ml",
    title: "pandas: limpeza de dados",
    difficulty: "intermediario",
    subtitle: "Tratando dados sujos do mundo real.",
    intro: `Na faculdade, os datasets vêm prontinhos. No mundo real, é o oposto: planilhas com células vazias, datas escritas como texto, valores duplicados, nomes com espaços extras, números registrados com vírgula em vez de ponto. Estima-se que cientistas de dados gastem de 60 a 80 por cento do tempo apenas limpando e organizando dados antes de qualquer análise séria.

Pandas tem ferramentas afiadas para esse trabalho. Você vai aprender a localizar valores ausentes (NaN), decidir entre apagar ou preencher, eliminar duplicatas, converter tipos (texto para número, texto para data), padronizar strings (caixa baixa, sem acento) e renomear colunas para nomes amigáveis. São poucos métodos, mas você vai usá-los todo santo dia.

A ideia central é: nunca confie nos dados antes de inspecioná-los. Cada \`read_csv\` deve ser seguido de uma rotina rápida de auditoria. Este capítulo mostra essa rotina passo a passo, usando exemplos próximos do que você encontra em planilhas brasileiras de verdade.`,
    codes: [
      {
        lang: "python",
        code: `import pandas as pd
import numpy as np

# dataset bagunçado, parecido com o que você recebe na vida real
df = pd.DataFrame({
    "nome":   ["  Ana ", "Bruno", "ana", None, "Bruno"],
    "idade":  [28, np.nan, 28, 35, np.nan],
    "salario":["3.500,00", "4.200,00", "3.500,00", "5.000,00", "4.200,00"],
})
print(df)
print(df.info())   # mostra tipos e quantos valores não-nulos`,
      },
      {
        lang: "python",
        code: `import pandas as pd

df = pd.DataFrame({"a": [1, None, 3], "b": [None, 2, 3]})

# detectar nulos
print(df.isna())                # tabela de True/False
print(df.isna().sum())          # quantos nulos por coluna

# remover linhas com qualquer NaN
print(df.dropna())

# preencher com um valor (fillna)
print(df.fillna(0))

# preencher coluna a coluna com a média
df["a"] = df["a"].fillna(df["a"].mean())
print(df)`,
      },
      {
        lang: "python",
        code: `import pandas as pd

df = pd.DataFrame({
    "nome": ["Ana", "Bruno", "Ana", "Carla"],
    "cpf":  ["111", "222", "111", "333"],
})

# duplicates: marca True para repetições (mantém a primeira por padrão)
print(df.duplicated())

# remover duplicatas considerando todas as colunas
sem_dup = df.drop_duplicates()

# considerando apenas o CPF (mais preciso para identificar pessoa)
sem_dup_cpf = df.drop_duplicates(subset="cpf")
print(sem_dup_cpf)`,
      },
      {
        lang: "python",
        code: `import pandas as pd

df = pd.DataFrame({
    "preco_str": ["R$ 1.299,90", "R$ 89,50", "R$ 12,00"],
    "data_str":  ["10/01/2024", "15/03/2024", "02/12/2023"],
})

# de string brasileira para float: tira R$, ponto de milhar e troca vírgula
df["preco"] = (
    df["preco_str"]
    .str.replace("R$", "", regex=False)
    .str.replace(".", "", regex=False)
    .str.replace(",", ".", regex=False)
    .str.strip()
    .astype(float)
)

# de string para datetime, especificando o formato dia/mês/ano
df["data"] = pd.to_datetime(df["data_str"], format="%d/%m/%Y")
print(df.dtypes)
print(df)`,
      },
      {
        lang: "python",
        code: `import pandas as pd

df = pd.DataFrame({"Nome Completo": ["  Ana SILVA ", "bruno costa "]})

# padronizar strings: tira espaços e deixa em Title Case
df["Nome Completo"] = df["Nome Completo"].str.strip().str.title()

# renomear colunas para nomes amigáveis (sem espaço, minúsculo)
df = df.rename(columns={"Nome Completo": "nome"})
print(df)
#         nome
# 0   Ana Silva
# 1  Bruno Costa`,
      },
      {
        lang: "python",
        code: `import pandas as pd

df = pd.DataFrame({"idade": [10, 25, 40, 65, 80]})

# criar categoria a partir de números (faixa etária)
def faixa(idade: int) -> str:
    if idade < 18:
        return "menor"
    if idade < 60:
        return "adulto"
    return "idoso"

df["faixa"] = df["idade"].apply(faixa)
print(df)
# pd.cut também serve, e é mais rápido para faixas numéricas:
df["faixa2"] = pd.cut(df["idade"], bins=[0, 17, 59, 120], labels=["menor", "adulto", "idoso"])
print(df)`,
      },
    ],
    points: [
      "`isna().sum()` é o primeiro raio-X: mostra exatamente quantos buracos há em cada coluna.",
      "Decidir entre apagar (`dropna`) ou preencher (`fillna`) depende do contexto — apagar é simples mas pode jogar fora muito dado.",
      "Use `drop_duplicates(subset=...)` quando uma coluna identifica de fato a entidade (CPF, e-mail, ID).",
      "Converta strings para número e datas o quanto antes; deixar tipo 'object' atrasa toda a análise depois.",
      "Métodos `.str.algo` operam em todas as células de uma coluna de texto, sem for.",
      "`apply()` é flexível mas lento; sempre que existir um método vetorizado equivalente, prefira-o.",
      "Armadilha: NaN não é igual a NaN. Comparar com `==` não funciona; use `isna()`.",
      "Armadilha: chained assignment como `df[df.a > 0]['b'] = 1` pode disparar SettingWithCopyWarning. Use `df.loc[df.a > 0, 'b'] = 1`.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Se aparecer SettingWithCopyWarning, não ignore. Significa que sua atribuição pode estar acontecendo em uma cópia, não no DataFrame que você acha que está alterando.",
      },
      {
        type: "tip",
        content: "Renomeie todas as colunas para snake_case e em minúsculas logo no começo: facilita digitar e evita esquecer maiúsculas depois.",
      },
      {
        type: "danger",
        content: "Nunca substitua valores ausentes pela média sem pensar. Em colunas como salário, isso distorce a análise. Considere mediana, valor por grupo, ou simplesmente marcar como 'desconhecido'.",
      },
      {
        type: "info",
        content: "Para CSVs brasileiros, o combo mais comum é `pd.read_csv('a.csv', sep=';', decimal=',', encoding='latin-1')`. Teste essas três opções quando vier 'lixo' na tela.",
      },
    ],
  },

  {
    slug: "matplotlib",
    section: "data-ml",
    title: "matplotlib: gráficos",
    difficulty: "intermediario",
    subtitle: "A biblioteca clássica de visualização.",
    intro: `Olhar para um DataFrame com mil linhas é como tentar entender um filme lendo a transcrição. Um gráfico, mesmo simples, transforma números em padrões que o cérebro reconhece num piscar. Matplotlib é a biblioteca de gráficos mais antiga e influente do Python: praticamente todas as outras (seaborn, pandas plotting, parte do plotly) nasceram em cima dela.

Ela tem fama de ter API meio confusa. A razão é histórica: existem duas formas de usar — o estilo "pyplot", parecido com o MATLAB, e o estilo orientado a objetos, com \`figure\` e \`axes\`. Você vai começar com pyplot porque é o mais rápido para gráficos simples, e depois aprender o estilo OO para quando precisar montar painéis com vários gráficos.

Neste capítulo você vai fazer linha, barra, dispersão e histograma — os quatro tipos que cobrem 90 por cento do que se faz no dia a dia. E vai aprender a customizar título, eixos, legenda e cores para que o gráfico conte a história sozinho.`,
    codes: [
      {
        lang: "bash",
        code: `pip install matplotlib`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt

# gráfico de linha mais simples possível
meses = ["Jan", "Fev", "Mar", "Abr", "Mai"]
vendas = [120, 150, 90, 200, 220]

plt.plot(meses, vendas)
plt.title("Vendas por mês")
plt.xlabel("Mês")
plt.ylabel("Unidades vendidas")
plt.show()  # abre janela; em Jupyter, exibe inline`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt

# várias linhas no mesmo gráfico (comparando categorias)
meses = ["Jan", "Fev", "Mar", "Abr", "Mai"]
loja_a = [120, 150, 90, 200, 220]
loja_b = [100, 130, 140, 180, 210]

plt.plot(meses, loja_a, label="Loja A", marker="o")
plt.plot(meses, loja_b, label="Loja B", marker="s", linestyle="--")
plt.title("Vendas mensais por loja")
plt.legend()             # mostra a caixa com os rótulos
plt.grid(True)           # quadriculado para facilitar a leitura
plt.show()`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt

# gráfico de barras: ótimo para comparar categorias
produtos = ["Caneta", "Caderno", "Borracha", "Lápis"]
qtd = [120, 80, 200, 150]

plt.bar(produtos, qtd, color=["#0ea5e9", "#22c55e", "#ef4444", "#f59e0b"])
plt.title("Quantidade vendida por produto")
plt.ylabel("Unidades")
plt.show()`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt
import numpy as np

# dispersão (scatter): cada ponto é um par (x, y)
np.random.seed(0)
horas_estudo = np.random.uniform(0, 10, 50)
nota = horas_estudo * 0.8 + np.random.normal(0, 1, 50)

plt.scatter(horas_estudo, nota, alpha=0.7)
plt.title("Horas de estudo x Nota")
plt.xlabel("Horas estudadas")
plt.ylabel("Nota")
plt.show()`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt
import numpy as np

# histograma: distribuição de uma variável
alturas = np.random.normal(loc=170, scale=10, size=1000)

plt.hist(alturas, bins=30, edgecolor="black")
plt.title("Distribuição de alturas")
plt.xlabel("Altura (cm)")
plt.ylabel("Frequência")
plt.show()`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt
import numpy as np

# múltiplos gráficos em um painel — estilo orientado a objetos
x = np.linspace(0, 10, 100)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))  # 1 linha, 2 colunas
axes[0].plot(x, np.sin(x))
axes[0].set_title("Seno")
axes[1].plot(x, np.cos(x), color="red")
axes[1].set_title("Cosseno")

fig.suptitle("Funções trigonométricas")
fig.tight_layout()
plt.savefig("grafico.png", dpi=150)  # salva em arquivo
plt.show()`,
      },
    ],
    points: [
      "`plt.show()` exibe a figura; em Jupyter Notebook ela aparece automaticamente abaixo da célula.",
      "Sempre coloque título, rótulos de eixo e legenda — gráfico sem eixos rotulados não comunica nada.",
      "`plot` para linhas, `bar` para barras, `scatter` para dispersão, `hist` para distribuição.",
      "Use `subplots` para montar painéis: `fig, axes = plt.subplots(linhas, colunas)`.",
      "`plt.savefig('arquivo.png', dpi=150)` salva a figura; chame ANTES de `plt.show()` para evitar uma figura em branco.",
      "Cores aceitam nome ('red'), código hex ('#0ea5e9') ou letra abreviada ('r', 'b', 'g').",
      "Armadilha: chamar `plt.plot` várias vezes seguidas sem fechar a figura empilha tudo no mesmo gráfico, o que pode confundir.",
      "Armadilha: escala automática pode esconder padrões; ajuste `plt.ylim()` ou `plt.xlim()` quando necessário.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Em Jupyter, adicione `%matplotlib inline` na primeira célula. Em alguns ambientes, isso garante que os gráficos apareçam dentro do notebook.",
      },
      {
        type: "info",
        content: "DataFrames têm método `.plot()` que usa matplotlib por baixo. Para gráficos rápidos, `df['vendas'].plot(kind='bar')` já resolve.",
      },
      {
        type: "warning",
        content: "O estilo padrão do matplotlib é simples demais para apresentações. Use `plt.style.use('ggplot')` ou parta para o seaborn quando o visual importa.",
      },
    ],
  },

  {
    slug: "seaborn",
    section: "data-ml",
    title: "seaborn: gráficos estatísticos",
    difficulty: "intermediario",
    subtitle: "Visualização bonita por padrão.",
    intro: `Matplotlib funciona, mas exige muitas linhas para conseguir um gráfico bonito e estatisticamente útil. Seaborn é uma camada construída em cima dele que resolve isso. Em uma única linha, você gera um boxplot por categoria com cores escolhidas a dedo, ou um mapa de calor de correlações pronto para colocar em um relatório.

A força do seaborn é entender DataFrames diretamente. Você passa o DataFrame e diz "x é essa coluna, y é essa, separe por essa terceira" — e ele cuida de agrupar, calcular média ou intervalo de confiança, escolher paleta e legendar tudo. Isso reduz o atrito de explorar dados visualmente.

Neste capítulo você vai conhecer os gráficos mais usados em análise estatística: histograma com densidade, boxplot para detectar outliers, scatter com regressão, mapa de calor de correlação e pairplot para olhar tudo contra tudo de uma vez. São ferramentas para a fase de exploração — quando você ainda está descobrindo o que os dados têm a dizer.`,
    codes: [
      {
        lang: "bash",
        code: `pip install seaborn`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

# seaborn vem com datasets prontos para experimentar
tips = sns.load_dataset("tips")
print(tips.head())

# distribuição de uma variável com curva de densidade por cima
sns.histplot(data=tips, x="total_bill", kde=True)
plt.title("Distribuição da conta total")
plt.show()`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

# boxplot: caixa, mediana, quartis e outliers, separado por categoria
sns.boxplot(data=tips, x="day", y="total_bill", hue="sex")
plt.title("Conta por dia, separada por sexo")
plt.show()`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

# scatter com linha de regressão automática
sns.regplot(data=tips, x="total_bill", y="tip")
plt.title("Gorjeta x Conta total")
plt.show()`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

# mapa de calor de correlação entre colunas numéricas
corr = tips.select_dtypes("number").corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", center=0)
plt.title("Correlação entre variáveis numéricas")
plt.show()`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

# pairplot: matriz de scatters de todas as variáveis contra todas
sns.pairplot(iris, hue="species")
plt.show()`,
      },
      {
        lang: "python",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

# tema global: muda fonte, cores e fundo de uma vez
sns.set_theme(style="whitegrid", palette="pastel")

tips = sns.load_dataset("tips")
sns.barplot(data=tips, x="day", y="total_bill", estimator="mean", errorbar=("ci", 95))
plt.title("Conta média por dia (com IC 95%)")
plt.show()`,
      },
    ],
    points: [
      "Seaborn é matplotlib em modo turbo: aceita os mesmos comandos `plt.title`, `plt.savefig` etc.",
      "Passe sempre `data=df` e use os NOMES das colunas em `x`, `y` e `hue` — é a sintaxe mais legível.",
      "`hue` separa por uma terceira variável categórica, criando cores diferentes automaticamente.",
      "`histplot` com `kde=True` mostra distribuição e suavização ao mesmo tempo.",
      "`heatmap` da matriz de correlação é o jeito mais rápido de ver quais variáveis se movem juntas.",
      "`pairplot` é caro de calcular com muitas colunas — reserve para datasets pequenos ou amostras.",
      "Armadilha: `sns.set_theme()` muda o estilo de TODOS os gráficos seguintes, inclusive matplotlib puro.",
      "Armadilha: gráficos de barra de seaborn mostram média e intervalo de confiança por padrão, não soma. Use `estimator='sum'` se for o que você quer.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para apresentações, `sns.set_theme(context='talk')` aumenta fontes e linhas. Para artigos, use `context='paper'`.",
      },
      {
        type: "info",
        content: "Os datasets de exemplo (tips, iris, titanic, penguins) são ótimos para praticar antes de aplicar nas suas próprias planilhas.",
      },
      {
        type: "warning",
        content: "Quando seaborn não dá controle suficiente, lembre-se: o objeto retornado é um Axes do matplotlib. Você pode customizar tudo com `ax.set_...` depois.",
      },
    ],
  },

  {
    slug: "plotly",
    section: "data-ml",
    title: "plotly: gráficos interativos",
    difficulty: "intermediario",
    subtitle: "Visualizações interativas para web.",
    intro: `Matplotlib e seaborn produzem imagens estáticas, perfeitas para relatórios em PDF. Mas e quando você quer entregar um gráfico em uma página web, com tooltip ao passar o mouse, zoom, filtro e seleção de pontos? Aí entra o Plotly.

Plotly gera gráficos como objetos JavaScript que rodam no navegador. Em Jupyter, você ganha interatividade dentro do notebook. Em uma aplicação web (com Dash, Streamlit ou Flask), o gráfico vira componente real. E para análise pessoal, abrir uma exploração interativa na própria tela costuma revelar coisas que um PNG estático esconde.

A interface mais usada é a \`plotly.express\` — uma camada simples, parecida com seaborn, em que cada tipo de gráfico é uma função (\`px.bar\`, \`px.line\`, \`px.scatter\`). Neste capítulo você vai gerar gráficos prontos para web, exportá-los como HTML para enviar por e-mail e descobrir mapas e dashboards básicos.`,
    codes: [
      {
        lang: "bash",
        code: `pip install plotly pandas`,
      },
      {
        lang: "python",
        code: `import plotly.express as px

# plotly traz alguns datasets de exemplo
df = px.data.gapminder().query("year == 2007")

# scatter interativo: cada ponto é um país
fig = px.scatter(
    df,
    x="gdpPercap", y="lifeExp",
    size="pop", color="continent",
    hover_name="country",
    log_x=True,
    title="Vida x PIB per capita (2007)",
)
fig.show()`,
      },
      {
        lang: "python",
        code: `import plotly.express as px

vendas = px.data.tips()
# barras agrupadas por dia e por refeição (almoço/jantar)
fig = px.bar(
    vendas,
    x="day", y="total_bill",
    color="time",
    barmode="group",
    title="Conta por dia e período",
)
fig.show()`,
      },
      {
        lang: "python",
        code: `import plotly.express as px

# linha temporal interativa
df = px.data.stocks()
fig = px.line(df, x="date", y=["GOOG", "AAPL", "MSFT"], title="Preço de ações")
fig.update_layout(yaxis_title="Preço relativo", xaxis_title="Data")
fig.show()`,
      },
      {
        lang: "python",
        code: `import plotly.express as px

# mapa coroplético do mundo (cor por país)
df = px.data.gapminder().query("year == 2007")
fig = px.choropleth(
    df,
    locations="iso_alpha", color="lifeExp",
    hover_name="country",
    color_continuous_scale="Viridis",
    title="Expectativa de vida no mundo (2007)",
)
fig.show()`,
      },
      {
        lang: "python",
        code: `import plotly.express as px

df = px.data.iris()
fig = px.scatter_matrix(
    df,
    dimensions=["sepal_width", "sepal_length", "petal_width", "petal_length"],
    color="species",
)
fig.show()

# salvar como HTML para abrir em qualquer navegador, sem Python
fig.write_html("grafico_iris.html")`,
      },
      {
        lang: "python",
        code: `import plotly.graph_objects as go

# plotly.graph_objects é a API de baixo nível, mais detalhista
fig = go.Figure()
fig.add_trace(go.Bar(name="2023", x=["Q1", "Q2", "Q3", "Q4"], y=[120, 150, 180, 200]))
fig.add_trace(go.Bar(name="2024", x=["Q1", "Q2", "Q3", "Q4"], y=[140, 170, 210, 230]))
fig.update_layout(barmode="group", title="Receita trimestral")
fig.show()`,
      },
    ],
    points: [
      "Use `plotly.express` (`import plotly.express as px`) para 90 por cento dos casos — é a API simples.",
      "Cada função `px.algo` retorna um objeto Figure, e Figure tem `.show()`, `.write_html()` e `.write_image()`.",
      "`hover_name`, `hover_data` e `color` são seus melhores amigos para dar interatividade útil.",
      "Para dashboards completos em Python, plotly é a base do framework Dash; em apps simples, use junto com Streamlit.",
      "Exportar como PNG (`write_image`) requer instalar `pip install kaleido`.",
      "Em ambientes que não exibem o gráfico, salve com `write_html` e abra o arquivo no navegador.",
      "Armadilha: gráficos plotly podem ficar pesados com mais de algumas dezenas de milhares de pontos; faça amostragem antes.",
      "Armadilha: o JSON gerado é grande; ao embutir vários gráficos numa página, prefira `include_plotlyjs='cdn'`.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando estiver no Jupyter e o gráfico não aparecer, tente `pip install -U notebook nbformat ipywidgets` e reinicie o kernel.",
      },
      {
        type: "info",
        content: "Plotly é gratuito para uso em projetos pessoais e comerciais (licença MIT). Os planos pagos da empresa cobrem hospedagem e dashboards, não a biblioteca.",
      },
      {
        type: "success",
        content: "Para apresentar resultados a quem não programa, exporte como HTML interativo: o destinatário só precisa abrir no navegador, sem Python instalado.",
      },
    ],
  },

  {
    slug: "jupyter",
    section: "data-ml",
    title: "Jupyter Notebooks",
    difficulty: "intermediario",
    subtitle: "Ambiente interativo para análise de dados.",
    intro: `Jupyter Notebook é uma forma diferente de escrever Python. Em vez de um arquivo .py executado de cima a baixo, você tem um documento dividido em células — cada célula contém código ou texto em Markdown. Você executa as células uma a uma e vê o resultado logo abaixo: tabelas, gráficos, prints. Isso transforma a análise em uma narrativa: cada passo aparece junto da explicação.

É o ambiente padrão para ciência de dados, ensino e prototipagem. Você abre um CSV, explora, gera gráficos, anota conclusões — tudo no mesmo arquivo .ipynb que pode ser compartilhado, versionado e revisado. Bibliotecas como pandas e matplotlib ganham vida no Jupyter porque mostram saída rica (tabelas formatadas, gráficos inline) sem precisar abrir janela separada.

Neste capítulo você vai instalar, conhecer JupyterLab e Notebook, aprender atalhos essenciais, comandos mágicos (\`%timeit\`, \`%matplotlib inline\`) e entender quando usar notebook e quando preferir um script .py tradicional.`,
    codes: [
      {
        lang: "bash",
        code: `# instale a versão moderna (JupyterLab)
pip install jupyterlab

# inicie o servidor; abre o navegador automaticamente
jupyter lab`,
      },
      {
        lang: "python",
        code: `# em uma célula de notebook, a ÚLTIMA expressão é exibida automaticamente
import pandas as pd

df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
df          # mostra a tabela formatada — não precisa de print()`,
      },
      {
        lang: "python",
        code: `# células de Markdown aceitam títulos, listas, links, fórmulas LaTeX
# (este bloco seria escrito em uma célula com tipo Markdown)
# # Análise de vendas — Q1 2024
#
# - Total de pedidos: **1.250**
# - Ticket médio: R$ 89,90
#
# A fórmula da média: $\\bar{x} = \\frac{1}{n}\\sum x_i$`,
      },
      {
        lang: "python",
        code: `# comandos mágicos começam com % (linha) ou %% (célula inteira)

# medir tempo de uma expressão
%timeit sum(range(100_000))

# tempo de uma célula inteira
%%time
total = 0
for i in range(1_000_000):
    total += i
print(total)`,
      },
      {
        lang: "python",
        code: `# integrar com gráficos (em alguns ambientes é necessário)
%matplotlib inline
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [10, 20, 15])
plt.title("Exemplo dentro do notebook")
plt.show()`,
      },
      {
        lang: "python",
        code: `# rodar comandos do shell direto da célula com !
!pip install seaborn
!ls
# pegar a saída para uma variável
arquivos = !ls
print(len(arquivos), "arquivos")`,
      },
      {
        lang: "bash",
        code: `# converter notebook em outros formatos
jupyter nbconvert --to html analise.ipynb     # vira HTML pronto para enviar
jupyter nbconvert --to pdf analise.ipynb      # requer LaTeX
jupyter nbconvert --to script analise.ipynb   # extrai só o código .py`,
      },
    ],
    points: [
      "Cada célula tem estado independente, mas as variáveis são compartilhadas pela ordem de execução.",
      "Atalhos importantes: Shift+Enter executa a célula, Esc + B cria célula nova abaixo, Esc + DD apaga.",
      "Use `df` (sem print) na última linha para ver a tabela bonita; com print, você perde a formatação rica.",
      "`%timeit` mede performance de uma linha; `%%time` mede a célula inteira.",
      "`!comando` executa shell — útil para pip install, ls, git status sem sair do notebook.",
      "Notebook é ótimo para exploração; quando o código vai para produção, transforme em scripts .py com funções e testes.",
      "Armadilha: rodar células fora de ordem cria estados inconsistentes. De vez em quando, faça 'Restart and Run All' para garantir reprodutibilidade.",
      "Armadilha: notebooks grandes ficam pesados no Git porque guardam saída inteira; use ferramentas como nbstripout para limpar antes de commitar.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use 'Restart and Run All' antes de compartilhar um notebook. Garante que ele funciona do zero, sem dependência da ordem em que você foi executando.",
      },
      {
        type: "info",
        content: "Google Colab é Jupyter hospedado de graça, com GPU opcional. Excelente para deep learning sem precisar configurar nada na sua máquina.",
      },
      {
        type: "warning",
        content: "Notebook não substitui código de produção. Para algo que outros vão importar, mantenha `.py` separados; o notebook é o caderno de laboratório.",
      },
    ],
  },

  {
    slug: "scikit-intro",
    section: "data-ml",
    title: "scikit-learn: ML clássico",
    difficulty: "avancado",
    subtitle: "A biblioteca de machine learning padrão do Python.",
    intro: `Machine learning, em essência, é ensinar um computador a tomar decisões a partir de exemplos. Você dá uma planilha de imóveis com preço, metragem e bairro — e pede um modelo que estime o preço de um imóvel novo. Você fornece e-mails marcados como spam ou não — e quer um classificador que decida sozinho daqui pra frente.

Scikit-learn (sklearn) é a biblioteca padrão para esse tipo de tarefa em Python. Ela cobre quase todo o "ML clássico" (sem redes neurais profundas): regressão, classificação, agrupamento, redução de dimensionalidade, seleção de features, métricas de avaliação. Sua API é tão consistente que aprender um modelo é aprender todos: tudo segue o ritual \`fit\` (treinar), \`predict\` (prever) e \`score\` (avaliar).

Neste capítulo você vai entender esse ritual, separar dados em treino e teste, ajustar um primeiro modelo simples e medir o quanto ele acertou. É a fundação para os capítulos seguintes, em que vamos para regressão, classificação e clustering específicos.`,
    codes: [
      {
        lang: "bash",
        code: `pip install scikit-learn pandas numpy`,
      },
      {
        lang: "python",
        code: `# o ritual sklearn em poucas linhas
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# 1) carregar os dados
X, y = load_iris(return_X_y=True)

# 2) separar em treino e teste (sempre!)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3) instanciar o modelo
modelo = DecisionTreeClassifier(random_state=42)

# 4) treinar
modelo.fit(X_train, y_train)

# 5) prever no teste e avaliar
pred = modelo.predict(X_test)
print("acurácia:", accuracy_score(y_test, pred))`,
      },
      {
        lang: "python",
        code: `from sklearn.datasets import load_iris
import pandas as pd

# entendendo a estrutura: X é matriz de features, y é vetor alvo
data = load_iris(as_frame=True)
print(data.frame.head())
print("formato de X:", data.data.shape)   # (150, 4) — 150 flores, 4 medidas
print("classes:", data.target_names)       # ['setosa' 'versicolor' 'virginica']`,
      },
      {
        lang: "python",
        code: `from sklearn.model_selection import train_test_split
import numpy as np

X = np.arange(20).reshape(10, 2)
y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])

# stratify mantém a proporção de classes em treino e teste
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)
print("classes no treino:", np.bincount(y_tr))
print("classes no teste:",  np.bincount(y_te))`,
      },
      {
        lang: "python",
        code: `from sklearn.preprocessing import StandardScaler
import numpy as np

# muitos modelos exigem features padronizadas (média 0, desvio 1)
X = np.array([[1.0, 200.0], [2.0, 300.0], [3.0, 400.0]])

scaler = StandardScaler()
X_padronizado = scaler.fit_transform(X)
print(X_padronizado.mean(axis=0))   # ≈ [0. 0.]
print(X_padronizado.std(axis=0))    # ≈ [1. 1.]`,
      },
      {
        lang: "python",
        code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=42)

# Pipeline: encadeia transformações + modelo em um só objeto
pipe = Pipeline([
    ("escalar", StandardScaler()),
    ("modelo",  LogisticRegression(max_iter=200)),
])
pipe.fit(X_tr, y_tr)
print("acurácia:", pipe.score(X_te, y_te))`,
      },
      {
        lang: "python",
        code: `from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)

# validação cruzada: avalia em vários cortes diferentes para reduzir o "azar"
modelo = DecisionTreeClassifier(random_state=0)
notas = cross_val_score(modelo, X, y, cv=5)
print("notas:", notas)
print("média:", notas.mean(), "± ", notas.std())`,
      },
    ],
    points: [
      "API uniforme: `modelo.fit(X, y)`, `modelo.predict(X_novo)`, `modelo.score(X, y)`. Todo modelo segue isso.",
      "X é sempre matriz 2D (linhas = exemplos, colunas = features). y é vetor 1D com o alvo.",
      "Sempre separe treino e teste antes de medir desempenho. Avaliar no próprio treino dá ilusão de alta performance.",
      "`random_state` torna o resultado reproduzível. Use sempre nos exemplos didáticos.",
      "Padronize features (`StandardScaler`) para modelos sensíveis a escala: regressão logística, SVM, KNN.",
      "Pipeline empacota pré-processamento + modelo, evita 'data leakage' ao treinar.",
      "Validação cruzada (`cross_val_score`) é mais confiável que uma única divisão treino/teste.",
      "Armadilha: `fit` no scaler deve usar SÓ o treino; aplicar nos dois com `fit_transform` vaza informação do teste.",
      "Armadilha: classes desbalanceadas exigem `stratify=y` no split e métricas além da acurácia.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Nunca chame `fit_transform` no conjunto de teste. Use `fit_transform` no treino e apenas `transform` no teste — isso é vazamento de dados clássico.",
      },
      {
        type: "tip",
        content: "Quando estiver em dúvida sobre qual modelo usar, comece com regressão logística (classificação) ou linear (regressão). São rápidos e servem de baseline para comparar.",
      },
      {
        type: "info",
        content: "A documentação do scikit-learn é referência mundial. Cada modelo tem exemplo executável; vale acessar antes de tentar adivinhar parâmetros.",
      },
    ],
  },

  {
    slug: "regressao",
    section: "data-ml",
    title: "Regressão linear",
    difficulty: "avancado",
    subtitle: "O modelo mais básico (e mais ensinado) de ML.",
    intro: `Regressão linear é o "olá mundo" do machine learning. A ideia é simples: você acredita que existe uma relação aproximadamente linear entre uma ou mais variáveis (features) e um número que você quer prever (alvo). Quanto mais metros quadrados, mais caro o imóvel. Quanto mais horas de estudo, melhor a nota. O modelo encontra a melhor reta (ou plano, em mais dimensões) que descreve essa relação.

Mesmo sendo simples, regressão linear é usada em produção até hoje: é rápida, fácil de interpretar (cada coeficiente diz quanto a feature impacta o alvo) e serve como baseline para qualquer problema mais complexo. Se o seu modelo sofisticado não bate uma regressão linear bem feita, algo está errado.

Neste capítulo você vai treinar um modelo de regressão, interpretar coeficientes, avaliar com R², MAE e RMSE, entender a diferença entre erro de treino e de teste, e ver onde a regressão linear quebra a cara — preparando o terreno para modelos mais expressivos.`,
    codes: [
      {
        lang: "python",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

# dataset minimalista: horas de estudo x nota
horas = np.array([[1], [2], [3], [4], [5]])   # X precisa ser 2D
nota  = np.array([5, 6, 7.5, 8, 9.5])

modelo = LinearRegression()
modelo.fit(horas, nota)

print("coeficiente angular:", modelo.coef_)        # quanto a nota sobe por hora
print("intercepto:", modelo.intercept_)            # nota estimada com 0 horas
print("previsão para 6h:", modelo.predict([[6]]))`,
      },
      {
        lang: "python",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# regressão múltipla: várias features
np.random.seed(0)
n = 200
metragem = np.random.uniform(40, 200, n)
quartos  = np.random.randint(1, 5, n)
preco    = 2500 * metragem + 30000 * quartos + np.random.normal(0, 20000, n)

X = np.column_stack([metragem, quartos])
y = preco

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
modelo = LinearRegression().fit(X_tr, y_tr)
pred = modelo.predict(X_te)

print("MAE:", mean_absolute_error(y_te, pred))   # erro médio em reais
print("RMSE:", mean_squared_error(y_te, pred, squared=False))
print("R²:",  r2_score(y_te, pred))              # quão bem explica os dados`,
      },
      {
        lang: "python",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

# interpretando coeficientes em problema real (didático)
X = np.array([
    [50, 1],   # 50 m², 1 quarto
    [80, 2],
    [120, 3],
    [150, 4],
])
y = np.array([200_000, 350_000, 500_000, 650_000])

m = LinearRegression().fit(X, y)
print("R$ por m²:", m.coef_[0])
print("R$ por quarto extra:", m.coef_[1])
print("intercepto (R$ base):", m.intercept_)`,
      },
      {
        lang: "python",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

# quando a relação não é reta: features polinomiais
np.random.seed(1)
x = np.linspace(-3, 3, 50).reshape(-1, 1)
y = 0.5 * x.ravel() ** 2 + np.random.normal(0, 0.5, 50)

modelo = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
modelo.fit(x, y)
print("R²:", modelo.score(x, y))`,
      },
      {
        lang: "python",
        code: `from sklearn.linear_model import Ridge, Lasso
from sklearn.datasets import make_regression

X, y = make_regression(n_samples=200, n_features=10, noise=10, random_state=0)

# Ridge e Lasso: regressão com regularização (penalizam coeficientes grandes)
ridge = Ridge(alpha=1.0).fit(X, y)
lasso = Lasso(alpha=0.5).fit(X, y)

print("Ridge R²:", ridge.score(X, y))
print("Lasso R²:", lasso.score(X, y))
print("coefs Lasso (alguns viram 0!):", lasso.coef_)`,
      },
      {
        lang: "python",
        code: `import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression

# visualizando o ajuste
horas = np.array([[1], [2], [3], [4], [5]])
nota  = np.array([5, 6, 7.5, 8, 9.5])
m = LinearRegression().fit(horas, nota)

xs = np.linspace(0, 6, 100).reshape(-1, 1)
plt.scatter(horas, nota, label="dados")
plt.plot(xs, m.predict(xs), color="red", label="reta ajustada")
plt.legend()
plt.title("Regressão linear simples")
plt.show()`,
      },
    ],
    points: [
      "Regressão prevê números contínuos (preço, temperatura, demanda), classificação prevê categorias.",
      "Coeficientes da regressão linear têm interpretação direta: quanto o alvo muda por unidade da feature.",
      "MAE é o erro médio absoluto (mesma unidade do alvo); RMSE penaliza erros grandes mais; R² varia de 0 a 1 (quanto da variação foi explicada).",
      "Se R² no treino é altíssimo e no teste é baixo, há overfitting — o modelo decorou em vez de generalizar.",
      "Use `PolynomialFeatures` quando a relação claramente não for reta; cuidado com grau alto e overfitting.",
      "Ridge e Lasso adicionam regularização; Lasso ainda zera coeficientes inúteis (útil para selecionar features).",
      "Padronize features quando usar Ridge ou Lasso — caso contrário, escalas diferentes distorcem a regularização.",
      "Armadilha: outliers afetam muito a regressão linear; visualize antes de confiar nos coeficientes.",
      "Armadilha: features muito correlacionadas entre si (colinearidade) tornam coeficientes instáveis.",
    ],
    alerts: [
      {
        type: "info",
        content: "Regressão linear assume que as variáveis são aproximadamente lineares com o alvo. Sempre faça um scatter antes de aplicar para ver se faz sentido.",
      },
      {
        type: "warning",
        content: "R² alto não garante modelo bom: pode ser overfitting, ou o problema pode exigir métrica diferente. Sempre confira erro no conjunto de teste, não só no treino.",
      },
      {
        type: "tip",
        content: "Quando muitas features são suspeitas de irrelevantes, comece com Lasso. Os coeficientes que ele zera te dizem quem provavelmente não está ajudando.",
      },
    ],
  },

  {
    slug: "classificacao",
    section: "data-ml",
    title: "Classificação",
    difficulty: "avancado",
    subtitle: "Prevendo categorias em vez de números.",
    intro: `Classificação é a tarefa de decidir a qual grupo um exemplo pertence. Esse e-mail é spam ou não? Esse cliente vai pagar ou ficar inadimplente? Essa imagem é gato, cachorro ou pássaro? São problemas onde a saída é uma etiqueta, não um número.

Em scikit-learn, classificação segue o mesmo ritual da regressão (\`fit\`, \`predict\`, \`score\`), mas troca o conjunto de modelos e, principalmente, as métricas de avaliação. Acurácia (porcentagem de acertos) é só o começo: quando as classes são desbalanceadas (poucos spams contra muitos legítimos), você precisa olhar precisão, revocação, F1 e a matriz de confusão para entender de verdade onde o modelo erra.

Neste capítulo você vai treinar regressão logística, k-NN e árvore de decisão, comparar resultados, ler uma matriz de confusão, decidir entre maximizar precisão ou revocação dependendo do contexto, e usar \`predict_proba\` quando precisar de uma probabilidade em vez de uma decisão dura.`,
    codes: [
      {
        lang: "python",
        code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score

# dataset clássico: tumor benigno (1) vs maligno (0)
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

modelo = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
modelo.fit(X_tr, y_tr)

pred = modelo.predict(X_te)
print("acurácia:", accuracy_score(y_te, pred))`,
      },
      {
        lang: "python",
        code: `from sklearn.metrics import (
    confusion_matrix, classification_report
)

# matriz de confusão: linhas = verdade, colunas = previsão
cm = confusion_matrix(y_te, pred)
print(cm)
# [[TN FP]
#  [FN TP]]

# relatório com precisão, revocação, F1 por classe
print(classification_report(y_te, pred, target_names=["maligno", "benigno"]))`,
      },
      {
        lang: "python",
        code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

# comparando vários modelos com a mesma divisão
modelos = {
    "k-NN":         make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
    "Árvore":       DecisionTreeClassifier(random_state=0),
    "Random Forest": RandomForestClassifier(n_estimators=200, random_state=0),
}
for nome, m in modelos.items():
    m.fit(X_tr, y_tr)
    print(nome, "→", m.score(X_te, y_te))`,
      },
      {
        lang: "python",
        code: `# probabilidade da classe, em vez da decisão dura
proba = modelo.predict_proba(X_te[:5])
print(proba)
# cada linha soma 1: [P(maligno), P(benigno)]

# usar limiar diferente do padrão (0.5) para ser mais conservador
import numpy as np
prev_conservadora = (proba[:, 1] >= 0.7).astype(int)
print(prev_conservadora)`,
      },
      {
        lang: "python",
        code: `from sklearn.metrics import roc_auc_score, roc_curve
import matplotlib.pyplot as plt

# AUC: qualidade do modelo independente de limiar (1.0 perfeito, 0.5 chute)
y_score = modelo.predict_proba(X_te)[:, 1]
print("AUC:", roc_auc_score(y_te, y_score))

fpr, tpr, _ = roc_curve(y_te, y_score)
plt.plot(fpr, tpr)
plt.plot([0, 1], [0, 1], "--", color="gray")
plt.xlabel("Falsos positivos")
plt.ylabel("Verdadeiros positivos")
plt.title("Curva ROC")
plt.show()`,
      },
      {
        lang: "python",
        code: `from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# busca por melhores hiperparâmetros via validação cruzada
param_grid = {
    "n_estimators": [100, 200, 500],
    "max_depth":    [None, 5, 10],
}
busca = GridSearchCV(
    RandomForestClassifier(random_state=0),
    param_grid, cv=5, scoring="f1",
)
busca.fit(X_tr, y_tr)
print("melhor combinação:", busca.best_params_)
print("F1 médio na CV:", busca.best_score_)`,
      },
    ],
    points: [
      "Acurácia engana com classes desbalanceadas; um modelo que sempre prevê a classe majoritária pode ter 95 por cento e ser inútil.",
      "Precisão = de tudo que previ positivo, quanto era de fato positivo. Foco em evitar falsos alarmes.",
      "Revocação (recall) = de tudo que era positivo, quanto eu peguei. Foco em não deixar caso passar.",
      "F1 é a média harmônica entre precisão e revocação — boa quando você quer um único número.",
      "`predict_proba` te devolve probabilidades; ajuste o limiar conforme o custo do erro.",
      "Use `stratify=y` no split para preservar a proporção de classes.",
      "GridSearchCV automatiza a busca pelos melhores hiperparâmetros via validação cruzada.",
      "Armadilha: se as features estão em escalas diferentes, modelos como k-NN e regressão logística sofrem; padronize antes.",
      "Armadilha: AUC alta não garante que o modelo é útil em produção — verifique também a calibração das probabilidades.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Em problemas como detecção de fraude ou diagnóstico, falso negativo costuma ser muito mais grave que falso positivo. Defina o que importa antes de escolher o limiar.",
      },
      {
        type: "tip",
        content: "Sempre olhe a matriz de confusão antes de declarar vitória. Ela revela vieses que a acurácia esconde.",
      },
      {
        type: "info",
        content: "Random Forest e Gradient Boosting (XGBoost, LightGBM) costumam ser as primeiras escolhas em problemas tabulares reais. Regressão logística serve como baseline.",
      },
    ],
  },

  {
    slug: "clustering",
    section: "data-ml",
    title: "Clustering: K-Means",
    difficulty: "avancado",
    subtitle: "Aprendizado não supervisionado: descobrir grupos.",
    intro: `Até agora todos os modelos eram supervisionados: você dava entrada (X) e saída (y). Em clustering, não existe y. Você tem apenas exemplos e quer que o algoritmo descubra grupos naturais. É o que uma rede de varejo faz para encontrar perfis de clientes, ou um pesquisador para identificar tipos de células em uma amostra.

K-Means é o algoritmo mais simples e usado. Você diz quantos grupos quer (k), e ele tenta repetidamente: chuta k centros, atribui cada ponto ao centro mais próximo, recalcula os centros como a média do grupo, repete até estabilizar. Funciona bem quando os grupos são razoavelmente esféricos e separáveis.

Neste capítulo você vai aplicar K-Means em dados sintéticos e reais, descobrir como escolher o k usando o método do cotovelo e o silhouette score, padronizar variáveis (essencial em clustering) e entender quando K-Means falha — momento em que outros algoritmos como DBSCAN entram em cena.`,
    codes: [
      {
        lang: "python",
        code: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# criar dados sintéticos com 4 grupos visíveis
X, _ = make_blobs(n_samples=300, centers=4, random_state=0, cluster_std=0.8)

km = KMeans(n_clusters=4, n_init=10, random_state=0)
km.fit(X)
labels = km.labels_

plt.scatter(X[:, 0], X[:, 1], c=labels, cmap="tab10")
plt.scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1],
            s=200, marker="X", color="black")
plt.title("K-Means com 4 clusters")
plt.show()`,
      },
      {
        lang: "python",
        code: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# método do cotovelo: tentar vários k e olhar a inércia (soma dos quadrados internos)
X, _ = make_blobs(n_samples=300, centers=4, random_state=0)
inercias = []
ks = range(1, 10)
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    inercias.append(km.inertia_)

plt.plot(ks, inercias, marker="o")
plt.xlabel("k")
plt.ylabel("inércia")
plt.title("Método do cotovelo")
plt.show()`,
      },
      {
        lang: "python",
        code: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=300, centers=4, random_state=0)

# silhouette score: quanto maior melhor (entre -1 e 1)
for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    s = silhouette_score(X, km.labels_)
    print(f"k={k} → silhouette={s:.3f}")`,
      },
      {
        lang: "python",
        code: `import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# clustering em dados reais simulados de clientes
df = pd.DataFrame({
    "idade":     [25, 45, 33, 52, 22, 60, 28, 41],
    "renda":     [3000, 8000, 4500, 12000, 2200, 15000, 3500, 7000],
    "compras":   [5, 12, 8, 20, 3, 25, 6, 11],
})

# padronizar é essencial: renda em milhares dominaria sem isso
escalado = StandardScaler().fit_transform(df)

km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(escalado)
df["cluster"] = km.labels_
print(df)
print(df.groupby("cluster").mean())`,
      },
      {
        lang: "python",
        code: `from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
import matplotlib.pyplot as plt

# K-Means falha em formatos não esféricos. DBSCAN não.
X, _ = make_moons(n_samples=300, noise=0.07, random_state=0)
labels = DBSCAN(eps=0.2, min_samples=5).fit_predict(X)

plt.scatter(X[:, 0], X[:, 1], c=labels, cmap="tab10")
plt.title("DBSCAN encontra formas alongadas")
plt.show()`,
      },
      {
        lang: "python",
        code: `from sklearn.cluster import KMeans
import numpy as np

# prever cluster de pontos novos
X = np.random.rand(100, 2)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)

novos = np.array([[0.1, 0.1], [0.9, 0.9]])
print("clusters dos novos pontos:", km.predict(novos))`,
      },
    ],
    points: [
      "Clustering é não supervisionado: não há rótulo y, o objetivo é encontrar agrupamentos naturais.",
      "K-Means exige que você informe k antes; descobrir o k ideal é parte da análise.",
      "Método do cotovelo: olhe onde a inércia para de cair bruscamente.",
      "Silhouette score (entre -1 e 1) mede quão bem cada ponto se encaixa no seu cluster.",
      "Padronize as features antes de clusterizar — escalas diferentes destroem o resultado.",
      "K-Means assume grupos esféricos e tamanhos parecidos; quando isso falha, considere DBSCAN ou GaussianMixture.",
      "Dado um modelo treinado, use `predict` para encaixar pontos novos no cluster mais próximo.",
      "Armadilha: K-Means é sensível à inicialização; use `n_init=10` ou mais para minimizar resultado ruim por azar.",
      "Armadilha: clusters não são interpretações automáticas. Cabe a você nomear cada grupo a partir das características médias.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Sem padronização, uma feature como renda (em milhares) domina outras como idade (em dezenas). Sempre aplique StandardScaler antes de K-Means.",
      },
      {
        type: "tip",
        content: "Comece sempre com k entre 2 e 8. Mais que isso, os clusters viram ruído e ficam difíceis de interpretar.",
      },
      {
        type: "info",
        content: "DBSCAN não exige escolher k, mas exige escolher `eps` e `min_samples`. Boa opção quando há ruído ou formatos irregulares.",
      },
    ],
  },

  {
    slug: "deep-learning",
    section: "data-ml",
    title: "Deep Learning: PyTorch",
    difficulty: "avancado",
    subtitle: "Redes neurais com PyTorch.",
    intro: `Deep learning é o sub-ramo do machine learning que usa redes neurais profundas — modelos com muitas camadas que aprendem representações cada vez mais abstratas. É a tecnologia por trás de reconhecimento de voz, tradução automática, geração de imagens e dos LLMs que você usa todo dia. Mas, por dentro, uma rede neural é só uma sequência de multiplicações de matrizes intercaladas com funções não-lineares.

PyTorch é o framework mais popular para deep learning hoje, especialmente em pesquisa. Ele oferece tensores parecidos com arrays NumPy (mas que rodam em GPU), cálculo automático de gradientes (autograd) e blocos prontos para construir redes (camadas lineares, convolucionais, normalizações, otimizadores).

Neste capítulo você vai entender o que é tensor, montar uma rede neural simples para classificar imagens minúsculas, treinar com loop manual (a forma "PyTorch puro") e ver como GPU acelera o trabalho. O objetivo não é dominar o campo — é desmistificar e dar a base para você seguir aprendendo redes específicas para visão, texto ou áudio.`,
    codes: [
      {
        lang: "bash",
        code: `# CPU (mais simples). Para GPU, veja https://pytorch.org/get-started/locally/
pip install torch torchvision`,
      },
      {
        lang: "python",
        code: `import torch

# tensor é o "array do PyTorch" — parecido com NumPy, mas com superpoderes
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
print(x)
print(x.shape, x.dtype)
print(x + 10)              # operações vetorizadas como em NumPy
print(x @ x)               # multiplicação de matrizes

# mover para GPU se houver
device = "cuda" if torch.cuda.is_available() else "cpu"
print("rodando em:", device)
x = x.to(device)`,
      },
      {
        lang: "python",
        code: `import torch

# autograd: PyTorch calcula derivadas para você
w = torch.tensor(2.0, requires_grad=True)
loss = (w - 5) ** 2          # função simples (perda)
loss.backward()              # calcula derivada
print("gradiente:", w.grad)  # → 2*(w-5) = -6 em w=2`,
      },
      {
        lang: "python",
        code: `import torch
from torch import nn

# rede neural simples: 4 entradas → 16 escondidos → 3 saídas (3 classes)
class Rede(nn.Module):
    def __init__(self):
        super().__init__()
        self.camadas = nn.Sequential(
            nn.Linear(4, 16),
            nn.ReLU(),
            nn.Linear(16, 3),
        )

    def forward(self, x):
        return self.camadas(x)

modelo = Rede()
print(modelo)
# forward com batch de 5 exemplos
saida = modelo(torch.randn(5, 4))
print(saida.shape)  # → (5, 3)`,
      },
      {
        lang: "python",
        code: `import torch
from torch import nn, optim
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.long)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)

modelo = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 3))
criterio = nn.CrossEntropyLoss()
otim = optim.Adam(modelo.parameters(), lr=0.01)

for epoca in range(100):
    otim.zero_grad()              # zerar gradientes anteriores
    logits = modelo(X_tr)         # forward
    perda = criterio(logits, y_tr)
    perda.backward()              # calcular gradientes
    otim.step()                   # atualizar pesos

# avaliar
with torch.no_grad():
    pred = modelo(X_te).argmax(dim=1)
    print("acurácia:", (pred == y_te).float().mean().item())`,
      },
      {
        lang: "python",
        code: `import torch
from torch.utils.data import DataLoader, TensorDataset

# DataLoader: lê dados em mini-lotes (essencial em datasets grandes)
X = torch.randn(1000, 4)
y = torch.randint(0, 3, (1000,))

ds = TensorDataset(X, y)
loader = DataLoader(ds, batch_size=32, shuffle=True)

for xb, yb in loader:
    print(xb.shape, yb.shape)
    break  # só para mostrar uma iteração`,
      },
      {
        lang: "python",
        code: `import torch

# salvar e carregar pesos do modelo
torch.save(modelo.state_dict(), "modelo.pt")

# em outro programa:
# novo_modelo = MesmaArquitetura()
# novo_modelo.load_state_dict(torch.load("modelo.pt"))
# novo_modelo.eval()`,
      },
    ],
    points: [
      "Tensor é o tipo central do PyTorch — como ndarray do NumPy, mas com gradientes e suporte a GPU.",
      "Toda rede herda de `nn.Module` e implementa `forward`. PyTorch cuida do `backward` automaticamente.",
      "Loop de treino tem 4 passos: zerar gradientes, forward, backward, otim.step.",
      "Use `with torch.no_grad():` na avaliação para economizar memória — não precisa rastrear gradientes.",
      "DataLoader fragmenta o dataset em mini-lotes; treino em lote é mais estável e rápido.",
      "GPU acelera dezenas de vezes; envie tanto modelo quanto dados para o mesmo `device`.",
      "Salve apenas `state_dict` (pesos), não o objeto modelo inteiro — é mais portável.",
      "Armadilha: esquecer `optimizer.zero_grad()` faz os gradientes acumularem e o treino diverge.",
      "Armadilha: usar `model.eval()` é importante quando há camadas como BatchNorm ou Dropout, que se comportam diferente em treino e teste.",
    ],
    alerts: [
      {
        type: "info",
        content: "Para problemas tabulares pequenos, scikit-learn quase sempre ganha de redes neurais. Deep learning brilha em texto, imagem, áudio e datasets enormes.",
      },
      {
        type: "tip",
        content: "Treinar deep learning sem GPU é viável só em modelos pequenos. Para experimentar, use Google Colab gratuito — ele oferece GPU sob demanda.",
      },
      {
        type: "warning",
        content: "Hiperparâmetros como learning rate e arquitetura mudam radicalmente o resultado. Ajustes manuais 'no olhômetro' são parte normal do trabalho.",
      },
      {
        type: "success",
        content: "Bibliotecas como PyTorch Lightning e Hugging Face Transformers escondem boilerplate e deixam você focar na ideia — ótimas próximas paradas.",
      },
    ],
  },

  {
    slug: "llms-openai",
    section: "data-ml",
    title: "LLMs com a API OpenAI",
    difficulty: "avancado",
    subtitle: "Integrando GPT em aplicações Python.",
    intro: `Modelos de linguagem grandes (LLMs) como o GPT mudaram o que esperamos de software. Em vez de regras programadas, você pede em português e o modelo responde, traduz, resume, classifica ou gera código. A boa notícia é que integrar isso em uma aplicação Python é simples: a OpenAI expõe uma API HTTP, e o pacote \`openai\` envolve tudo em chamadas Python amigáveis.

A unidade de comunicação é a mensagem. Você envia uma lista de mensagens com papéis (\`system\` para definir comportamento, \`user\` para o pedido, \`assistant\` para respostas anteriores) e recebe uma nova resposta. O modelo cobra por tokens — pedaços de palavra — então entender quanto texto entra e sai é parte do controle de custos.

Neste capítulo você vai configurar a chave de API com segurança, fazer a primeira chamada, manter histórico de conversa, controlar custo com \`max_tokens\`, usar streaming para respostas em tempo real e conhecer os princípios básicos de prompt engineering. É o suficiente para construir um chatbot, um classificador semântico ou um assistente integrado ao seu sistema.`,
    codes: [
      {
        lang: "bash",
        code: `pip install openai python-dotenv

# crie um arquivo .env (NUNCA suba para o git!) com:
# OPENAI_API_KEY=sk-...sua-chave-aqui...`,
      },
      {
        lang: "python",
        code: `import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # lê .env e popula os.environ

# o cliente lê automaticamente de OPENAI_API_KEY
cliente = OpenAI()

resposta = cliente.chat.completions.create(
    model="gpt-4o-mini",  # modelo barato e rápido
    messages=[
        {"role": "system", "content": "Você é um assistente que responde em português."},
        {"role": "user",   "content": "O que é uma list comprehension em Python?"},
    ],
)
print(resposta.choices[0].message.content)`,
      },
      {
        lang: "python",
        code: `from openai import OpenAI

cliente = OpenAI()

# manter conversa: basta acumular mensagens na lista
historico = [
    {"role": "system", "content": "Você é tutor de Python para iniciantes brasileiros."},
]

def perguntar(texto: str) -> str:
    historico.append({"role": "user", "content": texto})
    r = cliente.chat.completions.create(model="gpt-4o-mini", messages=historico)
    resposta = r.choices[0].message.content
    historico.append({"role": "assistant", "content": resposta})
    return resposta

print(perguntar("O que é variável?"))
print(perguntar("Me dá um exemplo simples."))`,
      },
      {
        lang: "python",
        code: `from openai import OpenAI

cliente = OpenAI()

# parâmetros úteis: temperatura (0 = determinístico, 1+ = criativo) e max_tokens (limite)
r = cliente.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Sugira 3 nomes para uma cafeteria."}],
    temperature=0.9,
    max_tokens=80,
)
print(r.choices[0].message.content)
print("tokens usados:", r.usage.total_tokens)`,
      },
      {
        lang: "python",
        code: `from openai import OpenAI

cliente = OpenAI()

# streaming: imprime palavra por palavra (sensação de tempo real)
stream = cliente.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Conte uma história curta sobre uma lhama programadora."}],
    stream=True,
)
for chunk in stream:
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)
print()`,
      },
      {
        lang: "python",
        code: `from openai import OpenAI
import json

cliente = OpenAI()

# pedir JSON estruturado: mais fácil de parsear
prompt = (
    "Extraia nome, idade e cidade do texto abaixo em JSON.\\n"
    "Texto: 'Ana tem 28 anos e mora em Recife.'"
)
r = cliente.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Responda APENAS com JSON válido."},
        {"role": "user",   "content": prompt},
    ],
    response_format={"type": "json_object"},
)
dados = json.loads(r.choices[0].message.content)
print(dados)
print(type(dados))  # <class 'dict'>`,
      },
      {
        lang: "python",
        code: `from openai import OpenAI

cliente = OpenAI()

# embeddings: vira texto em vetor numérico para busca semântica
emb = cliente.embeddings.create(
    model="text-embedding-3-small",
    input=["pizza de calabresa", "moto esportiva", "pizza de muçarela"],
)
vetores = [e.embedding for e in emb.data]
print(len(vetores), "vetores de dimensão", len(vetores[0]))
# vetores próximos no espaço significam textos parecidos em significado`,
      },
    ],
    points: [
      "Nunca coloque a chave de API direto no código. Use variável de ambiente, geralmente via `python-dotenv`.",
      "A API é stateless: para manter conversa, você mesmo envia o histórico a cada chamada.",
      "Mensagens têm 3 papéis: `system` (define comportamento), `user` (pedido), `assistant` (resposta anterior).",
      "`temperature` controla criatividade; use 0 para tarefas que precisam de respostas estáveis (extração, classificação).",
      "`max_tokens` limita a resposta — protege seu bolso e o tempo de espera.",
      "Streaming melhora a experiência percebida; ideal para chatbots.",
      "`response_format={'type': 'json_object'}` torna a resposta um JSON parseável com segurança.",
      "Embeddings transformam texto em vetor; servem para busca semântica e recomendação.",
      "Armadilha: tokens não são palavras — texto em português costuma gastar mais tokens que em inglês.",
      "Armadilha: NUNCA suba o arquivo `.env` para o GitHub. Adicione `.env` ao `.gitignore` desde o primeiro commit.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Vazar uma chave de API no GitHub é comum e custa caro: bots varrem repositórios públicos atrás delas em minutos. Sempre use .env e .gitignore.",
      },
      {
        type: "tip",
        content: "Para protótipos, comece com `gpt-4o-mini`. É rápido e barato; só troque por modelos maiores quando o resultado realmente exigir.",
      },
      {
        type: "warning",
        content: "LLMs alucinam — geram fatos incorretos com confiança. Para casos críticos (jurídico, saúde, financeiro), valide a saída com fontes externas e revisão humana.",
      },
      {
        type: "info",
        content: "Frameworks como LangChain e LlamaIndex orquestram chamadas a LLM com bancos de vetores e ferramentas externas, úteis quando o caso de uso vai além de uma única chamada.",
      },
    ],
  },
];
