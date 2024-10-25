import { NextFunction, Request, Response } from "express";
import log from "../config/logs";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Companies";

// Get all companies
// Search companies by their title or stock market ticker

//  /companies
//  params: { search, page, perPage }
//  response: { data: [...], pagination: { page: number, perPage: number }, total: number }

const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const search = req.query.search;

  const perPage = parseInt(req.query.perPage as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;

  let query =
    (search
      ? `SELECT * FROM fortune500_2024 WHERE company LIKE '%${search}%' OR ticker LIKE '%${search}%' LIMIT `
      : "SELECT * FROM fortune500_2024 LIMIT ") +
    perPage +
    " OFFSET " +
    (page - 1) * perPage;

  var total;
  let countQuery = search
    ? `SELECT COUNT(*) AS total FROM fortune500_2024 WHERE company LIKE '%${search}%' OR ticker LIKE '%${search}%'`
    : "SELECT COUNT(*) AS total FROM fortune500_2024";

  Connect()
    .then((connection) => {
      Query(connection, countQuery)
        .then((result: any) => {
          total = result[0].total;
        })
        .then(() =>
          Query(connection, query)
            .then((data) => {
              return res.status(200).json({
                data,
                total: total!,
                pagination: { page: page, perPage: perPage },
              });
            })
            .catch((error) => {
              log.error(NAMESPACE, error.message, error);

              return res.status(200).json({
                message: error.message,
                error,
              });
            })
            .finally(() => {
              connection.end();
            })
        );
    })
    .catch((error) => {
      log.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

// Get all companies by rankId

//  /companies/{rankId}
//  response: { data: [{...}] }

const getCompanyByRankId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rankId = parseInt(req.params.rankId, 10);

  let query = `SELECT * FROM fortune500_2024 WHERE rankId="${rankId}"`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data: any) => {
          if (data.length === 0)
            return res.status(404).json({
              message: "Company was not found.",
            });
          return res.status(200).json({
            data,
          });
        })
        .catch((error) => {
          log.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch((error) => {
      log.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

export default { getAllCompanies, getCompanyByRankId };
