import * as grpc from '@grpc/grpc-js';
import * as dotenv from 'dotenv';
// Import du code généré automatiquement
import { AuthServiceClient } from '../proto/gen/ts/proto/auth/v1/service';
import { DiscoveryServiceClient } from '../proto/gen/ts/proto/discovery/v1/service';

dotenv.config();

// Fonction helper pour créer des credentials (insecure en dev/interne)
const creds = grpc.credentials.createInsecure();

// 1. Client Auth
// En local, on vise localhost:50051. Dans Docker, ce sera auth-service:50051
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'localhost:50051';
export const authClient = new AuthServiceClient(
    authServiceUrl,
    creds
);

// 2. Client Discovery
const discoveryServiceUrl = process.env.DISCOVERY_SERVICE_URL || 'localhost:50052';
export const discoveryClient = new DiscoveryServiceClient(
    discoveryServiceUrl,
    creds
);

console.log(`🔌 gRPC Clients connected: Auth(${authServiceUrl}), Discovery(${discoveryServiceUrl})`);