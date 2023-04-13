
import { app } from 'codehooks-js'
import { crudlify } from 'codehooks-crudlify'
import { date, object, string, array, boolean } from 'yup';

// SCHEMAS
const todoSchema = object({
  content: string().required(),
  done: boolean().required().default(() => false),
  userId: string().required(),
  date: date().default(() => new Date())
})

// ROUTES
// taken directly from kluver's example
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      // not real validation since codehooks does it
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  }
}
app.use(userAuth)

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, { todo: todoSchema });

// bind to serverless runtime
export default app.init();
