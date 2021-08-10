import { AuthLoginDto } from '../../../dto/auth-login.dto';
import { FacebookUser } from '../types/facebook-user.type';
import { createCipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export class FacebookAuthProviderAdapter {

  public parsed!: Promise<AuthLoginDto>;
  private readonly salt = 'google_secret_salt';
  private readonly PREDICTABLE_BYTES = 'SOME_IV_SOME_IV_';

  constructor(public readonly unparsed: FacebookUser) {
    this.parsed = this.parse(unparsed);
  }

  public async parse(data: FacebookUser): Promise<AuthLoginDto> {

    const key = (await promisify(scrypt)(this.salt, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.PREDICTABLE_BYTES);

    const encryptedPrimaryKey = Buffer.concat([
      cipher.update(data.primaryKey),
      cipher.final(),
    ]).toString('hex');

    return {
      name: `${data.firstName} ${data.lastName}`,
      // primaryKey: data.email,
      primaryKey: encryptedPrimaryKey,
      provider: 'facebook',
      imageUrl: data.picture,
      // imageUrl:  `https://graph.facebook.com/${data.primaryKey}/picture?type=square&access_token=${data.accessToken}`,
      latestAccessToken: data.accessToken
    }
  }
 
}