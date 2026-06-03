export interface OperationCode {
  id: string;
  category: string;
  categoryName: string;
  subcategory: string | null;
  subcategoryName: string;
  action: string;
  code: string;
  description: string;
  custom?: boolean;
}

export const SEED_CODES: OperationCode[] = [
  { id: "RSM-1-0", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "0", code: "RSM10", description: "Intervention suite bousculade" },
  { id: "RSM-1-1", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "1", code: "RSM11", description: "Intervention suite mouvement de foule" },
  { id: "RSM-1-2", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "2", code: "RSM12", description: "Intervention pour personnes asphyxiées par bousculade ou mouvement de foule" },
  { id: "RSM-1-3", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "3", code: "RSM13", description: "Intervention pour personnes blessées suite crise sociale (émeutes, mouvements...)" },
  { id: "RSM-1-4", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "4", code: "RSM14", description: "Intervention suite grève de la faim" },
  { id: "RSM-1-5", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "5", code: "RSM15", description: "Intervention suite désordre civil" },
  { id: "RSM-1-6", category: "RSM", categoryName: "RISQUES SOCIOLOGIQUES", subcategory: "1", subcategoryName: "RISQUES SOCIOLOGIQUES", action: "6", code: "RSM16", description: "Autres interventions" },
  { id: "RMT-01-0", category: "RMT", categoryName: "RISQUES LIES A LA MENACE TERRORISTE", subcategory: "01", subcategoryName: "MENACE TERRORISTE", action: "0", code: "RMT010", description: "Intervention pour alerte à la bombe" },
  { id: "RMT-01-1", category: "RMT", categoryName: "RISQUES LIES A LA MENACE TERRORISTE", subcategory: "01", subcategoryName: "MENACE TERRORISTE", action: "1", code: "RMT011", description: "Intervention pour explosion de bombe" },
  { id: "RMT-01-2", category: "RMT", categoryName: "RISQUES LIES A LA MENACE TERRORISTE", subcategory: "01", subcategoryName: "MENACE TERRORISTE", action: "2", code: "RMT012", description: "Personnes victimes d'événements ou actes terroristes (armes blanches, armes à feu...)" },
  { id: "RMT-01-3", category: "RMT", categoryName: "RISQUES LIES A LA MENACE TERRORISTE", subcategory: "01", subcategoryName: "MENACE TERRORISTE", action: "3", code: "RMT013", description: "Autres menaces terroristes" },
  { id: "BASO-01-0", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "01", subcategoryName: "ASSISTANCE AUX UNITES DE LA PROTECTION CIVILE", action: "0", code: "BASO010", description: "Renfort aux unités de la protection civile" },
  { id: "BASO-01-1", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "01", subcategoryName: "ASSISTANCE AUX UNITES DE LA PROTECTION CIVILE", action: "1", code: "BASO011", description: "Autre" },
  { id: "BASO-02-0", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "0", code: "BASO020", description: "Ouverture de porte sans intervention" },
  { id: "BASO-02-1", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "1", code: "BASO021", description: "Dispositif de sécurité" },
  { id: "BASO-02-2", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "2", code: "BASO022", description: "Ravitaillement en eau" },
  { id: "BASO-02-3", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "3", code: "BASO023", description: "Distribution de vivres" },
  { id: "BASO-02-4", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "4", code: "BASO024", description: "Distribution de médicaments" },
  { id: "BASO-02-5", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "5", code: "BASO025", description: "Distribution de matériel de campement et de couchage" },
  { id: "BASO-02-6", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "6", code: "BASO026", description: "Mise en sécurité en présence d'objet menaçant de chuter" },
  { id: "BASO-02-7", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "7", code: "BASO027", description: "Épuisement d'eau" },
  { id: "BASO-02-8", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "02", subcategoryName: "ASSISTANCE AUX POPULATIONS", action: "8", code: "BASO028", description: "Autre" },
  { id: "BASO-03-0", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "0", code: "BASO030", description: "Libération des voiries" },
  { id: "BASO-03-1", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "1", code: "BASO031", description: "Lavage de chaussée" },
  { id: "BASO-03-2", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "2", code: "BASO032", description: "Assistance lors des visites « V.I.P »" },
  { id: "BASO-03-3", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "3", code: "BASO033", description: "Montage de village de toile (bivouac)" },
  { id: "BASO-03-4", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "4", code: "BASO034", description: "Mise à disposition de moyens d'éclairage" },
  { id: "BASO-03-5", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "5", code: "BASO035", description: "Mise à disposition de moyens sanitaires et de couverture médicale" },
  { id: "BASO-03-6", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "6", code: "BASO036", description: "Mise à disposition de moyens de lutte contre l'incendie" },
  { id: "BASO-03-7", category: "BASO", categoryName: "MISSIONS D'ASSISTANCE ET DE SOUTIEN", subcategory: "03", subcategoryName: "ASSISTANCE ET SOUTIEN TECHNIQUE AUX AUTORITES ET FORCES PUBLIQUES", action: "7", code: "BASO037", description: "Autre" },
];

export const CATEGORY_META: Record<string, { label: string; color: string }> = {
  RSM: { label: "Risques Sociologiques", color: "code-orange" },
  RMT: { label: "Menace Terroriste", color: "code-red" },
  BASO: { label: "Assistance & Soutien", color: "code-blue" },
  CUSTOM: { label: "Personnalisé", color: "code-green" },
};
