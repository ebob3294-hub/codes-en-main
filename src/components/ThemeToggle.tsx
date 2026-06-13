import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Palette, Image as ImageIcon, Trash2, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

const MODE_KEY = "pc_theme";
const COLOR_KEY = "pc_theme_color";
const BG_KEY = "pc_bg_image";

const COLORS: { id: string; name: string; swatch: string }[] = [
  { id: "red", name: "Rouge", swatch: "oklch(0.62 0.22 25)" },
  { id: "blue", name: "Bleu", swatch: "oklch(0.62 0.20 240)" },
  { id: "green", name: "Vert", swatch: "oklch(0.62 0.18 150)" },
  { id: "purple", name: "Violet", swatch: "oklch(0.62 0.22 300)" },
  { id: "orange", name: "Orange", swatch: "oklch(0.68 0.20 55)" },
];

function applyMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}
function applyColor(id: string) {
  document.documentElement.setAttribute("data-theme", id);
}
function applyBg(dataUrl: string | null) {
  if (dataUrl) {
    document.body.style.setProperty("--bg-image", `url("${dataUrl}")`);
    document.body.classList.add("has-bg-image");
  } else {
    document.body.style.removeProperty("--bg-image");
    document.body.classList.remove("has-bg-image");
  }
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [color, setColor] = useState("red");
  const [hasBg, setHasBg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem(MODE_KEY);
    const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = savedMode ? savedMode === "dark" : !!prefers;
    const savedColor = localStorage.getItem(COLOR_KEY) || "red";
    const savedBg = localStorage.getItem(BG_KEY);
    setDark(isDark);
    setColor(savedColor);
    setHasBg(!!savedBg);
    applyMode(isDark);
    applyColor(savedColor);
    applyBg(savedBg);
  }, []);

  const toggleMode = () => {
    const next = !dark;
    setDark(next);
    applyMode(next);
    localStorage.setItem(MODE_KEY, next ? "dark" : "light");
  };

  const pickColor = (id: string) => {
    setColor(id);
    applyColor(id);
    localStorage.setItem(COLOR_KEY, id);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez choisir une image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop lourde (max 5 Mo)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      try {
        localStorage.setItem(BG_KEY, url);
        applyBg(url);
        setHasBg(true);
        toast.success("Arrière-plan mis à jour");
      } catch {
        toast.error("Image trop lourde pour être sauvegardée");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeBg = () => {
    localStorage.removeItem(BG_KEY);
    applyBg(null);
    setHasBg(false);
    toast("Arrière-plan supprimé");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Personnaliser le thème"
          className="size-9 rounded-lg border border-border bg-card grid place-items-center hover:bg-accent transition"
        >
          <Palette className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 rounded-2xl p-4 space-y-4">
        {/* Mode */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Mode</span>
          <button
            onClick={toggleMode}
            className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-accent transition text-sm"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {dark ? "Clair" : "Sombre"}
          </button>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Couleur</span>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => pickColor(c.id)}
                title={c.name}
                aria-label={c.name}
                className={`size-9 rounded-full grid place-items-center border-2 transition ${
                  color === c.id ? "border-foreground scale-110" : "border-border/60"
                }`}
                style={{ background: c.swatch }}
              >
                {color === c.id && <Check className="size-4 text-white drop-shadow" />}
              </button>
            ))}
          </div>
        </div>

        {/* Background image */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Arrière-plan</span>
          <div className="flex gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex-1 h-10 rounded-lg border border-border bg-card hover:bg-accent transition text-sm flex items-center justify-center gap-2"
            >
              <ImageIcon className="size-4" />
              Choisir une image
            </button>
            {hasBg && (
              <button
                onClick={removeBg}
                aria-label="Supprimer l'arrière-plan"
                className="size-10 grid place-items-center rounded-lg border border-border bg-card hover:bg-destructive/10 hover:text-destructive transition"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
          <p className="text-[11px] text-muted-foreground">
            L'image est stockée localement sur votre appareil.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
