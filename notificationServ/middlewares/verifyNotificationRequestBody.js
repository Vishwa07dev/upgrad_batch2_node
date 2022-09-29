validateNotificationRequestBody = (req, res, next) => {
  if (!req.body.subject) {
    res.status(400).send({
      message: "subject not provided"
    })
  }

  if (!req.body.content) {
    res.status(400).send({
      message: "content not provided"
    })
  }

  if (!req.body.recepientEmails) {
    res.status(400).send({
      message: "recepientEmails not provided"
    })
  }

  if (typeof req.body.recepientEmails !== []) {
    res.status(400).send({
      message: "recepientEmails must be an array of emails"
    })
  }

  if (!req.body.requester) {
    res.status(400).send({
      message: "requester not provided"
    })
  }

  next();
}

module.exports = {
  validateNotificationRequestBody
}
