import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Shield, Trash2, X, Siren } from "lucide-react";
import { SEED_CODES, CATEGORY_META, type OperationCode } from "@/data/codes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Codes Protection Civile — Recherche d'interventions" },
      { name: "description", content: "Application mobile pour rechercher et gérer les codes d'intervention de la Protection Civile." },
      { property: "og:title", content: "Codes Protection Civile" },
      { property: "og:description", content: "Recherche rapide des codes d'intervention sur le terrain." },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "pc_custom_codes_v1";

function Index() {
  const [query, setQuery] = useState("");
  const [custom, setCustom] = useState<OperationCode[]>([]);
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string>("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCustom(JSON.parse(raw));
    } catch {}
  }, []);

  const all = useMemo(() => [...SEED_CODES, ...custom], [custom]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((c) => {
      if (activeCat !== "all" && c.category !== activeCat) return false;
      if (!q) return true;
      return (
        c.description.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        c.subcategoryName.toLowerCase().includes(q)
      );
    });
  }, [all, query, activeCat]);

  const categories = useMemo(() => {
    const keys = Array.from(new Set(all.map((c) => c.category)));
    return keys;
  }, [all]);

  const persist = (next: OperationCode[]) => {
    setCustom(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleAdd = (data: { code: string; description: string; category: string }) => {
    const newItem: OperationCode = {
      id: `CUSTOM-${Date.now()}`,
      category: data.category || "CUSTOM",
      categoryName: CATEGORY_META[data.category]?.label.toUpperCase() ?? "PERSONNALISÉ",
      subcategory: null,
      subcategoryName: "",
      action: "",
      code: data.code,
      description: data.description,
      custom: true,
    };
    persist([newItem, ...custom]);
    toast.success("Code ajouté", { description: data.code });
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    persist(custom.filter((c) => c.id !== id));
    toast("Code supprimé");
  };

  return (
    <div className="min-h-screen pb-32">
      <Toaster theme="dark" position="top-center" />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-2xl px-4 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-11 rounded-2xl bg-primary/15 grid place-items-center glow-primary">
              <Shield className="size-6 text-primary" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Protection Civile</h1>
              <p className="text-xs text-muted-foreground">Codes d'intervention</p>
            </div>
            <Badge variant="outline" className="ml-auto gap-1 border-primary/40 text-primary">
              <Siren className="size-3" />
              {all.length}
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              autoFocus
              inputMode="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher: feu de forêt, accident, bombe..."
              className="h-14 pl-12 pr-12 text-base rounded-2xl bg-card border-border/60 focus-visible:ring-primary focus-visible:ring-2"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full hover:bg-muted"
                aria-label="Effacer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            <Pill active={activeCat === "all"} onClick={() => setActiveCat("all")}>
              Tous
            </Pill>
            {categories.map((cat) => (
              <Pill key={cat} active={activeCat === cat} onClick={() => setActiveCat(cat)}>
                {cat}
              </Pill>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="mx-auto max-w-2xl px-4 mt-5">
        {filtered.length === 0 ? (
          <EmptyState query={query} onAdd={() => setOpen(true)} />
        ) : (
          <ul className="space-y-3">
            {filtered.map((c) => (
              <CodeCard key={c.id} item={c} onDelete={c.custom ? () => handleDelete(c.id) : undefined} />
            ))}
          </ul>
        )}
      </main>

      {/* FAB */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-6 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-8 z-30 h-16 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-2xl glow-primary flex items-center gap-2 active:scale-95 transition"
            aria-label="Ajouter un code"
          >
            <Plus className="size-5" strokeWidth={2.75} />
            Ajouter un code
          </button>
        </DialogTrigger>
        <AddCodeDialog categories={categories} onSubmit={handleAdd} />
      </Dialog>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 h-9 rounded-full text-sm font-medium transition border ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border/60 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function CodeCard({ item, onDelete }: { item: OperationCode; onDelete?: () => void }) {
  const meta = CATEGORY_META[item.category] ?? CATEGORY_META.CUSTOM;
  return (
    <li className="group rounded-2xl bg-card border border-border/60 p-4 hover:border-primary/40 transition">
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 px-3 py-2 rounded-xl text-sm code-chip"
          style={{ background: `color-mix(in oklab, var(--color-${meta.color}) 18%, transparent)`, color: `var(--color-${meta.color})` }}
        >
          {item.code}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] leading-snug font-medium">{item.description}</p>
          <p className="mt-1 text-xs text-muted-foreground truncate">
            {item.subcategoryName || item.categoryName}
          </p>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="size-9 grid place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
            aria-label="Supprimer"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
    </li>
  );
}

function EmptyState({ query, onAdd }: { query: string; onAdd: () => void }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="size-16 mx-auto rounded-2xl bg-muted grid place-items-center mb-4">
        <Search className="size-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg">Aucun résultat</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {query ? `Rien ne correspond à « ${query} »` : "Aucun code disponible"}
      </p>
      <Button onClick={onAdd} variant="outline" className="mt-5 rounded-xl">
        <Plus className="size-4 mr-1" /> Créer ce code
      </Button>
    </div>
  );
}

function AddCodeDialog({
  categories,
  onSubmit,
}: {
  categories: string[];
  onSubmit: (data: { code: string; description: string; category: string }) => void;
}) {
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("CUSTOM");

  return (
    <DialogContent className="sm:max-w-md rounded-2xl">
      <DialogHeader>
        <DialogTitle>Nouveau code d'intervention</DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!code.trim() || !desc.trim()) return;
          onSubmit({ code: code.trim().toUpperCase(), description: desc.trim(), category: cat });
          setCode(""); setDesc("");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ex: RIF 02 1"
            className="h-12 code-chip uppercase"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description de l'intervention..."
            rows={3}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Catégorie</Label>
          <div className="flex flex-wrap gap-2">
            {[...new Set([...categories, "CUSTOM"])].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-3 h-9 rounded-lg text-sm border transition ${
                  cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
          Enregistrer le code
        </Button>
      </form>
    </DialogContent>
  );
}
