import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Mail } from './interfaces/mail.interface';
import { CreateMailDTO } from './dto/create-mail.dto';

@Injectable()
export class MailService {
    constructor(@InjectModel('Mail') private readonly mailModel: Model<Mail>) { }
    // fetch all mails
    async getAllMails(): Promise<Mail[]> {
        const mails = await this.mailModel.find().exec();
        return mails;
    }
    // Get a single mail
    async getMail(mailId): Promise<Mail> {
        const mail = await this.mailModel.findById(mailId).exec();
        return mail;
    }
    // post a single mail
    async addMail(createMailDTO: CreateMailDTO): Promise<Mail> {
        const newMail = await new this.mailModel(createMailDTO);
        return newMail.save();
    }
    // Update mail details
    async updateMail(mailId, createMailDTO: CreateMailDTO): Promise<Mail> {
        const updatedMail = await this.mailModel
            .findByIdAndUpdate(mailId, createMailDTO, { new: true });
        return updatedMail;
    }

}
