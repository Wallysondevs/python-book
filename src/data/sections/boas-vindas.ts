import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "bem-vindo",
    section: "boas-vindas",
    title: "Bem-vindo ao Python",
    difficulty: "iniciante",
    subtitle: "O que esperar deste livro e como tirar o máximo proveito dele.",
    intro: `Imagine que você acabou de comprar um teclado novo e ainda não sabe tocar nenhuma música. O Python é o seu instrumento, e este livro é o seu professor. A boa notícia é que aprender a programar não exige talento mágico, nem matemática avançada, nem inglês fluente. Exige apenas curiosidade e a coragem de errar várias vezes até começar a fazer sentido.

Python foi feito justamente para reduzir esse atrito. A linguagem se parece com inglês simples, ignora pontuação desnecessária e mostra mensagens de erro em texto quase humano. Isso significa que, em poucas semanas, você vai conseguir escrever pequenos programas que automatizam tarefas chatas do dia a dia, organizam planilhas, baixam dados da internet ou conversam com inteligências artificiais.

Este livro foi escrito assumindo que você nunca programou na vida. Vamos do "abrir o terminal" até temas avançados como APIs, testes, banco de dados e deploy. Cada capítulo tem exemplos prontos para você copiar, rodar e quebrar. É quebrando que se aprende. No próximo capítulo, você vai entender por que tanta gente escolhe Python como primeira linguagem.`,
    codes: [
      {
        lang: "python",
        code: `# Seu primeiro programa em Python: uma boas-vindas pessoal.
# A função print mostra texto na tela.
print("Olá! Bem-vindo ao Python.")
# saída: Olá! Bem-vindo ao Python.`,
      },
      {
        lang: "python",
        code: `# Você pode guardar informações em "variáveis" — caixinhas com nome.
nome = "Ana"          # uma palavra (texto)
idade = 28            # um número inteiro
print("Oi,", nome, "- você tem", idade, "anos.")
# saída: Oi, Ana - você tem 28 anos.`,
      },
      {
        lang: "python",
        code: `# Python entende contas direto, como uma calculadora.
preco = 49.90         # preço de um produto em reais
quantidade = 3        # quantas unidades
total = preco * quantidade
print("Total a pagar: R$", total)
# saída: Total a pagar: R$ 149.7`,
      },
      {
        lang: "python",
        code: `# Você pode pedir informação para a pessoa que está usando o programa.
nome = input("Qual o seu nome? ")   # input pausa e espera você digitar
print("Prazer em te conhecer,", nome + "!")
# Se você digitar "Bruno", a saída será: Prazer em te conhecer, Bruno!`,
      },
      {
        lang: "python",
        code: `# Erros são parte do aprendizado. Tente rodar e veja a mensagem.
print("Faltou fechar a aspa)
# SyntaxError: unterminated string literal
# Python mostra exatamente em qual linha está o problema.`,
      },
    ],
    points: [
      "Você não precisa saber inglês ou matemática avançada para começar.",
      "Programar é escrever instruções claras para o computador executar em ordem.",
      "Errar é parte do processo: cada erro vem com uma pista de como corrigir.",
      "Copie os exemplos, rode, mude um valor e veja o que acontece.",
      "Não tente memorizar tudo; a prática repetida fixa muito mais que decorar.",
      "Iniciante comum: travar tentando entender 100% antes de digitar a primeira linha.",
      "Iniciante comum: pular capítulos achando que já sabe e perder a base.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Tenha um caderno (físico ou digital) só para anotar erros que você cometeu e como resolveu. Em duas semanas ele vira seu melhor manual pessoal.",
      },
      {
        type: "info",
        content: "Todos os exemplos deste livro foram testados em Python 3.10 ou superior. Versões antigas (2.x) podem não funcionar igual e estão fora de uso.",
      },
      {
        type: "warning",
        content: "Não copie e cole sem ler. Digitar manualmente os primeiros exemplos faz seu cérebro reconhecer padrões muito mais rápido do que apenas observar.",
      },
    ],
  },
  {
    slug: "por-que-python",
    section: "boas-vindas",
    title: "Por que aprender Python?",
    difficulty: "iniciante",
    subtitle: "Vantagens reais, ecossistema gigante e oportunidades de carreira.",
    intro: `Existem centenas de linguagens de programação. Por que tanta gente, do estudante de colégio ao engenheiro do Google, escolhe o Python? A resposta curta é: ele dá resultado rápido com pouco esforço de leitura.

Python tem uma sintaxe limpa, sem ponto e vírgula no fim de cada linha, sem chaves para abrir e fechar blocos. O código se parece tanto com inglês que muita gente consegue ler um programa antes mesmo de saber programar. Isso reduz a barreira de entrada e permite que você foque no problema que quer resolver, e não em decorar regras estranhas.

Outro ponto forte é o ecossistema. Existe uma biblioteca pronta para quase tudo: análise de dados (Pandas), inteligência artificial (PyTorch, scikit-learn), sites (Django, FastAPI), automação de planilhas (openpyxl), web scraping, jogos, robótica e muito mais. Em vez de reinventar a roda, você instala um pacote e parte do que já existe.

No mercado, Python aparece consistentemente entre as três linguagens mais procuradas em vagas no Brasil e no mundo, especialmente em dados, IA e back-end. Aprender Python é um investimento de carreira que rende em várias áreas ao mesmo tempo.`,
    codes: [
      {
        lang: "python",
        code: `# Comparação visual: somar números de 1 até 5.
# Em Python, é uma linha só, parece quase português.
total = sum(range(1, 6))   # range(1, 6) gera 1, 2, 3, 4, 5
print(total)               # → 15`,
      },
      {
        lang: "python",
        code: `# Ler um arquivo de texto inteiro: 3 linhas. Sem ritual.
with open("notas.txt", "r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()
print(conteudo)`,
      },
      {
        lang: "bash",
        code: `# Instalar uma biblioteca pronta é um comando só.
# Aqui instalamos a "requests", usada para acessar sites e APIs.
pip install requests`,
      },
      {
        lang: "python",
        code: `# Com 4 linhas, baixamos dados da internet.
import requests
resposta = requests.get("https://api.github.com")
print(resposta.status_code)   # → 200 quando deu certo
print(resposta.json()["current_user_url"])`,
      },
      {
        lang: "python",
        code: `# Análise rápida de dados com pandas (instalável via pip install pandas).
import pandas as pd
vendas = pd.DataFrame({
    "produto": ["café", "pão", "leite"],
    "preco":   [12.50, 0.75, 5.20],
})
print(vendas["preco"].mean())   # média de preços → 6.15`,
      },
    ],
    points: [
      "Sintaxe limpa e parecida com inglês, ótima como primeira linguagem.",
      "Bibliotecas prontas para dados, IA, web, automação e ciência.",
      "Comunidade enorme: respostas no Stack Overflow para quase qualquer dúvida.",
      "Salários competitivos em vagas de dados, back-end e machine learning.",
      "Multiplataforma: o mesmo código roda em Windows, macOS e Linux.",
      "Armadilha: achar que por ser fácil de ler é fácil em tudo (concorrência ainda dói).",
      "Armadilha: aprender só sintaxe e nunca construir um projeto de verdade.",
    ],
    alerts: [
      {
        type: "success",
        content: "Empresas como Instagram, Netflix, Spotify, Nubank e Itaú usam Python em produção. Você está aprendendo uma ferramenta usada de verdade no mercado.",
      },
      {
        type: "info",
        content: "Python não é a linguagem mais rápida em execução pura, mas costuma ser a mais rápida em tempo de desenvolvimento, que normalmente é o que custa mais caro.",
      },
      {
        type: "tip",
        content: "Escolha desde cedo uma área que te empolga (dados, web, automação) e use Python como ferramenta para resolver problemas reais dessa área. Aprender com propósito acelera muito.",
      },
      {
        type: "warning",
        content: "Não troque de linguagem toda semana. Fluência em uma vale mais do que o básico em cinco. Termine o livro antes de ir para a próxima.",
      },
    ],
  },
  {
    slug: "historia-python",
    section: "boas-vindas",
    title: "A história do Python",
    difficulty: "iniciante",
    subtitle: "De um projeto de fim de ano de Guido van Rossum à linguagem mais popular do mundo.",
    intro: `Toda ferramenta tem uma história, e entender de onde o Python veio ajuda você a entender por que ele é do jeito que é. No fim da década de 1980, um programador holandês chamado Guido van Rossum trabalhava em um centro de pesquisa em Amsterdã. Ele queria uma linguagem que fosse fácil de ler, fácil de ensinar e poderosa o suficiente para tarefas reais de sistema.

No Natal de 1989, durante uma semana sem muito o que fazer, Guido começou a escrever essa linguagem como hobby. Ele era fã do grupo de comédia britânico Monty Python e batizou o projeto assim — não tem nada a ver com a cobra. A primeira versão pública saiu em 1991.

A partir dali, Python foi crescendo organicamente, com a comunidade contribuindo. Em 2008, veio o Python 3, uma virada que quebrou compatibilidade com a versão 2 para corrigir defeitos antigos. Foi doloroso, mas necessário. Hoje, mais de três décadas depois, Python é uma das três linguagens mais usadas no mundo, mantida pela Python Software Foundation, e segue em evolução constante com lançamentos anuais. Saber essa trajetória te ajuda a interpretar erros, ler documentação e entender debates da comunidade.`,
    codes: [
      {
        lang: "python",
        code: `# Você pode descobrir qual versão de Python está rodando.
import sys
print(sys.version)
# Exemplo de saída:
# 3.12.1 (main, Dec  7 2023, 18:45:00)`,
      },
      {
        lang: "bash",
        code: `# No terminal, o mesmo é feito assim:
python3 --version
# saída esperada algo como: Python 3.12.1`,
      },
      {
        lang: "python",
        code: `# O "Zen do Python" é um manifesto curto com a filosofia da linguagem.
# Escrito por Tim Peters, virou um easter egg oficial.
import this
# Vai imprimir 19 aforismos como:
# "Beautiful is better than ugly."
# "Simple is better than complex."`,
      },
      {
        lang: "python",
        code: `# Marcos importantes da linguagem (em forma de dicionário, só para visualizar).
historia = {
    1991: "Python 0.9.0 publicado por Guido van Rossum",
    2000: "Python 2.0 com garbage collector e list comprehensions",
    2008: "Python 3.0 quebra compatibilidade para corrigir defeitos antigos",
    2020: "Python 2 oficialmente descontinuado",
    2023: "Python 3.12 com mensagens de erro mais amigáveis",
}
for ano, fato in historia.items():
    print(ano, "->", fato)`,
      },
      {
        lang: "python",
        code: `# Curiosidade: o nome "Python" vem do grupo Monty Python.
# Por isso a documentação oficial usa exemplos como "spam" e "eggs",
# referências a um esquete famoso do grupo.
spam = "presunto enlatado"
eggs = "ovos"
print(spam, "com", eggs)`,
      },
    ],
    points: [
      "Criada por Guido van Rossum no fim de 1989, lançada em 1991.",
      "O nome vem do grupo Monty Python, não do animal.",
      "Python 3 foi lançado em 2008 e é o padrão atual; Python 2 morreu em 2020.",
      "Mantida pela Python Software Foundation, sem dono comercial único.",
      "Filosofia oficial está no Zen do Python (rode import this).",
      "Armadilha: copiar tutorial antigo de Python 2 e tentar rodar no 3.",
      "Armadilha: confundir o nome com a cobra e procurar documentação errada.",
    ],
    alerts: [
      {
        type: "info",
        content: "Guido van Rossum carregou por anos o título informal de BDFL (Benevolent Dictator For Life). Ele se afastou em 2018 e a linguagem hoje é guiada por um Conselho Diretor eleito.",
      },
      {
        type: "tip",
        content: "Sempre que pesquisar dúvidas no Google, adicione python 3 na busca. Resultados antigos de Python 2 podem confundir você com sintaxe que não funciona mais.",
      },
      {
        type: "success",
        content: "O Zen do Python (import this) cabe em uma tela e resume a mentalidade da linguagem. Releia ele de vez em quando: muita decisão de código fica mais clara depois.",
      },
    ],
  },
  {
    slug: "python-2-vs-3",
    section: "boas-vindas",
    title: "Python 2 vs Python 3",
    difficulty: "iniciante",
    subtitle: "Por que Python 3 é o único caminho hoje e o que mudou na virada.",
    intro: `Quando você procurar conteúdo sobre Python na internet, vai encontrar bastante material antigo escrito para Python 2. É importante saber que Python 2 morreu oficialmente em 1 de janeiro de 2020. A Python Software Foundation parou de receber atualizações, correções de segurança e qualquer suporte. Usar Python 2 hoje é como dirigir um carro sem freio: pode até ligar, mas é perigoso e não tem mais peças.

A versão 3 foi lançada em 2008 com uma decisão polêmica: quebrar a compatibilidade com a versão 2 para corrigir defeitos de design que tinham 17 anos. Essa transição levou mais de uma década, mas hoje todo o ecossistema moderno (Django, Flask, FastAPI, NumPy, Pandas, TensorFlow) só roda em Python 3.

Para você que está começando agora, a regra é simples: instale Python 3.10 ou superior e ignore qualquer tutorial que comece com print sem parênteses. Mas é útil reconhecer as diferenças mais comuns, porque você vai esbarrar em código antigo no Stack Overflow ou em bases legadas. Este capítulo te dá esse vocabulário rápido para diferenciar de longe.`,
    codes: [
      {
        lang: "python",
        code: `# Python 2: print era um "comando", sem parênteses.
# print "Olá"
# Em Python 3, print virou função e exige parênteses.
print("Olá")   # forma correta hoje`,
      },
      {
        lang: "python",
        code: `# Divisão mudou de comportamento.
# Python 2: 5 / 2  →  2 (inteiro, jogava o decimal fora)
# Python 3:
print(5 / 2)    # → 2.5  (divisão verdadeira)
print(5 // 2)   # → 2    (// é a divisão "inteira" agora)`,
      },
      {
        lang: "python",
        code: `# Strings (texto) agora são unicode por padrão.
# Em Python 2 era preciso usar u"texto" para acentos. Em Python 3, não.
nome = "João da Silva"   # acentos funcionam de primeira
print(nome)`,
      },
      {
        lang: "python",
        code: `# input mudou de comportamento.
# Em Python 2, input() avaliava o que você digitasse como código (perigoso).
# Em Python 3, input() sempre devolve uma string segura.
idade = input("Sua idade: ")   # se você digitar 30, idade = "30" (texto)
idade = int(idade)             # converta para número quando precisar
print(idade + 1)`,
      },
      {
        lang: "bash",
        code: `# Em alguns sistemas existem dois comandos: python e python3.
# python pode apontar para a versão 2 antiga. Sempre prefira python3.
python --version    # cuidado: às vezes é 2.x
python3 --version   # esta é a versão moderna que vamos usar`,
      },
      {
        lang: "python",
        code: `# range mudou. Em Python 2, range(1000000) criava uma lista enorme na memória.
# Em Python 3, ele cria um "gerador" preguiçoso, eficiente.
for i in range(3):
    print(i)
# saída:
# 0
# 1
# 2`,
      },
    ],
    points: [
      "Python 2 está oficialmente morto desde janeiro de 2020. Não use.",
      "Sempre instale Python 3.10 ou superior para acompanhar este livro.",
      "print virou função e exige parênteses no Python 3.",
      "/ agora faz divisão real; // faz divisão inteira.",
      "Strings são unicode por padrão, acentos funcionam direto.",
      "input() devolve sempre texto; converta com int() ou float() se precisar.",
      "Armadilha comum: copiar código antigo do Stack Overflow sem notar que é Python 2.",
      "Armadilha: rodar python e estar usando 2 sem perceber; use python3 explícito.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nenhuma correção de segurança é feita em Python 2 desde 2020. Rodar sistemas em produção com Python 2 hoje é um risco real e não atende padrões mínimos como LGPD.",
      },
      {
        type: "warning",
        content: "Se um tutorial mostra print sem parênteses ou usa raw_input, ele é de Python 2 e pode estar desatualizado em outras coisas também. Procure conteúdo mais novo.",
      },
      {
        type: "tip",
        content: "No terminal, rode python3 -V antes de começar a trabalhar para ter certeza da versão. Pequeno hábito que evita horas de confusão.",
      },
    ],
  },
  {
    slug: "onde-python-roda",
    section: "boas-vindas",
    title: "Onde o Python roda",
    difficulty: "iniciante",
    subtitle: "Plataformas, sistemas operacionais e até dispositivos onde o Python existe.",
    intro: `Uma das maiores vantagens do Python é que ele roda em praticamente qualquer lugar. O mesmo arquivo .py que você escreve no seu notebook em casa funciona, sem mudar uma vírgula, no servidor de uma empresa, no Raspberry Pi do seu projeto de fim de semana ou na nuvem da Amazon. Isso se chama portabilidade, e é uma característica deliberada do projeto desde os anos 1990.

Python é uma linguagem interpretada. Em vez de gerar um executável fechado como C ou Rust, ele depende de um programa chamado interpretador (CPython, na maioria dos casos) que lê seu código linha por linha e executa. Existe uma versão desse interpretador para cada sistema operacional grande: Windows, macOS, Linux, Android, e até navegadores via projetos como Pyodide.

Saber onde Python roda te abre possibilidades que talvez você nem tenha imaginado: automatizar a sua planilha no trabalho, fazer um robô de Telegram, controlar um sensor de temperatura no Arduino através do MicroPython, treinar um modelo de inteligência artificial num servidor com placa de vídeo na nuvem. Tudo isso é Python. O que muda é só o ambiente de execução, não a linguagem.`,
    codes: [
      {
        lang: "python",
        code: `# Python descobre sozinho em qual sistema ele está rodando.
import platform
print(platform.system())     # "Windows", "Linux" ou "Darwin" (macOS)
print(platform.machine())    # "x86_64", "arm64", etc.
print(platform.python_version())`,
      },
      {
        lang: "python",
        code: `# Exemplo prático: rodar um comando diferente dependendo do sistema.
import platform

sistema = platform.system()
if sistema == "Windows":
    print("Aqui usaríamos: dir")
elif sistema in ("Linux", "Darwin"):
    print("Aqui usaríamos: ls")
else:
    print("Sistema desconhecido:", sistema)`,
      },
      {
        lang: "bash",
        code: `# No Windows, geralmente o comando é "python".
python --version

# No macOS e Linux, use "python3" para evitar conflito com Python 2 antigo.
python3 --version

# Para rodar um arquivo:
python3 meu_programa.py`,
      },
      {
        lang: "python",
        code: `# Caminhos de arquivo mudam entre sistemas.
# Use pathlib para escrever código que funciona em qualquer lugar.
from pathlib import Path

documentos = Path.home() / "Documentos" / "notas.txt"
print(documentos)
# No Windows imprime algo como C:\\Users\\Ana\\Documentos\\notas.txt
# No Linux/macOS imprime /home/ana/Documentos/notas.txt`,
      },
      {
        lang: "python",
        code: `# Você pode até descobrir onde o interpretador está instalado.
import sys
print(sys.executable)
# Exemplos:
# /usr/bin/python3
# C:\\Users\\Ana\\AppData\\Local\\Programs\\Python\\Python312\\python.exe`,
      },
    ],
    points: [
      "Python roda em Windows, macOS, Linux, Android, Raspberry Pi e na nuvem.",
      "O mesmo arquivo .py geralmente funciona em todos esses ambientes sem alteração.",
      "O interpretador padrão se chama CPython e é mantido pela própria PSF.",
      "MicroPython e CircuitPython levam o Python para microcontroladores baratos.",
      "Pyodide permite rodar Python dentro do navegador, sem instalar nada.",
      "Armadilha: escrever caminhos com barra invertida fixa só no estilo Windows.",
      "Armadilha: depender de um comando do sistema (como ls) que só existe num SO.",
      "Use pathlib para caminhos e platform/sys para checar o ambiente.",
    ],
    alerts: [
      {
        type: "info",
        content: "Quando o platform.system() retorna 'Darwin', isso é o nome interno do macOS. Não é um erro, é o nome do núcleo do sistema da Apple.",
      },
      {
        type: "tip",
        content: "Sempre que precisar lidar com arquivos, prefira pathlib em vez de juntar texto com barras manualmente. Seu código fica portável e mais legível de quebra.",
      },
      {
        type: "warning",
        content: "Cuidado ao usar bibliotecas que dependem de partes do sistema operacional (como winsound no Windows). Elas podem não existir em outros sistemas e quebrar seu programa.",
      },
      {
        type: "success",
        content: "Aprender Python uma vez te permite trabalhar do notebook ao servidor, do dispositivo IoT ao notebook de cientista de dados. Poucas linguagens entregam essa amplitude.",
      },
    ],
  },
];
