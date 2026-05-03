import { Link } from "wouter";
import { sections, chapters, chapterMap } from "@/data/chapters";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-block text-6xl mb-4">🐍</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-py-blue dark:text-py-yellow mb-4">
          Python: Do Zero ao Avançado
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Um livro completo em português com <strong>{chapters.length} capítulos</strong> práticos —
          do primeiro <code className="text-py-blue dark:text-py-yellow">print('olá')</code> até concorrência,
          web, dados e machine learning.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/c/bem-vindo" className="inline-flex items-center gap-2 bg-py-blue hover:bg-py-blue-dark text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors">
            <BookOpen size={18} /> Começar do início
          </Link>
          <Link href="/c/instalacao" className="inline-flex items-center gap-2 bg-py-yellow hover:bg-py-yellow-dark text-py-blue-dark px-6 py-3 rounded-lg font-semibold shadow transition-colors">
            Instalar Python <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>

      <section className="mb-14 bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-py-yellow">main.py</span>
          <span className="text-xs text-slate-400">FastAPI · Python 3.12</span>
        </div>
        <pre className="text-sm leading-relaxed font-mono overflow-x-auto"><code>{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Minha primeira API")

class Item(BaseModel):
    nome: str
    preco: float

@app.get("/")
def saudacao():
    return {"mensagem": "Olá, Python!"}

@app.post("/itens")
def criar(item: Item):
    return {"recebido": item}

# uvicorn main:app --reload`}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {sections.length} trilhas, {chapters.length} capítulos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.BookOpen;
            const first = s.chapterSlugs[0];
            const firstCh = first ? chapterMap[first] : null;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link href={firstCh ? `/c/${first}` : "/"} className="block h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-py-blue hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-py-blue/10 text-py-blue dark:text-py-yellow rounded-lg">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {s.chapterSlugs.length} capítulos
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-py-blue dark:group-hover:text-py-yellow mb-1">
                    {s.label}
                  </h3>
                  {firstCh && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Começa com: <span className="text-slate-700 dark:text-slate-200">{firstCh.title}</span>
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400 pb-8">
        <p>
          Feito com 💛 por <a className="text-py-blue dark:text-py-yellow font-semibold" href="https://github.com/Wallysondevs" target="_blank" rel="noreferrer">@Wallysondevs</a>
          {" · "}Código aberto no <a className="text-py-blue dark:text-py-yellow font-semibold" href="https://github.com/Wallysondevs/python-book" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </section>
    </div>
  );
}
