async function enviarMensagem() {
  const mensagem = prompt("Digite sua mensagem para Arthur:");
  if (!mensagem) return;

  try {
    const resposta = await fetch('/api/mensagem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: mensagem })
    });

    const data = await resposta.json();

    // ✅ Aqui mostra a resposta de Arthur
    if (data.resposta) {
      alert("Arthur respondeu: " + data.resposta);
    } else {
      alert("Erro: " + (data.erro || "Resposta inesperada"));
    }

  } catch (error) {
    alert("Falha ao enviar mensagem para Arthur 🛠️");
    console.error(error);
  }
}