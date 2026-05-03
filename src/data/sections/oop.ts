import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "intro-oop",
    section: "oop",
    title: "Introdução à orientação a objetos",
    difficulty: "intermediario",
    subtitle: "Por que existe esse tal de OOP em Python.",
    intro: `Imagine que você está montando um sistema para uma lojinha. Você precisa lidar com clientes, produtos, pedidos. Cada cliente tem um nome, um CPF, um histórico de compras. Cada produto tem um preço, um estoque, uma descrição. Se você tentar guardar tudo em variáveis soltas e dicionários, em pouco tempo vira uma bagunça: nome_cliente_1, cpf_cliente_1, nome_cliente_2... e funções que recebem dez argumentos cada.

Orientação a objetos (OOP) é uma forma de organizar esse caos. A ideia é simples: agrupar dados que andam juntos com as funções que mexem nesses dados. Esse pacotinho se chama objeto. E o molde que descreve como construir esses objetos se chama classe.

Em Python tudo já é objeto: uma string, uma lista, um número. Quando você escreve "ana".upper(), está chamando um método do objeto string. OOP só te dá ferramentas para criar seus próprios tipos com a mesma cara dos tipos embutidos.

Você não é obrigado a usar OOP em Python. Para scripts pequenos, funções resolvem. Mas quando o programa cresce, ter um Cliente, um Produto e um Pedido bem definidos deixa o código mais fácil de ler, testar e mudar.`,
    codes: [
      {
        lang: "python",
        code: `# Sem OOP: dados e funcoes soltas, faceis de bagunçar
cliente = {"nome": "Ana", "saldo": 100.0}

def depositar(c, valor):
    c["saldo"] += valor

depositar(cliente, 50)
print(cliente)  # → {'nome': 'Ana', 'saldo': 150.0}
`,
      },
      {
        lang: "python",
        code: `# Com OOP: dados e comportamento juntos
class Conta:
    def __init__(self, nome, saldo=0.0):
        self.nome = nome      # atributo do objeto
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor   # comportamento do objeto

c = Conta("Ana", 100.0)
c.depositar(50)
print(c.saldo)  # → 150.0
`,
      },
      {
        lang: "python",
        code: `# Tudo em Python ja eh objeto: strings tem metodos
nome = "ana"
print(nome.upper())          # → ANA
print(type(nome))            # → <class 'str'>
print(isinstance(nome, str)) # → True
`,
      },
      {
        lang: "python",
        code: `# Voce pode criar varios objetos da mesma classe
class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

p1 = Produto("Cafe", 25.0)
p2 = Produto("Pao", 1.5)
print(p1.nome, p1.preco)  # → Cafe 25.0
print(p2.nome, p2.preco)  # → Pao 1.5
`,
      },
      {
        lang: "python",
        code: `# OOP nao eh sempre necessaria. Para um script curto, funcoes bastam.
def calcular_desconto(preco, percentual):
    return preco * (1 - percentual / 100)

print(calcular_desconto(100, 10))  # → 90.0
`,
      },
    ],
    points: [
      "Classe é o molde; objeto (ou instância) é a coisa concreta criada a partir do molde.",
      "OOP agrupa dados (atributos) com comportamentos (métodos) que mexem nesses dados.",
      "Em Python tudo é objeto: até números e funções têm tipo e métodos.",
      "Use OOP quando o programa cresce e você precisa modelar entidades do mundo real.",
      "Para scripts curtos e utilitários, funções soltas resolvem sem precisar de classes.",
      "Armadilha: criar classe para tudo deixa o código verboso à toa.",
      "Armadilha: confundir classe (o molde) com instância (o objeto criado) é comum no início.",
      "Pense em substantivos do seu domínio: Cliente, Pedido, Produto viram boas classes.",
    ],
    alerts: [
      {
        type: "info",
        content: "OOP é um estilo entre vários. Python também aceita programação funcional e procedural na mesma base de código sem problema.",
      },
      {
        type: "tip",
        content: "Antes de criar uma classe, pergunte: existem dados e comportamentos que sempre andam juntos? Se sim, classe ajuda. Se não, função basta.",
      },
      {
        type: "warning",
        content: "Não tente traduzir literalmente OOP de Java ou C# para Python. Aqui é mais leve, sem getters e setters por padrão.",
      },
    ],
  },
  {
    slug: "classes-instancias",
    section: "oop",
    title: "Classes e instâncias",
    difficulty: "intermediario",
    subtitle: "Definindo seus próprios tipos do zero.",
    intro: `Uma classe é como uma planta de uma casa: ela descreve como a casa será, mas não é a casa. A casa que você de fato mora é a instância, construída a partir da planta. Você pode construir mil casas iguais a partir da mesma planta, e cada casa terá seus próprios moradores, seus próprios móveis.

Em Python, definir uma classe é simples. Você escreve class NomeDaClasse: e dentro coloca um método especial chamado __init__. Esse método roda automaticamente toda vez que você cria uma nova instância. É lá que você diz quais dados cada instância vai ter.

O parâmetro self é o que mais confunde no começo. Ele é a referência para a instância atual, aquela que está sendo manipulada agora. Quando você escreve c.depositar(50), Python na verdade chama Conta.depositar(c, 50), passando c como self automaticamente.

Criar uma instância não usa palavra new como em outras linguagens. É só chamar a classe como se fosse uma função: Conta("Ana"). O Python cuida do resto.`,
    codes: [
      {
        lang: "python",
        code: `# Classe minima possivel
class Cachorro:
    pass  # corpo vazio, ainda nao faz nada

rex = Cachorro()
print(rex)         # → <__main__.Cachorro object at 0x...>
print(type(rex))   # → <class '__main__.Cachorro'>
`,
      },
      {
        lang: "python",
        code: `# __init__ roda quando voce cria a instancia
class Cachorro:
    def __init__(self, nome, idade):
        # self eh a instancia recem-criada
        self.nome = nome
        self.idade = idade

rex = Cachorro("Rex", 3)
print(rex.nome, rex.idade)  # → Rex 3
`,
      },
      {
        lang: "python",
        code: `# Cada instancia tem seus proprios dados
class Cachorro:
    def __init__(self, nome):
        self.nome = nome

a = Cachorro("Rex")
b = Cachorro("Bidu")
print(a.nome, b.nome)  # → Rex Bidu
a.nome = "Toto"
print(a.nome, b.nome)  # → Toto Bidu (b nao mudou)
`,
      },
      {
        lang: "python",
        code: `# Metodos sao funcoes definidas dentro da classe
class Cachorro:
    def __init__(self, nome):
        self.nome = nome

    def latir(self):
        # self.nome acessa o nome desta instancia
        return f"{self.nome} diz: au au!"

rex = Cachorro("Rex")
print(rex.latir())  # → Rex diz: au au!
`,
      },
      {
        lang: "python",
        code: `# Esquecer self causa erro classico
class Cachorro:
    def latir():  # faltou self
        return "au"

rex = Cachorro()
# rex.latir()
# TypeError: latir() takes 0 positional arguments but 1 was given
`,
      },
      {
        lang: "python",
        code: `# Voce pode adicionar atributos depois (mas evite na pratica)
class Pessoa:
    def __init__(self, nome):
        self.nome = nome

p = Pessoa("Ana")
p.idade = 30  # criado fora do __init__
print(p.idade)  # → 30
`,
      },
    ],
    points: [
      "class define o molde; chamar a classe (Cachorro()) cria uma instância.",
      "__init__ é o construtor: roda automaticamente na criação da instância.",
      "self representa a instância atual e é sempre o primeiro parâmetro de métodos de instância.",
      "Cada instância guarda seus próprios atributos, independentes das outras.",
      "Métodos são funções definidas dentro da classe que operam sobre self.",
      "Armadilha: esquecer self na assinatura ou ao acessar atributos gera TypeError ou NameError.",
      "Armadilha: criar atributos fora do __init__ funciona mas confunde quem lê o código depois.",
      "Por convenção, nomes de classes usam CamelCase: ContaBancaria, não conta_bancaria.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Defina todos os atributos no __init__, mesmo os que começam vazios. Quem lê a classe entende de cara o que cada instância carrega.",
      },
      {
        type: "warning",
        content: "self não é palavra reservada, mas mude esse nome só se quiser ser deserdado pela comunidade Python. Mantenha self por convenção.",
      },
      {
        type: "info",
        content: "Não existe palavra new em Python. Chamar a classe como função já constrói uma instância nova.",
      },
    ],
  },
  {
    slug: "atributos-classe",
    section: "oop",
    title: "Atributos de classe vs instância",
    difficulty: "intermediario",
    subtitle: "A distinção que pega todo mundo no começo.",
    intro: `Dentro de uma classe você pode declarar dois tipos de atributos, e a diferença entre eles é uma das primeiras pegadinhas de Python. Os atributos de instância vivem em cada objeto separadamente: cada Cachorro tem o seu próprio nome. Já os atributos de classe são compartilhados por todas as instâncias daquela classe: todos os cachorros pertencem à mesma espécie.

Atributo de instância nasce dentro do __init__, sempre prefixado por self. Atributo de classe é declarado solto, no corpo da classe, fora de qualquer método. Quando você lê instancia.atributo, o Python primeiro procura no objeto; se não achar, sobe e procura na classe.

A confusão começa quando você usa um valor mutável, tipo uma lista, como atributo de classe. Como ela é compartilhada, mexer pelo primeiro objeto afeta todos os outros. Esse bug é silencioso e horrível de debugar. A regra prática: atributos de classe servem para constantes ou contadores; tudo que muda por instância vai no __init__.`,
    codes: [
      {
        lang: "python",
        code: `# Atributo de classe: compartilhado entre todas as instancias
class Cachorro:
    especie = "Canis familiaris"   # atributo de classe

    def __init__(self, nome):
        self.nome = nome           # atributo de instancia

a = Cachorro("Rex")
b = Cachorro("Bidu")
print(a.especie, b.especie)  # → Canis familiaris Canis familiaris
print(a.nome, b.nome)        # → Rex Bidu
`,
      },
      {
        lang: "python",
        code: `# Mudar pela classe afeta todas as instancias
Cachorro.especie = "Cao domestico"
print(a.especie)  # → Cao domestico
print(b.especie)  # → Cao domestico
`,
      },
      {
        lang: "python",
        code: `# Mas atribuir pela instancia cria uma copia local (sombra)
a.especie = "Lobo"
print(a.especie)  # → Lobo (so no a)
print(b.especie)  # → Cao domestico
print(Cachorro.especie)  # → Cao domestico
`,
      },
      {
        lang: "python",
        code: `# ARMADILHA: lista mutavel como atributo de classe
class Time:
    jogadores = []  # compartilhada por TODAS as instancias!

    def __init__(self, nome):
        self.nome = nome

t1 = Time("Flamengo")
t2 = Time("Vasco")
t1.jogadores.append("Bruno")
print(t2.jogadores)  # → ['Bruno']  bug horrivel
`,
      },
      {
        lang: "python",
        code: `# Forma correta: criar a lista dentro do __init__
class Time:
    def __init__(self, nome):
        self.nome = nome
        self.jogadores = []   # cada time tem a sua

t1 = Time("Flamengo")
t2 = Time("Vasco")
t1.jogadores.append("Bruno")
print(t1.jogadores)  # → ['Bruno']
print(t2.jogadores)  # → []
`,
      },
      {
        lang: "python",
        code: `# Bom uso: contador compartilhado
class Pedido:
    total_criados = 0

    def __init__(self):
        Pedido.total_criados += 1

Pedido(); Pedido(); Pedido()
print(Pedido.total_criados)  # → 3
`,
      },
    ],
    points: [
      "Atributo de classe vive na classe; atributo de instância vive no objeto.",
      "Python procura atributos primeiro na instância, depois sobe para a classe.",
      "Atribuir pela instância (self.x = ...) cria um atributo local, não muda o de classe.",
      "Use atributo de classe para constantes ou contadores compartilhados.",
      "Tudo que muda por instância (nome, lista, dicionário) deve nascer no __init__.",
      "Armadilha clássica: lista mutável como atributo de classe vira estado compartilhado e gera bugs silenciosos.",
      "Armadilha: confundir Classe.atributo = X (afeta todos) com instancia.atributo = X (cria sombra).",
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca use lista, dicionário ou set como atributo de classe se a intenção é que cada instância tenha o seu. Coloque dentro do __init__.",
      },
      {
        type: "info",
        content: "Você pode acessar atributos de classe via instância ou via classe: rex.especie e Cachorro.especie retornam o mesmo valor.",
      },
      {
        type: "tip",
        content: "Para incrementar um contador de classe sem ambiguidade, escreva NomeDaClasse.contador += 1, não self.contador += 1.",
      },
    ],
  },
  {
    slug: "metodos-tipos",
    section: "oop",
    title: "Métodos de instância, classe e estáticos",
    difficulty: "intermediario",
    subtitle: "Os três tipos de métodos e quando usar cada um.",
    intro: `Toda função definida dentro de uma classe é um método, mas existem três sabores diferentes. A maioria que você escreve são métodos de instância: eles recebem self e operam sobre os dados do objeto específico. Esses são o pão com manteiga da OOP.

Métodos de classe recebem cls em vez de self. cls é a própria classe, não uma instância. Eles são úteis para construtores alternativos: imagine um Pedido que pode ser criado a partir de um dicionário JSON, ou uma Data criada a partir de uma string. Você usa o decorador @classmethod para marcá-los.

Métodos estáticos não recebem nem self nem cls. Eles são funções normais que moram dentro da classe só por organização. O decorador é @staticmethod. Use quando a lógica está relacionada à classe mas não depende de nenhum atributo dela.

Saber escolher entre os três deixa o código mais claro. Se você vai mexer em self.algo, é instância. Se quer criar uma instância de um jeito alternativo, é classe. Se é só uma função utilitária temática, é estático.`,
    codes: [
      {
        lang: "python",
        code: `# Metodo de instancia: recebe self
class Conta:
    def __init__(self, saldo):
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

c = Conta(100)
c.depositar(50)
print(c.saldo)  # → 150
`,
      },
      {
        lang: "python",
        code: `# Metodo de classe: recebe cls, util como construtor alternativo
class Data:
    def __init__(self, dia, mes, ano):
        self.dia = dia
        self.mes = mes
        self.ano = ano

    @classmethod
    def de_string(cls, texto):
        # texto no formato "dd/mm/aaaa"
        dia, mes, ano = texto.split("/")
        return cls(int(dia), int(mes), int(ano))

d = Data.de_string("15/03/2024")
print(d.dia, d.mes, d.ano)  # → 15 3 2024
`,
      },
      {
        lang: "python",
        code: `# Metodo estatico: nao recebe self nem cls
class Calculadora:
    @staticmethod
    def somar(a, b):
        return a + b

print(Calculadora.somar(2, 3))  # → 5
# Nao precisa criar instancia para usar
`,
      },
      {
        lang: "python",
        code: `# Comparando os tres lado a lado
class Pizza:
    tamanho_padrao = "media"

    def __init__(self, sabor):
        self.sabor = sabor

    def descrever(self):           # instancia: usa self
        return f"Pizza de {self.sabor}"

    @classmethod
    def margherita(cls):           # classe: cria instancias
        return cls("margherita")

    @staticmethod
    def eh_sabor_valido(s):        # estatico: util pura
        return s in {"calabresa", "margherita", "muçarela"}

p = Pizza.margherita()
print(p.descrever())                  # → Pizza de margherita
print(Pizza.eh_sabor_valido("frango"))# → False
`,
      },
      {
        lang: "python",
        code: `# Erro comum: chamar metodo de instancia sem instancia
class Conta:
    def saldo(self):
        return 100

# Conta.saldo()
# TypeError: Conta.saldo() missing 1 required positional argument: 'self'
print(Conta.saldo(Conta()))  # passando manualmente: → 100
`,
      },
    ],
    points: [
      "Método de instância recebe self e mexe nos dados de um objeto específico.",
      "@classmethod recebe cls e é a forma idiomática de criar construtores alternativos.",
      "@staticmethod não recebe self nem cls; é uma função normal que mora na classe.",
      "Use cls(...) dentro de classmethod para criar instâncias e respeitar herança.",
      "Métodos estáticos podem ser chamados pela classe ou pela instância sem diferença.",
      "Armadilha: chamar método de instância pela classe sem passar self gera TypeError.",
      "Armadilha: usar @staticmethod quando o método precisa do self ou cls é só atrapalhar.",
      "Quando em dúvida entre estático e função módulo: se nada amarra à classe, deixe como função fora.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Construtores alternativos como Data.de_string(texto) ficam muito mais legíveis com @classmethod do que com if dentro do __init__.",
      },
      {
        type: "info",
        content: "Em @classmethod use cls(...) em vez do nome literal da classe. Assim, se alguém herdar, o construtor cria o tipo certo.",
      },
      {
        type: "warning",
        content: "Esquecer de colocar @classmethod ou @staticmethod faz Python tratar o método como de instância e bagunça as assinaturas esperadas.",
      },
    ],
  },
  {
    slug: "heranca",
    section: "oop",
    title: "Herança",
    difficulty: "intermediario",
    subtitle: "Reaproveitando código entre classes parecidas.",
    intro: `Imagine que você tem uma classe Animal com nome, idade e o método dormir. Agora você precisa de Cachorro, Gato e Pássaro. Todos têm nome, idade e dormem. Copiar e colar o código três vezes é a receita do bug. Herança resolve isso: você diz que Cachorro é um Animal e ganha tudo de graça, podendo adicionar ou trocar o que for específico.

Em Python a sintaxe é colocar a classe pai entre parênteses: class Cachorro(Animal):. A classe filha herda atributos e métodos. Você pode adicionar novos métodos, sobrescrever os existentes, ou reaproveitar parte do comportamento do pai usando super().

A função super() é importante. Quando você redefine __init__ na filha, geralmente quer chamar o __init__ do pai primeiro, para inicializar os atributos comuns, e depois adicionar os específicos. super().__init__(...) faz isso.

Herança é poderosa, mas use com cuidado. A regra é "é-um": Cachorro é-um Animal, faz sentido. Já um Carro não é-um Motor; é melhor o Carro ter um Motor (composição).`,
    codes: [
      {
        lang: "python",
        code: `# Classe base
class Animal:
    def __init__(self, nome):
        self.nome = nome

    def dormir(self):
        return f"{self.nome} esta dormindo"

# Classe filha herda tudo
class Cachorro(Animal):
    pass

rex = Cachorro("Rex")
print(rex.dormir())  # → Rex esta dormindo
`,
      },
      {
        lang: "python",
        code: `# Filha pode adicionar metodos novos
class Cachorro(Animal):
    def latir(self):
        return f"{self.nome} late: au au!"

rex = Cachorro("Rex")
print(rex.dormir())  # → Rex esta dormindo
print(rex.latir())   # → Rex late: au au!
`,
      },
      {
        lang: "python",
        code: `# Filha pode sobrescrever metodos do pai
class Animal:
    def falar(self):
        return "som generico"

class Gato(Animal):
    def falar(self):           # sobrescreve
        return "miau"

print(Animal().falar())  # → som generico
print(Gato().falar())    # → miau
`,
      },
      {
        lang: "python",
        code: `# super() chama o metodo do pai
class Animal:
    def __init__(self, nome):
        self.nome = nome

class Cachorro(Animal):
    def __init__(self, nome, raca):
        super().__init__(nome)   # reaproveita o __init__ do pai
        self.raca = raca

rex = Cachorro("Rex", "Vira-lata")
print(rex.nome, rex.raca)  # → Rex Vira-lata
`,
      },
      {
        lang: "python",
        code: `# isinstance e issubclass para checar tipos
print(isinstance(rex, Cachorro))  # → True
print(isinstance(rex, Animal))    # → True (heranca)
print(issubclass(Cachorro, Animal))  # → True
print(issubclass(Animal, Cachorro))  # → False
`,
      },
      {
        lang: "python",
        code: `# Composicao costuma ser melhor que heranca quando nao eh "eh-um"
class Motor:
    def ligar(self):
        return "vrum"

class Carro:
    def __init__(self):
        self.motor = Motor()  # carro TEM um motor (nao eh um motor)

    def dar_partida(self):
        return self.motor.ligar()

print(Carro().dar_partida())  # → vrum
`,
      },
    ],
    points: [
      "Herança permite que uma classe ganhe atributos e métodos de outra automaticamente.",
      "A sintaxe é class Filha(Pai): e tudo do pai fica disponível na filha.",
      "super() chama métodos do pai e é essencial ao redefinir __init__.",
      "Sobrescrever um método é redeclarar com o mesmo nome na filha.",
      "isinstance e issubclass respeitam a árvore de herança.",
      "Use a regra do é-um: se Filha não é-um Pai conceitualmente, prefira composição.",
      "Armadilha: esquecer super().__init__() faz a filha não ter os atributos do pai.",
      "Armadilha: hierarquias profundas (avó, mãe, filha, neta) ficam difíceis de entender.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de criar uma hierarquia de herança, pergunte se composição não resolve melhor. Composição é mais flexível em quase todos os casos.",
      },
      {
        type: "warning",
        content: "Sobrescrever um método mudando o tipo dos parâmetros costuma ser sinal de que a herança ali não faz sentido.",
      },
      {
        type: "info",
        content: "Toda classe em Python já herda implicitamente de object. Por isso até uma classe vazia tem métodos como __str__ e __repr__.",
      },
    ],
  },
  {
    slug: "heranca-multipla",
    section: "oop",
    title: "Herança múltipla e MRO",
    difficulty: "avancado",
    subtitle: "Quando uma classe herda de várias e onde Python procura.",
    intro: `Em Python uma classe pode ter mais de um pai. Você escreve class Filha(Pai1, Pai2): e pronto. Isso parece útil para combinar comportamentos, mas abre uma porta para confusão: se Pai1 e Pai2 têm um método com o mesmo nome, qual é chamado? A resposta está no MRO, ou Method Resolution Order, a ordem em que Python procura métodos pela árvore de heranças.

O MRO é calculado por um algoritmo chamado C3 linearization. Você não precisa saber os detalhes, mas precisa saber que existe e como consultar: ClasseFilha.__mro__ ou ClasseFilha.mro() mostram a lista exata de onde Python vai procurar, em ordem.

A super() respeita o MRO. Em herança simples ela chama o pai. Em herança múltipla ela chama o próximo na linearização, que pode não ser exatamente quem você imagina. Por isso o padrão mais comum é o uso de mixins: classes pequenas, focadas em um comportamento, que são combinadas a uma classe principal.

Herança múltipla é poderosa mas pede disciplina. Se virar uma sopa de classes herdando de tudo, ninguém entende mais nada. Use com parcimônia.`,
    codes: [
      {
        lang: "python",
        code: `# Heranca multipla: dois pais
class Voador:
    def mover(self):
        return "voando"

class Nadador:
    def mover(self):
        return "nadando"

class Pato(Voador, Nadador):
    pass

p = Pato()
print(p.mover())  # → voando (vence Voador, primeiro na lista)
`,
      },
      {
        lang: "python",
        code: `# Consultando o MRO
print(Pato.__mro__)
# (<class 'Pato'>, <class 'Voador'>, <class 'Nadador'>, <class 'object'>)

# Versao mais limpa
for c in Pato.mro():
    print(c.__name__)
# Pato / Voador / Nadador / object
`,
      },
      {
        lang: "python",
        code: `# Diamante: classe comum no topo
class A:
    def saudar(self):
        return "oi de A"

class B(A):
    def saudar(self):
        return "oi de B, " + super().saudar()

class C(A):
    def saudar(self):
        return "oi de C, " + super().saudar()

class D(B, C):
    pass

print(D().saudar())
# → oi de B, oi de C, oi de A
print([c.__name__ for c in D.mro()])
# → ['D', 'B', 'C', 'A', 'object']
`,
      },
      {
        lang: "python",
        code: `# Mixins: pequenas classes focadas em um comportamento
class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{type(self).__name__}] {msg}")

class Pedido(JsonMixin, LogMixin):
    def __init__(self, item, valor):
        self.item = item
        self.valor = valor

p = Pedido("Cafe", 10.0)
print(p.to_json())  # → {"item": "Cafe", "valor": 10.0}
p.log("criado")     # → [Pedido] criado
`,
      },
      {
        lang: "python",
        code: `# Heranca incompativel quebra na hora de definir a classe
class X: pass
class Y(X): pass
# class Z(X, Y): pass
# TypeError: Cannot create a consistent method resolution order (MRO)
# X precisa vir depois de Y porque Y eh subclasse
`,
      },
    ],
    points: [
      "Python permite herdar de múltiplas classes ao mesmo tempo: class Filha(P1, P2):.",
      "O MRO é a ordem em que Python busca métodos na árvore de heranças.",
      "Consulte com Classe.__mro__ ou Classe.mro() quando estiver em dúvida.",
      "super() segue o MRO, não pula direto para a classe pai mais próxima visualmente.",
      "Mixins são pequenas classes focadas usadas para compor comportamentos extras.",
      "O algoritmo C3 garante uma ordem consistente; se ele falhar, Python recusa a definição.",
      "Armadilha: herdar de classes que sobrescrevem o mesmo método sem chamar super() quebra a cadeia.",
      "Armadilha: hierarquias com herança múltipla viram pesadelo de manutenção; prefira composição quando puder.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Herança múltipla parece tentadora, mas costuma trazer mais dor do que ganho. Mixins simples e focados são o uso saudável.",
      },
      {
        type: "info",
        content: "A ordem dos pais importa: class Pato(Voador, Nadador) é diferente de class Pato(Nadador, Voador) na resolução de métodos.",
      },
      {
        type: "tip",
        content: "Sempre que herança múltipla parecer confusa, imprima Classe.mro() e leia. Em poucos segundos você vê quem chama quem.",
      },
    ],
  },
  {
    slug: "encapsulamento",
    section: "oop",
    title: "Encapsulamento e propriedades",
    difficulty: "intermediario",
    subtitle: "Controlando acesso aos dados de um objeto.",
    intro: `Encapsulamento é a ideia de proteger os dados internos de um objeto e expor só uma interface controlada. Em Java ou C# você tem private, protected, public. Python adota uma abordagem diferente: confia no programador. A convenção é usar um underline na frente do nome (_saldo) para sinalizar "isso aqui é interno, não mexa direto".

Existe também o nome com dois underlines (__saldo). Esse aciona o name mangling: Python renomeia internamente para _NomeDaClasse__saldo, dificultando acesso acidental. Não é privacidade real, é só um obstáculo extra.

A grande estrela aqui é o decorador @property. Ele permite que você defina um método que se comporta como um atributo. Quem usa a classe escreve conta.saldo, mas por trás roda um código de validação ou cálculo. Isso te dá flexibilidade: começa com atributo simples e, se um dia precisar validar, troca por propriedade sem mudar quem usa.

Você pode também definir um setter para validar atribuições, e um deleter para controlar remoções. Essa é a forma idiomática de encapsular em Python: simples por fora, controlada por dentro.`,
    codes: [
      {
        lang: "python",
        code: `# Convencao: _underline = uso interno
class Conta:
    def __init__(self, saldo):
        self._saldo = saldo  # "nao mexa direto, por favor"

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

c = Conta(100)
c.depositar(50)
print(c._saldo)  # → 150 (Python nao impede, so sinaliza)
`,
      },
      {
        lang: "python",
        code: `# Dois underlines: name mangling
class Conta:
    def __init__(self):
        self.__saldo = 100

c = Conta()
# print(c.__saldo)  # AttributeError
print(c._Conta__saldo)  # → 100  (mangled, mas acessivel)
`,
      },
      {
        lang: "python",
        code: `# @property: metodo que parece atributo
class Pessoa:
    def __init__(self, nome):
        self._nome = nome

    @property
    def nome(self):
        # roda quando alguem le pessoa.nome
        return self._nome.title()

p = Pessoa("ana paula")
print(p.nome)  # → Ana Paula
`,
      },
      {
        lang: "python",
        code: `# Setter para validar atribuicao
class Pessoa:
    def __init__(self, idade):
        self.idade = idade  # ja chama o setter abaixo

    @property
    def idade(self):
        return self._idade

    @idade.setter
    def idade(self, valor):
        if valor < 0:
            raise ValueError("Idade nao pode ser negativa")
        self._idade = valor

p = Pessoa(30)
p.idade = 31
print(p.idade)  # → 31
# p.idade = -5  # ValueError: Idade nao pode ser negativa
`,
      },
      {
        lang: "python",
        code: `# Property apenas-leitura: util para campos calculados
class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    @property
    def area(self):
        return self.largura * self.altura  # calculado na hora

r = Retangulo(3, 4)
print(r.area)  # → 12
# r.area = 50
# AttributeError: property 'area' has no setter
`,
      },
      {
        lang: "python",
        code: `# Comeca simples, vira property quando precisar — sem quebrar uso
class Produto:
    def __init__(self, preco):
        self.preco = preco  # comeca como atributo simples

# Depois evolui:
class Produto:
    def __init__(self, preco):
        self.preco = preco

    @property
    def preco(self):
        return self._preco

    @preco.setter
    def preco(self, v):
        if v < 0:
            raise ValueError("Preco invalido")
        self._preco = v
# Quem usa continua escrevendo p.preco — sem quebrar
`,
      },
    ],
    points: [
      "Python não tem private de verdade; encapsulamento é por convenção.",
      "_atributo (um underline) sinaliza uso interno, mas continua acessível.",
      "__atributo (dois underlines) sofre name mangling e fica disfarçado.",
      "@property transforma um método em algo que parece atributo na hora de ler.",
      "@nome.setter permite validar valores antes de atribuir.",
      "Properties read-only são ótimas para campos calculados como área, total ou idade.",
      "Armadilha: lembrar de atribuir ao atributo interno (_preco) dentro do setter, não a self.preco (causa recursão infinita).",
      "Armadilha: usar __nome esperando privacidade real. Não é, é só ofuscação leve.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Comece com atributo público simples. Só troque por @property quando realmente precisar validar, formatar ou calcular.",
      },
      {
        type: "danger",
        content: "Dentro do setter, escreva self._atributo = valor, nunca self.atributo = valor. O segundo chama o próprio setter e estoura RecursionError.",
      },
      {
        type: "info",
        content: "Como properties têm a mesma cara de atributos, você pode adicionar validação depois sem quebrar quem já usa a classe.",
      },
    ],
  },
  {
    slug: "dunder-methods",
    section: "oop",
    title: "Métodos especiais (dunder)",
    difficulty: "avancado",
    subtitle: "Personalizando como seus objetos se comportam.",
    intro: `Você já viu len(lista), str(numero), a + b, for x in coleção. Tudo isso é açúcar sintático para chamadas de métodos especiais, conhecidos como dunder methods (de double underline, dois underlines antes e depois do nome). Quando você escreve a + b, Python chama a.__add__(b). Quando faz len(x), Python chama x.__len__().

Implementar esses métodos faz seus objetos se integrarem ao Python como cidadãos de primeira classe. Um Vetor seu pode ser somado com +. Um Carrinho pode ser usado em len() e em for. Uma Moeda pode ser comparada com == e <.

Os mais úteis no dia a dia são __init__ (já visto), __str__ (como o objeto vira string para humano), __repr__ (como vira string para debug), __eq__ (igualdade), __lt__ (menor que), __len__, __iter__ e __getitem__.

A regra de ouro: se você não implementa, Python usa um default genérico. __str__ cai no __repr__, que cai num "objeto em endereço de memória" pouco útil. Implementar __repr__ pelo menos sempre paga o investimento na hora de debugar.`,
    codes: [
      {
        lang: "python",
        code: `# Sem dunders: representacao padrao eh feia
class Ponto:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Ponto(1, 2)
print(p)  # → <__main__.Ponto object at 0x...>
`,
      },
      {
        lang: "python",
        code: `# __repr__ para debug, __str__ para humano
class Ponto:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Ponto(x={self.x}, y={self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Ponto(1, 2)
print(p)        # usa __str__ → (1, 2)
print(repr(p))  # → Ponto(x=1, y=2)
print([p])      # listas usam __repr__ → [Ponto(x=1, y=2)]
`,
      },
      {
        lang: "python",
        code: `# Sobrecarga de operadores: + e ==
class Vetor:
    def __init__(self, x, y):
        self.x = x; self.y = y

    def __add__(self, outro):
        return Vetor(self.x + outro.x, self.y + outro.y)

    def __eq__(self, outro):
        return self.x == outro.x and self.y == outro.y

    def __repr__(self):
        return f"Vetor({self.x}, {self.y})"

print(Vetor(1, 2) + Vetor(3, 4))  # → Vetor(4, 6)
print(Vetor(1, 2) == Vetor(1, 2)) # → True
`,
      },
      {
        lang: "python",
        code: `# __len__ e __getitem__ para comportamento de colecao
class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, item):
        self.itens.append(item)

    def __len__(self):
        return len(self.itens)

    def __getitem__(self, i):
        return self.itens[i]

c = Carrinho()
c.adicionar("cafe"); c.adicionar("pao")
print(len(c))    # → 2
print(c[0])      # → cafe
for item in c:   # __getitem__ tambem habilita for
    print(item)
`,
      },
      {
        lang: "python",
        code: `# __iter__ para iteracao customizada
class Contador:
    def __init__(self, ate):
        self.ate = ate

    def __iter__(self):
        n = 1
        while n <= self.ate:
            yield n
            n += 1

for x in Contador(3):
    print(x)
# → 1 / 2 / 3
`,
      },
      {
        lang: "python",
        code: `# __call__ faz a instancia se comportar como funcao
class Multiplicador:
    def __init__(self, fator):
        self.fator = fator

    def __call__(self, valor):
        return valor * self.fator

dobrar = Multiplicador(2)
print(dobrar(10))  # → 20
print(callable(dobrar))  # → True
`,
      },
    ],
    points: [
      "Dunders permitem que seus objetos respondam a operadores e funções embutidas do Python.",
      "__repr__ deve ser inequívoca e útil para debug; __str__ é a versão amigável.",
      "__eq__ define igualdade; ao redefinir, considere também __hash__ se for usar em sets/dicts.",
      "__add__, __sub__, __mul__, etc. permitem sobrecarga de operadores.",
      "__len__, __getitem__ e __iter__ fazem sua classe se comportar como coleção.",
      "__call__ permite que instâncias sejam chamadas como funções.",
      "Armadilha: implementar __eq__ sem __hash__ deixa o objeto inutilizável em sets e como chave de dict.",
      "Armadilha: __str__ chamando print acidentalmente pode causar recursão infinita.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre implemente __repr__ nas suas classes. O custo é mínimo e o ganho na hora de debugar é enorme, especialmente em listas e exceções.",
      },
      {
        type: "warning",
        content: "Ao definir __eq__, defina também __hash__ ou Python cuidará de torná-lo None, e a classe sairá de uso em sets e chaves de dict.",
      },
      {
        type: "info",
        content: "Existem dezenas de dunders. Veja https://docs.python.org/3/reference/datamodel.html quando quiser explorar a fundo.",
      },
    ],
  },
  {
    slug: "dataclasses",
    section: "oop",
    title: "@dataclass: classes sem boilerplate",
    difficulty: "intermediario",
    subtitle: "Atalho oficial para classes que carregam dados.",
    intro: `Você vai notar que muita classe na vida real é só um saco de atributos: Pedido tem id, data, valor, cliente. Para deixar isso minimamente útil, você acaba escrevendo __init__, __repr__, __eq__... muito código repetitivo só para atributos. O módulo dataclasses, embutido no Python desde a versão 3.7, automatiza tudo isso com um único decorador.

Você decora a classe com @dataclass e declara os atributos como anotações de tipo no corpo. Pronto: o Python gera __init__, __repr__ e __eq__ por você. É menos código, menos chance de errar, mais legível.

Você ainda pode customizar tudo. field() permite definir valores padrão, fábricas para mutáveis, ou esconder campos do __repr__. order=True gera comparações <, >, etc. frozen=True deixa a instância imutável, ótimo para usar como chave de dict.

Para iniciantes, é o atalho que torna OOP em Python muito mais agradável. Sempre que sua classe é majoritariamente dados, considere @dataclass como primeira escolha.`,
    codes: [
      {
        lang: "python",
        code: `# Sem dataclass: muita repeticao
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __repr__(self):
        return f"Pessoa(nome={self.nome!r}, idade={self.idade!r})"

    def __eq__(self, other):
        return (self.nome, self.idade) == (other.nome, other.idade)
`,
      },
      {
        lang: "python",
        code: `# Com @dataclass: tudo automatico
from dataclasses import dataclass

@dataclass
class Pessoa:
    nome: str
    idade: int

p1 = Pessoa("Ana", 30)
p2 = Pessoa("Ana", 30)
print(p1)             # → Pessoa(nome='Ana', idade=30)
print(p1 == p2)       # → True
`,
      },
      {
        lang: "python",
        code: `# Valores padrao
from dataclasses import dataclass

@dataclass
class Produto:
    nome: str
    preco: float = 0.0
    em_estoque: bool = True

print(Produto("Cafe"))                  # → Produto(nome='Cafe', preco=0.0, em_estoque=True)
print(Produto("Pao", 1.5, False))       # → Produto(nome='Pao', preco=1.5, em_estoque=False)
`,
      },
      {
        lang: "python",
        code: `# ARMADILHA: lista mutavel como default direto nao eh permitida
from dataclasses import dataclass, field

# @dataclass
# class Carrinho:
#     itens: list = []   # ValueError em tempo de definicao

@dataclass
class Carrinho:
    itens: list = field(default_factory=list)  # forma correta

c1 = Carrinho()
c2 = Carrinho()
c1.itens.append("cafe")
print(c1.itens, c2.itens)  # → ['cafe'] []
`,
      },
      {
        lang: "python",
        code: `# frozen=True: instancia imutavel, hashavel
from dataclasses import dataclass

@dataclass(frozen=True)
class Coordenada:
    x: float
    y: float

c = Coordenada(1.0, 2.0)
# c.x = 5  # FrozenInstanceError
mapa = {c: "loja"}  # pode ser chave de dict
print(mapa[Coordenada(1.0, 2.0)])  # → loja
`,
      },
      {
        lang: "python",
        code: `# order=True habilita comparacoes
from dataclasses import dataclass

@dataclass(order=True)
class Pontuacao:
    valor: int
    nome: str

a = Pontuacao(10, "Ana")
b = Pontuacao(20, "Bruno")
print(a < b)  # → True (compara por ordem dos campos)
print(sorted([b, a]))  # → [Pontuacao(valor=10, ...), Pontuacao(valor=20, ...)]
`,
      },
    ],
    points: [
      "@dataclass gera __init__, __repr__ e __eq__ automaticamente.",
      "Atributos são declarados com anotações de tipo no corpo da classe.",
      "Use field(default_factory=list) para defaults mutáveis (lista, dict, set).",
      "frozen=True deixa instâncias imutáveis e habilita uso como chave de dict.",
      "order=True gera <, <=, >, >= comparando os campos na ordem em que aparecem.",
      "Você pode adicionar métodos normais junto com os campos, é classe comum.",
      "Armadilha: tentar usar lista ou dict diretamente como default explode na definição da classe.",
      "Armadilha: confundir frozen com privado. frozen impede atribuição, não leitura.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Quando sua classe é principalmente um saco de dados, comece sempre com @dataclass. Você economiza linhas e ganha __repr__ útil de graça.",
      },
      {
        type: "danger",
        content: "Nunca use lista ou dicionário como valor padrão direto em @dataclass. Use field(default_factory=list) ou você terá estado compartilhado entre instâncias.",
      },
      {
        type: "info",
        content: "Dataclasses são compatíveis com herança. Você pode ter @dataclass herdando de @dataclass, mas atenção à ordem dos campos com defaults.",
      },
    ],
  },
  {
    slug: "abstratas-protocols",
    section: "oop",
    title: "Classes abstratas e Protocols",
    difficulty: "avancado",
    subtitle: "Definindo interfaces de duas formas diferentes.",
    intro: `Às vezes você quer dizer "todo mundo que se diz Pagamento precisa ter um método processar". Existem duas formas em Python: classes abstratas (ABC) e Protocols. Cada uma tem uma filosofia diferente.

Classes abstratas, do módulo abc, definem um contrato explícito por herança. Você cria uma classe Pagamento(ABC) com método @abstractmethod processar. Quem herdar é obrigado a implementar processar, ou o Python recusa instanciar a subclasse. Funciona bem quando você quer relação clara de "é-um" e quer falhar cedo.

Protocols, do módulo typing, são uma alternativa moderna chamada duck typing estruturado. Em vez de herdar, basta o objeto ter os métodos certos. Se ele "anda como pato e fala como pato, é um pato". O Protocol existe só para o type checker (mypy, pyright, sua IDE) verificar. Em runtime, Python continua aceitando qualquer coisa com a interface certa.

Use ABC quando quiser forçar herança e checagem em runtime. Use Protocol quando quiser flexibilidade e só precisa de checagem estática. Em projetos modernos, Protocols têm ganhado preferência.`,
    codes: [
      {
        lang: "python",
        code: `# Classe abstrata: forca implementacao
from abc import ABC, abstractmethod

class Pagamento(ABC):
    @abstractmethod
    def processar(self, valor):
        ...

# Pagamento()
# TypeError: Can't instantiate abstract class Pagamento ...

class Pix(Pagamento):
    def processar(self, valor):
        return f"Pagando R$ {valor:.2f} via Pix"

print(Pix().processar(100))  # → Pagando R$ 100.00 via Pix
`,
      },
      {
        lang: "python",
        code: `# Subclasse incompleta tambem nao instancia
from abc import ABC, abstractmethod

class Pagamento(ABC):
    @abstractmethod
    def processar(self, valor): ...
    @abstractmethod
    def estornar(self, valor): ...

class Boleto(Pagamento):
    def processar(self, valor):
        return "ok"
    # esqueceu estornar

# Boleto()
# TypeError: Can't instantiate abstract class Boleto with abstract method estornar
`,
      },
      {
        lang: "python",
        code: `# ABC pode ter metodos concretos compartilhados
from abc import ABC, abstractmethod

class Pagamento(ABC):
    def __init__(self, taxa):
        self.taxa = taxa

    def total_com_taxa(self, valor):  # concreto, herdado
        return valor + self.taxa

    @abstractmethod
    def processar(self, valor): ...

class Pix(Pagamento):
    def processar(self, valor):
        return f"Cobrando {self.total_com_taxa(valor)}"

print(Pix(taxa=2).processar(100))  # → Cobrando 102
`,
      },
      {
        lang: "python",
        code: `# Protocol: duck typing estruturado
from typing import Protocol

class Pagavel(Protocol):
    def processar(self, valor: float) -> str: ...

# Nenhuma heranca explicita
class Cartao:
    def processar(self, valor: float) -> str:
        return f"Cartao: {valor}"

class Dinheiro:
    def processar(self, valor: float) -> str:
        return f"Dinheiro: {valor}"

def cobrar(meio: Pagavel, valor: float):
    print(meio.processar(valor))

cobrar(Cartao(), 50)     # → Cartao: 50
cobrar(Dinheiro(), 30)   # → Dinheiro: 30
`,
      },
      {
        lang: "python",
        code: `# Protocol em runtime com @runtime_checkable
from typing import Protocol, runtime_checkable

@runtime_checkable
class Imprimivel(Protocol):
    def imprimir(self) -> None: ...

class Relatorio:
    def imprimir(self):
        print("relatorio impresso")

class Foto:
    pass

print(isinstance(Relatorio(), Imprimivel))  # → True
print(isinstance(Foto(), Imprimivel))       # → False
`,
      },
      {
        lang: "python",
        code: `# Comparando: ABC eh contrato rigido, Protocol eh sugestao
# ABC: Quem nao herda explicitamente nao serve.
# Protocol: Qualquer um com a forma certa serve.
# Use ABC quando quiser hierarquia. Use Protocol quando so quiser tipagem.
`,
      },
    ],
    points: [
      "ABC define contratos por herança e impede instanciar classes incompletas.",
      "@abstractmethod marca métodos que subclasses são obrigadas a implementar.",
      "Classes abstratas podem ter métodos concretos compartilhados, como uma classe normal.",
      "Protocol descreve uma interface sem exigir herança; basta o objeto ter os métodos certos.",
      "Por padrão Protocols são checados só estaticamente; @runtime_checkable habilita isinstance.",
      "Use ABC quando quiser falhar cedo em runtime; Protocol quando quiser flexibilidade.",
      "Armadilha: instanciar uma ABC ou uma subclasse com método abstrato faltando dá TypeError na criação.",
      "Armadilha: esperar isinstance funcionar com Protocol comum sem o decorador @runtime_checkable.",
    ],
    alerts: [
      {
        type: "info",
        content: "Protocols são parte do typing.PEP 544 e brilham em código com mypy, pyright ou Pylance ativos. Sem type checker, o ganho é menor.",
      },
      {
        type: "tip",
        content: "Se sua interface tem comportamento padrão útil para herdar, prefira ABC. Se é só uma forma a respeitar, Protocol é mais leve.",
      },
      {
        type: "warning",
        content: "Não misture ABC e Protocol na mesma hierarquia sem necessidade. Escolha um estilo por contrato e mantenha-o consistente no módulo.",
      },
    ],
  },
];
