import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class DBConnection {
  private static instance: DBConnection;
  private uri: string;
  private constructor() {
    this.uri = process.env.MONGO_URI || "";
    if (!this.uri) {
      throw new Error("🚨 MONGO_URI is not defined in .env file");
    }
  }
  public static getInstance(): DBConnection {
    if (!this.instance) {
      this.instance = new DBConnection();
    }
    return this.instance;
  }
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log("✅ MongoDB connection established.");
    } catch (error) {
      console.log("❌ MongoDB connection error:", error);
      process.exit(1);
    }
  }
  public disconnect(): void {
    if (mongoose.connection.readyState === 1) {
      mongoose
        .disconnect()
        .then(() => {
          console.log("🔌 MongoDB disconnected.");
        })
        .catch((error) => {
          console.error("❌ Error while disconnecting MongoDB:", error);
        });
    } else {
      console.warn("MongoDB is not connected, skipping disconnect.");
    }
  }
  public getConnection(): typeof mongoose {
    return mongoose;
  }
}
export default DBConnection.getInstance();
