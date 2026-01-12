import type { Socket } from "socket.io-client";

/**
 * Socket is disabled for static (no-backend) deployment.
 * This function always returns null.
 */
export const getSocket = (): Socket | null => {
  return null;
};