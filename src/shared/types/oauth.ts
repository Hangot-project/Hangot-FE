import { Provider } from "../../constants/oauth-provider";

export type ProviderType = (typeof Provider)[keyof typeof Provider];

export interface SocialLoginRequestDto {
  code: string;
}
