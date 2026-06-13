import { HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

const ABBREVIATIONS: { code: string; label: string; full: string }[] = [
  { code: "RSM", label: "Risques Sociologiques", full: "Risques Sociologiques (bousculades, mouvements de foule, émeutes...)" },
  { code: "RMT", label: "Menace Terroriste", full: "Risques Liés à la Menace Terroriste (alerte à la bombe, explosion, attaques...)" },
  { code: "BASO", label: "Assistance & Soutien", full: "Missions d'Assistance et de Soutien (renfort, ravitaillement, dispositifs...)" },
  { code: "ARC", label: "Accidents & Risques Courants", full: "Accidents et Risques Courants (chutes, intoxications, sauvetages...)" },
  { code: "RS", label: "Risques Spécifiques", full: "Risques Spécifiques (industriels, technologiques, chimiques...)" },
  { code: "RNM", label: "Risques Naturels", full: "Risques Naturels et Majeurs (inondations, séismes, feux de forêt...)" },
  { code: "PRV", label: "Prévention", full: "Mission de Prévention (visites, commissions, mises en sécurité...)" },
  { code: "PRO", label: "Prévision", full: "Mission de Prévision (vérifications, plans de secours, cartographie...)" },
];

export function AbbreviationsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="size-9 grid place-items-center rounded-lg border border-border/60 bg-card hover:bg-muted transition"
          aria-label="Signification des abréviations"
          title="Abréviations"
        >
          <HelpCircle className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Signification des abréviations</DialogTitle>
          <DialogDescription>
            Liste des codes utilisés et leur signification.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {ABBREVIATIONS.map((a) => (
            <li
              key={a.code}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3"
            >
              <span className="shrink-0 px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-xs font-bold tracking-wide">
                {a.code}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{a.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.full}</p>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
