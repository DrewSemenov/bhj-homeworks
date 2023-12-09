class Form {
  form = document.querySelector('#form');
  inputFile = document.querySelector('#file');
  progressBar = document.querySelector('#progress');

  constructor() {
    this.registerEvents();
  }

  registerEvents() {
    this.form.addEventListener('submit', (event) => this.submitHandler(event));
  }

  submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      this.progressBar.value = (event.loaded / event.total).toFixed(1);
    });

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
  }
}

const form = new Form();
