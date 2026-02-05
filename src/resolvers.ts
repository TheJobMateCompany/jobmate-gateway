import { authClient, discoveryClient } from './grpc-clients';

export const resolvers = {
  Query: {
    me: () => ({ id: "1", email: "test@test.com" }), // Dummy pour l'instant
  },
  Mutation: {
    // --- LOGIN (Appelle Auth Service) ---
    login: async (_: any, args: any) => {
      const { email, password } = args;
      
      return new Promise((resolve, reject) => {
        // Appel gRPC
        authClient.login({ email, password }, (err, response) => {
          if (err) {
            console.error("gRPC Error:", err);
            reject(new Error(err.details || "Erreur connexion Auth"));
            return;
          }
          
          // Mapping de la réponse gRPC vers GraphQL
          resolve({
            token: response?.accessToken,
            user: {
              id: response?.userId,
              email: email // Le gRPC ne renvoie pas l'email, on le reprend des args
            }
          });
        });
      });
    },

    // --- ADD JOB (Appelle Discovery Service) ---
    addJobUrl: async (_: any, args: any) => {
      return new Promise((resolve, reject) => {
        discoveryClient.addJobUrl({ url: args.url, userId: "temp-user-id" }, (err, response) => {
          if (err) reject(err);
          else resolve({
            id: response?.id,
            title: response?.title,
            company: response?.company,
            isApproved: response?.isApproved
          });
        });
      });
    }
  },
};