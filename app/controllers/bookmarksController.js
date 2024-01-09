const articleModel = require('../models/articleModel');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage(request, response) {
    // Je récupère depuis ma session la liste de mes favoris
    // Attention, si je n'ai pas encore de favoris, je vais avoir `undefined`
    // Si dans ma vue j'essaye de boucler sur une valeur `undefined`, j'aurai une erreur
    const bookmarks = request.session.bookmarks || [];

    response.render('favoris', {
      bookmarks,
    });
  },

  async addToBookmarks(request, response, next) {
    const { id } = request.params;

    try {
      // Je récupère l'article demandé grâce à mon modèle
      const article = await articleModel.getOneFigurine(id);

      if (!article) {
        next();
        return;
      }
      // Si je suis ici, c'est que l'article existe

      if (!request.session.bookmarks) {
        request.session.bookmarks = [];
      }
      // Si je suis ici, je suis sur que bookmarks existe dans ma session

      // Avant d'ajouter mon article aux favoris, je vérifie qu'il n'y est pas déjà
      // Je cherche dans ma liste de favoris
      // si l'identifiant de l'article que je veux ajouter existe déjà
      const articleFounded = request.session.bookmarks
        .find((bookmark) => bookmark.id === article.id);

      // Si je n'ai trouvé l'article dans ma liste de favoris
      if (!articleFounded) {
        // Je vais donc pouvoir ajouter mon article
        request.session.bookmarks.push(article);
      }

      // Je redirige vers la page des favoris
      response.redirect('/bookmarks');
    } catch (error) {
      console.error(error);
      response.status(500).send('Erreur lors de l\'ajout de l\'article aux favoris');
    }
  },

  removeToBookmarks(request, response) {
    // Dans le doute, s'assurer que les bookmarks existent
    if (!request.session.bookmarks) {
      request.session.bookmarks = [];
    }
    const articleId = Number(request.params.id);

    request.session.bookmarks = request.session.bookmarks
      // Avec filtrer, si la condition est vrai, l'élément est gardé
      // Je garde tous les éléments SAUF celui qui a l'id que je veux supprimer
      // On a le droit de passé à la ligne lorsqu'on access à une propriété / méthode d'un objet
      .filter((bookmark) => bookmark.id !== articleId);

    response.redirect('/bookmarks');
  },

};

module.exports = bookmarksController;
