import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { TableModule } from './table/table.module';
import { BookingModule } from './booking/booking.module';
import { MenuModule } from './menu/menu.module';
import { PriceModule } from './price/price.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UserModule,
    FileModule,
    TableModule,
    BookingModule,
    MenuModule,
    PriceModule,
  ],
})
export class AppModule {}
