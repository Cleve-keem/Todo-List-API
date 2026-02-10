import { Server } from "node:http";

class ProcessSupervisor {
  private server: Server;
  private sequelize;

  constructor(server: Server, sequelize: any) {
    this.server = server;
    this.sequelize = sequelize;
  }

  public initialize() {
    // listen to both signal (sigterm | sigint)
    ["SIGINT", "SIGTERM"].forEach((signal) =>
      process.on(signal, async () => this.handleGracefulShutdown(signal)),
    );
    // uncaughtExeception
    process.on("uncaughtException", (error: any) =>
      this.handleCrash("unhandledRejection", error),
    );
    // unhandleRejection
    process.on("unhandledRejection", (reason: unknown) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));
      this.handleCrash("uncaughtException", error);
    });
  }
  // Handle Crash
  async handleCrash(type: string, error: Error) {
    // 1. console the object of the error
    console.log(`[FATAL ERROR] ${type}`, {
      error: error.message,
      cause: error.cause,
      time: new Date().toISOString(),
    });
    // 2. send a graceful shotdown
    await this.handleGracefulShutdown(type, true);
  }

  // Graceful Shutdown
  private async handleGracefulShutdown(
    signal: string,
    isCrash: boolean = false,
  ) {
    console.log(`💻 [System] ${signal} received, closing resources...`);
    try {
      // set timer
      const forceExit = setTimeout(() => process.exit(1), 1000);
      forceExit.unref();

      // Stop server listening
      if (this.server.listening) {
        console.log(`💻 [System] closing server...`);
        await new Promise((resolve) => this.server.close(resolve));
        console.log(`💻 [System] server closed!`);
      }
      //disconnect sequelize
      if (this.sequelize) {
        console.log("🔃 [Sequelize] disconnecting...");
        await this.sequelize.disconnect();
        console.log("✔ [Sequelize] disconnected successfully!");
      }

      // crash
      process.exit(isCrash ? 1 : 0);
    } catch (err: any) {
      console.error("💻 [System] error during shutdown", err.message);
      process.exit(1);
    }
  }
}

export default ProcessSupervisor;
