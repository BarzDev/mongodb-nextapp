import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const movies = await db
      .collection("postings")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
