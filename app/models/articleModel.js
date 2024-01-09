const client = require('./client');

const articleModel = {
  async getAllFigurines() {
    // SELECT * FROM "figurine";
    // Je récupère la propriété rows de l'objet retourné par client.query
    const { rows } = await client.query('SELECT * FROM "figurine";');

    return rows;
  },

  async getOneFigurine(id) {
    // SELECT * FROM "figurine" WHERE "id" = 1;
    const { rows } = await client.query('SELECT * FROM "figurine" WHERE "id" = $1;', [id]);

    return rows[0];
  },

  async getAllFigurinesWithAvgNote() {
    const { rows } = await client.query(`
      SELECT
        "figurine".*,
        ROUND(AVG("review"."note")) as "avg_note"
      FROM
          "figurine"
          LEFT JOIN "review" ON "review"."figurine_id" = "figurine"."id"
      GROUP BY "figurine"."id"
      ORDER BY "avg_note" DESC;
    `);

    return rows;
  },

  async getOneFigurineWithAvgNote(id) {
    const { rows } = await client.query(`
      SELECT
        "figurine".*,
        ROUND(AVG("review"."note")) as "avg_note"
      FROM
          "figurine"
          LEFT JOIN "review" ON "review"."figurine_id" = "figurine"."id"
      WHERE "figurine"."id" = $1
      GROUP BY "figurine"."id"
      ORDER BY "avg_note" DESC;
    `, [id]);

    return rows[0];
  },
};

module.exports = articleModel;
