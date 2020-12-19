import { Router } from 'express';
import UserService from '../services/UserService';

const usersRouter = Router();

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const loggedInUser = await UserService.login({ email, password });

  if (loggedInUser) {
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json(loggedInUser);
  } else {
    res.status(401).send('Unauthorized');
  }
}

usersRouter.post('/login', userLogin);

export default usersRouter;
