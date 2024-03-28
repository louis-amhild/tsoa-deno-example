// WARNING: This file was auto-generated with tsoa for jsdom. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  fetchMiddlewares,
  HonoTemplateService,
  TsoaRoute,
  ValidateError,
  isTsoaContext
} from '@tsoa-deno/runtime';

import { assert } from "https://deno.land/std@0.64.0/_util/assert.ts";


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ImagesController } from './../images/images-controller.ts';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RootController } from './../example/example-controller.ts';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaController } from './../example/example-controller.ts';
import { Hono, Context as HonoContext, Next, HTTPException } from '@hono';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    'EmbeddingResponse': {
        dataType: 'refObject',
        properties: {
            'embedding': {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'EmbeddingRequest': {
        dataType: 'refObject',
        properties: {
            'input': {"dataType":"string"},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new HonoTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes<T extends Hono>(router: T) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    return router
        .get('/images', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(ImagesController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(ImagesController.prototype.rootGet)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                        url: {"in":"query","name":"url","dataType":"string"},
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new ImagesController();

                return templateService.apiHandler({
                  methodName: 'rootGet',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )        .get('/', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(RootController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(RootController.prototype.rootGet)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new RootController();

                return templateService.apiHandler({
                  methodName: 'rootGet',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )        .get('/example', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(TsoaController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(TsoaController.prototype.rootGet)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new TsoaController();

                return templateService.apiHandler({
                  methodName: 'rootGet',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )        .get('/example/test', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(TsoaController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(TsoaController.prototype.testGet)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new TsoaController();

                return templateService.apiHandler({
                  methodName: 'testGet',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )        .post('/example/test', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(TsoaController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(TsoaController.prototype.test)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                        body: {"in":"body","name":"body","required":true,"ref":"EmbeddingRequest"},
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new TsoaController();

                return templateService.apiHandler({
                  methodName: 'test',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )        .post('/example/test2', 
                async (honoCtx: HonoContext, next: Next) => {
                await templateService.getTsoaCompatContext(honoCtx);
                await next();
                },
                ...(fetchMiddlewares<any>(TsoaController)),
                // eslint-disable-next-line @typescript-eslint/unbound-method
                ...(fetchMiddlewares<any>(TsoaController.prototype.test2)),
               (context: HonoContext, next: Next) => {
                assert(isTsoaContext(context), "Hono context was not converted to TSOA compatible context");

                const args: Record<string, TsoaRoute.ParameterSchema> = {
                };

                let validatedArgs: any[] = [];
                try {
                  validatedArgs = templateService.getValidatedArgs({args, context, next});
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return context.json({ fields: err.fields }, err.status || 400);
                  }

                  return context.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }

                const controller = new TsoaController();

                return templateService.apiHandler({
                  methodName: 'test2',
                  controller,
                  context,
                  validatedArgs,
                  successStatus: undefined,
                });
              },
        )
}

