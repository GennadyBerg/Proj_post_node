const mqh = require("./mongoQueryHelper.js");

const createFieldsFilter = (req, model) => {
  const query = {};
  for (const filterFieldName in req.query) {
    const prop = model.schema.path(filterFieldName);
    if (prop) {
      let value = req.query[filterFieldName];
      if (prop.instance === "Array")
        value = { $all: value.split(",") };
      mqh.getQueryParam(filterFieldName, value, query);
    }
  }
  return query;
}

const createFieldsSorting = (req, model) => {
  const sorting = req.query.sortBy;
  let result = null;
  if (sorting) {
    let sortBy = null;
    const sortFieldsArray = sorting.split(",");
    for (const sortField of sortFieldsArray) {
      const sortFieldName = sortField.substring(1);
      const prop = model.schema.path(sortFieldName);
      if (prop) {
        sortBy ??= {}
        const sortFieldDirection = sortField[0] === '-' ? -1 : 1;
        sortBy[sortFieldName] = sortFieldDirection;
      }
    }
    if (sortBy)
      result = { sort: sortBy };
  }
  return result;
}

const getAllEntities = async (req, res, model) => {
  try {
    const entities = await model.find(createFieldsFilter(req, model), null, createFieldsSorting(req, model));
    return res.json(entities);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error fetching ${model.modelName}s` });
  }
}

const getEntityIdById = async (req, res, model) => {
  try {
    const entityId = req.params.id;
    const entity = await model.findById(entityId);
    return res.status(200).json({ [model.modelName.toLowerCase()]: entity });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const createNewEntity = async (req, res, model, setOwner) => {
  try {
    if (model.schema.path("owner_id"))
      req.body.owner_id = req.user._id;
    const entity = await model.create(req.body);
    res.status(201).json({ [model.modelName.toLowerCase()]: entity });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const putEntityById = async (req, res, model) => {
  try {
    const entityId = req.params.id;

    let entityToUpdate = await model.findById(entityId).exec();
    if (!entityToUpdate)
      return res.status(404).send({ message: `${model.modelName} not found.` });

    const tempEntity = new model(req.body);
    const { _id, __v, ...rest } = tempEntity._doc;
    const entity = await model.findByIdAndUpdate(entityId, rest, { new: true });

    if (entity)
      return res.status(200).json({ [model.modelName.toLowerCase()]: entity });
    else
      return res.status(404).send({ message: `${model.modelName} not found.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const patchEntityById = async (req, res, model) => {
  try {
    const entityId = req.params.id;
    const { owner_id, ...rest } = req.body;
    const entity = await model.findByIdAndUpdate(entityId, rest, { new: true });
    if (entity)
      return res.status(200).json({ entity });
    else
      return res.status(404).send({ message: `${model.modelName} not found.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const deleteEntityById = async (req, res, model) => {
  try {
    const result = await model.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAllEntities, getEntityIdById, createNewEntity, putEntityById, patchEntityById, deleteEntityById };
