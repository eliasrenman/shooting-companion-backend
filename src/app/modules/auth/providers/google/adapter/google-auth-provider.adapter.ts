import { AuthLoginDto } from '../../../dto/auth-login.dto';
import { GoogleUser } from '../types/google-user.type';
import { createCipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export class GoogleAuthProviderAdapter {

  public parsed!: Promise<AuthLoginDto>;
  private readonly salt = 'google_secret_salt';
  private readonly PREDICTABLE_BYTES = 'SOME_IV_SOME_IV_';

  constructor(public readonly unparsed: GoogleUser) {
    this.parsed = this.parse(unparsed);
  }

  public async parse(data: GoogleUser): Promise<AuthLoginDto> {

    const key = (await promisify(scrypt)(this.salt, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.PREDICTABLE_BYTES);

    const encryptedPrimaryKey = Buffer.concat([
      cipher.update(data.primaryKey),
      cipher.final(),
    ]).toString('hex');

    return {
      name: `${data.firstName} ${data.lastName}`,
      primaryKey: encryptedPrimaryKey,
      provider: 'google',
      imageUrl: data.picture?.replace('s96', 's256'),
      latestAccessToken: data.accessToken
    }
  }
 
}