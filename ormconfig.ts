import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { ConfigEnum } from './src/enum/config'

import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

const getEnv = (env: string): Record<string, unknown> => {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
  return {}
}

const buildConnectionOptions = () => {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'dev'}`)
  // configService
  const config = { ...defaultConfig, ...envConfig }

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    // 同步本地的schema与数据库 -> 初始化的时候去使用
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password'
    }
  } as TypeOrmModuleOptions
}

export const connectionParams = buildConnectionOptions()
