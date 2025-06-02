const brevo = require('@getbrevo/brevo');
const fs = require('fs/promises');
const path = require('path');
const Handlebars = require('handlebars');
const { BREVO_API_KEY } = require('../config/secrets.config');

const apiInstance = new brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications.apiKey;
apiKey.apiKey = BREVO_API_KEY;

const sendEmail = async (email, subject, templateName, data) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      '../emails',
      `${templateName}.handlebars`
    );
    const templateSource = await fs.readFile(templatePath, 'utf-8');

    const template = Handlebars.compile(templateSource);

    const htmlContent = template(data);

    const emailToSend = new brevo.SendSmtpEmail();
    emailToSend.subject = subject;
    emailToSend.htmlContent = htmlContent;
    emailToSend.sender = {
      name: 'Cynthia from E-waste',
      email: 'cynthiaawsajira@gmail.com'
    };
    emailToSend.to = [{ name: data.name || 'Valued Customer', email }];

    const resp = await apiInstance.sendTransacEmail(emailToSend);
    console.log(resp.body);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
