import {isEscape} from './utils.js';

const MESSAGE_SHOW_TIME = 5000;

const messageErrorTemplate = document.querySelector('#data-error').content;

const dataErrorMessage = (errorMessage) => {
  const messageErrorContainer = messageErrorTemplate.cloneNode(true);

  if (errorMessage) {
    messageErrorContainer.querySelector('.data-error__title').textContent = errorMessage;
  }

  document.body.append(messageErrorContainer);

  const sectionMessageError = document.querySelector('.data-error');

  setTimeout(() => {
    sectionMessageError.remove();
  }, MESSAGE_SHOW_TIME);
};

const Modals = {
  success: createModalElement('success'),
  error: createModalElement('error'),
};

let activeModalType = null;

const onOuterBodyClick = (evt) => {
  if (!evt.target.closest(`.${activeModalType}__inner`)) {
    closeActiveModal();
  }
};

function onDocumentKeydown(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeActiveModal();
  }
}

const showModal = (type) => {
  activeModalType = type;
  document.addEventListener('click', onOuterBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(Modals[activeModalType]);
};

function closeActiveModal() {
  Modals[activeModalType].remove();
  activeModalType = null;
  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function createModalElement(type) {
  const template = document.querySelector(`#${type}`).content;
  const modalElement = template.querySelector(`.${type}`).cloneNode(true);

  modalElement.querySelector(`.${type}__button`).addEventListener('click', closeActiveModal);

  return modalElement;
}

const showSuccessModal = () => showModal('success');

const showErrorModal = () => showModal('error');

export {dataErrorMessage, showSuccessModal, showErrorModal};
