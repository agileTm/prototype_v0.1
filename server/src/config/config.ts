const config: any = {
    DB: 'infotrade',
    HOST: 'localhost',

    // DB Table
    TABLE_LOG: 'log',
    TABLE_MEMBER: 'member',
    TABLE_TRADE: 'trade',

    PASSWORD_KEY: 'prototype_v0.1',

    JWT_KEY: 'secret'
};

config.DB_TABLE = [
    {name: config.TABLE_LOG, indexs: ['date']},
    {name: config.TABLE_MEMBER, indexs: ['date', 'name', 'type']},
    {name: config.TABLE_TRADE, indexs: ['title', 'date', 'userId', 'type']}
];

export const Config = config;
