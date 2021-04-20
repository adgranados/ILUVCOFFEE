import { registerAs } from "@nestjs/config";

export default registerAs('coffees', ()=>({
    tituloModulo:"Coffee Module",
    coffees:{
        related:1,
        stats:2
    },
    others:[1,2,3,4],
    database:{
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'pass123',
        database: process.env.DATABASE_NAME || 'postgres',
    }
}));