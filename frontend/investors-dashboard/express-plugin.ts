import { Plugin } from 'vite';
import { Request, Response, NextFunction } from 'express';

interface ExpressModule {
    app: (req: Request, res: Response, next: NextFunction) => void;
}

export default function express(path: string): Plugin {
    return {
        name: 'vite3-plugin-express',
        configureServer: async (server: unknown) => {
            server.middlewares.use(async (req: Request, res: Response, next: NextFunction) => {
                process.env['VITE'] = 'true';
                try {
                    const { app } = await server.ssrLoadModule(path) as ExpressModule;
                    app(req, res, next);
                } catch (err) {
                    console.error(err);
                    next(err);
                }
            });
        },
    };
}
