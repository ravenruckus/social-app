module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'social',
    }
  },
  production: {
    client: 'pg',
      connection: process.env.DATABASE_URL
    }
}
