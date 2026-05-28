import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: AuthPayloadDto, res: Response): Promise<{
        user: {
            id: any;
            email: any;
        };
    }>;
    signIn(body: AuthPayloadDto, res: Response): Promise<{
        user: {
            id: any;
            email: any;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        user: {
            id: any;
            email: any;
        };
    }>;
    logout(req: Request, res: Response): Promise<{
        success: boolean;
    }>;
    me(req: Request): {
        user: Express.User | undefined;
    };
    private setAuthCookies;
}
