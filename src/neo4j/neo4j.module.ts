import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';
import { Neo4jConfig } from './neo4j-config.interface';


export const NEO4J_CONFIG = 'NEO4J_CONFIG';
export const NEO4J_CONNECTION = 'NEO4J_CONNECTION';

export const createDatabaseConfig = (configService: ConfigService, customConfig?: Neo4jConfig): Neo4jConfig => {
    return (
        customConfig || {
            scheme: configService.get('NEO4J_SCHEME') ?? 'neo4j',
            host: configService.get('NEO4J_HOST') ?? '',
            port: configService.get('NEO4J_PORT') ?? 7687,
            username: configService.get('NEO4J_USERNAME') ?? '',
            password: configService.get('NEO4J_PASSWORD') ?? '',
            database: configService.get('NEO4J_DATABASE') ?? '',
        }
    )
}


@Module({})
export class Neo4jModule {
    static forRoot(customConfig?: Neo4jConfig): DynamicModule {
        return {
            module: Neo4jModule,
            imports: [ConfigModule],
            global: true,
            providers: [
                {
                    provide: NEO4J_CONFIG,
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService): Neo4jConfig => createDatabaseConfig(configService, customConfig)
                }, 
                {
                    provide: NEO4J_CONNECTION,
                    inject: [NEO4J_CONFIG],
                    useFactory: (config: Neo4jConfig) => {
                        const {host, scheme, port, username, password} = config;
                        const connection = neo4j.driver(
                            `${scheme}://${host}:${port}`,
                            neo4j.auth.basic(username, password)
                        );
                        return connection;
                    }
                }
            ]
        };
    }
}