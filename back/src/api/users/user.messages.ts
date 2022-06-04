import { sendHtml } from '../../helpers/mailer';
import config from '../../config/environment';

export function emailActivateUser(data: any) {
  return sendHtml({
    email: data.email,
    content: `
      <p></p>
    `,
    subject: '',
  });
}

export function emailRecoverPassword(data: any) {
  return sendHtml({
    email: data.email,
    content: `
      <p></p>
    `,
    subject: '',
  });
}
