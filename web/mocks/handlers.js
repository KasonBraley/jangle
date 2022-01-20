import { rest } from "msw"

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_SERVER}/profiles/testymctesterson/random`,
    (req, res, ctx) => {
      const response = {
        username: "nottestymctesterson",
        interests: ["music"],
        bio: "Hello there.",
      }

      return res(ctx.status(200), ctx.json(response))
    }
  ),
  rest.get(`${process.env.REACT_APP_API_SERVER}/rooms`, (req, res, ctx) => {
    const response = [{ roomname: "general" }, { roomname: "random" }]

    return res(ctx.status(200), ctx.json(response))
  }),
  rest.get(
    `${process.env.REACT_APP_API_SERVER}/profiles/testymctesterson`,
    (req, res, ctx) => {
      const response = {
        username: "nottestymctesterson",
        interests: ["music"],
        bio: "Hello there.",
      }

      return res(ctx.status(200), ctx.json(response))
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_SERVER}/messages/*`,
    (req, res, ctx) => {
      const response = []

      return res(ctx.status(200), ctx.json(response))
    }
  ),
]
