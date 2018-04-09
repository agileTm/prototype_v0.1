const rethinkDB = require('rethinkdbdash');

export class RethinkDB {
    public static r: any;

    r: any;
    private _tableSchema: any;
    private _db: string;
    private _host: string;

    constructor(db: string, host: string, tableSchemachema: any[]) {
        this._tableSchema = tableSchemachema;
        this._db = db;
        this._host = host;
    }

    async connect() {
        const options = {
            db: this._db,
            host: this._host
        };

        this.r = rethinkDB(options);
        RethinkDB.r = this.r;

        await this.init();
    }

    private async init() {
        const tableSchema: any = this._tableSchema;
        const r: any = this.r;
        const tableList: string[] = await r.tableList().run();

        for (const table of tableSchema) {
            if (!tableList.includes(table.name)) {
                await r.tableCreate(table.name, {
                    primaryKey: table.key || 'id'
                }).run();

                if (table.indexs) {
                    table.indexs.forEach(async (index: string) => {
                        await r.table(table.name).indexCreate(index).run().catch(() => {});
                    });
                }
            }
        }
    }
}
