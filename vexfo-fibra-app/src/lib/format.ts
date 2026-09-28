/** Máscara visual de CPF: 000.000.000-00 */
export const formatCpf = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
};

/** Exibe apenas o final do CPF: ***.***.***-00 */
export const maskCpf = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return value;
  return `***.***.***-${digits.slice(-2)}`;
};

export const onlyDigits = (value: string): string => value.replace(/\D/g, "");

export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatNumber = (value: number): string =>
  Math.round(value).toLocaleString("pt-BR");

/** Copia texto para a área de transferência com fallback para navegadores antigos. */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // segue para o fallback abaixo
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
};

/** Iniciais para o avatar: "João da Silva" -> "JS" */
export const initialsFromName = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
