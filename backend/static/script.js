async function enviarMensagem() {
  const input = document.getElementById('mensagem');
  const texto = input.value.trim();
  const chat = document.getElementById('chat');

  if (!texto) return;

  // 🧑‍💬 Exibe a mensagem do usuário
  const msgUser = document.createElement('div');
  msgUser.className = 'msg user';
  msgUser.textContent = texto;
  chat.appendChild(msgUser);

  if (data.resposta) {
  msgArthur.textContent = data.resposta;

  // 🔊 TTS no navegador
  const fala = new SpeechSynthesisUtterance(data.resposta);
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1.1;
  window.speechSynthesis.speak(fala);
}

  // Limpa o input
  input.value = '';

  try {
    const resposta = await fetch('/api/mensagem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: texto })
    });

    const data = await resposta.json();

    const msgArthur = document.createElement('div');
    msgArthur.className = 'msg arthur';

    if (data.resposta) {
      msgArthur.textContent = data.resposta;
    } else {
      msgArthur.textContent = "Erro: " + (data.erro || "Resposta inesperada");
    }

    chat.appendChild(msgArthur);
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    const erro = document.createElement('div');
    erro.className = 'msg arthur';
    erro.textContent = "Arthur está offline... tente mais tarde 🛠️";
    chat.appendChild(erro);
    console.error(err);
  }
}
