import {useContext} from 'react';
import {TranslationContext} from '../components/context/TranslationContext';
import translations from './translation.json';

function useTranslation() {
    const {currentLanguage} = useContext(TranslationContext);

    const trans = (text) => {
        return translations[currentLanguage][text];
    };

    return {trans, currentLanguage};
}

export default useTranslation


