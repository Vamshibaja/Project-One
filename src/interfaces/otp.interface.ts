export default interface Otp {
  otp: string;
  userName: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
