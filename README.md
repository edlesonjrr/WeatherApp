
# WeatherApp 🌦️

A WeatherApp é um aplicativo web simples para consultar o clima em tempo real, utilizando dados de uma API meteorológica. Este projeto foi desenvolvido para fins de aprendizado e prática de desenvolvimento web e CI/CD.

## ✨ Funcionalidades

- Consulta de clima atual para uma cidade específica.
- Interface simples e intuitiva.
- Pipeline CI/CD configurada com GitHub Actions para automação de build, testes e deploy.

## 🛠️ Tecnologias Utilizadas

- **HTML, CSS, JavaScript**: Para a interface e lógica do frontend.
- **API de Clima**: Integração com uma API de clima (ex.: OpenWeatherMap, a ser confirmada).
- **GitHub Actions**: Para automação de CI/CD.

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o WeatherApp na sua máquina:

### Pré-requisitos

- Navegador web (ex.: Chrome, Firefox).
- (Opcional) Uma chave de API para a OpenWeatherMap, se aplicável.

### Passos

Clone o repositório:

```bash
git clone https://github.com/edlesonjrr/WeatherApp.git
cd WeatherApp
```

Abra o projeto:

Se for um projeto estático, abra o arquivo `index.html` diretamente no navegador:

```bash
open index.html  # Mac
start index.html  # Windows
```

Se houver dependências (ex.: Node.js), instale-as:

```bash
npm install
npm start
```

Configure a API de Clima (se aplicável):

- Crie um arquivo `.env` na raiz do projeto.
- Adicione sua chave da API:

```bash
API_KEY=sua-chave-da-openweathermap
```

Siga as instruções da API para integração.

Acesse no navegador:

Abra [http://localhost:3000](http://localhost:3000) (ou a porta configurada) para ver o WeatherApp.

## 🌐 Deploy

Atualmente, o deploy é simulado na pipeline CI/CD. Para hospedar o WeatherApp, você pode usar:

- **GitHub Pages**: Configure em `Settings → Pages`, usando a branch `main`.
- **Netlify**: Conecte o repositório ao Netlify para deploy automático.

## 🏗️ Pipeline CI/CD

O projeto utiliza GitHub Actions para automação de CI/CD. A pipeline roda em pushes e pull requests nas branches `main` e `feat/*`.

### Estágios da Pipeline

- **Initialization**: Simula instalação de dependências.
- **Build**: Simula compilação do projeto.
- **Security Check**: Simula verificações de segurança.
- **Package**: Simula empacotamento.
- **Quality Tests**: Simula testes de qualidade.
- **Validation**: Simula validação do artefato.
- **Deploy**: Simula deploy (produção para `main`, desenvolvimento para outras branches).

### Fluxo de Desenvolvimento

- **main**: Branch de produção.
- **feat/<nome>**: Branches de desenvolvimento (ex.: `feat/update`).
- Crie pull requests de `feat/<nome>` para `main` para revisar e mesclar mudanças.

## 🤝 Como Contribuir

Fork o repositório.

Crie uma branch para sua feature:

```bash
git checkout -b feat/sua-feature
```

Faça suas alterações e commit:

```bash
git commit -m "Adiciona sua feature"
```

Envie para o repositório remoto:

```bash
git push origin feat/sua-feature
```

Abra um pull request para a branch `main`.

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato:

- **GitHub**: [edlesonjrr](https://github.com/edlesonjrr)
- **Email**: edleson050@gmail.com

---

Sinta o Clima. Viva a Vida. **WeatherApp**.
