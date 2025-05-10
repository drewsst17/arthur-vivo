function enviarMensagem() {
  fetch('/api/mensagem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg: 'Arthur está vivo!' }),
  })
  .then(res => res.json())
  .then(data => alert(data.resposta))
  .catch(err => alert('Erro ao enviar mensagem'));
}