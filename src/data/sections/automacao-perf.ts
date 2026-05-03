import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "automacao-arquivos",
    section: "automacao-perf",
    title: "Automação: organizar arquivos",
    difficulty: "intermediario",
    subtitle: "Um script que arruma sua pasta de Downloads sozinho.",
    intro: `A pasta Downloads é o porão da sua vida digital. Imagens, PDFs, instaladores, planilhas e zips se acumulam até virar uma sopa que demora minutos para você atravessar atrás de um arquivo. Fazer essa faxina na mão é tedioso, e justamente por ser tedioso é o tipo de tarefa perfeita para a programação resolver.

A boa notícia é que o Python já vem com tudo que você precisa para mexer em arquivos: os módulos \`pathlib\` e \`shutil\`. Você não precisa instalar nada extra. Em poucas linhas dá para listar uma pasta, descobrir a extensão de cada arquivo e mandar cada um para uma subpasta diferente, agrupando por tipo.

Neste capítulo vamos montar, passo a passo, um pequeno script que olha uma pasta, decide o destino de cada arquivo pela extensão e faz a mudança. Vamos começar com o caso mais simples possível e ir adicionando segurança: criar pastas que não existem, evitar sobrescrever arquivos com o mesmo nome e fazer um teste a seco antes de mover de verdade. Quando você terminar vai ter uma ferramenta de verdade, daquelas que dá para rodar toda semana e nunca mais pensar no assunto.`,
    codes: [
      {
        lang: "python",
        code: `from pathlib import Path

# Path representa um caminho no sistema; é melhor que strings cruas
pasta = Path.home() / "Downloads"

# iterdir() lista o conteúdo direto da pasta (sem entrar em subpastas)
for arquivo in pasta.iterdir():
    print(arquivo.name, "->", arquivo.suffix)`,
      },
      {
        lang: "python",
        code: `from pathlib import Path

# Mapa de extensão -> nome da subpasta de destino
DESTINOS = {
    ".pdf": "PDFs",
    ".png": "Imagens",
    ".jpg": "Imagens",
    ".jpeg": "Imagens",
    ".zip": "Compactados",
    ".xlsx": "Planilhas",
    ".csv": "Planilhas",
}

def categoria(arquivo: Path) -> str:
    # suffix vem com ponto e em maiúsculo varia; normalizamos para minúsculo
    return DESTINOS.get(arquivo.suffix.lower(), "Outros")

print(categoria(Path("relatorio.PDF")))  # → PDFs
print(categoria(Path("musica.mp3")))     # → Outros`,
      },
      {
        lang: "python",
        code: `import shutil
from pathlib import Path

pasta = Path.home() / "Downloads"

for arquivo in pasta.iterdir():
    if not arquivo.is_file():
        continue  # pula subpastas, atalhos, etc.

    destino_dir = pasta / categoria(arquivo)
    # mkdir cria a pasta; parents=True cria pais; exist_ok evita erro se já existe
    destino_dir.mkdir(parents=True, exist_ok=True)

    destino = destino_dir / arquivo.name
    shutil.move(str(arquivo), str(destino))
    print(f"movi {arquivo.name} -> {destino_dir.name}/")`,
      },
      {
        lang: "python",
        code: `from pathlib import Path

def caminho_unico(destino: Path) -> Path:
    # Se já existe um arquivo com o mesmo nome, adiciona (1), (2)...
    if not destino.exists():
        return destino
    base, ext = destino.stem, destino.suffix
    i = 1
    while True:
        novo = destino.with_name(f"{base} ({i}){ext}")
        if not novo.exists():
            return novo
        i += 1

print(caminho_unico(Path("/tmp/teste.txt")))`,
      },
      {
        lang: "python",
        code: `import shutil
from pathlib import Path

def organizar(pasta: Path, dry_run: bool = True) -> None:
    """Move arquivos por extensão. Se dry_run=True, só mostra o que faria."""
    for arquivo in pasta.iterdir():
        if not arquivo.is_file():
            continue
        destino_dir = pasta / categoria(arquivo)
        destino = caminho_unico(destino_dir / arquivo.name)
        if dry_run:
            print(f"[simulação] {arquivo.name} -> {destino}")
        else:
            destino_dir.mkdir(parents=True, exist_ok=True)
            shutil.move(str(arquivo), str(destino))

# Sempre rode primeiro com dry_run=True para conferir
organizar(Path.home() / "Downloads", dry_run=True)`,
      },
      {
        lang: "bash",
        code: `# Rodando o script diretamente do terminal
python organizar_downloads.py

# Em alguns sistemas o comando é python3
python3 organizar_downloads.py`,
      },
    ],
    points: [
      "pathlib.Path é o jeito moderno de lidar com caminhos; evite concatenar strings com barras na mão.",
      "iterdir() lista só o nível atual; use rglob('*') quando quiser entrar em subpastas.",
      "shutil.move move entre pastas e funciona até entre discos diferentes; rename do Path não.",
      "Sempre teste com dry_run antes de mover de verdade; uma vez movido, não dá Ctrl+Z.",
      "mkdir(exist_ok=True) é seu amigo: evita o erro chato de pasta já existente.",
      "Normalize a extensão para minúsculo (.lower()) ou você vai esquecer arquivos .JPG e .PDF.",
      "Cuidado com nomes repetidos: dois arquivos com o mesmo nome sobrescrevem se você não tratar.",
      "Tenha um backup antes de rodar scripts que mexem em pastas importantes.",
    ],
    alerts: [
      { type: "warning", content: "shutil.move sobrescreve sem perguntar quando o destino já existe. Use a função caminho_unico ou cheque com destino.exists() antes." },
      { type: "tip", content: "Coloque o caminho da pasta no topo do script como variável. Assim você reaproveita o mesmo código para Documentos, Área de Trabalho, etc." },
      { type: "info", content: "Para agendar a execução automática toda semana, combine este script com schedule, APScheduler ou o Agendador de Tarefas do Windows / cron no Linux." },
    ],
  },
  {
    slug: "automacao-excel",
    section: "automacao-perf",
    title: "Automação: Excel com openpyxl",
    difficulty: "intermediario",
    subtitle: "Lendo, escrevendo e formatando planilhas .xlsx.",
    intro: `Quase todo escritório do Brasil roda em planilhas. Relatórios mensais, controle de estoque, fechamento de vendas, tudo vai parar num arquivo .xlsx que alguém abre, digita, salva e manda por email. Quando essa tarefa se repete, ela é candidata perfeita para ser feita por um script.

A biblioteca \`openpyxl\` é a forma mais direta de mexer em arquivos do Excel modernos (.xlsx) com Python. Ela lê células, escreve fórmulas, cria abas, aplica formatação e tudo isso sem precisar abrir o Excel. O arquivo gerado pode ser aberto normalmente no Excel, no LibreOffice ou no Google Sheets.

Este capítulo te mostra o caminho completo: instalar, abrir uma planilha existente, ler valores, criar uma nova do zero, escrever em massa, aplicar negrito e cores, salvar e até criar várias abas. Para projetos grandes vale combinar com pandas, mas comece dominando o openpyxl puro: você vai entender o que está acontecendo de verdade quando precisar debugar uma célula esquisita depois.`,
    codes: [
      { lang: "bash", code: `pip install openpyxl` },
      {
        lang: "python",
        code: `from openpyxl import load_workbook

# load_workbook abre um arquivo .xlsx existente
wb = load_workbook("vendas.xlsx")

# active pega a aba que estava selecionada quando o arquivo foi salvo
ws = wb.active
print("Aba ativa:", ws.title)

# Ler uma célula pelo endereço estilo Excel
print(ws["A1"].value)

# Ou pelas coordenadas (linha, coluna), começando em 1
print(ws.cell(row=2, column=1).value)`,
      },
      {
        lang: "python",
        code: `from openpyxl import load_workbook

wb = load_workbook("vendas.xlsx")
ws = wb.active

# iter_rows percorre linha a linha; values_only entrega só os valores, sem objetos Cell
total = 0
for linha in ws.iter_rows(min_row=2, values_only=True):
    produto, quantidade, preco = linha
    total += quantidade * preco

print(f"Total faturado: R$ {total:.2f}")`,
      },
      {
        lang: "python",
        code: `from openpyxl import Workbook

# Workbook() cria uma planilha nova em memória (ainda não está em disco)
wb = Workbook()
ws = wb.active
ws.title = "Clientes"

# Cabeçalho
ws.append(["Nome", "Cidade", "Plano"])

# Várias linhas de uma vez
clientes = [
    ("Ana Souza", "Recife", "Pro"),
    ("Bruno Lima", "Curitiba", "Free"),
    ("Carla Dias", "Salvador", "Pro"),
]
for c in clientes:
    ws.append(c)

# save grava o arquivo no disco
wb.save("clientes.xlsx")`,
      },
      {
        lang: "python",
        code: `from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
ws = wb.active
ws.title = "Relatório"
ws.append(["Mês", "Receita"])
ws.append(["Janeiro", 12000])
ws.append(["Fevereiro", 15500])

# Negrito e fundo azul claro no cabeçalho
cabecalho_font = Font(bold=True, color="FFFFFF")
cabecalho_fill = PatternFill("solid", fgColor="1F77B4")
for celula in ws[1]:
    celula.font = cabecalho_font
    celula.fill = cabecalho_fill
    celula.alignment = Alignment(horizontal="center")

# Largura da coluna A
ws.column_dimensions["A"].width = 15

wb.save("relatorio.xlsx")`,
      },
      {
        lang: "python",
        code: `from openpyxl import Workbook

wb = Workbook()
# A primeira aba já vem; vamos renomear
wb.active.title = "Resumo"

# create_sheet adiciona novas abas
wb.create_sheet("Detalhes")
wb.create_sheet("Anexos", 0)  # 0 = primeira posição

print(wb.sheetnames)  # → ['Anexos', 'Resumo', 'Detalhes']

# Acessar uma aba pelo nome
ws_det = wb["Detalhes"]
ws_det["A1"] = "Coluna 1"

wb.save("multi.xlsx")`,
      },
      {
        lang: "python",
        code: `from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws["A1"] = 10
ws["A2"] = 20
ws["A3"] = 30
# openpyxl aceita fórmulas como string começando com =
ws["A4"] = "=SUM(A1:A3)"

wb.save("formulas.xlsx")
# Quando abrir no Excel, A4 vai mostrar 60.
# openpyxl não calcula a fórmula sozinho ao reler o arquivo.`,
      },
    ],
    points: [
      "openpyxl trabalha apenas com .xlsx; para .xls antigo procure xlrd ou converta o arquivo.",
      "Endereços de célula como 'A1' são strings; também dá para usar ws.cell(row, column).",
      "iter_rows com values_only=True é muito mais rápido que percorrer célula por célula.",
      "Workbook() cria do zero; load_workbook() abre arquivo existente.",
      "Cores são strings hex sem o # (ex: 'FFFFFF' para branco).",
      "Lembre de chamar wb.save(); sem isso nada vai pro disco.",
      "openpyxl não recalcula fórmulas; ele só guarda a string. Quem calcula é o Excel ao abrir.",
      "Para milhões de linhas use o modo write_only ou pandas com engine openpyxl.",
    ],
    alerts: [
      { type: "warning", content: "Se você abrir o arquivo no Excel e tentar salvar pelo Python ao mesmo tempo, vai dar PermissionError. Feche o Excel antes." },
      { type: "tip", content: "Para tabelas grandes, considere pandas: df.to_excel('saida.xlsx') é uma linha. Use openpyxl puro quando precisar de formatação fina." },
      { type: "info", content: "openpyxl preserva fórmulas, mas se você abrir e salvar sem o Excel calcular, valores derivados podem ficar desatualizados." },
      { type: "success", content: "Sempre teste num arquivo de exemplo antes de rodar contra a planilha 'oficial'. Erros em produção custam caro." },
    ],
  },
  {
    slug: "automacao-pdf",
    section: "automacao-perf",
    title: "Automação: PDFs",
    difficulty: "intermediario",
    subtitle: "Extraindo texto, juntando, dividindo e gerando PDFs.",
    intro: `PDF é o formato em que o mundo manda contrato, boleto, nota fiscal e relatório. A vantagem é que ele aparece igual em qualquer lugar; a desvantagem é que mexer nele programaticamente sempre foi mais chato que em outros formatos.

Hoje a comunidade Python tem ferramentas boas para as duas tarefas mais comuns: ler texto de PDFs existentes e gerar PDFs novos. Para ler usaremos \`pypdf\` (sucessor do antigo PyPDF2), que separa páginas, junta arquivos e extrai texto simples. Para gerar usaremos \`reportlab\`, que monta layouts, escreve em posições específicas e desenha tabelas.

Uma armadilha clássica: nem todo PDF tem texto de verdade. Boletos digitalizados, contratos escaneados, fotos de documentos viram PDFs que por dentro são imagens. Para esses você precisa de OCR (reconhecimento óptico) com bibliotecas como pytesseract. Vamos focar nos PDFs com texto, que é a maioria, e te avisar quando esse limite aparecer.`,
    codes: [
      { lang: "bash", code: `pip install pypdf reportlab` },
      {
        lang: "python",
        code: `from pypdf import PdfReader

reader = PdfReader("contrato.pdf")
print("Número de páginas:", len(reader.pages))

# Extrair texto da primeira página
primeira = reader.pages[0]
print(primeira.extract_text())`,
      },
      {
        lang: "python",
        code: `from pypdf import PdfReader

reader = PdfReader("relatorio.pdf")

# Concatenar texto de todas as páginas
texto_completo = []
for i, pagina in enumerate(reader.pages, start=1):
    texto = pagina.extract_text() or ""  # pode vir None se a página for imagem
    texto_completo.append(f"--- Página {i} ---\\n{texto}")

with open("relatorio.txt", "w", encoding="utf-8") as f:
    f.write("\\n".join(texto_completo))`,
      },
      {
        lang: "python",
        code: `from pypdf import PdfWriter, PdfReader

writer = PdfWriter()

# Juntar dois PDFs em um só
for arquivo in ["capa.pdf", "miolo.pdf", "contracapa.pdf"]:
    reader = PdfReader(arquivo)
    for pagina in reader.pages:
        writer.add_page(pagina)

with open("livro_final.pdf", "wb") as f:
    writer.write(f)`,
      },
      {
        lang: "python",
        code: `from pypdf import PdfReader, PdfWriter

reader = PdfReader("documento.pdf")

# Salvar só as páginas 1 a 3 num arquivo novo
writer = PdfWriter()
for pagina in reader.pages[0:3]:
    writer.add_page(pagina)

with open("recorte.pdf", "wb") as f:
    writer.write(f)`,
      },
      {
        lang: "python",
        code: `from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

c = canvas.Canvas("recibo.pdf", pagesize=A4)
largura, altura = A4

# O ponto (0,0) fica no canto inferior esquerdo, não no superior!
c.setFont("Helvetica-Bold", 18)
c.drawString(50, altura - 60, "Recibo de Pagamento")

c.setFont("Helvetica", 12)
c.drawString(50, altura - 100, "Cliente: Ana Souza")
c.drawString(50, altura - 120, "Valor: R$ 250,00")
c.drawString(50, altura - 140, "Data: 15/03/2025")

# showPage finaliza a página atual; save grava o arquivo
c.showPage()
c.save()`,
      },
      {
        lang: "python",
        code: `from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

doc = SimpleDocTemplate("relatorio.pdf", pagesize=A4)
estilos = getSampleStyleSheet()

elementos = [Paragraph("Vendas de Março", estilos["Heading1"])]

dados = [
    ["Produto", "Qtd", "Total"],
    ["Caderno", 12, "R$ 240,00"],
    ["Caneta", 50, "R$ 150,00"],
    ["Mochila", 3, "R$ 360,00"],
]
tabela = Table(dados)
tabela.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.lightblue),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
]))
elementos.append(tabela)

doc.build(elementos)`,
      },
    ],
    points: [
      "pypdf substitui o antigo PyPDF2; a API é muito parecida, mas pypdf é mantido.",
      "extract_text() pode retornar texto bagunçado; PDFs não foram desenhados para serem lidos por máquina.",
      "PDF que é só imagem (escaneado) não tem texto algum; você precisa de OCR (pytesseract).",
      "No reportlab, a coordenada (0,0) é o canto inferior esquerdo, não o superior — isso confunde no começo.",
      "Para layouts ricos use platypus (SimpleDocTemplate, Paragraph, Table); evita ficar contando pixels.",
      "Ao escrever PDF abra o arquivo em modo binário ('wb'), nunca em modo texto.",
      "Combinar pypdf (cortar/juntar) com reportlab (gerar) resolve quase todo cenário de automação.",
      "PDFs com proteção/criptografia podem exigir senha em PdfReader; trate o erro com try/except.",
    ],
    alerts: [
      { type: "warning", content: "Nem todo PDF tem texto extraível. Se extract_text() devolver string vazia, provavelmente é um documento escaneado e você precisa de OCR." },
      { type: "info", content: "Para extração com qualidade superior em PDFs complexos, vale conhecer alternativas como pdfplumber ou pymupdf (fitz)." },
      { type: "tip", content: "Para gerar relatórios bonitos com pouco esforço, gere HTML primeiro e converta para PDF com WeasyPrint ou wkhtmltopdf." },
    ],
  },
  {
    slug: "automacao-email",
    section: "automacao-perf",
    title: "Automação: enviando email",
    difficulty: "intermediario",
    subtitle: "Enviando emails com smtplib e bibliotecas modernas.",
    intro: `Mandar email pelo Python é uma das automações mais úteis e mais perigosas que você vai aprender. Útil porque resolve um monte de coisa: aviso de cobrança, relatório semanal, notificação de erro, confirmação de cadastro. Perigosa porque um loop mal escrito pode disparar mil mensagens em segundos e fazer seu remetente cair na lista preta de spam.

O Python tem o módulo \`smtplib\` na biblioteca padrão, que fala o protocolo SMTP. Ele se conecta num servidor (Gmail, Outlook, Amazon SES, Mailgun, ou um servidor próprio), faz login e entrega a mensagem. Para montar a mensagem em si — assunto, corpo, anexos — usamos o módulo \`email.message\`.

Em produção, raramente se usa só smtplib na mão. Times sérios usam serviços transacionais (SendGrid, SES, Postmark) com bibliotecas próprias, que cuidam de retry, métricas e reputação de domínio. Mas entender o smtplib te dá a base de tudo: quando algo der errado, você vai saber por quê.`,
    codes: [
      {
        lang: "python",
        code: `import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg["From"] = "voce@exemplo.com"
msg["To"] = "destinatario@exemplo.com"
msg["Subject"] = "Olá do Python"
msg.set_content("Este email foi enviado por um script.")

# Conexão TLS na porta 587 é o padrão moderno
with smtplib.SMTP("smtp.exemplo.com", 587) as smtp:
    smtp.starttls()
    smtp.login("voce@exemplo.com", "sua-senha-de-app")
    smtp.send_message(msg)

print("Enviado!")`,
      },
      {
        lang: "python",
        code: `import os
import smtplib
from email.message import EmailMessage

# NUNCA escreva senha no código. Leia de variável de ambiente.
EMAIL = os.environ["EMAIL_USER"]
SENHA = os.environ["EMAIL_PASS"]  # use senha de app, não a senha real

def enviar(destino: str, assunto: str, corpo: str) -> None:
    msg = EmailMessage()
    msg["From"] = EMAIL
    msg["To"] = destino
    msg["Subject"] = assunto
    msg.set_content(corpo)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL, SENHA)
        smtp.send_message(msg)

enviar("amigo@exemplo.com", "Teste", "Funcionou!")`,
      },
      {
        lang: "python",
        code: `from email.message import EmailMessage

msg = EmailMessage()
msg["From"] = "voce@exemplo.com"
msg["To"] = "cliente@exemplo.com"
msg["Subject"] = "Seu boleto"

# Versão texto puro como fallback
msg.set_content("Seu boleto está em anexo.")

# Versão HTML para clientes modernos
msg.add_alternative("""
<html>
  <body>
    <h2>Olá, Ana!</h2>
    <p>Seu boleto deste mês está <b>em anexo</b>.</p>
  </body>
</html>
""", subtype="html")`,
      },
      {
        lang: "python",
        code: `from email.message import EmailMessage
from pathlib import Path

msg = EmailMessage()
msg["From"] = "voce@exemplo.com"
msg["To"] = "cliente@exemplo.com"
msg["Subject"] = "Relatório de março"
msg.set_content("Segue o relatório em anexo.")

caminho = Path("relatorio.pdf")
dados = caminho.read_bytes()
msg.add_attachment(
    dados,
    maintype="application",
    subtype="pdf",
    filename=caminho.name,
)`,
      },
      {
        lang: "python",
        code: `import smtplib
from email.message import EmailMessage

destinatarios = ["a@x.com", "b@x.com", "c@x.com"]

with smtplib.SMTP("smtp.exemplo.com", 587) as smtp:
    smtp.starttls()
    smtp.login("voce@exemplo.com", "senha")

    for email_destino in destinatarios:
        msg = EmailMessage()
        msg["From"] = "voce@exemplo.com"
        msg["To"] = email_destino  # um por vez evita expor a lista toda
        msg["Subject"] = "Newsletter"
        msg.set_content("Novidades deste mês...")
        try:
            smtp.send_message(msg)
        except smtplib.SMTPException as e:
            print(f"Falhou para {email_destino}: {e}")`,
      },
      {
        lang: "bash",
        code: `# Bibliotecas mais modernas que cuidam de retry, templates e múltiplos provedores:
pip install emails        # API simples e amigável
pip install yagmail       # Gmail descomplicado
pip install sendgrid      # Cliente oficial SendGrid`,
      },
    ],
    points: [
      "Use porta 587 com STARTTLS ou 465 com SSL; nunca a porta 25 sem criptografia.",
      "Senhas de email vão em variáveis de ambiente, .env ou cofres como AWS Secrets Manager.",
      "Gmail e Outlook exigem senha de aplicativo (não a senha da conta) e 2FA habilitado.",
      "set_content é texto puro; add_alternative com subtype='html' adiciona a versão visual.",
      "Para anexos use add_attachment com maintype/subtype corretos (application/pdf, image/png).",
      "Mandar email para muita gente direto do seu domínio leva à pasta de spam; use SES, SendGrid ou similar.",
      "Sempre cuide de exceções smtplib.SMTPException: rede falha, servidor cai, conta é bloqueada.",
      "Não bote vários endereços no campo To se eles não devem se ver; envie um por vez ou use BCC.",
    ],
    alerts: [
      { type: "danger", content: "Jamais comite credenciais de email no Git. Um bot de varredura encontra a chave em minutos e usa sua conta para enviar spam." },
      { type: "warning", content: "Provedores grandes limitam quantos emails você pode enviar por hora. Loop sem controle resulta em bloqueio temporário ou permanente." },
      { type: "tip", content: "Para emails transacionais de produção, use serviços dedicados (SES, SendGrid, Postmark). Eles entregam melhor, dão métricas e cuidam da reputação." },
      { type: "info", content: "yagmail e emails são bibliotecas mais amigáveis que smtplib puro; valem a pena para projetos pequenos." },
    ],
  },
  {
    slug: "agendamento",
    section: "automacao-perf",
    title: "Agendamento de tarefas",
    difficulty: "intermediario",
    subtitle: "Rodando funções de hora em hora com schedule e APScheduler.",
    intro: `Um script que organiza arquivos é útil, mas só vira automação de verdade quando ele roda sozinho, no horário certo, sem você lembrar. Existem duas grandes formas de agendar uma tarefa Python: deixar o sistema operacional cuidar disso (cron no Linux/macOS, Agendador de Tarefas no Windows) ou usar uma biblioteca dentro do próprio Python.

Quando a tarefa é simples e o sistema é seu, cron resolve. Mas se você precisa que a programação fique no código (versionada no Git), se quer rodar várias tarefas com horários diferentes ou se está dentro de uma aplicação maior, vale usar uma biblioteca. As mais comuns são \`schedule\`, leve e direta, perfeita para começar, e o \`APScheduler\`, mais robusto, com triggers cron, persistência de jobs e suporte a executar em background.

Neste capítulo veremos as duas. Você vai aprender a marcar tarefas para horários fixos, intervalos regulares e padrões cron complexos. Também vamos cobrir as armadilhas: o que acontece se a tarefa demora mais que o intervalo, como evitar que duas execuções rodem ao mesmo tempo e por que o relógio do servidor importa tanto.`,
    codes: [
      { lang: "bash", code: `pip install schedule apscheduler` },
      {
        lang: "python",
        code: `import schedule
import time

def tarefa():
    print("Rodando a cada 10 segundos...")

# every() cria um job; do() registra a função a executar
schedule.every(10).seconds.do(tarefa)

while True:
    # run_pending dispara as tarefas que chegaram a hora
    schedule.run_pending()
    time.sleep(1)`,
      },
      {
        lang: "python",
        code: `import schedule
import time

def relatorio_diario():
    print("Gerando relatório...")

def backup_semanal():
    print("Backup do banco...")

schedule.every().day.at("08:00").do(relatorio_diario)
schedule.every().monday.at("02:30").do(backup_semanal)
schedule.every(15).minutes.do(lambda: print("ping"))

while True:
    schedule.run_pending()
    time.sleep(30)`,
      },
      {
        lang: "python",
        code: `from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

@sched.scheduled_job("interval", minutes=5)
def coletar_metricas():
    print("Coletando métricas a cada 5 minutos")

@sched.scheduled_job("cron", hour=9, minute=0)
def enviar_resumo():
    print("Resumo das 9h")

# start() bloqueia o programa e fica processando os jobs
sched.start()`,
      },
      {
        lang: "python",
        code: `from apscheduler.schedulers.background import BackgroundScheduler
import time

sched = BackgroundScheduler()

# cron com expressão completa: segunda a sexta, às 18:30
sched.add_job(
    lambda: print("Fim de expediente"),
    trigger="cron",
    day_of_week="mon-fri",
    hour=18,
    minute=30,
)

sched.start()  # roda em thread separada; o programa principal continua

print("Aplicação rodando, scheduler em background...")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    sched.shutdown()`,
      },
      {
        lang: "python",
        code: `from apscheduler.schedulers.background import BackgroundScheduler
import logging, time

logging.basicConfig(level=logging.INFO)

sched = BackgroundScheduler()

# max_instances=1 evita que duas execuções rodem em paralelo
# coalesce=True junta execuções perdidas em uma só
sched.add_job(
    lambda: time.sleep(20),
    "interval",
    seconds=10,
    max_instances=1,
    coalesce=True,
    misfire_grace_time=30,
)

sched.start()
time.sleep(60)
sched.shutdown()`,
      },
      {
        lang: "bash",
        code: `# No Linux, agendar via cron é alternativa robusta:
crontab -e

# Linha de exemplo: roda o script todo dia às 08:00
0 8 * * * /usr/bin/python3 /home/eu/script.py >> /home/eu/log.txt 2>&1`,
      },
    ],
    points: [
      "schedule é leve e ótimo para começar; APScheduler é mais robusto e tem triggers cron.",
      "Toda biblioteca Python de agendamento precisa de um loop rodando; ele não 'agenda no SO'.",
      "Se o processo Python morrer, os jobs param. Para resiliência use cron, systemd timer ou supervisor.",
      "Cuidado com tarefas que demoram mais que o intervalo; use max_instances ou trave manualmente.",
      "Sempre logue início e fim das tarefas; é a única forma de saber se elas rodaram.",
      "Fuso horário do servidor importa: APScheduler aceita timezone explícito; aproveite.",
      "schedule não pula automaticamente execuções perdidas; APScheduler aceita misfire_grace_time.",
      "Para escala (filas, workers, retry) considere Celery, Dramatiq ou RQ no lugar de scheduler simples.",
    ],
    alerts: [
      { type: "warning", content: "Se sua tarefa pode demorar mais que o intervalo agendado, configure max_instances=1 ou você terá execuções concorrentes pisando uma na outra." },
      { type: "info", content: "BlockingScheduler trava o programa principal; BackgroundScheduler roda em thread. Escolha conforme sua aplicação." },
      { type: "tip", content: "Em produção, prefira cron + script Python para tarefas simples. Bibliotecas Python dão mais flexibilidade, mas precisam de um processo vivo o tempo todo." },
    ],
  },
  {
    slug: "regex",
    section: "automacao-perf",
    title: "Expressões regulares (re)",
    difficulty: "intermediario",
    subtitle: "Encontrando padrões em texto com o módulo re.",
    intro: `Expressão regular é uma minilinguagem que descreve padrões de texto. Em vez de programar passo a passo "pega cada caractere e veja se é um número, depois...", você escreve algo como \`\\d{11}\` e o Python entende: "onze dígitos seguidos". Essa concisão tem preço: regex parece grego no começo. Mas depois que você sente o jeito, descobre que substitui dezenas de linhas de if e split por uma linha.

Os usos práticos são muitos: validar CPF, encontrar todos os emails dentro de um texto, extrair preços de uma página, separar log por timestamp, limpar HTML, renomear arquivos em lote. O módulo \`re\` da biblioteca padrão cobre tudo isso.

Vamos começar pelos blocos básicos — caracteres literais, classes como \`\\d\` e \`\\w\`, quantificadores como \`+\` e \`*\` — e ir montando padrões úteis. Atenção a um ponto: regex serve para padrões textuais, não para entender significado. Validar email com regex é razoável; entender se uma frase é positiva ou negativa, jamais. Use a ferramenta certa para cada problema.`,
    codes: [
      {
        lang: "python",
        code: `import re

# search procura a primeira ocorrência do padrão na string
texto = "Meu telefone é 81-99999-1234, ligue lá"
match = re.search(r"\\d{2}-\\d{5}-\\d{4}", texto)

if match:
    print("Encontrei:", match.group())
    print("Posição:", match.start(), match.end())`,
      },
      {
        lang: "python",
        code: `import re

# findall devolve lista com TODAS as ocorrências
texto = "Contatos: ana@site.com, bruno@empresa.com.br e carla@x.io"
emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", texto)
print(emails)
# → ['ana@site.com', 'bruno@empresa.com.br', 'carla@x.io']`,
      },
      {
        lang: "python",
        code: `import re

# Grupos capturam pedaços do match
log = "2025-03-15 14:23:01 ERROR Falha ao conectar"
padrao = r"(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)"

m = re.match(padrao, log)
if m:
    data, hora, nivel, mensagem = m.groups()
    print(f"[{nivel}] em {data} {hora}: {mensagem}")`,
      },
      {
        lang: "python",
        code: `import re

# sub substitui todas as ocorrências
texto = "Telefones: 81-99999-1234 e 11-98888-5555"

# Mascarar os números mantendo só os 4 últimos dígitos
mascarado = re.sub(r"\\d{2}-\\d{5}-(\\d{4})", r"**-*****-\\1", texto)
print(mascarado)
# → Telefones: **-*****-1234 e **-*****-5555`,
      },
      {
        lang: "python",
        code: `import re

# Padrões úteis comentados
PADROES = {
    "cpf":   r"\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}",
    "cep":   r"\\d{5}-\\d{3}",
    "url":   r"https?://[\\w./?=&-]+",
    "preco": r"R\\$\\s?\\d+(?:[.,]\\d{2})?",
}

texto = "CEP 50000-000, site https://x.com, R$ 19,90"
for nome, padrao in PADROES.items():
    achados = re.findall(padrao, texto)
    print(nome, "->", achados)`,
      },
      {
        lang: "python",
        code: `import re

# re.compile compila o padrão uma vez; bom quando você usa muitas vezes
PADRAO_CPF = re.compile(r"^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$")

def cpf_valido_formato(cpf: str) -> bool:
    # ^ e $ ancoram início e fim — a string inteira tem que casar
    return bool(PADRAO_CPF.match(cpf))

print(cpf_valido_formato("123.456.789-00"))  # → True
print(cpf_valido_formato("12345678900"))     # → False`,
      },
      {
        lang: "python",
        code: `import re

# Cuidado: . casa qualquer caractere; \\. casa o ponto literal
texto = "arquivo.txt e arquivoXtxt"
print(re.findall(r"arquivo.txt", texto))   # → ['arquivo.txt', 'arquivoXtxt']
print(re.findall(r"arquivo\\.txt", texto))  # → ['arquivo.txt']

# Use raw string (r"...") para não brigar com \\n e \\t do Python`,
      },
    ],
    points: [
      "Sempre use raw strings (r'...') para regex; evita conflito com escapes do Python.",
      "search acha a primeira ocorrência; findall acha todas; match testa o início da string.",
      "Parênteses criam grupos de captura; use (?:...) quando quer agrupar sem capturar.",
      "\\d é dígito, \\w é letra/número/underscore, \\s é espaço; em maiúsculo é o oposto.",
      "+ é um ou mais; * é zero ou mais; ? é zero ou um; {n,m} é entre n e m.",
      "^ ancora começo da string; $ ancora o fim. Esqueceu? Seu padrão casa qualquer pedaço.",
      "Para validações estritas (CPF, CNPJ) regex só checa formato; cálculo de dígito verificador é à parte.",
      "Compile padrões usados em loops com re.compile; é bem mais rápido.",
    ],
    alerts: [
      { type: "tip", content: "Use sites como regex101.com para testar e visualizar o que cada parte do padrão faz. Economiza horas de cabeça." },
      { type: "warning", content: "Ponto (.) em regex casa qualquer caractere, não só ponto literal. Para casar ponto de verdade use \\\\. dentro da string raw." },
      { type: "danger", content: "Padrões com aninhamento tipo (a+)+ podem travar o programa por horas em strings adversárias (catastrophic backtracking). Cuidado em entrada de usuário." },
      { type: "info", content: "Para validar email de forma realmente confiável, mande um email de confirmação. Regex sozinho nunca cobre todos os casos válidos." },
    ],
  },
  {
    slug: "performance-tips",
    section: "automacao-perf",
    title: "Performance: dicas práticas",
    difficulty: "avancado",
    subtitle: "Descobrindo gargalos e tornando seu Python mais rápido.",
    intro: `Python tem fama de lento. A fama é parte verdade, parte exagero. Verdade porque o interpretador padrão (CPython) é centenas de vezes mais lento que C em loops apertados de aritmética. Exagero porque a maioria dos programas reais não passa o tempo nesse tipo de loop — passa esperando rede, banco, disco. E para esses casos Python é tão rápido quanto qualquer outra linguagem.

A regra de ouro é: meça antes de otimizar. Otimizar baseado em achismo é a forma mais comum de perder tempo escrevendo código complicado que não acelera nada. Use ferramentas como \`time.perf_counter\`, \`timeit\` e \`cProfile\` para descobrir onde o tempo realmente está sendo gasto.

Depois que você tem o gargalo identificado, há uma sequência natural de remédios: usar a estrutura de dados certa (set em vez de list para busca), aproveitar funções nativas em C (sum, map, sorted), evitar trabalho repetido (caching), vetorizar com NumPy, paralelizar com threads ou processos e, em último caso, descer para Cython/Numba/Rust. Vamos passar pelos primeiros níveis aqui.`,
    codes: [
      {
        lang: "python",
        code: `import time

# Sempre meça antes de otimizar
inicio = time.perf_counter()

# Trecho que você quer cronometrar
total = sum(range(10_000_000))

elapsed = time.perf_counter() - inicio
print(f"Levou {elapsed:.3f}s, total={total}")`,
      },
      {
        lang: "python",
        code: `from timeit import timeit

# timeit roda o código várias vezes e devolve o tempo médio
t1 = timeit("[i*2 for i in range(1000)]", number=10000)
t2 = timeit("list(map(lambda i: i*2, range(1000)))", number=10000)

print(f"List comp: {t1:.3f}s")
print(f"Map+lambda: {t2:.3f}s")`,
      },
      {
        lang: "python",
        code: `import cProfile, pstats

def trabalho_pesado():
    total = 0
    for i in range(100_000):
        total += sum(range(i % 100))
    return total

# cProfile mede onde o tempo é gasto, função por função
cProfile.run("trabalho_pesado()", "perfil.out")

# Mostra as 10 funções que mais consumiram tempo
pstats.Stats("perfil.out").sort_stats("cumulative").print_stats(10)`,
      },
      {
        lang: "python",
        code: `# Estrutura de dados certa muda tudo
nomes_lista = [f"user_{i}" for i in range(100_000)]
nomes_set = set(nomes_lista)

import time

# Busca em lista é O(n) — varre tudo
inicio = time.perf_counter()
"user_99999" in nomes_lista
print("lista:", time.perf_counter() - inicio)

# Busca em set é O(1) — quase instantânea
inicio = time.perf_counter()
"user_99999" in nomes_set
print("set:  ", time.perf_counter() - inicio)`,
      },
      {
        lang: "python",
        code: `# Concatenar string em loop é uma armadilha clássica
import time

palavras = ["palavra"] * 50_000

# Lento: cada += cria uma string nova
inicio = time.perf_counter()
s = ""
for p in palavras:
    s += p
print("concat:", time.perf_counter() - inicio)

# Rápido: junta tudo de uma vez
inicio = time.perf_counter()
s = "".join(palavras)
print("join:  ", time.perf_counter() - inicio)`,
      },
      {
        lang: "python",
        code: `# Cache simples evita recalcular
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # instantâneo; sem cache, levaria horas`,
      },
      {
        lang: "python",
        code: `# Para processamento numérico pesado, NumPy vetoriza em C
import numpy as np
import time

n = 1_000_000
xs = list(range(n))
arr = np.arange(n)

inicio = time.perf_counter()
soma_python = sum(x*x for x in xs)
print("Python puro:", time.perf_counter() - inicio)

inicio = time.perf_counter()
soma_numpy = (arr * arr).sum()
print("NumPy:      ", time.perf_counter() - inicio)`,
      },
    ],
    points: [
      "Meça antes de otimizar; intuição sobre performance está quase sempre errada.",
      "Estrutura de dados certa (set/dict para busca) muda mais que micro-otimizações.",
      "''.join(lista) é muito mais rápido que concatenar com += em loop.",
      "Funções nativas (sum, sorted, map) rodam em C e são mais rápidas que loops Python.",
      "List comprehension geralmente bate for explícito; use generator se não precisa da lista toda em memória.",
      "lru_cache elimina recomputação para funções puras com argumentos hasháveis.",
      "Para arrays numéricos use NumPy; ele vetoriza operações e fica 50–100x mais rápido.",
      "Antes de pensar em paralelismo, otimize o algoritmo serial; pode resolver sem dor de cabeça.",
    ],
    alerts: [
      { type: "tip", content: "Use timeit em snippets isolados e cProfile em programas reais. Cada um responde uma pergunta diferente." },
      { type: "warning", content: "Otimização prematura é a raiz de muito mal: torna o código difícil de ler em troca de ganhos invisíveis. Só otimize o que medir como gargalo." },
      { type: "info", content: "O GIL impede que threads Python rodem código Python em paralelo de verdade. Para CPU-bound use multiprocessing; para I/O-bound, threads ou async." },
      { type: "success", content: "Trocar uma list por set, ou um loop por sum(), costuma dar ganhos enormes sem complicar nada. Comece sempre por aí." },
    ],
  },
  {
    slug: "cython-numba",
    section: "automacao-perf",
    title: "Cython e Numba",
    difficulty: "avancado",
    subtitle: "Quando Python puro não dá conta, acelere os hotspots.",
    intro: `Você mediu, achou o gargalo, otimizou o algoritmo, trocou listas por arrays NumPy, e ainda assim aquele loop matemático leva 10 segundos quando precisa levar 0,5. É hora de descer um andar. Cython e Numba são as duas ferramentas mais usadas para acelerar trechos críticos sem reescrever tudo em outra linguagem.

\`Cython\` é uma linguagem parente próximo do Python: você escreve um arquivo .pyx, adiciona tipos estáticos (\`cdef int x\`) e compila para C. O resultado vira uma extensão importável como qualquer módulo Python. Funciona muito bem para código maduro, vai para produção sem surpresa, mas tem custo de configurar build e exige um pouco de aprendizado.

\`Numba\` é mais simples no começo: você decora uma função Python normal com \`@jit\` e ela compila just-in-time para código de máquina na primeira chamada. Ideal para experimentar, ótimo em código numérico (NumPy, loops aritméticos), mas tem limitações com strings, dicionários e bibliotecas externas. Os dois cobrem cenários parecidos; a escolha depende muito do tipo de projeto.`,
    codes: [
      { lang: "bash", code: `pip install cython numba` },
      {
        lang: "python",
        code: `# Caso problema: somar quadrados em Python puro é lento
import time

def soma_quadrados(n: int) -> int:
    total = 0
    for i in range(n):
        total += i * i
    return total

inicio = time.perf_counter()
print(soma_quadrados(10_000_000))
print(f"Python puro: {time.perf_counter() - inicio:.2f}s")`,
      },
      {
        lang: "python",
        code: `# Mesma função, decorada com Numba
from numba import njit
import time

@njit  # njit = nopython mode; obriga compilar tudo, mais rápido
def soma_quadrados(n):
    total = 0
    for i in range(n):
        total += i * i
    return total

# Primeira chamada compila (demora um pouco); as próximas são instantâneas
soma_quadrados(10)  # warm up

inicio = time.perf_counter()
print(soma_quadrados(10_000_000))
print(f"Numba: {time.perf_counter() - inicio:.3f}s")`,
      },
      {
        lang: "python",
        code: `# Numba brilha em loops sobre arrays NumPy
import numpy as np
from numba import njit

@njit(parallel=True)  # parallel reparte entre cores
def distancias(pontos):
    n = pontos.shape[0]
    out = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            d = 0.0
            for k in range(pontos.shape[1]):
                d += (pontos[i, k] - pontos[j, k]) ** 2
            out[i, j] = d ** 0.5
    return out

p = np.random.rand(500, 3)
print(distancias(p).shape)`,
      },
      {
        lang: "python",
        code: `# Cython: arquivo soma.pyx
# (em projetos reais fica em arquivo separado e é compilado com setup.py)

# def soma_quadrados(int n):  # tipos opcionais aceleram muito
#     cdef int i, total = 0
#     for i in range(n):
#         total += i * i
#     return total

# Compilação no terminal:
# cythonize -i soma.pyx`,
      },
      {
        lang: "bash",
        code: `# Atalho rápido: compilar arquivo .pyx in-place
pip install cython
cythonize -i soma.pyx

# Depois, dentro do Python:
# from soma import soma_quadrados
# soma_quadrados(10_000_000)`,
      },
      {
        lang: "python",
        code: `# Numba também tem AOT (compilação antecipada) e modo objeto
from numba import jit

@jit  # sem njit: aceita tipos não suportados, mas pode cair em modo lento
def processa(lista_de_strings):
    contagem = 0
    for s in lista_de_strings:
        if s.startswith("a"):
            contagem += 1
    return contagem

print(processa(["abacate", "uva", "ameixa"]))`,
      },
    ],
    points: [
      "Numba é o caminho mais rápido para começar: decorador @njit e pronto.",
      "Cython é mais maduro para produção, mas exige passo de compilação no build.",
      "Numba se dá maravilhosamente com NumPy e loops numéricos; mal com strings/dicts complexos.",
      "Em Cython, declarar tipos com cdef é o que dá os maiores ganhos.",
      "@njit (nopython=True) é mais rápido que @jit; falha logo se algo não puder ser compilado.",
      "A primeira chamada da função compilada paga o custo de compilação; as seguintes voam.",
      "Para CPU-bound paralelo, Numba com parallel=True usa todos os cores sem GIL.",
      "Antes de Cython/Numba, esgote NumPy puro; muitas vezes resolve sem complicar build.",
    ],
    alerts: [
      { type: "tip", content: "Comece com Numba: você troca uma linha (decorador) e mede o ganho. Só vá para Cython se Numba não couber no projeto." },
      { type: "warning", content: "@njit não aceita qualquer código Python: dicts, classes complexas e algumas libs ficam de fora. Leia a mensagem de erro com calma." },
      { type: "info", content: "Cython exige compilador C instalado (gcc no Linux, MSVC no Windows). Em ambientes restritos isso pode ser empecilho." },
      { type: "success", content: "Para bibliotecas que vão ser distribuídas no PyPI, Cython é a escolha clássica: pandas, scikit-learn e lxml usam exatamente isso." },
    ],
  },
  {
    slug: "caching",
    section: "automacao-perf",
    title: "Caching: lru_cache e Redis",
    difficulty: "intermediario",
    subtitle: "Memoização local e cache distribuído com Redis.",
    intro: `Cache é uma das formas mais baratas de ganhar performance. A ideia é simples: se o cálculo de uma função custa caro mas devolve sempre o mesmo resultado para os mesmos argumentos, guarde a resposta na primeira vez e devolva ela direto nas próximas. Em vez de gastar 2 segundos batendo num banco, você gasta 1 microssegundo lendo da memória.

Em Python, o cache local mais usado é o decorador \`functools.lru_cache\`. Você marca a função, escolhe o tamanho máximo do cache e pronto: ele guarda os resultados das últimas chamadas e descarta os mais antigos. Funciona dentro de um único processo, em memória RAM. Quando o programa fecha, o cache vai junto.

Para aplicações maiores, vários processos ou várias máquinas, o cache local não basta. Aí entra o \`Redis\`: um banco de dados em memória que serve como cache compartilhado. Você instala uma vez, todos os processos falam com ele, e o cache sobrevive a reinícios. Vamos cobrir os dois cenários e quando faz sentido cada um.`,
    codes: [
      {
        lang: "python",
        code: `from functools import lru_cache
import time

@lru_cache(maxsize=128)
def busca_cep(cep: str) -> dict:
    # Simulando uma chamada lenta a uma API
    print(f"  buscando {cep} de verdade...")
    time.sleep(1)
    return {"cep": cep, "cidade": "Recife"}

# Primeira chamada demora; segunda é instantânea
busca_cep("50000-000")
busca_cep("50000-000")
busca_cep("50000-000")`,
      },
      {
        lang: "python",
        code: `from functools import lru_cache

@lru_cache(maxsize=None)  # cache infinito
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(200))

# cache_info mostra estatísticas: hits, misses, tamanho atual
print(fib.cache_info())
# CacheInfo(hits=..., misses=201, maxsize=None, currsize=201)

# Limpar o cache se precisar
fib.cache_clear()`,
      },
      {
        lang: "python",
        code: `from functools import lru_cache

# Argumentos precisam ser hasháveis (imutáveis)
@lru_cache(maxsize=64)
def soma(a, b):
    return a + b

soma(1, 2)        # ok
soma((1,2), (3,)) # ok, tuplas são hasháveis

# soma([1,2], [3])  # TypeError: unhashable type: 'list'`,
      },
      { lang: "bash", code: `pip install redis
# E suba um Redis local:
docker run -d --name redis -p 6379:6379 redis:7-alpine` },
      {
        lang: "python",
        code: `import redis
import json

# Conecta no Redis local
r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# set/get tratam strings; serialize JSON quando o valor é estruturado
r.set("usuario:42", json.dumps({"nome": "Ana", "plano": "Pro"}))

dado = json.loads(r.get("usuario:42"))
print(dado)

# Expirar a chave em 60 segundos
r.set("token:xyz", "abc123", ex=60)
print(r.ttl("token:xyz"))  # → 60`,
      },
      {
        lang: "python",
        code: `import redis, json, time

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def busca_produto(produto_id: int) -> dict:
    chave = f"produto:{produto_id}"

    # Tenta buscar do cache primeiro
    em_cache = r.get(chave)
    if em_cache:
        return json.loads(em_cache)

    # Cache miss: busca do banco/API e salva
    print("buscando do banco...")
    time.sleep(1)
    dado = {"id": produto_id, "nome": "Caderno", "preco": 19.90}

    # Expira em 5 minutos
    r.set(chave, json.dumps(dado), ex=300)
    return dado

print(busca_produto(7))  # primeira: lento
print(busca_produto(7))  # segunda: do cache`,
      },
      {
        lang: "python",
        code: `# Cuidado clássico: não cachear dados que mudam frequentemente
# sem invalidar quando mudam.

import redis
r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def atualizar_preco(produto_id: int, novo_preco: float):
    # Atualiza no banco (omitido)
    # E INVALIDA o cache, senão sua app vai mostrar preço velho
    r.delete(f"produto:{produto_id}")`,
      },
    ],
    points: [
      "lru_cache funciona dentro de um único processo; some quando o programa fecha.",
      "Argumentos da função em cache precisam ser hasháveis: tuplas sim, listas/dicts não.",
      "Use maxsize para limitar a memória; None significa cache infinito.",
      "cache_info() te dá estatísticas para saber se o cache está sendo útil de fato.",
      "Para cache compartilhado entre processos ou servidores, use Redis ou Memcached.",
      "Sempre defina expiração (TTL) no cache para evitar dados antigos eternos.",
      "A maior dor do cache é invalidação: ao atualizar o dado, lembre de apagar a chave.",
      "Cachear sem analisar pode degradar; só cacheie operações que são realmente caras e repetitivas.",
    ],
    alerts: [
      { type: "tip", content: "Comece sempre por lru_cache. Só evolua para Redis quando precisar compartilhar cache entre processos ou máquinas." },
      { type: "warning", content: "Cache com TTL muito longo causa bugs sutis: usuários veem dados velhos. Cache com TTL muito curto não acelera. Encontre o equilíbrio." },
      { type: "danger", content: "Nunca cacheie dados sensíveis (tokens, senhas) em Redis sem proteção: o servidor exposto sem senha é roteiro de vazamento." },
      { type: "info", content: "Há famosos 2 problemas em ciência da computação: invalidação de cache e nomear coisas. Aceite que você vai errar e tenha logs." },
    ],
  },
  {
    slug: "pep8",
    section: "automacao-perf",
    title: "PEP 8: estilo de código",
    difficulty: "iniciante",
    subtitle: "O guia oficial que faz seu código parecer Python.",
    intro: `Quando muita gente escreve no mesmo idioma, é importante combinar como escrever. Imagine um livro em que cada capítulo segue uma regra diferente de pontuação: vira um inferno. Em código é igual. A PEP 8 é o guia oficial de estilo do Python, escrito por Guido van Rossum (o criador da linguagem) lá em 2001 e mantido pela comunidade desde então.

Ela não muda o que o programa faz — Python aceita seu código de qualquer jeito, contanto que a sintaxe seja válida. O que ela muda é como o código é lido. Um código que segue PEP 8 é instantaneamente reconhecível para qualquer pessoa Python no mundo. Você ganha em tempo de leitura, em facilidade de revisão e em poder pegar projeto dos outros sem se perder em estilos malucos.

As regras cobrem coisas como indentação (4 espaços, sempre), tamanho de linha (79 ou 99 caracteres), nomes (snake_case para funções e variáveis, CamelCase para classes), espaçamento ao redor de operadores e ordem de imports. Ninguém memoriza tudo na primeira semana — o jeito é instalar uma ferramenta como ruff ou black, deixar ela formatar e ir aprendendo pelo resultado.`,
    codes: [
      {
        lang: "python",
        code: `# Indentação: 4 espaços, NUNCA tab
def saudar(nome):
    if nome:
        print(f"Olá, {nome}")
    else:
        print("Olá, anônimo")

# Linha de até 79 (ou 99 em projetos modernos) caracteres`,
      },
      {
        lang: "python",
        code: `# Nomes: snake_case para funções e variáveis
quantidade_total = 10
preco_unitario = 5.99

def calcular_imposto(valor, aliquota):
    return valor * aliquota

# CamelCase para classes
class ProcessadorDeVendas:
    pass

# UPPER_CASE para constantes
TAXA_PADRAO = 0.05
URL_BASE = "https://api.exemplo.com"`,
      },
      {
        lang: "python",
        code: `# Espaços ao redor de operadores binários
x = 1 + 2          # bom
x=1+2              # ruim

# Mas SEM espaço dentro de parênteses, colchetes, chaves
lista = [1, 2, 3]   # bom
lista = [ 1, 2, 3 ] # ruim

# Espaço depois de vírgula, dois-pontos
def f(a, b, c):     # bom
def f(a,b,c):       # ruim

# Sem espaço antes de vírgula ou dois-pontos
print(x , y)        # ruim
print(x, y)         # bom`,
      },
      {
        lang: "python",
        code: `# Imports: cada um na sua linha, agrupados em blocos

# 1. Biblioteca padrão
import os
import sys
from pathlib import Path

# 2. Bibliotecas de terceiros (linha em branco separando)
import requests
import numpy as np

# 3. Seus próprios módulos
from meu_app.servicos import calcular
from meu_app.utils import formatar`,
      },
      {
        lang: "python",
        code: `# Duas linhas em branco entre funções/classes top-level
def primeira():
    pass


def segunda():
    pass


class MinhaClasse:
    # Uma linha em branco entre métodos
    def metodo_a(self):
        pass

    def metodo_b(self):
        pass`,
      },
      {
        lang: "python",
        code: `# Comparações com None, True, False
if valor is None:        # bom
    pass

if valor == None:        # ruim — funciona, mas é incorreto
    pass

# Para booleanos
if ativo:                # bom
    pass

if ativo == True:        # ruim — verboso à toa
    pass`,
      },
      {
        lang: "bash",
        code: `# Em vez de decorar tudo, deixe a ferramenta fazer:
pip install ruff
ruff check meu_arquivo.py        # aponta violações
ruff format meu_arquivo.py       # reformata automaticamente`,
      },
    ],
    points: [
      "Use 4 espaços para indentar; configure seu editor para converter Tab em espaços.",
      "snake_case para funções e variáveis; CamelCase para classes; UPPER_CASE para constantes.",
      "Linhas até 79 ou 99 caracteres (projetos modernos costumam usar 88, padrão do black).",
      "Imports em três blocos: stdlib, terceiros, projeto — separados por linha em branco.",
      "Duas linhas em branco entre funções/classes de topo; uma entre métodos.",
      "Compare com is None, não com == None; trate booleanos sem == True.",
      "Comente o porquê, não o quê; o código já mostra o quê.",
      "Não decore PEP 8 na cabeça: instale ruff/black e deixe a ferramenta cuidar do estilo.",
    ],
    alerts: [
      { type: "tip", content: "Configure ruff format no seu editor para rodar ao salvar. Você nunca mais pensa em estilo e o código sai perfeito." },
      { type: "info", content: "PEP 8 é guia, não lei. O próprio documento diz que consistência local importa mais que regras universais. Em projeto antigo, siga o estilo do projeto." },
      { type: "success", content: "Equipes que adotam PEP 8 + ferramenta de formatação eliminam debates sobre estilo no code review e focam no que importa: a lógica." },
    ],
  },
  {
    slug: "ruff-black",
    section: "automacao-perf",
    title: "Ferramentas: ruff, black, isort",
    difficulty: "intermediario",
    subtitle: "Linting e formatação automáticas para parar de perder tempo.",
    intro: `Discutir estilo de código em pull request é um dos passatempos mais inúteis do mundo do desenvolvimento. Onde fica a vírgula, quantas linhas em branco entre funções, ordem dos imports — tudo isso pode (e deve) ser decidido por uma ferramenta que roda sozinha. Você economiza tempo, energia e relacionamento com os colegas.

O ecossistema Python tem três nomes que você precisa conhecer: \`black\` formata o código sem perguntar, com opinião forte; \`isort\` organiza os imports em ordem alfabética e em blocos; \`flake8\`/\`pylint\` apontam erros de estilo e bugs prováveis. Por anos a combinação desses três foi padrão.

Hoje, \`ruff\` reuniu quase tudo num só binário escrito em Rust. Ele lint e formata em milissegundos, é compatível com regras do flake8, isort, black e dezenas de plugins. Em projetos novos, a recomendação é começar direto com ruff. Em projetos legados, você ainda vai esbarrar com black e isort, então vale conhecer todos. Vamos ver como instalar, configurar e integrar tudo com o editor.`,
    codes: [
      { lang: "bash", code: `# Instalação
pip install ruff black isort

# Ruff sozinho já cobre praticamente tudo
ruff --version
black --version
isort --version` },
      {
        lang: "bash",
        code: `# Lint: aponta problemas de estilo e bugs prováveis
ruff check .

# Corrige automaticamente o que pode
ruff check . --fix

# Formata o código (substitui o black em projetos novos)
ruff format .`,
      },
      {
        lang: "bash",
        code: `# Black: formatador opinativo. Sem opções, sem discussão.
black meu_arquivo.py

# Pasta inteira
black src/

# Apenas verificar (não muda arquivo); útil em CI
black --check src/`,
      },
      {
        lang: "bash",
        code: `# isort: organiza os imports
isort meu_arquivo.py

# Compatível com black
isort --profile black src/`,
      },
      {
        lang: "python",
        code: `# Antes do black:
def soma(a,b ,c):
    return a+b+ c

# Depois do black format:
def soma(a, b, c):
    return a + b + c`,
      },
      {
        lang: "python",
        code: `# Configuração do ruff em pyproject.toml
# (este é o formato moderno padrão; coloque na raiz do projeto)

# [tool.ruff]
# line-length = 100
# target-version = "py311"

# [tool.ruff.lint]
# select = ["E", "F", "I", "N", "UP"]
# ignore = ["E501"]

# [tool.ruff.format]
# quote-style = "double"
# indent-style = "space"`,
      },
      {
        lang: "bash",
        code: `# Integração comum: rodar tudo antes de commitar
ruff check . --fix
ruff format .

# Em CI (GitHub Actions), você roda só os checks (sem --fix):
ruff check .
ruff format --check .`,
      },
    ],
    points: [
      "Ruff substitui flake8, black, isort, pyupgrade e muitos outros num só binário rapidíssimo.",
      "Configure tudo em pyproject.toml: um único arquivo controla as ferramentas do projeto.",
      "Black não tem opções de estilo de propósito; aceitar isso evita debates intermináveis.",
      "isort organiza imports em blocos (stdlib, terceiros, locais) automaticamente.",
      "Use --check no CI para falhar build se o código não estiver formatado.",
      "Integre ao editor (VSCode, PyCharm) para rodar ao salvar; vira hábito invisível.",
      "Em times, combine com pre-commit para rodar antes de cada commit local.",
      "Lint não substitui testes; ele aponta padrões suspeitos, não bugs lógicos.",
    ],
    alerts: [
      { type: "tip", content: "Em projeto novo, comece direto com ruff. Em projeto antigo com black já configurado, ruff format gera o mesmo resultado e é compatível." },
      { type: "info", content: "Ruff é escrito em Rust; é literalmente 10–100x mais rápido que pylint/flake8 em código Python. Em monorepos isso muda o jogo." },
      { type: "warning", content: "Não rode formatador em commit que tem mudanças funcionais misturadas. Faça commit separado de formatação para o histórico ficar limpo." },
      { type: "success", content: "Configurar ruff format on save no editor é talvez a melhor hora investida em ferramental Python no início do projeto." },
    ],
  },
  {
    slug: "pre-commit",
    section: "automacao-perf",
    title: "pre-commit: hooks de qualidade",
    difficulty: "intermediario",
    subtitle: "Validações automáticas antes de cada commit.",
    intro: `Por mais disciplinado que você seja, vai acontecer: commitar arquivo sem formatar, esquecer um print de debug, deixar uma chave de API exposta. A solução não é mais disciplina — é deixar a máquina conferir antes que o commit aconteça. É para isso que serve o \`pre-commit\`.

Pre-commit é uma ferramenta (em Python, mas serve para qualquer linguagem) que instala hooks no Git. Toda vez que você roda \`git commit\`, ela executa uma lista de checagens nos arquivos que você modificou. Se algo falha, o commit é abortado. Você corrige (ou a ferramenta corrige sozinha) e tenta de novo.

A configuração fica num arquivo \`.pre-commit-config.yaml\` versionado junto com o projeto. Quem clonar o repositório basta rodar \`pre-commit install\` uma vez para ter os mesmos hooks. Isso garante que toda a equipe segue os mesmos padrões automaticamente, sem depender da memória de ninguém. É o melhor amigo do code review: chega no PR só conteúdo, não formatação.`,
    codes: [
      { lang: "bash", code: `pip install pre-commit
pre-commit --version` },
      {
        lang: "bash",
        code: `# No diretório do projeto Git:
pre-commit install
# → pre-commit installed at .git/hooks/pre-commit

# Agora, todo commit dispara os hooks configurados.`,
      },
      {
        lang: "bash",
        code: `# Arquivo .pre-commit-config.yaml na raiz do projeto:

# repos:
#   - repo: https://github.com/pre-commit/pre-commit-hooks
#     rev: v4.6.0
#     hooks:
#       - id: trailing-whitespace
#       - id: end-of-file-fixer
#       - id: check-yaml
#       - id: check-added-large-files
#
#   - repo: https://github.com/astral-sh/ruff-pre-commit
#     rev: v0.5.0
#     hooks:
#       - id: ruff
#         args: [--fix]
#       - id: ruff-format`,
      },
      {
        lang: "bash",
        code: `# Rodar manualmente em todos os arquivos (útil na primeira vez)
pre-commit run --all-files

# Rodar só um hook específico
pre-commit run ruff --all-files

# Atualizar versões dos hooks
pre-commit autoupdate`,
      },
      {
        lang: "bash",
        code: `# Hooks comuns para projetos Python:
# - trailing-whitespace: remove espaços no fim das linhas
# - end-of-file-fixer: garante newline no fim do arquivo
# - check-yaml / check-toml: valida sintaxe
# - check-added-large-files: barra arquivos grandes acidentais
# - detect-private-key: barra chaves privadas
# - ruff / ruff-format: lint + format
# - mypy: checagem de tipos
# - pytest (raro): rodar testes (lento, geralmente fica no CI)`,
      },
      {
        lang: "bash",
        code: `# Quando o hook falha:

git commit -m "ajusta código"
# trailing-whitespace.....................................Failed
# - hook id: trailing-whitespace
# - exit code: 1
# - files were modified by this hook
#
# Fixing src/app.py

# Os arquivos foram corrigidos. Adicione e tente de novo:
git add src/app.py
git commit -m "ajusta código"`,
      },
      {
        lang: "bash",
        code: `# Pular pre-commit em emergência (use com parcimônia!)
git commit --no-verify -m "hotfix urgente"

# Para testar antes de subir, rode em CI também:
# Em GitHub Actions:
#   - run: pre-commit run --all-files`,
      },
    ],
    points: [
      "pre-commit roda hooks no Git antes de cada commit; aborta se algo falha.",
      "Configuração em .pre-commit-config.yaml versionada com o projeto.",
      "Cada novo membro da equipe roda pre-commit install uma vez e tem todos os hooks.",
      "Hooks comuns: ruff, ruff-format, mypy, trailing-whitespace, check-added-large-files.",
      "Use pre-commit run --all-files na primeira vez para ajustar tudo de uma vez.",
      "pre-commit autoupdate atualiza as versões fixadas no YAML para as mais recentes.",
      "Rode pre-commit também no CI; protege contra quem usa --no-verify.",
      "Hooks pesados (pytest, grandes typecheck) ficam melhor só no CI, não a cada commit.",
    ],
    alerts: [
      { type: "tip", content: "Adicione check-added-large-files para evitar commit acidental de PDFs, CSVs ou modelos pesados que sujam o histórico do Git." },
      { type: "warning", content: "git commit --no-verify pula os hooks. Útil em emergência, perigoso como hábito; combine com checagem no CI para não confiar só na honra." },
      { type: "success", content: "Adotar pre-commit eleva enormemente a qualidade do repositório sem cobrar disciplina humana. Vale a meia hora de configuração." },
      { type: "info", content: "pre-commit instala cada hook em ambiente virtual isolado; não polui o seu venv do projeto. A primeira instalação é mais lenta por isso." },
    ],
  },
  {
    slug: "security-basics",
    section: "automacao-perf",
    title: "Segurança básica",
    difficulty: "avancado",
    subtitle: "Erros comuns que viram brechas e como evitá-los.",
    intro: `Segurança não é um tópico para depois — é uma forma de pensar que precisa entrar desde o primeiro projeto. Os erros mais explorados raramente são complexos: senha hardcoded no código, query SQL montada por concatenação de string, dependência abandonada com vulnerabilidade conhecida, segredo vazado no Git por descuido. Coisas simples, com consequências catastróficas.

Este capítulo lista as armadilhas mais comuns em projetos Python e como evitá-las. Não cobre criptografia avançada, hardening de servidor ou auditoria de penetração — para isso há livros inteiros. O foco é o conjunto de práticas que todo desenvolvedor precisa ter no automático: nunca commitar segredos, sempre usar parâmetros em queries, validar entradas, manter dependências atualizadas, não rodar como root, gerar tokens com módulos seguros.

Pense nesses pontos como cinto de segurança: na maioria das viagens não vai mudar nada, mas no acidente que você não previu vai ser a diferença entre arranhão e tragédia. E em segurança, o acidente vem mais cedo do que você imagina — bots varrem GitHub público em minutos atrás de chaves expostas.`,
    codes: [
      {
        lang: "python",
        code: `# RUIM: senha hardcoded no código
DB_PASSWORD = "minhaSenha123"  # vai parar no Git para sempre

# BOM: ler de variável de ambiente
import os
DB_PASSWORD = os.environ["DB_PASSWORD"]

# OU usar python-dotenv para .env (que vai no .gitignore)
from dotenv import load_dotenv
load_dotenv()
DB_PASSWORD = os.environ["DB_PASSWORD"]`,
      },
      {
        lang: "python",
        code: `import sqlite3

con = sqlite3.connect("dados.db")
cur = con.cursor()

email = input("Email: ")

# RUIM: SQL injection na certa
cur.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")
# se o usuário digitar: ' OR '1'='1
# vira: SELECT * FROM usuarios WHERE email = '' OR '1'='1'
# → expõe a tabela inteira

# BOM: parâmetros são tratados pelo driver
cur.execute("SELECT * FROM usuarios WHERE email = ?", (email,))`,
      },
      {
        lang: "python",
        code: `# RUIM: gerar token com random é previsível
import random
token = str(random.randint(0, 10**16))  # NÃO USE PARA SEGURANÇA

# BOM: secrets é desenhado para criptografia
import secrets
token = secrets.token_urlsafe(32)
print(token)  # algo como 'V3sQ_8rH...'

# Para senhas, hash com algoritmo lento (bcrypt, argon2)
# Nunca guarde senha em texto puro!
# pip install bcrypt
import bcrypt
senha = b"senha_do_usuario"
hash_senha = bcrypt.hashpw(senha, bcrypt.gensalt())
print(bcrypt.checkpw(senha, hash_senha))  # True`,
      },
      {
        lang: "python",
        code: `# RUIM: pickle de dados não confiáveis = execução de código remota
import pickle
dados = pickle.loads(arquivo_recebido_da_internet)  # PERIGO!

# pickle.loads de qualquer fonte que você não controla pode rodar
# código arbitrário no seu processo. Use json para trocar dados.

import json
dados = json.loads(arquivo_recebido_da_internet)  # seguro`,
      },
      {
        lang: "bash",
        code: `# Verificar dependências com vulnerabilidades conhecidas
pip install pip-audit
pip-audit

# Manter dependências atualizadas
pip list --outdated

# Bandit: scanner de problemas de segurança no seu código
pip install bandit
bandit -r src/`,
      },
      {
        lang: "python",
        code: `# Comando shell vindo do usuário = recipe de desastre
import subprocess

# RUIM: shell=True com input externo
nome = input("nome: ")
subprocess.run(f"ls /home/{nome}", shell=True)
# se digitar: ana; rm -rf /
# o shell vai executar os dois comandos

# BOM: lista de argumentos, sem shell
subprocess.run(["ls", f"/home/{nome}"])`,
      },
      {
        lang: "python",
        code: `# CORS, SSRF, comparação de strings:
import hmac

# RUIM: == em token compara byte a byte e vaza tempo
def autenticar_v1(token, esperado):
    return token == esperado  # vulnerável a timing attack

# BOM: comparação em tempo constante
def autenticar_v2(token, esperado):
    return hmac.compare_digest(token, esperado)`,
      },
    ],
    points: [
      "Nunca commite senhas, tokens ou chaves; use variáveis de ambiente ou cofres.",
      "Adicione .env, *.key, credentials.json no .gitignore desde o início do projeto.",
      "Use parâmetros (placeholders) em queries SQL; jamais f-string com input do usuário.",
      "Para tokens use secrets, não random; para senhas use bcrypt ou argon2.",
      "pickle de dados não confiáveis pode executar código arbitrário; prefira json.",
      "subprocess com shell=True e input do usuário é janela aberta para injeção de comandos.",
      "Compare tokens com hmac.compare_digest para evitar ataques de tempo.",
      "Rode pip-audit e bandit no CI; eles pegam problemas que olho humano não vê.",
    ],
    alerts: [
      { type: "danger", content: "Chave de API exposta em repositório público é descoberta e usada por bots em minutos. Rotacione imediatamente se acontecer e nunca acredite que 'ninguém vai ver'." },
      { type: "warning", content: "Atualizar dependência sem ler changelog também é risco. Combine pip-audit com testes automatizados antes de subir versões novas para produção." },
      { type: "tip", content: "Use ferramentas como git-secrets ou trufflehog em pre-commit para impedir que segredos cheguem a entrar no histórico do Git." },
      { type: "info", content: "OWASP Top 10 lista as falhas mais comuns em aplicações web. Vale uma leitura mesmo se você não faz web, para calibrar a paranoia." },
    ],
  },
  {
    slug: "12-factor",
    section: "automacao-perf",
    title: "12-Factor App",
    difficulty: "avancado",
    subtitle: "Doze princípios para escrever aplicações modernas e portáveis.",
    intro: `O 12-Factor App é um manifesto escrito em 2011 por engenheiros da Heroku que descreve doze princípios para construir aplicações que rodem bem em ambientes modernos: nuvem, contêineres, escala horizontal, deploys frequentes. Apesar da idade, continua sendo a referência mais usada para discutir arquitetura de aplicações na web.

Não é uma receita rígida nem um framework — são orientações. A grande sacada é que as práticas se reforçam: se você guarda configuração em variável de ambiente (fator III), naturalmente seu código fica portável (fator X). Se sua aplicação é stateless (fator VI), ela escala horizontalmente (fator VIII). Cada princípio resolve uma classe de problemas que já fez muita gente perder noites.

Este capítulo passa pelos doze, com o foco em como cada um se aplica a projetos Python. Você não precisa adotar todos de uma vez nem em todos os projetos; um script local para rodar uma vez por mês não precisa de 12-factor. Mas qualquer aplicação que vá para produção web ganha muito quando você segue ao menos os primeiros seis ou sete.`,
    codes: [
      {
        lang: "python",
        code: `# I. Codebase: um repositório por aplicação, vários deploys (dev, staging, prod)
# Estrutura típica:
#   meu_app/
#     src/
#     tests/
#     pyproject.toml
#     README.md
#     .git/
# Mesmo código, configurações diferentes por ambiente.

# II. Dependências: declare explicitamente em pyproject.toml
# Nunca dependa de coisas instaladas globalmente no sistema.
# pip install -r requirements.txt  ou  pip install -e .`,
      },
      {
        lang: "python",
        code: `# III. Configuração: vai em variáveis de ambiente, não no código

import os
from dotenv import load_dotenv

load_dotenv()  # lê .env em desenvolvimento

DATABASE_URL = os.environ["DATABASE_URL"]
SECRET_KEY = os.environ["SECRET_KEY"]
DEBUG = os.environ.get("DEBUG", "false").lower() == "true"

# Em produção, .env não é usado: o ambiente já provê as variáveis.`,
      },
      {
        lang: "python",
        code: `# IV. Backing services: trate banco, cache, fila como recursos plugáveis
# Conectados via URL, intercambiáveis sem mudar código.

import os
import redis
from sqlalchemy import create_engine

# Trocar Redis local por Redis na nuvem é só mudar a env
cache = redis.from_url(os.environ["REDIS_URL"])
db = create_engine(os.environ["DATABASE_URL"])

# Em desenvolvimento: REDIS_URL=redis://localhost:6379
# Em produção:        REDIS_URL=redis://cache.prod.exemplo.com:6379`,
      },
      {
        lang: "bash",
        code: `# V. Build, release, run: separe os três estágios

# Build: instala dependências, compila assets
pip install -r requirements.txt
python setup.py build

# Release: combina build + config (ex: imagem Docker tagueada)
docker build -t meu_app:1.2.3 .

# Run: executa o release
docker run -e DATABASE_URL=... meu_app:1.2.3`,
      },
      {
        lang: "python",
        code: `# VI. Processos: stateless. Estado vai para banco/cache, não para memória.

# RUIM: contagem em variável global do processo
contador = 0
def incrementar():
    global contador
    contador += 1
# Não funciona se você tiver 3 instâncias rodando.

# BOM: estado num backing service
import redis
r = redis.from_url(os.environ["REDIS_URL"])
def incrementar():
    return r.incr("contador")`,
      },
      {
        lang: "python",
        code: `# VII. Port binding: aplicação se exporta como serviço HTTP em uma porta
# (Não depende de injetar dentro de um servidor externo)

# Ex: aplicação Flask
import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "ok"

if __name__ == "__main__":
    porta = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=porta)`,
      },
      {
        lang: "python",
        code: `# IX. Disposability: processos sobem rápido e desligam de forma elegante

import signal, sys, time

def shutdown(signum, frame):
    print("recebido sinal, finalizando conexões...")
    # fechar pool de banco, drenar fila, etc.
    sys.exit(0)

signal.signal(signal.SIGTERM, shutdown)
signal.signal(signal.SIGINT, shutdown)

while True:
    time.sleep(1)
# Containers recebem SIGTERM ao serem parados; respeite-o.`,
      },
      {
        lang: "python",
        code: `# XI. Logs: sempre para stdout/stderr; não escreva em arquivos.
# Quem coleta os logs é a infraestrutura (Docker, Kubernetes, CloudWatch).

import logging, sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)

logging.info("aplicação iniciada")

# XII. Admin processes: tarefas administrativas (migrations, seed) rodam
# como comandos pontuais, no MESMO ambiente da aplicação.
# Ex: python manage.py migrate, alembic upgrade head`,
      },
    ],
    points: [
      "Codebase única por aplicação; mesmo código gera dev, staging e prod, com configs diferentes.",
      "Dependências declaradas explicitamente em pyproject.toml ou requirements.txt.",
      "Configuração SEMPRE em variáveis de ambiente; nunca commite secrets ou URLs de produção.",
      "Trate banco, cache, fila e API externa como recursos plugáveis via URL/variável.",
      "Separe build, release e run; em produção use imagens versionadas e imutáveis.",
      "Processos stateless: estado vai pro banco/cache, nunca em variável global do processo.",
      "Aplicação se autoexporta numa porta HTTP; use $PORT, não hardcode 8000.",
      "Logs em stdout; deixe a infra coletar. Não escreva em /var/log nem rotacione no app.",
    ],
    alerts: [
      { type: "info", content: "Os doze fatores são guia, não dogma. Em script local ou ferramenta de uma vez só, aplicar tudo é overkill. Em aplicação web é praticamente obrigatório." },
      { type: "tip", content: "Comece pelos fatores III (config), VI (processos stateless) e XI (logs em stdout). Eles destravam contêineres, escala e observabilidade de uma vez." },
      { type: "warning", content: "Manter estado em memória do processo é a fonte mais comum de bugs misteriosos quando a aplicação cresce. Eles só aparecem com 2+ instâncias." },
      { type: "success", content: "Aplicações que seguem 12-factor migram entre nuvens, escalam, recebem deploy frequente e debugam fácil. O custo inicial é baixo, o benefício é gigante." },
    ],
  },
];
