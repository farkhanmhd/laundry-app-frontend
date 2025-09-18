import { Elysia } from "elysia";
declare const app: Elysia<"", {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {
        Import: <Key extends never>(key: Key, options?: import("@sinclair/typebox").SchemaOptions) => import("@sinclair/typebox").TImport<{}, Key>;
        readonly succesResponse: import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TLiteral<"success">;
            message: import("@sinclair/typebox").TString;
        }>;
        readonly failedResponse: import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TLiteral<"failed">;
            message: import("@sinclair/typebox").TString;
        }>;
        readonly createChatBody: import("@sinclair/typebox").TObject<{
            userId: import("@sinclair/typebox").TString;
            participantId: import("@sinclair/typebox").TString;
        }>;
        readonly createChatResponse: import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TLiteral<"success">;
            message: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
            }>;
        }>;
        readonly newMessage: import("@sinclair/typebox").TObject<{
            message: import("@sinclair/typebox").TString;
        }>;
        readonly messageResponse: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
            authorId: import("@sinclair/typebox").TString;
            content: import("@sinclair/typebox").TString;
        }>;
        readonly chatListUpdate: import("@sinclair/typebox").TObject<{
            chatId: import("@sinclair/typebox").TString;
            lastMessage: import("@sinclair/typebox").TString;
            lastMessageTime: import("@sinclair/typebox").TString;
        }>;
        readonly getUserResponse: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
        }>;
        readonly addProduct: import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TString;
            image: import("@sinclair/typebox").TUnsafe<File>;
            price: import("@sinclair/typebox").TNumber;
            currentQuantity: import("@sinclair/typebox").TNumber;
            reorderPoint: import("@sinclair/typebox").TNumber;
        }>;
        readonly addProductResponse: import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TLiteral<"success">;
            message: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
            }>;
        }>;
        readonly getProducts: import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TLiteral<"success">;
            message: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                name: import("@sinclair/typebox").TString;
                image: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                price: import("@sinclair/typebox").TInteger;
                currentQuantity: import("@sinclair/typebox").TInteger;
                reorderPoint: import("@sinclair/typebox").TInteger;
            }>>;
        }>;
        readonly updateProduct: import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TString;
            price: import("@sinclair/typebox").TNumber;
            reorderPoint: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>;
        readonly updateProductImage: import("@sinclair/typebox").TObject<{
            image: import("@sinclair/typebox").TUnsafe<File>;
        }>;
        readonly adjustQuantity: import("@sinclair/typebox").TObject<{
            newQuantity: import("@sinclair/typebox").TNumber;
            reason: import("@sinclair/typebox").TString;
        }>;
    };
    error: {
        readonly INTERNAL_ERROR: import("./exceptions").InternalError;
        readonly NOT_FOUND_RESOURCE: import("./exceptions").NotFoundError;
        readonly UNAUTHORIZED: import("./exceptions").AuthorizationError;
    };
}, {
    schema: {
        body: unknown;
        headers: unknown;
        query: unknown;
        params: {};
        cookie: unknown;
        response: {};
    };
    standaloneSchema: {};
    macro: {
        readonly auth?: boolean | undefined;
        readonly isAdmin?: boolean | undefined;
    };
    macroFn: {
        readonly auth: {
            readonly resolve: ({ request: { headers } }: {
                body: unknown;
                query: Record<string, string>;
                params: Record<string, string>;
                headers: Record<string, string | undefined>;
                cookie: Record<string, import("elysia").Cookie<string | undefined>>;
                server: import("elysia/dist/universal/server").Server | null;
                redirect: import("elysia").redirect;
                set: {
                    headers: import("elysia").HTTPHeaders;
                    status?: number | keyof import("elysia").StatusMap;
                    redirect?: string;
                    cookie?: Record<string, import("elysia/dist/cookies").ElysiaCookie>;
                };
                path: string;
                route: string;
                request: Request;
                store: {};
                status: <const Code extends number | keyof import("elysia").StatusMap, const T = Code extends 200 | 400 | 100 | 101 | 102 | 103 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 300 | 301 | 302 | 303 | 304 | 307 | 308 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 ? {
                    readonly 100: "Continue";
                    readonly 101: "Switching Protocols";
                    readonly 102: "Processing";
                    readonly 103: "Early Hints";
                    readonly 200: "OK";
                    readonly 201: "Created";
                    readonly 202: "Accepted";
                    readonly 203: "Non-Authoritative Information";
                    readonly 204: "No Content";
                    readonly 205: "Reset Content";
                    readonly 206: "Partial Content";
                    readonly 207: "Multi-Status";
                    readonly 208: "Already Reported";
                    readonly 300: "Multiple Choices";
                    readonly 301: "Moved Permanently";
                    readonly 302: "Found";
                    readonly 303: "See Other";
                    readonly 304: "Not Modified";
                    readonly 307: "Temporary Redirect";
                    readonly 308: "Permanent Redirect";
                    readonly 400: "Bad Request";
                    readonly 401: "Unauthorized";
                    readonly 402: "Payment Required";
                    readonly 403: "Forbidden";
                    readonly 404: "Not Found";
                    readonly 405: "Method Not Allowed";
                    readonly 406: "Not Acceptable";
                    readonly 407: "Proxy Authentication Required";
                    readonly 408: "Request Timeout";
                    readonly 409: "Conflict";
                    readonly 410: "Gone";
                    readonly 411: "Length Required";
                    readonly 412: "Precondition Failed";
                    readonly 413: "Payload Too Large";
                    readonly 414: "URI Too Long";
                    readonly 415: "Unsupported Media Type";
                    readonly 416: "Range Not Satisfiable";
                    readonly 417: "Expectation Failed";
                    readonly 418: "I'm a teapot";
                    readonly 421: "Misdirected Request";
                    readonly 422: "Unprocessable Content";
                    readonly 423: "Locked";
                    readonly 424: "Failed Dependency";
                    readonly 425: "Too Early";
                    readonly 426: "Upgrade Required";
                    readonly 428: "Precondition Required";
                    readonly 429: "Too Many Requests";
                    readonly 431: "Request Header Fields Too Large";
                    readonly 451: "Unavailable For Legal Reasons";
                    readonly 500: "Internal Server Error";
                    readonly 501: "Not Implemented";
                    readonly 502: "Bad Gateway";
                    readonly 503: "Service Unavailable";
                    readonly 504: "Gateway Timeout";
                    readonly 505: "HTTP Version Not Supported";
                    readonly 506: "Variant Also Negotiates";
                    readonly 507: "Insufficient Storage";
                    readonly 508: "Loop Detected";
                    readonly 510: "Not Extended";
                    readonly 511: "Network Authentication Required";
                }[Code] : Code>(code: Code, response?: T) => import("elysia").ElysiaCustomStatusResponse<Code, T, Code extends "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required" ? {
                    readonly Continue: 100;
                    readonly "Switching Protocols": 101;
                    readonly Processing: 102;
                    readonly "Early Hints": 103;
                    readonly OK: 200;
                    readonly Created: 201;
                    readonly Accepted: 202;
                    readonly "Non-Authoritative Information": 203;
                    readonly "No Content": 204;
                    readonly "Reset Content": 205;
                    readonly "Partial Content": 206;
                    readonly "Multi-Status": 207;
                    readonly "Already Reported": 208;
                    readonly "Multiple Choices": 300;
                    readonly "Moved Permanently": 301;
                    readonly Found: 302;
                    readonly "See Other": 303;
                    readonly "Not Modified": 304;
                    readonly "Temporary Redirect": 307;
                    readonly "Permanent Redirect": 308;
                    readonly "Bad Request": 400;
                    readonly Unauthorized: 401;
                    readonly "Payment Required": 402;
                    readonly Forbidden: 403;
                    readonly "Not Found": 404;
                    readonly "Method Not Allowed": 405;
                    readonly "Not Acceptable": 406;
                    readonly "Proxy Authentication Required": 407;
                    readonly "Request Timeout": 408;
                    readonly Conflict: 409;
                    readonly Gone: 410;
                    readonly "Length Required": 411;
                    readonly "Precondition Failed": 412;
                    readonly "Payload Too Large": 413;
                    readonly "URI Too Long": 414;
                    readonly "Unsupported Media Type": 415;
                    readonly "Range Not Satisfiable": 416;
                    readonly "Expectation Failed": 417;
                    readonly "I'm a teapot": 418;
                    readonly "Misdirected Request": 421;
                    readonly "Unprocessable Content": 422;
                    readonly Locked: 423;
                    readonly "Failed Dependency": 424;
                    readonly "Too Early": 425;
                    readonly "Upgrade Required": 426;
                    readonly "Precondition Required": 428;
                    readonly "Too Many Requests": 429;
                    readonly "Request Header Fields Too Large": 431;
                    readonly "Unavailable For Legal Reasons": 451;
                    readonly "Internal Server Error": 500;
                    readonly "Not Implemented": 501;
                    readonly "Bad Gateway": 502;
                    readonly "Service Unavailable": 503;
                    readonly "Gateway Timeout": 504;
                    readonly "HTTP Version Not Supported": 505;
                    readonly "Variant Also Negotiates": 506;
                    readonly "Insufficient Storage": 507;
                    readonly "Loop Detected": 508;
                    readonly "Not Extended": 510;
                    readonly "Network Authentication Required": 511;
                }[Code] : Code>;
                error: <const Code extends number | keyof import("elysia").StatusMap, const T = Code extends 200 | 400 | 100 | 101 | 102 | 103 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 300 | 301 | 302 | 303 | 304 | 307 | 308 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 ? {
                    readonly 100: "Continue";
                    readonly 101: "Switching Protocols";
                    readonly 102: "Processing";
                    readonly 103: "Early Hints";
                    readonly 200: "OK";
                    readonly 201: "Created";
                    readonly 202: "Accepted";
                    readonly 203: "Non-Authoritative Information";
                    readonly 204: "No Content";
                    readonly 205: "Reset Content";
                    readonly 206: "Partial Content";
                    readonly 207: "Multi-Status";
                    readonly 208: "Already Reported";
                    readonly 300: "Multiple Choices";
                    readonly 301: "Moved Permanently";
                    readonly 302: "Found";
                    readonly 303: "See Other";
                    readonly 304: "Not Modified";
                    readonly 307: "Temporary Redirect";
                    readonly 308: "Permanent Redirect";
                    readonly 400: "Bad Request";
                    readonly 401: "Unauthorized";
                    readonly 402: "Payment Required";
                    readonly 403: "Forbidden";
                    readonly 404: "Not Found";
                    readonly 405: "Method Not Allowed";
                    readonly 406: "Not Acceptable";
                    readonly 407: "Proxy Authentication Required";
                    readonly 408: "Request Timeout";
                    readonly 409: "Conflict";
                    readonly 410: "Gone";
                    readonly 411: "Length Required";
                    readonly 412: "Precondition Failed";
                    readonly 413: "Payload Too Large";
                    readonly 414: "URI Too Long";
                    readonly 415: "Unsupported Media Type";
                    readonly 416: "Range Not Satisfiable";
                    readonly 417: "Expectation Failed";
                    readonly 418: "I'm a teapot";
                    readonly 421: "Misdirected Request";
                    readonly 422: "Unprocessable Content";
                    readonly 423: "Locked";
                    readonly 424: "Failed Dependency";
                    readonly 425: "Too Early";
                    readonly 426: "Upgrade Required";
                    readonly 428: "Precondition Required";
                    readonly 429: "Too Many Requests";
                    readonly 431: "Request Header Fields Too Large";
                    readonly 451: "Unavailable For Legal Reasons";
                    readonly 500: "Internal Server Error";
                    readonly 501: "Not Implemented";
                    readonly 502: "Bad Gateway";
                    readonly 503: "Service Unavailable";
                    readonly 504: "Gateway Timeout";
                    readonly 505: "HTTP Version Not Supported";
                    readonly 506: "Variant Also Negotiates";
                    readonly 507: "Insufficient Storage";
                    readonly 508: "Loop Detected";
                    readonly 510: "Not Extended";
                    readonly 511: "Network Authentication Required";
                }[Code] : Code>(code: Code, response?: T) => import("elysia").ElysiaCustomStatusResponse<Code, T, Code extends "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required" ? {
                    readonly Continue: 100;
                    readonly "Switching Protocols": 101;
                    readonly Processing: 102;
                    readonly "Early Hints": 103;
                    readonly OK: 200;
                    readonly Created: 201;
                    readonly Accepted: 202;
                    readonly "Non-Authoritative Information": 203;
                    readonly "No Content": 204;
                    readonly "Reset Content": 205;
                    readonly "Partial Content": 206;
                    readonly "Multi-Status": 207;
                    readonly "Already Reported": 208;
                    readonly "Multiple Choices": 300;
                    readonly "Moved Permanently": 301;
                    readonly Found: 302;
                    readonly "See Other": 303;
                    readonly "Not Modified": 304;
                    readonly "Temporary Redirect": 307;
                    readonly "Permanent Redirect": 308;
                    readonly "Bad Request": 400;
                    readonly Unauthorized: 401;
                    readonly "Payment Required": 402;
                    readonly Forbidden: 403;
                    readonly "Not Found": 404;
                    readonly "Method Not Allowed": 405;
                    readonly "Not Acceptable": 406;
                    readonly "Proxy Authentication Required": 407;
                    readonly "Request Timeout": 408;
                    readonly Conflict: 409;
                    readonly Gone: 410;
                    readonly "Length Required": 411;
                    readonly "Precondition Failed": 412;
                    readonly "Payload Too Large": 413;
                    readonly "URI Too Long": 414;
                    readonly "Unsupported Media Type": 415;
                    readonly "Range Not Satisfiable": 416;
                    readonly "Expectation Failed": 417;
                    readonly "I'm a teapot": 418;
                    readonly "Misdirected Request": 421;
                    readonly "Unprocessable Content": 422;
                    readonly Locked: 423;
                    readonly "Failed Dependency": 424;
                    readonly "Too Early": 425;
                    readonly "Upgrade Required": 426;
                    readonly "Precondition Required": 428;
                    readonly "Too Many Requests": 429;
                    readonly "Request Header Fields Too Large": 431;
                    readonly "Unavailable For Legal Reasons": 451;
                    readonly "Internal Server Error": 500;
                    readonly "Not Implemented": 501;
                    readonly "Bad Gateway": 502;
                    readonly "Service Unavailable": 503;
                    readonly "Gateway Timeout": 504;
                    readonly "HTTP Version Not Supported": 505;
                    readonly "Variant Also Negotiates": 506;
                    readonly "Insufficient Storage": 507;
                    readonly "Loop Detected": 508;
                    readonly "Not Extended": 510;
                    readonly "Network Authentication Required": 511;
                }[Code] : Code>;
            }) => Promise<{
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    role: string;
                    username?: string | null | undefined;
                    displayUsername?: string | null | undefined;
                };
                session: {
                    id: string;
                    userId: string;
                    expiresAt: Date;
                    createdAt: Date;
                    updatedAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                };
            }>;
        };
        readonly isAdmin: {
            readonly resolve: ({ request: { headers } }: {
                body: unknown;
                query: Record<string, string>;
                params: Record<string, string>;
                headers: Record<string, string | undefined>;
                cookie: Record<string, import("elysia").Cookie<string | undefined>>;
                server: import("elysia/dist/universal/server").Server | null;
                redirect: import("elysia").redirect;
                set: {
                    headers: import("elysia").HTTPHeaders;
                    status?: number | keyof import("elysia").StatusMap;
                    redirect?: string;
                    cookie?: Record<string, import("elysia/dist/cookies").ElysiaCookie>;
                };
                path: string;
                route: string;
                request: Request;
                store: {};
                status: <const Code extends number | keyof import("elysia").StatusMap, const T = Code extends 200 | 400 | 100 | 101 | 102 | 103 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 300 | 301 | 302 | 303 | 304 | 307 | 308 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 ? {
                    readonly 100: "Continue";
                    readonly 101: "Switching Protocols";
                    readonly 102: "Processing";
                    readonly 103: "Early Hints";
                    readonly 200: "OK";
                    readonly 201: "Created";
                    readonly 202: "Accepted";
                    readonly 203: "Non-Authoritative Information";
                    readonly 204: "No Content";
                    readonly 205: "Reset Content";
                    readonly 206: "Partial Content";
                    readonly 207: "Multi-Status";
                    readonly 208: "Already Reported";
                    readonly 300: "Multiple Choices";
                    readonly 301: "Moved Permanently";
                    readonly 302: "Found";
                    readonly 303: "See Other";
                    readonly 304: "Not Modified";
                    readonly 307: "Temporary Redirect";
                    readonly 308: "Permanent Redirect";
                    readonly 400: "Bad Request";
                    readonly 401: "Unauthorized";
                    readonly 402: "Payment Required";
                    readonly 403: "Forbidden";
                    readonly 404: "Not Found";
                    readonly 405: "Method Not Allowed";
                    readonly 406: "Not Acceptable";
                    readonly 407: "Proxy Authentication Required";
                    readonly 408: "Request Timeout";
                    readonly 409: "Conflict";
                    readonly 410: "Gone";
                    readonly 411: "Length Required";
                    readonly 412: "Precondition Failed";
                    readonly 413: "Payload Too Large";
                    readonly 414: "URI Too Long";
                    readonly 415: "Unsupported Media Type";
                    readonly 416: "Range Not Satisfiable";
                    readonly 417: "Expectation Failed";
                    readonly 418: "I'm a teapot";
                    readonly 421: "Misdirected Request";
                    readonly 422: "Unprocessable Content";
                    readonly 423: "Locked";
                    readonly 424: "Failed Dependency";
                    readonly 425: "Too Early";
                    readonly 426: "Upgrade Required";
                    readonly 428: "Precondition Required";
                    readonly 429: "Too Many Requests";
                    readonly 431: "Request Header Fields Too Large";
                    readonly 451: "Unavailable For Legal Reasons";
                    readonly 500: "Internal Server Error";
                    readonly 501: "Not Implemented";
                    readonly 502: "Bad Gateway";
                    readonly 503: "Service Unavailable";
                    readonly 504: "Gateway Timeout";
                    readonly 505: "HTTP Version Not Supported";
                    readonly 506: "Variant Also Negotiates";
                    readonly 507: "Insufficient Storage";
                    readonly 508: "Loop Detected";
                    readonly 510: "Not Extended";
                    readonly 511: "Network Authentication Required";
                }[Code] : Code>(code: Code, response?: T) => import("elysia").ElysiaCustomStatusResponse<Code, T, Code extends "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required" ? {
                    readonly Continue: 100;
                    readonly "Switching Protocols": 101;
                    readonly Processing: 102;
                    readonly "Early Hints": 103;
                    readonly OK: 200;
                    readonly Created: 201;
                    readonly Accepted: 202;
                    readonly "Non-Authoritative Information": 203;
                    readonly "No Content": 204;
                    readonly "Reset Content": 205;
                    readonly "Partial Content": 206;
                    readonly "Multi-Status": 207;
                    readonly "Already Reported": 208;
                    readonly "Multiple Choices": 300;
                    readonly "Moved Permanently": 301;
                    readonly Found: 302;
                    readonly "See Other": 303;
                    readonly "Not Modified": 304;
                    readonly "Temporary Redirect": 307;
                    readonly "Permanent Redirect": 308;
                    readonly "Bad Request": 400;
                    readonly Unauthorized: 401;
                    readonly "Payment Required": 402;
                    readonly Forbidden: 403;
                    readonly "Not Found": 404;
                    readonly "Method Not Allowed": 405;
                    readonly "Not Acceptable": 406;
                    readonly "Proxy Authentication Required": 407;
                    readonly "Request Timeout": 408;
                    readonly Conflict: 409;
                    readonly Gone: 410;
                    readonly "Length Required": 411;
                    readonly "Precondition Failed": 412;
                    readonly "Payload Too Large": 413;
                    readonly "URI Too Long": 414;
                    readonly "Unsupported Media Type": 415;
                    readonly "Range Not Satisfiable": 416;
                    readonly "Expectation Failed": 417;
                    readonly "I'm a teapot": 418;
                    readonly "Misdirected Request": 421;
                    readonly "Unprocessable Content": 422;
                    readonly Locked: 423;
                    readonly "Failed Dependency": 424;
                    readonly "Too Early": 425;
                    readonly "Upgrade Required": 426;
                    readonly "Precondition Required": 428;
                    readonly "Too Many Requests": 429;
                    readonly "Request Header Fields Too Large": 431;
                    readonly "Unavailable For Legal Reasons": 451;
                    readonly "Internal Server Error": 500;
                    readonly "Not Implemented": 501;
                    readonly "Bad Gateway": 502;
                    readonly "Service Unavailable": 503;
                    readonly "Gateway Timeout": 504;
                    readonly "HTTP Version Not Supported": 505;
                    readonly "Variant Also Negotiates": 506;
                    readonly "Insufficient Storage": 507;
                    readonly "Loop Detected": 508;
                    readonly "Not Extended": 510;
                    readonly "Network Authentication Required": 511;
                }[Code] : Code>;
                error: <const Code extends number | keyof import("elysia").StatusMap, const T = Code extends 200 | 400 | 100 | 101 | 102 | 103 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 300 | 301 | 302 | 303 | 304 | 307 | 308 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 ? {
                    readonly 100: "Continue";
                    readonly 101: "Switching Protocols";
                    readonly 102: "Processing";
                    readonly 103: "Early Hints";
                    readonly 200: "OK";
                    readonly 201: "Created";
                    readonly 202: "Accepted";
                    readonly 203: "Non-Authoritative Information";
                    readonly 204: "No Content";
                    readonly 205: "Reset Content";
                    readonly 206: "Partial Content";
                    readonly 207: "Multi-Status";
                    readonly 208: "Already Reported";
                    readonly 300: "Multiple Choices";
                    readonly 301: "Moved Permanently";
                    readonly 302: "Found";
                    readonly 303: "See Other";
                    readonly 304: "Not Modified";
                    readonly 307: "Temporary Redirect";
                    readonly 308: "Permanent Redirect";
                    readonly 400: "Bad Request";
                    readonly 401: "Unauthorized";
                    readonly 402: "Payment Required";
                    readonly 403: "Forbidden";
                    readonly 404: "Not Found";
                    readonly 405: "Method Not Allowed";
                    readonly 406: "Not Acceptable";
                    readonly 407: "Proxy Authentication Required";
                    readonly 408: "Request Timeout";
                    readonly 409: "Conflict";
                    readonly 410: "Gone";
                    readonly 411: "Length Required";
                    readonly 412: "Precondition Failed";
                    readonly 413: "Payload Too Large";
                    readonly 414: "URI Too Long";
                    readonly 415: "Unsupported Media Type";
                    readonly 416: "Range Not Satisfiable";
                    readonly 417: "Expectation Failed";
                    readonly 418: "I'm a teapot";
                    readonly 421: "Misdirected Request";
                    readonly 422: "Unprocessable Content";
                    readonly 423: "Locked";
                    readonly 424: "Failed Dependency";
                    readonly 425: "Too Early";
                    readonly 426: "Upgrade Required";
                    readonly 428: "Precondition Required";
                    readonly 429: "Too Many Requests";
                    readonly 431: "Request Header Fields Too Large";
                    readonly 451: "Unavailable For Legal Reasons";
                    readonly 500: "Internal Server Error";
                    readonly 501: "Not Implemented";
                    readonly 502: "Bad Gateway";
                    readonly 503: "Service Unavailable";
                    readonly 504: "Gateway Timeout";
                    readonly 505: "HTTP Version Not Supported";
                    readonly 506: "Variant Also Negotiates";
                    readonly 507: "Insufficient Storage";
                    readonly 508: "Loop Detected";
                    readonly 510: "Not Extended";
                    readonly 511: "Network Authentication Required";
                }[Code] : Code>(code: Code, response?: T) => import("elysia").ElysiaCustomStatusResponse<Code, T, Code extends "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required" ? {
                    readonly Continue: 100;
                    readonly "Switching Protocols": 101;
                    readonly Processing: 102;
                    readonly "Early Hints": 103;
                    readonly OK: 200;
                    readonly Created: 201;
                    readonly Accepted: 202;
                    readonly "Non-Authoritative Information": 203;
                    readonly "No Content": 204;
                    readonly "Reset Content": 205;
                    readonly "Partial Content": 206;
                    readonly "Multi-Status": 207;
                    readonly "Already Reported": 208;
                    readonly "Multiple Choices": 300;
                    readonly "Moved Permanently": 301;
                    readonly Found: 302;
                    readonly "See Other": 303;
                    readonly "Not Modified": 304;
                    readonly "Temporary Redirect": 307;
                    readonly "Permanent Redirect": 308;
                    readonly "Bad Request": 400;
                    readonly Unauthorized: 401;
                    readonly "Payment Required": 402;
                    readonly Forbidden: 403;
                    readonly "Not Found": 404;
                    readonly "Method Not Allowed": 405;
                    readonly "Not Acceptable": 406;
                    readonly "Proxy Authentication Required": 407;
                    readonly "Request Timeout": 408;
                    readonly Conflict: 409;
                    readonly Gone: 410;
                    readonly "Length Required": 411;
                    readonly "Precondition Failed": 412;
                    readonly "Payload Too Large": 413;
                    readonly "URI Too Long": 414;
                    readonly "Unsupported Media Type": 415;
                    readonly "Range Not Satisfiable": 416;
                    readonly "Expectation Failed": 417;
                    readonly "I'm a teapot": 418;
                    readonly "Misdirected Request": 421;
                    readonly "Unprocessable Content": 422;
                    readonly Locked: 423;
                    readonly "Failed Dependency": 424;
                    readonly "Too Early": 425;
                    readonly "Upgrade Required": 426;
                    readonly "Precondition Required": 428;
                    readonly "Too Many Requests": 429;
                    readonly "Request Header Fields Too Large": 431;
                    readonly "Unavailable For Legal Reasons": 451;
                    readonly "Internal Server Error": 500;
                    readonly "Not Implemented": 501;
                    readonly "Bad Gateway": 502;
                    readonly "Service Unavailable": 503;
                    readonly "Gateway Timeout": 504;
                    readonly "HTTP Version Not Supported": 505;
                    readonly "Variant Also Negotiates": 506;
                    readonly "Insufficient Storage": 507;
                    readonly "Loop Detected": 508;
                    readonly "Not Extended": 510;
                    readonly "Network Authentication Required": 511;
                }[Code] : Code>;
            }) => Promise<{
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    role: string;
                    username?: string | null | undefined;
                    displayUsername?: string | null | undefined;
                };
                session: {
                    id: string;
                    userId: string;
                    expiresAt: Date;
                    createdAt: Date;
                    updatedAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                };
            }>;
        };
    };
    parser: {};
}, {
    [x: string]: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: string;
            };
        };
    };
} & {
    chat: {};
} & {
    chat: {
        user: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        readonly status: "success";
                        readonly message: "User retrieved";
                        readonly data: {
                            id: string;
                            name: string;
                        }[];
                    };
                };
            };
        };
    };
} & {
    chat: {
        list: {
            subscribe: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    chatId: string;
                    lastMessage: string;
                    lastMessageTime: string;
                };
            };
        };
    };
} & {
    chat: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    readonly status: "success";
                    readonly message: "Chat list retrieved";
                    readonly data: {
                        chatId: string | null;
                        recipientName: string;
                        recipientImage: string | null;
                        lastMessage: string | null;
                        lastMessageTime: string | null;
                    }[];
                };
            };
        };
    };
} & {
    chat: {
        post: {
            body: {
                userId: string;
                participantId: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    readonly status: "success";
                    readonly message: "Chat ID Retrieved";
                    readonly data: {
                        readonly id: string;
                    };
                };
                201: {
                    readonly status: "created";
                    readonly message: "New Chat ID Created";
                    readonly data: {
                        readonly id: string;
                    };
                };
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    chat: {
        ":id": {
            get: {
                body: unknown;
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        readonly status: "success";
                        readonly message: "Messages retrieved";
                        readonly data: {
                            id: string;
                            content: string;
                            authorId: string;
                            createdAt: string;
                        }[];
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    chat: {
        ":id": {
            subscribe: {
                body: {
                    message: string;
                };
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    id: string;
                    createdAt: string;
                    authorId: string;
                    content: string;
                };
            };
        };
    };
} & {
    products: {};
} & {
    products: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    data: {
                        id: string;
                        name: string;
                        image: string | null;
                        price: number;
                        currentQuantity: number;
                        reorderPoint: number;
                    }[];
                    status: "success";
                    message: string;
                } & {
                    data: {
                        id: string;
                        name: string;
                        image: string | null;
                        price: number;
                        currentQuantity: number;
                        reorderPoint: number;
                    }[];
                    status: "success";
                    message: string;
                };
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    products: {
        post: {
            body: {
                name: string;
                image: File;
                price: number;
                currentQuantity: number;
                reorderPoint: number;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: never;
                201: {
                    status: "success";
                    message: string;
                    data: {
                        id: string;
                    };
                } & {
                    data: {
                        id: string;
                    };
                    status: "success";
                    message: string;
                };
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    products: {
        ":id": {
            patch: {
                body: {
                    reorderPoint?: number | undefined;
                    name: string;
                    price: number;
                };
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        readonly status: "success";
                        readonly message: "Product updated";
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    products: {
        ":id": {
            image: {
                patch: {
                    body: {
                        image: File;
                    };
                    params: {
                        id: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            readonly status: "success";
                            readonly message: "Product updated";
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    products: {
        ":id": {
            stock: {
                patch: {
                    body: {
                        newQuantity: number;
                        reason: string;
                    };
                    params: {
                        id: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            readonly status: "success";
                            readonly message: "Quantity Updated";
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    products: {
        ":id": {
            delete: {
                body: unknown;
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        readonly status: "success";
                        readonly message: "Product deleted";
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    uploads: {
        ":name": {
            get: {
                body: unknown;
                params: {
                    name: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: File;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}>;
export type App = typeof app;
export {};
