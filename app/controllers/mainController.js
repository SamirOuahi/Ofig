const articleModel = require('../models/articleModel');

const mainController = {

  // méthode pour la page d'accueil
  async homePage(request, response) {
    try {
      // Je vais récupérer tous les articles grâce à mon modèle
      const articles = await articleModel.getAllFigurinesWithAvgNote();
      // Je transmet les informations à ma vue
      response.render('accueil', {
        articles,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send('Erreur lors de la récupération des articles');
    }
  },

  // méthode pour la page article
  async articlePage(request, response, next) {
    // Je récupère l'id de l'article demandé depuis mes paramètres de requête
    const { id } = request.params;

    try {
      // Je récupère l'article demandé grâce à mon modèle
      const article = await articleModel.getOneFigurineWithAvgNote(id);

      // Si l'article retourné par le modèle est vide / n'existe pas
      if (!article) {
        // Je passe la main au middleware suivant
        // (qui est le middleware 404)
        next();
        // Pour éviter que le code en dessous soit exécuté, je fais un return
        return;
      }

      // Si mon code ici est exécuté, c'est que l'article existe
      response.render('article', {
        article,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send('Erreur lors de la récupération de l\'article');
    }
  },

};

module.exports = mainController;
