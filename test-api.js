const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/vgames';
const USER_ID = '123';
const GAME_CODE = 'fortunetiger';

async function runTest() {
  try {
    // 1. Gerar Token
    console.log('1. Gerando Token...');
    const tokenRes = await axios.get(`http://localhost:3001/api/vgames/test/generate-token/${USER_ID}/${GAME_CODE}`);
    const token = tokenRes.data.token;
    console.log('Token:', token);

    // 2. Testar /session
    console.log('\n2. Testando /session...');
    const sessionRes = await axios.get(`${BASE_URL}/${token}/session`);
    console.log('Status:', sessionRes.status);
    if (Array.isArray(sessionRes.data.data.icon_data) && Array.isArray(sessionRes.data.data.icon_data[0])) {
      console.log('✅ icon_data é uma matriz');
    } else {
      console.error('❌ icon_data NÃO é uma matriz:', sessionRes.data.data.icon_data);
    }

    // 3. Testar /icons
    console.log('\n3. Testando /icons...');
    const iconsRes = await axios.get(`${BASE_URL}/${token}/icons`);
    console.log('Status:', iconsRes.status);
    if (Array.isArray(iconsRes.data) && iconsRes.data[0].id !== undefined) {
      console.log('✅ icons retorna array com id');
    } else {
      console.error('❌ icons formato inválido:', iconsRes.data[0]);
    }

    // 4. Testar /spin
    console.log('\n4. Testando /spin...');
    const spinRes = await axios.post(`${BASE_URL}/${token}/spin`, {
      betamount: '0.5',
      numline: '5',
      cpl: '1'
    });
    console.log('Status:', spinRes.status);
    if (spinRes.data.data.payline_data && Array.isArray(spinRes.data.data.payline_data)) {
      console.log('✅ payline_data existe');
    } else {
      console.error('❌ payline_data faltando');
    }
    if (spinRes.data.data.icon_data && Array.isArray(spinRes.data.data.icon_data[0])) {
      console.log('✅ spin icon_data é matriz');
    } else {
      console.error('❌ spin icon_data inválido');
    }

    console.log('\n✅ Testes concluídos!');

  } catch (error) {
    console.error('Erro no teste:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

runTest();
