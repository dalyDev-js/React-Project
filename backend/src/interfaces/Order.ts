import { Date } from "mongoose";

export interface Order {
    number: number,
    customerId: number,
    total: number,
    createdBy: number,
    createdAt: Date,
};
