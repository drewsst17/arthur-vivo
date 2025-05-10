from flask import Blueprint, request, jsonify
from models.mensagem import Mensagem
from database import db

mensagem_bp = Blueprint('mensagem_bp', __name__, url_prefix='/api')

@mensagem_bp.route('/mensagem', methods=['POST'])
def receber_mensagem():
    data = request.get_json()
    msg = data.get('msg', '')
    if not msg:
        return jsonify({'erro': 'Mensagem vazia'}), 400

    nova = Mensagem(conteudo=msg)
    db.session.add(nova)
    db.session.commit()
    return jsonify({'resposta': 'Mensagem registrada com sucesso 🧠'})

@mensagem_bp.route('/mensagens', methods=['GET'])
def listar_mensagens():
    mensagens = Mensagem.query.order_by(Mensagem.id.desc()).all()
    return jsonify([
        {'id': m.id, 'conteudo': m.conteudo}
        for m in mensagens
    ])
