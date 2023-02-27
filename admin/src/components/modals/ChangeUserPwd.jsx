import React from 'react';
import Modal from 'react-modal';
import useTranslation from '../translation/useTranslation';
import TextInput from '../inputs/TextInput';


const customStyles = {
    content: {}
}

export default function ChangeUserPwd({modalIsOpen}) {
    const {trans} = useTranslation();

    return (
        <Modal isOpen={modalIsOpen} style={customStyles}>
            <h1>Pwd change inputs</h1>
            <TextInput
                label={trans('password')}
                placeholder={trans('password')}
            />
            <TextInput
                label={trans('repeat_password')}
                placeholder={trans('repeat_password')}
            />
            <button>{trans('save')}</button>
        </Modal>
    )
}
