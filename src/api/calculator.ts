import express, { Request, Response } from 'express';
import { StatusCode } from '../enum/statusCode';
import StringCalculator from '../controller/calculator';
import { DataTypes } from '../enum/dataTypes';
import { ErrorMessages } from '../enum/errorMessages';
import { successMessages } from '../enum/successMessages';

const router = express.Router();
export default router;

router.post('/calculator/add', async function(req: Request, res: any, next: any) {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(StatusCode.BADREQUEST).json({ success: false, statusCode : StatusCode.BADREQUEST, message: ErrorMessages.BODYMISSING });
        }
        if (!req.body.numberString) {
            return res.status(StatusCode.BADREQUEST).json({ success: false, statusCode : StatusCode.BADREQUEST, message: ErrorMessages.NUMBERSTRINGMISSING });
        }
        if (typeof req.body.numberString !== DataTypes.STRING) {
            return res.status(StatusCode.BADREQUEST).json({ success: false, statusCode : StatusCode.BADREQUEST, message: ErrorMessages.INVALIDDATATYPE });
        }
        const addResult: any = StringCalculator.add(req.body.numberString);
        if (!addResult) {
            return addResult;
        }
        return res.status(StatusCode.SUCCESS).json({ addition : addResult, success: true, statusCode : StatusCode.SUCCESS, message: successMessages.SUCCESS });
    } catch (error) {
        return res.status(StatusCode.SERVERERROR).json({ success: false, statusCode : StatusCode.SERVERERROR, message: ErrorMessages.SERVERERROR });
    }
});