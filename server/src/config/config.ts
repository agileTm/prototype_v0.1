const config: any = {
    DB: 'infotrade',
    HOST: 'localhost',

    // DB Table
    TABLE_LOG: 'log'
};

config.DB_TABLE = [
    {name: config.TABLE_LOG, indexs: ['date']}
];

export const Config = config;
