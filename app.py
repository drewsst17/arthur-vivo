from flask import Flask
from routes.mensagem import mensagem_bp
from database import db
import os

app = Flask(__name__, static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mensagens.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Registrar blueprint de rotas
app.register_blueprint(mensagem_bp)

# Rota principal
@app.route('/')
def home():
    return open(os.path.join(app.root_path, 'templates/index.html')).read()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)