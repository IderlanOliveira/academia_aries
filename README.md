# Academia Áries

Site da academia com apresentação dos equipamentos, planos e página de matrícula.
O repositório também contém um projeto React independente, ainda com o modelo
inicial do Create React App.

## Estrutura

```text
.
├── index.html               # Página inicial do site estático
├── pages/
│   └── matricula.html       # Formulário de matrícula
├── assets/
│   ├── css/                 # Estilos de cada página
│   ├── js/                  # Scripts de cada página
│   └── images/              # Imagens e ícone do site
└── apps/
    └── react/               # Projeto React independente
        ├── public/
        ├── src/
        ├── package.json
        └── package-lock.json
```

## Executar o site estático

Na raiz do repositório, execute:

```bash
python3 -m http.server 8000
```

Acesse <http://localhost:8000>. A matrícula está disponível pelo menu ou em
<http://localhost:8000/pages/matricula.html>.

Os caminhos dos recursos são relativos, permitindo servir o site também em uma
subpasta. As fontes Barlow Condensed e DM Sans vêm do Google Fonts; sem internet,
o navegador utiliza as fontes alternativas do sistema. Os ícones são caracteres
locais e não dependem de bibliotecas externas.

## Experiência do site

- Visual em grafite e verde elétrico, com navegação adaptada para celular.
- Seletor de objetivo que sugere um dos três planos.
- Links de planos que já preenchem a escolha na pré-matrícula.
- Formulário com validação de nome, telefone e consentimento.
- Revisão dos dados e possibilidade de edição antes de continuar para o WhatsApp.
- Perguntas frequentes expansíveis e suporte à preferência por movimento reduzido.

O formulário não coleta CPF nem endereço e não armazena dados no navegador ou
servidor. Após a revisão, o visitante abre o WhatsApp e envia a mensagem à equipe.
Isso é uma solicitação de pré-matrícula: não confirma vaga nem realiza pagamento.

## Executar o projeto React

```bash
cd apps/react
npm ci
npm start
```

Nesse mesmo diretório, `npm test` executa os testes e `npm run build` gera a versão
de produção. Consulte também o [README do projeto React](apps/react/README.md).

## Configuração do atendimento

O fluxo usa o número de WhatsApp que já existia no projeto (`5582994181633`).
Antes de publicar, confira o número, os preços, os benefícios e os dados do
responsável técnico. O contato está em `index.html`, `pages/matricula.html` e
`assets/js/matricula.js`. O site estático funciona sem backend PHP.
