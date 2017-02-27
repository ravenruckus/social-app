const router = require('express').Router()
const knex = require('../db')
const boom = require('boom')
const { camelizeKeys, decamelizeKeys } = require('humps')


router.get('/', (_req, res) => {
  knex('projects')
    .orderBy('updated_at', 'desc')
    .then((rows) => {
       const projects = camelizeKeys(rows)

      res.send(projects);
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', (req, res, next) => {

  const { userId, title, description, imgUrl, webUrl, githubLink } = req.body;

  if(!title || !title.trim()) {
    return next(boom.create(400, 'Title must not be blank'))
  }

  if(!imgUrl || !imgUrl.trim()) {
    return next(boom.create(400, 'Image must not be blank'))
  }

  if(!description || !description.trim()) {
    return next(boom.create(400, 'Description must not be blank'))
  }

  if(!githubLink || !githubLink.trim()) {
    return next(boom.create(400, 'Github link must not be blank'))
  }

  const insertProject = {userId, title, description, imgUrl, githubLink}

  if(webUrl) {
    insertProject.webUrl = webUrl

  }


  knex('projects')
    .insert(decamelizeKeys(insertProject), '*')
    .then((rows) => {
      const project= camelizeKeys(rows[0]);
      res.send(project);
    })
    .catch((err) => {
      next(err)
    })
})

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next()
  }

  knex('projects')
    .where('id', id)
    .first()
    .then((project) => {
      if (!project)  {
        throw boom.create(404, 'Not Found')
      }


      const { title, description, imgUrl, webUrl, githubLink } = req.body;
      const updateProject = {};

      if(title) {
        updateProject.title = title;
      }

      if(description) {
        updateProject.description = description;
      }

      if(imgUrl) {
        updateProject.imgUrl = imgUrl;
      }

      if(webUrl) {
        updateProject.webUrl = webUrl;
      }

      if(githubLink) {
        updateProject.githubLink = githubLink;
      }

      return knex('projects')
        .update(decamelizeKeys(updateProject), '*')
        .where('id', id);
    })
    .then((rows) => {
      const project = camelizeKeys(rows[0]);

      res.send(project);
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next()
  }

  knex('projects')
    .del('*')
    .where('id', id)
    .then((rows) => {
      let project = camelizeKeys(rows[0]);

      if (!project) {
        return next()
      }
      delete project.id;
      res.send(project);
    })
    .catch((err) => {
      console.log(err)
      next(err)``
    })
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('projects')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found')
      }
      const project = camelizeKeys(row)
      res.send(project);
    })
    .catch((err) => {
      next(err)
    })
});

router.post('/:id/likes', (req, res, next) => {
  knex('projects')
    .update('likes', knex.raw('likes + 1'))
    .where({id: req.params.id})
    .then( () => knex('projects').where({id: req.params.id}).first())
    .then((project) => {
      res.json({likes: project.likes})
    })
    .catch(err => next(err))
})

router.delete('/:id/likes', (req, res, next) => {
  knex('projects')
    .update('likes', knex.raw('likes - 1'))
    .where({id: req.params.id})
    .then(() => knex('projects').where({id: req.params.id}).first())
    .then((project) => {
      res.json({likes: project.likes})
    })
    .catch(err => next(err))
})

router.get('/:projectsId/comments', (req, res, next) => {
  const projectsId = Number.parseInt(req.params.projectsId)

  if (Number.isNaN(projectsId)) {
    return next()
  }

  knex('projects_comments')
    .where('projects_id', projectsId)
    .then((rows) => {
      if(!rows) {
        throw boom.create(404, 'Not Found')
      }
      const comments = camelizeKeys(rows)
      res.send(comments)
    })
})


router.post('/:projectsId/comments', (req, res, next) => {

  const {projectComment, userId } = req.body
  const projectsId = req.params.projectsId

  if(!projectComment || !projectComment.trim()) {
    return next(boom.create(400, 'Comment must not be blank'))
  }

  const insertComment = { projectComment, userId, projectsId}

  knex('projects_comments')
    .insert(decamelizeKeys(insertComment), '*')
    .then((rows) => {
      const projectComment = camelizeKeys(rows[0])
      res.send(projectComment)
    })
    .catch(err => next(err))
})

router.delete('/:projectsId/comments/:id', (req, res, next) => {
  const commentId = Number.parseInt(req.params.id)

  if (Number.isNaN(commentId)) {
    return next()
  }

    knex('projects_comments')
      .del('*')
      .where('id', commentId)
      .then((rows) => {
        const comment = rows[0]

        if (!comment) {
          return next()
        }

        delete comment.id
        res.send(camelizeKeys(comment))
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
})

router.patch('/:statusId/comments/:id', (req, res, next) => {
  const commentId = Number.parseInt(req.params.id)

  if (Number.isNaN(commentId)) {
    return next()
  }

  knex('projects_comments')
    .where('id', commentId)
    .first()
    .then((comment) => {
      if (!comment) {
        throw boom.create(404, 'Not Found')
      }

      const projectComment = req.body
      const updateComment = projectComment

      return knex('projects_comments')
        .update(decamelizeKeys(updateComment), '*')
        .where('id', commentId)
    })
    .then((rows) => {
      const comment = camelizeKeys(rows[0])

      res.send(comment)
    })
    .catch((err) => {
      next(err)
    })
})


router.get('/', (req, res) => {
  res.send('Hi from STATUS API')
})

module.exports = router
