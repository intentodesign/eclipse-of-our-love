/**
 * URL do Google Apps Script Web App
 *
 * INSTRUÇÕES:
 * 1. Siga as instruções no arquivo apps-script-sheets.js
 * 2. Após implantar o Apps Script, cole a URL aqui
 * 3. A URL deve ter este formato:
 *    https://script.google.com/macros/s/SEU_SCRIPT_ID/exec
 */

export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_SCRIPT_ID_AQUI/exec';

// Se você ainda não implantou, use este valor temporário
// O formulário vai funcionar mas mostrará um aviso
export const IS_APPS_SCRIPT_CONFIGURED = APPS_SCRIPT_URL.includes('SEU_SCRIPT_ID') === false;
