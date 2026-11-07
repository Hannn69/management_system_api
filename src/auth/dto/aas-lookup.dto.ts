import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AasLookupDto {
  /** Short-lived JWT signed by the web app (JWT_SECRET) after the AAS identity check succeeded. */
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  assertion!: string;
}
