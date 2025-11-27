const BASE_URL = 'http://localhost:3006/api/vgames';
const USER_ID = '123';
const GAME_CODE = 'fortunetiger';

async function runTest() {
  try {
    // 1. Gerar Token
    console.log('1. Gerando Token...');
    const tokenRes = await fetch(`http://localhost:3006/api/vgames/test/generate-token/${USER_ID}/${GAME_CODE}`);
    const tokenData = await tokenRes.json();
    const token = tokenData.token;
    console.log('Token:', token);

    // 2. Testar /session
    console.log('\n2. Testando /session...');
    const sessionRes = await fetch(`${BASE_URL}/${token}/session`);
    const sessionData = await sessionRes.json();
    console.log('Status:', sessionRes.status);
    
    if (sessionData.data && Array.isArray(sessionData.data.icon_data) && Array.isArray(sessionData.data.icon_data[0])) {
      console.log('✅ icon_data é uma matriz');
    } else {
      console.error('❌ icon_data NÃO é uma matriz:', sessionData.data?.icon_data);
    }

    // 3. Testar /icons
    console.log('\n3. Testando /icons...');
    const iconsRes = await fetch(`${BASE_URL}/${token}/icons`);
    const iconsData = await iconsRes.json();
    console.log('Status:', iconsRes.status);
    if (Array.isArray(iconsData) && iconsData[0].id !== undefined) {
      console.log('✅ icons retorna array com id');
    } else {
      console.error('❌ icons formato inválido:', iconsData[0]);
    }

    // 4. Testar /spin
    console.log('\n4. Testando /spin...');
    const spinRes = await fetch(`${BASE_URL}/${token}/spin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        betamount: '0.5',
        numline: '5',
        cpl: '1'
      })
    });
    const spinData = await spinRes.json();
    console.log('Status:', spinRes.status);
    
    if (spinData.data && spinData.data.payline_data && Array.isArray(spinData.data.payline_data)) {
      console.log('✅ payline_data existe');
    } else {
      console.error('❌ payline_data faltando');
    }
    if (spinData.data && spinData.data.icon_data && Array.isArray(spinData.data.icon_data[0])) {
      console.log('✅ spin icon_data é matriz');
    } else {
      console.error('❌ spin icon_data inválido');
    }

    // 5. Testar /info
    console.log('\n5. Testando /info...');
    const infoRes = await fetch(`${BASE_URL}/${token}/info`);
    const infoData = await infoRes.json();
    console.log('Status:', infoRes.status);
    if (infoData.success && infoData.data && infoData.data.game_name) {
      console.log('✅ info retorna dados corretos');
    } else {
      console.error('❌ info formato inválido:', infoData);
    }

    // 6. Testar /logs (Opcional, mas bom verificar)
    console.log('\n6. Testando /logs...');
    const logsRes = await fetch(`${BASE_URL}/${token}/logs`);
    console.log('Status:', logsRes.status);
    if (logsRes.status === 200) {
        const logsData = await logsRes.json();
        if (logsData.success && Array.isArray(logsData.data?.logs)) {
            console.log('✅ logs retorna lista');
        } else {
            console.log('⚠️ logs status 200 mas formato inesperado:', logsData);
        }
    } else {
        console.log('⚠️ logs endpoint não implementado ou erro (esperado se não foi feito)');
    }

    console.log('\n✅ Testes concluídos!');

  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

runTest();
