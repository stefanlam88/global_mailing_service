import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMailDTO {

    @IsNotEmpty()
    readonly form_emails: string;

    @IsNotEmpty()
    readonly follow_up_emails: string;

    @IsNotEmpty()
    readonly subject: string;

    readonly text: string;
    readonly html: string;
    readonly created_at: Date;
}
