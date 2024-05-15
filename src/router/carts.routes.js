import { Router } from "express";
import { randomUUID } from 'crypto';

const router = Router();


const newId = randomUUID();


export default router;