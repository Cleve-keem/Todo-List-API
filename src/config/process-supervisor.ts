import { Server } from "node:http";

class ProcessSupervisor {
  constructor(
    private server: Server,
    private sequelize: any,
  ) {}

  public initialize() {
    ["SIGINT", "SIGTERM"].forEach((signal) =>
      process.on(signal, () => this.shutdown(signal)),
    );
    process.on("uncaughtException", (err) =>
      this.handleCrash("UncaughtException", err),
    );
    process.on("unhandledRejection", (reason) =>
      this.handleCrash("UnhandledRejection", reason as Error),
    );
  }

  // Handle Crash
  private async handleCrash(type: string, err: Error) {
    console.error(`[FATAL] ${type}:`, err);
    await this.shutdown(type, true);
  }

  // Graceful Shutdown
  private async shutdown(signal: string, isCrash = false) {
    console.log(`💻[System] ${signal} received. Closing up...`);

    const forceExit = setTimeout(() => process.exit(1), 5000);
    forceExit.unref();

    try {
      // stop server listening
      if (this.server.listening)
        await new Promise((resolve) => this.server.close(resolve));
      console.log(`💻 [System] server closed!`);
      //disconnect sequelize
      if (this.sequelize) await this.sequelize.disconnect();
      console.log("✔ [Sequelize] disconnected successfully!");
      console.log("[System] Cleanup complete.");
      // crash
      process.exit(isCrash ? 1 : 0);
    } catch (err) {
      process.exit(1);
    }
  }
}

export default ProcessSupervisor;
