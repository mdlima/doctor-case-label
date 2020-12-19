import { Router } from 'express';
import CaseService from '../services/CaseService';

const casesRouter = Router();

export async function findCaseToReview(req, res) {
  const caseToReview = await CaseService.findNextToReview() || {};
  return res.status(200).json(caseToReview);
}

export async function casePatch(req, res) {
  try {
    await CaseService.patchCase(req.params.id, req.body);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
}

casesRouter.get('/nextToReview', findCaseToReview);
casesRouter.patch('/id/:id', casePatch);

export default casesRouter;
