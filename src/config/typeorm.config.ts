import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '192.168.0.16',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'admin',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}