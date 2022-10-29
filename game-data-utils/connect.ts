import * as mongoDB from 'mongodb'

export const collections: {'game-data'?: mongoDB.Collection} = {}

const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.MONGO_URI}`)

export const connectToMongo = async () => {

    await client.connect()
    const db: mongoDB.Db = client.db(`${process.env.MONGO_DB}`)
    const gameDataCollection: mongoDB.Collection = db.collection(`${process.env.MONGO_COLLECTION}`)
    collections['game-data'] = gameDataCollection

    console.log('successfully connected to Mongo')
}

export const disconnectFromMongo = async () => {
    await client.close()
    console.log('Disconnected from mongo')
}