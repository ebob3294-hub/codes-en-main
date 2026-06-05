import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Info, Mail, Shield, Search, Plus, Code2 } from "lucide-react";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="À propos"
          className="size-10 rounded-xl border border-border bg-card grid place-items-center hover:bg-accent transition"
        >
          <Info className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="size-12 rounded-2xl bg-primary/15 grid place-items-center mb-2">
            <Shield className="size-6 text-primary" strokeWidth={2.5} />
          </div>
          <DialogTitle>À propos de l'application</DialogTitle>
          <p className="text-base font-semibold text-primary">Rescue Guide Pro</p>
          <DialogDescription>
            Outil de terrain pour les agents de la Protection Civile : retrouver instantanément
            les codes d'intervention liés à chaque type de mission.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3 mt-2">
          <li className="flex gap-3">
            <Search className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Recherche instantanée</p>
              <p className="text-xs text-muted-foreground">Tapez un type d'intervention pour obtenir le code correspondant.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <Plus className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Ajout de codes personnalisés</p>
              <p className="text-xs text-muted-foreground">Enrichissez la base avec vos propres codes, sauvegardés localement.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <Code2 className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Base officielle intégrée</p>
              <p className="text-xs text-muted-foreground">Grille des risques et missions de la Protection Civile.</p>
            </div>
          </li>
        </ul>

        <div className="mt-4 p-4 rounded-xl bg-muted/60 border border-border">
          <p className="text-xs text-muted-foreground">Créé par le développeur</p>
          <p className="text-base font-semibold">Ayoub Sadkouni</p>
          <a
            href="mailto:sadkouni1@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="size-4" />
            sadkouni1@gmail.com
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
