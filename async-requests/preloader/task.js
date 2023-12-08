class ExchangeRates {
  container = document.querySelector('#items');
  loader = document.querySelector('#loader');
  loaderClassActive = 'loader_active';

  rates = JSON.parse(localStorage.getItem('rates')) ?? null;

  constructor() {
    this.startApp();
  }

  startApp() {
    this.getCurrencies();

    if (!this.rates) return;

    this.renderRates();
  }

  renderRates() {
    this.hideLoader();
    this.container.innerHTML = this.getRatesHtml();
  }

  getRatesHtml() {
    let html = '';
    for (let currency in this.rates) {
      html += `
      <div class="item">
        <div class="item__code">${this.rates[currency].CharCode}</div>
        <div class="item__value">${this.rates[currency].Value}</div>
        <div class="item__currency">руб.</div>
      </div>
      `;
    }

    return html;
  }

  async getCurrencies() {
    const url =
      'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
    const response = await fetch(url);
    this.rates = (await response.json()).response.Valute;

    this.renderRates();
    this.saveRates(this.rates);
  }

  saveRates(rates) {
    localStorage.setItem('rates', JSON.stringify(rates));
  }

  showLoader() {
    this.loader.classList.add(this.loaderClassActive);
  }

  hideLoader() {
    this.loader.classList.remove(this.loaderClassActive);
  }
}

const exchangeRates = new ExchangeRates();
