import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
    // không truyền data
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
    // có truyền data
});


export const changeLanguageApp = (languageInput) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language: languageInput,
});