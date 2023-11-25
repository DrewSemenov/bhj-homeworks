class ChatWidget {
  constructor() {
    this.chatWidget = document.querySelector('.chat-widget');
    this.chatWidgetSide = this.chatWidget.querySelector('.chat-widget__side');
    this.chatWidgetInput = this.chatWidget.querySelector('.chat-widget__input');
    this.messages = this.chatWidget.querySelector('.chat-widget__messages');

    this.chatWidgetSide.addEventListener('click', this.chatOpen.bind(this));
    this.chatWidgetInput.addEventListener(
      'keypress',
      this.sendMessage.bind(this)
    );
  }

  chatOpen() {
    this.chatWidget.classList.add('chat-widget_active');
    this.chatWidgetInput.focus();
  }

  sendMessage(event) {
    if (event.code !== 'Enter') {
      return;
    }
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    this.printMessage(event.currentTarget.value);
    setTimeout(this.printMessage.bind(this), 1000);

    event.currentTarget.value = '';
  }

  printMessage(message) {
    let className = !message ? 'message' : '"message message_client"';
    !message && (message = this.getAnswer());

    this.messages.innerHTML += `
    <div class=${className}>
    <div class="message__time">${new Date().getHours()}:${new Date().getMinutes()}</div>
    <div class="message__text">${message}</div>
</div>
    `;
  }

  getAnswer() {
    const words = [
      'мы на карантине',
      'никто не работает',
      'почему Вы без маски?',
      'не засоряйте эфир',
      'зачем Вы здесь?',
      'Валера, настало твоё время',
      'Ломай меня полностью',
      'Онотоле',
      'Превед',
      'СВО',
      'Сало есть?',
      'Z!!! Zzzz...',
    ];

    const index = Math.floor(Math.random() * words.length);

    return words[index];
  }
}

const chatWidget = new ChatWidget();
