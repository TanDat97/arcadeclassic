import { Auth } from '../middleware/auth';
import { Constant } from '../config/constant';

require('express-group-routes');

export default app => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Codebase API!',
    })
  );

  app.get('/healthz', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Houzez API!',
    })
  );

  // app.all('*', Auth.verifyToken, ClientMiddleware.setAdminClient);
};
