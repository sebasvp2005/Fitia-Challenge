import * as functions from '@google-cloud/functions-framework';
import { getPlan } from './routes/getPlan';
import { getFoods } from './routes/getFoods';

functions.http('fitia-challenge-api', async (req: functions.Request, res: functions.Response) => {
  
  try {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    // Get the request path
    const path = req.url;

    switch (path) {
      case '/getFoods': 
        getFoods(req, res);
        break;
      case '/getPlan':
        getPlan(req, res);
        break;

      default:
        
        res.status(404).send('Not Found');
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});
