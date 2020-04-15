import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);
  private readonly dateTime = new Date();
  @Process('send')
  async handleSend(job: Job) {

    this.logger.debug('Parameters: ' + job.data);
    this.logger.debug('[Mail Queue] - Start processing sending Follow up email queue...');

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST_URL,
        port: process.env.MAIL_HOST_PORT,
        secure: process.env.MAIL_SECURE, // true for 465, false for other ports
        auth: {
            type: process.env.MAIL_TYPE,
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let followUpMailOptions = {
      from: '[Admin]',
      to: job.data.follow_up_emails, // list of receivers (separated by ,)
      subject: '[Follow up emails: Thank you for submitting forms]',
      text: 'Hi,  we will contact you shortly for the form you have submitted',
      html: ''
    };

    /* send to follow up emails */
    var sent_follow_up_emails = await new Promise<boolean>(async function(resolve, reject) {

      return await transporter.sendMail(followUpMailOptions, async (error, info)  => {
          if (error) {
            console.log('Message sent failed: %s', error);
            return reject(false);
          }

          console.log('Message sent success: %s', info.messageId)
          resolve(true);
      });
    });

    if(sent_follow_up_emails){
      this.logger.debug('[Mail Queue] Completed Sent Follow up Email Queue');
    }
    else{
      this.logger.error('[Mail Queue] Failed to Send Follow up Email Queue');
    }

    let adminMailOptions = {
      from: '[Admin]',
      to: job.data.form_emails, // list of receivers (separated by ,)
      subject: '[Form Email Summary: User Summary forms]',
      text: '',
      html: '<table style="width:100%" border="1">'+
              '<tr>'+
                '<td>User Emails</th>'+
                '<td>'+job.data.follow_up_emails+'</th> '+
              '</tr>'+
              '<tr>'+
                '<td>Subject</td>'+
                '<td>'+job.data.subject+'</td> '+
              '</tr>'+
              '<tr>'+
                '<td>HTML / Contents</td>'+
                '<td>'+job.data.html+'</td> '+
              '</tr>'+
              '<tr>'+
                '<td>Time Sent</td>'+
                '<td>'+this.dateTime+'</td> '+
              '</tr>'+
            '</table>'
    };

    /* send to admin */
    var sent_admin_emails = await new Promise<boolean>(async function(resolve, reject) {

      return await transporter.sendMail(adminMailOptions, async (error, info)  => {
          if (error) {
            console.log('Message sent failed: %s', error);
            return reject(false);
          }

          console.log('Message sent success: %s', info.messageId)
          resolve(true);
      });
    });

    if(sent_follow_up_emails){
      this.logger.debug('[Mail Queue] Completed Sent Form Email Queue');
    }
    else{
      this.logger.error('[Mail Queue] Failed to Send Form Email Queue');
    }

  }

}
