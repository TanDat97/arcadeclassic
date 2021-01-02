import { Auth } from '../middleware/auth';
import { Constant } from '../config/constant';

import { ProductHandler } from '../components/product/handler';

import { ProjectHandler } from '../components/project/handler';

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

    apiV1.group('/product', product => {
      const productHandler = new ProductHandler();
      product.get('/', productHandler.getList.bind(productHandler));
      product.get('/:slug', productHandler.getDetail.bind(productHandler));
    });

    apiV1.group('/project', project => {
      const projectHandler = new ProjectHandler();
      project.get('/', projectHandler.getList.bind(projectHandler));
      project.get(
        '/data-filter',
        projectHandler.getDataFilter.bind(projectHandler)
      );
      project.get('/:slug', projectHandler.getDetail.bind(projectHandler));
    });
  });
};
