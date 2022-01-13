import nodemailer from 'nodemailer';

class MailService {
  transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: 'podushkabelarus@gmail.com',
        pass: 'podushka2020',
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: 'podushkabelarus@gmail.com',
      to,
      subject: 'Account activation for ' + process.env.API_URL,
      text: '',
      html: `<div>
              <h1>Please, click on the link to activate your account.</h1>
              <a href="${link}">${link}</a>
            </div>`,
    });
  }
}

export default new MailService();
