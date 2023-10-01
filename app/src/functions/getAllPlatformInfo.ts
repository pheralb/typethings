import type { OsType } from "@tauri-apps/api/os";
import { platform, arch, type, version } from "@tauri-apps/api/os";

export interface OSInfo {
  platform: string;
  architecture: string;
  osType: OsType;
  kernelVersion: string;
}

export const getOSInfo = async () => {
  try {
    const platformInfo = await platform();
    const architectureInfo = await arch();
    const osType = await type();
    const kernelVersion = await version();
    return {
      platform: platformInfo,
      architecture: architectureInfo,
      osType: osType,
      kernelVersion: kernelVersion,
    } as OSInfo;
  } catch (err) {
    console.error(err);
    return null;
  }
};
