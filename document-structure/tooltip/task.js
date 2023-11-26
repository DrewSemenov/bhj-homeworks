class Tooltip {
  constructor() {
    this.body = document.querySelector('body');

    this.createTooltip();
    this.registerListeners();
  }

  createTooltip() {
    this.tooltipClassActive = 'tooltip_active';
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('tooltip');
    this.tooltip.style.cursor = 'pointer';
  }

  registerListeners() {
    this.body.addEventListener('click', (event) => this.showTooltip(event));
    this.tooltip.addEventListener('click', () => this.hideTooltip());
    window.addEventListener('scroll', () => this.scrollPositionTooltip());
  }

  showTooltip(event) {
    const linkHasTooltip = event.target.closest('.has-tooltip');

    if (!linkHasTooltip) {
      return;
    }

    event.preventDefault();

    if (linkHasTooltip.nextElementSibling === this.tooltip) {
      this.hideTooltip();
      return;
    }

    this.addTooltip(linkHasTooltip);
  }

  addTooltip(element) {
    this.tooltip.textContent = element.title;
    this.tooltip.classList.add(this.tooltipClassActive);

    this.getPositionTooltip(element);

    element.after(this.tooltip);
  }

  getPositionTooltip(element) {
    const elementPosition = element.getBoundingClientRect();

    this.tooltip.style.left = elementPosition.left + 'px';
    this.tooltip.style.top = elementPosition.bottom + 'px';
  }

  hideTooltip() {
    this.tooltip.remove();
  }

  scrollPositionTooltip() {
    if (!this.tooltip.classList.contains(this.tooltipClassActive)) {
      return;
    }

    this.getPositionTooltip(this.tooltip.previousElementSibling);
  }
}

const tooltip = new Tooltip();

