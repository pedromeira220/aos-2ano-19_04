const users = require("./data/users.json")
const publications = require("./data/publications.json")
const noUsersFound = require("./data/no-users-found.json")
const noPublicationsFound = require("./data/no-publications-found.json")
const express = require("express")

const PORT = 3000

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
  return res.status(200).json({
    msg: "Hello World",
  })
})

app.get("/user/:id", async (req, res) => {
  const userIdFromParams = req.params.id

  const user = users.find((user) => {
    return user.id == userIdFromParams
  })

  if (!user) {
    return res.status(404).json(noUsersFound)
  }

  return res.status(200).json(user)
})

app.get("/user", async (req, res) => {
  if (users.length === 1) {
    return res.status(404).json(noUsersFound)
  }

  return res.status(200).json(users)
})

app.get("/publication/user/:userId", async (req, res) => {
  const userIdFromParams = req.params.userId

  const publicationsFromUser = publications.filter((publication) => {
    return publication.userId === userIdFromParams
  })

  console.log("publications: ", publications)
  console.log("publicationsFromUser: ", publicationsFromUser)

  if (publicationsFromUser.length == 0) {
    return res.status(404).json(noPublicationsFound)
  }

  return res.status(200).json(publicationsFromUser)
})

app.get("/publication/:id", async (req, res) => {
  const publicationIdFromParams = req.params.id

  const publication = publications.find(
    (currentPublication) => currentPublication.id === publicationIdFromParams
  )

  if (!publication) {
    return res.status(404).json(noPublicationsFound)
  }

  return res.status(200).json(publication)
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
