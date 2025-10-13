/**
 * Apps Script para salvar confirmações de presença no Google Sheets
 *
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 1. Abra a planilha: https://docs.google.com/spreadsheets/d/19O0i_OMDhuV_1U7bgGx28rMbfuffq3IdZcFjSXs7Ng0/edit
 * 2. Vá em Extensões > Apps Script
 * 3. Cole este código
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Tipo: "Aplicativo da Web"
 * 6. Execute como: "Eu (seu email)"
 * 7. Quem tem acesso: "Qualquer pessoa"
 * 8. Clique em "Implantar"
 * 9. Copie a URL do Web App gerada
 * 10. Cole essa URL no arquivo src/config/api.ts do projeto React
 */

// Nome da aba onde os dados serão salvos
const SHEET_NAME = 'Confirmados';

function doPost(e) {
  try {
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);

    // Abre a planilha ativa
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Se a aba não existe, cria com cabeçalhos
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Nome', 'Papel', 'Parentesco', 'Email', 'Telefone']);
      sheet.getRange('A1:F1').setFontWeight('bold');
    }

    // Prepara os dados
    const timestamp = new Date();
    const nome = data.nome || '';
    const papel = data.papel || '';
    const parentesco = data.parentesco || '';
    const email = data.email || '';
    const telefone = data.telefone || '';

    // Adiciona nova linha
    sheet.appendRow([timestamp, nome, papel, parentesco, email, telefone]);

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Presença confirmada com sucesso!',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro ao salvar dados: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar (execute ela para verificar se funciona)
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nome: 'Teste da Silva',
        papel: 'familia-noivo',
        parentesco: 'primo',
        email: 'teste@email.com',
        telefone: '(11) 99999-9999'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
