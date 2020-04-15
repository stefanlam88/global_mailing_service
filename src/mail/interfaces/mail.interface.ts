import { Document } from 'mongoose';

export interface Mail extends Document {
    readonly from: string;
    readonly follow_up_emails: string;
    readonly subject: string;
    readonly text: string;
    readonly html: string;
    readonly created_at: Date;
}
