import mongoose, { ConnectOptions } from 'mongoose';

// Fonction pour la connexion à MongoDb Atlas
const connectToDB =  async () => {
    try {
      const connectionString = 'mongodb+srv://bacem:myPWD@cluster0.seo00fb.mongodb.net/?retryWrites=true&w=majority';
      const connectionOptions: ConnectOptions|any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      await mongoose.connect(connectionString, connectionOptions);
  
      console.log('Connexion à MongoDB Atlas est avec succees');
    } catch (error) {
      console.error('Erreur de connexion à MongoDB Atlas:', error);
    }
  };

export default connectToDB;