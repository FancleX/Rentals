const express            = require("express"),
      cors               = require('cors'),
      userRouter         = require('./routes/userRoutes'),
      propertyRouter     = require('./routes/propertyRoutes'),
      notificationRouter = require('./routes/notificationRoutes'),
      app                = express(),
      path               = require('path');

app.use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api/user', userRouter)
  .use('/api/property', propertyRouter)
  .use('/api/notification', notificationRouter)
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  })
  .use((_req, res) => {
    res.status(404).json({ error: 'no such route' });
  });

module.exports = app;
