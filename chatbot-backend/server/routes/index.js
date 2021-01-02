import { Auth } from '../middleware/auth';
import { Constant } from '../config/constant';

import { AgentHandler } from '../components/agent/handler';

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

  app.group('/api/v1', apiV1 => {
    apiV1.get('/', (req, res) =>
      res.status(200).send({
        message: 'Welcome to the Codebase API!',
      })
    );

    apiV1.group('/agent', agent => {
      const agentHandler = new AgentHandler();
      agent.get('/', agentHandler.getList.bind(agentHandler));
      agent.get('/:uuid', agentHandler.getDetail.bind(agentHandler));
    });
  });
};
