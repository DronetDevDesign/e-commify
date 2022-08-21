const router = require('express').Router();
const { Category, Product } = require('../../models');

// ======== GET /api/categories ========
router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);  
  });
  // be sure to include its associated Products
});

// ======== GET /api/categories/1 ========
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);  
  });
  // be sure to include its associated Products
});

// ======== POST /api/categories ========
router.post('/', (req, res) => {
  // create a new category
  // expects {category_name}
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// ======== PUT /api/categories/1 ========
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // expects {category_name}
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);  
  });
});

// ======== DELETE /api/categories/1 ========
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id   
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(dbCategoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;