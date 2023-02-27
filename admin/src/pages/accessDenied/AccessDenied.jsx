import React from 'react';
import useTranslation from '../../components/translation/useTranslation';
import "./AccessDenied.scss";

function AccessDenied() {
  const { trans } = useTranslation();

  return (
    <div className='content-wrapper access-denied-wrapper'>{trans("access_denied")}</div>
  )
}

export default AccessDenied