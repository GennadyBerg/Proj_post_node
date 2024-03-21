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

const getAllEntities = async (req, res, model) => {
  try {
    const entities = await model.find(createFieldsFilter(req, model));
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
    res.status(200).json({ entity });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const createNewEntity = async (req, res, model, setOwner) => {
  try {
    const entity = await model.create(req.body);
    if (setOwner === true)
      entity.owner_id = req.user._id;
    res.status(201).json({ entity });
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
      return res.status(200).json({ entity });
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
      return res.status(200).json({ post });
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
