import * as mongoose from 'mongoose';

export const MailSchema = new mongoose.Schema({
    form_emails: Array,
    follow_up_emails: Array,
    title: String,
    text: String,
    html: String,
    created_at: { type: Date, default: Date.now }
})
