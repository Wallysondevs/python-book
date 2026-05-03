import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "unittest",
    section: "testes-web",
    title: "unittest: testes da stdlib",
    difficulty: "intermediario",
    subtitle: "O framework de testes que já vem com o Python.",
    intro: `Imagine que você fez uma calculadora e quer ter certeza de que ela soma certo. Você poderia abrir o terminal toda vez, digitar \`somar(2, 3)\` e olhar se aparece \`5\`. Funciona, mas é cansativo. Pior: quando seu código cresce, você acaba esquecendo de testar alguma coisa e quebra um pedaço sem perceber.

Testes automatizados resolvem isso. Você escreve uma vez "espero que somar(2, 3) retorne 5" e o computador verifica isso para você sempre que pedir, em segundos. Se algo quebrar no futuro, o teste grita.

O Python já vem com um framework de testes embutido chamado \`unittest\`. Ele é inspirado no JUnit do Java, então é meio verboso e usa classes, mas funciona em qualquer máquina sem instalar nada. É bom conhecer porque você vai encontrar muito código legado usando \`unittest\`, e porque ele te ensina a pensar em "preparar, agir, verificar" — o esqueleto de qualquer teste, em qualquer linguagem.

Neste capítulo você vai escrever sua primeira classe de teste, rodar do terminal, e aprender as asserções básicas que cobrem 90% dos casos do dia a dia.`,
    codes: [
      {
        lang: "python",
        code: `# arquivo: calculadora.py
def somar(a, b):
    return a + b

def dividir(a, b):
    if b == 0:
        raise ValueError("Não dá para dividir por zero")
    return a / b`,
      },
      {
        lang: "python",
        code: `# arquivo: test_calculadora.py
import unittest
from calculadora import somar, dividir

# Toda classe de teste herda de unittest.TestCase
class TestCalculadora(unittest.TestCase):
    # Cada método que começa com test_ vira um teste
    def test_soma_dois_numeros(self):
        resultado = somar(2, 3)
        # assertEqual compara dois valores e falha se forem diferentes
        self.assertEqual(resultado, 5)

    def test_soma_negativos(self):
        self.assertEqual(somar(-1, -2), -3)

if __name__ == "__main__":
    # Permite rodar com: python test_calculadora.py
    unittest.main()`,
      },
      {
        lang: "bash",
        code: `# Forma recomendada: descobre todos os arquivos test_*.py automaticamente
python -m unittest discover -v

# Saída esperada:
# test_soma_dois_numeros (test_calculadora.TestCalculadora) ... ok
# test_soma_negativos (test_calculadora.TestCalculadora) ... ok
# Ran 2 tests in 0.001s
# OK`,
      },
      {
        lang: "python",
        code: `import unittest
from calculadora import dividir

class TestDivisao(unittest.TestCase):
    def test_divisao_normal(self):
        # assertAlmostEqual evita problemas com casas decimais de float
        self.assertAlmostEqual(dividir(10, 3), 3.3333, places=4)

    def test_divisao_por_zero_lanca_erro(self):
        # assertRaises checa se a função levanta a exceção esperada
        with self.assertRaises(ValueError):
            dividir(10, 0)

    def test_tipos_e_verdade(self):
        self.assertTrue(dividir(4, 2) == 2)
        self.assertIsInstance(dividir(4, 2), float)
        self.assertIn(3, [1, 2, 3])`,
      },
      {
        lang: "python",
        code: `import unittest

class TestComSetup(unittest.TestCase):
    # setUp roda ANTES de cada teste — bom para preparar dados
    def setUp(self):
        self.usuarios = ["Ana", "Bruno", "Carla"]

    # tearDown roda DEPOIS de cada teste — bom para limpar
    def tearDown(self):
        self.usuarios.clear()

    def test_tem_tres_usuarios(self):
        self.assertEqual(len(self.usuarios), 3)

    def test_ana_esta_na_lista(self):
        # Como setUp recria a lista, este teste não é afetado pelo anterior
        self.assertIn("Ana", self.usuarios)`,
      },
      {
        lang: "python",
        code: `import unittest

class TestPulando(unittest.TestCase):
    @unittest.skip("Ainda não implementei o cálculo de juros")
    def test_juros_compostos(self):
        self.fail("Não deveria rodar")

    @unittest.skipIf(1 + 1 == 2, "Pula se a matemática estiver certa")
    def test_universo_quebrado(self):
        pass

    def test_falha_proposital(self):
        # Use self.fail para forçar uma falha com mensagem clara
        if False:
            self.fail("Algo inesperado aconteceu")`,
      },
    ],
    points: [
      "Toda classe de teste herda de unittest.TestCase e cada método precisa começar com test_.",
      "assertEqual, assertTrue, assertRaises e assertIn cobrem a maioria dos casos do dia a dia.",
      "setUp roda antes e tearDown depois de cada teste, garantindo isolamento.",
      "python -m unittest discover encontra automaticamente arquivos test_*.py.",
      "Use assertAlmostEqual para comparar floats e evitar surpresas com casas decimais.",
      "Armadilha: esquecer o prefixo test_ faz o método ser ignorado silenciosamente.",
      "Armadilha: depender de ordem entre testes — eles podem rodar em qualquer ordem.",
      "@unittest.skip documenta que um teste está pendente sem deixar a suíte vermelha.",
    ],
    alerts: [
      {
        type: "info",
        content: "Convencão universal: arquivos de teste começam com test_ e ficam em uma pasta tests/ separada da pasta src/, para não poluir o pacote principal.",
      },
      {
        type: "warning",
        content: "Não use assert do Python puro dentro de TestCase. Use sempre self.assertX, porque eles geram mensagens de erro muito mais claras quando falham.",
      },
      {
        type: "tip",
        content: "Rode os testes com a flag -v (verbose) para ver o nome de cada teste passando. Ajuda a perceber quando um teste foi pulado por engano.",
      },
    ],
  },
  {
    slug: "pytest",
    section: "testes-web",
    title: "pytest: o framework moderno",
    difficulty: "intermediario",
    subtitle: "O padrão de fato da comunidade Python.",
    intro: `Se o \`unittest\` é o testador oficial e formal, o \`pytest\` é o testador que o resto do mundo Python adotou. A grande sacada dele é remover cerimônia: você não precisa criar classe, não precisa herdar de nada, não precisa lembrar do nome certo de cada \`assertEqual\`. Você só escreve uma função que começa com \`test_\` e usa o \`assert\` normal do Python.

A mágica é que o \`pytest\` reescreve o \`assert\` por trás dos panos para te dar mensagens de erro detalhadas. Quando \`assert lista == [1, 2, 3]\` falha, ele mostra exatamente qual posição é diferente. Isso parece pequeno, mas quando você está debugando um teste que quebrou, faz uma diferença enorme.

Além disso, o ecossistema é gigante: existem plugins para cobertura, para rodar em paralelo, para testar Django, FastAPI, banco de dados, mocks de tempo, snapshots… praticamente qualquer coisa.

Neste capítulo você instala o pytest, escreve seu primeiro teste, descobre como rodar só uma parte da suíte e aprende a parametrizar testes para cobrir vários casos sem repetir código.`,
    codes: [
      {
        lang: "bash",
        code: `# Instalação (de preferência dentro de um venv)
pip install pytest

# Verificando a versão
pytest --version`,
      },
      {
        lang: "python",
        code: `# arquivo: carrinho.py
def total(itens):
    # itens é uma lista de tuplas (preco, quantidade)
    return sum(preco * qtd for preco, qtd in itens)`,
      },
      {
        lang: "python",
        code: `# arquivo: test_carrinho.py
from carrinho import total

# Sem classe, sem herança, sem self. Só uma função.
def test_total_de_carrinho_vazio_e_zero():
    assert total([]) == 0

def test_total_soma_precos_com_quantidades():
    itens = [(10.0, 2), (5.5, 4)]
    # Quando este assert falhar, pytest mostra os dois lados da igualdade
    assert total(itens) == 42.0`,
      },
      {
        lang: "bash",
        code: `# Roda todos os testes da pasta atual
pytest

# Roda só um arquivo
pytest test_carrinho.py

# Roda só um teste específico (útil em debug)
pytest test_carrinho.py::test_total_de_carrinho_vazio_e_zero

# Para no primeiro erro e mostra mais detalhes
pytest -x -vv`,
      },
      {
        lang: "python",
        code: `import pytest

def dividir(a, b):
    if b == 0:
        raise ValueError("Divisao por zero")
    return a / b

def test_divisao_por_zero():
    # pytest.raises substitui o assertRaises do unittest
    with pytest.raises(ValueError, match="zero"):
        dividir(10, 0)

def test_aproximadamente_igual():
    # pytest.approx resolve a chatice de comparar floats
    assert dividir(1, 3) == pytest.approx(0.3333, abs=1e-4)`,
      },
      {
        lang: "python",
        code: `import pytest

def eh_par(n):
    return n % 2 == 0

# parametrize roda o mesmo teste várias vezes com entradas diferentes
@pytest.mark.parametrize("entrada, esperado", [
    (2, True),
    (3, False),
    (0, True),
    (-4, True),
    (-7, False),
])
def test_eh_par(entrada, esperado):
    assert eh_par(entrada) == esperado
    # Resultado: 5 testes independentes, cada um com seu nome no relatório`,
      },
      {
        lang: "bash",
        code: `# Mostra o print() dentro dos testes (pytest esconde por padrão)
pytest -s

# Roda só testes cujo nome contém "carrinho"
pytest -k carrinho

# Mostra os 10 testes mais lentos — útil para otimizar a suíte
pytest --durations=10`,
      },
    ],
    points: [
      "Funções que começam com test_ em arquivos test_*.py são detectadas automaticamente.",
      "Você usa o assert do Python normal — pytest mostra mensagens detalhadas quando ele falha.",
      "pytest.raises substitui assertRaises e aceita match para verificar a mensagem do erro.",
      "@pytest.mark.parametrize evita copiar e colar o mesmo teste com entradas diferentes.",
      "pytest -x para no primeiro erro; -k filtra por nome; -vv aumenta a verbosidade.",
      "Armadilha: misturar pytest com testes herdando de TestCase faz alguns recursos não funcionarem direito.",
      "Armadilha: chamar print sem -s não aparece, e iniciantes acham que o teste não rodou.",
      "Use pytest.approx em vez de comparar floats com == diretamente.",
    ],
    alerts: [
      {
        type: "success",
        content: "Pytest é o padrão moderno: praticamente todo projeto novo em Python usa ele. Aprender pytest hoje vai te servir em qualquer codebase profissional.",
      },
      {
        type: "tip",
        content: "Crie um arquivo pytest.ini na raiz do projeto para configurar opções fixas (testpaths, marcadores, opções padrão) e não precisar lembrar de flags.",
      },
      {
        type: "warning",
        content: "Não nomeie seus arquivos com nome igual a módulos da stdlib (como random.py). Pytest pode fazer import e quebrar de formas confusas.",
      },
    ],
  },
  {
    slug: "fixtures",
    section: "testes-web",
    title: "pytest fixtures",
    difficulty: "intermediario",
    subtitle: "Setup e teardown elegantes, sob demanda.",
    intro: `Quando seus testes começam a crescer, você percebe um padrão chato: vários deles precisam da "mesma coisa pronta antes de começar". Um banco de dados em memória. Um usuário fake logado. Um arquivo temporário. Um cliente HTTP configurado.

Você poderia copiar e colar esse setup no início de cada teste. Mas aí, quando precisar mudar (digamos, o usuário fake agora precisa ter um e-mail diferente), você tem que mudar em vinte lugares. Errado.

A resposta do pytest para isso são as \`fixtures\`. Uma fixture é uma função que prepara alguma coisa, e você "pede" essa coisa simplesmente colocando o nome dela como parâmetro do seu teste. O pytest enxerga o parâmetro, executa a fixture, e te entrega o resultado pronto. É como se fosse injeção de dependência leve.

Fixtures também sabem fazer limpeza depois (com \`yield\`) e podem ter escopos diferentes — algumas rodam uma vez por teste, outras só uma vez por sessão inteira (ótimo para coisas caras, como subir um banco). Neste capítulo você vai criar fixtures simples, com cleanup, parametrizadas e compartilhadas via \`conftest.py\`.`,
    codes: [
      {
        lang: "python",
        code: `import pytest

# Uma fixture é uma função decorada com @pytest.fixture
@pytest.fixture
def usuario():
    # O que a fixture retornar fica disponível no teste
    return {"nome": "Ana", "idade": 30}

# Para usar, basta declarar o nome da fixture como parâmetro
def test_usuario_tem_nome(usuario):
    assert usuario["nome"] == "Ana"

def test_usuario_e_adulto(usuario):
    # Cada teste recebe sua própria cópia (escopo padrão = function)
    assert usuario["idade"] >= 18`,
      },
      {
        lang: "python",
        code: `import pytest
import tempfile
import os

@pytest.fixture
def arquivo_temporario():
    # Tudo antes do yield é setup
    fd, caminho = tempfile.mkstemp(suffix=".txt")
    os.close(fd)
    with open(caminho, "w") as f:
        f.write("ola mundo")

    yield caminho  # Entrega o caminho para o teste

    # Tudo depois do yield é teardown — roda mesmo se o teste falhar
    os.remove(caminho)

def test_le_arquivo(arquivo_temporario):
    with open(arquivo_temporario) as f:
        assert f.read() == "ola mundo"`,
      },
      {
        lang: "python",
        code: `import pytest

# scope controla quantas vezes a fixture é executada
# function = uma vez por teste (padrão)
# class    = uma vez por classe de teste
# module   = uma vez por arquivo
# session  = uma vez para a suíte inteira
@pytest.fixture(scope="session")
def conexao_banco():
    print("\\nAbrindo conexão... (caro!)")
    conn = {"status": "conectado"}
    yield conn
    print("\\nFechando conexão.")

def test_um(conexao_banco):
    assert conexao_banco["status"] == "conectado"

def test_dois(conexao_banco):
    # Mesma conexão do test_um — não foi reaberta
    assert conexao_banco["status"] == "conectado"`,
      },
      {
        lang: "python",
        code: `# arquivo: conftest.py (pytest carrega automaticamente)
import pytest

# Fixtures aqui ficam disponíveis em TODOS os testes da pasta e subpastas,
# sem precisar importar nada.
@pytest.fixture
def carrinho_vazio():
    return []

@pytest.fixture
def carrinho_cheio(carrinho_vazio):
    # Fixtures podem usar outras fixtures como parâmetro
    carrinho_vazio.append({"item": "Café", "preco": 25.0})
    carrinho_vazio.append({"item": "Pão", "preco": 8.5})
    return carrinho_vazio`,
      },
      {
        lang: "python",
        code: `# arquivo: test_loja.py — usa fixtures do conftest.py sem importar
def test_total_carrinho_cheio(carrinho_cheio):
    total = sum(item["preco"] for item in carrinho_cheio)
    assert total == 33.5

def test_carrinho_comeca_vazio(carrinho_vazio):
    assert carrinho_vazio == []`,
      },
      {
        lang: "python",
        code: `import pytest

# Fixture parametrizada: cria múltiplas variações do mesmo teste
@pytest.fixture(params=["mysql", "postgres", "sqlite"])
def banco(request):
    # request.param recebe cada valor de params, um por vez
    return {"tipo": request.param}

def test_banco_tem_tipo(banco):
    # Este teste roda 3 vezes, uma para cada banco
    assert banco["tipo"] in ["mysql", "postgres", "sqlite"]`,
      },
    ],
    points: [
      "Fixture é uma função com @pytest.fixture; você 'pede' colocando o nome como parâmetro do teste.",
      "Use yield para separar setup (antes) e teardown (depois) na mesma função.",
      "scope controla a frequência: function (padrão), class, module, session.",
      "conftest.py compartilha fixtures com toda a pasta sem precisar de import.",
      "Fixtures podem depender umas das outras — basta declarar como parâmetro.",
      "params= permite executar o mesmo teste várias vezes com setups diferentes.",
      "Armadilha: scope=session com estado mutável faz testes interferirem uns nos outros.",
      "Armadilha: esquecer o yield e usar return faz o teardown nunca rodar.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando uma fixture ficar grande demais, quebre em fixtures menores que se compõem. Pytest resolve a árvore de dependências automaticamente para você.",
      },
      {
        type: "info",
        content: "Pytest já vem com fixtures embutidas úteis: tmp_path (pasta temporária), monkeypatch (substitui atributos), capsys (captura stdout/stderr).",
      },
      {
        type: "warning",
        content: "Fixtures de scope session que abrem recursos externos (banco, rede) precisam de cuidado: se o teardown falhar, você vaza conexões na máquina de CI.",
      },
    ],
  },
  {
    slug: "mocks",
    section: "testes-web",
    title: "Mocks com unittest.mock",
    difficulty: "avancado",
    subtitle: "Substituindo dependências externas em testes.",
    intro: `Imagine que você está testando uma função que envia e-mail de boas-vindas. Você não quer que cada vez que rodar a suíte de testes a sua caixa de entrada receba mil e-mails fake. E você definitivamente não quer depender da internet, do servidor SMTP estar no ar, ou do tempo de resposta de uma API externa.

A solução é \`mockar\`: trocar temporariamente o objeto real por um falso, controlado por você, que finge ser o real. O Python tem isso embutido em \`unittest.mock\`. Você diz "quando alguém chamar requests.get, devolva esta resposta fake", roda o teste, e depois tudo volta ao normal.

Mocks também servem para verificar comportamento: você pode perguntar "essa função foi chamada? com quais argumentos? quantas vezes?". Isso é poderoso quando você quer testar interações em vez de valores de retorno.

Cuidado: mock é uma ferramenta cirúrgica, não um martelo. Se você mockar tudo, seu teste passa mas seu código não funciona de verdade. Use mock só nas fronteiras com o mundo externo: rede, disco, hora do sistema, banco de dados. Neste capítulo você vai criar Mocks, usar \`patch\` para substituir coisas e verificar chamadas.`,
    codes: [
      {
        lang: "python",
        code: `from unittest.mock import Mock

# Mock é um objeto camaleão: aceita qualquer atributo e qualquer chamada
m = Mock()
m.algum_metodo("oi", n=3)
m.outro_metodo()

# Você pode definir o que ele retorna
m.consultar.return_value = {"id": 1, "nome": "Ana"}
print(m.consultar(99))  # → {'id': 1, 'nome': 'Ana'}

# E inspecionar o que foi chamado
print(m.algum_metodo.call_args)        # → call('oi', n=3)
print(m.algum_metodo.call_count)       # → 1
m.algum_metodo.assert_called_with("oi", n=3)`,
      },
      {
        lang: "python",
        code: `# arquivo: clima.py
import requests

def temperatura_em(cidade):
    # Em produção, isto faz uma chamada de rede de verdade
    resp = requests.get(f"https://api.exemplo/clima/{cidade}")
    resp.raise_for_status()
    return resp.json()["temp"]`,
      },
      {
        lang: "python",
        code: `# arquivo: test_clima.py
from unittest.mock import patch, Mock
from clima import temperatura_em

# patch substitui 'requests.get' DENTRO do módulo clima durante o teste
@patch("clima.requests.get")
def test_temperatura(mock_get):
    # Configura a resposta fake que será devolvida
    fake_response = Mock()
    fake_response.json.return_value = {"temp": 24.5}
    fake_response.raise_for_status.return_value = None
    mock_get.return_value = fake_response

    assert temperatura_em("Recife") == 24.5
    # Confere que a URL certa foi pedida
    mock_get.assert_called_once_with("https://api.exemplo/clima/Recife")`,
      },
      {
        lang: "python",
        code: `from unittest.mock import patch
from clima import temperatura_em
import requests
import pytest

@patch("clima.requests.get")
def test_erro_de_rede(mock_get):
    # side_effect lança a exceção em vez de retornar valor
    mock_get.side_effect = requests.ConnectionError("sem internet")

    with pytest.raises(requests.ConnectionError):
        temperatura_em("Recife")`,
      },
      {
        lang: "python",
        code: `from unittest.mock import patch

# patch também funciona como context manager — útil para um trecho específico
def test_com_context_manager():
    with patch("clima.requests.get") as mock_get:
        mock_get.return_value.json.return_value = {"temp": 30}
        mock_get.return_value.raise_for_status.return_value = None
        from clima import temperatura_em
        assert temperatura_em("Salvador") == 30
    # Fora do with, requests.get volta ao normal`,
      },
      {
        lang: "python",
        code: `from unittest.mock import MagicMock

# MagicMock é igual ao Mock, mas também suporta dunder methods (__len__, __iter__...)
m = MagicMock()
m.__len__.return_value = 5
print(len(m))  # → 5

# side_effect com lista: cada chamada retorna o próximo valor
m.proximo.side_effect = [1, 2, 3]
print(m.proximo(), m.proximo(), m.proximo())  # → 1 2 3`,
      },
      {
        lang: "python",
        code: `# Regra de ouro: mock no LUGAR onde a coisa é USADA, não onde foi definida
# CERTO:  @patch("clima.requests.get")     ← clima importou requests
# ERRADO: @patch("requests.get")           ← não pega a referência usada por clima

# Isto vale também para funções suas:
# Se utils.py tem 'def agora()' e tarefas.py faz 'from utils import agora',
# você mocka 'tarefas.agora', não 'utils.agora'.`,
      },
    ],
    points: [
      "Mock substitui objetos reais para isolar o código sob teste de dependências externas.",
      "patch troca temporariamente um nome dentro de um módulo durante o teste.",
      "return_value define o que o mock devolve; side_effect lança exceção ou alterna respostas.",
      "assert_called_with, call_args e call_count permitem verificar como o mock foi usado.",
      "MagicMock funciona igual ao Mock mas suporta dunders como len(), iter() e in.",
      "Regra de ouro: mocke o nome no módulo que USA, não no módulo que DEFINE.",
      "Armadilha: mockar demais cria testes que passam mas o código real não funciona.",
      "Armadilha: esquecer raise_for_status mockado faz o teste cair em código não esperado.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Não use mock para esconder dificuldade de design. Se você precisa mockar dez coisas para testar uma função, ela está fazendo coisas demais e precisa ser quebrada.",
      },
      {
        type: "tip",
        content: "Use autospec=True no patch quando possível: isso valida que sua assinatura mockada bate com a real, evitando passar argumentos errados sem perceber.",
      },
      {
        type: "info",
        content: "Para mockar funções da stdlib como time.sleep ou datetime.now, prefira bibliotecas dedicadas como freezegun, que oferecem APIs muito mais ergonômicas.",
      },
    ],
  },
  {
    slug: "tdd",
    section: "testes-web",
    title: "TDD: Test-Driven Development",
    difficulty: "intermediario",
    subtitle: "Red, Green, Refactor: escreva o teste antes do código.",
    intro: `TDD é a prática de escrever o teste antes do código de produção. Parece estranho à primeira vista — como você testa algo que não existe? — mas é exatamente esse o ponto. Você é forçado a pensar primeiro no comportamento desejado, e só depois implementar.

O ciclo se chama Red-Green-Refactor. Red: você escreve um teste que falha (porque o código ainda não existe). Green: você escreve a menor quantidade de código que faz o teste passar, sem se importar com elegância. Refactor: agora que o teste te protege, você melhora o código sem medo de quebrar nada. Repete.

A vantagem prática não é só ter testes (você teria escrevendo depois também). É que o seu design tende a ficar mais simples, porque você só implementa o que é necessário para satisfazer um teste concreto. Você não cria abstrações especulativas que talvez precise um dia.

TDD não é dogma. Algumas pessoas usam o tempo todo, outras só em partes críticas, outras quase nunca. Mas todo mundo deveria experimentar de verdade pelo menos por algumas semanas. Neste capítulo você vai aplicar o ciclo em um exemplo pequeno: validar um CEP brasileiro.`,
    codes: [
      {
        lang: "python",
        code: `# PASSO 1 — RED: escreva o teste primeiro, mesmo sem o código existir
# arquivo: test_cep.py
from cep import validar_cep   # ImportError ainda — tudo bem!

def test_cep_valido_com_oito_digitos():
    assert validar_cep("01310100") is True

# Rodar agora: pytest acusa ImportError. Esperado. Estamos no vermelho.`,
      },
      {
        lang: "python",
        code: `# PASSO 2 — GREEN: o MENOR código possível para o teste passar
# arquivo: cep.py
def validar_cep(cep):
    return True   # sim, é feio. É de propósito.

# pytest agora passa. Estamos no verde.`,
      },
      {
        lang: "python",
        code: `# PASSO 3 — Adicione o próximo teste para forçar o código a evoluir
def test_cep_curto_demais_eh_invalido():
    assert validar_cep("123") is False

# Roda — falha (ainda retorna True). Voltamos ao vermelho.`,
      },
      {
        lang: "python",
        code: `# GREEN de novo — implemente o mínimo para passar os 2 testes
def validar_cep(cep):
    return len(cep) == 8

# Verde de novo. Continuamos.`,
      },
      {
        lang: "python",
        code: `# Mais um caso — CEP com letras é inválido
def test_cep_com_letras_eh_invalido():
    assert validar_cep("0131010X") is False

# RED. Agora ajuste o código:
def validar_cep(cep):
    return len(cep) == 8 and cep.isdigit()`,
      },
      {
        lang: "python",
        code: `# Aceitar formato 'XXXXX-XXX' também
def test_cep_com_hifen_eh_valido():
    assert validar_cep("01310-100") is True

# RED → GREEN
def validar_cep(cep):
    cep = cep.replace("-", "")
    return len(cep) == 8 and cep.isdigit()`,
      },
      {
        lang: "python",
        code: `# PASSO 4 — REFACTOR: melhora o código com a rede de testes te protegendo
import re

_REGEX_CEP = re.compile(r"^\\d{5}-?\\d{3}$")

def validar_cep(cep: str) -> bool:
    """Aceita CEPs no formato 12345678 ou 12345-678."""
    if not isinstance(cep, str):
        return False
    return bool(_REGEX_CEP.match(cep))

# Roda os 4 testes — todos verdes. Refator seguro.`,
      },
    ],
    points: [
      "Red-Green-Refactor: escreva o teste, faça passar do jeito mais simples, depois melhore.",
      "Escrever o teste primeiro força a pensar na API antes de pensar na implementação.",
      "Cada ciclo deve ser pequeno: um comportamento por vez.",
      "No 'Green', a feiura é permitida — você está provando que o teste detecta o problema.",
      "O 'Refactor' só é seguro porque os testes anteriores te protegem.",
      "TDD melhora design porque você só escreve código que tem motivo para existir.",
      "Armadilha: pular o Refactor e ficar com código bagunçado mesmo com tudo verde.",
      "Armadilha: escrever testes gigantes em vez de pequenos passos incrementais.",
    ],
    alerts: [
      {
        type: "info",
        content: "TDD não é sobre ter cobertura alta no fim. É sobre o processo de pensar no comportamento antes de escrever a solução, levando a designs mais simples.",
      },
      {
        type: "warning",
        content: "Não tente aplicar TDD em código exploratório, em scripts pontuais ou em UI. Use onde o problema está bem definido — lógica de negócio, regras, parsers.",
      },
      {
        type: "tip",
        content: "Quando travar pensando no próximo teste, escreva o teste mais bobo possível só para destravar. O ciclo curto ajuda mais que tentar prever toda a solução.",
      },
      {
        type: "success",
        content: "Em pouco tempo praticando TDD em katas (exercícios pequenos), você passa a 'pensar em testes' até quando não está formalmente fazendo TDD.",
      },
    ],
  },
  {
    slug: "coverage",
    section: "testes-web",
    title: "Cobertura de testes",
    difficulty: "intermediario",
    subtitle: "Medindo quais linhas seus testes realmente exercitam.",
    intro: `Você pode ter 200 testes verdes e mesmo assim ter um pedaço grande do seu código nunca executado por nenhum deles. A ferramenta que mede isso se chama \`coverage\` (cobertura). Ela observa quais linhas do seu código rodaram durante a suíte de testes e quais não rodaram.

A métrica mais comum é a porcentagem de linhas cobertas. 80% significa que 80% das linhas executáveis foram visitadas por algum teste. Mas atenção: cobertura é um indicador, não uma garantia de qualidade. Você pode ter 100% de cobertura com testes que não verificam nada de útil. E pode ter 60% de cobertura com testes excelentes nos pontos críticos do sistema.

Pense em cobertura como um detector de pontos cegos: se um arquivo importante está com 20%, é sinal de que tem caminho não testado. Se a função de login tem 0%, alguém esqueceu de testar.

No Python, a ferramenta padrão é o pacote \`coverage.py\` (que vem dentro do plugin \`pytest-cov\`). Neste capítulo você instala, gera relatórios de terminal e HTML, e aprende a configurar limites mínimos para o CI.`,
    codes: [
      {
        lang: "bash",
        code: `# pytest-cov é um plugin do pytest que usa coverage.py por baixo
pip install pytest-cov

# Roda os testes E mede a cobertura do pacote 'meu_app'
pytest --cov=meu_app

# Saída resumida:
# Name                Stmts   Miss  Cover
# ---------------------------------------
# meu_app/cep.py         12      2    83%
# meu_app/auth.py        45     20    56%
# ---------------------------------------
# TOTAL                  57     22    61%`,
      },
      {
        lang: "bash",
        code: `# term-missing mostra quais linhas específicas não foram cobertas
pytest --cov=meu_app --cov-report=term-missing

# Exemplo:
# meu_app/cep.py    12   2   83%   18-19

# As linhas 18 e 19 do cep.py nunca rodam — vá lá ver o que tem`,
      },
      {
        lang: "bash",
        code: `# Relatório HTML — abre uma pastinha bonitinha no navegador
pytest --cov=meu_app --cov-report=html

# Abre o relatório
# Linux:    xdg-open htmlcov/index.html
# Mac:      open htmlcov/index.html
# Windows:  start htmlcov/index.html

# As linhas em vermelho são as não cobertas
# As linhas em verde foram exercitadas`,
      },
      {
        lang: "python",
        code: `# arquivo: meu_app/desconto.py
def aplicar_desconto(preco, cupom):
    if cupom == "BLACK":
        return preco * 0.5      # linha A
    elif cupom == "FIDELIDADE":
        return preco * 0.9      # linha B
    elif preco > 1000:
        return preco * 0.95     # linha C
    return preco                # linha D`,
      },
      {
        lang: "python",
        code: `# arquivo: tests/test_desconto.py
from meu_app.desconto import aplicar_desconto

def test_black():
    assert aplicar_desconto(100, "BLACK") == 50

# Rodando 'pytest --cov=meu_app --cov-report=term-missing':
# Apenas a linha A foi coberta. As linhas B, C e D aparecem como não cobertas.
# Conclusão: faltam testes para FIDELIDADE, preço alto e cupom inexistente.`,
      },
      {
        lang: "bash",
        code: `# --cov-fail-under quebra a CI se a cobertura cair abaixo de um valor
pytest --cov=meu_app --cov-fail-under=80

# Útil em pipeline de CI: impede merge de PR que reduza cobertura
# Saída quando falha:
# FAIL Required test coverage of 80% not reached. Total coverage: 61.40%`,
      },
      {
        lang: "python",
        code: `# arquivo: .coveragerc — configuração persistente do coverage.py
# (ou pyproject.toml com seção [tool.coverage.run])

# Exemplo de .coveragerc:
# [run]
# source = meu_app
# omit =
#     */tests/*
#     */migrations/*
#
# [report]
# exclude_lines =
#     pragma: no cover
#     if __name__ == .__main__.:
#     raise NotImplementedError`,
      },
    ],
    points: [
      "Cobertura mede quais linhas do código foram executadas pelos testes.",
      "pytest-cov é o plugin pytest mais comum, usando coverage.py por baixo.",
      "term-missing mostra exatamente quais linhas faltam cobrir.",
      "O relatório HTML é a melhor forma visual de explorar gaps.",
      "--cov-fail-under permite travar a CI quando a cobertura cai.",
      "Configure exclude_lines para ignorar linhas que não fazem sentido cobrir.",
      "Armadilha: mirar 100% pode levar a testes inúteis só para 'pintar de verde'.",
      "Armadilha: cobertura alta não garante qualidade — testes precisam ter assertions de verdade.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Cobertura é uma métrica enganosa quando vira meta. Equipes que perseguem 100% cegamente acabam escrevendo testes triviais que validam apenas que o código não levanta exceção.",
      },
      {
        type: "tip",
        content: "Mais útil que cobertura total é a cobertura de branches: --cov-branch também conta cada caminho de if/else, revelando ramos não testados.",
      },
      {
        type: "info",
        content: "Em projetos grandes, configure cobertura mínima diferenciada por módulo: lógica de negócio em 90%, código de infraestrutura em 70%, scripts utilitários sem mínimo.",
      },
    ],
  },
  {
    slug: "http-requests",
    section: "testes-web",
    title: "HTTP com requests",
    difficulty: "intermediario",
    subtitle: "A biblioteca clássica para falar com APIs e sites.",
    intro: `Quando você abre o navegador e visita um site, o navegador faz uma requisição HTTP por baixo dos panos: ele pede uma página, e o servidor responde com texto, imagens, JSON, etc. Em Python, quando você quer fazer isso a partir do seu programa — para chamar uma API, baixar um arquivo, integrar com outro sistema — a biblioteca mais famosa é a \`requests\`.

A \`requests\` ficou popular porque a alternativa nativa do Python (\`urllib\`) é cheia de cerimônia. Com \`requests\` você escreve \`requests.get("https://exemplo.com")\` e pronto. É tão comum que virou padrão de fato em milhões de projetos.

HTTP tem alguns conceitos que você precisa entender: métodos (GET para ler, POST para criar, PUT para atualizar, DELETE para apagar), códigos de status (200 ok, 404 não encontrado, 500 erro do servidor) e cabeçalhos (informações extras tipo autenticação, formato dos dados).

Neste capítulo você instala a \`requests\`, faz GET e POST, manda parâmetros, lê JSON, lida com erros e usa sessões para reusar conexões e cookies.`,
    codes: [
      {
        lang: "bash",
        code: `pip install requests

# Para testar, vamos usar uma API pública de teste
# https://httpbin.org devolve eco do que você manda
# https://jsonplaceholder.typicode.com finge ser uma API REST de exemplo`,
      },
      {
        lang: "python",
        code: `import requests

# GET é o método mais básico — pede dados do servidor
resposta = requests.get("https://jsonplaceholder.typicode.com/users/1")

print(resposta.status_code)   # 200 (sucesso)
print(resposta.headers["Content-Type"])  # application/json; charset=utf-8

# .json() já desserializa o corpo JSON em dict
dados = resposta.json()
print(dados["name"])          # → Leanne Graham`,
      },
      {
        lang: "python",
        code: `import requests

# Parâmetros de query string (após o ? na URL)
# A biblioteca cuida da codificação de espaços, caracteres especiais etc.
resposta = requests.get(
    "https://httpbin.org/get",
    params={"q": "python", "page": 2}
)

# A URL real chamada foi: https://httpbin.org/get?q=python&page=2
print(resposta.url)
print(resposta.json()["args"])  # → {'page': '2', 'q': 'python'}`,
      },
      {
        lang: "python",
        code: `import requests

# POST envia dados para o servidor (criar recurso, login, etc.)
# json= serializa o dict em JSON e ajusta o Content-Type
novo = {"title": "Estudar HTTP", "completed": False, "userId": 1}
resposta = requests.post(
    "https://jsonplaceholder.typicode.com/todos",
    json=novo,
    timeout=10  # segundos — SEMPRE coloque timeout
)

# 201 Created é o esperado em POST que cria recurso
print(resposta.status_code)         # → 201
print(resposta.json())              # ecoa o que foi criado, com id`,
      },
      {
        lang: "python",
        code: `import requests

resposta = requests.get("https://httpbin.org/status/404")

# raise_for_status levanta HTTPError se status >= 400
try:
    resposta.raise_for_status()
except requests.HTTPError as e:
    print("Falhou:", e)   # → 404 Client Error: NOT FOUND for url: ...

# Truques úteis para checagem manual
print(resposta.ok)         # False (porque é 4xx)
print(resposta.status_code in (200, 201, 204))  # forma manual`,
      },
      {
        lang: "python",
        code: `import requests

# Cabeçalhos personalizados — autenticação por token, user-agent, etc.
headers = {
    "Authorization": "Bearer SEU_TOKEN_AQUI",
    "User-Agent": "MeuApp/1.0",
}

resposta = requests.get("https://httpbin.org/headers", headers=headers)
print(resposta.json()["headers"]["User-Agent"])  # → MeuApp/1.0`,
      },
      {
        lang: "python",
        code: `import requests

# Session reaproveita conexão TCP e mantém cookies entre requisições
# Muito mais rápido quando você faz várias chamadas para o mesmo host
with requests.Session() as s:
    s.headers.update({"User-Agent": "MeuApp/1.0"})
    s.get("https://httpbin.org/cookies/set/usuario/ana")
    # A próxima requisição já manda o cookie automaticamente
    r = s.get("https://httpbin.org/cookies")
    print(r.json())   # → {'cookies': {'usuario': 'ana'}}`,
      },
      {
        lang: "python",
        code: `import requests

# Tratando timeouts e erros de rede
try:
    r = requests.get("https://httpbin.org/delay/10", timeout=2)
    r.raise_for_status()
    dados = r.json()
except requests.Timeout:
    print("Servidor demorou demais")
except requests.ConnectionError:
    print("Sem internet ou servidor fora")
except requests.HTTPError as e:
    print(f"HTTP {e.response.status_code}")
except ValueError:
    print("Resposta não era JSON válido")`,
      },
    ],
    points: [
      "GET busca, POST cria, PUT/PATCH atualizam, DELETE apaga.",
      "Status 2xx é sucesso, 3xx redireciona, 4xx é erro do cliente, 5xx é erro do servidor.",
      "Use params= para query string e json= para enviar JSON em POST/PUT.",
      "raise_for_status() é a forma mais limpa de transformar erros HTTP em exceções.",
      "Session reaproveita conexão TCP e cookies entre chamadas, melhorando muito a performance.",
      "Sempre defina timeout — sem ele, sua aplicação pode pendurar para sempre.",
      "Armadilha: confiar que .json() sempre funciona — se a resposta não for JSON, ele explode.",
      "Armadilha: deixar credenciais hardcoded no código em vez de usar variáveis de ambiente.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca commite tokens, senhas ou chaves de API no código. Use variáveis de ambiente (os.environ) ou arquivos .env carregados com python-dotenv.",
      },
      {
        type: "warning",
        content: "Sem timeout, uma chamada lenta pode travar sua aplicação inteira. Sempre passe timeout=N (em segundos) em todas as requisições de produção.",
      },
      {
        type: "tip",
        content: "Para repetir requisições com retry automático em erros 5xx, use requests.adapters.HTTPAdapter com urllib3 Retry. Salva muito código manual.",
      },
    ],
  },
  {
    slug: "httpx-async",
    section: "testes-web",
    title: "httpx: alternativa moderna",
    difficulty: "intermediario",
    subtitle: "API igual à do requests, mas com suporte a async.",
    intro: `O \`requests\` é maravilhoso, mas tem uma limitação séria nos dias de hoje: ele é puramente síncrono. Cada chamada para \`requests.get\` bloqueia a execução do programa até a resposta chegar. Se você precisa fazer 100 chamadas para diferentes APIs, vai esperar uma a uma — e isso pode levar minutos.

O \`httpx\` resolve esse problema. Ele tem uma API quase idêntica ao \`requests\` (a maior parte do código que você sabe escrever em \`requests\` funciona com \`httpx\` mudando só o nome do módulo), mas oferece também uma versão assíncrona com \`async/await\`. Você pode disparar várias requisições em paralelo e esperar todas juntas, terminando em segundos em vez de minutos.

Outra vantagem é que o \`httpx\` suporta HTTP/2 (mais eficiente que HTTP/1.1) e tem cliente de teste embutido — útil para testar APIs construídas com FastAPI ou Starlette sem subir servidor de verdade.

Neste capítulo você verá tanto o uso síncrono (idêntico ao \`requests\`) quanto o assíncrono, e quando vale a pena migrar.`,
    codes: [
      {
        lang: "bash",
        code: `pip install httpx

# Para usar HTTP/2 (opcional, requer extras)
pip install "httpx[http2]"`,
      },
      {
        lang: "python",
        code: `import httpx

# Modo síncrono — copie e cole quase qualquer código requests aqui
r = httpx.get("https://jsonplaceholder.typicode.com/users/1")
r.raise_for_status()
print(r.json()["name"])

# POST com JSON, params, timeout — tudo igual ao requests
r = httpx.post(
    "https://httpbin.org/post",
    json={"x": 1},
    params={"q": "py"},
    timeout=5.0,
)
print(r.status_code)`,
      },
      {
        lang: "python",
        code: `import httpx

# Client é o equivalente ao Session do requests
# Reaproveita conexão e cookies, é MUITO mais rápido para múltiplas chamadas
with httpx.Client(base_url="https://jsonplaceholder.typicode.com") as cli:
    cli.headers["User-Agent"] = "MeuApp/1.0"
    u = cli.get("/users/1").json()
    posts = cli.get(f"/users/{u['id']}/posts").json()
    print(u["name"], "tem", len(posts), "posts")`,
      },
      {
        lang: "python",
        code: `import asyncio
import httpx

# AsyncClient é a versão assíncrona — destrava paralelismo de verdade
async def buscar(client, user_id):
    r = await client.get(f"/users/{user_id}")
    r.raise_for_status()
    return r.json()["name"]

async def main():
    async with httpx.AsyncClient(
        base_url="https://jsonplaceholder.typicode.com"
    ) as client:
        # asyncio.gather dispara as 5 chamadas EM PARALELO
        nomes = await asyncio.gather(
            *[buscar(client, i) for i in range(1, 6)]
        )
        print(nomes)

asyncio.run(main())
# Tempo total ~ tempo de UMA requisição, não de 5 somadas`,
      },
      {
        lang: "python",
        code: `import time
import httpx

# Comparação visual: serial x paralelo
def serial():
    inicio = time.time()
    with httpx.Client() as c:
        for i in range(1, 6):
            c.get(f"https://jsonplaceholder.typicode.com/users/{i}")
    return time.time() - inicio

import asyncio
async def paralelo():
    inicio = time.time()
    async with httpx.AsyncClient() as c:
        tarefas = [
            c.get(f"https://jsonplaceholder.typicode.com/users/{i}")
            for i in range(1, 6)
        ]
        await asyncio.gather(*tarefas)
    return time.time() - inicio

print("serial:", serial(), "s")
print("paralelo:", asyncio.run(paralelo()), "s")
# Tipicamente paralelo é 3-5x mais rápido`,
      },
      {
        lang: "python",
        code: `import httpx

# Tratamento de erro segue o mesmo modelo do requests
try:
    r = httpx.get("https://httpbin.org/status/500", timeout=3.0)
    r.raise_for_status()
except httpx.TimeoutException:
    print("Timeout")
except httpx.HTTPStatusError as e:
    # HTTPStatusError é o equivalente do HTTPError do requests
    print("HTTP", e.response.status_code)
except httpx.RequestError as e:
    # Cobre conexão, DNS, SSL, etc.
    print("Erro de rede:", e)`,
      },
      {
        lang: "python",
        code: `# Bonus: testando uma app FastAPI sem subir servidor
# pip install fastapi
from fastapi import FastAPI
from httpx import AsyncClient, ASGITransport
import asyncio

app = FastAPI()

@app.get("/hello")
def hello():
    return {"msg": "ola"}

async def teste():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as cli:
        r = await cli.get("/hello")
        assert r.json() == {"msg": "ola"}
        print("teste passou")

asyncio.run(teste())`,
      },
    ],
    points: [
      "API síncrona do httpx é praticamente idêntica à do requests.",
      "AsyncClient + asyncio.gather permite disparar dezenas de requisições em paralelo.",
      "Use Client/AsyncClient como context manager para fechar conexões corretamente.",
      "httpx suporta HTTP/2 nativo e tem cliente de teste para apps ASGI (FastAPI, Starlette).",
      "Em código síncrono, httpx não traz vantagem grande — fique no requests se quiser.",
      "asyncio.run só pode aparecer no nível mais externo do programa, nunca aninhado.",
      "Armadilha: misturar código síncrono pesado dentro de funções async bloqueia o loop.",
      "Armadilha: criar um AsyncClient por chamada anula a vantagem do paralelismo.",
    ],
    alerts: [
      {
        type: "info",
        content: "httpx tem o cliente de teste recomendado pelo FastAPI: você testa endpoints sem precisar subir servidor real, em milissegundos por teste.",
      },
      {
        type: "tip",
        content: "Em scripts simples e pontuais, requests continua sendo a escolha mais ergonômica. Migre para httpx quando precisar de async, HTTP/2 ou paralelismo de verdade.",
      },
      {
        type: "warning",
        content: "Usar async não acelera nada se você fizer requisições uma de cada vez com await. O ganho vem de juntá-las com gather, as_completed ou TaskGroup.",
      },
    ],
  },
  {
    slug: "beautifulsoup",
    section: "testes-web",
    title: "Web scraping com BeautifulSoup",
    difficulty: "intermediario",
    subtitle: "Extraindo dados estruturados de páginas HTML.",
    intro: `Web scraping é a arte de extrair dados de páginas web quando o site não oferece uma API oficial. Você baixa o HTML cru e procura nos elementos certos para tirar informações: preços de produtos, manchetes de notícias, dados de tabelas, etc.

A combinação clássica em Python é \`requests\` (ou \`httpx\`) para baixar o HTML e \`BeautifulSoup\` para navegar nele. O BeautifulSoup transforma uma sopa caótica de \`<div>\`, \`<span>\` e \`<a>\` em uma árvore que você consulta com métodos simples e seletores CSS.

Antes de scrapar qualquer site, faça três checagens éticas e legais. Primeiro: existe API oficial? Se sim, use ela. Segundo: o robots.txt do site permite o que você está fazendo? Terceiro: os termos de uso autorizam? Scraping abusivo pode te bloquear, gerar processo ou simplesmente derrubar o site alheio.

Neste capítulo você instala BeautifulSoup, aprende a navegar pela árvore HTML, usa seletores CSS, extrai texto e atributos, e vê os principais problemas: HTML mal formado, conteúdo carregado por JavaScript e anti-bots.`,
    codes: [
      {
        lang: "bash",
        code: `# bs4 é o nome do pacote instalável; BeautifulSoup é a classe
pip install beautifulsoup4 lxml requests

# lxml é o parser mais rápido (recomendado)
# Alternativa: html.parser (vem com Python, mais lento)`,
      },
      {
        lang: "python",
        code: `from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <h1 class="titulo">Lojinha do Bruno</h1>
    <ul id="produtos">
      <li class="item" data-id="1">Café — R$ 25,00</li>
      <li class="item" data-id="2">Pão — R$ 8,50</li>
      <li class="item" data-id="3">Leite — R$ 6,00</li>
    </ul>
  </body>
</html>
"""

# Cria a árvore navegável (use 'lxml' se instalado, senão 'html.parser')
soup = BeautifulSoup(html, "lxml")

# Acesso por tag
print(soup.h1.text)             # → Lojinha do Bruno
print(soup.title)               # → None (não existe na página)`,
      },
      {
        lang: "python",
        code: `# find / find_all com filtros
titulo = soup.find("h1", class_="titulo")
print(titulo.text)                # → Lojinha do Bruno

# find_all retorna lista (vazia se nada encontrado, nunca None)
itens = soup.find_all("li", class_="item")
for li in itens:
    print(li.text, "—", li["data-id"])
# → Café — R$ 25,00 — 1
# → Pão — R$ 8,50 — 2
# → Leite — R$ 6,00 — 3`,
      },
      {
        lang: "python",
        code: `# Seletores CSS — geralmente mais ergonômicos
itens = soup.select("ul#produtos li.item")
for el in itens:
    print(el.get_text(strip=True))

# select_one pega só o primeiro
primeiro = soup.select_one("li.item")
print(primeiro["data-id"])  # → 1

# Atributos: usa colchetes, ou .get para evitar KeyError
print(primeiro.get("data-cor", "sem cor"))   # → sem cor`,
      },
      {
        lang: "python",
        code: `import requests
from bs4 import BeautifulSoup

# Combinando requests + BeautifulSoup com um caso real
URL = "https://quotes.toscrape.com/"  # site feito para treinar scraping

resp = requests.get(URL, timeout=10, headers={"User-Agent": "Estudo/1.0"})
resp.raise_for_status()

soup = BeautifulSoup(resp.text, "lxml")
for q in soup.select("div.quote"):
    texto = q.select_one("span.text").get_text(strip=True)
    autor = q.select_one("small.author").get_text(strip=True)
    print(f"{autor}: {texto[:60]}...")`,
      },
      {
        lang: "python",
        code: `from bs4 import BeautifulSoup

# Navegação relativa: parent, next_sibling, children
html = "<div><p>Um</p><p>Dois</p><p>Três</p></div>"
soup = BeautifulSoup(html, "lxml")
primeiro_p = soup.p
print(primeiro_p.parent.name)              # → div
print(primeiro_p.find_next_sibling().text) # → Dois

# Texto de toda a árvore (cuidado, pode vir bagunçado)
print(soup.get_text(separator=" | ", strip=True))
# → Um | Dois | Três`,
      },
      {
        lang: "python",
        code: `import requests
from bs4 import BeautifulSoup

# Boa prática: tratar erros e elementos ausentes sem quebrar
def pegar_titulo(url):
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
    except requests.RequestException as e:
        return f"Erro de rede: {e}"

    soup = BeautifulSoup(r.text, "lxml")
    h1 = soup.find("h1")
    return h1.get_text(strip=True) if h1 else "Sem h1 na página"

print(pegar_titulo("https://quotes.toscrape.com/"))`,
      },
    ],
    points: [
      "BeautifulSoup transforma HTML cru numa árvore navegável por tags, classes e seletores CSS.",
      "find retorna o primeiro match; find_all retorna lista (nunca None).",
      "select e select_one usam seletores CSS, mais expressivos para casos médios.",
      "Antes de scrapar: verifique se há API, leia o robots.txt e respeite os Termos de Uso.",
      "Sempre use User-Agent identificável e timeout para não derrubar o site alheio.",
      "Conteúdo gerado por JavaScript não aparece em requests — para isso veja Selenium/Playwright.",
      "Armadilha: confiar em estrutura HTML que muda — scraper quebra do nada quando o site é redesenhado.",
      "Armadilha: scrapar muito rápido sem delay — IP bloqueado em minutos.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Sites modernos com React/Vue normalmente carregam dados via JavaScript depois da página renderizar. Nesses casos BeautifulSoup sozinho não vê os dados — você precisa de browser automation.",
      },
      {
        type: "danger",
        content: "Scraping pode violar Termos de Uso e leis (LGPD para dados pessoais). Antes de coletar dados em escala, verifique a legalidade no seu contexto.",
      },
      {
        type: "tip",
        content: "Coloque time.sleep entre requisições e respeite o crawl-delay do robots.txt. Sites também valorizam quando você se identifica honestamente no User-Agent.",
      },
    ],
  },
  {
    slug: "selenium",
    section: "testes-web",
    title: "Automação de browser com Selenium",
    difficulty: "avancado",
    subtitle: "Quando o conteúdo só existe depois do JavaScript rodar.",
    intro: `BeautifulSoup é ótimo para HTML estático, mas grande parte da web moderna é dinâmica: o servidor manda uma casca quase vazia e o JavaScript é quem busca e renderiza os dados. Se você baixar com \`requests\`, vê um esqueleto. Para ver o que o usuário humano vê, precisa de um navegador de verdade.

\`Selenium\` é a ferramenta clássica para isso. Ela controla um navegador real (Chrome, Firefox, Edge) por código: você diz "abra esta URL, preencha esse formulário, clique no botão, espere o resultado aparecer". É como se você fosse um usuário automático.

Selenium serve para dois propósitos principais. Primeiro, scraping de sites que dependem de JavaScript. Segundo, testes ponta a ponta — simular um usuário real navegando na sua aplicação web e validando que tudo funciona junto: front, back, banco.

A contrapartida é que é mais pesado: cada teste sobe um navegador, consome RAM, é mais lento, e fica chato de configurar (drivers, versões compatíveis…). Neste capítulo você instala, abre um browser, busca elementos, clica, preenche e tira screenshot.`,
    codes: [
      {
        lang: "bash",
        code: `# Instalação. A partir do Selenium 4.6, ele já baixa o driver sozinho.
pip install selenium

# Você precisa ter o navegador instalado na máquina (Chrome, Firefox, etc.)`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Modo headless = browser roda sem janela (essencial em servidor)
opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--window-size=1280,800")

driver = webdriver.Chrome(options=opts)
driver.get("https://example.com")

print(driver.title)   # → Example Domain
driver.quit()         # SEMPRE feche, ou vaza processo`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://quotes.toscrape.com/login")

# By.NAME, By.ID, By.CSS_SELECTOR, By.XPATH são os mais usados
campo_user = driver.find_element(By.NAME, "username")
campo_pass = driver.find_element(By.NAME, "password")
botao = driver.find_element(By.CSS_SELECTOR, "input[type='submit']")

campo_user.send_keys("admin")
campo_pass.send_keys("admin")
botao.click()

print(driver.current_url)
driver.quit()`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://quotes.toscrape.com/")

# NUNCA use time.sleep — use waits explícitos
wait = WebDriverWait(driver, timeout=10)
# Espera até o elemento estar presente, ou estoura TimeoutException em 10s
quotes = wait.until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.quote"))
)
print(f"Encontradas {len(quotes)} citações")

for q in quotes[:3]:
    texto = q.find_element(By.CSS_SELECTOR, "span.text").text
    print("-", texto[:50], "...")
driver.quit()`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://duckduckgo.com")

caixa = driver.find_element(By.NAME, "q")
caixa.send_keys("python brasil")
caixa.send_keys(Keys.ENTER)   # simula Enter

# Tira screenshot — útil para debug e relatórios de teste que falharam
driver.save_screenshot("resultado.png")
driver.quit()`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Executa JavaScript dentro da página — útil para scroll, manipulação direta
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Pega informação que só existe via JS
altura = driver.execute_script("return document.body.scrollHeight;")
print("altura da página:", altura)
driver.quit()`,
      },
      {
        lang: "python",
        code: `from selenium import webdriver
from contextlib import contextmanager

# Padrão prático: gerenciar driver com context manager (feche sempre)
@contextmanager
def navegador(headless=True):
    opts = webdriver.ChromeOptions()
    if headless:
        opts.add_argument("--headless=new")
    drv = webdriver.Chrome(options=opts)
    try:
        yield drv
    finally:
        drv.quit()

with navegador() as d:
    d.get("https://example.com")
    print(d.title)
# Driver é fechado mesmo se algo der errado dentro do with`,
      },
    ],
    points: [
      "Selenium controla um browser real (Chrome/Firefox/Edge) via Python.",
      "A partir do Selenium 4.6, drivers são baixados automaticamente — sem mais ChromeDriver manual.",
      "Use modo headless em servidor; com janela só durante desenvolvimento.",
      "By.ID, By.NAME, By.CSS_SELECTOR, By.XPATH são as estratégias de busca.",
      "Nunca use time.sleep — prefira WebDriverWait com expected_conditions.",
      "execute_script abre uma porta para rodar JS arbitrário dentro da página.",
      "Armadilha: esquecer driver.quit() — deixa processos zumbis consumindo memória.",
      "Armadilha: dependência de XPath frágil — qualquer mudança no DOM quebra o teste.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre embrulhe o driver em try/finally ou context manager para garantir que driver.quit() rode mesmo quando o teste falha. Senão você acumula browsers zumbis.",
      },
      {
        type: "warning",
        content: "Selenium é poderoso mas lento e flaky se mal escrito. Para testes E2E modernos, considere Playwright — mais rápido, API mais limpa, esperas automáticas.",
      },
      {
        type: "info",
        content: "Selenium Grid permite distribuir testes em vários browsers/máquinas em paralelo. Útil para CI quando a suíte cresce e precisa rodar em minutos, não horas.",
      },
    ],
  },
  {
    slug: "playwright",
    section: "testes-web",
    title: "Playwright: scraping moderno",
    difficulty: "avancado",
    subtitle: "A alternativa moderna ao Selenium, da Microsoft.",
    intro: `Se Selenium é o avô da automação de browser, Playwright é o filho moderno. Criado pela Microsoft, ele foi desenhado tendo aprendido com 15 anos de problemas do Selenium: instalação difícil, esperas frágeis, performance ruim em paralelo, falta de isolamento entre testes.

Em Playwright você instala uma biblioteca e ela baixa os browsers (Chromium, Firefox, WebKit) prontos para uso. Não tem driver para configurar. As esperas são automáticas: quando você diz "clique no botão", o Playwright já espera o botão estar visível e clicável. Isso reduz drasticamente os testes "flaky" (que falham aleatoriamente).

Outra vantagem é o isolamento: cada teste roda em um contexto novo (browser context), com cookies e storage separados. Não há vazamento de estado entre um teste e outro. E a versão Python suporta tanto modo síncrono quanto assíncrono, com a mesma API.

Playwright virou o queridinho para testes E2E, scraping moderno e automação geral. Neste capítulo você instala, navega, interage com elementos, faz screenshots e usa o gravador de testes — feature que sozinha já vale a migração.`,
    codes: [
      {
        lang: "bash",
        code: `# Instala o pacote E baixa os browsers que ele controla
pip install playwright
playwright install   # baixa Chromium, Firefox, WebKit (~400MB total)

# Para baixar só um browser específico (mais leve)
playwright install chromium`,
      },
      {
        lang: "python",
        code: `from playwright.sync_api import sync_playwright

# Modo síncrono — mais simples para começar e para scripts
with sync_playwright() as p:
    # headless=True (padrão) roda sem janela. False mostra o browser.
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())          # → Example Domain
    print(page.content()[:80])
    browser.close()`,
      },
      {
        lang: "python",
        code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://quotes.toscrape.com/login")

    # API limpíssima — Playwright já espera o elemento aparecer sozinho
    page.fill("input[name='username']", "admin")
    page.fill("input[name='password']", "admin")
    page.click("input[type='submit']")

    # Espera por uma condição (igual aos waits do Selenium, mas embutida)
    page.wait_for_url("**/")
    print("Logado em:", page.url)
    browser.close()`,
      },
      {
        lang: "python",
        code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://quotes.toscrape.com/")

    # Locators são a forma recomendada de selecionar (mais robusta que selector string)
    quotes = page.locator("div.quote")
    print("Total:", quotes.count())

    # Iteração explícita
    for i in range(quotes.count()):
        item = quotes.nth(i)
        texto = item.locator("span.text").inner_text()
        autor = item.locator("small.author").inner_text()
        print(f"{autor}: {texto[:50]}...")
    browser.close()`,
      },
      {
        lang: "python",
        code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Screenshot da página inteira
    page.screenshot(path="exemplo.png", full_page=True)

    # Salva PDF (só funciona em Chromium)
    page.pdf(path="exemplo.pdf", format="A4")

    # Emula dispositivo móvel
    iphone = p.devices["iPhone 13"]
    ctx = browser.new_context(**iphone)
    pg2 = ctx.new_page()
    pg2.goto("https://example.com")
    pg2.screenshot(path="mobile.png")
    browser.close()`,
      },
      {
        lang: "python",
        code: `import asyncio
from playwright.async_api import async_playwright

# Modo async — para muitas páginas em paralelo
async def buscar_titulo(browser, url):
    page = await browser.new_page()
    await page.goto(url)
    titulo = await page.title()
    await page.close()
    return url, titulo

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        urls = [
            "https://example.com",
            "https://quotes.toscrape.com",
            "https://httpbin.org",
        ]
        # Gather dispara as 3 navegações em paralelo
        resultados = await asyncio.gather(*[buscar_titulo(browser, u) for u in urls])
        for url, t in resultados:
            print(t, "—", url)
        await browser.close()

asyncio.run(main())`,
      },
      {
        lang: "bash",
        code: `# Recurso matador: gravar interações no browser e gerar código Python
playwright codegen https://quotes.toscrape.com/login

# Abre uma janela do Chromium + uma janela com o código sendo gerado
# Você navega, clica, preenche — o código vai aparecendo automaticamente
# Cole no seu projeto e ajuste`,
      },
    ],
    points: [
      "Playwright já vem com browsers integrados — sem dor de cabeça com drivers.",
      "Esperas são automáticas; menos código boilerplate e menos testes flaky.",
      "Locators são mais robustos do que selectors strings antigos.",
      "Cada contexto é isolado: cookies, storage e cache separados por teste.",
      "Suporta sync e async com a mesma API; async é ótimo para scrapar muitas páginas.",
      "playwright codegen grava suas ações e gera o código pronto.",
      "Armadilha: misturar locators com find/click do estilo antigo gera testes confusos.",
      "Armadilha: rodar em CI sem chamar playwright install — browsers não estarão lá.",
    ],
    alerts: [
      {
        type: "success",
        content: "Para projetos novos, prefira Playwright a Selenium. Curva de aprendizado menor, performance melhor e a comunidade está migrando rapidamente.",
      },
      {
        type: "tip",
        content: "Use page.expect_response() para esperar requisições específicas terminarem. Ótimo para sites SPA que carregam dados via XHR depois do clique.",
      },
      {
        type: "info",
        content: "Pytest tem o plugin pytest-playwright que injeta a fixture page automaticamente, integrando perfeitamente com a sua suíte de testes existente.",
      },
    ],
  },
  {
    slug: "websockets",
    section: "testes-web",
    title: "WebSockets em Python",
    difficulty: "avancado",
    subtitle: "Comunicação bidirecional em tempo real entre cliente e servidor.",
    intro: `HTTP comum é uma conversa de carta: o cliente pergunta, o servidor responde, fim. Para receber a próxima informação, o cliente precisa perguntar de novo. Para chats, jogos online, dashboards em tempo real e notificações instantâneas, isso é péssimo — você teria que ficar perguntando "tem novidade?" a cada segundo (polling).

WebSocket é uma conversa por telefone. O cliente liga uma vez, e enquanto a linha está aberta, qualquer um dos dois pode falar a qualquer momento. O servidor pode empurrar mensagens sem ser perguntado. Isso destrava casos de uso que com HTTP puro são lentos e caros.

Em Python, a biblioteca \`websockets\` é a mais usada. Ela é totalmente assíncrona (usa \`asyncio\`) tanto no cliente quanto no servidor. Frameworks como FastAPI e Django Channels também oferecem suporte a WebSockets em cima dela.

Neste capítulo você vai escrever um servidor que ecoa mensagens, um cliente que conversa com ele, um servidor de chat com broadcast para vários clientes, e ver os pontos de atenção: lidar com desconexão, autenticação e diferença entre WebSocket (\`ws://\`) e WebSocket seguro (\`wss://\`).`,
    codes: [
      {
        lang: "bash",
        code: `pip install websockets

# Vamos usar Python 3.10+ por causa de asyncio.run e match
python --version`,
      },
      {
        lang: "python",
        code: `# arquivo: servidor_eco.py
import asyncio
from websockets.asyncio.server import serve

# Função handler chamada para cada cliente conectado
async def echo(websocket):
    async for mensagem in websocket:   # itera enquanto a conexão estiver aberta
        print(f"recebido: {mensagem}")
        await websocket.send(f"eco: {mensagem}")

async def main():
    async with serve(echo, "localhost", 8765):
        print("Servidor em ws://localhost:8765")
        await asyncio.Future()  # roda para sempre

asyncio.run(main())`,
      },
      {
        lang: "python",
        code: `# arquivo: cliente_eco.py
import asyncio
from websockets.asyncio.client import connect

async def main():
    # ws:// é texto puro, wss:// é com TLS (use sempre em produção)
    async with connect("ws://localhost:8765") as ws:
        await ws.send("oi servidor")
        resposta = await ws.recv()
        print(f"servidor disse: {resposta}")

        await ws.send("tchau")
        print(await ws.recv())

asyncio.run(main())`,
      },
      {
        lang: "python",
        code: `# arquivo: servidor_chat.py — broadcast para todos os clientes
import asyncio
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed

clientes = set()

async def handler(ws):
    clientes.add(ws)
    try:
        async for msg in ws:
            # envia para todo mundo, exceto pra quem mandou
            for c in clientes:
                if c is not ws:
                    try:
                        await c.send(msg)
                    except ConnectionClosed:
                        pass
    finally:
        clientes.discard(ws)

async def main():
    async with serve(handler, "localhost", 8765):
        print("Chat rodando em ws://localhost:8765")
        await asyncio.Future()

asyncio.run(main())`,
      },
      {
        lang: "python",
        code: `# arquivo: cliente_chat.py — manda e recebe ao mesmo tempo
import asyncio
from websockets.asyncio.client import connect

async def receber(ws):
    async for msg in ws:
        print(f"\\n>> {msg}\\n> ", end="", flush=True)

async def enviar(ws):
    while True:
        # asyncio.to_thread evita travar o loop com input() bloqueante
        texto = await asyncio.to_thread(input, "> ")
        if texto.lower() == "sair":
            break
        await ws.send(texto)

async def main():
    async with connect("ws://localhost:8765") as ws:
        # gather roda receber e enviar em paralelo
        await asyncio.gather(receber(ws), enviar(ws))

asyncio.run(main())`,
      },
      {
        lang: "python",
        code: `import asyncio
import json
from websockets.asyncio.client import connect
from websockets.exceptions import ConnectionClosed

# Tratando reconexão e parsing de JSON
async def main():
    while True:
        try:
            async with connect("ws://localhost:8765") as ws:
                await ws.send(json.dumps({"acao": "ping"}))
                async for msg in ws:
                    try:
                        dados = json.loads(msg)
                        print("recebi:", dados)
                    except json.JSONDecodeError:
                        print("mensagem nao-JSON:", msg)
        except (ConnectionClosed, OSError) as e:
            print("desconectado:", e)
            await asyncio.sleep(2)   # tenta reconectar depois de 2s

asyncio.run(main())`,
      },
      {
        lang: "python",
        code: `# Servidor com autenticação simples por token na URL
import asyncio
from websockets.asyncio.server import serve

TOKENS_VALIDOS = {"abc123", "ana", "bruno"}

async def handler(ws):
    # request.path tem o caminho. Convenção: ws://host/?token=XYZ
    path = ws.request.path
    token = None
    if "token=" in path:
        token = path.split("token=")[1].split("&")[0]

    if token not in TOKENS_VALIDOS:
        await ws.close(code=4001, reason="token invalido")
        return

    await ws.send(f"bem-vindo, {token}")
    async for msg in ws:
        await ws.send(f"você disse: {msg}")

async def main():
    async with serve(handler, "localhost", 8765):
        await asyncio.Future()

asyncio.run(main())`,
      },
    ],
    points: [
      "WebSocket mantém uma conexão aberta para troca bidirecional de mensagens em tempo real.",
      "Use ws:// para desenvolvimento local e wss:// (com TLS) sempre em produção.",
      "A biblioteca websockets é totalmente assíncrona — você precisa entender asyncio.",
      "async for msg in websocket itera até a conexão fechar — naturalmente lida com mensagens contínuas.",
      "Sempre trate ConnectionClosed; clientes podem cair sem aviso.",
      "Para broadcast, mantenha uma estrutura (set/dict) com todos os clientes ativos.",
      "Armadilha: usar input() em código async sem to_thread bloqueia o event loop inteiro.",
      "Armadilha: ignorar autenticação — qualquer um na rede pode conectar e mandar mensagens.",
    ],
    alerts: [
      {
        type: "danger",
        content: "Em produção use sempre wss:// com certificado válido. WebSocket sem TLS expõe mensagens em texto puro, incluindo possíveis tokens e dados sensíveis.",
      },
      {
        type: "info",
        content: "Frameworks como FastAPI e Django Channels embutem WebSocket de forma elegante junto com suas rotas HTTP. Vale a pena se você já usa esses frameworks.",
      },
      {
        type: "warning",
        content: "WebSocket não substitui HTTP para tudo. Para CRUD comum, REST/GraphQL continua melhor. Use WebSocket onde realmente precisa de push do servidor para o cliente.",
      },
      {
        type: "tip",
        content: "Para escalar WebSocket em vários servidores, use um broker como Redis Pub/Sub para repassar mensagens entre instâncias. Sem isso, cada servidor só fala com seus clientes.",
      },
    ],
  },
];
