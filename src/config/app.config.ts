export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'pass123',
        database: process.env.DATABASE_NAME || 'postgres',
    }
});