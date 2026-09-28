/**
 * Paleta oficial da Vexfo Fibra.
 * Fonte única de verdade para: variáveis CSS (src/index.css), gradientes,
 * gráficos SVG e estados de status.
 *
 * Os valores em `brandHsl` estão no mesmo formato usado pelo Tailwind
 * (`H S% L%`, sem a função hsl()) para que possam ser injetados em variáveis CSS.
 */
export const brand = {
  navy: "#11105F",
  blue: "#2563EB",
  cyan: "#19C5E8",
  green: "#7ED957",
  white: "#FFFFFF",
  surface: "#F5F7FA",
  textMuted: "#64748B",
} as const;

export const brandHsl = {
  navy: "240.8 71.2% 21.8%",
  blue: "221.2 83.2% 53.3%",
  cyan: "190.1 81.8% 50.4%",
  green: "102 63.1% 59.6%",
  white: "0 0% 100%",
  surface: "216 33.3% 97.1%",
  textMuted: "215.4 16.3% 46.9%",
} as const;

/** Cores auxiliares de estado (não fazem parte da paleta de marca, apenas sinalizam). */
export const statusPalette = {
  online: brand.green,
  warning: "#F59E0B",
  danger: "#EF4444",
  neutral: brand.textMuted,
} as const;

/** Caminhos dos ativos de marca (recortados do arquivo original enviado). */
export const brandAssets = {
  symbol: "/brand/vexfo-symbol.png",
  lockup: "/brand/vexfo-lockup.png",
  original: "/brand/vexfo-logo.png",
} as const;
