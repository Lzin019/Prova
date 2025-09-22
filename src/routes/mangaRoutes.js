import express from "express";
import { createManga, deleteManga, getAllMangasFiltrados, getMangasById, updateManga } from "../controllers/mangaControllers.js";

const router = express.Router();

router.get("/", getAllMangasFiltrados);
router.get("/:id", getMangasById);
router.post("/", createManga);
router.delete("/:id", deleteManga);
router.put("/:id", updateManga);

export default router