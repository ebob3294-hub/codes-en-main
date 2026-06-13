import { useEffect, useState } from "react";
import { Phone, Plus, Trash2, PhoneCall } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const STORAGE_KEY = "pc_phone_contacts_v1";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export function PhoneContactsDialog() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContacts(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Contact[]) => {
    setContacts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 50);
    const p = phone.trim().replace(/\s+/g, "").slice(0, 20);
    if (!n || !p) return;
    if (!/^[+0-9()\-]{3,20}$/.test(p)) {
      toast.error("Numéro invalide");
      return;
    }
    persist([{ id: `C-${Date.now()}`, name: n, phone: p }, ...contacts]);
    setName("");
    setPhone("");
    toast.success("Contact ajouté");
  };

  const handleDelete = (id: string) => {
    persist(contacts.filter((c) => c.id !== id));
    toast("Contact supprimé");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Numéros enregistrés"
          title="Numéros utiles"
          className="size-9 rounded-lg border border-border bg-card grid place-items-center hover:bg-accent transition relative"
        >
          <Phone className="size-4" />
          {contacts.length > 0 && (
            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
              {contacts.length}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Numéros utiles</DialogTitle>
          <DialogDescription>
            Enregistrez vos numéros pour les appeler en un clic.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="contact-name" className="text-xs">Nom</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Caserne, Chef..."
                maxLength={50}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="contact-phone" className="text-xs">Numéro</Label>
              <Input
                id="contact-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+212 6 00 00 00 00"
                type="tel"
                inputMode="tel"
                maxLength={20}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-10 rounded-xl">
            <Plus className="size-4 mr-1" /> Ajouter le numéro
          </Button>
        </form>

        <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {contacts.length === 0 ? (
            <li className="text-sm text-center text-muted-foreground py-6">
              Aucun numéro enregistré.
            </li>
          ) : (
            contacts.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-2"
              >
                <a
                  href={`tel:${c.phone}`}
                  className="flex-1 flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-accent transition min-w-0"
                >
                  <span className="size-9 rounded-full bg-primary/15 text-primary grid place-items-center shrink-0">
                    <PhoneCall className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold truncate">{c.name}</span>
                    <span className="block text-xs text-muted-foreground truncate">{c.phone}</span>
                  </span>
                </a>
                <button
                  onClick={() => handleDelete(c.id)}
                  aria-label="Supprimer"
                  className="size-9 grid place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
