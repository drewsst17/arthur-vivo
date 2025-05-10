fetch('/api/mensagens')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#tabela tbody');
    data.forEach(msg => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${msg.id}</td><td>${msg.conteudo}</td>`;
      tbody.appendChild(tr);
    });
  });
