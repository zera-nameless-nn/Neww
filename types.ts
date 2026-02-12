export enum AppView {
  FAKE_403 = 'FAKE_403',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  OBFUSCATOR = 'OBFUSCATOR', // New View for IronBrew
  CHECKING_IDENTITY = 'CHECKING_IDENTITY', // Simulates the "chệch dành tính" (identity check)
  RAW_FILE = 'RAW_FILE', // Success for executor
  ACCESS_DENIED = 'ACCESS_DENIED' // Failure for normal user
}

export interface ScriptData {
  content: string;
  name: string;
}

export interface ObfuscationOptions {
  vmEncryption: boolean;
  stringEncryption: boolean;
  controlFlowFlattening: boolean;
  memes: boolean;
}