import { Global, Module } from '@nestjs/common';
import { MailerModule as NesMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { NesMailerService } from './mailer.service';

@Global()
@Module({
  imports: [
    NesMailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      },
      defaults: {
        from: `"Soatmorotov Abrorbek" <${process.env.GMAIL_USER}>`,
      },
      template: {
        dir: join(process.cwd(), "src/template"),
        adapter: new HandlebarsAdapter(),
        options: { strict: true }
      }
    })
  ],
  providers: [NesMailerService],
  exports: [NesMailerService],
  
})
export class MailerModule {}
