validateNotificationRequestBody = (req, res, next) => {
  if (!req.body.subject) {
    return res.status(400).send({
      message: "subject not provided"
    })
  }

  if (!req.body.content) {
    return res.status(400).send({
      message: "content not provided"
    })
  }

  if (!req.body.recepientEmails) {
    return res.status(400).send({
      message: "recepientEmails not provided"
    })
  }
  /**
   * Because of this line !!!!
   */
/** 
  if (typeof req.body.recepientEmails !== []) {
    res.status(400).send({
      message: "recepientEmails must be an array of emails"
    })
  }
**/

  if (!req.body.requester) {
    return res.status(400).send({
      message: "requester not provided"
    })
  }

  next();
}

module.exports = {
  validateNotificationRequestBody
}
