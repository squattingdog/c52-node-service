import * as Express from "express";

export interface IReadController {
    retrieve: Express.RequestHandler;
    findById: Express.RequestHandler;
}