import { useEffect, useState, type ReactNode } from "react";
import { Shield, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pc_app_unlocked_v1";
const PASSWORD = "protection-civile";
const LOCK_EVENT = "pc:lock";

export function lockApp() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  window.dispatchEvent(new Event(LOCK_EVENT));
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
    setReady(true);
    const onLock = () => { setUnlocked(false); setValue(""); setError(false); };
    window.addEventListener(LOCK_EVENT, onLock);
    return () => window.removeEventListener(LOCK_EVENT, onLock);
  }, []);

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="size-16 mx-auto rounded-2xl bg-primary/15 grid place-items-center glow-primary">
            <Shield className="size-8 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold">Protection Civile</h1>
          <p className="text-sm text-muted-foreground">Veuillez saisir le mot de passe pour accéder à l'application</p>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            className="h-12 pl-11 rounded-xl"
          />
        </div>
        {error && <p className="text-sm text-destructive text-center">Mot de passe incorrect</p>}
        <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
          Déverrouiller
        </Button>
      </form>
    </div>
  );
}
