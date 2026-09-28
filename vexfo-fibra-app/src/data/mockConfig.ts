/**
 * Chaves de demonstração da Fase 1 (somente front-end).
 * Alterne os valores para visualizar os diferentes estados visuais das telas
 * sem precisar mexer em nenhum componente.
 */
export const MOCK_CONFIG = {
  /** Quando `false`, o card de fatura em aberto dá lugar ao Empty State. */
  showPendingInvoice: true,
  /** Tempo simulado de carregamento inicial (ms) para exibir os Skeletons. */
  initialLoadingMs: 700,
  /** Duração total da animação do teste de velocidade (ms). */
  speedTestDurationMs: 6400,
} as const;
