import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "instalacao",
    section: "instalacao",
    title: "Instalando o Python",
    difficulty: "iniciante",
    subtitle: "Como colocar o Python para funcionar no Windows, macOS e Linux.",
    intro: `Antes de escrever qualquer linha de código, você precisa ter o Python instalado no computador. Pense no Python como o motor de um carro: você pode até ter o volante, os pedais e o painel (o editor de código), mas sem o motor nada se move. O Python é o programa que lê o que você escreve e transforma em ação.

Existem três sistemas operacionais principais e cada um tem um jeitinho diferente de instalar. No Windows, você baixa um instalador no site oficial. No macOS, dá para usar o instalador também ou um gerenciador chamado Homebrew. No Linux, normalmente já vem instalado, mas costuma ser uma versão mais antiga do que a atual.

Uma confusão comum é a versão. Hoje (2024+) usamos Python 3, especificamente 3.10 ou superior. O Python 2 está aposentado desde 2020 e não recebe mais atualizações. Se algum tutorial antigo mandar usar \`python\` e não funcionar, tente \`python3\`. Esse pequeno detalhe atrapalha muita gente no começo.

Ao final desse capítulo, você vai conseguir abrir o terminal, digitar um comando e ver a versão do Python aparecer na tela. Esse é o "está vivo!" do nosso motor.`,
    codes: [
      {
        lang: "bash",
        code: `# Windows: baixe o instalador em https://www.python.org/downloads/
# IMPORTANTE: na primeira tela do instalador, marque
# a caixinha "Add Python to PATH" antes de clicar em Install.

# Depois de instalar, abra o Prompt de Comando (cmd) e teste:
python --version
# saída esperada: Python 3.12.3 (ou superior)`,
      },
      {
        lang: "bash",
        code: `# macOS com Homebrew (recomendado)
# Se ainda não tem o brew, instale em https://brew.sh

brew install python@3.12

# Verifique a instalação:
python3 --version
# saída esperada: Python 3.12.x`,
      },
      {
        lang: "bash",
        code: `# Linux (Ubuntu/Debian) — atualiza a lista de pacotes
sudo apt update

# Instala o Python 3, o pip e o venv juntos
sudo apt install python3 python3-pip python3-venv -y

# Confirma a versão instalada
python3 --version`,
      },
      {
        lang: "bash",
        code: `# Em qualquer sistema, verifique também onde o Python está instalado.
# Isso ajuda muito quando algo "não funciona".

# Windows (no PowerShell):
where python

# macOS / Linux:
which python3
# exemplo de saída: /usr/local/bin/python3`,
      },
      {
        lang: "bash",
        code: `# Confusão comum: "python" vs "python3"
# Em alguns sistemas o comando é python, em outros python3.
# Teste os dois e use o que responder com Python 3.x:

python --version    # pode dar "command not found" no macOS/Linux
python3 --version   # quase sempre funciona no macOS/Linux`,
      },
    ],
    points: [
      "Use Python 3.10 ou superior — Python 2 está aposentado.",
      "No Windows, marque \"Add Python to PATH\" no instalador, sempre.",
      "No macOS, prefira o Homebrew (brew install python) ao instalador genérico.",
      "No Linux, o Python já vem, mas instale também python3-pip e python3-venv.",
      "O comando pode ser python ou python3 dependendo do sistema — teste os dois.",
      "Verificar a versão com --version é o teste mais rápido para saber se deu certo.",
      "Não instale Python da Microsoft Store: ele tem limitações chatas para iniciantes.",
      "Se aparecer \"command not found\", o PATH não foi configurado — reinstale marcando a opção.",
    ],
    alerts: [
      {
        type: "warning",
        content: "No Windows, esquecer de marcar \"Add Python to PATH\" é o erro número 1 dos iniciantes. Sem isso, o terminal não acha o Python.",
      },
      {
        type: "tip",
        content: "Feche e reabra o terminal depois de instalar o Python. O sistema só percebe o novo PATH em janelas abertas depois da instalação.",
      },
      {
        type: "info",
        content: "Se você usa Windows 10/11 e quer um caminho rápido, abra o terminal e digite python — ele abre a Microsoft Store. Mesmo assim, prefira o instalador oficial.",
      },
      {
        type: "danger",
        content: "Nunca apague o Python que vem instalado no Linux ou macOS. Vários programas do sistema dependem dele e o sistema pode parar de funcionar.",
      },
    ],
  },
  {
    slug: "interpretador-repl",
    section: "instalacao",
    title: "O interpretador interativo (REPL)",
    difficulty: "iniciante",
    subtitle: "Conversando com o Python linha a linha pelo terminal.",
    intro: `Quando você instala o Python, ganha junto uma ferramenta poderosa chamada REPL. A sigla vem do inglês: Read (lê o que você digita), Eval (avalia/executa), Print (mostra o resultado), Loop (volta para o início). Na prática, é um Python que responde a cada linha que você escreve, na hora.

Pense no REPL como uma calculadora turbinada que entende texto, listas, condições e até pequenos programas. Você digita \`2 + 2\`, aperta Enter e ele já responde \`4\`. Não precisa criar arquivo, não precisa salvar. É o jeito mais rápido de testar uma ideia.

Para abrir o REPL, basta digitar \`python\` (ou \`python3\`) no terminal e apertar Enter. Você vai ver três sinais de maior \`>>>\` aparecerem: esse é o convite para você digitar algo. Para sair, basta digitar \`exit()\` ou apertar Ctrl+D (Linux/macOS) ou Ctrl+Z e Enter (Windows).

Use o REPL sempre que tiver dúvida sobre como uma função se comporta, ou quando quiser fazer uma conta rápida. Programadores experientes deixam um REPL aberto o dia inteiro. É o seu laboratório.`,
    codes: [
      {
        lang: "bash",
        code: `# Abrindo o REPL no terminal
python3
# A partir daqui, aparece o prompt >>>
# Digite código Python e aperte Enter para executar.`,
      },
      {
        lang: "python",
        code: `# Dentro do REPL — usando como calculadora
>>> 2 + 2
4
>>> 10 * 5
50
>>> (3 + 4) * 2   # parênteses funcionam normalmente
14`,
      },
      {
        lang: "python",
        code: `# Criando variáveis e reusando-as no REPL
>>> nome = "Ana"
>>> idade = 30
>>> nome
'Ana'
>>> f"{nome} tem {idade} anos"   # f-string formatando texto
'Ana tem 30 anos'`,
      },
      {
        lang: "python",
        code: `# Pedindo ajuda direto no REPL — útil quando esquece como algo funciona
>>> help(len)        # mostra a documentação da função len
>>> dir("texto")     # lista o que dá pra fazer com uma string
# Aperte q para sair da tela de ajuda.`,
      },
      {
        lang: "python",
        code: `# A variável especial _ guarda o último resultado
>>> 100 / 4
25.0
>>> _ + 5            # _ vale 25.0 aqui
30.0
>>> _ * 2            # _ agora vale 30.0
60.0`,
      },
      {
        lang: "bash",
        code: `# Saindo do REPL
>>> exit()
# ou aperte:
#   Ctrl+D no macOS/Linux
#   Ctrl+Z e Enter no Windows`,
      },
    ],
    points: [
      "REPL = Read, Eval, Print, Loop — o Python que responde linha por linha.",
      "Abra com python ou python3 no terminal; o prompt vira >>>.",
      "Ótimo para testar ideias rápidas sem criar arquivo nenhum.",
      "A variável _ guarda automaticamente o último resultado calculado.",
      "Use help() e dir() para descobrir o que uma função ou objeto sabe fazer.",
      "Saia com exit(), Ctrl+D (Unix) ou Ctrl+Z + Enter (Windows).",
      "O REPL é descartável: tudo que você digita some quando fecha — não use para projetos sérios.",
      "Se o terminal travar com >>>, você está dentro do REPL e talvez não percebeu.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para um REPL melhor, instale o ipython com pip install ipython. Ele tem cores, autocomplete com Tab e histórico que se mantém entre sessões.",
      },
      {
        type: "info",
        content: "Se você só vir >>> e nada acontece quando aperta Enter, provavelmente está dentro de um bloco que ainda não terminou. Aperte Ctrl+C para cancelar.",
      },
      {
        type: "warning",
        content: "Não confunda o prompt do sistema ($ ou C:\\>) com o prompt do Python (>>>). Comandos como ls ou dir não funcionam dentro do REPL.",
      },
    ],
  },
  {
    slug: "primeiro-script",
    section: "instalacao",
    title: "Seu primeiro script",
    difficulty: "iniciante",
    subtitle: "Salvando código em um arquivo .py e executando do terminal.",
    intro: `O REPL é ótimo para experimentar, mas tudo que você digita lá some quando fecha. Um script é diferente: é um arquivo de texto com extensão \`.py\` que guarda seu código para sempre. Você escreve uma vez, salva, e pode executar de novo amanhã, daqui a um mês, ou compartilhar com outra pessoa.

Um script é o tijolo de qualquer programa de verdade. O Instagram, o Spotify e os bots que respondem no WhatsApp começaram como pequenos arquivos \`.py\`. A diferença é só o tamanho.

Para criar seu primeiro script, você precisa de duas coisas: um lugar para escrever o texto (qualquer editor serve, até o Bloco de Notas) e um terminal para executar. O fluxo é: abrir o editor, escrever o código, salvar com extensão \`.py\`, abrir o terminal na pasta do arquivo e digitar \`python nome_do_arquivo.py\`.

Iniciantes costumam tropeçar em duas coisas: salvar com a extensão errada (o Bloco de Notas tenta salvar como \`.txt\` por padrão) e tentar executar de uma pasta diferente da que o arquivo está. Vamos ver como evitar isso.`,
    codes: [
      {
        lang: "python",
        code: `# Arquivo: ola.py
# Esse é o programa mais simples possível em Python.

print("Olá, mundo!")          # imprime a mensagem na tela
print("Estou aprendendo Python.")`,
      },
      {
        lang: "bash",
        code: `# No terminal, navegue até a pasta onde salvou o arquivo
cd Documentos/python

# Liste os arquivos para confirmar que ola.py está lá
ls          # macOS/Linux
dir         # Windows

# Execute o script
python3 ola.py
# saída:
# Olá, mundo!
# Estou aprendendo Python.`,
      },
      {
        lang: "python",
        code: `# Arquivo: saudacao.py — agora pedindo dados ao usuário
nome = input("Qual seu nome? ")    # input pausa e espera você digitar
idade = input("Quantos anos? ")    # tudo que vem do input é texto (str)

# f-string monta a mensagem juntando texto e variáveis
print(f"Olá, {nome}! Você tem {idade} anos.")`,
      },
      {
        lang: "bash",
        code: `# Executando o script interativo
python3 saudacao.py
# Qual seu nome? Bruno
# Quantos anos? 28
# Olá, Bruno! Você tem 28 anos.`,
      },
      {
        lang: "python",
        code: `# Arquivo: conta.py — um script que faz uma conta útil
# Calcula quanto cada pessoa paga ao dividir uma conta de bar.

total = float(input("Valor total da conta (R$): "))   # converte texto em número
pessoas = int(input("Quantas pessoas? "))             # converte texto em inteiro

valor_por_pessoa = total / pessoas
print(f"Cada um paga R$ {valor_por_pessoa:.2f}")      # :.2f mostra 2 casas decimais`,
      },
      {
        lang: "bash",
        code: `# Erro comum: arquivo não encontrado
python3 ola.py
# python3: can't open file 'ola.py': [Errno 2] No such file or directory

# Causa: você está em outra pasta. Verifique onde está com:
pwd         # macOS/Linux — mostra o caminho atual
cd          # Windows — mostra o caminho atual`,
      },
    ],
    points: [
      "Scripts são arquivos com extensão .py que guardam seu código permanentemente.",
      "Execute com python nome_do_arquivo.py (ou python3 em Mac/Linux).",
      "O terminal precisa estar na MESMA pasta do arquivo, ou usar o caminho completo.",
      "input() sempre retorna texto — converta com int() ou float() para fazer contas.",
      "f-strings (f\"texto {variavel}\") são a forma moderna de juntar texto com variáveis.",
      "Salve sempre com codificação UTF-8 para evitar problemas com acentos e ç.",
      "Não use o Bloco de Notas para projetos sérios — ele troca a extensão por .txt sem avisar.",
      "Se o erro é \"can't open file\", você está executando da pasta errada.",
    ],
    alerts: [
      {
        type: "warning",
        content: "O Bloco de Notas do Windows tenta salvar como ola.py.txt. Ative \"Mostrar extensões de arquivo\" no Explorer e confira o nome real.",
      },
      {
        type: "tip",
        content: "No terminal, comece a digitar o nome do arquivo e aperte Tab. O terminal completa sozinho — é o jeito mais rápido de evitar erros de digitação.",
      },
      {
        type: "success",
        content: "Adquira o hábito de criar uma pasta só para seus estudos de Python. Algo como Documentos/python/ ajuda a se manter organizado desde o início.",
      },
    ],
  },
  {
    slug: "editores-ides",
    section: "instalacao",
    title: "Editores e IDEs",
    difficulty: "iniciante",
    subtitle: "VS Code, PyCharm, Jupyter e o que escolher para começar.",
    intro: `Você pode escrever Python no Bloco de Notas, mas isso é como pintar uma parede com pincel de cílios: dá, mas é sofrido. Editores e IDEs são programas feitos para escrever código com conforto: eles colorem palavras-chave, completam o que você digita, mostram erros antes de você executar e ajudam a navegar entre arquivos.

A diferença entre "editor" e "IDE" é só de tamanho. Um editor (como o VS Code) é leve e ganha super-poderes através de extensões. Uma IDE (Ambiente Integrado de Desenvolvimento, como o PyCharm) já vem com tudo embutido: debugger, controle de versão, ferramentas de teste. IDEs costumam ser mais pesadas, mas pedem menos configuração inicial.

Existe ainda um terceiro tipo: o Jupyter Notebook. Em vez de um arquivo único, você trabalha em "células" — pequenos pedaços de código que rodam separadamente, com texto e gráficos no meio. É o queridinho de quem trabalha com dados e ciência.

Para quem está começando hoje, a recomendação é simples: instale o VS Code, adicione a extensão Python da Microsoft e seja feliz. Ele é gratuito, leve, popular e vai te acompanhar até em projetos profissionais.`,
    codes: [
      {
        lang: "bash",
        code: `# VS Code — baixe em https://code.visualstudio.com
# Depois de instalar, abra o VS Code e:
# 1. Aperte Ctrl+Shift+X (Cmd+Shift+X no Mac) para abrir extensões
# 2. Procure por "Python" da Microsoft
# 3. Clique em Install

# Para abrir uma pasta no VS Code pelo terminal:
code .       # abre a pasta atual no VS Code`,
      },
      {
        lang: "bash",
        code: `# PyCharm — IDE completa da JetBrains
# https://www.jetbrains.com/pycharm/download
# Existem duas versões:
#   - Community: gratuita, suficiente para 95% dos casos
#   - Professional: paga, com suporte a Django, banco de dados, etc.

# Para estudantes, a Professional é gratuita com e-mail .edu`,
      },
      {
        lang: "bash",
        code: `# Jupyter Notebook — ideal para análise de dados
# Instale via pip:
pip install notebook

# Inicie o servidor:
jupyter notebook

# Abre uma aba no navegador onde você cria notebooks (.ipynb).
# Cada célula roda separadamente com Shift+Enter.`,
      },
      {
        lang: "python",
        code: `# Exemplo de célula em um notebook Jupyter
# Célula 1: importa e prepara dados
import math
raio = 5

# Célula 2: usa o que foi definido na célula anterior
area = math.pi * raio ** 2
print(f"Área do círculo: {area:.2f}")
# saída: Área do círculo: 78.54`,
      },
      {
        lang: "bash",
        code: `# Outras opções populares:
# - Thonny (https://thonny.org): super amigável para crianças e iniciantes
# - Sublime Text: rápido e elegante, mas pago após período de teste
# - Vim/Neovim: leve e poderoso, mas curva de aprendizado íngreme
# - Replit (https://replit.com): rodar Python no navegador, sem instalar nada`,
      },
    ],
    points: [
      "VS Code + extensão Python da Microsoft é a recomendação para 90% dos iniciantes.",
      "PyCharm Community é gratuita e ótima se você prefere tudo já configurado.",
      "Jupyter Notebook é ideal para ciência de dados, gráficos e exploração.",
      "Editores são leves e extensíveis; IDEs são pesadas mas \"completas de fábrica\".",
      "Thonny é a escolha mais amigável para quem nunca abriu um editor de código.",
      "Replit roda Python no navegador — útil quando você não pode instalar nada.",
      "Não troque de editor toda semana: escolha um e foque em aprender Python.",
      "Instale a extensão Python OFICIAL (publisher: Microsoft) — há cópias falsas no marketplace.",
    ],
    alerts: [
      {
        type: "tip",
        content: "No VS Code, aperte F5 para rodar o arquivo Python aberto. Aperte Ctrl+\\` (acento grave) para abrir o terminal integrado sem sair do editor.",
      },
      {
        type: "info",
        content: "Notebooks Jupyter são ótimos para experimentar, mas não são ideais para programas que rodam sozinhos. Para apps de verdade, use scripts .py normais.",
      },
      {
        type: "warning",
        content: "Cuidado ao instalar extensões: algumas pedem permissões pesadas. Cheque o número de downloads e o autor antes de clicar em Install.",
      },
      {
        type: "success",
        content: "Aprenda os atalhos do seu editor. Quem domina Ctrl+P, Ctrl+Shift+F e Ctrl+D no VS Code economiza horas por semana.",
      },
    ],
  },
  {
    slug: "pip-pacotes",
    section: "instalacao",
    title: "Instalando pacotes com pip",
    difficulty: "iniciante",
    subtitle: "Usando o gerenciador oficial para baixar bibliotecas prontas.",
    intro: `O Python sozinho já vem com muita coisa, mas a verdadeira força da linguagem está nos milhares de pacotes prontos que outras pessoas escreveram e disponibilizaram. Quer fazer requisições HTTP? Existe \`requests\`. Quer manipular planilhas Excel? Tem \`openpyxl\`. Quer treinar um modelo de IA? \`scikit-learn\` e \`torch\` te esperam.

O \`pip\` é o gerenciador de pacotes oficial do Python. Ele baixa esses pacotes do PyPI (Python Package Index, o "armazém" oficial em pypi.org) e instala no seu computador. É como uma loja de aplicativos só para Python: tudo gratuito, tudo aberto, com mais de 500 mil pacotes disponíveis.

Usar o pip é simples: \`pip install nome-do-pacote\`. Em alguns segundos, o pacote está disponível para você usar com \`import\`. Para remover, \`pip uninstall\`. Para listar o que está instalado, \`pip list\`.

A grande pegadinha do pip aparece quando você instala tudo "globalmente": projetos diferentes começam a brigar entre si por versões diferentes da mesma biblioteca. A solução para isso são os ambientes virtuais, que vem no próximo capítulo. Por agora, foque em entender o pip.`,
    codes: [
      {
        lang: "bash",
        code: `# Verifique se o pip está disponível
pip --version
# saída: pip 24.0 from /usr/lib/python3/... (python 3.12)

# Em alguns sistemas o comando é pip3:
pip3 --version`,
      },
      {
        lang: "bash",
        code: `# Instalando o pacote requests, popular para fazer chamadas HTTP
pip install requests

# saída resumida:
# Collecting requests
#   Downloading requests-2.32.3-py3-none-any.whl
# Successfully installed requests-2.32.3 ...`,
      },
      {
        lang: "python",
        code: `# Depois de instalado, use no seu código com import
import requests

resposta = requests.get("https://api.github.com")
print(resposta.status_code)   # 200 = deu certo
print(resposta.json()["current_user_url"])`,
      },
      {
        lang: "bash",
        code: `# Instalando uma versão específica (útil quando o tutorial pede X.Y)
pip install "requests==2.31.0"          # exatamente essa versão
pip install "requests>=2.30,<3.0"       # entre 2.30 e 3.0

# Atualizando um pacote já instalado
pip install --upgrade requests`,
      },
      {
        lang: "bash",
        code: `# Listando o que está instalado
pip list

# Vendo detalhes de um pacote específico
pip show requests
# Mostra versão, autor, dependências, localização no disco

# Removendo um pacote
pip uninstall requests`,
      },
      {
        lang: "bash",
        code: `# Salvando todas as dependências do projeto em requirements.txt
pip freeze > requirements.txt

# Em outro computador, instale tudo de uma vez
pip install -r requirements.txt
# Esse arquivo é o "lista de compras" do seu projeto`,
      },
    ],
    points: [
      "pip = gerenciador oficial de pacotes do Python; baixa do PyPI (pypi.org).",
      "pip install nome instala; pip uninstall nome remove; pip list mostra o que tem.",
      "Especifique versões com == ou intervalos com >=,< para evitar surpresas.",
      "pip freeze > requirements.txt salva a lista exata; pip install -r reinstala.",
      "Em alguns sistemas o comando é pip3 — use o que casar com seu python3.",
      "Não use sudo pip install no Linux/macOS — bagunça o Python do sistema.",
      "Sempre instale dentro de um ambiente virtual (próximo capítulo) para isolar projetos.",
      "Cuidado com pacotes de nome parecido (typosquatting): requets é diferente de requests.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca rode sudo pip install no macOS ou Linux. Isso instala pacotes no Python do sistema e pode quebrar atualizações do próprio sistema operacional.",
      },
      {
        type: "warning",
        content: "Instalar pacotes globalmente leva ao \"inferno das dependências\": dois projetos pedindo versões diferentes da mesma lib quebram um ao outro.",
      },
      {
        type: "tip",
        content: "Se pip está desatualizado, atualize com python -m pip install --upgrade pip. Use python -m pip em vez de pip puro para garantir o pip do Python certo.",
      },
      {
        type: "info",
        content: "PyPI tem mais de 500 mil pacotes. Antes de criar algo do zero, sempre vale procurar — provavelmente já existe.",
      },
    ],
  },
  {
    slug: "ambientes-virtuais",
    section: "instalacao",
    title: "Ambientes virtuais (venv)",
    difficulty: "iniciante",
    subtitle: "Isolando dependências para que projetos não briguem entre si.",
    intro: `Imagine que você está cozinhando dois pratos diferentes ao mesmo tempo. Se misturar tudo na mesma panela, vira uma confusão. Em programação acontece a mesma coisa: o projeto A pede o pacote \`django\` versão 3, o projeto B pede a versão 5. Se você instalar tudo no mesmo Python, um vai sobrescrever o outro e nada funciona direito.

Um ambiente virtual (venv) resolve isso criando uma "panela" separada para cada projeto. Cada venv tem seu próprio Python e seus próprios pacotes, totalmente isolados do sistema e dos outros projetos. É como ter vários computadores Python dentro do mesmo computador.

O Python já vem com a ferramenta \`venv\` embutida — não precisa instalar nada. O fluxo é: criar o ambiente dentro da pasta do projeto, ativar (entrar nele), instalar os pacotes que precisar e desativar quando terminar. Quando você ativa, o terminal muda: aparece \`(.venv)\` no início, indicando que tudo que você instalar fica restrito a esse ambiente.

Adquira o hábito desde já: todo projeto novo, primeiro passo é criar um venv. Isso economiza horas de debugging no futuro e é considerado profissionalismo básico em Python.`,
    codes: [
      {
        lang: "bash",
        code: `# 1. Entre na pasta do seu projeto
mkdir meu-projeto
cd meu-projeto

# 2. Crie o ambiente virtual (geralmente chamado .venv)
python3 -m venv .venv

# Isso cria a pasta .venv com um Python isolado dentro.
# Não precisa entender o que tem dentro — não mexa nela.`,
      },
      {
        lang: "bash",
        code: `# 3. Ative o ambiente

# macOS / Linux:
source .venv/bin/activate

# Windows (PowerShell):
.venv\\Scripts\\Activate.ps1

# Windows (cmd):
.venv\\Scripts\\activate.bat

# Depois de ativado, o prompt fica assim:
# (.venv) usuario@maquina:~/meu-projeto$`,
      },
      {
        lang: "bash",
        code: `# 4. Confirme que o pip e o python agora apontam para o venv
which python    # macOS/Linux  → .../meu-projeto/.venv/bin/python
where python    # Windows      → ...\\meu-projeto\\.venv\\Scripts\\python.exe

# Agora pode instalar pacotes sem medo de quebrar nada fora:
pip install requests pandas`,
      },
      {
        lang: "bash",
        code: `# 5. Trabalhe normalmente: rode scripts, instale mais pacotes, etc.
python meu_script.py

# 6. Quando terminar, desative o ambiente
deactivate
# O (.venv) some do prompt — você voltou ao Python do sistema.`,
      },
      {
        lang: "bash",
        code: `# Salvando e restaurando as dependências do venv
pip freeze > requirements.txt   # lista tudo que está instalado

# Em outro computador (ou amanhã, num venv novo):
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`,
      },
      {
        lang: "bash",
        code: `# Ignorando o venv no Git
# Crie um arquivo .gitignore com:
echo ".venv/" >> .gitignore

# O venv NUNCA deve ir para o Git: ele é grande, depende do SO
# e pode ser recriado em segundos com requirements.txt.`,
      },
    ],
    points: [
      "venv isola pacotes por projeto, evitando conflitos de versão entre eles.",
      "Crie com python3 -m venv .venv dentro da pasta do projeto.",
      "Ative com source .venv/bin/activate (Unix) ou .venv\\Scripts\\activate (Windows).",
      "O prompt mostra (.venv) quando o ambiente está ativo — confira sempre.",
      "Use pip freeze > requirements.txt para registrar e compartilhar dependências.",
      "Adicione .venv/ ao .gitignore — venvs nunca vão para o Git.",
      "Esquecer de ativar e instalar global é o erro mais comum — confira o prompt.",
      "Se renomear ou mover a pasta do projeto, o venv quebra; recrie do zero.",
    ],
    alerts: [
      {
        type: "warning",
        content: "No Windows PowerShell, ativar pode falhar com \"execution of scripts is disabled\". Rode uma vez: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned.",
      },
      {
        type: "success",
        content: "Adquira o hábito: novo projeto = nova pasta = novo venv. Em três meses você vai agradecer ao seu eu de hoje por isso.",
      },
      {
        type: "tip",
        content: "Configure o VS Code para detectar venvs automaticamente. Ele pergunta se quer usar o interpretador do .venv ao abrir a pasta — diga sim.",
      },
      {
        type: "info",
        content: "O nome .venv (com ponto) é convenção: pastas com ponto são ocultas em Linux/macOS, então não poluem a listagem do projeto.",
      },
    ],
  },
  {
    slug: "uv-poetry",
    section: "instalacao",
    title: "Gerenciadores modernos: uv e poetry",
    difficulty: "intermediario",
    subtitle: "Alternativas mais rápidas e completas ao pip + venv tradicional.",
    intro: `O combo \`pip\` + \`venv\` funciona, mas tem limitações. É lento (instalar pacotes pesados leva minutos), não resolve dependências de forma robusta (você pode acabar com versões incompatíveis sem perceber) e exige vários comandos manuais. Por isso, a comunidade Python criou ferramentas modernas que fazem tudo melhor.

O \`uv\` é o mais novo e impressionante. Escrito em Rust, ele instala pacotes de 10 a 100 vezes mais rápido que o pip. Ele cria venvs sozinho, gerencia versões do Python e tem comandos curtos. É a aposta do momento.

O \`poetry\` é mais maduro e voltado para projetos sérios. Ele controla dependências em um arquivo \`pyproject.toml\` (padrão moderno do Python), gera um \`poetry.lock\` que garante que todo mundo no time tenha exatamente as mesmas versões, e ainda ajuda a publicar pacotes no PyPI.

Você não é obrigado a usar nenhum dos dois agora — pip + venv ensina os fundamentos. Mas em projetos profissionais, especialmente em times, você vai esbarrar com esses nomes. Vale conhecer os comandos básicos para não ficar perdido quando aparecerem.`,
    codes: [
      {
        lang: "bash",
        code: `# Instalando o uv (uma vez por máquina)

# macOS / Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell):
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Confirme:
uv --version`,
      },
      {
        lang: "bash",
        code: `# Fluxo básico com uv — bem mais rápido que pip+venv
uv init meu-projeto       # cria a pasta com pyproject.toml e tudo
cd meu-projeto

uv add requests pandas    # adiciona pacotes ao projeto
uv run python app.py      # roda o script no ambiente do projeto

# uv cuida do venv automaticamente — você não precisa ativar nada.`,
      },
      {
        lang: "bash",
        code: `# Instalando o poetry (uma vez por máquina)
curl -sSL https://install.python-poetry.org | python3 -

# Confirme:
poetry --version`,
      },
      {
        lang: "bash",
        code: `# Fluxo básico com poetry
poetry new meu-projeto    # cria estrutura completa de projeto
cd meu-projeto

poetry add requests       # adiciona dependência
poetry add --dev pytest   # adiciona dependência só para desenvolvimento

poetry install            # instala tudo do pyproject.toml
poetry run python app.py  # roda no ambiente do projeto`,
      },
      {
        lang: "bash",
        code: `# Comparação rápida — instalando pandas (pacote pesado)

# pip tradicional:
time pip install pandas
# real    0m18.234s

# uv (do mesmo projeto, sem cache):
time uv add pandas
# real    0m1.812s   ← cerca de 10x mais rápido`,
      },
      {
        lang: "bash",
        code: `# Saindo do ambiente do projeto

# Com uv: não precisa — uv run isola automaticamente
# Com poetry: poetry shell ativa, exit sai

# Para projetos novos hoje (2024+), uv é a escolha mais simples.
# Para projetos legados ou times grandes, poetry continua sólido.`,
      },
    ],
    points: [
      "uv é escrito em Rust e instala pacotes 10 a 100x mais rápido que o pip.",
      "uv cria e gerencia venvs sozinho — você não precisa ativar nada manualmente.",
      "poetry usa pyproject.toml (padrão moderno) e gera lock para builds reproduzíveis.",
      "Ambos separam dependências de produção das de desenvolvimento (dev-dependencies).",
      "Em times, o lockfile garante que todos tenham EXATAMENTE as mesmas versões.",
      "uv add e poetry add já atualizam o pyproject.toml automaticamente.",
      "Evite misturar pip e poetry no mesmo projeto — eles brigam pelo controle.",
      "Saber pip+venv ainda é fundamental: muito código antigo usa só isso.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para um projeto novo em 2024+, uv é a escolha mais simples e rápida. Para times que já usam poetry, mantenha poetry — não troque por troca.",
      },
      {
        type: "info",
        content: "Ambos uv e poetry usam pyproject.toml, que é o padrão oficial do Python (PEP 621). Esse arquivo veio para substituir requirements.txt e setup.py.",
      },
      {
        type: "warning",
        content: "Não misture comandos pip e poetry no mesmo projeto. Se começou com poetry, use só poetry add. Misturar bagunça o lockfile e quebra builds.",
      },
    ],
  },
  {
    slug: "estrutura-projeto",
    section: "instalacao",
    title: "Estrutura recomendada de projetos",
    difficulty: "intermediario",
    subtitle: "Como organizar pastas, módulos e arquivos de configuração.",
    intro: `Um script de 20 linhas cabe em qualquer arquivo. Mas quando seu projeto cresce — vira 5 arquivos, depois 20, depois um sistema com testes, documentação e dependências — a organização vira tão importante quanto o código. Um projeto desorganizado é um pesadelo para manter, mesmo que você seja o autor.

A comunidade Python convencionou uma estrutura padrão para projetos. Ela separa o código fonte (em uma pasta \`src/\` ou no nome do pacote), os testes (em \`tests/\`), a documentação, e na raiz ficam os arquivos de configuração: \`pyproject.toml\`, \`README.md\`, \`.gitignore\`, \`requirements.txt\` (ou equivalente).

Seguir essa convenção tem três benefícios. Primeiro, qualquer pessoa que abrir seu projeto sabe onde achar as coisas. Segundo, ferramentas como pytest, black e ruff esperam essa estrutura. Terceiro, fica fácil transformar o projeto em um pacote instalável no futuro, se você quiser compartilhar.

Não exagere no começo. Um projeto pequeno não precisa de \`docs/\`, \`examples/\` e cinco subpastas. Mas quanto antes adotar a base (\`src/\`, \`tests/\`, \`pyproject.toml\`, \`README.md\`), mais fácil será crescer sem refatorar tudo depois.`,
    codes: [
      {
        lang: "bash",
        code: `# Estrutura mínima para um projeto pequeno
meu-projeto/
├── .gitignore
├── .venv/              # ambiente virtual (nunca vai para o Git)
├── README.md           # explica o que o projeto faz
├── requirements.txt    # ou pyproject.toml
└── app.py              # ponto de entrada principal`,
      },
      {
        lang: "bash",
        code: `# Estrutura recomendada para projeto que vai crescer
meu-projeto/
├── .gitignore
├── .venv/
├── README.md
├── pyproject.toml          # configuração e dependências
├── src/
│   └── meu_pacote/         # código principal vira um pacote
│       ├── __init__.py     # marca a pasta como pacote Python
│       ├── main.py
│       ├── models.py
│       └── utils.py
└── tests/
    ├── __init__.py
    ├── test_models.py
    └── test_utils.py`,
      },
      {
        lang: "python",
        code: `# Arquivo: src/meu_pacote/__init__.py
# Esse arquivo (mesmo vazio) marca a pasta como um pacote Python.
# Pode também expor o que será visível ao importar o pacote.

from .models import Usuario
from .utils import formatar_cpf

__version__ = "0.1.0"`,
      },
      {
        lang: "python",
        code: `# Arquivo: src/meu_pacote/utils.py
def formatar_cpf(cpf: str) -> str:
    """Recebe '12345678900' e devolve '123.456.789-00'."""
    cpf = cpf.zfill(11)                    # garante 11 dígitos
    return f"{cpf[:3]}.{cpf[3:6]}.{cpf[6:9]}-{cpf[9:]}"

# Arquivo: tests/test_utils.py
from meu_pacote.utils import formatar_cpf

def test_formatar_cpf():
    assert formatar_cpf("12345678900") == "123.456.789-00"`,
      },
      {
        lang: "bash",
        code: `# .gitignore mínimo para projetos Python
# (cole esse conteúdo no arquivo .gitignore)

.venv/
__pycache__/
*.pyc
.env
.pytest_cache/
.mypy_cache/
*.egg-info/
dist/
build/`,
      },
      {
        lang: "bash",
        code: `# Exemplo de pyproject.toml para projeto simples
[project]
name = "meu-pacote"
version = "0.1.0"
description = "Meu primeiro projeto Python organizado"
authors = [{ name = "Ana Lima", email = "ana@example.com" }]
requires-python = ">=3.10"
dependencies = [
  "requests>=2.30",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"`,
      },
    ],
    points: [
      "Separe o código em src/ e os testes em tests/ desde projetos pequenos.",
      "Todo pacote Python precisa de __init__.py (mesmo vazio) na raiz da pasta.",
      "pyproject.toml é o arquivo de configuração padrão moderno (substitui setup.py).",
      "README.md na raiz é o cartão de visitas: explique o que faz, como instalar, como rodar.",
      ".gitignore evita subir lixo (venv, __pycache__, .env com segredos).",
      "Não invente sua própria estrutura — siga a convenção para que ferramentas funcionem.",
      "Não coloque .env (com senhas) no Git, NUNCA — é vazamento de segurança imediato.",
      "Para projetos pequenos, app.py + .venv + requirements.txt já é estrutura suficiente.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca versione arquivos .env, credenciais ou chaves de API no Git. Mesmo apagar depois não resolve — o histórico mantém o segredo para sempre.",
      },
      {
        type: "tip",
        content: "Comece com a estrutura mínima e cresça conforme a necessidade. Não crie docs/ e examples/ se ainda não tem o que documentar.",
      },
      {
        type: "info",
        content: "A pasta __pycache__ aparece sozinha quando você roda Python. Ela contém código compilado em cache — pode (e deve) ser ignorada no Git.",
      },
      {
        type: "success",
        content: "Boa prática: use ferramentas como ruff e black para padronizar o estilo do código automaticamente. Configure no pyproject.toml e rode antes de cada commit.",
      },
    ],
  },
  {
    slug: "hello-world-completo",
    section: "instalacao",
    title: "Hello World completo",
    difficulty: "iniciante",
    subtitle: "Um primeiro programa que de fato faz algo útil, do zero ao fim.",
    intro: `O clássico "Hello, World!" mostra que o Python está vivo, mas não ensina quase nada. Vamos juntar tudo que vimos até agora — instalação, REPL, scripts, editor, pip e venv — em um pequeno projeto que faz alguma coisa de verdade. Você vai criar uma calculadora de gorjeta de restaurante.

A ideia é simples: o programa pergunta o valor da conta, a porcentagem de gorjeta e quantas pessoas vão dividir. Em troca, mostra quanto cada um paga. Pequeno, sim, mas usa entrada do usuário, conversão de tipos, contas, formatação de saída e organização básica em funções.

Esse exercício consolida o fluxo completo: criar pasta, criar venv, ativar, escrever código, executar. Se você conseguir fazer esse aqui sozinho, está oficialmente preparado para começar a estudar a linguagem em si nas próximas seções (variáveis, tipos, condicionais, loops).

Não pule. Mesmo que pareça bobo, digite cada linha — não copie e cole. O cérebro aprende programação fazendo, errando e corrigindo. Esse é o caminho.`,
    codes: [
      {
        lang: "bash",
        code: `# Passo 1: criar a pasta do projeto e entrar nela
mkdir gorjeta
cd gorjeta

# Passo 2: criar e ativar o venv
python3 -m venv .venv
source .venv/bin/activate    # Windows: .venv\\Scripts\\activate

# Passo 3: criar o arquivo principal no editor
code gorjeta.py              # abre no VS Code (ou use seu editor preferido)`,
      },
      {
        lang: "python",
        code: `# Arquivo: gorjeta.py
# Calculadora de gorjeta — primeira versão, sem funções

print("=== Calculadora de Gorjeta ===")

# input devolve texto; convertemos para número
conta = float(input("Valor da conta (R$): "))
porcentagem = float(input("Gorjeta (%): "))
pessoas = int(input("Quantas pessoas? "))

# A conta: gorjeta em reais e total a pagar
gorjeta = conta * (porcentagem / 100)
total = conta + gorjeta
por_pessoa = total / pessoas

# :.2f garante 2 casas decimais (padrão de dinheiro)
print(f"Gorjeta: R$ {gorjeta:.2f}")
print(f"Total:   R$ {total:.2f}")
print(f"Cada um: R$ {por_pessoa:.2f}")`,
      },
      {
        lang: "bash",
        code: `# Passo 4: rodar o programa
python gorjeta.py
# === Calculadora de Gorjeta ===
# Valor da conta (R$): 180
# Gorjeta (%): 10
# Quantas pessoas? 4
# Gorjeta: R$ 18.00
# Total:   R$ 198.00
# Cada um: R$ 49.50`,
      },
      {
        lang: "python",
        code: `# Versão 2: organizando em funções (mais profissional)
# Arquivo: gorjeta.py

def calcular_gorjeta(conta: float, porcentagem: float) -> float:
    """Devolve o valor da gorjeta em reais."""
    return conta * (porcentagem / 100)

def dividir_total(total: float, pessoas: int) -> float:
    """Divide o total pelo número de pessoas."""
    return total / pessoas

def main() -> None:
    print("=== Calculadora de Gorjeta ===")
    conta = float(input("Valor da conta (R$): "))
    porcentagem = float(input("Gorjeta (%): "))
    pessoas = int(input("Quantas pessoas? "))

    gorjeta = calcular_gorjeta(conta, porcentagem)
    total = conta + gorjeta
    por_pessoa = dividir_total(total, pessoas)

    print(f"Gorjeta: R$ {gorjeta:.2f}")
    print(f"Total:   R$ {total:.2f}")
    print(f"Cada um: R$ {por_pessoa:.2f}")

# Esse if garante que main() só roda quando o arquivo é executado direto.
# Se outro arquivo importar este, main() NÃO é chamado automaticamente.
if __name__ == "__main__":
    main()`,
      },
      {
        lang: "python",
        code: `# Versão 3: tratando entradas erradas com try/except
# (sem isso, digitar "abc" no valor da conta quebra o programa)

def pedir_numero(msg: str, tipo=float):
    while True:
        try:
            return tipo(input(msg))
        except ValueError:
            print("Valor inválido. Tente de novo.")

def main():
    print("=== Calculadora de Gorjeta ===")
    conta = pedir_numero("Valor da conta (R$): ", float)
    porcentagem = pedir_numero("Gorjeta (%): ", float)
    pessoas = pedir_numero("Quantas pessoas? ", int)

    gorjeta = conta * (porcentagem / 100)
    total = conta + gorjeta
    por_pessoa = total / pessoas

    print(f"Gorjeta: R$ {gorjeta:.2f}")
    print(f"Total:   R$ {total:.2f}")
    print(f"Cada um: R$ {por_pessoa:.2f}")

if __name__ == "__main__":
    main()`,
      },
      {
        lang: "bash",
        code: `# Passo 5: salvar dependências (mesmo que ainda nenhuma)
pip freeze > requirements.txt

# Passo 6: criar um README simples
echo "# Calculadora de Gorjeta" > README.md
echo "Programa que divide a conta com gorjeta entre amigos." >> README.md

# Passo 7: desativar o venv quando terminar
deactivate`,
      },
    ],
    points: [
      "Esse capítulo amarra todo o fluxo: pasta + venv + arquivo + execução.",
      "input() devolve string — sempre converta com float() ou int() para fazer contas.",
      "f-strings com :.2f formatam números com 2 casas decimais (padrão de dinheiro).",
      "Quebrar o código em funções pequenas torna o programa mais fácil de ler e testar.",
      "if __name__ == \"__main__\" garante que main() só roda quando executado direto.",
      "try/except evita que o programa quebre se o usuário digitar texto onde esperava número.",
      "Digite cada linha em vez de copiar e colar — o cérebro aprende fazendo.",
      "Crie README.md mesmo em projetos pequenos, é hábito de programador profissional.",
    ],
    alerts: [
      {
        type: "success",
        content: "Se você chegou até aqui e o programa rodou, parabéns: você já sabe o ciclo completo de criar, executar e organizar um projeto Python do zero.",
      },
      {
        type: "tip",
        content: "Modifique o programa: adicione uma opção de incluir taxa de serviço, ou perguntar se a gorjeta vai por pessoa. Praticar mexendo é o melhor treino.",
      },
      {
        type: "info",
        content: "O bloco if __name__ == \"__main__\" parece estranho agora, mas é convenção universal em Python. Você vai entender 100% quando estudar módulos.",
      },
      {
        type: "warning",
        content: "Se esqueceu de ativar o venv e instalou pacotes, eles foram para o Python global. Não é o fim do mundo, mas pegue o hábito de conferir o (.venv) no prompt.",
      },
    ],
  },
];
