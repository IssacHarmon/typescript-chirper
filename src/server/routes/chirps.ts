import * as express from "express";
const router = Router();
import chirpStore from "../utils/chirpstore";
import { Router } from "express";
import chirpstore from "../utils/chirpstore";

router.get("/", (req, res) => {
  const data = chirpStore.GetChirps();
  const chirps = Object.keys(data).map((key) => {
      return {
          id: key,
          user: data[key].user,
          text: data[key].text
      }
  })
  res.send(chirps);
  chirps.pop()
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let oneChirp = chirpStore.GetChirp(id);
  res.json(oneChirp);
});

router.post("/", (req, res) => {
  chirpStore.CreateChirp({
    user: req.body.user,
    text: req.body.text,
  });

  res.status(200).json("Chirp created");
});

router.put("/:id", (req, res) => {
 chirpStore.UpdateChirp(req.params.id, {
     user: req.body.user,
     text: req.body.text,

 })
 res.sendStatus(200).json(`Chirp ${req.params.id} updated`);
});

router.delete(":/id", (req, res) => {
  chirpStore.DeleteChirp(req.params.id);
  res.sendStatus(200).json(`Chirp ${req.params.id} deleted`);
});

export default router;
