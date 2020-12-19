import { Router } from 'express';
import ConditionService from '../services/ConditionService';

const conditionsRouter = Router();

export async function conditionsList(req, res) {
  const conditions = await ConditionService.list();
  res.status(200).json(conditions);
}

conditionsRouter.get('/', conditionsList);

export default conditionsRouter;
