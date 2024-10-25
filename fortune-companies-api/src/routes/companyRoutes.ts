import express from "express";
import controller from "../controllers/companyControllers";

const router = express.Router();

router.get("/", controller.getAllCompanies);
router.get("/:rankId", controller.getCompanyByRankId);

export = router;
