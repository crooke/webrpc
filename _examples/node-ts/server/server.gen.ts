/* eslint-disable */
// node-ts v1.0.0 ecee5cfb3e360bc0bc632e78556b19a2c58d4e25
// --
// This file has been generated by https://github.com/webrpc/webrpc using gen/typescript
// Do not edit by hand. Update your webrpc schema and re-generate.

// WebRPC description and code-gen version
export const WebRPCVersion = "v1"

// Schema version of your RIDL schema
export const WebRPCSchemaVersion = "v1.0.0"

// Schema hash generated from your RIDL schema
export const WebRPCSchemaHash = "ecee5cfb3e360bc0bc632e78556b19a2c58d4e25"


//
// Types
//
type RpcError = {
  code:  ErrorCode
	msg:   string
	cause?: Error
}

enum ErrorCode {
	// Unknown error. For example when handling errors raised by APIs that do not
	// return enough error information.
	ErrUnknown = "unknown",

	// Fail error. General failure error type.
	ErrFail = "fail",

	// Canceled indicates the operation was cancelled (typically by the caller).
	ErrCanceled = "canceled",

	// InvalidArgument indicates client specified an invalid argument. It
	// indicates arguments that are problematic regardless of the state of the
	// system (i.e. a malformed file name, required argument, number out of range,
	// etc.).
	ErrInvalidArgument = "invalid argument",

	// DeadlineExceeded means operation expired before completion. For operations
	// that change the state of the system, this error may be returned even if the
	// operation has completed successfully (timeout).
	ErrDeadlineExceeded = "deadline exceeded",

	// NotFound means some requested entity was not found.
	ErrNotFound = "not found",

	// BadRoute means that the requested URL path wasn't routable to a webrpc
	// service and method. This is returned by the generated server, and usually
	// shouldn't be returned by applications. Instead, applications should use
	// NotFound or Unimplemented.
	ErrBadRoute = "bad route",

	// AlreadyExists means an attempt to create an entity failed because one
	// already exists.
	ErrAlreadyExists = "already exists",

	// PermissionDenied indicates the caller does not have permission to execute
	// the specified operation. It must not be used if the caller cannot be
	// identified (Unauthenticated).
	ErrPermissionDenied = "permission denied",

	// Unauthenticated indicates the request does not have valid authentication
	// credentials for the operation.
	ErrUnauthenticated = "unauthenticated",

	// ResourceExhausted indicates some resource has been exhausted, perhaps a
	// per-user quota, or perhaps the entire file system is out of space.
	ErrResourceExhausted = "resource exhausted",

	// FailedPrecondition indicates operation was rejected because the system is
	// not in a state required for the operation's execution. For example, doing
	// an rmdir operation on a directory that is non-empty, or on a non-directory
	// object, or when having conflicting read-modify-write on the same resource.
	ErrFailedPrecondition = "failed precondition",

	// Aborted indicates the operation was aborted, typically due to a concurrency
	// issue like sequencer check failures, transaction aborts, etc.
	ErrAborted = "aborted",

	// OutOfRange means operation was attempted past the valid range. For example,
	// seeking or reading past end of a paginated collection.
	//
	// Unlike InvalidArgument, this error indicates a problem that may be fixed if
	// the system state changes (i.e. adding more items to the collection).
	//
	// There is a fair bit of overlap between FailedPrecondition and OutOfRange.
	// We recommend using OutOfRange (the more specific error) when it applies so
	// that callers who are iterating through a space can easily look for an
	// OutOfRange error to detect when they are done.
	ErrOutOfRange = "out of range",

	// Unimplemented indicates operation is not implemented or not
	// supported/enabled in this service.
	ErrUnimplemented = "unimplemented",

	// Internal errors. When some invariants expected by the underlying system
	// have been broken. In other words, something bad happened in the library or
	// backend service. Do not confuse with HTTP Internal Server Error; an
	// Internal error could also happen on the client code, i.e. when parsing a
	// server response.
	ErrInternal = "internal",

	// Unavailable indicates the service is currently unavailable. This is a most
	// likely a transient condition and may be corrected by retrying with a
	// backoff.
	ErrUnavailable = "unavailable",

	// DataLoss indicates unrecoverable data loss or corruption.
	ErrDataLoss = "data loss",

	// ErrNone is the zero-value, is considered an empty error and should not be
	// used.
	ErrNone = "",
}

/** The JSON payload returned by an WebRPC server when an error occurs */
type ErrorPayload = {
	/** One of the valid error codes */ 
   code: string
	/** A human-readable, unstructured messages describing the error */ 
   msg: string
	/** The reason for the error */
	 cause?: string
  /** HTTP status code */
   status: number
	/** A string of the form "webrpc error <code>: <msg>" */ 
	 error: string
}

/** A native Javascript error representation of a WebRPC error */
export class WebRPCError extends Error {
  readonly err: RpcError;
  readonly cause: Error | undefined;

  constructor(err: RpcError) {
    super(err.msg);
    this.name = 'WebRPCError'
    // https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, WebRPCError.prototype);
    this.err = err;
    this.cause = err.cause;
  }

  toJSON() {
    const payload: ErrorPayload = {
      code: this.err.code,
      msg: this.err.msg,
      cause: this.err.cause ? this.err.cause.message : undefined,
      status: this.httpStatusFromErrorCode(),
      error: `webrpc error ${this.err.code}: {msg}`
    }
    return JSON.stringify(payload)
  }

  httpStatusFromErrorCode(): number {
  	switch (this.err.code) {
	    case ErrorCode.ErrCanceled:
	    	return 408 // RequestTimeout
	    case ErrorCode.ErrUnknown:
	    	return 400 // Bad Request
	    case ErrorCode.ErrFail:
	    	return 422 // Unprocessable Entity
	    case ErrorCode.ErrInvalidArgument:
	    	return 400 // BadRequest
	    case ErrorCode.ErrDeadlineExceeded:
	    	return 408 // RequestTimeout
	    case ErrorCode.ErrNotFound:
	    	return 404 // Not Found
	    case ErrorCode.ErrBadRoute:
	    	return 404 // Not Found
	    case ErrorCode.ErrAlreadyExists:
	    	return 409 // Conflict
	    case ErrorCode.ErrPermissionDenied:
	    	return 403 // Forbidden
	    case ErrorCode.ErrUnauthenticated:
	    	return 401 // Unauthorized
	    case ErrorCode.ErrResourceExhausted:
	    	return 403 // Forbidden
	    case ErrorCode.ErrFailedPrecondition:
	    	return 412 // Precondition Failed
	    case ErrorCode.ErrAborted:
	    	return 409 // Conflict
	    case ErrorCode.ErrOutOfRange:
	    	return 400 // Bad Request
	    case ErrorCode.ErrUnimplemented:
	    	return 501 // Not Implemented
	    case ErrorCode.ErrInternal:
	    	return 500 // Internal Server Error
	    case ErrorCode.ErrUnavailable:
	    	return 503 // Service Unavailable
	    case ErrorCode.ErrDataLoss:
	    	return 500 // Internal Server Error
	    case ErrorCode.ErrNone:
	    	return 200 // OK
	    default:
	    	return 0 // Invalid!
	  }
  }
}
export enum Kind {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number
  USERNAME: string
  role: Kind
  meta: {[key: string]: any}
  
  createdAt?: string
}

export interface Page {
  num: number
}

export interface ExampleService {
  ping(headers?: object): Promise<PingReturn>
  getUser(args: GetUserArgs, headers?: object): Promise<GetUserReturn>
}

export interface PingArgs {
}

export interface PingReturn {
  status: boolean  
}
export interface GetUserArgs {
  userID: number
}

export interface GetUserReturn {
  code: number
  user: User  
}


  
//
// Server
//

import express from 'express'
        
        

        export type ExampleServiceService = {
            
                Ping: (args: PingArgs) => PingReturn | Promise<PingReturn>
            
                GetUser: (args: GetUserArgs) => GetUserReturn | Promise<GetUserReturn>
            
        }

        export const createExampleServiceApp = (serviceImplementation: ExampleServiceService) => {
            const app = express();

            app.use(express.json())

            app.post('/*', async (req, res) => {
                const requestPath = req.baseUrl + req.path

                if (!req.body) {
                    res.status(400).send("webrpc error: missing body");

                    return
                }

                switch(requestPath) {
                    

                    case "/rpc/ExampleService/Ping": {                        
                        try {
                            

                            const response = await serviceImplementation["Ping"](req.body);

                            
                                if (!("status" in response)) {
                                    throw new WebRPCError({msg: "internal", code: ErrorCode.ErrInternal});
                                }
                            

                            res.status(200).json(response);
                        } catch (err) {
                            if (err instanceof WebRPCError) {
                                res.status(err.httpStatusFromErrorCode()).json(err);
                                return;
                            }
                            if (err.message) {
                                res.status(500).send(err.message);
                                return;
                            }
                            res.status(500).end();
                        }
                    }

                    return;
                    

                    case "/rpc/ExampleService/GetUser": {                        
                        try {
                            
                                if (!("userID" in req.body)) {
                                    throw new WebRPCError({msg: "Missing argument: userID", code: ErrorCode.ErrInvalidArgument})
                                }
                                if ("userID" in req.body && !validateType(req.body["userID"], "number")) {
                                    throw new WebRPCError({msg: "Invalid argument type: userID. Expected number.", code: ErrorCode.ErrInvalidArgument})
                                }
                            

                            const response = await serviceImplementation["GetUser"](req.body);

                            
                                if (!("code" in response)) {
                                    throw new WebRPCError({msg: "internal", code: ErrorCode.ErrInternal});
                                }
                            
                                if (!("user" in response)) {
                                    throw new WebRPCError({msg: "internal", code: ErrorCode.ErrInternal});
                                }
                            

                            res.status(200).json(response);
                        } catch (err) {
                            if (err instanceof WebRPCError) {
                                res.status(err.httpStatusFromErrorCode()).json(err);
                                return;
                            }
                            if (err.message) {
                                res.status(500).send(err.message);
                                return;
                            }
                            res.status(500).end();
                        }
                    }

                    return;
                    

                    default: {
                        res.status(404).end()
                    }
                }
            });

            return app;
        };

  

const JS_TYPES = [
    "bigint",
    "boolean",
    "function",
    "number",
    "object",
    "string",
    "symbol",
    "undefined"
]


    const validateKind = (value: any) => {
        
            
                if (!("USER" in value) || !validateType(value["USER"], "number")) {
                    return false
                }
            
        
            
                if (!("ADMIN" in value) || !validateType(value["ADMIN"], "number")) {
                    return false
                }
            
        

        return true
    }

    const validateUser = (value: any) => {
        
            
                if (!("id" in value) || !validateType(value["id"], "number")) {
                    return false
                }
            
        
            
                if (!("USERNAME" in value) || !validateType(value["USERNAME"], "string")) {
                    return false
                }
            
        
            
                if (!("role" in value) || !validateType(value["role"], "Kind")) {
                    return false
                }
            
        
            
                if (!("meta" in value) || !validateType(value["meta"], "object")) {
                    return false
                }
            
        
            
                if (!("-" in value) || !validateType(value["-"], "number")) {
                    return false
                }
            
        
            
                if ("createdAt" in value && !validateType(value["createdAt"], "string")) {
                    return false
                }
            
        

        return true
    }

    const validatePage = (value: any) => {
        
            
                if (!("num" in value) || !validateType(value["num"], "number")) {
                    return false
                }
            
        

        return true
    }


const TYPE_VALIDATORS: { [type: string]: (value: any) => boolean } = {
    
        Kind: validateKind,
    
        User: validateUser,
    
        Page: validatePage,
    
}

const validateType = (value: any, type: string) => {
    if (JS_TYPES.indexOf(type) > -1) {
        return typeof value === type;
    }

    const validator = TYPE_VALIDATORS[type];

    if (!validator) {
        return false;
    }

    return validator(value);
}

