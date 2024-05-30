import axios from "axios";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ content: message, role: "user" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Send the response from OpenAI API back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error in Send Message", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log("api key -", process.env.OPENAI_API_KEY);
  }
}
